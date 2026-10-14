import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import ImageReveal from '@/components/ImageReveal';
import ProjectCard from '@/components/ProjectCard';
import StatCounter from '@/components/StatCounter';
import Button from '@/components/Button';
import { useReveal } from '@/hooks/useGSAPAnimation';
import { projectsByOwnership, deliveredCategories } from '@/data/projects';
import { company } from '@/data/company';
import { images } from '@/data/images';

/** Home: government work — infrastructure categories and the government-projects stat. */
export default function GovernmentProjects() {
  const root = useRef(null);
  const strip = useRef(null);
  const government = projectsByOwnership('government');
  useReveal(root);

  const scrollStrip = (direction) => {
    const el = strip.current;
    if (!el) return;
    const card = el.querySelector('article');
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <section ref={root} aria-labelledby="gov-title" className="section-y relative overflow-hidden bg-surface">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <SectionHeader
              id="gov-title"
              label="Government Infrastructure"
              title={['Trusted with', "India's infrastructure."]}
              titleClassName="lg:!text-[clamp(2.25rem,3.7vw,3.75rem)]"
            />
            <p className="lead mt-8 md:mt-10" data-reveal="fade">
              From national highways and railways to bridges, dams and PWD projects, our work has contributed to
              critical infrastructure across generations.
            </p>

            <div className="card mt-10 p-7 md:mt-12 md:p-8" data-reveal="fade">
              <StatCounter
                value={company.stats.governmentProjects}
                label="Government Projects Delivered"
                numberClassName="text-[clamp(3.5rem,7vw,6rem)] font-bold leading-[0.85] tracking-[-0.05em] text-brand"
                labelClassName="mt-4 text-[15px] font-medium text-steel-dark"
              />
            </div>

            <ul className="mt-8 flex flex-wrap gap-2" data-reveal="stagger">
              {deliveredCategories.government.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line bg-paper px-4 py-2 text-[13px] font-medium text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <ImageReveal
              image={images.bridge}
              alt="Steel arch bridge carrying a road across a river"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/5] rounded-[28px] shadow-card-hover lg:h-full lg:min-h-[600px] lg:aspect-auto"
              parallax={8}
              showTag
            />
          </div>
        </div>

        {government.length > 0 && (
          <div className="mt-10 md:mt-14">
            <div className="flex items-end justify-between gap-6 border-b border-line pb-6">
              <p className="text-lg font-semibold tracking-[-0.01em] md:text-xl">Government project archive</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => scrollStrip(-1)}
                  aria-label="Scroll projects left"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface shadow-card transition-all hover:border-brand hover:bg-brand hover:text-white active:scale-95"
                >
                  <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollStrip(1)}
                  aria-label="Scroll projects right"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface shadow-card transition-all hover:border-brand hover:bg-brand hover:text-white active:scale-95"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div
              ref={strip}
              className="scrollbar-none -mx-[var(--gutter)] mt-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] py-6 [scroll-padding-inline:var(--gutter)]"
            >
              {government.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  ratio="aspect-[4/3]"
                  sizes="(min-width: 1024px) 30vw, 80vw"
                  className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
                />
              ))}
            </div>

            <div className="mt-6" data-reveal="fade">
              <Button to="/projects?filter=government" variant="secondary" arrow="right">
                View government projects
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
