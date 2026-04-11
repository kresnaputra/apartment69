import { create } from "zustand";
import { characterRegistry } from "@/character";
import { demoScript } from "@/lib/runtime/dialogueScript";
import { unknownSpeakerIds } from "@/types/novel";
import type { LoadedSpritesheetBundle } from "@/types/spritesheet";
import type {
  ActiveCutScene,
  ActiveMinigame,
  CharacterDefinition,
  CharacterEnterFrom,
  CharacterInstance,
  CharacterStagePosition,
  ChoiceOption,
  DialogueEntry,
  ParallaxLayer,
  VisualNovelCommand,
  VisualNovelScript,
} from "@/types/novel";
import { isMobile } from "pixi.js";

type NovelStore = {
  bundles: Record<string, LoadedSpritesheetBundle>;
  background: string;
  parallaxLayers: ParallaxLayer[];
  location: string;
  textPresentation: "dialogue" | "narration" | "centered";
  speaker: string | null;
  activeCharacterId: string | null;
  sceneTransitionDuration: number;
  sceneTransitionToken: number;
  pendingSceneContinuation: boolean;
  activeMinigame: ActiveMinigame | null;
  activeCutScene: ActiveCutScene | null;
  line: string;
  lineSize: "hero" | "sub";
  choices: ChoiceOption[];
  choicePrompt: string;
  history: DialogueEntry[];
  characters: Record<string, CharacterInstance>;
  currentLabel: string;
  currentIndex: number;
  statusMessage: string;
  ready: boolean;
  registerBundle: (id: string, bundle: LoadedSpritesheetBundle) => void;
  setStatusMessage: (message: string) => void;
  startStory: () => void;
  advance: () => void;
  choose: (nextLabel: string) => void;
  completeMinigame: () => void;
  completeCutScene: () => void;
  tickCharacters: () => void;
};

const script: VisualNovelScript = demoScript;

const emptyState = {
  background: "linear-gradient(180deg, #080b12 0%, #04050a 100%)",
  parallaxLayers: [] as ParallaxLayer[],
  location: "",
  textPresentation: "dialogue" as const,
  speaker: null,
  activeCharacterId: null,
  sceneTransitionDuration: 720,
  sceneTransitionToken: 0,
  pendingSceneContinuation: false,
  activeMinigame: null,
  activeCutScene: null,
  line: "",
  lineSize: "hero" as const,
  choices: [] as ChoiceOption[],
  choicePrompt: "",
  history: [] as DialogueEntry[],
  characters: {} as Record<string, CharacterInstance>,
  currentLabel: script.startLabel,
  currentIndex: 0,
  ready: false,
};

const MAX_STEPS_PER_PASS = 100;
const CHARACTER_FADE_AWAY_DURATION_MS = 420;

const positionToX = (position: CharacterStagePosition) => {
  if (position === "left") return isMobile ? 0.15 : 0.25;
  if (position === "right") return isMobile ? 0.85 : 0.75;
  return 0.5;
};

const createHistoryEntry = (speaker: string | null, text: string): DialogueEntry => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  speaker,
  text,
});

const UNKNOWN_SPEAKER_SET = new Set<string>(unknownSpeakerIds);

const resolveSpeakerName = (speaker: string | null | undefined, hideName = false) => {
  if (hideName) return "???";
  if (!speaker) return null;
  if (UNKNOWN_SPEAKER_SET.has(speaker)) return "???";

  return characterRegistry[speaker as keyof typeof characterRegistry]?.displayName ?? speaker;
};

const resolveBundleId = (
  definition: CharacterDefinition | undefined,
  emotion: CharacterInstance["emotion"],
  isTalking = false,
  fallbackBundleId?: string,
) => {
  if (isTalking && definition?.talkingBundleId) return definition.talkingBundleId;
  if (!definition) return fallbackBundleId ?? "unknown-bundle";

  return (
    (emotion ? definition.bundleIdByEmotion?.[emotion] : undefined) ??
    definition.defaultBundleId ??
    fallbackBundleId ??
    "unknown-bundle"
  );
};

const syncTalkingBundles = (
  characters: Record<string, CharacterInstance> | undefined,
  bundles: Record<string, LoadedSpritesheetBundle> | undefined,
  activeSpeakerId: string | null | undefined,
) => {
  if (!characters) return characters;

  return Object.fromEntries(
    Object.entries(characters).map(([id, character]) => {
      const definition = characterRegistry[character.characterId];
      const nextBundleId = resolveBundleId(
        definition,
        character.emotion,
        character.characterId === activeSpeakerId,
        character.bundleId,
      );

      if (nextBundleId === character.bundleId) {
        return [id, character];
      }

      const currentTotalFrames = Math.max(1, bundles?.[character.bundleId]?.totalFrames ?? 1);
      const nextTotalFrames = Math.max(1, bundles?.[nextBundleId]?.totalFrames ?? 1);
      const progress = currentTotalFrames > 1 ? character.frame / currentTotalFrames : 0;
      const nextFrame = Math.min(
        nextTotalFrames - 1,
        Math.max(0, Math.round(progress * (nextTotalFrames - 1))),
      );

      return [
        id,
        {
          ...character,
          bundleId: nextBundleId,
          frame: nextFrame,
        },
      ];
    }),
  ) as Record<string, CharacterInstance>;
};

const moveCharacter = (
  current: CharacterInstance,
  command: Extract<VisualNovelCommand, { type: "moveCharacter" }>,
): CharacterInstance => {
  const position = command.position ?? current.position;
  const xOffset = command.xOffset ?? current.xOffset;
  const yOffset = command.yOffset ?? current.yOffset;
  const baseX = command.x ?? (command.position ? positionToX(position) : current.x - current.xOffset);
  const baseY = command.y ?? current.y;

  return {
    ...current,
    position,
    enterFrom: "none",
    xOffset,
    yOffset,
    moveDuration: command.duration ?? current.moveDuration,
    moveEasing: command.easing ?? current.moveEasing,
    x: baseX,
    y: baseY,
    scale: command.scale ?? current.scale,
    opacity: command.opacity ?? current.opacity,
  };
};

const normalizeCharacter = (
  current: CharacterInstance | undefined,
  command: Extract<VisualNovelCommand, { type: "showCharacter" }>,
  definition: CharacterDefinition,
): CharacterInstance => {
  const emotion = command.emotion ?? current?.emotion ?? definition.defaultEmotion ?? null;
  const position = command.position ?? current?.position ?? definition.defaultPosition ?? "center";
  const enterFrom: CharacterEnterFrom = command.enterFrom ?? definition.defaultEnterFrom ?? "none";
  const xOffset = command.xOffset ?? current?.xOffset ?? definition.defaultXOffset ?? 0;
  const yOffset = command.yOffset ?? current?.yOffset ?? definition.defaultYOffset ?? 0;
  const bundleId = resolveBundleId(definition, emotion) ?? definition.defaultBundleId;
  const resolvedX =
    command.x ??
    (command.position ? positionToX(position) : undefined) ??
    current?.x ??
    definition.defaultX ??
    positionToX(position);
  const resolvedY = command.y ?? current?.y ?? definition.defaultY ?? 0;

  return {
    id: command.id,
    characterId: definition.id,
    bundleId,
    displayName: definition.displayName,
    emotion,
    position,
    enterFrom,
    entryVersion: (current?.entryVersion ?? 0) + 1,
    xOffset,
    yOffset,
    moveDuration: current?.moveDuration ?? definition.defaultMoveDuration ?? 420,
    moveEasing: current?.moveEasing ?? definition.defaultMoveEasing ?? "ease-in-out",
    x: resolvedX,
    y: resolvedY,
    scale: command.scale ?? current?.scale ?? definition.defaultScale ?? 1,
    opacity: command.opacity ?? current?.opacity ?? definition.defaultOpacity ?? 1,
    frame: command.frame ?? current?.frame ?? definition.defaultFrame ?? 0,
    fps: command.fps ?? current?.fps ?? definition.defaultFps ?? 24,
    loop: command.loop ?? current?.loop ?? definition.defaultLoop ?? true,
    visible: true,
    isExiting: false,
    hideTransition: "none",
    hideStartedAt: null,
  };
};

const runScriptUntilPause = (state: NovelStore) => {
  const nextState: Partial<NovelStore> = {
    background: state.background,
    parallaxLayers: state.parallaxLayers,
    location: state.location,
    textPresentation: state.textPresentation,
    speaker: state.speaker,
    activeCharacterId: state.activeCharacterId,
    sceneTransitionDuration: state.sceneTransitionDuration,
    sceneTransitionToken: state.sceneTransitionToken,
    pendingSceneContinuation: state.pendingSceneContinuation,
    activeMinigame: state.activeMinigame,
    activeCutScene: state.activeCutScene,
    line: state.line,
    lineSize: state.lineSize,
    choices: [],
    choicePrompt: "",
    history: state.history,
    characters: state.characters,
    currentLabel: state.currentLabel,
    currentIndex: state.currentIndex,
    ready: state.ready,
  };

  let safety = 0;

  while (safety < MAX_STEPS_PER_PASS) {
    safety += 1;
    const commands = script.labels[nextState.currentLabel ?? script.startLabel] ?? [];
    const command = commands[nextState.currentIndex ?? 0];

    if (!command) {
      nextState.ready = true;
      return nextState;
    }

    switch (command.type) {
      case "scene":
        nextState.background = command.background;
        nextState.parallaxLayers = command.parallaxLayers ?? [];
        nextState.location = command.location ?? "";
        nextState.sceneTransitionDuration = command.transitionDuration ?? 720;
        nextState.sceneTransitionToken = (nextState.sceneTransitionToken ?? 0) + 1;
        nextState.pendingSceneContinuation = true;
        nextState.currentIndex = (nextState.currentIndex ?? 0) + 1;
        nextState.ready = true;
        return nextState;

      case "showCharacter":
        if (!characterRegistry[command.characterId]) {
          nextState.currentIndex = (nextState.currentIndex ?? 0) + 1;
          break;
        }
        nextState.characters = {
          ...nextState.characters,
          [command.id]: normalizeCharacter(
            nextState.characters?.[command.id],
            command,
            characterRegistry[command.characterId],
          ),
        };
        nextState.currentIndex = (nextState.currentIndex ?? 0) + 1;
        break;

      case "hideCharacter": {
        const current = nextState.characters?.[command.id];
        if (current) {
          const transition = command.transition ?? "none";
          nextState.characters = {
            ...nextState.characters,
            [command.id]: transition === "fadeAway"
              ? {
                  ...current,
                  visible: true,
                  isExiting: true,
                  hideTransition: transition,
                  hideStartedAt: Date.now(),
                }
              : {
                  ...current,
                  visible: false,
                  isExiting: false,
                  hideTransition: "none",
                  hideStartedAt: null,
                },
          };
        }
        nextState.currentIndex = (nextState.currentIndex ?? 0) + 1;
        break;
      }

      case "moveCharacter": {
        const current = nextState.characters?.[command.id];
        if (current) {
          nextState.characters = {
            ...nextState.characters,
            [command.id]: moveCharacter(current, command),
          };
        }
        nextState.currentIndex = (nextState.currentIndex ?? 0) + 1;
        break;
      }

      case "jump":
        nextState.currentLabel = command.target;
        nextState.currentIndex = 0;
        break;

      case "minigame":
        nextState.textPresentation = "dialogue";
        nextState.speaker = null;
        nextState.activeCharacterId = null;
        nextState.characters = syncTalkingBundles(nextState.characters, state.bundles, null);
        nextState.pendingSceneContinuation = false;
        nextState.activeMinigame = {
          id: command.minigameId,
          startedAt: Date.now(),
        };
        nextState.line = "";
        nextState.choices = [];
        nextState.choicePrompt = "";
        nextState.currentIndex = (nextState.currentIndex ?? 0) + 1;
        nextState.ready = true;
        return nextState;

      case "cutScene":
        nextState.textPresentation = "dialogue";
        nextState.speaker = null;
        nextState.activeCharacterId = null;
        nextState.characters = syncTalkingBundles(nextState.characters, state.bundles, null);
        nextState.pendingSceneContinuation = false;
        nextState.activeCutScene = { src: command.src };
        nextState.line = "";
        nextState.choices = [];
        nextState.choicePrompt = "";
        nextState.currentIndex = (nextState.currentIndex ?? 0) + 1;
        nextState.ready = true;
        return nextState;

      case "centeredText":
        nextState.textPresentation = "centered";
        nextState.speaker = null;
        nextState.activeCharacterId = null;
        nextState.pendingSceneContinuation = false;
        nextState.line = command.text;
        nextState.lineSize = command.size ?? "hero";
        nextState.choices = [];
        nextState.choicePrompt = "";
        nextState.characters = syncTalkingBundles(nextState.characters, state.bundles, null);
        nextState.currentIndex = (nextState.currentIndex ?? 0) + 1;
        nextState.ready = true;
        return nextState;

      case "say":
        nextState.textPresentation = command.speaker === null || command.speaker === undefined ? "narration" : "dialogue";
        nextState.speaker = resolveSpeakerName(command.speaker, command.hideName);
        nextState.activeCharacterId = command.speaker ?? null;
        nextState.pendingSceneContinuation = false;
        nextState.line = command.text;
        nextState.lineSize = "sub";
        nextState.choices = [];
        nextState.choicePrompt = "";
        nextState.history = [
          ...(nextState.history ?? []),
          {
            ...createHistoryEntry(resolveSpeakerName(command.speaker, command.hideName), command.text),
            emotion: command.emotion ?? null,
          },
        ];
        if (command.speaker && !UNKNOWN_SPEAKER_SET.has(command.speaker)) {
          const activeCharacter = Object.entries(nextState.characters ?? {}).find(
            ([, value]) => value.characterId === command.speaker,
          );
          if (activeCharacter) {
            const [id, value] = activeCharacter;
            const definition = characterRegistry[command.speaker as keyof typeof characterRegistry];
            const nextEmotion = command.emotion ?? value.emotion;
            const nextBundleId = resolveBundleId(definition, nextEmotion, true, value.bundleId);
            nextState.characters = {
              ...nextState.characters,
              [id]: {
                ...value,
                emotion: nextEmotion,
                bundleId: nextBundleId,
              },
            };
          }
        }
        nextState.characters = syncTalkingBundles(
          nextState.characters,
          state.bundles,
          nextState.activeCharacterId,
        );
        nextState.currentIndex = (nextState.currentIndex ?? 0) + 1;
        nextState.ready = true;
        return nextState;

      case "menu":
        nextState.textPresentation = "dialogue";
        nextState.speaker = null;
        nextState.activeCharacterId = null;
        nextState.characters = syncTalkingBundles(nextState.characters, state.bundles, null);
        nextState.pendingSceneContinuation = false;
        nextState.line = command.prompt ?? "";
        nextState.lineSize = "sub";
        nextState.choicePrompt = command.prompt ?? "";
        nextState.choices = command.options;
        nextState.ready = true;
        return nextState;
    }
  }

  nextState.ready = true;
  return nextState;
};

export const useNovelStore = create<NovelStore>((set, get) => ({
  bundles: {},
  ...emptyState,
  statusMessage: "Memuat cerita...",

  registerBundle: (id, bundle) =>
    set((state) => ({
      bundles: {
        ...state.bundles,
        [id]: bundle,
      },
      statusMessage: "Karakter siap ditampilkan.",
    })),

  setStatusMessage: (message) => set({ statusMessage: message }),

  startStory: () =>
    set((state) =>
      runScriptUntilPause({
        ...state,
        ...emptyState,
        bundles: state.bundles,
        statusMessage: state.statusMessage,
      }),
    ),

  advance: () =>
    set((state) => {
      if (state.choices.length > 0) {
        return state;
      }

      if (state.activeMinigame) {
        return state;
      }

      if (state.activeCutScene) {
        return state;
      }

      return runScriptUntilPause({
        ...state,
        pendingSceneContinuation: false,
        ready: false,
      });
    }),

  choose: (nextLabel) =>
    set((state) =>
      runScriptUntilPause({
        ...state,
        currentLabel: nextLabel,
        currentIndex: 0,
        activeMinigame: null,
        speaker: null,
        line: "",
        choices: [],
        choicePrompt: "",
        ready: false,
      }),
    ),

  completeMinigame: () =>
    set((state) => {
      if (!state.activeMinigame) {
        return state;
      }

      return runScriptUntilPause({
        ...state,
        activeMinigame: null,
        pendingSceneContinuation: false,
        ready: false,
      });
    }),

  completeCutScene: () =>
    set((state) => {
      if (!state.activeCutScene) {
        return state;
      }

      return runScriptUntilPause({
        ...state,
        activeCutScene: null,
        pendingSceneContinuation: false,
        ready: false,
      });
    }),

  tickCharacters: () =>
    set((state) => {
      const now = Date.now();
      const nextCharacters = Object.fromEntries(
        Object.entries(state.characters).map(([id, character]) => {
          const bundle = state.bundles[character.bundleId];
          const isFadeAwayFinished =
            character.isExiting &&
            character.hideTransition === "fadeAway" &&
            character.hideStartedAt !== null &&
            now - character.hideStartedAt >= CHARACTER_FADE_AWAY_DURATION_MS;

          if (isFadeAwayFinished) {
            return [
              id,
              {
                ...character,
                visible: false,
                isExiting: false,
                hideTransition: "none",
                hideStartedAt: null,
              },
            ];
          }

          if (!bundle || !character.visible) {
            return [id, character];
          }

          const duration = Math.max(1, bundle.totalFrames);
          const nextFrame = character.loop ? (character.frame + 1) % duration : Math.min(duration - 1, character.frame + 1);

          return [
            id,
            {
              ...character,
              frame: nextFrame,
            },
          ];
        }),
      ) as Record<string, CharacterInstance>;

      return {
        characters: nextCharacters,
      };
    }),
}));
