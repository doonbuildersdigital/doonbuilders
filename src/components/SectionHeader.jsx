import MaskLines from './MaskLines';

/**
 * Consistent section heading system:
 *   eyebrow  — "02 — Our Capabilities" (small, uppercase, red)
 *   title    — large compact uppercase heading, masked line reveal
 *   description — optional, sits right-aligned on desktop
 */
export default function SectionHeader({
  index,
  label,
  title,
  description,
  tone = 'light',
  as = 'h2',
  className = '',
  titleClassName = '',
  id,
  children,
}) {
  const dark = tone === 'dark';
  return (
    <header className={`grid gap-5 lg:grid-cols-12 lg:gap-10 ${className}`}>
      <div className={description || children ? 'lg:col-span-8' : 'lg:col-span-12'}>
        {(index || label) && (
          <p className={`eyebrow ${dark ? 'eyebrow-on-dark' : ''}`} data-reveal="fade">
            {index && <span>{index}</span>}
            {index && label && <span aria-hidden="true">—</span>}
            {label && <span>{label}</span>}
          </p>
        )}
        <MaskLines
          as={as}
          id={id}
          lines={title}
          className={`h-section mt-4 md:mt-5 ${dark ? 'text-white' : 'text-ink'} ${titleClassName}`}
        />
      </div>
      {(description || children) && (
        <div className="lg:col-span-4 lg:self-end" data-reveal="fade" data-delay="0.15">
          {description && <p className={dark ? 'lead !text-white/70' : 'lead'}>{description}</p>}
          {children}
        </div>
      )}
    </header>
  );
}
