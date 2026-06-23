export class InputManager {
  private canvas: HTMLCanvasElement;
  private pointerDownCallback: ((x: number, y: number) => void) | null = null;
  private firstInteractionCallback: (() => void) | null = null;
  private activePointers = new Set<number>();
  private hasInteracted = false;
  private boundPointerDown: (e: PointerEvent) => void;
  private boundPointerUp: (e: PointerEvent) => void;
  private enabled = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.boundPointerDown = this.handlePointerDown.bind(this);
    this.boundPointerUp = this.handlePointerUp.bind(this);
  }

  onPointerDown(callback: (x: number, y: number) => void): void {
    this.pointerDownCallback = callback;
  }

  onFirstInteraction(callback: () => void): void {
    this.firstInteractionCallback = callback;
  }

  enable(): void {
    if (!this.enabled) {
      this.enabled = true;
      this.canvas.style.touchAction = 'none';
      this.canvas.addEventListener('pointerdown', this.boundPointerDown);
      this.canvas.addEventListener('pointerup', this.boundPointerUp);
      this.canvas.addEventListener('pointercancel', this.boundPointerUp);
    }
  }

  disable(): void {
    if (this.enabled) {
      this.enabled = false;
      this.canvas.style.touchAction = '';
      this.canvas.removeEventListener('pointerdown', this.boundPointerDown);
      this.canvas.removeEventListener('pointerup', this.boundPointerUp);
      this.canvas.removeEventListener('pointercancel', this.boundPointerUp);
    }
  }

  private handlePointerDown(e: PointerEvent): void {
    e.preventDefault();

    this.activePointers.add(e.pointerId);

    if (!this.hasInteracted) {
      this.hasInteracted = true;
      this.firstInteractionCallback?.();
    }

    if (this.activePointers.size === 1 && this.pointerDownCallback) {
      this.pointerDownCallback(e.clientX, e.clientY);
    }
  }

  private handlePointerUp(e: PointerEvent): void {
    this.activePointers.delete(e.pointerId);
  }
}
