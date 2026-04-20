import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { centeredText, hide, interstitial, jump, scene } from "@/scenes/scriptTypes";

export const day2ComplateScene: VisualNovelCommand[] = [
  hide("arka-bedroom"),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", tx({
    id: "Tamat",
    en: "The End",
    ja: "終わり",
    ko: "끝",
  }), 1000),
  centeredText(tx({
    id: "HARI 2 SELESAI",
    en: "DAY 2 COMPLETE",
    ja: "2日目 終了",
    ko: "2일차 완료",
  }), { size: "hero" }),
  interstitial(),
  jump("day3-maya-phone-call"),
];
