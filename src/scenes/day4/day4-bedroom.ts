import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, hide, jump, narrate, show } from "@/scenes/scriptTypes";
import apartmentUrl from "@/background/apartment.png";

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
      id: "Siang Hari 4 berjalan pelan. Arka tenggelam dalam kerjaan freelance-nya sampai tanpa sadar malam sudah tiba.",
      en: "Day 4 moves into the afternoon quietly. Arka buries himself in freelance work until night falls before he even notices.",
      ja: "4日目の昼は静かに流れていた。アルカはフリーの仕事に没頭し、気づけばもう夜になっていた。",
      ko: "4일차 오후는 조용하게 흘렀다. 아르카는 프리랜서 일에 몰두하다 보니 어느새 밤이 되어 있었다.",
    }),
  ),
  hide("arka-day4-bedroom-phone"),
  jump("day4-nadia-night"),
];
