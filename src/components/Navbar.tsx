import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';

interface NavbarProps {
  onOpenEstimator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEstimator }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/interior-design-ahmedabad', label: 'Interior Design' },
    { path: '/custom-furniture-joinery', label: 'Custom Joinery' },
    { path: '/civil-construction-gujarat', label: 'Civil Construction' },
    { path: '/projects', label: 'Projects' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
    navigate(path);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      {/* FLOATING LIGHT FROSTED GLASS NAVBAR CAPSULE */}
      <header className="fixed top-3 md:top-5 left-0 right-0 z-50 px-3 sm:px-6 md:px-10 pointer-events-none">
        <div
          className={`max-w-7xl mx-auto pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] glass-navbar ${
            isScrolled
              ? 'px-4 sm:px-6 md:px-7 py-2 scale-[0.99] border-[#B89563]/30 shadow-2xl bg-white/95'
              : 'px-5 sm:px-7 md:px-8 py-2.5 md:py-3 border-white/90'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            
            {/* PROMINENT BRAND LOGO */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/');
              }}
              className="flex items-center gap-2 group text-left focus:outline-none shrink-0"
              aria-label="S Kumar Construction & Interior Home"
            >
              <div className="p-0.5 transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/skumar-logo.png"
                  alt="S Kumar Construction & Interior Logo"
                  width={180}
                  height={64}
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain max-h-[60px] drop-shadow-sm transition-all duration-300"
                />
              </div>
            </a>

            {/* DESKTOP LIGHT GLASS NAVIGATION LINKS */}
            <nav className="hidden xl:flex items-center gap-1" aria-label="Main Navigation">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.path);
                    }}
                    className={`tracking-label text-[10px] font-bold transition-all duration-300 px-3.5 py-1.5 rounded-full focus:outline-none whitespace-nowrap ${
                      isActive
                        ? 'bg-[#B89563]/15 text-[#B89563] border border-[#B89563]/40 shadow-sm'
                        : 'text-[#171717]/80 hover:text-[#171717] hover:bg-black/5'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* RIGHT LIGHT GLASS CTA & PHONE */}
            <div className="hidden md:flex items-center gap-4 shrink-0">
              <a
                href="tel:+919898966648"
                aria-label="Call S Kumar Studio at +91 98989 66648"
                className="text-[11px] font-mono tracking-wider flex items-center gap-1.5 text-[#171717]/80 hover:text-[#B89563] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#B89563]" />
                <span className="font-medium">+91 98989 66648</span>
              </a>

              <button
                onClick={onOpenEstimator}
                className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#B89563] text-white hover:bg-[#171717] hover:text-white transition-all duration-300 shadow-md"
              >
                <span>START A PROJECT</span>
                <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* MOBILE MENU TRIGGER */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              className="xl:hidden p-2 text-[#171717] rounded-full focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </header>

      {/* MOBILE FULLSCREEN LIGHT FROSTED GLASS MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F5F1E8]/95 backdrop-blur-2xl text-[#171717] flex flex-col justify-between p-8 pt-28 xl:hidden animate-fade-in overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#B89563]">
                STUDIO NAVIGATION
              </span>
              <span className="font-mono text-[10px] text-stone-500">
                S KUMAR
              </span>
            </div>

            <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
              {navItems.map((item, idx) => (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.path);
                  }}
                  className="text-left font-sans text-xl font-medium tracking-tight flex items-center justify-between py-2 border-b border-black/5 text-[#171717] hover:text-[#B89563] transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-[#B89563]">0{idx + 1}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-4 pt-6 border-t border-black/10">
            <a
              href="tel:+919898966648"
              className="flex items-center justify-center gap-2 text-sm font-semibold text-[#171717] py-2"
            >
              <Phone className="w-4 h-4 text-[#B89563]" />
              <span>+91 98989 66648</span>
            </a>
            <button
              onClick={() => {
                onOpenEstimator();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#B89563] text-white py-4 rounded-full text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
