import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, hide, jump, narrate, say, show } from "@/scenes/scriptTypes";
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
  jump("day4-maya-collapse"),
];

export const day4AfterRoutePhoneScene: VisualNovelCommand[] = [
  jump("day4-complate"),
];
