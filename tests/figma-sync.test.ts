import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(import.meta.dirname, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");

describe("editable Figma delivery", () => {
  it("imports into the current page and exposes import/export commands", () => {
    const manifest = JSON.parse(read("figma-export/figma-plugin/manifest.json"));
    const plugin = read("figma-export/figma-plugin/code.js");

    expect(manifest.documentAccess).toBe("dynamic-page");
    expect(manifest.menu).toEqual([
      { name: "Import / refresh editable portfolio", command: "import" },
      { name: "Export changes to Codex", command: "export" }
    ]);
    expect(manifest.networkAccess.allowedDomains).toEqual(["none"]);
    expect(manifest.networkAccess.devAllowedDomains).toEqual([
      "http://127.0.0.1:4323",
      "http://127.0.0.1:4767"
    ]);
    expect(plugin).toContain("const page = existingPage || figma.currentPage");
    expect(plugin).toContain("await figma.setCurrentPageAsync(page)");
    expect(plugin).not.toContain("figma.currentPage = page");
    expect(plugin).not.toContain("existingPage || figma.createPage()");
  });

  it("keeps the accepted X.WHEEL Home evidence as four independent image layers", () => {
    const plugin = read("figma-export/figma-plugin/code.js");

    expect(plugin).toContain("handoffFacts.homeXWheelMediaSources.map");
    expect(plugin).toContain("Low-opacity draggable media ${String(index + 1).padStart");
    expect(plugin).toContain('media.setPluginData("homeOrder", String(index + 1))');
    expect(plugin).toContain('return setImageFill(media, src, "FIT")');
    expect(plugin).toContain("media.opacity = 0.1");
  });

  it("exports local-only, reversible snapshots for design-to-code review", () => {
    const plugin = read("figma-export/figma-plugin/code.js");
    const server = read("scripts/figma-sync-server.mjs");
    const gitignore = read(".gitignore");
    const mapping = JSON.parse(read("docs/figma/ciba-portfolio-sync.json"));

    expect(plugin).toContain('const SYNC_ENDPOINT = "http://127.0.0.1:4767/snapshot"');
    expect(plugin).toContain('"x-ciba-sync": "ciba-local-v1"');
    expect(plugin).toContain("frames: generated.map(snapshotNode)");
    expect(server).toContain('const host = "127.0.0.1"');
    expect(server).toContain("const maxBytes = 10 * 1024 * 1024");
    expect(server).toContain("await copyFile(latestPath, previousPath)");
    expect(server).toContain("await writeFile(historyPath");
    expect(gitignore).toContain("figma-export/sync/latest.json");
    expect(gitignore).toContain("figma-export/sync/previous.json");
    expect(gitignore).toContain("figma-export/sync/history/");
    expect(mapping.figma.fileKey).toBe("xyINqLy60s9MELHd2HmViK");
    expect(mapping.localSync.command).toBe("npm run figma:sync");
    expect(mapping.routes).toHaveLength(7);
  });
});
