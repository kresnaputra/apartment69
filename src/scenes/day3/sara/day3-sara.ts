import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  hide,
  jump,
  menu,
  narrate,
  playBgm,
  playSfx,
  say,
  setFlag,
  show,
} from "@/scenes/scriptTypes";
import hallwayUrl from "@/background/hallway.png";
import saraHallwayUrl from "@/background/sara-hallway.jpeg";
import cafeUrl from "@/background/cafe.jpeg";
import elevatorUrl from "@/background/elevator.png";
import day3Bgm from "@/music/day3.mp3";
import phoneSfx from "@/sfx/phone.mp3";
import liftSfx from "@/sfx/lift.wav";
import openDoorSfx from "@/sfx/open-door.wav";

export const day3SaraStartScene: VisualNovelCommand[] = [
  playBgm(day3Bgm),
  hide("arka-campus"),
  bg(hallwayUrl, tx({
    id: "Apartment 69 - Lorong Unit 302",
    en: "Apartment 69 - Unit 302 Hallway",
    ja: "Apartment 69 - 302号室の廊下",
    ko: "Apartment 69 - 302호 복도",
  })),
  show("arka-day3-sara", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  narrate(tx({
    id: "Sore hari. Arka baru saja keluar dari unitnya ketika ponselnya bergetar.",
    en: "Late afternoon. Arka has just stepped out of his unit when his phone vibrates.",
    ja: "夕方。アルカが部屋を出た直後、スマホが震えた。",
    ko: "저녁. 아르카가 막 방을 나서자 휴대폰이 진동한다.",
  })),
  playSfx(phoneSfx),
  say("sara", "smile", tx({
    id: "Hi Arka, apa ada kegiatan hari ini?",
    en: "Hi Arka, do you have anything going on today?",
    ja: "こんにちは、アルカ。今日は予定がある？",
    ko: "안녕, 아르카. 오늘 뭐 하는 일 있어?",
  })),
  say("arka", "neutral", tx({
    id: "Aku baru selesai mengerjakan tugas kuliahu. Ada apa?",
    en: "I just finished my college assignment. What's up?",
    ja: "大学の課題を終えたところだ。どうしたんだ？",
    ko: "방금 대학 과제를 끝냈어. 무슨 일이야?",
  })),
  say("sara", "smile", tx({
    id: "Aku di café lantai dasar. Kalau kamu tidak keberatan, duduklah sebentar. Kopinya sudah aku pesan.",
    en: "I'm at the ground-floor café. If you don't mind, sit with me for a bit. I've already ordered the coffee.",
    ja: "1階のカフェにいるの。よければ、少し座らない？ コーヒーはもう頼んでおいたわ。",
    ko: "1층 카페에 있어. 괜찮다면 잠깐 앉아 줘. 커피는 이미 주문해 뒀어.",
  })),
  say("arka", "gentle", tx({
    id: "Aku akan segera ke sana.",
    en: "I'll be there soon.",
    ja: "すぐ行くよ。",
    ko: "곧 갈게.",
  })),
  hide("arka-day3-sara", "fadeAway"),
  bg(cafeUrl, tx({
    id: "Apartment 69 - Café Lantai Dasar",
    en: "Apartment 69 - Ground Floor Café",
    ja: "Apartment 69 - 1階のカフェ",
    ko: "Apartment 69 - 1층 카페",
  })),
  show("arka-day3-sara", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  narrate(tx({
    id: "Arka turun ke café apartemen. Sarah sudah duduk di sudut yang cukup sepi, memakai blouse putih dan mantel tipis. Di meja sudah ada dua cangkir kopi.",
    en: "Arka goes down to the apartment café. Sarah is already seated in a fairly quiet corner, wearing a white blouse and a light coat. Two cups of coffee are already on the table.",
    ja: "アルカはアパートのカフェへ下りる。サラはすでに静かな隅の席に座っていて、白いブラウスに薄いコートを着ている。テーブルにはコーヒーが二つ置かれている。",
    ko: "아르카는 아파트 카페로 내려간다. 사라는 이미 꽤 조용한 구석에 앉아 있고, 흰 블라우스와 얇은 코트를 입고 있다. 테이블에는 커피 두 잔이 놓여 있다.",
  })),
  show("sara-day3", "sara", "smile", {
    position: "center",
    enterFrom: "right",
    xOffset: 0,
  }),
  say("sara", "smile", tx({
    id: "Tepat waktu. Aku pikir kau akan menolak ajakanku.",
    en: "Right on time. I thought you would turn down my invitation.",
    ja: "時間どおりね。断られると思っていたわ。",
    ko: "제시간에 왔네. 거절할 줄 알았는데.",
  })),
  say("arka", "shy", tx({
    id: "Aku tidak enak kalau menolaknya.",
    en: "I wouldn't feel right turning it down.",
    ja: "断るのは悪いから。",
    ko: "거절하긴 좀 그래서.",
  })),
  narrate(tx({
    id: "Sarah mendorong satu cangkir ke arah Arka.",
    en: "Sarah slides one cup toward Arka.",
    ja: "サラがカップを一つ、アルカのほうへ押し出す。",
    ko: "사라가 잔 하나를 아르카 쪽으로 밀어 준다.",
  })),
  say("sara", "neutral", tx({
    id: "Hari ini aku tidak meminta bantuan teknis. Hanya ingin bicara santai.",
    en: "Today I'm not asking for technical help. I just want to talk casually.",
    ja: "今日は技術的な助けはいらないの。ただ気楽に話したいだけ。",
    ko: "오늘은 기술적인 도움을 부탁하려는 게 아니야. 그냥 편하게 이야기하고 싶을 뿐이야.",
  })),
  say("arka", "neutral", tx({
    id: "Tentang apa?",
    en: "About what?",
    ja: "何の話？",
    ko: "무슨 이야기?",
  })),
  say("sara", "neutral", tx({
    id: "Tidak tentu. Kadang aku hanya ingin mendengar suara orang lain selain pesanan lewat telepon.",
    en: "Nothing in particular. Sometimes I just want to hear someone else's voice besides orders over the phone.",
    ja: "特に決まってないわ。たまには、電話越しの指示以外に誰かの声が聞きたくなるの。",
    ko: "딱히 정해진 건 없어. 가끔은 전화로 듣는 지시 말고, 다른 사람 목소리를 듣고 싶어져.",
  })),
  say("sara", "neutral", tx({
    id: "Kamu tipe orang yang sering menghabiskan waktu sendiri?",
    en: "Are you the type who often spends time alone?",
    ja: "あなた、一人でいることが多いタイプ？",
    ko: "너는 혼자 시간을 보내는 편이야?",
  })),
  say("arka", "neutral", tx({
    id: "Cukup sering. Terkadang kalau sedang libur, aku menghabiskan waktuku di kamar.",
    en: "Fairly often. Sometimes when I have a day off, I spend it in my room.",
    ja: "わりとね。休みの日は部屋で過ごすこともある。",
    ko: "꽤 자주. 가끔 쉬는 날엔 방에서 시간을 보내.",
  })),
  say("sara", "sad", tx({
    id: "Aku juga... mungkin bedanya aku tidak ada waktu untuk menghibur diriku sendiri.",
    en: "Me too... maybe the difference is that I don't have time to comfort myself.",
    ja: "私も……違いは、自分を慰める時間がないことかもしれない。",
    ko: "나도... 차이라고 하면, 나 자신을 달랠 시간이 없다는 거겠지.",
  })),
  narrate(tx({
    id: "Ucapannya terdengar ringan, tapi matanya tidak terlalu ikut tertawa.",
    en: "Her words sound light, but her eyes don't quite laugh along.",
    ja: "口調は軽い。だが目はあまり笑っていない。",
    ko: "말투는 가볍지만, 눈은 그다지 웃고 있지 않다.",
  })),
  menu(tx({
    id: "Bagaimana Arka merespons?",
    en: "How does Arka respond?",
    ja: "アルカはどう返す？",
    ko: "아르카는 어떻게 반응할까?",
  }), [
    {
      id: "empathy",
      label: tx({
        id: '"Kedengarannya melelahkan."',
        en: '"That sounds exhausting."',
        ja: "「疲れているみたいだ。」",
        ko: '"피곤해 보여."',
      }),
      next: "day3-sara-empathy",
    },
    {
      id: "listen",
      label: tx({
        id: "Tetap diam dan menunggu dia melanjutkan.",
        en: "Stay quiet and wait for her to continue.",
        ja: "黙ったまま、彼女が続けるのを待つ。",
        ko: "잠자코 그녀가 계속하기를 기다린다.",
      }),
      next: "day3-sara-listen",
    },
  ]),
];

export const day3SaraEmpathyScene: VisualNovelCommand[] = [
  say("arka", "gentle", tx({
    id: "Kedengarannya melelahkan.",
    en: "That sounds exhausting.",
    ja: "疲れているみたいだ。",
    ko: "피곤해 보여.",
  })),
  narrate(tx({
    id: "Sarah menatap Arka sejenak, lalu menunduk ke cangkir kopinya seperti menimbang kata-katanya.",
    en: "Sarah looks at Arka for a moment, then lowers her gaze to her coffee cup as if weighing her words.",
    ja: "サラはしばらくアルカを見つめたあと、言葉を選ぶようにコーヒーカップへ視線を落とす。",
    ko: "사라는 잠시 아르카를 바라보다가, 말을 고르듯 커피잔으로 시선을 내린다.",
  })),
  jump("day3-sara-cafe-continue"),
];

export const day3SaraListenScene: VisualNovelCommand[] = [
  narrate(tx({
    id: "Arka tetap diam dan menunggu. Ia tidak buru-buru mengisi keheningan, dan Sarah akhirnya melanjutkan ceritanya.",
    en: "Arka stays quiet and waits. He doesn't rush to fill the silence, and Sarah eventually continues her story.",
    ja: "アルカは黙って待つ。沈黙を急いで埋めようとせず、やがてサラが話を続ける。",
    ko: "아르카는 잠자코 기다린다. 그는 서두르지 않고 침묵을 채우지 않고, 결국 사라가 이야기를 이어 간다.",
  })),
  jump("day3-sara-cafe-continue"),
];

export const day3SaraCafeContinueScene: VisualNovelCommand[] = [
  say("sara", "sad", tx({
    id: "Suamiku pulang mungkin dua atau tiga kali dalam sebulan. Itupun biasanya hanya untuk mengambil dokumen dan pergi lagi.",
    en: "My husband comes home maybe two or three times a month. Even then, it's usually just to pick up documents and leave again.",
    ja: "夫が帰ってくるのは月に二、三度くらい。それもたいていは書類を取って、また出ていくだけよ。",
    ko: "남편은 한 달에 두세 번쯤 돌아와. 그마저도 보통은 서류를 챙기고 다시 나가 버려.",
  })),
  narrate(tx({
    id: "Ia mengucapkannya dengan tenang, seolah sudah terbiasa.",
    en: "She says it calmly, as if she's already used to it.",
    ja: "彼女はそれを、もう慣れたように静かに口にする。",
    ko: "그녀는 이미 익숙한 것처럼 차분하게 말한다.",
  })),
  say("sara", "neutral", tx({
    id: "Aku tidak bercerita ini agar dikasihani. Hanya saja... membicarakannya dengan seseorang yang tidak berkepentingan terasa sedikit lebih ringan.",
    en: "I'm not telling you this so you'll pity me. It's just... talking about it with someone who has no stake in it feels a little lighter.",
    ja: "同情されたくて話しているわけじゃない。ただ……利害のない誰かに話すと、少しだけ軽くなるの。",
    ko: "동정받으려고 하는 이야기는 아니야. 다만... 이해관계가 없는 사람과 이야기하면 조금 가벼워져.",
  })),
  say("arka", "gentle", tx({
    id: "Kenapa memilihku?",
    en: "Why me?",
    ja: "どうして僕なんだ？",
    ko: "왜 나야?",
  })),
  say("sara", "smile", tx({
    id: "Karena kamu tidak langsung mencoba menyenangkan saya. Itu langka.",
    en: "Because you don't immediately try to please me. That's rare.",
    ja: "すぐに私を喜ばせようとしないから。それが珍しいの。",
    ko: "바로 나를 기쁘게 하려고 하지 않으니까. 그건 드문 일이야.",
  })),
  narrate(tx({
    id: "Beberapa saat kemudian, Sarah melihat ponselnya, lalu menghela napas kecil.",
    en: "A moment later, Sarah looks at her phone, then lets out a small sigh.",
    ja: "しばらくして、サラはスマホを見て小さく息をつく。",
    ko: "잠시 후 사라는 휴대폰을 보고 작게 한숨을 쉰다.",
  })),
  playSfx(phoneSfx),
  say("sara", "neutral", tx({
    id: "Ada panggilan masuk dari asisten suami saya. Biasanya ini berarti jadwalnya berubah lagi.",
    en: "There's an incoming call from my husband's assistant. Usually that means his schedule has changed again.",
    ja: "夫のアシスタントから着信よ。たいてい、また予定が変わったという意味ね。",
    ko: "남편 비서에게서 전화가 왔어. 보통은 일정이 또 바뀌었다는 뜻이야.",
  })),
  narrate(tx({
    id: "Ia mengangkat ponsel ke telinga sejenak, hanya mendengarkan, lalu mematikan tanpa banyak bicara.",
    en: "She holds the phone to her ear for a moment, only listening, then hangs up without saying much.",
    ja: "彼女はしばらくスマホを耳に当て、聞くだけ聞いて、ほとんど話さずに切る。",
    ko: "그녀는 잠시 휴대폰을 귀에 대고 듣기만 하다가, 별로 말하지 않고 끊는다.",
  })),
  say("sara", "sad", tx({
    id: "Seperti yang kupikirkan. Pulangnya ditunda.",
    en: "Just as I thought. His return has been postponed.",
    ja: "思ったとおり。帰りが延期されたわ。",
    ko: "예상대로야. 귀가 일정이 미뤄졌어.",
  })),
  narrate(tx({
    id: "Ia tersenyum tipis, tapi senyum itu tidak sampai ke matanya.",
    en: "She gives a thin smile, but it doesn't reach her eyes.",
    ja: "彼女は薄く笑う。だがその笑みは目まで届かない。",
    ko: "그녀는 희미하게 웃지만, 그 미소는 눈까지 닿지 않는다.",
  })),
  say("sara", "neutral", tx({
    id: "Kamu mau antar aku kembali ke atas? Atau kamu punya urusan lain?",
    en: "Will you take me back upstairs? Or do you have something else to do?",
    ja: "上まで送ってくれる？ それとも、ほかに用事がある？",
    ko: "위까지 데려다 줄래? 아니면 다른 볼 일이 있어?",
  })),
  menu(tx({
    id: "Apa yang akan Arka lakukan?",
    en: "What will Arka do?",
    ja: "アルカはどうする？",
    ko: "아르카는 어떻게 할까?",
  }), [
    {
      id: "escort",
      label: tx({
        id: "Mengantar Sarah ke penthouse.",
        en: "Escort Sarah to the penthouse.",
        ja: "サラをペントハウスまで送る。",
        ko: "사라를 펜트하우스까지 데려다 준다.",
      }),
      next: "day3-sara-escort",
    },
    {
      id: "decline",
      label: tx({
        id: "Menolak dengan halus.",
        en: "Decline politely.",
        ja: "やんわり断る。",
        ko: "부드럽게 거절한다.",
      }),
      next: "day3-sara-decline",
    },
  ]),
];

export const day3SaraEscortScene: VisualNovelCommand[] = [
  setFlag("day3SaraEscorted", true),
  say("arka", "gentle", tx({
    id: "Aku antar.",
    en: "I'll take you.",
    ja: "送るよ。",
    ko: "데려다 줄게.",
  })),
  hide("arka-day3-sara", "fadeAway"),
  hide("sara-day3", "fadeAway"),
  bg(elevatorUrl, tx({
    id: "Lift Menuju Penthouse",
    en: "Elevator to the Penthouse",
    ja: "ペントハウスへ向かうエレベーター",
    ko: "펜트하우스로 가는 엘리베이터",
  })),
  playSfx(liftSfx),
  show("arka-day3-sara", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  show("sara-day3", "sara", "neutral", {
    position: "center",
    enterFrom: "right",
    xOffset: 0,
  }),
  narrate(tx({
    id: "Di dalam lift, suasana lebih sunyi dari kemarin.",
    en: "Inside the elevator, it's quieter than yesterday.",
    ja: "エレベーターの中は、昨日より静かだ。",
    ko: "엘리베이터 안은 어제보다 더 조용하다.",
  })),
  say("sara", "neutral", tx({
    id: "Kamu tidak bertanya banyak. Itu membuat orang seperti saya sedikit kesulitan.",
    en: "You don't ask many questions. That makes things a little difficult for someone like me.",
    ja: "あなた、あまり質問しないのね。私みたいな人間には、それが少し困るわ。",
    ko: "너는 질문을 많이 하지 않네. 나 같은 사람한테는 그게 조금 곤란해.",
  })),
  say("arka", "neutral", tx({
    id: "Kesulitan dalam hal apa?",
    en: "Difficult in what way?",
    ja: "どんなふうに困るんですか。",
    ko: "어떤 점이 곤란한데요?",
  })),
  say("sara", "blush", tx({
    id: "Biasanya aku bisa menebak apa yang orang inginkan dariku. Denganmu, belum.",
    en: "Usually I can guess what people want from me. With you, not yet.",
    ja: "普段は、人が私に何を求めているか読めるの。あなたについては、まだね。",
    ko: "보통은 사람들이 나한테서 뭘 원하는지 짐작할 수 있어. 너한테는 아직이고.",
  })),
  narrate(tx({
    id: "Pintu lift terbuka. Sarah tidak langsung masuk ke dalam unitnya.",
    en: "The elevator door opens. Sarah doesn't go into her unit right away.",
    ja: "エレベーターの扉が開く。サラはすぐには部屋へ入らない。",
    ko: "엘리베이터 문이 열린다. 사라는 바로 방으로 들어가지 않는다.",
  })),
  say("sara", "blush", tx({
    id: "Masuklah sebentar. Hanya sebentar.",
    en: "Come in for a moment. Just a moment.",
    ja: "少し入って。ほんの少しだけ。",
    ko: "잠깐 들어와. 아주 잠깐만.",
  })),
  hide("arka-day3-sara", "fadeAway"),
  hide("sara-day3", "fadeAway"),
  bg(saraHallwayUrl, tx({
    id: "Penthouse Sara",
    en: "Sarah's Penthouse",
    ja: "サラのペントハウス",
    ko: "사라의 펜트하우스",
  })),
  playSfx(openDoorSfx),
  show("arka-day3-sara", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  show("sara-day3", "sara", "smile", {
    position: "center",
    enterFrom: "right",
    xOffset: 0,
  }),
  narrate(tx({
    id: "Setelah beberapa menit berbicara, Sarah mengantar Arka kembali ke pintu.",
    en: "After talking for a few minutes, Sarah walks Arka back to the door.",
    ja: "数分話したあと、サラはアルカをドアまで送る。",
    ko: "몇 분간 이야기를 나눈 뒤, 사라는 아르카를 문까지 배웅한다.",
  })),
  say("sara", "smile", tx({
    id: "Terima kasih sudah menemani.",
    en: "Thank you for keeping me company.",
    ja: "付き合ってくれてありがとう。",
    ko: "함께해 줘서 고마워.",
  })),
  narrate(tx({
    id: "Ia menatap Arka sejenak sebelum menutup pintu.",
    en: "She looks at Arka for a moment before closing the door.",
    ja: "彼女はドアを閉める前に、しばらくアルカを見つめる。",
    ko: "그녀는 문을 닫기 전 잠시 아르카를 바라본다.",
  })),
  say("sara", "blush", tx({
    id: "Lain kali, aku mungkin tidak hanya mengajakmu minum kopi.",
    en: "Next time, I might not invite you just for coffee.",
    ja: "次は、コーヒーだけに誘うわけじゃないかもしれないわ。",
    ko: "다음엔 커피만 마시자고 부르지 않을지도 몰라.",
  })),
  jump("day3-sara-ending"),
];

export const day3SaraDeclineScene: VisualNovelCommand[] = [
  setFlag("day3SaraEscorted", false),
  say("arka", "serious", tx({
    id: "Sebenarnya aku masih ada urusan lain. Mungkin lain kali.",
    en: "I actually still have something else to do. Maybe next time.",
    ja: "実はまだほかに用事があって。また次の機会に。",
    ko: "사실 아직 다른 볼 일이 있어. 다음엔 그럴게.",
  })),
  say("sara", "sad", tx({
    id: "Baiklah. Mungkin lain kali.",
    en: "All right. Maybe next time.",
    ja: "わかったわ。また今度ね。",
    ko: "알겠어. 다음에 보자.",
  })),
  narrate(tx({
    id: "Sarah tidak marah. Ia hanya mengambil cangkirnya, berpamitan dengan tenang, dan meninggalkan café lebih dulu.",
    en: "Sarah isn't angry. She simply picks up her cup, says goodbye calmly, and leaves the café first.",
    ja: "サラは怒らない。ただカップを手に取り、静かに別れを告げて、先にカフェを出ていく。",
    ko: "사라는 화내지 않는다. 잔을 집어 들고 차분히 작별한 뒤 먼저 카페를 떠난다.",
  })),
  jump("day3-sara-ending"),
];

export const day3SaraEndingScene: VisualNovelCommand[] = [
  hide("arka-day3-sara"),
  hide("sara-day3", "fadeAway"),
  setFlag("day3Slot2SarahCompleted", true),
  setFlag("day3SaraCompleted", true),
  narrate(tx({
    id: "Dia berbicara seolah semuanya biasa saja, tapi semakin lama aku menemani, semakin jelas ada sesuatu yang terus dia tahan sendiri.",
    en: "She talks as if everything is ordinary, but the longer I stay with her, the clearer it becomes that she's holding something back on her own.",
    ja: "彼女はすべてが普通だと言わんばかりに話す。だが一緒にいるほど、一人で抑え込んでいるものがはっきり見えてくる。",
    ko: "그녀는 모든 게 평범한 것처럼 말한다. 하지만 함께할수록, 혼자 눌러 두고 있는 무언가가 더 분명해진다.",
  }), "arka"),
  jump("day3-complete"),
];
