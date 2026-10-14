import { useMemo, useRef, useState } from 'react';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import FilterBar from '@/components/FilterBar';
import ProjectCard from '@/components/ProjectCard';
import StatCounter from '@/components/StatCounter';
import SectionHeader from '@/components/SectionHeader';
import CTABand from '@/components/CTABand';
import { useReveal, useFilterTransition } from '@/hooks/useGSAPAnimation';
import { completedProjects, deliveredCategories, filters, applyFilter } from '@/data/projects';
import { company } from '@/data/company';
import { images } from '@/data/images';
import { seo } from '@/data/seo';

const candidateFilters = ['all', 'government', 'private', 'roads-highways', 'bridges', 'dams', 'irrigation', 'railways', 'pwd', 'hospitality', 'healthcare', 'commercial'];

function CategoryBlock({ title, highlight, items }) {
  return (
    <div className="card p-6 md:p-8" data-reveal="fade">
      <div className="flex items-baseline justify-between gap-6">
        <h3 className="text-2xl font-bold tracking-[-0.02em] md:text-3xl">{title}</h3>
        {highlight}
      </div>
      <ul className="mt-7 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-full border border-line bg-paper px-4 py-2 text-[14px] font-medium">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Route /projects-delivered — completed projects from projects.js, filterable by category. */
export default function DeliveredProjects() {
  const root = useRef(null);
  const grid = useRef(null);
  const [active, setActive] = useState('all');
  const archive = useMemo(() => completedProjects(), []);
  const visible = useMemo(() => applyFilter(archive, active), [archive, active]);

  // Only offer filters that actually have delivered projects behind them.
  const options = candidateFilters
    .map((key) => ({ key, label: filters[key].label, count: applyFilter(archive, key).length }))
    .filter((o) => o.key === 'all' || o.count > 0);

  useReveal(root);
  useFilterTransition(grid, active);

  return (
    <>
      <Seo {...seo.delivered} path="/projects-delivered" />
      <PageHero
        crumb="Projects Delivered"
        eyebrow={`${company.founded} — Present`}
        title={[`${parseInt(company.stats.experience, 10)} years of work.`, 'A legacy you can see.']}
        image={images.bridge}
        imageAlt="Arched bridge over a river at sunset"
      />

      <div ref={root}>
        <section aria-labelledby="delivered-overview" className="section-y bg-surface">
          <div className="container-x">
            <SectionHeader
              id="delivered-overview"
              label="Delivered Across Sectors"
              title={['Government and', 'private work.']}
            />
            <div className="mt-8 grid gap-6 md:mt-10 lg:grid-cols-2">
              <CategoryBlock
                title="Government Projects"
                highlight={
                  <StatCounter
                    value={company.stats.governmentProjects}
                    label="Delivered"
                    numberClassName="text-4xl font-semibold leading-none tracking-[-0.03em] text-brand md:text-5xl"
                    labelClassName="meta-label mt-2"
                    className="text-right"
                  />
                }
                items={deliveredCategories.government}
              />
              <CategoryBlock
                title="Private Projects"
                highlight={<span className="meta-label">Multi-sector</span>}
                items={deliveredCategories.private}
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="archive-title" className="section-y bg-paper">
          <div className="container-x">
            <SectionHeader id="archive-title" label="Project Archive" title="The visual record." />
            <FilterBar
              options={options}
              active={active}
              onChange={setActive}
              label="Filter delivered projects"
              className="mt-8 md:mt-10"
            />
            <div
              ref={grid}
              data-reveal="stagger"
              className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-12 md:gap-6 lg:grid-cols-3"
            >
              {visible.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  ratio="aspect-[3/2]"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              ))}
            </div>
            {visible.length === 0 && (
              <p className="mt-10 text-steel-dark">No delivered projects in this category have been published yet.</p>
            )}
          </div>
        </section>
      </div>

      <CTABand
        eyebrow="Start a Conversation"
        title={['Have a project', 'to build?']}
        text="Let's build it with experience."
      />
    </>
  );
}
