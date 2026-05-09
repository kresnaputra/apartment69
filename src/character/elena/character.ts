import type { CharacterDefinition } from "@/types/novel";
import { isMobileDevice } from "@/lib/utils/deviceDetection";
import elenaDefaultSbnUrl from "@/character/elena/elena-normal.sbn?url";
import elenaTalkSbnUrl from "@/character/elena/elena-normal-talk.sbn?url";

export const elenaBundleRegistry = {
  "elena-normal": elenaDefaultSbnUrl,
  "elena-talk": elenaTalkSbnUrl,
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
  defaultXOffset: 0,
  defaultYOffset: 0,
  defaultMoveDuration: 520,
  defaultMoveEasing: "ease-in-out",
  defaultX: 0,
  defaultY: -150,
  defaultScale: isMobileDevice() ? 2.5 : 2.9,
  defaultOpacity: 1,
  defaultFrame: 0,
  defaultFps: 24,
  defaultLoop: true,
};
