import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { centeredText, hide, interstitial, jump, scene } from "@/scenes/scriptTypes";
import { dayChangeClassic } from "@/cut-scene/dayChangeBackgrounds";

export const day3ComplateScene: VisualNovelCommand[] = [
  hide("arka-bedroom"),
  hide("arka-day3-nadia"),
  hide("nadia-day3-night"),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", "", {
    transitionDuration: 1000,
    backgroundVideo: dayChangeClassic,
  }),
  centeredText(tx({
    id: "HARI 3 SELESAI",
    en: "DAY 3 COMPLETE",
    ja: "3日目 終了",
    ko: "3일차 완료",
  }), { size: "hero", typingSpeed: 0.3 }),
  interstitial(),
  jump("day4-bedroom"),
];
