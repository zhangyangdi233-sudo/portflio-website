import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(import.meta.dirname, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");

describe("delivery guardrails", () => {
  it("keeps primary navigation and spatial windows keyboard reachable", () => {
    const layout = read("src/layouts/BaseLayout.astro");
    const header = read("src/components/Header.astro");
    const languageSwitcher = read("src/components/LanguageSwitcher.astro");
    const window = read("src/components/WorkDesktopWindow.astro");
    const projectMedia = read("src/components/ProjectMedia.astro");
    const home = read("src/pages/[lang]/index.astro");

    expect(layout).toContain('class="skip-link" href="#content"');
    expect(layout).toContain('class:list={["ciba-v3", pageClass]}');
    expect(header).toContain('aria-current={worksIsCurrent ? "page" : undefined}');
    expect(window).toMatch(/<button[\s\S]*?data-window-handle/);
    expect(window).toContain('aria-keyshortcuts="ArrowLeft ArrowRight');
    expect(window).toMatch(/data-window-handle[\s\S]*?disabled[\s\S]*?tabindex="-1"[\s\S]*?aria-hidden="true"/);
    expect(window).toContain("artDirection.motion.dragKeyboardStep");
    expect(window).toContain('<h2 class="sr-only" id={titleId}>{localized.title}</h2>');
    expect(languageSwitcher).toContain('<nav class="language-switcher" aria-label={switcherLabel}>');
    expect(home).toContain("data-v3-floating-media");
    expect(home).toContain('tabindex="0"');
    expect(home).toContain('aria-describedby="v3-media-instruction"');
    expect(home).toContain('aria-keyshortcuts="ArrowLeft ArrowRight');
    expect(home).toContain("data-v3-letter-title");
    expect(projectMedia).toContain("data-project-media-focus");
    expect(projectMedia).toContain('tabindex="0"');
  });

  it("does not invent missing playable or contact actions in the Figma snapshot", () => {
    const plugin = read("figma-export/figma-plugin/code.js");

    expect(plugin).not.toContain("PLAY EXTERNAL BUILD");
    expect(plugin).not.toContain('"Contact button"');
    expect(plugin).toContain("BUILD LINK / NOT PUBLISHED");
    expect(plugin).toContain("CONTACT ROUTE / ADD VERIFIED EMAIL OR URL");
    expect(plugin).toContain("function addHomeProjectStage");
    expect(plugin).toContain("Low-opacity draggable media placeholder / 10%");
    expect(plugin).toContain('"/assets/projects/x-wheel/character-full.png"');
    expect(plugin).toContain('"/assets/projects/x-wheel/character-portrait.png"');
    expect(plugin).toContain('"/assets/projects/x-wheel/character-sequence.png"');
    expect(plugin).toContain('"/assets/projects/x-wheel/cartridge-3-title.png"');
    expect(plugin).toContain("Filter / FEATURED");
    expect(plugin).toContain("Visible project status");
  });

  it("keeps the canonical breakpoint, ordered fallback, and research captures out of delivery", () => {
    const css = read("src/styles/ciba-v3.css");
    const motion = read("src/scripts/portfolio-motion.ts");
    const gitignore = read(".gitignore");

    expect(css).toContain("@media (max-width: 899px)");
    expect(css).toMatch(/@media \(max-width: 899px\)[\s\S]*?\.v3-floating-media \{[\s\S]*?position: relative/);
    expect(css).toMatch(/@media \(max-width: 899px\)[\s\S]*?\.v3-workspace \.v3-workspace-stage[\s\S]*?grid-template-columns: 1fr/);
    expect(css).toContain("--workspace-height, 760px");
    expect(motion).toContain("resolveWorkspaceLayout(layout, desktopPointerQuery.matches, isReduced())");
    expect(motion).toContain('handle.setAttribute("aria-hidden", canMove ? "false" : "true")');
    expect(gitignore).toContain("docs/design-references/the-art-of-cinema-*.png");
    expect(gitignore).toContain("docs/design-references/zutomayo-*.png");
    expect(readdirSync(join(root, "figma-export/screenshots")).filter((name) => name.endsWith(".png"))).toEqual([]);
    expect(readdirSync(join(root, "docs/design-references")).filter((name) => name.endsWith(".png"))).toEqual([]);
  });

  it("uses a pure black header and a three-colour evidence treatment", () => {
    const css = read("src/styles/ciba-v3.css");

    expect(css).toContain("--ciba-night: #090a08");
    expect(css).toContain("--ciba-paper: #f4f0dd");
    expect(css).toContain("--ciba-acid: #c6ff00");
    expect(css).toMatch(/\.site-header[\s\S]*?background: var\(--ciba-night\)[\s\S]*?color: var\(--ciba-paper\)/);
    expect(css).toContain("backdrop-filter: none");
    expect(css).toMatch(/\.language-link \{[\s\S]*?min-width: 44px[\s\S]*?min-height: 44px/);
    expect(css).toMatch(/@media \(max-width: 899px\)[\s\S]*?\.site-nav a \{[\s\S]*?min-width: 44px/);
    expect(css).toMatch(/\.language-link\.is-active \{[\s\S]*?border-color: var\(--ciba-acid\);[\s\S]*?color: var\(--ciba-paper\)/);
    expect(css).toMatch(/\.wake-back \{[\s\S]*?top: calc\(var\(--ciba-header-height\) \+ 0\.75rem\)[\s\S]*?min-width: 44px[\s\S]*?min-height: 44px/);
    expect(css).toMatch(/project-page:not\(\.wake-page\) \.project-media img \{[\s\S]*?aspect-ratio: auto[\s\S]*?object-fit: contain/);
    expect(css).toMatch(/\.v3-floating-media \{[\s\S]*?filter: grayscale\(1\)[\s\S]*?opacity: 0\.1/);
    expect(css).toMatch(/\.v3-floating-media:hover,[\s\S]*?filter: grayscale\(0\)[\s\S]*?opacity: 0\.88/);
  });
});
