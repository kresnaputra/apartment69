import { arkaBundleRegistry, arkaCharacter } from "@/character/arka/character";
import { nadiaBundleRegistry, nadiaCharacter } from "@/character/nadia/character";
import type { CharacterDefinition } from "@/types/novel";

export const characterRegistry: Record<string, CharacterDefinition> = {
  [arkaCharacter.id]: arkaCharacter,
  [nadiaCharacter.id]: nadiaCharacter,
};

export const characterBundleRegistry: Record<string, string> = {
  ...arkaBundleRegistry,
  ...nadiaBundleRegistry,
};
