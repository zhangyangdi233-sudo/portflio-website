# Signal Index / Acid Proof

## Intent

Present CIBA as an artist who can organize evidence with Internationalist precision while allowing one unmistakable acid signal to disturb the system. The interface should feel authored, not themed, and must remain legible to professors across Chinese, English, and Japanese.

## Composition rule

- Stable shell: a strict grid, reliable navigation, readable metadata, square corners, visible focus, and full artwork views.
- Narrative shell: archive files, cinematic title scale, or spatial windows. Pick one dominant shell per page.
- Anomaly: one event that breaks the shell for a reason. Examples include one letter roll at a project change or one movable field for comparing works.
- Balance: approximately 70% stable reading, 20% narrative shell, 10% anomaly.

## Active three-color interface

| Role | Color | Meaning |
| --- | --- | --- |
| Black field | `#090a08` | stable page, window body, negative space |
| Warm paper | `#f4f0dd` | reading ink, rules, inactive title bars |
| Acid proof | `#c6ff00` | focus, selected state, one structural interruption |

All legacy semantic color keys map to one of these three values for compatibility. Transparency
may create tonal hierarchy, but it must not introduce another hue. Acid green is never set as text
on warm paper because the pair lacks usable contrast; acid appears on black, or as a field with
black text. Selected state also needs shape, label, border, or position so color is not the only cue.

This palette is an active project requirement from the user's 2026-07-17 feedback. It is not yet a
confirmed long-term taste-ledger rule. The earlier `WAKE UP`-sampled flood palette remains research
history only and is no longer active. Native artwork color remains visible on detail pages; index
thumbnails may be monochrome so the interface stays within three colors.

## Type system

- Display: a heavy neutral grotesk for Latin text; monumental but never so large that the title becomes an accidental puzzle.
- CJK display: Japanese/Chinese system sans with language-specific weight, line-height, and line-breaking. Do not force Latin compression, all-caps behavior, or serif fallback onto CJK.
- Editorial: a readable multilingual sans for statements and project concepts.
- UI: the same neutral multilingual sans for navigation and controls.
- Metadata: mono for year, medium, status, credits, filters, and system hints.
- Never distort body copy, form labels, errors, or essential controls.

## Motion grammar

- Immediate state response first; animation may finish afterward.
- Micro feedback: 180ms.
- State change: 260ms.
- Entry: 460ms.
- Scroll-linked title change: one effect, tied to content progression.
- Psychological or system interruption: at most once per chapter or page.
- `prefers-reduced-motion` keeps all content and functional state while removing nonessential transforms, parallax, and smooth scrolling.
- Never add flashing as a default. Any future high-contrast interruption needs an explicit static mode.

## Audience-specific evidence hierarchy

Before choosing a hierarchy, record the actual audience, programme or venue, application/exhibition
purpose, format constraints, and review deadline. The timings and project counts below are active
design defaults, not universal admissions rules.

### 30-second path

Default for an unspecified professor review: identity → artistic position → 4–6 selected works →
contact. Current programme guidance and the artist's actual body of work override this default.
This is the site-level sequence, not a requirement to repeat selected-work cards inside every detail page.

### 2-minute path

Default for an unspecified admissions review: for each selected work, show title, year, medium,
concept, scale, artist's role, collaborators/credits, complete artwork or representative
documentation, and a clear next step. For a game or interactive work, “scale” may mean platform,
input, player count, session duration, display/projection dimensions, installation footprint, or
availability of a playable build; choose only the fields that explain how the work is encountered.

### Curator and exhibition path

For a curator-facing review, prioritize exhibition relevance, work status, dimensions or technical
rider, edition/availability, installation requirements, rights/credits, documentation context, and
a direct contact route. These are active working fields and must be tailored to the venue; do not
present admissions heuristics as curator requirements.

### Archive path

Older work remains reachable but must not dilute the selected sequence. Filters and spatial play can reorganize the archive without hiding the ordered reading mode.

## Professor-facing information architecture

Use four stable layers. Do not merge them into one long promotional Home page.

1. Orientation: identity, one factual practice line, selected works, and a contact route.
2. Selected sequence: a deliberately edited group of public works with title, year when known,
   medium, status, concept, and representative evidence.
3. Project record: complete outcome first, then only verified process, encounter format, role,
   collaborators, credits, and technical facts relevant to that work.
4. Practice context: statement, CV, exhibitions, writing, press, teaching, or rights information
   only when verified. Keep it outside the project evidence unless it explains the work.

This hierarchy is informed by current RCA guidance and official sites for Hito Steyerl, Rafael
Lozano-Hemmer, Ryoji Ikeda, and Ian Cheng. It is a CIBA structure, not a copied layout.

## Narrative mode selection

- Archive: choose when comparison, chronology, provenance, or a large body of records is the main task. Use numbered files, metadata, and progressive disclosure.
- Cinematic: choose when a single project's temporal or emotional progression is the main task. Use large titles, pacing, an image field, and carefully timed transitions.
- Spatial: choose when rearranging several works exposes relationships. Use large, visibly window-like frames and always supply ordered mode, keyboard movement, and a mobile source-order fallback.
- Editorial: choose when argument, statement, or research text leads the experience. Use disciplined typography and image rhythm.

If two modes seem plausible, select the one that best serves the page's primary evidence task. The other may influence small details but cannot become a second shell.

## Review gates

1. Is the audience/programme/venue recorded, and can that audience understand identity and strongest work quickly without relying on a universal time claim?
2. Can every project be read without hover, drag, or animation?
3. Is year/medium/role/scale/credit evidence present or explicitly marked as content debt?
4. Does every visual accent have one semantic job?
5. Does the page have one dominant narrative mode and no more than one anomaly?
6. Are focus, keyboard, a simple-pointer non-drag alternative, touch, 390px layout, contrast, alt
   text, captions, and reduced motion verified?
7. Are all textures, imagery, fonts, audio, and motion expressions original or appropriately licensed?
8. Does `originality-audit.md` name at least three materially changed axes for each named reference used in the delivered expression?
