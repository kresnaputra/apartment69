import type { VisualNovelCommand } from "@/types/novel";
import { menu, moveTo, narrate, say, scene, show } from "@/scenes/scriptTypes";

export const openingScene: VisualNovelCommand[] = [
  scene(
    "radial-gradient(circle at top, rgba(255,169,122,0.36), transparent 34%), linear-gradient(180deg, #291323 0%, #12172f 52%, #071018 100%)",
    "Stasiun Senja",
  ),
  narrate("Peron itu nyaris kosong. Hanya suara rel yang mendingin dan seseorang yang menunggumu di bawah lampu terakhir."),
  show("aira-main", "aira", "neutral", { position: "left", enterFrom: "left", yOffset: 100, scale: 1.2 }),
  show("reno-main", "reno", "calm", { position: "right", enterFrom: "right", yOffset: 60, scale: 1.08 }),
  say("reno", "teasing", "Kamu datang juga. Kupikir Aira harus menunggu sendirian lebih lama di sini."),
  say("aira", "gentle", "Kamu datang juga. Aku sempat berpikir kamu akan membiarkan hari ini lewat begitu saja."),
  moveTo("reno-main", "center", { duration: 720, easing: "ease-in-out", xOffset: 0.02 }),
  say("reno", "worried", "Hei, jangan tegang begitu. Kita cuma mau dengar jawabanmu, bukan menghakimimu."),
  moveTo("aira-main", "left", { duration: 480, easing: "ease-out", xOffset: -0.03 }),
  say("aira", "serious", "Kalau kita benar-benar mau memulai cerita ini, jawab aku jujur. Kamu datang untuk tinggal, atau hanya mampir sebentar?"),
  menu("Apa jawabanmu?", [
    { id: "stay", label: "Aku datang untuk tinggal.", next: "stay-route" },
    { id: "visit", label: "Aku cuma mampir sebentar.", next: "visit-route" },
  ]),
];
