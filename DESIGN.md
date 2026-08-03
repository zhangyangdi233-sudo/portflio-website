# CIBA design contract

## Direction

Signal Index / Acid Proof is a professor-readable portfolio system. Its stable layer is an
Internationalist evidence grid; its single spatial anomaly is direct manipulation of work
windows. The interface uses exactly three canonical colours:

- near-black `#090a08`;
- warm paper `#f4f0dd`;
- acid proof `#c6ff00`.

Native artwork may retain its source colour in the website. Interface chrome, Figma annotations,
controls, and generated placeholders do not introduce another hue, gradient, texture skin, or
rounded-card language.

## Evidence hierarchy

1. Artist identity, one compact media line, and a direct route to the work.
2. Five public records in canonical order: X.WHEEL, EMIDA, Wake Up, Escape Project, University
   Coursework.
3. Title, concept, medium/status, complete or representative media, and an explicit route.
4. Unknown course, role, credit, date, or assignment facts remain labelled as unknown or omitted.

Home does not repeat archive/location, edition/year labels, or a project-list paragraph. Its first
viewport keeps only the localized `Games / Web / Moving image` line and one View Works action;
coursework appears in the five-record sequence and index.

## Typography

- Display titles remain live text and are composed from semantic word or phrase groups.
- Latin display tracking begins between `normal` and `-0.03em`; kerning and optical sizing remain
  enabled in the website.
- Chinese and Japanese display tracking starts at `0`, with language-sensitive line breaking.
- `ESCAPE PROJECT` is authored as `ESCAPE` then `PROJECT`.
- `UNIVERSITY COURSEWORK` is authored as `UNIVERSITY` then `COURSEWORK`.
- Captions identify evidence; alternative text describes the essential visible content.
- Metadata is one compact verified record, not a second introduction.

## Spatial window system

The Works index contains five large project windows. Desktop windows overlap, rise on focus, and
move only from their title bars. Ordered and compact modes preserve semantic source order without
requiring drag.

University Coursework uses three large bounded chapter windows:

| Chapter | Evidence |
| --- | ---: |
| Blender | 8 images + 2 videos |
| Maya | 1 image + 1 video |
| After Effects / Premiere Pro | 2 videos |

Every one of the fourteen records is a smaller window inside its chapter. Website title bars are
44px drag handles; media bodies, captions, links, buttons, and native video controls never begin
drag. Pointer movement is clamped to the chapter, keyboard arrows move 16px, Shift + Arrow moves
48px, Home restores one item, and the chapter reset restores all authored positions. Compact and
coarse-pointer layouts use a non-overlapping ordered sequence.

## Figma handoff

`figma-export/figma-plugin/code.js` generates seven non-overlapping top-level frames on
`CIBA / Signal Index / Acid Proof`. Generated top-level frames carry the `cibaGenerated` plugin
tag. Re-running the plugin replaces only those tagged frames; manually added, untagged top-level
layers remain.

The Coursework frame uses editable frames, rectangles, rules, and text. Its video markers explain
the playback affordance but do not pretend to be functional controls. Website JSON and
`src/content/art-direction.json` remain canonical; the Figma generator and
`figma-export/design-tokens.json` are validated snapshots.

## Originality boundary

ZUTOMAYO contributes only the abstract ideas of independent windows, direct drag, and active
stacking. CIBA changes palette, geometry, typography, texture, bounds, control model, responsive
fallback, content, and narrative metaphor. The handoff excludes the reference site's artwork,
purple/pink chrome, pixel type, branding, buttons, code, and distinctive proportions.
