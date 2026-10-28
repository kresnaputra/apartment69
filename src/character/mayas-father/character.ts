import type { CharacterDefinition } from "@/types/novel";
import mayasFatherDefaultSbnUrl from "@/character/mayas-father/maya's-father-normal.sbn?url";
import mayasFatherTalkSbnUrl from "@/character/mayas-father/maya's-father-talk.sbn?url";
import { isMobileDevice } from "@/lib/utils/deviceDetection";

export const mayasFatherBundleRegistry = {
  "mayasFather-normal": mayasFatherDefaultSbnUrl,
  "mayasFather-talk": mayasFatherTalkSbnUrl,
} as const;

export const mayasFatherCharacter: CharacterDefinition = {
  id: "mayasFather",
  displayName: "Maya's Father",
  defaultBundleId: "mayasFather-normal",
  talkingBundleId: "mayasFather-talk",
  bundleIdByEmotion: {
    neutral: "mayasFather-normal",
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
  defaultScale: isMobileDevice() ? 2.6 : 3,
  defaultOpacity: 1,
  defaultFrame: 0,
  defaultFps: 24,
  defaultLoop: true,
};
