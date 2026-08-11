/**
 * Shared motion helpers.
 *
 * The FAQ page (`Involvement`) set the house style for movement on this site:
 * things rise into place on a single easing family, lists cascade instead of
 * popping, and surfaces carry a soft glow that trails the cursor. These hooks
 * are the JS half of that system — the CSS half lives in `src/App.css` under
 * "MOTION SYSTEM".
 */

import { useCallback, useEffect, useRef } from 'react';

/** True when the visitor has asked the OS to keep animation to a minimum. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveals elements as they scroll into view.
 *
 * Matching nodes get `.sr-hidden` up front and `.sr-visible` once they cross
 * the threshold. Each node also gets an `--i` index so siblings cascade —
 * the delay itself is CSS's business (`--stagger` in App.css), which keeps the
 * timing consistent with the entrance animations elsewhere.
 *
 * Nodes that are already visible are left alone, so re-running after a filter
 * change animates only the newly rendered items.
 *
 * @param {string} selector      CSS selector for the elements to reveal.
 * @param {object} [options]
 * @param {number} [options.threshold]  IntersectionObserver threshold.
 * @param {number} [options.groupSize]  Stagger wraps back to 0 after this many
 *                                      items, so long lists don't accumulate a
 *                                      multi-second delay.
 * @param {string|number} [options.resetKey]  Change this to re-scan the DOM
 *                                      (e.g. when a filter swaps the content).
 */
export function useScrollReveal(selector, options = {}) {
  const { threshold = 0.08, groupSize = 6, resetKey = '' } = options;

  useEffect(() => {
    const nodes = document.querySelectorAll(selector);
    if (!nodes.length) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('sr-visible');
          io.unobserve(entry.target);
        });
      },
      { threshold },
    );

    nodes.forEach((el, i) => {
      if (el.classList.contains('sr-visible')) return;
      el.classList.add('sr-hidden');
      el.style.setProperty('--i', String(i % groupSize));
      io.observe(el);
    });

    return () => io.disconnect();
  }, [selector, threshold, groupSize, resetKey]);
}

/**
 * Tracks the pointer across a surface so `.atmos-glow` can paint a radial
 * highlight under it.
 *
 * Returns a ref for the glowing element plus the `onPointerMove` handler to
 * spread onto it. Pass `childSelector` when one container wraps many glowing
 * cards — the handler then writes the coordinates onto whichever card the
 * pointer is actually over, so a grid needs a single listener.
 *
 * @param {object} [options]
 * @param {string} [options.childSelector] Selector for the glowing descendants.
 */
export function usePointerGlow(options = {}) {
  const { childSelector } = options;
  const ref = useRef(null);

  const onPointerMove = useCallback(
    (event) => {
      const container = ref.current;
      if (!container) return;

      const target = childSelector
        ? event.target.closest?.(childSelector)
        : container;
      if (!target || !container.contains(target)) return;

      const rect = target.getBoundingClientRect();
      target.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      target.style.setProperty('--my', `${event.clientY - rect.top}px`);
    },
    [childSelector],
  );

  return { ref, onPointerMove };
}
