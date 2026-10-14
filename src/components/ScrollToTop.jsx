import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from '@/lib/gsap';
import { getLenis, scrollToTop } from '@/hooks/useLenis';

/**
 * Resets scroll on every route change, before the new page's animations measure
 * positions, then refreshes ScrollTrigger once layout has settled.
 * A link with a hash (e.g. /experience#archive) then lands on that section instead.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    scrollToTop();
    let timer;
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (!hash) return;
      // Wait for the page transition and reveal set-up before jumping to the section.
      timer = setTimeout(() => {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (!target) return;
        const lenis = getLenis();
        // Respect the section's scroll-margin (clears the fixed header), as scrollIntoView would.
        const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
        if (lenis) lenis.scrollTo(target, { offset: -margin, immediate: true, force: true });
        else target.scrollIntoView();
        ScrollTrigger.refresh();
      }, 350);
    });
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(timer);
    };
  }, [pathname, hash]);

  return null;
}
