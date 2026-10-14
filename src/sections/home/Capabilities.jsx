import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import Media from '@/components/Media';
import { useReveal } from '@/hooks/useGSAPAnimation';
import { capabilities } from '@/data/capabilities';

// Alternating composition on desktop: wide/narrow, then narrow/wide.
const layout = [
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-7',
];

function CapabilityCard({ item, index, className }) {
  return (
    <div className={className} data-reveal="fade" data-delay={index % 2 ? '0.12' : '0'}>
      <Link
        to={item.to}
        className="card card-interactive group relative block aspect-[4/5] text-white sm:aspect-[16/11] lg:aspect-auto lg:h-[clamp(420px,36vw,560px)]"
      >
      <Media
        image={item.image}
        alt={item.alt}
        sizes="(min-width: 1024px) 58vw, 100vw"
        className="absolute inset-0"
        imgClassName="card-zoom"
      />
      {/* Readability gradient only — shifts slightly on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/5 to-transparent transition-opacity duration-700 ease-arch group-hover:opacity-90"
      />

      <div className="relative flex h-full flex-col justify-between p-6 md:p-9 lg:p-10">
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-surface/90 px-3 py-1.5 text-[11px] font-semibold tabular-nums text-ink shadow-card backdrop-blur-sm">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-ink shadow-card transition-all duration-500 group-hover:bg-brand group-hover:text-white md:h-12 md:w-12">
            <ArrowUpRight
              aria-hidden="true"
              strokeWidth={1.5}
              className="h-5 w-5 transition-transform duration-500 ease-arch group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
        <div>
          <h3 className="h-card">
            {item.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h3>
          <ul className="mt-5 flex flex-wrap gap-2">
            {item.details.map((d) => (
              <li
                key={d}
                className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[12px] font-medium text-white backdrop-blur-sm"
              >
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
      </Link>
    </div>
  );
}

/** Home: what we build — cards from capabilities.js. */
export default function Capabilities() {
  const root = useRef(null);
  useReveal(root);

  return (
    <section ref={root} aria-labelledby="capabilities-title" className="section-y bg-paper">
      <div className="container-x">
        <SectionHeader
          id="capabilities-title"
          label="Our Capabilities"
          title="What we build."
          description="Four areas of work, built on the same foundation — experience on the ground and the capability to execute."
        />

        <div className="mt-8 grid gap-5 md:mt-10 md:gap-6 lg:grid-cols-12">
          {capabilities.map((item, i) => (
            <CapabilityCard key={item.id} item={item} index={i} className={layout[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
