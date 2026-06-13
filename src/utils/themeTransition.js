function getRevealRadius(x, y) {
  const { innerWidth: w, innerHeight: h } = window;
  return Math.hypot(Math.max(x, w - x), Math.max(y, h - y)) + 8;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setRevealOrigin(originX, originY) {
  const radius = getRevealRadius(originX, originY);
  const root = document.documentElement;
  root.style.setProperty("--reveal-x", `${originX}px`);
  root.style.setProperty("--reveal-y", `${originY}px`);
  root.style.setProperty("--reveal-radius", `${radius}px`);
}

function clearRevealOrigin() {
  const root = document.documentElement;
  root.style.removeProperty("--reveal-x");
  root.style.removeProperty("--reveal-y");
  root.style.removeProperty("--reveal-radius");
}

/**
 * Circular reveal using View Transitions API snapshots so page content
 * stays visible during the wipe (old theme circles in, new theme circles out).
 */
export function animateThemeChange(_currentTheme, nextTheme, originX, originY, onThemeSwap) {
  if (prefersReducedMotion()) {
    onThemeSwap(nextTheme);
    return;
  }

  setRevealOrigin(originX, originY);
  document.documentElement.classList.add("atmos-theme-transitioning");

  const finish = () => {
    document.documentElement.classList.remove("atmos-theme-transitioning");
    clearRevealOrigin();
  };

  if (!document.startViewTransition) {
    onThemeSwap(nextTheme);
    finish();
    return;
  }

  const transition = document.startViewTransition(() => {
    onThemeSwap(nextTheme);
  });

  transition.finished.then(finish).catch(finish);
}
