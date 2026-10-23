import React from 'react';
import type { BrandItem } from '../data/brands';

interface BrandLogoProps {
  brand: BrandItem;
  className?: string;
  isHovered?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ brand, className = '', isHovered = false }) => {
  // SVG Logomark renderers tailored for each authentic brand
  const renderLogomark = (id: string) => {
    switch (id) {
      case 'hettich':
        return (
          <div className="flex items-center gap-2.5">
            <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 40 40" fill="currentColor">
              <rect x="4" y="4" width="32" height="32" rx="4" fill="currentColor" fillOpacity="0.15" />
              <path d="M10 10H16V22H24V10H30V30H24V26H16V30H10V10Z" />
              <rect x="25" y="6" width="9" height="5" fill="#D32F2F" className="transition-opacity duration-300 group-hover:opacity-100 opacity-60" />
            </svg>
            <span className="font-sans font-extrabold tracking-wider text-sm uppercase">HETTICH</span>
          </div>
        );

      case 'godrej':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="24" cy="24" r="18" strokeDasharray="3 3" />
              <path d="M16 28C18 20 22 14 30 16C36 17.5 34 26 28 26C22 26 20 32 28 32C32 32 34 30 34 30" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <span className="font-serif italic font-bold tracking-tight text-base">Godrej</span>
          </div>
        );

      case 'korel':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 36 36" fill="currentColor">
              <path d="M6 6H12V16L20 6H28L18 18L28 30H20L12 20V30H6V6Z" />
            </svg>
            <span className="font-sans font-bold tracking-widest text-xs uppercase">KOREL</span>
          </div>
        );

      case 'royal-touch-hw':
      case 'royal-touch-surf':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 flex-shrink-0 text-[#B8860B]" viewBox="0 0 40 40" fill="currentColor">
              <path d="M8 28L4 12L13 18L20 8L27 18L36 12L32 28H8Z" />
              <rect x="8" y="30" width="24" height="3" rx="1.5" />
            </svg>
            <span className="font-serif tracking-widest text-xs font-semibold uppercase">ROYAL TOUCH</span>
          </div>
        );

      case 'halflay':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 36 36" fill="currentColor">
              <path d="M8 6H14V14H22V6H28V30H22V20H14V30H8V6Z" />
              <circle cx="28" cy="8" r="3" fill="#1A365D" />
            </svg>
            <span className="font-sans font-black tracking-wider text-xs uppercase">HALFLAY</span>
          </div>
        );

      case 'tendom':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="3">
              <rect x="6" y="8" width="24" height="20" rx="2" />
              <path d="M6 16H30" />
              <path d="M18 16V28" />
            </svg>
            <span className="font-sans font-bold tracking-widest text-xs uppercase">TENDOM</span>
          </div>
        );

      case 'hardwyn':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 40 40" fill="currentColor">
              <path d="M8 8H16V16H24V8H32V32H24V24H16V32H8V8Z" />
            </svg>
            <span className="font-sans font-black tracking-widest text-xs uppercase">HARDWYN</span>
          </div>
        );

      case 'roto-hw':
      case 'roto-lighting':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 flex-shrink-0 text-[#0066B3]" viewBox="0 0 36 36" fill="currentColor">
              <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="4" />
              <path d="M14 10H22C24.5 10 26 11.5 26 13.5C26 15.5 24.5 17 22 17H18V26H14V10ZM18 14V15.5H21.5C22 15.5 22.5 15 22.5 14.5C22.5 14 22 14 21.5 14H18Z" />
            </svg>
            <span className="font-sans font-bold tracking-wider text-xs uppercase">ROTO</span>
          </div>
        );

      case 'greenply':
        return (
          <div className="flex items-center gap-2.5">
            <svg className="w-6 h-6 flex-shrink-0 text-[#2E7D32]" viewBox="0 0 40 40" fill="currentColor">
              <path d="M20 4C11.16 4 4 11.16 4 20C4 28.84 11.16 36 20 36C28.84 36 36 28.84 36 20C36 11.16 28.84 4 20 4ZM20 32C13.37 32 8 26.63 8 20C8 13.37 13.37 8 20 8C26.63 8 32 13.37 32 20C32 26.63 26.63 32 20 32Z" />
              <path d="M20 10C16 14 14 18 20 28C26 18 24 14 20 10Z" fill="#2E7D32" />
            </svg>
            <span className="font-sans font-extrabold tracking-wide text-sm uppercase">GREENPLY</span>
          </div>
        );

      case 'advance-laminate':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 36 36" fill="currentColor">
              <path d="M18 4L4 32H12L18 18L24 32H32L18 4Z" />
              <path d="M12 24H24L18 12L12 24Z" opacity="0.5" />
            </svg>
            <div className="flex flex-col text-left leading-tight">
              <span className="font-sans font-bold tracking-widest text-[11px] uppercase">ADVANCE</span>
              <span className="font-sans text-[9px] tracking-widest text-stone-700 font-semibold uppercase">LAMINATE</span>
            </div>
          </div>
        );

      case 'welmaica':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 flex-shrink-0 text-[#1565C0]" viewBox="0 0 40 40" fill="currentColor">
              <path d="M6 10L13 30H17L20 18L23 30H27L34 10H28L24 24L21 10H19L16 24L12 10H6Z" />
            </svg>
            <span className="font-sans font-black tracking-wider text-xs uppercase">WELMAICA</span>
          </div>
        );

      case 'asian-paints':
        return (
          <div className="flex items-center gap-2.5">
            <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 48 48" fill="none">
              <path d="M10 38C10 24 20 10 36 10C36 24 26 38 10 38Z" fill="#E65100" />
              <circle cx="28" cy="28" r="6" fill="#F57C00" />
            </svg>
            <div className="flex flex-col text-left leading-none">
              <span className="font-serif font-bold text-sm tracking-tight">asianpaints</span>
            </div>
          </div>
        );

      case 'gprox-pop':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 flex-shrink-0 text-[#00838F]" viewBox="0 0 36 36" fill="currentColor">
              <rect x="4" y="4" width="28" height="28" rx="6" fill="none" stroke="currentColor" strokeWidth="3" />
              <path d="M18 10C13.5 10 10 13.5 10 18C10 22.5 13.5 26 18 26C22.5 26 25 23 25 20H18V16H29C29.5 22 25 30 18 30C11.3 30 6 24.7 6 18C6 11.3 11.3 6 18 6" />
            </svg>
            <div className="flex flex-col text-left leading-tight">
              <span className="font-sans font-bold tracking-wider text-xs uppercase">GPROX</span>
              <span className="font-mono text-[9px] tracking-widest text-stone-700 font-semibold uppercase">P.O.P COMPOUND</span>
            </div>
          </div>
        );

      case 'saint-gobain':
        return (
          <div className="flex items-center gap-2.5">
            <svg className="w-7 h-7 flex-shrink-0 text-[#005596]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M8 36C8 20 20 12 38 12" />
              <path d="M14 36C14 24 24 18 38 18" strokeWidth="2" />
              <path d="M20 36C20 28 28 24 38 24" strokeWidth="1.5" />
            </svg>
            <div className="flex flex-col text-left leading-none">
              <span className="font-sans font-extrabold text-xs tracking-tight uppercase">SAINT-GOBAIN</span>
              <span className="font-sans text-[8px] tracking-widest text-stone-700 font-semibold uppercase mt-0.5">GLASS</span>
            </div>
          </div>
        );

      case 'modiguard':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 flex-shrink-0 text-[#0D47A1]" viewBox="0 0 36 36" fill="currentColor">
              <path d="M6 6L18 12L30 6V18C30 25 24 30 18 32C12 30 6 25 6 18V6Z" fill="none" stroke="currentColor" strokeWidth="3" />
              <path d="M18 16M14 16L18 22L22 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="font-sans font-black tracking-widest text-xs uppercase">MODIGUARD</span>
          </div>
        );

      case 'ozone':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 flex-shrink-0 text-[#D84315]" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="4">
              <circle cx="18" cy="18" r="12" />
              <circle cx="18" cy="18" r="4" fill="currentColor" />
            </svg>
            <div className="flex flex-col text-left leading-tight">
              <span className="font-sans font-black tracking-widest text-xs uppercase">OZONE</span>
              <span className="font-mono text-[8px] text-stone-700 font-semibold tracking-wider">GLASS FITTINGS</span>
            </div>
          </div>
        );

      case 'pidilite':
        return (
          <div className="flex items-center gap-2.5">
            <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 44 44" fill="none">
              <circle cx="22" cy="22" r="18" fill="#F57F17" fillOpacity="0.2" />
              <path d="M12 26C16 20 22 20 22 26C22 30 16 30 12 26Z" fill="#1565C0" />
              <path d="M32 26C28 20 22 20 22 26C22 30 28 30 32 26Z" fill="#F57F17" />
            </svg>
            <span className="font-sans font-bold tracking-tight text-sm text-[#1565C0]">Pidilite</span>
          </div>
        );

      case 'euro':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 36 36" fill="currentColor">
              <path d="M8 6H28V12H14V16H24V20H14V24H28V30H8V6Z" />
            </svg>
            <span className="font-sans font-black tracking-widest text-xs uppercase">EURO</span>
          </div>
        );

      case 'grundfos':
        return (
          <div className="flex items-center gap-2.5">
            <svg className="w-6 h-6 flex-shrink-0 text-[#002B49]" viewBox="0 0 40 40" fill="currentColor">
              <path d="M20 4C11.16 4 4 11.16 4 20C4 28.84 11.16 36 20 36C28.84 36 36 28.84 36 20C36 11.16 28.84 4 20 4ZM20 10V30M10 20H30" stroke="currentColor" strokeWidth="4" />
            </svg>
            <span className="font-sans font-bold tracking-widest text-xs uppercase">GRUNDFOS</span>
          </div>
        );

      case 'lubi':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 flex-shrink-0 text-[#C62828]" viewBox="0 0 36 36" fill="currentColor">
              <rect x="6" y="6" width="24" height="24" rx="4" fill="none" stroke="currentColor" strokeWidth="3" />
              <path d="M12 12V24H24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <span className="font-sans font-black tracking-wider text-xs uppercase">LUBI</span>
          </div>
        );

      case 'ddecor':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 flex-shrink-0 text-[#6A1B9A]" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M8 6C8 6 20 6 24 14C28 22 24 30 14 30H8V6Z" />
              <path d="M14 12H18C20 12 22 14 22 18C22 22 20 24 18 24H14V12Z" fill="currentColor" fillOpacity="0.2" />
            </svg>
            <span className="font-serif italic font-bold tracking-tight text-sm">D'Decor</span>
          </div>
        );

      case 'myk-laticrete':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 flex-shrink-0 text-[#00695C]" viewBox="0 0 36 36" fill="currentColor">
              <path d="M18 4L32 12V24L18 32L4 24V12L18 4Z" fill="none" stroke="currentColor" strokeWidth="3" />
              <path d="M18 12L24 16V20L18 24L12 20V16L18 12Z" />
            </svg>
            <div className="flex flex-col text-left leading-tight">
              <span className="font-sans font-extrabold tracking-wider text-[11px] uppercase">MYK LATICRETE</span>
            </div>
          </div>
        );

      case 'roff':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 flex-shrink-0 text-[#AD1457]" viewBox="0 0 36 36" fill="currentColor">
              <circle cx="18" cy="18" r="12" fill="none" stroke="currentColor" strokeWidth="3" />
              <path d="M12 18H24M18 12V24" stroke="currentColor" strokeWidth="3" />
            </svg>
            <span className="font-sans font-black tracking-widest text-xs uppercase">ROFF</span>
          </div>
        );

      case 'tile-brand':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 flex-shrink-0 text-amber-700" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="4" y="4" width="12" height="12" rx="1" fill="currentColor" fillOpacity="0.15" />
              <rect x="20" y="4" width="12" height="12" rx="1" />
              <rect x="4" y="20" width="12" height="12" rx="1" />
              <rect x="20" y="20" width="12" height="12" rx="1" fill="currentColor" fillOpacity="0.15" />
            </svg>
            <div className="flex flex-col text-left leading-tight">
              <span className="font-sans font-bold tracking-widest text-xs uppercase">TILE</span>
              <span className="font-mono text-[8px] text-amber-600 tracking-wider">CLIENT SPECIFIED</span>
            </div>
          </div>
        );

      case 'lights-brand':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 flex-shrink-0 text-amber-500" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="18" cy="18" r="8" fill="currentColor" fillOpacity="0.2" />
              <path d="M18 4V8M18 28V32M4 18H8M28 18H32M8 8L11 11M25 25L28 28M8 28L11 25M25 11L28 8" strokeLinecap="round" />
            </svg>
            <div className="flex flex-col text-left leading-tight">
              <span className="font-sans font-bold tracking-widest text-xs uppercase">LIGHTS</span>
              <span className="font-mono text-[8px] text-amber-600 tracking-wider">ILLUMINATION</span>
            </div>
          </div>
        );

      case 'duroflex':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 flex-shrink-0 text-[#D32F2F]" viewBox="0 0 36 36" fill="currentColor">
              <path d="M6 8H16C22 8 26 12 26 18C26 24 22 28 16 28H6V8ZM12 14V22H16C19 22 20 20.5 20 18C20 15.5 19 14 16 14H12Z" />
            </svg>
            <span className="font-sans font-black tracking-wider text-xs uppercase">duroflex</span>
          </div>
        );

      case 'sleepwell':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 flex-shrink-0 text-[#1A237E]" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M26 10C24 8 21 7 18 7C12 7 8 11 8 16C8 22 14 23 18 24C23 25 27 26 27 30C27 34 22 36 17 36C12 36 8 33 6 30" />
            </svg>
            <span className="font-serif italic font-bold tracking-tight text-sm text-[#1A237E]">Sleepwell</span>
          </div>
        );

      case 'wakefit':
        return (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 flex-shrink-0 text-[#2E7D32]" viewBox="0 0 36 36" fill="currentColor">
              <path d="M4 10L10 28H15L18 18L21 28H26L32 10H26L23 21L20 10H16L13 21L10 10H4Z" />
            </svg>
            <span className="font-sans font-bold tracking-widest text-xs uppercase text-[#2E7D32]">wakefit</span>
          </div>
        );

      default:
        return (
          <span className="font-sans font-bold tracking-wider text-xs uppercase">
            {brand.name}
          </span>
        );
    }
  };

  return (
    <div
      className={`relative group inline-flex items-center justify-between px-5 py-3.5 rounded-lg border transition-all duration-300 select-none ${
        isHovered
          ? 'bg-white border-[#BA9B74]/50 shadow-md scale-105 z-20'
          : 'bg-[#FAF8F5] border-[#E8E4DC] hover:bg-white hover:border-[#BA9B74]/40 hover:shadow-md hover:scale-[1.03]'
      } ${className}`}
      style={{
        minWidth: '210px',
        height: '62px'
      }}
      aria-label={`${brand.name} logo`}
    >
      {/* Visual Logomark Area */}
      <div
        className="flex items-center gap-3 transition-colors duration-300 text-stone-700 group-hover:text-stone-900"
        style={{
          color: isHovered ? brand.officialColor : undefined
        }}
      >
        {renderLogomark(brand.id)}
      </div>

      {/* Confirmation Flag Badge if applicable */}
      {brand.needsConfirmation && (
        <span className="ml-2 px-1.5 py-0.5 text-[9px] font-mono bg-amber-100 text-amber-800 rounded border border-amber-300 opacity-80 group-hover:opacity-100 transition-opacity" title={brand.confirmationNote}>
          Flagged
        </span>
      )}

      {/* Hover Micro-Accent Underline */}
      <div
        className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        style={{ backgroundColor: brand.officialColor || '#BA9B74' }}
      />
    </div>
  );
};
