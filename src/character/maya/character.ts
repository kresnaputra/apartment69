import { isMobileDevice } from "@/lib/utils/deviceDetection";
import type { CharacterDefinition } from "@/types/novel";

export const mayaBundleRegistry = {
  "maya-talk": "/characters/maya/normal/spritesheets-manifest.json",
  "maya-normal": "/characters/maya/talk/spritesheets-manifest.json",
  "maya-sad": "/characters/maya/sad/spritesheets-manifest.json",
  "maya-sad-talk": "/characters/maya/sad-talk/spritesheets-manifest.json",
  "maya-blush": "/characters/maya/blush-talk/spritesheets-manifest.json",
  "maya-blush-talk": "/characters/maya/blush/spritesheets-manifest.json",
} as const;

export const mayaCharacter: CharacterDefinition = {
  id: "maya",
  displayName: "Maya",
  defaultBundleId: "maya-normal",
  talkingBundleId: "maya-talk",
  talkingBundleIdByEmotion: {
    sad: "maya-sad-talk",
    blush: "maya-blush-talk",
  },
  bundleIdByEmotion: {
    neutral: "maya-normal",
    sad: "maya-sad",
    blush: "maya-blush",
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
  defaultScale: isMobileDevice() ? 2.6 : 2.8,
  defaultOpacity: 1,
  defaultFrame: 0,
  defaultFps: 24,
  defaultLoop: true,
};
