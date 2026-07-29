# Interaction and visual research

Generated 2026-07-17. Each section labels observation, evaluation, and implementation decision;
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

- Multiple absolutely positioned `.drag-and-drop` cards sat inside a fixed 1280 × 720 canvas.
- Dragging updated inline inset coordinates; one tested card moved from about `(678, 267)` to `(788, 340)`.
- Cards used `cursor: move`; later cards received high z-index values. News windows combined tiny title/date text, a message, binary response controls, and a close control.
- A representative news window measured about 180 × 72 CSS px before a 1.5 scale, used raster frame art, 10px pixel text, and a 20px content inset.

**Evaluation:** overlap, independent objects, immediate drag feedback, and bring-to-front are useful.
Raster chrome, 10px text, 14px targets, a fixed canvas, whole-card drag, and absent keyboard fallback
are unsuitable for a professor-facing portfolio.

**Active implementation decision:** independently build semantic HTML/CSS windows with native
pointer events. Use title-bar drag, 44px controls, keyboard movement, Esc minimize, dock restore,
filters, reset, Order mode, mobile order, and reduced-motion behavior. Do not reuse frame images,
icons, scripts, text, or layout values.

## The Art of Cinema reference — https://www.theartofcinema.xyz/

**Direct observation at 1440 × 900 and 390 × 844:**

- Lenis smooth scrolling and scroll-linked transforms structured the experience.
- Hero type used Satoshi Black around 140/119px on desktop and 60/51px on mobile; mobile reflowed the title into four lines.
- Each glyph appeared twice inside a clipped line box; sampled pairs moved about one line height between states.
- Other headings used clipped per-letter vertical motion; body copy entered with restrained clipping/blur.
- A later scene scattered roughly 230 × 166px stills across a black field with scroll-linked offsets and rotation.

**Evaluation:** typographic scale, scroll as editing rhythm, one clipped letter transition, negative
space, and media-as-field are useful. The long loader, hidden transition content, exact font/surface,
and absent visible reduced-motion evidence are unsuitable.

**Active implementation decision:** retain one accessible label per heading, hide duplicate glyphs,
animate transform/opacity only, and keep immediate mobile/reduced-motion content. Exact palette,
font, geometry, copy, loader, and composition are excluded.

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
- Home: one active rolling project title with enlarged 10%-opacity grayscale evidence images; images reveal source colour on hover/focus and are draggable on a desktop fine pointer.
- Works desktop (≥900px): five large 410–460px authored draggable project windows in a 760px stage, bring-to-front, minimize/restore, filters, reset, and ordered fallback.
- Works below 900px: ordered semantic window cards; precision drag is removed.
- Keyboard: focusable title-bar control; Arrow moves, Shift + Arrow moves farther, Home resets transform, Escape minimizes, and dock buttons restore/focus.
- Motion: state changes use transform/opacity first; reduced motion disables title rolls and forces a linear Home plus ordered Works layout.
- Japanese: language-specific sans fallbacks, weight, line-height, and line-breaking; no acid overlay behind the title or intro copy.
- Accessibility: 44px controls, visible focus, meaningful alt text, hidden duplicate glyphs, a skip link, non-color state cues, and polite filter/minimize announcements.
