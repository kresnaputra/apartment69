import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { centeredText, hide, jumpIf, scene, setFlag } from "@/scenes/scriptTypes";
import { mayaDayChangeClassic } from "@/cut-scene/dayChangeBackgrounds";
import { day4BackupRouteScene } from "@/scenes/day4/day4-bedroom";

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
  setFlag("gallerySceneMaya1Unlocked", true),
  jumpIf("galleryMode", "gallery-return", {
    value: true,
    elseTarget: "day5-maya-morning",
  }),
];

// Sarah's route has no Day 5 content yet, so it closes after Day 4. The player
// can still play their other chosen route; if none is left, the run ends with
// a next-update notice and returns to the main menu.
export const day4SaraRouteEndScene: VisualNovelCommand[] = [
  setFlag("saraRouteClosed", true),
  ...day4BackupRouteScene("day4-sara-route-notice"),
];

// Ending the label marks the story as finished; the next click/tap returns to
// the main menu.
export const day4SaraRouteNoticeScene: VisualNovelCommand[] = [
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
