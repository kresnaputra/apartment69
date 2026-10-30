import type { CharacterDefinition } from "@/types/novel";
import { isMobileDevice } from "@/lib/utils/deviceDetection";
import saraDefaultSbnUrl from "@/character/sara/sara-normal.sbn?url";
import saraTalkSbnUrl from "@/character/sara/sara-normal-talk.sbn?url";
import saraAngrySbnUrl from "@/character/sara/sara-angry.sbn?url";
import saraAngryTalkSbnUrl from "@/character/sara/sara-angry-talk.sbn?url";
import saraBlushSbnUrl from "@/character/sara/sara-blush.sbn?url";
import saraBlushTalkSbnUrl from "@/character/sara/sara-blush-talk.sbn?url";
import saraSadSbnUrl from "@/character/sara/sara-sad.sbn?url";
import saraSadTalkSbnUrl from "@/character/sara/sara-sad-talk.sbn?url";
import saraSmileSbnUrl from "@/character/sara/sara-smile.sbn?url";
import saraSmileTalkSbnUrl from "@/character/sara/sara-smile-talk.sbn?url";

export const saraBundleRegistry = {
  "sara-normal": saraDefaultSbnUrl,
  "sara-talk": saraTalkSbnUrl,
  "sara-angry": saraAngrySbnUrl,
  "sara-angry-talk": saraAngryTalkSbnUrl,
  "sara-blush": saraBlushSbnUrl,
  "sara-blush-talk": saraBlushTalkSbnUrl,
  "sara-sad": saraSadSbnUrl,
  "sara-sad-talk": saraSadTalkSbnUrl,
  "sara-smile": saraSmileSbnUrl,
  "sara-smile-talk": saraSmileTalkSbnUrl,
} as const;

export const saraCharacter: CharacterDefinition = {
  id: "sara",
  displayName: "Sarah",
  defaultBundleId: "sara-normal",
  talkingBundleId: "sara-talk",
  bundleIdByEmotion: {
    neutral: "sara-normal",
    angry: "sara-angry",
    blush: "sara-blush",
    sad: "sara-sad",
    smile: "sara-smile",
  },
  talkingBundleIdByEmotion: {
    neutral: "sara-talk",
    angry: "sara-angry-talk",
    blush: "sara-blush-talk",
    sad: "sara-sad-talk",
    smile: "sara-smile-talk",
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
