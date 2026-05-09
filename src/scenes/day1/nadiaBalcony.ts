import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  hide,
  jump,
  menu,
  narrate,
  say,
  show,
  moveTo,
  cutScene,
} from "@/scenes/scriptTypes";
import bedroom from "@/background/bedroom-afteroon.png";
import nadiaVideo from "@/cut-scene/Nadia Cut Scene.webm?url";

export const nadiaBalconyScene: VisualNovelCommand[] = [
  bg(bedroom, tx({
    id: "Lentera Apartments - Kamar",
    en: "Lentera Apartments - Bedroom",
    ja: "レンテラ・アパートメント - 寝室",
    ko: "렌테라 아파트 - 침실",
  })),
  hide("elena-hallway"),
  hide("arka-hallway"),
  narrate(
    tx({
      id: "Banyak juga yang kejadian hari ini... semoga besok aku masih bisa sampai kampus tepat waktu.",
      en: "A lot happened today... hope I can still make it to campus on time tomorrow.",
      ja: "今日はずいぶん色々あったな…明日はちゃんと時間通りに大学へ行けるといいけど。",
      ko: "오늘 진짜 일이 많았네... 내일은 제시간에 학교에 갈 수 있으면 좋겠다.",
    }),
  ),
  show("arka-balcony", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Seriusan?! Kenapa harus sekarang sih?! Duh, penontonku bakal ngamuk nih!",
      en: "Seriously?! Right now of all times?! Ugh, my viewers are gonna kill me!",
      ja: "うそでしょ!? よりによって今!? もう、視聴者に怒られるってば！",
      ko: "진짜?! 하필 지금이라고?! 아, 시청자들한테 완전 욕먹겠네!",
    }),
    { hideName: true },
  ),
  narrate(
    tx({
      id: "(Arka bersandar ke pagar balkon dan melihat ke atas, ke balkon lantai tiga, tempat seorang gadis ber-crop top sedang mengguncang ring light yang mati.)",
      en: "(He leans over the railing and looks up at the third-floor balcony, where a girl in a crop top is shaking a dead ring light.)",
      ja: "（アルカは手すりにもたれ、三階のバルコニーを見上げる。そこではクロップトップ姿の女の子が、壊れたリングライトを振り回していた。）",
      ko: "(아르카는 난간에 기대어 3층 발코니를 올려다본다. 크롭탑 차림의 여자가 꺼진 링 라이트를 흔들고 있다.)",
    }),
  ),
  cutScene(nadiaVideo),
  show("nadia-balcony", "nadia", "neutral", {
    position: "center",
    enterFrom: "right",
  }),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Hei! Kamu! Punya kabel ekstensi cadangan? Atau tahu kenapa studionya tiba-tiba mati total?",
      en: "Hey! You! Got a spare extension cord? Or do you know why my studio suddenly went dead?",
      ja: "ねえ、そこの君！ 予備の延長コード持ってない？ それか、なんでスタジオが急に落ちたかわかる？",
      ko: "야! 거기 너! 여분 멀티탭 있어? 아니면 왜 내 스튜디오가 갑자기 나갔는지 알아?",
    }),
    { hideName: true },
  ),
  menu(tx({
    id: "Apa yang akan kamu lakukan?",
    en: "What will you do?",
    ja: "どうする？",
    ko: "어떻게 할까?",
  }), [
    {
      id: "offer-advice",
      label: tx({
        id: "Kasih Saran",
        en: "Give Advice",
        ja: "助言する",
        ko: "조언한다",
      }),
      next: "nadia-advice-help",
    },
    {
      id: "refuse-help",
      label: tx({
        id: "Tolak",
        en: "Refuse",
        ja: "断る",
        ko: "거절한다",
      }),
      next: "nadia-advice-refuse",
    },
  ]),
];

export const nadiaAdviceHelpScene: VisualNovelCommand[] = [
  say(
    "arka",
    "neutral",
    tx({
      id: "Mungkin. Lampu berdaya besar kamu kebanyakan nyala di satu jalur listrik yang sama. Kemungkinan itu masalahnya.",
      en: "Maybe. You've got too many high-power lights running on the same circuit. That's probably the issue.",
      ja: "たぶん。高出力のライトを同じ回路でいくつも回してるんだろ。それが原因っぽい。",
      ko: "아마도. 고출력 조명을 같은 회로에 너무 많이 물려 둔 것 같아. 그게 문제일 거야.",
    }),
  ),
  narrate(
    tx({
      id: "(Nadia diam sebentar sambil berkedip, mencerna ucapan Arka.)",
      en: "(She pauses, blinking as she processes what Arka just said.)",
      ja: "（ナディアは一瞬黙り込み、アルカの言葉を理解しようとまばたきを繰り返す。）",
      ko: "(나디아는 잠깐 멈춰 선 채 눈을 몇 번 깜빡이며 아르카의 말을 곱씹는다.)",
    }),
  ),
  say("nadia", "neutral", tx({
    id: "Hah... bentar, aku cek dulu!",
    en: "Huh... wait, let me check!",
    ja: "えっ…ちょっと待って、確認してみる！",
    ko: "어...? 잠깐만, 확인해볼게!",
  }), { hideName: true }),
  hide("nadia-balcony", "fadeAway"),
  narrate(
    tx({
      id: "(Dia menghilang masuk ke dalam, dan sesaat kemudian lampunya menyala lagi.)",
      en: "(She disappears inside, and a moment later, the lights flick back on.)",
      ja: "（彼女は部屋の中へ消え、しばらくしてライトが再び点いた。）",
      ko: "(그녀는 안으로 사라지고, 잠시 뒤 조명이 다시 켜진다.)",
    }),
  ),
  show("nadia-balcony", "nadia", "neutral", {
    position: "center",
    enterFrom: "right",
  }),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Whoa! Kamu penyelamat banget! Aku kira tadi satu lantai bakal ikut mati!",
      en: "Whoa! You're a lifesaver! I thought I blew the whole floor!",
      ja: "うわっ！ 助かった！ フロアごと落としたかと思った！",
      ko: "와! 너 완전 구세주네! 층 전체 날린 줄 알았어!",
    }),
    { hideName: true },
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Lain kali jangan semua ditumpuk di satu titik listrik.",
      en: "Next time, don't overload everything in one spot.",
      ja: "次からは、ひとつの回路に全部まとめてつなぐなよ。",
      ko: "다음부터는 한 군데에 다 몰아 꽂지 마.",
    }),
    { hideName: false },
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Haha, kamu dari kemarin ke mana aja sih? Aku udah berurusan sama beginian hampir dua bulan!",
      en: "Haha, where have you been all this time? I've been dealing with this for like two months!",
      ja: "はは、今までどこにいたの？ これ、もう二か月近く悩まされてたんだけど！",
      ko: "하하, 지금까지 어디 있었어? 나 이거 거의 두 달 동안 겪고 있었거든!",
    }),
    { hideName: true },
  ),
  narrate(
    tx({
      id: "(Nadia melempar selembar kertas ke arah bawah.)",
      en: "(Nadia tosses a piece of paper down.)",
      ja: "（ナディアは紙切れをひらりと下へ投げる。）",
      ko: "(나디아가 종이 한 장을 아래로 휙 던진다.)",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Oh ya, namaku Nadia. Nanti bisa jadi aku butuh bantuanmu lagi.",
      en: "By the way, my name is Nadia. I might need your help again sometime.",
      ja: "そうだ、私ナディア。たぶんまたそのうち助けてもらうかも。",
      ko: "아, 그리고 내 이름은 나디아야. 나중에 또 네 도움이 필요할지도 몰라.",
    }),
  ),
  say("arka", "gentle", tx({
    id: "Oke, aku simpan ya.",
    en: "Alright, I'll keep it.",
    ja: "わかった、取っておくよ。",
    ko: "알겠어, 챙겨둘게.",
  })),
  narrate(
    tx({
      id: "Mungkin... lain kali aku bakal hubungi dia.",
      en: "Maybe... I'll hit her up next time.",
      ja: "たぶん…今度また連絡してみるかもな。",
      ko: "어쩌면... 다음엔 내가 먼저 연락하게 될지도 모르겠다.",
    }),
  ),
  jump("sara-hallway"),
  hide("nadia-balcony"),
];

export const nadiaAdviceRefuseScene: VisualNovelCommand[] = [
  say(
    "arka",
    "serious",
    tx({
      id: "Uh... aku nggak terlalu jago soal kelistrikan. Coba hubungi staf apartemen dulu mungkin.",
      en: "Uh... I'm not really good with electrical stuff. Maybe try contacting the apartment staff.",
      ja: "えっと…電気関係はあんまり得意じゃないんだ。たぶん管理スタッフに連絡してみたほうがいい。",
      ko: "어... 전기 쪽은 내가 잘 몰라. 아파트 직원한테 먼저 연락해보는 게 좋을 것 같아.",
    }),
  ),
  say("nadia", "neutral", tx({
    id: "Oke deh, nanti aku coba.",
    en: "Alright, I'll give it a try.",
    ja: "わかった、やってみる。",
    ko: "알겠어, 한번 해볼게.",
  }), { hideName: true }),
  jump("sara-hallway"),
];
