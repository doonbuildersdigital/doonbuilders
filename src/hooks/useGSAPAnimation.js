import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';

/**
 * Subtle re-entry of a grid's items whenever `key` (e.g. the active filter) changes.
 * Does nothing on first render — initial entrance is handled by useReveal.
 */
export function useFilterTransition(gridRef, key) {
  const previous = useRef(key);
  useGSAP(
    () => {
      if (previous.current === key) return;
      previous.current = key;
      ScrollTrigger.refresh();
      const items = gridRef.current?.children;
      if (!items?.length) return;
      // Cancel any not-yet-fired scroll reveal so filtered items always end fully visible.
      gsap.killTweensOf(items);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.06, clearProps: 'transform' },
        );
      });
    },
    { dependencies: [key], scope: gridRef },
  );
}

const START = 'top 86%';

/**
 * Declarative scroll reveals for everything inside `scope`.
 * Mark elements with data attributes instead of writing per-section timelines:
 *
 *   data-reveal="lines"    text mask reveal of `.line-inner` children (see <MaskLines>)
 *   data-reveal="fade"     fade + rise
 *   data-reveal="stagger"  fade + rise of direct children, staggered
 *   data-reveal="image"    clip-path reveal with subtle image scale (see <ImageReveal>)
 *   data-reveal="rule"     thin line drawing from the left
 *   data-parallax="8"      scrubbed vertical drift in % (element should be oversized)
 *   data-delay="0.2"       optional delay in seconds for any reveal
 *
 * Nothing is hidden unless motion is allowed, so reduced-motion users get static content.
 */
export function useReveal(scope, dependencies = []) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(scope);
        const delayOf = (el) => Number(el.dataset.delay || 0);
        const trigger = (el) => ({ trigger: el, start: START, once: true });

        q('[data-reveal="lines"]').forEach((el) => {
          gsap.from(el.querySelectorAll('.line-inner'), {
            yPercent: 110,
            duration: 1.15,
            ease: 'power4.out',
            stagger: 0.09,
            delay: delayOf(el),
            scrollTrigger: trigger(el),
          });
        });

        q('[data-reveal="fade"]').forEach((el) => {
          gsap.from(el, {
            y: 28,
            autoAlpha: 0,
            duration: 1,
            delay: delayOf(el),
            scrollTrigger: trigger(el),
          });
        });

        q('[data-reveal="stagger"]').forEach((el) => {
          gsap.from(el.children, {
            y: 24,
            autoAlpha: 0,
            duration: 0.9,
            stagger: 0.08,
            delay: delayOf(el),
            scrollTrigger: trigger(el),
          });
        });

        q('[data-reveal="rule"]').forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.4,
            ease: 'power3.inOut',
            delay: delayOf(el),
            scrollTrigger: trigger(el),
          });
        });

        q('[data-reveal="image"]').forEach((el) => {
          const img = el.querySelector('img');
          const tl = gsap.timeline({ delay: delayOf(el), scrollTrigger: trigger(el) });
          tl.fromTo(
            el,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.inOut', clearProps: 'clipPath' },
          );
          if (img) tl.from(img, { scale: 1.08, duration: 1.8, ease: 'power3.out' }, 0);
        });

        q('[data-parallax]').forEach((el) => {
          const amount = Number(el.dataset.parallax || 8);
          gsap.fromTo(
            el,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: 'none',
              scrollTrigger: {
                trigger: el.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope, dependencies, revertOnUpdate: true },
  );
}
