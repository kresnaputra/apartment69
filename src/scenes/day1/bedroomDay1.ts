import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, hide, jump, narrate, say, setFlag, show } from "@/scenes/scriptTypes";
import bedroom from "@/background/bedroom-afteroon.png";

export const bedroomDay1Scene: VisualNovelCommand[] = [
  bg(bedroom, tx({
    id: "Lentera Apartments - Kamar",
    en: "Lentera Apartments - Bedroom",
    ja: "レンテラ・アパートメント - 寝室",
    ko: "렌테라 아파트 - 침실",
  })),
  hide("arka-hallway"),
  show("arka-bedroom", "arka", "neutral", {
    position: "left",
    enterFrom: "fade",
  }),
  setFlag("day1PriorityRoute", "maya"),
  say(
    "arka",
    "neutral",
    tx({
      id: "Baru sehari aku di sini, tapi tempat ini udah jauh lebih ramai dari yang kubayangin. Aku datang buat cari tenang, ngoding, dan bertahan dari urusan kuliah... tapi somehow aku malah udah kenal banyak orang. Gila juga.",
      en: "I've only been here a day, and this place is already way busier than I expected. I came here to chill, grind some code, and survive college stuff... and somehow I already ended up getting to know way too many people. Wild.",
      ja: "まだ来て一日なのに、この場所は思ってたよりずっと騒がしい。静かに過ごして、コードを書いて、大学生活をやり過ごすために来たはずなのに…気づけばもうずいぶん色んな人と関わってる。何それ。",
      ko: "여기 온 지 하루밖에 안 됐는데, 벌써 예상보다 훨씬 정신없다. 난 그냥 조용히 지내면서 코딩하고, 대학 생활이나 버티려 왔을 뿐인데... 어쩌다 보니 벌써 너무 많은 사람들과 얽혀 버렸다. 진짜 어이없네.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Terus ada Maya di sebelah. Dia kelihatan udah remuk banget karena stres kuliah, tinggal selangkah lagi buat benar-benar tumbang. Mending besok aku cek dia dulu sebelum urusan kampus makin berat.",
      en: "Then there's Maya next door. She looks seriously wrecked from college stress, one bad day away from completely crashing out. I'd better check in on her first tomorrow before campus gets even rougher.",
      ja: "それに隣のマヤ。大学のストレスでボロボレで、あと一日悪化したら本当に倒れそうだった。大学がもっと忙しくなる前に、明日まず彼女の様子を見ておいたほうがいい。",
      ko: "그리고 옆집의 마야. 학교 스트레스로 완전히 지쳐서, 정말 딱 하루만 더 꼬이면 무너질 것처럼 보였다. 학교 일이 더 힘들어지기 전에 내일 먼저 챙겨봐야겠다.",
    }),
  ),
  narrate(
    tx({
      id: "Arka mengunci ponselnya, meletakkannya di samping bantal, lalu menetapkan Maya jadi prioritas utama besok.",
      en: "Arka locks his phone, drops it beside the pillow, and sets Maya at the top of tomorrow's list.",
      ja: "アルカはスマホをロックして枕元に置き、明日の最優先をマヤに決めた。",
      ko: "아르카는 휴대폰을 잠그고 베개 옆에 내려놓은 뒤, 내일의 최우선을 마야로 정한다.",
    }),
  ),
  hide("arka-bedroom"),
  jump("day1-complate"),
];
