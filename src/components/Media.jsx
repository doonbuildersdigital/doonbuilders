/**
 * Responsive image with AVIF/WebP sources, object-cover, and a fixed-ratio wrapper
 * (pass an aspect class like `aspect-[16/10]` or let the parent size it).
 *
 * `image` may be:
 *   - a responsive descriptor from data/images.js  ({ base, widths, formats })
 *   - a plain string path                           ('/images/projects/site.jpg')
 *   - an object with src                            ({ src: '/images/x.jpg' })
 *   - null / undefined → architectural placeholder (no fake photography)
 */
export function buildSources(image) {
  if (!image) return null;
  if (typeof image === 'string') return { src: image };
  if (image.src) return { src: image.src };

  const { base, widths, formats } = image;
  const srcSet = (format) => widths.map((w) => `${base}-${w}.${format} ${w}w`).join(', ');
  const fallbackWidth = widths.includes(1280) ? 1280 : widths[widths.length - 1];
  const fallbackFormat = formats.includes('webp') ? 'webp' : formats[formats.length - 1];
  return {
    src: `${base}-${fallbackWidth}.${fallbackFormat}`,
    sources: formats.map((format) => ({ type: `image/${format}`, srcSet: srcSet(format) })),
  };
}

export function MediaPlaceholder({ label = 'Photograph to be supplied', className = '' }) {
  return (
    <div className={`placeholder-grid absolute inset-0 ${className}`} aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100%" y2="100%" style={{ stroke: 'rgb(var(--ink) / 0.07)' }} strokeWidth="1" />
        <line x1="100%" y1="0" x2="0" y2="100%" style={{ stroke: 'rgb(var(--ink) / 0.07)' }} strokeWidth="1" />
      </svg>
      <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 text-[9px] font-medium uppercase leading-snug tracking-[0.12em] text-steel-dark md:inset-x-5 md:bottom-5 md:gap-4 md:text-[10px] md:tracking-label">
        <span className="min-w-0 break-words">{label}</span>
        <span className="hidden shrink-0 text-steel md:inline">DB</span>
      </div>
    </div>
  );
}

export default function Media({
  image,
  alt = '',
  sizes = '100vw',
  eager = false,
  className = '',
  imgClassName = '',
  placeholderLabel,
  showTag = false,
  parallax,
  children,
  ...rest
}) {
  const media = buildSources(image);
  // Callers may position the wrapper themselves (e.g. `absolute inset-0` as a background);
  // only default to `relative` when they don't, since Tailwind's `relative` would win.
  const positioned = /(^|\s)!?(absolute|fixed|sticky)(\s|$)/.test(className);

  const picture = media && (
    <picture>
      {media.sources?.map((source) => (
        <source key={source.type} type={source.type} srcSet={source.srcSet} sizes={sizes} />
      ))}
      <img
        src={media.src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        decoding={eager ? 'sync' : 'async'}
        className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
      />
    </picture>
  );

  return (
    <div className={`${positioned ? '' : 'relative'} overflow-hidden bg-mist ${className}`} {...rest}>
      {!media && <MediaPlaceholder label={placeholderLabel} />}
      {media &&
        (parallax ? (
          <div className="absolute inset-x-0 -top-[10%] h-[120%]" data-parallax={parallax}>
            {picture}
          </div>
        ) : (
          picture
        ))}
      {showTag && image?.placeholder && (
        <span className="pointer-events-none absolute right-3 top-3 z-[2] rounded-full bg-surface/85 px-2.5 py-1 text-[9px] font-medium uppercase tracking-label text-ink/70 shadow-card backdrop-blur-sm">
          Representative image
        </span>
      )}
      {children}
    </div>
  );
}
