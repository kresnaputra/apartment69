import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { centeredText, scene, setFlag } from "@/scenes/scriptTypes";
import { dayChangeClassic } from "@/cut-scene/dayChangeBackgrounds";
import { day4BackupRouteScene } from "@/scenes/day4/day4-bedroom";

// Sarah's route has no Day 6 content yet, so it closes after Day 5. The player
// can still play their other chosen route; if none is left, the run ends with
// a next-update notice and returns to the main menu.
export const day5SaraRouteEndScene: VisualNovelCommand[] = [
  setFlag("saraRouteClosed", true),
  ...day4BackupRouteScene("day5-sara-route-notice"),
];

// Ending the label marks the story as finished; the next click/tap returns to
// the main menu.
export const day5SaraRouteNoticeScene: VisualNovelCommand[] = [
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
  centeredText(
    tx({
      id: "RUTE SARAH SELESAI",
      en: "SARAH'S ROUTE COMPLETE",
      ja: "サラルート 終了",
      ko: "사라 루트 완료",
    }),
    { size: "hero" },
  ),
  centeredText(
    tx({
      id: "Kisah Sarah akan berlanjut di update berikutnya. Terima kasih sudah bermain!",
      en: "Sarah's story will continue in the next update. Thank you for playing!",
      ja: "サラの物語は次回のアップデートで続きます。プレイしていただきありがとうございます！",
      ko: "사라의 이야기는 다음 업데이트에서 계속됩니다. 플레이해 주셔서 감사합니다!",
    }),
    { size: "sub" },
  ),
];
