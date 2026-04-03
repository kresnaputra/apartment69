export type DialogueEntry = {
  id: string;
  speaker: string | null;
  text: string;
};

export type ChoiceOption = {
  id: string;
  label: string;
  next: string;
};

export type SceneCommand = {
  type: "scene";
  background: string;
  location?: string;
};

export type ShowCharacterCommand = {
  type: "showCharacter";
  id: string;
  characterId: string;
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

export type SayCommand = {
  type: "say";
  speaker?: string | null;
  text: string;
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
  | SayCommand
  | MenuCommand
  | JumpCommand;

export type VisualNovelScript = {
  startLabel: string;
  labels: Record<string, VisualNovelCommand[]>;
};

export type CharacterInstance = {
  id: string;
  characterId: string;
  bundleId: string;
  displayName: string;
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
  id: string;
  displayName: string;
  bundleId: string;
  defaultX?: number;
  defaultY?: number;
  defaultScale?: number;
  defaultOpacity?: number;
  defaultFrame?: number;
  defaultFps?: number;
  defaultLoop?: boolean;
};
