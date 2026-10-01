# SiteShellV2 specification

## Overview

- Target files: `src/components/Header.astro`, `src/styles/art-direction.css`
- Interaction model: conventional navigation.
- Evidence: The Art of Cinema fixed 68px transparent navigation at 1280px; CIBA target is an
  independent 56px semantic shell with stronger keyboard and mobile behavior.

## Structure

`header` → identity link → primary navigation → language navigation. The page retains the existing
skip link and conventional URLs. The active language uses text, border and position, not color alone.

## Target styles

- height: 56px desktop; auto with a minimum 56px below 700px
- position: sticky; top: 0; z-index: 1000
- padding-inline: `clamp(16px, 2.2vw, 32px)`
- background: opaque near-black; no blur
- border-bottom: 1px warm paper
- typography: UI sans, 12–14px, uppercase Latin labels, normal Japanese casing
- touch/focus targets: at least 44px high

## Responsive behavior

- 1440px: three-column identity / centered nav / language group.
- 768px: preserve all primary destinations with reduced gaps.
- 390px: compact identity, Works/About and the full language group remain on one row; Contact is available from About.
- Never introduce horizontal page overflow.

## States

- hover: acid underline and no layout shift, 180ms.
- focus-visible: 2px acid outline, 3px offset.
- active language: acid field with black text plus `aria-current="page"`.

## Reduced motion

No essential header motion. Hover/focus state may become immediate.
