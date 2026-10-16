import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, jump, narrate, playBgm } from "@/scenes/scriptTypes";
import apartmentUrl from "@/background/apartment.png";
import bgm from "@/music/day2.mp3";

export const day2BedroomScene: VisualNovelCommand[] = [
  playBgm(bgm),
  bg(apartmentUrl, tx({
    id: "Apartment 69 Hari 2",
    en: "Apartment 69 Day 2",
    ja: "Apartment 69 - 2日目",
    ko: "Apartment 69 - 2일차",
  }), {
    backgroundAnimation: {
      drift: true,
      zoom: 1.08,
      panX: 2.5,
      panY: 1.5,
      duration: 24,
    },
  }),
  narrate(
    tx({
      id: "Pagi datang terlalu cepat. Arka meraih ponselnya sambil masih setengah sadar. Di layar, sudah ada satu pesan baru dari Nadia.",
      en: "Morning came too fast. Arka reaches for his phone while still half awake. There's already a new message from Nadia on the screen.",
      ja: "朝はあまりにも早く来た。アルカはまだ半分眠ったままスマホを手に取る。画面には、もうナディアからの新しいメッセージが届いていた。",
      ko: "아침은 너무 빨리 찾아왔다. 아르카는 아직 반쯤 잠든 채 휴대폰을 집어 든다. 화면에는 벌써 나디아의 새 메시지가 와 있다.",
    }),
  ),
  jump("day2-route-nadia"),
];
