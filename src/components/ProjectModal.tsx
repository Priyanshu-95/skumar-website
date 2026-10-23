import React, { useState, useEffect, useCallback } from 'react';
import type { Project } from '../types';
import { X, MapPin, Calendar, Maximize2, CheckCircle2, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenEstimator: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenEstimator }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleNextLightbox = useCallback(() => {
    if (!project || lightboxIndex === null) return;
    setLightboxIndex((prev) => ((prev ?? 0) + 1) % project.gallery.length);
  }, [project, lightboxIndex]);

  const handlePrevLightbox = useCallback(() => {
    if (!project || lightboxIndex === null) return;
    setLightboxIndex((prev) => ((prev ?? 0) - 1 + project.gallery.length) % project.gallery.length);
  }, [project, lightboxIndex]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === 'ArrowRight') handleNextLightbox();
        if (e.key === 'ArrowLeft') handlePrevLightbox();
        if (e.key === 'Escape') setLightboxIndex(null);
      } else if (project && e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, project, handleNextLightbox, handlePrevLightbox, onClose]);

  if (!project) return null;

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-stone-900/40 backdrop-blur-md flex justify-end animate-fade-in overflow-y-auto">
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Main Drawer Container */}
        <div className="relative w-full max-w-4xl bg-[#F8F5EF] text-[#171717] min-h-full shadow-2xl z-10 overflow-y-auto">
          {/* Sticky Close Header */}
          <div className="sticky top-0 z-20 bg-[#F8F5EF]/95 backdrop-blur-md px-6 py-4 border-b border-stone-300/70 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="tracking-label text-[10px] text-[#B89563] font-semibold">
                {project.category}
              </span>
              {project.typeLabel && (
                <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 bg-[#B89563]/15 text-[#B89563] font-semibold rounded-full border border-[#B89563]/30">
                  {project.typeLabel}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close Project Modal"
              className="p-2 rounded-full border border-stone-300 bg-white hover:bg-[#171717] hover:text-white transition-colors focus:outline-none shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Hero Cover Image */}
          <div
            onClick={() => setLightboxIndex(0)}
            onContextMenu={(e) => e.preventDefault()}
            className="relative h-[340px] md:h-[480px] w-full overflow-hidden bg-[#F5F1E8] cursor-pointer group"
          >
            <img
              src={project.heroImage}
              alt={project.title}
              onDragStart={(e) => e.preventDefault()}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/75 via-stone-900/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
              <div className="flex items-center gap-3">
                <span className="tracking-label text-[10px] text-[#B89563] block font-semibold">
                  {project.location} • {project.year}
                </span>
                {project.typeLabel && (
                  <span className="text-[9px] uppercase font-mono px-2.5 py-0.5 bg-[#B89563] text-white font-semibold rounded-full">
                    {project.typeLabel}
                  </span>
                )}
              </div>
              <h2 className="font-sans text-3xl md:text-5xl font-medium leading-tight text-white tracking-tight">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-8 md:p-12 space-y-12">
            {/* Specs Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 glass-panel rounded-2xl border border-white bg-white/80">
              <div>
                <span className="tracking-label text-[10px] text-[#333330] block font-semibold">
                  Location
                </span>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#171717] mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B89563]" />
                  <span>{project.location}</span>
                </div>
              </div>
              <div>
                <span className="tracking-label text-[10px] text-[#333330] block font-semibold">
                  Completion Year
                </span>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#171717] mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-[#B89563]" />
                  <span>{project.year}</span>
                </div>
              </div>
              <div>
                <span className="tracking-label text-[10px] text-[#333330] block font-semibold">
                  Carpet Area
                </span>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#171717] mt-0.5">
                  <Maximize2 className="w-3.5 h-3.5 text-[#B89563]" />
                  <span>{project.areaSqFt}</span>
                </div>
              </div>
              <div>
                <span className="tracking-label text-[10px] text-[#333330] block font-semibold">
                  Classification
                </span>
                <span className="text-xs font-semibold text-[#171717] mt-0.5 block truncate">
                  {project.typeLabel || 'Completed Project'}
                </span>
              </div>
            </div>

            {/* Client Brief & Design Approach */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h3 className="font-sans text-2xl font-medium text-[#171717]">
                  The Client Brief
                </h3>
                <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                  {project.clientBrief}
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-sans text-2xl font-medium text-[#171717]">
                  Architectural Approach
                </h3>
                <p className="text-xs sm:text-sm text-[#333330] leading-relaxed font-light">
                  {project.designApproach}
                </p>
              </div>
            </div>

            {/* Scope Checklist */}
            <div className="space-y-4 pt-4 border-t border-stone-300">
              <h3 className="font-sans text-2xl font-medium text-[#171717]">
                Execution Scope
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.scope.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#171717] bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#B89563] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Before / After Comparison if available */}
            {project.beforeImage && project.afterImage && (
              <div className="pt-4 border-t border-stone-300">
                <BeforeAfterSlider
                  beforeImage={project.beforeImage}
                  afterImage={project.afterImage}
                  title="Site Transformation"
                  subtitle="Compare raw civil site state with completed turnkey interior"
                />
              </div>
            )}

            {/* Photo Gallery Grid */}
            <div className="space-y-4 pt-4 border-t border-stone-300">
              <div className="flex items-center justify-between">
                <h3 className="font-sans text-2xl font-medium text-[#171717]">
                  Project Photography Gallery
                </h3>
                <span className="text-xs text-[#333330] font-mono">
                  {project.gallery.length} Images • Click to Expand
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.gallery.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    onContextMenu={(e) => e.preventDefault()}
                    className="h-64 rounded-2xl overflow-hidden border border-white shadow-md group relative cursor-pointer bg-stone-100"
                  >
                    <img
                      src={img}
                      alt={`${project.title} photograph ${idx + 1}`}
                      onDragStart={(e) => e.preventDefault()}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-[#171717] text-[10px] tracking-label font-semibold px-4 py-2 rounded-full border border-white shadow-lg">
                        View Full Image
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Material Palette Swatches */}
            {project.materialPalette && project.materialPalette.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-stone-300">
                <h3 className="font-sans text-2xl font-medium text-[#171717]">
                  Material & Texture Palette
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.materialPalette.map((mat, idx) => (
                    <div key={idx} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                      <img src={mat.image} alt={mat.name} className="h-32 w-full object-cover" />
                      <div className="p-4 space-y-1">
                        <span className="font-sans text-base font-semibold block text-[#171717]">{mat.name}</span>
                        <p className="text-xs text-[#333330] font-light">{mat.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer CTA */}
            <div className="glass-panel p-8 text-center space-y-4 border border-white shadow-xl bg-white rounded-[32px]">
              <h3 className="font-sans text-2xl md:text-3xl font-medium text-[#171717]">
                Have a space in mind? Let's discuss your project.
              </h3>
              <p className="text-xs sm:text-sm text-[#333330] max-w-md mx-auto font-light">
                Our architects provide complete spatial consultation, 3D renderings, and turnkey cost estimations in Ahmedabad & Gandhinagar.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenEstimator();
                }}
                className="bg-[#B89563] text-white px-8 py-4 text-xs tracking-label font-semibold rounded-full inline-flex items-center gap-2 hover:bg-[#171717] transition-all shadow-md"
              >
                <span>REQUEST CONSULTATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX OVERLAY */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[150] bg-black/95 text-white flex flex-col justify-between p-4 md:p-8 animate-fade-in"
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between z-10">
            <div className="space-y-0.5">
              <span className="font-sans text-lg text-white font-medium block">{project.title}</span>
              <span className="text-[10px] font-mono text-[#B89563] uppercase tracking-widest font-semibold">
                Image {lightboxIndex + 1} of {project.gallery.length} • {project.location}
              </span>
            </div>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Image Container */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={project.gallery[lightboxIndex]}
              alt={`${project.title} full view`}
              onDragStart={(e) => e.preventDefault()}
              className="max-h-full max-w-full object-contain select-none shadow-2xl animate-fade-in"
            />

            {/* Nav Arrows */}
            <button
              onClick={handlePrevLightbox}
              className="absolute left-4 p-3 bg-black/60 border border-white/20 text-white rounded-full hover:bg-[#B89563] transition-colors shadow-2xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextLightbox}
              className="absolute right-4 p-3 bg-black/60 border border-white/20 text-white rounded-full hover:bg-[#B89563] transition-colors shadow-2xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bar info */}
          <div className="text-center text-xs text-[#A09D96] font-mono tracking-widest uppercase">
            S Kumar Construction & Interior • {project.typeLabel || 'Completed Project'}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectModal;

