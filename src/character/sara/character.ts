import type { CharacterDefinition } from "@/types/novel";
import { isMobileDevice } from "@/lib/utils/deviceDetection";
import saraDefaultSbnUrl from "@/character/sara/sara-normal.sbn?url";
import saraTalkSbnUrl from "@/character/sara/sara-normal-talk.sbn?url";

export const saraBundleRegistry = {
  "sara-normal": saraDefaultSbnUrl,
  "sara-talk": saraTalkSbnUrl,
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
  defaultScale: isMobileDevice() ? 2.5 : 2.9,
  defaultOpacity: 0.96,
  defaultFrame: 0,
  defaultFps: 24,
  defaultLoop: true,
};
