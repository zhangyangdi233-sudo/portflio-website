# KineticHeading specification

## Overview

- Target: home cinematic project titles and Works hero title.
- Interaction model: scroll-linked active-project change on home; entrance-only on Works.
- Research evidence: dated direct observation in `../BEHAVIORS.md`; source and evidence class in
  `../PROVENANCE.md`. Third-party screenshots are local-only comparison material and never ship.

## Structure

- Preserve one meaningful heading/aria label.
- Split visible text into words and letters.
- Each visible letter mask contains an original glyph and an `aria-hidden` duplicate glyph.
- Do not expose duplicated characters to screen readers.

## Target styles

- display font: heavy grotesk/system black
- desktop home size: `clamp(5rem, 11vw, 9.5rem)`
- mobile home size: `clamp(3.4rem, 17vw, 5.2rem)`
- line-height: 0.84–0.9
- letter mask: inline-block; overflow: hidden; height: 1em
- letter roll: grid with two 1em rows; will-change: transform
- background: near-black; foreground: warm paper; one rare acid-green signal accent

## State transition

- Outgoing glyphs: `translateY(-100%)`, 240–300ms.
- Incoming glyphs: from `translateY(100%)` to 0, 400–480ms.
- Stagger: total 160–220ms per title.
- Summary follows with 16px vertical movement and opacity, 320–420ms.
- Scroll scrubbing controls which project is active; it does not continuously shake glyphs.

## Responsive behavior

- Desktop: title may extend near the viewport edges but must retain the final glyph.
- Mobile: split long titles at word boundaries; never rely on clipped horizontal overflow.
- Japanese/Chinese: segment by grapheme, not ASCII letter assumptions.

## Reduced motion

- Replace letter rolls with an immediate text swap or a 100ms crossfade.
- Do not pin a user in a long scrub sequence solely to reveal content.
