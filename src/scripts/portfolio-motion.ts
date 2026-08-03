import { artDirection } from "../lib/art-direction";
import {
  canUseSpatialDrag,
  clampOffsetWithinBounds,
  getArrowDelta,
  resolveWorkspaceLayout,
  type WorkspaceLayout
} from "../lib/portfolio-interactions";

const params = new URLSearchParams(window.location.search);
const forceReducedMotion = params.get("motion") === "reduce";
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const workspaceTokens = artDirection.workspace;
const desktopPointerQuery = window.matchMedia(`(min-width: ${workspaceTokens.breakpoint}px) and (pointer: fine)`);
const POINTER_SNAP_OFFSETS = [
  { x: 0, y: 0 },
  { x: 48, y: 48 },
  { x: -48, y: 48 },
  { x: 48, y: -48 },
  { x: -48, y: -48 }
] as const;

if (forceReducedMotion) document.documentElement.dataset.motion = "reduce";

const isReduced = () => forceReducedMotion || reduceMotionQuery.matches;
const canDrag = () => canUseSpatialDrag(desktopPointerQuery.matches, isReduced());
const clamp = (minimum: number, maximum: number, value: number) => Math.min(maximum, Math.max(minimum, value));
const readNumber = (value: string | undefined) => Number.parseFloat(value ?? "0") || 0;

function activateLetterTitle(title: HTMLElement | null) {
  if (!title) return;
  title.classList.remove("is-letter-active");
  if (isReduced()) return;
  requestAnimationFrame(() => requestAnimationFrame(() => title.classList.add("is-letter-active")));
}

activateLetterTitle(document.querySelector<HTMLElement>("[data-v3-hero] [data-v3-letter-title]"));

type DragState = {
  pointerId: number;
  startClientX: number;
  startClientY: number;
  startX: number;
  startY: number;
  moved: boolean;
};

function clampFloatingMedia(item: HTMLElement, stage: HTMLElement, desiredX: number, desiredY: number) {
  const currentX = readNumber(item.dataset.dragX);
  const currentY = readNumber(item.dataset.dragY);
  const itemRect = item.getBoundingClientRect();
  const stageRect = stage.getBoundingClientRect();
  const keepVisible = Math.min(96, Math.max(56, itemRect.width * 0.18));
  const minX = currentX + stageRect.left + keepVisible - itemRect.right;
  const maxX = currentX + stageRect.right - keepVisible - itemRect.left;
  const minY = currentY + stageRect.top + keepVisible - itemRect.bottom;
  const maxY = currentY + stageRect.bottom - keepVisible - itemRect.top;

  return {
    x: clamp(Math.min(minX, maxX), Math.max(minX, maxX), desiredX),
    y: clamp(Math.min(minY, maxY), Math.max(minY, maxY), desiredY)
  };
}

function setFloatingPosition(item: HTMLElement, x: number, y: number) {
  item.dataset.dragX = String(x);
  item.dataset.dragY = String(y);
  item.style.setProperty("--drag-x", `${x}px`);
  item.style.setProperty("--drag-y", `${y}px`);
}

function initializeFloatingMedia(item: HTMLElement, stage: HTMLElement) {
  let drag: DragState | null = null;

  const cycleFloatingPosition = () => {
    if (!canDrag()) return;
    const currentIndex = Number.parseInt(item.dataset.pointerSnap ?? "0", 10) || 0;
    const nextIndex = (currentIndex + 1) % POINTER_SNAP_OFFSETS.length;
    const offset = POINTER_SNAP_OFFSETS[nextIndex];
    const next = clampFloatingMedia(item, stage, offset.x, offset.y);
    item.dataset.pointerSnap = String(nextIndex);
    setFloatingPosition(item, next.x, next.y);
  };

  item.addEventListener("pointerdown", (event) => {
    if (!canDrag() || event.button !== 0) return;
    event.preventDefault();
    drag = {
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startX: readNumber(item.dataset.dragX),
      startY: readNumber(item.dataset.dragY),
      moved: false
    };
    item.classList.add("is-dragging");
    item.setPointerCapture(event.pointerId);
  });

  item.addEventListener("pointermove", (event) => {
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (Math.hypot(event.clientX - drag.startClientX, event.clientY - drag.startClientY) > 4) {
      drag.moved = true;
    }
    const next = clampFloatingMedia(
      item,
      stage,
      drag.startX + event.clientX - drag.startClientX,
      drag.startY + event.clientY - drag.startClientY
    );
    setFloatingPosition(item, next.x, next.y);
  });

  const endDrag = (event: PointerEvent) => {
    if (!drag || drag.pointerId !== event.pointerId) return;
    const shouldCycle = event.type === "pointerup" && !drag.moved;
    item.classList.remove("is-dragging");
    if (item.hasPointerCapture(event.pointerId)) item.releasePointerCapture(event.pointerId);
    drag = null;
    if (shouldCycle) cycleFloatingPosition();
  };

  item.addEventListener("pointerup", endDrag);
  item.addEventListener("pointercancel", endDrag);

  item.addEventListener("keydown", (event) => {
    if (!canDrag()) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      cycleFloatingPosition();
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      item.dataset.pointerSnap = "0";
      setFloatingPosition(item, 0, 0);
      return;
    }

    const delta = getArrowDelta(
      event.key,
      event.shiftKey,
      artDirection.motion.dragKeyboardStep,
      artDirection.motion.dragKeyboardStepLarge
    );
    if (!delta) return;
    event.preventDefault();
    const next = clampFloatingMedia(
      item,
      stage,
      readNumber(item.dataset.dragX) + delta.x,
      readNumber(item.dataset.dragY) + delta.y
    );
    setFloatingPosition(item, next.x, next.y);
  });
}

const cinema = document.querySelector<HTMLElement>("[data-v3-cinema]");

if (cinema) {
  const stage = cinema.querySelector<HTMLElement>("[data-v3-cinema-stage]");
  const layers = Array.from(cinema.querySelectorAll<HTMLElement>("[data-v3-cinema-layer]"));
  const triggers = Array.from(cinema.querySelectorAll<HTMLElement>("[data-v3-cinema-trigger]"));
  const current = cinema.querySelector<HTMLElement>("[data-v3-cinema-current]");
  let activeIndex = 0;
  let observer: IntersectionObserver | null = null;

  const setLayerAccessibility = (layer: HTMLElement, active: boolean, linear: boolean) => {
    layer.setAttribute("aria-hidden", linear || active ? "false" : "true");
    layer.inert = !linear && !active;
    layer.querySelectorAll<HTMLElement>("[data-v3-floating-media]").forEach((item) => {
      item.tabIndex = linear || active ? 0 : -1;
      if (linear) {
        item.removeAttribute("role");
      } else {
        item.setAttribute("role", "button");
      }
    });
  };

  const activateLayer = (index: number) => {
    if (!layers[index]) return;
    activeIndex = index;
    layers.forEach((layer, layerIndex) => {
      const active = layerIndex === index;
      layer.classList.toggle("is-active", active);
      setLayerAccessibility(layer, active, false);
      const title = layer.querySelector<HTMLElement>("[data-v3-letter-title]");
      if (!active) title?.classList.remove("is-letter-active");
    });
    if (current) current.textContent = String(index + 1).padStart(2, "0");
    activateLetterTitle(layers[index].querySelector<HTMLElement>("[data-v3-letter-title]"));
  };

  const disconnectObserver = () => {
    observer?.disconnect();
    observer = null;
  };

  const syncCinemaMode = () => {
    const enhanced = canDrag();
    cinema.classList.toggle("is-enhanced", enhanced);
    disconnectObserver();

    if (!enhanced) {
      layers.forEach((layer) => {
        layer.classList.add("is-active");
        setLayerAccessibility(layer, true, true);
        layer.querySelector<HTMLElement>("[data-v3-letter-title]")?.classList.remove("is-letter-active");
      });
      return;
    }

    activateLayer(activeIndex);
    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.workIndex ?? 0);
        activateLayer(index);
      },
      { rootMargin: "-44% 0px -44% 0px", threshold: [0, 0.01, 0.1] }
    );
    triggers.forEach((trigger) => observer?.observe(trigger));
  };

  if (stage) {
    cinema.querySelectorAll<HTMLElement>("[data-v3-floating-media]").forEach((item) => initializeFloatingMedia(item, stage));
  }

  syncCinemaMode();
  desktopPointerQuery.addEventListener("change", syncCinemaMode);
  reduceMotionQuery.addEventListener("change", syncCinemaMode);
}

const workspace = document.querySelector<HTMLElement>("[data-workspace-root]");

if (workspace) {
  const stage = workspace.querySelector<HTMLElement>("[data-workspace-stage]");
  const windows = Array.from(workspace.querySelectorAll<HTMLElement>("[data-workspace-window]"));
  const filterControls = Array.from(workspace.querySelectorAll<HTMLButtonElement>("[data-workspace-filter]"));
  const layoutControls = Array.from(workspace.querySelectorAll<HTMLButtonElement>("[data-layout]"));
  const resetControl = workspace.querySelector<HTMLButtonElement>("[data-workspace-reset]");
  const restoreControls = Array.from(workspace.querySelectorAll<HTMLButtonElement>("[data-window-restore]"));
  const status = workspace.querySelector<HTMLElement>("[data-workspace-status]");
  const minimized = new Set<string>();
  let currentFilter = "all";
  let preferredLayout: WorkspaceLayout = "scatter";
  let effectiveLayout: WorkspaceLayout = "scatter";
  let zCounter = 20;
  let clampFrame: number | null = null;

  const setWindowPosition = (item: HTMLElement, x: number, y: number) => {
    item.dataset.windowDx = String(x);
    item.dataset.windowDy = String(y);
    item.style.setProperty("--window-dx", `${x}px`);
    item.style.setProperty("--window-dy", `${y}px`);
  };

  const clampWindowPosition = (item: HTMLElement, desiredX: number, desiredY: number) => {
    if (!stage) return { x: desiredX, y: desiredY };
    const currentX = readNumber(item.dataset.windowDx);
    const currentY = readNumber(item.dataset.windowDy);
    const itemRect = item.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();
    return clampOffsetWithinBounds(
      itemRect,
      stageRect,
      { x: currentX, y: currentY },
      { x: desiredX, y: desiredY }
    );
  };

  const clampVisibleWindows = () => {
    if (!stage || effectiveLayout !== "scatter" || !canDrag()) return;
    windows.forEach((item) => {
      if (item.hidden) return;
      const next = clampWindowPosition(
        item,
        readNumber(item.dataset.windowDx),
        readNumber(item.dataset.windowDy)
      );
      setWindowPosition(item, next.x, next.y);
    });
  };

  const queueWorkspaceClamp = () => {
    if (clampFrame !== null) cancelAnimationFrame(clampFrame);
    clampFrame = requestAnimationFrame(() => {
      clampFrame = requestAnimationFrame(() => {
        clampFrame = null;
        clampVisibleWindows();
      });
    });
  };

  const bringToFront = (item: HTMLElement) => {
    windows.forEach((windowItem) => windowItem.classList.toggle("is-active-window", windowItem === item));
    zCounter += 1;
    item.style.zIndex = String(zCounter);
  };

  const matchesFilter = (item: HTMLElement) => {
    const featured = item.dataset.featured === "true";
    return currentFilter === "all" || (currentFilter === "featured" && featured) || (currentFilter === "archive" && !featured);
  };

  const syncVisibility = () => {
    let total = 0;
    let visible = 0;
    windows.forEach((item) => {
      const slug = item.dataset.slug ?? "";
      const matches = matchesFilter(item);
      const hidden = !matches || minimized.has(slug);
      if (matches) total += 1;
      if (!hidden) visible += 1;
      item.hidden = hidden;
      item.setAttribute("aria-hidden", hidden ? "true" : "false");
      item.inert = hidden;

      const restore = restoreControls.find((control) => control.dataset.windowRestore === slug);
      if (restore) {
        restore.hidden = !matches;
        restore.setAttribute("aria-pressed", minimized.has(slug) ? "false" : "true");
      }
    });

    if (status) {
      const label = status.dataset.visibleLabel ?? "visible";
      status.textContent = `${String(visible).padStart(2, "0")} / ${String(total).padStart(2, "0")} ${label}`;
    }

    queueWorkspaceClamp();
  };

  const syncHandles = () => {
    const canMove = effectiveLayout === "scatter" && canDrag();
    windows.forEach((item) => {
      const handle = item.querySelector<HTMLButtonElement>("[data-window-handle]");
      if (!handle) return;
      handle.disabled = !canMove;
      handle.tabIndex = canMove ? 0 : -1;
      handle.setAttribute("aria-hidden", canMove ? "false" : "true");
    });
  };

  const setLayout = (layout: WorkspaceLayout, remember = true) => {
    if (remember) preferredLayout = layout;
    effectiveLayout = resolveWorkspaceLayout(layout, desktopPointerQuery.matches, isReduced());
    workspace.classList.toggle("is-list-mode", effectiveLayout === "list");
    layoutControls.forEach((control) => {
      control.setAttribute("aria-pressed", String(control.dataset.layout === effectiveLayout));
    });
    syncHandles();
    queueWorkspaceClamp();
  };

  const minimizeWindow = (item: HTMLElement) => {
    const slug = item.dataset.slug;
    if (!slug) return;
    minimized.add(slug);
    syncVisibility();
    restoreControls.find((control) => control.dataset.windowRestore === slug)?.focus();
  };

  windows.forEach((item) => {
    const handle = item.querySelector<HTMLButtonElement>("[data-window-handle]");
    const minimize = item.querySelector<HTMLButtonElement>("[data-window-minimize]");
    let drag: DragState | null = null;

    const cycleWindowPosition = () => {
      if (handle?.disabled) return;
      const currentIndex = Number.parseInt(item.dataset.pointerSnap ?? "0", 10) || 0;
      const nextIndex = (currentIndex + 1) % POINTER_SNAP_OFFSETS.length;
      const offset = POINTER_SNAP_OFFSETS[nextIndex];
      const next = clampWindowPosition(item, offset.x, offset.y);
      item.dataset.pointerSnap = String(nextIndex);
      bringToFront(item);
      setWindowPosition(item, next.x, next.y);
    };

    item.addEventListener("pointerdown", () => bringToFront(item));
    item.addEventListener("focusin", () => bringToFront(item));
    minimize?.addEventListener("click", () => minimizeWindow(item));

    handle?.addEventListener("pointerdown", (event) => {
      if (handle.disabled || event.button !== 0) return;
      event.preventDefault();
      drag = {
        pointerId: event.pointerId,
        startClientX: event.clientX,
        startClientY: event.clientY,
        startX: readNumber(item.dataset.windowDx),
        startY: readNumber(item.dataset.windowDy),
        moved: false
      };
      bringToFront(item);
      handle.setPointerCapture(event.pointerId);
    });

    handle?.addEventListener("pointermove", (event) => {
      if (!drag || drag.pointerId !== event.pointerId) return;
      if (Math.hypot(event.clientX - drag.startClientX, event.clientY - drag.startClientY) > 4) {
        drag.moved = true;
      }
      const next = clampWindowPosition(
        item,
        drag.startX + event.clientX - drag.startClientX,
        drag.startY + event.clientY - drag.startClientY
      );
      setWindowPosition(item, next.x, next.y);
    });

    const endDrag = (event: PointerEvent) => {
      if (!drag || drag.pointerId !== event.pointerId || !handle) return;
      const shouldCycle = event.type === "pointerup" && !drag.moved;
      if (handle.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId);
      drag = null;
      if (shouldCycle) cycleWindowPosition();
    };

    handle?.addEventListener("pointerup", endDrag);
    handle?.addEventListener("pointercancel", endDrag);
    handle?.addEventListener("click", (event) => {
      if (event.detail === 0) cycleWindowPosition();
    });

    handle?.addEventListener("keydown", (event) => {
      if (handle.disabled) return;
      if (event.key === "Escape") {
        event.preventDefault();
        minimizeWindow(item);
        return;
      }
      if (event.key === "Home") {
        event.preventDefault();
        item.dataset.pointerSnap = "0";
        const next = clampWindowPosition(item, 0, 0);
        setWindowPosition(item, next.x, next.y);
        return;
      }

      const delta = getArrowDelta(
        event.key,
        event.shiftKey,
        artDirection.motion.dragKeyboardStep,
        artDirection.motion.dragKeyboardStepLarge
      );
      if (!delta) return;
      event.preventDefault();
      const next = clampWindowPosition(
        item,
        readNumber(item.dataset.windowDx) + delta.x,
        readNumber(item.dataset.windowDy) + delta.y
      );
      bringToFront(item);
      setWindowPosition(item, next.x, next.y);
    });
  });

  filterControls.forEach((control) => {
    control.addEventListener("click", () => {
      currentFilter = control.dataset.workspaceFilter ?? "all";
      filterControls.forEach((candidate) => candidate.setAttribute("aria-pressed", String(candidate === control)));
      syncVisibility();
    });
  });

  layoutControls.forEach((control) => {
    control.addEventListener("click", () => setLayout(control.dataset.layout === "list" ? "list" : "scatter"));
  });

  restoreControls.forEach((control) => {
    control.addEventListener("click", () => {
      const slug = control.dataset.windowRestore;
      const item = windows.find((candidate) => candidate.dataset.slug === slug);
      if (!slug || !item) return;
      minimized.delete(slug);
      syncVisibility();
      bringToFront(item);
      requestAnimationFrame(() => {
        const focusTarget = effectiveLayout === "scatter"
          ? item.querySelector<HTMLElement>("[data-window-handle]")
          : item.querySelector<HTMLElement>("a");
        focusTarget?.focus();
      });
    });
  });

  resetControl?.addEventListener("click", () => {
    minimized.clear();
    currentFilter = "all";
    windows.forEach((item) => {
      item.style.removeProperty("z-index");
      item.dataset.pointerSnap = "0";
      setWindowPosition(item, 0, 0);
      item.classList.remove("is-active-window");
    });
    filterControls.forEach((control) => control.setAttribute("aria-pressed", String(control.dataset.workspaceFilter === "all")));
    setLayout("scatter");
    syncVisibility();
  });

  const syncResponsiveLayout = () => setLayout(preferredLayout, false);
  desktopPointerQuery.addEventListener("change", syncResponsiveLayout);
  reduceMotionQuery.addEventListener("change", syncResponsiveLayout);
  window.addEventListener("load", queueWorkspaceClamp, { once: true });

  if (stage && "ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(queueWorkspaceClamp);
    resizeObserver.observe(stage);
    windows.forEach((item) => resizeObserver.observe(item));
  } else {
    window.addEventListener("resize", queueWorkspaceClamp);
  }

  setLayout("scatter", false);
  syncVisibility();
}
