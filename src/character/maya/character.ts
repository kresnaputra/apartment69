import { isMobileDevice } from "@/lib/utils/deviceDetection";
import type { CharacterDefinition } from "@/types/novel";

export const mayaBundleRegistry = {
  "maya-normal": "/characters/maya/maya-default/spritesheets-manifest.json",
  "maya-talk": "/characters/maya/maya-talk/spritesheets-manifest.json",
} as const;

export const mayaCharacter: CharacterDefinition = {
  id: "maya",
  displayName: "Maya",
  defaultBundleId: "maya-normal",
  talkingBundleId: "maya-talk",
  talkingBundleIdByEmotion: {
    sad: "maya-talk",
    blush: "maya-talk",
    angry: "maya-talk",
    surprised: "maya-talk",
  },
  bundleIdByEmotion: {
    neutral: "maya-normal",
    sad: "maya-normal",
    blush: "maya-normal",
    angry: "maya-normal",
    surprised: "maya-normal",
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
  defaultScale: isMobileDevice() ? 2.6 : 3,
  defaultOpacity: 1,
  defaultFrame: 0,
  defaultFps: 24,
  defaultLoop: true,
};
