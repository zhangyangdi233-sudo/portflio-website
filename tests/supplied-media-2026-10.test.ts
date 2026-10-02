import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { projects } from "../src/lib/project-data";
import { getDetailMedia, getLocalizedString, getLocalizedStringList } from "../src/lib/projects";

const root = join(import.meta.dirname, "..");
const manifest = JSON.parse(
  readFileSync(join(root, "docs/research/2026-10-02-supplied-media-manifest.json"), "utf8")
) as {
  selectionPolicy: string;
  items: Array<{
    project: "x-wheel" | "emida";
    publicPath: string;
    bytes: number;
    sha256: string;
    width: number;
    height: number;
  }>;
};

describe("2026-10-02 artist-supplied media", () => {
  it("keeps exact-byte deployable copies with measured dimensions", async () => {
    expect(manifest.items).toHaveLength(11);

    for (const item of manifest.items) {
      const path = join(root, "public", item.publicPath);
      expect(statSync(path).size, item.publicPath).toBe(item.bytes);
      expect(createHash("sha256").update(readFileSync(path)).digest("hex"), item.publicPath).toBe(item.sha256);

      const metadata = await sharp(path).metadata();
      expect(metadata.width, item.publicPath).toBe(item.width);
      expect(metadata.height, item.publicPath).toBe(item.height);
    }
  });

  it("places five APHASIA NPCs first and the four EMIDA boards in narrative order", () => {
    const aphasia = projects.find((project) => project.slug === "x-wheel")!;
    const emida = projects.find((project) => project.slug === "emida")!;

    expect(getDetailMedia(aphasia).slice(1, 6).map((media) => media.src)).toEqual(
      [1, 2, 3, 4, 5].map((index) => `/assets/projects/x-wheel/aphasia-npc-0${index}.png`)
    );
    expect(getDetailMedia(aphasia).slice(-4).map((media) => media.src)).toEqual([
      "/assets/projects/x-wheel/emi-room.png",
      "/assets/projects/x-wheel/crt-tv.png",
      "/assets/projects/x-wheel/psx-console.png",
      "/assets/projects/x-wheel/poster.png"
    ]);
    expect(getDetailMedia(emida).slice(1).map((media) => media.src)).toEqual([
      "/assets/projects/emida/emida-board-cover.png",
      "/assets/projects/emida/emida-board-endings.png",
      "/assets/projects/emida/emida-board-gameplay.png",
      "/assets/projects/emida/emida-board-system.png"
    ]);
    expect(manifest.selectionPolicy).toContain("five explicitly supplied APHASIA NPC sheets");
  });

  it("publishes the confirmed EMIDA role, dimensions, and credits", () => {
    const emida = projects.find((project) => project.slug === "emida")!;

    expect(getLocalizedString(emida.details?.role, "zh")).toBe("埃弥亣");
    expect(getLocalizedString(emida.details?.scale, "zh")).toBe("1920 × 1080 视觉小说画面");
    expect(getLocalizedStringList(emida.details?.credits, "zh")).toEqual([
      "张扬笛（CIBA）：策划、美术、剧本、音乐；黑凤梨A4：程序"
    ]);
  });
});
