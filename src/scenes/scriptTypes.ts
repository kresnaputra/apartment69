import type { CharacterEmotion, CharacterId } from "@/character/catalog";
import type {
  ChoiceOption,
  MoveCharacterCommand,
  SayCommand,
  SceneCommand,
  ShowCharacterCommand,
  VisualNovelCommand,
} from "@/types/novel";

export const scene = (background: string, location?: string, transitionDuration?: number): SceneCommand => ({
  type: "scene",
  background,
  location,
  transitionDuration,
});

export const show = <TCharacterId extends CharacterId>(
  id: string,
  characterId: TCharacterId,
  emotion?: CharacterEmotion<TCharacterId>,
  overrides?: Omit<ShowCharacterCommand, "type" | "id" | "characterId" | "emotion">,
): ShowCharacterCommand => ({
  type: "showCharacter",
  id,
  characterId,
  emotion,
  ...overrides,
});

export const narrate = (text: string): SayCommand => ({
  type: "say",
  speaker: null,
  text,
});

export const say = <TCharacterId extends CharacterId>(
  characterId: TCharacterId,
  emotion: CharacterEmotion<TCharacterId>,
  text: string,
): SayCommand => ({
  type: "say",
  speaker: characterId,
  emotion,
  text,
});

export const menu = (prompt: string, options: ChoiceOption[]): VisualNovelCommand => ({
  type: "menu",
  prompt,
  options,
});

export const moveTo = (
  id: string,
  position: MoveCharacterCommand["position"],
  overrides?: Omit<MoveCharacterCommand, "type" | "id" | "position">,
): MoveCharacterCommand => ({
  type: "moveCharacter",
  id,
  position,
  ...overrides,
});

export const jump = (target: string): VisualNovelCommand => ({
  type: "jump",
  target,
});
