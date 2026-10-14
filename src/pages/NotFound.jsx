import Seo from '@/components/Seo';
import Button from '@/components/Button';
import { seo } from '@/data/seo';

/** Shown for any unknown URL (and for a project slug that does not exist). */
export default function NotFound() {
  return (
    <>
      <Seo {...seo.notFound} noindex />
      <section className="relative flex min-h-[100svh] overflow-hidden bg-surface">
        <div aria-hidden="true" className="bg-blueprint absolute inset-0" />
        <div className="container-x relative flex w-full flex-col justify-center pb-16 pt-[calc(var(--header-h)+48px)]">
          <p
            aria-hidden="true"
            className="select-none text-[clamp(8rem,32vw,26rem)] font-extrabold leading-[0.78] tracking-[-0.06em] text-transparent [-webkit-text-stroke:2px_rgba(200,16,46,0.35)]"
          >
            404
          </p>
          <div className="mt-10 grid gap-8 border-t border-line pt-10 md:grid-cols-12">
            <h1 className="h-section md:col-span-7">Page not found</h1>
            <div className="md:col-span-4 md:col-start-9">
              <p className="text-lg leading-relaxed text-steel-dark">
                The structure may have changed, but the foundation remains.
              </p>
              <Button to="/" arrow="right" className="mt-8">
                Back to home
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
