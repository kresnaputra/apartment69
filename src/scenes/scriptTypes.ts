import type { AnyCharacterEmotion, CharacterEmotion, CharacterId } from "@/character/catalog";
import type {
  ChoiceOption,
  HideCharacterCommand,
  MinigameId,
  MoveCharacterCommand,
  ParallaxLayer,
  SayCommand,
  SceneCommand,
  SpeakerId,
  ShowCharacterCommand,
  VisualNovelCommand,
} from "@/types/novel";

type SayOptions = {
  hideName?: boolean;
};

export const scene = (background: string, location?: string, transitionDuration?: number): SceneCommand => ({
  type: "scene",
  background,
  location,
  transitionDuration,
});

/**
 * Creates a scene command with an image-based background and optional parallax layers.
 * @param imageUrl - Vite-imported image URL for the base background
 * @param location - Optional location name shown in the caption
 * @param options - parallaxLayers, transitionDuration
 */
export const bg = (
  imageUrl: string,
  location?: string,
  options?: { parallaxLayers?: ParallaxLayer[]; transitionDuration?: number },
): SceneCommand => ({
  type: "scene",
  background: `url(${imageUrl})`,
  location,
  parallaxLayers: options?.parallaxLayers,
  transitionDuration: options?.transitionDuration,
});

/**
 * Creates a parallax background layer.
 * @param url - Vite-imported image URL
 * @param speed - pan cycle duration in seconds (higher = slower), default 20
 * @param direction - "ltr" (left to right) or "rtl", default "ltr"
 * @param options - xOffset/yOffset as fraction of viewport (e.g. 0.1 = 10%), opacity
 */
export const parallax = (
  url: string,
  speed = 20,
  direction: ParallaxLayer["direction"] = "ltr",
  options?: Pick<ParallaxLayer, "xOffset" | "yOffset" | "opacity">,
): ParallaxLayer => ({ url, speed, direction, ...options });

export const show = <TCharacterId extends CharacterId>(
  id: string,
  characterId: TCharacterId,
  emotion?: CharacterEmotion<TCharacterId>,
  overrides?: Omit<ShowCharacterCommand, "type" | "id" | "characterId" | "emotion">,
): ShowCharacterCommand => ({
  type: "showCharacter",
  id,
  characterId,
  ...(emotion !== undefined && { emotion }),
  ...overrides,
});

export const hide = (id: string): HideCharacterCommand => ({
  type: "hideCharacter",
  id,
});

export const narrate = (text: string, speaker?: string): SayCommand => ({
  type: "say",
  speaker: speaker ?? null,
  text,
});

export function say<TCharacterId extends CharacterId>(
  characterId: TCharacterId,
  emotion: CharacterEmotion<TCharacterId>,
  text: string,
  options?: SayOptions,
): SayCommand;
export function say(
  characterId: SpeakerId,
  emotion: AnyCharacterEmotion,
  text: string,
  options?: SayOptions,
): SayCommand;
export function say(
  characterId: SpeakerId,
  emotion: AnyCharacterEmotion,
  text: string,
  options?: SayOptions,
): SayCommand {
  return {
    type: "say",
    speaker: characterId,
    emotion,
    text,
    hideName: options?.hideName,
  };
}

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

export const minigame = (minigameId: MinigameId): VisualNovelCommand => ({
  type: "minigame",
  minigameId,
});
