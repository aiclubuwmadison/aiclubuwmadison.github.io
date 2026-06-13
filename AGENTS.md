# AGENTS.md

This file provides architectural, workflow, and convention guidelines for the AI@UW website repository.

## Commands

- `npm run dev` — Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built output for local verification
- `npm run lint` — ESLint (flat config in `eslint.config.js`)

No test runner is configured.

## Architecture & Conventions

### Frontend Stack
Vite + React 19 SPA for the AI@UW club site. Stack:
- **Core:** React 19, Vite 8
- **UI:** `lucide-react` icons; hand-rolled mobile nav (no UI component library)
- **Routing:** `react-router-dom` v7. Entry is `src/main.jsx` → `src/App.jsx`.
- **Fonts:** Space Grotesk, Instrument Serif, Space Mono (Google Fonts via `index.html`)

### Routing
`App.jsx` uses `BrowserRouter` with one route per top-level page component in `src/components/` (`About`, `Involvement`, `Leadership`, `Contact`, `Seminars`, `Projects`, `Resources`, `PitchBuilder`, `Sandbox`). `<Nav />` is rendered once outside `<Routes>`. Every route renders `<Footer />` inline alongside the page via `<><Page /><Footer /></>`. `/about` redirects to `/`. New pages should follow the same pattern.

### Styling & Design
The project relies heavily on Vanilla CSS (`.css` files alongside `.jsx` components) to achieve its custom "Atmospheric Modern" design (e.g., specific typography, HSL dark/light colors, glassmorphism, and subtle visual animations). Design tokens live in `src/App.css`. Dark mode toggle uses the View Transitions API via `src/utils/themeTransition.js`. Avoid introducing CSS-in-JS or Tailwind CSS unless explicitly requested by the user.

### Component Structure
Page-level components live directly under `src/components/`. Shared utilities live in `src/utils/`. Prefer composing existing custom components over adding new dependencies.

### Static Assets
Served from `public/` (e.g. `public/images/portraits`, `public/images/seminars`). Reference them with absolute `/images/...` paths in code.

### GitHub Pages SPA Shim
`src/main.jsx` reads `?redirect=/path` from the URL and rewrites `window.history` before React mounts, so deep links work on a static host.

### Custom Domain
`CNAME` contains `ai.cs.wisc.edu`; the site is published at that host.

### Contact Form
The site is fully static — there is no backend. `Contact.jsx` submits a quick-message form to Google Forms via `fetch` (`mode: no-cors`) and links to the full-page Google Form for longer submissions.

## Workflow Guidelines

- **Run agents in parallel whenever possible.** For any task that touches multiple independent files or areas (e.g. JSX + CSS, multiple components, research + implementation), spawn subagents in parallel via a single message with multiple Agent tool calls. Never do sequentially what can be done concurrently.
- **Commit incrementally during UI work.** When making UI changes, commit each logically distinct change as its own commit rather than batching everything into one large commit. This keeps the history bisectable and makes it easier to identify which change introduced a bug during later review.
- **Terminate subagents upon task completion.** Once a task is fully completed, verified, and merged/committed, terminate/delete all subagents and their workspaces to keep the repository clean, provided we are not going to work with them again. Always ask the user for explicit approval before performing this termination.
- **Linting & Code Quality:** Ensure all new code compiles cleanly and passes the linter by running `npm run lint`.

## Deployment Workflow

All development happens on the `dev` branch. **Do not push source code to `master`.**

Deployment is automated: pushing to `dev` triggers `.github/workflows/pages.yml`, which runs `npm ci`, `npm run build`, and publishes `dist/` to GitHub Pages via the GitHub Actions artifact flow. Repo Settings → Pages → Source must be "GitHub Actions".

To verify locally before pushing: `npm run build` then `npm run preview`.
