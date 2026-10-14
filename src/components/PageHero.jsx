import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap';
import Media from './Media';
import MaskLines from './MaskLines';

/**
 * Inner-page hero. Light, with the title on the left and the image in a
 * rounded card on the right (stacked on mobile). Works without an image.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = '',
  crumb,
  aside,
  children,
}) {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ delay: 0.1 })
          .from('[data-ph-eyebrow]', { autoAlpha: 0, y: 14, duration: 0.8 }, 0)
          .from('.line-inner', { yPercent: 110, duration: 1.1, stagger: 0.1, ease: 'power4.out' }, 0.1)
          .from('[data-ph-fade]', { autoAlpha: 0, y: 20, duration: 0.9, stagger: 0.1 }, 0.5)
          .from('[data-ph-media]', { autoAlpha: 0, y: 36, scale: 0.97, duration: 1.2 }, 0.2);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden border-b border-line bg-surface pb-10 pt-[calc(var(--header-h)+28px)] md:pb-14 md:pt-[calc(var(--header-h)+40px)]"
    >
      <div aria-hidden="true" className="bg-blueprint absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />

      <div className="container-x relative">
        <div className={`grid gap-10 lg:items-center ${image ? 'lg:grid-cols-12 lg:gap-12' : ''}`}>
          <div className={image ? 'lg:col-span-6' : 'max-w-4xl'}>
            <div data-ph-eyebrow className="flex flex-wrap items-center gap-x-4 gap-y-3">
              {crumb && (
                <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] font-medium text-steel-dark">
                  <Link to="/" className="transition-colors hover:text-brand">
                    Home
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                  <span aria-current="page" className="text-ink">
                    {crumb}
                  </span>
                </nav>
              )}
            </div>
            {eyebrow && (
              <p data-ph-fade className="eyebrow mt-6">
                {eyebrow}
              </p>
            )}
            <MaskLines as="h1" lines={title} reveal={false} className="display-xl mt-5 text-ink md:mt-6" />
            {description && (
              <p data-ph-fade className="lead mt-6 md:mt-7">
                {description}
              </p>
            )}
            {aside && (
              <div data-ph-fade className="mt-8">
                {aside}
              </div>
            )}
          </div>

          {image && (
            <div data-ph-media className="lg:col-span-6">
              <Media
                image={image}
                alt={imageAlt}
                eager
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="aspect-[16/11] rounded-[28px] shadow-card-hover ring-1 ring-ink/5"
              />
            </div>
          )}
        </div>
        {children && <div data-ph-fade>{children}</div>}
      </div>
    </section>
  );
}
