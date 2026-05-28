import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(CustomEase, Draggable, Flip, ScrollToPlugin, ScrollTrigger, SplitText);

CustomEase.create("cibaEase", "M0,0 C0.2,0 0.05,1 1,1");
gsap.defaults({ duration: 0.72, ease: "cibaEase", overwrite: "auto" });

const motion = gsap.matchMedia();

motion.add(
  {
    reduceMotion: "(prefers-reduced-motion: reduce)",
    isDesktop: "(min-width: 900px)"
  },
  (context) => {
    const { reduceMotion, isDesktop } = context.conditions ?? {};

    if (reduceMotion) {
      gsap.set("[data-reveal], .project-card, .hero-visual, .work-form, [data-wake-page] img, [data-cinema-media], [data-file-card], [data-work-window]", {
        clearProps: "all"
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
                duration: 0.86
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

      gsap.from(hero.querySelectorAll(".eyebrow, .hero-statement, .hero-actions, .composition-ledger"), {
        y: 28,
        stagger: 0.08,
        delay: 0.2
      });

      gsap.from(hero.querySelector(".home-heading"), {
        y: 44,
        scale: 0.96,
        duration: 0.86,
        delay: 0.08
      });

      gsap.from(hero.querySelector(".composition-feature"), {
        y: 48,
        duration: 0.9,
        delay: 0.16
      });

      if (isDesktop) {
        gsap.to(hero.querySelector(".hero-visual img, .composition-feature img"), {
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

    const cinemaScroll = document.querySelector<HTMLElement>("[data-cinema-scroll]");
    if (cinemaScroll) {
      const stage = cinemaScroll.querySelector<HTMLElement>(".cinema-stage");
      const mediaField = cinemaScroll.querySelector<HTMLElement>(".cinema-media-field");
      const medias = gsap.utils.toArray<HTMLElement>(cinemaScroll.querySelectorAll("[data-cinema-media]"));
      const titles = gsap.utils.toArray<HTMLElement>(cinemaScroll.querySelectorAll("[data-cinema-title]"));
      const descriptions = gsap.utils.toArray<HTMLElement>(cinemaScroll.querySelectorAll("[data-cinema-description]"));
      let activeTitleIndex = -1;

      const activateTitle = (index: number) => {
        if (activeTitleIndex === index || !titles[index]) return;

        const previousTitle = activeTitleIndex >= 0 ? titles[activeTitleIndex] : undefined;
        const previousDescription = activeTitleIndex >= 0 ? descriptions[activeTitleIndex] : undefined;
        const nextTitle = titles[index];
        const nextDescription = descriptions[index];

        if (previousTitle) {
          gsap.to(previousTitle.querySelectorAll(".cinema-letter-roll"), {
            yPercent: -100,
            duration: 0.28,
            stagger: { amount: 0.08, from: "start" }
          });
          gsap.to(previousTitle, { autoAlpha: 0, duration: 0.22, delay: 0.08 });
        }

        if (previousDescription) {
          gsap.to(previousDescription, { y: -14, autoAlpha: 0, duration: 0.24 });
        }

        gsap.set(nextTitle, { autoAlpha: 1 });
        gsap.fromTo(
          nextTitle.querySelectorAll(".cinema-letter-roll"),
          { yPercent: 100 },
          { yPercent: 0, duration: 0.46, stagger: { amount: 0.22, from: "start" } }
        );

        if (nextDescription) {
          gsap.fromTo(nextDescription, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.42, delay: 0.08 });
        }

        activeTitleIndex = index;
      };

      gsap.set(titles, { autoAlpha: 0 });
      gsap.set(descriptions, { autoAlpha: 0 });
      activateTitle(0);

      gsap.from(".cinema-nav a", {
        y: -18,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.58
      });

      if (isDesktop && stage && mediaField && medias.length > 0) {
        const scrollDistance = Math.max(3600, titles.length * 820);

        const cinemaTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: cinemaScroll,
            start: "top top",
            end: `+=${scrollDistance}`,
            pin: stage,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              const nextIndex = Math.min(titles.length - 1, Math.floor(self.progress * titles.length));
              activateTitle(nextIndex);
            }
          }
        });

        cinemaTimeline
          .to(document.body, { "--cinema-green-alpha": 0, ease: "none", duration: 0.36 }, 0)
          .to(mediaField, { xPercent: -58, ease: "none", duration: 1 }, 0)
          .to(
            medias,
            {
              rotation: (index) => (index % 2 === 0 ? -2 : 2),
              y: (index) => (index % 3 === 0 ? -38 : index % 3 === 1 ? 22 : -10),
              ease: "none",
              duration: 1
            },
            0
          );
      } else if (mediaField && medias.length > 0) {
        gsap.set(document.body, { "--cinema-green-alpha": 0.52 });
        gsap.set(medias, { clearProps: "transform" });
      }
    }

    const workWindows = gsap.utils.toArray<HTMLElement>("[data-work-window]");
    if (workWindows.length > 0) {
      gsap.from(workWindows, {
        y: 18,
        scale: 0.94,
        autoAlpha: 0,
        stagger: 0.1,
        delay: 0.35,
        duration: 0.52
      });

      workWindows.forEach((windowElement) => {
        windowElement.querySelectorAll<HTMLElement>("[data-window-close]").forEach((button) => {
          button.addEventListener("click", (event) => {
            event.preventDefault();
            gsap.to(windowElement, { scale: 0.92, autoAlpha: 0, duration: 0.22, pointerEvents: "none" });
          });
        });

        if (isDesktop) {
          Draggable.create(windowElement, {
            type: "x,y",
            trigger: windowElement.querySelector<HTMLElement>("[data-window-handle]") ?? windowElement,
            bounds: window,
            zIndexBoost: true,
            edgeResistance: 0.72
          });
        }
      });

      const statementSection = document.querySelector<HTMLElement>(".cinema-statement");
      if (statementSection) {
        gsap.to(workWindows, {
          autoAlpha: 0,
          pointerEvents: "none",
          ease: "none",
          scrollTrigger: {
            trigger: statementSection,
            start: "top 42%",
            end: "bottom top",
            scrub: 0.8
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
          duration: 0.64,
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

window.addEventListener("load", () => ScrollTrigger.refresh());

document.querySelectorAll<HTMLAnchorElement>("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const target = anchor.getAttribute("href");
    if (!target || target === "#") return;
    const element = document.querySelector(target);
    if (!element) return;

    event.preventDefault();
    gsap.to(window, { duration: 0.7, scrollTo: { y: element, offsetY: 80 } });
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
        duration: 0.42,
        stagger: 0.03,
        ease: "cibaEase",
        onComplete: () => ScrollTrigger.refresh()
      });
    });
  });
}
