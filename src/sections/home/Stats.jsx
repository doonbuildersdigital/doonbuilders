import { useRef } from 'react';
import { Award, Landmark, Users } from 'lucide-react';
import StatCounter from '@/components/StatCounter';
import MaskLines from '@/components/MaskLines';
import { useReveal } from '@/hooks/useGSAPAnimation';
import { statList, company } from '@/data/company';

const icons = { experience: Award, governmentProjects: Landmark, generations: Users };

/** Home: key numbers from company.js (company.stats). */
export default function Stats() {
  const root = useRef(null);
  useReveal(root);

  return (
    <section ref={root} aria-labelledby="stats-title" className="section-y relative bg-surface">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow" data-reveal="fade">
              By the Numbers
            </p>
            <MaskLines
              as="h2"
              id="stats-title"
              lines={[
                'Decades of projects.',
                <span key="b" className="text-steel">
                  Generations of trust.
                </span>,
              ]}
              className="h-section mt-5 md:mt-6"
            />
          </div>
          <p className="lead lg:col-span-4" data-reveal="fade">
            Every number here is a record of work delivered on the ground — across roads, bridges, dams and the
            buildings that followed.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3 md:gap-6" data-reveal="stagger">
          {statList.map((stat) => {
            const Icon = icons[stat.key] || Award;
            return (
              <div key={stat.key}>
                <div className="card card-interactive group h-full p-7 md:p-9">
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/[0.08] text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                      <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
                      Est. {company.founded}
                    </span>
                  </div>
                  <StatCounter
                    value={stat.value}
                    label={stat.label}
                    pad={stat.pad}
                    className="mt-10 md:mt-14"
                    numberClassName="text-[clamp(3.5rem,7vw,5.5rem)] font-bold leading-[0.9] tracking-[-0.05em] text-ink"
                    labelClassName="mt-4 text-[15px] font-medium text-steel-dark"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
