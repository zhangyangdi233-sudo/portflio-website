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
- Coursework / Three Desktop Sections

The Works frame contains five separate, large project-window frames. Their title bars, media
placeholders, concepts, metadata, and `OPEN` labels remain editable. Move each whole window frame
in Figma to test alternate overlaps; the authored overlap mirrors the website's desktop window
mode. The drawn controls document interface states but are not interactive inside the Figma
canvas.

The seventh frame, `07 Coursework / Three Desktop Sections`, is the editable handoff for University
Coursework. It contains three large, square-corner desktop sections in source order:

- Blender — 10 smaller evidence windows: 8 image markers and 2 video markers.
- Maya — 2 smaller evidence windows: 1 image marker and 1 video marker.
- After Effects / Premiere Pro — 2 smaller video windows.

All fourteen small windows use editable Figma frames, rectangles, rules, and text. Video windows
include editable `PLAY` and progress markers to distinguish them from image records. The website,
not Figma, owns the real title-bar drag, active stacking, clamping, section reset, compact ordered
fallback, and native video controls. No reference-site artwork, purple/pink chrome, pixel font,
branding, copied code, or proprietary assets are embedded in this handoff.

Home / Desktop and Home / Mobile omit the redundant archive/location and edition/year labels. The
opening keeps one compact `GAMES / WEB / MOVING IMAGE` line and one `VIEW WORKS` action; the former
project-list paragraph is removed. The Escape work-window title is authored as live two-line
text—`ESCAPE` followed by `PROJECT`—rather than simulated with character spacing. University
Coursework follows the same semantic-break rule in its dedicated frame.

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

For University Coursework, `../src/content/projects/university-coursework.json` is also the
canonical source for every inner-window identity, English caption, media type, public source path,
authored x/y/width position, and z-order. The Figma plugin keeps a readable snapshot so it can run
without filesystem access; `npm run check:design` compares that entire snapshot and fails if any
item—not merely the section counts—drifts from the website.

## Tokens and screenshots

`design-tokens.json` mirrors the current palette, philosophy, full typography roles, motion,
accessibility, breakpoint, stage geometry, every Works-window position, and the three-section /
fourteen-item Coursework handoff contract. Run
`npm run check:design` from the project root after editing canonical tokens; the check compares the
website motion source, CSS boundary, token handoff, Figma workspace, and every project fact. Figma
uses Inter as a portable editable approximation of the website's canonical multilingual system
stack.

No current PNG capture is bundled: the previous screenshots described a superseded prototype and
were moved to `../source-archive/historical-captures/`. The small README in `screenshots/`
defines the acceptance rule for any future capture. Third-party research captures under
`docs/design-references/` remain local-only and ignored by Git.

Use `src/content/art-direction.json`, `design-tokens.json`, and the generated editable frames as
the current art-direction source, in that order. The drift check also verifies the Home project
stage, five-work order, Works filter/layout controls, visible count, mobile-header height, focus
outline, top-level frame geometry, and the absence of stale PNG captures in the live handoff
folders.
