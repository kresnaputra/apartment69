export const characterIds = ["arka", "maya", "elena", "nadia", "sara"] as const;

export type CharacterId = (typeof characterIds)[number];

export const characterEmotions = {
  arka: ["neutral", "gentle", "serious", "shy", "surprised"] as const,
  maya: ["neutral", "calm", "teasing", "worried", "surprised", "sad", "blush"] as const,
  elena: ["neutral"] as const,
  nadia: ["neutral"] as const,
  sara: ["neutral"] as const,
} as const;

export type CharacterEmotionMap = typeof characterEmotions;

export type CharacterEmotion<TCharacterId extends CharacterId> = CharacterEmotionMap[TCharacterId][number];

export type AnyCharacterEmotion = CharacterEmotion<CharacterId>;
