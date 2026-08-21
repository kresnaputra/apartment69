import type { CharacterDefinition } from "@/types/novel";
import nadiaNormalSbnUrl from "@/character/nadia/nadia-normal.sbn?url";
import nadiaNormalTalkSbnUrl from "@/character/nadia/nadia-normal-talk.sbn?url";
import nadiaSmileSbnUrl from "@/character/nadia/nadia-smile.sbn?url";
import nadiaSmileTalkSbnUrl from "@/character/nadia/nadia-smile-talk.sbn?url";
import nadiaBlushSbnUrl from "@/character/nadia/nadia-blush.sbn?url";
import nadiaBlushTalkSbnUrl from "@/character/nadia/nadia-blush-talk.sbn?url";
import nadiaAngrySbnUrl from "@/character/nadia/nadia-angry.sbn?url";
import nadiaAngryTalkSbnUrl from "@/character/nadia/nadia-angry-talk.sbn?url";
import { isMobileDevice } from "@/lib/utils/deviceDetection";

export const nadiaBundleRegistry = {
  "nadia-normal": nadiaNormalSbnUrl,
  "nadia-talk": nadiaNormalTalkSbnUrl,
  "nadia-smile": nadiaSmileSbnUrl,
  "nadia-smile-talk": nadiaSmileTalkSbnUrl,
  "nadia-blush": nadiaBlushSbnUrl,
  "nadia-blush-talk": nadiaBlushTalkSbnUrl,
  "nadia-angry": nadiaAngrySbnUrl,
  "nadia-angry-talk": nadiaAngryTalkSbnUrl,
} as const;

export const nadiaCharacter: CharacterDefinition = {
  id: "nadia",
  displayName: "Nadia",
  defaultBundleId: "nadia-normal",
  talkingBundleId: "nadia-talk",
  bundleIdByEmotion: {
    neutral: "nadia-normal",
    smile: "nadia-smile",
    blush: "nadia-blush",
    angry: "nadia-angry",
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
