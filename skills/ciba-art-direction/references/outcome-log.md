# CIBA Outcome Log

Record verified implementation outcomes here: accessibility checks, professor review findings,
performance results, or observed usability failures. Outcomes can change implementation guidance,
but they never become personal taste automatically. A taste change still requires explicit user
feedback captured through the taste inbox and confirmed before promotion.

## 2026-07-17 — Signal Index revision verification (superseded baseline)

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

This section records the earlier seven-record prototype and is retained only as change history. It
does not describe the current public site.

## 2026-07-18 — Four verified works / cinematic-spatial revision

- Public evidence gate: X.WHEEL, EMIDA, Wake Up and Escape Project are the only published records;
  four agent-authored drafts remain editable with `published: false` and generate no public routes.
- Works at 1440×1000: four 354–390px authored windows were visible in the bounded 760px stage; the
  browser test confirmed keyboard movement, title-bar pointer drag, minimize, dock restore and List.
- Works at 390×844 in Japanese: document width equalled viewport width, all four cards remained in
  semantic order, all three filter controls stayed within 377px, and the language switch stayed
  visible in the 96px two-row header.
- Home at 1440×1000 and 390×844: the persistent header and three canonical interface colors remained
  visible without horizontal overflow; mobile/reduced-motion used the static evidence sequence.
- Wake Up at 390×844 in Japanese: global navigation and language switching remained available; the
  public project sequence rendered only the bed/alarm and flooded-title panels while removed source
  assets stayed preserved for rollback.
- Automated checks before independent review: design drift passed; Astro checked 36 files with zero
  diagnostics; 26 tests passed; the static build produced 22 routes and only four project slugs per
  language.
