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

  it("preserves homepage identity, rolling title, and language metadata hooks", () => {
    const home = read("../src/pages/[lang]/index.astro");
    const rollingTitle = read("../src/components/home/RollingTitle.astro");

    expect(home).toContain("data-international-home");
    expect(rollingTitle).toContain("data-rolling-title");
    expect(rollingTitle).toContain("data-rolling-hero");
    expect(home).toContain("lang={targetLang}");
    expect(home).toContain("hreflang={targetLang}");
  });

  it("uses non-empty shared media previews for immersive homepage sections", () => {
    const contentConfig = read("../src/content.config.ts");
    const projectMedia = read("../src/components/ProjectMedia.astro");
    const wall = read("../src/components/home/HomeMediaWall.astro");
    const scene = read("../src/components/home/HomeWorkScene.astro");

    expect(contentConfig).toMatch(/media: z\.array\([\s\S]*?\)\.min\(1\)/);
    expect(wall).toContain('import ProjectMedia from "../ProjectMedia.astro"');
    expect(scene).toContain('import ProjectMedia from "../ProjectMedia.astro"');
    expect(wall).not.toContain('filter((item) => item.type === "image")');
    expect(projectMedia).toContain("preview?: boolean");
    expect(projectMedia).toContain("preview ? undefined");
    expect(projectMedia).toContain("!preview && media.caption");
    expect(projectMedia).toContain("controls={!preview}");
    expect(wall).toContain("<ProjectMedia media={item.media} preview />");
    expect(scene).toContain('find((item) => item.type === "image") ?? project.media[0]');
    expect(scene).toContain("<ProjectMedia media={preview} preview />");
    expect(wall).toContain('as="h2"');
    expect(scene).toContain('as="h2"');
  });

  it("uses preview media inside linked project cards", () => {
    const projectCard = read("../src/components/ProjectCard.astro");

    expect(projectCard).toContain("<ProjectMedia media={project.media[0]} preview />");
  });
});
