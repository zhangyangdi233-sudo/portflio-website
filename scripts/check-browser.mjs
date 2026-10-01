import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { StringDecoder } from "node:string_decoder";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const languages = ["zh", "en", "ja"];
const expectedXWheelSources = [
  "/assets/projects/x-wheel/character-full.png",
  "/assets/projects/x-wheel/character-portrait.png",
  "/assets/projects/x-wheel/character-sequence.png",
  "/assets/projects/x-wheel/cartridge-3-title.png"
];
const evidence = [];
const browserErrors = [];
const chromeLog = [];
let chromeProcess;
let cdp;

const delay = (milliseconds) => new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));

function invariant(condition, message, details) {
  if (condition) return;
  const suffix = details === undefined ? "" : `\n${JSON.stringify(details, null, 2)}`;
  throw new Error(`${message}${suffix}`);
}

function record(name, details) {
  evidence.push({ name, details });
}

function findChrome() {
  const explicit = process.env.CHROME_PATH;
  const absoluteCandidates = [
    explicit,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
  ].filter(Boolean);

  for (const candidate of absoluteCandidates) {
    if (existsSync(candidate)) return candidate;
  }

  for (const command of ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]) {
    const lookup = spawnSync(process.platform === "win32" ? "where" : "which", [command], { encoding: "utf8" });
    const firstResult = lookup.stdout?.trim().split(/\r?\n/)[0];
    if (lookup.status === 0 && firstResult) return firstResult;
  }

  throw new Error("Chrome or Chromium was not found. Set CHROME_PATH to run the browser audit.");
}

async function waitForHttp(url, timeoutMs, label) {
  const deadline = Date.now() + timeoutMs;
  let lastError;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
      lastError = new Error(`${response.status} ${response.statusText}`);
    } catch (error) {
      lastError = error;
    }
    await delay(120);
  }
  throw new Error(`${label} did not become ready: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
}

async function runProcess(command, args, label) {
  const child = spawn(command, args, { cwd: root, stdio: "inherit" });
  const exitCode = await new Promise((resolveExit, rejectExit) => {
    child.once("error", rejectExit);
    child.once("exit", resolveExit);
  });
  invariant(exitCode === 0, `${label} failed with exit code ${exitCode}.`);
}

class CdpClient {
  constructor(input, output) {
    this.input = input;
    this.output = output;
    this.decoder = new StringDecoder("utf8");
    this.buffer = "";
    this.sequence = 0;
    this.pending = new Map();
    this.listeners = new Map();
    this.sessionId = null;
  }

  async open() {
    this.output.on("data", (chunk) => {
      this.buffer += this.decoder.write(chunk);
      let boundary = this.buffer.indexOf("\0");
      while (boundary >= 0) {
        const payload = this.buffer.slice(0, boundary);
        this.buffer = this.buffer.slice(boundary + 1);
        if (payload) this.receive(JSON.parse(payload));
        boundary = this.buffer.indexOf("\0");
      }
    });
  }

  receive(message) {
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        clearTimeout(pending.timeout);
        if (message.error) pending.reject(new Error(`${pending.method}: ${message.error.message}`));
        else pending.resolve(message.result);
        return;
      }

      if (this.sessionId && message.sessionId && message.sessionId !== this.sessionId) return;
      const listeners = this.listeners.get(message.method) ?? [];
      listeners.forEach((listener) => listener(message.params));
  }

  setSession(sessionId) {
    this.sessionId = sessionId;
  }

  send(method, params = {}, options = {}) {
    const id = ++this.sequence;
    return new Promise((resolveSend, rejectSend) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        rejectSend(new Error(`${method} timed out.`));
      }, 20_000);
      this.pending.set(id, { method, resolve: resolveSend, reject: rejectSend, timeout });
      const message = { id, method, params };
      if (this.sessionId && !options.browser) message.sessionId = this.sessionId;
      this.input.write(`${JSON.stringify(message)}\0`);
    });
  }

  on(method, listener) {
    const listeners = this.listeners.get(method) ?? [];
    listeners.push(listener);
    this.listeners.set(method, listeners);
    return () => this.listeners.set(method, (this.listeners.get(method) ?? []).filter((item) => item !== listener));
  }

  waitFor(method, timeoutMs = 20_000) {
    return new Promise((resolveEvent, rejectEvent) => {
      const stop = this.on(method, (params) => {
        clearTimeout(timeout);
        stop();
        resolveEvent(params);
      });
      const timeout = setTimeout(() => {
        stop();
        rejectEvent(new Error(`${method} event timed out.`));
      }, timeoutMs);
    });
  }

  close() {
    this.input.end();
  }
}

async function evaluate(expression) {
  const response = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
    userGesture: true
  });
  if (response.exceptionDetails) {
    throw new Error(response.exceptionDetails.exception?.description ?? response.exceptionDetails.text);
  }
  return response.result.value;
}

async function getLocalPageUrl(path) {
  const requested = new URL(path, "https://ciba.local");
  const relativePath = requested.pathname.endsWith("/")
    ? `${requested.pathname.slice(1)}index.html`
    : requested.pathname.slice(1);
  const sourcePath = join(root, "dist", relativePath);
  const html = await readFile(sourcePath, "utf8");
  const distUrl = `${pathToFileURL(join(root, "dist")).href}/`;
  const rewritten = html.replace(
    /(^|[\s"'=(,])\/(?=(?:assets|_astro)\/)/g,
    (_, prefix) => `${prefix}${distUrl}`
  );
  const auditDirectory = join(tmpdir(), "ciba-browser-audit-pages");
  await mkdir(auditDirectory, { recursive: true });
  const auditName = requested.pathname.replace(/^\/|\/$/g, "").replace(/[^a-z0-9_-]+/gi, "-") || "root";
  const auditPath = join(auditDirectory, `${auditName}.html`);
  await writeFile(auditPath, rewritten, "utf8");
  return `${pathToFileURL(auditPath).href}${requested.search}`;
}

async function navigate(baseUrl, path, width, height, reducedMotion = false) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 900
  });
  await cdp.send("Emulation.setEmulatedMedia", {
    media: "screen",
    features: [{ name: "prefers-reduced-motion", value: reducedMotion ? "reduce" : "no-preference" }]
  });
  const loaded = cdp.waitFor("Page.loadEventFired");
  const url = baseUrl ? new URL(path, baseUrl).href : await getLocalPageUrl(path);
  await cdp.send("Page.navigate", { url });
  await loaded;
  await evaluate(`(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    await new Promise((resolveFrame) => requestAnimationFrame(() => requestAnimationFrame(resolveFrame)));
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 320));
    return true;
  })()`);
}

async function auditAcidHover(selector, label) {
  const point = await evaluate(`(() => {
    const element = document.querySelector(${JSON.stringify(selector)});
    if (!(element instanceof HTMLElement)) return null;
    const rect = element.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, rect: { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom } };
  })()`);
  invariant(
    point && point.x >= 0 && point.x <= 1440 && point.y >= 0 && point.y <= 900,
    `${label} is outside the desktop viewport.`,
    point
  );
  await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: point.x, y: point.y });
  await delay(80);
  const state = await evaluate(`(() => {
    const element = document.querySelector(${JSON.stringify(selector)});
    const arrow = element?.querySelector("span:last-child");
    if (!(element instanceof HTMLElement) || !(arrow instanceof HTMLElement)) return null;
    const style = getComputedStyle(element);
    return {
      background: style.backgroundColor,
      text: style.color,
      arrow: getComputedStyle(arrow).color
    };
  })()`);
  invariant(
    state?.background === "rgb(198, 255, 0)"
      && state.text === "rgb(9, 10, 8)"
      && state.arrow === "rgb(9, 10, 8)",
    `${label} did not resolve to an acid-green field with black text and arrow on hover.`,
    state
  );
  return state;
}

async function auditHome(baseUrl) {
  await navigate(baseUrl, "/en/", 1440, 900);
  const heroActionHover = await auditAcidHover(".v3-action-link", "Home introduction action");
  await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 1, y: 1 });
  const desktop = await evaluate(`(() => {
    const expected = ${JSON.stringify(expectedXWheelSources)};
    const media = expected.map((src) => {
      const image = document.querySelector(\`img[src$="\${src}"]\`);
      const frame = image?.closest("[data-v3-floating-media]");
      return {
        src,
        found: Boolean(frame),
        opacity: frame ? Number.parseFloat(getComputedStyle(frame).opacity) : null,
        filter: frame ? getComputedStyle(frame).filter : null
      };
    });
    const escapeWords = Array.from(document.querySelectorAll('[data-title-slug="escape-project"] [data-title-word]'))
      .map((word) => ({ word: word.dataset.word, top: Math.round(word.getBoundingClientRect().top) }));
    return {
      media,
      escapeWords,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
    };
  })()`);
  invariant(desktop.media.every((item) => item.found), "Home does not contain exactly the four approved X.WHEEL representatives.", desktop);
  invariant(desktop.media.every((item) => Math.abs(item.opacity - 0.1) < 0.011), "Desktop Home evidence is not approximately 10% opaque.", desktop);
  invariant(desktop.media.every((item) => item.filter.includes("grayscale(1)")), "Desktop Home evidence is not grayscale by default.", desktop);
  invariant(
    desktop.escapeWords.length === 2
      && desktop.escapeWords.map((item) => item.word).join(" / ") === "ESCAPE / PROJECT"
      && desktop.escapeWords[1].top > desktop.escapeWords[0].top,
    "ESCAPE / PROJECT is not rendered as two authored lines.",
    desktop.escapeWords
  );

  const homeInteraction = await evaluate(`(async () => {
    const frame = document.querySelector('img[src$="${expectedXWheelSources[0]}"]')?.closest("[data-v3-floating-media]");
    if (!(frame instanceof HTMLElement)) return null;
    frame.focus();
    // The authored reveal is a 260 ms state transition; assert its settled state, not an in-between frame.
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 320));
    const focused = { opacity: Number.parseFloat(getComputedStyle(frame).opacity), filter: getComputedStyle(frame).filter };
    frame.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    const moved = Number.parseFloat(frame.dataset.dragX ?? "0");
    frame.dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true }));
    document.querySelector('[data-v3-cinema-trigger][data-work-index="1"]')?.scrollIntoView({ block: "center" });
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 420));
    return {
      focused,
      moved,
      reset: Number.parseFloat(frame.dataset.dragX ?? "0"),
      activeTitle: document.querySelector("[data-v3-cinema-layer].is-active [data-title-slug]")?.dataset.titleSlug
    };
  })()`);
  invariant(homeInteraction?.focused.opacity >= 0.87, "Focused Home evidence did not return to high opacity.", homeInteraction);
  invariant(homeInteraction?.focused.filter.includes("grayscale(0)"), "Focused Home evidence did not return to colour.", homeInteraction);
  invariant(homeInteraction?.moved === 16 && homeInteraction?.reset === 0, "Home keyboard movement or Home reset failed.", homeInteraction);
  invariant(homeInteraction?.activeTitle === "emida", "Scroll-linked Home title did not advance to EMIDA.", homeInteraction);
  const projectActionHover = await auditAcidHover(
    ".v3-cinema-layer.is-active .v3-cinema-layer__open",
    "Home project-record action"
  );
  record("Home desktop", { desktop, homeInteraction, heroActionHover, projectActionHover });

  await navigate(baseUrl, "/en/", 390, 844);
  const mobileOpacity = await evaluate(`(() => ${JSON.stringify(expectedXWheelSources)}.map((src) => {
    const frame = document.querySelector(\`img[src$="\${src}"]\`)?.closest("[data-v3-floating-media]");
    return frame ? Number.parseFloat(getComputedStyle(frame).opacity) : null;
  }))()`);
  invariant(mobileOpacity.every((opacity) => Math.abs(opacity - 0.1) < 0.011), "Mobile Home evidence is not approximately 10% opaque.", mobileOpacity);
  record("Home mobile opacity", mobileOpacity);

  const metadataEvidence = [];
  for (const lang of languages) {
    await navigate(baseUrl, `/${lang}/`, 320, 780);
    const metadata = await evaluate(`(() => Array.from(document.querySelectorAll(".v3-cinema-layer__meta")).map((meta) => {
      const medium = meta.querySelector(".v3-cinema-layer__medium");
      if (!(medium instanceof HTMLElement)) return null;
      const style = getComputedStyle(medium);
      const lineHeight = Number.parseFloat(style.lineHeight);
      return {
        slug: meta.closest("[data-v3-cinema-layer]")?.querySelector("[data-title-slug]")?.dataset.titleSlug,
        text: medium.textContent?.trim(),
        lineCount: Number.isFinite(lineHeight) && lineHeight > 0 ? Math.ceil(medium.getBoundingClientRect().height / lineHeight) : null,
        status: meta.querySelector(".v3-cinema-layer__status")?.textContent?.trim() ?? null
      };
    }))()`);
    invariant(metadata.every((item) => item && item.lineCount <= 3), "A Home project medium exceeds three lines at 320px.", { lang, metadata });
    const statusBySlug = Object.fromEntries(metadata.map((item) => [item.slug, item.status]));
    invariant(
      statusBySlug["x-wheel"] && statusBySlug["university-coursework"]
        && !statusBySlug.emida && !statusBySlug["wake-up"] && !statusBySlug["escape-project"],
      "Home status visibility does not match the requested per-project omissions.",
      { lang, statusBySlug }
    );
    metadataEvidence.push({ lang, metadata });
  }
  record("Home multilingual mobile metadata", metadataEvidence);
}

async function auditWorks(baseUrl) {
  await navigate(baseUrl, "/en/works/", 1440, 900);
  const geometry = await evaluate(`(() => {
    const stage = document.querySelector("[data-workspace-stage]");
    if (!(stage instanceof HTMLElement)) return null;
    const stageRect = stage.getBoundingClientRect();
    return Array.from(document.querySelectorAll("[data-workspace-window]")).filter((item) => !item.hidden).map((item) => {
      const rect = item.getBoundingClientRect();
      const openRect = item.querySelector(".v3-work-window__open")?.getBoundingClientRect();
      return {
        slug: item.dataset.slug,
        dx: Number.parseFloat(item.dataset.windowDx ?? "0"),
        dy: Number.parseFloat(item.dataset.windowDy ?? "0"),
        inside: rect.left >= stageRect.left - 1 && rect.right <= stageRect.right + 1
          && rect.top >= stageRect.top - 1 && rect.bottom <= stageRect.bottom + 1,
        openInside: openRect ? openRect.left >= stageRect.left - 1 && openRect.right <= stageRect.right + 1
          && openRect.top >= stageRect.top - 1 && openRect.bottom <= stageRect.bottom + 1 : false,
        rect: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom },
        stage: { left: stageRect.left, right: stageRect.right, top: stageRect.top, bottom: stageRect.bottom }
      };
    });
  })()`);
  invariant(geometry?.length === 5, "Works did not render five public windows.", geometry);
  invariant(geometry.every((item) => item.inside && item.openInside), "A Works window or its Open action starts outside the stage.", geometry);

  const interaction = await evaluate(`(async () => {
    const first = document.querySelector("[data-workspace-window]");
    const handle = first?.querySelector("[data-window-handle]");
    if (!(first instanceof HTMLElement) || !(handle instanceof HTMLButtonElement)) return null;
    const start = Number.parseFloat(first.dataset.windowDx ?? "0");
    handle.focus();
    handle.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    const moved = Number.parseFloat(first.dataset.windowDx ?? "0");
    first.querySelector("[data-window-minimize]")?.click();
    const minimized = first.hidden;
    document.querySelector(\`[data-window-restore="\${first.dataset.slug}"]\`)?.click();
    await new Promise((resolveFrame) => requestAnimationFrame(() => requestAnimationFrame(resolveFrame)));
    return {
      start,
      moved,
      minimized,
      restored: !first.hidden,
      focusReturned: document.activeElement === handle
    };
  })()`);
  invariant(interaction?.moved - interaction?.start === 16, "Works keyboard movement did not use the canonical 16px step.", interaction);
  invariant(interaction?.minimized && interaction?.restored && interaction?.focusReturned, "Works minimize/restore recovery failed.", interaction);
  record("Works desktop geometry and recovery", { geometry, interaction });

  await navigate(baseUrl, "/en/works/?motion=reduce", 1440, 900);
  const reduced = await evaluate(`(() => {
    const workspace = document.querySelector("[data-workspace-root]");
    const handle = document.querySelector("[data-window-handle]");
    const windowItem = document.querySelector("[data-workspace-window]");
    return {
      listMode: workspace?.classList.contains("is-list-mode"),
      handleDisabled: handle instanceof HTMLButtonElement ? handle.disabled : null,
      transitionDuration: windowItem ? getComputedStyle(windowItem).transitionDuration : null
    };
  })()`);
  invariant(reduced.listMode && reduced.handleDisabled && reduced.transitionDuration.split(",").every((value) => value.trim() === "0s"), "Query-parameter reduced motion is not fully static.", reduced);

  await navigate(baseUrl, "/ja/works/", 390, 844);
  const mobile = await evaluate(`(() => ({
    listMode: document.querySelector("[data-workspace-root]")?.classList.contains("is-list-mode"),
    disabledHandles: Array.from(document.querySelectorAll("[data-window-handle]")).every((handle) => handle.disabled && handle.tabIndex === -1),
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    criticalText: Array.from(document.querySelectorAll(".v3-works-intro h1, .v3-works-intro > div:last-child > p")).map((element) => {
      const rect = element.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(element);
      const textRect = range.getBoundingClientRect();
      return {
        text: element.textContent?.trim(),
        elementOverflow: element.scrollWidth - element.clientWidth,
        insideViewport: rect.left >= -1 && rect.right <= innerWidth + 1,
        textInsideViewport: textRect.left >= -1 && textRect.right <= innerWidth + 1
      };
    })
  }))()`);
  invariant(mobile.listMode && mobile.disabledHandles && mobile.overflow <= 1, "Mobile Works ordered fallback failed.", mobile);
  invariant(
    mobile.criticalText.every((item) => item.elementOverflow <= 1 && item.insideViewport && item.textInsideViewport),
    "Mobile Works text is clipped rather than reflowed.",
    mobile
  );
  record("Works reduced-motion and mobile", { reduced, mobile });
}

async function auditTypographyAndViewports(baseUrl) {
  await navigate(baseUrl, "/en/works/wake-up/", 1440, 900);
  const latin = await evaluate(`(() => {
    const heading = document.querySelector(".wake-record-intro h1");
    if (!(heading instanceof HTMLElement)) return null;
    const style = getComputedStyle(heading);
    return {
      words: Array.from(heading.querySelectorAll(".wake-record-intro__title-word")).map((word) => word.textContent?.trim()),
      trackingRatio: Number.parseFloat(style.letterSpacing) / Number.parseFloat(style.fontSize)
    };
  })()`);
  invariant(
    latin?.words.map((word) => word?.toUpperCase()).join(" / ") === "WAKE / UP",
    "Wake Up does not expose semantic WAKE / UP word spans.",
    latin
  );
  invariant(Math.abs(latin.trackingRatio - -0.03) < 0.004, "Wake Up Latin tracking is not the restrained -0.03em contract.", latin);

  const viewportEvidence = [];
  for (const width of [320, 390]) {
    for (const lang of languages) {
      for (const path of [`/${lang}/`, `/${lang}/works/`, `/${lang}/works/wake-up/`, `/${lang}/about/`]) {
        await navigate(baseUrl, path, width, width === 320 ? 720 : 844);
        const state = await evaluate(`(() => {
          const heading = document.querySelector(".wake-record-intro h1");
          const aboutHeading = document.querySelector(".about-page .page-hero h1");
          const worksHeading = document.querySelector(".v3-works-intro h1");
          const header = document.querySelector(".site-header");
          const critical = [aboutHeading, worksHeading].filter((element) => element instanceof HTMLElement).map((element) => {
            const rect = element.getBoundingClientRect();
            const range = document.createRange();
            range.selectNodeContents(element);
            const textRect = range.getBoundingClientRect();
            return {
              text: element.textContent?.trim(),
              elementOverflow: element.scrollWidth - element.clientWidth,
              insideViewport: rect.left >= -1 && rect.right <= innerWidth + 1,
              textInsideViewport: textRect.left >= -1 && textRect.right <= innerWidth + 1
            };
          });
          return {
            lang: document.documentElement.lang,
            path: ${JSON.stringify(path)},
            overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
            headerOverflow: header ? header.scrollWidth - header.clientWidth : 0,
            wakeTracking: heading ? getComputedStyle(heading).letterSpacing : null,
            aboutTracking: aboutHeading ? getComputedStyle(aboutHeading).letterSpacing : null,
            critical
          };
        })()`);
        invariant(state.overflow <= 1 && state.headerOverflow <= 1, "A multilingual narrow viewport has horizontal overflow.", { width, ...state });
        invariant(
          state.critical.every((item) => item.elementOverflow <= 1 && item.insideViewport && item.textInsideViewport),
          "A critical narrow-viewport heading is clipped rather than reflowed.",
          { width, ...state }
        );
        if (path.endsWith("/wake-up/") && lang !== "en") {
          invariant(state.wakeTracking === "normal" || Math.abs(Number.parseFloat(state.wakeTracking)) < 0.01, "CJK Wake Up heading has non-zero tracking.", { width, ...state });
        }
        if (path.endsWith("/about/") && lang !== "en") {
          invariant(state.aboutTracking === "normal" || Math.abs(Number.parseFloat(state.aboutTracking)) < 0.01, "CJK About heading has non-zero tracking.", { width, ...state });
        }
        viewportEvidence.push({ width, ...state });
      }
    }
  }
  record("Wake Up typography and multilingual narrow viewports", { latin, viewportEvidence });
}

async function auditCoursework(baseUrl) {
  await navigate(baseUrl, "/en/works/university-coursework/", 1440, 900);
  const content = await evaluate(`(() => ({
    groups: Object.fromEntries(Array.from(document.querySelectorAll("[data-coursework-section]")).map((section) => [
      section.dataset.courseworkGroup,
      section.querySelectorAll("[data-coursework-window]").length
    ])),
    videos: Array.from(document.querySelectorAll("video[data-coursework-video]")).map((video) => video.querySelector("source")?.getAttribute("src"))
  }))()`);
  invariant(
    content.groups.blender === 10 && content.groups.maya === 2 && content.groups["ae-pr"] === 2,
    "Coursework media escaped its canonical 10/2/2 grouping.",
    content
  );
  invariant(content.videos.length === 5, "Coursework does not expose all five approved videos.", content);

  const playback = await evaluate(`(async () => {
    const results = [];
    for (const video of document.querySelectorAll("video[data-coursework-video]")) {
      video.load();
      await new Promise((resolveReady) => {
        if (video.readyState >= 2 || video.error) return resolveReady();
        const finish = () => {
          video.removeEventListener("loadeddata", finish);
          video.removeEventListener("error", finish);
          resolveReady();
        };
        video.addEventListener("loadeddata", finish, { once: true });
        video.addEventListener("error", finish, { once: true });
        setTimeout(finish, 8000);
      });
      let playError = null;
      try {
        await video.play();
        await new Promise((resolveDelay) => setTimeout(resolveDelay, 260));
      } catch (error) {
        playError = error instanceof Error ? error.message : String(error);
      }
      results.push({
        src: video.querySelector("source")?.getAttribute("src"),
        readyState: video.readyState,
        currentTime: video.currentTime,
        mediaError: video.error?.code ?? null,
        playError
      });
      video.pause();
    }
    return results;
  })()`);
  invariant(playback.every((video) => video.readyState >= 2 && video.currentTime > 0 && !video.mediaError && !video.playError), "One or more Coursework videos failed real browser playback.", playback);
  record("Coursework grouping and five-video playback", { content, playback });
}

async function main() {
  if (process.env.CIBA_BROWSER_SKIP_BUILD !== "1") {
    await runProcess(npmCommand, ["run", "build"], "Production build");
  }

  const externalBaseUrl = process.env.CIBA_BROWSER_BASE_URL;
  let baseUrl = null;
  if (externalBaseUrl) {
    baseUrl = externalBaseUrl.replace(/\/$/, "");
    await waitForHttp(`${baseUrl}/en/`, 20_000, "External preview server");
  }

  const chromePath = findChrome();
  chromeProcess = spawn(chromePath, [
    "--headless=new",
    "--remote-debugging-pipe=JSON",
    "--no-startup-window",
    "--enable-automation",
    "--disable-gpu",
    "--disable-background-networking",
    "--disable-component-update",
    "--disable-default-apps",
    "--disable-extensions",
    "--disable-sync",
    "--no-first-run",
    "--no-default-browser-check",
    "--allow-file-access-from-files",
    "--autoplay-policy=no-user-gesture-required",
    `--user-data-dir=${join(tmpdir(), `ciba-browser-audit-${process.pid}`)}`,
    "--window-size=1440,900"
  ], { stdio: ["ignore", "ignore", "pipe", "pipe", "pipe"] });
  chromeProcess.stderr.on("data", (chunk) => chromeLog.push(String(chunk)));
  invariant(chromeProcess.stdio[3] && chromeProcess.stdio[4], `Chrome debugging pipes were not created.\n${chromeLog.join("")}`);
  cdp = new CdpClient(chromeProcess.stdio[3], chromeProcess.stdio[4]);
  await cdp.open();
  const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" }, { browser: true });
  const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true }, { browser: true });
  cdp.setSession(sessionId);
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Log.enable");
  cdp.on("Runtime.exceptionThrown", (event) => browserErrors.push({ type: "exception", text: event.exceptionDetails?.text }));
  cdp.on("Runtime.consoleAPICalled", (event) => {
    if (event.type === "error" || event.type === "warning") {
      browserErrors.push({ type: event.type, text: event.args?.map((item) => item.value ?? item.description).join(" ") });
    }
  });
  cdp.on("Log.entryAdded", ({ entry }) => {
    if (entry.level === "error" || entry.level === "warning") {
      browserErrors.push({ type: entry.level, text: entry.text, url: entry.url });
    }
  });

  await auditHome(baseUrl);
  await auditWorks(baseUrl);
  await auditTypographyAndViewports(baseUrl);
  await auditCoursework(baseUrl);
  invariant(browserErrors.length === 0, "Browser console or runtime errors were recorded.", browserErrors);
  record("Browser console", { warningsAndErrors: browserErrors.length });

  console.log(`CIBA browser audit passed (${evidence.length} evidence groups).`);
  console.log(JSON.stringify(evidence, null, 2));
}

try {
  await main();
} catch (error) {
  if (chromeLog.length > 0) console.error(`Chrome log:\n${chromeLog.join("")}`);
  throw error;
} finally {
  try {
    await cdp?.send("Browser.close", {}, { browser: true });
  } catch {
    cdp?.close();
  }
  chromeProcess?.kill("SIGTERM");
}
