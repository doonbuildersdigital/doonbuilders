import { company } from '@/data/company';

/**
 * Typographic wordmark. When the original logo is supplied, set `company.logo`
 * (and optionally `company.logoLight`) and it will be used instead.
 */
export default function Logo({ tone = 'dark', className = '' }) {
  const src = tone === 'light' && company.logoLight ? company.logoLight : company.logo;

  if (src) {
    return <img src={src} alt={company.name} className={`h-9 w-auto md:h-10 ${className}`} />;
  }

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="block h-8 w-[5px] bg-brand md:h-9" />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-extrabold tracking-[0.08em] text-brand md:text-[17px]">
          {company.wordmark}
        </span>
        <span className="mt-[7px] text-[9px] font-medium uppercase tracking-[0.34em] opacity-70">
          {company.tagline}
        </span>
      </span>
    </span>
  );
}
