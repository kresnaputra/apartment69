import { isMobileDevice } from "@/lib/utils/deviceDetection";
import type { CharacterDefinition } from "@/types/novel";
import mayaAngrySbnUrl from "@/character/maya/maya-angry.sbn?url";
import mayaDefaultSbnUrl from "@/character/maya/maya-default.sbn?url";
import mayaTalkSbnUrl from "@/character/maya/maya-talk.sbn?url";
import mayaBlushSbnUrl from "@/character/maya/maya-blush.sbn?url";
import mayaBlushTalkSbnUrl from "@/character/maya/maya-blush-talk.sbn?url";
import mayaSadSbnUrl from "@/character/maya/maya-sad.sbn?url";
import mayaSadTalkSbnUrl from "@/character/maya/maya-sad-talk.sbn?url";
import mayaShockSbnUrl from "@/character/maya/maya-shock.sbn?url";
import mayaShockTalkSbnUrl from "@/character/maya/maya-shock-talk.sbn?url";

export const mayaBundleRegistry = {
  "maya-talk": mayaTalkSbnUrl,
  "maya-normal": mayaDefaultSbnUrl,
  "maya-sad": mayaSadSbnUrl,
  "maya-sad-talk": mayaSadTalkSbnUrl,
  "maya-blush": mayaBlushSbnUrl,
  "maya-blush-talk": mayaBlushTalkSbnUrl,
  "maya-angry-sbn": mayaAngrySbnUrl,
  "maya-shock": mayaShockSbnUrl,
  "maya-shock-talk": mayaShockTalkSbnUrl,
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
  },
  bundleIdByEmotion: {
    neutral: "maya-normal",
    sad: "maya-sad",
    blush: "maya-blush",
    angry: "maya-angry-sbn",
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
  defaultScale: isMobileDevice() ? 2.6 : 3,
  defaultOpacity: 1,
  defaultFrame: 0,
  defaultFps: 24,
  defaultLoop: true,
};
