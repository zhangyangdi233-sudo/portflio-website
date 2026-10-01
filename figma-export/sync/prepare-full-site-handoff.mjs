import { readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Prepares local inventory only. It does not open a browser or write to Figma.
const directory = dirname(fileURLToPath(import.meta.url));
const root = resolve(directory, "../..");
const projectDirectory = resolve(root, "src/content/projects");
const filenames = (await readdir(projectDirectory)).filter((name) => name.endsWith(".json"));
const projects = (await Promise.all(filenames.map(async (name) =>
  JSON.parse(await readFile(resolve(projectDirectory, name), "utf8"))
))).filter((project) => project.published !== false)
  .sort((a, b) => a.priority - b.priority || a.year.localeCompare(b.year));

const locales = ["zh", "en", "ja"];
const viewports = [
  { name: "Desktop", width: 1440, height: 900 },
  { name: "Mobile", width: 390, height: 844 }
];
const routes = [
  { key: "home", suffix: "/", titles: { zh: "首页", en: "Home", ja: "ホーム" } },
  { key: "works", suffix: "/works/", titles: { zh: "作品", en: "Works", ja: "作品" } },
  { key: "about", suffix: "/about/", titles: { zh: "关于", en: "About", ja: "プロフィール" } },
  ...projects.map((project) => ({
    key: project.slug,
    suffix: `/works/${project.slug}/`,
    titles: Object.fromEntries(locales.map((lang) => [lang, project.i18n[lang].title])),
    mediaCount: project.media.length,
    media: project.media.map((item) => ({
      src: item.src, type: item.type, alt: item.alt, caption: item.caption,
      ...(item.group ? { group: item.group } : {})
    }))
  }))
];
const baselineJaDesktop = {
  home: "28:2", about: "29:2", "wake-up": "30:2", works: "31:2",
  "x-wheel": "32:2", "university-coursework": "33:2"
};
const views = locales.flatMap((lang) => routes.flatMap((route, routeIndex) =>
  viewports.map((viewport) => {
    const existingNodeId = lang === "ja" && viewport.name === "Desktop"
      ? baselineJaDesktop[route.key] ?? null : null;
    return {
      key: `${lang}:${route.key}:${viewport.width}`,
      routeKey: route.key,
      route: `/${lang}${route.suffix}`,
      lang,
      title: route.titles[lang],
      frameName: `${String(routeIndex + 1).padStart(2, "0")} / ${lang.toUpperCase()} / ${viewport.name} / ${route.titles[lang]}`,
      viewport,
      heightPolicy: "full-content-height",
      existingNodeId,
      method: existingNodeId ? "use_figma-update-preserved-copy" : "first-capture-then-use_figma",
      phase: "prepared-awaiting-visual-checkpoint"
    };
  })
));
const plan = {
  schemaVersion: 1,
  fileKey: "xyINqLy60s9MELHd2HmViK",
  pageId: "0:1",
  baselineNodeIdsToPreserve: ["28:2", "29:2", "30:2", "31:2", "32:2", "33:2", "34:2"],
  count: views.length,
  existingViewCount: views.filter((view) => view.existingNodeId).length,
  firstCaptureViewCount: views.filter((view) => !view.existingNodeId).length,
  contentRouteCount: routes.length * locales.length,
  rootRedirect: { path: "/", fallbackLocale: "en", separateDesignFrame: false },
  routeContent: routes,
  views,
  supplementalStates: {
    home: ["five active desktop chapters", "media colour hover/focus", "ordered reduced-motion composition"],
    works: ["all", "featured", "archive", "order", "active window", "minimized and restored", "keyboard focus"],
    "wake-up": ["image descriptions collapsed", "image descriptions expanded"],
    "university-coursework": ["three spatial stages", "source-order layout", "active media", "reset", "image and video"]
  },
  remoteFontConstraint: {
    checkedOn: "2026-09-28",
    existingFamilies: ["Helvetica Neue", "Menlo"],
    remoteLoadSucceeded: false,
    nextDecision: "Keep website fonts unchanged. Resolve exact local-font Figma execution or explicitly approve Figma-only substitutes before editing captured text."
  }
};

const output = resolve(directory, "full-site-handoff-plan.json");
await writeFile(output, `${JSON.stringify(plan, null, 2)}\n`);
console.log(`${views.length} editable views planned (${plan.existingViewCount} existing, ${plan.firstCaptureViewCount} first captures).`);
console.log(output);
