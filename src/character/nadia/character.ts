import type { CharacterDefinition } from "@/types/novel";

export const nadiaBundleRegistry = {
  "nadia-normal": "/characters/nadia/normal/spritesheets-manifest.json",
  "nadia-talk": "/characters/nadia/talk/spritesheets-manifest.json",
} as const;

export const nadiaCharacter: CharacterDefinition = {
  id: "nadia",
  displayName: "Nadia",
  defaultBundleId: "nadia-normal",
  talkingBundleId: "nadia-talk",
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
  defaultY: -150,
  defaultScale: 2.4,
  defaultOpacity: 0.96,
  defaultFrame: 0,
  defaultFps: 24,
  defaultLoop: true,
};
