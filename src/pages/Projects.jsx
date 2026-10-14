import { useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import FilterBar from '@/components/FilterBar';
import ProjectCard from '@/components/ProjectCard';
import CTABand from '@/components/CTABand';
import { useReveal, useFilterTransition } from '@/hooks/useGSAPAnimation';
import { projects, applyFilter, filters, projectsPageFilterKeys } from '@/data/projects';
import { images } from '@/data/images';
import { seo } from '@/data/seo';

// Ratios cycle to create an editorial masonry rhythm.
const ratios = ['aspect-[4/5]', 'aspect-[16/10]', 'aspect-[3/2]', 'aspect-[16/10]', 'aspect-[4/5]', 'aspect-[3/2]'];

/** Route /projects — every project from projects.js, filterable by ?filter=. */
export default function Projects() {
  const root = useRef(null);
  const grid = useRef(null);
  const [params, setParams] = useSearchParams();
  const requested = params.get('filter');
  const active = projectsPageFilterKeys.includes(requested) ? requested : 'all';

  const visible = useMemo(() => applyFilter(projects, active), [active]);
  const options = projectsPageFilterKeys.map((key) => ({
    key,
    label: filters[key].label,
    count: applyFilter(projects, key).length,
  }));

  const onChange = (key) => {
    setParams(key === 'all' ? {} : { filter: key }, { replace: true, preventScrollReset: true });
  };

  useReveal(root);
  useFilterTransition(grid, active);

  return (
    <>
      <Seo {...seo.projects} path="/projects" />
      <PageHero
        crumb="Projects"
        eyebrow="Selected Work"
        title="Our projects"
        description="Decades of construction. Hundreds of completed works. One legacy."
        image={images.siteAerial}
        imageAlt="Aerial view of a construction site"
      />

      <section ref={root} aria-label="Project index" className="section-y bg-paper">
        <div className="container-x">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
            <FilterBar
              options={options}
              active={active}
              onChange={onChange}
              label="Filter projects by type"
              className="md:flex-1"
            />
            <p className="meta-label shrink-0" aria-live="polite">
              {visible.length} {visible.length === 1 ? 'project' : 'projects'}
            </p>
          </div>

          {visible.length > 0 ? (
            <div ref={grid} data-reveal="stagger" className="mt-10 columns-1 gap-6 md:mt-12 md:columns-2 xl:columns-3">
              {visible.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  ratio={ratios[i % ratios.length]}
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  index={String(i + 1).padStart(2, '0')}
                  className="mb-6 break-inside-avoid"
                />
              ))}
            </div>
          ) : (
            <div ref={grid} className="card mt-8 p-8">
              <p className="text-lg font-medium">No projects published in this category yet.</p>
              <p className="mt-2 text-steel-dark">Project records are being added. Try another category.</p>
            </div>
          )}
        </div>
      </section>

      <CTABand
        eyebrow="Start a Conversation"
        title={['Have a project', 'to build?']}
        text="Let's build it with experience."
      />
    </>
  );
}
