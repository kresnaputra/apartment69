import type {
  ActiveBackgroundMusic,
  ActiveSoundEffect,
  BackgroundVideo,
  CharacterInstance,
  FlagMap,
} from "@/types/novel";

export type SaveSlot = {
  currentLabel: string;
  currentIndex: number;
  background: string;
  backgroundVideo?: BackgroundVideo | null;
  location: string;
  speaker: string | null;
  preview: string;
  savedAt: number;
  characters: Record<string, CharacterInstance>;
  flags?: FlagMap;
  activeBackgroundMusic?: ActiveBackgroundMusic | null;
  activeSoundEffect?: ActiveSoundEffect | null;
};

export const SLOT_COUNT = 3;

const key = (index: number) => `vne-save-${index}`;

export const readSlot = (index: number): SaveSlot | null => {
  try {
    const raw = localStorage.getItem(key(index));
    return raw ? (JSON.parse(raw) as SaveSlot) : null;
  } catch {
    return null;
  }
};

export const writeSlot = (index: number, slot: SaveSlot) => {
  localStorage.setItem(key(index), JSON.stringify(slot));
};

export const readAllSlots = (): (SaveSlot | null)[] =>
  Array.from({ length: SLOT_COUNT }, (_, i) => readSlot(i));
