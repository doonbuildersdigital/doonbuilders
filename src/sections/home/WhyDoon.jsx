import { useRef } from 'react';
import MaskLines from '@/components/MaskLines';
import { useReveal } from '@/hooks/useGSAPAnimation';
import { differentiators } from '@/data/capabilities';

/** Home: reasons to choose Doon Builders (capabilities.js). */
export default function WhyDoon() {
  const root = useRef(null);
  useReveal(root);

  return (
    <section ref={root} aria-labelledby="why-title" className="section-y bg-surface">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+40px)]">
            <p className="eyebrow" data-reveal="fade">
              The Difference
            </p>
            <MaskLines as="h2" id="why-title" lines={['Why Doon', 'Builders']} className="h-section mt-6 md:mt-8 lg:!text-[clamp(2.5rem,4.4vw,5rem)]" />
          </div>
        </div>

        <ol className="grid gap-4 lg:col-span-8">
          {differentiators.map((item, i) => (
            <li
              key={item.title}
              data-reveal="fade">
              <div className="card card-interactive group grid gap-3 p-6 md:grid-cols-12 md:gap-8 md:p-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/[0.08] text-[13px] font-bold tabular-nums text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white md:col-span-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl font-bold leading-tight tracking-[-0.02em] md:col-span-5 md:pt-1.5 md:text-2xl">
                {item.title}
              </h3>
              <p className="text-base leading-relaxed text-steel-dark md:col-span-6 md:pt-2 md:text-[17px]">
                {item.text}
              </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
