import { useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import FilterBar from '@/components/FilterBar';
import MachineryCard from '@/components/MachineryCard';
import CTABand from '@/components/CTABand';
import { useReveal, useFilterTransition } from '@/hooks/useGSAPAnimation';
import { machinery, machineryCategories, machineryFilterKeys } from '@/data/machinery';
import { images } from '@/data/images';
import { seo } from '@/data/seo';

/** Route /machineries — equipment from machinery.js, filterable by ?category=. */
export default function Machinery() {
  const root = useRef(null);
  const grid = useRef(null);
  const [params, setParams] = useSearchParams();
  const requested = params.get('category');
  const active = machineryFilterKeys.includes(requested) ? requested : 'all';

  const visible = useMemo(
    () => (active === 'all' ? machinery : machinery.filter((m) => m.category === active)),
    [active],
  );

  const options = machineryFilterKeys.map((key) => ({
    key,
    label: key === 'all' ? 'All' : machineryCategories[key].label,
    count: key === 'all' ? machinery.length : machinery.filter((m) => m.category === key).length,
  }));

  const onChange = (key) =>
    setParams(key === 'all' ? {} : { category: key }, { replace: true, preventScrollReset: true });

  useReveal(root);
  useFilterTransition(grid, active);

  return (
    <>
      <Seo {...seo.machinery} path="/machineries" />
      <PageHero
        crumb="Machineries"
        eyebrow="Our Fleet"
        title="Built to execute."
        description="The equipment and machinery supporting our construction capabilities."
        image={images.excavator}
        imageAlt="Tracked excavator on a rocky construction site"
      />

      <section ref={root} aria-label="Equipment catalogue" className="section-y bg-paper">
        <div className="container-x">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
            <FilterBar
              options={options}
              active={active}
              onChange={onChange}
              label="Filter machinery by category"
              className="md:flex-1"
            />
            <p className="meta-label shrink-0" aria-live="polite">
              {visible.length} {visible.length === 1 ? 'entry' : 'entries'}
            </p>
          </div>

          {visible.length > 0 ? (
            <div
              ref={grid}
              data-reveal="stagger"
              className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2 xl:grid-cols-3"
            >
              {visible.map((machine, i) => (
                <MachineryCard key={machine.id} machine={machine} index={String(i + 1).padStart(2, '0')} />
              ))}
            </div>
          ) : (
            <p ref={grid} className="mt-8 border-t border-line pt-10 text-lg">
              Equipment in this category will be listed here.
            </p>
          )}
        </div>
      </section>

      <CTABand
        eyebrow="Execution Capability"
        title={['Looking for a contractor with', 'the capability to execute your project?']}
        titleClassName="text-[clamp(1.7rem,3.6vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.03em]"
        cta={{ label: 'Talk to us', to: '/contact' }}
      />
    </>
  );
}
