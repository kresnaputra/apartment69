import type { AnyCharacterEmotion, CharacterEmotion, CharacterId } from "@/character/catalog";
import type { LocalizedText } from "@/lib/i18n";
import type {
  BlackScreenCommand,
  CenteredTextCommand,
  CharacterHideTransition,
  ClearFlagCommand,
  ChoiceOption,
  BackgroundVideo,
  CutSceneCommand,
  CutSceneSelection,
  FlagValue,
  HideCharacterCommand,
  JumpIfCommand,
  InterstitialCommand,
  MinigameId,
  MoveCharacterCommand,
  MultiCutSceneCommand,
  ParallaxLayer,
  SayCommand,
  SceneCommand,
  SetFlagCommand,
  SpeakerId,
  ShowCharacterCommand,
  VisualNovelCommand,
} from "@/types/novel";

type SayOptions = {
  hideName?: boolean;
  voice?: string;
};

type CenteredTextOptions = {
  size?: "hero" | "sub";
  typingSpeed?: number;
};

type SceneOptions = {
  transitionDuration?: number;
  backgroundVideo?: BackgroundVideo | null;
};

export const scene = (
  background: string,
  location?: LocalizedText,
  transitionDurationOrOptions?: number | SceneOptions,
): SceneCommand => ({
  type: "scene",
  background,
  location,
  transitionDuration:
    typeof transitionDurationOrOptions === "number"
      ? transitionDurationOrOptions
      : transitionDurationOrOptions?.transitionDuration,
  backgroundVideo:
    typeof transitionDurationOrOptions === "number"
      ? null
      : transitionDurationOrOptions?.backgroundVideo ?? null,
});

/**
 * Creates a scene command with an image-based background and optional parallax layers.
 * @param imageUrl - Vite-imported image URL for the base background
 * @param location - Optional location name shown in the caption
 * @param options - parallaxLayers, transitionDuration, backgroundAnimation, backgroundVideo
 */
export const bg = (
  imageUrl: string,
  location?: LocalizedText,
  options?: {
    parallaxLayers?: ParallaxLayer[];
    transitionDuration?: number;
    backgroundVideo?: BackgroundVideo | null;
    backgroundAnimation?: {
      zoom?: number;
      panX?: number;
      panY?: number;
      duration?: number;
    };
  },
): SceneCommand => ({
  type: "scene",
  background: `url(${imageUrl})`,
  location,
  parallaxLayers: options?.parallaxLayers,
  transitionDuration: options?.transitionDuration,
  backgroundVideo: options?.backgroundVideo ?? null,
  backgroundAnimation: options?.backgroundAnimation,
});

export const blackScreen = (
  background = "linear-gradient(180deg, #000000 0%, #050505 100%)",
): BlackScreenCommand => ({
  type: "blackScreen",
  active: true,
  background,
});

export const clearBlackScreen = (): BlackScreenCommand => ({
  type: "blackScreen",
  active: false,
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

export const hide = (
  id: string,
  transition: CharacterHideTransition = "none",
): HideCharacterCommand => ({
  type: "hideCharacter",
  id,
  transition,
});

export const narrate = (text: LocalizedText, speaker?: string): SayCommand => ({
  type: "say",
  speaker: speaker ?? null,
  text,
});

export const centeredText = (text: LocalizedText, options?: CenteredTextOptions): CenteredTextCommand => ({
  type: "centeredText",
  text,
  size: options?.size,
  typingSpeed: options?.typingSpeed,
});

export function say<TCharacterId extends CharacterId>(
  characterId: TCharacterId,
  emotion: CharacterEmotion<TCharacterId>,
  text: LocalizedText,
  options?: SayOptions,
): SayCommand;
export function say(
  characterId: SpeakerId,
  emotion: AnyCharacterEmotion,
  text: LocalizedText,
  options?: SayOptions,
): SayCommand;
export function say(
  characterId: SpeakerId,
  emotion: AnyCharacterEmotion,
  text: LocalizedText,
  options?: SayOptions,
): SayCommand {
  return {
    type: "say",
    speaker: characterId,
    emotion,
    text,
    hideName: options?.hideName,
    voice: options?.voice,
  };
}

export const menu = (prompt: LocalizedText, options: ChoiceOption[]): VisualNovelCommand => ({
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

export const setFlag = (name: string, value: FlagValue): SetFlagCommand => ({
  type: "setFlag",
  name,
  value,
});

export const clearFlag = (name: string): ClearFlagCommand => ({
  type: "clearFlag",
  name,
});

export const jumpIf = (
  name: string,
  target: string,
  options?: { value?: FlagValue; elseTarget?: string },
): JumpIfCommand => ({
  type: "jumpIf",
  name,
  target,
  value: options?.value,
  elseTarget: options?.elseTarget,
});

export const minigame = (minigameId: MinigameId, options?: Record<string, unknown>): VisualNovelCommand => ({
  type: "minigame",
  minigameId,
  options,
});

/**
 * Plays a fullscreen cut scene video. Script execution resumes automatically when the video ends.
 * @param src - Vite-imported video URL (e.g. `import nadiaVideo from "@/cut-scene/Nadia Cut Scene.webm?url"`)
 * @param loop - If true, video will loop until user clicks or presses a button
 * @param narrate - Optional narration text to display during the cutscene
 * @param showSpeedControl - If true, shows on-screen buttons to change playback speed
 */
export const cutScene = (src: string, loop?: boolean, narrate?: LocalizedText, showSpeedControl?: boolean): CutSceneCommand => ({
  type: "cutScene",
  src,
  loop,
  narrate,
  showSpeedControl,
});

export const multiCutScene = (
  selections: CutSceneSelection[],
  initialSelectionId?: string,
): MultiCutSceneCommand => ({
  type: "multiCutScene",
  selections,
  initialSelectionId,
});

export const interstitial = (): InterstitialCommand => ({
  type: "interstitial",
});
