# AI@UW Website

The official website for **AI@UW**, the premier student-led artificial intelligence collective at the University of Wisconsin–Madison.

**Live site:** [ai.cs.wisc.edu](https://ai.cs.wisc.edu)

## Overview

AI@UW is an interdisciplinary community of over 2,000 students and faculty dedicated to exploring both applied and theoretical artificial intelligence. This repository holds the static front-end for our web presence — projects, leadership, events, resources, and ways to get involved.

There is no application backend in this repo. Contact uses a Google Forms POST; everything else is client-side.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Core | [React 19](https://react.dev/) (JSX only) |
| Build | [Vite 8](https://vitejs.dev/) |
| Routing | [React Router 7](https://reactrouter.com/) (`BrowserRouter`) |
| Icons | [lucide-react](https://lucide.dev/) |
| Fonts | Space Grotesk, Instrument Serif, Space Mono (Google Fonts via `index.html`) |
| Styling | Vanilla CSS co-located with each component (no Tailwind / UI kit) |

Pages are code-split with `React.lazy` and `<Suspense>`. Dark mode uses the View Transitions API for a circular reveal (`src/utils/themeTransition.js`).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **20+** (matches CI)
- npm

### Installation

```bash
git clone https://github.com/aiclubuwmadison/aiclubuwmadison.github.io.git
cd aiclubuwmadison.github.io
git checkout dev
npm install
```

Development happens on the **`dev`** branch. Do not treat `master` as the source-of-truth working branch.

### Development

```bash
npm run dev
```

### Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve `dist/` locally for verification |
| `npm run lint` | ESLint (flat config in `eslint.config.js`) |

## Hosting

The site is published at **[ai.cs.wisc.edu](https://ai.cs.wisc.edu)** on GitHub Pages. The custom domain is set in `public/CNAME`.

Because GitHub Pages is a static host, deep links need a small SPA shim: `src/main.jsx` reads `?redirect=/path` on load and rewrites `window.history` before React mounts so `BrowserRouter` lands on the correct route. Paths must start with `/`; `//` and `\` are rejected.

## Deployment

Deployment is automated — **do not** manually copy `dist/` (or a CRA-era `build/`) onto `master`.

Pushing to **`dev`** (or running the workflow manually) triggers [`.github/workflows/pages.yml`](.github/workflows/pages.yml), which:

1. Installs with `npm ci` on **Node 20**
2. Runs `npm run build` → `dist/`
3. Uploads `dist/` as a GitHub Pages artifact and deploys it

**One-time repo setting:** Settings → Pages → Source → **GitHub Actions**.

To check a production build locally before pushing:

```bash
npm run build
npm run preview
```

## Project Structure

```text
├── public/                    # Static assets served as-is
│   ├── CNAME                  # Custom domain (ai.cs.wisc.edu)
│   ├── images/                # Portraits, seminar hero, logos
│   └── logo.svg
├── src/
│   ├── components/            # Pages + Nav + Footer (flat; sibling .css)
│   │   ├── Nav.jsx
│   │   ├── Footer.jsx
│   │   ├── About.jsx          # Home (`/`)
│   │   ├── Involvement.jsx
│   │   ├── Leadership.jsx
│   │   ├── Contact.jsx
│   │   ├── Seminars.jsx       # Events page
│   │   ├── Projects.jsx
│   │   └── Resources.jsx
│   ├── constants/
│   │   └── nav.js             # Shared NAV_ITEMS for Nav + Footer
│   ├── utils/
│   │   └── themeTransition.js # Dark-mode circular reveal
│   ├── App.jsx                # Router + lazy routes
│   ├── main.jsx               # Entry + SPA redirect shim
│   ├── index.css              # Global styles
│   └── App.css                # Design tokens + shared “atmos” styles
├── index.html
├── vite.config.js
└── eslint.config.js
```

Nav labels and order live in `src/constants/nav.js` so the top nav and footer stay in sync.

### Routes

| Path | Page | Notes |
|------|------|--------|
| `/` | About | Home |
| `/about` | → `/` | Redirect |
| `/involvement` | Involvement | Nav: **Get Involved** |
| `/leadership` | Leadership | |
| `/contact` | Contact | Google Forms quick-message + full form link |
| `/seminars` | Seminars | Nav: **Events** |
| `/projects` | Projects | |
| `/resources` | Resources | |

`<Nav />` is rendered once outside `<Routes>`. Each route renders the page plus `<Footer />`.

## Contributing

We welcome contributions from the community! If you're interested in improving the website, please join our [Discord](https://discord.gg/TTSykcZAg4) and reach out to the webmasters.

For deeper architecture notes aimed at automated agents and maintainers, see [`AGENTS.md`](AGENTS.md).

## License

This project is open source and maintained by AI@UW.
