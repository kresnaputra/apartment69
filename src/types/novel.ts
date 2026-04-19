import type { AnyCharacterEmotion, CharacterId } from "@/character/catalog";
import type { LocalizedText } from "@/lib/i18n";

export const unknownSpeakerIds = ["unknown", "uknokwn"] as const;

export type UnknownSpeakerId = (typeof unknownSpeakerIds)[number];
export type SpeakerId = CharacterId | UnknownSpeakerId;

export type DialogueEntry = {
  id: string;
  speaker: string | null;
  text: LocalizedText;
  emotion?: AnyCharacterEmotion | null;
};

export type ChoiceOption = {
  id: string;
  label: LocalizedText;
  next: string;
};

export type FlagValue = boolean | number | string | null;
export type FlagMap = Record<string, FlagValue>;

export type MinigameId = "elevator-button" | "pipe-connection" | "smartphone-contacts" | "laptop-cleanup" | "email-compose";

export type ActiveCutScene = {
  src: string;
  loop?: boolean;
  narrate?: LocalizedText;
};

export type ActiveMinigame = {
  id: MinigameId;
  startedAt: number;
  options?: Record<string, unknown>;
};

export type CharacterStagePosition = "left" | "center" | "right";
export type CharacterEnterFrom = "left" | "right" | "fade" | "none";
export type CharacterHideTransition = "fadeAway" | "none";
export type CharacterMoveEasing =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | `cubic-bezier(${string})`;

export type ParallaxLayer = {
  url: string;
  speed?: number; // pan cycle duration in seconds, default 20
  direction?: "ltr" | "rtl"; // default "ltr"
  opacity?: number;
  xOffset?: number; // horizontal offset as a fraction of viewport width, e.g. 0.1 = 10%
  yOffset?: number; // vertical offset as a fraction of viewport height, e.g. -0.1 = -10%
};

export type SceneCommand = {
  type: "scene";
  background: string;
  location?: LocalizedText;
  transitionDuration?: number;
  parallaxLayers?: ParallaxLayer[];
  backgroundAnimation?: {
    zoom?: number;
    panX?: number;
    panY?: number;
    duration?: number;
  };
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
  transition?: CharacterHideTransition;
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
  text: LocalizedText;
  emotion?: AnyCharacterEmotion | null;
  hideName?: boolean;
  voice?: string;
};

export type CenteredTextCommand = {
  type: "centeredText";
  text: LocalizedText;
  size?: "hero" | "sub";
};

export type MenuCommand = {
  type: "menu";
  prompt?: LocalizedText;
  options: ChoiceOption[];
};

export type JumpCommand = {
  type: "jump";
  target: string;
};

export type SetFlagCommand = {
  type: "setFlag";
  name: string;
  value: FlagValue;
};

export type ClearFlagCommand = {
  type: "clearFlag";
  name: string;
};

export type JumpIfCommand = {
  type: "jumpIf";
  name: string;
  value?: FlagValue;
  target: string;
  elseTarget?: string;
};

export type MinigameCommand = {
  type: "minigame";
  minigameId: MinigameId;
  options?: Record<string, unknown>;
};

export type CutSceneCommand = {
  type: "cutScene";
  src: string;
  loop?: boolean;
  narrate?: LocalizedText;
};

export type VisualNovelCommand =
  | SceneCommand
  | ShowCharacterCommand
  | HideCharacterCommand
  | MoveCharacterCommand
  | SayCommand
  | CenteredTextCommand
  | MenuCommand
  | JumpCommand
  | SetFlagCommand
  | ClearFlagCommand
  | JumpIfCommand
  | MinigameCommand
  | CutSceneCommand;

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
  isExiting: boolean;
  hideTransition: CharacterHideTransition;
  hideStartedAt: number | null;
};

export type CharacterDefinition = {
  id: CharacterId;
  displayName: string;
  defaultBundleId: string;
  bundleIdByEmotion?: Partial<Record<AnyCharacterEmotion, string>>;
  talkingBundleIdByEmotion?: Partial<Record<AnyCharacterEmotion, string>>;
  talkingBundleId?: string;
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
