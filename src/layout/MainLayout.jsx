import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import FloatingActions from '@/components/FloatingActions';
import Intro from '@/components/Intro';
import { useLenis } from '@/hooks/useLenis';
import { ScrollTrigger } from '@/lib/gsap';

/** Shared frame around every page: intro, navbar, the page itself, footer and floating call buttons. */
export default function MainLayout() {
  const { pathname } = useLocation();
  useLenis();

  // Web fonts can shift layout after first paint — re-measure scroll triggers once loaded.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only z-[200] bg-brand px-4 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Intro />
      <Navbar />
      <main id="main" key={pathname} className="page-enter">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
