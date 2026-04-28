import type { LoadedBakedSbnCharacterBundle } from "@/types/characterBundle";

type BakedSbnRenderInput = {
  bundle: LoadedBakedSbnCharacterBundle;
  frame: number;
  viewportWidth: number;
  viewportHeight: number;
};

export class CanvasBakedSbnRenderer {
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

  render(input: BakedSbnRenderInput) {
    if (!this.canvas || !this.ctx) return;

    const { bundle, frame, viewportWidth, viewportHeight } = input;
    const normalizedFrame = Math.min(
      bundle.totalFrames - 1,
      Math.max(0, Math.floor(frame)),
    );
    const bakedIndex = Math.min(
      bundle.frames.length - 1,
      Math.max(0, Math.floor((normalizedFrame / Math.max(1, bundle.totalFrames)) * bundle.frames.length)),
    );
    const frameData = bundle.frames[bakedIndex];
    const atlas = bundle.atlases[frameData?.atlasIndex ?? 0];
    if (!frameData || !atlas) return;

    this.ctx.clearRect(0, 0, viewportWidth, viewportHeight);

    const scaleX = viewportWidth / bundle.frameSize.w;
    const scaleY = viewportHeight / bundle.frameSize.h;
    const scale = Math.min(scaleX, scaleY);
    const targetWidth = bundle.frameSize.w * scale;
    const targetHeight = bundle.frameSize.h * scale;
    const drawX = (viewportWidth - targetWidth) / 2;
    const drawY = viewportHeight - targetHeight;

    this.ctx.drawImage(
      atlas,
      frameData.x,
      frameData.y,
      frameData.w,
      frameData.h,
      drawX,
      drawY,
      targetWidth,
      targetHeight,
    );
  }
}
