export const characterIds = ["aira", "reno"] as const;

export type CharacterId = (typeof characterIds)[number];

export const characterEmotions = {
  aira: ["neutral", "gentle", "serious", "shy", "surprised"] as const,
  reno: ["neutral", "calm", "teasing", "worried", "surprised"] as const,
} as const;

export type CharacterEmotionMap = typeof characterEmotions;

export type CharacterEmotion<TCharacterId extends CharacterId> = CharacterEmotionMap[TCharacterId][number];

export type AnyCharacterEmotion = CharacterEmotion<CharacterId>;
