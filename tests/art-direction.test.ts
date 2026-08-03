import { describe, expect, it } from "vitest";
import { artDirection, getArtDirectionVars, getWorkspacePosition } from "../src/lib/art-direction";
import { projects } from "../src/lib/project-data";

describe("art direction configuration", () => {
  it("provides one large authored window position for every public project", () => {
    const slugs = projects.map((project) => project.slug);

    expect(Object.keys(artDirection.workspace.positions).sort()).toEqual([...slugs].sort());
    expect(artDirection.workspace).toMatchObject({ breakpoint: 900, stageHeight: 760 });
    slugs.forEach((slug, index) => {
      const position = getWorkspacePosition(slug, index);
      expect(position.width).toBeGreaterThanOrEqual(410);
      expect(position.width).toBeLessThanOrEqual(460);
      expect(position.x).toBeGreaterThanOrEqual(0);
      expect(position.x).toBeLessThan(100);
      expect(position.y).toBeGreaterThanOrEqual(38);
      expect(position.y).toBeLessThanOrEqual(344);
    });
  });

  it("maps design values to CSS custom properties", () => {
    const variables = getArtDirectionVars();
    expect(variables["--art-night"]).toBe("#090a08");
    expect(variables["--art-cyan"]).toBe("#c6ff00");
    expect(variables["--art-motion-state"]).toMatch(/ms$/);
  });

  it("limits the interface system to three canonical colors", () => {
    expect(new Set(Object.values(artDirection.colors))).toEqual(
      new Set(["#090a08", "#f4f0dd", "#c6ff00"])
    );
  });

  it("returns a safe fallback for a newly added project", () => {
    expect(getWorkspacePosition("future-project", 8)).toMatchObject({ width: 320, z: 2 });
  });
});
