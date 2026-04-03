import { epilogueScene } from "@/scenes/epilogue";
import { openingScene } from "@/scenes/opening";
import { stayRouteScene } from "@/scenes/stayRoute";
import { visitRouteScene } from "@/scenes/visitRoute";
import type { VisualNovelScript } from "@/types/novel";

export const demoScript: VisualNovelScript = {
  startLabel: "opening",
  labels: {
    opening: openingScene,
    "stay-route": stayRouteScene,
    "visit-route": visitRouteScene,
    epilogue: epilogueScene,
  },
};
