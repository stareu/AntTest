import type { FullscreenConfig } from '@/types';
import { isMobile } from 'pixi.js';
import screenfull from 'screenfull';

export class FullscreenManager {
  private canvas: HTMLCanvasElement;
  private config: FullscreenConfig;
  private attempted = false;

  constructor(canvas: HTMLCanvasElement, config: FullscreenConfig) {
    this.canvas = canvas;
    this.config = config;
  }

  async attemptFullscreen(): Promise<void> {
    if (this.attempted || !this.config.enabledOnMobile || !isMobile.any || !screenfull.isEnabled) {
      return;
    }

    this.attempted = true;

    await screenfull.request(this.canvas);

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && this.config.retryOnFocusLoss && !screenfull.isFullscreen) {
        this.attemptFullscreen();
      }
    });
  }
}
