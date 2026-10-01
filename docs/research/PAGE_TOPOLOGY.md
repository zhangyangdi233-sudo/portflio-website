# Page topology — 2026-07-18 redesign

The site uses one stable shell and one narrative mode per page. Home is **cinematic**; Works is
**spatial**. The same three interface colors and metadata grammar connect them, but their anomaly
mechanisms never compete on the same page.

## Global shell

1. Persistent utility header: 56px desktop; 96px two-row mobile, with identity/languages above navigation.
2. Skip link and visible keyboard focus.
3. Near-black canvas, warm-paper text and rules, acid-green only for current state or one signal.
4. Compact footer: identity, verified contact/social route and location.

Interaction model: conventional links only. The header never hides, morphs, or blocks content.

## Home — cinematic mode

1. **Opening title / 100svh**
   - Monumental CIBA title, short localized artistic position and one scroll cue.
   - Double-glyph title tracks enter once; the content is readable before motion.
2. **Selected-work preface / editorial grid**
   - Explains what is selected and how to read it in no more than two short paragraphs.
3. **Selected-work sequence / pinned desktop stage**
   - Four verified works progress through scroll.
   - One active title, one summary, truthful year/medium/status, and a moving field of project media.
   - Images drift laterally and vertically; they never become draggable on Home.
4. **Artist position / one large statement**
   - Returns the page to normal document flow.
5. **Ordered index / all projects**
   - Conventional links expose every project, year and medium without animation or hover.
6. Footer.

Interaction model: scroll-driven title/media progression on desktop; ordinary ordered flow on
mobile and under reduced motion. The single anomaly is the clipped title-glyph roll.

## Works — spatial mode

1. **Workspace mast / compact**
   - `WORKS / DESKTOP`, one-sentence instruction and visible object count.
   - It consumes no more than approximately 22% of the first desktop viewport.
2. **Desktop toolbar**
   - All / Featured / Archive; Scatter / List; Reset; live count.
3. **Project desktop**
   - Desktop: four overlapping, clearly recognizable computer windows visible immediately.
   - Each window has an acid title bar, black status mark, title/index, close-to-dock control,
     warm-paper content, project media, year/medium/status, summary, and explicit Open action.
   - Bring-to-front, bounded title-bar drag, keyboard movement, close/minimize and dock restore.
4. **Dock**
   - Every matching project has a persistent restore/focus control.
5. **Ordered list state**
   - Desktop List control and all viewports below 900px use one-column semantic reading order.
6. Footer.

Interaction model: drag + click + keyboard on desktop; click and ordered links on mobile. The single
anomaly is the movable window field. Every action has a non-drag alternative.

## Project detail

1. Header and project identity.
2. Year, medium, role/scale/credits where known.
3. Complete primary media and captions.
4. Short concept and production context.
5. Verified external actions only.
6. Next project and footer.

Project detail pages remain deliberately calm. Draft records with `published: false` stay in source
for editing and rollback, but never generate public index entries or detail routes.
