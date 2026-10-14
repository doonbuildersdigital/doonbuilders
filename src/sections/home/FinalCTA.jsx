import CTABand from '@/components/CTABand';
import { brandMessages } from '@/data/company';
import { images } from '@/data/images';

/** Home: closing call to action. */
export default function FinalCTA() {
  return (
    <CTABand
      eyebrow="Start a Conversation"
      title={['Have a project', 'to build?']}
      titleClassName="display-xl"
      text={brandMessages.closing}
      cta={{ label: 'Discuss your project', to: '/contact' }}
      image={images.siteAerial}
      imageAlt="Aerial view of a large construction site with engineers on the slab"
      showContacts
    />
  );
}
