import neutralSbn from "@/character/reno/neutral.sbn?url";
import calmSbn from "@/character/reno/calm.sbn?url";
import teasingSbn from "@/character/reno/teasing.sbn?url";
import worriedSbn from "@/character/reno/worried.sbn?url";
import surprisedSbn from "@/character/reno/surprised.sbn?url";
import type { CharacterDefinition } from "@/types/novel";

export const renoBundleRegistry = {
  "reno-neutral": neutralSbn,
  "reno-calm": calmSbn,
  "reno-teasing": teasingSbn,
  "reno-worried": worriedSbn,
  "reno-surprised": surprisedSbn,
} as const;

export const renoCharacter: CharacterDefinition = {
  id: "reno",
  displayName: "Reno",
  defaultBundleId: "reno-neutral",
  bundleIdByEmotion: {
    neutral: "reno-neutral",
    calm: "reno-calm",
    teasing: "reno-teasing",
    worried: "reno-worried",
    surprised: "reno-surprised",
  },
  defaultEmotion: "neutral",
  defaultPosition: "right",
  defaultEnterFrom: "left",
  defaultXOffset: 0.04,
  defaultYOffset: 0,
  defaultMoveDuration: 520,
  defaultMoveEasing: "ease-in-out",
  defaultX: 0.72,
  defaultY: 0,
  defaultScale: 1.02,
  defaultOpacity: 0.96,
  defaultFrame: 0,
  defaultFps: 24,
  defaultLoop: true,
};
