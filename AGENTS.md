# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built output for local verification
- `npm run lint` — ESLint (flat config in `eslint.config.js`)

No test runner is configured.

## Architecture

Vite + React 19 SPA for the AI@UW club site. Stack: `react-router-dom` v7, `lucide-react`, `react-burger-menu`. Entry: `src/main.jsx` → `src/App.jsx`.

**Routing.** `App.jsx` uses `BrowserRouter` with one route per top-level page component in `src/components/` (`Home`, `About`, `Involvement`, `Leadership`, `Contact`, `Seminars`). `<Nav />` is rendered once outside `<Routes>`. Every route except `/` renders `<Footer />` inline alongside the page via `<><Page /><Footer /></>`. New pages should follow the same pattern.

**Component layout.** Page-level components live directly under `src/components/`. Reusable primitives live in:
- `src/components/typographic/` — `Header`, `Subheader`, `BodyText`
- `src/components/display/` — `Portrait`

Prefer composing these over re-styling MUI from scratch.

**Static assets.** Served from `public/` (`public/images/{logos,portraits,seminarSpeakers}`, `public/fonts`). Reference with absolute `/images/...` paths.

**GitHub Pages SPA shim.** `src/main.jsx` reads `?redirect=/path` from the URL and rewrites `window.history` before React mounts. This pairs with a `404.html` redirect helper used by GitHub Pages so deep links work on a static host. Do not remove the shim without also removing the 404 handler.

**Custom domain.** `CNAME` contains `ai.cs.wisc.edu`; the site is published at that host.

**Contact form.** The site is fully static — there is no backend. `Contact.jsx` embeds a Google Form via iframe (`docs.google.com/forms/d/e/1FAIpQLSd...`) instead of submitting to a server.

## Workflow

**Run agents in parallel whenever possible.** For any task that touches multiple independent files or areas (e.g. JSX + CSS, multiple components, research + implementation), spawn subagents in parallel via a single message with multiple Agent tool calls. Never do sequentially what can be done concurrently.

**Commit incrementally during UI work.** When making UI changes, commit each logically distinct change as its own commit rather than batching everything into one large commit. This keeps the history bisectable and makes it easier to identify which change introduced a bug during later review. Wait for explicit user approval before each commit unless the user has said otherwise for the current session.

**Terminate subagents upon task completion.** Once a task is fully completed, verified, and merged/committed, terminate/delete all subagents and their workspaces to keep the repository clean, provided we are not going to work with them again. Always ask the user for explicit approval before performing this termination.


## Branches and deploy

Default branch for PRs is `dev`. The published build is hosted from the `master` branch. `guide.txt` documents the legacy CRA `build/` → `master` copy-and-commit deploy flow; since the Vite rewrite the output directory is now `dist/`, so those steps need updating before reuse. The legacy CRA source under `_saved/` was removed in commit `d9e868b`; do not re-introduce it.
