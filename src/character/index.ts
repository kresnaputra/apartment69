import { playerCharacter } from "@/character/player";
import type { CharacterDefinition } from "@/types/novel";

export const characterRegistry: Record<string, CharacterDefinition> = {
  [playerCharacter.id]: playerCharacter,
};
