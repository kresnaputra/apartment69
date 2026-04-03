import type { VisualNovelCommand } from "@/types/novel";

export const visitRouteScene: VisualNovelCommand[] = [
  {
    type: "scene",
    location: "Stasiun Senja",
    background:
      "radial-gradient(circle at top, rgba(193,127,255,0.28), transparent 34%), linear-gradient(180deg, #271524 0%, #161024 55%, #08070e 100%)",
  },
  {
    type: "say",
    speaker: "Aira",
    text: "Kalau begitu jangan beri aku janji. Duduklah sebentar, dengarkan ceritaku, lalu pergilah tanpa merasa berutang apa pun.",
  },
  {
    type: "say",
    speaker: null,
    text: "Kereta terakhir belum datang. Masih ada sedikit waktu untuk pura-pura bahwa perpisahan bisa terasa sopan.",
  },
  {
    type: "jump",
    target: "epilogue",
  },
];
