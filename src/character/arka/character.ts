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
  defaultPosition: "left",
  defaultEnterFrom: "left",
  defaultXOffset: 0,
  defaultYOffset: 0,
  defaultMoveDuration: 420,
  defaultMoveEasing: "ease-in-out",
  defaultX: 0.25,
  defaultY: -100,
  defaultScale: 1.08,
  defaultOpacity: 1,
  defaultFrame: 0,
  defaultFps: 24,
  defaultLoop: true,
};
