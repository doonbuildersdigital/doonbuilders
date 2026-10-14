import { useRef } from 'react';
import { gsap, useGSAP, DESKTOP_MOTION } from '@/lib/gsap';
import { useReveal } from '@/hooks/useGSAPAnimation';
import Media from '@/components/Media';
import MaskLines from '@/components/MaskLines';
import { timeline, personName } from '@/data/timeline';

/**
 * Signature section. Desktop (with motion): pinned storytelling — each generation
 * replaces the previous as you scroll. Mobile / reduced motion: stacked scenes.
 */
export default function Generations() {
  const root = useRef(null);
  useReveal(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const section = root.current;
        section.classList.add('is-pinned');

        const scenes = gsap.utils.toArray('[data-gen-scene]', section);
        const bars = gsap.utils.toArray('[data-gen-bar]', section);
        const steps = gsap.utils.toArray('[data-gen-step]', section);
        const text = (scene) => scene.querySelector('[data-gen-text]');
        const media = (scene) => scene.querySelector('[data-gen-media]');

        scenes.slice(1).forEach((scene) => {
          gsap.set(text(scene), { autoAlpha: 0, y: 60 });
          gsap.set(media(scene), { clipPath: 'inset(100% 0% 0% 0%)' });
        });

        const setStep = (active) =>
          steps.forEach((step, i) => step.setAttribute('data-state', i <= active ? 'active' : 'idle'));
        setStep(0);

        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${window.innerHeight * scenes.length}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress * scenes.length;
              bars.forEach((bar, i) => gsap.set(bar, { scaleX: gsap.utils.clamp(0, 1, p - i) }));
              setStep(Math.min(scenes.length - 1, Math.floor(p)));
            },
          },
        });

        scenes.slice(1).forEach((scene, i) => {
          const previous = scenes[i];
          tl.to(text(previous), { autoAlpha: 0, y: -60, duration: 0.5 }, '+=0.6')
            .to(media(scene), { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, '<')
            .to(text(scene), { autoAlpha: 1, y: 0, duration: 0.6 }, '<0.35');
        });
        tl.to({}, { duration: 0.6 }); // hold the final scene

        return () => {
          section.classList.remove('is-pinned');
          steps.forEach((step) => step.removeAttribute('data-state'));
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="generations-title" className="generations relative bg-paper text-ink">
      <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0" />

      <header className="container-x relative pt-[76px] md:pt-[110px] lg:pt-[calc(var(--header-h)+24px)]">
        <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between lg:pb-6">
          <div>
            <p className="eyebrow" data-reveal="fade">
              Three Generations
            </p>
            <MaskLines
              as="h2"
              id="generations-title"
              lines={['Three generations.', 'One legacy.']}
              className="h-section mt-6 lg:mt-5 lg:!text-[clamp(2rem,3.4vw,3.5rem)]"
            />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-steel-dark">
            The same family, the same fundamentals — carried forward from one generation to the next.
          </p>
        </div>
      </header>

      <div className="gen-stage container-x relative">
        {timeline.map((era, i) => (
          <article
            key={era.year}
            data-gen-scene
            aria-label={`${era.year} — ${era.generation}`}
            className="gen-scene grid gap-10 border-b border-line py-14 last:border-b-0 md:py-20 lg:grid-cols-12 lg:gap-12 lg:py-8"
          >
            <div data-gen-text className="flex flex-col justify-center lg:col-span-5">
              <p className="text-[clamp(4.5rem,min(10vw,19vh),11rem)] font-bold leading-[0.8] tracking-[-0.055em] text-brand">
                {era.year}
              </p>
              <p className="eyebrow mt-7 lg:mt-8">{era.generation}</p>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{personName(era)}</h3>
              <ul className="mt-7 flex flex-wrap gap-2 border-t border-line pt-6 lg:mt-8">
                {era.focus.map((item) => (
                  <li key={item} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13px] font-medium text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-gen-media
              className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-card-hover lg:col-span-6 lg:col-start-7 lg:aspect-auto lg:h-full"
            >
              <Media
                image={era.image}
                alt={era.imageAlt}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="absolute inset-0"
                showTag
              />
              {era.portrait && (
                <div className="absolute bottom-0 left-0 w-[40%] max-w-[220px] overflow-hidden rounded-tr-2xl border-r-[6px] border-t-[6px] border-paper lg:w-[34%]">
                  <Media
                    image={era.portrait}
                    alt={era.person ? `Portrait of ${era.person}` : ''}
                    sizes="220px"
                    className="aspect-[4/5]"
                  />
                </div>
              )}
              <span className="absolute right-4 top-4 rounded-full bg-surface/90 px-3 py-1.5 text-[11px] font-semibold tabular-nums text-ink shadow-card">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Scene progress (desktop pinned mode) */}
      <div className="container-x relative hidden pb-8 lg:block" aria-hidden="true">
        <ol className="grid grid-cols-3 gap-6">
          {timeline.map((era) => (
            <li key={era.year} data-gen-step className="group">
              <span className="relative block h-[3px] overflow-hidden rounded-full bg-ink/10">
                <span data-gen-bar className="absolute inset-0 origin-left bg-brand" />
              </span>
              <span className="mt-3 flex justify-between text-[11px] uppercase tracking-label text-ink transition-colors duration-500 group-data-[state=idle]:text-steel/60">
                <span>{era.year}</span>
                <span>{era.generation}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
