import { describe, expect, it } from "vitest";
import { buildHomeComposition, homeMediaLayouts } from "../src/lib/home-composition";
import { allProjects, projects } from "../src/lib/project-data";

describe("home composition", () => {
  it("turns only verified public projects into the scroll-linked sequence", () => {
    const rows = buildHomeComposition(allProjects);

    expect(rows).toHaveLength(5);
    expect(rows.map((row) => row.slug)).toEqual(projects.map((project) => project.slug));
    expect(rows.map((row) => row.indexLabel)).toEqual(["01", "02", "03", "04", "05"]);
    expect(rows.every((row) => row.published !== false)).toBe(true);
  });

  it("starts with an enlarged top-left evidence image and four authored drag positions", () => {
    expect(homeMediaLayouts).toHaveLength(4);
    expect(homeMediaLayouts[0]).toEqual({ x: "-5vw", y: "3svh", w: "72vw", r: -1.4 });
    expect(homeMediaLayouts.every((layout) => layout.w.endsWith("vw"))).toBe(true);
  });

  it("carries each project's explicit Home media selection into the cinematic sequence", () => {
    const [xWheel] = buildHomeComposition(allProjects);

    expect(xWheel.homeMedia.map((media) => media.src)).toEqual([
      "/assets/projects/x-wheel/character-full.png",
      "/assets/projects/x-wheel/character-portrait.png",
      "/assets/projects/x-wheel/character-sequence.png",
      "/assets/projects/x-wheel/cartridge-3-title.png"
    ]);
  });
});
