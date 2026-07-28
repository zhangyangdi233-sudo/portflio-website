# CIBA Outcome Log

Record verified implementation outcomes here: accessibility checks, professor review findings,
performance results, or observed usability failures. Outcomes can change implementation guidance,
but they never become personal taste automatically. A taste change still requires explicit user
feedback captured through the taste inbox and confirmed before promotion.

## 2026-07-17 — Signal Index revision verification

- Japanese Works at 1440×900: the title used the Japanese sans stack, stayed on one line, and did
  not intersect the acid rule or intro copy.
- Works Scatter: seven windows measured approximately 252–305px wide and 352–382px high after
  caption/tag compaction; every window stayed within the 980px stage.
- Works at 390×844: no horizontal overflow; the Japanese title fit within 358px; drag controls
  were removed and windows followed semantic document order.
- Keyboard regression: Arrow moved 16px, Home restored the authored transform, Escape minimized,
  and the dock restored/focused the title-bar control.
- Wake Up regression: only seven retained sections and 23 retained media descriptions rendered;
  the requested grid/corridor/sunset/hand/statement/bio/logo sections rendered zero elements.
- Automated checks: design drift, 16 unit/guardrail tests, Astro diagnostics, and a 31-route static
  build passed.

## 2026-07-18 — Black-header / cinematic-stage / large-window verification

- Japanese desktop header computed to black `rgb(9, 10, 8)` with warm-paper
  `rgb(244, 240, 221)` text; it remained 64px high with 44px language targets.
- Home desktop exposed exactly one active work layer. Scrolling changed the active title from
  X.WHEEL to EMIDA; the duplicate glyphs settled without static overlap after the 720ms roll.
- Home evidence images computed to `opacity: 0.1` and `grayscale(1)` at rest. Keyboard movement
  changed x by 16px; pointer drag changed x by 110px and y by 55px; focus restored source colour.
- Works desktop rendered four windows approximately 410–464px wide. Pointer drag and keyboard
  movement changed the X.WHEEL window transform; Escape/minimize and restore remain explicit.
- Works at 390×844 had no horizontal overflow, used a one-column ordered layout, and every drag
  handle was disabled, `tabIndex=-1`, and `aria-hidden=true`. The header remained pure black and
  compacted to 62px.
- `?motion=reduce` forced the two-column ordered desktop layout and removed all drag handles from
  the focus order.
- Wake Up rendered exactly two public images: `bed-alarm.png` and `flooded-title.jpg`.
- Post-review deployment audit: `public/` and `dist/assets/` each contain exactly ten
  allowlisted files. Wake Up contributes only its two approved images; unpublished placeholder
  SVGs, the placeholder CV, and roughly 45MB of legacy Wake Up media now live under the
  non-deployable `source-archive/`. The production build fell from about 55MB to 3.7MB.
- Chinese, English, and Japanese builds now render localized media alternative text, captions,
  tags, role/scale/credits evidence notes, and project-detail labels. Unknown role and collaborator
  facts are visibly marked as awaiting artist verification rather than invented.
- Figma drift checks now cover the Home project stage, Works filters/layouts/visible count,
  62px mobile header, 3px focus outline, and the absence of stale PNGs in live handoff folders.
- Browser checks are implementation outcomes only; they do not promote pending colour or header
  feedback into the taste ledger.

## 2026-07-28 — Nested coursework desktops and editorial distillation

- The public project count increased from four to five through one verified University Coursework
  record; no placeholder project was made public.
- The coursework detail page renders three large bordered desktops containing 10 Blender, 2 Maya,
  and 2 After Effects / Premiere Pro evidence windows. Desktop title bars support bounded pointer
  dragging, 16/48px keyboard movement, stacking, Home reset, and section reset.
- On a fresh 1440×900 load and after section reset, all fourteen small windows remain fully inside
  their parent stages; lower-edge authored positions are minimally clamped instead of clipped.
- Native video bodies remain independent from drag initiation. All five supplied H.264 MP4 files
  loaded with metadata and reported `readyState=4` without browser errors.
- At 390×844 and in reduced motion, the interface changes to source-order evidence cards, hides
  reset controls, and removes all movement buttons/instructions from the accessibility tree.
- The nine supplied images remain exact canonical copies while 18 WebP derivatives supply
  responsive 480px/960px presentation. Desktop and mobile selected the intended derivative sizes.
- Section copy now states only visible practice scope and method. It does not invent course names,
  briefs, collaborators, production roles, grades, or dates. The unknown coursework date is
  omitted from visible website and Figma records.
- The publication manifest distinguishes the 14 explicitly attached and assigned files from 13
  unrelated or unassigned files found in the same source folder. Only the explicit allowlist ships.
- Figma parity is checked at item level across code, caption, media kind, source path, geometry,
  and z-order, rather than by counts alone.
- The ZUTOMAYO reference informed bounded overlapping-window behavior only. CIBA retains its own
  black, warm-paper, and acid-green system, type, captions, controls, and mobile model.
- Home display typography now uses semantic word groups, restrained Latin tracking, zero CJK
  tracking, and independent glyph-row clipping. `ESCAPE / PROJECT` is an authored two-line title.
- Verification passed 33 tests, Astro diagnostics, a 25-route static build, built/design drift
  contracts, browser reflow checks, and zero console errors.
- These outcomes do not promote `TASTE-20260728-EDITORIAL-TYPE-DISTILLATION` or
  `TASTE-20260728-NESTED-DESKTOP-WINDOWS`; both remain pending explicit artist confirmation.
