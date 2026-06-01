# Internationalist Portfolio Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the CIBA homepage as an internationalist artist archive with restrained ivory-and-black typography, an acid-green experimental work scene, rolling text, a scattered media wall, mobile fallbacks, and accessible navigation.

**Architecture:** Keep Astro static generation and the existing GSAP entry point. Move homepage-only markup into three focused Astro components, keep localized editorial copy in `src/lib/i18n.ts`, append a new `.international-home` style system, and replace only the obsolete homepage-specific GSAP block while preserving shared works-page and Wake Up motion.

**Tech Stack:** Astro 6, TypeScript, CSS Grid, GSAP 3 (`ScrollTrigger`, `SplitText`, `CustomEase`, `Flip`, `ScrollToPlugin`), Vitest.

---

## File Map

- Create `src/components/home/RollingTitle.astro`: renders accessible masked duplicate glyphs for GSAP rolling titles.
- Create `src/components/home/HomeMediaWall.astro`: renders the deterministic TheArtOfCinema-inspired scattered project wall.
- Create `src/components/home/HomeWorkScene.astro`: renders the deterministic acid-green wodniack.dev-inspired experimental work scene.
- Create `tests/homepage-redesign.test.ts`: checks localization, semantic structure, accessibility hooks, style tokens, and GSAP selector boundaries.
- Modify `src/lib/i18n.ts`: adds localized homepage editorial copy.
- Modify `src/layouts/BaseLayout.astro`: adds the shared skip link.
- Modify `src/pages/[lang]/index.astro`: replaces old homepage markup with the new internationalist composition.
- Modify `src/styles/global.css`: adds skip-link styling and replaces the final cinema-specific homepage CSS block with `.international-home` styles.
- Modify `src/scripts/portfolio-motion.ts`: removes homepage `Draggable` usage and replaces the old cinema/window/file-stack motion with scoped homepage timelines.

## Task 1: Localize Homepage Editorial Copy

**Files:**
- Modify: `src/lib/i18n.ts`
- Create: `tests/homepage-redesign.test.ts`

- [ ] **Step 1: Write the failing localization test**

Create `tests/homepage-redesign.test.ts`:

```ts
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { homeCopy, languages } from "../src/lib/i18n";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");

describe("internationalist homepage redesign", () => {
  it("provides localized editorial copy for every homepage section", () => {
    for (const lang of languages) {
      expect(homeCopy[lang]).toMatchObject({
        heroIntro: expect.any(String),
        mediaHeading: expect.any(String),
        mediaBody: expect.any(String),
        mediaAside: expect.any(String),
        experimentHeading: expect.any(String),
        experimentBody: expect.any(String)
      });

      for (const value of Object.values(homeCopy[lang])) {
        expect(value.length).toBeGreaterThan(0);
      }
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```powershell
npm test -- tests/homepage-redesign.test.ts
```

Expected: FAIL because `homeCopy` is not exported from `src/lib/i18n.ts`.

- [ ] **Step 3: Add localized homepage copy**

Append to `src/lib/i18n.ts`:

```ts
export const homeCopy = {
  zh: {
    heroIntro: "糍粑以游戏、界面、影像与装置作为持续实践的场域。这里收录近期作品与仍在变化中的图像系统。",
    mediaHeading: "返回表面的图像",
    mediaBody: "作品并不按时间线沉睡。它们以片段、界面和残留物的形式重新出现，在滚动中建立彼此之间的距离。",
    mediaAside: "被抽取、错置，并重新看见。",
    experimentHeading: "作品场景",
    experimentBody: "一次短暂越界：作品离开档案秩序，以更直接的尺寸、速度和位置穿过屏幕。"
  },
  en: {
    heroIntro: "CIBA works across games, interfaces, moving images, and installation. This archive gathers recent works and image systems that remain in motion.",
    mediaHeading: "Images Returning",
    mediaBody: "Works do not sleep in chronological order. They return as fragments, interfaces, and residues, forming new distances through scroll.",
    mediaAside: "Extracted, displaced, and made visible again.",
    experimentHeading: "Work Scene",
    experimentBody: "A brief departure from archival order: works cross the screen through direct changes in scale, speed, and position."
  },
  ja: {
    heroIntro: "糍粑はゲーム、インターフェース、映像、インスタレーションを横断して制作しています。ここでは、変化し続ける近作とイメージシステムを収録します。",
    mediaHeading: "表面へ戻るイメージ",
    mediaBody: "作品は時系列の中で眠りません。断片、インターフェース、残留物として再び現れ、スクロールの中で新しい距離をつくります。",
    mediaAside: "抽出され、置き換えられ、もう一度見えるもの。",
    experimentHeading: "作品の場面",
    experimentBody: "アーカイブの秩序から一時的に外れ、作品がサイズ、速度、位置を変えながら画面を横切ります。"
  }
} satisfies Record<
  Language,
  {
    heroIntro: string;
    mediaHeading: string;
    mediaBody: string;
    mediaAside: string;
    experimentHeading: string;
    experimentBody: string;
  }
>;
```

- [ ] **Step 4: Run the localization test**

Run:

```powershell
npm test -- tests/homepage-redesign.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit localized copy**

```powershell
git add -- src/lib/i18n.ts tests/homepage-redesign.test.ts
git commit -m "feat: add localized homepage editorial copy"
```

## Task 2: Add Shared Accessibility Hooks

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/styles/global.css`
- Modify: `tests/homepage-redesign.test.ts`

- [ ] **Step 1: Add a failing skip-link test**

Append inside the existing `describe` in `tests/homepage-redesign.test.ts`:

```ts
  it("provides a shared skip link for keyboard users", () => {
    const layout = read("../src/layouts/BaseLayout.astro");
    const styles = read("../src/styles/global.css");

    expect(layout).toContain('class="skip-link"');
    expect(layout).toContain('href="#content"');
    expect(layout).toContain("siteProfile.socials.map");
    expect(styles).toContain(".skip-link:focus-visible");
  });
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```powershell
npm test -- tests/homepage-redesign.test.ts
```

Expected: FAIL because `BaseLayout.astro` does not contain a skip link.

- [ ] **Step 3: Add the skip link**

Insert immediately after `<body class={pageClass}>` in `src/layouts/BaseLayout.astro`:

```astro
    <a class="skip-link" href="#content">Skip to content</a>
```

Inside the existing footer in `src/layouts/BaseLayout.astro`, render available archive links after the email address:

```astro
          {siteProfile.socials.map((social) => <a href={social.href}>{social.label}</a>)}
```

Append near the top-level accessibility styles in `src/styles/global.css`:

```css
.skip-link {
  position: fixed;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 1000;
  padding: 0.7rem 0.9rem;
  background: #10100d;
  color: #f3ead6;
  font-family: var(--font-ui);
  font-weight: 800;
  transform: translateY(-180%);
  transition: transform 180ms ease;
}

.skip-link:focus-visible {
  transform: translateY(0);
  outline: 3px solid #b7ff00;
  outline-offset: 3px;
}
```

- [ ] **Step 4: Run the accessibility test**

Run:

```powershell
npm test -- tests/homepage-redesign.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit skip-link support**

```powershell
git add -- src/layouts/BaseLayout.astro src/styles/global.css tests/homepage-redesign.test.ts
git commit -m "feat: add keyboard skip link"
```

## Task 3: Build Homepage Components and Replace Old Markup

**Files:**
- Create: `src/components/home/RollingTitle.astro`
- Create: `src/components/home/HomeMediaWall.astro`
- Create: `src/components/home/HomeWorkScene.astro`
- Modify: `src/pages/[lang]/index.astro`
- Modify: `tests/homepage-redesign.test.ts`

- [ ] **Step 1: Add failing homepage structure tests**

Append inside the existing `describe` in `tests/homepage-redesign.test.ts`:

```ts
  it("uses one semantic homepage h1 and dedicated immersive sections", () => {
    const home = read("../src/pages/[lang]/index.astro");

    expect(home.match(/as="h1"/g) ?? []).toHaveLength(1);
    expect(home).toContain("<HomeMediaWall");
    expect(home).toContain("<HomeWorkScene");
    expect(home).toContain('id="project-index"');
  });

  it("removes the obsolete draggable windows and file-folder stack", () => {
    const home = read("../src/pages/[lang]/index.astro");

    expect(home).not.toContain("data-work-window");
    expect(home).not.toContain("data-window-handle");
    expect(home).not.toContain("data-file-extract");
    expect(home).not.toContain("data-file-card");
  });

  it("renders stable hooks for the scattered wall and experimental work scene", () => {
    const wall = read("../src/components/home/HomeMediaWall.astro");
    const scene = read("../src/components/home/HomeWorkScene.astro");

    expect(wall).toContain("data-home-media-wall");
    expect(wall).toContain("data-home-media-pin");
    expect(wall).toContain("data-home-media");
    expect(scene).toContain("data-home-work-scene");
    expect(scene).toContain("data-home-work-scene-pin");
    expect(scene).toContain("data-home-work-card");
    expect(scene).toContain("WORK");
  });
```

- [ ] **Step 2: Run the structure tests to verify they fail**

Run:

```powershell
npm test -- tests/homepage-redesign.test.ts
```

Expected: FAIL because the new components and hooks do not exist.

- [ ] **Step 3: Create the rolling title component**

Create `src/components/home/RollingTitle.astro`:

```astro
---
interface Props {
  as: "h1" | "h2";
  text: string;
  id?: string;
  class?: string;
  hero?: boolean;
}

const { as: Tag, text, id, class: className = "", hero = false } = Astro.props;
const words = text.toUpperCase().split(" ");
---

<Tag id={id} class:list={["rolling-title", className]} data-rolling-title data-rolling-hero={hero ? "" : undefined} aria-label={text}>
  {
    words.map((word) => (
      <span class="rolling-title__word">
        {Array.from(word).map((letter) => (
          <span class="rolling-title__mask">
            <span class="rolling-title__track">
              <span>{letter}</span>
              <span aria-hidden="true">{letter}</span>
            </span>
          </span>
        ))}
      </span>
    ))
  }
</Tag>
```

- [ ] **Step 4: Create the scattered media wall**

Create `src/components/home/HomeMediaWall.astro`:

```astro
---
import { getLocalizedProject } from "../../lib/projects";
import type { Language, Project } from "../../lib/types";
import RollingTitle from "./RollingTitle.astro";

interface Props {
  lang: Language;
  projects: Project[];
  heading: string;
  body: string;
  aside: string;
}

const { lang, projects, heading, body, aside } = Astro.props;
const positions = [
  ["10%", "20%", -160, 84, -5],
  ["28%", "54%", -96, -46, 4],
  ["46%", "22%", -42, 66, -3],
  ["65%", "62%", 54, -78, 5],
  ["82%", "28%", 116, 48, -4],
  ["18%", "76%", -120, -42, 3],
  ["38%", "68%", -58, 72, -2],
  ["58%", "38%", 68, 52, 4],
  ["76%", "78%", 126, -56, -3],
  ["90%", "58%", 164, 76, 2],
  ["52%", "82%", 34, -72, -4],
  ["34%", "34%", -36, 48, 3]
] as const;

const items = projects
  .flatMap((project, projectIndex) => {
    const localized = getLocalizedProject(project, lang);
    const media = project.slug === "wake-up" ? project.media.slice(0, 4) : project.media.slice(0, 2);
    return media.map((item) => ({ project, projectIndex, localized, media: item }));
  })
  .slice(0, positions.length);
---

<section class="home-media-wall" data-home-media-wall aria-labelledby="home-media-wall-title">
  <div class="home-section-copy">
    <p class="home-kicker">01 / ARCHIVE</p>
    <RollingTitle as="h2" text={heading} id="home-media-wall-title" class="home-section-title" />
    <p>{body}</p>
    <p class="home-section-copy__aside">{aside}</p>
  </div>
  <div class="home-media-wall__pin" data-home-media-pin>
    <div class="home-media-wall__field">
      {
        items.map((item, index) => {
          const [left, top, x, y, rotation] = positions[index];
          return (
            <a
              class="home-media-wall__item"
              href={`/${lang}/works/${item.project.slug}/`}
              style={`--media-left:${left};--media-top:${top};`}
              data-home-media
              data-media-x={x}
              data-media-y={y}
              data-media-rotation={rotation}
            >
              <img src={item.media.src} alt={item.media.alt} loading="lazy" decoding="async" />
              <span>{String(item.projectIndex + 1).padStart(2, "0")} / {item.localized.title}</span>
            </a>
          );
        })
      }
    </div>
  </div>
</section>
```

- [ ] **Step 5: Create the experimental work scene**

Create `src/components/home/HomeWorkScene.astro`:

```astro
---
import { getLocalizedProject } from "../../lib/projects";
import type { Language, Project } from "../../lib/types";
import RollingTitle from "./RollingTitle.astro";

interface Props {
  lang: Language;
  projects: Project[];
  heading: string;
  body: string;
}

const { lang, projects, heading, body } = Astro.props;
const settings = [
  [-92, 88, -24, 0.88, -8],
  [96, -82, 22, 1.02, 7],
  [-104, 94, 12, 0.74, -5],
  [88, -96, -14, 1.1, 9],
  [-84, 102, 28, 0.82, -7],
  [108, -90, -30, 0.96, 6],
  [-98, 86, 4, 0.9, -4]
] as const;
---

<section class="home-work-scene" data-home-work-scene aria-labelledby="home-work-scene-title">
  <div class="home-work-scene__pin" data-home-work-scene-pin>
    <div class="home-work-scene__letters" aria-hidden="true">
      {Array.from("WORK").map((letter) => <span>{letter}</span>)}
    </div>
    <div class="home-work-scene__copy">
      <p class="home-kicker">02 / WORK SCENE</p>
      <RollingTitle as="h2" text={heading} id="home-work-scene-title" class="home-section-title" />
      <p>{body}</p>
    </div>
    <div class="home-work-scene__cards">
      {
        projects.slice(0, settings.length).map((project, index) => {
          const localized = getLocalizedProject(project, lang);
          const [startX, endX, y, scale, rotation] = settings[index];
          return (
            <a
              class="home-work-card"
              href={`/${lang}/works/${project.slug}/`}
              data-home-work-card
              data-start-x={startX}
              data-end-x={endX}
              data-card-y={y}
              data-card-scale={scale}
              data-card-rotation={rotation}
            >
              <img src={project.media[0].src} alt={project.media[0].alt} loading="lazy" decoding="async" />
              <span class="home-work-card__caption">
                <strong>{localized.title}</strong>
                <span>{project.year} / #{String(index + 1).padStart(4, "0")}</span>
              </span>
            </a>
          );
        })
      }
    </div>
  </div>
</section>
```

- [ ] **Step 6: Replace homepage markup**

In `src/pages/[lang]/index.astro`, remove `projectCount`, `popupProjects`, `scatterPositions`, and `mediaPool`. Add imports:

```astro
import HomeMediaWall from "../../components/home/HomeMediaWall.astro";
import HomeWorkScene from "../../components/home/HomeWorkScene.astro";
import RollingTitle from "../../components/home/RollingTitle.astro";
import { assertLanguage, homeCopy, languageLabels, languages, ui } from "../../lib/i18n";
```

Add:

```ts
const copy = homeCopy[lang];
const featuredProjects = compositionRows.slice(0, Math.min(6, compositionRows.length));
```

Replace the existing `<BaseLayout>` body with:

```astro
<BaseLayout lang={lang} title={title} description={profile.statement[0]} pageClass="home-page international-home">
  <div data-international-home>
    <nav class="home-nav" aria-label="Homepage navigation">
      <a class="home-nav__brand" href={`/${lang}/`}>CIBA</a>
      <div class="home-nav__links">
        <a href={`/${lang}/works/`}>{labels.works}</a>
        <a href={`/${lang}/about/`}>{labels.about}</a>
        <a href="#project-index">INDEX</a>
      </div>
    </nav>

    <div class="home-language" aria-label="Language switcher">
      {
        languages.map((targetLang) => (
          <a
            class:list={{ "is-active": targetLang === lang }}
            href={`/${targetLang}/`}
            aria-current={targetLang === lang ? "page" : undefined}
          >
            {languageLabels[targetLang]}
          </a>
        ))
      }
    </div>

    <section class="home-hero">
      <p class="home-kicker">CIBA / PORTFOLIO / 2026</p>
      <RollingTitle as="h1" text="CIBA / SELECTED WORKS" class="home-hero__title" hero />
      <p class="home-hero__intro">{copy.heroIntro}</p>
      <p class="home-hero__scroll">(SCROLL)</p>
    </section>

    <HomeMediaWall
      lang={lang}
      projects={featuredProjects}
      heading={copy.mediaHeading}
      body={copy.mediaBody}
      aside={copy.mediaAside}
    />

    <section class="home-statement" data-reveal>
      <p>{profile.statement[1]}</p>
    </section>

    <HomeWorkScene lang={lang} projects={compositionRows} heading={copy.experimentHeading} body={copy.experimentBody} />

    <section class="minimal-index" id="project-index" aria-labelledby="minimal-index-title">
      <p class="home-kicker">{labels.index}</p>
      <h2 id="minimal-index-title">PORTFOLIO / CIBA</h2>
      <div class="minimal-index__list">
        {
          compositionRows.map((project, index) => {
            const localized = getLocalizedProject(project, lang);
            return (
              <a href={`/${lang}/works/${project.slug}/`} data-reveal>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{localized.title}</strong>
                <span>{project.year}</span>
              </a>
            );
          })
        }
      </div>
    </section>
  </div>
</BaseLayout>
```

- [ ] **Step 7: Run structure tests and Astro type checking**

Run:

```powershell
npm test -- tests/homepage-redesign.test.ts
npm run check
```

Expected: tests PASS and Astro check reports `0 errors`.

- [ ] **Step 8: Commit homepage structure**

```powershell
git add -- src/components/home/RollingTitle.astro src/components/home/HomeMediaWall.astro src/components/home/HomeWorkScene.astro src/pages/[lang]/index.astro tests/homepage-redesign.test.ts
git commit -m "feat: rebuild homepage composition"
```

## Task 4: Apply the Internationalist Homepage Style System

**Files:**
- Modify: `src/styles/global.css`
- Modify: `tests/homepage-redesign.test.ts`

- [ ] **Step 1: Add failing style-system tests**

Append inside the existing `describe`:

```ts
  it("defines an internationalist ivory black and acid-green style system", () => {
    const styles = read("../src/styles/global.css");

    expect(styles).toContain("body.international-home");
    expect(styles).toContain("--home-paper: #f3ead6");
    expect(styles).toContain("--home-ink: #10100d");
    expect(styles).toContain("--home-acid: #b7ff00");
    expect(styles).toContain(".home-work-scene");
    expect(styles).toContain("scroll-snap-type: x mandatory");
    expect(styles).toContain(".international-home :focus-visible");
  });
```

- [ ] **Step 2: Run the style test to verify it fails**

Run:

```powershell
npm test -- tests/homepage-redesign.test.ts
```

Expected: FAIL because `.international-home` styles do not exist.

- [ ] **Step 3: Replace the obsolete final homepage CSS block**

In `src/styles/global.css`, replace the final block beginning with:

```css
/* ArtOfCinema / Scrib3 inspired homepage rebuild */
```

through the end of the file with a new `.international-home` block. The replacement must include:

```css
/* Internationalist homepage */
body.international-home {
  --home-paper: #f3ead6;
  --home-ink: #10100d;
  --home-muted: #5e594f;
  --home-acid: #b7ff00;
  --home-rule: rgba(16, 16, 13, 0.28);
  --bg: var(--home-paper);
  --fg: var(--home-ink);
  --muted: var(--home-muted);
  --line: var(--home-rule);
  background: var(--home-paper) !important;
  color: var(--home-ink);
  color-scheme: light;
  font-family: Inter, "Helvetica Neue", Arial, var(--font-ui);
}

.international-home .ambient-grid,
.international-home .site-header {
  display: none;
}

.international-home main,
.international-home .site-footer {
  position: relative;
  z-index: 1;
}

.international-home .site-footer {
  border-top: 1px solid var(--home-rule);
  background: var(--home-paper);
  color: var(--home-ink);
  font-family: inherit;
}

.international-home :focus-visible {
  outline: 3px solid var(--home-acid);
  outline-offset: 4px;
}

.home-nav,
.home-language {
  position: fixed;
  z-index: 60;
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.home-nav {
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  min-height: 3.5rem;
  padding: 0.75rem clamp(1rem, 3vw, 2rem);
}

.home-nav__links,
.home-language {
  display: flex;
  gap: 0.4rem;
}

.home-nav a,
.home-language a {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  padding: 0 0.45rem;
  transition: color 180ms ease, background-color 180ms ease;
}

.home-nav a:hover,
.home-language a:hover,
.home-language a.is-active {
  background: var(--home-acid);
  color: var(--home-ink);
}

.home-language {
  bottom: 1rem;
  left: clamp(1rem, 3vw, 2rem);
}

.home-hero,
.home-section-copy,
.home-statement,
.minimal-index {
  padding-right: clamp(1rem, 3vw, 2rem);
  padding-left: clamp(1rem, 3vw, 2rem);
}

.home-hero {
  display: grid;
  min-height: 100svh;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1rem;
  align-content: end;
  padding-top: 7rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--home-rule);
}

.home-kicker {
  margin: 0;
  color: var(--home-muted);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.home-hero > .home-kicker {
  grid-column: 1 / span 12;
}

.rolling-title {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  font-family: inherit;
  font-weight: 900;
  letter-spacing: -0.08em;
  line-height: 0.82;
  text-transform: uppercase;
}

.rolling-title__word {
  display: inline-flex;
  margin-right: 0.18em;
}

.rolling-title__mask {
  display: inline-block;
  height: 0.86em;
  overflow: clip;
}

.rolling-title__track {
  display: flex;
  flex-direction: column;
  line-height: 0.86;
  will-change: transform;
}

.rolling-title__track > span {
  display: block;
  height: 0.86em;
}

.home-hero__title {
  grid-column: 1 / span 12;
  max-width: 11ch;
  font-size: clamp(5.4rem, 15vw, 14rem);
}

.home-hero__intro {
  grid-column: 4 / span 5;
  max-width: 40rem;
  margin: 2rem 0 0;
  color: var(--home-muted);
  font-size: clamp(1rem, 1.35vw, 1.25rem);
  font-weight: 600;
  line-height: 1.45;
}

.home-hero__scroll {
  grid-column: 12;
  align-self: end;
  margin: 2rem 0 0;
  color: var(--home-muted);
  font-size: 0.72rem;
  font-weight: 800;
}

.home-media-wall {
  background: var(--home-paper);
}

.home-section-copy {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1rem;
  padding-top: clamp(5rem, 10vw, 10rem);
  padding-bottom: 3rem;
}

.home-section-copy .home-kicker,
.home-section-copy .home-section-title {
  grid-column: 1 / span 8;
}

.home-section-title,
.minimal-index h2 {
  font-size: clamp(3.6rem, 8vw, 8rem);
}

.home-section-copy > p:not(.home-kicker) {
  grid-column: 4 / span 5;
  margin: 0;
  color: var(--home-muted);
  font-size: clamp(1rem, 1.35vw, 1.25rem);
  font-weight: 600;
  line-height: 1.45;
}

.home-section-copy .home-section-copy__aside {
  grid-column: 10 / span 3;
  text-align: right;
}

.home-media-wall__pin {
  position: relative;
  min-height: 100svh;
  overflow: hidden;
  border-top: 1px solid var(--home-rule);
  border-bottom: 1px solid var(--home-rule);
}

.home-media-wall__field {
  position: absolute;
  inset: 0;
}

.home-media-wall__item {
  position: absolute;
  top: var(--media-top);
  left: var(--media-left);
  width: clamp(7rem, 14vw, 13rem);
  color: var(--home-ink);
  will-change: transform, opacity;
}

.home-media-wall__item img,
.home-work-card img {
  width: 100%;
  object-fit: cover;
}

.home-media-wall__item img {
  aspect-ratio: 4 / 3;
  border: 1px solid var(--home-ink);
  filter: grayscale(0.86) contrast(1.06);
  transition: filter 180ms ease;
}

.home-media-wall__item:hover img,
.home-media-wall__item:focus-visible img {
  filter: grayscale(0.08) contrast(1.04);
}

.home-media-wall__item span,
.home-work-card__caption {
  display: block;
  margin-top: 0.45rem;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.home-statement {
  display: grid;
  min-height: 72svh;
  place-items: end start;
  padding-top: 6rem;
  padding-bottom: 6rem;
  background: var(--home-paper);
}

.home-statement p {
  max-width: 18ch;
  margin: 0;
  font-size: clamp(3rem, 7vw, 7rem);
  font-weight: 900;
  letter-spacing: -0.08em;
  line-height: 0.88;
}

.home-work-scene {
  min-height: 520svh;
  background: var(--home-acid);
  color: var(--home-ink);
}

.home-work-scene__pin {
  position: sticky;
  top: 0;
  min-height: 100svh;
  overflow: hidden;
}

.home-work-scene__letters {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  opacity: 0.92;
  pointer-events: none;
}

.home-work-scene__letters span {
  color: var(--home-ink);
  font-size: clamp(10rem, 25vw, 24rem);
  font-weight: 900;
  letter-spacing: -0.12em;
  line-height: 0.76;
}

.home-work-scene__copy {
  position: absolute;
  top: 1rem;
  right: 2rem;
  left: 2rem;
  z-index: 3;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1rem;
}

.home-work-scene__copy .home-kicker,
.home-work-scene__copy .home-section-title {
  grid-column: 1 / span 8;
}

.home-work-scene__copy > p:last-child {
  grid-column: 9 / span 4;
  margin: 0;
  font-weight: 700;
  line-height: 1.35;
}

.home-work-card {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 4;
  width: clamp(13rem, 24vw, 23rem);
  padding: 0.5rem;
  border: 1px solid var(--home-ink);
  background: var(--home-paper);
  color: var(--home-ink);
  transform: translate(-50%, -50%);
  will-change: transform, opacity;
}

.home-work-card img {
  aspect-ratio: 16 / 10;
  border: 1px solid var(--home-rule);
}

.home-work-card__caption {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
}

.minimal-index {
  padding-top: clamp(5rem, 10vw, 10rem);
  padding-bottom: clamp(6rem, 12vw, 12rem);
  background: var(--home-paper);
  color: var(--home-ink);
}

.minimal-index h2 {
  margin: 0;
  max-width: 10ch;
  font-family: inherit;
  font-weight: 900;
  letter-spacing: -0.08em;
  line-height: 0.82;
}

.minimal-index__list {
  display: grid;
  margin-top: 4rem;
  border-top: 1px solid var(--home-rule);
}

.minimal-index__list a {
  display: grid;
  grid-template-columns: 4rem 1fr auto;
  gap: 1rem;
  align-items: baseline;
  min-height: 4.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--home-rule);
  font-family: inherit;
  text-transform: uppercase;
  transition: background-color 180ms ease, padding 180ms ease;
}

.minimal-index__list a:hover,
.minimal-index__list a:focus-visible {
  padding-right: 0.75rem;
  padding-left: 0.75rem;
  background: var(--home-acid);
}

.minimal-index__list span {
  color: var(--home-muted);
  font-size: 0.78rem;
  font-weight: 800;
}

.minimal-index__list strong {
  font-size: clamp(1.8rem, 4.8vw, 5.4rem);
  font-weight: 900;
  letter-spacing: -0.06em;
  line-height: 0.86;
}

@media (max-width: 767px) {
  .home-nav {
    padding-right: 0.55rem;
    padding-left: 0.55rem;
  }

  .home-nav__links,
  .home-language {
    gap: 0;
  }

  .home-nav a,
  .home-language a {
    min-height: 2.75rem;
    padding: 0 0.55rem;
  }

  .home-hero {
    display: block;
    min-height: 100svh;
  }

  .home-hero__title {
    margin-top: 1rem;
    font-size: clamp(4.2rem, 20vw, 7rem);
  }

  .home-hero__intro,
  .home-hero__scroll {
    margin-top: 2rem;
  }

  .home-section-copy {
    display: block;
  }

  .home-section-title {
    margin-top: 0.75rem;
    font-size: clamp(3.4rem, 17vw, 5.8rem);
  }

  .home-section-copy > p:not(.home-kicker) {
    margin-top: 1.5rem;
  }

  .home-section-copy .home-section-copy__aside {
    text-align: left;
  }

  .home-media-wall__pin {
    min-height: auto;
    padding: 0 1rem 4rem;
    overflow: visible;
  }

  .home-media-wall__field {
    position: relative;
    display: grid;
    gap: 1rem;
  }

  .home-media-wall__item {
    position: relative;
    top: auto;
    left: auto;
    width: 100%;
  }

  .home-statement p {
    font-size: clamp(3rem, 15vw, 5.8rem);
  }

  .home-work-scene {
    min-height: auto;
    padding: 6rem 0 4rem;
  }

  .home-work-scene__pin {
    position: relative;
    min-height: auto;
    overflow: visible;
  }

  .home-work-scene__letters {
    position: absolute;
    opacity: 0.3;
  }

  .home-work-scene__copy {
    position: relative;
    top: auto;
    right: auto;
    left: auto;
    display: block;
    padding: 0 1rem;
  }

  .home-work-scene__copy .home-section-title {
    margin-top: 0.75rem;
  }

  .home-work-scene__copy > p:last-child {
    margin-top: 1.5rem;
  }

  .home-work-scene__cards {
    display: flex;
    gap: 1rem;
    margin-top: 3rem;
    padding: 0 1rem 1rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }

  .home-work-card {
    position: relative;
    top: auto;
    left: auto;
    flex: 0 0 82vw;
    width: auto;
    scroll-snap-align: center;
  }

  .minimal-index__list a {
    grid-template-columns: 2.8rem 1fr;
  }

  .minimal-index__list a span:last-child {
    grid-column: 2;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }

  .home-media-wall__field {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
    gap: 1rem;
    padding: 1rem;
  }

  .home-media-wall__item,
  .home-work-card {
    position: relative;
    top: auto;
    left: auto;
    transform: none !important;
    opacity: 1 !important;
  }

  .home-work-scene {
    min-height: auto;
  }

  .home-work-scene__pin {
    position: relative;
  }

  .home-work-scene__cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
    gap: 1rem;
    padding: 12rem 1rem 4rem;
  }
}
```

- [ ] **Step 4: Run style tests and Astro checking**

Run:

```powershell
npm test -- tests/homepage-redesign.test.ts
npm run check
```

Expected: PASS and `0 errors`.

- [ ] **Step 5: Commit the style system**

```powershell
git add -- src/styles/global.css tests/homepage-redesign.test.ts
git commit -m "feat: style internationalist homepage"
```

## Task 5: Replace Old Homepage GSAP With Scoped Scroll Scenes

**Files:**
- Modify: `src/scripts/portfolio-motion.ts`
- Modify: `tests/homepage-redesign.test.ts`

- [ ] **Step 1: Add failing GSAP boundary tests**

Append inside the existing `describe`:

```ts
  it("uses scoped GSAP scenes without the obsolete draggable homepage", () => {
    const motion = read("../src/scripts/portfolio-motion.ts");

    expect(motion).toContain('[data-international-home]');
    expect(motion).toContain('[data-home-media-wall]');
    expect(motion).toContain('[data-home-work-scene]');
    expect(motion).toContain("gsap.context");
    expect(motion).not.toContain('from "gsap/Draggable"');
    expect(motion).not.toContain("[data-work-window]");
    expect(motion).not.toContain("[data-file-extract]");
  });
```

- [ ] **Step 2: Run the GSAP test to verify it fails**

Run:

```powershell
npm test -- tests/homepage-redesign.test.ts
```

Expected: FAIL because the old homepage motion still imports `Draggable` and uses old hooks.

- [ ] **Step 3: Remove homepage-only Draggable registration**

In `src/scripts/portfolio-motion.ts`:

```ts
// Remove:
import { Draggable } from "gsap/Draggable";

// Keep Flip and ScrollToPlugin because works-page filters and anchor links still use them.
gsap.registerPlugin(CustomEase, Flip, ScrollToPlugin, ScrollTrigger, SplitText);
```

- [ ] **Step 4: Replace the obsolete homepage GSAP block**

Remove the blocks beginning with:

```ts
    const cinemaScroll = document.querySelector<HTMLElement>("[data-cinema-scroll]");
```

through the end of the old `fileExtract` block. Insert:

```ts
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
                trigger: mediaWall,
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
          const workTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: workScene,
              start: "top top",
              end: "+=4200",
              pin: workScenePin,
              scrub: 1.1,
              anticipatePin: 1
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
```

Update the reduced-motion clearing selector near the top of the same file:

```ts
      gsap.set(
        "[data-reveal], .project-card, .hero-visual, .work-form, [data-wake-page] img, [data-home-media], [data-home-work-card], .rolling-title__track",
        { clearProps: "all" }
      );
```

- [ ] **Step 5: Run GSAP tests and full automated verification**

Run:

```powershell
npm test
npm run check
npm run build
```

Expected: all Vitest tests PASS, Astro check reports `0 errors`, and static build completes successfully.

- [ ] **Step 6: Commit scoped homepage motion**

```powershell
git add -- src/scripts/portfolio-motion.ts tests/homepage-redesign.test.ts
git commit -m "feat: add immersive homepage scroll scenes"
```

## Task 6: Verify Responsive and Reduced-Motion Behavior

**Files:**
- Modify if needed: `src/styles/global.css`
- Modify if needed: `src/scripts/portfolio-motion.ts`
- Modify if needed: `tests/homepage-redesign.test.ts`

- [ ] **Step 1: Start the Astro development server**

Run:

```powershell
npm run dev -- --host 127.0.0.1
```

Expected: Astro serves the project at `http://127.0.0.1:4321/`.

- [ ] **Step 2: Verify desktop composition**

Open:

```text
http://127.0.0.1:4321/zh/
```

Check at 1440px and 1024px:

- Ivory and black dominate the hero and media wall.
- Acid green is restrained until the work scene.
- Rolling title glyphs move vertically without layout shift.
- The media wall pins and unfolds from deterministic positions.
- The work scene switches to full acid green, shows oversized `WORK`, and moves 6 to 8 cards across the viewport.
- The index clearly returns to ivory and black after the work scene.
- Every project card opens the correct localized detail URL.

- [ ] **Step 3: Verify mobile fallbacks**

Check at 375px and 768px:

- No forced pinned scroll effects.
- No horizontal page overflow.
- The media wall becomes a vertical editorial stream.
- The acid-green cards become a horizontal snap scroller.
- Navigation and language targets are at least 44px high.

- [ ] **Step 4: Verify keyboard and reduced-motion behavior**

Check:

- `Tab` reveals the skip link and moves focus visibly through navigation, language links, media links, work cards, and index links.
- With `prefers-reduced-motion: reduce`, rolling glyphs and pinned scrub effects stop.
- The wall remains a static grid and work cards remain a readable ordered list.

- [ ] **Step 5: Fix any visual issues with a failing regression assertion first**

For every discovered structural regression, append a specific assertion to `tests/homepage-redesign.test.ts`, run it to verify failure, then make the smallest production change.

- [ ] **Step 6: Run final verification**

Run:

```powershell
npm test
npm run check
npm run build
git diff --check
git status --short
```

Expected:

- All tests pass.
- Astro check reports `0 errors`.
- Static build succeeds.
- `git diff --check` has no output.
- Only intentional source, test, and plan changes remain.

- [ ] **Step 7: Commit visual QA fixes if any**

```powershell
git add -- src/styles/global.css src/scripts/portfolio-motion.ts tests/homepage-redesign.test.ts
git commit -m "fix: refine homepage responsive motion"
```
