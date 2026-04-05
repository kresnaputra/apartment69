import type { VisualNovelCommand } from "@/types/novel";
import { menu, moveTo, narrate, say, scene, show } from "@/scenes/scriptTypes";

export const openingScene: VisualNovelCommand[] = [
  scene(
    "radial-gradient(circle at top, rgba(255,169,122,0.36), transparent 34%), linear-gradient(180deg, #291323 0%, #12172f 52%, #071018 100%)",
    "Stasiun Senja",
  ),
  narrate("Peron itu nyaris kosong. Hanya suara rel yang mendingin dan seseorang yang menunggumu di bawah lampu terakhir."),
  show("arka-main", "arka", "neutral", { position: "left", enterFrom: "left" }),
  show("maya-main", "maya", "calm", { position: "center", enterFrom: "right", xOffset: 0.06 }),
  say("maya", "teasing", "Kamu datang juga. Kupikir Arka harus menunggu sendirian lebih lama di sini."),
  say("arka", "gentle", "Kamu datang juga. Aku sempat berpikir kamu akan membiarkan hari ini lewat begitu saja."),
  moveTo("maya-main", "center", { duration: 720, easing: "ease-in-out", xOffset: 0.02 }),
  say("maya", "worried", "Hei, jangan tegang begitu. Kita cuma mau dengar jawabanmu, bukan menghakimimu."),
  moveTo("arka-main", "left", { duration: 480, easing: "ease-out", xOffset: -0.03 }),
  say("arka", "serious", "Kalau kita benar-benar mau memulai cerita ini, jawab aku jujur. Kamu datang untuk tinggal, atau hanya mampir sebentar?"),
  menu("Apa jawabanmu?", [
    { id: "stay", label: "Aku datang untuk tinggal.", next: "stay-route" },
    { id: "visit", label: "Aku cuma mampir sebentar.", next: "visit-route" },
  ]),
];
