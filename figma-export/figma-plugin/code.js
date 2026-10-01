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
  stageHeight: 760,
  positions: {
    "x-wheel": { x: 2, y: 28, width: 390, rotation: -0.45, z: 4 },
    emida: { x: 27, y: 72, width: 360, rotation: 0.4, z: 3 },
    "wake-up": { x: 51, y: 38, width: 374, rotation: -0.32, z: 2 },
    "escape-project": { x: 73, y: 88, width: 354, rotation: 0.46, z: 1 }
  }
};

const projects = [
  {
    slug: "x-wheel",
    index: "01",
    title: "X.WHEEL",
    medium: "Godot game prototype, 3D asset and interface study",
    year: "2026",
    status: "In development",
    summary: "A Godot game in development, currently documented through its room, CRT, console, and poster assets.",
    color: colors.oxide,
    onColor: colors.night
  },
  {
    slug: "emida",
    index: "02",
    title: "EMIDA",
    medium: "Visual novel game, Ren'Py, Procreate",
    year: "2024",
    status: "In development",
    summary: "A visual novel in development that uses player–character dialogue to examine social rules, oppression, and individuality.",
    color: colors.ink,
    onColor: colors.night
  },
  {
    slug: "wake-up",
    index: "03",
    title: "Wake Up",
    medium: "Web-based visual essay, scrolling composition",
    year: "2023",
    status: "Archived work",
    summary: "A web-based visual essay about awakening, repeated daily life, and the perception of a city.",
    color: colors.ink,
    onColor: colors.night
  },
  {
    slug: "escape-project",
    index: "04",
    title: "Escape Project",
    medium: "Web-based visual work, image composition",
    year: "2023",
    status: "Archived work",
    summary: "A web-based visual work about self-consciousness, social constraint, and the question of escape.",
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
  rect(f, "Acid signal / vertical", 1368, 56, 12, 276, colors.cyan);
  text(f, "Portfolio label", "PERSONAL ARTIST PORTFOLIO / TOKYO", 40, 92, 420, 11, bold, colors.cyan);
  text(f, "Opening identity", "CIBA", 28, 216, 1310, 306, black, colors.ink, 0.72);
  line(f, "Opening ledger rule", 40, 728, 1400, 728, colors.ink);
  text(f, "Artist position", "ARTIST / GAMES + INTERFACES", 40, 756, 310, 12, bold, colors.cyan);
  text(f, "Practice summary", "A PERSONAL ARCHIVE ACROSS GAMES, INTERFACES, MOVING IMAGE, AND INSTALLATION.", 360, 756, 460, 12, regular, colors.ink, 1.4);
  text(f, "Works count", "04\nWORKS", 880, 748, 120, 22, bold, colors.ink, 1.2);
  rect(f, "Selected works action", 1090, 744, 310, 52, colors.cyan, colors.night);
  text(f, "Selected works action label", "SCROLL TO SELECTED WORKS       ↓", 1110, 763, 270, 11, bold, colors.night);
}

function homeMobile() {
  const f = frame("02 Home / Mobile", 1510, 0, 390, 900);
  addMobileHeader(f, 390);
  addSwissGrid(f, 390, 900);
  rect(f, "Acid signal / vertical", 360, 56, 8, 136, colors.cyan);
  text(f, "Portfolio label", "PERSONAL ARTIST PORTFOLIO / TOKYO", 16, 92, 320, 9, bold, colors.cyan);
  text(f, "Opening identity", "CIBA", 12, 228, 366, 106, black, colors.ink, 0.78);
  line(f, "Opening ledger rule", 16, 564, 374, 564, colors.ink);
  text(f, "Artist position", "ARTIST / GAMES + INTERFACES", 16, 588, 250, 10, bold, colors.cyan);
  text(f, "Practice summary", "A PERSONAL ARCHIVE ACROSS GAMES, INTERFACES, MOVING IMAGE, AND INSTALLATION.", 16, 620, 270, 11, regular, colors.ink, 1.4);
  text(f, "Works count", "04 / WORKS", 292, 588, 82, 11, bold, colors.ink);
  rect(f, "Selected works action", 16, 744, 358, 52, colors.cyan, colors.night);
  text(f, "Selected works action label", "SCROLL TO SELECTED WORKS        ↓", 30, 763, 330, 10, bold, colors.night);
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
    colors.ink,
    colors.night
  );
  windowFrame.rotation = rotation;

  const mediaHeight = Math.round(w * 0.75);
  rect(windowFrame, "Title bar / drag handle", 0, 0, w, 46, colors.cyan, colors.night);
  rect(windowFrame, "Status mark", 8, 18, 10, 10, colors.night);
  text(windowFrame, "Title bar index", project.index, 26, 15, 32, 11, bold, colors.night);
  text(windowFrame, "Title bar title", project.title.toUpperCase(), 62, 15, w - 118, 11, bold, colors.night);
  rect(windowFrame, "Close control / 46px target", w - 46, 0, 46, 46, colors.cyan, colors.night);
  line(windowFrame, "Close glyph A", w - 32, 15, w - 14, 33, colors.night);
  line(windowFrame, "Close glyph B", w - 14, 15, w - 32, 33, colors.night);

  rect(windowFrame, "Editable media placeholder / 4:3", 0, 46, w, mediaHeight, colors.night, colors.night);
  text(windowFrame, "Media index", project.index, w - 106, 70, 78, 62, black, colors.cyan, 0.9).opacity = 0.5;
  text(windowFrame, "Media label", "CIBA MEDIA / EDITABLE 4:3", 18, 46 + mediaHeight - 30, w - 36, 9, bold, colors.ink);

  const bodyY = 46 + mediaHeight + 14;
  text(windowFrame, "Project metadata", `${project.year}  /  ${project.medium.toUpperCase()}  /  ${project.status.toUpperCase()}`, 14, bodyY, w - 28, 9, bold, colors.night);
  text(windowFrame, "Project summary", project.summary, 14, bodyY + 26, w - 28, 13, regular, colors.night, 1.4);

  rect(windowFrame, "OPEN PROJECT action / 46px target", 14, h - 60, w - 28, 46, colors.cyan, colors.night);
  text(windowFrame, "OPEN PROJECT label", "OPEN PROJECT                              ↗", 28, h - 44, w - 56, 11, bold, colors.night);
  return windowFrame;
}

function worksSystem() {
  const f = frame("03 Works / Draggable Window System", 0, 980, 1440, 1400);
  addHeader(f, 1440);
  text(f, "Page label", "WORKS / WINDOW SYSTEM", 64, 132, 240, 12, bold, colors.cyan);
  text(f, "Works heading", "WORKS / DESKTOP", 64, 112, 760, 64, black);
  text(f, "System note", `${projects.length} VERIFIED EDITABLE WINDOWS / ${workspace.breakpoint}px BREAKPOINT / TITLE-BAR DRAG`, 64, 168, 720, 11, regular, colors.fog);

  rect(f, "Scatter active", 64, 202, 126, 44, colors.cyan);
  text(f, "Scatter label", "SCATTER", 82, 217, 90, 11, bold, colors.night);
  rect(f, "List control", 198, 202, 96, 44, colors.surface, colors.plum);
  text(f, "List label", "LIST", 220, 217, 60, 11, bold, colors.ink);
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
        h: 520,
        rotation: position.rotation
      });
    });

  const dockY = stageY + workspace.stageHeight + 24;
  rect(f, "Restore dock", 56, dockY, 1328, 92, colors.surface, colors.plum);
  text(f, "Dock label", "RESTORE / FOCUS", 72, dockY + 12, 150, 9, bold, colors.fog);
  projects.forEach((project, index) => {
    const x = 72 + index * 320;
    rect(f, `Dock button ${project.index} / 44px target`, x, dockY + 36, 300, 44, colors.night, project.color);
    text(f, `Dock label ${project.index}`, `${project.index}  ${project.title.toUpperCase()}`, x + 10, dockY + 51, 280, 9, bold, colors.ink);
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
  text(f, "Optional build-link status", "SOURCE ARCHIVE / VERIFIED", 93, 480, 230, 12, bold, colors.fog);
  rect(f, "Meta block", 72, 680, 520, 190, null, colors.plum);
  text(f, "Meta", `YEAR\n${project.year}\n\nMEDIUM\n${project.medium}`, 96, 708, 420, 16, regular, colors.ink, 1.4);
}

function wakeUpMap() {
  const f = frame("05 Wake Up / Edited Sequence", 0, 2720, 1440, 1120, colors.night);
  text(f, "Wake label", "WAKE UP / TWO-IMAGE PUBLIC SEQUENCE", 64, 64, 420, 14, bold, colors.sodium);
  text(f, "Wake title", "Wake Up", 64, 110, 540, 88, black, colors.ink);
  rect(f, "Bed and alarm image slot", 64, 260, 580, 435, colors.surface, colors.plum);
  text(f, "Bed image label", "01 / BED + ALARM", 88, 286, 240, 12, bold, colors.cyan);
  rect(f, "Flooded title image slot", 720, 360, 656, 492, colors.surface, colors.plum);
  text(f, "Flood image label", "02 / FLOODED TITLE", 744, 386, 260, 12, bold, colors.cyan);
  text(f, "Edit note", "Only these two verified images remain in the public sequence. Removed legacy sections stay in source storage for rollback.", 64, 900, 720, 18, regular, colors.fog, 1.45);
}

function aboutPage() {
  const f = frame("06 About / Statement CV Contact", 1510, 2160, 1440, 980);
  addHeader(f, 1440);
  text(f, "About title", "About", 72, 150, 360, 92, black);
  text(f, "Statement", "Signal Index / Acid Proof combines an Internationalist grid, a three-color interface, and semantic window UI into an original professor-facing portfolio system.", 72, 290, 680, 28, regular, colors.ink, 1.25);
  text(f, "Originality note", "References inform behavior only. No borrowed assets, text, raster chrome, code, or exact composition.", 72, 430, 620, 15, regular, colors.fog, 1.45);
  rect(f, "CV column", 840, 150, 430, 560, null, colors.plum);
  text(f, "CV title", "CV", 872, 185, 120, 40, black);
  text(f, "CV items", "2026  X.WHEEL\n2024  EMIDA\n2023  WAKE UP\n2023  ESCAPE PROJECT", 872, 255, 320, 18, regular, colors.ink, 1.55);
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
    : `Signal Index / Acid Proof frames created, including ${projects.length} verified editable Works windows.`);
}

main().catch((error) => {
  figma.closePlugin(`Import failed: ${error.message}`);
});
