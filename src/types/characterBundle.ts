import type { LoadedSbnBundle, SceneBounds } from "@/types/sbn";
import type { LoadedSpritesheetBundle } from "@/types/spritesheet";

export type LoadedSbnCharacterBundle = {
  kind: "sbn";
  preferredCamera: SceneBounds;
  preferredAspectRatio: number;
} & LoadedSbnBundle;

export type BakedSbnFrame = {
  atlasIndex: number;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type LoadedBakedSbnCharacterBundle = {
  kind: "baked-sbn";
  id: string;
  fps: number;
  totalFrames: number;
  bakedFrameCount: number;
  frameSize: { w: number; h: number };
  frames: BakedSbnFrame[];
  atlases: HTMLCanvasElement[];
  preferredAspectRatio: number;
};

export type LoadedCharacterBundle =
  | ({ kind: "spritesheet" } & LoadedSpritesheetBundle)
  | LoadedBakedSbnCharacterBundle
  | LoadedSbnCharacterBundle;

export const getCharacterBundleTotalFrames = (bundle: LoadedCharacterBundle) => {
  if (bundle.kind === "sbn") {
    return Math.max(1, bundle.project.duration);
  }

  if (bundle.kind === "baked-sbn") {
    return Math.max(1, bundle.totalFrames);
  }

  return Math.max(1, bundle.totalFrames);
};

export const getCharacterBundleFps = (bundle: LoadedCharacterBundle) => {
  if (bundle.kind === "sbn") {
    return Math.max(1, bundle.project.fps ?? 24);
  }

  if (bundle.kind === "baked-sbn") {
    return Math.max(1, bundle.fps);
  }

  return Math.max(1, bundle.fps);
};
