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
- **Core:** React 19, Vite
- **UI Libraries:** Material UI (MUI) v6, `lucide-react`, `react-burger-menu`
- **Routing:** `react-router-dom` v7. Entry is `src/main.jsx` → `src/App.jsx`.

### Routing
`App.jsx` uses `BrowserRouter` with one route per top-level page component in `src/components/` (`About`, `Involvement`, `Leadership`, `Contact`, `Seminars`, `Projects`, `PitchBuilder`, `Sandbox`). `<Nav />` is rendered once outside `<Routes>`. Every route except `/` renders `<Footer />` inline alongside the page via `<><Page /><Footer /></>`. New pages should follow the same pattern.

### Styling & Design
The project relies heavily on Vanilla CSS (`.css` files alongside `.jsx` components) to achieve its custom "Atmospheric Modern" design (e.g., specific typography, HSL dark/light colors, glassmorphism, and subtle visual animations). Avoid introducing CSS-in-JS or Tailwind CSS unless explicitly requested by the user.

### Component Structure
Page-level components live directly under `src/components/`. Reusable primitives live in:
- `src/components/typographic/` (if any are re-introduced)
- `src/components/display/`

Prefer composing existing custom components over styling MUI from scratch.

### Static Assets
Served from `public/` (e.g. `public/images/{logos,portraits,seminarSpeakers}`, `public/fonts`). Reference them with absolute `/images/...` paths in code.

### GitHub Pages SPA Shim
`src/main.jsx` reads `?redirect=/path` from the URL and rewrites `window.history` before React mounts. This pairs with a `404.html` redirect helper used by GitHub Pages so deep links work on a static host. Do not remove the shim without also removing the 404 handler.

### Custom Domain
`CNAME` contains `ai.cs.wisc.edu`; the site is published at that host.

### Contact Form
The site is fully static — there is no backend. `Contact.jsx` embeds a Google Form via iframe (`docs.google.com/forms/d/e/1FAIpQLSd...`) instead of submitting to a server.

## Workflow Guidelines

- **Run agents in parallel whenever possible.** For any task that touches multiple independent files or areas (e.g. JSX + CSS, multiple components, research + implementation), spawn subagents in parallel via a single message with multiple Agent tool calls. Never do sequentially what can be done concurrently.
- **Commit incrementally during UI work.** When making UI changes, commit each logically distinct change as its own commit rather than batching everything into one large commit. This keeps the history bisectable and makes it easier to identify which change introduced a bug during later review.
- **Terminate subagents upon task completion.** Once a task is fully completed, verified, and merged/committed, terminate/delete all subagents and their workspaces to keep the repository clean, provided we are not going to work with them again. Always ask the user for explicit approval before performing this termination.
- **Linting & Code Quality:** Ensure all new code compiles cleanly and passes the linter by running `npm run lint`.

## Critical Deployment Workflow

This repository uses a specific branch-based deployment strategy. **Never push development code directly to the `master` branch.**

1. **Development:** All feature work, bug fixes, and redesigns happen on the `dev` branch.
2. **Building:** Run `npm run build` on the `dev` branch to compile assets to the `dist/` directory.
3. **Deployment:** The `master` branch is reserved *exclusively* for the compiled output (`dist/`).
   - Copy the contents of `dist/` to a temporary location outside the repository.
   - Switch to the `master` branch.
   - Delete all existing files.
   - Paste the compiled files from the temporary location.
   - Commit and push to `master`.
