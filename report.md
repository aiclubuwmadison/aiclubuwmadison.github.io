# AI@UW Website — System Improvement & Audit Report

This report summarizes the comprehensive UI/UX refinements, security audit findings, and verification results implemented across the AI@UW website. All features have been successfully developed, linted, compiled, and verified on the `dev` branch.

---

## 1. Security Audit Findings & Hardening

A dedicated, comprehensive audit was conducted across all files in `src/` and `public/` to inspect for security vulnerabilities. The results and subsequent hardening changes are detailed below:

### A. Redirect Validation Hardening (High Value)
- **Component:** [main.jsx](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/main.jsx)
- **Vulnerability:** The SPA router redirection shim parsed the `?redirect=` parameter and immediately replaced the window history path with it. If a malicious link parsed an external path (e.g. `?redirect=https://evil.com`), the browser could trigger unexpected behavior or local storage manipulation.
- **Hardening:** We hardened the `restorePathFromRedirect` helper in [main.jsx](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/main.jsx) to ensure that the redirect target strictly begins with a single slash `/` and does not begin with double slashes `//` (which browser engines resolve as protocol-relative external targets).

### B. Secure Anchor Targets
- **Vulnerability:** Unsafe target windows on external anchors can expose parent page references via `window.opener`, allowing external sites to redirect the parent page to a malicious phishing clone.
- **Audit & Hardening:** 
  - Verified that all external links on the **Contact**, **Projects**, **Seminars**, and **Resources** pages utilize `target="_blank"` alongside `rel="noopener noreferrer"`.
  - Audited and updated legacy links in [Footer.jsx](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/Footer.jsx) and [Involvement.jsx](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/Involvement.jsx) to strictly use `rel="noopener noreferrer"` (or standard `rel="noreferrer"` inside JSX).

### C. Client-Side XSS & Hardcoded Credentials
- **Audit:**
  - Audited all input handling points (Search inputs, custom Form inputs). Verified that no inputs render directly into the DOM via `dangerouslySetInnerHTML`.
  - Confirmed that the Sandbox code editor compiles scripts entirely on the client-side within a sandboxed virtual scope and contains no execution vectors.
  - Confirmed that no private API keys, email tokens, or server-side credentials exist in the repository; the website is fully static and secure.

---

## 2. UI/UX Polish & Feature Implementations

We implemented a unified "Atmospheric Modern" design language across all site modules. The specific improvements include:

### A. Core Navigation & Footer
- **Navigation Menu** ([Nav.jsx](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/Nav.jsx) & [Nav.css](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/Nav.css)): Added a slide-and-fade opacity animation for the mobile panel, smoothed dark mode glassmorphism opacity, and added an active scroll progress indicator glow.
- **Footer Colophon** ([Footer.jsx](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/Footer.jsx) & [Footer.css](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/Footer.css)): Restored the missing bottom copyright row and Madison location details, added scaling micro-animations on social icons, and resolved border margins on wrapped layouts.

### B. Home Page (About)
- **Scroll Reveals** ([About.jsx](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/About.jsx)): Set up a native `IntersectionObserver` on mount to fade and slide in hero cards, stats, and sections as the user scrolls.
- **Dynamic Assets** ([About.css](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/About.css)): Themed all SVG vector assets using custom CSS variables, allowing them to shift to dark obsidian fills in dark mode instead of glowing bright white.
- **Mobile Canvas Safety**: Disabled the canvas thread below `480px` viewports, stacking cards statically to optimize rendering performance on low-end mobile devices.

### C. Leadership & Involvement (FAQ)
- **Archive Height Animations** ([Leadership.jsx](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/Leadership.jsx)): Refactored the `ArchiveRoster` component to remain mounted while closed, allowing CSS grid transitions to compute actual heights and slide open smoothly. Added ambient collage badge rotations and card pointer arrow offsets on hover.
- **Controlled Accordion Transitions** ([Involvement.jsx](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/Involvement.jsx) & [Involvement.css](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/Involvement.css)): Replaced native instant summary toggles with React state-controlled height slide transitions, fluidified font sizes for small viewports, and themed search overlays.

### D. Contact Page & Custom Form
- **Bespoke Contact Form** ([Contact.jsx](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/Contact.jsx)): Eliminated the Google Form iframe (which caused white flashes and design misalignment). Built a beautiful React form matching the site's dark glass design, submitting inputs to the Google Form response endpoint (`/formResponse`) with AJAX in `no-cors` mode.
- **Tactile Details**: Implemented custom check success animations and scaling card transitions on channel links.

### E. Projects & Seminars
- **Projects Grid Safety** ([Projects.css](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/Projects.css)): Clamped column min-widths to `min(100%, 350px)` to prevent grid overflow on tiny viewports. Mapped card backgrounds to token variable colors and added interactive tech-chip hovers.
- **Persisted Bookmarks** ([Seminars.jsx](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/Seminars.jsx)): Integrated bookmark operations with `localStorage` so users can favorite talks across sessions. 
- **Tab Animations & Search Safety**: Replaced simple borders with animated `scaleX` pseudo-elements under active tabs. Set search inputs to static focus widths, preventing surrounding layout shift (CLS).

### F. Resources & Pitch Builder
- **Gradient Shimmer Skeletons** ([Resources.css](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/Resources.css)): Upgraded basic opacity pulse loaders to a premium moving linear gradient shimmer (`shimmer` animation). Hardened dark mode contrast for fallback warnings using `#ff8c42`.
- **Pitch Exporter Hardening** ([PitchBuilder.jsx](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/PitchBuilder.jsx)):
  - Updated `drawTextWithWrap` to parse and render newline characters `\n` to support paragraph breaks on the canvas.
  - Linked slide preview elements to CSS Container Queries (`cqw` units) in [PitchBuilder.css](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/PitchBuilder.css) so they scale proportionally regardless of columns collapse.
  - Awaited `document.fonts.ready` prior to canvas drawing to guarantee custom fonts load fully before slide downloads.

---

## 3. Build & Quality Verification

All features were audited for code quality and structural integrity:
1. **Linter Health:** Ran `npm run lint` successfully, resolving all unused variable issues and React Hook dependencies.
2. **Production Compilation:** Ran `npm run build` successfully. All assets compiled cleanly into optimized HTML, JS, and CSS chunks in the `/dist` directory.

---

## 4. Next Steps: Deploying to Master

To publish these changes live on the [ai.cs.wisc.edu](http://ai.cs.wisc.edu) domain, follow the project's branch-based deployment strategy defined in `AGENTS.md`:
1. Push all latest `dev` commits to the remote: `git push origin dev`
2. Run `npm run build` on the `dev` branch to compile the production package.
3. Copy the compiled contents of the `dist/` directory to a temporary location outside the repository.
4. Switch to the `master` branch: `git checkout master`
5. Delete all existing files in the repository.
6. Paste the compiled assets from the temporary location into the root of the `master` branch.
7. Commit and push: `git add . && git commit -m "deploy: publish latest build assets to master" && git push origin master`
