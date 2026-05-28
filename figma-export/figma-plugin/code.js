const colors = {
  paper: "#f3ead6",
  ink: "#111111",
  muted: "#736b5e",
  line: "#cfc3aa",
  blue: "#006eb8",
  red: "#f04423",
  green: "#007a4d",
  black: "#050505",
  cream: "#fff7ea",
  cyan: "#5fe7d1"
};

const projects = [
  {
    index: "01",
    title: "X.WHEEL",
    medium: "Interactive game, web demo link, moving image",
    year: "2026",
    summary: "An interactive game work about loops, bodily response, and rules that never quite stay still.",
    color: colors.red
  },
  {
    index: "02",
    title: "EMIDA",
    medium: "Installation, image system, narrative interface",
    year: "2024",
    summary: "A second-focus project on image, memory, and the distance created by interfaces.",
    color: colors.blue
  },
  {
    index: "03",
    title: "Wake Up",
    medium: "Web-based visual essay, image archive, scrolling composition",
    year: "2023",
    summary: "A recreated web visual essay tracing awakening, city time, and the idea of an ordinary person.",
    color: colors.ink
  },
  {
    index: "04",
    title: "Residual Garden",
    medium: "Digital garden, generative image notes",
    year: "2023",
    summary: "A digital garden of residual images, generative notes, and everyday observations.",
    color: colors.green
  },
  {
    index: "05",
    title: "Soft Boundaries",
    medium: "Moving image, object study",
    year: "2023",
    summary: "A moving-image study of objects, skin, and the perception of borders.",
    color: colors.red
  },
  {
    index: "06",
    title: "Signal Room",
    medium: "Soundless interface, screen study",
    year: "2022",
    summary: "An interface study using screens, delay, and silent signals as material.",
    color: colors.blue
  },
  {
    index: "07",
    title: "Threshold Archive",
    medium: "Web archive, still image sequence",
    year: "2021",
    summary: "An early archive project organized through web pages, still frames, and entry structures.",
    color: colors.green
  }
];

const regular = { family: "Inter", style: "Regular" };
const bold = { family: "Inter", style: "Bold" };
const black = bold;

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

function frame(name, x, y, w, h, fill = colors.paper) {
  const node = figma.createFrame();
  node.name = name;
  node.x = x;
  node.y = y;
  node.resize(w, h);
  node.fills = [solid(fill)];
  node.clipsContent = true;
  figma.currentPage.appendChild(node);
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

function line(parent, name, x1, y1, x2, y2, color = colors.line) {
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
  rect(parent, "Header line", 0, 64, w, 1, colors.line);
  text(parent, "Brand / Chinese", "糍粑", 32, 24, 48, 14, bold);
  text(parent, "Brand / English", "CIBA", 70, 25, 48, 12, bold);
  text(parent, "Nav", "Works    About    Contact", w / 2 - 125, 25, 250, 13, regular, colors.muted);
  text(parent, "Languages", `中文    ${lang}    日本語`, w - 170, 25, 140, 12, regular, colors.muted);
}

function addSwissGrid(parent, w, h) {
  line(parent, "Grid vertical 1", w * 0.5, 64, w * 0.5, h);
  line(parent, "Grid vertical 2", w * 0.58, 64, w * 0.58, h);
  line(parent, "Grid horizontal 1", 0, h * 0.62, w, h * 0.62);
}

function addWheelGraphic(parent, x, y, w, h) {
  rect(parent, "X.WHEEL media field", x, y, w, h, colors.black, colors.ink);
  const c = figma.createEllipse();
  c.name = "Wheel outer orbit";
  c.x = x + w * 0.18;
  c.y = y + h * 0.26;
  c.resize(w * 0.62, w * 0.62);
  c.fills = [];
  c.strokes = [solid(colors.line, 0.55)];
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
    r.fills = [solid(colors.red)];
    parent.appendChild(r);
  }
  text(parent, "Wheel X", "X", x + w * 0.45, y + h * 0.45, w * 0.14, 86, black, colors.red, 0.9);
  text(parent, "Media label", "X.WHEEL", x + 18, y + h - 34, 120, 14, bold, colors.cream);
}

function homeDesktop() {
  const f = frame("01 Home / Desktop", 0, 0, 1440, 900);
  addHeader(f, 1440);
  addSwissGrid(f, 1440, 900);
  text(f, "Hero eyebrow", "01 / INTERACTIVE GAME, WEB DEMO LINK, MOVING IMAGE", 72, 392, 480, 12, bold, colors.blue);
  text(f, "Hero title / current work", "X.WHEEL", 72, 430, 540, 100, black);
  text(f, "Hero summary", projects[0].summary, 72, 522, 560, 20, regular, colors.muted, 1.35);
  addWheelGraphic(f, 968, 280, 385, 430);
  text(f, "Background number", "01", 1010, 140, 300, 220, black, colors.ink, 0.8).opacity = 0.04;
  text(f, "Ledger", "00    07    WORKS INDEX", 72, 842, 260, 13, regular, colors.red);
  text(f, "Binary texture", "1 0 0 1 1 0 1 0 1 1 1 0 0 1 0 1 1 0 1 0", 684, 806, 360, 10, regular, colors.line);
}

function homeMobile() {
  const f = frame("02 Home / Mobile", 1510, 0, 390, 900);
  addHeader(f, 390);
  addSwissGrid(f, 390, 900);
  text(f, "Hero eyebrow", "01 / INTERACTIVE GAME, WEB DEMO LINK,\nMOVING IMAGE", 16, 210, 290, 12, bold, colors.blue, 1.35);
  text(f, "Hero title / current work", "X.WHEEL", 16, 260, 350, 62, black);
  text(f, "Hero summary", projects[0].summary, 16, 338, 330, 16, regular, colors.muted, 1.45);
  addWheelGraphic(f, 16, 412, 358, 290);
  text(f, "Ledger", "00                 07                 WORKS", 16, 730, 360, 12, regular, colors.red);
  text(f, "Statement label", "statement / archive", 24, 844, 220, 14, regular, colors.blue);
}

function worksSystem() {
  const f = frame("03 Works / Scroll System", 0, 980, 1440, 1660);
  addHeader(f, 1440);
  text(f, "Page label", "WORKS INDEX", 64, 155, 160, 12, bold, colors.blue);
  text(f, "Works heading", "Works", 1120, 150, 210, 42, black);
  projects.forEach((project, i) => {
    const y = 315 + i * 185;
    rect(f, `Row ${project.index} baseline`, 0, y + 154, 1440, 1, colors.line);
    rect(f, `Row ${project.index} accent`, 64, y, 150, 7, project.color);
    text(f, `${project.title} index`, project.index, 960, y - 12, 260, 185, black, project.color, 0.8).opacity = 0.08;
    text(f, `${project.title} medium`, project.medium.toUpperCase(), 72, y + 78, 380, 11, bold);
    text(f, `${project.title} title`, project.title, 72, y + 112, 480, i === 3 ? 46 : 64, black);
    text(f, `${project.title} summary`, project.summary, 72, y + 178, 520, 14, regular, colors.muted, 1.35);
    rect(f, `${project.title} media placeholder`, 895, y + 30, 360, 110, i === 0 ? colors.black : colors.cream, colors.ink);
    text(f, `${project.title} year`, project.year, 1285, y + 125, 80, 13, bold, colors.muted);
  });
}

function projectDetail() {
  const f = frame("04 Project Detail / X.WHEEL", 1510, 980, 1440, 1100);
  addHeader(f, 1440);
  text(f, "Project index", "01 / PRIMARY WORK", 72, 150, 220, 12, bold, colors.blue);
  text(f, "Project title", "X.WHEEL", 72, 188, 620, 112, black);
  text(f, "Project body", "The page links to an external playable build while keeping the project information, media area, and production context readable.", 72, 330, 520, 20, regular, colors.muted, 1.45);
  addWheelGraphic(f, 690, 150, 600, 620);
  rect(f, "Play button", 72, 465, 190, 46, colors.ink);
  text(f, "Play button text", "PLAY EXTERNAL BUILD", 93, 480, 160, 12, bold, colors.cream);
  rect(f, "Meta block", 72, 680, 520, 190, null, colors.line);
  text(f, "Meta", "YEAR\n2026\n\nMEDIUM\nInteractive game, web demo link, moving image", 96, 708, 420, 16, regular, colors.ink, 1.4);
}

function wakeUpMap() {
  const f = frame("05 Wake Up / Replica Map", 0, 2720, 1440, 1600, colors.black);
  text(f, "Wake label", "WAKE UP / OLD-SITE REPLICA", 64, 64, 360, 14, bold, colors.cream);
  text(f, "Wake title", "Wake Up", 64, 110, 540, 88, black, colors.cream);
  rect(f, "Black intro field", 64, 260, 500, 330, colors.black, colors.cream);
  text(f, "Dream question", "さっきのは夢?", 270, 315, 130, 54, regular, colors.cream, 1.6);
  rect(f, "Intercom collage field", 660, 210, 620, 420, "#315cc8", colors.cream);
  rect(f, "Intercom device", 840, 310, 260, 280, "#918d80", colors.ink);
  rect(f, "Intercom screen", 885, 360, 175, 90, "#d4eef0", colors.ink);
  text(f, "Wake vertical quote", "君は誰ですか?\nここはどこですか?", 1120, 720, 160, 42, regular, colors.cream, 1.6);
  rect(f, "Flood title block", 64, 760, 780, 420, colors.black, colors.cream);
  text(f, "Flood word", "WAKE UP", 115, 900, 650, 120, black, colors.red);
  rect(f, "City strip 1", 930, 790, 92, 520, "#25364a", colors.cream);
  rect(f, "City strip 2", 1045, 735, 92, 590, "#d98f36", colors.cream);
  rect(f, "City strip 3", 1160, 805, 92, 470, "#7aa5c8", colors.cream);
  text(f, "Replica note", "Use the screenshot wake-up-detail.png as the visual reference layer for the long-scroll composition.", 64, 1375, 660, 18, regular, colors.cream, 1.45);
}

function aboutPage() {
  const f = frame("06 About / Statement CV Contact", 1510, 2160, 1440, 980);
  addHeader(f, 1440);
  text(f, "About title", "About", 72, 150, 360, 92, black);
  text(f, "Statement", "The portfolio is structured as a curator-readable archive while preserving the immersive feeling of a web-based entry point.", 72, 290, 680, 28, regular, colors.ink, 1.25);
  rect(f, "CV column", 840, 150, 430, 560, null, colors.ink);
  text(f, "CV title", "CV", 872, 185, 120, 40, black);
  text(f, "CV items", "2026  X.WHEEL\n2024  EMIDA\n2023  Wake Up\n2023  Residual Garden\n2022  Signal Room\n2021  Threshold Archive", 872, 255, 320, 18, regular, colors.ink, 1.55);
  rect(f, "Contact button", 72, 570, 205, 48, colors.ink);
  text(f, "Contact button text", "CONTACT", 100, 586, 140, 13, bold, colors.cream);
}

async function loadFonts() {
  await figma.loadFontAsync(regular);
  await figma.loadFontAsync(bold);
}

async function main() {
  await loadFonts();
  const page = figma.createPage();
  page.name = "CIBA Portfolio / Editable Import";
  figma.currentPage = page;
  homeDesktop();
  homeMobile();
  worksSystem();
  projectDetail();
  wakeUpMap();
  aboutPage();
  figma.viewport.scrollAndZoomIntoView(page.children);
  figma.closePlugin("CIBA portfolio frames created. Drag the PNG screenshots from figma-export/screenshots into Figma as reference layers.");
}

main().catch((error) => {
  figma.closePlugin(`Import failed: ${error.message}`);
});
