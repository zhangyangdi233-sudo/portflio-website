# Coursework Desktop component specification

Status: implementation contract  
Reference inspected: [ZUTOMAYO](https://zutomayo.net/) on 2026-07-28  
Scope: abstract window interaction only

## Reference observations

At a 1280×720 desktop viewport, the reference site presents multiple independent windows above one
illustrated field. The inspected windows are absolutely positioned, use a move cursor, retain their
own stacking levels, and receive inline `left` / `top` values after a drag. Window chrome separates
the title, close affordance, body, and links. At 390×844, the floating desktop windows are removed
from the primary composition rather than compressed into unreadable miniatures.

These observations define interaction evidence, not a licence to reproduce the reference
expression. CIBA will not ship the reference site's purple chrome, pixel typeface, illustrations,
logos, copy, buttons, source code, or branded window proportions.

## CIBA transformation

| Axis | Reference mechanism | CIBA implementation |
| --- | --- | --- |
| Surface | One illustrated field | Three sequential near-black desktop windows |
| Chrome | Purple/pink retro window | Warm-paper rule, black title bar, acid focus marker |
| Content | News and promotional cards | Supplied coursework images and playable videos |
| Drag target | Broad draggable card | Dedicated 44px title-bar handle |
| Bounds | Page-scale composition | Strict clipping and clamping inside each large window |
| Mobile | Floating elements hidden | Semantic, full-width evidence list |
| Close action | Individual close affordances | Persistent evidence; section-level reset only |
| Typography | Proprietary pixel expression | CIBA sans/mono system with locale-specific rules |

At least six expression axes change. The result should feel like a CIBA evidence desktop, not a
reskinned copy.

## Component anatomy

### `CourseworkDesktop`

- One localized record header.
- A skip/index navigation linking to the three section windows.
- Exactly three `CourseworkSectionWindow` instances in source order:
  1. Blender
  2. Maya
  3. After Effects + Premiere Pro
- A next-project link after the evidence windows.

### `CourseworkSectionWindow`

- Semantic `section` with a localized heading.
- Large outer chrome with:
  - section number,
  - section name,
  - factual item count,
  - a reset-all button.
- One bounded inner stage with `position: relative`, `overflow: hidden`, and `isolation: isolate`.
- One ordered fallback list using the same DOM, not duplicated content.

Desktop target: each outer window should read as a chapter and occupy roughly one viewport of
vertical space. The inner stage must be large enough for overlap and direct manipulation without
turning the media into thumbnails.

### `CourseworkMediaWindow`

- `figure` root, positioned absolutely on desktop.
- Title bar contains:
  - stable item code,
  - media kind,
  - keyboard-operable drag handle.
- Body contains either:
  - an image with intrinsic dimensions, or
  - a native `<video controls playsinline preload="metadata">` with an explicit MP4 source.
- `figcaption` stays visible and factual.
- The title bar—not the media body—starts drag. Video scrub, volume, play, fullscreen, and keyboard
  controls must remain native and independent.

## Initial composition

Initial coordinates are authored as normalized percentages so each section can scale without
recomputing its editorial rhythm. Each item also has a width token. Initial windows overlap enough
to create a desktop field, but every title bar must remain discoverable.

- Blender: a ten-item field with three depth bands; the larger final renders anchor the top-left,
  centre, and lower-right; process screenshots and videos bridge them.
- Maya: two substantial windows, offset diagonally.
- AE / PR: two wide video windows, offset vertically so both title bars and control rows remain
  reachable.

The reset action restores authored coordinates and z-order for that section only.

## Pointer interaction

1. `pointerdown` on the handle records pointer origin and current transform.
2. The window receives pointer capture.
3. The active item receives the section's next z-index.
4. `pointermove` updates `translate3d(x, y, 0)` using animation-frame batching.
5. Position is clamped to the inner stage. At minimum the full title bar and 44px of body remain
   inside the stage.
6. `pointerup` and `pointercancel` release capture and remove the dragging state.
7. No drag starts from images, captions, links, buttons, or video controls.

## Keyboard interaction

The title-bar handle is a button with an action-oriented accessible name.

- Arrow: move 16px.
- Shift + Arrow: move 48px.
- Home: restore authored position.
- Focus or activation: raise the window.
- Section reset button: restore every child and return focus to the section heading.
- An aria-live status reports reset and final keyboard position without announcing every pointer
  frame.

## Responsive and reduced-motion behaviour

At widths below the canonical desktop breakpoint, on coarse primary pointers, or when a
`?motion=reduce` test override is active:

- remove absolute positioning and transforms;
- render items as a one-column evidence sequence;
- disable drag handles and remove them from the focus order;
- keep native video controls and captions;
- preserve Blender → Maya → AE / PR and item source order.

Reduced-motion desktop may retain the spatial layout if direct manipulation remains clear, but all
decorative transition duration becomes zero.

## Acceptance checks

- Exactly three outer windows and fourteen inner windows.
- 10 Blender, 2 Maya, 2 AE / PR.
- All five videos expose native controls and use browser-compatible MP4/H.264 sources.
- Pointer drag changes x/y, raises z, and cannot escape its section.
- Keyboard movement and Home reset match the documented steps.
- Section reset restores all authored positions.
- Clicking a video control does not move the figure.
- 1440×900: three large chapter windows remain legible; title bars are reachable.
- 768×1024 and 390×844: ordered non-overlapping media, no horizontal overflow.
- Chinese, English, and Japanese headings use their own line-breaking behaviour.
- Reduced motion and 400% zoom preserve every item and control.

