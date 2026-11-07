import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, centeredText, clearFlag, hide, jumpIfNoRoute, minigame, narrate, playBgm, say, scene, show } from "@/scenes/scriptTypes";
import apartmentUrl from "@/background/apartment.png";
import day4Bgm from "@/music/day4.mp3";

/**
 * Day 4 heroine pick. Shared by the first pick and the backup pick after a
 * route closes, so both lock contacts the same way.
 */
export const day4RoutePhoneOptions = {
  disabledContacts: ["sara", "sleep"],
  conditionalDisabledContacts: {
    elena: "day4ElenaCompleted",
    nadia: "day4NadiaCompleted",
  },
  conditionalEnabledContacts: {
    nadia: "day3NadiaCompleted",
    sara: "day3SaraCompleted",
  },
  contactOverrides: {
    maya: { next: "day4-maya-collapse" },
    elena: { next: "day4-elena-door" },
    nadia: { next: "day4-nadia-night" },
    sara: {
      next: "day4-sara-start",
      blurb: tx({
        id: "Sarah meminta bertemu di basement parking dalam dua puluh menit.",
        en: "Sarah asked to meet in the basement parking within twenty minutes.",
      }),
    },
  },
};

export const day4BedroomScene: VisualNovelCommand[] = [
  bg(apartmentUrl, tx({
    id: "Apartment 69 Hari 4",
    en: "Apartment 69 Day 4",
    ja: "Apartment 69 - 4日目",
    ko: "Apartment 69 - 4일차",
  })),
  show("arka-day4-bedroom-phone", "arka", "serious", {
    position: "left",
    enterFrom: "fade",
  }),
  narrate(
    tx({
      id: "Siang Hari 4 berjalan pelan. Sebelum keluar, Arka lebih dulu meraih ponselnya untuk menentukan siapa yang perlu dia cek hari ini.",
      en: "Day 4 moves into the afternoon quietly. Before heading out, Arka reaches for his phone first to decide who he needs to check on today.",
      ja: "4日目の昼は静かに流れていた。出かける前に、アルカはまずスマホを手に取り、今日は誰の様子を見るべきかを決める。",
      ko: "4일차 오후는 조용하게 흘렀다. 밖으로 나가기 전, 아르카는 먼저 휴대폰을 들어 오늘 누구를 확인해야 할지 정한다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Lihat dulu... siang ini aku mulai dari siapa?",
      en: "Let's see... who am I starting with this afternoon?",
      ja: "さて…今日の昼は誰から向かう？",
      ko: "어디 보자... 오늘 오후는 누구부터 볼까?",
    }),
  ),
  hide("arka-day4-bedroom-phone"),
  jumpIfNoRoute("route-game-over", day4RoutePhoneOptions),
  minigame("smartphone-contacts", {
    title: tx({
      id: "Pilih Tujuan Siang Ini",
      en: "Choose This Afternoon's Stop",
      ja: "今日の昼の行き先を選ぶ",
      ko: "오늘 오후 목적지 선택",
    }),
    subtitle: tx({
      id: "Hari masih panjang. Arka perlu memutuskan siapa yang paling perlu dia datangi lebih dulu.",
      en: "The day is still long. Arka needs to decide who he should check on first.",
      ja: "まだ日は長い。まず誰のところへ向かうべきか、アルカが決める番だ。",
      ko: "하루는 아직 길다. 아르카는 먼저 누구를 찾아가야 할지 정해야 한다.",
    }),
    ...day4RoutePhoneOptions,
  }),
];

export const day4AfterRoutePhoneScene: VisualNovelCommand[] = [
  playBgm(day4Bgm),
  bg(apartmentUrl, tx({
    id: "Apartment 69 Hari 4",
    en: "Apartment 69 Day 4",
    ja: "Apartment 69 - 4日目",
    ko: "Apartment 69 - 4일차",
  })),
  minigame("smartphone-contacts", {
    showSleepOption: true,
    sleepOptionNext: "day4-complate",
    disabledContacts: ["maya", "elena", "nadia", "sara"],
    title: tx({
      id: "Akhiri Hari 4",
      en: "Wrap Up Day 4",
      ja: "4日目を締めくくる",
      ko: "4일차 마무리",
    }),
    subtitle: tx({
      id: "Hari ini Arka hanya sempat memilih satu rute. Sisanya bisa menunggu besok.",
      en: "Today, Arka only had time to choose one route. The rest can wait until tomorrow.",
      ja: "今日は一つのルートを選ぶだけで終わった。残りは明日に回せばいい。",
      ko: "오늘은 한 루트만 선택할 수 있었다. 나머지는 내일로 미뤄도 된다.",
    }),
    contactOverrides: {
      sleep: {
        blurb: tx({
          id: "Pulang ke unit dan lanjutkan sisanya besok.",
          en: "Head back to your unit and continue the rest tomorrow.",
          ja: "部屋へ戻って、残りは明日に回そう。",
          ko: "방으로 돌아가고, 나머지는 내일 이어가자.",
        }),
      },
    },
  }),
];

/**
 * Backup pick after the Day 4 route closes. The player keeps at most two
 * routes from Day 2: if the other one is still open it can be played now,
 * otherwise the run jumps to `noRouteTarget`.
 */
export const day4BackupRouteScene = (noRouteTarget: string): VisualNovelCommand[] => [
  // Lift the one-route-per-day lock so the remaining route can be picked.
  clearFlag("day4SelectedCharacter"),
  jumpIfNoRoute(noRouteTarget, day4RoutePhoneOptions),
  playBgm(day4Bgm),
  bg(apartmentUrl, tx({
    id: "Apartment 69 Hari 4",
    en: "Apartment 69 Day 4",
    ja: "Apartment 69 - 4日目",
    ko: "Apartment 69 - 4일차",
  })),
  narrate(
    tx({
      id: "Arka kembali ke unitnya dan menatap layar ponsel lama. Masih ada satu orang lagi yang menunggunya.",
      en: "Arka returns to his unit and stares at his phone for a long while. There is still one more person waiting for him.",
      ja: "アルカは部屋へ戻り、長い間スマホの画面を見つめる。まだ一人、彼を待っている人がいる。",
      ko: "아르카는 방으로 돌아와 한참 동안 휴대폰 화면을 바라본다. 아직 그를 기다리는 사람이 한 명 더 있다.",
    }),
  ),
  minigame("smartphone-contacts", {
    ...day4RoutePhoneOptions,
    title: tx({
      id: "Rute Terakhir",
      en: "Last Remaining Route",
      ja: "残されたルート",
      ko: "남은 마지막 루트",
    }),
    subtitle: tx({
      id: "Satu rute sudah berakhir. Hanya tersisa satu kesempatan lagi.",
      en: "One route has ended. Only one chance remains.",
      ja: "一つのルートは終わった。残されたチャンスはあと一つだけ。",
      ko: "한 루트가 끝났다. 남은 기회는 단 하나뿐이다.",
    }),
  }),
];

/** Entered after a Day 4 route fails (Maya bad ending, Nadia skipped). */
export const day4RouteFallbackScene = day4BackupRouteScene("route-game-over");

/** Shown when every route the player chose has closed. Ends the run. */
export const routeGameOverScene: VisualNovelCommand[] = [
  scene("linear-gradient(180deg, #000000 0%, #000000 100%)", "", 1000),
  centeredText(
    tx({
      id: "GAME OVER",
      en: "GAME OVER",
      ja: "GAME OVER",
      ko: "GAME OVER",
    }),
    { size: "hero", typingSpeed: 0.3 },
  ),
  centeredText(
    tx({
      id: "Semua rute yang kamu pilih telah berakhir.",
      en: "Every route you chose has come to an end.",
      ja: "選んだすべてのルートが終わりを迎えた。",
      ko: "선택한 모든 루트가 끝났다.",
    }),
    { size: "sub" },
  ),
];
