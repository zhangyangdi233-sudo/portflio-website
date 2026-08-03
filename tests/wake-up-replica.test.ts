import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { projects } from "../src/lib/project-data";
import { getLocalizedStringList } from "../src/lib/projects";

describe("Wake Up replica project", () => {
  it("publishes only the two approved Wake Up images", () => {
    const wakeUp = projects.find((project) => project.slug === "wake-up");

    expect(wakeUp).toBeDefined();
    expect(wakeUp?.pageMode).toBe("wake-up-replica");
    expect(wakeUp && getLocalizedStringList(wakeUp.tags, "en")).not.toContain("old-site-replica");
    expect(wakeUp?.media.map((item) => item.src.split("/").at(-1))).toEqual([
      "bed-alarm.png",
      "flooded-title.jpg"
    ]);
  });

  it("renders exactly two visual panels and no removed legacy panel", () => {
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

    expect(component.match(/<ProjectImage/g)).toHaveLength(2);
    expect(component.match(/<section class="wake-panel/g)).toHaveLength(2);
    expect(component).toContain('class="wake-panel wake-opening wake-bed-panel"');
    expect(component).toContain('class="wake-panel wake-opening wake-old-cover"');
  });
});
