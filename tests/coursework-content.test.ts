import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join, parse } from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { projects } from "../src/lib/project-data";

const root = join(import.meta.dirname, "..");
const coursework = projects.find((project) => project.slug === "university-coursework");
const manifest = JSON.parse(
  readFileSync(join(root, "docs/research/university-coursework-media-manifest.json"), "utf8")
) as {
  selectionPolicy: string;
  sourceFolderAudit: {
    nonHiddenFileCount: number;
    includedExplicitlyAssignedCount: number;
    excludedUnassignedCount: number;
    excludedUnassignedSourceNames: string[];
  };
  items: Array<{
    group: "blender" | "maya" | "ae-pr";
    sourceName: string;
    publicPath: string;
    bytes: number;
    sha256: string;
    kind: "image" | "video";
    codecEvidence?: string[];
  }>;
};

describe("University Coursework content", () => {
  it("publishes the three supplied evidence groups and no extra media", () => {
    expect(coursework).toBeDefined();
    expect(coursework?.pageMode).toBe("coursework-desktop");
    expect(coursework?.year).toBe("—");
    expect(coursework?.media).toHaveLength(14);

    const counts = coursework?.media.reduce<Record<string, number>>((result, media) => {
      result[media.group ?? "missing"] = (result[media.group ?? "missing"] ?? 0) + 1;
      return result;
    }, {});

    expect(counts).toEqual({ blender: 10, maya: 2, "ae-pr": 2 });
    expect(coursework?.media.every((media) => media.window && media.group)).toBe(true);
    expect(new Set(coursework?.media.map((media) => media.src)).size).toBe(14);
  });

  it("records the explicit fourteen-file inclusion boundary and every unassigned folder item", () => {
    expect(manifest.selectionPolicy).toContain("explicitly attached and assigned");
    expect(manifest.sourceFolderAudit).toMatchObject({
      nonHiddenFileCount: 27,
      includedExplicitlyAssignedCount: 14,
      excludedUnassignedCount: 13
    });
    expect(manifest.sourceFolderAudit.excludedUnassignedSourceNames).toHaveLength(13);

    const included = new Set(manifest.items.map((item) => item.sourceName));
    expect(manifest.sourceFolderAudit.excludedUnassignedSourceNames.every((name) => !included.has(name))).toBe(true);
  });

  it("keeps exact-byte deployable copies of every authorised source item", () => {
    expect(manifest.items).toHaveLength(14);

    for (const item of manifest.items) {
      const path = join(root, "public", item.publicPath);
      expect(statSync(path).size, item.publicPath).toBe(item.bytes);
      expect(createHash("sha256").update(readFileSync(path)).digest("hex"), item.publicPath).toBe(item.sha256);
    }
  });

  it("keeps all five videos in progressively playable H.264 MP4 containers", () => {
    const videos = manifest.items.filter((item) => item.kind === "video");
    expect(videos).toHaveLength(5);

    for (const video of videos) {
      expect(video.publicPath.endsWith(".mp4")).toBe(true);
      expect(video.codecEvidence).toContain("avc1");
      expect(video.codecEvidence).toContain("moov-before-mdat");

      const binary = readFileSync(join(root, "public", video.publicPath));
      const signature = binary.toString("latin1");
      expect(signature.indexOf("ftyp")).toBeGreaterThanOrEqual(0);
      expect(signature.indexOf("avc1")).toBeGreaterThanOrEqual(0);
      expect(signature.indexOf("moov")).toBeGreaterThanOrEqual(0);
      expect(signature.indexOf("mdat")).toBeGreaterThan(signature.indexOf("moov"));
    }
  });

  it("provides compact 480px and 960px WebP derivatives for every coursework image", async () => {
    const images = manifest.items.filter((item) => item.kind === "image");
    expect(images).toHaveLength(9);

    for (const image of images) {
      const source = join(root, "public", image.publicPath);
      const parsed = parse(source);

      for (const width of [480, 960]) {
        const derivative = join(parsed.dir, `${parsed.name}-${width}.webp`);
        expect(existsSync(derivative), derivative).toBe(true);
        expect(statSync(derivative).size, derivative).toBeGreaterThan(0);

        const metadata = await sharp(derivative).metadata();
        expect(metadata.format, derivative).toBe("webp");
        expect(metadata.width ?? Number.POSITIVE_INFINITY, derivative).toBeLessThanOrEqual(width);
      }
    }
  });
});
