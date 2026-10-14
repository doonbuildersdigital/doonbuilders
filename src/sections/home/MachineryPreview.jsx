import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import Media from '@/components/Media';
import Button from '@/components/Button';
import { useReveal } from '@/hooks/useGSAPAnimation';
import { fleetGroups } from '@/data/machinery';

/** Home: fleet overview from machinery.js, linking to /machineries. */
export default function MachineryPreview() {
  const root = useRef(null);
  const [active, setActive] = useState(0);
  useReveal(root);

  return (
    <section ref={root} aria-labelledby="fleet-title" className="section-y bg-surface">
      <div className="container-x">
        <SectionHeader
          id="fleet-title"
          label="Our Fleet"
          title={['The equipment', 'behind the execution.']}
          description="Machinery and execution capability that supports large-scale construction — from earthwork to lifting, concrete and transport."
        />

        <div className="mt-8 grid gap-10 md:mt-12 lg:grid-cols-12 lg:gap-12">
          {/* Image stage — crossfades to the hovered/focused category */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-card-hover lg:col-span-7 lg:aspect-auto lg:min-h-[540px]" data-reveal="image">
            {fleetGroups.map((group, i) => (
              <Media
                key={group.label}
                image={group.image}
                alt={group.image ? `${group.label} on a construction site` : ''}
                sizes="(min-width: 1024px) 58vw, 100vw"
                placeholderLabel={`${group.label} — photograph to be supplied`}
                showTag
                className={`absolute inset-0 transition-opacity duration-700 ease-arch ${
                  i === active ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden={i !== active}
              />
            ))}
            <div className="absolute bottom-4 left-4 z-[3] rounded-full bg-surface/90 px-4 py-2 text-[12px] font-semibold tabular-nums text-ink shadow-card backdrop-blur-sm md:bottom-5 md:left-5">
              {String(active + 1).padStart(2, '0')} / {String(fleetGroups.length).padStart(2, '0')}
            </div>
          </div>

          <div className="lg:col-span-5">
            <ul className="flex flex-col gap-2.5">
              {fleetGroups.map((group, i) => (
                <li key={group.label}>
                  <Link
                    to={`/machineries?category=${group.category}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`group flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 transition-all duration-300 md:py-5 ${
                      i === active
                        ? 'border-brand/20 bg-surface text-brand shadow-card-hover'
                        : 'border-line bg-paper text-ink hover:bg-surface hover:shadow-card'
                    }`}
                  >
                    <span className="flex items-baseline gap-5">
                      <span className="w-6 text-[11px] font-medium tabular-nums text-steel">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-lg font-semibold tracking-[-0.01em] md:text-xl">{group.label}</span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className={`h-5 w-5 shrink-0 transition-all duration-300 ${
                        i === active ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10" data-reveal="fade">
              <Button to="/machineries">View Our Machinery</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
