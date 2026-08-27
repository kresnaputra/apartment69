import type { CharacterDefinition } from "@/types/novel";
import nadiaNormalSbnUrl from "@/character/nadia/nadia-normal.sbn?url";
import nadiaNormalTalkSbnUrl from "@/character/nadia/nadia-normal-talk.sbn?url";
import nadiaSmileSbnUrl from "@/character/nadia/nadia-smile.sbn?url";
import nadiaSmileTalkSbnUrl from "@/character/nadia/nadia-smile-talk.sbn?url";
import nadiaBlushSbnUrl from "@/character/nadia/nadia-blush.sbn?url";
import nadiaBlushTalkSbnUrl from "@/character/nadia/nadia-blush-talk.sbn?url";
import nadiaAngrySbnUrl from "@/character/nadia/nadia-angry.sbn?url";
import nadiaAngryTalkSbnUrl from "@/character/nadia/nadia-angry-talk.sbn?url";
import nadiaTanktopNormalSbnUrl from "@/character/nadia/nadia-tanktop-normal.sbn?url";
import nadiaTanktopNormalTalkSbnUrl from "@/character/nadia/nadia-tanktop-normal-talk.sbn?url";
import nadiaTanktopSmileSbnUrl from "@/character/nadia/nadia-tanktop-smile.sbn?url";
import nadiaTanktopSmileTalkSbnUrl from "@/character/nadia/nadia-tanktop-smile-talk.sbn?url";
import nadiaTanktopBlushSbnUrl from "@/character/nadia/nadia-tanktop-blush.sbn?url";
import nadiaTanktopBlushTalkSbnUrl from "@/character/nadia/nadia-tanktop-blush-talk.sbn?url";
import nadiaTanktopAngrySbnUrl from "@/character/nadia/nadia-tanktop-angry.sbn?url";
import nadiaTanktopAngryTalkSbnUrl from "@/character/nadia/nadia-tanktop-angry-talk.sbn?url";
import nadiaTowelNormalSbnUrl from "@/character/nadia/nadia-towel-normal.sbn?url";
import nadiaTowelNormalTalkSbnUrl from "@/character/nadia/nadia-towel-normal-talk.sbn?url";
import nadiaTowelSmileSbnUrl from "@/character/nadia/nadia-towel-smile.sbn?url";
import nadiaTowelSmileTalkSbnUrl from "@/character/nadia/nadia-towel-smile-talk.sbn?url";
import nadiaTowelBlushSbnUrl from "@/character/nadia/nadia-towel-blush.sbn?url";
import nadiaTowelBlushTalkSbnUrl from "@/character/nadia/nadia-towel-blush-talk.sbn?url";
import nadiaTowelAngrySbnUrl from "@/character/nadia/nadia-towel-angry.sbn?url";
import nadiaTowelAngryTalkSbnUrl from "@/character/nadia/nadia-towel-angry-talk.sbn?url";
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
  "nadia-tanktop-normal": nadiaTanktopNormalSbnUrl,
  "nadia-tanktop-normal-talk": nadiaTanktopNormalTalkSbnUrl,
  "nadia-tanktop-smile": nadiaTanktopSmileSbnUrl,
  "nadia-tanktop-smile-talk": nadiaTanktopSmileTalkSbnUrl,
  "nadia-tanktop-blush": nadiaTanktopBlushSbnUrl,
  "nadia-tanktop-blush-talk": nadiaTanktopBlushTalkSbnUrl,
  "nadia-tanktop-angry": nadiaTanktopAngrySbnUrl,
  "nadia-tanktop-angry-talk": nadiaTanktopAngryTalkSbnUrl,
  "nadia-towel-normal": nadiaTowelNormalSbnUrl,
  "nadia-towel-normal-talk": nadiaTowelNormalTalkSbnUrl,
  "nadia-towel-smile": nadiaTowelSmileSbnUrl,
  "nadia-towel-smile-talk": nadiaTowelSmileTalkSbnUrl,
  "nadia-towel-blush": nadiaTowelBlushSbnUrl,
  "nadia-towel-blush-talk": nadiaTowelBlushTalkSbnUrl,
  "nadia-towel-angry": nadiaTowelAngrySbnUrl,
  "nadia-towel-angry-talk": nadiaTowelAngryTalkSbnUrl,
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
    tanktopNeutral: "nadia-tanktop-normal",
    tanktopSmile: "nadia-tanktop-smile",
    tanktopBlush: "nadia-tanktop-blush",
    tanktopAngry: "nadia-tanktop-angry",
  },
  talkingBundleIdByEmotion: {
    tanktopNeutral: "nadia-tanktop-normal-talk",
    tanktopSmile: "nadia-tanktop-smile-talk",
    tanktopBlush: "nadia-tanktop-blush-talk",
    tanktopAngry: "nadia-tanktop-angry-talk",
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
