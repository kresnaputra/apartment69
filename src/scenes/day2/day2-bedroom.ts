import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, jump, narrate } from "@/scenes/scriptTypes";
import apartmentUrl from "@/background/apartment.png";

export const day2BedroomScene: VisualNovelCommand[] = [
  bg(apartmentUrl, tx({
    id: "Apartment 69 Hari 2",
    en: "Apartment 69 Day 2",
    ja: "Apartment 69 - 2日目",
    ko: "Apartment 69 - 2일차",
  })),
  narrate(
    tx({
      id: "Sesuai rencanaku semalam, pagi ini aku memutuskan buat cek tetangga sebelah. Kemarin dia kelihatan pucat banget, aku bahkan nggak yakin dia sempat sarapan.",
      en: "Like I planned last night, I decided to check on my neighbor next door. She looked so pale yesterday, I'm not sure she even got to eat breakfast.",
      ja: "昨夜考えていた通り、今朝は隣の部屋の様子を見に行くことにした。昨日の彼女はひどく顔色が悪かったし、朝ごはんすら食べてないんじゃないかって気がしてる。",
      ko: "어젯밤 생각했던 대로, 오늘 아침엔 옆집 상태를 좀 보러 가기로 했다. 어제 그녀 얼굴이 너무 창백해서 아침도 못 먹었을 것 같았다.",
    }),
  ),
  
  jump("day2-hallway"),
];
