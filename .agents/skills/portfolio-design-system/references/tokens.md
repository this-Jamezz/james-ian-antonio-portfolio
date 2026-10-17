# Design Token Reference

Complete reference for every token, class, and CSS component in the portfolio.
Read this file when you need exact values — the main SKILL.md summarizes the rules.

---

## CSS Custom Properties (`@theme` in `src/index.css`)

```css
--font-montserrat: "Montserrat", sans-serif;
--font-sans: "Montserrat", ui-sans-serif, system-ui, sans-serif;

--color-bg: #fafaf8;
--color-primary: #000000;
--color-accent: #00008b;
--color-border: rgba(0, 0, 0, 0.08);
```

## Tailwind → Token Mapping

| Tailwind Class | CSS Variable | Hex / Value |
|---|---|---|
| `bg-bg` | `--color-bg` | `#fafaf8` |
| `text-primary`, `bg-primary` | `--color-primary` | `#000000` |
| `text-accent`, `bg-accent` | `--color-accent` | `#00008b` |
| `border-border` | `--color-border` | `rgba(0,0,0,0.08)` |
| `font-montserrat` | `--font-montserrat` | Montserrat |

## CSS Component Classes (`@layer components`)

### `.glass-nav`
```css
.glass-nav {
  @apply bg-white/70 backdrop-blur-[20px] border border-border
    shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)];
}
```

### `.nav-link`
```css
.nav-link {
  @apply relative font-medium transition-colors duration-200;
}
.nav-link::after {
  content: '';
  @apply absolute bottom-[-4px] left-0 h-[2px] bg-accent transition-all duration-300;
  width: 0;
}
.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}
```

### `.animate-dropdown`
```css
.animate-dropdown {
  animation: dropdown 0.25s ease-out;
}
@keyframes dropdown {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### `.animate-enter`
```css
.animate-enter {
  opacity: 0;
  animation: enter 0.7s ease-out forwards;
}
@keyframes enter {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

## Shadow Scale

| Name | Value | Usage |
|---|---|---|
| Nav shadow | `0_4px_24px_rgba(0,0,0,0.06), 0_1px_3px_rgba(0,0,0,0.04), inset_0_1px_0_rgba(255,255,255,0.5)` | `.glass-nav` only |
| Card shadow | `0_8px_24px_rgba(0,0,0,0.08), 0_2px_6px_rgba(0,0,0,0.04)` | `ProjectPreviewCard` |
| Hover shadow | `shadow-lg` (Tailwind default) | Card/button hover |
| Accent glow | `shadow-accent/25` | Accent button hover |

## Breakpoint Behavior

| Breakpoint | Navigation | Grid Columns | Hero Layout |
|---|---|---|---|
| < `md` (768px) | Mobile hamburger | 1 column | Stacked (text top, image bottom) |
| `md`–`lg` | Mobile hamburger (hidden < lg) | 2 columns | Side-by-side |
| ≥ `lg` (1024px) | Full desktop links | 2–3 columns | Side-by-side |

## Z-Index Scale

| Layer | Value | Element |
|---|---|---|
| Navigation | `z-50` | Fixed floating nav |
| Mobile dropdown | `z-50` | Dropdown menu |
| Hero content | `z-10` | Text over decorative elements |

## Icon Conventions

- Nav & UI icons: inline `<svg>`, `w-4 h-4` or `w-5 h-5`, `fill="none" stroke="currentColor"`, `strokeWidth={2}`, `strokeLinecap="round" strokeLinejoin="round"`
- Tech icons: `<img>` from CDN, `h-10 w-10 object-contain`, with `onError` fallback to text glyph
- Social icons: `<img>` from `/assets/*.svg`, `h-6 w-6`
- Always include `aria-hidden="true"` on decorative SVGs

