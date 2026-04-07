import { arkaBundleRegistry, arkaCharacter } from "@/character/arka/character";
import { mayaBundleRegistry, mayaCharacter } from "@/character/maya/character";
import { elenaBundleRegistry, elenaCharacter } from "@/character/elena/character";
import { nadiaBundleRegistry, nadiaCharacter } from "@/character/nadia/character";
import type { CharacterDefinition } from "@/types/novel";

export const characterRegistry: Record<string, CharacterDefinition> = {
  [arkaCharacter.id]: arkaCharacter,
  [mayaCharacter.id]: mayaCharacter,
  [elenaCharacter.id]: elenaCharacter,
  [nadiaCharacter.id]: nadiaCharacter,
};

export const characterBundleRegistry: Record<string, string> = {
  ...arkaBundleRegistry,
  ...mayaBundleRegistry,
  ...elenaBundleRegistry,
  ...nadiaBundleRegistry,
};
