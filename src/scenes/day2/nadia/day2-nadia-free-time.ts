import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, hide, jump, narrate, show } from "@/scenes/scriptTypes";
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
      id: "Urusan setup streaming Nadia sudah beres. Setelah kembali ke unit, aku langsung rebahan dan membiarkan hari ini berakhir.",
      en: "Nadia's streaming setup is handled. After returning to my unit, I flop onto the bed and let the day come to an end.",
      ja: "ナディアの配信環境の問題は片付いた。自分の部屋に戻ると、そのままベッドに倒れ込んで今日を終わらせる。",
      ko: "나디아의 방송 장비 문제는 해결됐다. 내 방으로 돌아와 그대로 침대에 누워 오늘 하루를 마무리한다.",
    }),
    "arka",
  ),
  hide("arka-day2-nadia-free-time"),
  jump("day2-complate"),
];
