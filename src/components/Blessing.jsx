import { blessing } from '@/data/company';

/**
 * Blessing strip at the very top of the fixed header — centred Hindi line on
 * brand red with gold Om marks. Always visible. Uses a Devanagari typeface and
 * a normal line-height so the matras (ि, ी, ृ, े) are never clipped.
 */
export default function Blessing() {
  return (
    <div
      lang="hi"
      className="relative flex h-[var(--blessing-h)] items-center justify-center overflow-hidden bg-gradient-to-r from-brand-deep via-brand to-brand-deep px-3 text-center"
    >
      <p className="font-devanagari relative flex items-center justify-center gap-2 whitespace-nowrap text-[clamp(14px,4.5vw,20px)] [@media(max-height:500px)]:text-[16px] font-semibold leading-normal tracking-[0.01em] text-gold sm:gap-3 md:gap-4">
        <span aria-hidden="true" className="hidden h-px w-16 bg-gradient-to-r from-transparent to-gold/60 md:block" />
        <span aria-hidden="true" className="text-[1.15em]">{blessing.symbol}</span>
        <span>{blessing.text}</span>
        <span aria-hidden="true" className="text-[1.15em]">{blessing.symbol}</span>
        <span aria-hidden="true" className="hidden h-px w-16 bg-gradient-to-l from-transparent to-gold/60 md:block" />
      </p>
    </div>
  );
}
