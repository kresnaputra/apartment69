import type { VisualNovelCommand } from "@/types/novel";

export const epilogueScene: VisualNovelCommand[] = [
  {
    type: "say",
    speaker: null,
    text: "Dialog sekarang sudah dipisah per file scene, jadi struktur ceritanya lebih rapi dan gampang diperluas.",
  },
  {
    type: "say",
    speaker: "System",
    text: "Klik, tekan Space, atau Enter untuk mengulang adegan dari awal.",
  },
  {
    type: "menu",
    prompt: "Lanjut ke mana?",
    options: [{ id: "restart", label: "Ulang dari awal", next: "opening" }],
  },
];
