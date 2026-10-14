import { useEffect, useState } from 'react';
import { ArrowUp, Phone } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { company, whatsappHref } from '@/data/company';
import { scrollToTop } from '@/hooks/useLenis';

const SHOW_TOP_AFTER = 600; // px scrolled before "back to top" appears
// Phones/tablets: the dock waits until the visitor scrolls, so it never covers the first screen's buttons.
const SHOW_DOCK_AFTER = 240;

const tile =
  'group relative flex h-11 w-11 items-center justify-center rounded-[14px] shadow-card-hover ring-1 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 md:h-14 md:w-14 md:rounded-2xl';

function Tip({ children }) {
  return (
    <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-ink px-3 py-1.5 text-[12.5px] font-semibold text-paper opacity-0 shadow-card-hover transition-all duration-300 group-hover:opacity-100 md:block md:translate-x-1 md:group-hover:translate-x-0">
      {children}
    </span>
  );
}

/** Fixed bottom-right dock: WhatsApp chat, call, and back to top. Visible on every page. */
export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [showDock, setShowDock] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > SHOW_TOP_AFTER);
      setShowDock(window.scrollY > SHOW_DOCK_AFTER);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-3 right-3 z-30 flex flex-col items-end gap-2 pb-[env(safe-area-inset-bottom)] transition-[opacity,transform,visibility] duration-500 ease-arch md:bottom-6 md:right-6 md:gap-3 ${
        showDock ? '' : 'max-lg:invisible max-lg:translate-y-4 max-lg:opacity-0'
      }`}
    >
      <button
        type="button"
        onClick={() => scrollToTop()}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        className={`${tile} !hidden bg-surface text-ink ring-line hover:text-brand md:!flex ${
          showTop ? 'opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <Tip>Back to top</Tip>
        <ArrowUp className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      </button>

      <a href={company.phoneHref} aria-label={`Call ${company.phone}`} className={`${tile} bg-brand text-white ring-brand/20`}>
        <Tip>Call {company.phone}</Tip>
        <Phone className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      </a>

      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className={`${tile} bg-[#25D366] text-white ring-[#25D366]/25`}
      >
        <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-2xl bg-[#25D366] opacity-25 [animation-duration:2.4s]" />
        <Tip>Chat on WhatsApp</Tip>
        <WhatsAppIcon className="relative h-[22px] w-[22px] md:h-7 md:w-7" />
      </a>
    </div>
  );
}
