import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { projects } from "../src/lib/project-data";

describe("Wake Up replica project", () => {
  it("is available as a custom old-site replica with the complete source asset set", () => {
    const wakeUp = projects.find((project) => project.slug === "wake-up");
    const expectedAssets = [
      "bed-alarm.jpg",
      "grid.jpg",
      "pixel-sunset.png",
      "corridor.png",
      "statement-wide.png",
      "wake-logo-color.png",
      "intercom-plain-a.jpg",
      "dream-question-black.jpg",
      "tv-girl.png",
      "white-scroll-blank.png",
      "flooded-title.jpg",
      "wake-script-collage.png",
      "glitch-girl-collage.png",
      "intercom-line-art.png",
      "intercom-plain-b.png",
      "flooded-room-square.jpeg",
      "question-column.png",
      "quote-column.png",
      "saying-column.png",
      "disappeared-column.png",
      "dream-question-column.png",
      "wake-logo-flood.png",
      "pointing-hand-photo.png",
      "pointing-hand-line.png",
      "dream-question-black-b.jpg",
      "vapor-intercom.png",
      "disappeared-black.jpg",
      "intercom-photo-full.png"
    ];

    expect(wakeUp).toBeDefined();
    expect(wakeUp?.pageMode).toBe("wake-up-replica");
    expect(wakeUp?.tags).toContain("old-site-replica");
    expect(wakeUp?.media.length).toBeGreaterThanOrEqual(28);
    expect(wakeUp?.media.map((item) => item.src.split("/").at(-1))).toEqual(expect.arrayContaining(expectedAssets));
  });

  it("keeps removed legacy panels in the source archive without rendering them", () => {
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

    expect(component).toContain("wake-columns-panel");
    expect(component).toContain("wake-city-panel");
    expect(component).toContain("displayedMedia.map");
  });
});
