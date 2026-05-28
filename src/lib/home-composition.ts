import { sortProjects } from "./projects";
import type { Project } from "./types";

export type HomeCompositionRow = Project & {
  indexLabel: string;
  weight: "lead" | "focus" | "standard";
  align: "start" | "end";
  solidTone: "vermilion" | "cyan" | "ivory" | "ultramarine" | "charcoal" | "acid";
  shapeSet: "bars" | "frames" | "circles" | "diagonal" | "grid" | "slabs";
  motionAxis: "vertical" | "horizontal" | "depth";
};

const solidTones: HomeCompositionRow["solidTone"][] = [
  "vermilion",
  "cyan",
  "ivory",
  "ultramarine",
  "charcoal",
  "acid"
];

const shapeSets: HomeCompositionRow["shapeSet"][] = ["bars", "frames", "circles", "diagonal", "grid", "slabs"];

export function buildHomeComposition(projects: Project[]): HomeCompositionRow[] {
  return sortProjects(projects).map((project, index) => ({
    ...project,
    indexLabel: String(index + 1).padStart(2, "0"),
    weight: index === 0 ? "lead" : index === 1 ? "focus" : "standard",
    align: index % 2 === 0 ? "start" : "end",
    solidTone: solidTones[index % solidTones.length],
    shapeSet: shapeSets[index % shapeSets.length],
    motionAxis: index % 3 === 0 ? "horizontal" : index % 3 === 1 ? "depth" : "vertical"
  }));
}
