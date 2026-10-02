import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { getHomeMedia } from "../src/lib/home-composition";
import { projects } from "../src/lib/project-data";
import { getDetailMedia, getLocalizedString, getLocalizedStringList } from "../src/lib/projects";

const root = join(import.meta.dirname, "..");
const xWheel = projects.find((project) => project.slug === "x-wheel");
const manifest = JSON.parse(
  readFileSync(join(root, "docs/research/x-wheel-added-media-manifest.json"), "utf8")
) as {
  selectionPolicy: string;
  items: Array<{
    sourceName: string;
    publicPath: string;
    bytes: number;
    sha256: string;
    width: number;
    height: number;
    kind: "image";
  }>;
};

describe("APHASIA supplied media", () => {
  it("keeps the requested detail order while selecting the supplied character studies for Home", () => {
    expect(xWheel).toBeDefined();
    expect(xWheel?.media).toHaveLength(18);
    expect(getDetailMedia(xWheel!).map((item) => item.src)).toEqual([
      "/assets/projects/x-wheel/character-full.png",
      "/assets/projects/x-wheel/aphasia-npc-01.png",
      "/assets/projects/x-wheel/aphasia-npc-02.png",
      "/assets/projects/x-wheel/aphasia-npc-03.png",
      "/assets/projects/x-wheel/aphasia-npc-04.png",
      "/assets/projects/x-wheel/aphasia-npc-05.png",
      "/assets/projects/x-wheel/character-portrait.png",
      "/assets/projects/x-wheel/cartridge-3-title.png",
      "/assets/projects/x-wheel/cartridge-3-geometry.png",
      "/assets/projects/x-wheel/aphasia-protagonist.png",
      "/assets/projects/x-wheel/character-sequence.png",
      "/assets/projects/x-wheel/aphasia-plush.png",
      "/assets/projects/x-wheel/signal-orb.png",
      "/assets/projects/x-wheel/crt-character-composition.png",
      "/assets/projects/x-wheel/emi-room.png",
      "/assets/projects/x-wheel/crt-tv.png",
      "/assets/projects/x-wheel/psx-console.png",
      "/assets/projects/x-wheel/poster.png"
    ]);
    expect(xWheel?.media.map((item) => item.src)).toEqual(
      expect.arrayContaining(manifest.items.map((item) => `/${item.publicPath}`))
    );
    expect(getHomeMedia(xWheel!).map((item) => item.src)).toEqual([
      "/assets/projects/x-wheel/character-full.png",
      "/assets/projects/x-wheel/character-portrait.png",
      "/assets/projects/x-wheel/character-sequence.png",
      "/assets/projects/x-wheel/cartridge-3-title.png"
    ]);
    expect(getHomeMedia(xWheel!).every((item) => !item.src.includes("emi-room") && !item.src.includes("crt-tv"))).toBe(true);
    expect(manifest.selectionPolicy).toContain("explicitly attached and assigned");
  });

  it("publishes the artist-confirmed medium, tags, platform, credits, and repository", () => {
    expect(xWheel?.i18n.zh.medium).toBe("Godot v4.6.3、Procreate");
    expect(getLocalizedStringList(xWheel?.tags, "zh")).toEqual(["游戏", "三维资产"]);
    expect(getLocalizedString(xWheel?.details?.role, "zh")).toBeUndefined();
    expect(getLocalizedString(xWheel?.details?.scale, "zh")).toBeUndefined();
    expect(getLocalizedString(xWheel?.details?.platform, "zh")).toBe("Windows 和 macOS");
    expect(getLocalizedStringList(xWheel?.details?.credits, "zh")).toEqual([
      "张扬笛（CIBA）担任策划、美术、UI/UX 设计、编剧、制作人、音乐；Lotn 担任程序"
    ]);
    expect(xWheel?.links.archive).toBe("https://github.com/zhangyangdi233-sudo/meme-game/tree/main");
    expect(xWheel?.i18n.zh.body.join(" ")).toContain("Lotn 正在 dev 分支重构程序代码");
  });

  it("keeps exact-byte copies and measured dimensions of all seven supplied images", async () => {
    expect(manifest.items).toHaveLength(7);

    for (const item of manifest.items) {
      const path = join(root, "public", item.publicPath);
      expect(statSync(path).size, item.publicPath).toBe(item.bytes);
      expect(createHash("sha256").update(readFileSync(path)).digest("hex"), item.publicPath).toBe(item.sha256);

      const metadata = await sharp(path).metadata();
      expect(metadata.format, item.publicPath).toBe("png");
      expect(metadata.width, item.publicPath).toBe(item.width);
      expect(metadata.height, item.publicPath).toBe(item.height);
    }
  });

  it("keeps factual, distinct alternative text and captions in every locale", () => {
    for (const media of xWheel?.media.slice(4) ?? []) {
      expect(media.type).toBe("image");

      for (const lang of ["zh", "en", "ja"] as const) {
        const alt = typeof media.alt === "string" ? media.alt : media.alt[lang];
        const caption = typeof media.caption === "string" ? media.caption : media.caption?.[lang];
        expect(alt.trim().length, `${media.src} ${lang} alt`).toBeGreaterThan(20);
        expect(caption?.trim().length, `${media.src} ${lang} caption`).toBeGreaterThan(5);
        expect(caption, `${media.src} ${lang}`).not.toBe(alt);
      }
    }
  });
});
