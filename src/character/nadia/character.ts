import type { CharacterDefinition } from "@/types/novel";

export const nadiaBundleRegistry = {
  "nadia-normal": "/characters/nadia/normal/spritesheets-manifest.json",
} as const;

export const nadiaCharacter: CharacterDefinition = {
  id: "nadia",
  displayName: "Nadia",
  defaultBundleId: "nadia-normal",
  bundleIdByEmotion: {
    neutral: "nadia-normal",
  },
  defaultEmotion: "neutral",
  defaultPosition: "left",
  defaultEnterFrom: "right",
  defaultXOffset: 0.1,
  defaultYOffset: 0,
  defaultMoveDuration: 520,
  defaultMoveEasing: "ease-in-out",
  defaultX: 0.0,
  defaultY: -100,
  defaultScale: 2,
  defaultOpacity: 0.96,
  defaultFrame: 0,
  defaultFps: 24,
  defaultLoop: true,
};
