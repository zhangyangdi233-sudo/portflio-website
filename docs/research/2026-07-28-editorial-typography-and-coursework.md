# Editorial typography and University Coursework research

Date: 2026-07-28  
Scope: multilingual portfolio typography, evidence-led art-school presentation, draggable desktop
interaction, and comparable open-source implementations.

## Method

The requested Firecrawl and Exa research tools were not available in this session. The fallback
used direct primary/authoritative web sources, live browser inspection of the supplied reference,
GitHub repository inspection, the installed Impeccable skill, and two independent research agents.
Claims below distinguish sourced facts, observed implementation behaviour, and CIBA design
inferences.

## Editorial synthesis

1. Monumental headings need kerning and semantic word groups, not expanded character spacing.
   Adobe distinguishes pair-level kerning from run-level tracking, and large type exposes spacing
   problems more visibly. CIBA's Latin display range should begin at `normal` to `-0.03em`, with
   `font-kerning: normal` and `font-optical-sizing: auto`.
2. Line breaks belong to language and meaning. W3C guidance distinguishes word-based Latin line
   opportunities from Chinese/Japanese character-based rules. `ESCAPE / PROJECT` should therefore
   be stored as two English word groups; Chinese and Japanese receive independent phrase breaks.
3. A grid is a repeatable scaffold, not a requirement that every item become an equal card.
   Letterform Archive, Bauhaus Archive, Cooper Hewitt, and Pentagram examples support stable anchors
   with controlled changes in image/type scale.
4. Portfolio tops should be edited. RCA and UAL advise concise selection and short, relevant
   annotation. The home hero's archive/location and edition/year labels repeat context already
   available elsewhere, so they should be removed.
5. Captions identify evidence; alt text describes essential visible information. They should not
   be duplicates.
6. Responsive work is recomposition. WCAG reflow and W3C internationalisation guidance support a
   source-ordered compact layout rather than shrinking overlapping desktop windows.

## Supplied title diagnosis

`WAKE UP` was visually weakened by extreme negative tracking applied uniformly across every glyph
and the word boundary. The correction is to keep `WAKE` and `UP` as intact word spans, reduce Latin
tracking to a restrained range, and leave a deliberate inter-word gap. Chinese and Japanese should
not inherit that negative value.

`ESCAPE PROJECT` needs a forced semantic break after `ESCAPE`, while preserving the clipped glyph
roll. The animation acts inside each glyph mask; the word-group wrapper owns line composition.

## Reference interaction study

At 1280×720 on [ZUTOMAYO](https://zutomayo.net/), inspected cards were absolutely positioned,
draggable, independently stacked windows. Pointer drag wrote inline position values. Title chrome,
content, links, and close controls were distinguishable. At 390×844, the floating windows were
removed from the primary composition.

CIBA adopts only:

- independent windows;
- direct drag;
- active stacking;
- responsive removal of free positioning.

CIBA changes:

- surface, palette, typography, content model, controls, bounds, mobile fallback, and window
  proportions;
- drag begins only from a dedicated title bar;
- windows are strictly bounded inside one of three large chapter desktops;
- videos retain native independent controls;
- no close action can hide supplied evidence.

See `docs/research/components/coursework-desktop.spec.md` for the implementation contract.

## Coursework information architecture

The page is one public work with three chapters:

| Chapter | Supplied evidence | Desktop role | Compact role |
| --- | ---: | --- | --- |
| Blender | 8 images, 2 videos | Dense ten-window evidence field | Ordered figure list |
| Maya | 1 image, 1 video | Offset two-window field | Ordered figure list |
| AE / PR | 2 videos | Two wide playback windows | Ordered playable videos |

The page does not invent course names, assignment briefs, grades, roles, or dates. Captions state
only what is visible or explicitly known from the supplied grouping.

## Media audit

All fourteen source files were SHA-256 hashed before copying. The five videos contain `avc1`
H.264 video; four also expose `mp4a` audio and all place `moov` before `mdat`, supporting
progressive browser playback. Deployable copies keep the source bytes and use ASCII filenames.
The exact source-to-public mapping, byte sizes, and hashes are recorded in
`docs/research/university-coursework-media-manifest.json`.

The two large AE / PR files are approximately 38.9 MB and 70.5 MB. They remain user-controlled with
`preload="metadata"` so the page does not eagerly download full video bodies.

## Comparable open-source projects

Repositories were checked on 2026-07-28. None is a complete match for this portfolio; the
recommended architecture composes verified patterns rather than forking a theme.

| Repository | Stack / licence | Useful architecture | Limits and trade-off |
| --- | --- | --- | --- |
| [withastro/astro — blog example](https://github.com/withastro/astro/tree/main/examples/blog) | Official Astro example, MIT; current example uses Astro 7, MDX, Sharp | Typed content collection, static paths, image schema, minimal runtime | No i18n, gallery, video, case-study taxonomy, or desktop interaction; use API patterns only and keep this project on Astro 6 |
| [CodeStitch Advanced Astro i18n](https://github.com/CodeStitchOfficial/Advanced-Astro-i18n) | Astro 6.3.x, CC0-1.0 | Stable locale mapping keys, localized routes, `hreflang`, mobile-first language controls | Duplicated locale content and CMS coupling are unnecessary here; demo gallery hides imagery from assistive technology |
| [Accessible Astro Starter](https://github.com/incluud/accessible-astro-starter) | Astro 6.3.x, MIT | Skip links, visible focus, reduced-motion/high-contrast contracts, meaningful-alt versus decorative-image typing | Hard-coded project image assignment does not scale to fourteen grouped media records |
| [QuietPages](https://github.com/xocothemes/quietpages) | Astro 7, Tailwind 4, MDX, MIT | Editorial story folders, structured image credits, responsive one/two/three-column grids | No gallery, video, multilingual model, or drag system; backport principles rather than dependencies |
| [Astro Photo Folio](https://github.com/XD-QIN/astro-photo-folio) | Astro 7, MDX, MIT | Typed gallery metadata, capped responsive renditions, explicit `sizes`, case-study composition | Custom lightbox lacks a complete focus trap/touch contract and has no video model |
| [PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe) | Framework-independent JS, MIT | Progressive image enhancement, dimensions/srcset, keyboard/touch navigation, focus restoration | Solves lightbox behaviour only; does not solve content, captions, video, provenance, or this bounded-window interaction |

### Architecture decision

- Keep Astro 6 static output and the existing JSON content collection.
- Extend the current discriminated media model with a validated coursework group rather than
  introducing MDX or a CMS for fourteen known assets.
- Reuse one renderer for all languages and keep the current `Record<Language, …>` contract; do not
  fork pages by locale.
- Adopt Accessible Astro's component-contract mindset—explicit alt requirements, visible focus,
  skip/reduced-motion behaviour—but retain CIBA's existing implementation.
- Adopt QuietPages and Astro Photo Folio's evidence/provenance and responsive-media ideas without
  copying their themes or moving this project to Astro 7.
- Do not add PhotoSwipe now: the requested direct-manipulation desktop is not a lightbox, and
  videos must remain native. Its focus model remains a possible later enhancement for image-only
  zoom.
- Use native `<video controls playsinline preload="metadata">`; no custom player dependency.
- Exclude EmaSuriano's Astro portfolio from implementation references because the repository did
  not expose a complete licence suitable for confident reuse. Visual comparison alone is not a
  sufficient basis for copying code.

### Coursework source-selection boundary

The source folder contained 27 non-hidden files when audited. The artist explicitly attached and
assigned 14 filenames across three messages: 10 to Blender, 2 to Maya, and 2 to AE / PR. Those
fourteen files are the complete publication allowlist for this page. The other 13 files were not
assigned to any requested section, remain untouched in the source folder, and are intentionally
excluded from the site. The exact inclusion and exclusion ledgers are recorded in
`university-coursework-media-manifest.json`.

The coursework date was not supplied. The canonical record therefore uses an unknown marker
internally and omits the date from visible website and Figma metadata rather than inferring 2026
from the source-folder or task date.

## Implementation plan

1. Add a `coursework-desktop` project mode and media group field to the validated content schema.
2. Add a localized University Coursework content record containing all fourteen explicitly
   attached and section-assigned items.
3. Copy exact source bytes into a dedicated public asset directory with an allowlisted manifest.
4. Build one semantic Coursework component with three large sections and shared small-window
   rendering.
5. Add a section-scoped pointer/keyboard drag controller with pointer capture, z-order, clamping,
   reset, coarse-pointer fallback, and reduced-motion support.
6. Replace per-character title spacing with semantic word groups; force the English Escape break;
   remove redundant home metadata; update public-work counts and copy.
7. Update canonical art direction, Figma handoff, tests, deploy allowlist, and design-drift checks.
8. Validate build, video markup, pointer/keyboard interaction, three locales, responsive reflow,
   contrast, and real-browser behaviour.
9. Run independent Critic and Evaluator reviews; repair and repeat until both pass.

## Source list

- [Adobe — Kerning primer](https://www.adobe.com/creativecloud/design/discover/kerning.html)
- [Adobe InDesign — Kerning and tracking](https://helpx.adobe.com/indesign/desktop/format-and-style-text/tabs-indents-and-spacing/about-kerning-and-tracking.html)
- [CSS Fonts Level 4](https://www.w3.org/TR/css-fonts-4/)
- [CSS Text Level 4](https://www.w3.org/TR/css-text-4/)
- [W3C — Approaches to line breaking](https://www.w3.org/International/articles/typography/linebreak.en)
- [W3C — Chinese Layout Requirements](https://www.w3.org/TR/clreq/)
- [W3C — Japanese Script Resources](https://www.w3.org/TR/jpan-lreq/)
- [Letterform Archive — Legacies of Swiss Style](https://letterformarchive.org/news/legacies-of-swiss-style-tyografische-monatsblatter/)
- [Cooper Hewitt — Gridnik](https://www.cooperhewitt.org/2013/11/26/gridnik/)
- [Bauhaus Archive — Bauhaus Typography](https://www.bauhaus.de/en/research/publications/bauhaus-typography/)
- [Pentagram — Citizen](https://www.pentagram.com/work/citizen)
- [Royal College of Art — Portfolio advice](https://www.rca.ac.uk/study/apply-to-study/portfolio-advice/)
- [UAL — Portfolio advice](https://www.arts.ac.uk/study-at-ual/apply/portfolio-advice)
- [WHATWG — figure and figcaption](https://html.spec.whatwg.org/dev/grouping-content.html)
- [W3C Images Tutorial](https://www.w3.org/WAI/tutorials/images/)
- [WCAG 2.2 — Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- [WCAG 2.2 — Text spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html)
- [withastro/astro — blog example](https://github.com/withastro/astro/tree/main/examples/blog)
- [CodeStitch Advanced Astro i18n](https://github.com/CodeStitchOfficial/Advanced-Astro-i18n)
- [Accessible Astro Starter](https://github.com/incluud/accessible-astro-starter)
- [QuietPages](https://github.com/xocothemes/quietpages)
- [Astro Photo Folio](https://github.com/XD-QIN/astro-photo-folio)
- [PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe)
- [Impeccable](https://github.com/pbakaus/impeccable)
