import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { projects } from "../src/lib/project-data";

describe("Wake Up edited project", () => {
  it("keeps removed legacy studies out of the public sequence while preserving their source files", () => {
    const wakeUp = projects.find((project) => project.slug === "wake-up");
    const removedAssets = [
      "grid.jpg",
      "runner.png",
      "corridor.png",
      "statement-large.png",
      "statement-wide.png",
      "statement-clean.png",
      "bio-text.png",
      "wake-logo-blue.png",
      "wake-logo-yellow.png",
      "flooded-room-square.jpeg",
      "pointing-hand-photo.png",
      "pointing-hand-line.png"
    ];

    expect(wakeUp).toBeDefined();
    expect(wakeUp?.pageMode).toBe("wake-up-replica");
    expect(wakeUp?.tags).not.toContain("old-site-replica");
    expect(wakeUp?.media.length).toBeGreaterThanOrEqual(20);
    const runtimeAssets = wakeUp?.media.map((item) => item.src.split("/").at(-1));
    removedAssets.forEach((asset) => {
      expect(runtimeAssets).not.toContain(asset);
      expect(existsSync(new URL(`../public/assets/projects/wake-up/${asset}`, import.meta.url))).toBe(true);
    });
  });

  it("renders only the two retained image panels", () => {
    const component = readFileSync(new URL("../src/components/WakeUpReplica.astro", import.meta.url), "utf8");

    [
      "wake-grid-panel",
      "wake-corridor-panel",
      "wake-sunset-panel",
      "wake-hand-panel",
      "wake-text-panel",
      "wake-bio-panel",
      "wake-logo-panel"
    ].forEach((className) => expect(component).not.toContain(`class=\"wake-panel ${className}`));

    expect(component).toContain("const displayedMedia = [bedAlarm, floodedTitle]");
    expect(component).toContain("wake-bed-panel");
    expect(component).toContain("wake-old-cover");
    expect(component).toContain("displayedMedia.map");
    [
      "wake-columns-panel",
      "wake-city-panel",
      "wake-intercom-panel",
      "wake-collage-panel",
      "statement-large",
      "statement-wide",
      "statement-clean",
      "wake-logo-yellow",
      "pointing-hand"
    ].forEach((token) =>
      expect(component).not.toContain(token)
    );
  });
});
