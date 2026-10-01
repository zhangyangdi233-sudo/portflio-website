import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (path) => JSON.parse(readFileSync(join(root, path), "utf8"));
const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const failures = [];

const canonical = readJson("src/content/art-direction.json");
const handoff = readJson("figma-export/design-tokens.json");
const pluginCode = readFileSync(join(root, "figma-export/figma-plugin/code.js"), "utf8");
const motionCode = readFileSync(join(root, "src/scripts/portfolio-motion.ts"), "utf8");
const artCss = readFileSync(join(root, "src/styles/art-direction.css"), "utf8");

const pluginColorBlock = pluginCode.match(/const colors = \{([\s\S]*?)\};/);
const pluginWorkspaceBlock = pluginCode.match(/const workspace = (\{[\s\S]*?\n\});\n\nconst projects/);
const pluginProjectsBlock = pluginCode.match(/const projects = \[([\s\S]*?)\n\];\n\nconst regular/);

if (!pluginColorBlock || !pluginWorkspaceBlock || !pluginProjectsBlock) {
  throw new Error("Could not find canonical snapshot blocks in the Figma plugin.");
}

const pluginColors = Object.fromEntries(
  [...pluginColorBlock[1].matchAll(/(\w+):\s*"(#[0-9a-fA-F]{6})"/g)].map((match) => [match[1], match[2].toLowerCase()])
);
const pluginWorkspace = Function(`"use strict"; return (${pluginWorkspaceBlock[1]});`)();
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

const mobileBoundary = canonical.workspace.breakpoint - 1;
if (!artCss.includes(`@media (max-width: ${mobileBoundary}px)`)) {
  failures.push(`art-direction.css is missing canonical ${mobileBoundary}px mobile boundary`);
}

if (!artCss.includes(`--workspace-height, ${canonical.workspace.stageHeight}px`)) {
  failures.push("art-direction.css workspace-height fallback drifted from canonical stage height");
}

if (
  !motionCode.includes("const workspaceTokens = artDirection.workspace") ||
  !motionCode.includes("workspaceTokens.breakpoint") ||
  motionCode.includes("(min-width: 900px)")
) {
  failures.push("portfolio-motion.ts must derive its desktop breakpoint from artDirection.workspace.breakpoint");
}

if (failures.length > 0) {
  console.error("Design drift detected:\n- " + failures.join("\n- "));
  process.exitCode = 1;
} else {
  console.log("CIBA canonical source matches website motion, CSS boundary, Figma tokens, workspace layout, and all project facts.");
}
