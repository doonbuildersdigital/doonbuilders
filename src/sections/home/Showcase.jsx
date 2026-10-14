import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, HardHat, Landmark, Maximize2, Tractor, Wrench } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import Media from '@/components/Media';
import Lightbox from '@/components/Lightbox';
import { useReveal } from '@/hooks/useGSAPAnimation';
import { showcase } from '@/data/showcase';

const icons = {
  infrastructure: Landmark,
  construction: HardHat,
  buildings: Building2,
  machinery: Tractor,
  equipment: Wrench,
};

/** Tabbed photo showcase: one large + four small tiles per category; tiles open the lightbox. */
export default function Showcase() {
  const root = useRef(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(null);
  useReveal(root);

  const category = showcase[active];
  const lightboxItems = useMemo(
    () =>
      category.items.map((item) => ({
        ...item,
        tag: item.real ? `${category.label} · Our site` : category.label,
        text: category.blurb,
      })),
    [category],
  );

  return (
    <section ref={root} aria-labelledby="showcase-title" className="section-y bg-surface">
      <div className="container-x">
        <SectionHeader
          id="showcase-title"
          label="Our Work in Pictures"
          title={['Infrastructure to equipment,', 'all under one roof.']}
          description="Browse the kind of work we take on — and the machinery and equipment that delivers it."
        />

        {/* Category tabs */}
        <div
          role="tablist"
          aria-label="Photo categories"
          className="scrollbar-none -mx-[var(--gutter)] mt-8 overflow-x-auto px-[var(--gutter)] py-1 md:mt-10 lg:mx-0 lg:px-0"
          data-reveal="fade"
        >
          <div className="grid min-w-max grid-cols-5 gap-2 rounded-2xl border border-line bg-paper p-1.5 lg:min-w-0">
            {showcase.map((c, i) => {
              const Icon = icons[c.key];
              const selected = i === active;
              return (
                <button
                  key={c.key}
                  type="button"
                  role="tab"
                  id={`showcase-tab-${c.key}`}
                  aria-selected={selected}
                  aria-controls="showcase-panel"
                  onClick={() => setActive(i)}
                  className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-[13px] font-semibold transition-all duration-300 active:scale-[0.97] md:gap-2.5 md:px-4 md:py-3 md:text-[14px] ${
                    selected ? 'bg-surface text-brand shadow-card-hover' : 'text-steel-dark hover:bg-surface/70 hover:text-ink'
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 md:h-8 md:w-8 ${
                      selected ? 'bg-brand text-white' : 'bg-surface text-ink shadow-card'
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  </span>
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          id="showcase-panel"
          role="tabpanel"
          aria-labelledby={`showcase-tab-${category.key}`}
          className="mt-5 md:mt-6"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[15px] text-steel-dark">{category.blurb}</p>
            <Link
              to={category.to}
              className="group inline-flex shrink-0 items-center gap-2 text-[14px] font-semibold text-brand"
            >
              Explore {category.label.toLowerCase()}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>

          <div key={category.key} className="fade-up mt-4 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {category.items.map((item, i) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`View photo: ${item.title}`}
                className={`card card-interactive group relative block text-left ${
                  i === 0 ? 'col-span-2 aspect-[16/10] lg:row-span-2 lg:aspect-auto' : 'aspect-[4/3]'
                }`}
              >
                <Media
                  image={item.image}
                  alt={item.alt}
                  sizes={i === 0 ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
                  className="absolute inset-0"
                  imgClassName="card-zoom"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
                {item.real && (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-surface/90 px-2.5 py-1 text-[10.5px] font-semibold text-ink shadow-card backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                    Our site
                  </span>
                )}
                <span
                  aria-hidden="true"
                  className="absolute right-3 top-3 flex h-8 w-8 scale-90 items-center justify-center rounded-lg bg-surface text-ink opacity-0 shadow-card transition-all duration-500 ease-arch group-hover:scale-100 group-hover:opacity-100"
                >
                  <Maximize2 className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
                <span className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 md:inset-x-4 md:bottom-4">
                  <span className={`font-semibold leading-tight text-white ${i === 0 ? 'text-lg md:text-2xl' : 'text-[13px] md:text-[15px]'}`}>
                    {item.title}
                  </span>
                  <span className="shrink-0 text-[11px] font-semibold tabular-nums text-white/75">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <p className="mt-4 text-[12px] text-steel">
            Representative photographs. Images marked “Our site” are from Doon Builders projects.
          </p>
        </div>
      </div>

      <Lightbox items={lightboxItems} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
    </section>
  );
}
