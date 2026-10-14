import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
import Media from '@/components/Media';
import ImageReveal from '@/components/ImageReveal';
import MaskLines from '@/components/MaskLines';
import Button from '@/components/Button';
import CTABand from '@/components/CTABand';
import { useReveal } from '@/hooks/useGSAPAnimation';
import { timeline, personName } from '@/data/timeline';
import { archiveForGeneration } from '@/data/archive';
import { philosophy } from '@/data/capabilities';
import { company, brandMessages } from '@/data/company';
import { images } from '@/data/images';
import { seo } from '@/data/seo';

/** Route /about — company story by generation (timeline.js + archive.js) and philosophy (capabilities.js). */
export default function About() {
  const root = useRef(null);
  useReveal(root);

  const details = [
    { label: 'Registered name', value: company.legalName },
    { label: 'Office', value: company.address },
  ].filter((d) => d.value);

  return (
    <>
      <Seo {...seo.about} path="/about" />
      <PageHero
        crumb="About Us"
        eyebrow={company.tagline}
        title={company.wordmark}
        description="What began with Mr. Dilip Kumar Ji in 1968 has evolved into a three-generation construction legacy."
        image={images.constructionCranes}
        imageAlt="Tower cranes above a building under construction"
      />

      <div ref={root}>
        {/* Story */}
        <section aria-labelledby="story-title" className="section-y bg-paper">
          <div className="container-x">
            <SectionHeader
              id="story-title"
              label="Our Story"
              title={['Three generations.', 'One family of builders.']}
              description={brandMessages.supporting}
            />

            <div className="mt-10 md:mt-14">
              {timeline.map((era, i) => (
                <article
                  key={era.year}
                  className="grid gap-10 border-t border-line py-14 md:py-20 lg:grid-cols-12 lg:gap-12"
                >
                  <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-[calc(var(--header-h)+40px)]">
                      <p className="text-[clamp(4rem,8vw,7rem)] font-bold leading-[0.8] tracking-[-0.05em] text-brand" data-reveal="fade">
                        {era.year}
                      </p>
                      <p className="meta-label mt-6">{era.generation}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-7 lg:col-start-6">
                    <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.1] tracking-[-0.02em]" data-reveal="fade">
                      {era.year} — {era.chapter}
                    </h2>
                    <p className="mt-6 text-lg leading-relaxed text-steel-dark md:text-xl" data-reveal="fade">
                      {era.story}
                    </p>

                    <div className="mt-10 grid grid-cols-5 gap-4 md:gap-6">
                      {era.portrait && (
                        <div className="col-span-2">
                          <Media
                            image={era.portrait}
                            alt={era.person ? `Portrait of ${era.person}` : ''}
                            sizes="(min-width: 1024px) 18vw, 40vw"
                            className="aspect-[4/5] rounded-2xl shadow-card"
                          />
                          <p className="mt-3 text-sm font-medium">{personName(era)}</p>
                        </div>
                      )}
                      <ImageReveal
                        image={era.image}
                        alt={era.imageAlt}
                        sizes={era.portrait ? '(min-width: 1024px) 30vw, 60vw' : '(min-width: 1024px) 50vw, 100vw'}
                        className={`${era.portrait ? 'col-span-3 aspect-[4/5]' : 'col-span-5 aspect-[4/3]'} rounded-2xl shadow-card-hover md:aspect-[4/3] md:self-start`}
                        data-delay={String(0.1 * i)}
                        showTag
                      />
                    </div>

                    {archiveForGeneration(i).length > 0 && (
                      <div className="mt-10">
                        <p className="meta-label">On record</p>
                        <ul className="mt-4 grid gap-3">
                          {archiveForGeneration(i).map((record) => (
                            <li key={record.id}>
                              <Link
                                to="/experience#archive"
                                className="card card-interactive group flex items-center gap-4 p-3 pr-5"
                              >
                                <Media
                                  image={record.scans[0].image}
                                  alt=""
                                  sizes="96px"
                                  className="h-16 w-16 shrink-0 rounded-xl ring-1 ring-ink/10"
                                  imgClassName="object-top"
                                />
                                <span className="min-w-0 flex-1">
                                  <span className="block text-[12px] font-semibold text-brand">
                                    {record.type} · {record.date}
                                  </span>
                                  <span className="mt-0.5 block truncate text-[15px] font-semibold transition-colors group-hover:text-brand">
                                    {record.title}
                                  </span>
                                </span>
                                <ArrowRight
                                  className="h-4 w-4 shrink-0 text-steel-dark transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand"
                                  strokeWidth={2}
                                  aria-hidden="true"
                                />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section aria-labelledby="philosophy-title" className="section-y relative overflow-hidden bg-surface">
          <div className="container-x relative">
            <p className="eyebrow" data-reveal="fade" id="philosophy-title">
              Our Philosophy
            </p>
            <ol className="mt-10 grid gap-4 md:mt-14">
              {philosophy.map((line, i) => (
                <li key={line}>
                  <div className="card card-interactive flex items-center gap-5 px-6 py-7 md:gap-10 md:px-10 md:py-10">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/[0.08] text-[13px] font-bold tabular-nums text-brand">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <MaskLines lines={line} className="display-xl !text-[clamp(1.5rem,4.4vw,3.75rem)]" />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Company details — rendered only when supplied */}
        {(details.length > 0 || company.profilePdf) && (
          <section aria-labelledby="details-title" className="section-y bg-surface">
            <div className="container-x grid gap-10 lg:grid-cols-12">
              <h2 id="details-title" className="eyebrow lg:col-span-4">
                Company Information
              </h2>
              <div className="lg:col-span-8">
                {details.length > 0 && (
                  <dl className="card px-6 md:px-8">
                    {details.map((d) => (
                      <div key={d.label} className="grid gap-2 border-b border-line py-5 last:border-b-0 md:grid-cols-3">
                        <dt className="meta-label">{d.label}</dt>
                        <dd className="text-lg md:col-span-2">{d.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {company.profilePdf && (
                  <Button href={company.profilePdf} variant="secondary" className="mt-10" download>
                    Download company profile
                  </Button>
                )}
              </div>
            </div>
          </section>
        )}
      </div>

      <CTABand
        eyebrow="Start a Conversation"
        title={['Have a project', 'to build?']}
        text={brandMessages.closing}
        image={images.towersConstruction}
        imageAlt="Concrete towers under construction"
      />
    </>
  );
}
