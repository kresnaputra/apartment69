import type { VisualNovelCommand } from "@/types/novel";
import { jump, narrate, say, scene, show } from "@/scenes/scriptTypes";

export const stayRouteScene: VisualNovelCommand[] = [
  scene(
    "radial-gradient(circle at top, rgba(100,214,255,0.3), transparent 34%), linear-gradient(180deg, #101c32 0%, #0c1125 55%, #04070f 100%)",
    "Stasiun Senja",
  ),
  show("arka-main", "arka", "neutral", { position: "left", enterFrom: "left" }),
  show("maya-main", "maya", "surprised", { position: "right", enterFrom: "right" }),
  say("arka", "gentle", "Bagus. Kalau begitu, besok kita berhenti menyebut ini kebetulan. Kita mulai menulis ulang semuanya dari awal."),
  say("maya", "calm", "Akhirnya ada juga jawaban yang terdengar seperti awal cerita, bukan akhir yang terlambat."),
  narrate("Dia tersenyum tipis, seperti seseorang yang akhirnya percaya pada akhir yang belum sempat terjadi."),
  jump("epilogue"),
];
