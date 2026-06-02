import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(CustomEase, Flip, ScrollTrigger, SplitText);

CustomEase.create("cibaEase", "M0,0 C0.2,0 0.05,1 1,1");
gsap.defaults({ duration: 0.72, ease: "cibaEase", overwrite: "auto" });

const motion = gsap.matchMedia();

motion.add(
  {
    reduceMotion: "(prefers-reduced-motion: reduce)",
    isDesktop: "(min-width: 900px)"
  },
  (context, contextSafe) => {
    const { reduceMotion, isDesktop } = context.conditions ?? {};

    if (reduceMotion) {
      gsap.set(
        "[data-reveal], .project-card, .hero-visual, .work-form, [data-wake-page] img, [data-home-media], [data-home-work-card], .rolling-title__track",
        { clearProps: "all" }
      );
      return;
    }

    const hero = document.querySelector<HTMLElement>("[data-motion='hero']");
    if (hero) {
      const heading = hero.querySelector<HTMLElement>(".split-heading");
      if (heading) {
        const createSplit = () => {
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
        const runSplit = contextSafe ? contextSafe(createSplit) : createSplit;

        if ("fonts" in document) {
          document.fonts.ready.then(() => {
            if (!context.isReverted) runSplit();
          });
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

    const internationalHome = document.querySelector<HTMLElement>("[data-international-home]");
    if (internationalHome) {
      gsap.context(() => {
        const rollingTitles = gsap.utils.toArray<HTMLElement>("[data-rolling-title]");

        rollingTitles.forEach((rollingTitle) => {
          const tracks = rollingTitle.querySelectorAll<HTMLElement>(".rolling-title__track");
          const isHero = rollingTitle.hasAttribute("data-rolling-hero");

          gsap.fromTo(
            tracks,
            { yPercent: 100 },
            {
              yPercent: 0,
              stagger: { amount: isHero ? 0.48 : 0.28, from: "start" },
              duration: isHero ? 0.86 : 0.58,
              scrollTrigger: isHero
                ? undefined
                : {
                    trigger: rollingTitle,
                    start: "top 82%",
                    toggleActions: "play none none reverse"
                  }
            }
          );
        });

        const mediaWall = internationalHome.querySelector<HTMLElement>("[data-home-media-wall]");
        const mediaPin = internationalHome.querySelector<HTMLElement>("[data-home-media-pin]");
        const mediaItems = gsap.utils.toArray<HTMLElement>(
          internationalHome.querySelectorAll("[data-home-media]")
        );

        if (isDesktop && mediaWall && mediaPin && mediaItems.length > 0) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: mediaPin,
                start: "top top",
                end: "+=3000",
                pin: mediaPin,
                scrub: 1,
                anticipatePin: 1
              }
            })
            .fromTo(
              mediaItems,
              { x: 0, y: 0, rotation: 0, scale: 0.72, autoAlpha: 0.28 },
              {
                x: (_, element) => Number((element as HTMLElement).dataset.mediaX ?? 0),
                y: (_, element) => Number((element as HTMLElement).dataset.mediaY ?? 0),
                rotation: (_, element) => Number((element as HTMLElement).dataset.mediaRotation ?? 0),
                scale: 1,
                autoAlpha: 1,
                stagger: 0.04,
                ease: "none"
              },
              0
            );
        }

        const workScene = internationalHome.querySelector<HTMLElement>("[data-home-work-scene]");
        const workScenePin = internationalHome.querySelector<HTMLElement>("[data-home-work-scene-pin]");
        const workCards = gsap.utils.toArray<HTMLElement>(
          internationalHome.querySelectorAll("[data-home-work-card]")
        );
        const workLetters = gsap.utils.toArray<HTMLElement>(
          internationalHome.querySelectorAll(".home-work-scene__letters span")
        );

        if (isDesktop && workScene && workScenePin && workCards.length > 0) {
          gsap.set(workCards, { attr: { tabindex: "-1" } });

          const workTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: workScene,
              start: "top top",
              end: "+=4200",
              pin: workScenePin,
              scrub: 1.1,
              anticipatePin: 1,
              invalidateOnRefresh: true
            }
          });

          workTimeline.fromTo(
            workLetters,
            { xPercent: (index) => (index % 2 === 0 ? -10 : 10) },
            { xPercent: (index) => (index % 2 === 0 ? 8 : -8), stagger: 0.04, ease: "none" },
            0
          );

          workCards.forEach((card, index) => {
            const startX = Number(card.dataset.startX ?? 0);
            const endX = Number(card.dataset.endX ?? 0);
            const y = Number(card.dataset.cardY ?? 0);
            const scale = Number(card.dataset.cardScale ?? 1);
            const rotation = Number(card.dataset.cardRotation ?? 0);

            workTimeline.fromTo(
              card,
              { x: () => (window.innerWidth * startX) / 100, yPercent: y, rotation: -rotation, scale, autoAlpha: 0.42 },
              { x: () => (window.innerWidth * endX) / 100, yPercent: -y, rotation, scale: Math.min(scale + 0.08, 1.16), autoAlpha: 1, ease: "none" },
              index * 0.1
            );
          });
        }
      }, internationalHome);
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

const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const grid = document.querySelector<HTMLElement>("[data-project-grid]");
const filterButtons = document.querySelectorAll<HTMLButtonElement>("[data-filter]");

if (grid && filterButtons.length > 0) {
  const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-project-card]"));

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter ?? "all";
      const shouldAnimate = !reduceMotionQuery.matches;
      const state = shouldAnimate ? Flip.getState(cards) : undefined;

      filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      cards.forEach((card) => {
        const isFeatured = card.dataset.featured === "true";
        const shouldShow =
          filter === "all" || (filter === "featured" && isFeatured) || (filter === "archive" && !isFeatured);
        card.hidden = !shouldShow;
      });

      if (!state) {
        ScrollTrigger.refresh();
        return;
      }

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
