import React from 'react';
import { ArrowUpRight, ArrowRight, CheckCircle2, Sparkles, Layers, ShieldCheck, Ruler, Hammer } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { MaterialCollage } from '../components/MaterialCollage';
import { SERVICES } from '../data/services';
import { PROJECTS } from '../data/projects';
import type { Project } from '../types';

interface CustomJoineryPageProps {
  onSelectProject?: (project: Project) => void;
  onOpenEstimator: () => void;
}

export const CustomJoineryPage: React.FC<CustomJoineryPageProps> = ({ onSelectProject, onOpenEstimator }) => {
  // Joinery and woodwork service scopes
  const joineryServices = SERVICES.filter(s =>
    ['Wooden Work', 'PVC Work'].includes(s.category)
  );

  const woodworkProjects = PROJECTS.filter(p =>
    ['shela-courtyard-villa', 'bodakdev-3bhk-residence', 'satellite-2bhk-apartment'].includes(p.id)
  );

  return (
    <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-20 bg-[#F5F1E8] text-[#171717] space-y-24 relative overflow-hidden">
      {/* Ambient Lighting Glow */}
      <div className="ambient-glow-warm -top-40 -left-40 opacity-70" />
      <div className="ambient-glow-subtle top-1/2 -right-40 opacity-60" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <ScrollReveal>
          <div className="space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-[#B89563]/30 backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#B89563]" />
              <span className="tracking-label text-[10px] text-[#B89563] font-semibold">
                ARTISAN CARPENTRY & IN-HOUSE MODULAR WORKSHOP
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#171717] leading-[1.12]">
              Custom Furniture & Joinery in Ahmedabad
            </h1>

            <p className="text-base sm:text-lg text-[#333330] leading-relaxed font-light max-w-3xl">
              Made-to-measure wardrobes, kitchens, TV units and furniture crafted for your space in Ahmedabad and across Gujarat. 
              S Kumar engineers precision architectural woodwork using solid Burmese teak, marine-grade boiling waterproof plywood, 
              natural wood veneers, and European hardware built to endure for generations.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenEstimator}
                className="px-8 py-4 bg-[#B89563] text-white hover:bg-[#171717] transition-all duration-300 tracking-label text-xs font-semibold rounded-full shadow-lg flex items-center gap-2"
              >
                <span>REQUEST FURNITURE ESTIMATE</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <a
                href="/projects"
                className="px-8 py-4 border border-stone-300 text-[#171717] hover:bg-[#171717] hover:text-white transition-all duration-300 tracking-label text-xs font-semibold rounded-full flex items-center gap-2"
              >
                <span>SEE JOINERY PORTFOLIO</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Bespoke Joinery Capabilities */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
        <ScrollReveal>
          <div className="border-b border-stone-300/80 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="tracking-label text-[10px] text-[#B89563] block font-semibold mb-2">
                WORKSHOP CAPABILITIES
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#171717]">
                Made-to-Measure Woodwork & Panelling Solutions
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#333330] max-w-md font-light">
              Manufactured with millwork precision and installed by master carpenters across residential and commercial interiors in Gujarat.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {joineryServices.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 100}>
              <div className="bg-white/90 backdrop-blur-sm border border-stone-200/90 rounded-[28px] overflow-hidden p-6 sm:p-8 space-y-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
                <div className="space-y-4">
                  <div className="relative h-60 rounded-2xl overflow-hidden">
                    <img
                      src={service.image}
                      alt={`${service.title} - Custom furniture and joinery in Ahmedabad`}
                      width={800}
                      height={500}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-semibold tracking-label text-[#B89563]">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold tracking-tight text-[#171717]">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                    {service.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-stone-100">
                    <span className="text-[10px] font-semibold tracking-label text-[#B89563] block">
                      DELIVERABLES & TECHNICAL SCOPE:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#333330]">
                      {service.deliverables.map((d, i) => (
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
                    <span>REQUEST JOINERY QUOTE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="/contact"
                    className="text-[11px] text-stone-500 hover:text-stone-900 transition-colors"
                  >
                    Workshop Inquiry
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Material Collage Showcase */}
      <MaterialCollage />

      {/* Joinery Engineering Standards */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <ScrollReveal>
          <div className="bg-[#171717] text-white rounded-[36px] p-8 sm:p-12 md:p-16 space-y-10">
            <div className="space-y-4 max-w-2xl">
              <span className="tracking-label text-[10px] text-[#B89563] block font-semibold">
                CRAFTSMANSHIP PRINCIPLES
              </span>
              <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight">
                Engineered for Gujarat's Climate & Long-Term Durability
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                Woodwork in western India requires specialized moisture barriers, anti-termite treatments, 
                and thermal movement allowances. Here is how our joinery stands the test of time.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Burmese Teak & Solid Timber',
                  desc: 'Seasoned natural hardwoods chosen for organic grain consistency and dimensional stability.',
                  icon: Layers
                },
                {
                  title: 'BWP / BWR Calibrated Plywood',
                  desc: 'Boiling water-proof core sheets ensuring zero warping in kitchens, wardrobes, and bathrooms.',
                  icon: ShieldCheck
                },
                {
                  title: 'European Soft-Close Hardware',
                  desc: 'Precision telescopic runners, concealed hinges, and ergonomic sliding gear for whisper-quiet use.',
                  icon: Ruler
                },
                {
                  title: 'Anti-Termite Treatment',
                  desc: 'Full preventive chemical treatment of base frameworks and concealed wall backings before final fitting.',
                  icon: Hammer
                }
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="space-y-3 border-l border-stone-700/60 pl-6">
                    <IconComponent className="w-5 h-5 text-[#B89563]" />
                    <h3 className="text-base font-semibold text-white tracking-tight">{item.title}</h3>
                    <p className="text-xs text-stone-300 font-light leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Featured Joinery Projects */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-300/80 pb-6">
            <div>
              <span className="tracking-label text-[10px] text-[#B89563] block font-semibold mb-2">
                AUTHENTIC EXECUTION
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#171717]">
                Completed Custom Woodwork Examples
              </h2>
            </div>
            <a
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-label text-[#B89563] hover:text-[#171717] transition-colors"
            >
              <span>SEE FULL PORTFOLIO</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {woodworkProjects.map((proj, idx) => (
            <ScrollReveal key={proj.id} delay={idx * 100}>
              <div
                onClick={() => onSelectProject && onSelectProject(proj)}
                className="group cursor-pointer bg-white rounded-[24px] overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={proj.heroImage}
                    alt={`${proj.title} - Custom joinery and furniture`}
                    width={600}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-semibold tracking-tight">{proj.title}</h3>
                    <p className="text-[11px] text-stone-200">{proj.location}</p>
                  </div>
                </div>

                <div className="p-5 text-xs space-y-2">
                  <p className="text-stone-600 line-clamp-2 font-light">{proj.designApproach}</p>
                  <span className="text-[#B89563] font-semibold tracking-label flex items-center gap-1 pt-2">
                    <span>INSPECT DETAILS</span>
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
                CROSS-DISCIPLINARY COLLABORATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171717]">
                Combine Furniture Craft with Full Construction
              </h2>
              <p className="text-xs sm:text-sm text-[#333330] font-light leading-relaxed">
                Whether you need standalone custom cabinetry or full turnkey civil reconstruction, 
                our Ahmedabad team provides seamless end-to-end delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <a
                href="/interior-design-ahmedabad"
                className="p-6 rounded-2xl border border-stone-200 bg-white hover:border-[#B89563] transition-all group flex items-start justify-between gap-4"
              >
                <div>
                  <h3 className="text-base font-semibold text-[#171717] group-hover:text-[#B89563] transition-colors">
                    Interior Design Services
                  </h3>
                  <p className="text-xs text-[#333330] mt-1 font-light">
                    Complete turnkey apartment, villa, and corporate interior design from concept to completion.
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
                    Structural masonry, wall modifications, plumbing, flooring, and turnkey civil handovers.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#B89563] shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-600">
                <span>Workshop Inquiries: +91 98989 66648 • info@skumarinterior.com</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenEstimator}
                  className="px-6 py-3 bg-[#B89563] text-white hover:bg-[#171717] transition-all rounded-full text-xs font-semibold tracking-label"
                >
                  GET JOINERY QUOTE
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
