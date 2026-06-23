import { Assets, Container, Sprite } from 'pixi.js';
import gsap from 'gsap';
import type { AnimationConfig } from '@/types';

export class AnimationController {
  private sprite: Sprite | null = null;
  private config: AnimationConfig;
  private rotationTween: gsap.core.Tween | null = null;
  private pulseTween: gsap.core.Tween | null = null;

  constructor(config: AnimationConfig) {
    this.config = config;
  }

  async initialize(parent: Container, spritePath: string): Promise<void> {
    const texture = await Assets.load(spritePath);
    this.sprite = new Sprite(texture);
    this.sprite.anchor.set(0.5);

    const baseScale = this.config.objectSize / Math.max(texture.width, texture.height);
    this.sprite.scale.set(baseScale);

    parent.addChild(this.sprite);

    this.startAnimations(baseScale);
  }

  private startAnimations(baseScale: number): void {
    if (!this.sprite) {
      return;
    }

    const proxy = { angle: 0 };
    this.rotationTween = gsap.to(proxy, {
      angle: Math.PI * 2,
      duration: 2,
      repeat: -1,
      ease: 'none',
      onUpdate: () => {
        if (this.sprite) {
          this.sprite.rotation = proxy.angle;
        }
      },
    });

    const halfPeriod = Math.PI / this.config.pulseSpeed;
    this.sprite.scale.set(baseScale * (1 - this.config.pulseAmount));

    this.pulseTween = gsap.to(this.sprite.scale, {
      x: baseScale,
      y: baseScale,
      duration: halfPeriod,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });
  }

  getSprite(): Sprite {
    if (!this.sprite) {
      throw new Error('AnimationController not initialized');
    }

    return this.sprite;
  }

  setPosition(x: number, y: number): void {
    if (this.sprite) {
      this.sprite.position.set(x, y);
    }
  }

  getPosition(): { x: number; y: number } {
    if (!this.sprite) {
      return {
        x: 0,
        y: 0
      };
    }

    return {
      x: this.sprite.position.x,
      y: this.sprite.position.y
    };
  }

  destroy(): void {
    this.rotationTween?.kill();
    this.pulseTween?.kill();
    this.sprite?.destroy();
    this.sprite = null;
  }
}
