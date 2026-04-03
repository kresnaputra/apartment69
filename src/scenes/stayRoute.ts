import type { VisualNovelCommand } from "@/types/novel";

export const stayRouteScene: VisualNovelCommand[] = [
  {
    type: "scene",
    location: "Stasiun Senja",
    background:
      "radial-gradient(circle at top, rgba(100,214,255,0.3), transparent 34%), linear-gradient(180deg, #101c32 0%, #0c1125 55%, #04070f 100%)",
  },
  {
    type: "say",
    speaker: "Aira",
    text: "Bagus. Kalau begitu, besok kita berhenti menyebut ini kebetulan. Kita mulai menulis ulang semuanya dari awal.",
  },
  {
    type: "say",
    speaker: null,
    text: "Dia tersenyum tipis, seperti seseorang yang akhirnya percaya pada akhir yang belum sempat terjadi.",
  },
  {
    type: "jump",
    target: "epilogue",
  },
];
