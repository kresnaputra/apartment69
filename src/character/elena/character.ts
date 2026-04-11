import type { CharacterDefinition } from "@/types/novel";

export const elenaBundleRegistry = {
  "elena-normal": "/characters/elena/normal/spritesheets-manifest.json",
  "elena-talk": "/characters/elena/talk/spritesheets-manifest.json",
} as const;

export const elenaCharacter: CharacterDefinition = {
  id: "elena",
  displayName: "Elena",
  defaultBundleId: "elena-normal",
  talkingBundleId: "elena-talk",
  bundleIdByEmotion: {
    neutral: "elena-normal",
  },
  defaultEmotion: "neutral",
  defaultPosition: "left",
  defaultEnterFrom: "right",
  defaultXOffset: 0.08,
  defaultYOffset: 0,
  defaultMoveDuration: 520,
  defaultMoveEasing: "ease-in-out",
  defaultX: 0,
  defaultY: -150,
  defaultScale: 2.4,
  defaultOpacity: 1,
  defaultFrame: 0,
  defaultFps: 24,
  defaultLoop: true,
};
