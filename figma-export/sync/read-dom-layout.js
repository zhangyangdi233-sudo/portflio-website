/**
 * Read-only browser-page function for the documented CUA evaluate surface.
 * Paste the function as the evaluate argument after selecting the intended tab.
 * No navigation, scrolling, style mutation, network fetch, or Figma write occurs.
 * Capture each route/locale/viewport and each needed UI state separately.
 */
async () => {
  await document.fonts.ready;
  const properties = [
    "display", "position", "z-index", "opacity", "visibility", "overflow-x", "overflow-y",
    "background-color", "background-image", "color", "box-shadow", "filter",
    "border-top-width", "border-top-color", "border-top-style",
    "border-right-width", "border-right-color", "border-right-style",
    "border-bottom-width", "border-bottom-color", "border-bottom-style",
    "border-left-width", "border-left-color", "border-left-style", "border-radius",
    "font-family", "font-size", "font-weight", "font-style", "font-kerning",
    "line-height", "letter-spacing", "text-transform", "text-align", "white-space",
    "padding-top", "padding-right", "padding-bottom", "padding-left",
    "margin-top", "margin-right", "margin-bottom", "margin-left",
    "gap", "row-gap", "column-gap", "grid-template-columns", "grid-template-rows",
    "flex-direction", "flex-wrap", "align-items", "justify-content", "order",
    "transform", "transform-origin", "object-fit", "object-position"
  ];
  const round = (value) => Math.round(value * 1000) / 1000;
  const rectangle = (rect) => ({
    x: round(rect.x + window.scrollX), y: round(rect.y + window.scrollY),
    width: round(rect.width), height: round(rect.height)
  });
  const styleValues = (style) => Object.fromEntries(properties.map((name) => [name, style.getPropertyValue(name)]));
  const cssPath = (element) => {
    if (element.id) return `#${CSS.escape(element.id)}`;
    const parts = [];
    for (let current = element; current && current !== document.documentElement; current = current.parentElement) {
      let part = current.tagName.toLowerCase();
      if (current.id) { parts.unshift(`#${CSS.escape(current.id)}`); break; }
      const siblings = current.parentElement ? [...current.parentElement.children].filter((node) => node.tagName === current.tagName) : [];
      if (siblings.length > 1) part += `:nth-of-type(${siblings.indexOf(current) + 1})`;
      parts.unshift(part);
    }
    return parts.join(" > ");
  };
  const nodes = [];
  const walk = (element, parentKey, inheritedHidden = false) => {
    if (["SCRIPT", "STYLE", "LINK", "META", "NOSCRIPT"].includes(element.tagName)) return;
    const key = cssPath(element);
    const style = getComputedStyle(element);
    const bounds = rectangle(element.getBoundingClientRect());
    const rendered = !inheritedHidden && style.display !== "none" && style.visibility !== "hidden";
    const record = {
      key, parentKey, tag: element.tagName.toLowerCase(),
      id: element.id, classes: [...element.classList], bounds,
      rendered, ariaHidden: element.getAttribute("aria-hidden"),
      attributes: Object.fromEntries([...element.attributes]
        .filter((attribute) => /^(?:data-|aria-)|^(?:href|role|lang|hidden|disabled|tabindex|open)$/.test(attribute.name))
        .map((attribute) => [attribute.name, attribute.value])),
      style: styleValues(style),
      directText: [...element.childNodes].flatMap((node, index) => {
        if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) return [];
        const range = document.createRange();
        range.selectNodeContents(node);
        return [{ index, text: node.textContent, boxes: [...range.getClientRects()].map(rectangle) }];
      }),
      pseudo: ["::before", "::after"].flatMap((selector) => {
        const pseudo = getComputedStyle(element, selector);
        return pseudo.content === "none" || pseudo.content === "normal" ? [] : [{ selector, content: pseudo.content, style: styleValues(pseudo) }];
      })
    };
    if (element.tagName === "IMG") record.image = {
      src: element.getAttribute("src"), currentSrc: element.currentSrc, alt: element.alt,
      naturalWidth: element.naturalWidth, naturalHeight: element.naturalHeight, complete: element.complete
    };
    if (element.tagName === "VIDEO") record.video = {
      src: element.getAttribute("src"), currentSrc: element.currentSrc, poster: element.poster,
      controls: element.controls, width: element.videoWidth, height: element.videoHeight,
      paused: element.paused, currentTime: element.currentTime
    };
    nodes.push(record);
    for (const child of element.children) walk(child, key, !rendered);
  };
  walk(document.body, null);
  return {
    schemaVersion: 1, url: location.href, title: document.title, lang: document.documentElement.lang,
    viewport: { width: window.innerWidth, height: window.innerHeight, devicePixelRatio: window.devicePixelRatio },
    document: { width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight },
    scroll: { x: window.scrollX, y: window.scrollY },
    fontsStatus: document.fonts.status,
    state: {
      activeWork: document.querySelector("[data-v3-cinema-layer].is-active")?.getAttribute("data-work-index") ?? null,
      workspaceLayout: document.querySelector("[data-workspace-root]")?.className ?? null,
      reducedMotion: document.documentElement.dataset.motion ?? null
    },
    nodeCount: nodes.length, nodes,
    limits: [
      "Computed font-family reports a fallback stack, not the exact glyph font used for every script.",
      "Bounding rectangles include CSS transforms; use transform and origin when mapping rotated content.",
      "Text boxes cover each direct text node's line rectangles; verify real wrapping against the browser screenshot.",
      "This snapshot reads the current UI state only. Hidden chapters require their own visible state snapshot.",
      "Native video controls and images remain distinct media, not reconstructed DOM content."
    ]
  };
}
