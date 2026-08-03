---
target: University Coursework desktop and distilled portfolio home
total_score: 32
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 0
timestamp: 2026-07-28T13-48-59Z
slug: src-components-courseworkdesktop-astro
---
Method: dual-agent (A: 019fa8c5-636f-7083-9308-e049ec70c937 · B: 019fa8b9-dd52-7a71-8069-895d951e7c66)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Active stacking, focus, drag feedback, current-work index, video controls, and reset announcements make state visible. |
| 2 | Match System / Real World | 4 | The desktop-window metaphor, factual study labels, and source-order fallback match the portfolio evidence model. |
| 3 | User Control and Freedom | 4 | Windows can be moved, raised, reset individually with Home, or reset per section without blocking media controls. |
| 4 | Consistency and Standards | 4 | Three-color tokens, square chrome, title-bar handles, semantic captions, and multilingual hierarchy are consistent across all sections. |
| 5 | Error Prevention | 4 | Bounds clamping, static coarse-pointer fallback, exact media allowlisting, and unknown-date omission prevent the main failure modes. |
| 6 | Recognition Rather Than Recall | 4 | Visible section index, item codes, media-kind labels, native controls, and localized instructions keep actions and context present. |
| 7 | Flexibility and Efficiency | n/a | Experience-mode portfolio; keyboard accelerators exist, but productivity customization is not a relevant success criterion. |
| 8 | Aesthetic and Minimalist Design | 4 | Black, warm paper, and one acid signal form a restrained Internationalist system in which project evidence remains dominant. |
| 9 | Error Recovery | 4 | Home and section reset recover spatial state, while ordered fallback and direct project routes preserve access. |
| 10 | Help and Documentation | n/a | Experience-mode portfolio; concise inline interaction guidance is sufficient and a help system would add noise. |
| **Total** | | **32/32** | **Excellent** |

## Design Specificity Verdict

**LLM assessment:** The result is authored for CIBA rather than category-interchangeable. Its
specificity comes from the evidence-desktop composition, semantic project title breaks, three-color
Internationalist restraint, cinematic home sequence, and professor-facing factual record structure.
The University Coursework page does not borrow ZUTOMAYO's skin, art, typography, controls, or
proportions; it independently reimplements only the bounded overlapping-window mechanism.

**Deterministic scan:** The isolated detector pass returned clean with no actionable findings.
The parent verification additionally passed 33 unit and guardrail tests, Astro with zero
diagnostics, the 25-route built-site contract, exact deployment allowlisting, and item-level Figma
design drift checks. The latter compares all fourteen codes, English captions, media types, source
paths, x/y/width positions, and z-orders with the canonical project JSON.

**Visual evidence:** Fresh 1440×900 browser inspection found three parent stages and fourteen
contained inner windows. The same 14/14 containment held after section reset. At 390×844 the page
used the ordered static model, had no horizontal overflow, and removed all fourteen drag handles
from the focus and accessibility trees. Five native MP4 players reached readyState 4 with no media
error. No reliable user-visible detector overlay was needed because the CLI detector was clean;
browser screenshots and DOM measurements supplied the visual fallback signal.

## Overall Impression

The site now feels like an edited artist archive rather than a themed portfolio template. The
black field, warm-paper type, and acid-green signal establish authority without competing with the
work. The biggest long-term opportunity is editorial: replace provisional captions or metadata
only when the artist supplies more precise process facts, not by adding decorative explanation.

## What's Working

- The home hero is properly distilled. Removing the self-description leaves one media line and one
  route into the work, allowing the CIBA wordmark and project sequence to carry the first
  impression.
- Coursework evidence is simultaneously spatial and readable. Desktop visitors can manipulate
  overlapping windows, while mobile, coarse-pointer, and reduced-motion visitors receive the same
  fourteen records in source order.
- The system is unusually well protected against factual and design drift. Exact-byte source
  copies, a 14-file publication allowlist, a 13-file exclusion ledger, an unknown-date policy, and
  item-level Figma checks make the handoff defensible to a professor.

## Priority Issues

There are no P0, P1, or P2 release issues.

### [P3] Make drag affordance learnable through use

- **Why it matters:** A first-time visitor may not immediately infer that only the title bar moves
  a media window, even though the inline instruction and cursor communicate it.
- **Fix:** If real user observation shows hesitation, add one single-run micro-nudge on the first
  title bar and remove it after first movement; do not add persistent explanatory copy.
- **Suggested command:** `$impeccable delight`

### [P3] Add intentional video poster frames when final edits are selected

- **Why it matters:** Native first frames are truthful and playable, but a deliberately selected
  poster could improve visual pacing on slower networks.
- **Fix:** Export one verified still from each final cut, record it in the media manifest, and use
  it as the native `poster` without autoplay.
- **Suggested command:** `$impeccable optimize`

### [P3] Confirm the pending typography interpretation

- **Why it matters:** The current semantic breaks and reduced copy work well, but the reusable skill
  correctly keeps them as a pending interpretation rather than silently treating one revision as
  permanent personal taste.
- **Fix:** After the artist confirms the direction, promote the observation through the skill's
  explicit keep/avoid workflow; otherwise retain it as project-local evidence.
- **Suggested command:** `$impeccable document`

## Persona Red Flags

**Professor reviewer:** No release red flag. The five public records, factual summaries, three
coursework chapters, stable direct routes, and explicit media evidence support a quick first pass
and a deeper process review. Unknown course dates, roles, and briefs are not invented.

**Sam (accessibility-dependent visitor):** No release red flag. Keyboard title-bar movement,
visible 3px focus, polite position announcements, native video controls, meaningful localized alt
text, and static semantic fallback preserve the primary reading path. The optional spatial layout
never becomes the only way to access evidence.

**Casey (distracted mobile visitor):** No release red flag. At 390px the interface becomes a
single-column source sequence with no precision-drag requirement or horizontal overflow. The main
remaining cost is media weight, mitigated by 480px WebP derivatives and metadata-only video preload.

## Cognitive Load

The surface has low cognitive load: all eight checklist items pass. The three software chapters
chunk the fourteen records; each window exposes one item and one caption; the section index keeps
location visible; mobile reveals records sequentially; and the interface never asks the visitor to
choose among more than four simultaneous actions.

## Emotional Journey

The opening is now quiet and assured, the project sequence creates a controlled rise in visual
intensity, and the coursework desktops provide the interaction peak. The final source-order and
next-project routes leave the visitor with evidence rather than interface spectacle. There is no
high-stakes action requiring extra reassurance.

## Minor Observations

- The lower authored windows are minimally translated upward on desktop to guarantee containment;
  this is preferable to clipping, but their exact offsets naturally vary with rendered media height.
- Course captions remain intentionally plain. Adding project intentions without supplied evidence
  would weaken the professor-facing honesty of the page.
- The global custom typography skill is symlinked to the repository version, so future confirmed
  observations remain version-controlled instead of forking silently.

## Questions to Consider

- After a professor reviews the page, which evidence item do they ask about first, and should that
  item rise in source order?
- Do the native first frames represent the two long AE / PR exercises well enough, or should the
  artist choose verified poster frames?
- Should the current “less is more” hero treatment become a confirmed long-term CIBA rule, or
  remain specific to this portfolio revision?
