import type { CharacterDefinition } from "@/types/novel";
import nadiaDefaultSbnUrl from "@/character/nadia/nadia-normal.sbn?url";
import nadiaTalkSbnUrl from "@/character/nadia/nadia-normal-talk.sbn?url";
import { isMobileDevice } from "@/lib/utils/deviceDetection";

export const nadiaBundleRegistry = {
  "nadia-normal": nadiaDefaultSbnUrl,
  "nadia-talk": nadiaTalkSbnUrl,
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
  defaultXOffset: 0,
  defaultYOffset: 0,
  defaultMoveDuration: 520,
  defaultMoveEasing: "ease-in-out",
  defaultX: 0.0,
  defaultY: -150,
  defaultScale: isMobileDevice() ? 2.5 : 2.9,
  defaultOpacity: 1,
  defaultFrame: 0,
  defaultFps: 24,
  defaultLoop: true,
};
