import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { centeredText, hide, jump, scene } from "@/scenes/scriptTypes";

export const day3ComplateScene: VisualNovelCommand[] = [
  hide("arka-bedroom"),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", "", 1000),
  centeredText(tx({
    id: "HARI 3 SELESAI",
    en: "DAY 3 COMPLETE",
    ja: "3日目 終了",
    ko: "3일차 완료",
  }), { size: "hero" }),
  jump("day4-maya-collapse"),
];
