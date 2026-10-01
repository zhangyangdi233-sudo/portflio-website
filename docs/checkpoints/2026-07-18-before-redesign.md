# 2026-07-18 pre-redesign checkpoint

- Git baseline: `21fb5b0 build three-color artist portfolio system`
- Branch: `codex/ciba-signal-index`
- Baseline build: `npm run build` passed with 31 static pages.
- Baseline screenshots:
  - `docs/design-references/research-2026-07-18/ciba-baseline-home-ja.png`
  - `docs/design-references/research-2026-07-18/ciba-baseline-works-ja.png`
- Reversion path: restore individual files from commit `21fb5b0`; do not delete artist media.

This checkpoint exists so the 2026-07-18 cinematic/spatial redesign can be audited or reverted
without losing the prior implementation.

## Wake Up content-removal boundary

The 2026-07-18 user screenshots explicitly requested removal of the Japanese statement panels and
everything represented below them: statement variants, biography text, grid/runner composition,
blue/yellow logo studies, corridor/flooded-square composition, and pointing-hand studies. Their
source files remain untouched under `public/assets/projects/wake-up/`; only runtime content
references are removed. This keeps the change reversible without exposing the deleted sequence.
