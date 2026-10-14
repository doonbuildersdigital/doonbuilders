import { Link } from 'react-router-dom';
import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import Logo from './Logo';
import WhatsAppIcon from './WhatsAppIcon';
import Button from './Button';
import { company, brandMessages, socialLinks, currentYear, whatsappHref } from '@/data/company';
import { footerNav, navCta } from '@/data/navigation';
import { scrollToTop } from '@/hooks/useLenis';

const colTitle = 'text-[12px] font-semibold uppercase tracking-[0.14em] text-steel';
const linkClass = 'text-[15px] text-ink/80 transition-colors hover:text-brand';

/** Site footer: links from src/data/navigation.js, contact details from src/data/company.js. */
export default function Footer() {
  const activeSocials = socialLinks.filter((s) => s.url);

  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface text-ink">
      <div className="container-x pb-8 pt-12 md:pt-16">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Logo tone="dark" />
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-steel-dark">{brandMessages.supporting}</p>
            <Button to={navCta.to} size="sm" className="mt-7">
              {navCta.label}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-[1fr_1fr_1.7fr_1fr] lg:col-span-8">
            {footerNav.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className={colTitle}>{col.title}</h2>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="col-span-2 md:col-span-1">
              <h2 className={colTitle}>Contact</h2>
              <ul className="mt-5 space-y-3.5">
                <li>
                  <a href={company.phoneHref} className={`${linkClass} flex items-center gap-2.5`}>
                    <Phone className="h-4 w-4 shrink-0 text-brand" strokeWidth={2} aria-hidden="true" />
                    {company.phone}
                  </a>
                </li>
                <li>
                  <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={`${linkClass} flex items-center gap-2.5`}>
                    <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#1DA851]" />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={company.emailHref} className={`${linkClass} flex items-center gap-2.5 [overflow-wrap:anywhere]`}>
                    <Mail className="h-4 w-4 shrink-0 text-brand" strokeWidth={2} aria-hidden="true" />
                    {company.email}
                  </a>
                </li>
                {company.address && (
                  <li className="flex gap-2.5 text-[15px] text-steel-dark">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2} aria-hidden="true" />
                    {company.address}
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h2 className={colTitle}>Follow Us</h2>
              <ul className="mt-5 space-y-3">
                {socialLinks.map((s) => (
                  <li key={s.key}>
                    {s.url ? (
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        {s.label}
                      </a>
                    ) : (
                      <span className="text-[15px] text-steel/70">{s.label}</span>
                    )}
                  </li>
                ))}
              </ul>
              {activeSocials.length === 0 && <p className="sr-only">Social profiles will be added soon.</p>}
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-12" aria-hidden="true">
          <p className="select-none whitespace-nowrap text-center text-[clamp(2rem,9.6vw,9.25rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.045em] text-ink/[0.05]">
            {company.wordmark}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-6 border-t border-line pt-8 text-[13px] text-steel-dark md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} {company.name}. All Rights Reserved.
          </p>
          <p>
            {company.tagline} · {company.country}
          </p>
          <button
            type="button"
            onClick={() => scrollToTop()}
            className="group inline-flex items-center gap-3 self-start font-medium text-ink transition-colors hover:text-brand md:self-auto"
          >
            Back to top
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface shadow-card transition-all group-hover:border-brand group-hover:bg-brand group-hover:text-white">
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={2} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
