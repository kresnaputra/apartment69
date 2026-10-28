import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { centeredText, hide, scene } from "@/scenes/scriptTypes";

export const epilogueScene: VisualNovelCommand[] = [
  hide("arka-bedroom"),
  scene(
    "linear-gradient(180deg, #000000 0%, #030303 100%)",
    tx({
      id: "Tamat",
      en: "The End",
      ja: "終わり",
      ko: "끝",
    }),
    1000,
  ),
  centeredText(tx({
    id: "HARI 1 SELESAI",
    en: "DAY 1 COMPLETE",
    ja: "1日目 終了",
    ko: "1일차 완료",
  }), { size: "hero" }),
  centeredText(tx({
    id: "AKHIR DEMO",
    en: "END OF DEMO",
    ja: "体験版終了",
    ko: "데모 종료",
  }), { size: "sub" }),
];
