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
