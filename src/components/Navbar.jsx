import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';
import Logo from './Logo';
import Button from './Button';
import MobileMenu from './MobileMenu';
import Blessing from './Blessing';
import ThemeToggle from './ThemeToggle';
import WhatsAppIcon from './WhatsAppIcon';
import { mainNav, navCta } from '@/data/navigation';
import { company, whatsappHref } from '@/data/company';

const RAISED_AFTER = 8; // px scrolled before the bar gains its shadow

/**
 * Fixed header that always stays on screen: blessing strip + navigation bar.
 * It never hides on scroll; it only gains a shadow and shows reading progress.
 */
export default function Navbar() {
  const [raised, setRaised] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef(null);
  const toggleRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setRaised(y > RAISED_AFTER);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <Blessing />
        <div
          className={`relative border-b bg-surface/90 text-ink backdrop-blur-xl backdrop-saturate-150 transition-[box-shadow,border-color] duration-300 ${
            raised || menuOpen ? 'border-transparent shadow-nav' : 'border-line'
          }`}
        >
          <div className="container-x flex h-[var(--nav-h)] items-center justify-between gap-6">
            <Link to="/" aria-label={`${company.name} — home`} className="relative z-10 shrink-0">
              <Logo tone="dark" />
            </Link>

            <nav aria-label="Primary" className="hidden xl:block">
              <ul className="flex items-center gap-1 rounded-full border border-line bg-paper/80 p-1">
                {mainNav.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        `block whitespace-nowrap rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-all duration-300 2xl:px-4 ${
                          isActive
                            ? 'bg-surface text-brand shadow-card'
                            : 'text-ink/70 hover:bg-surface/70 hover:text-ink'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-2 md:gap-3">
              <ThemeToggle />
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                title="Chat on WhatsApp"
                className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#1DA851] ring-1 ring-[#25D366]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#25D366] hover:text-white sm:flex xl:hidden 2xl:flex"
              >
                <WhatsAppIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href={company.phoneHref}
                aria-label={`Call ${company.phone}`}
                title={`Call ${company.phone}`}
                className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand hover:text-white sm:flex xl:hidden 2xl:flex"
              >
                <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </a>
              <Button to={navCta.to} size="sm" className="hidden shrink-0 md:inline-flex">
                {navCta.label}
              </Button>
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-ink shadow-card transition-colors hover:border-ink/30 xl:hidden"
              >
                <span className="relative block h-3 w-[18px]" aria-hidden="true">
                  <span
                    className={`absolute left-0 top-0 h-[2px] w-full rounded-full bg-current transition-transform duration-500 ease-arch ${
                      menuOpen ? 'translate-y-[5px] rotate-45' : ''
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-current transition-all duration-500 ease-arch ${
                      menuOpen ? 'w-full -translate-y-[5px] -rotate-45' : 'w-2/3'
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          {/* Reading progress */}
          <span
            ref={progressRef}
            aria-hidden="true"
            className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left scale-x-0 bg-brand"
          />
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} returnFocusRef={toggleRef} />
    </>
  );
}
