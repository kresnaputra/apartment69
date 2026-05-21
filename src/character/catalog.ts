export const characterIds = ["arka", "maya", "elena", "nadia", "sara", "mayasFather"] as const;

export type CharacterId = (typeof characterIds)[number];

export const characterEmotions = {
  arka: ["neutral", "gentle", "serious", "shy", "surprised"] as const,
  maya: ["neutral", "calm", "teasing", "worried", "surprised", "sad", "blush", "angry", "fallen"] as const,
  elena: ["neutral", "angry", "blush", "smile"] as const,
  nadia: ["neutral"] as const,
  sara: ["neutral"] as const,
  mayasFather: ["neutral"] as const,
} as const;

export type CharacterEmotionMap = typeof characterEmotions;

export type CharacterEmotion<TCharacterId extends CharacterId> = CharacterEmotionMap[TCharacterId][number];

export type AnyCharacterEmotion = CharacterEmotion<CharacterId>;
