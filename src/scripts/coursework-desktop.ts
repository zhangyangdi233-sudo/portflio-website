const SPATIAL_LAYOUT_QUERY = "(min-width: 960px) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const KEYBOARD_STEP = 16;
const KEYBOARD_STEP_LARGE = 48;
const POINTER_SNAP_OFFSETS = [
  { x: 0, y: 0 },
  { x: 48, y: 48 },
  { x: -48, y: 48 },
  { x: 48, y: -48 },
  { x: -48, y: -48 }
] as const;

type Point = {
  x: number;
  y: number;
};

type DragState = {
  pointerId: number;
  startClientX: number;
  startClientY: number;
  startX: number;
  startY: number;
  pending: Point | null;
  frame: number | null;
  moved: boolean;
};

const clamp = (minimum: number, maximum: number, value: number) =>
  Math.min(maximum, Math.max(minimum, value));

const readNumber = (value: string | undefined) => {
  const parsed = Number.parseFloat(value ?? "0");
  return Number.isFinite(parsed) ? parsed : 0;
};

function setWindowPosition(item: HTMLElement, x: number, y: number) {
  item.dataset.windowX = String(x);
  item.dataset.windowY = String(y);
  item.style.setProperty("--coursework-window-x", `${x}px`);
  item.style.setProperty("--coursework-window-y", `${y}px`);
}

function clampWindowPosition(item: HTMLElement, stage: HTMLElement, desiredX: number, desiredY: number): Point {
  const currentX = readNumber(item.dataset.windowX);
  const currentY = readNumber(item.dataset.windowY);
  const itemRect = item.getBoundingClientRect();
  const stageRect = stage.getBoundingClientRect();
  const handle = item.querySelector<HTMLElement>("[data-coursework-handle]");
  const titleBarHeight = Math.max(44, handle?.getBoundingClientRect().height ?? 44);

  let minimumX = currentX + stageRect.left - itemRect.left;
  let maximumX = currentX + stageRect.right - itemRect.right;

  if (minimumX > maximumX) {
    const visibleWidth = Math.min(itemRect.width, Math.max(96, titleBarHeight * 2));
    minimumX = currentX + stageRect.left + visibleWidth - itemRect.right;
    maximumX = currentX + stageRect.right - visibleWidth - itemRect.left;
  }

  let minimumY = currentY + stageRect.top - itemRect.top;
  let maximumY = currentY + stageRect.bottom - itemRect.bottom;

  if (minimumY > maximumY) {
    const visibleHeight = Math.min(itemRect.height, titleBarHeight + 44);
    minimumY = currentY + stageRect.top - itemRect.top;
    maximumY = currentY + stageRect.bottom - visibleHeight - itemRect.top;
  }

  return {
    x: clamp(Math.min(minimumX, maximumX), Math.max(minimumX, maximumX), desiredX),
    y: clamp(Math.min(minimumY, maximumY), Math.max(minimumY, maximumY), desiredY)
  };
}

function initializeCourseworkRoot(root: HTMLElement) {
  if (root.dataset.courseworkInitialized === "true") return;
  root.dataset.courseworkInitialized = "true";

  const params = new URLSearchParams(window.location.search);
  const forceStatic = params.get("motion") === "reduce";
  const spatialQuery = window.matchMedia(SPATIAL_LAYOUT_QUERY);
  const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-coursework-section]"));
  const cancelDragCallbacks: Array<() => void> = [];

  if (forceStatic) document.documentElement.dataset.motion = "reduce";

  const isSpatial = () => spatialQuery.matches && !forceStatic && !reducedMotionQuery.matches;

  const announce = (section: HTMLElement, message: string) => {
    const status = section.querySelector<HTMLElement>("[data-coursework-status]");
    if (!status) return;
    status.textContent = "";
    requestAnimationFrame(() => {
      status.textContent = message;
    });
  };

  sections.forEach((section) => {
    const stage = section.querySelector<HTMLElement>("[data-coursework-stage]");
    if (!stage) return;

    const windows = Array.from(stage.querySelectorAll<HTMLElement>("[data-coursework-window]"));
    const reset = section.querySelector<HTMLButtonElement>("[data-coursework-reset]");
    const heading = section.querySelector<HTMLElement>("[data-coursework-section-heading]");
    const initialHighestZ = Math.max(0, ...windows.map((item) => readNumber(item.dataset.initialZ)));
    let zCounter = initialHighestZ;

    const bringToFront = (item: HTMLElement) => {
      if (!isSpatial()) return;
      zCounter += 1;
      windows.forEach((candidate) => {
        candidate.classList.toggle("is-active-window", candidate === item);
      });
      item.style.zIndex = String(zCounter);
    };

    const resetWindow = (item: HTMLElement) => {
      const initialZ = readNumber(item.dataset.initialZ);
      item.dataset.pointerSnap = "0";
      setWindowPosition(item, 0, 0);
      item.style.zIndex = String(initialZ);
      item.classList.remove("is-active-window", "is-dragging");
    };

    const clampSectionWindows = (items: HTMLElement[] = windows) => {
      if (!isSpatial()) return;
      requestAnimationFrame(() => {
        items.forEach((item) => {
          const next = clampWindowPosition(
            item,
            stage,
            readNumber(item.dataset.windowX),
            readNumber(item.dataset.windowY)
          );
          setWindowPosition(item, next.x, next.y);
        });
      });
    };

    const positionMessage = (item: HTMLElement) => {
      const label = item.dataset.itemLabel ?? "";
      const moved = stage.dataset.statusMoved ?? "Moved to";
      const x = Math.round(readNumber(item.dataset.windowX));
      const y = Math.round(readNumber(item.dataset.windowY));
      return `${label}: ${moved} X ${x}, Y ${y}.`;
    };

    windows.forEach((item) => {
      const handle = item.querySelector<HTMLButtonElement>("[data-coursework-handle]");
      if (!handle) return;

      let drag: DragState | null = null;

      const cycleWindowPosition = () => {
        if (!isSpatial() || handle.disabled) return;
        const currentIndex = Number.parseInt(item.dataset.pointerSnap ?? "0", 10) || 0;
        const nextIndex = (currentIndex + 1) % POINTER_SNAP_OFFSETS.length;
        const offset = POINTER_SNAP_OFFSETS[nextIndex];
        const next = clampWindowPosition(item, stage, offset.x, offset.y);
        item.dataset.pointerSnap = String(nextIndex);
        bringToFront(item);
        setWindowPosition(item, next.x, next.y);
        announce(section, positionMessage(item));
      };

      const applyPendingPosition = () => {
        if (!drag?.pending) return;
        const next = clampWindowPosition(item, stage, drag.pending.x, drag.pending.y);
        drag.pending = null;
        drag.frame = null;
        setWindowPosition(item, next.x, next.y);
      };

      const queuePosition = (point: Point) => {
        if (!drag) return;
        drag.pending = point;
        if (drag.frame !== null) return;
        drag.frame = requestAnimationFrame(applyPendingPosition);
      };

      const cancelDrag = () => {
        if (!drag) return;
        if (drag.frame !== null) cancelAnimationFrame(drag.frame);
        drag.frame = null;
        drag.pending = null;
        item.classList.remove("is-dragging");
        if (handle.hasPointerCapture(drag.pointerId)) {
          handle.releasePointerCapture(drag.pointerId);
        }
        drag = null;
      };

      cancelDragCallbacks.push(cancelDrag);

      item.addEventListener(
        "pointerdown",
        (event) => {
          if (!isSpatial()) return;
          if ((event.target as Element).closest("[data-coursework-handle]")) return;
          bringToFront(item);
        },
        { capture: true }
      );

      item.addEventListener("focusin", () => bringToFront(item));

      handle.addEventListener("pointerdown", (event) => {
        if (!isSpatial() || handle.disabled || event.button > 0) return;
        event.preventDefault();
        bringToFront(item);
        handle.focus({ preventScroll: true });
        drag = {
          pointerId: event.pointerId,
          startClientX: event.clientX,
          startClientY: event.clientY,
          startX: readNumber(item.dataset.windowX),
          startY: readNumber(item.dataset.windowY),
          pending: null,
          frame: null,
          moved: false
        };
        item.classList.add("is-dragging");
        handle.setPointerCapture(event.pointerId);
      });

      window.addEventListener("pointermove", (event) => {
        if (!drag || drag.pointerId !== event.pointerId) return;
        event.preventDefault();
        if (Math.hypot(event.clientX - drag.startClientX, event.clientY - drag.startClientY) > 4) {
          drag.moved = true;
        }
        queuePosition({
          x: drag.startX + event.clientX - drag.startClientX,
          y: drag.startY + event.clientY - drag.startClientY
        });
      });

      const finishDrag = (event: PointerEvent) => {
        if (!drag || drag.pointerId !== event.pointerId) return;
        const shouldCycle = event.type === "pointerup" && !drag.moved;
        if (drag.pending) applyPendingPosition();
        item.classList.remove("is-dragging");
        if (handle.hasPointerCapture(event.pointerId)) {
          handle.releasePointerCapture(event.pointerId);
        }
        drag = null;
        if (shouldCycle) {
          cycleWindowPosition();
        } else {
          announce(section, positionMessage(item));
        }
      };

      window.addEventListener("pointerup", finishDrag);
      window.addEventListener("pointercancel", finishDrag);
      handle.addEventListener("click", (event) => {
        if (event.detail === 0) cycleWindowPosition();
      });

      handle.addEventListener("keydown", (event) => {
        if (!isSpatial() || handle.disabled) return;

        if (event.key === "Home") {
          event.preventDefault();
          resetWindow(item);
          clampSectionWindows([item]);
          const label = item.dataset.itemLabel ?? "";
          announce(section, `${label}: ${stage.dataset.statusItemReset ?? "Initial position restored"}.`);
          return;
        }

        const step = event.shiftKey ? KEYBOARD_STEP_LARGE : KEYBOARD_STEP;
        const delta: Point | null =
          event.key === "ArrowLeft"
            ? { x: -step, y: 0 }
            : event.key === "ArrowRight"
              ? { x: step, y: 0 }
              : event.key === "ArrowUp"
                ? { x: 0, y: -step }
                : event.key === "ArrowDown"
                  ? { x: 0, y: step }
                  : null;

        if (!delta) return;
        event.preventDefault();
        bringToFront(item);
        const next = clampWindowPosition(
          item,
          stage,
          readNumber(item.dataset.windowX) + delta.x,
          readNumber(item.dataset.windowY) + delta.y
        );
        setWindowPosition(item, next.x, next.y);
        announce(section, positionMessage(item));
      });
    });

    reset?.addEventListener("click", () => {
      cancelDragCallbacks.forEach((cancel) => cancel());
      windows.forEach(resetWindow);
      clampSectionWindows();
      zCounter = initialHighestZ;
      announce(section, `${stage.dataset.statusSectionReset ?? "All windows were restored"}.`);
      heading?.focus({ preventScroll: true });
    });
  });

  const syncLayout = () => {
    const spatial = isSpatial();
    root.dataset.courseworkLayout = spatial ? "spatial" : "static";
    root.dataset.courseworkReducedMotion = String(forceStatic || reducedMotionQuery.matches);

    if (!spatial) cancelDragCallbacks.forEach((cancel) => cancel());

    sections.forEach((section) => {
      const stage = section.querySelector<HTMLElement>("[data-coursework-stage]");
      if (!stage) return;

      stage.setAttribute(
        "aria-label",
        spatial
          ? stage.dataset.spatialLabel ?? "Movable evidence desktop"
          : stage.dataset.staticLabel ?? "Evidence in source order"
      );

      stage.querySelectorAll<HTMLButtonElement>("[data-coursework-handle]").forEach((handle) => {
        handle.disabled = !spatial;
        handle.tabIndex = spatial ? 0 : -1;
        handle.setAttribute("aria-disabled", String(!spatial));
        handle.setAttribute("aria-hidden", String(!spatial));

        const instructionId = handle.getAttribute("aria-describedby");
        const instruction = instructionId ? document.getElementById(instructionId) : null;
        if (instruction instanceof HTMLElement) instruction.hidden = !spatial;
      });
    });
  };

  const clampAfterResize = () => {
    if (!isSpatial()) return;
    requestAnimationFrame(() => {
      sections.forEach((section) => {
        const stage = section.querySelector<HTMLElement>("[data-coursework-stage]");
        if (!stage) return;
        stage.querySelectorAll<HTMLElement>("[data-coursework-window]").forEach((item) => {
          const next = clampWindowPosition(
            item,
            stage,
            readNumber(item.dataset.windowX),
            readNumber(item.dataset.windowY)
          );
          setWindowPosition(item, next.x, next.y);
        });
      });
    });
  };

  const syncAndClamp = () => {
    syncLayout();
    clampAfterResize();
  };

  spatialQuery.addEventListener("change", syncAndClamp);
  reducedMotionQuery.addEventListener("change", syncAndClamp);
  window.addEventListener("resize", clampAfterResize, { passive: true });
  syncAndClamp();
}

function initializeCourseworkDesktops() {
  document.querySelectorAll<HTMLElement>("[data-coursework-root]").forEach(initializeCourseworkRoot);
}

initializeCourseworkDesktops();
document.addEventListener("astro:page-load", initializeCourseworkDesktops);
