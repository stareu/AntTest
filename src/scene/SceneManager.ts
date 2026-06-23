import { Container } from 'pixi.js';

export class SceneManager {
  private animationContainer: Container;
  private stage: Container;

  constructor(stage: Container) {
    this.stage = stage;
    this.animationContainer = new Container();

    stage.addChild(this.animationContainer);
  }

  getAnimationContainer(): Container {
    return this.animationContainer;
  }

  addToAnimation(child: Container): void {
    this.animationContainer.addChild(child);
  }
}
