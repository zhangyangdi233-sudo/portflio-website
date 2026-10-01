import type { Language, Project } from "./types";
import { artDirection } from "./art-direction";

export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => a.priority - b.priority || a.year.localeCompare(b.year));
}

export function getPublishedProjects(projects: Project[]): Project[] {
  return sortProjects(projects).filter((project) => project.published !== false);
}

export function getFeaturedProjects(projects: Project[]): Project[] {
  return getPublishedProjects(projects).filter((project) => project.featured).slice(0, 2);
}

export function getLocalizedProject(project: Project, lang: Language) {
  return project.i18n[lang] ?? project.i18n.en;
}

export function getProjectThemeVars(_project: Project): Record<string, string> {
  return {
    "--project-primary": artDirection.colors.oxide,
    "--project-secondary": artDirection.colors.ink,
    "--project-ink": artDirection.colors.ink,
    "--project-paper": artDirection.colors.night
  };
}
