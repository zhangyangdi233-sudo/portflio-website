# Typography outcome log

Record measured visual, accessibility, and usability outcomes here. Outcomes may change
implementation guidance, but they do not become personal taste without explicit user confirmation.

## 2026-07-28 — Semantic display titles and University Coursework

- `ESCAPE / PROJECT` now uses two authored semantic lines. At 1440×900 the two rows measured
  without intersection or horizontal overflow.
- Latin monumental titles use no more than `-0.03em` tracking. Chinese and Japanese display roles
  compute to normal/zero tracking with locale-specific font stacks and strict Japanese line
  breaking.
- Each animated glyph row clips its duplicate glyphs independently. The Japanese home title no
  longer exposes the off-row copy during the rolling transition.
- Redundant home archive/year text was removed. Five public works remain discoverable through the
  cinematic sequence, Works workspace, and direct detail routes.
- After the Japanese hero-copy review, the visible opening paragraph was removed. The hero now
  keeps one media line (`Games / Web / Moving image`, localized) and one short View Works action;
  it had no horizontal overflow at 1440×900 or 390×844.
- University Coursework now has three factual chapter descriptions, 14 evidence captions, and
  separate localized alternative text. No course title, assignment brief, collaborator, role, or
  date was inferred beyond supplied facts.
- At 1440×900 the coursework page uses three bounded spatial desktops. At 390×844 and in reduced
  motion it becomes source-order reading; all 14 movement controls and instructions are removed
  from the accessibility tree.
- A fresh 1440×900 load and section reset kept all 14 windows fully inside their own stage. The
  four authored lower-edge positions are translated upward only as much as needed to remain
  visible.
- Nine coursework images select 960px WebP derivatives on desktop and 480px derivatives on mobile;
  source originals remain canonical. Five H.264 MP4 players reported `readyState=4` with no media
  error.
- The source audit publishes only the 14 filenames explicitly attached and section-assigned by the
  artist; 13 other unassigned files in the same folder are recorded and excluded. The coursework
  date remains unknown and is omitted from visible metadata.
- The Figma snapshot now matches all 14 canonical item identities, captions, media types, source
  paths, positions, widths, and z-orders; the design check fails on any item-level drift.
- Verification passed 33 unit/guardrail tests, Astro diagnostics, the 25-route static build,
  built-site/design drift contracts, keyboard movement/reset, 320–390px reflow, and a zero-error
  browser console.
- These are implementation outcomes only. The pending typography feedback remains unpromoted until
  the artist explicitly confirms its proposed interpretation.

## 2026-07-29 — X.WHEEL media captions and title boundary

- Seven supplied X.WHEEL images now have distinct Chinese, English, and Japanese alternative text
  and captions. Alternative text describes the visible frame; captions identify the evidence type
  without inventing narrative intent, dates, briefs, roles, or outcomes.
- The X.WHEEL summary now names the visible evidence groups—space, object, character, letterform,
  and interface—rather than describing only the original four repository previews.
- At 1440×900, reducing the standard project-title maximum to `8vw / 8rem` left approximately
  10px between the visual edge of `X.WHEEL` and the hero image. At 390px and 320px the title had
  no overflow.
- All eleven captions remained visible in the mobile one-column reading order, with no horizontal
  overflow at either tested mobile width.
- These are measured implementation outcomes and do not create a new permanent typography
  preference.

## 2026-07-29 — Confirmed-only typography learning

- Typography feedback now follows a deterministic
  `observation-inbox.md` → `promote_typography_observation.py` →
  `typography-ledger.md` path.
- The promotion command rejects unknown inbox IDs and duplicate promotions, records the exact
  confirmation, and keeps technical/accessibility outcomes separate from personal preference.
- An isolated test captured one synthetic observation, promoted it once, verified the ledger, and
  rejected a duplicate. The production typography ledger remains empty because no pending
  interpretation has been explicitly confirmed by the artist.
- The complete 42-test suite and the Skill Creator validator passed. This measured result changes
  workflow confidence only; it does not infer taste.

## 2026-07-29 — Wake Up and control-tracking correction

- Independent review measured the English Wake Up title at `-0.075em`, outside the restrained
  display contract, and found no semantic word grouping.
- The heading now emits separate `WAKE` and `UP` spans, uses `-0.03em` Latin tracking, and keeps
  Chinese/Japanese tracking at zero with locale-specific line breaking.
- The Coursework move indicator no longer compresses an essential control glyph with `-0.12em`
  tracking.
- The typography guardrail rejects either extreme value and checks both semantic title structure
  and independent CJK spacing.
- This correction is an accessibility and implementation outcome. It does not create or promote a
  permanent typography preference.

## 2026-08-01 — Transition-aware and case-independent browser verification

- The real-browser typography audit passed Chinese, English, and Japanese Wake Up routes at 320px
  and 390px with no horizontal overflow.
- The Wake title test now verifies the two semantic words independently from CSS
  `text-transform`, so accessible source structure is not confused with rendered capitalization.
- Focus-state checks wait for the authored transition to settle before measuring opacity and
  grayscale. This is a verification correction, not a new visual preference.
- No typography observation is promoted by these outcomes.

## 2026-10-02 — Multilingual Home concepts and compact metadata

- Chinese, English, and Japanese Home introductions now identify the two games, two 2023 web
  works, Blender/Maya/After Effects/Premiere Pro coursework, and the intention to continue
  experimenting beyond games.
- APHASIA and EMIDA use separately composed, equivalent concept summaries in all three languages;
  Chinese and Japanese punctuation follows each locale rather than reusing English typography.
- Home completed/archive labels were removed from EMIDA, Wake Up, and Escape Project in the
  cinematic metadata and compact index; APHASIA and Coursework retain their distinct status.
- At 320px, every Chinese, English, and Japanese Home medium measured at three lines or fewer;
  University Coursework measured at two lines in all three locales, with zero horizontal overflow.
- Verification passed 48 tests, Astro diagnostics, design drift, the 25-route static build,
  built-site contracts, and eight real-browser evidence groups.
- `TYPE-20261001T161241136283Z-9db944cd` remains pending and was not promoted without explicit
  artist confirmation.
