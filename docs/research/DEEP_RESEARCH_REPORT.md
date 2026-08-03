# Deep research: CIBA professor-facing art portfolio

Research date: 2026-07-17; evidence refresh: 2026-07-29. This report distinguishes
source-supported facts from design inference. Named works are references for mechanisms, not assets
or expressions to reproduce.

Evidence set: 35 linked sources. Confidence is high for the cited institutional, standards, and
official-site observations; medium for cross-reference design inferences; and deliberately
unassigned where the artist has not supplied programme requirements, authorship facts, or rights.

## Executive decision

**Active decision:** the portfolio should operate as **Signal Index / Acid Proof**: a reliable
Internationalist evidence system in near-black and warm paper, interrupted by one acid-green state.

- 70% stable reading: navigation, project facts, complete artwork views, contact, keyboard and mobile paths.
- 20% narrative shell: archive metadata, cinematic type, or a spatial works desktop.
- 10% anomaly: one scroll-linked letter roll, one movable field, or one spatial contradiction.

This ratio prevents the requested influences from collapsing into a mood-board collage.

## 2026-07-17 revision: Internationalist three-color pivot

**Explicit project requirement:** after reviewing the previous flood-colored build, the artist
requested a simpler system with no more than three colors: black, warm white, and one highly
saturated color. The active implementation uses `#090a08`, `#f4f0dd`, and `#c6ff00`. This is
recorded as a project requirement; it is not promoted to the long-term taste ledger until the
artist confirms the interpretation after seeing the revision.

**Source-supported facts:** Cooper Hewitt describes Swiss/International Typographic Style through
sans-serif typography, asymmetric layout, grid-based design, and photography; its Wim Crouwel note
describes the grid as a way to create visual order. Letterform Archive's study of
*Typografische Monatsblätter* identifies clear hierarchy, asymmetry, consistent strokes, and
disciplined grids in the Swiss tradition, while also documenting later pressure against rigid
modernist limits.

**Design inference:** use the grid and whitespace as the stable evidence layer, not as nostalgic
Swiss cosplay. The acid color marks selected/focused state and one structural interruption. Four
large Works windows make the operating-system metaphor immediately legible, while Order mode,
mobile, and reduced motion keep a conventional sequence. Artwork is monochrome in index states and
returns to source colour on hover or focus.

**Japanese implementation decision:** W3C JLREQ documents Japanese layout as its own set of
requirements rather than a Latin-text substitution problem. The website therefore uses explicit
Japanese sans fallbacks, language-specific weight/line-height, and `word-break: keep-all` for the
Works title; it no longer forces the Latin display compression onto Japanese. WCAG contrast is
evaluated against the background actually behind text, so acid text is never placed on warm paper,
and selected state is never communicated by color alone.

Sources: [Cooper Hewitt — A Harmony of Contrasts](https://www.cooperhewitt.org/2018/08/05/aharmonyofcontrasts/), [Cooper Hewitt — Gridnik](https://www.cooperhewitt.org/2013/11/26/gridnik/), [Letterform Archive — Legacies of Swiss Style, Part 1](https://letterformarchive.org/news/legacies-of-swiss-style-tyografische-monatsblatter/), [W3C JLREQ](https://www.w3.org/TR/jlreq/), [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [W3C Understanding Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color).

## What professors and curators need

**Source-supported fact:** RCA and UAL portfolio guidance emphasize selection, clarity, process,
context, and the applicant's own contribution; Yale and RISD requirements likewise make the
portfolio primary evidence in the cited application contexts. Requirements remain
programme-specific; UAL's current general guidance suggests a small selected group rather than a
universal project count.

**Active design heuristics, not admissions requirements:** until the actual programme is supplied,
the website uses two fast paths plus an archive:

1. A quick orientation: identity, artistic position, 4–6 strongest works as a starting default, and contact.
2. A focused project read: title, year, medium, concept, scale, role, collaborators/credits, documentation, and outcome.
3. Older or secondary work: reachable through an archive without weakening the selected sequence.

Sources: [RCA](https://www.rca.ac.uk/study/apply-to-study/portfolio-advice/), [UAL](https://www.arts.ac.uk/study-at-ual/apply/portfolio-advice), [Yale School of Art](https://www.art.yale.edu/apply/graduate-admission/portfolio-requirements), [RISD](https://www.risd.edu/admissions/graduate/apply-risd).

## 2026-07-29 evidence-architecture refresh

### Current admissions guidance

**Source-supported fact:** RCA's portfolio guidance, updated 4 March 2026, says to tailor the
portfolio to the programme, edit concisely, distinguish when finished work or process is expected,
and state the applicant's role in collaboration. It also asks applicants to make their position,
methods, values, and critical perspectives legible.

**Design inference:** CIBA should not add a generic “process” section to every work. The project
record should show the complete outcome first, then only the process evidence relevant to the
actual programme. Unknown programme requirements remain content debt, not invented rules.

Source: [RCA portfolio and video advice](https://www.rca.ac.uk/study/apply-to-study/portfolio-advice/).

### Official artist-site comparison

**Direct observations:**

- Hito Steyerl's official site separates projects, dated press, multilingual publications, a
  concise About statement, representation, and contact.
- Rafael Lozano-Hemmer's official archive supports date/title sorting and gives each project a
  title, year or series, encounter description, and detail route.
- Ryoji Ikeda's official site keeps a persistent taxonomy across works, exhibitions, performances,
  concerts, recordings, collaborations, publications, biography, and contact; project links carry
  medium labels such as installation, sound, film, performance, or publication.
- Ian Cheng's official site separates shows, selected documents, events, education, and rights
  information. Its JavaScript-only shell is not an accessibility model for this project.

**Design inference:** the reusable mechanism is a stable separation between work evidence and
practice context. CIBA's Home should remain identity → selected works → ordered index; detail pages
should explain one work; About/CV/contact should hold practice context. Press, exhibitions, or
writing should appear only after verified records exist. None of the compared sites' surfaces,
type, code, or navigation geometry is copied.

Sources: [Hito Steyerl](https://www.hitosteyerl.net/),
[Atelier Lozano-Hemmer projects](https://www.lozano-hemmer.com/projects.php?order=title),
[Ryoji Ikeda projects](https://www.ryojiikeda.com/project/new/),
[Ian Cheng](https://iancheng.com/shows).

### Drag-access audit

**Source-supported fact:** WCAG 2.2 SC 2.5.7 requires an operation that uses dragging to have an
equivalent simple-pointer method without dragging. W3C explicitly separates this requirement from
keyboard accessibility.

**Active audit decision:** keyboard arrows remain necessary, but are not sufficient by themselves.
Works supplies a click/tap Order mode, minimize/restore, and direct project links. Home and
Coursework must be checked for an equally discoverable simple-pointer route before delivery; a
visual-only drag affordance cannot be the sole way to reveal evidence.

Source: [W3C Understanding SC 2.5.7 — Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html).

### Open-source recheck

The official Astro blog example still supports typed content-collection architecture. Accessible
Astro Starter now documents Astro 6.1.1+, visible focus, landmarks, skip links, reduced-motion
preferences, and keyboard-accessible navigation. Bigger Picture is an MIT image/video gallery with
captions, keyboard navigation, focus management, responsive sources, and reduced-motion support,
but its maintainer limits current work to bug fixes and points to a fork.

**Architecture decision:** retain the current Astro 6 JSON content model and native video players.
Adopt the accessibility contracts, not a theme. Do not add Bigger Picture or another lightbox until
zooming is a verified portfolio requirement; it does not solve the bounded-window interaction and
would add a second navigation layer.

Sources: [Astro blog example](https://github.com/withastro/astro/tree/main/examples/blog),
[Accessible Astro Starter](https://github.com/incluud/accessible-astro-starter),
[Bigger Picture](https://github.com/henrygd/bigger-picture).

## Mechanisms extracted from the references

### Milk outside a bag of milk outside a bag of milk

**Source-supported fact:** the developer describes a psychedelic narrative, stylized pixel imagery
reflecting distorted perception, variable scenes, and an oppressive soundtrack. **Direct
observation:** local files were inspected read-only to study palette and motion behavior; no code,
images, fonts, or audio were copied.

Design inference: the useful mechanism is a stable reading plane in conflict with a selectively unstable subjective layer.

Active decision: the site does **not** use the game's extracted colors. The shell follows the
artist's explicit black / warm-paper / acid-green requirement, while essential text and controls
remain stable.

Source: [developer page](https://nikita-kryukov.itch.io/milk-outside-a-bag-of-milk-outside-a-bag-of-milk).

### Z.A.T.O.

**Source-supported fact:** the official page describes a linear visual novel set in a fictional
closed Soviet city, with no choices and explicit warnings for strong noise and flashing visuals.

Design inference: translate the linear emotional progression into truthful archival timestamps, status, and chapter structure. Do not reuse the setting, logo, dialogue, figures, or screen compositions. Flashing is excluded from the default website.

Source: [developer page](https://nopanamaman.itch.io/z-a-t-o-i-love-the-world-and-everything-in-it).

### Persona 5

**Source-supported fact:** Atlus's CEDEC report explains its restricted dominant color, central line
for eye guidance, changes of angle and brightness for hierarchy, and jointly designed character
motion/menu stills. A developer interview reports that menus respond without delay and continue
their animation after the state is available.

Design inference: borrow immediate feedback and thematic interaction verbs, not the red-black-white surface, battle wheel, silhouettes, type treatment, or wipes.

Sources: [Famitsu CEDEC report](https://www.famitsu.com/news/201711/13145540.html), [developer interview translation](https://personacentral.com/persona-5-interview-ui-design-sound-music/).

### Arknights industrial visual system

**Source-supported fact:** the official video archive organizes concept trailers, version PVs, CG,
world exploration, and character media under one system. This study did not claim to analyse a
representative sample of PV scene grammar.

Design inference: a persistent shell can unify varied art practices when its dates, status, project numbers, and credits are real. Decorative coordinates and copied HUD compositions are excluded.

Source: [official video archive](https://ak.hypergryph.com/archive/video).

### Backrooms and dreamcore

**Source-supported fact:** Backrooms scholarship connects the legend to liminal space, games,
nostalgia, and participatory digital folklore. MIT Press characterizes its thin originating
information and institutional everyday spaces as enabling repeated reinterpretation. Recent
Dreamcore research finds both darker/uncanny and warmer/comforting dimensions rather than one
fixed mood.

Design inference: use repetition plus one anomaly, and familiar-but-unlocatable memory, while keeping Home, ordered reading, focus, and escape routes permanently available.

Sources: [Backrooms study](https://journals.sagepub.com/doi/abs/10.1177/14614448241238395), [MIT Press](https://thereader.mitpress.mit.edu/backrooms-and-the-rise-of-the-institutional-gothic/), [Dreamcore study](https://journals.sagepub.com/doi/10.1177/02762374251356955).

### Rams, Bauhaus, Russian Constructivism, Wes Anderson

**Source-supported facts:** Vitsœ documents Rams's usefulness, understandability, honesty,
restraint, thoroughness, and longevity principles. The Bauhaus source supports typography as
structure; the MoMA source supports asymmetric and diagonal Constructivist book design. The Kodak
article supports a narrow observation about deliberate framing and graphic continuity in
*Asteroid City*, not a claim about all Wes Anderson films.

**Active decision:** use Rams as the dominant operating discipline, Bauhaus/Constructivist
typographic structure as a secondary grammar, and no more than one expressive emphasis mode. The
earlier 55/30/15 shorthand is a review heuristic, not a sourced fact or pixel quota.

Sources: [Vitsœ / Rams principles](https://www.vitsoe.com/eu/about/good-design), [Bauhaus typography](https://www.bauhaus.de/en/research/publications/bauhaus-typography/), [MoMA Constructivist Book Design](https://www.moma.org/interactives/exhibitions/2002/russian/5_pdfs/rowell.pdf), [Kodak on Asteroid City cinematography](https://www.kodak.com/en/motion/blog-post/asteroid-city/).

## Direct website studies

### ZUTOMAYO

**Direct observation:** overlapping absolute-positioned cards, move cursor, title bars, focus
ordering, and close/choice controls. A sample card was dragged to verify that spatial rearrangement
is real interaction.

**Active decision:** semantic project windows implemented independently with native pointer events,
keyboard arrows, Esc minimize, dock restore, filters, reset, a non-drag Order mode, and automatic
mobile/reduced-motion ordering. The five authored windows are approximately 410–460px wide inside
the 760px-high stage.

Source: [zutomayo.net](https://zutomayo.net/).

### The Art of Cinema

**Direct observation:** monumental type, duplicated glyphs inside clipped masks, scroll-linked
vertical letter rolls, restrained black/white typography, and a later field of scattered images.

**Active decision:** one project-title letter-roll tied to project progression and an independent
media field. The long loader, exact typeface, palette, copy, geometry, texture, and composition were
not reproduced; the six-axis comparison is recorded in the custom Skill's originality audit.

Source: [The Art of Cinema](https://www.theartofcinema.xyz/?ref=onepagelove).

## Accessibility and originality constraints

- Everything remains reachable without drag, hover, or animation.
- Mobile and reduced motion default to ordered reading; desktop offers Windows and Order.
- Reduced motion removes nonessential transforms, parallax, smooth scroll, and animated layout changes while preserving controls.
- Japanese headings receive language-specific font and line-breaking rules rather than inheriting Latin display compression.
- Acid green is paired with black, not warm paper; selection also has labels, borders, or position so color is never the only cue.
- Images require contextual alt text; video needs accessible controls and, for substantive speech, captions/transcripts.
- Copyright protects expression rather than abstract design ideas. All shipped imagery, type, sound, text, and transitions must be original or licensed.

Sources: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [W3C images](https://www.w3.org/WAI/tutorials/images/), [W3C media](https://www.w3.org/WAI/media/av/), [WIPO copyright FAQ](https://www.wipo.int/en/web/copyright/faq-copyright).

## Methodology and limits

The research addressed four questions: what a professor needs to verify quickly; how official
artist sites separate work evidence from practice context; which mechanisms can be abstracted from
the named references without copying expression; and which accessibility and maintenance
contracts apply to the implementation. The report links 35 unique institutional, official,
academic, developer, standards, and primary repository sources. Key sources were read as full
pages or repository documentation; observations from official sites were checked against their
visible information architecture.

The requested Firecrawl and Exa connectors were not available in this Codex environment during the
2026-07-29 refresh. The refresh therefore used direct web search and page reading, prioritizing
official pages, W3C guidance, and primary open-source repositories. This limits automated breadth,
not the provenance of the claims retained here. Admissions requirements remain programme-specific,
and collaborator roles, dates, rights, outcomes, and assignment briefs remain unknown unless the
artist supplies them.
