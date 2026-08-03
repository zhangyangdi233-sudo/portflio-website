# CIBA delivery evaluation

Use this rubric for an independent Critic / Evaluator pass before delivery. Inspect the rendered
artifact and canonical content, not only screenshots or test names. Report `pass`, `partial`, or
`fail` with concrete evidence. A successful build is evidence of implementation health, not taste.

## Severity

- `P0`: blocks access to the site or supplied work.
- `P1`: hides, misstates, or makes core portfolio evidence unusable.
- `P2`: weakens comprehension, access, originality distance, or multilingual quality.
- `P3`: polish issue with no material effect on evaluation.

## Gates

### 1. Professor scan

- Identity, practice, selected works, and a contact route are reachable without learning the
  interaction.
- The opening sequence is concise and does not repeat navigation or archive labels.
- Programme-specific requirements are recorded when known; defaults are labelled as defaults.

### 2. Project evidence

- Each selected work identifies title, year when known, medium, concept, status, and a complete or
  representative artwork view.
- Role, collaborators, scale or encounter format, credits, and technical context are present when
  verified; unknown facts are omitted or marked as content debt.
- Captions identify evidence; alternative text describes the visible media.

### 3. Interaction recovery

- Every work remains reachable without hover, drag, animation, or colour perception.
- Dragging has both keyboard operation and a simple-pointer alternative that does not require a
  dragging gesture, in accordance with WCAG 2.2 SC 2.5.7.
- Focus, stacking, minimize/restore, reset, ordered reading, touch layout, and reduced motion do
  not hide supplied evidence.

### 4. Visual discipline

- The interface uses only near-black, warm paper, and acid green; native artwork colour is evidence,
  not a fourth interface token.
- One narrative mode and at most one anomaly explain the page.
- The 70/20/10 balance preserves reading before atmosphere.
- Every accent, grid line, texture, and motion event has one content or state role.

### 5. Multilingual composition

- Chinese, English, and Japanese use locale-specific breaks, line-height, font fallbacks, and
  tracking.
- Display type remains live text, word groups stay intact, and settled animation does not expose
  duplicate glyphs.
- 320 CSS pixels, zoom/reflow, text-spacing overrides, and long real copy do not cause loss.

### 6. Originality and rights

- Named references contribute only abstract mechanisms.
- At least three expression axes differ for each recognisable reference.
- No reference asset, font, logo, character, dialogue, sound, code, or distinctive transition ships.
- Artist media provenance and third-party rights are recorded.

### 7. Operational parity

- Canonical content and art-direction files remain the source of truth.
- Website, generated handoff, and Figma-editable structure agree on project identity, order, media,
  and tokens.
- Tests cover content allowlists, interaction fallback, design drift, and built output.

## Verdict rule

Delivery fails with any unresolved `P0` or `P1`. A `P2` may be accepted only when its limitation,
fallback, and follow-up are explicit. Record verified results in `outcome-log.md`; never promote the
Evaluator's opinion into the taste ledger.
