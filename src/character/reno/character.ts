import normalSbn from "@/character/reno/normal.sbn?url";
import type { CharacterDefinition } from "@/types/novel";

export const renoBundleRegistry = {
  "reno-normal": normalSbn,
} as const;

export const renoCharacter: CharacterDefinition = {
  id: "reno",
  displayName: "Reno",
  defaultBundleId: "reno-normal",
  bundleIdByEmotion: {
    neutral: "reno-normal",
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
