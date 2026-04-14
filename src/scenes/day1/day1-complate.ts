import type { VisualNovelCommand } from "@/types/novel";
import { centeredText, hide, jump, scene } from "@/scenes/scriptTypes";

export const day1ComplateScene: VisualNovelCommand[] = [
  hide("arka-bedroom"),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", "Day 1 Complete", 1000),
  centeredText("DAY 1 COMPLETE", { size: "hero" }),
  jump("day2-bedroom"),
];
