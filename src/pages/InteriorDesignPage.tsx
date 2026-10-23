import React from 'react';
import { ArrowUpRight, ArrowRight, CheckCircle2, Sparkles, Home as HomeIcon, Compass, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { SERVICES } from '../data/services';
import { PROJECTS } from '../data/projects';
import type { Project } from '../types';

interface InteriorDesignPageProps {
  onSelectProject?: (project: Project) => void;
  onOpenEstimator: () => void;
}

export const InteriorDesignPage: React.FC<InteriorDesignPageProps> = ({ onSelectProject, onOpenEstimator }) => {
  // Focus on residential & commercial interior services from verified catalog
  const interiorServices = SERVICES.filter(s =>
    ['Residential', 'Residential Luxury', 'Commercial', 'Hospitality', 'Healthcare'].includes(s.category)
  );

  const interiorProjects = PROJECTS.filter(p =>
    ['shela-courtyard-villa', 'bodakdev-3bhk-residence', 'satellite-2bhk-apartment', 'zenith-corporate-office'].includes(p.id)
  );

  return (
    <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-20 bg-[#F5F1E8] text-[#171717] space-y-24 relative overflow-hidden">
      {/* Ambient Lighting Glow Blooms */}
      <div className="ambient-glow-warm -top-40 -left-40 opacity-70" />
      <div className="ambient-glow-subtle top-1/3 -right-40 opacity-60" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <ScrollReveal>
          <div className="space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-[#B89563]/30 backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#B89563]" />
              <span className="tracking-label text-[10px] text-[#B89563] font-semibold">
                ARCHITECTURAL INTERIOR PRACTICE • AHMEDABAD & GANDHINAGAR
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#171717] leading-[1.12]">
              Interior Design Services in Ahmedabad
            </h1>

            <p className="text-base sm:text-lg text-[#333330] leading-relaxed font-light max-w-3xl">
              Turnkey home and office interior design in Ahmedabad and Gandhinagar. From spatial concept to final handover, 
              S Kumar combines custom artisan joinery, MEP coordination, false ceiling engineering, and tailored material selections 
              for modern residential apartments, private bungalows, and corporate workspaces.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenEstimator}
                className="px-8 py-4 bg-[#B89563] text-white hover:bg-[#171717] transition-all duration-300 tracking-label text-xs font-semibold rounded-full shadow-lg flex items-center gap-2"
              >
                <span>REQUEST INTERIOR QUOTE</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <a
                href="/projects"
                className="px-8 py-4 border border-stone-300 text-[#171717] hover:bg-[#171717] hover:text-white transition-all duration-300 tracking-label text-xs font-semibold rounded-full flex items-center gap-2"
              >
                <span>VIEW COMPLETED PORTFOLIO</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Core Design Specializations */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
        <ScrollReveal>
          <div className="border-b border-stone-300/80 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="tracking-label text-[10px] text-[#B89563] block font-semibold mb-2">
                SPECIALIZED SCOPES
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#171717]">
                Tailored Residential & Commercial Interior Solutions
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#333330] max-w-md font-light">
              Crafted specifically for the local architectural context of Gujarat, ensuring optimal spatial flow, thermal comfort, and durability.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {interiorServices.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 80}>
              <div className="bg-white/90 backdrop-blur-sm border border-stone-200/90 rounded-[28px] overflow-hidden p-6 sm:p-8 space-y-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
                <div className="space-y-4">
                  <div className="relative h-48 rounded-2xl overflow-hidden">
                    <img
                      src={service.image}
                      alt={`${service.title} - Interior design in Ahmedabad`}
                      width={600}
                      height={400}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-semibold tracking-label text-[#B89563]">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold tracking-tight text-[#171717]">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                    {service.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-stone-100">
                    <span className="text-[10px] font-semibold tracking-label text-[#B89563] block">
                      KEY DELIVERABLES:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#333330]">
                      {service.deliverables.slice(0, 4).map((d, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B89563] shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={onOpenEstimator}
                    className="text-xs tracking-label font-semibold text-[#B89563] hover:text-[#171717] flex items-center gap-1.5 transition-colors"
                  >
                    <span>ESTIMATE SCOPE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="/contact"
                    className="text-[11px] text-stone-500 hover:text-stone-900 transition-colors"
                  >
                    Consult Studio
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Interior Design Approach & Process */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <ScrollReveal>
          <div className="bg-[#171717] text-white rounded-[36px] p-8 sm:p-12 md:p-16 space-y-12">
            <div className="space-y-4 max-w-2xl">
              <span className="tracking-label text-[10px] text-[#B89563] block font-semibold">
                OUR METHODOLOGY
              </span>
              <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight">
                From 3D Spatial Planning to Turnkey Handover
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                We believe exceptional interior design bridges aesthetic warmth with flawless on-site execution. 
                Our team oversees every step under single-source accountability.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Spatial Consultation',
                  desc: 'In-depth lifestyle briefing, architectural floor plan assessment, and site measurement at your Ahmedabad property.',
                  icon: Compass
                },
                {
                  step: '02',
                  title: '3D Visualizations',
                  desc: 'Photorealistic 3D renders, mood boards, lighting simulation, and preliminary material palette selection.',
                  icon: Sparkles
                },
                {
                  step: '03',
                  title: 'Bespoke Production',
                  desc: 'Factory-precision modular joinery, custom woodwork, false ceiling structural work, and MEP execution.',
                  icon: HomeIcon
                },
                {
                  step: '04',
                  title: 'Final Handover',
                  desc: 'Snagging checklist audit, deep cleaning, final finishing review, and turnkey handover on verified schedule.',
                  icon: ShieldCheck
                }
              ].map((phase, idx) => {
                const IconComponent = phase.icon;
                return (
                  <div key={idx} className="space-y-4 border-l border-stone-700/60 pl-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#B89563] tracking-widest">{phase.step}</span>
                      <IconComponent className="w-5 h-5 text-[#B89563]" />
                    </div>
                    <h3 className="text-lg font-semibold text-white tracking-tight">{phase.title}</h3>
                    <p className="text-xs text-stone-300 font-light leading-relaxed">{phase.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Featured Projects Highlight */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-300/80 pb-6">
            <div>
              <span className="tracking-label text-[10px] text-[#B89563] block font-semibold mb-2">
                VERIFIED CASE STUDIES
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#171717]">
                Featured Interior Projects in Ahmedabad
              </h2>
            </div>
            <a
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-label text-[#B89563] hover:text-[#171717] transition-colors"
            >
              <span>EXPLORE ALL PROJECTS</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {interiorProjects.map((proj, idx) => (
            <ScrollReveal key={proj.id} delay={idx * 100}>
              <div
                onClick={() => onSelectProject && onSelectProject(proj)}
                className="group cursor-pointer bg-white rounded-[28px] overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-72 sm:h-80 overflow-hidden">
                  <img
                    src={proj.heroImage}
                    alt={`${proj.title} - Interior design in ${proj.location}`}
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                    <span className="px-3 py-1 bg-[#B89563] text-white rounded-full text-[10px] font-semibold tracking-label uppercase">
                      {proj.category}
                    </span>
                    <h3 className="text-2xl font-semibold tracking-tight">{proj.title}</h3>
                    <p className="text-xs text-stone-200 line-clamp-2 font-light">{proj.designApproach}</p>
                  </div>
                </div>

                <div className="p-6 bg-white flex items-center justify-between text-xs">
                  <span className="text-stone-500">{proj.location} • {proj.areaSqFt}</span>
                  <span className="text-[#B89563] font-semibold tracking-label flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>VIEW CASE STUDY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Cross-Service Contextual Linking & CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <ScrollReveal>
          <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-8 sm:p-12 border border-stone-200/80 space-y-8">
            <div className="max-w-2xl space-y-3">
              <span className="tracking-label text-[10px] text-[#B89563] block font-semibold">
                INTEGRATED CONSTRUCTION SERVICES
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171717]">
                Related Capabilities for Turnkey Success
              </h2>
              <p className="text-xs sm:text-sm text-[#333330] font-light leading-relaxed">
                Interior design achieves its highest expression when paired with in-house custom furniture crafting and precision civil contracting.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <a
                href="/custom-furniture-joinery"
                className="p-6 rounded-2xl border border-stone-200 bg-white hover:border-[#B89563] transition-all group flex items-start justify-between gap-4"
              >
                <div>
                  <h3 className="text-base font-semibold text-[#171717] group-hover:text-[#B89563] transition-colors">
                    Custom Furniture & Joinery
                  </h3>
                  <p className="text-xs text-[#333330] mt-1 font-light">
                    Made-to-measure wardrobes, modular kitchens, Burmese teak woodwork, and TV consoles.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#B89563] shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/civil-construction-gujarat"
                className="p-6 rounded-2xl border border-stone-200 bg-white hover:border-[#B89563] transition-all group flex items-start justify-between gap-4"
              >
                <div>
                  <h3 className="text-base font-semibold text-[#171717] group-hover:text-[#B89563] transition-colors">
                    Civil Construction Contractor
                  </h3>
                  <p className="text-xs text-[#333330] mt-1 font-light">
                    Turnkey civil alterations, structural modifications, masonry, plumbing, and electrical finishing.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#B89563] shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-600">
                <span>Studio Location: 414, Antilia Business Hub, Nana Chiloda Circle, Ahmedabad</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenEstimator}
                  className="px-6 py-3 bg-[#B89563] text-white hover:bg-[#171717] transition-all rounded-full text-xs font-semibold tracking-label"
                >
                  SCHEDULE CONSULTATION
                </button>
                <a
                  href="/contact"
                  className="px-6 py-3 border border-stone-300 text-[#171717] hover:bg-[#171717] hover:text-white transition-all rounded-full text-xs font-semibold tracking-label"
                >
                  CONTACT STUDIO
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
