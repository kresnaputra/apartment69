import type { CharacterDefinition } from "@/types/novel";

export const saraBundleRegistry = {
  "sara-normal": "/characters/sara/normal/spritesheets-manifest.json",
  "sara-talk": "/characters/sara/talk/spritesheets-manifest.json",
} as const;

export const saraCharacter: CharacterDefinition = {
  id: "sara",
  displayName: "Sarah",
  defaultBundleId: "sara-normal",
  talkingBundleId: "sara-talk",
  bundleIdByEmotion: {
    neutral: "sara-normal",
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
