# CIBA Portfolio — Editable Figma Handoff

This package translates the portfolio's **Signal Index / Acid Proof** direction into editable Figma primitives. It combines an Internationalist grid, a strict black / warm-paper / acid-green interface, multilingual hierarchy, and semantic window UI. Reference sites informed interaction research only; do not copy their assets, text, frame graphics, code, or exact compositions.

## Import on macOS

1. Open the Figma desktop app.
2. Choose `Plugins > Development > Import plugin from manifest…`.
3. In the macOS file picker, select the manifest using either relative route:
   - From the `portflio-website` project root: `figma-export/figma-plugin/manifest.json`
   - From this `figma-export` folder: `figma-plugin/manifest.json`
4. Run `CIBA Portfolio Import` from `Plugins > Development`.

No user-specific absolute path is required. If Finder opens elsewhere, navigate to your local clone and follow the relative route above.

The plugin creates editable frames for:

- Home / Desktop
- Home / Mobile
- Works / Draggable Window System
- Project Detail / X.WHEEL
- Wake Up / Replica Map
- About / Statement CV Contact

The Works frame contains seven separate project-window frames. Their title bars, media placeholders, summaries, metadata, and `OPEN` labels remain editable. Move each whole window frame in Figma to test alternate overlaps; the authored overlap is intentional and mirrors the website's desktop Scatter mode. The drawn controls document interface states but are not interactive inside the Figma canvas.

Running the plugin again updates the generated frames on the existing `CIBA / Signal Index / Acid
Proof` page instead of creating duplicates. Untagged top-level layers that you add manually
are preserved. Edits made inside a generated frame are replaced on the next run; duplicate or move
exploratory frames to another page before refreshing if you want to keep them.

## Website JSON source

The website project records are the canonical source at `../src/content/projects/*.json`, relative
to this README; the website reads them through `../src/lib/projects.ts`. Canonical visual tokens
live in `../src/content/art-direction.json`. The plugin's project array is a generated-handoff
snapshot. Update it when records change; the drift check below verifies every project title,
summary, medium, year, status, order, and slug before delivery.

## Tokens and screenshots

`design-tokens.json` mirrors the current palette, philosophy, full typography roles, motion,
accessibility, breakpoint, stage geometry, and every Works-window position. Run
`npm run check:design` from the project root after editing canonical tokens; the check compares the
website motion source, CSS boundary, token handoff, Figma workspace, and every project fact. Figma
uses Inter as a portable editable approximation of the website's canonical multilingual system
stack.

The files in `screenshots/` are captures of this CIBA site and can be placed in Figma as locked
structural comparison layers. Third-party reference captures under `docs/design-references/` are
local-only and ignored by Git. When a screenshot and the generated editable frames differ, use
`src/content/art-direction.json`, `design-tokens.json`, and the generated frames as the current
art-direction source, in that order.
