import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { centeredText, hide, jumpIf, scene } from "@/scenes/scriptTypes";
import { mayaDayChangeClassic } from "@/cut-scene/dayChangeBackgrounds";

export const day4ComplateScene: VisualNovelCommand[] = [
  hide("arka-day4-bedroom"),
  hide("maya-day4-bedroom"),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", "", {
    transitionDuration: 1000,
    backgroundVideo: mayaDayChangeClassic,
  }),
  centeredText(
    tx({
      id: "HARI 4 SELESAI",
      en: "DAY 4 COMPLETE",
      ja: "4日目 終了",
      ko: "4일차 완료",
    }),
    { size: "hero", typingSpeed: 0.3 },
  ),
  jumpIf("galleryMode", "gallery-return", {
    value: true,
    elseTarget: "day5-maya-morning",
  }),
];
