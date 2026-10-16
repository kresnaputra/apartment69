export const characterIds = ["arka", "nadia"] as const;

export type CharacterId = (typeof characterIds)[number];

export const characterEmotions = {
  arka: ["neutral", "gentle", "serious", "shy", "surprised"] as const,
  nadia: [
    "neutral",
    "smile",
    "blush",
    "angry",
    "tanktopNeutral",
    "tanktopSmile",
    "tanktopBlush",
    "tanktopAngry",
    "towelNeutral",
    "towelSmile",
    "towelBlush",
    "towelAngry",
    "newNormal",
    "newSmile",
  ] as const,
} as const;

export type CharacterEmotionMap = typeof characterEmotions;

export type CharacterEmotion<TCharacterId extends CharacterId> = CharacterEmotionMap[TCharacterId][number];

export type AnyCharacterEmotion = CharacterEmotion<CharacterId>;
