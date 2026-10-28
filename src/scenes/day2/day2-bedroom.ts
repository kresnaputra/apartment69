import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, jump, narrate, playBgm, say } from "@/scenes/scriptTypes";
import apartmentUrl from "@/background/apartment.png";
import bgm from "@/music/day2.mp3";
import mayaBgm from "@/music/day2-maya.mp3";

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
      id: "Pagi datang terlalu cepat. Arka meraih ponselnya sambil masih setengah sadar, lalu menatap daftar kontak yang semalam terus terlintas di kepalanya.",
      en: "Morning came too fast. Arka reaches for his phone while still half awake, then stares at the contact list that kept running through his head last night.",
      ja: "朝はあまりにも早く来た。アルカはまだ半分眠ったままスマホを手に取り、昨夜ずっと頭をよぎっていた連絡先の一覧を見つめる。",
      ko: "아침은 너무 빨리 찾아왔다. 아르카는 아직 반쯤 잠든 채 휴대폰을 집어 들고, 어젯밤 계속 머릿속을 맴돌던 연락처 목록을 바라본다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Oke... udah jelas. Pagi ini aku cek Maya dulu.",
      en: "Okay... decided. This morning I'm checking on Maya first.",
      ja: "よし…決まりだ。今朝はまずマヤの様子を見る。",
      ko: "좋아... 정했다. 오늘 아침은 마야부터 확인하러 가자.",
    }),
  ),
  jump("day2-route-maya"),
];

export const day2RouteMayaScene: VisualNovelCommand[] = [
  playBgm(mayaBgm),
  narrate(
    tx({
      id: "Arka menjatuhkan ponselnya ke kasur lalu berdiri. Maya masih yang paling mengganggu pikirannya sejak kemarin.",
      en: "Arka drops his phone onto the bed and gets up. Maya is still the one weighing on his mind the most since yesterday.",
      ja: "アルカはスマホをベッドに放り、立ち上がった。昨日から一番気がかりなのは、やはりマヤだった。",
      ko: "아르카는 휴대폰을 침대 위에 던져 두고 일어선다. 어제부터 가장 마음에 걸리는 사람은 역시 마야다.",
    }),
  ),
  narrate(
    tx({
      id: "Dia kelihatan pucat banget kemarin, bahkan rasanya dia belum makan yang bener. Mending cek dia dulu.",
      en: "She looked way too pale yesterday, and it didn't even seem like she'd eaten properly. Better check on her first.",
      ja: "昨日の彼女は顔色が悪すぎたし、ろくに食べてもいなさそうだった。先に様子を見に行くべきだ。",
      ko: "어제 그녀는 너무 창백했고, 제대로 먹지도 못한 것 같았다. 먼저 확인하러 가는 게 맞다.",
    }),
  ),
  jump("day2-hallway"),
];
