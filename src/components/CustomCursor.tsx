import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only initialize on desktop/mouse devices
    if (window.innerWidth < 1024) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over an element with data-cursor
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]') as HTMLElement | null;

      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor') || '';
        setCursorText(text);
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    document.body.classList.add('has-custom-cursor');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [isVisible]);

  if (!isVisible || window.innerWidth < 1024) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999] transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-[#BA9B74] flex items-center justify-center transition-all duration-300 ${
          isHovered
            ? 'w-24 h-24 bg-[#141414]/90 text-[#F9F6F0] backdrop-blur-sm border-transparent shadow-2xl scale-100'
            : 'w-8 h-8 bg-[#BA9B74]/20 backdrop-blur-[2px] scale-75'
        }`}
      >
        {isHovered && cursorText && (
          <span className="text-[10px] uppercase tracking-widest font-semibold text-[#F9F6F0] text-center px-2 animate-fade-in leading-tight">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
