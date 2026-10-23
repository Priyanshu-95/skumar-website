import confetti from 'canvas-confetti';

/**
 * Triggers a premium celebration animation featuring confetti,
 * dual party poppers, and subtle fireworks bursts.
 * 
 * Complies with accessibility standards by checking prefers-reduced-motion.
 * Fully temporary, smooth, and responsive across desktop and mobile devices.
 */
export const triggerCelebration = (): void => {
  if (typeof window === 'undefined') return;

  // 1. Accessibility: Respect user's reduced-motion preference
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Harmonious celebratory palette tailored to S Kumar's architectural aesthetic:
  // Signature Warm Gold, Champagne, Metallic Gold, Amber, Emerald, Sapphire, Coral Rose
  const colors = [
    '#B89563', // S Kumar Signature Gold
    '#D4AF37', // Bright Metallic Gold
    '#E6CA85', // Champagne
    '#F59E0B', // Amber
    '#10B981', // Emerald Green
    '#3B82F6', // Royal Sapphire
    '#EC4899', // Festivity Rose
    '#8B5CF6', // Purple Accent
  ];

  const zIndex = 99999; // Ensure animation renders above all modals and sticky elements

  // 2. Stage 1: Dual Party Poppers from bottom-left and bottom-right corners
  confetti({
    particleCount: 45,
    angle: 60,
    spread: 55,
    origin: { x: 0.05, y: 0.85 },
    colors,
    zIndex,
    ticks: 200,
    gravity: 1,
    scalar: 1,
  });

  confetti({
    particleCount: 45,
    angle: 120,
    spread: 55,
    origin: { x: 0.95, y: 0.85 },
    colors,
    zIndex,
    ticks: 200,
    gravity: 1,
    scalar: 1,
  });

  // 3. Stage 2: Subtle Fireworks Bursts (Left and Right centers)
  setTimeout(() => {
    confetti({
      particleCount: 35,
      angle: 90,
      spread: 70,
      startVelocity: 32,
      origin: { x: 0.32, y: 0.42 },
      colors,
      ticks: 220,
      gravity: 0.95,
      decay: 0.93,
      zIndex,
    });
  }, 220);

  setTimeout(() => {
    confetti({
      particleCount: 35,
      angle: 90,
      spread: 70,
      startVelocity: 32,
      origin: { x: 0.68, y: 0.42 },
      colors,
      ticks: 220,
      gravity: 0.95,
      decay: 0.93,
      zIndex,
    });
  }, 440);

  // 4. Stage 3: Center Finale — Gentle falling golden rain & confetti
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 90,
      startVelocity: 28,
      origin: { x: 0.5, y: 0.35 },
      colors,
      ticks: 260,
      gravity: 0.85,
      scalar: 1.15,
      zIndex,
    });
  }, 700);
};
