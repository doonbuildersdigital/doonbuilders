import Seo from '@/components/Seo';
import Hero from '@/sections/home/Hero';
import Legacy from '@/sections/home/Legacy';
import Stats from '@/sections/home/Stats';
import Capabilities from '@/sections/home/Capabilities';
import Showcase from '@/sections/home/Showcase';
import SiteGallery from '@/sections/home/SiteGallery';
import FeaturedProjects from '@/sections/home/FeaturedProjects';
import GovernmentProjects from '@/sections/home/GovernmentProjects';
import PrivateProjects from '@/sections/home/PrivateProjects';
import MachineryPreview from '@/sections/home/MachineryPreview';
import Generations from '@/sections/home/Generations';
import WhyDoon from '@/sections/home/WhyDoon';
import FinalCTA from '@/sections/home/FinalCTA';
import { seo } from '@/data/seo';

/**
 * Story order: who they are → how long → what they build → on site now → proof of work →
 * government trust → private range → capability → the people → why → contact.
 */
export default function Home() {
  return (
    <>
      <Seo {...seo.home} path="/" />
      <Hero />
      <Legacy />
      <Stats />
      <Capabilities />
      <Showcase />
      <SiteGallery />
      <FeaturedProjects />
      <GovernmentProjects />
      <PrivateProjects />
      <MachineryPreview />
      <Generations />
      <WhyDoon />
      <FinalCTA />
    </>
  );
}
