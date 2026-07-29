import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { projects } from "../src/lib/project-data";

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

describe("X.WHEEL supplied media", () => {
  it("adds exactly seven authorised images after the four established homepage representatives", () => {
    expect(xWheel).toBeDefined();
    expect(xWheel?.media).toHaveLength(11);
    expect(xWheel?.media.slice(0, 4).map((item) => item.src)).toEqual([
      "/assets/projects/x-wheel/emi-room.png",
      "/assets/projects/x-wheel/crt-tv.png",
      "/assets/projects/x-wheel/psx-console.png",
      "/assets/projects/x-wheel/poster.png"
    ]);
    expect(xWheel?.media.slice(4).map((item) => item.src)).toEqual(
      manifest.items.map((item) => `/${item.publicPath}`)
    );
    expect(manifest.selectionPolicy).toContain("explicitly attached and assigned");
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
