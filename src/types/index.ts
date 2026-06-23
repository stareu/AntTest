export interface Point {
  x: number;
  y: number;
}

export interface AnimationConfig {
  rotationSpeed: number;
  pulseSpeed: number;
  pulseAmount: number;
  objectSize: number;
}

export interface MovementConfig {
  duration: number;
  ease: string;
  controlPointVariance: number;
}

export interface ScalingConfig {
  dprEnabled: boolean;
  resizeDebounceMs: number;
}

export interface FullscreenConfig {
  enabledOnMobile: boolean;
  triggerOnFirstInteraction: boolean;
  retryOnFocusLoss: boolean;
}

export interface AssetsConfig {
  backgroundPath: string;
  spritePath: string;
}

export interface AppConfig {
  baseResolution: Point;
  worldResolution: Point;
  backgroundColor: string | number;
  animation: AnimationConfig;
  movement: MovementConfig;
  scaling: ScalingConfig;
  fullscreen: FullscreenConfig;
  assets: AssetsConfig;
}
