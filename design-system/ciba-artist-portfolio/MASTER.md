# CIBA Design System — Signal Index / Acid Proof

> This is the UI/UX baseline for the website and Figma handoff. Project facts remain in
> `src/content/projects/*.json`; implementation tokens remain in `src/content/art-direction.json`.
> The long-term decision grammar lives in `skills/ciba-art-direction/`.

---

**Project:** CIBA Artist Portfolio
**Curated:** 2026-07-17 from UI/UX Pro Max checks, portfolio research, and CIBA's explicit taste signals
**Category:** Professor-facing artist portfolio / editorial-spatial archive

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Stable field / surface | `#090A08` | `--art-night`, `--art-surface` |
| Warm-paper ink / rule | `#F4F0DD` | `--art-ink`, `--art-muted`, `--art-rule` |
| Focus / selected / interruption | `#C6FF00` | `--art-oxide`, `--art-cyan` |

**Color rule:** the interface has exactly three base values. Transparency may create hierarchy but
not another hue. Acid green appears against black or holds black text; never place acid text on
warm paper. State always has a label, outline, or position cue in addition to color. Project
imagery keeps its native color on detail pages and is monochrome in the portfolio index.

### Typography

- **Display:** heavy neutral grotesk for Latin text; monumental scale, tight tracking, complete words.
- **CJK display:** Japanese/Chinese system sans with language-specific weight, line-height, and line breaking.
- **Editorial:** readable multilingual sans for statements and concepts.
- **UI:** neutral sans serif for navigation and controls.
- **Metadata:** mono for year, medium, role, status, filters, and system hints.
- **Runtime stacks:** use the system-font stacks in `src/content/art-direction.json`; do not add a
  network font dependency unless its license, Japanese coverage, loading strategy, and fallback are verified.

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Depth and edge treatment

| Level | Value | Usage |
|-------|-------|-------|
| Hairline | `1px solid color-mix(...)` | Archive divisions and metadata |
| File lift | `8px 8px 0 rgba(0,0,0,.34)` | Movable project windows only |
| Active lift | `12px 12px 0 color-mix(...acid...)` | Focused desktop window |
| Blur | `14–18px` backdrop blur | Sticky system bars only; never over artwork |

---

## Component Specs

### Buttons

```css
.button {
  min-height: 44px;
  border: 1px solid var(--art-rule);
  border-radius: 0;
  background: transparent;
  color: var(--art-ink);
  transition: color 180ms ease, background 180ms ease, border-color 180ms ease;
  cursor: pointer;
}

.button:hover,
.button[aria-pressed="true"] {
  border-color: var(--art-cyan);
  background: color-mix(in srgb, var(--art-cyan) 12%, var(--art-surface));
}

.button:focus-visible {
  outline: 2px solid var(--art-cyan);
  outline-offset: 3px;
}
```

### Cards

```css
.work-window {
  border: 1px solid var(--art-ink);
  border-radius: 0;
  background: var(--art-surface);
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.34);
}

.work-window.is-active {
  border-color: var(--art-oxide);
}
```

### Inputs

```css
.input {
  min-height: 44px;
  padding: 10px 12px;
  border: 1px solid var(--art-rule);
  border-radius: 0;
  background: var(--art-night);
  color: var(--art-ink);
  font-size: 16px;
}

.input:focus-visible {
  border-color: var(--art-cyan);
  outline: 2px solid var(--art-cyan);
  outline-offset: 2px;
}
```

### Project evidence

Every selected work exposes title, year, medium, concept, role, scale or encounter format,
credits, representative documentation, and a next step. Unknown facts are content debt and must
never be fabricated. Full project reading cannot depend on hover, drag, or animation.

---

## Style Guidelines

**Style:** Internationalist evidence index with one acid proof mark

**Keywords:** professor-readable, asymmetric grid, warm paper, near-black, acid signal,
multilingual sans, ordered evidence, compact movable windows

**Audience:** professors, curators, collaborators, and viewers encountering CIBA's practice for the first time

**Balance:** 70% stable reading, 20% page-specific narrative shell, 10% one anomaly mechanism.
Immediate state feedback comes before animation. No flashing is part of the default system.

### Page Pattern

**Pattern name:** Evidence first, atmosphere second

- **30-second path:** identity → artistic position → strongest works → contact.
- **2-minute project path:** concept → encounter format → contribution → documentation → credits/outcome.
- **Home:** cinematic mode; one scroll-linked glyph roll tied to project changes.
- **Works:** spatial mode; draggable windows plus Scan mode, keyboard movement, minimize/restore, and mobile ordering.
- **Detail/About:** editorial archive mode; native artwork color and stable evidence hierarchy.

---

## Anti-Patterns (Do NOT Use)

- ❌ Copying named references' assets, exact palettes, fonts, layouts, characters, logos, or transitions
- ❌ Stacking multiple anomaly mechanisms on one page
- ❌ Decorative coordinates, status labels, or industrial metadata that are not true
- ❌ Hiding project facts behind hover, drag, animation, or desktop-only interaction
- ❌ Mood filters that prevent a professor from seeing the artwork itself

### Additional Forbidden Patterns

- ❌ **Low contrast essential text** — target WCAG AA for body copy and controls
- ❌ **Invisible focus** — use the acid focus ring consistently
- ❌ **Acid text on warm paper** — this pair does not provide readable text contrast
- ❌ **Latin display rules forced onto Japanese** — use CJK-specific weight, line-height, and wrapping
- ❌ **Small targets** — interactive targets are at least 44×44 CSS px where practical
- ❌ **Motion-only meaning** — preserve state and content under `prefers-reduced-motion`
- ❌ **Unlicensed reference material** — ship only original or appropriately licensed media, type, sound, and texture

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] Identity, strongest work, and contact route are understandable in 30 seconds
- [ ] Role, scale/encounter format, credits, and representative media are present or documented as content debt
- [ ] Every control works without hover and every work is readable without drag
- [ ] Clickable controls communicate affordance and use immediate state feedback
- [ ] Body copy and control contrast meet the intended WCAG AA target
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 390px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
- [ ] All project images, fonts, audio, texture, and motion expressions are original or licensed
