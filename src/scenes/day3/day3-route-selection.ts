import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, hide, jump, narrate, playBgm, say, show } from "@/scenes/scriptTypes";
import apartmentUrl from "@/background/apartment.png";
import day3Bgm from "@/music/day3.mp3";

export const day3BedroomScene: VisualNovelCommand[] = [
  playBgm(day3Bgm),
  bg(
    apartmentUrl,
    tx({
      id: "Apartment 69 Hari 3",
      en: "Apartment 69 Day 3",
      ja: "Apartment 69 - 3日目",
      ko: "Apartment 69 - 3일차",
    }),
  ),
  narrate(
    tx({
      id: "Pagi Hari 3 dimulai pelan. Arka menghabiskan siangnya di kampus, lalu pulang ke unit saat langit mulai gelap.",
      en: "Day 3 starts quietly. Arka spends the afternoon on campus, then heads back to his unit as the sky starts to darken.",
      ja: "3日目の朝は静かに始まった。アルカは昼を大学で過ごし、空が暗くなり始めた頃に部屋へ戻る。",
      ko: "3일차 아침은 조용히 시작된다. 아르카는 오후를 캠퍼스에서 보내고, 하늘이 어두워질 무렵 방으로 돌아온다.",
    }),
  ),
  show("arka-day3-bedroom", "arka", "neutral", {
    position: "left",
    enterFrom: "fade",
  }),
  say(
    "arka",
    "serious",
    tx({
      id: "Hari ini lumayan tenang. Nadia juga belum ngechat lagi... aneh juga.",
      en: "Today's been pretty quiet. Nadia hasn't texted again either... that's kinda weird.",
      ja: "今日はわりと静かだった。ナディアからもまだ連絡がない…ちょっと変だな。",
      ko: "오늘은 꽤 조용했다. 나디아한테서도 아직 연락이 없네... 좀 이상하다.",
    }),
  ),
  hide("arka-day3-bedroom"),
  jump("day3-nadia-night"),
];
