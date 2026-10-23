import React, { useState } from 'react';
import { MATERIALS } from '../data/materials';
import { Sparkles, Info } from 'lucide-react';

export const MaterialCollage: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<string>(MATERIALS[0].id);
  const activeMat = MATERIALS.find((m) => m.id === selectedMaterial) || MATERIALS[0];

  return (
    <section className="pt-28 md:pt-36 pb-24 bg-[#F5F1E8] text-[#171717] border-t border-stone-300/70 relative overflow-hidden scroll-mt-36 md:scroll-mt-44" id="material-philosophy">
      {/* Ambient Lighting Glow */}
      <div className="ambient-glow-warm top-1/4 left-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <span className="tracking-label text-[10px] text-[#B89563] block mb-2 font-semibold">
              DESIGN PHILOSOPHY
            </span>
            <h2 className="font-sans text-3xl sm:text-5xl font-medium text-[#171717] leading-tight tracking-tight">
              Material. Light. Proportion.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#333330] max-w-md leading-relaxed font-light">
            We believe that true luxury lies in tactile honesty. Every stone slab, wood grain, and light temperature is curated to age gracefully in Gujarat.
          </p>
        </div>

        {/* Editorial Collage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Grid of Materials */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            {MATERIALS.map((mat) => {
              const isSelected = mat.id === selectedMaterial;
              return (
                <button
                  key={mat.id}
                  onClick={() => setSelectedMaterial(mat.id)}
                  className={`group relative h-64 rounded-2xl overflow-hidden text-left border transition-all duration-500 ${
                    isSelected ? 'ring-2 ring-[#B89563] border-transparent shadow-xl scale-[1.02]' : 'border-white/80 hover:border-[#B89563]/40 shadow-sm'
                  }`}
                >
                  <img
                    src={mat.image}
                    alt={mat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 transition-opacity duration-300 ${
                    isSelected ? 'bg-stone-900/40' : 'bg-stone-900/50 group-hover:bg-stone-900/30'
                  }`} />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="tracking-label text-[9px] text-[#B89563] font-mono block font-semibold">
                      {mat.category}
                    </span>
                    <h3 className="font-sans text-base sm:text-lg font-medium leading-snug">
                      {mat.name}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Material Detail Card (TRANSLUCENT WHITE GLASS) */}
          <div className="lg:col-span-4 glass-panel p-7 sm:p-8 rounded-[32px] flex flex-col justify-between border border-white shadow-xl bg-white/85 text-[#171717]">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <span className="tracking-label text-[10px] text-[#B89563] font-mono font-semibold">
                  {activeMat.category}
                </span>
                <Sparkles className="w-4 h-4 text-[#B89563]" />
              </div>

              <div>
                <h3 className="font-sans text-2xl sm:text-3xl text-[#171717] font-medium mb-2 tracking-tight">
                  {activeMat.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                  {activeMat.description}
                </p>
              </div>

              <div className="p-4 glass-capsule bg-white border border-stone-200/60 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-[10px] tracking-label text-[#B89563] font-semibold">
                  <Info className="w-3.5 h-3.5" />
                  <span>Specification & Texture</span>
                </div>
                <p className="text-xs font-sans text-[#333330] font-medium">
                  {activeMat.textureDetails}
                </p>
              </div>
            </div>

            <div className="pt-5 border-t border-stone-200 text-xs text-[#333330] font-sans font-light">
              Hand-selected for 2 BHK, 3 BHK & Villa projects in Ahmedabad & Gandhinagar.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaterialCollage;


