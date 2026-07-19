// Mirrors the lazy() imports in App.jsx so route chunks can be warmed
// before the user actually navigates (hover/focus, or during idle time
// after mount), removing the fetch+parse waterfall that would otherwise
// only start once React Router matches the route.
const routeImporters = {
  "/": () => import("../components/About"),
  "/about": () => import("../components/About"),
  "/involvement": () => import("../components/Involvement"),
  "/leadership": () => import("../components/Leadership"),
  "/contact": () => import("../components/Contact"),
  "/seminars": () => import("../components/Seminars"),
  "/projects": () => import("../components/Projects"),
  "/resources": () => import("../components/Resources"),
};

const prefetched = new Set();

/** Warm a single route's chunk. Safe to call repeatedly; no-ops after the first success. */
export function prefetchRoute(path) {
  if (prefetched.has(path)) return;
  const importRoute = routeImporters[path];
  if (!importRoute) return;
  prefetched.add(path);
  importRoute().catch(() => {
    // Let a later hover/focus retry (e.g. the browser was briefly offline).
    prefetched.delete(path);
  });
}

/** Warm every route's chunk once the browser is idle, staggered to avoid a request burst. */
export function prefetchAllRoutesWhenIdle() {
  const schedule =
    typeof window !== "undefined" && typeof window.requestIdleCallback === "function"
      ? window.requestIdleCallback
      : (cb) => setTimeout(cb, 200);

  schedule(() => {
    Object.keys(routeImporters).forEach((path, i) => {
      setTimeout(() => prefetchRoute(path), i * 150);
    });
  });
}
