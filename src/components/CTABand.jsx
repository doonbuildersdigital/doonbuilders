import { useRef } from 'react';
import { Mail, Phone } from 'lucide-react';
import Media from './Media';
import MaskLines from './MaskLines';
import Button from './Button';
import WhatsAppIcon from './WhatsAppIcon';
import { useReveal } from '@/hooks/useGSAPAnimation';
import { company, whatsappHref } from '@/data/company';

/**
 * Closing call to action used at the end of pages: a rounded card on a light
 * section. With an image it becomes a photo card; otherwise a brand-red card.
 */
export default function CTABand({
  eyebrow,
  title,
  text,
  cta = { label: 'Discuss your project', to: '/contact' },
  image,
  imageAlt = '',
  showContacts = false,
  titleClassName = 'h-section',
}) {
  const root = useRef(null);
  useReveal(root);

  return (
    <section ref={root} className="bg-paper py-12 md:py-16">
      <div className="container-x">
        <div
          className={`relative overflow-hidden rounded-[28px] text-white shadow-card-hover md:rounded-[36px] ${
            image ? 'bg-charcoal' : 'bg-gradient-to-br from-brand to-brand-deep'
          }`}
        >
          {image ? (
            <>
              <Media image={image} alt={imageAlt} parallax={8} className="absolute inset-0" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-night/85 via-night/60 to-night/25" />
            </>
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.35),transparent_45%)]"
            />
          )}

          <div className="relative px-6 py-12 sm:px-10 md:px-14 md:py-16 lg:px-16 lg:py-20">
            <div className="max-w-3xl">
              {eyebrow && (
                <p className="eyebrow eyebrow-on-dark" data-reveal="fade">
                  {eyebrow}
                </p>
              )}
              <MaskLines as="h2" lines={title} className={`${titleClassName} mt-6 md:mt-7`} />
              {text && (
                <p className="mt-6 text-lg text-white/85 md:text-xl" data-reveal="fade">
                  {text}
                </p>
              )}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row md:mt-10" data-reveal="fade" data-delay="0.1">
                <Button
                  to={cta.to}
                  size="lg"
                  className={image ? '' : '!bg-white !text-brand-deep !shadow-card-hover hover:!bg-white/90'}
                >
                  {cta.label}
                </Button>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-8 text-[15px] font-semibold text-white shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1FBE5B] active:scale-[0.97] md:h-[60px]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  WhatsApp Us
                </a>
              </div>
            </div>

            {showContacts && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-10 lg:max-w-3xl" data-reveal="stagger">
                <a
                  href={company.phoneHref}
                  className="group flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 md:p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-deep">
                    <Phone className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12px] text-white/70">Call us</span>
                    <span className="block text-lg font-semibold md:text-xl">{company.phone}</span>
                  </span>
                </a>
                <a
                  href={company.emailHref}
                  className="group flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 md:p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-deep">
                    <Mail className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12px] text-white/70">Email us</span>
                    <span className="block text-[15px] font-semibold [overflow-wrap:anywhere] md:text-lg">{company.email}</span>
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
