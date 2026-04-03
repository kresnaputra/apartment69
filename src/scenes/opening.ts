import type { VisualNovelCommand } from "@/types/novel";

export const openingScene: VisualNovelCommand[] = [
  {
    type: "scene",
    location: "Stasiun Senja",
    background:
      "radial-gradient(circle at top, rgba(255,169,122,0.36), transparent 34%), linear-gradient(180deg, #291323 0%, #12172f 52%, #071018 100%)",
  },
  {
    type: "showCharacter",
    id: "player",
    characterId: "aira",
  },
  {
    type: "say",
    speaker: null,
    text: "Peron itu nyaris kosong. Hanya suara rel yang mendingin dan seseorang yang menunggumu di bawah lampu terakhir.",
  },
  {
    type: "say",
    speaker: "Aira",
    text: "Kamu datang juga. Aku sempat berpikir kamu akan membiarkan hari ini lewat begitu saja.",
  },
  {
    type: "say",
    speaker: "Aira",
    text: "Kalau kita benar-benar mau memulai cerita ini, jawab aku jujur. Kamu datang untuk tinggal, atau hanya mampir sebentar?",
  },
  {
    type: "menu",
    prompt: "Apa jawabanmu?",
    options: [
      { id: "stay", label: "Aku datang untuk tinggal.", next: "stay-route" },
      { id: "visit", label: "Aku cuma mampir sebentar.", next: "visit-route" },
    ],
  },
];
