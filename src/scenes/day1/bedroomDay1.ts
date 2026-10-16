import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, hide, jump, narrate, say, show } from "@/scenes/scriptTypes";
import bedroom from "@/background/bedroom-afteroon.png";

export const bedroomDay1Scene: VisualNovelCommand[] = [
  bg(bedroom, tx({
    id: "Lentera Apartments - Kamar",
    en: "Lentera Apartments - Bedroom",
    ja: "レンテラ・アパートメント - 寝室",
    ko: "렌테라 아파트 - 침실",
  })),
  show("arka-bedroom", "arka", "neutral", {
    position: "left",
    enterFrom: "fade",
  }),
  say(
    "arka",
    "neutral",
    tx({
      id: "Baru sehari aku di sini, tapi tempat ini udah nggak setenang yang kubayangin. Aku datang buat cari tenang, ngoding, dan bertahan dari urusan kuliah... bukan buat jadi teknisi dadakan.",
      en: "I've only been here a day, and this place is already way less quiet than I expected. I came here to chill, grind some code, and survive college stuff... not to become the building's emergency technician.",
      ja: "まだ来て一日なのに、ここは思ってたほど静かじゃない。静かに過ごして、コードを書いて、大学生活をやり過ごすために来たはずなのに…急ごしらえの修理屋になるためじゃない。",
      ko: "여기 온 지 하루밖에 안 됐는데, 벌써 생각보다 조용하지 않다. 난 그냥 조용히 지내면서 코딩하고, 대학 생활이나 버티려 왔을 뿐인데... 갑자기 수리 기사가 될 줄은 몰랐다.",
    }),
  ),
  say(
    "arka",
    "surprised",
    tx({
      id: "Terus ada Nadia di lantai atas. Berisik, chaos, dan entah kenapa nggak bisa diabaikan. Kalau energi segede itu dibiarkan, pasti ada aja yang meledak.",
      en: "Then there's Nadia upstairs. Loud, chaotic, and somehow impossible to ignore. If I leave that much energy unattended, something's definitely gonna blow up.",
      ja: "それに上の階のナディア。騒がしくて、カオスで、どういうわけか放っておけない。あれだけのエネルギーを放置したら、きっと何かしら爆発する。",
      ko: "그리고 위층의 나디아. 시끄럽고, 혼란스럽고, 이상하게 무시가 안 된다. 저 정도 에너지를 방치하면 분명 뭔가 터진다.",
    }),
  ),
  narrate(
    tx({
      id: "Arka meletakkan ponselnya di samping bantal, mematikan lampu, lalu membiarkan tubuhnya tenggelam ke kasur.",
      en: "Arka sets his phone beside the pillow, turns off the light, and lets his body sink into the mattress.",
      ja: "アルカはスマホを枕元に置き、明かりを消して、そのままベッドへ身を沈めた。",
      ko: "아르카는 휴대폰을 베개 옆에 내려두고 불을 끈 뒤 그대로 침대에 몸을 맡긴다.",
    }),
  ),
  hide("arka-bedroom"),
  jump("day1-complate"),
];
