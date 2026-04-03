import { create } from "zustand";
import { characterRegistry } from "@/character";
import { demoScript } from "@/lib/runtime/dialogueScript";
import type { LoadedSbnBundle } from "@/types/sbn";
import type {
  CharacterDefinition,
  CharacterInstance,
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

const createHistoryEntry = (speaker: string | null, text: string): DialogueEntry => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  speaker,
  text,
});

const normalizeCharacter = (
  current: CharacterInstance | undefined,
  command: Extract<VisualNovelCommand, { type: "showCharacter" }>,
  definition: CharacterDefinition,
): CharacterInstance => ({
  id: command.id,
  characterId: definition.id,
  bundleId: definition.bundleId,
  displayName: definition.displayName,
  x: command.x ?? current?.x ?? definition.defaultX ?? 0.5,
  y: command.y ?? current?.y ?? definition.defaultY ?? 0,
  scale: command.scale ?? current?.scale ?? definition.defaultScale ?? 1,
  opacity: command.opacity ?? current?.opacity ?? definition.defaultOpacity ?? 1,
  frame: command.frame ?? current?.frame ?? definition.defaultFrame ?? 0,
  fps: command.fps ?? current?.fps ?? definition.defaultFps ?? 24,
  loop: command.loop ?? current?.loop ?? definition.defaultLoop ?? true,
  visible: true,
});

const runScriptUntilPause = (state: NovelStore) => {
  const nextState: Partial<NovelStore> = {
    background: state.background,
    location: state.location,
    speaker: state.speaker,
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
        nextState.currentIndex = (nextState.currentIndex ?? 0) + 1;
        break;

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

      case "jump":
        nextState.currentLabel = command.target;
        nextState.currentIndex = 0;
        break;

      case "say":
        nextState.speaker = command.speaker ?? null;
        nextState.line = command.text;
        nextState.choices = [];
        nextState.choicePrompt = "";
        nextState.history = [...(nextState.history ?? []), createHistoryEntry(command.speaker ?? null, command.text)];
        nextState.currentIndex = (nextState.currentIndex ?? 0) + 1;
        nextState.ready = true;
        return nextState;

      case "menu":
        nextState.speaker = null;
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
      statusMessage: `Bundle ${bundle.fileName} siap dipakai sebagai karakter.`,
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
