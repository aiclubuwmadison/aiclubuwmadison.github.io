# AI@UW Website

The official website for **AI@UW**, the premier student-led artificial intelligence collective at the University of Wisconsin–Madison.

## Overview

AI@UW is an interdisciplinary community of over 2,000 students and faculty dedicated to exploring both applied and theoretical artificial intelligence. This repository contains the source code for our web presence, featuring information about our projects, leadership, seminars, resources, and ways to get involved.

## Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Routing:** [React Router 7](https://reactrouter.com/) (`BrowserRouter`)
- **Icons:** [lucide-react](https://lucide.dev/)
- **Fonts:** Neue Montreal (self-hosted in `public/fonts/`), [`@fontsource/google-sans`](https://www.npmjs.com/package/@fontsource/google-sans), and Inter (loaded from Google Fonts).
- **Styling:** Vanilla CSS — one co-located `.css` file per component, no UI framework. The design language is modern and "atmospheric"; the mobile navigation uses a hand-rolled burger menu.

Routes are code-split with `React.lazy` and `<Suspense>`, so each page is loaded on demand.

The contact form is an embedded Google Form (`<iframe>`), so the site is fully static — no backend required.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Node 20+ recommended — matches the CI build)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/aiclubuwmadison/aiclubuwmadison.github.io.git
   cd aiclubuwmadison.github.io
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the development server. Ensure you are working off the `dev` branch.
```bash
npm run dev
```

### Other Scripts
```bash
npm run lint       # ESLint (flat config in eslint.config.js)
npm run preview    # Serve the production build locally for verification
```

### Building for Production
Create an optimized production build:
```bash
npm run build
```
The output is generated in the `dist/` directory.

## Hosting

The site is published at **ai.cs.wisc.edu** via GitHub Pages (custom domain configured in `public/CNAME`). Because GitHub Pages is a static host, `src/main.jsx` contains a small SPA shim that reads `?redirect=/path` from the URL on load and rewrites `window.history` before React mounts, so deep links into client-side routes resolve to the correct page.

## Deployment

Deployment is fully automated via GitHub Actions (`.github/workflows/pages.yml`). Pushing to the `dev` branch (or running the workflow manually) triggers a job that:

1. Installs dependencies with `npm ci` (Node 20)
2. Runs `npm run build` to produce `dist/`
3. Uploads `dist/` as a Pages artifact and deploys it to GitHub Pages

To verify a build before pushing, run `npm run preview` locally.

**Repo settings required (one-time):** Settings → Pages → Source must be set to "GitHub Actions".

## Project Structure

```text
├── public/                 # Static assets served as-is
│   ├── CNAME               # Custom domain (ai.cs.wisc.edu)
│   ├── fonts/              # Self-hosted Neue Montreal font files + fonts.css
│   ├── images/             # Logos, leadership portraits, seminar hero
│   └── logo.svg            # Favicon
├── src/
│   ├── components/         # One page/feature per file, each with a sibling .css
│   │   ├── Nav.jsx         # Top navigation + mobile burger menu
│   │   ├── Footer.jsx
│   │   ├── About.jsx       # Home / about page
│   │   ├── Involvement.jsx
│   │   ├── Leadership.jsx
│   │   ├── Contact.jsx     # Embedded Google Form
│   │   ├── Seminars.jsx
│   │   ├── Projects.jsx
│   │   ├── Resources.jsx
│   │   ├── PitchBuilder.jsx
│   │   └── Sandbox.jsx
│   ├── App.jsx             # Router + route definitions (lazy-loaded pages)
│   ├── main.jsx            # Entry point + SPA redirect shim
│   ├── index.css           # Global styles
│   └── App.css
├── index.html              # Vite HTML entry
├── vite.config.js          # Vite configuration
└── eslint.config.js        # ESLint flat config
```

### Routes
`/` and `/about` (About), `/involvement`, `/leadership`, `/contact`, `/seminars`, `/projects`, `/resources`, `/pitch` (PitchBuilder), and `/sandbox`.

## Contributing

We welcome contributions from the community! If you're interested in improving the website, please join our [Discord](https://discord.gg/TTSykcZAg4) and reach out to the webmasters.

## License

This project is open source and maintained by AI@UW.
