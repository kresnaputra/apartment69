import { playerCharacter } from "@/character/player";
import { renoCharacter } from "@/character/reno";
import type { CharacterDefinition } from "@/types/novel";

export const characterRegistry: Record<string, CharacterDefinition> = {
  [playerCharacter.id]: playerCharacter,
  [renoCharacter.id]: renoCharacter,
};
