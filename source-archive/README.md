# Non-deployable source archive

This directory preserves artist-supplied and superseded files that must not be copied into the
public static site. Astro publishes every file under `public/`, so only assets referenced by a
verified public project record belong there.

## Contents

- `wake-up-legacy/`: Wake Up source media removed from the public two-image record.
- `private-placeholders/`: unpublished placeholder artwork and the placeholder CV.
- `historical-captures/`: superseded site/Figma screenshots retained only as design history.

These files are not current portfolio evidence, are not Figma source-of-truth, and must not be
linked from public HTML. Restore an item to `public/` only after the artist explicitly approves
publication and the asset allowlist in `scripts/check-built-site.mjs` is updated.

The pre-change paths are recoverable from Git history and from the two documents under
`docs/checkpoints/`.
