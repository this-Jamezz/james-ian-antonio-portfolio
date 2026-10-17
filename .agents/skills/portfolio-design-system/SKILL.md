---
name: portfolio-design-system
description: >-
  Enforces a consistent, minimal, techy design language across the portfolio.
  Use this skill when creating or editing any section, component, or page of
  the portfolio — it defines the exact tokens, surface recipes, typography
  scale, spacing rhythm, motion rules, and "techy catch" micro-details every
  element must follow.
---

# Portfolio Design System — Minimal × Techy

> **Philosophy:** Strip everything to what matters — clean type, generous white
> space, glass surfaces — then inject *small, engineering-flavored* details
> (browser-chrome cards, code-style labels, structured data grids, subtle SVG
> ornaments) so the site *feels* like it was built by a developer, not just
> designed for one.

---

## 1. Color Tokens (light mode)

Use **only** these tokens from `src/index.css @theme`. Do not invent ad-hoc colors.

| Token | Value | Usage |
|---|---|---|
| `bg` | `#fafaf8` | Page background, section backgrounds |
| `primary` | `#000000` | Headings, body text, primary buttons |
| `accent` | `#00008b` | Links, CTAs, active states, badges, accent underlines |
| `border` | `rgba(0,0,0,0.08)` | Card edges, dividers, subtle outlines |

### Opacity Scale for Text

- Full heading: `text-primary`
- Body / description: `text-primary/70`
- Muted / meta: `text-primary/60`
- Ghost / hint: `text-primary/40–50`

> Never use raw hex values in JSX. Always use the Tailwind token classes
> (`text-primary`, `bg-accent`, `border-border`, etc.).

---

## 2. Typography

**One typeface: Montserrat** (`--font-sans` in `@theme`).

| Role | Classes | Example |
|---|---|---|
| Hero headline | `text-4xl md:text-6xl font-black tracking-tight` | "I solve real-life problems" |
| Section title | `text-4xl md:text-5xl font-semibold tracking-tight text-primary` | "Where I've worked" |
| Section label | `text-xs font-semibold uppercase tracking-widest text-accent` | "EXPERIENCE" |
| Section subtitle | `text-sm md:text-base leading-relaxed text-primary/60 max-w-2xl` | "Grouped the way I actually use them…" |
| Card title | `font-bold text-primary` (base size) | "Project One" |
| Card meta / issuer | `text-sm text-primary/60` | "Issuing Organization" |
| Body / description | `text-sm leading-relaxed text-primary/70` | Card descriptions |
| Tag / pill text | `text-xs font-medium text-primary/70` | "React", "Node.js" |
| Nav link | `text-sm font-medium` (via `.nav-link`) | "Home", "Projects" |
| Footer | `text-sm text-primary/60` | "© 2026 James Ian Antonio" |

### Rules
- **No `font-light` or `font-thin`** — the lightest weight used is `font-medium`.
- **No second typeface** unless a monospace accent is introduced as a token in `@theme`.
- Headings never exceed `text-6xl`. Section titles always `text-4xl md:text-5xl`.

---

## 3. Spacing Rhythm

| Context | Pattern |
|---|---|
| Between sections | `py-24` (96px) |
| Page horizontal gutter | `px-6` (24px) |
| Scroll offset for fixed nav | `scroll-mt-24` on each `<section>` |
| Content container | `mx-auto w-full max-w-5xl` |
| Label → Title gap | `mt-3` |
| Title → Subtitle gap | `mt-3` |
| Subtitle → Content gap | `mt-10` |
| Grid gap | `gap-6` (cards), `gap-8` (projects), `gap-2` (tags/pills) |
| Card internal padding | `p-6` |

### Section Skeleton (copy-paste)

Every non-hero section must use this exact shell:

```jsx
<section id="section-id" className="min-h-screen scroll-mt-24 px-6 py-24 flex items-center justify-center">
  <div className="mx-auto w-full max-w-5xl">
    <p className="text-xs font-semibold uppercase tracking-widest text-accent">Label</p>
    <h2 className="mt-3 text-4xl font-semibold tracking-tight text-primary md:text-5xl">
      Title
    </h2>
    {/* Optional subtitle */}
    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary/60 md:text-base">
      Subtitle text.
    </p>
    {/* Content starts here — mt-10 from last header element */}
    <div className="mt-10">
      {/* ... */}
    </div>
  </div>
</section>
```

---

## 4. Surface Recipes

### Glass Card (default for all cards)

```
rounded-2xl border border-border bg-white/60 backdrop-blur-md
```

- Use `bg-white/60` everywhere — not `/70` or `/80`. One opacity.
- Hover: `hover:-translate-y-1 hover:shadow-lg transition-all duration-200`

### Glass Nav

Already defined as `.glass-nav` in `index.css`. Do not recreate inline.

### Pill / Tag

```
rounded-full border border-border bg-white/60 px-3 py-0.5 text-xs font-medium text-primary/70
```

### Primary Button

```
rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white
transition-all duration-200
hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg
active:translate-y-0 active:scale-95
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
```

### Accent Button (CTA)

```
rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white
transition-all duration-200
hover:-translate-y-0.5 hover:bg-accent/85 hover:shadow-lg hover:shadow-accent/25
active:translate-y-0 active:scale-95
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
```

### Ghost / Outline Button

```
rounded-xl border border-primary/20 bg-white/60 backdrop-blur-md px-6 py-3
text-sm font-bold text-primary
transition-all duration-200
hover:-translate-y-0.5 hover:bg-white
active:translate-y-0 active:scale-95
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
```

---

## 5. Shapes

| Element | Radius |
|---|---|
| Cards, containers, project previews, mobile menu | `rounded-2xl` |
| Buttons, inputs, social boxes, icon badges | `rounded-xl` |
| Pills, tags, year badges | `rounded-full` |
| Profile picture | `rounded-full` |

> **Never mix** — no `rounded-lg`, `rounded-md`, or `rounded-3xl` on new elements.

---

## 6. Motion

### Principles
- Motion is **earned** — elements move only on user interaction or first appearance.
- Respect `prefers-reduced-motion: reduce` (already in `index.css`).
- No looping animations except loading spinners.

### Duration Tiers

| Tier | Duration | Usage |
|---|---|---|
| Micro | `duration-200` | Hover states, color transitions, button presses |
| Standard | `duration-300` | Page-level transitions (bg color), nav state changes |
| Decorative | `duration-500` | Image parallax shifts, card float decorations |
| Enter | `0.7s ease-out` | `.animate-enter` scroll-reveal (16px translateY + opacity) |

### Hover Vocabulary
- **Lift:** `hover:-translate-y-0.5` (buttons) or `hover:-translate-y-1` (cards)
- **Scale:** `hover:scale-[1.02]` or `hover:scale-[1.015]` — never more than 4%
- **Shadow:** `hover:shadow-lg` for cards, `hover:shadow-accent/25` for accent CTAs
- **Press:** `active:scale-95 active:translate-y-0`

---

## 7. The Techy Catch — Signature Details

These are the micro-details that make the portfolio feel like a developer built it.
**Every new section or component should incorporate at least one** from this list:

| Detail | Where Used / Where to Use | Implementation |
|---|---|---|
| **Browser chrome dots** | Project cards | Three colored dots (`red-400`, `amber-400`, `green-400`) in a `border-b` title bar |
| **SVG squiggle underline** | Hero "at scale" text | `<svg>` with a hand-drawn bezier `<path>`, `stroke-accent`, `strokeWidth={4}`, `vectorEffect="non-scaling-stroke"` |
| **Accent underline animation** | Nav links | `.nav-link::after` grows `width: 0 → 100%` on hover/active |
| **Structured data grid** | Experience timeline | Grid rows with period aligned right, border dividers — like a CLI table |
| **Monospace-feel labels** | Section labels | `text-xs font-semibold uppercase tracking-widest` mimics terminal output |
| **Icon fallback glyphs** | Tech icons | When an icon fails to load, show a styled text glyph (`REST`, `JWT`) in a bordered box |
| **Staggered enter** | Home hero elements | `animate-enter` with incremental `[animation-delay:Xms]` |
| **Accent offset shadow** | Hero portrait | A colored `bg-accent/10` div shifted `translate-x-3 translate-y-3` behind the image |
| **Check mark on active** | Mobile nav | Active section shows a `✓` SVG aligned right |

### Ideas for New Sections (use these to maintain the techy feel)
- **Typing caret** on hero tagline (CSS `border-right` blink animation on a `<span>`)
- **`console.log` style** metadata in the About section (e.g., `> location: "Philippines"`)
- **Commit-graph dots** on the experience timeline (small accent-colored circles on a vertical line)
- **`grep`-style highlights** when hovering tech items (accent background flash)
- **Terminal prompt `$`** prefix on section labels (e.g., `$ certificates`)

---

## 8. Accessibility Checklist

Every component must satisfy:

- [ ] All `<a>` links have visible focus rings: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`
- [ ] Interactive images have `alt` text; decorative images use `alt=""` + `aria-hidden="true"`
- [ ] `role="navigation"` and `aria-label` on nav elements
- [ ] `aria-expanded` and `aria-controls` on toggles
- [ ] `::selection` uses accent bg + white text (already global)
- [ ] Color contrast: `primary` on `bg` = #000 on #fafaf8 = 18.8:1 ✅ / `accent` on white = #00008b on #fff = 8.5:1 ✅
- [ ] Reduced motion: all keyframe animations + transitions respect `prefers-reduced-motion`

---

## 9. File Conventions

- New sections → `src/sections/<Name>.jsx`, one component per file
- New reusable components → `src/components/<Name>.jsx`
- All CSS tokens and utility components → `src/index.css` (`@theme`, `@layer components`)
- Static assets → `public/assets/` (referenced as `/assets/filename.ext`)
- Imported assets → `src/assets/` (referenced via ES import)
- No inline `style={{}}` for theme colors — use Tailwind classes only
- No new fonts, no new npm dependencies for styling

---

## 10. Quick Preflight Checklist

Before shipping any component or section:

1. ✅ Uses the **section skeleton** (spacing, container, header trio)
2. ✅ All surfaces use `bg-white/60` (not `/70` or `/80`)
3. ✅ Buttons follow the exact **button recipe** (primary / accent / ghost)
4. ✅ At least **one techy detail** from §7
5. ✅ Tags/pills use the **pill recipe**
6. ✅ No new border-radius values (only `2xl`, `xl`, `full`)
7. ✅ Hover uses the **hover vocabulary** (lift, scale, shadow, press)
8. ✅ Focus rings on all interactive elements
9. ✅ `npm run lint` passes with no new warnings
10. ✅ `npm run build` succeeds

---

*For the full token reference and detailed CSS component definitions, see
[references/tokens.md](./references/tokens.md).*

