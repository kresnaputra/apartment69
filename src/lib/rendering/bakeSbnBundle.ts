import type { LoadedBakedSbnCharacterBundle } from "@/types/characterBundle";
import type { LoadedSbnBundle } from "@/types/sbn";
import { fitCameraToScene } from "@/lib/sbn/sampling";
import { CanvasSbnRenderer } from "./canvasSbnRenderer";

const BAKED_FRAME_WIDTH = 180;
const MAX_BAKED_FRAMES = 60;
const MAX_ATLAS_SIZE = 4096;

const createCanvas = (width: number, height: number) => {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  return canvas;
};

const getBakedSourceFrames = (duration: number) => {
  const safeDuration = Math.max(1, Math.floor(duration));
  const bakedCount = Math.min(MAX_BAKED_FRAMES, safeDuration);

  if (bakedCount === safeDuration) {
    return Array.from({ length: safeDuration }, (_, index) => index);
  }

  return Array.from({ length: bakedCount }, (_, index) =>
    Math.min(safeDuration - 1, Math.round((index / Math.max(1, bakedCount - 1)) * (safeDuration - 1))),
  );
};

export const bakeSbnBundle = (
  bundleId: string,
  bundle: LoadedSbnBundle,
  preferredAspectRatio: number,
): LoadedBakedSbnCharacterBundle | null => {
  if (typeof document === "undefined") return null;

  const renderer = new CanvasSbnRenderer();
  const sourceCanvas = createCanvas(
    BAKED_FRAME_WIDTH,
    BAKED_FRAME_WIDTH / Math.max(0.1, preferredAspectRatio),
  );
  const frameSize = {
    w: sourceCanvas.width,
    h: sourceCanvas.height,
  };
  const bakeCamera = fitCameraToScene(bundle.project, frameSize.w, frameSize.h);
  const columns = Math.max(1, Math.floor(MAX_ATLAS_SIZE / frameSize.w));
  const rows = Math.max(1, Math.floor(MAX_ATLAS_SIZE / frameSize.h));
  const framesPerAtlas = Math.max(1, columns * rows);
  const sourceFrames = getBakedSourceFrames(bundle.project.duration);
  const atlases: HTMLCanvasElement[] = [];
  const frames: LoadedBakedSbnCharacterBundle["frames"] = [];

  renderer.attach(sourceCanvas);
  renderer.resize(frameSize.w, frameSize.h, 1, false);

  sourceFrames.forEach((sourceFrame, bakedIndex) => {
    const atlasIndex = Math.floor(bakedIndex / framesPerAtlas);
    const indexInAtlas = bakedIndex % framesPerAtlas;
    const x = (indexInAtlas % columns) * frameSize.w;
    const y = Math.floor(indexInAtlas / columns) * frameSize.h;

    if (!atlases[atlasIndex]) {
      const remainingFrames = sourceFrames.length - atlasIndex * framesPerAtlas;
      const usedRows = Math.ceil(Math.min(framesPerAtlas, remainingFrames) / columns);
      atlases[atlasIndex] = createCanvas(columns * frameSize.w, usedRows * frameSize.h);
    }

    renderer.render({
      project: bundle.project,
      frame: sourceFrame,
      scale: 1,
      camera: bakeCamera,
      viewportWidth: frameSize.w,
      viewportHeight: frameSize.h,
    });

    const atlasContext = atlases[atlasIndex].getContext("2d");
    if (!atlasContext) return;

    atlasContext.drawImage(sourceCanvas, x, y);
    frames.push({ atlasIndex, x, y, w: frameSize.w, h: frameSize.h });
  });

  return {
    kind: "baked-sbn",
    id: bundleId,
    fps: Math.max(1, bundle.project.fps ?? 24),
    totalFrames: Math.max(1, bundle.project.duration),
    bakedFrameCount: Math.max(1, frames.length),
    frameSize,
    frames,
    atlases,
    preferredAspectRatio,
  };
};
