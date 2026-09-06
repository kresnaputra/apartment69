import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, hide, minigame, narrate, show } from "@/scenes/scriptTypes";
import bedroomNightUrl from "@/background/bedroom-night.png";

export const day2NadiaFreeTimeScene: VisualNovelCommand[] = [
  bg(
    bedroomNightUrl,
    tx({
      id: "Apartment 69 - Hari 2",
      en: "Apartment 69 - Day 2",
      ja: "Apartment 69 - 2日目",
      ko: "Apartment 69 - 2일차",
    }),
  ),
  show("arka-day2-nadia-free-time", "arka", "gentle", {
    enterFrom: "left",
    position: "left",
  }),
  narrate(
    tx({
      id: "Urusan setup streaming Nadia sudah beres. Setelah kembali ke unit, ternyata masih ada cukup waktu sebelum hari ini berakhir.",
      en: "Nadia's streaming setup is handled. After returning to my unit, there's still enough time left before the day ends.",
      ja: "ナディアの配信環境の問題は片付いた。自分の部屋に戻ってみると、今日が終わるまでにはまだ十分な時間がある。",
      ko: "나디아의 방송 장비 문제는 해결됐다. 내 방으로 돌아와 보니 오늘이 끝나기 전까지 아직 시간이 충분히 남아 있다.",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Selanjutnya mau menemui siapa?",
      en: "Who should I check on next?",
      ja: "次は誰の様子を見に行こうか？",
      ko: "다음에는 누구를 만나러 갈까?",
    }),
    "arka",
  ),
  hide("arka-day2-nadia-free-time"),
  minigame("smartphone-contacts", {
    showSleepOption: true,
    sleepOptionNext: "day2-complate",
    requiredCompletionFlags: ["day2MayaCompleted", "day2ElenaCompleted"],
    disabledContacts: ["sara"],
    conditionalDisabledContacts: {
      maya: "day2MayaCompleted",
      elena: "day2ElenaCompleted",
      nadia: "day2NadiaCompleted",
    },
    title: tx({
      id: "Lanjutkan Hari 2",
      en: "Continue Day 2",
      ja: "2日目を続ける",
      ko: "2일차 계속하기",
    }),
    subtitle: tx({
      id: "Urusan Nadia sudah beres. Pilih siapa yang mau kamu temui selanjutnya.",
      en: "Nadia is done. Choose who you want to check on next.",
      ja: "ナディアの件は終わった。次に誰の様子を見に行くか選ぼう。",
      ko: "나디아 쪽은 끝났다. 다음에 누구를 만나러 갈지 선택하자.",
    }),
    contactOverrides: {
      maya: {
        next: "day2-route-maya",
      },
      elena: {
        next: "day2-route-elena",
      },
      nadia: {
        next: "day2-route-nadia",
      },
    },
  }),
];
