import React from 'react';
import { Home, Compass, PhoneCall, Layers, ArrowRight, ShieldAlert } from 'lucide-react';

interface NotFoundPageProps {
  setActiveTab: (tab: string) => void;
  onOpenEstimator?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ setActiveTab, onOpenEstimator }) => {
  return (
    <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-24 bg-[#F5F1E8] text-[#171717] min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="ambient-glow-warm top-1/3 left-1/2 -translate-x-1/2" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10 space-y-8">
        
        {/* Visual Badge */}
        <div className="glass-capsule inline-flex items-center gap-2 px-4 py-2 border border-white bg-white/90 shadow-md mx-auto">
          <ShieldAlert className="w-4 h-4 text-[#B89563]" />
          <span className="tracking-label text-[11px] text-[#B89563] font-bold">
            ERROR 404 — PAGE NOT FOUND
          </span>
        </div>

        {/* 404 Heading */}
        <div className="space-y-3">
          <h1 className="font-sans text-6xl sm:text-8xl font-bold tracking-tighter text-[#171717]">
            404
          </h1>
          <h2 className="font-sans text-2xl sm:text-3xl font-medium text-[#171717]">
            This Blueprint Doesn't Exist.
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-lg mx-auto font-light leading-relaxed">
            The page you are looking for may have been moved, renamed, or is currently undergoing structural enhancement.
          </p>
        </div>

        {/* Navigation Quick Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto pt-4">
          
          <button
            onClick={() => setActiveTab('home')}
            className="p-5 rounded-2xl bg-white/80 border border-stone-200 hover:border-[#B89563] hover:shadow-lg transition-all group flex flex-col items-center justify-center space-y-2 text-center"
          >
            <Home className="w-6 h-6 text-[#B89563] group-hover:scale-110 transition-transform" />
            <span className="font-medium text-xs text-[#171717]">Homepage</span>
            <span className="text-[10px] text-stone-600 font-mono">Return to Start</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className="p-5 rounded-2xl bg-white/80 border border-stone-200 hover:border-[#B89563] hover:shadow-lg transition-all group flex flex-col items-center justify-center space-y-2 text-center"
          >
            <Layers className="w-6 h-6 text-[#B89563] group-hover:scale-110 transition-transform" />
            <span className="font-medium text-xs text-[#171717]">Services</span>
            <span className="text-[10px] text-stone-600 font-mono">Civil & Interior</span>
          </button>

          <button
            onClick={() => setActiveTab('work')}
            className="p-5 rounded-2xl bg-white/80 border border-stone-200 hover:border-[#B89563] hover:shadow-lg transition-all group flex flex-col items-center justify-center space-y-2 text-center"
          >
            <Compass className="w-6 h-6 text-[#B89563] group-hover:scale-110 transition-transform" />
            <span className="font-medium text-xs text-[#171717]">Projects</span>
            <span className="text-[10px] text-stone-600 font-mono">View Portfolio</span>
          </button>

        </div>

        {/* Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setActiveTab('home')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#171717] text-white hover:bg-[#B89563] transition-colors rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <span>Back to Home</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onOpenEstimator && (
            <button
              onClick={onOpenEstimator}
              className="w-full sm:w-auto border border-stone-300 text-[#171717] hover:border-[#171717] transition-colors px-8 py-3.5 text-xs uppercase tracking-widest font-semibold rounded-full flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#B89563]" />
              <span>Request Consultation</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
