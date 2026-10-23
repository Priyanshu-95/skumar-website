import React from 'react';
import { ArrowUpRight, ArrowRight, CheckCircle2, Sparkles, HardHat, Wrench, Clock, FileCheck } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { SERVICES } from '../data/services';
import { PROJECTS } from '../data/projects';
import type { Project } from '../types';

interface CivilConstructionPageProps {
  onSelectProject?: (project: Project) => void;
  onOpenEstimator: () => void;
}

export const CivilConstructionPage: React.FC<CivilConstructionPageProps> = ({ onSelectProject, onOpenEstimator }) => {
  // Civil construction service items
  const civilService = SERVICES.find(s => s.id === 'turnkey-execution');

  const civilProjects = PROJECTS.filter(p =>
    ['shela-courtyard-villa', 'zenith-corporate-office', 'sanjeevani-health-clinic'].includes(p.id)
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
                GENERAL CONTRACTING & CIVIL ENGINEERING • GUJARAT
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#171717] leading-[1.12]">
              Civil Construction Contractor in Gujarat
            </h1>

            <p className="text-base sm:text-lg text-[#333330] leading-relaxed font-light max-w-3xl">
              Turnkey civil construction for homes, offices and commercial spaces in Ahmedabad and Gujarat. 
              S Kumar delivers single-point accountability across structural modifications, brickwork masonry, 
              sanitary plumbing, concealed electrical conduits, premium flooring, and architectural finishing.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenEstimator}
                className="px-8 py-4 bg-[#B89563] text-white hover:bg-[#171717] transition-all duration-300 tracking-label text-xs font-semibold rounded-full shadow-lg flex items-center gap-2"
              >
                <span>REQUEST CIVIL ESTIMATE</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <a
                href="/projects"
                className="px-8 py-4 border border-stone-300 text-[#171717] hover:bg-[#171717] hover:text-white transition-all duration-300 tracking-label text-xs font-semibold rounded-full flex items-center gap-2"
              >
                <span>VIEW CIVIL PROJECTS</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Turnkey Scope & Technical Capabilities */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
        <ScrollReveal>
          <div className="border-b border-stone-300/80 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="tracking-label text-[10px] text-[#B89563] block font-semibold mb-2">
                TURNKEY SCOPE OF WORK
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#171717]">
                Comprehensive On-Site Civil Execution
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#333330] max-w-md font-light">
              We eliminate the friction of managing multiple uncoordinated trade contractors by managing the complete build under one unified contract.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <ScrollReveal>
            <div className="relative h-96 sm:h-[480px] rounded-[32px] overflow-hidden border border-stone-200 shadow-lg">
              <img
                src={civilService?.image || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop'}
                alt="Civil Construction Contractor in Gujarat - S Kumar"
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="px-3 py-1 bg-[#B89563] text-white rounded-full text-[10px] font-semibold tracking-label uppercase">
                  TURNKEY CONTRACTING
                </span>
                <h3 className="text-2xl font-semibold">Single-Point Project Accountability</h3>
                <p className="text-xs text-stone-200 font-light">
                  From initial demolition to final turnkey handover across residential villas and commercial spaces in Ahmedabad and Gandhinagar.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="bg-white/90 backdrop-blur-sm border border-stone-200/90 rounded-[32px] p-8 sm:p-10 space-y-6 shadow-sm">
              <h3 className="text-2xl font-semibold tracking-tight text-[#171717]">
                What Our Civil Contract Covers
              </h3>
              <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                Our site engineers oversee daily labor allocation, material verification, and safety compliance, ensuring projects progress strictly according to architectural drawings.
              </p>

              <div className="space-y-3.5 pt-2">
                {[
                  'Civil demolition, partition modifications, and structural RCC adjustments',
                  'Waterproofing treatments for sunken slabs, terraces, and bathrooms',
                  'Concealed plumbing and sanitary line installations with pressure testing',
                  'Concealed electrical conduit cabling, distribution boards, and earth wiring',
                  'Precision Italian marble, vitrified tile, and natural stone flooring laying',
                  'Gypsum and POP false ceiling framing with concealed lighting provisions',
                  'Surface wall plastering, putty coats, and premium paint finishing',
                  'Final site snagging audit, deep sanitization, and scheduled client handover'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#333330]">
                    <CheckCircle2 className="w-4 h-4 text-[#B89563] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={onOpenEstimator}
                  className="px-6 py-3 bg-[#B89563] text-white hover:bg-[#171717] transition-all rounded-full text-xs font-semibold tracking-label flex items-center gap-2"
                >
                  <span>CALCULATE CIVIL COST</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href="/contact"
                  className="text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
                >
                  Schedule Site Visit →
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Engineering Standards */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <ScrollReveal>
          <div className="bg-[#171717] text-white rounded-[36px] p-8 sm:p-12 md:p-16 space-y-10">
            <div className="space-y-4 max-w-2xl">
              <span className="tracking-label text-[10px] text-[#B89563] block font-semibold">
                EXECUTION BENCHMARKS
              </span>
              <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight">
                Engineering Discipline & Transparent Scheduling
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                Construction success relies on punctuality, certified raw materials, and strict adherence to structural engineering standards.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Material Integrity',
                  desc: 'We procure verified cement, ISI-grade steel, and certified PVC/CPVC pipes directly from approved manufacturers.',
                  icon: HardHat
                },
                {
                  title: 'Waterproofing Protocol',
                  desc: 'Multi-layer chemical waterproofing coating applied to wet areas with continuous 48-hour flood ponding tests.',
                  icon: Wrench
                },
                {
                  title: 'Milestone Timelines',
                  desc: 'Transparent project schedule with weekly client progress reports and verified completion dates.',
                  icon: Clock
                },
                {
                  title: 'Snag-Free Handover',
                  desc: 'Detailed quality check covering all plumb lines, socket polarities, and drain gradients before handover.',
                  icon: FileCheck
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

      {/* Civil Projects */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-10">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-300/80 pb-6">
            <div>
              <span className="tracking-label text-[10px] text-[#B89563] block font-semibold mb-2">
                VERIFIED SITES
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#171717]">
                Recent Civil Construction & Interior Projects
              </h2>
            </div>
            <a
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-label text-[#B89563] hover:text-[#171717] transition-colors"
            >
              <span>VIEW FULL GALLERY</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {civilProjects.map((proj, idx) => (
            <ScrollReveal key={proj.id} delay={idx * 100}>
              <div
                onClick={() => onSelectProject && onSelectProject(proj)}
                className="group cursor-pointer bg-white rounded-[24px] overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={proj.heroImage}
                    alt={`${proj.title} - Civil construction and interior project in ${proj.location}`}
                    width={600}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-semibold tracking-tight">{proj.title}</h3>
                    <p className="text-[11px] text-stone-200">{proj.location} • {proj.areaSqFt}</p>
                  </div>
                </div>

                <div className="p-5 text-xs space-y-2">
                  <p className="text-stone-600 line-clamp-2 font-light">{proj.designApproach}</p>
                  <span className="text-[#B89563] font-semibold tracking-label flex items-center gap-1 pt-2">
                    <span>EXPLORE PROJECT</span>
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
                END-TO-END PROJECT ECOSYSTEM
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171717]">
                Harmonize Civil Foundations with Interior Architecture
              </h2>
              <p className="text-xs sm:text-sm text-[#333330] font-light leading-relaxed">
                By combining civil construction with in-house architectural interior design and custom furniture, 
                S Kumar ensures seamless execution without finger-pointing between separate contractors.
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
                    Turnkey 3D spatial planning, false ceiling designs, and luxury residential interior architecture.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#B89563] shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/custom-furniture-joinery"
                className="p-6 rounded-2xl border border-stone-200 bg-white hover:border-[#B89563] transition-all group flex items-start justify-between gap-4"
              >
                <div>
                  <h3 className="text-base font-semibold text-[#171717] group-hover:text-[#B89563] transition-colors">
                    Custom Furniture & Joinery
                  </h3>
                  <p className="text-xs text-[#333330] mt-1 font-light">
                    Burmese teak woodwork, bespoke wardrobes, modular kitchens, and PVC panelling solutions.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#B89563] shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-600">
                <span>Civil Site Consultations: +91 98989 66648 • S.P. Ring Road, Ahmedabad</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenEstimator}
                  className="px-6 py-3 bg-[#B89563] text-white hover:bg-[#171717] transition-all rounded-full text-xs font-semibold tracking-label"
                >
                  START CIVIL PROJECT
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
