import React, { useState } from 'react';
import { SERVICES } from '../data/services';
import { ArrowUpRight, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

interface ServicesPageProps {
  setActiveTab?: (tab: string) => void;
  onOpenEstimator: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ setActiveTab, onOpenEstimator }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Wooden Work', 'Residential', 'Turnkey Execution', 'Commercial', 'Hospitality', 'Healthcare', 'PVC Work'];

  const filteredServices = selectedCategory === 'All'
    ? SERVICES
    : SERVICES.filter((s) => s.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-20 bg-[#F5F1E8] text-[#171717] space-y-20 relative overflow-hidden">
      {/* Ambient Lighting Glow Blooms */}
      <div className="ambient-glow-warm top-20 right-10" />
      <div className="ambient-glow-warm top-1/2 -left-32" />

      {/* 1. HEADER & CATEGORY FILTERS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-5">
        <div className="glass-capsule inline-flex items-center gap-2.5 px-4 py-1.5 border border-white bg-white/90 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#967546]" />
          <span className="tracking-label text-[10px] text-[#967546] font-bold">
            COMPREHENSIVE CAPABILITIES
          </span>
        </div>

        <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-medium leading-[1.14] tracking-tight text-[#171717] max-w-4xl">
          Architectural Services <br />
          <span className="text-[#B89563] font-light">From Conception To Handover.</span>
        </h1>

        <p className="text-sm sm:text-base text-[#333330] max-w-2xl leading-relaxed font-light">
          Explore our range of comprehensive interior design, custom joinery, and civil construction solutions, thoughtfully planned and professionally executed under single studio management.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-b border-stone-300/70 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`tracking-label text-[10px] font-bold px-4 py-2 rounded-full transition-all duration-300 focus:outline-none ${
                selectedCategory === cat
                  ? 'bg-[#B89563] text-white shadow-md scale-105'
                  : 'bg-white border border-stone-300 text-[#171717] hover:bg-[#171717] hover:text-white shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 2. SERVICES CARDS (LIGHT FROSTED GLASS PANELS) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-10">
        {filteredServices.map((service, idx) => (
          <ScrollReveal key={service.id} delay={idx * 80}>
            <div
              className="glass-panel p-7 md:p-10 rounded-[36px] border border-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/80 text-[#171717]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Image Column */}
                <div className={`lg:col-span-6 h-[340px] md:h-[400px] rounded-[28px] overflow-hidden border border-white shadow-md relative ${
                  idx % 2 === 1 ? 'lg:order-2' : ''
                }`}>
                  <img
                    src={service.image}
                    alt={`${service.title} - S Kumar Construction & Interior Ahmedabad`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4 glass-capsule px-3 py-1 text-[9px] tracking-label text-[#B89563] border border-white/80 bg-white/85 font-semibold">
                    {service.category}
                  </div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <span className="font-mono text-xs text-[#B89563] font-semibold">{service.number} / {String(SERVICES.length).padStart(2, '0')}</span>
                    <span className="tracking-label text-[9px] text-stone-700 font-semibold">
                      S KUMAR SPECIFICATION
                    </span>
                  </div>

                  <div>
                    <h2 className="font-sans text-2xl md:text-3xl font-semibold text-[#171717] tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-xs text-[#B89563] font-semibold uppercase tracking-wider mt-1 font-mono">
                      {service.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 pt-1">
                    <span className="tracking-label text-[10px] text-[#171717] block font-semibold">
                      DELIVERABLES INCLUDE:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.deliverables.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[#171717]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B89563] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <button
                      onClick={onOpenEstimator}
                      className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#B89563] text-white hover:bg-[#171717] transition-all duration-300 tracking-label text-[10px] font-semibold shadow-md"
                    >
                      <span>REQUEST SCOPE QUOTE</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>

                    {setActiveTab && (
                      <a
                        href="/?tab=work"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab('work');
                        }}
                        className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-stone-300/80 text-[#171717] hover:bg-[#171717] hover:text-white transition-all tracking-label text-[10px] font-semibold"
                      >
                        <span>VIEW RELATED PROJECTS</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>

      {/* 3. TURNKEY OPERATIONS BREAKDOWN */}
      <section className="py-20 border-t border-stone-300/70 relative z-10 bg-[#EFEBE4]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
          <ScrollReveal>
            <div className="max-w-2xl space-y-2">
              <span className="tracking-label text-[10px] text-[#B89563] block font-semibold">
                TURNKEY CIVIL TRADES
              </span>
              <h2 className="font-sans text-3xl md:text-5xl font-semibold text-[#171717] tracking-tight">
                Complete Trade & Civil Execution
              </h2>
              <p className="text-xs sm:text-sm text-[#333330] font-light">
                We execute every trade in-house with strict engineering oversight in Ahmedabad & Gandhinagar.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'Structural Civil & Masonry',
              'Custom Wooden Joinery & Teak Work',
              'Plumbing & Sanitary Fitting',
              'Concealed Electrical Wiring',
              'POP & Gypsum False Ceilings',
              'Italian Marble Polishing',
              'Kota Stone & Vitrified Tiles',
              'Solid Teak Door & Window Frames',
              'Modular Kitchens & Wardrobes',
              'PU Polish & Veneer Finishing',
              'PVC Wall Panelling & Louvers',
              'Deep Cleaning & Key Handover'
            ].map((trade, idx) => (
              <ScrollReveal key={idx} delay={idx * 30}>
                <div className="glass-panel p-4 rounded-xl border border-white bg-white/80 space-y-1 hover:border-[#B89563]/50 hover:-translate-y-0.5 transition-all shadow-sm">
                  <span className="font-mono text-[9px] text-[#B89563] font-semibold">Trade 0{idx + 1}</span>
                  <span className="font-sans text-xs sm:text-sm font-medium block text-[#171717]">{trade}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;

