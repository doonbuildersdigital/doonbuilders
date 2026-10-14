import { useMemo, useRef, useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import FilterBar from '@/components/FilterBar';
import ProjectCard from '@/components/ProjectCard';
import Button from '@/components/Button';
import { useReveal, useFilterTransition } from '@/hooks/useGSAPAnimation';
import { featuredProjects, applyFilter, filters, homeFilterKeys } from '@/data/projects';

// Alternating 7/5 then 5/7 card rows (image heights match per row), then one wide card.
const layout = [
  { span: 'md:col-span-7', ratio: 'aspect-[16/10]' },
  { span: 'md:col-span-5', ratio: 'aspect-[16/10] md:aspect-[8/7]' },
  { span: 'md:col-span-5', ratio: 'aspect-[16/10] md:aspect-[8/7]' },
  { span: 'md:col-span-7', ratio: 'aspect-[16/10]' },
  { span: 'md:col-span-12', ratio: 'aspect-[16/10] md:aspect-[21/9]' },
];

/** Home: filterable grid of featured projects (projects.js, `featured: true`). */
export default function FeaturedProjects() {
  const root = useRef(null);
  const grid = useRef(null);
  const [filter, setFilter] = useState('all');
  const featured = useMemo(() => featuredProjects(), []);
  const visible = useMemo(() => applyFilter(featured, filter).slice(0, layout.length), [featured, filter]);

  useReveal(root);
  useFilterTransition(grid, filter);

  const options = homeFilterKeys.map((key) => ({ key, label: filters[key].label }));

  return (
    <section ref={root} aria-labelledby="featured-title" className="section-y bg-paper">
      <div className="container-x">
        <SectionHeader
          id="featured-title"
          label="Selected Work"
          title={['Projects that define', 'our experience.']}
        />

        <FilterBar
          options={options}
          active={filter}
          onChange={setFilter}
          label="Filter featured projects"
          className="mt-8 md:mt-10"
        />

        <div ref={grid} data-reveal="stagger" className="mt-10 grid items-stretch gap-5 md:mt-12 md:grid-cols-12 md:gap-6">
          {visible.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              ratio={layout[i].ratio}
              className={layout[i].span}
              index={String(i + 1).padStart(2, '0')}
              sizes={layout[i].span.includes('12') ? '100vw' : '(min-width: 768px) 58vw, 100vw'}
            />
          ))}
          {visible.length === 0 && (
            <p className="text-steel-dark md:col-span-12">No featured projects in this category yet.</p>
          )}
        </div>

        <div className="mt-8 flex justify-center md:mt-10" data-reveal="fade">
          <Button to="/projects" variant="secondary" arrow="right">
            Explore all projects
          </Button>
        </div>
      </div>
    </section>
  );
}
