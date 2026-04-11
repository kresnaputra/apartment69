import type { CharacterDefinition } from "@/types/novel";

export const mayaBundleRegistry = {
  "maya-talk": "/characters/maya/normal/spritesheets-manifest.json",
  "maya-normal": "/characters/maya/talk/spritesheets-manifest.json",
} as const;

export const mayaCharacter: CharacterDefinition = {
  id: "maya",
  displayName: "Maya",
  defaultBundleId: "maya-normal",
  talkingBundleId: "maya-talk",
  bundleIdByEmotion: {
    neutral: "maya-normal",
  },
  defaultEmotion: "neutral",
  defaultPosition: "right",
  defaultEnterFrom: "left",
  defaultXOffset: 0,
  defaultYOffset: 0,
  defaultMoveDuration: 520,
  defaultMoveEasing: "ease-in-out",
  defaultX: 0,
  defaultY: -250,
  defaultScale: 2.8,
  defaultOpacity: 1,
  defaultFrame: 0,
  defaultFps: 24,
  defaultLoop: true,
};
