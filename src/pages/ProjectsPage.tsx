import React, { useState, useEffect, useCallback } from 'react';
import initialGallery from '../data/gallery.json';
import { Sparkles, Images, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GalleryManagerModal } from '../components/GalleryManagerModal';

interface ProjectsPageProps {
  onSelectProject?: (project: any) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = () => {
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [images, setImages] = useState<string[]>(initialGallery);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Dynamically refresh gallery from server
  const refreshGallery = useCallback(async () => {
    try {
      const res = await fetch('/api/gallery', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.images) && data.images.length > 0) {
          setImages(data.images);
        }
      }
    } catch (err) {
      console.warn('Could not refresh gallery dynamically:', err);
    }
  }, []);

  // Keyboard navigation for lightbox
  const handleNextLightbox = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => ((prev ?? 0) + 1) % images.length);
  }, [lightboxIndex, images.length]);

  const handlePrevLightbox = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => ((prev ?? 0) - 1 + images.length) % images.length);
  }, [lightboxIndex, images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === 'ArrowRight') handleNextLightbox();
        if (e.key === 'ArrowLeft') handlePrevLightbox();
        if (e.key === 'Escape') setLightboxIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleNextLightbox, handlePrevLightbox]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  return (
    <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-24 bg-[#F5F1E8] text-[#171717] space-y-12 relative overflow-hidden">
      {/* Ambient Lighting Glow Blooms */}
      <div className="ambient-glow-warm top-20 right-10" />
      <div className="ambient-glow-warm top-1/2 -left-32" />

      {/* 1. HEADER SECTION (NO SOCIETY NAMES, CLEAN & EDITORIAL) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-5">
        <div className="flex items-center justify-between">
          <div className="glass-capsule inline-flex items-center gap-3 px-4 py-2 border border-white bg-white/90 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#967546]" />
            <span className="tracking-label text-[10px] text-[#967546] font-bold">
              PORTFOLIO SHOWCASE GALLERY
            </span>
          </div>

          {/* Subtle unobtrusive Add Images control */}
          <button
            onClick={() => setIsManagerOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] tracking-label font-medium text-stone-500 hover:text-[#967546] hover:bg-white/80 rounded-full transition-all focus:outline-none border border-transparent hover:border-stone-200"
            title="Manage gallery"
            aria-label="Add Images"
          >
            <Images className="w-3.5 h-3.5" />
            <span>Add Images</span>
          </button>
        </div>

        <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-medium leading-[1.14] tracking-tight text-[#171717] max-w-4xl">
          Selected Works & <br />
          <span className="text-[#B89563] font-light">Crafted Spaces.</span>
        </h1>

        <p className="text-sm sm:text-base text-[#333330] max-w-2xl leading-relaxed font-light">
          A visual collection of bespoke residential bungalows, luxury villa interiors, commercial spaces, and turnkey craftsmanship executed by S Kumar.
        </p>

        <div className="flex items-center gap-3 pt-2 text-xs text-stone-500 font-mono">
          <span className="px-3 py-1 bg-white/80 rounded-full border border-stone-200 shadow-sm">
            {images.length} Curated Photographs
          </span>
          <span>• Click any photo to expand full view</span>
        </div>
      </section>

      {/* 2. DYNAMIC ASYMMETRICAL EDITORIAL MASONRY SHOWCASE (NOT UNIFORM SQUARES) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {images.map((src, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="break-inside-avoid group relative overflow-hidden rounded-[26px] bg-white border border-white/90 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1.5"
            >
              <img
                src={src}
                alt={`S Kumar Architectural Showcase ${idx + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />

              {/* Refined Frosted Glass Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider text-white/90 uppercase">
                    Photo #{idx + 1}
                  </span>
                  <div className="glass-capsule px-3 py-1 text-[10px] tracking-label text-white bg-black/40 border border-white/30 backdrop-blur-md flex items-center gap-1.5">
                    <Maximize2 className="w-3 h-3 text-[#B89563]" />
                    <span>Expand</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FULLSCREEN CINEMATIC LIGHTBOX VIEWER */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[150] bg-black/95 text-white flex flex-col justify-between p-4 sm:p-8 animate-fade-in"
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between z-10 max-w-7xl w-full mx-auto">
            <div className="space-y-0.5">
              <span className="font-sans text-base sm:text-lg text-white font-medium block">
                S Kumar Portfolio Showcase
              </span>
              <span className="text-[10px] font-mono text-[#B89563] uppercase tracking-widest font-semibold">
                Photo {lightboxIndex + 1} of {images.length}
              </span>
            </div>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Image */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden max-w-7xl w-full mx-auto">
            <img
              src={images[lightboxIndex]}
              alt={`Photo ${lightboxIndex + 1}`}
              onDragStart={(e) => e.preventDefault()}
              className="max-h-[82vh] max-w-full object-contain select-none rounded-2xl shadow-2xl animate-fade-in"
            />

            {/* Nav Arrows */}
            <button
              onClick={handlePrevLightbox}
              className="absolute left-2 sm:left-4 p-3 bg-black/60 border border-white/20 text-white rounded-full hover:bg-[#B89563] transition-colors shadow-2xl"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextLightbox}
              className="absolute right-2 sm:right-4 p-3 bg-black/60 border border-white/20 text-white rounded-full hover:bg-[#B89563] transition-colors shadow-2xl"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bar info */}
          <div className="text-center text-xs text-[#A09D96] font-mono tracking-widest uppercase">
            S Kumar Construction & Interior • Architectural Showcase
          </div>
        </div>
      )}

      {/* Hidden Secure Gallery Manager Modal */}
      <GalleryManagerModal
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        onGalleryUpdated={refreshGallery}
      />
    </div>
  );
};

export default ProjectsPage;
