# Home safe-grid and editorial spacing research

*Generated: 2026-10-02 | Primary sources reviewed: 9 | Confidence: high for the
standards, medium-high for the project-specific measurements*

## Executive summary

The five reported layout problems have one common cause: the Home page did not use one shared
content boundary or one measurable spacing system. The corrective system therefore uses a single
responsive safe gutter, an 8px spacing scale, a twelve-column desktop grid, and explicit text-wrap
and CJK line-breaking rules. “Full width” means the full width of the safe content area, not the
viewport edge. This keeps the action visually wide without allowing text to cross the page's
working boundary.

## Sourced principles

1. **Use a shared grid and gutters.** USWDS treats the grid as the basis for consistent alignment,
   while Carbon's 2x Grid uses an 8px base unit for spacing. These support one page gutter and an
   `8 / 16 / 24 / 32 / 48 / 64px` spacing scale rather than element-specific offsets.
   ([USWDS layout grid](https://designsystem.digital.gov/utilities/layout-grid/),
   [USWDS spacing units](https://designsystem.digital.gov/design-tokens/spacing-units/),
   [Carbon 2x Grid](https://www.carbondesignsystem.com/building-blocks/foundations/2x-grid/guidelines),
   [Carbon spacing](https://www.carbondesignsystem.com/building-blocks/foundations/spacing/overview))

2. **Keep readable line lengths and do not force the final line.** WCAG's enhanced visual
   presentation criterion caps a CJK line at 40 glyphs and a Latin line at 80 characters. W3C's
   Chinese layout requirements exclude the last line of a paragraph from forced justification.
   ([WCAG visual presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html),
   [CLREQ](https://www.w3.org/International/clreq/))

3. **Give text enough leading and preserve user overrides.** WCAG requires content to remain
   usable when a reader applies `line-height: 1.5` and expanded text spacing. The introduction uses
   `1.6` leading, leaving room for Chinese, Japanese, and Latin scripts.
   ([WCAG text spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html))

4. **Use language-aware line breaking.** CSS Text and Unicode define line-breaking behavior;
   Chinese and Japanese text should retain normal word breaking with strict punctuation handling,
   rather than using emergency breaks as the primary layout method.
   ([CSS Text Level 4](https://www.w3.org/TR/css-text-4/),
   [Unicode Line Breaking Algorithm](https://www.unicode.org/reports/tr14/))

5. **Reflow at narrow widths.** WCAG Reflow requires content to work at a width equivalent to
   320 CSS pixels without two-dimensional scrolling. Grid and flex children therefore receive a
   zero minimum inline size, and the desktop composition becomes one column below 900px.
   ([WCAG Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html))

## Project-specific implementation decisions

The values below are design inferences from the sourced principles and the measured page, not
universal standards:

- Safe gutter: `16px` below 640px, `24px` from 640px, and `32px` from 1024px.
- At the reported 1100px viewport, the shared safe line is therefore `x=32–1068`, giving a
  `1036px` content width.
- The Home action occupies 100% of that safe width and has a 64px minimum height.
- The role line precedes the action in source and visual order with a measured 16px gap.
- The introduction band uses twelve equal columns, 24px gutters, and a 192px minimum height.
  Its title is centered vertically by grid alignment rather than manual offsets.
- The introduction paragraph occupies columns 8–12, uses a `30ic` maximum, `16–18px` type,
  `1.6` line-height, and `text-wrap: balance` as progressive enhancement for this short deck.
- The cinematic instruction aligns its right edge to the same safe line as the header, action,
  metadata, project action, and counter.

## Acceptance checks

- At 1100px, action edges measure `32px` and `1068px` in Chinese, English, and Japanese.
- The role/action gap measures 16px, and the role is above the action.
- The introduction title's vertical center differs from its band by no more than 2px.
- The introduction and instruction text stay inside the computed safe line.
- The introduction's last rendered line is at least 45% of its longest line.
- The existing multilingual 320px and 390px browser checks retain no horizontal overflow.

## Methodology and limitation

The requested Deep Research workflow was used for question decomposition and source synthesis.
Firecrawl and Exa were not configured in this environment, so the review used current official
W3C, Unicode, USWDS, Carbon, GOV.UK, and MDN pages through the available web search tool. Standards
and project-specific inferences are separated above; no preference was promoted into CIBA's
permanent taste ledger.
