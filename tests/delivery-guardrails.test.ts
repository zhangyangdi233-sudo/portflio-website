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
    expect(layout).toContain('import.meta.env.DEV && <script is:inline src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>');
    expect(header).toContain('aria-current={worksIsCurrent ? "page" : undefined}');
    expect(window).toMatch(/<button[\s\S]*?data-window-handle/);
    expect(window).toContain('aria-keyshortcuts="Enter Space ArrowLeft ArrowRight');
    expect(window).toMatch(/data-window-handle[\s\S]*?disabled[\s\S]*?tabindex="-1"[\s\S]*?aria-hidden="true"/);
    expect(window).toContain("artDirection.motion.dragKeyboardStep");
    expect(window).toContain('<h2 class="sr-only" id={titleId}>{localized.title}</h2>');
    expect(languageSwitcher).toContain('<nav class="language-switcher" aria-label={switcherLabel}>');
    expect(home).toContain("data-v3-floating-media");
    expect(home).toContain('tabindex="0"');
    expect(home).toContain('aria-describedby="v3-media-instruction"');
    expect(home).toContain('aria-keyshortcuts="Enter Space ArrowLeft ArrowRight');
    expect(home).toContain("data-v3-letter-title");
    expect(projectMedia).toContain("data-project-media-focus");
    expect(projectMedia).toContain('tabindex="0"');
  });

  it("keeps unpublished builds absent and mirrors the artist-confirmed contact in Figma", () => {
    const plugin = read("figma-export/figma-plugin/code.js");
    const profile = JSON.parse(read("src/content/site/profile.json"));

    expect(plugin).not.toContain("PLAY EXTERNAL BUILD");
    expect(plugin).not.toContain('"Contact button"');
    expect(plugin).toContain("BUILD LINK / NOT PUBLISHED");
    expect(profile.email).toBe("mayonezu332@gmail.com");
    expect(plugin).toContain(`contactEmail: "${profile.email}"`);
    expect(plugin).toContain('text(f, "Contact email", handoffFacts.contactEmail');
    expect(plugin).not.toContain("CONTACT ROUTE / ADD VERIFIED EMAIL OR URL");
    expect(plugin).toContain("function addHomeProjectStage");
    expect(plugin).toContain("handoffFacts.homeXWheelMediaSources.map");
    expect(plugin).toContain("Low-opacity draggable media ${String(index + 1).padStart");
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
    expect(css).toMatch(/@media \(max-width: 899px\)[\s\S]*?\.v3-floating-media \{[\s\S]*?opacity: 0\.1/);
    expect(css).toMatch(/@media \(max-width: 899px\)[\s\S]*?\.v3-workspace \.v3-workspace-stage[\s\S]*?grid-template-columns: 1fr/);
    expect(css).toMatch(/@media \(max-width: 899px\)[\s\S]*?body\.ciba-v3 main \{[\s\S]*?overflow: visible/);
    expect(css).toMatch(/html:lang\(ja\) \.v3-works-intro h1,[\s\S]*?html:lang\(zh\) \.v3-works-intro h1[\s\S]*?font-size: clamp\(2\.5rem, 12vw, 4\.5rem\)[\s\S]*?word-break: normal/);
    expect(css).toContain("--workspace-height, 760px");
    expect(motion).toContain("resolveWorkspaceLayout(layout, desktopPointerQuery.matches, isReduced())");
    expect(motion).toContain('handle.setAttribute("aria-hidden", canMove ? "false" : "true")');
    expect(motion).toContain("const POINTER_SNAP_OFFSETS");
    expect(motion).toContain('event.type === "pointerup" && !drag.moved');
    expect(motion).toContain('event.key === "Enter" || event.key === " "');
    expect(motion).toContain("if (event.detail === 0) cycleWindowPosition()");
    expect(motion).toContain("const queueWorkspaceClamp");
    expect(motion).toContain("const resizeObserver = new ResizeObserver(queueWorkspaceClamp)");
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
    expect(css).toMatch(/about-page \.page-hero h1 \{[\s\S]*?letter-spacing: 0/);
    expect(css).toMatch(/@media \(max-width: 360px\)[\s\S]*?--ciba-header-height: 106px[\s\S]*?grid-template-rows: 52px 52px/);
    expect(css).toMatch(/project-page:not\(\.wake-page\) \.project-media img \{[\s\S]*?aspect-ratio: var\(--media-aspect-ratio\)[\s\S]*?object-fit: contain/);
    expect(read("src/components/ProjectImage.astro")).toContain("--media-aspect-ratio: ${width} / ${height}");
    expect(css).toMatch(/\.v3-floating-media \{[\s\S]*?filter: grayscale\(1\)[\s\S]*?opacity: 0\.1/);
    expect(css).toMatch(/\.v3-floating-media:hover,[\s\S]*?filter: grayscale\(0\)[\s\S]*?opacity: 0\.88/);
    expect(css).toMatch(
      /\.v3-cinema-layer__concept \{[\s\S]*?background: transparent;[\s\S]*?color: var\(--ciba-paper\)/
    );
    expect(css).toMatch(
      /\.v3-action-link:hover,[\s\S]*?\.v3-cinema-layer__open:focus-visible \{[\s\S]*?background: var\(--ciba-acid\);[\s\S]*?color: var\(--ciba-night\)/
    );
    expect(css).toMatch(
      /\.v3-action-link:is\(:hover, :focus-visible\) > span:last-child,[\s\S]*?color: var\(--ciba-night\)/
    );
    expect(css).toMatch(
      /@media \(max-width: 899px\)[\s\S]*?\.v3-cinema-layer__meta \{[\s\S]*?grid-template-columns: minmax\(3\.5rem, max-content\) minmax\(0, 1fr\)/
    );
  });

  it("keeps Home text on one measurable responsive safe grid", () => {
    const css = read("src/styles/ciba-v3.css");
    const home = read("src/pages/[lang]/index.astro");

    expect(css).toContain("--ciba-page-gutter: 1rem");
    expect(css).toMatch(/@media \(min-width: 640px\)[\s\S]*?--ciba-page-gutter: 1\.5rem/);
    expect(css).toMatch(/@media \(min-width: 1024px\)[\s\S]*?--ciba-page-gutter: 2rem/);
    expect(css).toMatch(/\.v3-home-hero \.v3-action-link \{[\s\S]*?inline-size: 100%[\s\S]*?min-height: var\(--ciba-space-8\)/);
    expect(css).toMatch(/\.v3-section-heading \{[\s\S]*?min-block-size: 12rem[\s\S]*?grid-template-columns: repeat\(12, minmax\(0, 1fr\)\)[\s\S]*?align-items: center/);
    expect(css).toMatch(/\.v3-section-heading > p:last-child \{[\s\S]*?max-inline-size: min\(100%, 30ic\)[\s\S]*?line-height: 1\.6[\s\S]*?text-wrap: balance/);
    expect(css).toMatch(/\.v3-cinema__sticky \{[\s\S]*?--v3-cinema-action-width: min\(24rem, 34vw\)[\s\S]*?--v3-cinema-action-padding-inline: 0\.9rem/);
    expect(css).toMatch(/\.v3-cinema__hint \{[\s\S]*?right: var\(--ciba-page-gutter\)[\s\S]*?inline-size: var\(--v3-cinema-action-width\)[\s\S]*?padding-inline: var\(--v3-cinema-action-padding-inline\)[\s\S]*?text-align: start/);
    expect(css).toMatch(/\.v3-cinema-layer__open \{[\s\S]*?width: var\(--v3-cinema-action-width\)[\s\S]*?padding-inline: var\(--v3-cinema-action-padding-inline\)/);
    expect(home).toMatch(/<div class="v3-home-hero__footer">\s*<p class="v3-home-hero__role">[\s\S]*?<a class="v3-action-link"/);
  });

  it("keeps the revised project evidence in explicit, recoverable layouts", () => {
    const detail = read("src/pages/[lang]/works/[slug].astro");
    const wake = read("src/components/WakeUpReplica.astro");
    const css = read("src/styles/ciba-v3.css");
    const escapeProject = JSON.parse(read("src/content/projects/escape-project.json"));

    expect(detail).toContain('data-project-slug={project.slug}');
    expect(detail).toContain('data-project-gallery={project.slug}');
    expect(detail).toContain("getDetailMedia(project)");
    expect(css).toMatch(/data-project-slug="escape-project"[\s\S]*?margin-block-start: clamp\(2\.5rem, 8vh, 4\.5rem\)/);
    expect(css).toMatch(/project-gallery--x-wheel[\s\S]*?grid-template-columns: repeat\(10/);
    expect(css).toMatch(/project-gallery--x-wheel > \.project-media:nth-child\(-n \+ 5\)[\s\S]*?grid-column: span 2/);
    expect(css).toMatch(/project-gallery--emida[\s\S]*?grid-template-columns: repeat\(12/);
    expect(wake).toContain('class="next-project wake-next-project"');
    expect(escapeProject.i18n.zh.body.at(-1)).toBe("网格空间、奔跑的人形、箭头和不断出现的门构成一条视觉路径。");
    expect(escapeProject.i18n.en.body.at(-1)).not.toContain("previous site");
    expect(escapeProject.i18n.ja.body.at(-1)).not.toContain("旧サイト");
  });

  it("ships a dependency-free real-browser audit for the high-risk delivery paths", () => {
    const packageJson = JSON.parse(read("package.json"));
    const audit = read("scripts/check-browser.mjs");

    expect(packageJson.scripts["check:browser"]).toBe("node scripts/check-browser.mjs");
    expect(audit).toContain("--remote-debugging-pipe=JSON");
    expect(audit).toContain("expectedXWheelSources");
    expect(audit).toContain("A Works window or its Open action starts outside the stage.");
    expect(audit).toContain("Mobile Works text is clipped rather than reflowed.");
    expect(audit).toContain("did not resolve to an acid-green field with black text and arrow on hover.");
    expect(audit).toContain("A Home project medium exceeds three lines at 320px.");
    expect(audit).toContain("Home status visibility does not match the requested per-project omissions.");
    expect(audit).toContain("Home action does not span the shared safe grid.");
    expect(audit).toContain("Home introduction title is not vertically centered.");
    expect(audit).toContain("Home supporting text has a short orphaned final line.");
    expect(audit).toContain("Home instruction text crossed the shared safe grid.");
    expect(audit).toContain("Home instruction text is not aligned to the project-record action.");
    expect(audit).toContain("Home concept panels are not transparent or lost their text.");
    expect(audit).toContain("CJK About heading has non-zero tracking.");
    expect(audit).toContain("Wake Up Latin tracking is not the restrained -0.03em contract.");
    expect(audit).toContain("Coursework media escaped its canonical 10/2/2 grouping.");
    expect(audit).toContain("One or more Coursework videos failed real browser playback.");
    expect(audit).toContain("Browser console or runtime errors were recorded.");
  });

  it("fails the production build before EdgeOne sees an oversized file", () => {
    const packageJson = JSON.parse(read("package.json"));
    const builtSiteAudit = read("scripts/check-built-site.mjs");

    expect(packageJson.scripts.build).toBe("astro build && node scripts/check-built-site.mjs");
    expect(builtSiteAudit).toContain("const EDGEONE_MAX_SINGLE_FILE_BYTES = 25 * 1024 * 1024");
    expect(builtSiteAudit).toContain("checkEdgeOneFileBudget(publicDirectory, \"public\")");
    expect(builtSiteAudit).toContain("checkEdgeOneFileBudget(dist, \"dist\")");
    expect(builtSiteAudit).toContain("EdgeOne requires every file to be below 25 MiB");
  });
});
