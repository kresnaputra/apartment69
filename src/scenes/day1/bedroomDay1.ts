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
    "shy",
    tx({
      id: "Ada Maya di sebelah, dan dia kelihatan udah remuk banget karena stres kuliah. Terus ada Elena di seberang, dinginnya minta ampun, Nadia yang energinya kebanyakan, dan Sarah... cewek penthouse yang ngomongnya kayak lagi kasih deadline kerjaan.",
      en: "There's Maya next door, and she looks seriously wrecked from college stress. Then there's Elena across the hall, cold as hell, Nadia with way too much energy, and Sarah... the penthouse girl who talks like she's assigning me a deadline.",
      ja: "隣には大学のストレスで限界そうなマヤがいて、向かいにはとにかく冷たいエレナ。やたら元気すぎるナディアに、そしてサラ…あの、まるで締切を押し付けてくるみたいな話し方をするペントハウスの女。",
      ko: "옆집엔 대학 스트레스로 완전히 지쳐 보이는 마야가 있고, 맞은편엔 차갑기 짝이 없는 엘레나가 있다. 나디아는 에너지가 너무 넘치고, 사라는... 마치 나한테 마감 기한을 던지는 것처럼 말하는 펜트하우스 여자다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Buat malam ini, cukup istirahat dulu. Besok pagi baru kupikirin mau mulai dari siapa.",
      en: "For tonight, I just need to rest. Tomorrow morning I'll figure out who to start with.",
      ja: "今夜はもう休もう。誰から行くかは、明日の朝に決めればいい。",
      ko: "오늘 밤은 일단 쉬자. 누구부터 갈지는 내일 아침에 정하면 된다.",
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

export const bedroomDay1MayaScene: VisualNovelCommand[] = [
  setFlag("day1PriorityRoute", "maya"),
  say(
    "arka",
    "gentle",
    tx({
      id: "Maya dulu. Dia tadi kelihatan tinggal selangkah lagi buat benar-benar tumbang. Mending aku cek dia dulu sebelum urusan kampus makin berat.",
      en: "Maya first. She looked one bad day away from completely crashing out. I'd better check in on her before campus gets even rougher.",
      ja: "まずはマヤだ。あと一日悪化したら本当に倒れそうなくらいだった。大学のことでさらに追い込まれる前に様子を見ておいたほうがいい。",
      ko: "먼저 마야다. 정말 딱 하루만 더 꼬이면 완전히 무너질 것처럼 보였다. 학교 일 때문에 더 힘들어지기 전에 먼저 챙겨봐야겠다.",
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

export const bedroomDay1ElenaScene: VisualNovelCommand[] = [
  setFlag("day1PriorityRoute", "elena"),
  say(
    "arka",
    "serious",
    tx({
      id: "Elena dulu. Dia memang galak, tapi jelas bukan cuma pipa bocor yang bikin dia kesal. Mending urusan yang paling berat dihadapi lebih awal.",
      en: "Elena first. She's intense, sure, but that leak clearly wasn't the only thing messing with her. Might as well deal with the hardest one early.",
      ja: "まずはエレナだ。たしかに気が強いけど、彼女を苛立たせてるのはあの水漏れだけじゃなさそうだしな。一番厄介そうなのを先に片づけたほうがいい。",
      ko: "먼저 엘레나다. 성격이 강한 건 맞지만, 그녀를 괴롭히는 게 그 누수 하나만은 아닌 게 분명하다. 제일 까다로운 쪽부터 먼저 상대하는 게 낫겠다.",
    }),
  ),
  narrate(
    tx({
      id: "Arka menatap langit-langit kamar yang gelap sejenak, seolah sudah menyiapkan diri menghadapi sikap Elena besok.",
      en: "Arka stares at the dark ceiling for a second, already bracing himself for Elena's attitude tomorrow.",
      ja: "アルカは暗い天井をしばらく見つめ、明日また向けられるであろうエレナの態度に今から身構える。",
      ko: "아르카는 어두운 천장을 잠시 바라보며, 내일 엘레나의 태도를 다시 마주할 준비를 한다.",
    }),
  ),
  hide("arka-bedroom"),
  jump("day1-complate"),
];

export const bedroomDay1NadiaScene: VisualNovelCommand[] = [
  setFlag("day1PriorityRoute", "nadia"),
  say(
    "arka",
    "surprised",
    tx({
      id: "Nadia dulu. Dia berisik, chaos, dan entah kenapa nggak bisa diabaikan. Kalau energi segede itu dibiarkan, pasti ada aja yang meledak.",
      en: "Nadia first. She's loud, chaotic, and somehow impossible to ignore. If I leave that much energy unattended, something's definitely gonna blow up.",
      ja: "まずはナディアだ。騒がしくて、カオスで、どういうわけか放っておけない。あれだけのエネルギーを放置したら、きっと何かしら爆発する。",
      ko: "먼저 나디아다. 시끄럽고, 혼란스럽고, 이상하게 무시가 안 된다. 저 정도 에너지를 방치하면 분명 뭔가 터진다.",
    }),
  ),
  narrate(
    tx({
      id: "Arka terkekeh pelan, menetapkan Nadia sebagai nama pertama yang harus dicek, lalu melempar ponselnya ke samping.",
      en: "Arka snorts to himself, sets Nadia as the first name to check on, then tosses the phone aside.",
      ja: "アルカは小さく鼻で笑いながら、最初に様子を見る相手をナディアに決め、スマホを脇へ放り出す。",
      ko: "아르카는 혼자 피식 웃으며 첫 번째로 챙길 사람을 나디아로 정하고 휴대폰을 옆으로 던져 둔다.",
    }),
  ),
  hide("arka-bedroom"),
  jump("day1-complate"),
];

export const bedroomDay1SaraScene: VisualNovelCommand[] = [
  setFlag("day1PriorityRoute", "sara"),
  say(
    "arka",
    "neutral",
    tx({
      id: "Sarah dulu. Orang kayak dia biasanya nggak minta dua kali, dan kalau permintaan dari penthouse digantung, dia pasti bakal nyindir aku habis-habisan.",
      en: "Sarah first. People like her don't really ask twice, and if I keep a penthouse request hanging, she's definitely gonna call me out on it.",
      ja: "まずはサラだ。ああいうタイプは二度も頼んだりしないし、ペントハウスからの頼みを放っておいたら、絶対あとで突かれる。",
      ko: "먼저 사라다. 저런 사람은 같은 부탁을 두 번 하지 않는다. 펜트하우스 쪽 요청을 미뤄두면 분명 나중에 한소리 들을 거다.",
    }),
  ),
  narrate(
    tx({
      id: "Arka meletakkan ponselnya lalu mengembuskan napas pelan. Besok saja sudah terdengar melelahkan.",
      en: "Arka puts the phone down and lets out a slow breath. Tomorrow already sounds like a lot.",
      ja: "アルカはスマホを置き、ゆっくり息を吐いた。明日だけで、もう十分大変そうだ。",
      ko: "아르카는 휴대폰을 내려놓고 천천히 숨을 내쉰다. 벌써 내일만으로도 꽤 버거워 보인다.",
    }),
  ),
  hide("arka-bedroom"),
  jump("day1-complate"),
];
