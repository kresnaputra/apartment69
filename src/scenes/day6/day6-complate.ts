import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { centeredText, hide, interstitial, jump, scene } from "@/scenes/scriptTypes";
import { dayChangeClassic } from "@/cut-scene/dayChangeBackgrounds";

export const day6ComplateScene: VisualNovelCommand[] = [
  hide("arka-day6-room"),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", "", {
    transitionDuration: 1000,
    backgroundVideo: dayChangeClassic,
  }),
  centeredText(tx({
    id: "HARI 6 SELESAI",
    en: "DAY 6 COMPLETE",
    ja: "6日目 終了",
    ko: "6일차 완료",
  }), { size: "hero", typingSpeed: 0.3 }),
  interstitial(),
  jump("day7-intro"),
];
