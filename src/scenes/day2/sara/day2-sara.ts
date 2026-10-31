import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  hide,
  jump,
  menu,
  minigame,
  narrate,
  playBgm,
  say,
  setFlag,
  show,
} from "@/scenes/scriptTypes";
import lobby from "@/background/front-office.png";
import elevator from "@/background/elevator.png";
import penthouseRoom from "@/background/sara-penthouse-room.png";
import penthouse from "@/background/sara-penthouse.png";
import day2Bgm from "@/music/day2.mp3";

export const day2SaraScene: VisualNovelCommand[] = [
  playBgm(day2Bgm),
  hide("arka-bedroom"),
  bg(lobby, tx({
    id: "Lobi Apartemen 69",
    en: "Apartment 69 Lobby",
    ja: "Apartment 69 - ロビー",
    ko: "Apartment 69 로비",
  })),
  show("arka-day2-sara", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  narrate(tx({
    id: "Siang hari. Arka turun ke lobi untuk mengambil paket. Dari pintu kaca, Sarah muncul sambil melepas kacamata hitamnya dan berjalan pelan ke arahnya.",
    en: "Afternoon. Arka goes down to the lobby to pick up a package. Through the glass door, Sarah appears, taking off her sunglasses and walking slowly toward him.",
    ja: "昼。アルカは荷物を受け取るためにロビーへ下りる。ガラス扉の向こうからサラが現れ、サングラスを外しながらゆっくりと近づいてくる。",
    ko: "낮. 아르카는 택배를 찾으러 로비로 내려간다. 유리문 너머로 사라가 나타나 선글라스를 벗으며 천천히 그에게 다가온다.",
  })),
  show("sara-day2", "sara", "smile", {
    position: "center",
    enterFrom: "right",
    xOffset: 0,
  }),
  say("sara", "smile", tx({
    id: "Kebetulan sekali.",
    en: "What a coincidence.",
    ja: "ちょうどよかった。",
    ko: "마침 잘 됐네.",
  })),
  say("arka", "neutral", tx({
    id: "Bu Sarah.",
    en: "Mrs. Sarah.",
    ja: "サラ様。",
    ko: "사라 사모님.",
  })),
  say("sara", "smile", tx({
    id: "Cukup Sarah saja. Dipanggil 'Bu' terus membuat suasana jadi kaku.",
    en: "Just Sarah is enough. Being called 'Mrs.' all the time makes things stiff.",
    ja: "サラで十分よ。『様』ばかりつけられると、雰囲気が硬くなるわ。",
    ko: "사라라고 부르면 돼. 계속 '사모님'이라고 하면 분위기가 딱딱해지잖아.",
  })),
  say("sara", "neutral", tx({
    id: "Kemarin kamu bilang akan melihat jadwal. Kebetulan aku lagi butuh bantuan kecil hari ini.",
    en: "Yesterday you said you'd check your schedule. As it happens, I need a small favor today.",
    ja: "昨日、予定を確認するって言ったでしょう。ちょうど今日、ちょっとした手伝いが必要なの。",
    ko: "어제 일정을 확인해 보겠다고 했잖아. 마침 오늘 작은 도움이 필요해.",
  })),
  say("arka", "neutral", tx({
    id: "Bantuan apa?",
    en: "What kind of help?",
    ja: "どんな手伝いですか。",
    ko: "무슨 도움인데요?",
  })),
  say("sara", "neutral", tx({
    id: "Ada beberapa kabel di unitku yang berantakan sejak kemarin. Bukan masalah besar, tapi cukup mengganggu. Kalau kamu sedang tidak sibuk, boleh minta tolong?",
    en: "Some cables in my unit have been a mess since yesterday. It's not a big problem, but it's annoying enough. If you're not busy, could I ask for your help?",
    ja: "昨日から部屋のケーブルがいくつか散らかったままでね。大した問題じゃないけど、かなり気になるの。忙しくないなら、手伝ってもらえない？",
    ko: "어제부터 내 방에 케이블 몇 개가 엉망이야. 큰 문제는 아니지만 꽤 거슬려. 바쁘지 않으면 도와 줄래?",
  })),
  menu(tx({
    id: "Apa jawaban Arka?",
    en: "What does Arka answer?",
    ja: "アルカの返事は？",
    ko: "아르카의 대답은?",
  }), [
    {
      id: "accept",
      label: tx({
        id: "Bisa. Saya ikut sekarang.",
        en: "I can. I'll come with you now.",
        ja: "いいですよ。今一緒に行きます。",
        ko: "괜찮습니다. 지금 같이 갈게요.",
      }),
      next: "day2-sara-accept",
    },
    {
      id: "delay",
      label: tx({
        id: "Saya ada urusan dulu. Mungkin nanti.",
        en: "I have something to take care of first. Maybe later.",
        ja: "先に用事があるので、またあとでいいかもしれません。",
        ko: "먼저 볼 일이 있습니다. 나중에라면 모르겠네요.",
      }),
      next: "day2-sara-delay",
    },
  ]),
];

export const day2SaraAcceptScene: VisualNovelCommand[] = [
  say("arka", "gentle", tx({
    id: "Bisa. Saya ikut sekarang.",
    en: "I can. I'll come with you now.",
    ja: "いいですよ。今一緒に行きます。",
    ko: "괜찮습니다. 지금 같이 갈게요.",
  })),
  say("sara", "smile", tx({
    id: "Bagus. Aku tidak suka menunggu terlalu lama.",
    en: "Good. I don't like waiting too long.",
    ja: "いいわ。私、あまり長く待つのが好きじゃないの。",
    ko: "좋아. 난 너무 오래 기다리는 건 질색이야.",
  })),
  jump("day2-sara-lift"),
];

export const day2SaraDelayScene: VisualNovelCommand[] = [
  say("arka", "serious", tx({
    id: "Saya ada urusan dulu. Mungkin nanti.",
    en: "I have something to take care of first. Maybe later.",
    ja: "先に用事があるので、またあとでいいかもしれません。",
    ko: "먼저 볼 일이 있습니다. 나중에라면 모르겠네요.",
  })),
  say("sara", "angry", tx({
    id: "Baiklah. Tapi jangan terlalu lama. Aku mudah lupa dengan penawaran yang tertunda.",
    en: "Fine. But don't take too long. I easily forget offers that get postponed.",
    ja: "わかったわ。でもあまり長くしないで。先延ばしになった申し出は、忘れやすいの。",
    ko: "알겠어. 하지만 너무 오래 걸리진 마. 미뤄진 제안은 쉽게 잊어버리거든.",
  })),
  narrate(tx({
    id: "Arka mengambil paketnya lebih dulu. Tak lama kemudian, ia kembali menemui Sarah di depan lift.",
    en: "Arka picks up his package first. Not long after, he meets Sarah again in front of the elevator.",
    ja: "アルカは先に荷物を受け取る。ほどなくして、エレベーターの前で再びサラと会う。",
    ko: "아르카는 먼저 택배를 받는다. 얼마 지나지 않아 엘리베이터 앞에서 사라를 다시 만난다.",
  })),
  say("arka", "gentle", tx({
    id: "Urusanku sudah selesai. Kalau tawarannya masih berlaku, aku bisa membantu sekarang.",
    en: "I'm done with my errand. If the offer still stands, I can help now.",
    ja: "用事は終わった。まだその話が有効なら、今手伝える。",
    ko: "볼 일은 끝났어. 제안이 아직 유효하면 지금 도와줄 수 있어.",
  })),
  say("sara", "smile", tx({
    id: "Kali ini masih berlaku. Ayo.",
    en: "This time it still stands. Let's go.",
    ja: "今回はまだ有効よ。行きましょう。",
    ko: "이번엔 아직 유효해. 가자.",
  })),
  jump("day2-sara-lift"),
];

export const day2SaraLiftScene: VisualNovelCommand[] = [
  bg(elevator, tx({
    id: "Lift Menuju Penthouse",
    en: "Elevator to the Penthouse",
    ja: "ペントハウスへ向かうエレベーター",
    ko: "펜트하우스로 가는 엘리베이터",
  })),
  narrate(tx({
    id: "Mereka naik lift bersama. Suasananya cukup tenang.",
    en: "They ride the elevator together. The atmosphere is fairly quiet.",
    ja: "二人は一緒にエレベーターに乗る。空気はかなり静かだ。",
    ko: "둘은 함께 엘리베이터를 탄다. 분위기는 꽤 조용하다.",
  })),
  say("sara", "neutral", tx({
    id: "Kamu termasuk orang yang pendiam, ya?",
    en: "You're the quiet type, aren't you?",
    ja: "あなた、無口なほうね。",
    ko: "너는 과묵한 편이구나.",
  })),
  say("arka", "neutral", tx({
    id: "Tergantung situasinya.",
    en: "It depends on the situation.",
    ja: "状況によります。",
    ko: "상황에 따라 다릅니다.",
  })),
  say("sara", "smile", tx({
    id: "Kamu unik sekali.",
    en: "You're quite unique.",
    ja: "なかなかユニークね。",
    ko: "꽤 특이하네.",
  })),
  narrate(tx({
    id: "Sarah melirik Arka sebentar, lalu kembali menatap pintu lift.",
    en: "Sarah glances at Arka for a moment, then looks back at the elevator door.",
    ja: "サラは一瞬アルカを横目で見て、再びエレベーターの扉へ視線を戻す。",
    ko: "사라는 잠시 아르카를 곁눈질한 뒤 다시 엘리베이터 문을 바라본다.",
  })),
  say("sara", "sad", tx({
    id: "Kadang aku iri dengan orang yang bisa bilang apa adanya tanpa banyak perhitungan.",
    en: "Sometimes I envy people who can say things as they are, without so much calculation.",
    ja: "たまに、あまり計算せずに本音を言える人が羨ましくなるの。",
    ko: "가끔은 계산 없이 있는 그대로 말할 수 있는 사람이 부러워.",
  })),
  hide("sara-day2"),
  hide("arka-day2-sara"),
  bg(penthouse, tx({
    id: "Penthouse Sarah - Ruang Kerja",
    en: "Sarah's Penthouse - Study",
    ja: "サラのペントハウス - 仕事部屋",
    ko: "사라의 펜트하우스 - 작업실",
  })),
  narrate(tx({
    id: "Tiba di penthouse, Sarah mengantar Arka ke ruang kerjanya.",
    en: "Arriving at the penthouse, Sarah leads Arka to her study.",
    ja: "ペントハウスに着くと、サラはアルカを仕事部屋へ案内する。",
    ko: "펜트하우스에 도착하자 사라는 아르카를 작업실로 안내한다.",
  })),
  bg(penthouseRoom, tx({
    id: "Penthouse Sarah - Ruang Kerja",
    en: "Sarah's Penthouse - Study",
    ja: "サラのペントハウス - 仕事部屋",
    ko: "사라의 펜트하우스 - 작업실",
  })),
  show("arka-day2-sara", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  show("sara-day2", "sara", "smile", {
    position: "center",
    enterFrom: "right",
    xOffset: 0,
  }),
  say("sara", "neutral", tx({
    id: "Ini dia. Beberapa kabelnya tercabut dan aku tidak sempat membereskannya.",
    en: "Here it is. Some of the cables came unplugged, and I haven't had time to sort them out.",
    ja: "これよ。ケーブルがいくつか外れたままで、片づける暇がなかったの。",
    ko: "여기야. 케이블 몇 개가 뽑힌 채로 정리할 틈이 없었어.",
  })),
  narrate(tx({
    id: "Di atas meja, beberapa kabel saling bercampur. Arka memperhatikan ujung dan port yang cocok.",
    en: "On the desk, several cables are tangled together. Arka looks for the matching ends and ports.",
    ja: "机の上では、何本ものケーブルが絡み合っている。アルカは合う端子とポートを確かめる。",
    ko: "책상 위에는 케이블 몇 개가 뒤섞여 있다. 아르카는 맞는 끝과 포트를 살핀다.",
  })),
  minigame("cable-matching"),
  jump("day2-sara-after-cables"),
];

export const day2SaraAfterCablesScene: VisualNovelCommand[] = [
  say("sara", "smile", tx({
    id: "Cepat juga.",
    en: "That was quick.",
    ja: "早かったわね。",
    ko: "빠르기도 하네.",
  })),
  narrate(tx({
    id: "Sarah menuangkan air ke dua gelas, lalu menyerahkan satu kepada Arka.",
    en: "Sarah pours water into two glasses, then hands one to Arka.",
    ja: "サラは二つのグラスに水を注ぎ、一つをアルカへ差し出す。",
    ko: "사라는 잔 두 개에 물을 따른 뒤 하나를 아르카에게 건넨다.",
  })),
  say("sara", "neutral", tx({
    id: "Duduk sebentar. Aku tidak suka orang langsung pergi setelah membantu.",
    en: "Sit for a moment. I don't like people leaving right after they help.",
    ja: "少し座って。手伝ったあとすぐ帰られるのは好きじゃないの。",
    ko: "잠깐 앉아. 도와주고 바로 가 버리는 사람은 별로야.",
  })),
  narrate(tx({
    id: "Mereka duduk di sofa dekat jendela.",
    en: "They sit on the sofa by the window.",
    ja: "二人は窓際のソファに座る。",
    ko: "둘은 창가 소파에 앉는다.",
  })),
  say("sara", "neutral", tx({
    id: "Kamu sudah berapa lama tinggal di sini?",
    en: "How long have you lived here?",
    ja: "ここに住んでどのくらいになるの？",
    ko: "여기서 산 지 얼마나 됐어?",
  })),
  say("arka", "neutral", tx({
    id: "Belum lama.",
    en: "Not long.",
    ja: "まだ長くありません。",
    ko: "아직 얼마 안 됐습니다.",
  })),
  say("sara", "smile", tx({
    id: "Terlihat. Masih ada aura 'baru pindah'.",
    en: "I can tell. You still have that 'just moved in' air.",
    ja: "わかるわ。まだ『引っ越したばかり』って雰囲気が残ってる。",
    ko: "티 나. 아직 '방금 이사 온' 느낌이 남아 있어.",
  })),
  narrate(tx({
    id: "Sarah tersenyum kecil.",
    en: "Sarah smiles faintly.",
    ja: "サラが小さく微笑む。",
    ko: "사라가 작게 미소 짓는다.",
  })),
  say("sara", "sad", tx({
    id: "Gedung ini sebenarnya sepi di malam hari. Kadang terlalu sepi.",
    en: "This building is actually quiet at night. Sometimes too quiet.",
    ja: "この建物、夜は本当に静かよ。たまには静かすぎるくらい。",
    ko: "이 건물은 사실 밤이 되면 조용해. 가끔은 너무 조용해서.",
  })),
  say("arka", "gentle", tx({
    id: "Kamu sering merasa begitu?",
    en: "Do you feel that way often?",
    ja: "よくそう感じるんですか。",
    ko: "자주 그렇게 느끼십니까?",
  })),
  say("sara", "sad", tx({
    id: "Kadang. Tapi aku sudah terbiasa. Kebiasaan yang tidak selalu menyenangkan.",
    en: "Sometimes. But I'm used to it. A habit that isn't always pleasant.",
    ja: "たまにはね。でも慣れたわ。いつも愉快な習慣ってわけじゃないけど。",
    ko: "가끔은. 하지만 익숙해졌어. 항상 유쾌한 습관은 아니야.",
  })),
  narrate(tx({
    id: "Ia menatap gelasnya sebentar, lalu kembali menatap Arka.",
    en: "She looks at her glass for a moment, then looks back at Arka.",
    ja: "彼女はしばらくグラスを見つめたあと、再びアルカへ視線を戻す。",
    ko: "그녀는 잠시 잔을 바라보다가 다시 아르카를 본다.",
  })),
  say("sara", "blush", tx({
    id: "Kamu orang yang mudah diajak bicara, ternyata.",
    en: "You're surprisingly easy to talk to.",
    ja: "意外と話しやすい人なのね。",
    ko: "의외로 이야기하기 편한 사람이네.",
  })),
  say("arka", "neutral", tx({
    id: "Saya hanya menjawab.",
    en: "I'm only answering.",
    ja: "答えているだけです。",
    ko: "그냥 대답하고 있을 뿐입니다.",
  })),
  say("sara", "smile", tx({
    id: "Justru itu yang jarang kudapat.",
    en: "That's exactly what I rarely get.",
    ja: "それが、なかなか手に入らないものなのよ。",
    ko: "바로 그게 내가 좀처럼 못 얻는 거야.",
  })),
  narrate(tx({
    id: "Hening sebentar.",
    en: "A brief silence.",
    ja: "しばらく沈黙が落ちる。",
    ko: "잠시 침묵이 흐른다.",
  })),
  say("sara", "blush", tx({
    id: "Kalau lain kali aku minta bantuan lagi... kamu masih bersedia?",
    en: "If I ask for your help again next time... would you still be willing?",
    ja: "次もまた助けを求めたら……まだ付き合ってくれる？",
    ko: "다음에 또 도움을 부탁하면... 그래도 들어줄래?",
  })),
  menu(tx({
    id: "Apa jawaban Arka?",
    en: "What does Arka answer?",
    ja: "アルカの返事は？",
    ko: "아르카의 대답은?",
  }), [
    {
      id: "yes",
      label: tx({ id: "Bisa.", en: "I can.", ja: "いいですよ。", ko: "괜찮습니다." }),
      next: "day2-sara-yes",
    },
    {
      id: "maybe",
      label: tx({
        id: "Saya pikir-pikir dulu.",
        en: "I'll think about it first.",
        ja: "少し考えさせてください。",
        ko: "잠깐 생각해 보겠습니다.",
      }),
      next: "day2-sara-maybe",
    },
  ]),
];

export const day2SaraYesScene: VisualNovelCommand[] = [
  say("arka", "gentle", tx({
    id: "Bisa.",
    en: "I can.",
    ja: "いいですよ。",
    ko: "괜찮습니다.",
  })),
  say("sara", "smile", tx({
    id: "Kalau begitu, aku akan mengingatnya.",
    en: "Then I'll remember that.",
    ja: "それなら、覚えておくわ。",
    ko: "그럼 기억해 둘게.",
  })),
  jump("day2-sara-ending"),
];

export const day2SaraMaybeScene: VisualNovelCommand[] = [
  say("arka", "shy", tx({
    id: "Saya pikir-pikir dulu.",
    en: "I'll think about it first.",
    ja: "少し考えさせてください。",
    ko: "잠깐 생각해 보겠습니다.",
  })),
  say("sara", "blush", tx({
    id: "Begitu, ya? Sekarang aku jadi semakin penasaran dengan jawabanmu.",
    en: "Is that so? Now I'm even more curious about your answer.",
    ja: "そうなの？ ますますあなたの答えが気になってきたわ。",
    ko: "그래? 이제 네 대답이 더 궁금해졌어.",
  })),
  jump("day2-sara-ending"),
];

export const day2SaraEndingScene: VisualNovelCommand[] = [
  say("sara", "smile", tx({
    id: "Baiklah, sampai ketemu lagi?",
    en: "All right, until we meet again?",
    ja: "わかったわ。また会えるかしら。",
    ko: "알겠어. 또 보자.",
  })),
  narrate(tx({
    id: "Caranya bicara tenang, tapi ada sesuatu yang tertahan di baliknya. Bukan seperti orang yang benar-benar baik-baik saja.",
    en: "The way she speaks is calm, but something is being held back behind it. She doesn't sound like someone who is truly fine.",
    ja: "話し方は落ち着いている。でもその奥に、何か抑え込まれたものがある。本当に平気な人の話し方ではない。",
    ko: "말하는 방식은 차분하다. 하지만 그 뒤에는 눌러 둔 무언가가 있다. 정말로 괜찮은 사람의 말투는 아니다.",
  }), "arka"),
  hide("sara-day2", "fadeAway"),
  hide("arka-day2-sara"),
  setFlag("day2SaraCompleted", true),
  bg(penthouse, tx({
    id: "Apartemen 69 - Hari 2",
    en: "Apartment 69 - Day 2",
    ja: "Apartment 69 - 2日目",
    ko: "Apartment 69 - 2일차",
  })),
  minigame("smartphone-contacts", {
    showSleepOption: true,
    sleepOptionNext: "day2-complate",
    requiredCompletionFlags: ["day2MayaCompleted", "day2ElenaCompleted"],
    conditionalDisabledContacts: {
      maya: "day2MayaCompleted",
      elena: "day2ElenaCompleted",
      nadia: "day2NadiaCompleted",
      sara: "day2SaraCompleted",
    },
    title: tx({
      id: "Lanjutkan Hari 2",
      en: "Continue Day 2",
      ja: "2日目を続ける",
      ko: "2일차 계속하기",
    }),
    subtitle: tx({
      id: "Setelah bertemu Sarah, siapa lagi yang ingin kamu temui?",
      en: "After meeting Sarah, who else would you like to see?",
      ja: "サラに会ったあと、次は誰に会いたい？",
      ko: "사라를 만난 뒤, 또 누구를 만나고 싶어?",
    }),
    contactOverrides: {
      maya: { next: "day2-route-maya" },
      elena: { next: "day2-route-elena" },
      nadia: { next: "day2-route-nadia" },
      sara: { next: "day2-route-sara" },
    },
  }),
];
