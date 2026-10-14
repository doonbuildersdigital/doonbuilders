import { useRef, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import Media from '@/components/Media';
import Lightbox from '@/components/Lightbox';
import { useReveal } from '@/hooks/useGSAPAnimation';
import { siteGallery } from '@/data/siteGallery';

/** Real site photography as zoomable cards; click opens the full photo. */
export default function SiteGallery() {
  const root = useRef(null);
  const [open, setOpen] = useState(null);
  useReveal(root);

  return (
    <section ref={root} aria-labelledby="sites-title" className="section-y bg-surface">
      <div className="container-x">
        <SectionHeader
          id="sites-title"
          label="From Our Sites"
          title={['Work in progress,', 'captured on site.']}
          description="Real photographs from our active sites — reinforcement, formwork and concreting carried out by our own teams."
        />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:mt-10 lg:grid-cols-3 lg:gap-6" data-reveal="stagger">
          {siteGallery.map((item, i) => (
            <article key={item.id} className={i % 3 === 1 ? 'lg:mt-12' : ''}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`View photo: ${item.title}`}
                className="card card-interactive group block w-full text-left focus-visible:outline-offset-4"
              >
                <Media
                  image={item.image}
                  alt={item.alt}
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="aspect-[3/4]"
                  imgClassName="card-zoom"
                >
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/55 via-night/0 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-surface/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink shadow-card backdrop-blur-sm md:left-4 md:top-4 md:text-[11px]">
                    {item.tag}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute right-3 top-3 flex h-9 w-9 scale-90 items-center justify-center rounded-full bg-surface text-ink opacity-0 shadow-card transition-all duration-500 ease-arch group-hover:scale-100 group-hover:opacity-100 md:right-4 md:top-4"
                  >
                    <Maximize2 className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span className="absolute inset-x-3 bottom-3 text-[11px] font-semibold tabular-nums text-white/90 md:inset-x-4 md:bottom-4">
                    {String(i + 1).padStart(2, '0')} / {String(siteGallery.length).padStart(2, '0')}
                  </span>
                </Media>
                <div className="p-4 md:p-5">
                  <h3 className="text-[15px] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-300 group-hover:text-brand md:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 hidden text-sm leading-relaxed text-steel-dark sm:block">{item.text}</p>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>

      <Lightbox items={siteGallery} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
    </section>
  );
}
