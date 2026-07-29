export type WorkspaceLayout = "scatter" | "list";
export type Bounds = { left: number; right: number; top: number; bottom: number };
export type Point = { x: number; y: number };

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

export function clampOffsetWithinBounds(
  item: Bounds,
  container: Bounds,
  current: Point,
  desired: Point
): Point {
  const clamp = (minimum: number, maximum: number, value: number) =>
    Math.min(maximum, Math.max(minimum, value));
  const minX = current.x + container.left - item.left;
  const maxX = current.x + container.right - item.right;
  const minY = current.y + container.top - item.top;
  const maxY = current.y + container.bottom - item.bottom;

  return {
    x: clamp(Math.min(minX, maxX), Math.max(minX, maxX), desired.x),
    y: clamp(Math.min(minY, maxY), Math.max(minY, maxY), desired.y)
  };
}
