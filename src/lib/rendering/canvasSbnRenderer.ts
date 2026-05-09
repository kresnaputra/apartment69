import { resolveSceneDrawables, sampleBonesAtFrame } from "@/lib/sbn/sampling";
import type { GraphicsQuality } from "@/lib/runtime/graphicsSettings";
import type { SceneBounds, SbnAttachment, SbnProject, WorldBone } from "@/types/sbn";

const CROPPED_IMAGE_GUTTER_PX = 2;

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
  private static paddedImageCache = new Map<string, HTMLCanvasElement>();

  attach(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    if (!this.ctx) {
      throw new Error("Canvas 2D context tidak tersedia.");
    }
  }

  resize(
    width: number,
    height: number,
    resolutionScale = 1,
    allowHighResolution = false,
    graphicsQuality: GraphicsQuality = "balanced",
  ) {
    if (!this.canvas || !this.ctx || width <= 0 || height <= 0) return;

    const navigatorWithMemory = navigator as Navigator & { deviceMemory?: number };
    const isSmallViewport = Math.min(window.innerWidth, window.innerHeight) < 700;
    const isLowMemoryDevice = (navigatorWithMemory.deviceMemory ?? 8) <= 4;
    const croppedImagePixelRatio = (() => {
      if (graphicsQuality === "performance") return isSmallViewport ? 1.85 : 2;
      if (graphicsQuality === "high") return isSmallViewport ? 3.5 : 3.25;
      return isLowMemoryDevice ? 2.25 : isSmallViewport ? 3 : 3.25;
    })();
    const defaultPixelRatio = (() => {
      if (graphicsQuality === "performance") return isSmallViewport ? 1.75 : 2;
      if (graphicsQuality === "high") return isSmallViewport ? 3 : 2.75;
      return isSmallViewport ? 2.75 : isLowMemoryDevice ? 2 : 2.5;
    })();
    const maxPixelRatio = allowHighResolution
      ? croppedImagePixelRatio
      : defaultPixelRatio;
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

  private getPaddedImage(src: string, image: HTMLImageElement, padding: number) {
    const cacheKey = `${src}:${padding}`;
    const cached = CanvasSbnRenderer.paddedImageCache.get(cacheKey);
    if (cached) return cached;

    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth + padding * 2;
    canvas.height = image.naturalHeight + padding * 2;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(image, padding, padding);
    }
    CanvasSbnRenderer.paddedImageCache.set(cacheKey, canvas);
    return canvas;
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
    const pixelScaleX = Math.abs(totalScaleX) * input.camera.zoom * input.scale * 0.5;
    const pixelScaleY = Math.abs(totalScaleY) * input.camera.zoom * input.scale * 0.5;
    const cropBounds = attachment.imageIsCropped ? attachment.opaqueBounds : undefined;
    const cropGutter = cropBounds ? CROPPED_IMAGE_GUTTER_PX : 0;
    const source = cropBounds
      ? this.getPaddedImage(attachment.imageData, image, cropGutter)
      : image;
    const originalWidth = attachment.width * pixelScaleX;
    const originalHeight = attachment.height * pixelScaleY;
    const width = ((cropBounds?.width ?? attachment.width) + cropGutter * 2) * pixelScaleX;
    const height = ((cropBounds?.height ?? attachment.height) + cropGutter * 2) * pixelScaleY;
    const offsetX = attachment.x * input.camera.zoom * input.scale;
    const offsetY = attachment.y * input.camera.zoom * input.scale;
    const cropOffsetX = ((cropBounds?.x ?? 0) - cropGutter) * pixelScaleX;
    const cropOffsetY = ((cropBounds?.y ?? 0) - cropGutter) * pixelScaleY;

    this.ctx.save();
    this.ctx.translate(screenPos.x, screenPos.y);
    this.ctx.rotate((bone._wrot * Math.PI) / 180);
    this.ctx.rotate((attachment.rotation * Math.PI) / 180);
    this.ctx.scale(totalScaleX < 0 ? -1 : 1, totalScaleY < 0 ? -1 : 1);
    this.ctx.drawImage(
      source,
      offsetX - originalWidth / 2 + cropOffsetX,
      offsetY - originalHeight / 2 + cropOffsetY,
      width,
      height,
    );
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
