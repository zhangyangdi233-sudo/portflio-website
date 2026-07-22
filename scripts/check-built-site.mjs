import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const failures = [];
const languages = ["zh", "en", "ja"];
const publicSlugs = ["x-wheel", "emida", "wake-up", "escape-project"];
const privateSlugs = ["soft-boundaries", "residual-garden", "signal-room", "threshold-archive"];
const allowedPublicFiles = [
  "assets/projects/emida/emida-doctor.webp",
  "assets/projects/escape-project/escape-gate.webp",
  "assets/projects/escape-project/escape-loop.webp",
  "assets/projects/escape-project/escape-space.webp",
  "assets/projects/wake-up/bed-alarm.png",
  "assets/projects/wake-up/flooded-title.jpg",
  "assets/projects/x-wheel/crt-tv.png",
  "assets/projects/x-wheel/emi-room.png",
  "assets/projects/x-wheel/poster.png",
  "assets/projects/x-wheel/psx-console.png"
].sort();
const checkedPaths = new Set();
const publicProjectRecords = publicSlugs.map((slug) =>
  JSON.parse(readFileSync(join(root, "src", "content", "projects", `${slug}.json`), "utf8"))
);
const mediaFocusCopy = {
  zh: "聚焦时显示图像原色",
  en: "Focus to reveal the image in source colour",
  ja: "フォーカスすると画像を元の色で表示"
};

const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const readBuilt = (...segments) => {
  const path = join(dist, ...segments);
  check(existsSync(path), `missing built route: ${segments.join("/")}`);
  if (!existsSync(path)) return "";
  const source = readFileSync(path, "utf8");

  if (!checkedPaths.has(path)) {
    checkedPaths.add(path);
    const ids = [...source.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
    check(duplicateIds.length === 0, `${segments.join("/")} has duplicate ids: ${[...new Set(duplicateIds)].join(", ")}`);

    for (const image of source.match(/<img\b[^>]*>/g) ?? []) {
      check(/\salt="[^"]*"/.test(image), `${segments.join("/")} contains an image without alt text`);
      check(/\swidth="\d+"/.test(image) && /\sheight="\d+"/.test(image), `${segments.join("/")} contains an image without intrinsic dimensions`);
    }
  }

  return source;
};

const count = (source, token) => source.split(token).length - 1;
const localize = (value, lang) => Array.isArray(value) || typeof value === "string" ? value : value?.[lang] ?? value?.en;
const htmlEscape = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const listHtml = (directory) => {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? listHtml(path) : entry.name.endsWith(".html") ? [path] : [];
  });
};

const listFiles = (directory) => {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? listFiles(path) : [path];
  });
};

const relativeFiles = (directory) =>
  listFiles(directory)
    .map((path) => relative(directory, path).split("\\").join("/"))
    .sort();

check(existsSync(dist), "dist is missing; run npm run build before npm run check:built");

const publicDirectory = join(root, "public");
const deployedAssetDirectory = join(dist, "assets");
check(
  JSON.stringify(relativeFiles(publicDirectory)) === JSON.stringify(allowedPublicFiles),
  `public/ must contain only approved deployable files; received ${relativeFiles(publicDirectory).join(", ")}`
);
check(
  JSON.stringify(relativeFiles(deployedAssetDirectory).map((path) => `assets/${path}`)) === JSON.stringify(allowedPublicFiles),
  `dist/assets must match the approved public allowlist; received ${relativeFiles(deployedAssetDirectory).join(", ")}`
);
check(relativeFiles(join(dist, "downloads")).length === 0, "dist/downloads must not publish placeholder documents");

for (const lang of languages) {
  const home = readBuilt(lang, "index.html");
  const works = readBuilt(lang, "works", "index.html");

  check(home.includes('class="ciba-v3 home-page ciba-home-v3"'), `${lang} home is missing the isolated CIBA V3 body`);
  check(home.includes(`<html lang="${lang}"`), `${lang} home has the wrong document language`);
  check(home.includes('class="skip-link" href="#content"'), `${lang} home is missing the skip link`);
  check(count(home, "data-v3-cinema-layer") === 4, `${lang} home must render exactly four cinematic work layers`);
  check(count(home, "data-v3-cinema-trigger") === 4, `${lang} home must render exactly four scroll triggers`);
  check(count(home, 'aria-describedby="v3-media-instruction"') >= 4, `${lang} home media must expose keyboard-drag instructions`);
  check(count(works, "data-workspace-window") === 4, `${lang} Works must render exactly four project windows`);
  check(count(works, "data-window-handle") === 4, `${lang} Works must render exactly four keyboard drag handles`);
  check(
    count(works, 'data-window-handle disabled tabindex="-1" aria-hidden="true"') === 4,
    `${lang} Works drag handles must be progressively enabled only by desktop enhancement`
  );
  check(count(works, '<h2 class="sr-only"') === 4, `${lang} Works must retain four semantic project headings`);
  check(count(works, "data-window-restore") === 4, `${lang} Works must render exactly four dock controls`);

  for (const slug of publicSlugs) {
    check(home.includes(`/${lang}/works/${slug}/`), `${lang} home is missing the ${slug} route`);
    check(works.includes(`data-slug="${slug}"`), `${lang} Works is missing the ${slug} window`);
    const detail = readBuilt(lang, "works", slug, "index.html");
    const project = publicProjectRecords.find((record) => record.slug === slug);

    if (project.pageMode !== "wake-up-replica") {
      check(
        count(detail, "data-project-media-focus") === project.media.length,
        `${lang}/${slug} must expose one focusable colour-reveal target per media item`
      );
      check(
        count(detail, 'data-project-media-focus tabindex="0"') === project.media.length,
        `${lang}/${slug} media colour-reveal targets must be keyboard focusable`
      );
      check(detail.includes(mediaFocusCopy[lang]), `${lang}/${slug} is missing the localized media-focus instruction`);
    }

    for (const media of project.media) {
      const alt = localize(media.alt, lang);
      check(detail.includes(`alt="${htmlEscape(alt)}"`), `${lang}/${slug} is missing its localized alt text: ${alt}`);
      if (media.caption) {
        const caption = localize(media.caption, lang);
        check(detail.includes(htmlEscape(caption)), `${lang}/${slug} is missing its localized caption: ${caption}`);
      }
    }

    for (const tag of localize(project.tags, lang)) {
      check(detail.includes(htmlEscape(tag)), `${lang}/${slug} is missing localized tag: ${tag}`);
    }

    if (project.details) {
      for (const value of Object.values(project.details).flatMap((item) => {
        const localized = localize(item, lang);
        return Array.isArray(localized) ? localized : localized ? [localized] : [];
      })) {
        check(detail.includes(htmlEscape(value)), `${lang}/${slug} is missing localized evidence detail: ${value}`);
      }
    }
  }

  for (const slug of privateSlugs) {
    check(!home.includes(`/${lang}/works/${slug}/`), `${lang} home publishes placeholder ${slug}`);
    check(!works.includes(`data-slug="${slug}"`), `${lang} Works publishes placeholder ${slug}`);
    check(!existsSync(join(dist, lang, "works", slug)), `${lang} generated a public placeholder route for ${slug}`);
  }

  const wake = readBuilt(lang, "works", "wake-up", "index.html");
  const wakeMedia = [...wake.matchAll(/\/assets\/projects\/wake-up\/[^"'\s<]+/g)]
    .map((match) => match[0])
    .filter((value, index, values) => values.indexOf(value) === index)
    .sort();
  check(
    JSON.stringify(wakeMedia) === JSON.stringify([
      "/assets/projects/wake-up/bed-alarm.png",
      "/assets/projects/wake-up/flooded-title.jpg"
    ]),
    `${lang} Wake Up output must contain only the two approved public images; received ${wakeMedia.join(", ")}`
  );
}

check(listHtml(dist).length === 22, `expected 22 generated HTML pages, received ${listHtml(dist).length}`);

if (failures.length > 0) {
  console.error("Built-site contract failed:\n- " + failures.join("\n- "));
  process.exitCode = 1;
} else {
  console.log("Built-site contract passed: 22 pages, 3 languages, 4 public works, and 2 Wake Up images.");
}
