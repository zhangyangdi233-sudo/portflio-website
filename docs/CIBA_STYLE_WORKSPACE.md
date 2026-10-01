# CIBA Style Workspace

This repository has one executable style source and two editable views of it.

## Codex-editable source

Edit `src/content/art-direction.json` to change the global palette, multilingual font stacks,
motion timings, Works stage height, and every project window's x/y/width/rotation/z values. Edit
`src/content/projects/*.json` for project facts, translations, media, and links. Project-local
palette fields remain content history, while the visible interface shell is limited to the three
canonical colors. No layout code is required for routine content or composition changes.

Reusable Codex request:

```text
Use $ciba-art-direction. Read the taste ledger and originality audit first. Keep project facts
unchanged, propose one narrative mode and at most one anomaly, edit art-direction.json, then run
npm run check:design, npm run check, npm test, and npm run build.
```

The installed Skill points back to `skills/ciba-art-direction/` in this repository, so future
updates remain versioned with the website.

## Figma-editable view

Import `figma-export/figma-plugin/manifest.json` in Figma Desktop through
`Plugins → Development → Import plugin from manifest…`, then run **CIBA Portfolio Import**. It
creates editable Home desktop/mobile, Works windows, project detail, WAKE UP edited-sequence, and About frames.
Text, shapes, title bars, media placeholders, metadata, and each Works window remain independent
Figma layers. Website drag/filter/routing behavior stays in code.

The generated page is `CIBA / Signal Index / Acid Proof`. Works windows use acid title bars,
warm-paper evidence bodies, black structural borders and an acid hard shadow; active state is also
shown by focus/z-order and a larger shadow. This mirrors the website's 320–390px desktop windows
and 760px bounded stage. Mobile and the desktop List control preserve semantic reading order.

After changing website tokens, mirror the values in `figma-export/design-tokens.json` and the
plugin color block, then run:

```bash
npm run check:design
```

The command fails if the website and Figma handoff palettes or website typography stack drift.

## Long-term aesthetic learning

The Skill never treats silence or an agent's opinion as taste. New feedback is captured verbatim
in `taste-inbox.md`; a design interpretation reaches `taste-ledger.md` only after explicit user
confirmation. Verified accessibility or usability outcomes go to `outcome-log.md` and do not
silently alter personal taste.
