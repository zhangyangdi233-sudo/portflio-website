import { describe, expect, it } from "vitest";
import { buildHomeComposition } from "../src/lib/home-composition";
import { projects } from "../src/lib/project-data";

describe("home composition", () => {
  it("turns all projects into a scroll-first sequence with featured weight first", () => {
    const rows = buildHomeComposition(projects);

    expect(rows).toHaveLength(projects.length);
    expect(rows.map((row) => row.slug).slice(0, 2)).toEqual(["x-wheel", "emida"]);
    expect(rows[0]).toMatchObject({ weight: "lead", indexLabel: "01" });
    expect(rows[1]).toMatchObject({ weight: "focus", indexLabel: "02" });
    expect(rows.at(-1)?.indexLabel).toBe(String(projects.length).padStart(2, "0"));
  });

  it("assigns pure-color composition fields for the animated homepage stage", () => {
    const rows = buildHomeComposition(projects);

    expect(rows.every((row) => row.solidTone && row.shapeSet && row.motionAxis)).toBe(true);
    expect(new Set(rows.map((row) => row.solidTone)).size).toBeGreaterThanOrEqual(4);
    expect(new Set(rows.map((row) => row.shapeSet)).size).toBeGreaterThanOrEqual(3);
    expect(rows.map((row) => row.motionAxis)).toContain("horizontal");
  });
});
