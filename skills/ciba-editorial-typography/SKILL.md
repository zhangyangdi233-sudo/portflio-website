---
name: ciba-editorial-typography
description: Apply and evolve CIBA's multilingual editorial typography for portfolio pages, project records, Figma handoffs, headlines, captions, and evidence-led layouts. Use when adjusting Chinese, English, or Japanese type, line breaks, metadata density, image-text rhythm, or when explicit user feedback should be recorded for later confirmation.
---

# CIBA Editorial Typography

Build an editorial reading system in which evidence is primary, type is structural, and each
language is composed rather than merely translated.

## Required reading

Before changing a CIBA interface:

1. Read `references/editorial-system.md`.
2. Read the relevant entries in `references/observation-inbox.md`.
3. Read `references/outcome-log.md` when revising an existing surface.
4. Use `references/source-ledger.md` for provenance; do not substitute remembered claims.

## Workflow

### 1. Establish content truth

- List supplied titles, dates, roles, media, and unknown facts.
- Do not invent course names, briefs, collaborators, outcomes, or dates.
- Distinguish visible caption facts from alternative-text descriptions.
- Decide what a professor must know before any styling decision.

### 2. Distil hierarchy

Keep one job per typographic role:

- title: identify the work;
- deck: state the concept or evidence scope;
- metadata: date/context/role only when verified;
- chapter heading: name a meaningful evidence group;
- caption: identify the visible evidence and relevant production fact;
- body: describe method, decision, or result without self-praise.

Delete labels that repeat the navigation, title, or surrounding section. Software names are
metadata, not the achievement.

### 3. Compose by locale

Treat title breaks as content. Store semantic word or phrase groups where a specific break matters.

- Latin: keep words intact; start display tracking between `normal` and `-0.03em`; never below
  `-0.04em`; enable kerning and optical sizing.
- Chinese: start at `letter-spacing: 0`; use language-sensitive line breaking; avoid inheriting
  Latin negative tracking.
- Japanese: start at `letter-spacing: 0`; use `line-break: strict` and appropriate Japanese font
  stacks; inspect punctuation and Latin product names.
- Never insert visual spaces between every character to manufacture monumentality.
- Use `text-wrap: balance` only for short headings and decks, not body copy.

Inspect critical Latin boundaries manually, especially `WA`, `AK`, `KE`, the word space, and `UP`.

### 4. Set editorial rhythm

Use a stable grid with repeatable anchors, then vary evidence scale deliberately.

- Let one finished outcome establish a chapter.
- Pair it with process evidence, a text/space pause, a sequence, and a concise reflection.
- Do not render all media as equal cards.
- Use empty space to separate arguments, not to fill a fixed hero.
- Align captions locally with the media they describe.
- Keep body measure near 55–75 Latin characters; test actual CJK measure visually.

### 5. Stress-test the real copy

Test Chinese, English, and Japanese at:

- 1440×900;
- 768×1024;
- 390×844;
- 320 CSS pixels or equivalent 400% zoom;
- user text-spacing overrides;
- reduced motion.

Check overflow, orphaned word groups, hidden controls, title collisions, caption contrast, and
semantic reading order.

### 6. Run the originality check

When learning from a magazine or site, record:

- abstract mechanism learned;
- at least three changed expression axes;
- what is explicitly excluded: source code, fonts, branded assets, copy, and distinctive layout.

Use CIBA's near-black, warm paper, and acid green only when the product contract still calls for
that triad.

## Learning loop

Explicit user feedback is evidence; silence and successful builds are not taste.

1. Capture the exact quote with:

   ```bash
   python3 scripts/add_typography_observation.py \
     --quote "exact feedback" \
     --context "page and review state"
   ```

2. Keep status `pending interpretation and explicit confirmation`.
3. Propose a keep / avoid / implementation interpretation to the user.
4. Promote a rule into `references/editorial-system.md` only after the user explicitly confirms
   that interpretation.
5. Record measured build, accessibility, or usability results in `references/outcome-log.md`.
   Outcomes improve implementation guidance but never become personal taste automatically.

## Delivery contract

A typography change is complete only when:

- source copy is factual and localized;
- semantic breaks are intentional;
- computed tracking stays within the locale contract;
- no top metadata repeats another role;
- captions and alt text differ by function;
- mobile is recomposed rather than uniformly shrunk;
- keyboard, zoom, and reduced-motion checks pass;
- the exact changed behaviour is recorded in the outcome log.

