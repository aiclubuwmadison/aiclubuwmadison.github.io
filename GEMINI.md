# AI@UW Website - Project Context

This file provides architectural, workflow, and convention guidelines for the AI@UW website repository. 

## Project Overview

The official website for **AI@UW**, an interdisciplinary artificial intelligence collective at the University of Wisconsin–Madison.

- **Type:** Single Page Application (SPA) with a minimal backend skeleton.
- **Frontend Stack:** 
  - React 19
  - Vite
  - Material UI (MUI) v6
  - React Router v7
  - Vanilla CSS (for custom "Atmospheric Modern" aesthetic)
- **Backend Stack:** 
  - Node.js
  - Express
  - Nodemailer (currently a skeleton for form handling)

## Architecture & Conventions

### Frontend
- **Styling:** The project relies heavily on Vanilla CSS (`.css` files alongside `.jsx` components) to achieve its specific "atmospheric" design (e.g., specific typography, layout spacing, and visual treatments). Avoid introducing CSS-in-JS or Tailwind unless explicitly required.
- **Component Structure:** Components are organized functionally within `src/components/`, with subdirectories for specific groupings (e.g., `display/`, `typographic/`).
- **Assets:** Static assets (images, fonts, logos, portraits) reside in the `public/` directory.

### Backend
- The backend in `backend/index.js` is currently minimal. It serves primarily as a skeleton for future features (like sending emails via Nodemailer for contact forms).

### Linting & Code Quality
- The project uses **ESLint** with standard configurations for JavaScript, React Hooks, and React Refresh (Vite integration).
- Ensure new code passes linting via `npm run lint`.

## Workflows: Building, Running, and Testing

- **Install Dependencies:** `npm install`
- **Development Server:** `npm run dev`
- **Linting:** `npm run lint`
- **Production Build:** `npm run build` (outputs to the `dist/` directory)

## Critical Deployment Workflow

This repository uses a specific branch-based deployment strategy. **Never push development code directly to the `master` branch.**

1.  **Development:** All feature work, bug fixes, and redesigns happen on the `dev` branch.
2.  **Building:** Run `npm run build` on the `dev` branch.
3.  **Deployment:** The `master` branch is reserved *exclusively* for the compiled output (`dist/`).
    - Copy the contents of `dist/` to a temporary location outside the repository.
    - Switch to the `master` branch.
    - Delete all existing files.
    - Paste the compiled files from the temporary location.
    - Commit and push to `master`. 

*Refer to the `README.md` or `guide.txt` for the exact terminal commands required for deployment.*
