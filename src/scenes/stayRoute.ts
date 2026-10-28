import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { jump, narrate, say, scene, show } from "@/scenes/scriptTypes";

export const stayRouteScene: VisualNovelCommand[] = [
  scene(
    "radial-gradient(circle at top, rgba(100,214,255,0.3), transparent 34%), linear-gradient(180deg, #101c32 0%, #0c1125 55%, #04070f 100%)",
    tx({
      id: "Stasiun Senja",
      en: "Twilight Station",
      ja: "黄昏駅",
      ko: "황혼역",
    }),
  ),
  show("arka-main", "arka", "neutral", { position: "left", enterFrom: "left" }),
  show("maya-main", "maya", "surprised", { position: "right", enterFrom: "right" }),
  say("arka", "gentle", tx({
    id: "Bagus. Kalau begitu, besok kita berhenti menyebut ini kebetulan. Kita mulai menulis ulang semuanya dari awal.",
    en: "Good. Then starting tomorrow, we stop calling this a coincidence. We start writing everything again from the beginning.",
    ja: "いい。だったら明日から、これを偶然なんて呼ぶのはやめよう。最初から全部、書き直していこう。",
    ko: "좋아. 그럼 내일부터 이걸 우연이라고 부르진 말자. 처음부터 다시 써 내려가는 거야.",
  })),
  say("maya", "calm", tx({
    id: "Akhirnya ada juga jawaban yang terdengar seperti awal cerita, bukan akhir yang terlambat.",
    en: "Finally, an answer that sounds like the start of a story, not an ending that came too late.",
    ja: "ようやく、遅すぎた結末じゃなくて、物語の始まりみたいな答えを聞けた。",
    ko: "이제야 너무 늦은 결말이 아니라, 이야기의 시작처럼 들리는 대답을 들었네.",
  })),
  narrate(tx({
    id: "Dia tersenyum tipis, seperti seseorang yang akhirnya percaya pada akhir yang belum sempat terjadi.",
    en: "She smiles faintly, like someone who finally believes in an ending that hasn't had the chance to happen yet.",
    ja: "彼女はかすかに微笑む。まだ訪れてもいない結末を、ようやく信じられるようになった人みたいに。",
    ko: "그녀는 옅게 웃었다. 아직 오지도 않은 결말을 이제야 믿게 된 사람처럼.",
  })),
  jump("epilogue"),
];
