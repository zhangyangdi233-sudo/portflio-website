import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { homeCopy, languages, ui } from "../src/lib/i18n";

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

      expect(ui[lang]).toMatchObject({
        skipToContent: expect.any(String),
        homepageNavigation: expect.any(String),
        languageSwitcher: expect.any(String),
        scroll: expect.any(String)
      });
    }
  });

  it("provides a shared skip link for keyboard users", () => {
    const layout = read("../src/layouts/BaseLayout.astro");
    const styles = read("../src/styles/global.css");

    expect(layout).toContain('class="skip-link"');
    expect(layout).toContain('href="#content"');
    expect(layout).toContain("{ui[lang].skipToContent}");
    expect(layout).toContain("siteProfile.socials.map");
    expect(styles).toContain(".skip-link:focus-visible");
  });

  it("uses one semantic homepage h1 and dedicated immersive sections", () => {
    const home = read("../src/pages/[lang]/index.astro");

    expect(home.match(/as="h1"/g) ?? []).toHaveLength(1);
    expect(home).toContain("<HomeMediaWall");
    expect(home).toContain("<HomeWorkScene");
    expect(home).toContain('id="project-index"');
    expect(home).toContain('aria-label={labels.homepageNavigation}');
    expect(home).toContain('aria-label={labels.languageSwitcher}');
    expect(home).toContain("{labels.index}");
    expect(home).toContain("({labels.scroll})");
    expect(home).toContain("kicker={labels.archive}");
    expect(home).toContain("kicker={copy.experimentHeading}");
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
    expect(wall).toContain("kicker: string;");
    expect(wall).toContain("01 / {kicker}");
    expect(scene).toContain("data-home-work-scene");
    expect(scene).toContain("data-home-work-scene-pin");
    expect(scene).toContain("data-home-work-card");
    expect(scene).toContain("kicker: string;");
    expect(scene).toContain("02 / {kicker}");
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

  it("exposes localized semantics for the language switcher and project index", () => {
    const home = read("../src/pages/[lang]/index.astro");

    expect(home).toContain('<nav class="home-language" aria-label={labels.languageSwitcher}>');
    expect(home).toContain('<h2 id="minimal-index-title" aria-label={labels.index}>PORTFOLIO / CIBA</h2>');
  });

  it("allows unbroken CJK rolling titles to wrap in the narrow static fallback", () => {
    const rollingTitle = read("../src/components/home/RollingTitle.astro");
    const styles = read("../src/styles/global.css");

    expect(rollingTitle).toContain("const isUnbroken = words.length === 1;");
    expect(rollingTitle).toContain('{ "is-unbroken": isUnbroken }');
    expect(styles).toContain(".rolling-title__word.is-unbroken");
    expect(styles).toContain("display: contents;");
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

  it("defines an internationalist ivory black and acid-green style system", () => {
    const styles = read("../src/styles/global.css");

    expect(styles).toContain("body.international-home");
    expect(styles).toContain("--home-paper: #f3ead6");
    expect(styles).toContain("--home-ink: #10100d");
    expect(styles).toContain("--home-acid: #b7ff00");
    expect(styles).toContain(".home-work-scene");
    expect(styles).toContain("scroll-snap-type: x mandatory");
    expect(styles).toMatch(/scroll-snap-align: center;\r?\n    transform: none;/);
    expect(styles).toContain(".international-home :focus-visible");
    expect(styles).toContain(".home-work-card:focus-visible");
    expect(styles).toContain("outline-color: var(--home-ink)");
  });

  it("uses scoped GSAP scenes without the obsolete draggable homepage", () => {
    const motion = read("../src/scripts/portfolio-motion.ts");

    expect(motion).toContain('[data-international-home]');
    expect(motion).toContain('[data-home-media-wall]');
    expect(motion).toContain('[data-home-work-scene]');
    expect(motion).toContain("gsap.context");
    expect(motion).toContain("trigger: mediaPin");
    expect(motion).toMatch(
      /if \(isDesktop && workScene && workScenePin && workCards\.length > 0\) \{\s*gsap\.set\(workCards, \{ attr: \{ tabindex: "-1" \} \}\);/
    );
    expect(motion).not.toContain('from "gsap/Draggable"');
    expect(motion).not.toContain("[data-work-window]");
    expect(motion).not.toContain("[data-file-extract]");
  });

  it("preserves native browser semantics for fragment links", () => {
    const motion = read("../src/scripts/portfolio-motion.ts");
    const styles = read("../src/styles/global.css");

    expect(motion).not.toContain("a[href^='#']");
    expect(motion).not.toContain("ScrollToPlugin");
    expect(motion).not.toContain("scrollTo:");
    expect(styles).toContain("scroll-behavior: smooth");
    expect(styles).toContain("scroll-behavior: auto !important");
  });

  it("guards deferred SplitText setup against reverted GSAP contexts", () => {
    const motion = read("../src/scripts/portfolio-motion.ts");

    expect(motion).toContain("(context, contextSafe) =>");
    expect(motion).toContain("contextSafe(");
    expect(motion).toContain("context.isReverted");
    expect(motion).toContain("document.fonts.ready.then");
  });

  it("skips Flip animation for reduced motion and recalculates width-based scenes on refresh", () => {
    const motion = read("../src/scripts/portfolio-motion.ts");

    expect(motion).toContain('const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");');
    expect(motion).toContain("invalidateOnRefresh: true");
    expect(motion).toContain("const shouldAnimate = !reduceMotionQuery.matches;");
    expect(motion).toContain("const state = shouldAnimate ? Flip.getState(cards) : undefined;");
    expect(motion).toMatch(
      /card\.hidden = !shouldShow;\s*}\);\s*if \(!state\) {\s*ScrollTrigger\.refresh\(\);\s*return;\s*}\s*Flip\.from\(state,/
    );
  });

  it("aligns the responsive fallback with desktop motion and resets static compositing hints", () => {
    const styles = read("../src/styles/global.css");

    expect(styles).toContain("@media (max-width: 899px)");
    expect(styles).not.toContain("@media (max-width: 767px)");
    expect(styles).toContain("@media (max-width: 420px)");
    expect(styles).toContain("font-size: clamp(3.6rem, 17vw, 7rem)");
    expect(styles).toMatch(
      /^\.home-nav a,\r?\n\.home-language a \{[^}]*min-height: 2\.75rem;[^}]*min-width: 2\.75rem;[^}]*\}/m
    );
    expect(styles).toMatch(
      /@media \(max-width: 420px\) \{[\s\S]*?\.home-nav \{[\s\S]*?gap: 0\.35rem;[\s\S]*?font-size: 0\.68rem;[\s\S]*?\.home-nav a \{[\s\S]*?padding-right: 0\.3rem;[\s\S]*?padding-left: 0\.3rem;/
    );
    expect(styles).toMatch(
      /@media \(max-width: 899px\) \{[\s\S]*?\.rolling-title__track,\r?\n  \.home-media-wall__item,\r?\n  \.home-work-card \{[\s\S]*?will-change: auto;/
    );
    expect(styles).toMatch(
      /@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\.rolling-title__track,\r?\n  \.home-media-wall__item,\r?\n  \.home-work-card \{[\s\S]*?will-change: auto;/
    );
  });
});
