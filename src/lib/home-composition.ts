import { getPublishedProjects } from "./projects";
import type { Project, ProjectMedia } from "./types";

export type HomeCompositionRow = Project & {
  indexLabel: string;
  homeMedia: ProjectMedia[];
};

export const homeMediaLayouts = [
  { x: "-5vw", y: "3svh", w: "72vw", r: -1.4 },
  { x: "42vw", y: "34svh", w: "38vw", r: 2.2 },
  { x: "66vw", y: "8svh", w: "30vw", r: -3.1 },
  { x: "18vw", y: "58svh", w: "32vw", r: 1.8 }
] as const;

export function getHomeMedia(project: Project): ProjectMedia[] {
  const authoredSelection = project.media
    .filter((media) => media.homeOrder !== undefined)
    .sort((a, b) => (a.homeOrder ?? 0) - (b.homeOrder ?? 0));

  return (authoredSelection.length > 0 ? authoredSelection : project.media).slice(0, homeMediaLayouts.length);
}

export function buildHomeComposition(projects: Project[]): HomeCompositionRow[] {
  return getPublishedProjects(projects).map((project, index) => ({
    ...project,
    indexLabel: String(index + 1).padStart(2, "0"),
    homeMedia: getHomeMedia(project)
  }));
}
