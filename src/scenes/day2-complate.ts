import type { VisualNovelCommand } from "@/types/novel";
import { centeredText, hide, scene } from "@/scenes/scriptTypes";

export const day2ComplateScene: VisualNovelCommand[] = [
  hide("arka-bedroom"),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", "The End", 1000),
  centeredText("DAY 2 COMPLETE", { size: "hero" }),
];
