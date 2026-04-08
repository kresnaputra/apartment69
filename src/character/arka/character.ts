import type { CharacterDefinition } from "@/types/novel";

export const arkaBundleRegistry = {
  "arka-normal": "/characters/arka/normal/spritesheets-manifest.json",
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
  defaultXOffset: -0.05,
  defaultYOffset: 0,
  defaultMoveDuration: 420,
  defaultMoveEasing: "ease-in-out",
  defaultX: 0.25,
  defaultY: -200,
  defaultScale: 1.5,
  defaultOpacity: 1,
  defaultFrame: 0,
  defaultFps: 24,
  defaultLoop: true,
};
