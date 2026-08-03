---
name: ciba-art-direction
description: Create, review, or evolve CIBA's original art-portfolio direction for websites, Figma handoffs, exhibition pages, case studies, and motion systems. Use when a request mentions CIBA's aesthetic, professor/curator-facing portfolio presentation, Signal Index / Acid Proof, Internationalist grids, liminal or dreamlike atmosphere, controlled interface instability, Works desktop windows, art-direction.json, or asks the system to learn from explicit visual feedback over time.
---

# CIBA Art Direction

Build an original, curator-readable visual language from mechanisms rather than copied surfaces. Keep the evidence of the work stable, use a black / warm-paper / acid-green interface, then allow one page-specific narrative mode and one rare anomaly to carry atmosphere.

## Required reading

Read these before making visual decisions:

- `references/aesthetic-system.md` for the active design grammar and review gates.
- `references/taste-ledger.md` for explicit user preferences and prior decisions.
- `references/taste-inbox.md` when new feedback has been captured but not confirmed.
- `references/evaluation-rubric.md` before a delivery or independent review.

Read `references/originality-audit.md` before translating a named reference. Read
`references/sources.md` when claims, provenance, or additional research are needed.

## Workflow

1. Inspect the work before styling it. Require the audience, programme or venue, review purpose, project evidence, content model, device constraints, and existing design tokens. If the programme is unknown, label all admissions-oriented numbers as defaults rather than requirements.
2. Preserve the stable evidence layer: identity, a deliberately selected body of work, title, year, medium, role, scale or encounter format, credits, contact route, and a complete artwork view. Use 4–6 selected works only as a starting default; current programme instructions and the artist's actual body of work outrank it.
3. Choose exactly one narrative mode for the page using the selection rubric in `references/aesthetic-system.md`: `archive`, `cinematic`, `spatial`, or `editorial`.
4. Choose at most one anomaly mechanism: a scroll-linked letter roll, a movable window field, one impossible spatial break, or one controlled signal interruption. A mechanism may recur at defined content changes, but do not introduce a second anomaly type on the same page.
5. Apply the 70/20/10 balance: 70% conventional legibility, 20% narrative shell, 10% anomaly. Treat this as a review discipline, not a pixel quota.
6. Implement interaction state before decorative animation. Every drag, close, filter, and route
   must work with reduced motion and keyboard input. Dragging also needs an equivalent
   simple-pointer action that does not require a dragging gesture.
7. Complete the palette/geometry/type/texture/motion/metaphor comparison in `references/originality-audit.md`. Name at least three materially changed axes for every named reference used in the delivered expression.
8. Run the evidence-based pass in `references/evaluation-rubric.md`, preferably through an
   independent Critic / Evaluator. Remove any element that cannot explain its content or interaction
   role. Never treat the Evaluator's opinion as taste.
9. Keep taste and outcomes separate. Record verified implementation outcomes in `references/outcome-log.md`; record taste only through the explicit-feedback confirmation workflow below.

## Originality boundary

- Abstract mechanisms: asymmetry, strict limited color, archive metadata, stable shell versus unstable perception, repetition plus one anomaly, and fast state feedback.
- Rebuild the palette, geometry, typography, texture source, motion syntax, and narrative metaphor from the artist's own work.
- Never ship reference screenshots, game assets, characters, logos, dialogue, music, proprietary fonts, copied layouts, or frame-by-frame transitions.
- If the result is immediately describable as “a Persona 5 site,” “an Arknights PV page,” or another named work, stop delivery and document material distance on at least three axes in `references/originality-audit.md`.

## Portfolio-specific implementation

For this repository, use this precedence:

1. `src/content/projects/*.json`: canonical project facts, translations, media, links, and priority.
2. `src/content/site/profile.json`: canonical artist identity, statement, CV, contact, and social links.
3. `src/content/art-direction.json`: canonical palette, typography, motion values, and Works-window positions.
4. `figma-export/design-tokens.json` and the Figma plugin: generated/validated handoff mirrors. Run `npm run check:design` after changing canonical tokens.

Make structural changes in semantic HTML/CSS/JS, not only in Figma. Use Figma for composition exploration and handoff, while preserving the website as the executable source.

## Learning from feedback

Do not infer preference from silence, acceptance, agent judgment, analytics, build results, or a
single click. When explicit feedback arrives, first capture the user's exact words without a
design interpretation:

```bash
python3 scripts/add_taste_observation.py \
  --quote "user's exact words" \
  --context "page or artifact"
```

Then propose a neutral signal, keep, avoid, and future decision to the user. Promote it only after
the user explicitly confirms that interpretation:

```bash
python3 scripts/promote_taste_observation.py \
  --id "TASTE-..." \
  --signal "confirmed neutral interpretation" \
  --keep "confirmed property to retain" \
  --avoid "confirmed property to reduce" \
  --decision "confirmed future rule" \
  --confirmation "user's exact confirmation words" \
  --context "page or artifact"
```

New confirmed feedback outranks older ledger entries; project requirements outrank general taste.
Verified outcomes may update accessibility or implementation guidance, but never personal taste
without this confirmation path.

## Delivery

State the chosen narrative mode, anomaly, evidence hierarchy, reduced-motion behavior, and any unresolved content placeholders. When research influenced the result, distinguish sourced fact from design inference.
