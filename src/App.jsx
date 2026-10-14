import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import Home from '@/pages/Home';
import Projects from '@/pages/Projects';
import ProjectDetail from '@/pages/ProjectDetail';
import OngoingProjects from '@/pages/OngoingProjects';
import DeliveredProjects from '@/pages/DeliveredProjects';
import Experience from '@/pages/Experience';
import Machinery from '@/pages/Machinery';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

/**
 * All pages of the site. Every route renders inside MainLayout (navbar, footer, intro).
 * To add a page: create it in src/pages/, then add a <Route> here and a link in src/data/navigation.js.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<ProjectDetail />} />
        <Route path="ongoing-projects" element={<OngoingProjects />} />
        <Route path="projects-delivered" element={<DeliveredProjects />} />
        <Route path="experience" element={<Experience />} />
        <Route path="machineries" element={<Machinery />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
