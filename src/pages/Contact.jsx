import { useRef } from 'react';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { useReveal } from '@/hooks/useGSAPAnimation';
import { company, socialLinks, whatsappHref } from '@/data/company';
import { seo } from '@/data/seo';

function AsideBlock({ label, children }) {
  return (
    <div className="card card-interactive p-6">
      <p className="meta-label">{label}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

/** Route /contact — enquiry form and contact details (company.js). */
export default function Contact() {
  const root = useRef(null);
  useReveal(root);

  return (
    <>
      <Seo {...seo.contact} path="/contact" />
      <PageHero
        size="md"
        crumb="Contact"
        eyebrow="Start a Conversation"
        title={["Let's talk about", 'your next project.']}
        description="Have a project in mind? Tell us what you're building."
      />

      <section ref={root} aria-label="Contact" className="section-y bg-paper">
        <div className="container-x grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="card p-6 sm:p-8 md:p-10 lg:col-span-7" data-reveal="fade">
            <h2 className="eyebrow">Project Enquiry</h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="grid content-start gap-4 lg:col-span-5" data-reveal="stagger" aria-label="Contact details">
            <AsideBlock label="Call">
              <a href={company.phoneHref} className="link-underline text-2xl font-semibold tracking-[-0.01em] md:text-3xl">
                {company.phone}
              </a>
            </AsideBlock>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-interactive flex items-center gap-4 !bg-[#25D366] p-6 text-white !ring-[#25D366]/30"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20">
                <WhatsAppIcon className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-white/80">WhatsApp</span>
                <span className="mt-1 block text-lg font-semibold">Chat with us instantly</span>
              </span>
            </a>
            <AsideBlock label="Email">
              <a href={company.emailHref} className="link-underline text-lg font-semibold [overflow-wrap:anywhere] xl:text-2xl">
                {company.email}
              </a>
            </AsideBlock>
            {company.address && (
              <AsideBlock label="Office">
                <p className="text-lg leading-relaxed">{company.address}</p>
                {company.mapUrl && (
                  <a
                    href={company.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline mt-3 inline-block text-[12px] font-semibold uppercase tracking-[0.14em]"
                  >
                    Open in Google Maps
                  </a>
                )}
              </AsideBlock>
            )}
            <AsideBlock label="Social">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {socialLinks.map((s) => (
                  <li key={s.key}>
                    {s.url ? (
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline text-[15px] font-medium"
                      >
                        {s.label}
                      </a>
                    ) : (
                      <span className="text-[15px] text-steel">{s.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </AsideBlock>
          </aside>
        </div>
      </section>
    </>
  );
}
