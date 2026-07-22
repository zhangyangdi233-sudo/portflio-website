# WorkDesktopWindow specification

## Overview

- Target file: `src/components/WorkDesktopWindow.astro`
- Target styles: `src/styles/ciba-v3.css`
- Interaction model: drag + click + keyboard on desktop; ordered static cards on mobile.
- Research evidence: dated ZUTOMAYO interaction measurements in `../BEHAVIORS.md`; source and
  evidence class in `../PROVENANCE.md`. Current-site screenshots may be used for regression review.

## DOM structure

`article` window → focusable title bar → index/title → window controls → linked media figure →
Year / Medium / Status record → localized Concept → open action.

## Target computed styles

### Window

- position: absolute in Windows mode; relative in Order/mobile/reduced-motion mode
- width: project-configured 410–460px; max-width: calc(100% - 32px)
- background: `var(--ciba-night)`
- color: `var(--ciba-paper)`
- border: `2px solid var(--ciba-paper)`
- border-radius: 0
- box-shadow: `12px 12px 0 var(--ciba-acid)`
- transform: native CSS-variable translation plus authored rotation between -0.45deg and 0.4deg
- touch-action: none on the handle only

### Title bar

- min-height: 46px
- display: grid; columns: title / minimize mark / close
- background: `var(--ciba-acid)`
- color: `var(--ciba-night)`
- font: UI/mono, 11–12px, uppercase, 0.08em tracking
- cursor: grab; active cursor: grabbing
- focus: 3px acid-green outline with 3px offset

### Controls

- semantic buttons, minimum 44 × 44px hit box
- visual glyphs drawn with CSS/SVG; no emoji and no borrowed raster assets
- hover/pressed: 180ms color/opacity transition, no layout shift

### Media

- aspect-ratio: 16 / 10
- object-fit: contain
- border-bottom: 1px solid the window border color
- hover: scale to 1.025 over 260ms only when motion is allowed

### Body

- padding: approximately 11px
- concept: approximately 12.5px with 1.45 line-height
- metadata: mono approximately 9.5px with adequate contrast

## States and behavior

### Focus / raise

- Trigger: pointerdown or focusin on a window, or its dock button.
- Effect: increment a workspace-local z-index counter and mark the window active.
- Transition: border/color 180ms; do not animate z-index.

### Drag

- Trigger: pointer drag on title bar only.
- Bounds: workspace container.
- Feedback: real-time bounded transform with the window kept inside the workspace.
- Keyboard alternative: Arrow = 16px, Shift + Arrow = 48px.

### Minimize and restore

- Trigger: minimize control, Escape on handle, or dock button.
- Minimized state: window hidden, dock button marked closed, live region announces state.
- Restore: dock button restores and focuses title bar.

### Windows / Order

- Windows: configured absolute positions and authored rotations.
- Order: responsive ordered grid; transforms and rotations cleared; all visible windows remain readable.
- Mobile and reduced motion always use Order semantics.

### Filter

- All: every project.
- Featured: `data-featured=true` only.
- Archive: all non-featured projects.
- Result count announced through a polite live region.

### Reset

- Clear native transform variables, restore configured positions, rotations and visible state.
- Do not reload the page.

## Responsive behavior

- Desktop 1440px: four overlapping 410–460px windows in a 760px stage.
- Tablet 768px and mobile 390px: single-column ordered windows; drag controls hidden; text untruncated.
- Breakpoint: 900px.

## Reduced motion

- Force Order mode and remove drag handles from focus order.
- Keep focus, filter, minimize and restore instantaneous.
