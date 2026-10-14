import { useRef } from 'react';
import SectionHeader from '@/components/SectionHeader';
import Timeline from '@/components/Timeline';
import ImageReveal from '@/components/ImageReveal';
import { useReveal } from '@/hooks/useGSAPAnimation';
import { legacySummary } from '@/data/timeline';
import { images } from '@/data/images';
import { company } from '@/data/company';

/** Home: short company story and the horizontal generation timeline (timeline.js). */
export default function Legacy() {
  const root = useRef(null);
  useReveal(root);

  return (
    <section ref={root} aria-labelledby="legacy-title" className="section-y bg-paper">
      <div className="container-x">
        <SectionHeader
          id="legacy-title"
          label="Our Legacy"
          title={['Built on experience.', 'Built for generations.']}
          description={legacySummary}
        />

        <div className="mt-10 md:mt-14 lg:mt-14">
          <Timeline variant="horizontal" />
        </div>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-12 md:gap-8">
          <ImageReveal
            image={images.constructionCranes}
            alt="Tower cranes above a building frame under construction"
            sizes="(min-width: 768px) 58vw, 100vw"
            className="aspect-[3/2] rounded-[28px] shadow-card-hover md:col-span-7"
            parallax={6}
            showTag
          />
          <div className="flex flex-col justify-between gap-6 md:col-span-5 md:pl-6">
            <ImageReveal
              image={images.roadWorks}
              alt="Excavator working beside a newly surfaced road"
              sizes="(min-width: 768px) 40vw, 100vw"
              className="aspect-[4/3] rounded-[24px] shadow-card-hover md:mt-12"
              data-delay="0.15"
              showTag
            />
            <div className="card p-6" data-reveal="fade">
              <p className="meta-label">
                {company.founded} — Present
              </p>
              <p className="mt-3 text-lg font-medium leading-snug md:text-xl">
                Roads, bridges and dams. Hotels, resorts and hospitals. One family of builders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
