import type { LoadedSpritesheetBundle } from "@/types/spritesheet";

type SpritesheetRenderInput = {
  bundle: LoadedSpritesheetBundle;
  frame: number;
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

  resize(width: number, height: number) {
    if (!this.canvas || !this.ctx || width <= 0 || height <= 0) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    this.canvas.width = Math.round(width * dpr);
    this.canvas.height = Math.round(height * dpr);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = "high";
  }

  render(input: SpritesheetRenderInput) {
    if (!this.canvas || !this.ctx) return;

    const { bundle, frame, viewportWidth, viewportHeight } = input;
    const frameName = bundle.animationFrames[frame];
    const frameData = bundle.frames[frameName];
    if (!frameData) return;

    const activeSheet =
      bundle.sheetSources.find(
        (sheet) => frame >= sheet.frameStart && frame <= sheet.frameEnd,
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
  }
}
