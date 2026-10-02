import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { projects } from "../src/lib/project-data";
import { getLocalizedString, getLocalizedStringList } from "../src/lib/projects";

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
    expect(component).toContain('class="next-project wake-next-project"');
    expect(component).toContain('href={`/${lang}/works/${nextProject.slug}/`}');
  });

  it("publishes the confirmed record copy in every locale", () => {
    const wakeUp = projects.find((project) => project.slug === "wake-up")!;

    expect(getLocalizedString(wakeUp.details?.role, "zh")).toBe("无");
    expect(getLocalizedString(wakeUp.details?.scale, "zh")).toBe("网页滚动作品");
    expect(getLocalizedStringList(wakeUp.details?.credits, "zh")).toEqual(["张扬笛 / CIBA 制作"]);
    expect(wakeUp.i18n.zh.body.at(-1)).toBe("可查看旧站档案获取更好体验。");
    expect(wakeUp.i18n.en.body.at(-1)).toBe("View the previous-site archive for a fuller experience.");
    expect(wakeUp.i18n.ja.body.at(-1)).toContain("旧サイトのアーカイブ");
  });
});
