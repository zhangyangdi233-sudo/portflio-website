# CIBA Figma sync snapshots

Run `npm run figma:sync`, keep that terminal open, then choose
`Plugins → Development → CIBA Portfolio Import → Export changes to Codex` in Figma.

The local-only listener writes:

- `latest.json` — the newest editable Figma hierarchy.
- `previous.json` — the immediately preceding snapshot.
- `history/<timestamp>.json` — an append-only checkpoint for each export.

Runtime snapshots are intentionally ignored by Git. Codex reads `latest.json`, compares it with
`previous.json` and the website source, then applies only reviewed changes. The listener binds to
`127.0.0.1`, accepts a maximum payload of 10 MB, and requires the plugin’s local sync header.

The primary collaborative file is the Team Project file `KWJfKNS3PKBhRGCad4V3Ey`. Codex can read
that file through the Figma connector or the authenticated web editor after the artist edits it.
When the Starter connector quota is exhausted, an authenticated web inspection may write a local
`snapshotKind: "figma-web-inspection"` checkpoint; Desktop plugin exports use
`snapshotKind: "figma-plugin-export"`. This makes a protocol test fixture distinguishable from a
checkpoint of the actual Team Project.

The snapshot records frame and layer IDs, names, hierarchy, position, size, rotation, opacity,
visibility, fills, strokes, text content, typography, auto-layout values, media source paths, and
interaction annotations. It never reads browser credentials, Figma account data, or unrelated
pages.
