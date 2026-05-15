import { isMobileDevice } from "@/lib/utils/deviceDetection";
import type { CharacterDefinition } from "@/types/novel";
import mayaAngrySbnUrl from "@/character/maya/maya-angry.sbn?url";
import mayaAngryTalkSbnUrl from "@/character/maya/maya-angry-talk.sbn?url";
import mayaDefaultSbnUrl from "@/character/maya/maya-default.sbn?url";
import mayaTalkSbnUrl from "@/character/maya/maya-talk.sbn?url";
import mayaBlushSbnUrl from "@/character/maya/maya-blush.sbn?url";
import mayaBlushTalkSbnUrl from "@/character/maya/maya-blush-talk.sbn?url";
import mayaSadSbnUrl from "@/character/maya/maya-sad.sbn?url";
import mayaSadTalkSbnUrl from "@/character/maya/maya-sad-talk.sbn?url";
import mayaShockSbnUrl from "@/character/maya/maya-shock.sbn?url";
import mayaShockTalkSbnUrl from "@/character/maya/maya-shock-talk.sbn?url";
import mayaFallenSbnUrl from "@/character/maya/maya-fallen.sbn?url";

export const mayaBundleRegistry = {
  "maya-talk": mayaTalkSbnUrl,
  "maya-normal": mayaDefaultSbnUrl,
  "maya-sad": mayaSadSbnUrl,
  "maya-sad-talk": mayaSadTalkSbnUrl,
  "maya-blush": mayaBlushSbnUrl,
  "maya-blush-talk": mayaBlushTalkSbnUrl,
  "maya-angry": mayaAngrySbnUrl,
  "maya-angry-talk": mayaAngryTalkSbnUrl,
  "maya-shock": mayaShockSbnUrl,
  "maya-shock-talk": mayaShockTalkSbnUrl,
  "maya-fallen": mayaFallenSbnUrl,
} as const;

export const mayaCharacter: CharacterDefinition = {
  id: "maya",
  displayName: "Maya",
  defaultBundleId: "maya-normal",
  talkingBundleId: "maya-talk",
  talkingBundleIdByEmotion: {
    sad: "maya-sad-talk",
    blush: "maya-blush-talk",
    angry: "maya-angry-sbn",
    fallen: "maya-fallen",
  },
  bundleIdByEmotion: {
    neutral: "maya-normal",
    sad: "maya-sad",
    blush: "maya-blush",
    angry: "maya-angry-sbn",
    fallen: "maya-fallen",
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
  defaultScale: isMobileDevice() ? 2.9 : 3.1,
  defaultOpacity: 1,
  defaultFrame: 0,
  defaultFps: 24,
  defaultLoop: true,
};
