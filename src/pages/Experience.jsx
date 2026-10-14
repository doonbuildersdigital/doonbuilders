import { useRef, useState } from 'react';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
import Timeline from '@/components/Timeline';
import ImageReveal from '@/components/ImageReveal';
import StatCounter from '@/components/StatCounter';
import CTABand from '@/components/CTABand';
import ArchiveCard from '@/components/ArchiveCard';
import Lightbox from '@/components/Lightbox';
import { useReveal } from '@/hooks/useGSAPAnimation';
import { experienceAreas } from '@/data/capabilities';
import { archiveRecords, archiveByGeneration, scansToLightbox } from '@/data/archive';
import { company, currentYear, statList } from '@/data/company';
import { images } from '@/data/images';
import { seo } from '@/data/seo';

// Every scan in one list for the Lightbox; each record knows where its scans start.
const archiveScans = scansToLightbox(archiveRecords);
const scanOffset = (record) => archiveScans.findIndex((s) => s.recordId === record.id);

/** Route /experience — numbers, generation timeline, original records (archive.js) and experience areas. */
export default function Experience() {
  const root = useRef(null);
  const [openScan, setOpenScan] = useState(null);
  useReveal(root);

  return (
    <>
      <Seo {...seo.experience} path="/experience" />
      <PageHero
        crumb="Experience"
        eyebrow="Our Experience"
        title={['Experience that', 'spans generations']}
        image={images.highway}
        imageAlt="Highway stretching through open terrain"
        aside={
          <p className="flex items-center gap-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.03em]">
            {company.founded}
            <span aria-hidden="true" className="text-brand">
              →
            </span>
            <span className="sr-only">to</span>
            {currentYear}
          </p>
        }
      />

      <div ref={root}>
        {/* Numbers band */}
        <section aria-label="Experience in numbers" className="bg-paper pt-14 md:pt-20">
          <div className="container-x grid gap-4 md:grid-cols-3 md:gap-6" data-reveal="stagger">
            {statList.map((stat) => (
              <StatCounter
                key={stat.key}
                value={stat.value}
                label={stat.label}
                pad={stat.pad}
                className="card card-interactive p-7 md:p-9"
                numberClassName="text-[clamp(3.25rem,6vw,5rem)] font-bold leading-[0.85] tracking-[-0.05em] text-brand"
                labelClassName="mt-4 text-[15px] font-medium text-steel-dark"
              />
            ))}
          </div>
        </section>

        {/* Historical timeline */}
        <section aria-labelledby="history-title" className="section-y bg-paper">
          <div className="container-x">
            <SectionHeader
              id="history-title"
              label="Timeline"
              title={[`${company.founded} — ${currentYear}`]}
              description="Three generations, each adding a new layer of capability to the one before it."
            />
            <div className="mt-10 md:mt-12">
              <Timeline variant="detailed" />
            </div>
          </div>
        </section>

        {/* Original records, by generation */}
        {archiveByGeneration.length > 0 && (
          <section id="archive" aria-labelledby="archive-title" className="section-y scroll-mt-[var(--header-h)] border-t border-line bg-paper">
            <div className="container-x">
              <SectionHeader
                id="archive-title"
                label="From the Archives"
                title={['Original records,', 'generation by generation.']}
                description="Work orders, tender letters and licences from the family’s own files, photographed from the originals. Tap any page to read it in full."
              />

              <div className="mt-10 space-y-16 md:mt-14 md:space-y-20">
                {archiveByGeneration.map(({ era, person, records }) => (
                  <div key={era.year} className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                    <header className="lg:col-span-3">
                      <div className="lg:sticky lg:top-[calc(var(--header-h)+40px)]" data-reveal="fade">
                        <p className="meta-label">{era.generation}</p>
                        <p className="mt-3 text-2xl font-bold tracking-[-0.02em] md:text-3xl">{person}</p>
                        <p className="mt-2 text-[15px] font-medium tabular-nums text-brand">
                          {[...new Set(records.map((r) => r.year || r.date))].join(' · ')}
                        </p>
                        <p className="mt-1 text-sm text-steel-dark">
                          {records.length} {records.length === 1 ? 'record' : 'records'}
                        </p>
                      </div>
                    </header>
                    <div className="grid gap-6 lg:col-span-9">
                      {records.map((record) => (
                        <ArchiveCard
                          key={record.id}
                          record={record}
                          onOpen={(i) => setOpenScan(scanOffset(record) + i)}
                          data-reveal="fade"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Experience across */}
        <section aria-labelledby="across-title" className="section-y bg-surface">
          <div className="container-x">
            <SectionHeader id="across-title" label="Experience Across" title={['Infrastructure.', 'Government.', 'Private development.']} />

            <div className="mt-10 space-y-20 md:mt-12 md:space-y-28">
              {experienceAreas.map((area, i) => (
                <article
                  key={area.id}
                  className="grid items-center gap-10 md:grid-cols-12 md:gap-12"
                >
                  <ImageReveal
                    image={area.image}
                    alt={area.alt}
                    sizes="(min-width: 768px) 55vw, 100vw"
                    className={`aspect-[4/3] rounded-[28px] shadow-card-hover md:col-span-7 ${i % 2 ? 'md:col-start-6 md:row-start-1' : ''}`}
                    parallax={6}
                  />
                  <div className={`md:col-span-5 ${i % 2 ? 'md:col-start-1 md:row-start-1 md:pr-6' : 'md:pl-6'}`}>
                    <p className="text-[12px] font-semibold tabular-nums text-brand" data-reveal="fade">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3
                      className="mt-4 text-[clamp(1.75rem,3.2vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]"
                      data-reveal="fade"
                    >
                      {area.title}
                    </h3>
                    <ul className="mt-8 grid gap-2.5" data-reveal="stagger">
                      {area.items.map((item) => (
                        <li key={item} className="rounded-xl border border-line bg-paper px-5 py-3.5 text-lg font-medium">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Lightbox items={archiveScans} index={openScan} onChange={setOpenScan} onClose={() => setOpenScan(null)} />

      <CTABand
        eyebrow="The Next Chapter"
        title={['From the first road', 'to the next generation.']}
        cta={{ label: 'Discuss a project', to: '/contact' }}
        image={images.roadWorks}
        imageAlt="Excavator working alongside a newly built road"
      />
    </>
  );
}
