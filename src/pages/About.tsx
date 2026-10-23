import React from 'react';
import { ArrowUpRight, Award, ShieldCheck, Compass, Users, CheckCircle2, Building2, Sparkles, Globe, MapPin } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

interface AboutProps {
  setActiveTab?: (tab: string) => void;
  onOpenEstimator: () => void;
}

export const About: React.FC<AboutProps> = ({ setActiveTab, onOpenEstimator }) => {
  return (
    <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-20 bg-[#F5F1E8] text-[#171717] space-y-24 relative overflow-hidden">
      {/* Ambient Lighting Glow Blooms */}
      <div className="ambient-glow-warm top-20 right-10" />
      <div className="ambient-glow-warm top-1/2 -left-32" />

      {/* 1. HERO HEADER */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <div className="glass-capsule inline-flex items-center gap-2.5 px-4 py-1.5 border border-white bg-white/90 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#967546]" />
            <span className="tracking-label text-[10px] text-[#967546] font-bold">
              ABOUT S KUMAR CONSTRUCTION & INTERIOR
            </span>
          </div>
          <div className="glass-capsule inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#B89563]/40 bg-white/90 text-[#967546] text-[10px] font-mono uppercase tracking-wider font-bold">
            <Globe className="w-3.5 h-3.5 text-[#967546]" />
            <span>Interior Design Pan India</span>
          </div>
        </div>

        <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-medium leading-[1.14] tracking-tight text-[#171717] max-w-4xl">
          Architectural Design, <br />
          <span className="text-[#B89563] font-light">Interiors & Construction.</span>
        </h1>

        <p className="text-sm sm:text-base text-[#333330] max-w-2xl leading-relaxed font-light">
          S Kumar Construction & Interior bridges the gap between artistic interior concept design, structural civil construction, and precision joinery with end-to-end studio accountability.
        </p>
      </section>

      {/* 2. EDITORIAL IMAGE & NARRATIVE WITH PAN INDIA HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 h-[420px] md:h-[520px] rounded-[36px] overflow-hidden border border-white relative shadow-xl bg-white">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop"
                alt="S Kumar Studio architectural design and joinery craftsmanship process in Ahmedabad"
                loading="lazy"
                decoding="async"
                width={1600}
                height={1067}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
              
              {/* Attached Light Glass Metadata Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 glass-panel rounded-2xl border border-white shadow-xl text-xs space-y-1 bg-white/90 text-[#171717]">
                <span className="font-sans text-base sm:text-lg font-semibold text-[#B89563] block">S Kumar Construction & Interior Studio</span>
                <span className="text-[11px] text-[#333330]">Antilia Business Hub, S.P. Ring Road, Ahmedabad • Gujarat & Pan India</span>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-1.5">
                <span className="tracking-label text-[10px] text-[#B89563] block font-semibold">CORE EXPERTISE</span>
                <h2 className="font-sans text-2xl md:text-4xl font-medium text-[#171717] tracking-tight leading-tight">
                  Design, Construction & Joinery
                </h2>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                <p>
                  Many traditional interior designers hand off site execution to unverified third-party contractors, resulting in missed timelines, material compromises, and budget escalation.
                </p>
                <p>
                  At S Kumar, our in-house civil engineers, master carpenters, interior craftsmen, and site technicians work side-by-side under single studio accountability.
                </p>
              </div>

              {/* PAN INDIA HIGHLIGHT CARD */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#B89563]/15 via-[#B89563]/8 to-transparent border border-[#B89563]/35 shadow-sm space-y-1.5">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#B89563] shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#B89563]">NATIONAL COVERAGE</span>
                </div>
                <h4 className="font-sans text-sm sm:text-base font-semibold text-[#171717]">
                  Interior Design Services Available Across India — Pan India.
                </h4>
                <p className="text-xs text-[#333330] font-light">
                  Offering complete interior space planning, 3D architectural renders, modular joinery, and interior execution for residences and offices nationwide.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenEstimator}
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#B89563] text-white hover:bg-[#171717] transition-all duration-300 tracking-label text-[10px] font-semibold shadow-md"
                >
                  <span>BOOK STUDIO CONSULTATION</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* 3. CORE PRINCIPLES (LIGHT FROSTED GLASS CARDS GRID) */}
      <section className="py-20 border-y border-stone-300/70 relative z-10 bg-[#EFEBE4]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-14">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="tracking-label text-[10px] text-[#B89563] block font-semibold">
                OUR FOUNDATIONS
              </span>
              <h2 className="font-sans text-3xl md:text-5xl font-medium text-[#171717] tracking-tight">
                The Four Principles of S Kumar
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScrollReveal delay={0}>
              <div className="glass-panel p-7 rounded-[28px] space-y-3 border border-white bg-white/80 shadow-sm hover:border-[#B89563]/40 hover:-translate-y-1 transition-all duration-300">
                <Compass className="w-6 h-6 text-[#B89563]" />
                <h3 className="font-sans text-lg font-semibold text-[#171717]">Spatial Intelligence</h3>
                <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                  Optimizing floorplans for natural ventilation, sunlight angles, and human movement patterns in Gujarat.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <div className="glass-panel p-7 rounded-[28px] space-y-3 border border-white bg-white/80 shadow-sm hover:border-[#B89563]/40 hover:-translate-y-1 transition-all duration-300">
                <ShieldCheck className="w-6 h-6 text-[#B89563]" />
                <h3 className="font-sans text-lg font-semibold text-[#171717]">Material Honesty</h3>
                <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                  Using authentic Italian travertine, Burmese teak wood, Kota stone, and brushed brass that age gracefully over time.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <div className="glass-panel p-7 rounded-[28px] space-y-3 border border-white bg-white/80 shadow-sm hover:border-[#B89563]/40 hover:-translate-y-1 transition-all duration-300">
                <Users className="w-6 h-6 text-[#B89563]" />
                <h3 className="font-sans text-lg font-semibold text-[#171717]">Single Accountability</h3>
                <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                  One dedicated project manager handling civil masonry, plumbing, electrical, joinery, and soft furnishings.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={240}>
              <div className="glass-panel p-7 rounded-[28px] space-y-3 border border-white bg-white/80 shadow-sm hover:border-[#B89563]/40 hover:-translate-y-1 transition-all duration-300">
                <Award className="w-6 h-6 text-[#B89563]" />
                <h3 className="font-sans text-lg font-semibold text-[#171717]">Punctual Handover</h3>
                <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                  Strict milestone tracking ensuring your home or office is delivered clean, calibrated, and ready on schedule.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. TURNKEY IN-HOUSE CAPABILITIES */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-10">
        <ScrollReveal>
          <div className="max-w-2xl space-y-2">
            <span className="tracking-label text-[10px] text-[#B89563] block font-semibold">
              END-TO-END SCOPE
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-semibold text-[#171717] tracking-tight">
              Complete In-House Operations
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollReveal delay={0}>
            <div className="glass-panel p-7 rounded-[28px] space-y-5 border border-white shadow-lg bg-white/80 hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-[#B89563]" />
                <h3 className="font-sans text-xl font-semibold text-[#171717]">Civil & Structure</h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#333330] font-light">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#B89563] shrink-0" /> Wall Demolition & Partitioning</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#B89563] shrink-0" /> Waterproofing & Sanitation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#B89563] shrink-0" /> Flooring Installation (Stone/Marble)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#B89563] shrink-0" /> Concealed Conduit Electricals</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="glass-panel p-7 rounded-[28px] space-y-5 border border-white shadow-lg bg-white/80 hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5 text-[#B89563]" />
                <h3 className="font-sans text-xl font-semibold text-[#171717]">Custom Joinery</h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#333330] font-light">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#B89563] shrink-0" /> Burmese Teak Wall Panelling</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#B89563] shrink-0" /> Modular Acrylic Kitchens</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#B89563] shrink-0" /> Concealed Wardrobes & Consoles</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#B89563] shrink-0" /> Bespoke Dining & Bar Units</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="glass-panel p-7 rounded-[28px] space-y-5 border border-white shadow-lg bg-white/80 hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-[#B89563]" />
                <h3 className="font-sans text-xl font-semibold text-[#171717]">Finishes & Handover</h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#333330] font-light">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#B89563] shrink-0" /> 2700K Architectural Lighting</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#B89563] shrink-0" /> Pop & Gypsum Cove Ceilings</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#B89563] shrink-0" /> Belgian Linen Soft Furnishing</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#B89563] shrink-0" /> White-Glove Deep Cleaning</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. CTA CONTAINER */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <ScrollReveal>
          <div className="glass-deep p-8 md:p-12 rounded-[36px] border border-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl bg-white/90">
            <div className="space-y-2 max-w-xl">
              <span className="tracking-label text-[10px] text-[#B89563] block font-semibold">READY TO BEGIN?</span>
              <h3 className="font-sans text-2xl md:text-3xl font-semibold text-[#171717] tracking-tight">
                Collaborate With Our Senior Architects.
              </h3>
              <p className="text-xs sm:text-sm text-[#333330] font-light">
                Visit our studio at 414, Antilia Business Hub, Nana Chiloda Circle, S.P. Ring Road, Ahmedabad.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={onOpenEstimator}
                className="px-7 py-3.5 bg-[#B89563] text-white hover:bg-[#171717] transition-all duration-300 tracking-label text-[10px] font-semibold rounded-full shadow-md flex items-center gap-2.5"
              >
                <span>START YOUR PROJECT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {setActiveTab && (
                <a
                  href="/?tab=contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('contact');
                  }}
                  className="px-6 py-3.5 border border-stone-300 text-[#171717] hover:bg-[#171717] hover:text-white transition-all duration-300 tracking-label text-[10px] font-semibold rounded-full flex items-center gap-2"
                >
                  <span>STUDIO DIRECTIONS</span>
                  <MapPin className="w-3.5 h-3.5 text-[#B89563]" />
                </a>
              )}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default About;

