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

  resize(width: number, height: number, resolutionScale = 1, maxPixelRatio = 4) {
    if (!this.canvas || !this.ctx || width <= 0 || height <= 0) return;

    const rawPixelRatio = Math.max(1, window.devicePixelRatio || 1) * Math.max(1, resolutionScale);
    const pixelRatio = Math.max(1, Math.min(maxPixelRatio, rawPixelRatio));
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

    const { bundle, dimmed = false, frame, viewportWidth, viewportHeight } = input;
    const normalizedFrame = Math.min(
      bundle.animationFrames.length - 1,
      Math.max(0, Math.floor(frame)),
    );
    const frameName = bundle.animationFrames[normalizedFrame];
    const frameData = bundle.frames[frameName];
    if (!frameData) return;

    const activeSheet =
      bundle.sheetSources.find(
        (sheet) => normalizedFrame >= sheet.frameStart && normalizedFrame <= sheet.frameEnd,
      ) ?? bundle.sheetSources[0];
    if (!activeSheet?.image?.complete) return;

    this.ctx.clearRect(0, 0, viewportWidth, viewportHeight);

    const source = frameData.frame;
    const frameSize = frameData.sourceSize ?? bundle.frameSize;

    // Scale to fit the viewport while maintaining aspect ratio, anchored to bottom
    const scaleX = viewportWidth / frameSize.w;
    const scaleY = viewportHeight / frameSize.h;
    const scale = Math.min(scaleX, scaleY);

    const targetWidth = frameSize.w * scale;
    const targetHeight = frameSize.h * scale;
    const drawX = (viewportWidth - targetWidth) / 2;
    const drawY = viewportHeight - targetHeight;

    this.ctx.filter = dimmed ? "brightness(55%) saturate(86%)" : "none";
    this.ctx.drawImage(
      activeSheet.image,
      source.x,
      source.y,
      source.w,
      source.h,
      drawX + frameData.spriteSourceSize.x * scale,
      drawY + frameData.spriteSourceSize.y * scale,
      source.w * scale,
      source.h * scale,
    );
    this.ctx.filter = "none";
  }
}
