# Interaction and visual research

Generated 2026-07-17; revised 2026-07-18. Each section labels observation, evaluation, and implementation decision;
none of the observations grants permission to copy another work's assets or source code.

## Baseline CIBA site — pre-change observation

**Direct observation before this implementation:**

- Stack: Astro static output and GSAP with ScrollTrigger, SplitText, Flip, Draggable, and ScrollToPlugin.
- Home was a scroll-driven pinned stage: active title/summary changed with scroll, media travelled horizontally, and title letters rolled vertically.
- Three fixed home windows were draggable above 900px and closable, but lacked restore, ordered Scan mode, keyboard movement, persistent focus order, and a mobile drag alternative.
- Works was a filterable grid rather than the requested spatial desktop.
- Project copy, media, palette, and links were JSON-driven; art-direction tokens and window layout were not.
- Baseline checks passed at the time of observation. Final checks are recorded separately in delivery output.

## ZUTOMAYO reference — https://zutomayo.net/

**Direct observation at 1440 × 900:**

- Multiple absolutely positioned `.drag-and-drop` cards overlapped immediately in the first view.
- Dragging updated inline position values; the tested Sounds card moved from approximately
  `(206, 498)` to `(466, 320)`.
- Cards used `cursor: move`; later cards received high z-index values. News windows combined tiny
  title/date text, a message, binary response controls, and a close control.
- The Sounds card measured approximately 151 × 156 CSS px before its 1.5 scale and used a 26px
  purple title strip. A representative news window measured about 180 × 72 CSS px before scaling,
  with 8–10px pixel text, raster chrome and undersized close controls.
- At 390 × 844, windows stayed spatial but crowded the viewport; this was treated as evidence for
  a mobile ordered-list alternative, not a layout to reproduce.

**Evaluation:** overlap, independent objects, immediate drag feedback, and bring-to-front are useful.
Raster chrome, 10px text, 14px targets, a fixed canvas, whole-card drag, and absent keyboard fallback
are unsuitable for a professor-facing portfolio.

**Active implementation decision:** independently build semantic HTML/CSS windows with existing
GSAP Draggable. Use title-bar drag, 46px controls, keyboard movement, Esc minimize, dock restore,
filters, reset, List, mobile order, and reduced-motion behavior. Do not reuse frame images, icons,
scripts, text, or layout values.

## The Art of Cinema reference — https://www.theartofcinema.xyz/

**Direct observation at 1440 × 900 and 390 × 844:**

- Lenis smooth scrolling and scroll-linked transforms structured the experience.
- A fixed header measured about 68px; opening type used Satoshi Black around 140/119px and later
  chapter headings around 96/96px.
- Each glyph appeared twice inside a clipped line box; sampled pairs moved about one line height between states.
- Other headings used clipped per-letter vertical motion; body copy entered with restrained clipping/blur.
- The first pinned sequence occupied roughly 4,547 scroll pixels in the sampled run. A later scene
  scattered roughly 230 × 166px stills across a black field with scroll-linked offsets and rotation.
- At the sampled 390px viewport, the reference continued to expose a wide composition. CIBA does
  not inherit this behavior.

**Evaluation:** typographic scale, scroll as editing rhythm, one clipped letter transition, negative
space, and media-as-field are useful. The long loader, hidden transition content, exact font/surface,
and absent visible reduced-motion evidence are unsuitable.

**Active implementation decision:** use a CIBA-specific full-screen opening, four evidence-led
project chapters, one accessible label per heading, hidden duplicate glyphs, transform/opacity
motion only, and immediate mobile/reduced-motion document flow. Exact palette, font, timing,
geometry, copy, loader and composition are excluded.

## Local *Milk outside…* study

**Direct observation:** the user-authorized local Ren'Py install was inspected read-only. Its
`gui.rpy` included oxide red `#ac3232`, dark plum `#52263e`, muted red-black `#510000`, and a
near-black blue field. Sparse line drawings, voids, selective cyan/red posterization, coarse masks,
and character-level fade/slide/shake/rotation/displacement/pulse were observed.

**Design inference:** the reusable abstraction is a stable reading plane against selective
subjective instability, not constant glitch.

**Active implementation decision:** ship the artist-requested black / warm-paper / acid interface
and independent motion. No game color, image, font, character, dialogue, audio, code, or mask is reused.

## Delivered behavior contract

**Active implementation decision:**

- Global shell: exactly three canonical interface values—near-black, warm paper, and acid green—organized by an asymmetric Internationalist grid.
- Home: a true opening screen, concise editorial preface, four cinematic evidence chapters, artist
  position and complete ordered index. Desktop pins only the chapter stage; mobile and reduced
  motion retain ordinary document flow.
- Works desktop (≥900px): four 354–390px authored draggable project windows in a 760px stage, with all
  first-row windows visible immediately, bring-to-front, minimize/restore, filters, reset, and
  ordered List.
- Works below 900px: ordered semantic window cards; precision drag is removed.
- Keyboard: focusable title-bar control; Arrow moves, Shift + Arrow moves farther, Home resets transform, Escape minimizes, and dock buttons restore/focus.
- Motion: entrance 360–520ms; state changes 180–280ms; transform/opacity first; reduced motion disables scatter entrances and scroll scrubbing.
- Japanese: language-specific sans fallbacks, weight, line-height, and line-breaking; no acid overlay behind the title or intro copy.
- Accessibility: 46px primary window controls, visible focus, meaningful alt text, hidden duplicate
  glyphs, a skip link, non-color state cues, and polite filter/minimize announcements.
