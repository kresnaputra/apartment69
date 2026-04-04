import normalSbn from "@/character/aira/normal.sbn?url";
import type { CharacterDefinition } from "@/types/novel";

export const airaBundleRegistry = {
  "aira-normal": normalSbn,
} as const;

export const airaCharacter: CharacterDefinition = {
  id: "aira",
  displayName: "Aira",
  defaultBundleId: "aira-normal",
  bundleIdByEmotion: {
    neutral: "aira-normal",
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
