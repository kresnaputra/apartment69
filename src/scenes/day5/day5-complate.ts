import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { centeredText, hide, interstitial, jump, scene } from "@/scenes/scriptTypes";
import { dayChangeClassic } from "@/cut-scene/dayChangeBackgrounds";

export const day5ComplateScene: VisualNovelCommand[] = [
  hide("arka-day5-lobby"),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", "", {
    transitionDuration: 1000,
    backgroundVideo: dayChangeClassic,
  }),
  centeredText(tx({
    id: "HARI 5 SELESAI",
    en: "DAY 5 COMPLETE",
    ja: "5日目 終了",
    ko: "5일차 완료",
  }), { size: "hero" }),
  interstitial(),
  jump("day6-papa-confrontation"),
];
