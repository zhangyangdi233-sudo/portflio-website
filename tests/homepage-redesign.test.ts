import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { homeCopy, languages } from "../src/lib/i18n";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");

describe("internationalist homepage redesign", () => {
  it("provides localized editorial copy for every homepage section", () => {
    for (const lang of languages) {
      expect(homeCopy[lang]).toMatchObject({
        heroIntro: expect.any(String),
        mediaHeading: expect.any(String),
        mediaBody: expect.any(String),
        mediaAside: expect.any(String),
        experimentHeading: expect.any(String),
        experimentBody: expect.any(String)
      });

      for (const value of Object.values(homeCopy[lang])) {
        expect(value.length).toBeGreaterThan(0);
      }
    }
  });

  it("provides a shared skip link for keyboard users", () => {
    const layout = read("../src/layouts/BaseLayout.astro");
    const styles = read("../src/styles/global.css");

    expect(layout).toContain('class="skip-link"');
    expect(layout).toContain('href="#content"');
    expect(layout).toContain("siteProfile.socials.map");
    expect(styles).toContain(".skip-link:focus-visible");
  });

  it("uses one semantic homepage h1 and dedicated immersive sections", () => {
    const home = read("../src/pages/[lang]/index.astro");

    expect(home.match(/as="h1"/g) ?? []).toHaveLength(1);
    expect(home).toContain("<HomeMediaWall");
    expect(home).toContain("<HomeWorkScene");
    expect(home).toContain('id="project-index"');
  });

  it("removes the obsolete draggable windows and file-folder stack", () => {
    const home = read("../src/pages/[lang]/index.astro");

    expect(home).not.toContain("data-work-window");
    expect(home).not.toContain("data-window-handle");
    expect(home).not.toContain("data-file-extract");
    expect(home).not.toContain("data-file-card");
  });

  it("renders stable hooks for the scattered wall and experimental work scene", () => {
    const wall = read("../src/components/home/HomeMediaWall.astro");
    const scene = read("../src/components/home/HomeWorkScene.astro");

    expect(wall).toContain("data-home-media-wall");
    expect(wall).toContain("data-home-media-pin");
    expect(wall).toContain("data-home-media");
    expect(scene).toContain("data-home-work-scene");
    expect(scene).toContain("data-home-work-scene-pin");
    expect(scene).toContain("data-home-work-card");
    expect(scene).toContain("WORK");
  });
});
