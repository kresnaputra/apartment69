import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, hide, minigame, narrate, playBgm, say, show } from "@/scenes/scriptTypes";
import apartmentUrl from "@/background/apartment.png";
import day4Bgm from "@/music/day4.mp3";

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
    disabledContacts: ["sara", "sleep"],
    conditionalDisabledContacts: {
      elena: "day4ElenaCompleted",
      nadia: "day4NadiaCompleted",
    },
    conditionalEnabledContacts: { nadia: "day3NadiaCompleted" },
    contactOverrides: {
      maya: { next: "day4-maya-collapse" },
      elena: { next: "day4-elena-door" },
      nadia: { next: "day4-nadia-night" },
    },
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
