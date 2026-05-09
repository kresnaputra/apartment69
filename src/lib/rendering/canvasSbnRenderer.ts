import { resolveSceneDrawables, sampleBonesAtFrame } from "@/lib/sbn/sampling";
import type { SceneBounds, SbnAttachment, SbnProject, WorldBone } from "@/types/sbn";

type RenderInput = {
  project: SbnProject;
  frame: number;
  scale: number;
  dimmed?: boolean;
  camera: SceneBounds;
  viewportWidth: number;
  viewportHeight: number;
};

export class CanvasSbnRenderer {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private backingWidth = 0;
  private backingHeight = 0;
  private pixelRatio = 1;
  private static imageCache = new Map<string, HTMLImageElement>();
  private static loadingCache = new Map<string, Promise<HTMLImageElement>>();

  attach(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    if (!this.ctx) {
      throw new Error("Canvas 2D context tidak tersedia.");
    }
  }

  resize(width: number, height: number, resolutionScale = 1) {
    if (!this.canvas || !this.ctx || width <= 0 || height <= 0) return;

    const navigatorWithMemory = navigator as Navigator & { deviceMemory?: number };
    const isSmallViewport = Math.min(window.innerWidth, window.innerHeight) < 700;
    const isLowMemoryDevice = (navigatorWithMemory.deviceMemory ?? 8) <= 4;
    const maxPixelRatio = isSmallViewport ? 2.75 : isLowMemoryDevice ? 2 : 2.5;
    const dpr = Math.min(
      maxPixelRatio,
      Math.max(1, (window.devicePixelRatio || 1) * Math.max(1, resolutionScale)),
    );
    const backingWidth = Math.round(width * dpr);
    const backingHeight = Math.round(height * dpr);

    if (
      this.backingWidth === backingWidth &&
      this.backingHeight === backingHeight &&
      this.pixelRatio === dpr
    ) {
      return;
    }

    this.backingWidth = backingWidth;
    this.backingHeight = backingHeight;
    this.pixelRatio = dpr;
    this.canvas.width = backingWidth;
    this.canvas.height = backingHeight;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = "high";
  }

  private loadImage(src: string) {
    const cachedImage = CanvasSbnRenderer.imageCache.get(src);
    if (cachedImage) {
      return Promise.resolve(cachedImage);
    }

    const cached = CanvasSbnRenderer.loadingCache.get(src);
    if (cached) return cached;

    const task = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        CanvasSbnRenderer.imageCache.set(src, img);
        CanvasSbnRenderer.loadingCache.delete(src);
        resolve(img);
      };
      img.onerror = () => {
        CanvasSbnRenderer.loadingCache.delete(src);
        reject(new Error(`Gagal memuat image asset: ${src}`));
      };
      img.src = src;
    });

    CanvasSbnRenderer.loadingCache.set(src, task);
    return task;
  }

  async preloadProject(project: SbnProject) {
    const imageSources = [
      ...(project.backgroundImage ? [project.backgroundImage] : []),
      ...project.attachments
        .map((attachment) => attachment.imageData)
        .filter((imageData): imageData is string => Boolean(imageData)),
    ];

    await Promise.all(imageSources.map((source) => this.loadImage(source)));
  }

  private getImage(src: string) {
    return CanvasSbnRenderer.imageCache.get(src) ?? null;
  }

  private worldToScreen(
    x: number,
    y: number,
    viewportWidth: number,
    viewportHeight: number,
    camera: SceneBounds,
    scale: number,
  ) {
    const sceneWidth = (camera.maxX - camera.minX) * camera.zoom * scale;
    const sceneHeight = (camera.maxY - camera.minY) * camera.zoom * scale;
    const horizontalPadding = (viewportWidth - sceneWidth) / 2;
    const bottomPadding = Math.max(0, (viewportHeight - sceneHeight) * 0.04);

    return {
      x: horizontalPadding + (x - camera.minX) * camera.zoom * scale,
      y: viewportHeight - bottomPadding - (camera.maxY - y) * camera.zoom * scale,
    };
  }

  private drawBackground(
    project: SbnProject,
    viewportWidth: number,
    viewportHeight: number,
  ) {
    if (!project.backgroundImage || !this.ctx) return;

    const background = this.getImage(project.backgroundImage);
    if (!background) return;

    const scale = Math.max(viewportWidth / background.width, viewportHeight / background.height);
    const width = background.width * scale;
    const height = background.height * scale;

    this.ctx.drawImage(
      background,
      (viewportWidth - width) / 2,
      (viewportHeight - height) / 2,
      width,
      height,
    );
  }

  private drawAttachment(
    attachment: SbnAttachment,
    bone: WorldBone,
    input: RenderInput,
  ) {
    if (!attachment.imageData || !this.ctx) return;

    const image = this.getImage(attachment.imageData);
    if (!image) return;
    const screenPos = this.worldToScreen(
      bone._wx,
      bone._wy,
      input.viewportWidth,
      input.viewportHeight,
      input.camera,
      input.scale,
    );
    const totalScaleX = attachment.scaleX * bone.scaleX;
    const totalScaleY = attachment.scaleY * bone.scaleY;
    const width = attachment.width * Math.abs(totalScaleX) * input.camera.zoom * input.scale * 0.5;
    const height = attachment.height * Math.abs(totalScaleY) * input.camera.zoom * input.scale * 0.5;
    const offsetX = attachment.x * input.camera.zoom * input.scale;
    const offsetY = attachment.y * input.camera.zoom * input.scale;

    this.ctx.save();
    this.ctx.translate(screenPos.x, screenPos.y);
    this.ctx.rotate((bone._wrot * Math.PI) / 180);
    this.ctx.rotate((attachment.rotation * Math.PI) / 180);
    this.ctx.scale(totalScaleX < 0 ? -1 : 1, totalScaleY < 0 ? -1 : 1);
    this.ctx.drawImage(image, offsetX - width / 2, offsetY - height / 2, width, height);
    this.ctx.restore();
  }

  private drawDimOverlay(viewportWidth: number, viewportHeight: number) {
    if (!this.ctx) return;

    this.ctx.save();
    this.ctx.globalCompositeOperation = "source-atop";
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
    this.ctx.fillRect(0, 0, viewportWidth, viewportHeight);
    this.ctx.restore();
  }

  render(input: RenderInput) {
    if (!this.canvas || !this.ctx) return;

    this.ctx.clearRect(0, 0, input.viewportWidth, input.viewportHeight);
    this.drawBackground(input.project, input.viewportWidth, input.viewportHeight);

    const bones = sampleBonesAtFrame(input.project, input.frame);
    const drawables = resolveSceneDrawables(input.project, bones);

    for (const drawable of drawables) {
      this.drawAttachment(drawable.attachment, drawable.bone, input);
    }

    if (input.dimmed) {
      this.drawDimOverlay(input.viewportWidth, input.viewportHeight);
    }
  }
}
