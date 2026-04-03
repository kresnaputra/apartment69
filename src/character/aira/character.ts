import normalSbn from "@/character/aira/normal.sbn?url";
import gentleSbn from "@/character/aira/gentle.sbn?url";
import seriousSbn from "@/character/aira/serious.sbn?url";
import shySbn from "@/character/aira/shy.sbn?url";
import surprisedSbn from "@/character/aira/surprised.sbn?url";
import type { CharacterDefinition } from "@/types/novel";

export const airaBundleRegistry = {
  "aira-normal": normalSbn,
  "aira-gentle": gentleSbn,
  "aira-serious": seriousSbn,
  "aira-shy": shySbn,
  "aira-surprised": surprisedSbn,
} as const;

export const airaCharacter: CharacterDefinition = {
  id: "aira",
  displayName: "Aira",
  defaultBundleId: "aira-normal",
  bundleIdByEmotion: {
    neutral: "aira-normal",
    gentle: "aira-gentle",
    serious: "aira-serious",
    shy: "aira-shy",
    surprised: "aira-surprised",
  },
  defaultEmotion: "neutral",
  defaultPosition: "center",
  defaultEnterFrom: "right",
  defaultXOffset: 0,
  defaultYOffset: 0,
  defaultMoveDuration: 420,
  defaultMoveEasing: "ease-in-out",
  defaultX: 0.52,
  defaultY: 0,
  defaultScale: 1.08,
  defaultOpacity: 1,
  defaultFrame: 0,
  defaultFps: 24,
  defaultLoop: true,
};
