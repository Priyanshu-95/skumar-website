import React, { useState, useRef, useCallback } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  subtitle?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'RAW CIVIL STRUCTURE',
  afterLabel = 'FINISHED LUXURY INTERIOR',
  title = 'See The Transformation',
  subtitle = 'Drag the divider to reveal raw site structure vs completed architectural execution'
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div className="w-full space-y-6">
      {(title || subtitle) && (
        <div className="text-center max-w-2xl mx-auto space-y-2">
          {subtitle && (
            <span className="tracking-label text-[10px] text-[#B89563] block font-semibold">
              {subtitle}
            </span>
          )}
          {title && (
            <h3 className="font-sans text-3xl md:text-5xl font-medium text-[#171717] tracking-tight">
              {title}
            </h3>
          )}
        </div>
      )}

      {/* Main Interactive Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[380px] md:h-[540px] rounded-[32px] overflow-hidden select-none cursor-ew-resize border border-white shadow-2xl bg-white"
      >
        {/* After Image (Full width background) */}
        <img
          src={afterImage}
          alt={afterLabel}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Before Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden border-r-2 border-white shadow-2xl"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
              height: '100%'
            }}
          />
          {/* Before Badge */}
          <div className="absolute top-6 left-6 glass-capsule bg-white/85 text-[#171717] px-4 py-1.5 text-[10px] tracking-label font-semibold border border-white shadow-md">
            {beforeLabel}
          </div>
        </div>

        {/* After Badge */}
        <div className="absolute top-6 right-6 glass-capsule bg-white/85 text-[#171717] px-4 py-1.5 text-[10px] tracking-label font-semibold border border-white shadow-md pointer-events-none">
          {afterLabel}
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg cursor-ew-resize pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#B89563] text-white shadow-2xl border-2 border-white flex items-center justify-center">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;

