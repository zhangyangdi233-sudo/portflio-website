import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(import.meta.dirname, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");

describe("delivery guardrails", () => {
  it("keeps primary navigation and spatial windows keyboard reachable", () => {
    const layout = read("src/layouts/BaseLayout.astro");
    const detail = read("src/pages/[lang]/works/[slug].astro");
    const window = read("src/components/WorkDesktopWindow.astro");
    const wake = read("src/components/WakeUpReplica.astro");

    expect(layout).toContain('class="skip-link" href="#content"');
    expect(layout).toContain("<Header lang={lang} />");
    expect(layout).not.toContain("bare");
    expect(detail).not.toContain("bare={isWakeUpReplica}");
    expect(window).toMatch(/<button[\s\S]*?data-window-handle/);
    expect(window).toContain('aria-keyshortcuts="ArrowLeft ArrowRight');
    expect(window).toContain("work-desktop-window__close-icon");
    expect(window).toContain("work-desktop-window__open-label");
    expect(wake).toContain("<h1>{localized.title}</h1>");
    expect(wake).toContain("wake-record-intro__descriptions");
  });

  it("does not invent missing playable or contact actions in the Figma snapshot", () => {
    const plugin = read("figma-export/figma-plugin/code.js");

    expect(plugin).not.toContain("PLAY EXTERNAL BUILD");
    expect(plugin).not.toContain('"Contact button"');
    expect(plugin).toContain("SOURCE ARCHIVE / VERIFIED");
    expect(plugin).toContain("CONTACT ROUTE / ADD VERIFIED EMAIL OR URL");
  });

  it("keeps the 900px choreography boundary, static fallback and research captures out of delivery", () => {
    const css = read("src/styles/art-direction.css");
    const home = read("src/pages/[lang]/index.astro");
    const gitignore = read(".gitignore");

    expect(css).toContain("@media (max-width: 899px)");
    expect(css).toMatch(/body\.cinema-home \.cinema-chapter,[\s\S]*?position: relative/);
    expect(css).toMatch(/html:lang\(ja\) body\.cinema-home \.cinema-chapter__title[\s\S]*?word-break: keep-all/);
    expect(css).toContain("--workspace-height, 760px");
    expect(home).toContain("data-cinematic-sequence");
    expect(home).toContain('class="cinema-opening"');
    expect(home).toContain("cinema-statement__body");
    expect(home).toContain("cinema-index__list");
    expect(gitignore).toContain("docs/design-references/the-art-of-cinema-*.png");
    expect(gitignore).toContain("docs/design-references/zutomayo-*.png");
  });
});
