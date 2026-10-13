# SKILLS.md — Skills Inventory (Project + Portfolio Content)

Generated 2026-10-12 from static analysis, `oxlint`, and `vite build` of this repo.

## 1. Analysis summary
- **Type:** Single-page React portfolio, early scaffold stage.
- **Working:** dev/build pipeline, floating glass Navbar, dark/light toggle with persistence, scroll-spy active links, mobile dropdown with click-outside, reduced-motion support.
- **Scaffold-only:** Home hero (name + tagline), About / Tech / Certificates / Projects / Contacts are `"Content coming soon..."` placeholders.
- **Health:** `vite build` passes (23 modules). `oxlint` passes with 3 warnings: 2 unused vars (`mutedColor`, `hoverColor` in `src/components/Navbar.jsx:80-81`), 1 `set-state-in-effect` (`src/components/Navbar.jsx:21`).

## 2. Technical skills demonstrated (with evidence)
| Skill | Level in this repo | Evidence |
|---|---|---|
| React 19 (hooks, composition) | Applied | `src/App.jsx:1-25`, `useState/useEffect/useRef` in `src/components/Navbar.jsx:1-77` |
| Vite 8 project setup | Applied | `vite.config.js:1-7`, `package.json:6-11`, `index.html:11` |
| Tailwind CSS v4 theming | Applied | `src/index.css:1-10` (`@import`, `@theme`), `glass-nav` / `nav-link` components |
| Responsive design | Applied | `hidden lg:flex` vs `lg:hidden` split in `src/components/Navbar.jsx:107,145` |
| Dark mode (class strategy + persistence) | Applied, needs refactor | `localStorage('theme')` + `prefers-color-scheme` in `src/components/Navbar.jsx:20-27,72-77` |
| Scroll-spy navigation | Applied | `IntersectionObserver` in `src/components/Navbar.jsx:29-48` |
| Accessible navigation | Partial | `role`, `aria-label/expanded/controls/pressed` in `src/components/Navbar.jsx:89-171`; sections lack landmarks/labels |
| Lint hygiene (Oxlint) | Partial | `.oxlintrc.json:1-8`; 3 warnings open (see §1) |

## 3. Missing / placeholder skills (do not claim as done)
- No real About bio, Tech stack grid, project cards/case studies, certificate list, or contact form/links — all placeholders.
- No data fetching, routing, forms validation, testing, CI, or deployment config.
- No TypeScript, no unit/integration tests, no SEO meta (`index.html:7` title is just `"portfolio"`).
- Theme is not reactive outside Navbar (sections read DOM class at render) — see `AGENTS.md §5`.

## 4. Recommended next skills to add (priority order)
1. **Fix reactive theming:** create `src/hooks/useTheme.js` (or context) returning `{ isDark, toggleTheme }`; replace per-file `document...contains('dark')` reads and hardcoded `#000000` active color.
2. **Fill Tech section:** stack grid (React, Vite, Tailwind, JS/TS, Git) with icons from `public/icons.svg`; link each to a project.
3. **Fill Projects section:** 3–6 cards (title, description, stack tags, repo/live links, screenshot). Extract to `src/data/projects.js`.
4. **Fill Certificates / About / Contacts:** certificate list with issuer/date/verify link; bio + photo (`public/assets/profile*.gif`); contact links + `mailto:` with accessible labels.
5. **Polish:** per-section `<h2>` hierarchy + `aria-labelledby`, page `<title>` + meta description, favicon, fix the 3 oxlint warnings, remove inline hover handlers in favor of Tailwind `dark:`/`hover:`.
6. **Quality gates:** add a smoke test or `npm run lint && npm run build` CI step; consider TypeScript or PropTypes if the portfolio grows.

## 5. How to update this file
- When a section stops being a placeholder, move its row from §3 to §2 with file:line evidence.
- Keep claims verifiable: every "Applied" row needs a `path:line` reference a reviewer can open.
