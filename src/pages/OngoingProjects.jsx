import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import Media from '@/components/Media';
import PlaceholderBadge from '@/components/PlaceholderBadge';
import StageIndicator from '@/components/StageIndicator';
import CTABand from '@/components/CTABand';
import { useReveal } from '@/hooks/useGSAPAnimation';
import { ongoingProjects, categoryLabel, ownershipLabel, stageOrder, stageLabels } from '@/data/projects';
import { sitePhotos } from '@/data/images';
import { seo } from '@/data/seo';

const stageNotes = {
  planning: 'Surveys, approvals and mobilisation.',
  execution: 'Construction under way on site.',
  finishing: 'Final works, finishing and handover preparation.',
  completed: 'Delivered and handed over.',
};

function OngoingRow({ project, index }) {
  const owner = project.client || project.authority;
  const rows = [
    { label: 'Location', value: project.location },
    { label: project.client ? 'Client' : 'Authority', value: owner },
    { label: 'Project Type', value: [ownershipLabel(project), categoryLabel(project)].filter(Boolean).join(' · ') },
  ].filter((r) => r.value);

  return (
    <article data-reveal="fade">
      <div className="card card-interactive group grid gap-6 p-4 md:grid-cols-12 md:gap-10 md:p-6">
      <Link to={`/projects/${project.slug}`} className="block md:col-span-5" tabIndex={-1} aria-hidden="true">
        <Media
          image={project.heroImage}
          alt=""
          sizes="(min-width: 768px) 40vw, 100vw"
          className="aspect-[3/2] h-full rounded-xl"
          imgClassName="card-zoom"
          placeholderLabel="Project photograph to be supplied"
        >
          {project.isPlaceholder && <PlaceholderBadge className="absolute left-4 top-4" />}
        </Media>
      </Link>

      <div className="flex flex-col px-2 pb-3 md:col-span-7 md:px-0 md:py-2">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-[12px] font-semibold tabular-nums text-brand">{String(index + 1).padStart(2, '0')}</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.02em] md:text-3xl">
              <Link to={`/projects/${project.slug}`} className="transition-colors hover:text-brand">
                {project.name}
              </Link>
            </h2>
          </div>
          <ArrowUpRight
            aria-hidden="true"
            strokeWidth={1.5}
            className="mt-4 h-6 w-6 shrink-0 text-steel transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
          />
        </div>

        {rows.length > 0 && (
          <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-3">
            {rows.map((r) => (
              <div key={r.label}>
                <dt className="meta-label">{r.label}</dt>
                <dd className="mt-2 text-[15px] font-medium">{r.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-auto pt-10">
          <p className="meta-label mb-5">Current status — {stageLabels[project.stage]}</p>
          <StageIndicator stage={project.stage} progress={project.progress} />
        </div>
      </div>
      </div>
    </article>
  );
}

/** Route /ongoing-projects — projects with status 'ongoing' in projects.js, with their current stage. */
export default function OngoingProjects() {
  const root = useRef(null);
  const list = ongoingProjects();
  useReveal(root);

  return (
    <>
      <Seo {...seo.ongoing} path="/ongoing-projects" />
      <PageHero
        crumb="Ongoing Projects"
        eyebrow="Under Execution"
        title={['Building what', 'comes next.']}
        description="Projects currently under execution by Doon Builders."
        image={sitePhotos.basementShuttering}
        imageAlt="Basement slab formwork on a Doon Builders site, with a backhoe loader and concrete mixer"
      />

      <section ref={root} aria-label="Ongoing projects" className="section-y bg-paper">
        <div className="container-x">
          {/* Status system legend */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
            {stageOrder.map((stage, i) => (
              <div key={stage} className="card p-5">
                <p className="text-[11px] font-semibold uppercase tracking-label">
                  <span className="mr-3 text-brand">{String(i + 1).padStart(2, '0')}</span>
                  {stageLabels[stage]}
                </p>
                <p className="mt-2 text-sm text-steel-dark">{stageNotes[stage]}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:mt-12">
            {list.length > 0 ? (
              list.map((project, i) => <OngoingRow key={project.slug} project={project} index={i} />)
            ) : (
              <p className="card p-8 text-lg">Ongoing project details will be published here.</p>
            )}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Start a Conversation"
        title={['Planning what', 'comes next?']}
        text="Let's build it with experience."
      />
    </>
  );
}
