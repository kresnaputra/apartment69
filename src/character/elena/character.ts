import type { CharacterDefinition } from "@/types/novel";
import { isMobileDevice } from "@/lib/utils/deviceDetection";
import elenaDefaultSbnUrl from "@/character/elena/elena-normal.sbn?url";
import elenaTalkSbnUrl from "@/character/elena/elena-normal-talk.sbn?url";
import elenaAngrySbnUrl from "@/character/elena/elena-angry.sbn?url";
import elenaAngryTalkSbnUrl from "@/character/elena/elena-angry-talk.sbn?url";
import elenaBlushSbnUrl from "@/character/elena/elena-blush.sbn?url";
import elenaBlushTalkSbnUrl from "@/character/elena/elena-blush-talk.sbn?url";
import elenaSmileSbnUrl from "@/character/elena/elena-smile.sbn?url";
import elenaSmileTalkSbnUrl from "@/character/elena/elena-smile-talk.sbn?url";
import elenaDrunkSbnUrl from "@/character/elena/elena-drunk.sbn?url";
import elenaDrunkTalkSbnUrl from "@/character/elena/elena-drunk-talk.sbn?url";
import elenaDrunkAngrySbnUrl from "@/character/elena/elena-drunk-angry.sbn?url";
import elenaDrunkAngryTalkSbnUrl from "@/character/elena/elena-drunk-angry-talk.sbn?url";

export const elenaBundleRegistry = {
  "elena-normal": elenaDefaultSbnUrl,
  "elena-talk": elenaTalkSbnUrl,
  "elena-angry": elenaAngrySbnUrl,
  "elena-angry-talk": elenaAngryTalkSbnUrl,
  "elena-blush": elenaBlushSbnUrl,
  "elena-blush-talk": elenaBlushTalkSbnUrl,
  "elena-smile": elenaSmileSbnUrl,
  "elena-smile-talk": elenaSmileTalkSbnUrl,
  "elena-drunk": elenaDrunkSbnUrl,
  "elena-drunk-talk": elenaDrunkTalkSbnUrl,
  "elena-drunk-angry": elenaDrunkAngrySbnUrl,
  "elena-drunk-angry-talk": elenaDrunkAngryTalkSbnUrl,
} as const;

export const elenaCharacter: CharacterDefinition = {
  id: "elena",
  displayName: "Elena",
  defaultBundleId: "elena-normal",
  talkingBundleId: "elena-talk",
  bundleIdByEmotion: {
    neutral: "elena-normal",
    angry: "elena-angry",
    blush: "elena-blush",
    smile: "elena-smile",
    drunk: "elena-drunk",
    drunkAngry: "elena-drunk-angry",
  },
  talkingBundleIdByEmotion: {
    neutral: "elena-talk",
    angry: "elena-angry-talk",
    blush: "elena-blush-talk",
    smile: "elena-smile-talk",
    drunk: "elena-drunk-talk",
    drunkAngry: "elena-drunk-angry-talk",
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
