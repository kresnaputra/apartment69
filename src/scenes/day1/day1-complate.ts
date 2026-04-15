import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { centeredText, hide, jump, scene } from "@/scenes/scriptTypes";

export const day1ComplateScene: VisualNovelCommand[] = [
  hide("arka-bedroom"),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", tx({
    id: "Hari 1 Selesai",
    en: "Day 1 Complete",
    ja: "1日目 終了",
    ko: "1일차 완료",
  }), 1000),
  centeredText(tx({
    id: "HARI 1 SELESAI",
    en: "DAY 1 COMPLETE",
    ja: "1日目 終了",
    ko: "1일차 완료",
  }), { size: "hero" }),
  jump("day2-bedroom"),
];
