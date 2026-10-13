# AGENTS.md — Portfolio (React + Vite + Tailwind v4)

This file guides coding agents working in this repo. Follow it for all edits.

## 1. Project overview
- Single-page personal portfolio for James Ian Antonio.
- Stack: React 19.2.8, Vite 8.3, Tailwind CSS v4 (`@tailwindcss/vite`), Oxlint.
- Entry: `index.html` → `src/main.jsx` (StrictMode) → `src/App.jsx`.
- Layout: `src/App.jsx` renders `Navbar` + 6 anchor sections in fixed order:
  `Home, About, Tech, Certificates, Projects, Contacts` with `pt-24` offset for fixed nav.
- Sections are currently mostly placeholders (`"Content coming soon..."`); only `Navbar.jsx` has real logic.

## 2. Commands
- `npm run dev` — local dev (Vite HMR).
- `npm run build` — production build, verified working (2026-10-12, ~455ms, 23 modules).
- `npm run lint` — `oxlint` (not eslint). Config: `.oxlintrc.json`.
- `npm run preview` — preview `dist/`.
- No test runner, no TypeScript, no router, no state library.

## 3. File map
- `vite.config.js` — `plugins: [react(), tailwindcss()]`. Do not remove Tailwind plugin.
- `src/index.css` — single source of design tokens. Uses `@import "tailwindcss"`, `@theme` (`bg-light #F9F6EE`, `bg-dark #282828`, `primary`, `border-light/dark`), `@layer base/components` (`glass-nav`, `nav-link`, `animate-dropdown`). Prefer editing here over inline styles.
- `src/components/Navbar.jsx` — floating glass nav, theme toggle, desktop links + mobile dropdown, IntersectionObserver scroll-spy.
- `src/sections/*.jsx` — one component per anchor `id`. `id` must match `navItems` in `Navbar.jsx`.
- `public/assets/` — `profile-light.gif`, `profile-dark.gif` (used by Navbar). `src/assets/` is empty — do not add imports from there unless you move files.
- `public/favicon.svg`, `public/icons.svg`.

## 4. Conventions (must follow)
- JSX in `.jsx` files, ES modules, no TypeScript conversion without asking.
- Tailwind v4 syntax: `@theme` tokens, `dark:` variant driven by `.dark` class on `document.documentElement`. Do not switch to `media`-based dark mode.
- Theme persistence key: `localStorage('theme') = 'dark' | 'light'`, fallback to `prefers-color-scheme`. Toggle must update both state and `documentElement.classList`.
- Nav: anchor `href="#id"` + `e.preventDefault()` + `el.scrollIntoView({behavior:'smooth'})`. Keep `role="navigation"`, `aria-label`, `aria-expanded/controls/pressed`.
- Scroll-spy: single `IntersectionObserver` with `rootMargin: '-20% 0px -60% 0px', threshold: 0.1`. Keep observer disconnect cleanup.
- Mobile menu: click-outside via `mousedown` listener gated on `mobileMenuOpen`, with `menuRef` + `buttonRef`. Keep cleanup.
- Reduced-motion support in `index.css` must be preserved.
- Oxlint rules: `react/rules-of-hooks: error`, `react/only-export-components: warn`. Zero `setState`-in-effect warnings preferred.

## 5. Known issues — do not replicate
1. **Non-reactive theme in sections** (`src/sections/*.jsx:2`, `src/App.jsx` pattern): each section reads `document.documentElement.classList.contains('dark')` during render, so it never re-renders on toggle. Fix with a shared `useTheme()` hook or context — do not copy the current pattern to new components.
2. **Hardcoded active color `#000000`** (`src/components/Navbar.jsx:118,189`): invisible against dark backgrounds. Use theme-aware token or `dark:` class instead.
3. **Unused vars** (`src/components/Navbar.jsx:80-81`): `mutedColor`, `hoverColor` trigger `oxlint/no-unused-vars`. Remove or use them.
4. **Inline-style theme colors + onMouseEnter/Leave hover** (`src/components/Navbar.jsx:179-201`): prefer Tailwind `dark:` + `hover:` utilities and tokens from `index.css`.
5. **Placeholder content**: About/Tech/Certificates/Projects/Contacts contain no real content. When implementing, keep `section > div.max-w-3xl` structure and `min-h-screen px-6 py-20` rhythm unless redesigning deliberately.

## 6. Agent workflow
1. Read `src/App.jsx`, `src/components/Navbar.jsx`, `src/index.css` before structural changes.
2. Run `npm run lint` and `npm run build` after changes; fix new warnings.
3. Keep edits minimal; prefer editing `src/index.css` + existing components over new dependencies.
4. Do not add `node_modules/`, `dist/` to git; respect `.gitignore`.
5. Do not invent URLs, contact info, or credentials for placeholder sections — use props/data files or leave TODO.
