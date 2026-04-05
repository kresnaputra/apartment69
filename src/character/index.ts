import { arkaBundleRegistry, arkaCharacter } from "@/character/arka/character";
import { mayaBundleRegistry, mayaCharacter } from "@/character/maya/character";
import type { CharacterDefinition } from "@/types/novel";

export const characterRegistry: Record<string, CharacterDefinition> = {
  [arkaCharacter.id]: arkaCharacter,
  [mayaCharacter.id]: mayaCharacter,
};

export const characterBundleRegistry: Record<string, string> = {
  ...arkaBundleRegistry,
  ...mayaBundleRegistry,
};
