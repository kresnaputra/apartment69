import normalManifest from "@/character/arka/normal/spritesheets-manifest.json?url";
import type { CharacterDefinition } from "@/types/novel";

export const arkaBundleRegistry = {
  "arka-normal": normalManifest,
} as const;

export const arkaCharacter: CharacterDefinition = {
  id: "arka",
  displayName: "Arka",
  defaultBundleId: "arka-normal",
  bundleIdByEmotion: {
    neutral: "arka-normal",
  },
  defaultEmotion: "neutral",
  defaultPosition: "center",
  defaultEnterFrom: "right",
  defaultXOffset: 0,
  defaultYOffset: 0,
  defaultMoveDuration: 420,
  defaultMoveEasing: "ease-in-out",
  defaultX: 0.52,
  defaultY: 0,
  defaultScale: 1.08,
  defaultOpacity: 1,
  defaultFrame: 0,
  defaultFps: 24,
  defaultLoop: true,
};
