import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(import.meta.dirname, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");

describe("cinematic Home V2", () => {
  it("keeps a complete evidence path in semantic source order", () => {
    const home = read("src/pages/[lang]/index.astro");

    expect(home).toContain(".slice(0, 4)");
    expect(home).toContain('class="cinema-opening"');
    expect(home).toContain("data-cinematic-sequence");
    expect(home).toContain("data-cinematic-chapter");
    expect(home).toContain("cinema-statement__body");
    expect(home).toContain("cinema-index__list");
    expect(home).toContain("compositionRows.map");
  });

  it("uses only retained Wake Up evidence in the selected sequence", () => {
    const home = read("src/pages/[lang]/index.astro");

    expect(home).toContain('["bed-alarm", "flooded-title"]');
    expect(home).toContain("/(grid|runner|statement|logo|hand|corridor)/i");
  });

  it("enhances only desktop motion while mobile and reduced motion remain document flow", () => {
    const motion = read("src/scripts/portfolio-motion.ts");
    const css = read("src/styles/art-direction.css");

    expect(motion).toMatch(/if \(isDesktop && stage && chapters\.length > 0\)[\s\S]*?classList\.add\("is-enhanced"\)/);
    expect(css).toMatch(/\.cinema-sequence\.is-enhanced \.cinema-chapter[\s\S]*?position: absolute/);
    expect(css).toMatch(/@media \(max-width: 899px\)[\s\S]*?\.cinema-sequence\.is-enhanced \.cinema-chapter[\s\S]*?position: relative/);
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.cinema-sequence__chapters[\s\S]*?display: block/);
  });

  it("restores the stable site navigation hidden by the legacy composition stylesheet", () => {
    const css = read("src/styles/art-direction.css");

    expect(css).toMatch(/body\.cinema-home \.site-header \{[\s\S]*?display: grid/);
  });

  it("does not import reference-site runtime code or assets", () => {
    const runtime = [
      read("src/pages/[lang]/index.astro"),
      read("src/scripts/portfolio-motion.ts"),
      read("src/styles/art-direction.css")
    ].join("\n");

    expect(runtime).not.toMatch(/zutomayo\.net|theartofcinema\.xyz|Satoshi Black|\.drag-and-drop/);
  });
});
