import { writeFile } from "node:fs/promises";

const [url, outputPath, widthArg = "1440", heightArg = "1000", portArg = "9223"] = process.argv.slice(2);

if (!url || !outputPath) {
  throw new Error("Usage: node scripts/runtime-qa.mjs <url> <screenshot-path> [width] [height] [debug-port]");
}

const width = Number(widthArg);
const height = Number(heightArg);
const debugPort = Number(portArg);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const targets = await fetch(`http://127.0.0.1:${debugPort}/json/list`).then((response) => response.json());
const target = targets.find((item) => item.type === "page");

if (!target?.webSocketDebuggerUrl) {
  throw new Error(`No debuggable page found on port ${debugPort}`);
}

const socket = new WebSocket(target.webSocketDebuggerUrl);
const pending = new Map();
const eventWaiters = new Map();
let messageId = 0;

socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);

  if (message.id) {
    const waiter = pending.get(message.id);
    if (!waiter) return;
    pending.delete(message.id);
    if (message.error) waiter.reject(new Error(message.error.message));
    else waiter.resolve(message.result);
    return;
  }

  const waiters = eventWaiters.get(message.method);
  if (!waiters?.length) return;
  const waiter = waiters.shift();
  waiter.resolve(message.params);
});

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++messageId;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });

const waitForEvent = (method, timeoutMs = 10000) =>
  new Promise((resolve, reject) => {
    const waiters = eventWaiters.get(method) ?? [];
    const timer = setTimeout(() => {
      const current = eventWaiters.get(method) ?? [];
      const index = current.findIndex((waiter) => waiter.resolve === wrappedResolve);
      if (index >= 0) current.splice(index, 1);
      reject(new Error(`Timed out waiting for ${method}`));
    }, timeoutMs);
    timer.unref?.();
    const wrappedResolve = (value) => {
      clearTimeout(timer);
      resolve(value);
    };
    waiters.push({ resolve: wrappedResolve, reject });
    eventWaiters.set(method, waiters);
  });

const evaluate = async (expression) => {
  const result = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
};

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width,
  height,
  deviceScaleFactor: 1,
  mobile: width < 600,
  screenWidth: width,
  screenHeight: height
});

const loaded = waitForEvent("Page.loadEventFired").catch(() => null);
const sameDocument = waitForEvent("Page.navigatedWithinDocument").catch(() => null);
await send("Page.navigate", { url });
await Promise.race([loaded, sameDocument, delay(1800)]);
await delay(900);

const diagnostics = await evaluate(`(() => {
  const rect = (selector) => {
    const node = document.querySelector(selector);
    if (!node) return null;
    const box = node.getBoundingClientRect();
    return { x: box.x, y: box.y, width: box.width, height: box.height };
  };
  const visible = (selector) => {
    const node = document.querySelector(selector);
    if (!node) return false;
    const style = getComputedStyle(node);
    const box = node.getBoundingClientRect();
    return style.display !== "none" && style.visibility !== "hidden" && box.width > 0 && box.height > 0;
  };
  return {
    url: location.href,
    lang: document.documentElement.lang,
    innerWidth,
    innerHeight,
    scrollWidth: document.documentElement.scrollWidth,
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
    languageSwitcherVisible: visible(".language-switcher"),
    languageSwitcher: rect(".language-switcher"),
    header: rect(".site-header"),
    toolbar: rect(".workspace-toolbar"),
    filterButtons: [...document.querySelectorAll("[data-workspace-filter]")].map((node) => {
      const box = node.getBoundingClientRect();
      return { text: node.textContent.trim(), width: box.width, height: box.height, right: box.right };
    }),
    workWindowCount: document.querySelectorAll("[data-workspace-window]").length,
    visibleWorkWindowCount: [...document.querySelectorAll("[data-workspace-window]")].filter((node) => !node.hidden).length,
    firstWindow: rect("[data-workspace-window]"),
    colors: {
      body: getComputedStyle(document.body).backgroundColor,
      text: getComputedStyle(document.body).color,
      activeLanguage: document.querySelector(".language-link.is-active") ? getComputedStyle(document.querySelector(".language-link.is-active")).backgroundColor : null,
      titleBar: document.querySelector(".work-desktop-window__bar") ? getComputedStyle(document.querySelector(".work-desktop-window__bar")).backgroundColor : null
    }
  };
})()`);

let interaction = null;

if (width >= 900 && diagnostics.workWindowCount > 0) {
  const before = await evaluate(`(() => {
    const node = document.querySelector("[data-workspace-window]");
    const handle = node.querySelector("[data-window-handle]");
    handle.focus();
    return { transform: getComputedStyle(node).transform, handle: (() => { const r = handle.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; })() };
  })()`);

  await send("Input.dispatchKeyEvent", { type: "keyDown", key: "ArrowRight", code: "ArrowRight", windowsVirtualKeyCode: 39, nativeVirtualKeyCode: 124 });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: "ArrowRight", code: "ArrowRight", windowsVirtualKeyCode: 39, nativeVirtualKeyCode: 124 });
  await delay(80);
  const afterKeyboard = await evaluate(`getComputedStyle(document.querySelector("[data-workspace-window]")).transform`);

  await send("Input.dispatchMouseEvent", { type: "mousePressed", x: before.handle.x, y: before.handle.y, button: "left", buttons: 1, clickCount: 1 });
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: before.handle.x + 84, y: before.handle.y + 42, button: "left", buttons: 1 });
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: before.handle.x + 84, y: before.handle.y + 42, button: "left", buttons: 0, clickCount: 1 });
  await delay(100);
  const afterDrag = await evaluate(`getComputedStyle(document.querySelector("[data-workspace-window]")).transform`);

  const minimized = await evaluate(`(() => {
    const node = document.querySelector("[data-workspace-window]");
    node.querySelector("[data-window-minimize]").click();
    return { hidden: node.hidden, dockMinimized: document.querySelector('[data-window-restore="' + node.dataset.slug + '"]').classList.contains("is-minimized") };
  })()`);

  const restored = await evaluate(`(() => {
    const node = document.querySelector("[data-workspace-window]");
    document.querySelector('[data-window-restore="' + node.dataset.slug + '"]').click();
    return { hidden: node.hidden, dockPressed: document.querySelector('[data-window-restore="' + node.dataset.slug + '"]').getAttribute("aria-pressed") };
  })()`);

  const listMode = await evaluate(`(() => {
    document.querySelector('[data-layout="scan"]').click();
    const root = document.querySelector("[data-workspace-root]");
    return { active: root.classList.contains("is-scan-mode"), pressed: document.querySelector('[data-layout="scan"]').getAttribute("aria-pressed") };
  })()`);

  await evaluate(`document.querySelector("[data-workspace-reset]").click()`);
  interaction = {
    keyboardMoved: before.transform !== afterKeyboard,
    dragMoved: afterKeyboard !== afterDrag,
    minimized,
    restored,
    listMode
  };
}

const screenshot = await send("Page.captureScreenshot", {
  format: "png",
  fromSurface: true,
  captureBeyondViewport: false
});
await writeFile(outputPath, Buffer.from(screenshot.data, "base64"));

socket.close();
console.log(JSON.stringify({ diagnostics, interaction, screenshot: outputPath }, null, 2));
