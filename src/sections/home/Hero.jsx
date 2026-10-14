import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Pause, Play } from 'lucide-react';
import { gsap, useGSAP, MOTION_OK, prefersReducedMotion } from '@/lib/gsap';
import { introIsActive, INTRO_HANDOFF } from '@/lib/intro';
import Button from '@/components/Button';
import { company, brandMessages, statList } from '@/data/company';
import { heroVideo } from '@/data/images';

/**
 * Full-screen home hero: looping construction footage behind a dark gradient, with the
 * headline, calls to action and key figures on top. The hero is always dark, in both themes.
 * Reduced motion: the video does not autoplay (poster frame instead) and can be started manually.
 */
export default function Hero() {
  const root = useRef(null);
  const video = useRef(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  // Autoplay (muted) unless reduced motion; pause while off-screen to save battery.
  useEffect(() => {
    const el = video.current;
    if (!el) return undefined;
    el.muted = true;
    if (prefersReducedMotion()) userPaused.current = true;

    const tryPlay = () => {
      if (userPaused.current) return;
      el.play().catch(() => setPlaying(false));
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) tryPlay();
      else el.pause();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const togglePlayback = () => {
    const el = video.current;
    if (!el) return;
    if (el.paused) {
      userPaused.current = false;
      el.play().catch(() => {});
    } else {
      userPaused.current = true;
      el.pause();
    }
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const delay = introIsActive() ? INTRO_HANDOFF : 0.15;

        gsap
          .timeline({ delay, defaults: { ease: 'power3.out' } })
          .from('[data-hero-video]', { autoAlpha: 0, duration: 1.4, ease: 'power1.out' }, 0)
          .from('[data-hero-eyebrow]', { y: 16, autoAlpha: 0, duration: 0.8 }, 0.1)
          .from('.line-inner', { yPercent: 110, duration: 1.15, stagger: 0.12, ease: 'power4.out' }, 0.2)
          .from('[data-hero-copy]', { y: 20, autoAlpha: 0, duration: 0.9 }, 0.7)
          .from('[data-hero-cta] > *', { y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 0.85)
          .from('[data-hero-stat]', { y: 28, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 1)
          .from('[data-hero-aside] > *', { y: 16, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 1.15);

        // Content drifts up and fades as the hero scrolls away. The video itself is never
        // transformed: moving a playing <video> can leave unpainted bands on some GPUs.
        gsap.to('[data-hero-content]', {
          yPercent: -8,
          autoAlpha: 0.2,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="on-dark relative isolate flex min-h-[100svh] overflow-hidden bg-night text-white"
    >
      {/* Background video. The poster is also painted behind it, and both sit on their own GPU
          layer, so a frame the GPU fails to paint (a dark band on some Windows GPUs while
          scrolling or resizing) shows the poster instead of the empty background. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 transform-gpu overflow-hidden bg-night bg-cover bg-center"
        style={{ backgroundImage: `url(${heroVideo.poster})` }}
      >
        <video
          ref={video}
          data-hero-video
          className="absolute inset-0 h-full w-full transform-gpu object-cover"
          poster={heroVideo.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          {heroVideo.sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} media={source.media} />
          ))}
        </video>
      </div>

      {/* Legibility overlays */}
      {/* Kept light so the footage stays bright; the scrim is darkest only behind the headline. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-night/70 via-night/25 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-gradient-to-t from-night/50 via-night/15 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-night/45 to-transparent" />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-40 -z-10 h-[520px] w-[520px] rounded-full bg-brand/15 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px)',
          backgroundSize: 'calc((100% - 2 * var(--gutter)) / 4) 100%',
          backgroundPosition: 'var(--gutter) 0',
        }}
      />

      <div
        data-hero-content
        className="container-x relative flex w-full flex-col justify-end pb-8 pt-[calc(var(--header-h)+40px)] md:pb-10 lg:pb-14"
      >
        <div className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <div data-hero-eyebrow className="flex flex-wrap items-center gap-3">
              <p className="eyebrow eyebrow-on-dark">
                Est. {company.founded} <span aria-hidden="true">•</span> {company.country}
              </p>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-[12px] font-semibold leading-none text-white backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Projects under execution
              </p>
            </div>

            <h1
              id="hero-title"
              className="mt-6 font-bold leading-[0.98] tracking-[-0.04em] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.35)] md:mt-8"
              style={{ fontSize: 'clamp(2.25rem, min(12vw, 11.5vh), 7rem)' }}
            >
              <span className="line-mask">
                <span className="line-inner">Building India</span>
              </span>
              <span className="line-mask">
                <span className="line-inner">
                  <span className="text-brand-bright">since {company.founded}.</span>
                </span>
              </span>
            </h1>

            <p data-hero-copy className="mt-6 max-w-xl text-base leading-relaxed text-white/90 [text-shadow:0_1px_14px_rgba(0,0,0,0.6)] md:mt-8 md:text-xl">
              {brandMessages.supporting} Roads, bridges, dams and the buildings that followed — delivered by one family
              of builders.
            </p>

            <div data-hero-cta className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-10">
              <Button to="/projects" size="lg">
                View Our Projects
              </Button>
              <Button to="/contact" variant="secondary-light" size="lg" arrow={null}>
                Discuss a Project
              </Button>
            </div>
          </div>

          {/* Key figures + video controls */}
          <div className="flex flex-col gap-5 lg:col-span-4 lg:pr-12 xl:col-span-3 xl:col-start-10 2xl:pr-0">
            <dl className="grid grid-cols-3 gap-2.5 sm:gap-4 lg:grid-cols-1 lg:gap-3">
              {statList.map((stat) => (
                <div
                  key={stat.key}
                  data-hero-stat
                  className="flex flex-col-reverse justify-end gap-2 rounded-2xl border border-white/15 bg-white/[0.07] px-3.5 py-4 backdrop-blur-md md:px-5 md:py-5 lg:flex-row-reverse lg:items-center lg:gap-5 lg:py-4"
                >
                  <dt className="text-[10.5px] font-medium leading-snug text-white/65 md:text-[12px]">{stat.label}</dt>
                  <dd className="text-[1.6rem] font-bold leading-none tracking-[-0.03em] text-white sm:text-3xl md:text-[2.5rem] lg:min-w-[4.2ch]">
                    {String(stat.value).padStart(stat.pad || 0, '0')}
                  </dd>
                </div>
              ))}
            </dl>

            <div data-hero-aside className="flex items-center justify-between gap-6">
              <a
                href="#main-after-hero"
                className="group hidden items-center gap-3 text-[11px] font-semibold uppercase tracking-label text-white/70 transition-colors hover:text-white md:flex lg:hidden 2xl:flex"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-night">
                  <ArrowDown className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </span>
                <span className="lg:sr-only">Scroll</span>
              </a>
              <div className="flex items-center gap-3 md:ml-auto">
                {heroVideo.placeholder && (
                  <span className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.14em] text-white/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">Representative footage</span>
                )}
                <button
                  type="button"
                  onClick={togglePlayback}
                  aria-label={playing ? 'Pause background video' : 'Play background video'}
                  title={playing ? 'Pause video' : 'Play video'}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-night"
                >
                  {playing ? (
                    <Pause className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  ) : (
                    <Play className="ml-0.5 h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span id="main-after-hero" className="absolute bottom-0" aria-hidden="true" />
    </section>
  );
}
