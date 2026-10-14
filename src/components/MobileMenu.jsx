import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { setScrollLocked } from '@/hooks/useLenis';
import { mainNav } from '@/data/navigation';
import { company, whatsappHref } from '@/data/company';
import WhatsAppIcon from './WhatsAppIcon';
import { Phone } from 'lucide-react';

/** Full-screen menu for phones and tablets. Opened by the Navbar; Escape or a link closes it. */
export default function MobileMenu({ open, onClose, returnFocusRef }) {
  const root = useRef(null);
  const tl = useRef(null);
  const wasOpen = useRef(false);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(root.current, { visibility: 'visible' })
        .fromTo(
          root.current,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power4.inOut' },
        );

      if (prefersReducedMotion()) {
        // Reduced motion: just reveal the panel; links and footer stay static.
        tl.current.timeScale(20);
        return;
      }
      tl.current
        .from('[data-menu-link]', { yPercent: 110, duration: 0.8, stagger: 0.05, ease: 'power4.out' }, 0.3)
        .from('[data-menu-foot]', { autoAlpha: 0, y: 12, duration: 0.6 }, 0.55);
    },
    { scope: root },
  );

  useEffect(() => {
    if (!tl.current) return;
    if (open) {
      wasOpen.current = true;
      setScrollLocked(true);
      tl.current.timeScale(prefersReducedMotion() ? 20 : 1).play();
      // Focus once the panel has become visible on the next ticks.
      const id = setTimeout(() => root.current?.querySelector('a')?.focus({ preventScroll: true }), 80);
      return () => clearTimeout(id);
    } else if (wasOpen.current) {
      wasOpen.current = false;
      setScrollLocked(false);
      tl.current.timeScale(prefersReducedMotion() ? 20 : 1.6).reverse();
      returnFocusRef.current?.focus({ preventScroll: true });
    }
  }, [open, returnFocusRef]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => () => setScrollLocked(false), []);

  return (
    <div
      ref={root}
      id="mobile-menu"
      inert={!open}
      aria-hidden={!open}
      className="invisible fixed inset-0 z-40 flex flex-col bg-surface text-ink xl:hidden"
    >
      <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <nav
        aria-label="Mobile"
        className="container-x relative flex flex-1 flex-col overflow-y-auto pb-8 pt-[calc(var(--header-h)+20px)]"
      >
        <ul className="flex flex-col gap-1.5">
          {mainNav.map((item, i) => (
            <li key={item.to} className="overflow-hidden">
              <NavLink
                to={item.to}
                end={item.to === '/'}
                onClick={onClose}
                data-menu-link
                className="group flex items-center gap-4 rounded-xl px-4 py-3 text-[clamp(1.25rem,5.4vw,1.75rem)] font-semibold leading-tight tracking-[-0.02em] transition-colors hover:bg-paper aria-[current=page]:bg-brand/[0.07] aria-[current=page]:text-brand sm:py-3.5"
              >
                <span className="w-7 text-[11px] font-semibold tabular-nums tracking-[0.1em] text-steel">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="transition-transform duration-500 ease-arch group-hover:translate-x-2">
                  {item.mobileLabel}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div data-menu-foot className="container-x relative border-t border-line bg-paper/80 py-5">
        <div className="grid grid-cols-2 gap-3">
          <a
            href={company.phoneHref}
            className="flex items-center justify-center gap-2.5 rounded-xl bg-brand px-4 py-3.5 text-[15px] font-semibold text-white shadow-brand active:scale-[0.98]"
          >
            <Phone className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
            Call Now
          </a>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-4 py-3.5 text-[15px] font-semibold text-white shadow-card-hover active:scale-[0.98]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp
          </a>
        </div>
        <a href={company.emailHref} className="mt-4 block text-center text-sm font-medium text-steel-dark">
          {company.email}
        </a>
      </div>
    </div>
  );
}
