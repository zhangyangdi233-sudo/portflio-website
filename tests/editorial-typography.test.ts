import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(import.meta.dirname, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");

describe("CIBA editorial typography", () => {
  it("removes redundant hero metadata and reduces the opening to one practice line", () => {
    const home = read("src/pages/[lang]/index.astro");

    expect(home).not.toContain("v3-home-hero__meta");
    expect(home).not.toContain("v3-home-hero__statement");
    expect(home).not.toContain("ARTIST ARCHIVE / TOKYO");
    expect(home).not.toContain("DIGITAL PORTFOLIO / 2026");
    expect(home).not.toContain("アーティスト・アーカイブ / 東京");
    expect(home).toContain("游戏 / 网页 / 影像");
    expect(home).toContain("Games / Web / Moving image");
    expect(home).toContain("ゲーム / ウェブ / 映像");
    expect(home).toContain("五项公开记录");
    expect(home).toContain("Five records are public");
    expect(home).toContain("大学課題の記録1点");
  });

  it("composes display titles as words and forces the Escape break", () => {
    const home = read("src/pages/[lang]/index.astro");
    const css = read("src/styles/ciba-v3.css");

    expect(home).toContain("composeTitleWords");
    expect(home).toContain('project.slug === "escape-project"');
    expect(home).toContain('data-title-word={wordIndex + 1}');
    expect(css).toContain(".v3-title-word");
    expect(css).toMatch(/\.v3-letter-track > span \{[\s\S]*?overflow: hidden/);
    expect(css).toMatch(
      /\.v3-cinema-layer__title\.has-editorial-break \.v3-title-word:nth-child\(2\) \{[\s\S]*?flex-basis: 100%/
    );
  });

  it("uses restrained Latin tracking and independent CJK spacing", () => {
    const css = read("src/styles/ciba-v3.css");
    const wakeCss = read("src/styles/art-direction.css");
    const courseworkCss = read("src/styles/coursework-desktop.css");
    const wake = read("src/components/WakeUpReplica.astro");

    expect(css).toMatch(/\.v3-monument \{[\s\S]*?letter-spacing: -0\.03em/);
    expect(css).toMatch(/\.v3-cinema-layer__title \{[\s\S]*?letter-spacing: -0\.025em/);
    expect(css).toMatch(
      /html:lang\(ja\) \.v3-cinema-layer__title,[\s\S]*?html:lang\(zh\) \.v3-cinema-layer__title \{[\s\S]*?letter-spacing: 0/
    );
    expect(css).not.toContain("letter-spacing: -0.095em");
    expect(css).not.toContain("letter-spacing: -0.08em");
    expect(css).not.toContain("letter-spacing: -0.07em");
    expect(wake).toContain('const titleWords = lang === "en"');
    expect(wake).toContain('class="wake-record-intro__title-word"');
    expect(wakeCss).toMatch(/\.wake-record-intro h1 \{[\s\S]*?letter-spacing: -0\.03em/);
    expect(wakeCss).toMatch(
      /html:lang\(ja\) \.wake-record-intro h1,[\s\S]*?html:lang\(zh\) \.wake-record-intro h1 \{[\s\S]*?letter-spacing: 0/
    );
    expect(wakeCss).not.toContain("letter-spacing: -0.075em");
    expect(courseworkCss).toMatch(/\.coursework-media-window__move \{[\s\S]*?letter-spacing: 0/);
    expect(courseworkCss).not.toContain("letter-spacing: -0.12em");
  });
});
