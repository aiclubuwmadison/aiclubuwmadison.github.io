# AI@UW Website

The official website for **AI@UW**, the premier student-led artificial intelligence collective at the University of Wisconsin–Madison.

## Overview

AI@UW is an interdisciplinary community of over 2,000 students and faculty dedicated to exploring both applied and theoretical artificial intelligence. This repository contains the source code for our web presence, featuring information about our projects, research, seminars, and ways to get involved.

## Tech Stack

### Frontend
- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **UI Components:** [Material UI (MUI)](https://mui.com/) with [Emotion](https://emotion.sh/)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Icons:** [lucide-react](https://lucide.dev/)
- **Mobile Nav:** [react-burger-menu](https://github.com/negomi/react-burger-menu)
- **Styling:** Vanilla CSS with a focus on modern, "atmospheric" design.

The contact form is handled via an embedded Google Form, so the site is fully static — no backend required.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
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
The output will be generated in the `dist/` directory.

## Hosting

The site is published at **ai.cs.wisc.edu** via GitHub Pages (custom domain configured in `CNAME`). Because GitHub Pages is a static host, `src/main.jsx` contains a small SPA shim that reads `?redirect=/path` from the URL on load and rewrites `window.history` before React mounts. This pairs with a `404.html` redirect helper so deep links into client-side routes resolve correctly.

## Deployment

Deployment is fully automated via GitHub Actions (`.github/workflows/pages.yml`). Pushing to the `dev` branch triggers a workflow that:

1. Installs dependencies with `npm ci`
2. Runs `npm run build` to produce `dist/`
3. Uploads `dist/` as a Pages artifact and deploys it to GitHub Pages

The site is published at **ai.cs.wisc.edu** (custom domain configured via `public/CNAME`).

No manual `master` branch copy is needed — that legacy flow has been retired. To verify a build before pushing, run `npm run preview` locally.

**Repo settings required (one-time):** Settings → Pages → Source must be set to "GitHub Actions".

## Project Structure

```text
├── public/             # Static assets (fonts, images, logos)
├── src/
│   ├── components/     # React components
│   │   ├── display/    # Reusable display components
│   │   ├── typographic/# Typography wrappers
│   │   └── ...         # Page components (About, Involvement, etc.)
│   ├── App.jsx         # Main application component & routing
│   ├── main.jsx        # Entry point
│   └── ...
├── vite.config.js      # Vite configuration
└── ...
```

## Contributing

We welcome contributions from the community! If you're interested in improving the website, please join our [Discord](https://discord.gg/TTSykcZAg4) and reach out to the webmasters.

## License

This project is private and intended for the use of AI@UW.