import type { VisualNovelCommand } from "@/types/novel";
import { jump, moveTo, narrate, say, scene, show } from "@/scenes/scriptTypes";

export const visitRouteScene: VisualNovelCommand[] = [
  scene(
    "radial-gradient(circle at top, rgba(193,127,255,0.28), transparent 34%), linear-gradient(180deg, #271524 0%, #161024 55%, #08070e 100%)",
    "Stasiun Senja",
  ),
  show("reno-main", "reno", "worried", { position: "right", enterFrom: "none", yOffset: 60, scale: 1.08 }),
  moveTo("reno-main", "center", { duration: 760, easing: "ease-in-out", xOffset: 0.03 }),
  say("aira", "shy", "Kalau begitu jangan beri aku janji. Duduklah sebentar, dengarkan ceritaku, lalu pergilah tanpa merasa berutang apa pun."),
  say("reno", "teasing", "Kalau cuma mampir, setidaknya duduk sampai kereta terakhir benar-benar lewat."),
  narrate("Kereta terakhir belum datang. Masih ada sedikit waktu untuk pura-pura bahwa perpisahan bisa terasa sopan."),
  jump("epilogue"),
];
