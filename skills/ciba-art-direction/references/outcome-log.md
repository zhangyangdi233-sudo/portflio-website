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
- Works desktop rendered the four then-public windows approximately 410–464px wide. Pointer drag
  and keyboard movement changed the X.WHEEL window transform; Escape/minimize and restore remain
  explicit. University Coursework later became the fifth public window.
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

## 2026-07-29 — X.WHEEL expanded evidence set

- The X.WHEEL record now contains eleven media items. Its four established repository previews
  remain first and continue to supply the Home representatives; seven artist-supplied images are
  appended only to the project detail.
- The seven added PNG files remain exact-byte copies totalling 2,447,704 bytes. A dedicated
  manifest records their explicitly assigned source names, deployable names, hashes, and intrinsic
  dimensions.
- Chinese, English, and Japanese each use separate factual alternative text and adjacent captions
  for the character, letterform, signal-graphic, and CRT-interface evidence. No story, assignment,
  production role, or intent was inferred from the images.
- At 1440×900, all eleven media figures had distinct non-intersecting rectangles and the document
  had no horizontal overflow. All eleven source images loaded at their recorded intrinsic
  dimensions, and keyboard focus changed the selected image from `grayscale(1)` to `grayscale(0)`.
- The standard project-title maximum was reduced from `9vw / 9rem` to `8vw / 8rem`. X.WHEEL
  retained approximately 10px of horizontal clearance from the hero image instead of extending
  into it.
- At 390×844 and 320px, the gallery recomposed to one column, all eleven captions remained
  visible, the title stayed within its column, and neither viewport produced horizontal overflow.
- Verification passed 36 tests, Astro diagnostics, the 25-route static build, built/design drift
  contracts, exact-file provenance checks, and a zero-error browser console.
- These outcomes do not promote any pending taste observation; the change records supplied
  project evidence and a measured collision fix only.

## 2026-07-29 — X.WHEEL Home representative revision

- Direct artist feedback superseded the earlier repository-preview selection on Home. X.WHEEL now
  uses, in order, `character-full.png`, `character-portrait.png`, `character-sequence.png`, and
  `cartridge-3-title.png` as its four cinematic representatives.
- The original EMI room, CRT television, console, and poster remain in the eleven-item project
  record but no longer render in the Home X.WHEEL layer.
- The selection is authored through content-level `homeOrder` values. Other projects retain their
  first-four fallback, so Home presentation can change without reordering archival project media.
- At 1440×900 all four representatives used absolute draggable positions, rested at opacity `0.1`
  with `grayscale(1)`, and the focused first image settled at opacity `0.88` with `grayscale(0)`;
  ArrowRight moved it by 16px.
- At 390×844 and 320×780 the same four sources reflowed to relative source order with zero
  horizontal overflow. The 320px X.WHEEL heading measured 288px wide with a 288px scroll width.
- Figma handoff facts now preserve the same ordered four-source identity, and the design-drift
  contract derives that list from canonical project content.
- Verification passed 37 tests, Astro diagnostics, design drift, the 25-route static build,
  built-site source assertions, desktop/mobile browser checks, and a zero-warning/error console.
- `TASTE-20260729T064615091716Z-1ed4f14a` records the exact feedback but remains pending; this
  implementation does not infer or promote a broader permanent preference.

## 2026-07-29 — Evidence refresh, evaluation gate, and simple-pointer recovery

- The professor-facing evidence architecture was rechecked against 35 linked sources, including
  current RCA guidance, four official artist sites, W3C drag guidance, and three primary
  open-source repositories. Facts, observations, design inferences, and unknown applicant facts
  remain separate.
- A seven-gate delivery rubric now covers professor scan, project evidence, interaction recovery,
  visual discipline, multilingual composition, originality/rights, and operational parity. Figma
  Team Project import is the only partial gate and is recorded as an external P2 rather than
  represented as complete.
- Home images, Works title bars, and Coursework title bars now use the existing surface as a
  simple-pointer control: one click cycles through bounded preset offsets while drag and arrow-key
  movement remain available. No new decorative control was added.
- Browser verification measured each click from `0,0` to `48,48`. A Home drag then moved the same
  image to `168,98` without a duplicate click-snap; reduced motion exposed all five Home layers.
  All five Coursework videos remained at `readyState=4` with no media error, and the browser log
  contained no warning or error.
- Both CIBA Skills pass the Skill Creator package validator. Isolated learning tests verify that
  captured art-direction and typography feedback can be promoted exactly once only after an
  explicit confirmation record.
- Verification passed 42 tests, Astro diagnostics, design drift, the 25-route static build,
  built-site contracts, both Skill validators, and browser interaction checks.
- No result in this audit was promoted into a taste ledger. The two independent reviewers later
  returned `FAIL` and `INCOMPLETE`; their concrete findings are handled in the next outcome record.

## 2026-07-29 — Independent review corrections

- An independent Critic and Evaluator separately inspected the clean pushed baseline and rejected
  complete-delivery status. Their task IDs, findings, and fix dispositions are preserved in
  `docs/research/INDEPENDENT_REVIEW_2026-07-29.md`.
- Works now measures and clamps every visible project window after initial layout, visibility
  changes, image/size changes, reset, restore, and viewport changes. Pure regression cases cover
  the measured 91px lower overflow and 17px right overflow.
- Mobile Home evidence now retains the canonical `0.1` opacity rather than overriding it to `0.3`.
- Query-parameter reduced motion now removes transitions, and the ≤360px header uses two rows so
  44px navigation targets remain inside the viewport.
- The active CIBA stylesheet is checked for exactly the canonical three literal interface colours
  and for loading after legacy/global styles. This mitigates drift without a risky unrelated
  rewrite of the historical stylesheet.
- A repository-local `npm run check:browser` audit now covers the high-risk geometry, opacity,
  typography, multilingual viewport, recovery, video-playback, and console contracts without an
  npm browser dependency. The current Codex sandbox denied local Chrome startup, so this outcome
  records the audit's presence and syntax only, not a successful run in this environment.
- Direct contact and Figma Team Project import remain external facts/actions. They are not
  represented as complete.
- Both independent reviewers were asked to recheck the fixes, but their new turns ended in
  task-level `systemError` without a response. No post-fix independent verdict is inferred.
- These are implementation and evaluation outcomes only. They do not promote or alter a taste
  observation.

## 2026-08-01 — Real-browser closure and editable Team Project handoff

- The repository browser audit ran in real Chrome and passed all seven evidence groups with zero
  console warnings or errors. It covers Home focus/movement, Works geometry and recovery,
  reduced-motion/mobile fallbacks, multilingual Wake typography, coursework grouping, and actual
  playback advancement for all five MP4 files.
- The first focus probe sampled a 260ms authored transition after only 30ms and therefore measured
  an intermediate opacity. The check now waits 320ms and evaluates the settled visual state; the
  production interaction did not require a design change.
- Six unique editable website route frames were copied from the reversible Draft into the existing
  Team Project file `KWJfKNS3PKBhRGCad4V3Ey`. The rejected wide Home duplicate remains only in the
  Draft backup. The delivery file was renamed, organized into `00 Website Screens` and
  `01 Foundations`, and given local CIBA color variables without flattening the website.
- The public contact `mayonezu332@gmail.com` is now one canonical fact across the live site,
  portable handoff tokens, editable plugin, and design-drift checks.
- After the final CJK tracking and visible-reflow corrections, a fresh read-only Critic returned
  `VERDICT: PASS` and a separate delivery Evaluator returned `COMPLETE`. Their task IDs and the
  closed findings are recorded in `docs/research/INDEPENDENT_REVIEW_2026-08-01.md`.
- No taste observation is promoted by these delivery results.

## 2026-10-02 — Home action and project-metadata refinement

- The Home introduction action and each cinematic project-record action now resolve to the
  canonical acid-green field on hover and keyboard focus, with near-black text and arrow.
- Real Chrome measured both hover states at `rgb(198, 255, 0)` over
  `rgb(9, 10, 8)`; the browser console reported zero warnings or errors.
- Home presentation omits the requested completed/archive labels for EMIDA, Wake Up, and Escape
  Project while retaining the useful development/practice labels for APHASIA and Coursework.
- The Figma plugin snapshot now mirrors the revised APHASIA and EMIDA English concepts, and the
  design-drift contract passes against canonical project content.
- Verification passed 48 tests, Astro diagnostics, design drift, the 25-route static build,
  built-site contracts, and eight real-browser evidence groups.
- Two Coursework MP4 files that exceeded EdgeOne's 25 MiB deployment ceiling were converted to
  1280×720 H.264 High/AAC fast-start files at 21,583,131 and 21,493,379 bytes. Full decoding,
  representative-frame review, and real-browser playback of all five Coursework videos passed.
- The production build now rejects any `public` or `dist` file at or above 25 MiB. A temporary
  25.00 MiB probe reproduced the expected failure, and the clean build then passed after cleanup.
- `TASTE-20261001T161241136282Z-93fe0627` remains a pending observation; these measured outcomes
  do not promote it into a permanent taste rule.

## 2026-10-02 — Shared Home safe grid and measured spacing

- Home now uses one responsive content boundary: 16px below 640px, 24px from 640px, and 32px
  from 1024px. The same token aligns the header, hero, primary action, introduction, cinematic
  metadata, project action, counter, instruction, index, and footer.
- At the reported 1100×712 viewport, real Chrome measured the Chinese, English, and Japanese
  primary actions at `x=32–1068`, exactly 1036px wide. The artist line precedes the action in both
  source and visual order, with a measured 16px gap.
- The introduction band measured 192px high in all three languages. Each title center was 0.5px
  above the band's geometric center, inside the 2px tolerance and without a manual positional
  offset.
- The cinematic instruction measured `x=668–1068` and therefore terminates on the same right safe
  line as the action and supporting paragraph. All three Home routes had zero horizontal overflow.
- The production browser audit passed nine evidence groups, including the new multilingual safe
  grid, existing hover/focus behavior, 320/390px reflow, Works recovery, five-video playback, and
  zero browser console warnings or errors.
- `TASTE-20261001T165157874586Z-3c49e6eb` remains a pending observation. These measured outcomes do
  not promote it into the permanent taste ledger.
