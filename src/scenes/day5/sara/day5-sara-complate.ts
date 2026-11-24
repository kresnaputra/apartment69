import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { centeredText, jump, scene } from "@/scenes/scriptTypes";
import { dayChangeClassic } from "@/cut-scene/dayChangeBackgrounds";

const day5SaraDayChange: VisualNovelCommand[] = [
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", "", {
    transitionDuration: 1000,
    backgroundVideo: dayChangeClassic,
  }),
  centeredText(
    tx({
      id: "HARI 5 SELESAI",
      en: "DAY 5 COMPLETE",
      ja: "5日目 終了",
      ko: "5일차 완료",
    }),
    { size: "hero", typingSpeed: 0.3 },
  ),
];

export const day5SaraRouteEndScene: VisualNovelCommand[] = [
  ...day5SaraDayChange,
  jump("day6-sara-start"),
];

// Keep the old notice's dialogue positions usable by existing saves.
export const day5SaraRouteNoticeScene: VisualNovelCommand[] = [
  ...day5SaraDayChange,
  centeredText(
    tx({
      id: "RUTE SARAH BERLANJUT",
      en: "SARAH'S ROUTE CONTINUES",
      ja: "サラルート 続き",
      ko: "사라 루트 계속",
    }),
    { size: "hero" },
  ),
  centeredText(
    tx({
      id: "Keesokan paginya...",
      en: "The next morning...",
      ja: "翌朝……",
      ko: "다음 날 아침…",
    }),
    { size: "sub" },
  ),
  jump("day6-sara-start"),
];
