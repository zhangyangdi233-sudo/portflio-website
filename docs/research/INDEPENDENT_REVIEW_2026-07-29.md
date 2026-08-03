# Independent Critic / Evaluator review — 2026-07-29

## Review boundary

Both reviewers were read-only, were given the original user goals rather than the builder's
conclusion, and inspected the same clean pushed baseline:

- baseline commit: `04ed117ad0e0a9e3889dc28715c0320de24643e9`
- branch: `codex/ciba-clean-restart`
- Critic task: `019fad11-9aab-7061-9e92-8668ecaefae3`
- Evaluator task: `019fad12-15af-7103-860c-bcf2127b0cc4`

The Critic returned `VERDICT: FAIL`. The Evaluator returned `VERDICT: INCOMPLETE`. Neither review
was entered into a taste ledger.

## Initial findings and disposition

| Severity | Finding | Disposition |
| --- | --- | --- |
| P1 / P2 | Contact navigation has no artist-confirmed direct contact method; formal role/credits/CV facts also remain incomplete. | Open external fact. The site continues to avoid invented actions. Artist must supply one verified email or direct URL; other formal facts remain explicit unknowns. |
| P2 | University Coursework's initial Works window and its Open action were below the stage; Escape exceeded the right edge. | Fixed. Visible Works windows are clamped after layout, visibility, media/size, reset, restore, and responsive changes. `clampOffsetWithinBounds` has explicit regression cases for the measured 91px bottom and 17px right overflow. |
| P2 | Wake Up used extreme `-0.075em` tracking and had no semantic `WAKE` / `UP` words. | Fixed. English emits separate word spans at `-0.03em`; Chinese and Japanese use one localized span with zero tracking. |
| P2 | Mobile Home evidence used opacity `0.3` instead of approximately 10%. | Fixed to `0.1`; source and guardrail contracts cover the mobile override. |
| P2 | Browser evidence was not reproducible from the repository. | Improved. `npm run check:browser` now contains a dependency-free Chrome/CDP audit for the high-risk paths. Execution remains unverified in this Codex sandbox because local Chrome is denied; this limitation is stated rather than hidden. |
| P2 | Seven editable Figma screens were not imported into Team Project `622631172`. | Open external action. Draft/local-plugin status remains truthful; no remote completion is claimed. |
| P3 | Behavior documentation said four Works windows while the site renders five. | Fixed to five. |
| P3 | Query-parameter reduced motion left 180ms transitions. | Fixed with explicit `html[data-motion="reduce"]` zero-transition rules. |
| P3 | The 320px English header had about 1px internal overflow. | Fixed with a two-row ≤360px header while preserving 44px targets. |
| P3 | Legacy global CSS increases future drift risk. | Mitigated without risky bulk deletion: design drift now proves the scoped CIBA stylesheet loads last and contains only the canonical three literal colours. |
| Implementation | Coursework move glyph used `-0.12em` tracking on an essential control. | Fixed to zero tracking and covered by the editorial typography guardrail. |

## Evidence rules for post-fix review

The post-fix Critic/Evaluator must:

1. inspect the new diff and rerun source/content/build checks;
2. verify that initial and Home-reset window positions stay inside the Works stage;
3. verify mobile Home opacity and Wake Up computed tracking at runtime if browser access is
   available;
4. keep Contact and Figma external requirements open unless direct evidence is supplied;
5. avoid promoting any review judgement into `taste-ledger.md` or `typography-ledger.md`.

## Post-fix recheck status

Both existing reviewer tasks received the incremental recheck instructions above. Each task entered
`systemError` immediately after the user message and produced no reviewer response. This is not a
pass, fail, or evidence of silence-as-approval. The initial `FAIL` / `INCOMPLETE` verdicts remain
the latest independent conclusions; repository-local validation and the dispositions above are
reported separately.
