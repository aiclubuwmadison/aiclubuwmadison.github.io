# AGENTS.md

Architectural, workflow, and convention guidelines for the AI@UW website repository.

This is the **canonical** agent instructions file. Other assistant entrypoints (e.g. `CLAUDE.md`) should defer here.

---

## Commands

| Script | Purpose |
|--------|---------|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve the built output for local verification |
| `npm run lint` | ESLint (flat config in `eslint.config.js`) |

- **Node:** 20+ recommended (matches CI).
- **No test runner** is configured.
- Prefer `npm ci` in CI-like environments; `npm install` is fine locally.

---

## Architecture & Conventions

### Frontend Stack

Vite + React 19 SPA for the AI@UW club site:

| Layer | Choice |
|-------|--------|
| Core | React 19, Vite 8 |
| Routing | `react-router-dom` v7 (`BrowserRouter`) |
| UI | `lucide-react` icons; hand-rolled mobile nav (no UI component library) |
| Language | JSX only (no TypeScript) |
| Fonts | Space Grotesk, Instrument Serif, Space Mono (Google Fonts via `index.html`) |
| Styling | Vanilla CSS only — co-located `.css` next to each `.jsx` |

Entry: `src/main.jsx` → `src/App.jsx`.

**Do not** introduce Tailwind, CSS-in-JS, or a UI kit unless the user explicitly requests it.

### Project layout

```text
src/
├── main.jsx                 # Entry + SPA ?redirect= shim
├── App.jsx                  # Router, lazy routes, ScrollToTop
├── App.css                  # Design tokens + shared “atmos” styles
├── index.css                # Global body / #body-wrapper
├── components/              # Pages + Nav + Footer (flat; sibling .css)
├── constants/
│   └── nav.js               # Shared NAV_ITEMS for Nav + Footer
└── utils/
    └── themeTransition.js   # View Transitions circular theme reveal

public/
├── CNAME                    # ai.cs.wisc.edu
├── logo.svg
└── images/                  # portraits/, seminars/, logos
```

Root-level `images/` and unused `public/fonts/` assets are legacy — **do not** use them for new work. Prefer `public/images/...`.

### Routing

`App.jsx` uses `BrowserRouter` with **lazy-loaded** page components and a shared `Suspense` fallback (`.atmos-route-loading`).

| Path | Component | Notes |
|------|-----------|--------|
| `/` | `About` | Home |
| `/about` | → `/` | `Navigate` replace |
| `/involvement` | `Involvement` | “Get Involved” |
| `/leadership` | `Leadership` | |
| `/contact` | `Contact` | |
| `/seminars` | `Seminars` | Nav label: **Events** |
| `/projects` | `Projects` | |
| `/resources` | `Resources` | |
| `/pitch` | `PitchBuilder` | Not `/pitchbuilder` |
| `/sandbox` | `Sandbox` | |

Conventions:

- `<Nav />` is rendered **once** outside `<Routes>`.
- Every route renders `<Footer />` inline: `<><Page /><Footer /></>`.
- Shared nav links live in `src/constants/nav.js` (`NAV_ITEMS`) — keep **Nav** and **Footer** in sync via that constant.

#### Adding a page

1. Create `src/components/NewPage.jsx` + `NewPage.css`.
2. `lazy(() => import(...))` in `App.jsx`.
3. Route: `element={<><NewPage /><Footer /></>}`.
4. Add to `NAV_ITEMS` if it should appear in chrome.
5. Set `document.title` in a mount `useEffect` (pattern: `'… | AI@UW'`).
6. Root wrapper: `className="atmos-root atmos-<name>"` for theme tokens.

### Styling & Design

“**Atmospheric Modern**” — serif display titles, mono eyebrows, Badger red accent, glass chrome, soft shadows.

- Design tokens: `src/App.css` (`:root` and `[data-theme="dark"]`).
- Prefer CSS variables (`--atmos-*`, `--type-*`, `--motion-*`) over hard-coded colors.
- Shared primitives: `.atmos-shell`, `.atmos-page-hero*`, `.atmos-btn-primary`, scroll-reveal classes.
- Page-specific classes often use short prefixes (`about-*`, `lead-*`, `projects-*`, etc.).
- Dark mode: default follows system (`prefers-color-scheme`). `Nav` sets `data-theme` on `<html>`; an early script in `index.html` avoids FOUC. Explicit toggle persists `localStorage` key `"theme"` (`light`|`dark`); until then the site tracks OS changes. Animation via `src/utils/themeTransition.js` (View Transitions circular wipe; respects `prefers-reduced-motion`).

### Component structure

- Pages + chrome live **flat** under `src/components/` (no nested page folders).
- Shared utilities: `src/utils/`.
- Shared config: `src/constants/`.
- Content is mostly **inline data arrays** in page files (not a CMS). Prefer composing existing custom components over new dependencies.

### Content edit map

| Content | Where |
|---------|--------|
| Leadership roster / portraits | `Leadership.jsx` + `public/images/portraits/` |
| Events / seminars | `Seminars.jsx` data arrays |
| Projects | `Projects.jsx` (`PROJECTS_DATA`) |
| FAQs | `Involvement.jsx` |
| Nav labels / order | `src/constants/nav.js` |
| Contact form / channels | `Contact.jsx` |

### Static assets

Served from `public/`. Reference with **absolute** root paths:

```js
src="/images/logo.png"
src="/images/portraits/hriday.png"
src="/images/seminars/hero.jpg"
```

Do not import portraits through the module graph unless intentionally hashing them.

### Fully static site (no backend)

There is **no server, DB, auth, or env secrets** in this repo.

- **Contact:** `Contact.jsx` POSTs a quick-message form to Google Forms (`fetch`, `mode: 'no-cors'`) and links to the full Google Form for longer submissions.
- **Resources news:** client `fetch` to Hacker News Algolia with a mock fallback; URLs filtered for `http`/`https` only.
- External links (Discord, Instagram, LinkedIn, Mailchimp, GitHub, arXiv) open in new tabs with `rel="noopener noreferrer"`.

Do not reintroduce a backend without an explicit product decision. ESLint ignores a legacy `backend` path if present.

### GitHub Pages SPA shim

`src/main.jsx` reads `?redirect=/path` before React mounts and rewrites `window.history` so deep links work on a static host. Paths must start with `/`; `//` and `\` are rejected (open-redirect hardening).

`vite.config.js` has **no** `base: '/repo/'` — the site is domain-root at the custom domain.

### Custom domain

`public/CNAME` contains `ai.cs.wisc.edu`. The site is published at that host.

---

## Workflow Guidelines

- **Use web search when needed.** Look up current docs, APIs, library versions, deploy quirks, accessibility guidance, or anything outside the repo before guessing. Prefer official sources over stale memory. When writing or changing code, web-search for the latest documentation of the libraries and tools involved (e.g. React, Vite, React Router, ESLint) so you pick up current APIs, options, and breaking changes instead of relying on outdated training knowledge.
- **Always use subagents for tasks.** Delegate work to subagents rather than doing everything in the main agent — this saves context for the main agent. For any task that touches multiple independent files or areas (e.g. JSX + CSS, multiple components, research + implementation), spawn subagents in parallel via a single message with multiple Agent tool calls. Never do sequentially what can be done concurrently.
- **Commit your work.** Commit finished discrete units of work rather than leaving changes uncommitted when the user expects commits or a logical unit is done. During UI work, commit each logically distinct change as its own commit rather than batching everything into one large commit — this keeps history bisectable and makes bugs easier to identify.
- **Keep commit messages short.** Prefer brief, focused subject lines; do not write very long commit messages.
- **Terminate subagents upon task completion.** Once a task is fully completed, verified, and merged/committed, terminate/delete all subagents and their workspaces to keep the repository clean, provided we are not going to work with them again. Always ask the user for explicit approval before performing this termination.
- **Linting & Code Quality:** Ensure all new code compiles cleanly and passes the linter by running `npm run lint`.

---

## Deployment Workflow

All development happens on the **`dev`** branch. **Do not push source code to `master`.**

Deployment is automated: pushing to `dev` triggers `.github/workflows/pages.yml`, which runs `npm ci`, `npm run build`, and publishes `dist/` to GitHub Pages via the GitHub Actions artifact flow (Node 20). Repo Settings → Pages → Source must be **"GitHub Actions"**.

To verify locally before pushing: `npm run build` then `npm run preview`.

### Outdated docs (do not follow)

- `guide.txt` — legacy CRA-era manual deploy to `master`.
- Parts of `report.md` that describe copying `dist/` / `build/` onto `master` — superseded by Actions-on-`dev`.

---

## Accessibility & quality patterns in use

- Mobile nav: focus trap, Escape to close, body scroll lock, `aria-*` on controls.
- Loading fallback uses `aria-live="polite"`.
- Theme and scroll motion respect `prefers-reduced-motion`.
- Prefer semantic structure and visible `:focus-visible` rings from shared tokens.
- Avoid `dangerouslySetInnerHTML` unless there is a strong, reviewed reason.
