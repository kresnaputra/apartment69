import type { CharacterDefinition } from "@/types/novel";
import { isMobileDevice } from "@/lib/utils/deviceDetection";

export const arthurBundleRegistry = {
  "arthur-normal": "/characters/arthur/normal/spritesheets-manifest.json",
  "arthur-talk": "/characters/arthur/normal-talk/spritesheets-manifest.json",
  "arthur-angry": "/characters/arthur/angry/spritesheets-manifest.json",
  "arthur-angry-talk": "/characters/arthur/angry-talk/spritesheets-manifest.json",
} as const;

export const arthurCharacter: CharacterDefinition = {
  id: "arthur",
  displayName: "Arthur",
  defaultBundleId: "arthur-normal",
  talkingBundleId: "arthur-talk",
  bundleIdByEmotion: {
    neutral: "arthur-normal",
    angry: "arthur-angry",
  },
  talkingBundleIdByEmotion: {
    neutral: "arthur-talk",
    angry: "arthur-angry-talk",
  },
  defaultEmotion: "neutral",
  defaultPosition: "left",
  defaultEnterFrom: "right",
  defaultXOffset: 0,
  defaultYOffset: 0,
  defaultMoveDuration: 520,
  defaultMoveEasing: "ease-in-out",
  defaultX: 0,
  defaultY: -150,
  defaultScale: isMobileDevice() ? 2.1 : 2.5,
  defaultOpacity: 1,
  defaultFrame: 0,
  defaultFps: 24,
  defaultLoop: true,
};
