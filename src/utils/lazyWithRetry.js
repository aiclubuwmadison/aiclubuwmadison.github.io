import { lazy } from "react";

// Why this exists: route components are code-split via dynamic import(). Two
// things make those imports flaky in production on GitHub Pages:
//   1. A transient network blip while fetching a chunk rejects the import.
//      React.lazy() caches that rejected promise forever, so the route stays
//      blank until a full page reload — the "refresh many times" symptom.
//   2. After a new deploy the hashed chunk filenames change; a tab opened
//      before the deploy requests an old chunk name that no longer exists
//      (a "stale chunk" / ChunkLoadError).
//
// lazyWithRetry() wraps the import factory so it:
//   - retries a few times with backoff (fixes case 1 automatically), and
//   - on persistent failure forces a single full reload (fixes case 2 by
//     re-fetching index.html and the current chunk manifest). The reload is
//     guarded by sessionStorage so a genuinely broken build can't loop.

const RELOAD_FLAG_PREFIX = "chunk-reload:";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function hasReloaded(key) {
  try {
    return window.sessionStorage.getItem(RELOAD_FLAG_PREFIX + key) === "1";
  } catch {
    return false;
  }
}

function markReloaded(key) {
  try {
    window.sessionStorage.setItem(RELOAD_FLAG_PREFIX + key, "1");
  } catch {
    // sessionStorage unavailable (private mode / blocked): skip the guard.
  }
}

function clearReloaded(key) {
  try {
    window.sessionStorage.removeItem(RELOAD_FLAG_PREFIX + key);
  } catch {
    // ignore
  }
}

/**
 * Drop-in replacement for React.lazy that retries the dynamic import and, as a
 * last resort, triggers a one-time full reload to recover from stale chunks.
 *
 * @param {() => Promise<{ default: React.ComponentType }>} factory dynamic import
 * @param {object} [options]
 * @param {string} [options.name] stable key used to guard the one-time reload
 * @param {number} [options.retries] in-page retry attempts before reloading
 * @param {number} [options.baseDelay] backoff base in ms
 */
export function lazyWithRetry(factory, options = {}) {
  const { name = "route", retries = 2, baseDelay = 400 } = options;

  return lazy(async () => {
    try {
      const mod = await loadWithRetry(factory, retries, baseDelay);
      // A successful load means the current build is reachable again; drop any
      // stale reload guard so a future deploy can reload once more if needed.
      clearReloaded(name);
      return mod;
    } catch (error) {
      // Retries exhausted. If we haven't already reloaded for this chunk,
      // reload once to pick up a fresh manifest (typical after a deploy).
      if (typeof window !== "undefined" && !hasReloaded(name)) {
        markReloaded(name);
        window.location.reload();
        // Return a never-resolving promise so Suspense keeps showing the
        // fallback while the reload takes over the page.
        return new Promise(() => {});
      }
      // Already reloaded once and still failing: surface the error so the
      // route error boundary can render a recovery UI instead of hanging.
      throw error;
    }
  });
}

async function loadWithRetry(factory, retries, baseDelay) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await factory();
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await delay(baseDelay * 2 ** attempt);
      }
    }
  }
  throw lastError;
}
