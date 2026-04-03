import { create } from "zustand";
import { characterRegistry } from "@/character";
import { demoScript } from "@/lib/runtime/dialogueScript";
import type { LoadedSbnBundle } from "@/types/sbn";
import type {
  CharacterDefinition,
  CharacterEnterFrom,
  CharacterInstance,
  CharacterStagePosition,
  ChoiceOption,
  DialogueEntry,
  VisualNovelCommand,
  VisualNovelScript,
} from "@/types/novel";

type NovelStore = {
  bundles: Record<string, LoadedSbnBundle>;
  background: string;
  location: string;
  speaker: string | null;
  activeCharacterId: string | null;
  sceneTransitionDuration: number;
  sceneTransitionToken: number;
  pendingSceneContinuation: boolean;
  line: string;
  choices: ChoiceOption[];
  choicePrompt: string;
  history: DialogueEntry[];
  characters: Record<string, CharacterInstance>;
  currentLabel: string;
  currentIndex: number;
  statusMessage: string;
  ready: boolean;
  registerBundle: (id: string, bundle: LoadedSbnBundle) => void;
  setStatusMessage: (message: string) => void;
  startStory: () => void;
  advance: () => void;
  choose: (nextLabel: string) => void;
  tickCharacters: () => void;
};

const script: VisualNovelScript = demoScript;

const emptyState = {
  background: "linear-gradient(180deg, #080b12 0%, #04050a 100%)",
  location: "",
  speaker: null,
  activeCharacterId: null,
  sceneTransitionDuration: 720,
  sceneTransitionToken: 0,
  pendingSceneContinuation: false,
  line: "",
  choices: [] as ChoiceOption[],
  choicePrompt: "",
  history: [] as DialogueEntry[],
  characters: {} as Record<string, CharacterInstance>,
  currentLabel: script.startLabel,
  currentIndex: 0,
  ready: false,
};

const MAX_STEPS_PER_PASS = 100;

const positionToX = (position: CharacterStagePosition) => {
  if (position === "left") return 0.25;
  if (position === "right") return 0.75;
  return 0.5;
};

const createHistoryEntry = (speaker: string | null, text: string): DialogueEntry => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  speaker,
  text,
});

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
  const bundleId = (emotion ? definition.bundleIdByEmotion?.[emotion] : undefined) ?? definition.defaultBundleId;
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
  };
};

const runScriptUntilPause = (state: NovelStore) => {
  const nextState: Partial<NovelStore> = {
    background: state.background,
    location: state.location,
    speaker: state.speaker,
    activeCharacterId: state.activeCharacterId,
    sceneTransitionDuration: state.sceneTransitionDuration,
    sceneTransitionToken: state.sceneTransitionToken,
    pendingSceneContinuation: state.pendingSceneContinuation,
    line: state.line,
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
          nextState.characters = {
            ...nextState.characters,
            [command.id]: { ...current, visible: false },
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

      case "say":
        nextState.speaker =
          command.speaker && characterRegistry[command.speaker as keyof typeof characterRegistry]
            ? characterRegistry[command.speaker as keyof typeof characterRegistry].displayName
            : command.speaker ?? null;
        nextState.activeCharacterId = command.speaker ?? null;
        nextState.pendingSceneContinuation = false;
        nextState.line = command.text;
        nextState.choices = [];
        nextState.choicePrompt = "";
        nextState.history = [
          ...(nextState.history ?? []),
          {
            ...createHistoryEntry(
              command.speaker && characterRegistry[command.speaker as keyof typeof characterRegistry]
                ? characterRegistry[command.speaker as keyof typeof characterRegistry].displayName
                : command.speaker ?? null,
              command.text,
            ),
            emotion: command.emotion ?? null,
          },
        ];
        if (command.speaker) {
          const activeCharacter = Object.entries(nextState.characters ?? {}).find(
            ([, value]) => value.characterId === command.speaker,
          );
          if (activeCharacter) {
            const [id, value] = activeCharacter;
            const definition = characterRegistry[command.speaker as keyof typeof characterRegistry];
            const nextEmotion = command.emotion ?? value.emotion;
            const nextBundleId =
              (nextEmotion ? definition?.bundleIdByEmotion?.[nextEmotion] : undefined) ??
              definition?.defaultBundleId ??
              value.bundleId;
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
        nextState.currentIndex = (nextState.currentIndex ?? 0) + 1;
        nextState.ready = true;
        return nextState;

      case "menu":
        nextState.speaker = null;
        nextState.activeCharacterId = null;
        nextState.pendingSceneContinuation = false;
        nextState.line = command.prompt ?? "";
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
        speaker: null,
        line: "",
        choices: [],
        choicePrompt: "",
        ready: false,
      }),
    ),

  tickCharacters: () =>
    set((state) => {
      const nextCharacters = Object.fromEntries(
        Object.entries(state.characters).map(([id, character]) => {
          const bundle = state.bundles[character.bundleId];
          if (!bundle || !character.visible) {
            return [id, character];
          }

          const duration = Math.max(1, bundle.project.duration);
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
