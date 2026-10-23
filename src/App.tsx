import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ProjectEstimatorModal } from './components/ProjectEstimatorModal';
import { QuickContactBar } from './components/QuickContactBar';
import { CookieConsent } from './components/CookieConsent';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { InteriorDesignPage } from './pages/InteriorDesignPage';
import { CustomJoineryPage } from './pages/CustomJoineryPage';
import { CivilConstructionPage } from './pages/CivilConstructionPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/TermsConditionsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SEOHead } from './components/SEOHead';
import { trackPageView } from './utils/analytics';
import type { Project } from './types';

export function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [estimatorOpen, setEstimatorOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Backward compatibility: redirect ?tab= query params to clean multi-page routes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab) {
      const tabRouteMap: Record<string, string> = {
        home: '/',
        services: '/interior-design-ahmedabad',
        work: '/projects',
        about: '/about',
        contact: '/contact',
        privacy: '/privacy',
        terms: '/terms'
      };
      const target = tabRouteMap[tab];
      if (target && target !== location.pathname) {
        navigate(target, { replace: true });
      }
    }
  }, [location, navigate]);

  // Scroll to top & track page view when path changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    trackPageView(location.pathname);
  }, [location.pathname]);

  // Automatic Inquiry Popup Trigger on Website Open (fresh visitor UX)
  useEffect(() => {
    const timer = setTimeout(() => {
      setEstimatorOpen(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8] text-[#171717] font-sans relative selection:bg-[#B89563] selection:text-white">
      {/* Dynamic SEO Head & Structured Data Synchronizer */}
      <SEOHead />

      {/* Global Minimal Navigation */}
      <Navbar onOpenEstimator={() => setEstimatorOpen(true)} />

      {/* Main Page Router View */}
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onSelectProject={(project) => setSelectedProject(project)}
                onOpenEstimator={() => setEstimatorOpen(true)}
              />
            }
          />

          <Route
            path="/interior-design-ahmedabad"
            element={
              <InteriorDesignPage
                onSelectProject={(project) => setSelectedProject(project)}
                onOpenEstimator={() => setEstimatorOpen(true)}
              />
            }
          />

          <Route
            path="/custom-furniture-joinery"
            element={
              <CustomJoineryPage
                onSelectProject={(project) => setSelectedProject(project)}
                onOpenEstimator={() => setEstimatorOpen(true)}
              />
            }
          />

          <Route
            path="/civil-construction-gujarat"
            element={
              <CivilConstructionPage
                onSelectProject={(project) => setSelectedProject(project)}
                onOpenEstimator={() => setEstimatorOpen(true)}
              />
            }
          />

          <Route
            path="/projects"
            element={
              <ProjectsPage
                onSelectProject={(project) => setSelectedProject(project)}
              />
            }
          />

          <Route path="/contact" element={<ContactPage />} />

          <Route
            path="/about"
            element={<About onOpenEstimator={() => setEstimatorOpen(true)} />}
          />

          <Route
            path="/privacy"
            element={<PrivacyPolicyPage onOpenEstimator={() => setEstimatorOpen(true)} />}
          />

          <Route
            path="/terms"
            element={<TermsConditionsPage onOpenEstimator={() => setEstimatorOpen(true)} />}
          />

          <Route
            path="*"
            element={<NotFoundPage onOpenEstimator={() => setEstimatorOpen(true)} />}
          />
        </Routes>
      </main>

      {/* Global Editorial Footer */}
      <Footer onOpenEstimator={() => setEstimatorOpen(true)} />

      {/* Cookie Consent Banner */}
      <CookieConsent onOpenPrivacy={() => navigate('/privacy')} />

      {/* Persistent Floating Desktop WhatsApp & Mobile Sticky Bar */}
      <QuickContactBar onOpenEstimator={() => setEstimatorOpen(true)} />

      {/* Project Case Study Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenEstimator={() => setEstimatorOpen(true)}
      />

      {/* Instant Project Inquiry & Estimator Modal */}
      <ProjectEstimatorModal
        isOpen={estimatorOpen}
        onClose={() => setEstimatorOpen(false)}
      />
    </div>
  );
}

export default App;
