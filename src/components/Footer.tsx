import React from 'react';
import { ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenEstimator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenEstimator }) => {
  const scrollToTop = (tabName: string) => {
    setActiveTab(tabName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="glass-dark bg-[#121418] text-[#F9F6F0] pt-20 pb-12 border-t border-white/20 relative overflow-hidden rounded-t-[44px] mt-20 shadow-2xl">
      {/* Ambient Warm Lighting Glow */}
      <div className="ambient-glow-warm -top-40 right-10 opacity-70" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-14">
        
        {/* Top CTA Banner with ScrollReveal */}
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
              <div className="p-1 rounded-md inline-block">
                <img
                  src="/skumar-logo-white.png"
                  alt="S Kumar Construction & Interior"
                  className="h-14 sm:h-16 w-auto object-contain transition-transform hover:scale-105 drop-shadow-sm"
                />
              </div>
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
                  { id: 'home', label: 'Home Experience' },
                  { id: 'work', label: 'Selected Portfolio' },
                  { id: 'services', label: 'Services Scope' },
                  { id: 'about', label: 'About S Kumar' },
                  { id: 'contact', label: 'Contact Studio' }
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToTop(item.id)}
                      className="text-stone-200 hover:text-[#B89563] transition-colors flex items-center gap-2 group text-left focus:outline-none"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B89563] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{item.label}</span>
                    </button>
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
                <li>• Turnkey Civil Construction</li>
                <li>• Bespoke Interior Design (Pan India)</li>
                <li>• Custom Furniture & Joinery</li>
                <li>• 2 BHK, 3 BHK & Villa Interiors</li>
                <li>• Executive Corporate Fit-Outs</li>
                <li>• PVC Wall & Ceiling Solutions</li>
              </ul>
            </div>

            {/* Column 4: Office Location & Direct Contact */}
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

            <div className="flex items-center gap-5 font-normal">
              <button onClick={() => setActiveTab('privacy')} className="hover:text-white transition-colors cursor-pointer text-left">
                Privacy Policy
              </button>
              <button onClick={() => setActiveTab('terms')} className="hover:text-white transition-colors cursor-pointer text-left">
                Terms and Conditions
              </button>
            </div>

            {/* Social Links with Glowing Dark Glass Capsules & SVG Icons */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full glass-capsule-dark flex items-center justify-center text-white hover:text-[#B89563] hover:bg-white/20 transition-all border border-white/20 shadow-sm"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full glass-capsule-dark flex items-center justify-center text-white hover:text-[#B89563] hover:bg-white/20 transition-all border border-white/20 shadow-sm"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full glass-capsule-dark flex items-center justify-center text-white hover:text-[#B89563] hover:bg-white/20 transition-all border border-white/20 shadow-sm"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </footer>
  );
};

export default Footer;

