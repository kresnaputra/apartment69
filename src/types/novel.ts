import type { AnyCharacterEmotion, CharacterId } from "@/character/catalog";

export type DialogueEntry = {
  id: string;
  speaker: string | null;
  text: string;
  emotion?: AnyCharacterEmotion | null;
};

export type ChoiceOption = {
  id: string;
  label: string;
  next: string;
};

export type CharacterStagePosition = "left" | "center" | "right";
export type CharacterEnterFrom = "left" | "right" | "none";
export type CharacterMoveEasing =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | `cubic-bezier(${string})`;

export type SceneCommand = {
  type: "scene";
  background: string;
  location?: string;
  transitionDuration?: number;
};

export type ShowCharacterCommand = {
  type: "showCharacter";
  id: string;
  characterId: CharacterId;
  emotion?: AnyCharacterEmotion;
  position?: CharacterStagePosition;
  enterFrom?: CharacterEnterFrom;
  xOffset?: number;
  yOffset?: number;
  x?: number;
  y?: number;
  scale?: number;
  opacity?: number;
  frame?: number;
  fps?: number;
  loop?: boolean;
};

export type HideCharacterCommand = {
  type: "hideCharacter";
  id: string;
};

export type MoveCharacterCommand = {
  type: "moveCharacter";
  id: string;
  position?: CharacterStagePosition;
  x?: number;
  y?: number;
  xOffset?: number;
  yOffset?: number;
  scale?: number;
  opacity?: number;
  duration?: number;
  easing?: CharacterMoveEasing;
};

export type SayCommand = {
  type: "say";
  speaker?: string | null;
  text: string;
  emotion?: AnyCharacterEmotion | null;
};

export type MenuCommand = {
  type: "menu";
  prompt?: string;
  options: ChoiceOption[];
};

export type JumpCommand = {
  type: "jump";
  target: string;
};

export type VisualNovelCommand =
  | SceneCommand
  | ShowCharacterCommand
  | HideCharacterCommand
  | MoveCharacterCommand
  | SayCommand
  | MenuCommand
  | JumpCommand;

export type VisualNovelScript = {
  startLabel: string;
  labels: Record<string, VisualNovelCommand[]>;
};

export type CharacterInstance = {
  id: string;
  characterId: CharacterId;
  bundleId: string;
  displayName: string;
  emotion: AnyCharacterEmotion | null;
  position: CharacterStagePosition;
  enterFrom: CharacterEnterFrom;
  entryVersion: number;
  xOffset: number;
  yOffset: number;
  moveDuration: number;
  moveEasing: CharacterMoveEasing;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  frame: number;
  fps: number;
  loop: boolean;
  visible: boolean;
};

export type CharacterDefinition = {
  id: CharacterId;
  displayName: string;
  bundleId: string;
  defaultEmotion?: AnyCharacterEmotion;
  defaultPosition?: CharacterStagePosition;
  defaultEnterFrom?: CharacterEnterFrom;
  defaultXOffset?: number;
  defaultYOffset?: number;
  defaultMoveDuration?: number;
  defaultMoveEasing?: CharacterMoveEasing;
  defaultX?: number;
  defaultY?: number;
  defaultScale?: number;
  defaultOpacity?: number;
  defaultFrame?: number;
  defaultFps?: number;
  defaultLoop?: boolean;
};
