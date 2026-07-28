import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(import.meta.dirname, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");

describe("Coursework desktop interaction contract", () => {
  it("renders one semantic three-section system from grouped project media", () => {
    const component = read("src/components/CourseworkDesktop.astro");

    expect(component).toContain('(["blender", "maya", "ae-pr"] as const)');
    expect(component).toContain("data-coursework-section");
    expect(component).toContain("data-coursework-stage");
    expect(component).toContain("data-coursework-window");
    expect(component).toContain("data-coursework-handle");
    expect(component).toContain("data-coursework-reset");
    expect(component).toContain('aria-live="polite"');
    expect(component).toContain('aria-keyshortcuts="ArrowLeft ArrowRight');
    expect(component).toContain("coursework-section__description");
    expect(component).toContain("data-static-label");
    expect(component).toContain("data-spatial-label");
    expect(component).toContain('aria-hidden="true"');
    expect(component).toContain("id={instructionId} hidden");
    expect(component).toContain("getPublicImageMetadata(src)");
    expect(component).toContain("return `${src} ${width}w`");
  });

  it("keeps native video controls separate from title-bar dragging", () => {
    const component = read("src/components/CourseworkDesktop.astro");
    const script = read("src/scripts/coursework-desktop.ts");

    expect(component).toMatch(/<video[\s\S]*?controls[\s\S]*?playsinline[\s\S]*?preload="metadata"/);
    expect(component).toContain('<source src={item.src} type="video/mp4" />');
    expect(component).toContain("data-coursework-media-body");
    expect(script).toContain('handle.addEventListener("pointerdown"');
    expect(script).toContain('window.addEventListener("pointermove"');
    expect(script).toContain('window.addEventListener("pointerup"');
    expect(script).not.toContain('[data-coursework-media-body]")?.addEventListener("pointerdown"');
  });

  it("supports bounded pointer and keyboard movement with reset and stacking", () => {
    const script = read("src/scripts/coursework-desktop.ts");

    expect(script).toContain("const KEYBOARD_STEP = 16");
    expect(script).toContain("const KEYBOARD_STEP_LARGE = 48");
    expect(script).toContain("clampWindowPosition");
    expect(script).toContain("handle.setPointerCapture(event.pointerId)");
    expect(script).toContain("requestAnimationFrame(applyPendingPosition)");
    expect(script).toContain('event.key === "Home"');
    expect(script).toContain("zCounter += 1");
    expect(script).toContain("windows.forEach(resetWindow)");
    expect(script).toContain("clampSectionWindows([item])");
    expect(script).toContain("clampSectionWindows()");
    expect(script).toContain("const syncAndClamp = () =>");
    expect(script).toContain("syncAndClamp();");
  });

  it("uses spatial desktop layout and a static mobile/coarse-pointer fallback", () => {
    const script = read("src/scripts/coursework-desktop.ts");
    const css = read("src/styles/coursework-desktop.css");

    expect(script).toContain('"(min-width: 960px) and (pointer: fine)"');
    expect(script).toContain('params.get("motion") === "reduce"');
    expect(script).toContain('root.dataset.courseworkLayout = spatial ? "spatial" : "static"');
    expect(script).toContain("handle.disabled = !spatial");
    expect(script).toContain("handle.tabIndex = spatial ? 0 : -1");
    expect(script).toContain('handle.setAttribute("aria-hidden", String(!spatial))');
    expect(script).toContain("instruction.hidden = !spatial");
    expect(script).toContain("!reducedMotionQuery.matches");
    expect(css).toMatch(/\[data-coursework-layout="spatial"\] \.coursework-stage \{[\s\S]*?overflow: hidden/);
    expect(css).toMatch(/\[data-coursework-layout="static"\] \.coursework-media-window \{[\s\S]*?position: relative/);
    expect(css).toContain('[data-coursework-layout="static"] .coursework-section__reset');
    expect(css).toContain("@media (max-width: 959px)");
    expect(css).not.toMatch(/\[data-coursework-layout="spatial"\] \.coursework-media-window \{[^}]*will-change: transform/);
    expect(css).toMatch(/\.coursework-media-window\.is-dragging \{[^}]*will-change: transform/);
  });
});
