import React, { useState } from 'react';
import { BRAND_CATEGORIES } from '../data/brands';
import type { BrandItem } from '../data/brands';
import { BrandLogo } from './BrandLogo';
import { ArrowRight, ExternalLink, Sparkles, X, CheckCircle, Info } from 'lucide-react';

interface BrandShowcaseProps {
  onOpenEstimator?: () => void;
}

export const BrandShowcase: React.FC<BrandShowcaseProps> = ({ onOpenEstimator }) => {
  const [selectedBrand, setSelectedBrand] = useState<BrandItem | null>(null);

  // Group brands into 3 clean horizontal marquee streams
  const allBrands = BRAND_CATEGORIES.flatMap((cat) => cat.brands);
  const stream1 = allBrands.slice(0, 10);
  const stream2 = allBrands.slice(10, 20);
  const stream3 = allBrands.slice(20);

  const renderMarqueeStream = (brands: BrandItem[], direction: 'left' | 'right') => {
    // Duplicate 3x for seamless loop
    const duplicated = [...brands, ...brands, ...brands];

    return (
      <div className="overflow-hidden relative py-3 my-2">
        {/* Soft Gradient Edge Fade Masking */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F5F1E8] via-[#F5F1E8]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F5F1E8] via-[#F5F1E8]/80 to-transparent z-10" />

        <div className={direction === 'left' ? 'marquee-track-left' : 'marquee-track-right'}>
          {duplicated.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              onClick={() => setSelectedBrand(brand)}
              className="mr-6 cursor-pointer group transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Light Frosted Glass Logo Capsule */}
              <div className="glass-capsule px-6 py-4 rounded-2xl transition-all duration-300 group-hover:border-[#B89563]/60 group-hover:shadow-lg bg-white/80">
                <BrandLogo brand={brand} className="bg-transparent border-none shadow-none min-w-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 bg-[#F5F1E8] text-[#171717] relative overflow-hidden scroll-mt-36 md:scroll-mt-44" id="material-library">
      {/* Ambient Lighting Glow */}
      <div className="ambient-glow-warm top-1/3 -right-32" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
        
        {/* 1. BRAND-FIRST HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-300/70">
          <div className="space-y-2">
            <span className="tracking-label text-[10px] text-[#B89563] block font-semibold">
              MATERIAL SPECIFICATIONS
            </span>
            <h2 className="font-sans text-3xl sm:text-5xl font-medium tracking-tight text-[#171717]">
              MATERIALS & PARTNERS
            </h2>
            <p className="text-xs sm:text-sm text-[#333330] font-light max-w-xl">
              Selected manufacturers, material specialists, and architectural hardware leaders behind our bespoke interiors.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono font-semibold text-[#B89563] bg-[#B89563]/12 px-4 py-2 rounded-full border border-[#B89563]/30">
              28 Curated Manufacturers
            </span>
          </div>
        </div>

        {/* 2. LARGE CURVED LIGHT FROSTED GLASS TRACK ENVIRONMENT */}
        <div className="glass-panel p-6 sm:p-10 rounded-[36px] space-y-4 border border-white shadow-xl bg-white/60">
          {renderMarqueeStream(stream1, 'left')}
          {renderMarqueeStream(stream2, 'right')}
          {renderMarqueeStream(stream3, 'left')}
        </div>

        {/* 3. BOTTOM ARCHITECTURAL CTA */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#333330]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B89563]" />
            <span className="font-medium">100% Genuine Manufacturer Warranties & Structural Specification Guaranteed</span>
          </div>

          {onOpenEstimator && (
            <button
              onClick={onOpenEstimator}
              className="group inline-flex items-center gap-2 tracking-label text-[10px] text-[#171717] hover:text-[#B89563] transition-colors font-semibold"
            >
              <span>Request Material Palette Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

      </div>

      {/* BRAND DETAIL SPECIFICATION MODAL (LIGHT FROSTED GLASS) */}
      {selectedBrand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md animate-fade-in">
          <div className="glass-deep rounded-[32px] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-6 border border-white text-[#171717] bg-[#F8F5EF]/95">
            <button
              onClick={() => setSelectedBrand(null)}
              className="absolute top-6 right-6 p-2 text-stone-700 hover:text-[#171717] rounded-full bg-white/80 border border-stone-200 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="tracking-label text-[10px] text-[#B89563] bg-[#B89563]/15 px-3 py-1 rounded-full border border-[#B89563]/30 font-semibold">
                {selectedBrand.category}
              </span>
              <h3 className="font-sans text-2xl sm:text-3xl font-medium text-[#171717] tracking-tight">
                {selectedBrand.name}
              </h3>
              <p className="text-xs font-mono text-[#B89563] font-semibold">
                {selectedBrand.tagline}
              </p>
            </div>

            {/* Logo Big Preview */}
            <div className="p-6 glass-capsule rounded-2xl flex items-center justify-center bg-white border border-stone-200/60 shadow-inner">
              <BrandLogo brand={selectedBrand} isHovered={true} className="w-full justify-center py-6 border-none bg-transparent shadow-none" />
            </div>

            <div className="space-y-3">
              <h4 className="tracking-label text-xs text-[#171717] flex items-center gap-2 font-bold">
                <CheckCircle className="w-4 h-4 text-[#B89563]" />
                Architectural Application & Material Standard
              </h4>
              <p className="text-xs text-[#333330] leading-relaxed font-light">
                {selectedBrand.description}
              </p>
            </div>

            {/* Client Confirmation Note if flagged */}
            {selectedBrand.needsConfirmation && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-1 text-amber-900">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-800">
                  <Info className="w-4 h-4 text-amber-600" />
                  Client Specification Note
                </div>
                <p className="text-[11px] leading-relaxed opacity-90">
                  {selectedBrand.confirmationNote}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-4">
              {selectedBrand.website ? (
                <a
                  href={selectedBrand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 tracking-label text-[10px] text-[#171717] hover:text-[#B89563] transition-colors font-bold"
                >
                  <span>Official Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-xs font-mono text-stone-700 font-semibold">Regional Partner Distributor</span>
              )}

              {onOpenEstimator && (
                <button
                  onClick={() => {
                    setSelectedBrand(null);
                    onOpenEstimator();
                  }}
                  className="px-5 py-2.5 bg-[#B89563] text-white hover:bg-[#171717] transition-colors tracking-label text-[10px] font-bold rounded-full shadow-md"
                >
                  Request Sample Palette
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BrandShowcase;
