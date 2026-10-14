import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import ImageReveal from '@/components/ImageReveal';
import Media from '@/components/Media';
import ProjectCard from '@/components/ProjectCard';
import SectionHeader from '@/components/SectionHeader';
import PlaceholderBadge from '@/components/PlaceholderBadge';
import StageIndicator from '@/components/StageIndicator';
import CTABand from '@/components/CTABand';
import ArchiveCard from '@/components/ArchiveCard';
import Lightbox from '@/components/Lightbox';
import NotFound from './NotFound';
import { useReveal } from '@/hooks/useGSAPAnimation';
import {
  getProjectBySlug,
  getRelatedProjects,
  getNextProject,
  categoryLabel,
  ownershipLabel,
  stageLabels,
} from '@/data/projects';
import { getArchiveRecord, scansToLightbox } from '@/data/archive';

function keyInformation(project) {
  const status = project.status === 'ongoing' ? `Ongoing — ${stageLabels[project.stage]}` : 'Completed';
  return [
    { label: 'Location', value: project.location },
    { label: 'Category', value: categoryLabel(project) },
    { label: 'Sector', value: ownershipLabel(project) },
    { label: 'Status', value: project.status ? status : '' },
    { label: 'Year', value: project.year },
    { label: 'Client', value: project.client },
    { label: 'Authority', value: project.authority },
  ].filter((row) => row.value);
}

/** Route /projects/:slug — one project from projects.js, plus its original record from archive.js if it has one. */
export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const root = useRef(null);
  const [openScan, setOpenScan] = useState(null);
  useReveal(root, [slug]);

  if (!project) return <NotFound />;

  const record = project.archiveId ? getArchiveRecord(project.archiveId) : null;

  const info = keyInformation(project);
  const related = getRelatedProjects(project);
  const next = getNextProject(project);

  return (
    <>
      <Seo
        title={`${project.name} | Doon Builders`}
        description={project.shortDescription || `${project.name} — a ${categoryLabel(project)} project by Doon Builders.`}
        path={`/projects/${project.slug}`}
      />

      <PageHero
        crumb="Projects"
        eyebrow={[ownershipLabel(project), categoryLabel(project)].filter(Boolean).join(' · ')}
        title={project.name}
        description={project.location}
        image={project.heroImage}
        imageAlt={project.imageAlt || project.name}
        aside={project.isPlaceholder ? <PlaceholderBadge label="Sample entry — details to be supplied" /> : null}
      />

      <div ref={root}>
        {/* Overview + key information */}
        <section aria-labelledby="overview-title" className="section-y bg-paper">
          <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="eyebrow" data-reveal="fade">
                Overview
              </p>
              <h2 id="overview-title" className="sr-only">
                Project overview
              </h2>
              {project.description && (
                <p className="mt-8 text-xl font-medium leading-relaxed md:text-2xl" data-reveal="fade">
                  {project.description}
                </p>
              )}
              {project.status === 'ongoing' && (
                <div className="card mt-8 p-6 md:p-8" data-reveal="fade">
                  <p className="meta-label">Current status</p>
                  <StageIndicator stage={project.stage} progress={project.progress} className="mt-6 max-w-lg" />
                </div>
              )}
            </div>

            {info.length > 0 && (
              <aside className="lg:col-span-4 lg:col-start-9" aria-label="Key project information">
                <dl className="card px-6 py-2 md:px-7" data-reveal="stagger">
                  {info.map((row) => (
                    <div key={row.label} className="flex items-baseline justify-between gap-6 border-b border-line py-4 last:border-b-0">
                      <dt className="meta-label">{row.label}</dt>
                      <dd className="text-right text-[15px] font-medium">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            )}
          </div>
        </section>

        {/* Scope of work */}
        {project.scope?.length > 0 && (
          <section aria-labelledby="scope-title" className="section-y border-t border-line bg-surface">
            <div className="container-x grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHeader id="scope-title" label="Scope of Work" title="What we delivered." />
              </div>
              <ol className="grid gap-3 lg:col-span-7 lg:col-start-6">
                {project.scope.map((item, i) => (
                  <li key={`${item}-${i}`} className="flex items-center gap-5 rounded-2xl border border-line bg-paper px-5 py-4 text-lg" data-reveal="fade">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-[12px] font-bold tabular-nums text-brand shadow-card">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* Original record */}
        {record && (
          <section aria-labelledby="record-title" className="section-y border-t border-line bg-paper">
            <div className="container-x">
              <SectionHeader
                id="record-title"
                label="Original Record"
                title="On the record."
                description="The original document for this work, photographed from the family’s archive. Tap a page to read it in full."
              />
              <ArchiveCard
                record={record}
                onOpen={setOpenScan}
                showProjectLink={false}
                className="mt-8 md:mt-12"
                data-reveal="fade"
              />
              <Lightbox
                items={scansToLightbox([record])}
                index={openScan}
                onChange={setOpenScan}
                onClose={() => setOpenScan(null)}
              />
            </div>
          </section>
        )}

        {/* Gallery */}
        {project.gallery?.length > 0 && (
          <section aria-labelledby="gallery-title" className="section-y bg-paper">
            <div className="container-x">
              <SectionHeader id="gallery-title" label="Project Gallery" title="On site." />
              <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-12 md:gap-8">
                {project.gallery.map((image, i) => (
                  <ImageReveal
                    key={i}
                    image={image}
                    alt={`${project.name} — gallery image ${i + 1}`}
                    sizes={i % 3 === 0 ? '100vw' : '(min-width: 768px) 50vw, 100vw'}
                    className={`rounded-[24px] shadow-card-hover ${i % 3 === 0 ? 'aspect-[16/9] md:col-span-12' : 'aspect-[4/3] md:col-span-6'}`}
                    showTag
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section aria-labelledby="related-title" className="section-y border-t border-line bg-surface">
            <div className="container-x">
              <SectionHeader id="related-title" label="Related Projects" title="More of our work." />
              <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-3 md:gap-6" data-reveal="stagger">
                {related.map((p) => (
                  <ProjectCard key={p.slug} project={p} ratio="aspect-[4/3]" sizes="(min-width: 768px) 33vw, 100vw" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Next project */}
        {next && next.slug !== project.slug && (
          <section aria-label="Next project" className="bg-surface pb-4 pt-2">
            <div className="container-x">
            <Link to={`/projects/${next.slug}`} className="card card-interactive group relative block bg-charcoal text-white">
              <Media
                image={next.heroImage}
                alt=""
                sizes="100vw"
                className="absolute inset-0 opacity-50 transition-opacity duration-700 group-hover:opacity-60"
                imgClassName="card-zoom"
              />
              <div className="relative flex flex-col gap-6 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-12 md:py-20">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-label text-white/60">Next project</p>
                  <p className="mt-4 text-[clamp(1.8rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                    {next.name}
                  </p>
                </div>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface text-ink transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                  <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
                </span>
              </div>
            </Link>
            </div>
          </section>
        )}
      </div>

      <CTABand
        eyebrow="Start a Conversation"
        title={['Have a similar project?']}
        cta={{ label: "Let's talk", to: '/contact' }}
      />
    </>
  );
}
