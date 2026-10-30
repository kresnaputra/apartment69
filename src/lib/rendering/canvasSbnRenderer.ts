import { resolveSceneDrawables, sampleAttachmentOpacityAtFrame, sampleBonesAtFrame, sampleMeshDeformAtFrame } from "@/lib/sbn/sampling";
import type { GraphicsQuality } from "@/lib/runtime/graphicsSettings";
import { rasterizeMesh } from "@/lib/rendering/meshGlRasterizer";
import type { SceneBounds, SbnAttachment, SbnProject, WorldBone } from "@/types/sbn";

const CROPPED_IMAGE_GUTTER_PX = 2;
const MESH_SOURCE_PAD_TEXELS = 1;

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
  private meshLayer: CanvasRenderingContext2D | null = null;
  private static imageCache = new Map<string, HTMLImageElement>();
  private static loadingCache = new Map<string, Promise<HTMLImageElement>>();
  private static paddedImageCache = new WeakMap<HTMLImageElement, Map<number, HTMLCanvasElement>>();

  attach(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    if (!this.ctx) {
      throw new Error("Canvas 2D context tidak tersedia.");
    }
  }

  dispose() {
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.canvas.width = 0;
      this.canvas.height = 0;
    }

    this.canvas = null;
    this.ctx = null;
    this.backingWidth = 0;
    this.backingHeight = 0;
    this.pixelRatio = 1;
    if (this.meshLayer) {
      this.meshLayer.canvas.width = 0;
      this.meshLayer.canvas.height = 0;
      this.meshLayer = null;
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

  private getPaddedImage(image: HTMLImageElement, padding: number) {
    let imageCache = CanvasSbnRenderer.paddedImageCache.get(image);
    if (!imageCache) {
      imageCache = new Map();
      CanvasSbnRenderer.paddedImageCache.set(image, imageCache);
    }
    const cached = imageCache.get(padding);
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
    imageCache.set(padding, canvas);
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

  private drawTexturedTriangle(
    ctx: CanvasRenderingContext2D,
    sx0: number, sy0: number,
    sx1: number, sy1: number,
    sx2: number, sy2: number,
    tu0: number, tv0: number,
    tu1: number, tv1: number,
    tu2: number, tv2: number,
    image: HTMLImageElement,
  ) {
    const det = tu0 * (tv1 - tv2) + tu1 * (tv2 - tv0) + tu2 * (tv0 - tv1);
    if (Math.abs(det) < 1e-10) return;

    const a = (sx0 * (tv1 - tv2) + sx1 * (tv2 - tv0) + sx2 * (tv0 - tv1)) / det;
    const b = (sy0 * (tv1 - tv2) + sy1 * (tv2 - tv0) + sy2 * (tv0 - tv1)) / det;
    const c = (tu0 * (sx1 - sx2) + tu1 * (sx2 - sx0) + tu2 * (sx0 - sx1)) / det;
    const d = (tu0 * (sy1 - sy2) + tu1 * (sy2 - sy0) + tu2 * (sy0 - sy1)) / det;
    const e = (sx0 * (tu1 * tv2 - tu2 * tv1) - sx1 * (tu0 * tv2 - tu2 * tv0) + sx2 * (tu0 * tv1 - tu1 * tv0)) / det;
    const f = (sy0 * (tu1 * tv2 - tu2 * tv1) - sy1 * (tu0 * tv2 - tu2 * tv0) + sy2 * (tu0 * tv1 - tu1 * tv0)) / det;

    // Crop drawImage to only the triangle's UV bounding box — avoids drawing the full image per triangle
    const srcX = Math.max(0, Math.floor(Math.min(tu0, tu1, tu2)) - MESH_SOURCE_PAD_TEXELS);
    const srcY = Math.max(0, Math.floor(Math.min(tv0, tv1, tv2)) - MESH_SOURCE_PAD_TEXELS);
    const srcX2 = Math.min(image.naturalWidth, Math.ceil(Math.max(tu0, tu1, tu2)) + MESH_SOURCE_PAD_TEXELS);
    const srcY2 = Math.min(image.naturalHeight, Math.ceil(Math.max(tv0, tv1, tv2)) + MESH_SOURCE_PAD_TEXELS);
    const srcW = srcX2 - srcX;
    const srcH = srcY2 - srcY;
    if (srcW <= 0 || srcH <= 0) return;

    // Exact (unexpanded) clip: neighbouring triangles get complementary anti-aliased coverage on their
    // shared edge, which the caller sums back to full coverage with "lighter" compositing.
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(sx0, sy0);
    ctx.lineTo(sx1, sy1);
    ctx.lineTo(sx2, sy2);
    ctx.closePath();
    ctx.clip();
    // Adjust translation for source crop offset
    ctx.transform(a, b, c, d, e + a * srcX + c * srcY, f + b * srcX + d * srcY);
    ctx.drawImage(image, srcX, srcY, srcW, srcH, 0, 0, srcW, srcH);
    ctx.restore();
  }

  private drawMeshAttachment(
    attachment: SbnAttachment,
    bone: WorldBone,
    image: HTMLImageElement,
    input: RenderInput,
    meshDeforms: Record<string, Array<{ x: number; y: number }>>,
    opacity: number,
  ) {
    if (!this.ctx || !attachment.meshVertices || !attachment.meshTriangles) return;

    const { viewportWidth, viewportHeight, camera, scale } = input;
    const totalScaleX = attachment.scaleX * bone.scaleX;
    const totalScaleY = attachment.scaleY * bone.scaleY;
    const totalRotRad = ((bone._wrot + attachment.rotation) * Math.PI) / 180;
    const cosR = Math.cos(totalRotRad);
    const sinR = Math.sin(totalRotRad);

    const deformKey = `${attachment.slotId}:${attachment.name}`;
    const deformCandidate = meshDeforms[deformKey];
    const deformedPositions =
      deformCandidate?.length === attachment.meshVertices.length ? deformCandidate : undefined;

    // Compute screen position for every mesh vertex
    const screenVerts = attachment.meshVertices.map((v, i) => {
      const vx = deformedPositions ? deformedPositions[i].x : v.x;
      const vy = deformedPositions ? deformedPositions[i].y : v.y;
      // Vertex in bone-rotated world-unit space (image pixels * 0.5 = world unit)
      const lx = attachment.x + vx * totalScaleX * 0.5;
      const ly = attachment.y + vy * totalScaleY * 0.5;
      const worldX = bone._wx + lx * cosR - ly * sinR;
      const worldY = bone._wy + lx * sinR + ly * cosR;
      return this.worldToScreen(worldX, worldY, viewportWidth, viewportHeight, camera, scale);
    });

    // Draw the triangles into a separate layer with additive ("lighter") blending, the way a GPU
    // rasterises a mesh: the partial edge coverage of two neighbouring triangles adds up to exactly one,
    // so there is neither a see-through seam nor a doubled band where semi-transparent texels overlap.
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const v of screenVerts) {
      minX = Math.min(minX, v.x);
      minY = Math.min(minY, v.y);
      maxX = Math.max(maxX, v.x);
      maxY = Math.max(maxY, v.y);
    }
    const dpr = this.pixelRatio;
    const layerX = Math.floor(minX * dpr) - 1;
    const layerY = Math.floor(minY * dpr) - 1;
    const layerWidth = Math.ceil(maxX * dpr) + 1 - layerX;
    const layerHeight = Math.ceil(maxY * dpr) + 1 - layerY;
    if (layerWidth <= 0 || layerHeight <= 0) return;

    const glLayer = this.rasterizeMeshOnGpu(attachment, image, screenVerts, dpr, layerX, layerY, layerWidth, layerHeight);
    if (glLayer) {
      this.ctx.save();
      if (opacity < 1) this.ctx.globalAlpha = opacity;
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.drawImage(glLayer, 0, 0, layerWidth, layerHeight, layerX, layerY, layerWidth, layerHeight);
      this.ctx.restore();
      return;
    }

    // Fallback without WebGL2: Canvas 2D, one clipped drawImage per triangle.
    const layer = this.getMeshLayer(layerWidth, layerHeight);
    if (!layer) return;
    layer.setTransform(1, 0, 0, 1, 0, 0);
    layer.clearRect(0, 0, layerWidth, layerHeight);
    layer.setTransform(dpr, 0, 0, dpr, -layerX, -layerY);
    layer.globalCompositeOperation = "lighter";
    layer.imageSmoothingEnabled = true;
    layer.imageSmoothingQuality = "high";

    for (const tri of attachment.meshTriangles) {
      const [i0, i1, i2] = tri;
      const sv0 = screenVerts[i0];
      const sv1 = screenVerts[i1];
      const sv2 = screenVerts[i2];
      const mv0 = attachment.meshVertices[i0];
      const mv1 = attachment.meshVertices[i1];
      const mv2 = attachment.meshVertices[i2];

      this.drawTexturedTriangle(
        layer,
        sv0.x, sv0.y,
        sv1.x, sv1.y,
        sv2.x, sv2.y,
        mv0.u * image.naturalWidth, mv0.v * image.naturalHeight,
        mv1.u * image.naturalWidth, mv1.v * image.naturalHeight,
        mv2.u * image.naturalWidth, mv2.v * image.naturalHeight,
        image,
      );
    }

    this.ctx.save();
    if (opacity < 1) this.ctx.globalAlpha = opacity;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.drawImage(layer.canvas, 0, 0, layerWidth, layerHeight, layerX, layerY, layerWidth, layerHeight);
    this.ctx.restore();
  }

  private rasterizeMeshOnGpu(
    attachment: SbnAttachment,
    image: HTMLImageElement,
    screenVerts: Array<{ x: number; y: number }>,
    dpr: number,
    layerX: number,
    layerY: number,
    layerWidth: number,
    layerHeight: number,
  ) {
    const meshVertices = attachment.meshVertices;
    const meshTriangles = attachment.meshTriangles;
    if (!meshVertices || !meshTriangles || meshVertices.length > 0xffff) return null;

    const positions = new Float32Array(screenVerts.length * 2);
    const uvs = new Float32Array(meshVertices.length * 2);
    screenVerts.forEach((v, i) => {
      positions[i * 2] = v.x * dpr - layerX;
      positions[i * 2 + 1] = v.y * dpr - layerY;
      uvs[i * 2] = meshVertices[i].u;
      uvs[i * 2 + 1] = meshVertices[i].v;
    });
    const indices = new Uint16Array(meshTriangles.length * 3);
    meshTriangles.forEach((tri, i) => indices.set(tri, i * 3));

    return rasterizeMesh(image, positions, uvs, indices, layerWidth, layerHeight);
  }

  private getMeshLayer(width: number, height: number) {
    if (!this.meshLayer) {
      this.meshLayer = document.createElement("canvas").getContext("2d");
      if (!this.meshLayer) return null;
    }
    const { canvas } = this.meshLayer;
    if (canvas.width < width || canvas.height < height) {
      canvas.width = Math.max(canvas.width, width);
      canvas.height = Math.max(canvas.height, height);
    }
    return this.meshLayer;
  }

  private drawAttachment(
    attachment: SbnAttachment,
    bone: WorldBone,
    input: RenderInput,
    meshDeforms: Record<string, Array<{ x: number; y: number }>> = {},
  ) {
    if (!attachment.imageData || !this.ctx) return;

    const opacity = sampleAttachmentOpacityAtFrame(input.project, attachment, input.frame);
    if (opacity === 0) return;

    const image = this.getImage(attachment.imageData);
    if (!image) return;

    if (attachment.type === "mesh" && attachment.meshVertices && attachment.meshTriangles) {
      this.drawMeshAttachment(attachment, bone, image, input, meshDeforms, opacity);
      return;
    }

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
      ? this.getPaddedImage(image, cropGutter)
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
    if (opacity < 1) this.ctx.globalAlpha = opacity;
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
    const meshDeforms = sampleMeshDeformAtFrame(input.project, input.frame);

    for (const drawable of drawables) {
      this.drawAttachment(drawable.attachment, drawable.bone, input, meshDeforms);
    }

    if (input.dimmed) {
      this.drawDimOverlay(input.viewportWidth, input.viewportHeight);
    }
  }
}
