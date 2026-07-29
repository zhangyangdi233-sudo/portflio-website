# CIBA editable Figma workflow

## File

- Editable file: [CIBA Portfolio Editable Website System](https://www.figma.com/design/xyINqLy60s9MELHd2HmViK)
- Requested Team Project: [622631172](https://www.figma.com/files/team/1656239521218102059/project/622631172?fuid=1656239519766432224)
- Current location: the authenticated account’s Drafts.

Direct creation inside Project `622631172` was rejected because the account currently exposes a
Starter / View seat. Move the completed Draft into that project from Figma’s file browser when the
project has a free file slot and your account has permission.

The file already contains the CIBA primitive, semantic color, layout, and motion variable
collections plus editable text and effect styles. Figma represents the website’s system stacks
with `Inter` for Latin/UI and `Noto Sans JP` for Japanese/multilingual text.

## Editable import

The repository also contains a local development plugin that creates the complete editable website
surface without flattening it into screenshots:

1. Install/open Figma Desktop.
2. Choose `Plugins → Development → Import plugin from manifest…`.
3. Select `figma-export/figma-plugin/manifest.json`.
4. Open the target page and run
   `CIBA Portfolio Import → Import / refresh editable portfolio`.

The importer uses the current page, so it stays within the Starter plan’s three-page limit. It
creates seven independent top-level frames: Home desktop/mobile, Works, X.WHEEL detail, Wake Up,
About, and University Coursework. The Home stage contains the four accepted X.WHEEL images as
four independent 10%-opacity layers. If the website dev server is available at
`http://127.0.0.1:4323`, the plugin loads the real PNG/JPG evidence; otherwise it leaves clearly
named editable placeholders with the correct public source path.

Running the importer again refreshes only top-level nodes marked as generated. Untagged layers are
preserved. Duplicate an exploratory frame before refreshing if you want to preserve a manual
variation.

## Figma → Codex changes

Start the local listener:

```bash
npm run figma:sync
```

Then run `CIBA Portfolio Import → Export changes to Codex` in Figma. The plugin exports the current
generated page to `figma-export/sync/latest.json`, retaining a previous snapshot and append-only
history. Codex can compare:

- text edits;
- x/y, width/height, rotation, opacity, visibility, and lock state;
- fills, strokes, and image hashes;
- typography and text alignment;
- auto-layout values;
- hierarchy and Figma node IDs;
- media source and interaction annotations.

The sync server is local-only (`127.0.0.1:4767`), validates the snapshot contract, limits payloads
to 10 MB, and does not inspect credentials or unrelated Figma pages.

## MCP limitation

Figma’s Starter/View MCP allowance is six read calls per month. The allowance was exhausted while
building this file on 2026-07-29. Write-independent local import/export remains available, but
automatic remote inspection resumes only when Figma resets the allowance or the seat is upgraded.
The local snapshot workflow exists so design-to-code iteration does not have to wait for that
quota.

## Source of truth

- Visual tokens: `src/content/art-direction.json`
- Project facts/media: `src/content/projects/*.json`
- Website composition: `src/pages/[lang]` and `src/components`
- Portable Figma handoff tokens: `figma-export/design-tokens.json`
- Machine-readable mapping: `docs/figma/ciba-portfolio-sync.json`

Run `npm run check:design`, `npm run check`, `npm test`, and `npm run build` before committing a
Figma-driven website update.
