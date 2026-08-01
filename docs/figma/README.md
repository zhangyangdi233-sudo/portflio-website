# CIBA editable Figma workflow

## File

- Team Project file: [CIBA Portfolio — Editable Website System](https://www.figma.com/design/KWJfKNS3PKBhRGCad4V3Ey/CIBA-Portfolio-%E2%80%94-Editable-Website-System)
- Team Project: [622631172](https://www.figma.com/files/team/1656239521218102059/project/622631172?fuid=1656239519766432224)
- Editable capture backup: [CIBA Portfolio Editable Website System](https://www.figma.com/design/xyINqLy60s9MELHd2HmViK)

On 2026-08-01 the existing empty `Untitled` Design file in Team Project `622631172` was reused and
renamed, avoiding a fourth collaborative file on the Starter plan. Its `00 Website Screens` page
contains the six unique editable website routes, and `01 Foundations` contains the editable 1440×900
foundation frame (`3:3033`). The color dependencies used by the captured frames were copied into
the target file as local `CIBA / Color` variables. The Draft remains a reversible capture backup,
not the delivery location.

The file already contains the CIBA primitive, semantic color, layout, and motion variable
collections plus editable text and effect styles. Figma represents the website’s system stacks
with `Inter` for Latin/UI and `Noto Sans JP` for Japanese/multilingual text. The About handoff uses
the artist-confirmed public contact `mayonezu332@gmail.com` rather than a placeholder.

The Japanese website was first captured into that Draft as editable Figma frames with real text,
images, and nested layers, then copied into the Team Project file:

- `28:2` — Home / desktop;
- `31:2` — Works / draggable-window index;
- `32:2` — X.WHEEL detail;
- `30:2` — Wake Up detail;
- `29:2` — About / contact;
- `33:2` — University Coursework;
- `34:2` — discarded wide Home duplicate retained only in the Draft backup; it was deliberately
  omitted from the Team Project rather than represented as a mobile design.

The source foundation is `27:2`; the Team Project copy is `3:3033`. The source layout contains a
development-only Figma capture bridge; `npm run build && npm run check:built` asserts that this
bridge is never shipped in production HTML.

## Optional Desktop refresh

The Team Project handoff is already complete in the web editor, so Figma Desktop is not required to
view or edit it. The repository also contains a local development plugin for a future exact refresh
without flattening the website into screenshots:

1. Install/open Figma Desktop from Figma’s official download page and accept the applicable terms.
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

Figma’s Starter/View MCP call limit was reached after the live captures on 2026-08-01. The editable
Team Project transfer and variable import were completed through Figma’s web editor after that
limit. Automatic remote inspection resumes only when Figma resets the allowance or the seat is
upgraded; the local snapshot workflow keeps future design-to-code iteration independent of it.

## Source of truth

- Visual tokens: `src/content/art-direction.json`
- Project facts/media: `src/content/projects/*.json`
- Website composition: `src/pages/[lang]` and `src/components`
- Portable Figma handoff tokens: `figma-export/design-tokens.json`
- Machine-readable mapping: `docs/figma/ciba-portfolio-sync.json`

Run `npm run check:design`, `npm run check`, `npm test`, and `npm run build` before committing a
Figma-driven website update.
