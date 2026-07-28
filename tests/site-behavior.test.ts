import { describe, expect, it } from "vitest";
import {
  DEFAULT_LANG,
  detectPreferredLanguage,
  languages,
  switchLocalePath
} from "../src/lib/i18n";
import {
  getFeaturedProjects,
  getLocalizedMedia,
  getLocalizedProject,
  getLocalizedString,
  getLocalizedStringList,
  getPublishedProjects,
  getProjectThemeVars,
  sortProjects
} from "../src/lib/projects";
import { allProjects, projects } from "../src/lib/project-data";
import { artDirection } from "../src/lib/art-direction";

describe("localized portfolio behavior", () => {
  it("detects supported browser languages and falls back to English", () => {
    expect(detectPreferredLanguage("ja-JP,ja;q=0.9,en;q=0.8")).toBe("ja");
    expect(detectPreferredLanguage("zh-CN,zh;q=0.9,en;q=0.7")).toBe("zh");
    expect(detectPreferredLanguage("fr-FR,fr;q=0.9")).toBe(DEFAULT_LANG);
  });

  it("switches language while preserving the current route", () => {
    expect(switchLocalePath("/zh/works/x-wheel/", "ja")).toBe("/ja/works/x-wheel/");
    expect(switchLocalePath("/works/", "en")).toBe("/en/works/");
  });

  it("orders X.WHEEL first and EMIDA second for curator scanning", () => {
    const ordered = sortProjects(projects).map((project) => project.slug);
    expect(ordered.slice(0, 2)).toEqual(["x-wheel", "emida"]);
  });

  it("keeps placeholders editable without publishing them as portfolio evidence", () => {
    expect(allProjects).toHaveLength(9);
    expect(getPublishedProjects(allProjects).map((project) => project.slug)).toEqual([
      "x-wheel",
      "emida",
      "wake-up",
      "escape-project",
      "university-coursework"
    ]);
    expect(allProjects.filter((project) => project.published === false)).toHaveLength(4);
  });

  it("exposes a focused featured set without publishing a placeholder play link", () => {
    const featured = getFeaturedProjects(projects);
    expect(featured).toHaveLength(2);
    expect(featured[0].slug).toBe("x-wheel");
    expect(featured[0].links.play).toBeUndefined();
  });

  it("provides complete translations and page theme variables", () => {
    for (const project of projects) {
      for (const lang of languages) {
        const localized = getLocalizedProject(project, lang);
        expect(localized.title.length).toBeGreaterThan(0);
        expect(localized.summary.length).toBeGreaterThan(0);
        expect(getLocalizedStringList(project.tags, lang).length).toBeGreaterThan(0);

        for (const media of project.media) {
          expect(getLocalizedMedia(media, lang).alt.length).toBeGreaterThan(0);
          if (media.caption) expect(getLocalizedMedia(media, lang).caption?.length).toBeGreaterThan(0);
        }

        expect(getLocalizedString(project.details?.role, lang)?.length).toBeGreaterThan(0);
        expect(getLocalizedString(project.details?.scale, lang)?.length).toBeGreaterThan(0);
        expect(getLocalizedStringList(project.details?.credits, lang).length).toBeGreaterThan(0);
      }

      expect(getProjectThemeVars(project)).toMatchObject({
        "--project-primary": artDirection.colors.oxide,
        "--project-secondary": artDirection.colors.ink,
        "--project-ink": artDirection.colors.ink,
        "--project-paper": artDirection.colors.night
      });
    }
  });
});
