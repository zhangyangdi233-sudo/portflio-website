import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(import.meta.dirname, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");

describe("Works desktop V2", () => {
  it("exposes computer-window structure and conventional project links", () => {
    const component = read("src/components/WorkDesktopWindow.astro");

    expect(component).toContain("data-window-handle");
    expect(component).toContain("data-window-minimize");
    expect(component).toContain("work-desktop-window__status-mark");
    expect(component).toContain("work-desktop-window__close-icon");
    expect(component).toContain("work-desktop-window__meta");
    expect(component).toContain("work-desktop-window__open");
    expect(component.match(/href=\{projectHref\}/g)?.length).toBeGreaterThanOrEqual(2);
  });

  it("keeps large 4:3 windows visible and clamps the intermediate desktop range", () => {
    const css = read("src/styles/art-direction.css");
    const config = JSON.parse(read("src/content/art-direction.json"));
    const positions = Object.values(config.workspace.positions) as Array<{ width: number; y: number }>;

    expect(positions.every((position) => position.width >= 320 && position.width <= 390)).toBe(true);
    expect(positions.slice(0, 4).every((position) => position.y < 100)).toBe(true);
    expect(css).toMatch(/work-desktop-window__media-link img,[\s\S]*?aspect-ratio: 4 \/ 3/);
    expect(css).toMatch(/@media \(min-width: 900px\) and \(max-width: 1180px\)[\s\S]*?calc\(100% - 336px\)/);
  });

  it("retains non-drag alternatives and mobile window controls", () => {
    const page = read("src/pages/[lang]/works/index.astro");
    const motion = read("src/scripts/portfolio-motion.ts");
    const css = read("src/styles/art-direction.css");

    expect(page).toContain('scan: "List"');
    expect(page).toContain("data-window-restore");
    expect(motion).toContain('ArrowLeft: [-1, 0]');
    expect(motion).toContain('if (event.key === "Escape")');
    expect(motion).toContain('if (event.key === "Home")');
    expect(css).toMatch(/@media \(max-width: 899px\)[\s\S]*?work-desktop-window__close[\s\S]*?display: grid/);
  });
});
