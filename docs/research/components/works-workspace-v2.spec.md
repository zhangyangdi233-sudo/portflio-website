# WorksWorkspaceV2 specification

## Overview

- Target files: `src/pages/[lang]/works/index.astro`, `src/scripts/portfolio-motion.ts`,
  `src/styles/art-direction.css`, `src/content/art-direction.json`
- Interaction model: spatial desktop with explicit ordered alternative.

## Structure

Compact mast → toolbar → bounded stage → persistent dock. The stage begins within the first desktop
viewport so all four verified windows are immediately recognizable. A large decorative title must
not push the workspace below the fold.

## Layout targets

- mast: 140–190px desktop, compact asymmetric grid, title may reach 118px while the full mast stays within the first 20svh.
- workspace shell: min-height `calc(100svh - 56px)`.
- toolbar: 54px, warm-paper rule, near-black field, sticky inside shell.
- stage: 760px desktop, full-width, sparse 48px warm-paper grid at approximately 16% opacity.
- dock: minimum 50px, horizontal wrapping controls, acid indicator for minimized windows.
- z-index scale: stage 0; windows 20–200; toolbar/dock 400; global header 1000.

## Controls

- every control ≥44px.
- `aria-pressed` mirrors filter and layout state.
- labels use localized visible text; icons never carry state alone.
- `Scatter` and `List` replace the less legible old `Scatter` and `Scan` wording.

## Initial window composition at 1440px

- X.WHEEL: x 2%, y 28px, width 390px, rotation -0.45deg, z 4.
- EMIDA: x 27%, y 72px, width 360px, rotation 0.4deg, z 3.
- Wake Up: x 51%, y 38px, width 374px, rotation -0.32deg, z 2.
- Escape Project: x 73%, y 88px, width 354px, rotation 0.46deg, z 1.
- The layout is intentionally asymmetric but bounded and recoverable through Reset/List.

## Responsive behavior

- 900–1180px: reduce windows to no more than 320px and clamp their initial right edge inside the stage.
- below 900px: toolbar wraps, stage becomes a one-column grid, dock remains reachable, no absolute
  positioning or hidden overflow.
- 390px: 16px side gutters; no horizontal page scroll.

## Accessibility and performance

- provide skip link, focus visibility, polite live status and semantic heading order.
- lazy-load non-leading media and reserve aspect ratios.
- drag has keyboard and List alternatives per WCAG 2.2 2.5.7.
- animate transform/opacity only and respect reduced motion.
