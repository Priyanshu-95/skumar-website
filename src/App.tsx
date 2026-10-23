import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ProjectEstimatorModal } from './components/ProjectEstimatorModal';
import { QuickContactBar } from './components/QuickContactBar';
import { CookieConsent } from './components/CookieConsent';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/TermsConditionsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { trackPageView } from './utils/analytics';
import type { Project } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [estimatorOpen, setEstimatorOpen] = useState<boolean>(false);

  // Instant scroll to top & track page view when changing tabs
  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(activeTab);
  }, [activeTab]);

  // Automatic Inquiry Popup Trigger on Website Open
  useEffect(() => {
    const timer = setTimeout(() => {
      setEstimatorOpen(true);
    }, 1200); // Pops up smoothly after 1.2s when opening the website
    return () => clearTimeout(timer);
  }, []);

  const validTabs = ['home', 'about', 'services', 'work', 'contact', 'privacy', 'terms'];

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8] text-[#171717] font-sans relative selection:bg-[#B89563] selection:text-white">

      {/* Global Minimal Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenEstimator={() => setEstimatorOpen(true)}
      />

      {/* Main Page Router View */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <Home
            setActiveTab={setActiveTab}
            onSelectProject={(project) => setSelectedProject(project)}
            onOpenEstimator={() => setEstimatorOpen(true)}
          />
        )}

        {activeTab === 'about' && (
          <About
            onOpenEstimator={() => setEstimatorOpen(true)}
          />
        )}

        {activeTab === 'services' && (
          <ServicesPage
            onOpenEstimator={() => setEstimatorOpen(true)}
          />
        )}

        {activeTab === 'work' && (
          <ProjectsPage
            onSelectProject={(project) => setSelectedProject(project)}
          />
        )}

        {activeTab === 'contact' && <ContactPage />}

        {activeTab === 'privacy' && (
          <PrivacyPolicyPage
            setActiveTab={setActiveTab}
            onOpenEstimator={() => setEstimatorOpen(true)}
          />
        )}

        {activeTab === 'terms' && (
          <TermsConditionsPage
            setActiveTab={setActiveTab}
            onOpenEstimator={() => setEstimatorOpen(true)}
          />
        )}

        {!validTabs.includes(activeTab) && (
          <NotFoundPage
            setActiveTab={setActiveTab}
            onOpenEstimator={() => setEstimatorOpen(true)}
          />
        )}
      </main>

      {/* Global Editorial Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenEstimator={() => setEstimatorOpen(true)}
      />

      {/* Cookie Consent Banner */}
      <CookieConsent onOpenPrivacy={() => setActiveTab('privacy')} />

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
