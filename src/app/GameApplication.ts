import { Application, Container, Assets, TilingSprite } from 'pixi.js';
import gsap from 'gsap';
import { config } from '@/config/app.config';
import { SceneManager } from '@/scene/SceneManager';
import { AnimationController } from '@/animation/AnimationController';
import { InputManager } from '@/input/InputManager';
import { ScaleManager } from '@/scaling/ScaleManager';
import { FullscreenManager } from '@/fullscreen/FullscreenManager';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

export class GameApplication {
  private app!: Application;
  private scaleManager!: ScaleManager;
  private fullscreenManager!: FullscreenManager;
  private inputManager!: InputManager;
  private animationController!: AnimationController;
  private movementTween: gsap.core.Tween | null = null;
  private sceneManager!: SceneManager;

  async init(): Promise<void> {
    this.registerPlugins();

    await this.createApp();

    const content = new Container();
    this.app.stage.addChild(content);

    await this.setupBackground(content);
    await this.initManagers(content);

    this.setupInput();
  }

  private registerPlugins(): void {
    gsap.registerPlugin(MotionPathPlugin);
  }

  private async createApp(): Promise<void> {
    this.app = new Application();

    await this.app.init({
      width: config.worldResolution.x,
      height: config.worldResolution.y,
      background: config.backgroundColor,
      resolution: config.scaling.dprEnabled ? (window.devicePixelRatio || 1) : 1,
      autoDensity: true,
      antialias: true,
    });

    document.body.appendChild(this.app.canvas);
  }

  private async setupBackground(content: Container): Promise<void> {
    const bgTexture = await Assets.load(config.assets.backgroundPath);

    const bgTiling = new TilingSprite({
      texture: bgTexture,
      width: config.worldResolution.x,
      height: config.worldResolution.y,
    });

    content.addChild(bgTiling);
  }

  private async initManagers(content: Container): Promise<void> {
    this.scaleManager = new ScaleManager(
      this.app,
      config.scaling.resizeDebounceMs,
      config.worldResolution.x,
      config.worldResolution.y,
    );

    this.sceneManager = new SceneManager(content);

    this.animationController = new AnimationController(config.animation);

    await this.animationController.initialize(
      this.sceneManager.getAnimationContainer(),
      config.assets.spritePath,
    );

    this.animationController.setPosition(
      config.worldResolution.x / 2,
      config.worldResolution.y / 2,
    );

    this.inputManager = new InputManager(this.app.canvas);

    this.fullscreenManager = new FullscreenManager(
      this.app.canvas,
      config.fullscreen,
    );
  }

  private setupInput(): void {
    this.inputManager.onPointerDown((x: number, y: number) => {
      const world = this.scaleManager.screenToWorld(x, y);
      this.moveSpriteTo(world.x, world.y);
    });

    this.inputManager.onFirstInteraction(() => {
      this.fullscreenManager.attemptFullscreen();
    });

    this.inputManager.enable();
  }

  private moveSpriteTo(targetX: number, targetY: number): void {
    this.movementTween?.kill();

    const sprite = this.animationController.getSprite();
    const half = config.animation.objectSize / 2;
    const clampedX = Math.max(half, Math.min(config.worldResolution.x - half, targetX));
    const clampedY = Math.max(half, Math.min(config.worldResolution.y - half, targetY));

    if (clampedX === sprite.x && clampedY === sprite.y) {
      return;
    }

    this.movementTween = gsap.to(sprite.position, {
      duration: config.movement.duration,
      ease: config.movement.ease,
      motionPath: {
        path: [
          { x: sprite.x, y: sprite.y },
          { x: clampedX, y: clampedY },
        ],
        curviness: 0,
      },
    });
  }
}
