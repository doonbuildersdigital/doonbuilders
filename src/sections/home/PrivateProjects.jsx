import { useRef } from 'react';
import SectionHeader from '@/components/SectionHeader';
import ProjectCard from '@/components/ProjectCard';
import Button from '@/components/Button';
import { useReveal } from '@/hooks/useGSAPAnimation';
import { projectsByOwnership } from '@/data/projects';

const sectors = ['Hotels.', 'Resorts.', 'Hospitals.', 'Commercial developments.'];
const ratios = ['aspect-[4/3]', 'aspect-[4/3]', 'aspect-[4/3]'];

/** Home: private work — hotels, resorts, hospitals (projects.js, ownershipType 'private'). */
export default function PrivateProjects() {
  const root = useRef(null);
  const privateProjects = projectsByOwnership('private').slice(0, 3);
  useReveal(root);

  return (
    <section ref={root} aria-labelledby="private-title" className="section-y bg-paper">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <SectionHeader
              id="private-title"
              label="Private Development"
              title={['From infrastructure', 'to private development.']}
              titleClassName="lg:!text-[clamp(2.5rem,4.6vw,5rem)]"
            />
          </div>
          <ul className="self-end lg:col-span-4 lg:col-start-9" data-reveal="stagger">
            {sectors.map((sector, i) => (
              <li
                key={sector}
                className="flex items-baseline gap-5 border-t border-line py-4 text-xl font-semibold tracking-[-0.01em] last:border-b md:text-2xl"
              >
                <span className="w-6 text-[11px] font-medium tabular-nums text-brand">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {sector}
              </li>
            ))}
          </ul>
        </div>

        {privateProjects.length > 0 && (
          <div className="mt-8 grid items-stretch gap-5 md:mt-10 md:grid-cols-3 md:gap-6" data-reveal="stagger">
            {privateProjects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                ratio={ratios[i % ratios.length]}
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center md:mt-10" data-reveal="fade">
          <Button to="/projects?filter=private" variant="secondary" arrow="right">
            View private projects
          </Button>
        </div>
      </div>
    </section>
  );
}
