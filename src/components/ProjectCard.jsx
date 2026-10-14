import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import Media from './Media';
import PlaceholderBadge from './PlaceholderBadge';
import { categoryLabel, ownershipLabel } from '@/data/projects';

/**
 * Project card used across Home, Projects, Delivered and related-project lists.
 * White card with soft shadow; lifts on hover, zooms slightly while pressed.
 * Pass an aspect class through `ratio` to vary the image height.
 */
export default function ProjectCard({
  project,
  ratio = 'aspect-[16/10]',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  index,
  className = '',
}) {
  const sub = [project.location, project.year].filter(Boolean).join(' · ');

  return (
    <article className={className}>
      <Link
        to={`/projects/${project.slug}`}
        className="card card-interactive group flex h-full flex-col focus-visible:outline-offset-4"
      >
        <Media
          image={project.heroImage}
          alt={project.imageAlt || project.name}
          sizes={sizes}
          className={ratio}
          imgClassName="card-zoom"
          placeholderLabel="Project photograph to be supplied"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-night/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {project.isPlaceholder && <PlaceholderBadge />}
            </div>
            {index && (
              <span className="rounded-full bg-surface/90 px-2.5 py-1 text-[11px] font-semibold tabular-nums text-ink shadow-card backdrop-blur-sm">
                {index}
              </span>
            )}
          </div>
        </Media>

        <div className="flex flex-1 items-start justify-between gap-5 p-5 md:p-6">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-1.5">
              {ownershipLabel(project) && (
                <span className="rounded-full bg-brand/[0.08] px-2.5 py-1 text-[11px] font-semibold text-brand">
                  {ownershipLabel(project)}
                </span>
              )}
              {categoryLabel(project) && (
                <span className="rounded-full bg-paper px-2.5 py-1 text-[11px] font-semibold text-steel-dark ring-1 ring-line">
                  {categoryLabel(project)}
                </span>
              )}
            </div>
            <h3 className="mt-3.5 text-lg font-semibold leading-snug tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-brand md:text-xl">
              {project.name}
            </h3>
            {sub && (
              <p className="mt-2 flex items-center gap-1.5 text-sm text-steel-dark">
                <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
                {sub}
              </p>
            )}
          </div>
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-all duration-500 ease-arch group-hover:border-brand group-hover:bg-brand group-hover:text-white"
          >
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" strokeWidth={2} />
          </span>
        </div>
      </Link>
    </article>
  );
}
