import type { CharacterDefinition } from "@/types/novel";

export const elenaBundleRegistry = {
  "elena-normal": "/characters/elena/normal/spritesheets-manifest.json",
} as const;

export const elenaCharacter: CharacterDefinition = {
  id: "elena",
  displayName: "Elena",
  defaultBundleId: "elena-normal",
  bundleIdByEmotion: {
    neutral: "elena-normal",
  },
  defaultEmotion: "neutral",
  defaultPosition: "left",
  defaultEnterFrom: "right",
  defaultXOffset: 0.04,
  defaultYOffset: 0,
  defaultMoveDuration: 520,
  defaultMoveEasing: "ease-in-out",
  defaultX: 0.28,
  defaultY: -100,
  defaultScale: 2,
  defaultOpacity: 0.96,
  defaultFrame: 0,
  defaultFps: 24,
  defaultLoop: true,
};
