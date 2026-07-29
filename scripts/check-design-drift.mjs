import { existsSync, readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (path) => JSON.parse(readFileSync(join(root, path), "utf8"));
const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const failures = [];

const canonical = readJson("src/content/art-direction.json");
const handoff = readJson("figma-export/design-tokens.json");
const courseworkProject = readJson("src/content/projects/university-coursework.json");
const xWheelProject = readJson("src/content/projects/x-wheel.json");
const pluginCode = readFileSync(join(root, "figma-export/figma-plugin/code.js"), "utf8");
const motionCode = readFileSync(join(root, "src/scripts/portfolio-motion.ts"), "utf8");
const artCss = readFileSync(join(root, "src/styles/ciba-v3.css"), "utf8");

const pluginColorBlock = pluginCode.match(/const colors = \{([\s\S]*?)\};/);
const pluginWorkspaceBlock = pluginCode.match(/const workspace = (\{[\s\S]*?\n\});\n\nconst handoffFacts/);
const pluginHandoffBlock = pluginCode.match(/const handoffFacts = (\{[\s\S]*?\n\});\n\nconst projects/);
const pluginProjectsBlock = pluginCode.match(/const projects = \[([\s\S]*?)\n\];\n\nconst regular/);
const pluginCourseworkBlock = pluginCode.match(/const courseworkSections = (\[[\s\S]*?\n\]);\n\nfunction rgb/);

if (!pluginColorBlock || !pluginWorkspaceBlock || !pluginHandoffBlock || !pluginProjectsBlock || !pluginCourseworkBlock) {
  throw new Error("Could not find canonical snapshot blocks in the Figma plugin.");
}

const pluginColors = Object.fromEntries(
  [...pluginColorBlock[1].matchAll(/(\w+):\s*"(#[0-9a-fA-F]{6})"/g)].map((match) => [match[1], match[2].toLowerCase()])
);
const pluginWorkspace = Function(`"use strict"; return (${pluginWorkspaceBlock[1]});`)();
const pluginHandoffFacts = Function(`"use strict"; return (${pluginHandoffBlock[1]});`)();
const pluginCourseworkSections = Function(`"use strict"; return (${pluginCourseworkBlock[1]});`)();
const pluginProjects = [...pluginProjectsBlock[1].matchAll(/\{\s*slug:\s*"([^"]+)"([\s\S]*?)\n\s*\}/g)].map((match) => {
  const block = match[2];
  const field = (name) => block.match(new RegExp(`${name}:\\s*"([^"]*)"`))?.[1];
  return {
    slug: match[1],
    index: field("index"),
    title: field("title"),
    medium: field("medium"),
    year: field("year"),
    status: field("status"),
    summary: field("summary")
  };
});

const handoffColorFor = (key) => (key === "muted" ? handoff.colors.fog : handoff.colors[key]);
const pluginColorFor = (key) => pluginColors[key === "muted" ? "fog" : key];

for (const key of Object.keys(canonical.colors)) {
  const expected = canonical.colors[key].toLowerCase();
  const handoffValue = handoffColorFor(key)?.toLowerCase();
  const pluginValue = pluginColorFor(key);

  if (handoffValue !== expected) failures.push(`design-tokens colors.${key}: expected ${expected}, received ${handoffValue}`);
  if (pluginValue !== expected) failures.push(`Figma plugin colors.${key}: expected ${expected}, received ${pluginValue}`);
}

if (!same(handoff.typography.canonical, canonical.typography)) {
  failures.push("design-tokens typography.canonical does not match canonical typography");
}

if (!same(handoff.motion.tokens, canonical.motion)) {
  failures.push("design-tokens motion.tokens does not match canonical motion");
}

const handoffWorkspace = {
  breakpoint: handoff.worksWindowSystem.breakpoint,
  stageHeight: handoff.worksWindowSystem.stageHeight,
  positions: handoff.worksWindowSystem.positions
};

if (!same(handoffWorkspace, canonical.workspace)) {
  failures.push("design-tokens Works breakpoint, stage height, or authored positions drifted from canonical workspace");
}

if (!same(pluginWorkspace, canonical.workspace)) {
  failures.push("Figma plugin workspace snapshot drifted from canonical workspace");
}

const projectDirectory = join(root, "src/content/projects");
const canonicalProjects = readdirSync(projectDirectory)
  .filter((name) => name.endsWith(".json"))
  .map((name) => JSON.parse(readFileSync(join(projectDirectory, name), "utf8")))
  .filter((project) => project.published !== false)
  .sort((a, b) => a.priority - b.priority || a.year.localeCompare(b.year))
  .map((project, index) => ({
    slug: project.slug,
    index: String(index + 1).padStart(2, "0"),
    title: project.i18n.en.title,
    medium: project.medium,
    year: project.year,
    status: project.status,
    summary: project.i18n.en.summary
  }));

if (handoff.worksWindowSystem.projectCount !== canonicalProjects.length) {
  failures.push(`design-tokens projectCount: expected ${canonicalProjects.length}, received ${handoff.worksWindowSystem.projectCount}`);
}

if (!same(pluginProjects, canonicalProjects)) {
  failures.push("Figma plugin project order/facts drifted from src/content/projects/*.json");
}

const expectedHandoffFacts = {
  homeIncludesProjectStage: true,
  homeProjectCount: canonicalProjects.length,
  homeXWheelMediaSources: xWheelProject.media
    .filter((media) => media.homeOrder !== undefined)
    .sort((a, b) => a.homeOrder - b.homeOrder)
    .map((media) => media.src),
  worksFilters: ["ALL", "FEATURED", "ARCHIVE"],
  worksLayouts: ["WINDOWS", "ORDER", "RESET"],
  worksVisibleCount: `${String(canonicalProjects.length).padStart(2, "0")} / ${String(canonicalProjects.length).padStart(2, "0")}`,
  mobileHeaderHeight: 62,
  focusOutlineWidth: 3
};

if (!same(handoff.handoffFacts, expectedHandoffFacts)) {
  failures.push("design-tokens handoffFacts drifted from the accepted Home/Works/header/focus structure");
}

if (!same(pluginHandoffFacts, expectedHandoffFacts)) {
  failures.push("Figma plugin handoffFacts drifted from the accepted Home/Works/header/focus structure");
}

const groupOrder = ["blender", "maya", "ae-pr"];
const courseworkSectionTitles = {
  blender: "BLENDER",
  maya: "MAYA",
  "ae-pr": "AFTER EFFECTS / PREMIERE PRO"
};
const expectedCourseworkSections = Object.fromEntries(
  groupOrder.map((group) => {
    const media = courseworkProject.media.filter((item) => item.group === group);
    return [
      group,
      {
        itemCount: media.length,
        imageCount: media.filter((item) => item.type === "image").length,
        videoCount: media.filter((item) => item.type === "video").length
      }
    ];
  })
);
const expectedPluginCourseworkSections = groupOrder.map((group, groupIndex) => {
  const media = courseworkProject.media.filter((item) => item.group === group);
  return {
    slug: group,
    index: String(groupIndex + 1).padStart(2, "0"),
    title: courseworkSectionTitles[group],
    count: media.length,
    items: media.map((item, itemIndex) => ({
      code: `${String(groupIndex + 1).padStart(2, "0")}.${String(itemIndex + 1).padStart(2, "0")}`,
      title: item.caption.en,
      type: item.type.toUpperCase(),
      src: item.src,
      x: item.window.x,
      y: item.window.y,
      w: item.window.w,
      z: item.window.z
    }))
  };
});
const tokenCoursework = handoff.courseworkDesktopSystem;

if (
  courseworkProject.pageMode !== "coursework-desktop" ||
  tokenCoursework?.frameName !== "07 Coursework / Three Desktop Sections" ||
  tokenCoursework?.canonicalSource !== "src/content/projects/university-coursework.json" ||
  tokenCoursework?.sectionCount !== groupOrder.length ||
  tokenCoursework?.mediaWindowCount !== courseworkProject.media.length
) {
  failures.push(
    "design-tokens coursework source, frame, section count, media count, or project mode drifted from canonical content"
  );
}

if (!same(pluginCourseworkSections, expectedPluginCourseworkSections)) {
  failures.push(
    "Figma coursework identities, captions, types, source paths, positions, widths, or z-order drifted from the canonical project media"
  );
}

for (const group of groupOrder) {
  const tokenGroup = tokenCoursework?.sections?.[group];
  const expected = expectedCourseworkSections[group];
  const pluginGroup = pluginCourseworkSections.find((section) => section.slug === group);
  const pluginCounts = pluginGroup
    ? {
        itemCount: pluginGroup.items.length,
        imageCount: pluginGroup.items.filter((item) => item.type === "IMAGE").length,
        videoCount: pluginGroup.items.filter((item) => item.type === "VIDEO").length
      }
    : null;

  if (
    !tokenGroup ||
    !pluginGroup ||
    tokenGroup.itemCount !== expected.itemCount ||
    tokenGroup.imageCount !== expected.imageCount ||
    tokenGroup.videoCount !== expected.videoCount ||
    pluginGroup.count !== expected.itemCount ||
    !same(pluginCounts, expected)
  ) {
    failures.push(`Figma coursework ${group} counts drifted from the canonical project media`);
  }
}

for (const marker of [
  "function addHomeProjectStage",
  "Home project stage / current work",
  "handoffFacts.homeXWheelMediaSources.map",
  "Low-opacity draggable media ${String(index + 1).padStart",
  "return setImageFill(media, src, \"FIT\")",
  "Filter / ALL / active",
  "Filter / FEATURED",
  "Filter / ARCHIVE",
  "Layout / WINDOWS / active",
  "Visible project status",
  "Focus outline / 3px acid / 3px offset",
  "focusRing.strokeWeight = handoffFacts.focusOutlineWidth",
  "function courseworkHandoff",
  "function courseworkSectionWindow",
  "function courseworkMediaWindow",
  "07 Coursework / Three Desktop Sections",
  "Bounded inner stage",
  "Title bar / drag handle / 44px website target",
  "Video play control marker"
]) {
  if (!pluginCode.includes(marker)) failures.push(`Figma plugin is missing structural marker: ${marker}`);
}

for (const syncMarker of [
  'const page = existingPage || figma.currentPage',
  "await figma.setCurrentPageAsync(page)",
  'const SYNC_ENDPOINT = "http://127.0.0.1:4767/snapshot"',
  "frames: generated.map(snapshotNode)",
  '"x-ciba-sync": "ciba-local-v1"'
]) {
  if (!pluginCode.includes(syncMarker)) failures.push(`Figma plugin is missing editable-sync marker: ${syncMarker}`);
}

for (const unsupportedMutation of ["figma.currentPage = page", "existingPage || figma.createPage()"]) {
  if (pluginCode.includes(unsupportedMutation)) {
    failures.push(`Figma plugin still contains unsupported or Starter-unsafe page mutation: ${unsupportedMutation}`);
  }
}

for (const removedHomeLabel of ["ARTIST ARCHIVE / TOKYO", "DIGITAL PORTFOLIO / 2026"]) {
  if (pluginCode.includes(removedHomeLabel)) failures.push(`Figma plugin still contains removed Home label: ${removedHomeLabel}`);
}

const pluginFrames = [...pluginCode.matchAll(
  /const f = frame\("([^"]+)",\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+)/g
)].map((match) => ({
  name: match[1],
  x: Number(match[2]),
  y: Number(match[3]),
  width: Number(match[4]),
  height: Number(match[5])
}));

if (pluginFrames.length !== 7) {
  failures.push(`Figma plugin must expose seven literal top-level frame geometries; received ${pluginFrames.length}`);
}

for (let index = 0; index < pluginFrames.length; index += 1) {
  for (let compare = index + 1; compare < pluginFrames.length; compare += 1) {
    const left = pluginFrames[index];
    const right = pluginFrames[compare];
    const intersects =
      left.x < right.x + right.width &&
      left.x + left.width > right.x &&
      left.y < right.y + right.height &&
      left.y + left.height > right.y;
    if (intersects) failures.push(`Figma top-level frames overlap: ${left.name} <> ${right.name}`);
  }
}

for (const directory of ["figma-export/screenshots", "docs/design-references"]) {
  const path = join(root, directory);
  const pngs = existsSync(path) ? readdirSync(path).filter((name) => name.toLowerCase().endsWith(".png")) : [];
  if (pngs.length > 0) failures.push(`${directory} contains stale live-handoff PNG captures: ${pngs.join(", ")}`);
}

const mobileBoundary = canonical.workspace.breakpoint - 1;
if (!artCss.includes(`@media (max-width: ${mobileBoundary}px)`)) {
  failures.push(`art-direction.css is missing canonical ${mobileBoundary}px mobile boundary`);
}

if (!artCss.includes(`--workspace-height, ${canonical.workspace.stageHeight}px`)) {
  failures.push("art-direction.css workspace-height fallback drifted from canonical stage height");
}

if (!motionCode.includes("const workspaceTokens = artDirection.workspace") || !motionCode.includes("workspaceTokens.breakpoint")) {
  failures.push("portfolio-motion.ts must derive its desktop breakpoint from artDirection.workspace.breakpoint");
}

for (const variable of ["--art-motion-micro", "--art-motion-state", "--art-motion-title"]) {
  if (!artCss.includes(`var(${variable}`)) {
    failures.push(`ciba-v3.css must consume canonical ${variable}`);
  }
}

if (failures.length > 0) {
  console.error("Design drift detected:\n- " + failures.join("\n- "));
  process.exitCode = 1;
} else {
  console.log("CIBA canonical source matches website motion, CSS boundary, Figma structure/tokens, workspace layout, captures policy, and all project facts.");
}
