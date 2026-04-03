import type { VisualNovelCommand } from "@/types/novel";
import { jump, moveTo, narrate, say, scene, show } from "@/scenes/scriptTypes";

export const stayRouteScene: VisualNovelCommand[] = [
  scene(
    "radial-gradient(circle at top, rgba(100,214,255,0.3), transparent 34%), linear-gradient(180deg, #101c32 0%, #0c1125 55%, #04070f 100%)",
    "Stasiun Senja",
  ),
  show("aira-main", "aira", "neutral", { position: "left", enterFrom: "left", yOffset: 100, scale: 1.2 }),
  show("reno-main", "reno", "surprised", { position: "right", enterFrom: "right", yOffset: 60, scale: 1.08 }),
  say("aira", "gentle", "Bagus. Kalau begitu, besok kita berhenti menyebut ini kebetulan. Kita mulai menulis ulang semuanya dari awal."),
  moveTo("aira-main", "center", { duration: 800, easing: "ease-in-out" }),
  say("reno", "calm", "Akhirnya ada juga jawaban yang terdengar seperti awal cerita, bukan akhir yang terlambat."),
  narrate("Dia tersenyum tipis, seperti seseorang yang akhirnya percaya pada akhir yang belum sempat terjadi."),
  jump("epilogue"),
];
