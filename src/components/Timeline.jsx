import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap';
import { timeline as defaultItems, personName } from '@/data/timeline';

/**
 * Generational timeline with a thin architectural line that fills as you scroll.
 * Active years turn red; upcoming years stay muted grey.
 *
 * variant="horizontal" — three columns on desktop, vertical rail on mobile (Home)
 * variant="detailed"   — vertical rail with the full story of each era (Experience)
 */
export default function Timeline({ items = defaultItems, variant = 'horizontal', tone = 'light' }) {
  const root = useRef(null);
  const dark = tone === 'dark';
  const horizontal = variant === 'horizontal';

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION_OK, wide: '(min-width: 768px)' }, (ctx) => {
        if (!ctx.conditions.motion) return undefined;
        // Horizontal rail only exists from md upwards; below that each item activates on its own.
        const sequence = horizontal && ctx.conditions.wide;
        const nodes = gsap.utils.toArray('[data-tl-item]', root.current);
        nodes.forEach((node) => node.setAttribute('data-state', 'idle'));

        const fills = gsap.utils.toArray('[data-tl-fill]', root.current);
        fills.forEach((fill) => {
          const vertical = fill.dataset.tlFill === 'y';
          gsap.fromTo(
            fill,
            vertical ? { scaleY: 0 } : { scaleX: 0 },
            {
              ...(vertical ? { scaleY: 1 } : { scaleX: 1 }),
              ease: 'none',
              scrollTrigger: {
                trigger: root.current,
                start: 'top 72%',
                end: horizontal ? 'top 22%' : 'bottom 60%',
                scrub: 0.6,
              },
            },
          );
        });

        nodes.forEach((node, i) => {
          ScrollTrigger.create({
            trigger: sequence ? root.current : node,
            // Sequence: activate each node as the filling line reaches its column (~1/3 steps).
            start: sequence ? `top ${72 - i * 17}%` : 'top 70%',
            onEnter: () => node.setAttribute('data-state', 'active'),
            onLeaveBack: () => node.setAttribute('data-state', 'idle'),
          });
        });

        return () => nodes.forEach((node) => node.removeAttribute('data-state'));
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const muted = dark ? 'group-data-[state=idle]:text-white/20' : 'group-data-[state=idle]:text-steel/40';
  const base = dark ? 'border-line-dark' : 'border-line';

  if (horizontal) {
    return (
      <div ref={root} className="relative">
        {/* Desktop rail */}
        <div className={`absolute inset-x-0 top-0 hidden h-px md:block ${dark ? 'bg-line-dark' : 'bg-line'}`}>
          <div data-tl-fill="x" className="absolute inset-0 origin-left bg-brand" />
        </div>
        <ol className="grid gap-0 md:grid-cols-3 md:gap-10">
          {items.map((item) => (
            <li
              key={item.year}
              data-tl-item
              className={`group relative border-l pb-12 pl-7 last:pb-0 md:border-l-0 md:pb-0 md:pl-0 md:pt-12 ${base}`}
            >
              <span
                aria-hidden="true"
                className={`absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full bg-brand transition-colors duration-500 md:left-0 md:-top-[4px] ${
                  dark ? 'group-data-[state=idle]:bg-white/25' : 'group-data-[state=idle]:bg-mist'
                }`}
              />
              <p
                className={`text-[clamp(3.5rem,8vw,8rem)] font-bold leading-[0.85] tracking-[-0.045em] text-brand transition-colors duration-700 ${muted}`}
              >
                {item.year}
              </p>
              <p className={`mt-6 text-[11px] font-semibold uppercase tracking-label ${dark ? 'text-white/55' : 'text-steel-dark'}`}>
                {item.generation}
              </p>
              <p className={`mt-2 text-xl font-semibold md:text-2xl ${dark ? 'text-white' : 'text-ink'}`}>
                {personName(item)}
              </p>
              {item.title !== item.generation && (
                <p className={`mt-1 text-sm ${dark ? 'text-white/60' : 'text-steel-dark'}`}>{item.title}</p>
              )}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div ref={root} className="relative">
      <div className={`absolute bottom-0 left-0 top-0 w-px md:left-[calc(25%-0.5px)] ${dark ? 'bg-line-dark' : 'bg-line'}`}>
        <div data-tl-fill="y" className="absolute inset-0 origin-top bg-brand" />
      </div>
      <ol>
        {items.map((item) => (
          <li key={item.year} data-tl-item className="group relative grid gap-5 pb-16 pl-8 last:pb-0 md:grid-cols-4 md:gap-0 md:pb-24 md:pl-0">
            <span
              aria-hidden="true"
              className={`absolute -left-[4px] top-3 h-[9px] w-[9px] rounded-full bg-brand transition-colors duration-500 md:left-[calc(25%-4.5px)] ${
                dark ? 'group-data-[state=idle]:bg-white/25' : 'group-data-[state=idle]:bg-mist'
              }`}
            />
            <p
              className={`text-[clamp(3rem,6vw,5.5rem)] font-bold leading-[0.85] tracking-[-0.045em] text-brand transition-colors duration-700 md:pr-10 ${muted}`}
            >
              {item.year}
            </p>
            <div className="md:col-span-3 md:pl-14">
              <p className={`text-[11px] font-semibold uppercase tracking-label ${dark ? 'text-white/55' : 'text-steel-dark'}`}>
                {[item.generation, item.title].filter((v, i, all) => all.indexOf(v) === i).join(' · ')}
              </p>
              <h3 className={`mt-3 text-2xl font-semibold md:text-3xl ${dark ? 'text-white' : 'text-ink'}`}>
                {personName(item)}
              </h3>
              <p className={`mt-5 max-w-2xl text-base leading-relaxed md:text-lg ${dark ? 'text-white/70' : 'text-steel-dark'}`}>
                {item.story}
              </p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {item.focus.map((f) => (
                  <li
                    key={f}
                    className={`rounded-full border bg-surface px-3.5 py-1.5 text-[12.5px] font-medium ${
                      dark ? 'border-line-dark text-white/75' : 'border-line text-ink/80'
                    }`}
                  >
                    {f.replace(/\.$/, '')}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
