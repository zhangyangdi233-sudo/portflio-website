export type WorkspaceLayout = "scatter" | "list";

export function canUseSpatialDrag(desktopFinePointer: boolean, reducedMotion: boolean): boolean {
  return desktopFinePointer && !reducedMotion;
}

export function resolveWorkspaceLayout(
  preferred: WorkspaceLayout,
  desktopFinePointer: boolean,
  reducedMotion: boolean
): WorkspaceLayout {
  return canUseSpatialDrag(desktopFinePointer, reducedMotion) ? preferred : "list";
}

export function getArrowDelta(
  key: string,
  shiftKey: boolean,
  step = 16,
  largeStep = 48
): { x: number; y: number } | null {
  const direction: Record<string, [number, number]> = {
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
    ArrowUp: [0, -1],
    ArrowDown: [0, 1]
  };
  const vector = direction[key];
  if (!vector) return null;
  const distance = shiftKey ? largeStep : step;
  return { x: vector[0] * distance, y: vector[1] * distance };
}
