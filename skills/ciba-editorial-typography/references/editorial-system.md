# CIBA editorial system

Status: working system. Preference changes require explicit user confirmation.

## Typography roles

| Role | Purpose | Default behaviour |
| --- | --- | --- |
| Monument | Identify the artist or current work | One semantic title, live text, restrained tracking |
| Deck | State concept/evidence scope | One or two sentences, readable measure |
| Record | Verified date, context, role | One compact row; omit unknown fields |
| Chapter | Name a real evidence group | Locale-specific phrase break |
| Caption | Identify visible evidence | Adjacent to figure; factual, concise |
| Body | Explain method/decision/result | 55–75ch Latin target, generous leading |
| Control | Name an action | Short verb phrase, no editorial ambiguity |

## Display typography

```css
.display-title {
  font-kerning: normal;
  font-optical-sizing: auto;
  letter-spacing: clamp(-0.03em, var(--title-tracking, -0.02em), 0em);
  line-height: 0.92;
}

:lang(zh) .display-title,
:lang(ja) .display-title {
  letter-spacing: 0;
  line-height: 1.02;
  line-break: strict;
  word-break: normal;
}
```

This is a starting contract, not a substitute for optical review. Keep semantic word groups in
markup. A display animation may roll or clip glyphs, but it must not change word spacing or leave
duplicate glyphs visible when settled.

## Semantic breaks

- English `WAKE / UP`
- English `ESCAPE / PROJECT`
- English `UNIVERSITY / COURSEWORK`
- Chinese and Japanese breaks are independently authored by phrase; never copy the Latin `<br>`.
- A forced break belongs in localized content or a named composition rule, not an arbitrary
  character index.

## Metadata distillation

At a page top, use at most:

- one title;
- one deck;
- one compact verified record.

Move chapter-specific tools, durations, and briefs into the relevant chapter. Remove labels that
repeat `works`, `project`, `archive`, the current year, or the site navigation unless they add a
distinct fact.

## Evidence rhythm

Default chapter rhythm:

1. complete outcome;
2. asymmetric process pair;
3. text/space pause;
4. short visual sequence;
5. measured reflection.

Direct-manipulation pages may use window overlap in place of the linear desktop sequence, but their
mobile DOM order must preserve this evidence hierarchy.

## Caption and alt distinction

- Caption: `Fig. 01 — Final environment render. Blender.`
- Alt: `A dark red flooded corridor with bare trees and a small orange duck.`

Do not repeat the caption verbatim in `alt`. Do not claim intent, quality, grades, or authorship that
the user did not supply.

## Accessibility floor

- Ordinary text 4.5:1 contrast; large text 3:1.
- Text survives user overrides for line height, paragraph spacing, letter spacing, and word spacing.
- Essential titles remain live text.
- Information uses words/numbers/position as well as colour.
- At 320 CSS pixels, evidence stays present and the reading order remains coherent.

