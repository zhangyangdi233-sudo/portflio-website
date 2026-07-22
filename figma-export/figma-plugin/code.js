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
    "x-wheel": { x: 2, y: 38, width: 460, rotation: -0.45, z: 4 },
    emida: { x: 27, y: 112, width: 430, rotation: 0.35, z: 3 },
    "wake-up": { x: 54, y: 46, width: 440, rotation: -0.3, z: 2 },
    "escape-project": { x: 71, y: 152, width: 410, rotation: 0.4, z: 1 }
  }
};

const handoffFacts = {
  homeIncludesProjectStage: true,
  homeProjectCount: 4,
  worksFilters: ["ALL", "FEATURED", "ARCHIVE"],
  worksLayouts: ["WINDOWS", "ORDER", "RESET"],
  worksVisibleCount: "04 / 04",
  mobileHeaderHeight: 62,
  focusOutlineWidth: 3
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
    color: colors.oxide,
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
    color: colors.oxide,
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
    color: colors.oxide,
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
  rect(parent, "Mobile header line", 0, handoffFacts.mobileHeaderHeight, w, 1, colors.plum);
  text(parent, "Brand", "糍粑 CIBA", 12, 22, 76, 11, bold);
  text(parent, "Mobile nav", "Works   About   Contact", 104, 22, 174, 10, regular, colors.fog);
  text(parent, "Languages", `中  ${lang}  日`, w - 100, 22, 88, 10, regular, colors.fog);
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

function addHomeProjectStage(parent, y, w, mobile = false) {
  const inset = mobile ? 16 : 40;
  const stageWidth = w - inset * 2;
  const stageHeight = mobile ? 620 : 780;
  rect(parent, "Home project stage / current work", inset, y, stageWidth, stageHeight, colors.night, colors.plum);
  text(parent, "Home stage label", "CURRENT WORK / 01 OF 04", inset + 18, y + 20, mobile ? 210 : 320, mobile ? 10 : 12, bold, colors.oxide);
  text(parent, "Home stage title / clipped roll source", "X.WHEEL", inset + 18, y + (mobile ? 74 : 68), stageWidth - 36, mobile ? 58 : 152, black, colors.ink, 0.82);

  const media = rect(
    parent,
    "Low-opacity draggable media placeholder / 10%",
    mobile ? inset + 18 : inset + stageWidth * 0.48,
    y + (mobile ? 210 : 228),
    mobile ? stageWidth - 36 : stageWidth * 0.46,
    mobile ? 260 : 390,
    colors.ink,
    colors.ink,
    0.1
  );
  media.setPluginData("interaction", "Drag on desktop; reveal source colour on hover/focus in website");
  text(parent, "Media interaction note", "10% / GRAYSCALE / DRAG / HOVER→SOURCE COLOUR", mobile ? inset + 28 : inset + stageWidth * 0.5, y + (mobile ? 230 : 248), mobile ? stageWidth - 56 : stageWidth * 0.42, mobile ? 9 : 11, bold, colors.oxide);

  text(parent, "Home stage concept label", "CONCEPT", inset + 18, y + (mobile ? 500 : 590), 120, 10, bold, colors.oxide);
  text(parent, "Home stage concept", projects[0].summary, inset + 18, y + (mobile ? 526 : 618), mobile ? stageWidth - 36 : stageWidth * 0.42, mobile ? 15 : 20, regular, colors.ink, 1.35);
  text(parent, "Home stage scroll order", "01 X.WHEEL   02 EMIDA   03 WAKE UP   04 ESCAPE PROJECT", inset + 18, y + stageHeight - 34, stageWidth - 36, mobile ? 8 : 10, regular, colors.fog);
}

function homeDesktop() {
  const f = frame("01 Home / Desktop", 0, 0, 1440, 1740);
  addHeader(f, 1440);
  addSwissGrid(f, 1440, 1740);
  text(f, "Archive label", "ARTIST ARCHIVE / TOKYO", 40, 92, 360, 12, bold, colors.oxide);
  text(f, "Hero title", "CIBA", 40, 185, 1050, 260, black, colors.ink, 0.8);
  text(f, "Practice", "GAMES AND WEB-BASED WORKS", 40, 650, 420, 12, bold, colors.oxide);
  text(f, "Practice record", "Four public projects: two games in development and two web-based works from 2023.", 40, 684, 650, 22, regular, colors.ink, 1.35);
  rect(f, "Acid chapter signal", 1366, 220, 42, 360, colors.oxide);
  text(f, "Chapter count", "01\n\n04", 1378, 238, 24, 12, bold, colors.night, 1.4);
  rect(f, "Enter works action", 930, 744, 430, 56, colors.oxide);
  text(f, "Enter works label", "ENTER WORKS DESKTOP                         ↘", 950, 764, 390, 12, bold, colors.night);
  addHomeProjectStage(f, 900, 1440);
}

function homeMobile() {
  const f = frame("02 Home / Mobile", 1510, 0, 390, 1580);
  addMobileHeader(f, 390);
  addSwissGrid(f, 390, 1580);
  text(f, "Archive label", "ARTIST ARCHIVE / TOKYO", 16, 128, 300, 10, bold, colors.oxide);
  text(f, "Hero title", "CIBA", 16, 225, 350, 78, black, colors.ink, 0.82);
  text(f, "Practice", "GAMES AND WEB-BASED WORKS", 16, 515, 320, 10, bold, colors.oxide);
  text(f, "Practice record", "Four public projects: two games in development and two web-based works from 2023.", 16, 548, 340, 17, regular, colors.ink, 1.4);
  rect(f, "Enter works action", 16, 720, 358, 52, colors.oxide);
  text(f, "Enter works label", "ENTER WORKS DESKTOP                         ↘", 28, 738, 330, 10, bold, colors.night);
  addHomeProjectStage(f, 840, 390, true);
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
  const f = frame("03 Works / Draggable Window System", 0, 1840, 1440, 1400);
  addHeader(f, 1440);
  text(f, "Page label", "WORKS / WINDOW SYSTEM", 64, 132, 240, 12, bold, colors.cyan);
  text(f, "Works heading", "Works", 1080, 112, 260, 64, black);
  text(f, "System note", `4 EDITABLE WINDOWS / ${workspace.breakpoint}px BREAKPOINT / TITLE-BAR DRAG`, 64, 168, 620, 11, regular, colors.fog);

  const focusRing = rect(f, "Focus outline / 3px acid / 3px offset", 61, 199, 94, 50, null, colors.oxide);
  focusRing.strokeWeight = handoffFacts.focusOutlineWidth;
  rect(f, "Filter / ALL / active", 64, 202, 88, 44, colors.cyan);
  text(f, "Filter label / ALL", handoffFacts.worksFilters[0], 82, 217, 56, 11, bold, colors.night);
  rect(f, "Filter / FEATURED", 160, 202, 120, 44, colors.surface, colors.plum);
  text(f, "Filter label / FEATURED", handoffFacts.worksFilters[1], 176, 217, 92, 11, bold, colors.ink);
  rect(f, "Filter / ARCHIVE", 288, 202, 104, 44, colors.surface, colors.plum);
  text(f, "Filter label / ARCHIVE", handoffFacts.worksFilters[2], 304, 217, 76, 11, bold, colors.ink);

  rect(f, "Layout / WINDOWS / active", 792, 202, 112, 44, colors.cyan);
  text(f, "Layout label / WINDOWS", handoffFacts.worksLayouts[0], 808, 217, 82, 11, bold, colors.night);
  rect(f, "Layout / ORDER", 912, 202, 96, 44, colors.surface, colors.plum);
  text(f, "Layout label / ORDER", handoffFacts.worksLayouts[1], 930, 217, 64, 11, bold, colors.ink);
  rect(f, "Layout / RESET", 1016, 202, 96, 44, colors.surface, colors.plum);
  text(f, "Layout label / RESET", handoffFacts.worksLayouts[2], 1034, 217, 64, 11, bold, colors.ink);
  text(f, "Visible project status", `${handoffFacts.worksVisibleCount} VISIBLE`, 1170, 217, 180, 11, bold, colors.ink);

  const stageX = 40;
  const stageY = 282;
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
        h: 440,
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
  const f = frame("04 Project Detail / X.WHEEL", 1510, 1680, 1440, 1100);
  addHeader(f, 1440);
  text(f, "Project index", `${project.index} / ${project.status.toUpperCase()}`, 72, 150, 300, 12, bold, colors.cyan);
  text(f, "Project title", project.title, 72, 188, 620, 112, black);
  text(f, "Project body", project.summary, 72, 330, 520, 20, regular, colors.fog, 1.45);
  addWheelGraphic(f, 690, 150, 600, 620);
  rect(f, "Optional build-link slot", 72, 465, 270, 46, colors.surface, colors.plum);
  text(f, "Optional build-link status", "BUILD LINK / NOT PUBLISHED", 93, 480, 230, 12, bold, colors.fog);
  rect(f, "Meta block", 72, 620, 520, 340, null, colors.plum);
  text(
    f,
    "Meta",
    `YEAR\n${project.year}\n\nMEDIUM\n${project.medium}\n\nROLE / CREDITS\nARTIST VERIFICATION PENDING`,
    96,
    648,
    420,
    15,
    regular,
    colors.ink,
    1.35
  );
}

function wakeUpMap() {
  const f = frame("05 Wake Up / Two-Image Record", 0, 3340, 1440, 1600, colors.night);
  text(f, "Wake label", "WAKE UP / TWO-IMAGE PUBLIC RECORD", 64, 64, 420, 14, bold, colors.oxide);
  text(f, "Wake title", "Wake Up", 64, 110, 540, 88, black, colors.ink);
  text(f, "Concept", projects[2].summary, 64, 220, 640, 22, regular, colors.ink, 1.4);
  rect(f, "01 Bed and alarm image", 64, 390, 620, 460, colors.surface, colors.plum);
  text(f, "01 Image label", "01 / BED + ALARM", 88, 418, 220, 13, bold, colors.oxide);
  rect(f, "02 Flooded title image", 756, 650, 620, 460, colors.surface, colors.plum);
  text(f, "02 Image label", "02 / FLOODED TITLE", 780, 678, 260, 13, bold, colors.oxide);
  text(f, "Record note", "Only these two source images appear in the public record. Legacy source files remain preserved outside the generated frame.", 64, 1270, 760, 18, regular, colors.fog, 1.45);
}

function aboutPage() {
  const f = frame("06 About / Statement CV Contact", 1510, 2880, 1440, 980);
  addHeader(f, 1440);
  text(f, "About title", "About", 72, 150, 360, 92, black);
  text(f, "Statement", "CIBA is an artist currently making games and web-based works in Tokyo. The site records two games in development and two web works from 2023.", 72, 290, 680, 28, regular, colors.ink, 1.25);
  text(f, "Practice note", "The projects use rules, dialogue, scrolling pages, and image composition to examine bodily response, social norms, waking, and escape.", 72, 430, 620, 15, regular, colors.fog, 1.45);
  rect(f, "CV column", 840, 150, 430, 560, null, colors.plum);
  text(f, "CV title", "CV", 872, 185, 120, 40, black);
  text(f, "CV items", "2026–  X.WHEEL\n2024–  EMIDA\n2023   Wake Up\n2023   Escape Project", 872, 255, 320, 18, regular, colors.ink, 1.55);
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
    : "Signal Index / Acid Proof frames created, including four editable Works windows.");
}

main().catch((error) => {
  figma.closePlugin(`Import failed: ${error.message}`);
});
