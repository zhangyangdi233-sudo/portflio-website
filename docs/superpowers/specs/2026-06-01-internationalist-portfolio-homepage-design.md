# Internationalist Portfolio Homepage Design

## Goal

Redesign the CIBA portfolio homepage as an immersive but disciplined artist archive. The page should feel internationally legible, typographically precise, and high-end while preserving selective moments of experimental motion.

The homepage is the only page in scope. Existing works index, about page, and project detail pages keep their current structure unless a shared accessibility improvement is required.

## Design Direction

The homepage follows Swiss Modernism 2.0 and international typographic style:

- Use a strict 12-column grid with mathematical spacing based on an 8px unit.
- Use sans-serif typography throughout the homepage. Prefer `Inter`, `"Helvetica Neue"`, `Arial`, and system sans-serif fallbacks.
- Use asymmetric balance, strong typographic hierarchy, thin rules, square corners, and generous negative space.
- Keep decorative UI minimal. Motion is treated as a controlled editorial device.
- Avoid generic portfolio cards, gradients, large shadows, rounded containers, and ornamental textures.

The page takes inspiration from the scrolling type and media staging on [TheArtOfCinema](https://www.theartofcinema.xyz/?ref=onepagelove) and the progress-driven work scene on [wodniack.dev](https://wodniack.dev/). The implementation must adapt those ideas to CIBA's content and visual identity rather than reproduce either reference site.

## Color System

The default homepage palette is high contrast:

| Token | Value | Use |
| --- | --- | --- |
| `--home-paper` | `#F3EAD6` | Main background |
| `--home-ink` | `#10100D` | Main text and rules |
| `--home-muted` | `#5E594F` | Secondary text |
| `--home-acid` | `#B7FF00` | Accent only |
| `--home-rule` | `rgba(16, 16, 13, 0.28)` | Thin dividers |

Acid green is normally limited to approximately 5% of the visible surface. It is used for section numbers, progress states, active navigation markers, and focus rings.

The experimental work scene is the deliberate exception: it uses a full acid-green background and oversized black sans-serif lettering. After that scene ends, the page returns to the default ivory and black palette.

## Homepage Structure

### 1. Fixed Navigation

Use a restrained fixed navigation bar:

- Left: `CIBA`
- Center or right: `WORKS`, `ABOUT`, `INDEX`
- Bottom or secondary row: language switcher
- Add a visible-on-focus skip link targeting `#content`

Interactive targets must be at least 44px high on touch devices. Links require visible `:focus-visible` states.

### 2. Hero: Selected Works

Use a full-viewport typographic hero:

- A single semantic `<h1>` contains `CIBA / SELECTED WORKS`.
- Visually split letters into masked duplicate glyphs so GSAP can roll each glyph vertically during entry and scroll.
- Use one short localized introductory paragraph aligned to the 12-column grid.
- Keep the hero sparse: no floating windows, no large green overlay, no draggable UI.

The hero establishes the internationalist baseline before more expressive sections begin.

### 3. Scattered Media Wall

Create a pinned desktop section inspired by the media staging on TheArtOfCinema:

- Introduce the section with a large rolling title and two short localized text blocks.
- Place approximately 10 to 14 project images inside an oversized media field.
- Use deterministic layout positions rather than random values so the composition is stable.
- Drive each image with `x`, `y`, and limited `rotation` transforms as scroll progresses.
- Keep image captions concise: index and project title.
- Use grayscale or reduced saturation at rest and reveal more color on hover or focus.

The images should unfold from a composed field, not appear as a chaotic collage.

### 4. Artist Statement Pause

Return to the ivory background and reduce motion:

- Use one large localized statement.
- Keep a generous vertical pause.
- Use no pinned animation beyond a simple reveal.

This gives the visitor a visual reset before the experimental work scene.

### 5. Experimental Work Scene

Create a controlled high-intensity section inspired by the progress-driven scene on wodniack.dev:

- Use a full acid-green background.
- Pin the scene on desktop.
- Place oversized repeating black letters spelling `WORK` behind the cards.
- Use 6 to 8 project cards, each linking to an existing project detail page.
- Give each card deterministic parameters for size, vertical offset, rotation, and travel distance.
- Animate cards through the viewport with GSAP `ScrollTrigger` scrubbed transforms.
- Keep captions compact: project title, year, and an archive-style identifier.
- Use existing project poster and image assets. Do not introduce external media.

The scene is intentionally more experimental than the rest of the homepage. Its entry and exit must clearly transition between ivory and acid green so it feels like a curated exception.

### 6. Minimal Project Index

After the experimental scene, restore the ivory background and return to strict internationalist order:

- Display every project in a clean index.
- Use project number, title, year, and a single rule between rows.
- Preserve direct links to project pages.
- Keep hover and focus feedback subtle and acid-green.

### 7. Footer

Use a compact footer with artist name, contact, location, and archive link when available.

## Motion Architecture

Use the existing `src/scripts/portfolio-motion.ts` entry point and GSAP package.

### Required Plugins

- `ScrollTrigger` for pinned and scrubbed scroll scenes.
- `SplitText` where it simplifies rolling text behavior.
- `CustomEase` only if a built-in ease cannot provide the desired restrained motion.

Remove homepage use of `Draggable`, `Flip`, and `ScrollToPlugin` unless another route still needs them.

### Implementation Rules

- Create ScrollTriggers in top-to-bottom DOM order.
- Apply `pin` to section wrappers and animate child elements, not pinned nodes.
- Use `ease: "none"` for scroll-linked timelines.
- Animate only `transform` and `opacity` for scrolling media and cards.
- Use `will-change: transform` only on elements that actually animate.
- Call `ScrollTrigger.refresh()` after fonts and images settle.
- Keep all homepage selectors scoped under a homepage root or data attribute.
- Preserve cleanup using GSAP contexts or equivalent teardown when navigation lifecycle requires it.

### Reduced Motion

For `prefers-reduced-motion: reduce`:

- Disable pinned scrub scenes.
- Disable per-character rolling animation.
- Render the scattered media wall as a static responsive grid.
- Render the experimental work scene as an ordered responsive project list on acid green.
- Preserve access to every project link and all localized text.

## Responsive Behavior

### Desktop: 1024px and above

- Use full pinned scroll scenes.
- Use the complete 12-column composition.
- Allow media wall scatter transforms and experimental card travel.

### Tablet: 768px to 1023px

- Keep the grid but reduce travel distance, rotation, and visible media count.
- Avoid excessive pin duration.

### Mobile: below 768px

- Do not force long pinned scroll effects.
- Stack hero text naturally.
- Render the scattered media wall as a vertical editorial stream.
- Render experimental cards as a horizontal snap scroller on acid green.
- Ensure no horizontal page overflow outside intentional card scrollers.

## Accessibility

- Add a skip link targeting `#content`.
- Keep one homepage `<h1>` and use `<h2>` for subsequent sections.
- Preserve descriptive alt text for meaningful images.
- Add `aria-current="page"` to the active language link.
- Ensure focus rings are visible against both ivory and acid-green backgrounds.
- Ensure interactive targets meet a 44px minimum touch size.
- Do not rely on hover alone to expose essential project information.
- Preserve the current `prefers-reduced-motion` handling and expand it for new scenes.

## Localization

Move homepage explanatory copy into localized data for Chinese, English, and Japanese. English display labels such as `WORK`, `INDEX`, and archive identifiers may remain as graphic UI elements when they support the internationalist visual language.

## Scope Changes

Remove from the homepage:

- Floating desktop work windows.
- Homepage drag interactions.
- Large default green overlay.
- The current file-folder stack if it duplicates the new experimental work scene.
- Multiple semantic `<h1>` elements for project title transitions.

Preserve:

- Existing project data and media assets.
- Direct links to every project detail page.
- Existing static build architecture.
- Existing project pages and Wake Up replica.

## Testing Strategy

Update or add tests before production edits:

1. Assert that the homepage source contains one semantic `<h1>` and distinct `<h2>` sections.
2. Assert that the homepage includes dedicated media-wall and experimental-scene data hooks.
3. Assert that floating window and draggable homepage hooks are removed.
4. Assert that localized homepage copy is available for all supported languages.
5. Keep existing composition ordering tests passing.

Run:

```powershell
npm test
npm run check
npm run build
```

When browser tooling is available, visually verify:

- 375px mobile
- 768px tablet
- 1024px laptop
- 1440px desktop
- reduced-motion mode

## Acceptance Criteria

- The homepage reads as internationalist typography first and experimental motion second.
- Ivory and black dominate outside the experimental scene.
- Acid green acts as a restrained accent except for the intentionally full-green work scene.
- Rolling titles, scattered media, and experimental cards remain legible and navigable.
- The page returns clearly to the ivory and black index after the experimental scene.
- Mobile users receive a simplified, touch-friendly experience without forced scroll-jacking.
- Keyboard users can skip navigation and see focus states.
- Reduced-motion users can access the complete portfolio without pinned or rolling animations.
- Existing automated tests, Astro checks, and static build pass.
