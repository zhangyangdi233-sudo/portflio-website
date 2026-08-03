# CIBA delivery audit — 2026-07-29

> Historical snapshot. Superseded by `DELIVERY_AUDIT_2026-08-01.md` after the artist supplied a
> public contact, live browser regression passed, and editable Figma captures were created.

Scope: rendered Chinese, English, and Japanese portfolio; canonical project content; Home,
Works, University Coursework, X.WHEEL media; Figma handoff; custom art-direction and editorial
typography Skills.

This audit uses `skills/ciba-art-direction/references/evaluation-rubric.md`. Two isolated,
read-only reviewers independently inspected commit `04ed117`: Critic task
`019fad11-9aab-7061-9e92-8668ecaefae3` returned `FAIL`; Evaluator task
`019fad12-15af-7103-860c-bcf2127b0cc4` returned `INCOMPLETE`. Their findings and dispositions are
recorded in `INDEPENDENT_REVIEW_2026-07-29.md`.

## Current verdict

`INCOMPLETE` for the complete external delivery. The website implementation fixes are in place.
Both reviewers were sent a post-fix read-only recheck, but their tasks entered `systemError`
without an answer; no post-fix independent verdict is claimed. Two completion facts cannot be
manufactured in code:

1. the professor-facing contact route still needs an artist-confirmed email or direct contact URL;
2. the editable Figma screens still need to be imported into Team Project `622631172`.

## Gate matrix

| Gate | Current result | Evidence |
| --- | --- | --- |
| 1. Professor scan | Partial | Five public records, Profile, Works, Contact routing, and factual project evidence are present. The Contact route currently falls back to Profile and does not expose a confirmed direct address. |
| 2. Project evidence | Pass | X.WHEEL contains 11 verified media items; Coursework contains 14 assigned items in 10/2/2 sections and five MP4s; Wake Up exposes only its two approved images. Unknown facts remain explicit. |
| 3. Interaction recovery | Pass pending recheck | Home, Works, and Coursework retain click, drag, keyboard, Home reset, and ordered fallbacks. Works now clamps all visible windows after first layout, visibility changes, image/size changes, reset, and viewport changes. |
| 4. Visual discipline | Pass pending recheck | Active CIBA CSS contains only `#090a08`, `#f4f0dd`, and `#c6ff00`; mobile Home evidence is now 10% grayscale opacity. A design-drift check enforces the active three-colour boundary and stylesheet order. |
| 5. Multilingual composition | Pass pending recheck | `ESCAPE / PROJECT` remains authored as two words/lines. Wake Up now exposes semantic `WAKE` / `UP` spans, uses `-0.03em` Latin tracking and zero CJK tracking. The 320px header uses a two-row layout to preserve 44px targets without overflow. |
| 6. Originality and rights | Partial | Reference mechanisms and exact public-file allowlists/hashes are documented. Final publication rights remain an artist-owned external confirmation, not a technical inference. |
| 7. Operational parity | Partial | Canonical content, site, Figma facts, local editable plugin, and design-drift checks agree. The target Team Project import is still not complete. |

## Open completion requirements

### Direct contact fact

- Required input: one artist-confirmed email address or direct contact URL.
- Current safe fallback: `/[lang]/about/#contact` plus existing public archive/GitHub links.
- The implementation intentionally does not infer an email from Git metadata or invent one.

### Figma Team Project import

- Local editable handoff: `figma-export/`
- Editable Draft file: `xyINqLy60s9MELHd2HmViK`
- Target project: `622631172`
- Required input: explicit approval to install/open Figma Desktop and accept its terms, phrased
  `允许安装 Figma Desktop`, or the artist can run the committed local plugin manually.
- The repository does not describe Drafts or the local plugin as a completed Team Project import.

## Verification status

- Automated source/content suite, Astro diagnostics, design drift, production build, and built-site
  contract are rerun after each fix.
- `npm run check:browser` is now a dependency-free headless-Chrome audit covering Home opacity and
  scroll state, Works initial geometry/recovery, Wake Up tracking, 320/390px three-language
  overflow, reduced motion, Coursework 10/2/2 grouping, all five MP4s, and console errors.
- The current Codex sandbox prevents launching local Chrome (`SIGABRT`) and its browser policy
  blocks `127.0.0.1:4323`, so this session does not claim that new command passed here. Initial
  reviewers did collect direct browser evidence before that policy block; post-fix review must
  distinguish source/test evidence from a fresh executable browser run.
- The attempted post-fix Critic and Evaluator turns both ended in task-level `systemError` before
  returning an answer. Initial verdicts therefore remain the latest independent verdicts.
