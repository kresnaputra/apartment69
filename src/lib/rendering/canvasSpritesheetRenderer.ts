import type { LoadedSpritesheetBundle } from "@/types/spritesheet";

type SpritesheetRenderInput = {
  bundle: LoadedSpritesheetBundle;
  frame: number;
  dimmed?: boolean;
  viewportWidth: number;
  viewportHeight: number;
};

export class CanvasSpritesheetRenderer {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  attach(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    if (!this.ctx) {
      throw new Error("Canvas 2D context tidak tersedia.");
    }
  }

  resize(width: number, height: number, resolutionScale = 1) {
    if (!this.canvas || !this.ctx || width <= 0 || height <= 0) return;

    const pixelRatio = Math.max(1, window.devicePixelRatio || 1) * Math.max(1, resolutionScale);
    this.canvas.width = Math.round(width * pixelRatio);
    this.canvas.height = Math.round(height * pixelRatio);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = "high";
  }

  render(input: SpritesheetRenderInput) {
    if (!this.canvas || !this.ctx) return;

    const { bundle, frame, viewportWidth, viewportHeight } = input;
    const normalizedFrame = Math.min(bundle.frameBitmaps.length - 1, Math.max(0, Math.floor(frame)));
    const frameData = bundle.frameBitmaps[normalizedFrame];
    if (!frameData) return;

    const { bitmap, spriteSourceSize, sourceSize } = frameData;

    this.ctx.clearRect(0, 0, viewportWidth, viewportHeight);

    const scaleX = viewportWidth / sourceSize.w;
    const scaleY = viewportHeight / sourceSize.h;
    const scale = Math.min(scaleX, scaleY);

    const targetWidth = sourceSize.w * scale;
    const targetHeight = sourceSize.h * scale;
    const drawX = (viewportWidth - targetWidth) / 2;
    const drawY = viewportHeight - targetHeight;

    this.ctx.drawImage(
      bitmap,
      drawX + spriteSourceSize.x * scale,
      drawY + spriteSourceSize.y * scale,
      bitmap.width * scale,
      bitmap.height * scale,
    );

    if (input.dimmed) {
      this.ctx.save();
      this.ctx.globalCompositeOperation = "source-atop";
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
      this.ctx.fillRect(0, 0, viewportWidth, viewportHeight);
      this.ctx.restore();
    }
  }
}
