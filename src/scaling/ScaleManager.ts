import { isMobile } from 'pixi.js';
import type { Application } from 'pixi.js';
import type { Point } from '@/types';

export class ScaleManager {
  private app: Application;
  private worldWidth: number;
  private worldHeight: number;
  private _scale = 1;
  private _offsetX = 0;
  private _offsetY = 0;
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private debounceMs: number;

  constructor(
    app: Application,
    debounceMs: number,
    worldWidth: number,
    worldHeight: number,
  ) {
    this.app = app;
    this.debounceMs = debounceMs;
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;
    this.app.canvas.style.position = 'absolute';
    this.app.canvas.style.display = 'block';

    window.addEventListener('resize', this.debouncedResize);

    this.resize();
  }

  private debouncedResize = (): void => {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.resize();
      this.debounceTimer = null;
    }, this.debounceMs);
  };

  resize(): void {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const scaleX = windowWidth / this.worldWidth;
    const scaleY = windowHeight / this.worldHeight;

    const rawScale = Math.min(scaleX, scaleY);

    const scale = isMobile.any ? rawScale : Math.min(rawScale, 1);

    const canvasCSSWidth = Math.round(this.worldWidth * scale);
    const canvasCSSHeight = Math.round(this.worldHeight * scale);

    this._scale = scale;
    this._offsetX = Math.round((windowWidth - canvasCSSWidth) / 2);
    this._offsetY = Math.round((windowHeight - canvasCSSHeight) / 2);

    const style = this.app.canvas.style
    style.width = `${canvasCSSWidth}px`;
    style.height = `${canvasCSSHeight}px`;
    style.left = `${this._offsetX}px`;
    style.top = `${this._offsetY}px`;
  }

  screenToWorld(screenX: number, screenY: number): Point {
    return {
      x: (screenX - this._offsetX) / this._scale,
      y: (screenY - this._offsetY) / this._scale,
    };
  }

  worldToScreen(worldX: number, worldY: number): Point {
    return {
      x: worldX * this._scale + this._offsetX,
      y: worldY * this._scale + this._offsetY,
    };
  }

  get scale(): number {
    return this._scale;
  }
}
