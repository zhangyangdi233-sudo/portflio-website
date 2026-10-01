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
    "escape-project": { x: 71, y: 152, width: 410, rotation: 0.4, z: 1 },
    "university-coursework": { x: 18, y: 344, width: 455, rotation: -0.15, z: 5 }
  }
};

const handoffFacts = {
  contactEmail: "mayonezu332@gmail.com",
  homeIncludesProjectStage: true,
  homeProjectCount: 5,
  homeXWheelMediaSources: [
    "/assets/projects/x-wheel/character-full.png",
    "/assets/projects/x-wheel/character-portrait.png",
    "/assets/projects/x-wheel/character-sequence.png",
    "/assets/projects/x-wheel/cartridge-3-title.png"
  ],
  worksFilters: ["ALL", "FEATURED", "ARCHIVE"],
  worksLayouts: ["WINDOWS", "ORDER", "RESET"],
  worksVisibleCount: "05 / 05",
  mobileHeaderHeight: 62,
  focusOutlineWidth: 3
};

const projects = [
  {
    slug: "x-wheel",
    index: "01",
    title: "APHASIA",
    localizedTitles: { zh: "APHASIA / 失语症", en: "APHASIA", ja: "APHASIA / 失語症" },
    cover: "/assets/projects/x-wheel/character-full.png",
    medium: "Godot game prototype, 3D asset and interface study",
    year: "2026",
    status: "In development",
    summary: "Taking linguistic contamination as its point of departure, the work examines how the term “mad person” is defined.",
    color: colors.oxide,
    onColor: colors.night
  },
  {
    slug: "emida",
    index: "02",
    title: "EMIDA",
    cover: "/assets/projects/emida/emida-doctor.webp",
    medium: "Visual novel game, Ren'Py, Procreate",
    year: "2024",
    status: "Completed",
    summary: "From a psychiatrist’s perspective, the work reconsiders the existence of marginalized groups and how the “power” discussed by Foucault takes shape.",
    color: colors.oxide,
    onColor: colors.night
  },
  {
    slug: "wake-up",
    index: "03",
    title: "Wake Up",
    cover: "/assets/projects/wake-up/bed-alarm.png",
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
    cover: "/assets/projects/escape-project/escape-space.webp",
    medium: "Web-based visual work, image composition",
    year: "2023",
    status: "Archived work",
    summary: "A web-based visual work about self-consciousness, social constraint, and the question of escape.",
    color: colors.oxide,
    onColor: colors.night
  },
  {
    slug: "university-coursework",
    index: "05",
    title: "University Coursework",
    cover: "/assets/projects/university-coursework/blender-01-object-study.png",
    medium: "3D practice, motion graphics, video editing",
    year: "—",
    status: "Practice record",
    summary: "A record of Blender, Maya, and After Effects / Premiere Pro practice, containing 14 still and moving-image items.",
    color: colors.oxide,
    onColor: colors.night
  }
];

const regular = { family: "Noto Sans SC", style: "Regular" };
const bold = { family: "Noto Sans SC", style: "Bold" };
const black = bold;
const PAGE_NAME = "CIBA / Signal Index / Acid Proof";
const DEV_SITE_ORIGIN = "http://127.0.0.1:4323";
const SYNC_ENDPOINT = "http://127.0.0.1:4767/snapshot";

const courseworkSections = [
  {
    slug: "blender",
    index: "01",
    title: "BLENDER",
    count: 10,
    items: [
      {
        code: "01.01",
        title: "Blender object, material, and lighting study.",
        type: "IMAGE",
        src: "/assets/projects/university-coursework/blender-01-object-study.png",
        x: 2,
        y: 4,
        w: 38,
        z: 10
      },
      {
        code: "01.02",
        title: "Blender character, form, and colour study.",
        type: "IMAGE",
        src: "/assets/projects/university-coursework/blender-02-character-render.jpg",
        x: 43,
        y: 5,
        w: 34,
        z: 9
      },
      {
        code: "01.03",
        title: "Blender environment, reflection, and red-light study.",
        type: "IMAGE",
        src: "/assets/projects/university-coursework/blender-03-red-corridor.jpg",
        x: 21,
        y: 27,
        w: 36,
        z: 8
      },
      {
        code: "01.04",
        title: "Blender architectural-form and image-composition study.",
        type: "IMAGE",
        src: "/assets/projects/university-coursework/blender-04-house-study.png",
        x: 60,
        y: 29,
        w: 34,
        z: 7
      },
      {
        code: "01.05",
        title: "Blender low-poly plant and shadow study.",
        type: "IMAGE",
        src: "/assets/projects/university-coursework/blender-05-low-poly-garden.png",
        x: 3,
        y: 56,
        w: 31,
        z: 6
      },
      {
        code: "01.06",
        title: "Blender render combined with a graphic diagram study.",
        type: "IMAGE",
        src: "/assets/projects/university-coursework/blender-06-week06-composition.png",
        x: 35,
        y: 57,
        w: 38,
        z: 5
      },
      {
        code: "01.07",
        title: "Blender modelling-process view.",
        type: "IMAGE",
        src: "/assets/projects/university-coursework/blender-07-modeling-process.jpg",
        x: 69,
        y: 58,
        w: 28,
        z: 4
      },
      {
        code: "01.08",
        title: "Blender nodes and workspace record for the red corridor scene.",
        type: "IMAGE",
        src: "/assets/projects/university-coursework/blender-08-node-workspace.jpg",
        x: 53,
        y: 17,
        w: 32,
        z: 3
      },
      {
        code: "01.09",
        title: "Blender animation study 01.",
        type: "VIDEO",
        src: "/assets/projects/university-coursework/blender-09-motion.mp4",
        x: 8,
        y: 18,
        w: 29,
        z: 2
      },
      {
        code: "01.10",
        title: "Blender animation study for the red corridor scene.",
        type: "VIDEO",
        src: "/assets/projects/university-coursework/blender-10-motion.mp4",
        x: 67,
        y: 4,
        w: 30,
        z: 1
      }
    ]
  },
  {
    slug: "maya",
    index: "02",
    title: "MAYA",
    count: 2,
    items: [
      {
        code: "02.01",
        title: "Maya vault, column, and architectural-space study.",
        type: "IMAGE",
        src: "/assets/projects/university-coursework/maya-01-architecture-still.png",
        x: 4,
        y: 8,
        w: 48,
        z: 2
      },
      {
        code: "02.02",
        title: "Maya architectural-environment animation study.",
        type: "VIDEO",
        src: "/assets/projects/university-coursework/maya-02-architecture-motion.mp4",
        x: 48,
        y: 34,
        w: 48,
        z: 1
      }
    ]
  },
  {
    slug: "ae-pr",
    index: "03",
    title: "AFTER EFFECTS / PREMIERE PRO",
    count: 2,
    items: [
      {
        code: "03.01",
        title: "After Effects / Premiere Pro motion and editing study 01.",
        type: "VIDEO",
        src: "/assets/projects/university-coursework/ae-pr-01-edit.mp4",
        x: 3,
        y: 7,
        w: 54,
        z: 2
      },
      {
        code: "03.02",
        title: "After Effects / Premiere Pro motion and editing study 02.",
        type: "VIDEO",
        src: "/assets/projects/university-coursework/ae-pr-02-edit.mp4",
        x: 43,
        y: 42,
        w: 54,
        z: 1
      }
    ]
  }
];

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

async function setImageFill(node, src, scaleMode = "FILL") {
  node.setPluginData("source", src);
  node.setPluginData("sourceUrl", `${DEV_SITE_ORIGIN}${src}`);
  try {
    const image = await figma.createImageAsync(`${DEV_SITE_ORIGIN}${encodeURI(src)}`);
    node.fills = [{ type: "IMAGE", imageHash: image.hash, scaleMode }];
    node.setPluginData("imageStatus", "loaded");
    return true;
  } catch (error) {
    node.setPluginData("imageStatus", `placeholder: ${error.message}`);
    return false;
  }
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
  rect(parent, "APHASIA media field", x, y, w, h, colors.surface, colors.plum);
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
  text(parent, "Media label", "APHASIA / SOFT ALARM", x + 18, y + h - 34, 220, 14, bold, colors.ink);
}

async function addHomeProjectStage(parent, y, w, mobile = false) {
  const inset = mobile ? 16 : 40;
  const stageWidth = w - inset * 2;
  const stageHeight = mobile ? 620 : 780;
  rect(parent, "Home project stage / current work", inset, y, stageWidth, stageHeight, colors.night, colors.plum);
  text(parent, "Home stage label", "CURRENT WORK / 01 OF 05", inset + 18, y + 20, mobile ? 210 : 320, mobile ? 10 : 12, bold, colors.oxide);
  text(parent, "Home stage title / clipped roll source", projects[0].title, inset + 18, y + (mobile ? 74 : 68), stageWidth - 36, mobile ? 58 : 152, black, colors.ink, 0.82);

  const desktopLayouts = [
    { x: -18, y: 198, w: 720, h: 410, r: -1.4 },
    { x: 770, y: 338, w: 480, h: 292, r: 2.2 },
    { x: 1012, y: 142, w: 310, h: 430, r: -3.1 },
    { x: 282, y: 520, w: 438, h: 224, r: 1.8 }
  ];
  const mobileLayouts = [
    { x: 18, y: 196, w: 300, h: 190, r: -1.4 },
    { x: 82, y: 338, w: 238, h: 148, r: 2.2 },
    { x: 205, y: 224, w: 126, h: 206, r: -3.1 },
    { x: 30, y: 454, w: 258, h: 132, r: 1.8 }
  ];
  const mediaLayouts = mobile ? mobileLayouts : desktopLayouts;
  const imageLoads = handoffFacts.homeXWheelMediaSources.map((src, index) => {
    const placement = mediaLayouts[index];
    const media = rect(
      parent,
      `Low-opacity draggable media ${String(index + 1).padStart(2, "0")} / 10% / ${src.split("/").pop()}`,
      inset + placement.x,
      y + placement.y,
      placement.w,
      placement.h,
      colors.ink,
      colors.ink,
      1
    );
    media.rotation = placement.r;
    media.opacity = 0.1;
    media.setPluginData("interaction", "Drag on desktop; reveal source colour on hover/focus in website");
    media.setPluginData("homeOrder", String(index + 1));
    return setImageFill(media, src, "FIT");
  });
  await Promise.all(imageLoads);
  text(parent, "Media interaction note", "4 INDEPENDENT LAYERS / 10% / DRAG / HOVER→SOURCE COLOUR", mobile ? inset + 28 : inset + stageWidth * 0.5, y + (mobile ? 230 : 248), mobile ? stageWidth - 56 : stageWidth * 0.42, mobile ? 9 : 11, bold, colors.oxide);

  text(parent, "Home stage concept label", "CONCEPT", inset + 18, y + (mobile ? 500 : 590), 120, 10, bold, colors.oxide);
  text(parent, "Home stage concept", projects[0].summary, inset + 18, y + (mobile ? 526 : 618), mobile ? stageWidth - 36 : stageWidth * 0.42, mobile ? 15 : 20, regular, colors.ink, 1.35);
  const orderText = mobile
    ? "01 APHASIA   02 EMIDA   03 WAKE UP\n04 ESCAPE / PROJECT   05 COURSEWORK"
    : "01 APHASIA   02 EMIDA   03 WAKE UP   04 ESCAPE / PROJECT   05 UNIVERSITY COURSEWORK";
  text(
    parent,
    "Home stage scroll order",
    orderText,
    inset + 18,
    y + stageHeight - (mobile ? 52 : 34),
    stageWidth - 36,
    mobile ? 8 : 10,
    regular,
    colors.fog
  );
}

async function homeDesktop() {
  const f = frame("01 Home / Desktop", 0, 0, 1440, 1740);
  addHeader(f, 1440);
  addSwissGrid(f, 1440, 1740);
  text(f, "Portfolio eyebrow", "PORTFOLIO", 40, 102, 220, 12, bold, colors.oxide);
  text(f, "Hero title", "CIBA", 40, 142, 1050, 260, black, colors.ink, 0.8);
  text(f, "Portfolio description", "THE PERSONAL PORTFOLIO WEBSITE OF ZHANG YANGDI / CIBA.", 40, 614, 620, 12, bold, colors.oxide);
  rect(f, "Acid chapter signal", 1366, 220, 42, 360, colors.oxide);
  text(f, "Chapter count", "01\n\n05", 1378, 238, 24, 12, bold, colors.night, 1.4);
  rect(f, "Enter works action", 930, 744, 430, 56, colors.oxide);
  text(f, "Enter works label", "SCROLL DOWN TO EXPLORE THE WORKS             ↘", 950, 764, 390, 12, bold, colors.night);
  await addHomeProjectStage(f, 900, 1440);
}

async function homeMobile() {
  const f = frame("02 Home / Mobile", 1510, 0, 390, 1580);
  addMobileHeader(f, 390);
  addSwissGrid(f, 390, 1580);
  text(f, "Portfolio eyebrow", "PORTFOLIO", 16, 128, 180, 10, bold, colors.oxide);
  text(f, "Hero title", "CIBA", 16, 174, 350, 78, black, colors.ink, 0.82);
  text(f, "Portfolio description", "THE PERSONAL PORTFOLIO WEBSITE OF\nZHANG YANGDI / CIBA.", 16, 470, 340, 10, bold, colors.oxide, 1.35);
  rect(f, "Enter works action", 16, 720, 358, 52, colors.oxide);
  text(f, "Enter works label", "SCROLL DOWN TO EXPLORE THE WORKS       ↘", 28, 738, 330, 10, bold, colors.night);
  await addHomeProjectStage(f, 840, 390, true);
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
  const titleValue = project.slug === "escape-project" ? "ESCAPE\nPROJECT" : project.title.toUpperCase();
  text(
    windowFrame,
    project.slug === "escape-project" ? "Title bar title / semantic ESCAPE + PROJECT" : "Title bar title",
    titleValue,
    46,
    project.slug === "escape-project" ? 7 : 14,
    w - 100,
    11,
    bold,
    project.onColor,
    project.slug === "escape-project" ? 1 : 1.1
  );
  rect(windowFrame, "Minimize control / 44px target", w - 44, 0, 44, 44, project.onColor, project.onColor, 0.12);
  line(windowFrame, "Minimize glyph", w - 30, 22, w - 14, 22, project.onColor);

  rect(windowFrame, "Editable media placeholder", 14, 58, w - 28, 150, colors.night, project.color);
  rect(windowFrame, "Media signal / vertical", 30, 76, 7, 114, project.color, null, 0.75);
  rect(windowFrame, "Media signal / horizontal", 48, 151, w - 82, 7, project.color, null, 0.35);
  text(windowFrame, "Media index", project.index, w - 104, 78, 78, 62, black, project.color, 0.9).opacity = 0.42;
  text(windowFrame, "Media label", "MEDIA / EDITABLE PLACEHOLDER", 48, 174, w - 82, 9, bold, colors.fog);

  const projectMetadata = project.year === "—"
    ? project.medium.toUpperCase()
    : `${project.year}  /  ${project.medium.toUpperCase()}`;
  text(windowFrame, "Project metadata", projectMetadata, 14, 220, w - 28, 9, bold, project.color);
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
  text(f, "System note", `5 EDITABLE WINDOWS / ${workspace.breakpoint}px BREAKPOINT / TITLE-BAR DRAG`, 64, 168, 620, 11, regular, colors.fog);

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
  const f = frame("04 Project Detail / APHASIA", 1510, 1680, 1440, 1100);
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
  text(f, "Statement", "CIBA currently creates media art centred on games and hopes to explore experimental works combining multiple media.", 72, 290, 680, 28, regular, colors.ink, 1.25);
  text(f, "Practice note", "Currently studying at university, CIBA has a strong interest in music, moving image, animation, and games within media art.", 72, 430, 620, 15, regular, colors.fog, 1.45);
  rect(f, "CV column", 840, 150, 430, 560, null, colors.plum);
  text(f, "CV title", "CV", 872, 185, 120, 40, black);
  text(f, "CV items", "2026–  APHASIA\n2024   EMIDA\n2023   Wake Up\n2023   Escape Project\nUniversity Coursework", 872, 255, 360, 18, regular, colors.ink, 1.55);
  rect(f, "Contact / verified email", 72, 570, 390, 48, colors.surface, colors.plum);
  text(f, "Contact email", handoffFacts.contactEmail, 92, 585, 350, 12, bold, colors.fog);
}

function courseworkMediaWindow(parent, item, stageWidth, stageHeight) {
  const width = Math.round(stageWidth * (item.w / 100));
  const height = Math.round(Math.max(174, Math.min(260, width * (item.type === "VIDEO" ? 0.46 : 0.42))));
  const x = Math.round(stageWidth * (item.x / 100));
  const y = Math.round(stageHeight * (item.y / 100));
  const mediaWindow = embeddedFrame(
    parent,
    `Media Window ${item.code} / ${item.type} / ${item.title}`,
    x,
    y,
    width,
    height,
    colors.night,
    colors.ink
  );
  mediaWindow.setPluginData("interaction", "Website: drag by title bar; clamp to this section; raise on focus.");
  mediaWindow.setPluginData("initialZ", String(item.z));
  mediaWindow.setPluginData("source", item.src);

  rect(mediaWindow, "Title bar / drag handle / 44px website target", 0, 0, width, 30, colors.night, colors.ink);
  rect(mediaWindow, "Active stack marker", 0, 0, 6, 30, colors.oxide);
  text(mediaWindow, "Item code", item.code, 12, 9, 42, 9, bold, colors.oxide);
  text(mediaWindow, "Media kind", item.type, 58, 9, 52, 8, bold, colors.ink);
  text(mediaWindow, "Window title", item.title, 112, 9, width - 126, 8, bold, colors.ink);

  const bodyY = 30;
  const captionHeight = 34;
  const mediaHeight = height - bodyY - captionHeight;
  rect(mediaWindow, "Editable media field", 0, bodyY, width, mediaHeight, colors.night, colors.ink);
  rect(mediaWindow, "Warm-paper evidence plane", 14, bodyY + 14, width - 28, Math.max(54, mediaHeight - 28), colors.ink, null, 0.14);
  rect(mediaWindow, "Acid crop marker / vertical", 28, bodyY + 28, 5, Math.max(28, mediaHeight - 56), colors.oxide);
  rect(mediaWindow, "Acid crop marker / horizontal", 44, bodyY + mediaHeight - 42, Math.max(48, width - 88), 5, colors.oxide, null, 0.45);

  if (item.type === "VIDEO") {
    rect(mediaWindow, "Video play control marker", 44, bodyY + 38, 44, 44, colors.oxide);
    text(mediaWindow, "Video play label", "PLAY", 53, bodyY + 54, 28, 9, bold, colors.night);
    rect(mediaWindow, "Video control track", 100, bodyY + 57, width - 132, 3, colors.ink);
    rect(mediaWindow, "Video control progress", 100, bodyY + 57, Math.max(24, (width - 132) * 0.32), 3, colors.oxide);
    text(mediaWindow, "Video controls note", "VIDEO / NATIVE CONTROLS IN WEBSITE", 44, bodyY + mediaHeight - 24, width - 72, 8, bold, colors.ink);
  } else {
    text(mediaWindow, "Image slot note", "IMAGE / EDITABLE EVIDENCE SLOT", 44, bodyY + mediaHeight - 24, width - 72, 8, bold, colors.ink);
  }

  rect(mediaWindow, "Caption rule", 0, height - captionHeight, width, 1, colors.ink);
  text(mediaWindow, "Factual caption", `${item.code} — ${item.title}`, 12, height - 23, width - 24, 8, regular, colors.ink);
  return mediaWindow;
}

function courseworkSectionWindow(parent, section, y) {
  const x = 64;
  const width = 1312;
  const height = 820;
  const sectionWindow = embeddedFrame(
    parent,
    `Coursework Section ${section.index} / ${section.title} / ${section.count} items`,
    x,
    y,
    width,
    height,
    colors.night,
    colors.ink
  );
  sectionWindow.strokeWeight = 2;
  sectionWindow.setPluginData("interaction", "Large bounded desktop; child media windows stay inside this stage.");

  rect(sectionWindow, "Section title bar", 0, 0, width, 58, colors.night, colors.ink);
  rect(sectionWindow, "Section active marker", 0, 0, 10, 58, colors.oxide);
  text(sectionWindow, "Section index", section.index, 28, 19, 36, 12, bold, colors.oxide);
  text(sectionWindow, "Section title", section.title, 78, 17, 640, 18, bold, colors.ink);
  text(sectionWindow, "Section evidence count", `${String(section.count).padStart(2, "0")} ITEMS`, 830, 20, 150, 10, bold, colors.ink);
  rect(sectionWindow, "RESET section / 44px target", width - 148, 7, 132, 44, colors.oxide);
  text(sectionWindow, "RESET label", "RESET", width - 118, 22, 80, 11, bold, colors.night);

  const stageX = 18;
  const stageY = 76;
  const stageWidth = width - 36;
  const stageHeight = height - 94;
  const stage = embeddedFrame(
    sectionWindow,
    `Bounded inner stage / ${section.title}`,
    stageX,
    stageY,
    stageWidth,
    stageHeight,
    colors.night,
    colors.ink
  );
  stage.setPluginData("bounds", "overflow clipped; title-bar drag only; authored positions reset per section");
  text(stage, "Stage interaction note", "DRAG TITLE BARS / ACTIVE WINDOW RISES / SECTION-BOUNDED", 18, 14, 500, 9, bold, colors.oxide);
  text(stage, "Stage item count", `${section.index} / ${String(section.count).padStart(2, "0")}`, stageWidth - 92, 14, 72, 9, bold, colors.ink);

  section.items
    .slice()
    .sort((left, right) => left.z - right.z)
    .forEach((item) => courseworkMediaWindow(stage, item, stageWidth, stageHeight));
}

function courseworkHandoff() {
  const f = frame("07 Coursework / Three Desktop Sections", 1510, 3960, 1440, 3100);
  addHeader(f, 1440);
  text(f, "Coursework record label", "05 / PRACTICE RECORD / 14 ITEMS", 64, 116, 360, 12, bold, colors.oxide);
  text(f, "Coursework title / semantic line break", "UNIVERSITY\nCOURSEWORK", 64, 146, 720, 112, black, colors.ink, 0.86);
  text(
    f,
    "Coursework summary",
    "Three bounded evidence desktops: Blender, Maya, and After Effects / Premiere Pro. Images and videos remain distinct records; unknown course facts stay unstated.",
    850,
    168,
    500,
    18,
    regular,
    colors.ink,
    1.4
  );
  text(
    f,
    "Coursework interaction contract",
    "TITLE-BAR DRAG / SECTION RESET / ORDERED COMPACT FALLBACK / VIDEO CONTROLS REMAIN INDEPENDENT",
    850,
    284,
    500,
    10,
    bold,
    colors.oxide,
    1.3
  );

  courseworkSections.forEach((section, index) => {
    courseworkSectionWindow(f, section, 410 + index * 880);
  });
}

function snapshotPaint(paint) {
  if (!paint || typeof paint !== "object") return null;
  if (paint.type === "SOLID") {
    return {
      type: paint.type,
      color: paint.color,
      opacity: paint.opacity ?? 1,
      visible: paint.visible ?? true
    };
  }
  if (paint.type === "IMAGE") {
    return {
      type: paint.type,
      imageHash: paint.imageHash,
      scaleMode: paint.scaleMode,
      opacity: paint.opacity ?? 1,
      visible: paint.visible ?? true
    };
  }
  return { type: paint.type, opacity: paint.opacity ?? 1, visible: paint.visible ?? true };
}

function snapshotNode(node) {
  const record = {
    id: node.id,
    type: node.type,
    name: node.name,
    x: Number(node.x?.toFixed?.(2) ?? 0),
    y: Number(node.y?.toFixed?.(2) ?? 0),
    width: Number(node.width?.toFixed?.(2) ?? 0),
    height: Number(node.height?.toFixed?.(2) ?? 0),
    rotation: Number(node.rotation?.toFixed?.(2) ?? 0),
    opacity: node.opacity ?? 1,
    visible: node.visible,
    locked: node.locked,
    source: node.getPluginData?.("source") || undefined,
    homeOrder: node.getPluginData?.("homeOrder") || undefined,
    interaction: node.getPluginData?.("interaction") || undefined
  };

  if ("fills" in node && node.fills !== figma.mixed) {
    record.fills = node.fills.map(snapshotPaint).filter(Boolean);
  }
  if ("strokes" in node && node.strokes !== figma.mixed) {
    record.strokes = node.strokes.map(snapshotPaint).filter(Boolean);
    record.strokeWeight = node.strokeWeight;
  }
  if (node.type === "TEXT") {
    record.characters = node.characters;
    record.fontName = node.fontName === figma.mixed ? "mixed" : node.fontName;
    record.fontSize = node.fontSize === figma.mixed ? "mixed" : node.fontSize;
    record.lineHeight = node.lineHeight === figma.mixed ? "mixed" : node.lineHeight;
    record.letterSpacing = node.letterSpacing === figma.mixed ? "mixed" : node.letterSpacing;
    record.textAlignHorizontal = node.textAlignHorizontal;
  }
  if ("layoutMode" in node) {
    record.layout = {
      mode: node.layoutMode,
      primaryAxisSizingMode: node.primaryAxisSizingMode,
      counterAxisSizingMode: node.counterAxisSizingMode,
      itemSpacing: node.itemSpacing,
      paddingTop: node.paddingTop,
      paddingRight: node.paddingRight,
      paddingBottom: node.paddingBottom,
      paddingLeft: node.paddingLeft
    };
  }
  if ("children" in node) {
    record.children = node.children.map(snapshotNode);
  }
  return record;
}

async function exportSnapshot() {
  const generated = figma.currentPage.children.filter(
    (node) => node.getPluginData("cibaGenerated") === "true"
  );
  if (generated.length === 0) {
    throw new Error(`No generated CIBA frames found on “${figma.currentPage.name}”. Run Import / refresh first.`);
  }

  const payload = {
    schemaVersion: 1,
    snapshotKind: "figma-plugin-export",
    exportedAt: new Date().toISOString(),
    fileKey: figma.fileKey || null,
    fileName: figma.root.name,
    page: {
      id: figma.currentPage.id,
      name: figma.currentPage.name
    },
    selection: figma.currentPage.selection.map((node) => ({ id: node.id, name: node.name, type: node.type })),
    frames: generated.map(snapshotNode)
  };
  const response = await fetch(SYNC_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-ciba-sync": "ciba-local-v1"
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error(`Local sync server returned ${response.status}. Run “npm run figma:sync” and try again.`);
  }
  const result = await response.json();
  figma.closePlugin(`CIBA snapshot exported: ${result.relativePath}`);
}

async function loadFonts() {
  await figma.loadFontAsync(regular);
  await figma.loadFontAsync(bold);
}

async function main() {
  await loadFonts();
  const existingPage = figma.root.children.find((node) => node.type === "PAGE" && node.name === PAGE_NAME);
  const page = existingPage || figma.currentPage;
  page.name = PAGE_NAME;
  await figma.setCurrentPageAsync(page);
  const generatedFrames = page.children.filter((node) => node.getPluginData("cibaGenerated") === "true");
  generatedFrames.forEach((node) => node.remove());
  await homeDesktop();
  await homeMobile();
  worksSystem();
  projectDetail();
  wakeUpMap();
  aboutPage();
  courseworkHandoff();
  figma.viewport.scrollAndZoomIntoView(page.children);
  figma.closePlugin(generatedFrames.length > 0
    ? "CIBA generated frames updated in place; manually added untagged layers were preserved."
    : "Signal Index / Acid Proof frames created on the current page, including five Works windows and three coursework desktops.");
}

const action = figma.command || "import";
const task = action === "export" ? exportSnapshot() : main();

task.catch((error) => {
  figma.closePlugin(`CIBA ${action} failed: ${error.message}`);
});
