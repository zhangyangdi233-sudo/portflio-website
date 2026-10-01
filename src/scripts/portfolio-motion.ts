import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { artDirection } from "../lib/art-direction";

gsap.registerPlugin(CustomEase, Draggable, Flip, ScrollToPlugin, ScrollTrigger, SplitText);

CustomEase.create("cibaEase", "M0,0 C0.2,0 0.05,1 1,1");
const motionTokens = artDirection.motion;
const workspaceTokens = artDirection.workspace;
const stateSeconds = motionTokens.stateMs / 1000;
const enterSeconds = motionTokens.enterMs / 1000;
const titleSeconds = motionTokens.titleMs / 1000;
const desktopMediaQuery = `(min-width: ${workspaceTokens.breakpoint}px)`;

gsap.defaults({ duration: enterSeconds, ease: "cibaEase", overwrite: "auto" });

const forceReducedMotion = new URLSearchParams(window.location.search).get("motion") === "reduce";
if (forceReducedMotion) document.documentElement.dataset.motion = "reduce";

const motion = gsap.matchMedia();

motion.add(
  {
    reduceMotion: "(prefers-reduced-motion: reduce)",
    isDesktop: desktopMediaQuery
  },
  (context) => {
    const { reduceMotion: systemReducedMotion, isDesktop } = context.conditions ?? {};
    const reduceMotion = forceReducedMotion || systemReducedMotion;

    if (reduceMotion) {
      gsap.set("[data-reveal], .project-card, .hero-visual, .work-form, [data-wake-page] img, [data-cinema-media], [data-file-card], [data-work-window]", {
        opacity: 1,
        visibility: "visible",
        clearProps: "transform"
      });
      return;
    }

    const hero = document.querySelector<HTMLElement>("[data-motion='hero']");
    if (hero) {
      const heading = hero.querySelector<HTMLElement>(".split-heading");
      if (heading) {
        const runSplit = () => {
          SplitText.create(heading, {
            type: "words, chars",
            aria: "auto",
            onSplit(self) {
              return gsap.from(self.chars, {
                yPercent: 110,
                stagger: { amount: 0.42, from: "start" },
                duration: enterSeconds
              });
            }
          });
        };

        if ("fonts" in document) {
          document.fonts.ready.then(runSplit);
        } else {
          runSplit();
        }
      }

      const supportingCopy = hero.querySelectorAll(".eyebrow, .hero-statement, .hero-actions, .composition-ledger");
      if (supportingCopy.length > 0) {
        gsap.from(supportingCopy, {
          y: 28,
          stagger: 0.08,
          delay: 0.2
        });
      }

      const homeHeading = hero.querySelector(".home-heading");
      if (homeHeading) {
        gsap.from(homeHeading, {
          y: 44,
          scale: 0.96,
          duration: enterSeconds,
          delay: 0.08
        });
      }

      const compositionFeature = hero.querySelector(".composition-feature");
      if (compositionFeature) {
        gsap.from(compositionFeature, {
          y: 48,
          duration: enterSeconds,
          delay: 0.16
        });
      }

      if (isDesktop) {
        const heroMedia = hero.querySelector(".hero-visual img, .composition-feature img");
        if (heroMedia) {
          gsap.to(heroMedia, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 1
            }
          });
        }
      }
    }

    const openingTitleTrack = document.querySelector<HTMLElement>(".cinema-opening__title-track");
    if (openingTitleTrack) {
      gsap.fromTo(
        openingTitleTrack,
        { yPercent: -50 },
        { yPercent: 0, duration: titleSeconds * 1.8, delay: 0.08 }
      );
    }

    const cinemaSequence = document.querySelector<HTMLElement>("[data-cinematic-sequence]");
    if (cinemaSequence) {
      const stage = cinemaSequence.querySelector<HTMLElement>("[data-cinema-stage]");
      const chapters = gsap.utils.toArray<HTMLElement>(cinemaSequence.querySelectorAll("[data-cinematic-chapter]"));

      if (isDesktop && stage && chapters.length > 0) {
        cinemaSequence.classList.add("is-enhanced");
        let activeChapterIndex = 0;

        gsap.set(chapters, { autoAlpha: 0, pointerEvents: "none" });
        chapters.forEach((chapter, index) => {
          chapter.classList.toggle("is-active", index === 0);
          chapter.setAttribute("aria-hidden", String(index !== 0));
        });
        gsap.set(chapters[0], { autoAlpha: 1, pointerEvents: "auto" });

        const activateChapter = (index: number) => {
          if (index === activeChapterIndex || !chapters[index]) return;

          const previous = chapters[activeChapterIndex];
          const next = chapters[index];
          const previousGlyphs = previous?.querySelectorAll(".cinema-chapter__glyph-track");
          const nextGlyphs = next.querySelectorAll(".cinema-chapter__glyph-track");
          const nextMedia = next.querySelectorAll("[data-cinema-media]");

          if (previous) {
            previous.classList.remove("is-active");
            previous.setAttribute("aria-hidden", "true");
            gsap.set(previous, { visibility: "visible" });
            gsap.to(previousGlyphs, {
              yPercent: -50,
              duration: stateSeconds,
              stagger: { amount: 0.08, from: "start" }
            });
            gsap.to(previous, {
              autoAlpha: 0,
              pointerEvents: "none",
              duration: stateSeconds
            });
          }

          next.classList.add("is-active");
          next.setAttribute("aria-hidden", "false");
          gsap.fromTo(
            next,
            { autoAlpha: 0 },
            { autoAlpha: 1, pointerEvents: "auto", duration: titleSeconds }
          );
          gsap.fromTo(
            nextGlyphs,
            { yPercent: 50 },
            { yPercent: 0, duration: titleSeconds, stagger: { amount: 0.18, from: "start" } }
          );
          gsap.fromTo(
            nextMedia,
            { x: (mediaIndex) => (mediaIndex % 2 === 0 ? 90 : -70), y: 34, rotation: (mediaIndex) => (mediaIndex % 2 === 0 ? 2 : -2) },
            { x: 0, y: 0, rotation: 0, duration: titleSeconds * 1.25, stagger: 0.08 }
          );

          activeChapterIndex = index;
        };

        ScrollTrigger.create({
          trigger: stage,
          start: "top top",
          end: `+=${Math.max(3600, chapters.length * 860)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const nextIndex = Math.min(chapters.length - 1, Math.floor(self.progress * chapters.length));
            activateChapter(nextIndex);
          }
        });
      }
    }

    const fileExtract = document.querySelector<HTMLElement>("[data-file-extract]");
    if (fileExtract) {
      const cards = gsap.utils.toArray<HTMLElement>(fileExtract.querySelectorAll("[data-file-card]"));

      if (cards.length > 0) {
        gsap.set(cards, {
          x: (index) => index * 12,
          y: (index) => index * 16,
          rotation: (index) => (index % 2 === 0 ? -0.4 : 0.4)
        });

        if (isDesktop) {
          cards.forEach((card, index) => {
            gsap.to(card, {
              x: -index * 34,
              y: -index * 72,
              rotation: 0,
              ease: "none",
              scrollTrigger: {
                trigger: fileExtract,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.1
              }
            });
          });
        }
      }
    }

    const workRows = gsap.utils.toArray<HTMLElement>("[data-work-row]");

    workRows.forEach((row) => {
      const title = row.querySelector(".work-title");
      const media = row.querySelector(".work-row__media");
      const image = row.querySelector(".work-row__media img");
      const index = row.querySelector(".work-row__index");
      if (title) {
        gsap.from(title, {
          y: 72,
          scrollTrigger: {
            trigger: row,
            start: "top 76%",
            end: "center center",
            scrub: 0.8
          }
        });
      }

      if (media) {
        gsap.from(media, {
          y: 90,
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
            end: "center center",
            scrub: 1
          }
        });
      }

      if (image) {
        gsap.to(image, {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        });
      }

      if (index) {
        gsap.from(index, {
          x: -28,
          autoAlpha: 0,
          scrollTrigger: {
            trigger: row,
            start: "top 86%",
            toggleActions: "play none none reverse"
          }
        });
      }
    });

    ScrollTrigger.batch("[data-reveal], .project-card", {
      start: "top 86%",
      once: true,
      interval: 0.08,
      batchMax: 4,
      onEnter: (batch) => {
        gsap.from(batch, {
          y: 36,
          autoAlpha: 0,
          stagger: 0.08,
        duration: enterSeconds,
          clearProps: "transform,visibility"
        });
      }
    });

    const wakePage = document.querySelector<HTMLElement>("[data-wake-page]");
    if (wakePage) {
      gsap.from(wakePage.querySelector(".wake-bed"), {
        scale: 0.88,
        autoAlpha: 0,
        duration: 1.05
      });

      gsap.from(wakePage.querySelector(".wake-kicker"), {
        y: 24,
        autoAlpha: 0,
        delay: 0.18
      });

      gsap.utils.toArray<HTMLElement>("[data-wake-panel]").forEach((panel, panelIndex) => {
        const images = panel.querySelectorAll<HTMLElement>("[data-wake-image]");
        if (!images.length) return;

        gsap.from(images, {
          y: (index) => 48 + index * 16,
          rotation: (index) => (index % 2 === 0 ? -2 : 2),
          autoAlpha: 0.18,
          stagger: 0.08,
          scrollTrigger: {
            trigger: panel,
            start: "top 78%",
            end: "center center",
            scrub: panelIndex % 2 === 0 ? 0.9 : 1.2
          }
        });
      });

      const corridor = wakePage.querySelector<HTMLElement>(".wake-corridor");
      if (corridor && isDesktop) {
        gsap.to(corridor, {
          xPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: corridor,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      }

      const cityTrack = wakePage.querySelector<HTMLElement>("[data-wake-city-track]");
      if (cityTrack && isDesktop) {
        gsap.to(Array.from(cityTrack.children), {
          yPercent: (index) => [-10, 8, -6, 12][index] ?? 0,
          ease: "none",
          scrollTrigger: {
            trigger: cityTrack,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4
          }
        });
      }

      const collageImages = wakePage.querySelectorAll<HTMLElement>(".wake-collage-panel [data-wake-image]");
      if (collageImages.length > 0) {
        gsap.to(collageImages, {
          xPercent: (index) => [-10, 8, -6, 12, -16][index] ?? 0,
          yPercent: (index) => [6, -8, 10, -6, 4][index] ?? 0,
          rotation: (index) => [-1.5, 1.2, -0.8, 1.8, 0][index] ?? 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".wake-collage-panel",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4
          }
        });
      }
    }
  }
);

const workspace = document.querySelector<HTMLElement>("[data-workspace-root]");

if (workspace) {
  const stage = workspace.querySelector<HTMLElement>("[data-workspace-stage]");
  const windows = Array.from(workspace.querySelectorAll<HTMLElement>("[data-workspace-window]"));
  const filterControls = Array.from(workspace.querySelectorAll<HTMLButtonElement>("[data-workspace-filter]"));
  const layoutControls = Array.from(workspace.querySelectorAll<HTMLButtonElement>("[data-layout]"));
  const resetControl = workspace.querySelector<HTMLButtonElement>("[data-workspace-reset]");
  const restoreControls = Array.from(workspace.querySelectorAll<HTMLButtonElement>("[data-window-restore]"));
  const status = workspace.querySelector<HTMLElement>("[data-workspace-status]");
  const desktopPointer = window.matchMedia(`${desktopMediaQuery} and (pointer: fine)`);
  const systemReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const minimized = new Set<string>();
  let currentFilter = "all";
  let preferredLayout: "scatter" | "scan" = "scatter";
  let zCounter = Math.max(20, ...windows.map((item) => Number(gsap.getProperty(item, "zIndex")) || 0));
  let draggables: Draggable[] = [];

  const projectMatchesFilter = (item: HTMLElement) => {
    const featured = item.dataset.featured === "true";
    return currentFilter === "all" || (currentFilter === "featured" && featured) || (currentFilter === "archive" && !featured);
  };

  const bringToFront = (item: HTMLElement) => {
    windows.forEach((candidate) => candidate.classList.toggle("is-active-window", candidate === item));
    zCounter += 1;
    item.style.zIndex = String(zCounter);
  };

  const destroyDraggables = () => {
    draggables.forEach((instance) => instance.kill());
    draggables = [];
  };

  const getWindowTransformBounds = (item: HTMLElement) => {
    if (!stage) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    const stageRect = stage.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const currentX = Number(gsap.getProperty(item, "x")) || 0;
    const currentY = Number(gsap.getProperty(item, "y")) || 0;

    return {
      minX: currentX + stageRect.left - itemRect.left,
      maxX: currentX + stageRect.right - itemRect.right,
      minY: currentY + stageRect.top - itemRect.top,
      maxY: currentY + stageRect.bottom - itemRect.bottom
    };
  };

  const initializeDraggables = () => {
    destroyDraggables();
    if (!stage || !desktopPointer.matches || workspace.classList.contains("is-scan-mode")) return;

    windows.filter((item) => !item.hidden).forEach((item) => {
      const handle = item.querySelector<HTMLElement>("[data-window-handle]");
      if (!handle) return;

      let instance: Draggable | undefined;
      const keepInsideStage = () => {
        if (!instance) return;
        const next = clampWindowPosition(item, instance.x, instance.y);
        if (next.x === instance.x && next.y === instance.y) return;
        gsap.set(item, next);
        instance.update();
      };

      instance = Draggable.create(item, {
        type: "x,y",
        trigger: handle,
        dragClickables: true,
        onPress: () => bringToFront(item),
        onDrag: keepInsideStage,
        onDragEnd: keepInsideStage
      })[0];

      if (instance) draggables.push(instance);
    });
  };

  const syncVisibility = (refreshDrag = true) => {
    let filteredCount = 0;
    let visibleCount = 0;

    windows.forEach((item) => {
      const slug = item.dataset.slug ?? "";
      const matches = projectMatchesFilter(item);
      const isMinimized = minimized.has(slug);
      if (matches) filteredCount += 1;
      if (matches && !isMinimized) visibleCount += 1;
      item.hidden = !matches || isMinimized;
      item.setAttribute("aria-hidden", String(!matches || isMinimized));

      const restore = restoreControls.find((control) => control.dataset.windowRestore === slug);
      if (restore) {
        restore.hidden = !matches;
        restore.classList.toggle("is-minimized", isMinimized);
        restore.setAttribute("aria-pressed", String(!isMinimized));
      }
    });

    if (status) {
      const label = status.dataset.visibleLabel ?? "visible";
      status.textContent = `${String(visibleCount).padStart(2, "0")} / ${String(filteredCount).padStart(2, "0")} ${label}`;
    }

    if (refreshDrag) initializeDraggables();
    ScrollTrigger.refresh();
  };

  const setLayout = (layout: "scatter" | "scan", remember = true) => {
    if (remember) preferredLayout = layout;
    const effectiveLayout = desktopPointer.matches ? layout : "scan";
    const scanMode = effectiveLayout === "scan";
    workspace.classList.toggle("is-scan-mode", scanMode);
    layoutControls.forEach((control) => {
      control.setAttribute("aria-pressed", String(control.dataset.layout === effectiveLayout));
    });

    if (scanMode) {
      destroyDraggables();
      gsap.set(windows, { clearProps: "transform" });
    } else {
      initializeDraggables();
    }
    ScrollTrigger.refresh();
  };

  const minimizeWindow = (item: HTMLElement) => {
    const slug = item.dataset.slug;
    if (!slug) return;
    minimized.add(slug);
    syncVisibility();
    restoreControls.find((control) => control.dataset.windowRestore === slug)?.focus();
  };

  const clampWindowPosition = (item: HTMLElement, desiredX: number, desiredY: number) => {
    const { minX, maxX, minY, maxY } = getWindowTransformBounds(item);

    return {
      x: gsap.utils.clamp(Math.min(minX, maxX), Math.max(minX, maxX), desiredX),
      y: gsap.utils.clamp(Math.min(minY, maxY), Math.max(minY, maxY), desiredY)
    };
  };

  windows.forEach((item) => {
    const handle = item.querySelector<HTMLElement>("[data-window-handle]");
    const minimize = item.querySelector<HTMLButtonElement>("[data-window-minimize]");

    item.addEventListener("pointerdown", () => bringToFront(item));
    item.addEventListener("focusin", () => bringToFront(item));
    minimize?.addEventListener("click", (event) => {
      event.stopPropagation();
      minimizeWindow(item);
    });

    handle?.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        minimizeWindow(item);
        return;
      }
      if (event.key === "Home") {
        event.preventDefault();
        gsap.set(item, { x: 0, y: 0 });
        draggables.find((instance) => instance.target === item)?.update();
        return;
      }

      const directions: Record<string, [number, number]> = {
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
        ArrowUp: [0, -1],
        ArrowDown: [0, 1]
      };
      const direction = directions[event.key];
      if (!direction || workspace.classList.contains("is-scan-mode")) return;

      event.preventDefault();
      const step = event.shiftKey ? motionTokens.dragKeyboardStepLarge : motionTokens.dragKeyboardStep;
      const currentX = Number(gsap.getProperty(item, "x")) || 0;
      const currentY = Number(gsap.getProperty(item, "y")) || 0;
      const next = clampWindowPosition(item, currentX + direction[0] * step, currentY + direction[1] * step);
      bringToFront(item);
      gsap.set(item, next);
      draggables.find((instance) => instance.target === item)?.update();
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
    control.addEventListener("click", () => {
      const layout = control.dataset.layout === "scan" ? "scan" : "scatter";
      setLayout(layout);
    });
  });

  restoreControls.forEach((control) => {
    control.addEventListener("click", () => {
      const slug = control.dataset.windowRestore;
      if (!slug) return;
      const item = windows.find((candidate) => candidate.dataset.slug === slug);
      if (!item) return;
      minimized.delete(slug);
      syncVisibility();
      bringToFront(item);
      requestAnimationFrame(() => item.querySelector<HTMLElement>("[data-window-handle]")?.focus());
    });
  });

  resetControl?.addEventListener("click", () => {
    minimized.clear();
    currentFilter = "all";
    filterControls.forEach((control) => control.setAttribute("aria-pressed", String(control.dataset.workspaceFilter === "all")));
    windows.forEach((item) => {
      item.style.removeProperty("z-index");
      item.classList.remove("is-active-window");
    });
    gsap.set(windows, { clearProps: "transform" });
    setLayout("scatter");
    syncVisibility();
  });

  desktopPointer.addEventListener("change", () => setLayout(desktopPointer.matches ? preferredLayout : "scan", false));
  window.addEventListener("resize", () => {
    draggables.forEach((instance) => {
      const target = instance.target as HTMLElement;
      const currentX = Number(gsap.getProperty(target, "x")) || 0;
      const currentY = Number(gsap.getProperty(target, "y")) || 0;
      gsap.set(target, clampWindowPosition(target, currentX, currentY));
      instance.update();
    });
  });

  setLayout("scatter", false);
  syncVisibility();

  if (!forceReducedMotion && !systemReducedMotion.matches) {
    gsap.from(windows, {
      autoAlpha: 0,
      duration: enterSeconds,
      stagger: 0.055,
      clearProps: "opacity,visibility"
    });
  }
}

window.addEventListener("load", () => ScrollTrigger.refresh());

document.querySelectorAll<HTMLAnchorElement>("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const target = anchor.getAttribute("href");
    if (!target || target === "#") return;
    const element = document.querySelector(target);
    if (!element) return;

    event.preventDefault();
    gsap.to(window, {
      duration: forceReducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.7,
      scrollTo: { y: element, offsetY: 80 }
    });
  });
});

const grid = document.querySelector<HTMLElement>("[data-project-grid]");
const filterButtons = document.querySelectorAll<HTMLButtonElement>("[data-filter]");

if (grid && filterButtons.length > 0) {
  const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-project-card]"));

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter ?? "all";
      const state = Flip.getState(cards);

      filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      cards.forEach((card) => {
        const isFeatured = card.dataset.featured === "true";
        const shouldShow =
          filter === "all" || (filter === "featured" && isFeatured) || (filter === "archive" && !isFeatured);
        card.hidden = !shouldShow;
      });

      Flip.from(state, {
        absolute: true,
        duration: forceReducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : titleSeconds,
        stagger: 0.03,
        ease: "cibaEase",
        onComplete: () => ScrollTrigger.refresh()
      });
    });
  });
}
