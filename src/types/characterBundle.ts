import type { LoadedSbnBundle, SceneBounds } from "@/types/sbn";
import type { LoadedSpritesheetBundle } from "@/types/spritesheet";

export type LoadedSbnCharacterBundle = {
  kind: "sbn";
  preferredCamera: SceneBounds;
  preferredAspectRatio: number;
} & LoadedSbnBundle;

export type LoadedCharacterBundle =
  | ({ kind: "spritesheet" } & LoadedSpritesheetBundle)
  | LoadedSbnCharacterBundle;

export const getCharacterBundleTotalFrames = (bundle: LoadedCharacterBundle) => {
  if (bundle.kind === "sbn") {
    return Math.max(1, bundle.project.duration);
  }

  return Math.max(1, bundle.totalFrames);
};

export const getCharacterBundleFps = (bundle: LoadedCharacterBundle) => {
  if (bundle.kind === "sbn") {
    return Math.max(1, bundle.project.fps ?? 24);
  }

  return Math.max(1, bundle.fps);
};
