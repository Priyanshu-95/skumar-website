import React from 'react';
import { Phone, MessageSquare, Calculator } from 'lucide-react';

interface QuickContactBarProps {
  onOpenEstimator: () => void;
}

export const QuickContactBar: React.FC<QuickContactBarProps> = ({ onOpenEstimator }) => {
  const whatsappUrl = `https://wa.me/919898966648?text=${encodeURIComponent(
    'Hello S Kumar Construction & Interior, I would like to inquire about an interior / turnkey project.'
  )}`;

  return (
    <>
      {/* Desktop Floating WhatsApp Trigger (Bottom Right) */}
      <div className="hidden md:flex fixed bottom-8 right-8 z-40 flex-col items-end gap-3 pointer-events-auto">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp Chat"
          className="group flex items-center gap-3 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 border border-white"
        >
          <span className="text-xs font-bold tracking-wider px-2 max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap">
            Chat on WhatsApp
          </span>
          <MessageSquare className="w-6 h-6 fill-current" />
        </a>
      </div>

      {/* Mobile Sticky Bottom Action Bar (Light Frosted Glass) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F8F5EF]/95 backdrop-blur-2xl text-[#171717] border-t border-stone-300/80 grid grid-cols-3 divide-x divide-stone-300/60 shadow-2xl">
        <a
          href="tel:+919898966648"
          aria-label="Call S Kumar Construction & Interior at +91 98989 66648"
          className="py-3.5 flex flex-col items-center justify-center gap-1 text-[10px] tracking-label text-[#171717] hover:text-[#B89563] transition-colors"
        >
          <Phone className="w-4 h-4 text-[#B89563]" />
          <span>Call</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp with S Kumar Studio"
          className="py-3.5 flex flex-col items-center justify-center gap-1 text-[10px] tracking-label text-[#171717] hover:text-[#25D366] transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366]" />
          <span>WhatsApp</span>
        </a>
        <button
          onClick={onOpenEstimator}
          aria-label="Open Instant Project Cost Estimator"
          className="py-3.5 flex flex-col items-center justify-center gap-1 text-[10px] tracking-label text-[#B89563] font-bold hover:bg-stone-200/50 transition-colors focus:outline-none"
        >
          <Calculator className="w-4 h-4" />
          <span>Enquire</span>
        </button>
      </div>
    </>
  );
};

export default QuickContactBar;
