import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, minigame, narrate, show } from "@/scenes/scriptTypes";
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
      id: "Selanjutnya mau ke mana, atau bantu siapa lagi ya?",
      en: "So where to next... or who else should I check on?",
      ja: "さて、次はどこに行くか…それとも誰か他に手伝えるやつはいるかな。",
      ko: "그럼 다음엔 어디로 가지... 아니면 누구를 더 도와줄 수 있을까.",
    }),
    "arka",
  ),
  minigame("smartphone-contacts", { showSleepOption: true, sleepOptionNext: "day2-complate", disabledContacts: ["maya", "elena", "nadia", "sara"] }),
];
