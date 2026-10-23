import React, { useState } from 'react';
import { ArrowRight, Compass, Hammer, Sparkles, CheckCircle2 } from 'lucide-react';

export const DesignBuildLive: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      id: 'design',
      title: 'DESIGN',
      tagline: '3D Spatial Planning & Material Curation',
      icon: Compass,
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop',
      description: 'Every project begins with understanding how you live. We craft precise 3D walkthroughs, lighting layouts, and custom furniture blueprints tailored specifically to Gujarat climates and sunlight orientations.',
      highlights: ['Detailed 3D Renders', 'Material Palette Board', 'Structural Feasibility Check']
    },
    {
      id: 'build',
      title: 'BUILD',
      tagline: 'In-House Civil Execution & Precision Joinery',
      icon: Hammer,
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop',
      description: 'We do not rely on unverified subcontractors. Our dedicated civil engineers, master carpenters, and electrical technicians execute every line of drawing with uncompromising precision.',
      highlights: ['Civil Masonry & Plumbing', 'Custom Modular Joinery', 'Pop & False Ceiling Installation']
    },
    {
      id: 'live',
      title: 'LIVE',
      tagline: 'Turnkey Handover & Complete Transformation',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
      description: 'Step into a fully realized space where ambient 2700K lighting, Italian travertine stone, and Burmese teak harmonize into a home that feels effortlessly yours.',
      highlights: ['Deep Handover Cleaning', 'Smart Lighting Setup', '100% Quality Assurance Check']
    }
  ];

  return (
    <section className="py-24 bg-[#F5F1E8] text-[#171717] relative overflow-hidden">
      {/* Ambient Lighting Glow */}
      <div className="ambient-glow-warm -top-40 -left-20" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-300/70">
          <div className="space-y-2">
            <span className="tracking-label text-[10px] text-[#B89563] block font-semibold">
              OUR INTEGRATED WORKFLOW
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-medium tracking-tight text-[#171717]">
              Design → Build → Live
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#333330] max-w-md leading-relaxed font-light">
            A seamless transition from first conceptual sketch to completed architectural space in Ahmedabad & Gandhinagar.
          </p>
        </div>

        {/* 3 Floating Light Glass Stage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stages.map((stage, idx) => {
            const IconComponent = stage.icon;
            const isActive = activeStage === idx;
            return (
              <div
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                className={`p-8 rounded-[32px] transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[220px] ${
                  isActive
                    ? 'glass-deep border-[#B89563]/50 shadow-xl scale-[1.02] bg-white'
                    : 'glass-panel border-white/80 hover:border-[#B89563]/30 bg-white/70'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl glass-capsule flex items-center justify-center text-[#B89563] bg-[#B89563]/12 border border-[#B89563]/30">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  {isActive && (
                    <span className="tracking-label text-[9px] text-[#B89563] bg-[#B89563]/12 px-3 py-1 rounded-full border border-[#B89563]/30 font-semibold">
                      Active Stage
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="font-sans text-2xl font-medium tracking-tight text-[#171717]">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-[#B89563] font-semibold leading-normal font-mono">
                    {stage.tagline}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Stage Detailed Light Frosted Glass Display */}
        <div className="glass-panel p-6 sm:p-10 rounded-[36px] border border-white shadow-xl bg-white/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Detail */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="tracking-label text-[10px] text-[#B89563] block font-semibold">
                  PHASE SPECIFICATION
                </span>
                <h3 className="font-sans text-2xl sm:text-3xl font-medium text-[#171717] tracking-tight">
                  {stages[activeStage].title}: {stages[activeStage].tagline}
                </h3>
              </div>
              
              <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                {stages[activeStage].description}
              </p>

              <div className="space-y-2 border-t border-stone-200 pt-4">
                <span className="tracking-label text-[10px] text-[#B89563] block font-semibold">
                  Key Deliverables:
                </span>
                <ul className="space-y-1.5 text-xs text-[#171717] font-medium">
                  {stages[activeStage].highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#B89563] shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setActiveStage((prev) => (prev + 1) % stages.length)}
                className="inline-flex items-center gap-2 tracking-label text-[10px] text-[#171717] hover:text-[#B89563] transition-colors pt-2 font-semibold"
              >
                <span>Explore Next Phase</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Curved Image */}
            <div className="lg:col-span-7 h-[360px] md:h-[420px] rounded-[32px] overflow-hidden relative border border-white shadow-2xl">
              <img
                key={stages[activeStage].id}
                src={stages[activeStage].image}
                alt={stages[activeStage].title}
                className="w-full h-full object-cover animate-fade-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 text-stone-800 text-xs font-mono tracking-widest uppercase glass-capsule px-4 py-1.5 border border-white/60 bg-white/80 font-semibold">
                S KUMAR ARCHITECTURE • {stages[activeStage].title}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DesignBuildLive;

