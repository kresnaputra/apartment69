import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, jump, narrate, playBgm, show } from "@/scenes/scriptTypes";
import bedroomNightUrl from "@/background/bedroom-night.png";
import bgm from "@/music/day2.mp3";

export const day2FreeTimeScene: VisualNovelCommand[] = [
  playBgm(bgm),
  bg(
    bedroomNightUrl,
    tx({
      id: "Apartment 69 - Hari 2",
      en: "Apartment 69 - Day 2",
      ja: "Apartment 69 - 2日目",
      ko: "Apartment 69 - 2일차",
    }),
  ),
  show("arka-bedroom", "arka", "gentle", {
    enterFrom: "left",
    position: "left",
  }),
  narrate(
    tx({
      id: "Urusan laptop Maya udah beres, dan sekarang dia pasti lagi tidur pulas. Kelas online juga udah kelar. Masih ada sisa waktu lumayan banyak hari ini.",
      en: "Maya's laptop situation is handled, and she's definitely passed out by now. Online classes are done too. Still got a pretty decent chunk of the day left.",
      ja: "マヤのノートパソコンの件は片付いたし、今ごろ彼女はぐっすり寝てるはずだ。オンライン授業も終わったし、今日はまだそこそこ時間が残ってる。",
      ko: "마야 노트북 일은 해결됐고, 지금쯤이면 분명 깊게 자고 있을 거다. 온라인 수업도 끝났고, 오늘은 아직 시간이 꽤 남아 있다.",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Hari ini cukup. Maya akhirnya bisa istirahat, dan aku juga butuh tidur buat besok.",
      en: "That's enough for today. Maya can finally get some rest, and I need sleep for tomorrow too.",
      ja: "今日はここまで。マヤもやっと休めるし、俺も明日に備えて寝ないと。",
      ko: "오늘은 여기까지. 마야도 드디어 쉴 수 있고, 나도 내일을 위해 자야 한다.",
    }),
    "arka",
  ),
  jump("day2-complate"),
];
