import { airaBundleRegistry, airaCharacter } from "@/character/aira/character";
import { renoBundleRegistry, renoCharacter } from "@/character/reno/character";
import type { CharacterDefinition } from "@/types/novel";

export const characterRegistry: Record<string, CharacterDefinition> = {
  [airaCharacter.id]: airaCharacter,
  [renoCharacter.id]: renoCharacter,
};

export const characterBundleRegistry: Record<string, string> = {
  ...airaBundleRegistry,
  ...renoBundleRegistry,
};
