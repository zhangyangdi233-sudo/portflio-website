# WorkDesktopWindow specification

## Overview

- Target file: `src/components/WorkDesktopWindow.astro`
- Target styles: `src/styles/art-direction.css`
- Interaction model: drag + click + keyboard on desktop; ordered static cards on mobile.
- Research evidence: dated ZUTOMAYO interaction measurements in `../BEHAVIORS.md`; source and
  evidence class in `../PROVENANCE.md`. Current-site screenshots may be used for regression review.

## DOM structure

`article` window → focusable title bar → index/title → window controls → linked media figure → metadata → localized summary → tags → open action. Status remains semantic data but is visually omitted from the compact title bar.

## Target computed styles

### Window

- position: absolute in Scatter mode; relative in Scan/mobile mode
- width: project-configured 252–305px; max-width: calc(100vw - 32px)
- background: `var(--art-surface)`
- color: `var(--art-ink)`
- border: `1px solid color-mix(in srgb, var(--window-accent) 70%, var(--art-plum))`
- border-radius: 0
- box-shadow: `8px 8px 0 rgba(0,0,0,.34)`
- transform: translated by GSAP plus authored rotation between -0.4deg and 0.3deg
- touch-action: none on the handle only

### Title bar

- min-height: 44px
- display: grid; columns: auto 1fr auto
- padding: 0 4px 0 12px
- background: `var(--window-accent)`
- color: contrast-safe `var(--window-on-accent)`
- font: UI/mono, 11–12px, uppercase, 0.08em tracking
- cursor: grab; active cursor: grabbing
- focus: 2px acid-green outline with 2px offset

### Controls

- semantic buttons, minimum 44 × 44px hit box
- visual glyphs drawn with CSS/SVG; no emoji and no borrowed raster assets
- hover/pressed: 180ms color/opacity transition, no layout shift

### Media

- aspect-ratio: 16 / 9
- object-fit: cover
- border-bottom: 1px solid the window border color
- hover: scale to 1.025 over 260ms only when motion is allowed

### Body

- padding: approximately 11px
- summary: approximately 13.5px, 1.35 line-height, max 2 lines in Scatter mode, unrestricted in Scan/mobile mode
- tags: hidden in Scatter mode; visible in Scan/mobile mode
- metadata: mono approximately 9.5px with adequate contrast

## States and behavior

### Focus / raise

- Trigger: pointerdown or focusin on a window, or its dock button.
- Effect: increment a workspace-local z-index counter and mark the window active.
- Transition: border/color 180ms; do not animate z-index.

### Drag

- Trigger: pointer drag on title bar only.
- Bounds: workspace container.
- Feedback: real-time transform, edge resistance 0.78.
- Keyboard alternative: Arrow = 16px, Shift + Arrow = 48px.

### Minimize and restore

- Trigger: minimize control, Escape on handle, or dock button.
- Minimized state: window hidden, dock button marked closed, live region announces state.
- Restore: dock button restores and focuses title bar.

### Scatter / Scan

- Scatter: configured absolute positions and authored rotations.
- Scan: responsive ordered grid; transforms and rotations cleared; all visible windows remain readable.
- Mobile always uses Scan semantics.

### Filter

- All: every project.
- Featured: `data-featured=true` only.
- Archive: all non-featured projects.
- Result count announced through a polite live region.

### Reset

- Clear GSAP transforms, restore configured positions, rotations and visible state.
- Do not reload the page.

## Responsive behavior

- Desktop 1440px: 7 overlapping windows across a two-row 980px stage.
- Tablet 768px and mobile 390px: single-column ordered windows; drag controls hidden; text untruncated.
- Breakpoint: 900px.

## Reduced motion

- Disable staggered entrance and authored rotation.
- Keep focus, filter, minimize and restore instantaneous or crossfaded under 120ms.
