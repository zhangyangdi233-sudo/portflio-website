import type { Language, Project } from "./types";

export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => a.priority - b.priority || a.year.localeCompare(b.year));
}

export function getFeaturedProjects(projects: Project[]): Project[] {
  return sortProjects(projects).filter((project) => project.featured).slice(0, 2);
}

export function getLocalizedProject(project: Project, lang: Language) {
  return project.i18n[lang] ?? project.i18n.en;
}

export function getProjectThemeVars(project: Project): Record<string, string> {
  return {
    "--project-primary": project.palette.primary,
    "--project-secondary": project.palette.secondary,
    "--project-ink": project.palette.ink,
    "--project-paper": project.palette.paper
  };
}
