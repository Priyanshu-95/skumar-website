import React, { useState } from 'react';
import { PROJECTS } from '../data/projects';
import { SERVICES } from '../data/services';
import type { Project } from '../types';
import { ArrowDown, ArrowUpRight, ArrowRight, CheckCircle2, ChevronRight, MapPin, Building2, ShieldCheck, Layers, Users, Sparkles, Globe } from 'lucide-react';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { DesignBuildLive } from '../components/DesignBuildLive';
import { MaterialCollage } from '../components/MaterialCollage';
import { BrandShowcase } from '../components/BrandShowcase';
import { ScrollReveal } from '../components/ScrollReveal';

interface HomeProps {
  setActiveTab: (tab: string) => void;
  onSelectProject: (project: Project) => void;
  onOpenEstimator: () => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab, onSelectProject, onOpenEstimator }) => {
  const [activeServiceHover, setActiveServiceHover] = useState<string>(SERVICES[0].id);
  const [activeProcessStep, setActiveProcessStep] = useState<number>(0);

  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const currentService = SERVICES.find((s) => s.id === activeServiceHover) || SERVICES[0];

  const processSteps = [
    { number: '01', title: 'Consultation & Site Brief', desc: 'Understanding your family habits, spatial needs, budget expectations, and architectural orientation in Ahmedabad, Gandhinagar, or Pan India.' },
    { number: '02', title: 'Concept & 3D Spatial Design', desc: 'Crafting precise photorealistic 3D renders, layout options, and lighting schemes before any civil execution or woodwork begins.' },
    { number: '03', title: 'Material Selection & Palette', desc: 'Hands-on curation of natural stone, wood veneers, metals, textiles, and architectural finishes at our studio.' },
    { number: '04', title: 'Construction & Civil Execution', desc: 'In-house execution of masonry walls, concealed plumbing, electrical ducting, custom joinery, and architectural false ceilings.' },
    { number: '05', title: 'Quality Inspection & Handover', desc: 'Rigorous 100-point quality check, deep cleaning, smart device setup, and white-glove keys handover.' }
  ];

  return (
    <div className="space-y-0 bg-[#F5F1E8] text-[#171717]">
      
      {/* 1. ATMOSPHERIC ARCHITECTURAL HERO SCREEN WITH REFINED TYPOGRAPHY & SMOOTH ENTRANCE */}
      <section className="relative min-h-screen w-full flex items-center pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-20 overflow-hidden bg-[#0B0C0E]">
        {/* Background Photography with Dark Atmospheric Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
            alt="Luxury residential living space designed and constructed by S Kumar Construction & Interior in Ahmedabad"
            width={2000}
            height={1333}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.1] animate-fade-in"
          />
          {/* Dark Shadow Gradient Overlay for High-Contrast Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-black/55 to-black/35" />
        </div>

        {/* Ambient Warm Glow */}
        <div className="ambient-glow-warm top-1/4 left-10 z-0" />

        {/* Hero Content Container (Tactile Dark Frosted Glass Panel) */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Main Hero Frosted Glass Content Panel */}
            <div className="lg:col-span-8 glass-dark p-8 sm:p-12 md:p-14 rounded-[40px] border border-white/20 shadow-2xl text-white space-y-7 animate-fade-slide-up">
              
              <div className="flex flex-wrap items-center gap-2">
                <div className="glass-capsule-dark inline-flex items-center gap-2.5 px-4 py-1.5 border border-[#B89563]/40 bg-[#B89563]/15">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="tracking-label text-[10px] text-[#E8C89A] font-bold">
                    S KUMAR CONSTRUCTION & INTERIOR
                  </span>
                </div>
                <div className="glass-capsule-dark inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-white/25 bg-white/10 text-white text-[10px] font-mono uppercase tracking-wider font-bold">
                  <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="text-white">Pan India Interior Design</span>
                </div>
              </div>

              <h1 className="font-sans text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.12] tracking-tight text-white">
                We Build <span className="text-[#B89563] font-light">Tomorrow.</span>
              </h1>

              <p className="text-sm sm:text-lg text-stone-200 max-w-2xl leading-relaxed font-light">
                S Kumar Construction & Interior brings together thoughtful design, quality craftsmanship, and reliable construction solutions to create spaces built around your vision. From concept to completion, we turn ideas into spaces made to last.
              </p>

              {/* Service Badges (Clean, Professional - No Emojis) */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white pt-1">
                <span className="px-3.5 py-1.5 rounded-full bg-white/15 border border-white/30 text-white shadow-sm font-medium">Interior Design</span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/15 border border-white/30 text-white shadow-sm font-medium">Construction</span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/15 border border-white/30 text-white shadow-sm font-medium">Furniture & Joinery</span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/15 border border-white/30 text-white shadow-sm font-medium">Renovation & Remodeling</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-3">
                <button
                  onClick={onOpenEstimator}
                  className="w-full sm:w-auto bg-[#B89563] hover:bg-white hover:text-[#171717] text-white transition-all duration-300 px-8 py-4 text-xs tracking-widest uppercase font-bold flex items-center justify-center gap-2.5 rounded-full shadow-2xl hover:scale-105"
                >
                  <span>START YOUR PROJECT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTab('work')}
                  className="w-full sm:w-auto glass-capsule-dark border border-white/30 text-white hover:bg-white hover:text-[#171717] transition-all duration-300 px-7 py-4 text-xs tracking-widest uppercase font-bold flex items-center justify-center gap-2"
                >
                  <span>EXPLORE WORK</span>
                </button>
              </div>

            </div>

            {/* Right Attached Architectural Info Box */}
            <div className="lg:col-span-4 hidden lg:flex flex-col space-y-4">
              <div className="glass-dark p-7 rounded-[32px] border border-white/20 shadow-2xl text-white space-y-4 text-sm animate-fade-slide-up">
                <span className="tracking-label text-[10px] text-[#B89563] block font-semibold">
                  OUR EXPERTISE
                </span>
                <p className="text-stone-300 leading-relaxed font-light text-sm">
                  Integrated interior design and construction solutions, thoughtfully planned and professionally executed to bring your vision to life.
                </p>
                <div className="pt-3 border-t border-white/15 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[#B89563] font-semibold">
                    <span>Interior Design</span>
                    <span>Construction</span>
                    <span>Space Planning</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-amber-100 font-medium flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-[#B89563] shrink-0" />
                    <span>Interior Design Services Pan India</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Hero Bottom Bar */}
          <div className="pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-200 uppercase tracking-widest font-mono">
            <div className="font-medium">Ahmedabad • Gandhinagar • Gujarat • Pan India Interior Design</div>
            <div className="flex items-center gap-2 animate-bounce text-[#B89563] font-semibold">
              <span>Scroll to Explore</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#B89563]" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION SECTION WITH VIBRANT ACCENTS & PAN INDIA HIGHLIGHT */}
      <section className="py-24 bg-[#F5F1E8] text-[#171717] relative overflow-hidden border-t border-stone-300/70">
        <div className="ambient-glow-warm top-10 right-10" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <span className="tracking-label text-[11px] text-[#B89563] block font-semibold">
                    ARCHITECTURE, INTERIOR DESIGN & CIVIL CONSTRUCTION
                  </span>
                  <h2 className="font-sans text-3xl sm:text-5xl font-semibold leading-[1.18] tracking-tight text-[#171717]">
                    Crafting Enduring Spaces <br />
                    <span className="text-[#B89563] font-light">With Complete Craftsmanship.</span>
                  </h2>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-[#333330] leading-relaxed font-light">
                  <p>
                    At <strong className="text-[#171717] font-semibold">S Kumar Construction & Interior</strong>, we provide complete turnkey solutions combining architectural planning, refined interior design, custom joinery, and reliable civil construction under single studio management.
                  </p>
                  <p>
                    From custom residential homes in Gujarat to bespoke commercial interiors across India, we maintain microscopic quality control over every structural line, finish, and detail.
                  </p>
                </div>

                {/* PROMINENT PAN INDIA INTERIOR DESIGN HIGHLIGHT */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#B89563]/15 via-[#B89563]/8 to-transparent border border-[#B89563]/35 shadow-sm space-y-2">
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-5 h-5 text-[#B89563] shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#B89563]">NATIONWIDE REACH</span>
                  </div>
                  <h4 className="font-sans text-base sm:text-lg font-bold text-[#171717]">
                    Interior Design Services Available Across India — Pan India.
                  </h4>
                  <p className="text-xs text-[#333330] font-light leading-relaxed">
                    While our civil construction team operates on-site in Gujarat, our interior design, 3D visualization, and turnkey execution teams serve clients nationwide across India.
                  </p>
                </div>

                {/* 3 CORE PILLARS BADGE GRID */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white border border-stone-200 text-center space-y-1 shadow-sm">
                    <Building2 className="w-5 h-5 text-[#B89563] mx-auto" />
                    <span className="text-xs font-bold text-[#171717] block">Construction</span>
                    <span className="text-[10px] text-stone-700 font-mono font-semibold block">Turnkey Civil Work</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-stone-200 text-center space-y-1 shadow-sm">
                    <Sparkles className="w-5 h-5 text-[#B89563] mx-auto" />
                    <span className="text-xs font-bold text-[#171717] block">Interior Design</span>
                    <span className="text-[10px] text-[#B89563] font-mono font-bold block">Pan India</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-stone-200 text-center space-y-1 shadow-sm">
                    <Layers className="w-5 h-5 text-[#B89563] mx-auto" />
                    <span className="text-xs font-bold text-[#171717] block">Furniture & Joinery</span>
                    <span className="text-[10px] text-stone-700 font-mono font-semibold block">Custom Craftsmanship</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('about')}
                    className="tracking-label text-xs text-[#B89563] hover:text-[#171717] transition-colors flex items-center gap-2 group font-semibold"
                  >
                    <span>Discover More About S Kumar Studio</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Right Curved Architectural Photo & Glass Floating Badge */}
              <div className="lg:col-span-6 relative">
                <div className="h-[420px] md:h-[500px] rounded-[36px] overflow-hidden border border-white shadow-xl relative glass-card-lift">
                  <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop"
                    alt="Bespoke Burmese teak joinery and living room interior in Prahlad Nagar Ahmedabad"
                    loading="lazy"
                    decoding="async"
                    width={1400}
                    height={933}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                  
                  {/* Floating Glass Metadata Panel */}
                  <div className="absolute bottom-6 left-6 right-6 p-5 glass-panel rounded-2xl border border-white shadow-xl text-sm space-y-1 bg-white/90 text-[#171717]">
                    <span className="font-sans text-lg font-semibold block text-[#B89563]">The Earth & Teak Residence</span>
                    <span className="text-xs text-[#333330] font-mono">Prahlad Nagar, Ahmedabad • 3 BHK Turnkey Project</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. SIGNATURE INTERACTION: DESIGN -> BUILD -> LIVE */}
      <ScrollReveal>
        <DesignBuildLive />
      </ScrollReveal>

      {/* 4. SERVICES SECTION: BENTO LIGHT GLASS COMPOSITION */}
      <section className="py-24 bg-[#F5F1E8] text-[#171717] relative overflow-hidden border-t border-stone-300/70">
        <div className="ambient-glow-warm top-1/4 -left-32" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div>
                <span className="tracking-label text-[11px] text-[#B89563] block mb-2 font-semibold">
                  CORE CAPABILITIES
                </span>
                <h2 className="font-sans text-3xl sm:text-5xl font-semibold tracking-tight text-[#171717]">
                  What We Create
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#333330] max-w-md leading-relaxed font-light">
                From compact 2 BHK urban homes to sprawling luxury bungalows, executive offices, and specialized healthcare spaces across Gujarat.
              </p>
            </div>
          </ScrollReveal>

          {/* Bento Light Glass Services Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              {SERVICES.map((srv, idx) => {
                const isActive = srv.id === activeServiceHover;
                return (
                  <ScrollReveal key={srv.id} delay={idx * 80}>
                    <div
                      onMouseEnter={() => setActiveServiceHover(srv.id)}
                      onClick={() => setActiveTab('services')}
                      className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'glass-deep text-[#171717] border-[#B89563]/50 shadow-xl scale-[1.005] bg-white'
                          : 'glass-panel text-[#171717] border-white/90 hover:border-[#B89563]/30 bg-white/80 hover:-translate-y-0.5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className={`font-mono text-xs ${isActive ? 'text-[#B89563] font-semibold' : 'text-stone-600'}`}>
                            {srv.number}
                          </span>
                          <h3 className="font-sans text-xl sm:text-2xl font-semibold tracking-tight">
                            {srv.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`tracking-label text-[9px] px-3 py-1 rounded-full border hidden sm:block ${
                            isActive ? 'border-[#B89563]/40 text-[#B89563] bg-[#B89563]/10 font-semibold' : 'border-stone-200 text-stone-700'
                          }`}>
                            {srv.subtitle}
                          </span>
                          <ChevronRight className={`w-5 h-5 transition-transform ${isActive ? 'translate-x-1 text-[#B89563]' : 'text-stone-600'}`} />
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Sticky Light Glass Visual Preview Card */}
            <div className="lg:col-span-5 glass-deep p-7 border border-white shadow-xl sticky top-28 space-y-5 rounded-[36px] bg-white/95 text-[#171717]">
              <div className="h-64 rounded-2xl overflow-hidden relative border border-stone-200/80 shadow-sm">
                <img
                  key={currentService.id}
                  src={currentService.image}
                  alt={`${currentService.title} - S Kumar Construction & Interior Ahmedabad`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover animate-fade-in"
                />
                <div className="absolute top-4 left-4 bg-[#B89563] text-white px-3.5 py-1 rounded-full text-[9px] uppercase font-semibold tracking-wider shadow-sm">
                  {currentService.tag}
                </div>
              </div>

              <div>
                <span className="tracking-label text-[10px] text-[#B89563] block font-semibold">
                  Service {currentService.number} / {String(SERVICES.length).padStart(2, '0')}
                </span>
                <h3 className="font-sans text-2xl font-semibold text-[#171717] mt-1">
                  {currentService.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#333330] mt-2 leading-relaxed font-light">
                  {currentService.description}
                </p>
              </div>

              <div className="space-y-2 border-t border-stone-200 pt-4">
                <span className="tracking-label text-[10px] text-[#B89563] block font-semibold">
                  Deliverables Include:
                </span>
                <ul className="space-y-1.5 text-xs text-[#171717] font-medium">
                  {currentService.deliverables.slice(0, 3).map((d, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B89563] shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setActiveTab('services')}
                className="w-full py-3.5 rounded-full bg-stone-100 hover:bg-[#B89563] hover:text-white border border-stone-300/80 text-[#171717] transition-all duration-300 tracking-label text-[10px] flex items-center justify-center gap-2 font-semibold shadow-sm"
              >
                <span>VIEW FULL SERVICE SCOPE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SELECTED WORK PORTFOLIO GRID */}
      <section className="py-24 bg-[#F5F1E8] text-[#171717] relative overflow-hidden border-t border-stone-300/70">
        <div className="ambient-glow-warm top-20 right-20" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div>
                <span className="tracking-label text-[11px] text-[#B89563] block mb-2 font-semibold">
                  SELECTED ARCHITECTURAL PORTFOLIO
                </span>
                <h2 className="font-sans text-3xl sm:text-5xl font-semibold tracking-tight text-[#171717]">
                  Spaces We've Shaped
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('work')}
                className="tracking-label text-xs text-[#B89563] hover:text-[#171717] transition-colors flex items-center gap-2 group font-semibold"
              >
                <span>View All Projects Archive</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </ScrollReveal>

          {/* Light Frosted Glass Architecture Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, idx) => (
              <ScrollReveal key={project.id} delay={idx * 100}>
                <div
                  onClick={() => onSelectProject(project)}
                  className={`group relative overflow-hidden rounded-[36px] bg-white border border-white shadow-lg cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${
                    idx % 3 === 0 ? 'md:col-span-2 h-[460px]' : 'h-[400px]'
                  }`}
                >
                  <img
                    src={project.heroImage}
                    alt={`${project.title} - ${project.category} in ${project.location}`}
                    loading="lazy"
                    decoding="async"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-5 left-5 flex gap-2 items-center z-10">
                    <div className="glass-capsule px-3.5 py-1 text-[9px] tracking-label text-[#B89563] border border-white/80 bg-white/90 font-semibold">
                      {project.filterCategory}
                    </div>
                    {project.typeLabel && (
                      <div className={`px-3 py-1 text-[9px] tracking-label rounded-full border backdrop-blur-md font-semibold ${
                        project.typeLabel === '3D Visualization'
                          ? 'bg-amber-100/90 text-amber-900 border-amber-300'
                          : 'bg-emerald-100/90 text-emerald-900 border-emerald-300'
                      }`}>
                        {project.typeLabel}
                      </div>
                    )}
                  </div>

                  {/* Overlapping Light Frosted Glass Metadata Panel */}
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white shadow-xl flex items-end justify-between transition-transform duration-300 group-hover:-translate-y-1 bg-white/90 text-[#171717]">
                      <div className="space-y-1">
                        <span className="tracking-label text-[10px] text-[#B89563] block font-semibold">
                          {project.category} • {project.location}
                        </span>
                        <h3 className="font-sans text-xl sm:text-2xl font-semibold text-[#171717] tracking-tight group-hover:text-[#B89563] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-[#333330] line-clamp-1 max-w-lg font-light hidden sm:block">
                          {project.clientBrief}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-stone-300 text-[#171717] bg-white flex items-center justify-center group-hover:bg-[#B89563] group-hover:border-transparent group-hover:text-white transition-all shrink-0 shadow-sm">
                        <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BEFORE / AFTER TRANSFORMATION SECTION */}
      <section className="py-24 bg-[#EFEBE4] text-[#171717] border-t border-stone-300/70">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <BeforeAfterSlider
              beforeImage={PROJECTS[0].beforeImage!}
              afterImage={PROJECTS[0].afterImage!}
              title="See The Transformation"
              subtitle="Raw Civil Shell vs Finished Architectural Luxury in Ahmedabad"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* 7. MATERIAL PHILOSOPHY COLLAGE & BRAND SHOWCASE */}
      <div id="material-library">
        <ScrollReveal>
          <MaterialCollage />
        </ScrollReveal>

        <ScrollReveal>
          <BrandShowcase onOpenEstimator={onOpenEstimator} />
        </ScrollReveal>
      </div>

      {/* 8. RESIDENTIAL SPECIALIZATION SECTION */}
      <section className="py-24 bg-[#EFEBE4] text-[#171717] border-t border-stone-300/70">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <ScrollReveal>
            <div className="max-w-2xl space-y-2">
              <span className="tracking-label text-[11px] text-[#B89563] block font-semibold">
                RESIDENTIAL INTERIORS
              </span>
              <h2 className="font-sans text-3xl sm:text-5xl font-semibold text-[#171717]">
                Your Home, Completely Considered.
              </h2>
              <p className="text-sm sm:text-base text-[#333330] leading-relaxed font-light">
                Specialized turnkey design solutions for 2 BHK, 3 BHK, 4 BHK apartments, bungalows, and luxury villas across Ahmedabad and Gandhinagar.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal delay={0}>
              <div className="glass-panel p-7 rounded-[32px] border border-white shadow-md bg-white/85 hover:-translate-y-1.5 transition-all space-y-4">
                <span className="font-mono text-xs text-[#B89563] font-semibold">01 / 03</span>
                <h3 className="font-sans text-xl sm:text-2xl font-semibold text-[#171717]">2 BHK Interiors</h3>
                <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                  Compact urban spaces planned with intelligent storage walls, light oak joinery, and concealed lighting to maximize living comfort.
                </p>
                <div className="pt-1 text-xs font-medium text-[#B89563] font-mono">Ahmedabad Urban Homes</div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="glass-deep p-7 rounded-[32px] border border-[#B89563]/30 shadow-xl bg-white hover:-translate-y-1.5 transition-all space-y-4">
                <span className="font-mono text-xs text-[#B89563] font-semibold">02 / 03</span>
                <h3 className="font-sans text-xl sm:text-2xl font-semibold text-[#171717]">3 BHK & 4 BHK Homes</h3>
                <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                  Generous spatial planning fusing Italian travertine stone, Burmese teak panelling, and customized dining nooks for modern Indian families.
                </p>
                <div className="pt-1 text-xs font-medium text-[#B89563] font-mono">Prahlad Nagar & Bodakdev</div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="glass-panel p-7 rounded-[32px] border border-white shadow-md bg-white/85 hover:-translate-y-1.5 transition-all space-y-4">
                <span className="font-mono text-xs text-[#B89563] font-semibold">03 / 03</span>
                <h3 className="font-sans text-xl sm:text-2xl font-semibold text-[#171717]">Bungalows & Villas</h3>
                <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                  Expansive private estates featuring double-height living rooms, central skylight courtyards, home theaters, and luxury master suites.
                </p>
                <div className="pt-1 text-xs font-medium text-[#B89563] font-mono">Shela & Gandhinagar</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 9. PROCESS SECTION: EDITORIAL TIMELINE */}
      <section className="py-24 bg-[#F5F1E8] text-[#171717] border-t border-stone-300/70">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div>
                <span className="tracking-label text-[11px] text-[#B89563] block mb-2 font-semibold">
                  EXECUTION ROADMAP
                </span>
                <h2 className="font-sans text-3xl sm:text-5xl font-semibold text-[#171717]">
                  From First Sketch To Final Detail.
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#333330] max-w-md leading-relaxed font-light">
                Our 5-step structured methodology ensures transparent timelines, cost predictability, and zero contractor stress.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {processSteps.map((step, idx) => {
              const isActive = activeProcessStep === idx;
              return (
                <ScrollReveal key={step.number} delay={idx * 60}>
                  <div
                    onClick={() => setActiveProcessStep(idx)}
                    className={`p-6 sm:p-7 rounded-2xl border transition-all duration-400 cursor-pointer ${
                      isActive
                        ? 'glass-deep bg-white border-[#B89563]/50 text-[#171717] shadow-xl scale-[1.005]'
                        : 'glass-panel bg-white/75 border-white/90 hover:border-[#B89563]/30 text-[#333330] hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-5">
                        <span className={`font-mono text-lg font-semibold ${isActive ? 'text-[#B89563]' : 'text-stone-600'}`}>
                          {step.number}
                        </span>
                        <h3 className="font-sans text-xl sm:text-2xl font-semibold text-[#171717]">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[#333330] max-w-xl leading-relaxed font-light">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. WHY S KUMAR SECTION: BUILT AROUND DETAIL */}
      <section className="py-24 bg-[#EFEBE4] text-[#171717] border-t border-stone-300/70">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-14">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="tracking-label text-[11px] text-[#B89563] block font-semibold">
                OUR CORE PRINCIPLES
              </span>
              <h2 className="font-sans text-3xl sm:text-5xl font-semibold text-[#171717]">
                Built Around Detail.
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScrollReveal delay={0}>
              <div className="glass-panel p-7 rounded-[28px] border border-white bg-white/85 space-y-3 shadow-sm hover:-translate-y-1.5 transition-all">
                <Building2 className="w-6 h-6 text-[#B89563]" />
                <h3 className="font-sans text-xl font-semibold text-[#171717]">Design First</h3>
                <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                  Every project begins with understanding the people who live and work in the space.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <div className="glass-panel p-7 rounded-[28px] border border-white bg-white/85 space-y-3 shadow-sm hover:-translate-y-1.5 transition-all">
                <Users className="w-6 h-6 text-[#B89563]" />
                <h3 className="font-sans text-xl font-semibold text-[#171717]">One Integrated Team</h3>
                <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                  Designers, civil engineers, and master carpenters working under single studio leadership.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <div className="glass-panel p-7 rounded-[28px] border border-white bg-white/85 space-y-3 shadow-sm hover:-translate-y-1.5 transition-all">
                <Layers className="w-6 h-6 text-[#B89563]" />
                <h3 className="font-sans text-xl font-semibold text-[#171717]">Material Intelligence</h3>
                <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                  Thoughtful selection of stone, wood, and metal engineered for Gujarat thermal climates.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={240}>
              <div className="glass-panel p-7 rounded-[28px] border border-white bg-white/85 space-y-3 shadow-sm hover:-translate-y-1.5 transition-all">
                <ShieldCheck className="w-6 h-6 text-[#B89563]" />
                <h3 className="font-sans text-xl font-semibold text-[#171717]">Turnkey Accountability</h3>
                <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                  From initial floorplan drawing to deep clean keys handover, we take full responsibility.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 11. FULL-WIDTH ARCHITECTURAL MANIFESTO SECTION */}
      <section className="py-28 bg-[#EFEBE4] text-[#171717] relative overflow-hidden flex items-center justify-center text-center border-t border-stone-300/70">
        <ScrollReveal>
          <div className="relative z-10 max-w-4xl px-6 space-y-4">
            <span className="tracking-label text-[11px] text-[#B89563] block font-semibold">
              S KUMAR ARCHITECTURAL MANIFESTO
            </span>
            <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.14] text-[#171717]">
              GOOD DESIGN <br />
              CHANGES HOW <br />
              <span className="text-[#B89563] font-light">A SPACE FEELS.</span>
            </h2>
          </div>
        </ScrollReveal>
      </section>

      {/* 12. TRUST NUMERICAL STATS */}
      <section className="py-16 bg-[#F5F1E8] border-y border-stone-300/70 text-[#171717]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-1">
                <span className="font-sans text-4xl md:text-6xl font-semibold text-[#171717]">02+</span>
                <span className="tracking-label text-[10px] text-[#333330] block font-semibold">Primary Cities</span>
              </div>
              <div className="space-y-1">
                <span className="font-sans text-4xl md:text-6xl font-semibold text-[#171717]">150+</span>
                <span className="tracking-label text-[10px] text-[#333330] block font-semibold">Projects Delivered</span>
              </div>
              <div className="space-y-1">
                <span className="font-sans text-4xl md:text-6xl font-semibold text-[#171717]">100+</span>
                <span className="tracking-label text-[10px] text-[#333330] block font-semibold">Homes Transformed</span>
              </div>
              <div className="space-y-1">
                <span className="font-sans text-4xl md:text-6xl font-semibold text-[#171717]">12+</span>
                <span className="tracking-label text-[10px] text-[#333330] block font-semibold">Years Experience</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 13. LOCATION & INTERACTIVE OFFICE PANEL */}
      <section className="py-24 bg-[#F5F1E8] text-[#171717]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="tracking-label text-[11px] text-[#B89563] block mb-2 font-semibold">
                  VISIT OUR STUDIO
                </span>
                <h2 className="font-sans text-3xl sm:text-5xl font-semibold text-[#171717]">
                  Let's Create Your Space.
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('contact')}
                className="tracking-label text-xs font-semibold text-[#B89563] hover:text-[#171717] transition-colors flex items-center gap-2 group"
              >
                <span>Full Contact & Form</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Address & Actions (Light Frosted Glass Card) */}
              <div className="lg:col-span-6 glass-deep p-7 md:p-10 border border-white shadow-xl flex flex-col justify-between rounded-[36px] bg-white/90 text-[#171717]">
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                    <div>
                      <h3 className="font-sans text-xl sm:text-2xl font-semibold text-[#171717]">S Kumar Construction & Interior</h3>
                      <p className="text-xs text-[#B89563] font-mono mt-0.5 font-semibold">Ahmedabad • Gandhinagar • Gujarat</p>
                    </div>
                    <MapPin className="w-5 h-5 text-[#B89563]" />
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-[#333330]">
                    <div>
                      <strong className="text-[#171717] block mb-1 tracking-label text-[10px] font-semibold">Office Address:</strong>
                      <p className="text-sm text-[#171717] font-medium">414, Antilia Business Hub, S.P. Ring Road, Nana Chiloda Circle, Ahmedabad, Gujarat 382330</p>
                    </div>

                    <div>
                      <strong className="text-[#171717] block mb-1 tracking-label text-[10px] font-semibold">Direct Phone:</strong>
                      <a href="tel:+919898966648" className="text-sm font-semibold text-[#B89563] hover:underline">+91 98989 66648</a>
                    </div>

                    <div>
                      <strong className="text-[#171717] block mb-1 tracking-label text-[10px] font-semibold">Business Hours:</strong>
                      <p>Monday – Saturday: 10:00 AM – 7:30 PM (Sun by Appointment)</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5 border-t border-stone-200">
                  <a
                    href="tel:+919898966648"
                    className="bg-[#B89563] text-white hover:bg-[#171717] transition-colors py-3 text-center tracking-label text-[10px] font-semibold rounded-full shadow-sm"
                  >
                    Call Us
                  </a>
                  <a
                    href="https://wa.me/919898966648"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors py-3 text-center tracking-label text-[10px] font-semibold rounded-full"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Antilia+Business+Hub,+Nana+Chiloda+Circle,+Ahmedabad,+Gujarat+382330"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-stone-300 text-[#171717] hover:bg-[#171717] hover:text-white transition-colors py-3 text-center tracking-label text-[10px] font-semibold rounded-full flex items-center justify-center gap-1"
                  >
                    <span>Directions</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Right Map Visual */}
              <div className="lg:col-span-6 h-[380px] lg:h-auto min-h-[360px] border border-white rounded-[36px] overflow-hidden relative shadow-xl bg-white">
                <iframe
                  title="S Kumar Office Location Map"
                  src="https://maps.google.com/maps?q=Antilia+Business+Hub,+Nana+Chiloda+Circle,+Ahmedabad,+Gujarat+382330&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.2) contrast(1.05)' }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;

