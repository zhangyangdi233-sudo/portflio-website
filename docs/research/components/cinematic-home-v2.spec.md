# CinematicHomeV2 specification

## Overview

- Target files: `src/pages/[lang]/index.astro`, `src/scripts/portfolio-motion.ts`,
  `src/styles/art-direction.css`
- Interaction model: scroll-driven on desktop; ordered static flow on mobile/reduced motion.
- Narrative mode: cinematic.
- Single anomaly: clipped double-glyph title roll tied to selected-project progression.

## Direct reference measurements

At the observed desktop state, The Art of Cinema used a near-black `rgb(10,10,10)` field,
warm-white `rgb(241,241,241)` text, a fixed 68px navigation, a 140/119px hero title, 96/96px
chapter titles, a 12-column editorial grid and a roughly 4547px pinned sequence. Its scattered
media samples were commonly around 230×166px and moved by transform during scroll. The reference
served a fixed 1280px layout in the phone test; CIBA must not reproduce that responsive failure.

## Opening title

- min-height: `100svh`; padding-top accounts for the fixed header.
- CIBA identity title: `clamp(128px, 25.5vw, 400px)`, clipped one-line height 0.78, weight 900+.
- title may crop at the viewport edge as composition, but its accessible name and final glyph remain
  available; Japanese explanatory text never inherits this cropping.
- ledger row: artistic position, work count and conventional selected-work link.

## Selected-work sequence

- desktop stage: sticky 100svh inside approximately 400svh scroll distance for four works.
- active title occupies columns 1–7; metadata/summary occupy columns 1–5 below it.
- media field occupies the full stage but primary images stay mostly in columns 7–12.
- image widths: approximately 260–544px depending on stage width; border: 1px warm paper; grayscale index treatment.
- project changes occur at deterministic quarters of scroll progress.
- each linked image carries project title and sequence text.

## Glyph mechanism

- one semantic heading per project.
- each visual glyph mask contains two identical glyphs; duplicate is `aria-hidden`.
- track is two 1em rows and translates by exactly one line height.
- outgoing title 260ms; incoming title 420ms; total stagger no more than 180ms.
- only transform and opacity animate.

## Ordered evidence index

- all projects remain normal links with sequence, title, year and medium.
- rows are at least 64px high and readable without hover.
- acid marks only the row in focus/hover and does not replace typography or borders.

## Responsive behavior

- below 900px: remove pinning and scattered absolute placement; render selected works as ordered
  title + image + summary chapters.
- 390px: no horizontal overflow, 16px body minimum, 44px links, CJK uses language-specific line
  breaking and system sans fallbacks.

## Reduced motion

- no smooth scrolling, pinning, parallax or glyph translation.
- all titles, summaries and media are visible in document order.
