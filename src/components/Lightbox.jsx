import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { buildSources } from './Media';
import { setScrollLocked } from '@/hooks/useLenis';

/**
 * Full-screen photo viewer on a light, blurred backdrop.
 * items: [{ image, alt, title, text, tag }]; `index` null = closed.
 * Keyboard: Esc closes, ← / → step through photos.
 */
export default function Lightbox({ items, index, onChange, onClose }) {
  const closeRef = useRef(null);
  const open = index !== null && index !== undefined;
  const item = open ? items[index] : null;

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    setScrollLocked(true);
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      setScrollLocked(false);
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const step = (dir) => onChange((index + dir + items.length) % items.length);
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, index, items.length, onChange, onClose]);

  if (!item) return null;
  const media = buildSources(item.image);

  const step = (dir) => onChange((index + dir + items.length) % items.length);
  const navButton =
    'flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand hover:shadow-card-hover active:scale-95';

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      data-lenis-prevent
      className="lightbox-fade fixed inset-0 z-[120] flex flex-col bg-paper/90 backdrop-blur-xl"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="container-x flex items-center justify-between py-4">
        <p className="text-sm font-semibold tabular-nums text-steel-dark">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close photo" className={navButton}>
          <X className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      <div
        className="container-x flex min-h-0 flex-1 items-center justify-center gap-4 md:gap-8"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={`${navButton} hidden md:flex`}>
          <ChevronLeft className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </button>

        <figure key={index} className="lightbox-zoom flex h-full max-h-full min-h-0 w-full max-w-5xl flex-col items-center gap-5 md:flex-row md:items-center md:gap-10">
          {media && (
            <picture className="flex min-h-0 shrink justify-center">
              {media.sources?.map((source) => (
                <source key={source.type} type={source.type} srcSet={source.srcSet} sizes="(min-width: 768px) 45vw, 90vw" />
              ))}
              <img
                src={media.src}
                alt={item.alt}
                className="h-auto max-h-[58vh] w-auto max-w-full rounded-2xl bg-mist object-contain shadow-card-press ring-1 ring-ink/10 md:max-h-[78vh]"
              />
            </picture>
          )}
          <figcaption className="w-full max-w-sm text-center md:text-left">
            {item.tag && <p className="eyebrow">{item.tag}</p>}
            <p className="mt-4 text-xl font-bold tracking-[-0.02em] md:text-3xl">{item.title}</p>
            {item.text && <p className="mt-3 text-[15px] leading-relaxed text-steel-dark md:text-base">{item.text}</p>}
          </figcaption>
        </figure>

        <button type="button" onClick={() => step(1)} aria-label="Next photo" className={`${navButton} hidden md:flex`}>
          <ChevronRight className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      {/* Mobile controls */}
      <div className="container-x flex justify-center gap-3 py-5 md:hidden">
        <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={navButton}>
          <ChevronLeft className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => step(1)} aria-label="Next photo" className={navButton}>
          <ChevronRight className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>,
    document.body,
  );
}
