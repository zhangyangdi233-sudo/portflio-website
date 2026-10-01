# WorkDesktopWindowV2 specification

## Overview

- Target file: `src/components/WorkDesktopWindow.astro`
- Target styles: `src/styles/art-direction.css`
- Interaction model: title-bar drag + click + keyboard on desktop; ordered card on mobile/List.
- Narrative mode: spatial.
- Reference image: `docs/design-references/research-2026-07-18/zutomayo-desktop-1440.png`.

## Direct reference measurements

The tested ZUTOMAYO special window used an independently positioned `.drag-and-drop` element,
`cursor: move`, a 1.5 transform, a 26px purple title strip, pale body, close control, image area and
two-choice footer. One window moved from approximately `(206,498)` to `(466,320)` through pointer
drag. A news window measured approximately 180×72 CSS px before scaling; the reference's 8–10px
type and small close targets are not suitable for CIBA.

## DOM structure

`article` window → title bar → status mark → sequence/title → close-to-dock button → linked media →
compact evidence block → explicit Open Project action. The title bar is the only drag trigger.

## Target computed styles

### Window

- position: absolute in Scatter; relative in List/mobile
- width: configured 320–390px; max-width: calc(100vw - 32px)
- background: warm paper
- color: near black
- border: 2px solid near black plus 1px outer warm-paper keyline
- border-radius: 0
- box-shadow: 8px 8px 0 acid green; active window 12px 12px 0 acid green
- authored rotation: -0.45deg to 0.46deg; cleared in List/mobile/reduced motion

### Title bar

- min-height: 46px
- background: acid green; color: near black
- grid columns: 20px 40px minmax(0,1fr) auto
- type: mono/UI 11–12px, uppercase Latin, 0.06em tracking
- drag cursor: grab/grabbing; `touch-action: none` only on the invisible full-bar drag button
- title, status mark and index remain visually above the drag button.

### Close control

- semantic button, 46×46px hit area
- CSS-drawn X with two 2px near-black strokes; no borrowed raster icon
- action means minimize to dock, announced by a polite live region

### Media

- aspect-ratio: 4/3 for clearer artwork evidence
- border-block: 2px near black
- image/video fills the frame with `object-fit: cover`
- index is grayscale; hover/focus may increase contrast but may not reveal a fourth interface color

### Evidence body

- padding: 14px
- top row: year / medium / status in mono 10–11px
- summary: 14px, 1.4, maximum three lines in Scatter; unrestricted in List/mobile
- Open action: acid field with black label and arrow; minimum 44px

## States and behaviors

### Raise/focus

- pointerdown or focusin increments local z-index and adds active shadow/label.
- immediate state; no z-index animation.

### Drag

- desktop fine pointer only; GSAP Draggable on title-bar handle.
- window stays inside the workspace stage.
- keyboard: Arrow 16px; Shift+Arrow 48px; Home returns to authored origin.
- List control provides a single-pointer alternative to all spatial comparison.

### Minimize/restore

- X button or Escape minimizes to dock.
- dock button restores, raises and focuses the title bar.

### Filter/reset

- All / Featured / Archive are button states with live counts.
- Reset restores visibility, authored positions, rotations, z-order and Scatter mode.

## Responsive behavior

- desktop ≥900px: overlapping windows are visible in the first workspace viewport.
- below 900px: one-column ordered cards; drag handle behaves as a normal focus target and no
  precision drag is initialized.
- 390px: body text is untruncated; window fills available width; all controls remain ≥44px.

## Reduced motion

- clear rotations and entrance stagger.
- focus/filter/minimize/restore are immediate or use opacity under 120ms.
