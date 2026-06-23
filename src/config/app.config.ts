import type { AppConfig } from '@/types';

export const config: AppConfig = {
  baseResolution: { x: 1000, y: 600 },
  worldResolution: { x: 1280, y: 768 },
  backgroundColor: '#1a1a2e',

  animation: {
    rotationSpeed: 3.14,
    pulseSpeed: 2.0,
    pulseAmount: 0.3,
    objectSize: 400,
  },

  movement: {
    duration: 0.5,
    ease: 'bounce.out',
    controlPointVariance: 0.3,
  },

  scaling: {
    dprEnabled: true,
    resizeDebounceMs: 50,
  },

  fullscreen: {
    enabledOnMobile: true,
    triggerOnFirstInteraction: true,
    retryOnFocusLoss: true,
  },

  assets: {
    backgroundPath: 'assets/bg.webp',
    spritePath: 'assets/object.webp',
  },
};
