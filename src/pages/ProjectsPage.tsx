import React, { useState } from 'react';
import { PROJECTS } from '../data/projects';
import type { Project, CategoryFilter } from '../types';
import { Search, ArrowUpRight, Filter, Sparkles, Images } from 'lucide-react';
import { GalleryManagerModal } from '../components/GalleryManagerModal';

interface ProjectsPageProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [projectsList, setProjectsList] = useState<Project[]>(PROJECTS);

  const refreshGallery = async () => {
    try {
      const res = await fetch('/api/gallery', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        if (data.projects) {
          setProjectsList((prev) =>
            prev.map((p) => {
              const updated = data.projects.find((u: any) => u.id === p.id);
              return updated ? { ...p, gallery: updated.gallery } : p;
            })
          );
        }
      }
    } catch (err) {
      console.warn('Could not refresh gallery dynamically:', err);
    }
  };

  const filters: CategoryFilter[] = [
    'All',
    'Wooden Work',
    'Residential',
    'Bungalow / Villa',
    'Interior Design',
    'Commercial',
    'Construction',
    'PVC Work',
    '3D Visualization'
  ];

  const filteredProjects = projectsList.filter((p) => {
    const matchesFilter =
      activeFilter === 'All' ||
      p.filterCategory === activeFilter ||
      (activeFilter === 'Wooden Work' && (p.filterCategory === 'Wooden Work' || p.category.toLowerCase().includes('wood') || p.category.toLowerCase().includes('teak') || p.scope.some(s => s.toLowerCase().includes('teak') || s.toLowerCase().includes('wood')))) ||
      (activeFilter === 'Construction' && (p.filterCategory === 'Construction' || p.category.toLowerCase().includes('architecture') || p.scope.some(s => s.toLowerCase().includes('civil')))) ||
      (activeFilter === 'Interior Design' && (p.filterCategory === 'Interior Design' || p.category.toLowerCase().includes('interior')));
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-20 bg-[#F5F1E8] text-[#171717] space-y-16 relative overflow-hidden">
      {/* Ambient Lighting Glow Blooms */}
      <div className="ambient-glow-warm top-20 right-10" />
      <div className="ambient-glow-warm top-1/2 -left-32" />

      {/* 1. HEADER & SEARCH / FILTERS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-6">
        <div className="flex items-center justify-between">
          <div className="glass-capsule inline-flex items-center gap-3 px-4 py-2 border border-white bg-white/90 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#967546]" />
            <span className="tracking-label text-[10px] text-[#967546] font-bold">
              ARCHITECTURAL PORTFOLIO ARCHIVE
            </span>
          </div>

          {/* Subtle unobtrusive Add Images control */}
          <button
            onClick={() => setIsManagerOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] tracking-label font-medium text-stone-400 hover:text-[#967546] hover:bg-white/80 rounded-full transition-all focus:outline-none border border-transparent hover:border-stone-200"
            title="Manage project gallery"
            aria-label="Add Images"
          >
            <Images className="w-3.5 h-3.5" />
            <span>Add Images</span>
          </button>
        </div>

        <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-medium leading-[1.14] tracking-tight text-[#171717] max-w-4xl">
          Selected Projects & <br />
          <span className="text-[#B89563] font-light">Architectural Spaces.</span>
        </h1>

        <p className="text-sm sm:text-base text-[#333330] max-w-2xl leading-relaxed font-light">
          Explore completed residential apartments, luxury villas, commercial offices, custom joinery, and specialized interior fit-outs executed by S Kumar across Gujarat and India.
        </p>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 border-b border-stone-300/70 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`tracking-label text-[10px] font-bold px-4 py-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                  activeFilter === filter
                    ? 'bg-[#B89563] text-white shadow-md scale-105'
                    : 'bg-white border border-stone-300 text-[#171717] hover:bg-[#171717] hover:text-white shadow-sm'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#B89563] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by area or project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-capsule border border-stone-300 bg-white/90 pl-10 pr-4 py-2.5 text-xs text-[#171717] placeholder-stone-400 focus:outline-none focus:border-[#B89563] shadow-inner"
            />
          </div>
        </div>
      </section>

      {/* 2. LIGHT FROSTED GLASS MASONRY GRID */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {filteredProjects.length === 0 ? (
          <div className="glass-panel py-20 text-center space-y-4 rounded-[36px] border border-white bg-white/80">
            <Filter className="w-8 h-8 text-[#B89563] mx-auto" />
            <h3 className="font-sans text-2xl font-bold text-[#171717]">No projects match your search filter</h3>
            <p className="text-xs text-[#333330]">Try resetting search keywords or selecting another category.</p>
            <button
              onClick={() => {
                setActiveFilter('All');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-[#B89563] text-white text-xs tracking-label font-bold rounded-full shadow-md"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`group relative overflow-hidden rounded-[32px] bg-white border border-white cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                  idx % 4 === 0 ? 'lg:col-span-2 h-[440px]' : 'h-[390px]'
                }`}
              >
                <img
                  src={project.heroImage}
                  alt={`${project.title} - ${project.category} in ${project.location}`}
                  loading="lazy"
                  decoding="async"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex gap-2 items-center z-10">
                  <div className="glass-capsule px-3.5 py-1 text-[10px] tracking-label text-[#B89563] border border-white/80 bg-white/90">
                    {project.filterCategory}
                  </div>
                  {project.typeLabel && (
                    <div className={`px-3 py-1 text-[10px] tracking-label rounded-full border backdrop-blur-md ${
                      project.typeLabel === '3D Visualization'
                        ? 'bg-amber-100/90 text-amber-900 border-amber-300'
                        : 'bg-emerald-100/90 text-emerald-900 border-emerald-300'
                    }`}>
                      {project.typeLabel}
                    </div>
                  )}
                </div>

                {/* Bottom Overlapping Light Frosted Glass Metadata Panel */}
                <div className="absolute bottom-5 left-5 right-5 z-20">
                  <div className="glass-panel p-5 rounded-2xl border border-white shadow-xl flex items-end justify-between transition-transform duration-300 group-hover:-translate-y-1 bg-white/90 text-[#171717]">
                    <div className="space-y-1">
                      <span className="tracking-label text-[10px] text-[#B89563] block">
                        {project.location} • {project.year}
                      </span>
                      <h3 className="font-sans text-xl sm:text-2xl font-semibold text-[#171717] tracking-tight group-hover:text-[#B89563] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#333330] font-light line-clamp-1">
                        {project.category} ({project.areaSqFt})
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-stone-300 text-[#171717] bg-white flex items-center justify-center group-hover:bg-[#B89563] group-hover:border-transparent group-hover:text-white transition-all shrink-0 shadow-sm">
                      <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

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
