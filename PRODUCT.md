# CIBA Artist Portfolio

## Product

CIBA is a multilingual personal artist portfolio for professors, curators, and other readers who
need to understand the work without promotional framing. The site records works through concise
concept statements, factual metadata, images, and playable video evidence.

## Confirmed audience and task

- Primary audience: professors reviewing an individual art practice.
- Secondary audience: curators, collaborators, and the artist maintaining the archive.
- Primary task: move from a legible overview to verifiable project evidence quickly.
- Languages: Chinese, English, and Japanese.
- Platform: responsive web, with an editable Figma handoff maintained beside the code.

## Current content truth

- Existing public works: X.WHEEL, EMIDA, Wake Up, and Escape Project.
- This change adds one public work: University Coursework.
- University Coursework publishes only the fourteen files explicitly attached and assigned by the
  artist in this task, grouped as:
  - Blender: 10 supplied files.
  - Maya: 2 supplied files.
  - After Effects / Premiere Pro: 2 supplied files.
- Course names, assignment briefs, collaborators, grades, and exact dates were not supplied and
  must not be invented.
- All five explicitly assigned video files must remain directly playable in the browser.

## Brand commitments

- CIBA's interface uses no more than three principal colours: near-black, warm paper, and one
  high-saturation acid green.
- The visual system is internationalist, evidence-led, and deliberately restrained.
- Monumental typography may be expressive, but words must remain readable and language-specific.
- The desktop-window metaphor is functional: drag, focus order, reset, and responsive fallback.
- Reference sites may inform abstract interaction mechanisms only. Their code, imagery, typefaces,
  branding, and distinctive visual expression are not project assets.

## Behaviour commitments

- The home title changes with the current work while scrolling.
- `ESCAPE PROJECT` is composed as two semantic lines: `ESCAPE` then `PROJECT`.
- Redundant edition/archive metadata is removed from the home hero.
- University Coursework is a standalone project page with three large bounded desktop windows.
- Every supplied item appears once as a small media window within its correct large window.
- Pointer drag starts from a title bar, raises the active window, and remains bounded to its
  parent stage.
- Arrow keys move a focused title bar; Shift increases the step; Home resets the item.
- Video controls remain operable and never initiate dragging.
- On compact or coarse-pointer layouts, media follows semantic source order without overlap.
- Reduced-motion mode removes unnecessary transitions while preserving all state changes.

## Accessibility and quality bar

- Live text, language metadata, semantic headings, figures, and captions.
- Visible keyboard focus and controls of at least 44 CSS pixels where applicable.
- No information conveyed by acid green alone.
- Text contrast meets WCAG 2.2 AA.
- No horizontal overflow at 320 CSS pixels or at 400% zoom.
- Media alternative text describes visible evidence; captions provide factual context.
- Static build, type checks, automated behavioural checks, and real-browser interaction checks pass.

## Evidence and provenance

- Source media remain unchanged in `/Users/zhang/Documents/展示`.
- Deployable copies use ASCII filenames under
  `public/assets/projects/university-coursework/`.
- Source hashes and the final deployable allowlist are recorded in the implementation research
  report and automated checks. The same manifest records every unassigned file found beside the
  allowlist so exclusion is explicit rather than accidental.
