import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, jump, narrate, show } from "@/scenes/scriptTypes";
import bedroomNightUrl from "@/background/bedroom-night.png";

export const day2FreeTimeScene: VisualNovelCommand[] = [
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
      id: "Ah, sudahlah. Maya sudah lebih dari cukup buat hari ini. Sisanya biar menunggu besok.",
      en: "Ah, forget it. Maya was more than enough for today. The rest can wait until tomorrow.",
      ja: "まあ、いいか。今日はマヤで十分すぎた。残りは明日でいい。",
      ko: "됐어, 그만. 오늘은 마야로 충분했다. 나머지는 내일로 미루자.",
    }),
    "arka",
  ),
  jump("day2-complate"),
];
