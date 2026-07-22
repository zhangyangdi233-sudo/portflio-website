import { describe, expect, it } from "vitest";
import {
  canUseSpatialDrag,
  getArrowDelta,
  resolveWorkspaceLayout
} from "../src/lib/portfolio-interactions";

describe("portfolio interaction fallbacks", () => {
  it("allows spatial dragging only with a desktop fine pointer and full motion", () => {
    expect(canUseSpatialDrag(true, false)).toBe(true);
    expect(canUseSpatialDrag(false, false)).toBe(false);
    expect(canUseSpatialDrag(true, true)).toBe(false);
  });

  it("forces an ordered workspace for touch-sized or reduced-motion contexts", () => {
    expect(resolveWorkspaceLayout("scatter", true, false)).toBe("scatter");
    expect(resolveWorkspaceLayout("list", true, false)).toBe("list");
    expect(resolveWorkspaceLayout("scatter", false, false)).toBe("list");
    expect(resolveWorkspaceLayout("scatter", true, true)).toBe("list");
  });

  it("maps keyboard movement to the documented 16px and 48px steps", () => {
    expect(getArrowDelta("ArrowRight", false)).toEqual({ x: 16, y: 0 });
    expect(getArrowDelta("ArrowUp", true)).toEqual({ x: 0, y: -48 });
    expect(getArrowDelta("Enter", false)).toBeNull();
  });
});
