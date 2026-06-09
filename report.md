# Codebase Audit & Fixes Report — AI@UW Website

This report provides a comprehensive overview of the bugs, performance bottlenecks, visual/accessibility violations, and client-side security audits resolved across the AI@UW website repository. 

All code modifications have been fully implemented, verified, and committed to the `dev` branch.

---

## 1. Resolved Performance Issues & Reflows

### 1.1 Global MutationObserver Layout Thrashing Removed
*   **File Modified:** [App.jsx](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/App.jsx)
*   **Fix:** Completely removed the global `ScrollReveal` component and its `MutationObserver` from `App.jsx`. It was executing expensive DOM selector scans (`document.querySelectorAll`) on every single DOM modification across the entire site (e.g. during real-time network parameter adjustments). This has been replaced with localized page observers.

### 1.2 Drawing Canvas GPU Pipeline Stall Throttled
*   **File Modified:** [Sandbox.jsx](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/Sandbox.jsx)
*   **Fix:** Wrapped the canvas pixel analysis calls (`analyzeDrawing`) in a throttled `requestAnimationFrame` block to prevent blocking draw events. This eliminates GPU pipeline stalls on desktop and mobile browsers.

### 1.3 Nav Bar High-Frequency Scroll Re-renders Eliminated
*   **File Modified:** [Nav.jsx](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/Nav.jsx)
*   **Fix:** Removed the `scrollPct` state which forced React to re-render the entire navigation header on every single pixel scroll. Instead, scroll progress is now written directly to a CSS Custom Property (`--scroll-pct`) on the document root, which transitions smoothly via standard CSS variables.

---

## 2. Resolved React Hooks & Lifecycle Bugs

### 2.1 IntersectionObserver & Scroll-Reveal Localized
*   **File Modified:** [Involvement.jsx](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/Involvement.jsx)
*   **Fix:** Added a localized `IntersectionObserver` on the FAQ component mount that handles reveal animations specifically for FAQ rows.

### 2.2 Unstable Key Prop Index Bug Resolved
*   **File Modified:** [Involvement.jsx](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/Involvement.jsx)
*   **Fix:** Changed `filteredFaqs` map key from array index (`key={i}`) to a stable key (`key={item.q}`). This prevents React reconciliation bugs (e.g. details elements remaining open for the wrong questions when search filtering).

### 2.3 Image Load Error Direct DOM Mutation Replaced
*   **File Modified:** [Leadership.jsx](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/Leadership.jsx)
*   **Fix:** Removed the direct DOM manipulation code `img.src = PORTRAIT_PLACEHOLDER` inside `handlePortraitError` (which triggered infinite error/render loops). Created a clean React subcomponent `RosterCard` that relies statefully on the existing `useResolvedPortrait` hook.

### 2.4 State Update in Render Phase Resolved
*   **File Modified:** [Nav.jsx](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/Nav.jsx)
*   **Fix:** Removed the render-phase conditional state updates that reset scroll percentages. Resets are now cleanly managed in a `useEffect` hooked to `location.pathname`.

### 2.5 Uncancelled Async Callbacks & Observables Cleared
*   **Files Modified:** 
    *   [Leadership.jsx](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/Leadership.jsx): Wave canvas `ResizeObserver` schedules drawing via `requestAnimationFrame`. Added `rafId` tracking to cancel outstanding animation frames on unmount.
    *   [PitchBuilder.jsx](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/PitchBuilder.jsx): Slide download executes after a `200ms` delay. Added `downloadTimeoutRef` to clear the timeout on unmount, avoiding unmounted component state updates.

---

## 3. Resolved Accessibility & Styling Issues

### 3.1 Swapped `--atmos-ink-mute` Variables for Contrast compliance
*   **File Modified:** [App.css](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/App.css)
*   **Fix:** Swapped text sub-colors between light mode (`#64748b` - contrast of **4.85:1**) and dark mode (`#94a3b8` - contrast of **7.18:1**), conforming with the WCAG 2.1 AA requirement of **4.5:1** for normal text.

### 3.2 Accessible Badger Red text in Dark Mode
*   **File Modified:** [App.css](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/App.css)
*   **Fix:** Overrode the Badger red accent color (`--atmos-badger`) to `#ff6e75` in the dark theme (`[data-theme="dark"]`) block. This elevates red text contrast on dark backgrounds to **6.45:1** (passes WCAG AA).

### 3.3 Dynamic Canvas Coordinates Offset Scaling
*   **File Modified:** [Sandbox.jsx](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/components/Sandbox.jsx)
*   **Fix:** Corrected canvas mouse/touch coordinate maps to multiply raw offsets by the scale ratio (`canvas.width / rect.width`). Drawing lines now align precisely under the user's cursor on mobile viewports and scaled canvas elements.

### 3.4 Resolved Theme Snapping Globally
*   **File Modified:** [App.css](file:///Users/yugmarwaha/Downloads/projects/AIClub/club_website/src/App.css)
*   **Fix:** Added a comprehensive transition rule in `App.css` to transition `background-color`, `background`, `color`, `border-color`, and `box-shadow` smoothly over `250ms`, resolving color snaps on theme toggle.

---

## 4. Security Audit & Code Cleanup

*   **Security Vulnerability Audits (0 Issues Found):**
    *   **XSS / dangerouslySetInnerHTML**: No vulnerabilities. All user inputs are statefully sanitized and handled via React DOM.
    *   **target="_blank" Links**: All external anchors utilize proper security tags (`rel="noopener noreferrer"` or `rel="noreferrer"`).
    *   **Hardcoded secrets**: Scanned code variables for API tokens or credential strings; none found.
*   **Dead Dependencies Removed:**
    *   **`react-burger-menu`**: Deleted from `package.json` and ran `npm uninstall` to purge it from node modules and clean the lockfile.

---

## 5. Verification Check Results

*   **Linter Checks**: Passed successfully (`npm run lint` reported **0 errors**).
*   **Production Build**: Verified successfully (`npm run build` compiled all static assets cleanly in 253ms).
