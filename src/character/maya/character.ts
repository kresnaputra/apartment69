import normalManifest from "@/character/maya/normal/spritesheets-manifest.json?url";
import type { CharacterDefinition } from "@/types/novel";

export const mayaBundleRegistry = {
  "maya-normal": normalManifest,
} as const;

export const mayaCharacter: CharacterDefinition = {
  id: "maya",
  displayName: "Maya",
  defaultBundleId: "maya-normal",
  bundleIdByEmotion: {
    neutral: "maya-normal",
  },
  defaultEmotion: "neutral",
  defaultPosition: "right",
  defaultEnterFrom: "left",
  defaultXOffset: 0.04,
  defaultYOffset: 0,
  defaultMoveDuration: 520,
  defaultMoveEasing: "ease-in-out",
  defaultX: 0.72,
  defaultY: -100,
  defaultScale: 2,
  defaultOpacity: 0.96,
  defaultFrame: 0,
  defaultFps: 24,
  defaultLoop: true,
};
