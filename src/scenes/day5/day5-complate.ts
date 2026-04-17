import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { centeredText, hide, jump, scene } from "@/scenes/scriptTypes";

export const day5ComplateScene: VisualNovelCommand[] = [
  hide("arka-day5-lobby"),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", "", 1000),
  centeredText(tx({
    id: "HARI 5 SELESAI",
    en: "DAY 5 COMPLETE",
    ja: "5日目 終了",
    ko: "5일차 완료",
  }), { size: "hero" }),
  jump("day6-papa-confrontation"),
];
