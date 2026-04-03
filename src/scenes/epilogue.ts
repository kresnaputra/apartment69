import type { VisualNovelCommand } from "@/types/novel";
import { menu, narrate, say, scene, show } from "@/scenes/scriptTypes";

export const epilogueScene: VisualNovelCommand[] = [
  scene(
    "radial-gradient(circle at top, rgba(255,226,184,0.22), transparent 34%), linear-gradient(180deg, #171428 0%, #0f1630 55%, #05070d 100%)",
    "Peron Setelah Hujan",
    1000,
  ),
  show("reno-main", "reno", "calm", { position: "right", enterFrom: "none", yOffset: 60, scale: 1.08 }),
  narrate("Dialog sekarang sudah dipisah per file scene, jadi struktur ceritanya lebih rapi dan gampang diperluas."),
  say("reno", "teasing", "Dan satu bundle `.sbn` pun sekarang bisa dipakai oleh lebih dari satu karakter."),
  say("aira", "surprised", "Klik, tekan Space, atau Enter untuk mengulang adegan dari awal."),
  menu("Lanjut ke mana?", [{ id: "restart", label: "Ulang dari awal", next: "opening" }]),
];
