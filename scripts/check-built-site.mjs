import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const failures = [];
const languages = ["zh", "en", "ja"];
const publicSlugs = ["x-wheel", "emida", "wake-up", "escape-project", "university-coursework"];
const privateSlugs = ["soft-boundaries", "residual-garden", "signal-room", "threshold-archive"];
const EDGEONE_MAX_SINGLE_FILE_BYTES = 25 * 1024 * 1024;
const courseworkManifest = JSON.parse(
  readFileSync(join(root, "docs", "research", "university-coursework-media-manifest.json"), "utf8")
);
const courseworkDerivedFiles = courseworkManifest.items
  .filter((item) => item.kind === "image")
  .flatMap((item) => {
    const base = item.publicPath.replace(/\.(?:png|jpe?g)$/i, "");
    return [`${base}-480.webp`, `${base}-960.webp`];
  });
const courseworkImageSrcsets = new Map();
for (const item of courseworkManifest.items.filter((entry) => entry.kind === "image")) {
  const base = item.publicPath.replace(/\.(?:png|jpe?g)$/i, "");
  const candidates = [];
  for (const targetWidth of [480, 960]) {
    const publicPath = `${base}-${targetWidth}.webp`;
    const { width } = await sharp(join(root, "public", publicPath)).metadata();
    candidates.push(`/${publicPath} ${width}w`);
  }
  courseworkImageSrcsets.set(`/${item.publicPath}`, candidates.join(", "));
}
const allowedAssetFiles = [
  "assets/projects/emida/emida-board-cover.png",
  "assets/projects/emida/emida-board-endings.png",
  "assets/projects/emida/emida-board-gameplay.png",
  "assets/projects/emida/emida-board-system.png",
  "assets/projects/emida/emida-doctor.webp",
  "assets/projects/escape-project/escape-gate.webp",
  "assets/projects/escape-project/escape-loop.webp",
  "assets/projects/escape-project/escape-space.webp",
  "assets/projects/wake-up/bed-alarm.png",
  "assets/projects/wake-up/flooded-title.jpg",
  "assets/projects/x-wheel/aphasia-npc-01.png",
  "assets/projects/x-wheel/aphasia-npc-02.png",
  "assets/projects/x-wheel/aphasia-npc-03.png",
  "assets/projects/x-wheel/aphasia-npc-04.png",
  "assets/projects/x-wheel/aphasia-npc-05.png",
  "assets/projects/x-wheel/aphasia-plush.png",
  "assets/projects/x-wheel/aphasia-protagonist.png",
  "assets/projects/x-wheel/cartridge-3-geometry.png",
  "assets/projects/x-wheel/cartridge-3-title.png",
  "assets/projects/x-wheel/character-full.png",
  "assets/projects/x-wheel/character-portrait.png",
  "assets/projects/x-wheel/character-sequence.png",
  "assets/projects/x-wheel/crt-tv.png",
  "assets/projects/x-wheel/crt-character-composition.png",
  "assets/projects/x-wheel/emi-room.png",
  "assets/projects/x-wheel/poster.png",
  "assets/projects/x-wheel/psx-console.png",
  "assets/projects/x-wheel/signal-orb.png",
  ...courseworkManifest.items.map((item) => item.publicPath),
  ...courseworkDerivedFiles
].sort();
const allowedLicenseFiles = [
  "licenses/Noto-Sans-JP-Variable-OFL.txt",
  "licenses/Noto-Sans-SC-Variable-OFL.txt"
].sort();
const allowedPublicFiles = [...allowedAssetFiles, ...allowedLicenseFiles, "favicon.svg"].sort();
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
    check(
      !source.includes("mcp.figma.com/mcp/html-to-design/capture.js"),
      `${segments.join("/")} must not publish the development-only Figma capture bridge`
    );

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

const checkEdgeOneFileBudget = (directory, label) => {
  for (const path of listFiles(directory)) {
    const size = statSync(path).size;
    check(
      size < EDGEONE_MAX_SINGLE_FILE_BYTES,
      `${label}/${relative(directory, path).split("\\").join("/")} is ${(size / 1024 / 1024).toFixed(2)} MiB; EdgeOne requires every file to be below 25 MiB`
    );
  }
};

check(existsSync(dist), "dist is missing; run npm run build before npm run check:built");
check(existsSync(join(dist, "favicon.svg")), "dist is missing the approved CIBA favicon");

const publicDirectory = join(root, "public");
const deployedAssetDirectory = join(dist, "assets");
const deployedLicenseDirectory = join(dist, "licenses");
checkEdgeOneFileBudget(publicDirectory, "public");
checkEdgeOneFileBudget(dist, "dist");
check(
  JSON.stringify(relativeFiles(publicDirectory)) === JSON.stringify(allowedPublicFiles),
  `public/ must contain only approved deployable files; received ${relativeFiles(publicDirectory).join(", ")}`
);
check(
  JSON.stringify(relativeFiles(deployedAssetDirectory).map((path) => `assets/${path}`)) === JSON.stringify(allowedAssetFiles),
  `dist/assets must match the approved public allowlist; received ${relativeFiles(deployedAssetDirectory).join(", ")}`
);
check(
  JSON.stringify(relativeFiles(deployedLicenseDirectory).map((path) => `licenses/${path}`)) === JSON.stringify(allowedLicenseFiles),
  `dist/licenses must contain exactly the approved Noto SC and JP notices; received ${relativeFiles(deployedLicenseDirectory).join(", ")}`
);
check(relativeFiles(join(dist, "downloads")).length === 0, "dist/downloads must not publish placeholder documents");

for (const lang of languages) {
  const home = readBuilt(lang, "index.html");
  const works = readBuilt(lang, "works", "index.html");
  const about = readBuilt(lang, "about", "index.html");

  check(home.includes('class="ciba-v3 home-page ciba-home-v3"'), `${lang} home is missing the isolated CIBA V3 body`);
  check(home.includes(`<html lang="${lang}"`), `${lang} home has the wrong document language`);
  check(home.includes('class="skip-link" href="#content"'), `${lang} home is missing the skip link`);
  check(
    home.includes('href="mailto:mayonezu332@gmail.com"') && about.includes('href="mailto:mayonezu332@gmail.com"'),
    `${lang} home/About must expose the artist-confirmed public contact`
  );
  check(count(home, "data-v3-cinema-layer") === 5, `${lang} home must render exactly five cinematic work layers`);
  check(count(home, "data-v3-cinema-trigger") === 5, `${lang} home must render exactly five scroll triggers`);
  check(count(home, 'aria-describedby="v3-media-instruction"') >= 5, `${lang} home media must expose keyboard-drag instructions`);
  for (const source of ["character-full.png", "character-portrait.png", "character-sequence.png", "cartridge-3-title.png"]) {
    check(home.includes(`/assets/projects/x-wheel/${source}`), `${lang} home is missing X.WHEEL representative ${source}`);
  }
  for (const source of ["emi-room.png", "crt-tv.png", "psx-console.png", "poster.png"]) {
    check(!home.includes(`/assets/projects/x-wheel/${source}`), `${lang} home still renders retired X.WHEEL representative ${source}`);
  }
  check(count(works, "data-workspace-window") === 5, `${lang} Works must render exactly five project windows`);
  check(count(works, "data-window-handle") === 5, `${lang} Works must render exactly five keyboard drag handles`);
  check(
    count(works, 'data-window-handle disabled tabindex="-1" aria-hidden="true"') === 5,
    `${lang} Works drag handles must be progressively enabled only by desktop enhancement`
  );
  check(count(works, '<h2 class="sr-only"') === 5, `${lang} Works must retain five semantic project headings`);
  check(count(works, "data-window-restore") === 5, `${lang} Works must render exactly five dock controls`);

  for (const slug of publicSlugs) {
    check(home.includes(`/${lang}/works/${slug}/`), `${lang} home is missing the ${slug} route`);
    check(works.includes(`data-slug="${slug}"`), `${lang} Works is missing the ${slug} window`);
    const detail = readBuilt(lang, "works", slug, "index.html");
    const project = publicProjectRecords.find((record) => record.slug === slug);

    if (project.pageMode === "coursework-desktop") {
      check(count(detail, 'class="coursework-section"') === 3, `${lang}/${slug} must render three large coursework windows`);
      check(count(detail, "data-coursework-stage") === 3, `${lang}/${slug} must render three bounded coursework stages`);
      check(count(detail, "data-coursework-window") === 14, `${lang}/${slug} must render fourteen media windows`);
      check(count(detail, "data-coursework-handle") === 14, `${lang}/${slug} must render fourteen drag handles`);
      check(count(detail, "data-coursework-reset") === 3, `${lang}/${slug} must render three section reset controls`);
      check(count(detail, "data-coursework-video") === 5, `${lang}/${slug} must render five native video players`);
      check(count(detail, "coursework-section__description") === 3, `${lang}/${slug} must explain all three study groups`);
      check(
        count(detail, 'data-coursework-handle disabled tabindex="-1" aria-hidden="true"') === 14,
        `${lang}/${slug} drag handles must remain out of the static accessibility tree until enhanced`
      );
      check(
        count(detail, 'class="coursework-sr-only"') >= 15 && count(detail, " hidden>") >= 14,
        `${lang}/${slug} static output must hide spatial-only movement instructions`
      );
      check(
        count(detail, 'type="video/mp4"') === 5 && count(detail, 'preload="metadata"') === 5,
        `${lang}/${slug} videos must use typed MP4 sources and metadata-only preload`
      );
      check(count(detail, 'data-coursework-group="blender"') === 11, `${lang}/${slug} Blender group structure drifted`);
      check(count(detail, 'data-coursework-group="maya"') === 3, `${lang}/${slug} Maya group structure drifted`);
      check(count(detail, 'data-coursework-group="ae-pr"') === 3, `${lang}/${slug} AE / PR group structure drifted`);
      check(!detail.includes("<dd>—</dd>"), `${lang}/${slug} must not expose an inferred or placeholder coursework date`);
    } else if (project.pageMode !== "wake-up-replica") {
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
      if (media.type === "image") {
        check(detail.includes(`alt="${htmlEscape(alt)}"`), `${lang}/${slug} is missing its localized alt text: ${alt}`);
        if (project.pageMode === "coursework-desktop") {
          const expectedSrcset = courseworkImageSrcsets.get(media.src);
          check(
            detail.includes(`srcset="${expectedSrcset}"`),
            `${lang}/${slug} is missing responsive image sources for ${media.src}`
          );
        }
      } else {
        check(detail.includes(`aria-label="${htmlEscape(alt)}"`), `${lang}/${slug} is missing its localized video label: ${alt}`);
      }
      if (media.caption) {
        const caption = localize(media.caption, lang);
        check(detail.includes(htmlEscape(caption)), `${lang}/${slug} is missing its localized caption: ${caption}`);
      }
    }

    if (project.pageMode !== "coursework-desktop") {
      for (const tag of localize(project.tags, lang)) {
        check(detail.includes(htmlEscape(tag)), `${lang}/${slug} is missing localized tag: ${tag}`);
      }
    }

    if (project.details && project.pageMode !== "coursework-desktop") {
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
  const wakeTitleWords = [...wake.matchAll(/class="wake-record-intro__title-word"[^>]*>([^<]+)<\/span>/g)].map((match) => match[1]);
  check(
    JSON.stringify(wakeTitleWords) === JSON.stringify(["Wake", "Up"]),
    `${lang} Wake Up title must break between words so it fits the mobile viewport without reducing its size`
  );
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

check(listHtml(dist).length === 25, `expected 25 generated HTML pages, received ${listHtml(dist).length}`);

if (failures.length > 0) {
  console.error("Built-site contract failed:\n- " + failures.join("\n- "));
  process.exitCode = 1;
} else {
  console.log("Built-site contract passed: 25 pages, 3 languages, 5 public works, 18 APHASIA media items, 5 EMIDA media items, 14 coursework media items, and 2 Wake Up images.");
}
