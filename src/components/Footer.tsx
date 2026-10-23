import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface FooterProps {
  onOpenEstimator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEstimator }) => {
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    navigate(path);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="glass-dark bg-[#121418] text-[#F9F6F0] pt-20 pb-12 border-t border-white/20 relative overflow-hidden rounded-t-[44px] mt-20 shadow-2xl">
      {/* Ambient Warm Lighting Glow */}
      <div className="ambient-glow-warm -top-40 right-10 opacity-70" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-14">
        
        {/* Top CTA Banner */}
        <ScrollReveal>
          <div className="border-b border-white/15 pb-14 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div className="space-y-3 max-w-3xl">
              <span className="tracking-label text-[10px] text-[#B89563] block font-semibold">
                START A CONVERSATION
              </span>
              <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.12]">
                LET'S BUILD SOMETHING <br />
                <span className="text-[#B89563] font-light">TIMELESS.</span>
              </h2>
            </div>

            <button
              onClick={onOpenEstimator}
              className="group bg-[#B89563] text-white hover:bg-white hover:text-[#121418] transition-all duration-300 px-8 py-4 text-xs tracking-widest uppercase font-semibold flex items-center gap-2.5 rounded-full shadow-xl shrink-0 hover:scale-105"
            >
              <span>START YOUR PROJECT</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </ScrollReveal>

        {/* Main Footer 4-Column Layout */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
            
            {/* Column 1: Brand Info */}
            <div className="space-y-5">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/');
                }}
                className="p-1 rounded-md inline-block"
                aria-label="S Kumar Construction & Interior Home"
              >
                <img
                  src="/skumar-logo-white.png"
                  alt="S Kumar Construction & Interior Logo"
                  width={160}
                  height={60}
                  className="h-14 sm:h-16 w-auto object-contain transition-transform hover:scale-105 drop-shadow-sm"
                />
              </a>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-light">
                Comprehensive turnkey construction, bespoke interior design, custom joinery, and contemporary wall & ceiling solutions for residential and commercial environments.
              </p>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-[#B89563] font-semibold tracking-wider font-mono">
                Interior Design Available Pan India
              </div>
            </div>

            {/* Column 2: Quick Navigation */}
            <div className="space-y-4">
              <h3 className="tracking-label text-[10px] uppercase text-[#B89563] font-semibold border-b border-white/10 pb-2">
                EXPLORE STUDIO
              </h3>
              <ul className="space-y-2.5 text-sm font-medium">
                {[
                  { path: '/', label: 'Home Experience' },
                  { path: '/interior-design-ahmedabad', label: 'Interior Design Services' },
                  { path: '/custom-furniture-joinery', label: 'Custom Furniture & Joinery' },
                  { path: '/civil-construction-gujarat', label: 'Civil Construction' },
                  { path: '/projects', label: 'Selected Portfolio' },
                  { path: '/about', label: 'About S Kumar' },
                  { path: '/contact', label: 'Contact Studio' }
                ].map((item) => (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(item.path);
                      }}
                      className="text-stone-200 hover:text-[#B89563] transition-colors flex items-center gap-2 group text-left focus:outline-none"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B89563] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Service Specializations */}
            <div className="space-y-4">
              <h3 className="tracking-label text-[10px] uppercase text-[#B89563] font-semibold border-b border-white/10 pb-2">
                CORE OFFERINGS
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-200 font-light">
                <li>
                  <a
                    href="/civil-construction-gujarat"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('/civil-construction-gujarat'); }}
                    className="hover:text-[#B89563] transition-colors"
                  >
                    • Turnkey Civil Construction
                  </a>
                </li>
                <li>
                  <a
                    href="/interior-design-ahmedabad"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('/interior-design-ahmedabad'); }}
                    className="hover:text-[#B89563] transition-colors"
                  >
                    • Bespoke Residential Interiors
                  </a>
                </li>
                <li>
                  <a
                    href="/custom-furniture-joinery"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('/custom-furniture-joinery'); }}
                    className="hover:text-[#B89563] transition-colors"
                  >
                    • Custom Furniture & Joinery
                  </a>
                </li>
                <li>
                  <a
                    href="/interior-design-ahmedabad"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('/interior-design-ahmedabad'); }}
                    className="hover:text-[#B89563] transition-colors"
                  >
                    • 2 BHK, 3 BHK & Villa Interiors
                  </a>
                </li>
                <li>
                  <a
                    href="/interior-design-ahmedabad"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('/interior-design-ahmedabad'); }}
                    className="hover:text-[#B89563] transition-colors"
                  >
                    • Executive Corporate Fit-Outs
                  </a>
                </li>
                <li>
                  <a
                    href="/custom-furniture-joinery"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('/custom-furniture-joinery'); }}
                    className="hover:text-[#B89563] transition-colors"
                  >
                    • PVC Wall & Ceiling Solutions
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Office Location & Direct Contact (NAP matching schema) */}
            <div className="space-y-4">
              <h3 className="tracking-label text-[10px] uppercase text-[#B89563] font-semibold border-b border-white/10 pb-2">
                STUDIO LOCATION
              </h3>
              <div className="space-y-3.5 text-xs sm:text-sm text-stone-200">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#B89563] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-semibold text-white block text-sm">S Kumar Studio:</span>
                    <p className="text-xs text-stone-200 leading-normal font-light">
                      414, Antilia Business Hub, S.P. Ring Road, Nana Chiloda Circle, Ahmedabad, Gujarat 382330
                    </p>
                  </div>
                </div>

                <div className="pt-2 space-y-2 border-t border-white/10">
                  <a href="tel:+919898966648" className="flex items-center gap-2 hover:text-[#B89563] transition-colors font-semibold text-white text-sm">
                    <Phone className="w-3.5 h-3.5 text-[#B89563]" />
                    <span>+91 98989 66648</span>
                  </a>
                  <a href="mailto:info@skumarinterior.com" className="flex items-center gap-2 hover:text-[#B89563] transition-colors text-xs text-stone-200">
                    <Mail className="w-3.5 h-3.5 text-[#B89563]" />
                    <span>info@skumarinterior.com</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* Bottom Credits, Social Links & Legal */}
        <ScrollReveal delay={200}>
          <div className="pt-8 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-stone-300 font-light">
            <div>
              © {new Date().getFullYear()} S Kumar Construction & Interior. All rights reserved.
            </div>

            <div className="flex items-center gap-6">
              <a
                href="/privacy"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/privacy');
                }}
                className="hover:text-[#B89563] transition-colors"
              >
                Privacy Policy
              </a>
              <span className="text-white/20">•</span>
              <a
                href="/terms"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/terms');
                }}
                className="hover:text-[#B89563] transition-colors"
              >
                Terms & Conditions
              </a>
              <span className="text-white/20">•</span>
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/contact');
                }}
                className="hover:text-[#B89563] transition-colors"
              >
                Studio Directions
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </footer>
  );
};

export default Footer;
