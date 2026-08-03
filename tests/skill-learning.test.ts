import { cpSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

const root = join(import.meta.dirname, "..");

describe("CIBA skill learning workflow", () => {
  it("promotes confirmed art-direction feedback once in an isolated skill copy", () => {
    const temporaryRoot = mkdtempSync(join(tmpdir(), "ciba-art-direction-skill-"));
    const source = join(root, "skills", "ciba-art-direction");
    const skill = join(temporaryRoot, "ciba-art-direction");
    cpSync(source, skill, { recursive: true });

    try {
      const add = spawnSync(
        "python3",
        [
          join(skill, "scripts", "add_taste_observation.py"),
          "--id",
          "TASTE-TEST-CONFIRMED",
          "--quote",
          "Keep the interface quiet.",
          "--context",
          "test artifact"
        ],
        { encoding: "utf8" }
      );
      expect(add.status, add.stderr).toBe(0);

      const promoteArgs = [
        join(skill, "scripts", "promote_taste_observation.py"),
        "--id",
        "TASTE-TEST-CONFIRMED",
        "--signal",
        "Restrained interface",
        "--keep",
        "One semantic accent",
        "--avoid",
        "Decorative layers",
        "--decision",
        "Remove accents without a content role",
        "--confirmation",
        "Yes, keep that interpretation.",
        "--context",
        "test artifact",
        "--date",
        "2026-07-29"
      ];
      const promote = spawnSync("python3", promoteArgs, { encoding: "utf8" });
      expect(promote.status, promote.stderr).toBe(0);

      const ledger = readFileSync(join(skill, "references", "taste-ledger.md"), "utf8");
      expect(ledger).toContain("Promoted ID: TASTE-TEST-CONFIRMED");
      expect(ledger).toContain("Yes, keep that interpretation.");

      const duplicate = spawnSync("python3", promoteArgs, { encoding: "utf8" });
      expect(duplicate.status).not.toBe(0);
      expect(duplicate.stderr).toContain("already promoted");
    } finally {
      rmSync(temporaryRoot, { recursive: true, force: true });
    }
  });

  it("promotes confirmed typography feedback once in an isolated skill copy", () => {
    const temporaryRoot = mkdtempSync(join(tmpdir(), "ciba-typography-skill-"));
    const source = join(root, "skills", "ciba-editorial-typography");
    const skill = join(temporaryRoot, "ciba-editorial-typography");
    cpSync(source, skill, { recursive: true });

    try {
      const add = spawnSync(
        "python3",
        [
          join(skill, "scripts", "add_typography_observation.py"),
          "--id",
          "TYPE-TEST-CONFIRMED",
          "--quote",
          "Keep the title quiet.",
          "--context",
          "test artifact"
        ],
        { encoding: "utf8" }
      );
      expect(add.status, add.stderr).toBe(0);

      const promoteArgs = [
        join(skill, "scripts", "promote_typography_observation.py"),
        "--id",
        "TYPE-TEST-CONFIRMED",
        "--signal",
        "Restrained display rhythm",
        "--keep",
        "Semantic word groups",
        "--avoid",
        "Decorative character spacing",
        "--decision",
        "Compose titles by phrase",
        "--confirmation",
        "Yes, keep that interpretation.",
        "--context",
        "test artifact",
        "--date",
        "2026-07-29"
      ];
      const promote = spawnSync("python3", promoteArgs, { encoding: "utf8" });
      expect(promote.status, promote.stderr).toBe(0);

      const ledger = readFileSync(
        join(skill, "references", "typography-ledger.md"),
        "utf8"
      );
      expect(ledger).toContain("Promoted ID: TYPE-TEST-CONFIRMED");
      expect(ledger).toContain("Yes, keep that interpretation.");

      const duplicate = spawnSync("python3", promoteArgs, { encoding: "utf8" });
      expect(duplicate.status).not.toBe(0);
      expect(duplicate.stderr).toContain("already promoted");
    } finally {
      rmSync(temporaryRoot, { recursive: true, force: true });
    }
  });
});
