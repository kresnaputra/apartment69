import { arkaBundleRegistry, arkaCharacter } from "@/character/arka/character";
import { mayaBundleRegistry, mayaCharacter } from "@/character/maya/character";
import { elenaBundleRegistry, elenaCharacter } from "@/character/elena/character";
import { nadiaBundleRegistry, nadiaCharacter } from "@/character/nadia/character";
import { saraBundleRegistry, saraCharacter } from "@/character/sara/character";
import { mayasFatherBundleRegistry, mayasFatherCharacter } from "@/character/mayas-father/character";
import { arthurBundleRegistry, arthurCharacter } from "@/character/arthur/character";
import type { CharacterDefinition } from "@/types/novel";

export const characterRegistry: Record<string, CharacterDefinition> = {
  [arkaCharacter.id]: arkaCharacter,
  [mayaCharacter.id]: mayaCharacter,
  [elenaCharacter.id]: elenaCharacter,
  [nadiaCharacter.id]: nadiaCharacter,
  [saraCharacter.id]: saraCharacter,
  [mayasFatherCharacter.id]: mayasFatherCharacter,
  [arthurCharacter.id]: arthurCharacter,
};

export const characterBundleRegistry: Record<string, string> = {
  ...arkaBundleRegistry,
  ...mayaBundleRegistry,
  ...elenaBundleRegistry,
  ...nadiaBundleRegistry,
  ...saraBundleRegistry,
  ...mayasFatherBundleRegistry,
  ...arthurBundleRegistry,
};
