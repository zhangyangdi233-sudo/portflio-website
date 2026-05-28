import emida from "../content/projects/emida.json";
import residualGarden from "../content/projects/residual-garden.json";
import signalRoom from "../content/projects/signal-room.json";
import softBoundaries from "../content/projects/soft-boundaries.json";
import thresholdArchive from "../content/projects/threshold-archive.json";
import wakeUp from "../content/projects/wake-up.json";
import xWheel from "../content/projects/x-wheel.json";
import type { Project } from "./types";

const asProject = (project: unknown): Project => project as Project;

export const projects = [
  asProject(xWheel),
  asProject(emida),
  asProject(wakeUp),
  asProject(softBoundaries),
  asProject(residualGarden),
  asProject(signalRoom),
  asProject(thresholdArchive)
];
