const colors = {
  night: "#090a08",
  surface: "#090a08",
  ink: "#f4f0dd",
  plum: "#f4f0dd",
  oxide: "#c6ff00",
  cyan: "#c6ff00",
  sodium: "#f4f0dd",
  fog: "#f4f0dd",
  rule: "#f4f0dd"
};

const workspace = {
  breakpoint: 900,
  stageHeight: 980,
  positions: {
    "x-wheel": { x: 3, y: 72, width: 300, rotation: -0.4, z: 7 },
    emida: { x: 28, y: 42, width: 286, rotation: 0.3, z: 6 },
    "soft-boundaries": { x: 53, y: 86, width: 292, rotation: -0.25, z: 5 },
    "wake-up": { x: 8, y: 485, width: 305, rotation: 0.2, z: 4 },
    "residual-garden": { x: 34, y: 445, width: 278, rotation: -0.35, z: 3 },
    "signal-room": { x: 59, y: 492, width: 292, rotation: 0.3, z: 2 },
    "threshold-archive": { x: 76, y: 298, width: 252, rotation: -0.2, z: 1 }
  }
};

const projects = [
  {
    slug: "x-wheel",
    index: "01",
    title: "X.WHEEL",
    medium: "Interactive game, interface study, moving image",
    year: "2026",
    status: "Primary work",
    summary: "An interactive game work about loops, bodily response, and rules that never quite stay still.",
    color: colors.oxide,
    onColor: colors.night
  },
  {
    slug: "emida",
    index: "02",
    title: "EMIDA",
    medium: "Installation, image system, narrative interface",
    year: "2024",
    status: "Secondary focus",
    summary: "A second-focus project on image, memory, and the distance created by interfaces.",
    color: colors.ink,
    onColor: colors.night
  },
  {
    slug: "soft-boundaries",
    index: "03",
    title: "Soft Boundaries",
    medium: "Moving image, object study",
    year: "2023",
    status: "Selected work",
    summary: "A moving-image study of objects, skin, and the perception of borders.",
    color: colors.ink,
    onColor: colors.night
  },
  {
    slug: "wake-up",
    index: "04",
    title: "Wake Up",
    medium: "Web-based visual essay, image archive, scrolling composition",
    year: "2023",
    status: "Old-site replica",
    summary: "A recreated web visual essay from the old site, tracing awakening, city time, and the idea of an ordinary person.",
    color: colors.ink,
    onColor: colors.night
  },
  {
    slug: "residual-garden",
    index: "05",
    title: "Residual Garden",
    medium: "Digital garden, generative image notes",
    year: "2023",
    status: "Selected work",
    summary: "A digital garden of residual images, generative notes, and everyday observations.",
    color: colors.ink,
    onColor: colors.night
  },
  {
    slug: "signal-room",
    index: "06",
    title: "Signal Room",
    medium: "Soundless interface, screen study",
    year: "2022",
    status: "Selected work",
    summary: "An interface study using screens, delay, and silent signals as material.",
    color: colors.ink,
    onColor: colors.night
  },
  {
    slug: "threshold-archive",
    index: "07",
    title: "Threshold Archive",
    medium: "Web archive, still image sequence",
    year: "2021",
    status: "Selected work",
    summary: "An early archive project organized through web pages, still frames, and entry structures.",
    color: colors.ink,
    onColor: colors.night
  }
];

const regular = { family: "Inter", style: "Regular" };
const bold = { family: "Inter", style: "Bold" };
const black = bold;
const PAGE_NAME = "CIBA / Signal Index / Acid Proof";

function rgb(hex) {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.slice(0, 2), 16) / 255,
    g: parseInt(clean.slice(2, 4), 16) / 255,
    b: parseInt(clean.slice(4, 6), 16) / 255
  };
}

function solid(hex, opacity = 1) {
  return { type: "SOLID", color: rgb(hex), opacity };
}

function frame(name, x, y, w, h, fill = colors.night) {
  const node = figma.createFrame();
  node.name = name;
  node.x = x;
  node.y = y;
  node.resize(w, h);
  node.fills = [solid(fill)];
  node.clipsContent = true;
  node.setPluginData("cibaGenerated", "true");
  figma.currentPage.appendChild(node);
  return node;
}

function embeddedFrame(parent, name, x, y, w, h, fill = colors.surface, stroke = colors.plum) {
  const node = figma.createFrame();
  node.name = name;
  node.x = x;
  node.y = y;
  node.resize(w, h);
  node.fills = [solid(fill)];
  node.strokes = stroke ? [solid(stroke)] : [];
  node.strokeWeight = stroke ? 1 : 0;
  node.clipsContent = true;
  parent.appendChild(node);
  return node;
}

function rect(parent, name, x, y, w, h, fill, stroke, opacity = 1) {
  const node = figma.createRectangle();
  node.name = name;
  node.x = x;
  node.y = y;
  node.resize(w, h);
  node.fills = fill ? [solid(fill, opacity)] : [];
  node.strokes = stroke ? [solid(stroke)] : [];
  node.strokeWeight = stroke ? 1 : 0;
  parent.appendChild(node);
  return node;
}

function line(parent, name, x1, y1, x2, y2, color = colors.plum) {
  const node = figma.createRectangle();
  node.name = name;
  node.x = Math.min(x1, x2);
  node.y = Math.min(y1, y2);
  node.resize(Math.max(1, Math.abs(x2 - x1)), Math.max(1, Math.abs(y2 - y1)));
  node.fills = [solid(color)];
  node.strokes = [];
  parent.appendChild(node);
  return node;
}

function text(parent, name, value, x, y, w, size, font = regular, fill = colors.ink, lineHeight = 1.1) {
  const node = figma.createText();
  node.name = name;
  node.x = x;
  node.y = y;
  node.resize(w, size * 4);
  node.fontName = font;
  node.characters = value;
  node.fontSize = size;
  node.lineHeight = { value: size * lineHeight, unit: "PIXELS" };
  node.fills = [solid(fill)];
  parent.appendChild(node);
  return node;
}

function addHeader(parent, w, lang = "EN") {
  rect(parent, "Header line", 0, 64, w, 1, colors.plum);
  text(parent, "Brand / Chinese", "糍粑", 32, 24, 48, 14, bold);
  text(parent, "Brand / English", "CIBA", 70, 25, 48, 12, bold);
  text(parent, "Nav", "Works    About    Contact", w / 2 - 125, 25, 250, 13, regular, colors.fog);
  text(parent, "Languages", `中文    ${lang}    日本語`, w - 170, 25, 140, 12, regular, colors.fog);
}

function addMobileHeader(parent, w, lang = "EN") {
  rect(parent, "Mobile header line", 0, 80, w, 1, colors.plum);
  text(parent, "Brand / Chinese", "糍粑", 16, 16, 42, 14, bold);
  text(parent, "Brand / English", "CIBA", 54, 17, 44, 12, bold);
  text(parent, "Languages", `中    ${lang}    日`, w - 142, 17, 126, 11, regular, colors.fog);
  text(parent, "Mobile nav", "Works        About", 16, 50, 170, 12, regular, colors.fog);
}

function addSwissGrid(parent, w, h) {
  line(parent, "Grid vertical 1", w * 0.5, 64, w * 0.5, h);
  line(parent, "Grid vertical 2", w * 0.58, 64, w * 0.58, h);
  line(parent, "Grid horizontal 1", 0, h * 0.62, w, h * 0.62);
}

function addWheelGraphic(parent, x, y, w, h) {
  rect(parent, "X.WHEEL media field", x, y, w, h, colors.surface, colors.plum);
  const c = figma.createEllipse();
  c.name = "Wheel outer orbit";
  c.x = x + w * 0.18;
  c.y = y + h * 0.26;
  c.resize(w * 0.62, w * 0.62);
  c.fills = [];
  c.strokes = [solid(colors.cyan, 0.55)];
  c.strokeWeight = 2;
  parent.appendChild(c);
  const arcCount = 6;
  for (let i = 0; i < arcCount; i += 1) {
    const r = figma.createRectangle();
    r.name = `Wheel red segment ${i + 1}`;
    r.x = x + w * (0.34 + Math.cos(i) * 0.19);
    r.y = y + h * (0.45 + Math.sin(i) * 0.16);
    r.resize(w * 0.13, h * 0.035);
    r.rotation = i * 60;
    r.cornerRadius = 2;
    r.fills = [solid(colors.oxide)];
    parent.appendChild(r);
  }
  text(parent, "Wheel X", "X", x + w * 0.45, y + h * 0.45, w * 0.14, 86, black, colors.oxide, 0.9);
  text(parent, "Media label", "X.WHEEL / SOFT ALARM", x + 18, y + h - 34, 220, 14, bold, colors.ink);
}

function homeDesktop() {
  const f = frame("01 Home / Desktop", 0, 0, 1440, 900);
  addHeader(f, 1440);
  addSwissGrid(f, 1440, 900);
  text(f, "Direction label", "SIGNAL INDEX / ACID PROOF", 72, 350, 360, 12, bold, colors.sodium);
  text(f, "Hero eyebrow", "01 / INTERACTIVE GAME, INTERFACE STUDY, MOVING IMAGE", 72, 392, 520, 12, bold, colors.cyan);
  text(f, "Hero title / current work", "X.WHEEL", 72, 430, 540, 100, black);
  text(f, "Hero summary", projects[0].summary, 72, 522, 560, 20, regular, colors.fog, 1.35);
  addWheelGraphic(f, 968, 280, 385, 430);
  text(f, "Background number", "01", 1010, 140, 300, 220, black, colors.plum, 0.8).opacity = 0.3;
  text(f, "Ledger", "00    07    WORKS INDEX", 72, 842, 260, 13, regular, colors.oxide);
  text(f, "Binary texture", "1 0 0 1 1 0 1 0 1 1 1 0 0 1 0 1 1 0 1 0", 684, 806, 360, 10, regular, colors.fog);
}

function homeMobile() {
  const f = frame("02 Home / Mobile", 1510, 0, 390, 900);
  addMobileHeader(f, 390);
  addSwissGrid(f, 390, 900);
  text(f, "Direction label", "SIGNAL INDEX / ACID PROOF", 16, 178, 320, 10, bold, colors.sodium);
  text(f, "Hero eyebrow", "01 / INTERACTIVE GAME, INTERFACE STUDY,\nMOVING IMAGE", 16, 210, 320, 12, bold, colors.cyan, 1.35);
  text(f, "Hero title / current work", "X.WHEEL", 16, 260, 350, 62, black);
  text(f, "Hero summary", projects[0].summary, 16, 338, 330, 16, regular, colors.fog, 1.45);
  addWheelGraphic(f, 16, 412, 358, 290);
  text(f, "Ledger", "00                 07                 WORKS", 16, 730, 360, 12, regular, colors.oxide);
  text(f, "Statement label", "statement / archive", 24, 844, 220, 14, regular, colors.cyan);
}

function workWindow(parent, project, placement) {
  const { x, y, w, h, rotation } = placement;
  const windowFrame = embeddedFrame(
    parent,
    `Work Window ${project.index} / ${project.title}`,
    x,
    y,
    w,
    h,
    colors.surface,
    project.color
  );
  windowFrame.rotation = rotation;

  rect(windowFrame, "Title bar / drag handle", 0, 0, w, 44, project.color);
  text(windowFrame, "Title bar index", project.index, 12, 14, 30, 11, bold, project.onColor);
  text(windowFrame, "Title bar title", project.title.toUpperCase(), 46, 14, w - 100, 11, bold, project.onColor);
  rect(windowFrame, "Minimize control / 44px target", w - 44, 0, 44, 44, project.onColor, project.onColor, 0.12);
  line(windowFrame, "Minimize glyph", w - 30, 22, w - 14, 22, project.onColor);

  rect(windowFrame, "Editable media placeholder", 14, 58, w - 28, 150, colors.night, project.color);
  rect(windowFrame, "Media signal / vertical", 30, 76, 7, 114, project.color, null, 0.75);
  rect(windowFrame, "Media signal / horizontal", 48, 151, w - 82, 7, project.color, null, 0.35);
  text(windowFrame, "Media index", project.index, w - 104, 78, 78, 62, black, project.color, 0.9).opacity = 0.42;
  text(windowFrame, "Media label", "MEDIA / EDITABLE PLACEHOLDER", 48, 174, w - 82, 9, bold, colors.fog);

  text(windowFrame, "Project metadata", `${project.year}  /  ${project.medium.toUpperCase()}`, 14, 220, w - 28, 9, bold, project.color);
  text(windowFrame, "Project summary", project.summary, 14, 242, w - 28, 13, regular, colors.ink, 1.4);

  rect(windowFrame, "OPEN action / 44px target", 14, h - 58, w - 28, 44, project.color);
  text(windowFrame, "OPEN label", "OPEN", 28, h - 43, w - 56, 12, bold, project.onColor);
  return windowFrame;
}

function worksSystem() {
  const f = frame("03 Works / Draggable Window System", 0, 980, 1440, 1400);
  addHeader(f, 1440);
  text(f, "Page label", "WORKS / WINDOW SYSTEM", 64, 132, 240, 12, bold, colors.cyan);
  text(f, "Works heading", "Works", 1080, 112, 260, 64, black);
  text(f, "System note", `7 EDITABLE WINDOWS / ${workspace.breakpoint}px BREAKPOINT / TITLE-BAR DRAG`, 64, 168, 620, 11, regular, colors.fog);

  rect(f, "Scatter active", 64, 202, 126, 44, colors.cyan);
  text(f, "Scatter label", "SCATTER", 82, 217, 90, 11, bold, colors.night);
  rect(f, "Scan control", 198, 202, 96, 44, colors.surface, colors.plum);
  text(f, "Scan label", "SCAN", 220, 217, 60, 11, bold, colors.ink);
  rect(f, "Reset control", 302, 202, 96, 44, colors.surface, colors.plum);
  text(f, "Reset label", "RESET", 320, 217, 64, 11, bold, colors.ink);

  const stageX = 40;
  const stageY = 264;
  const stageWidth = 1360;
  rect(f, "Works workspace / Scatter canvas", stageX, stageY, stageWidth, workspace.stageHeight, colors.surface, colors.plum, 0.32);
  line(f, "Workspace guide / vertical", stageX + stageWidth / 2, stageY, stageX + stageWidth / 2, stageY + workspace.stageHeight, colors.plum);
  line(f, "Workspace guide / horizontal", stageX, stageY + workspace.stageHeight / 2, stageX + stageWidth, stageY + workspace.stageHeight / 2, colors.plum);

  projects
    .map((project) => ({ project, position: workspace.positions[project.slug] }))
    .sort((a, b) => a.position.z - b.position.z)
    .forEach(({ project, position }) => {
      workWindow(f, project, {
        x: stageX + stageWidth * (position.x / 100),
        y: stageY + position.y,
        w: position.width,
        h: 360,
        rotation: position.rotation
      });
    });

  const dockY = stageY + workspace.stageHeight + 24;
  rect(f, "Restore dock", 56, dockY, 1328, 92, colors.surface, colors.plum);
  text(f, "Dock label", "RESTORE / FOCUS", 72, dockY + 12, 150, 9, bold, colors.fog);
  projects.forEach((project, index) => {
    const x = 72 + index * 180;
    rect(f, `Dock button ${project.index} / 44px target`, x, dockY + 36, 164, 44, colors.night, project.color);
    text(f, `Dock label ${project.index}`, `${project.index}  ${project.title.toUpperCase()}`, x + 10, dockY + 51, 144, 9, bold, colors.ink);
  });
}

function projectDetail() {
  const project = projects[0];
  const f = frame("04 Project Detail / X.WHEEL", 1510, 980, 1440, 1100);
  addHeader(f, 1440);
  text(f, "Project index", `${project.index} / ${project.status.toUpperCase()}`, 72, 150, 300, 12, bold, colors.cyan);
  text(f, "Project title", project.title, 72, 188, 620, 112, black);
  text(f, "Project body", project.summary, 72, 330, 520, 20, regular, colors.fog, 1.45);
  addWheelGraphic(f, 690, 150, 600, 620);
  rect(f, "Optional build-link slot", 72, 465, 270, 46, colors.surface, colors.plum);
  text(f, "Optional build-link status", "BUILD LINK / NOT PUBLISHED", 93, 480, 230, 12, bold, colors.fog);
  rect(f, "Meta block", 72, 680, 520, 190, null, colors.plum);
  text(f, "Meta", `YEAR\n${project.year}\n\nMEDIUM\n${project.medium}`, 96, 708, 420, 16, regular, colors.ink, 1.4);
}

function wakeUpMap() {
  const f = frame("05 Wake Up / Replica Map", 0, 2720, 1440, 1600, colors.night);
  text(f, "Wake label", "WAKE UP / OLD-SITE REPLICA", 64, 64, 360, 14, bold, colors.sodium);
  text(f, "Wake title", "Wake Up", 64, 110, 540, 88, black, colors.ink);
  rect(f, "Black intro field", 64, 260, 500, 330, colors.night, colors.plum);
  text(f, "Dream question", "さっきのは夢?", 270, 315, 130, 54, regular, colors.ink, 1.6);
  rect(f, "Intercom collage field", 660, 210, 620, 420, colors.plum, colors.ink);
  rect(f, "Intercom device", 840, 310, 260, 280, colors.fog, colors.ink);
  rect(f, "Intercom screen", 885, 360, 175, 90, colors.cyan, colors.night);
  text(f, "Wake vertical quote", "君は誰ですか?\nここはどこですか?", 1120, 720, 160, 42, regular, colors.ink, 1.6);
  rect(f, "Flood title block", 64, 760, 780, 420, colors.surface, colors.plum);
  text(f, "Flood word", "WAKE UP", 115, 900, 650, 120, black, colors.oxide);
  rect(f, "City strip 1", 930, 790, 92, 520, colors.plum, colors.ink);
  rect(f, "City strip 2", 1045, 735, 92, 590, colors.sodium, colors.ink);
  rect(f, "City strip 3", 1160, 805, 92, 470, colors.cyan, colors.ink);
  text(f, "Replica note", "Use the screenshot wake-up-detail.png as the structural reference layer for the long-scroll composition.", 64, 1375, 660, 18, regular, colors.fog, 1.45);
}

function aboutPage() {
  const f = frame("06 About / Statement CV Contact", 1510, 2160, 1440, 980);
  addHeader(f, 1440);
  text(f, "About title", "About", 72, 150, 360, 92, black);
  text(f, "Statement", "Signal Index / Acid Proof combines an Internationalist grid, a three-color interface, and semantic window UI into an original professor-facing portfolio system.", 72, 290, 680, 28, regular, colors.ink, 1.25);
  text(f, "Originality note", "References inform behavior only. No borrowed assets, text, raster chrome, code, or exact composition.", 72, 430, 620, 15, regular, colors.fog, 1.45);
  rect(f, "CV column", 840, 150, 430, 560, null, colors.plum);
  text(f, "CV title", "CV", 872, 185, 120, 40, black);
  text(f, "CV items", "2026  X.WHEEL\n2024  EMIDA\n2023  Wake Up\n2023  Residual Garden\n2022  Signal Room\n2021  Threshold Archive", 872, 255, 320, 18, regular, colors.ink, 1.55);
  rect(f, "Contact field / unpublished", 72, 570, 340, 48, colors.surface, colors.plum);
  text(f, "Contact field status", "CONTACT ROUTE / ADD VERIFIED EMAIL OR URL", 92, 586, 300, 11, bold, colors.fog);
}

async function loadFonts() {
  await figma.loadFontAsync(regular);
  await figma.loadFontAsync(bold);
}

async function main() {
  await loadFonts();
  const existingPage = figma.root.children.find((node) => node.type === "PAGE" && node.name === PAGE_NAME);
  const page = existingPage || figma.createPage();
  page.name = PAGE_NAME;
  figma.currentPage = page;
  if (existingPage) {
    page.children
      .filter((node) => node.getPluginData("cibaGenerated") === "true")
      .forEach((node) => node.remove());
  }
  homeDesktop();
  homeMobile();
  worksSystem();
  projectDetail();
  wakeUpMap();
  aboutPage();
  figma.viewport.scrollAndZoomIntoView(page.children);
  figma.closePlugin(existingPage
    ? "CIBA generated frames updated in place; manually added untagged layers were preserved."
    : "Signal Index / Acid Proof frames created, including seven editable Works windows.");
}

main().catch((error) => {
  figma.closePlugin(`Import failed: ${error.message}`);
});
