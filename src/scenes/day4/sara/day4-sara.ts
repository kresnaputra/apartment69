import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  blackScreen,
  cutScene,
  hide,
  jump,
  menu,
  narrate,
  playBgm,
  say,
  setFlag,
  show,
  clearBlackScreen,
} from "@/scenes/scriptTypes";
import hallwayUrl from "@/background/hallway.png";
import parkUrl from "@/background/park.jpeg";
import saraParkVideoUrl from "@/cut-scene/sara-park-1.mp4";
import saraParkVideo2Url from "@/cut-scene/sara-park-2.mp4";
import saraParkVideo3Url from "@/cut-scene/sara-park-3.mp4";
import saraParkVideo4Url from "@/cut-scene/sara-park-4.mp4";
import saraParkVideo5Url from "@/cut-scene/sara-park-5.mp4";
import saraParkVideo6Url from "@/cut-scene/sara-park-6.mp4";
import saraParkVoice4Url from "@/voice/sara/sara-park-4.wav";
import saraParkVoice5Url from "@/voice/sara/sara-park-5.wav";
import saraParkVoice6Url from "@/voice/sara/sara-park-6.wav";
import day4Bgm from "@/music/day4.mp3";

export const day4SaraStartScene: VisualNovelCommand[] = [
  playBgm(day4Bgm),
  setFlag("day4SelectedCharacter", "sara"),
  bg(
    hallwayUrl,
    tx({
      id: "Hallway",
      en: "Hallway",
      ja: "廊下",
      ko: "복도",
    }),
  ),
  show("arka-day4-sara", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  narrate(
    tx({
      id: "Sore hari. Arka menerima pesan singkat dari Sarah.",
      en: "Late afternoon. Arka receives a short message from Sarah.",
      ja: "夕方。アルカはサラから短いメッセージを受け取る。",
      ko: "저녁. 아르카는 사라에게서 짧은 메시지를 받는다.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Kalau kamu tidak sibuk, datang ke basement parking dalam 20 menit. Ada hal yang ingin aku bicarakan.",
      en: "If you're not busy, come to the basement parking in twenty minutes. There's something I want to talk about.",
      ja: "忙しくないなら、20分以内に地下駐車場へ来て。話したいことがあるの。",
      ko: "바쁘지 않으면 20분 안에 지하 주차장으로 와. 하고 싶은 이야기가 있어.",
    }),
  ),
  bg(
    parkUrl,
    tx({
      id: "Basement Parking",
      en: "Basement Parking",
      ja: "地下駐車場",
      ko: "지하 주차장",
    }),
  ),
  narrate(
    tx({
      id: "Arka turun ke basement. Sarah sudah berdiri di samping mobil hitamnya, melepas mantel dan meletakkannya di kursi pengemudi. Ia memakai blouse gelap dengan beberapa kancing atas yang longgar.",
      en: "Arka goes down to the basement. Sarah is already standing beside her black car, taking off her coat and placing it on the driver's seat. She is wearing a dark blouse with several top buttons undone.",
      ja: "アルカは地下へ下りる。サラはすでに黒い車のそばに立っていて、コートを脱いで運転席に置く。彼女は暗い色のブラウスを着ていて、上のボタンがいくつか外れている。",
      ko: "아르카는 지하로 내려간다. 사라는 이미 검은 차 옆에 서서 코트를 벗어 운전석에 내려놓는다. 그녀는 윗단추 몇 개가 풀린 어두운 블라우스를 입고 있다.",
    }),
  ),
  show("sara-day4", "sara", "neutral", {
    position: "center",
    enterFrom: "right",
    xOffset: 0,
  }),
  say(
    "sara",
    "neutral",
    tx({
      id: "Kamu datang.",
      en: "You came.",
      ja: "来たのね。",
      ko: "왔구나.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Kamu bilang 20 menit.",
      en: "You said twenty minutes.",
      ja: "20分って言ったから。",
      ko: "20분이라고 했으니까.",
    }),
  ),
  say(
    "sara",
    "smile",
    tx({
      id: "Aku menghargai orang yang menepati waktu.",
      en: "I appreciate people who keep their time.",
      ja: "時間を守る人は好きよ。",
      ko: "시간을 지키는 사람은 마음에 들어.",
    }),
  ),
  narrate(
    tx({
      id: "Ia menyandarkan pinggangnya di mobil, menatap Arka dengan tenang.",
      en: "She leans her hip against the car and looks at Arka calmly.",
      ja: "彼女は腰を車にもたせかけ、静かにアルカを見つめる。",
      ko: "그녀는 허리를 차에 기댄 채 차분히 아르카를 바라본다.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Tadi aku baru selesai meeting. Melelahkan. Orang-orang di ruangan itu hanya bicara soal angka dan keuntungan.",
      en: "I just finished a meeting. Exhausting. The people in that room only talk about numbers and profit.",
      ja: "さっき会議が終わったところ。疲れたわ。あの部屋の人たちは、数字と利益の話しかしないの。",
      ko: "방금 회의가 끝났어. 피곤해. 그 방 사람들은 숫자랑 이익 이야기밖에 안 해.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Dan sekarang kamu di basement.",
      en: "And now you're in the basement.",
      ja: "それで今は地下にいるんだ。",
      ko: "그래서 지금은 지하에 있는 거고.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Karena di sini lebih sunyi. Dan karena aku ingin bertemu kamu.",
      en: "Because it's quieter here. And because I wanted to see you.",
      ja: "ここはもっと静かだから。それに、あなたに会いたかったから。",
      ko: "여기가 더 조용해서. 그리고 너를 만나고 싶어서.",
    }),
  ),
  narrate(
    tx({
      id: "Ucapannya terdengar ringan, tapi matanya tidak bergerak dari Arka.",
      en: "Her words sound light, but her eyes do not leave Arka.",
      ja: "口調は軽い。だが視線はアルカから動かない。",
      ko: "말투는 가볍지만, 시선은 아르카에게서 떨어지지 않는다.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Kemarin di café, kamu banyak diam. Aku jadi penasaran… apakah kamu memang pendiam, atau hanya berhati-hati denganku?",
      en: "Yesterday at the café, you were mostly quiet. It made me curious... are you just reserved, or were you only being careful with me?",
      ja: "昨日のカフェでは、あなたはずっと黙っていたわ。気になって……本当に無口なのか、それとも私に用心しているだけなのか。",
      ko: "어제 카페에서 너는 말이 별로 없었어. 궁금해졌어... 원래 과묵한 건지, 아니면 나한테만 조심하는 건지.",
    }),
  ),
  menu(
    tx({
      id: "Pilihan 1",
      en: "Choice 1",
      ja: "選択1",
      ko: "선택 1",
    }),
    [
      {
        id: "reserved",
        label: tx({
          id: "Saya memang tidak banyak bicara.",
          en: "I really don't talk much.",
          ja: "僕は本当にあまり話しません。",
          ko: "저는 원래 말이 많지 않습니다.",
        }),
        next: "day4-sara-reserved",
      },
      {
        id: "reading",
        label: tx({
          id: "Saya masih membaca situasinya.",
          en: "I'm still reading the situation.",
          ja: "まだ状況を見ています。",
          ko: "아직 상황을 읽고 있습니다.",
        }),
        next: "day4-sara-reading",
      },
      {
        id: "listening",
        label: tx({
          id: "Denganmu, saya lebih memilih mendengarkan.",
          en: "With you, I'd rather listen.",
          ja: "あなたには、聞くほうを選びます。",
          ko: "당신 앞에서는 듣는 쪽을 택하겠습니다.",
        }),
        next: "day4-sara-listening",
      },
    ],
  ),
];

export const day4SaraReservedScene: VisualNovelCommand[] = [
  say(
    "arka",
    "neutral",
    tx({
      id: "Saya memang tidak banyak bicara.",
      en: "I really don't talk much.",
      ja: "僕は本当にあまり話しません。",
      ko: "저는 원래 말이 많지 않습니다.",
    }),
  ),
  jump("day4-sara-car-invite"),
];

export const day4SaraReadingScene: VisualNovelCommand[] = [
  say(
    "arka",
    "neutral",
    tx({
      id: "Saya masih membaca situasinya.",
      en: "I'm still reading the situation.",
      ja: "まだ状況を見ています。",
      ko: "아직 상황을 읽고 있습니다.",
    }),
  ),
  jump("day4-sara-car-invite"),
];

export const day4SaraListeningScene: VisualNovelCommand[] = [
  say(
    "arka",
    "neutral",
    tx({
      id: "Denganmu, saya lebih memilih mendengarkan.",
      en: "With you, I'd rather listen.",
      ja: "あなたには、聞くほうを選びます。",
      ko: "당신 앞에서는 듣는 쪽을 택하겠습니다.",
    }),
  ),
  jump("day4-sara-car-invite"),
];

export const day4SaraCarInviteScene: VisualNovelCommand[] = [
  narrate(
    tx({
      id: "Sarah tersenyum tipis.",
      en: "Sarah smiles thinly.",
      ja: "サラが薄く微笑む。",
      ko: "사라가 희미하게 미소 짓는다.",
    }),
  ),
  say(
    "sara",
    "smile",
    tx({
      id: "Jawaban yang tidak membosankan.",
      en: "An answer that isn't boring.",
      ja: "退屈じゃない答えね。",
      ko: "지루하지 않은 대답이네.",
    }),
  ),
  narrate(
    tx({
      id: "Ia membuka pintu mobil sebelah penumpang.",
      en: "She opens the passenger door.",
      ja: "彼女は助手席のドアを開ける。",
      ko: "그녀는 조수석 문을 연다.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Naik. Aku tidak ingin berbicara di basement terlalu lama.",
      en: "Get in. I don't want to talk in the basement for too long.",
      ja: "乗って。地下であまり長く話したくないの。",
      ko: "타. 지하에서 너무 오래 이야기하고 싶지 않아.",
    }),
  ),
  cutScene(saraParkVideoUrl, true, [
    tx({
      id: "Di dalam mobil, Sarah hanya duduk.",
      en: "Inside the car, Sarah simply sits.",
      ja: "車の中で、サラはただ座っている。",
      ko: "차 안에서 사라는 그저 앉아 있다.",
    }),
    tx({
      id: "Sarah: Suamiku mengirim pesan tadi siang. Katanya perjalanan bisnisnya diperpanjang lagi.",
      en: "Sarah: My husband sent a message this afternoon. He said his business trip has been extended again.",
      ja: "サラ：夫から今日の昼にメッセージが来たわ。出張がまた延びたそうよ。",
      ko: "사라: 남편이 오늘 낮에 메시지를 보냈어. 출장이 또 연장됐대.",
    }),
    tx({
      id: "Ia mengucapkannya datar.",
      en: "She says it flatly.",
      ja: "彼女はそれを平坦な声で言う。",
      ko: "그녀는 담담하게 말한다.",
    }),
    tx({
      id: "Sarah: Aku sudah berhenti menghitung berapa kali ia bilang seperti itu.",
      en: "Sarah: I've stopped counting how many times he's said that.",
      ja: "サラ：そんなことを何回言われたか、もう数えるのをやめたわ。",
      ko: "사라: 그런 말을 몇 번이나 했는지, 이제 세는 것도 그만뒀어.",
    }),
    tx({
      id: "Hening sejenak.",
      en: "A brief silence.",
      ja: "しばらく沈黙が落ちる。",
      ko: "잠시 침묵이 흐른다.",
    }),
    tx({
      id: "Sarah: Kamu tahu apa yang paling aneh? Aku tidak marah lagi. Hanya… kosong.",
      en: "Sarah: Do you know what's strangest? I'm not angry anymore. I'm just... empty.",
      ja: "サラ：何が一番変だかわかる？ もう怒っていないの。ただ……空っぽ。",
      ko: "사라: 뭐가 제일 이상한지 알아? 이제 화도 안 나. 그냥... 비어 있어.",
    }),
    tx({
      id: "Ia menoleh ke Arka.",
      en: "She turns toward Arka.",
      ja: "彼女はアルカのほうを向く。",
      ko: "그녀는 아르카를 돌아본다.",
    }),
  ]),
  cutScene(
    saraParkVideo2Url,
    true,
    [
      tx({
        id: "Sarah: Kalau aku bilang aku lelah menjadi wanita yang selalu terlihat baik-baik saja, kamu akan bilang apa?",
        en: "Sarah: If I said I'm tired of being a woman who always looks perfectly fine, what would you say?",
        ja: "サラ：いつも平気そうに見える女でいるのに疲れたと言ったら、あなたは何て言う？",
        ko: "사라: 언제나 괜찮은 여자로 보이는 게 지겹다고 하면, 너는 뭐라고 할래?",
      }),
    ],
    {
      prompt: tx({
        id: "Pilihan 2",
        en: "Choice 2",
        ja: "選択2",
        ko: "선택 2",
      }),
      options: [
        {
          id: "too-long",
          label: tx({
            id: "Kedengarannya kamu sudah menahan terlalu lama.",
            en: "It sounds like you've been holding it in for too long.",
            ja: "かなり長く我慢してきたように聞こえます。",
            ko: "너무 오래 참아 온 것처럼 들립니다.",
          }),
          next: "day4-sara-too-long",
        },
        {
          id: "not-strong",
          label: tx({
            id: "Kamu tidak harus selalu terlihat kuat.",
            en: "You don't always have to look strong.",
            ja: "いつも強く見える必要はありません。",
            ko: "언제나 강해 보일 필요는 없습니다.",
          }),
          next: "day4-sara-not-strong",
        },
      ],
    },
  ),
];

export const day4SaraTooLongScene: VisualNovelCommand[] = [
  say(
    "arka",
    "neutral",
    tx({
      id: "Kedengarannya kamu sudah menahan terlalu lama.",
      en: "It sounds like you've been holding it in for too long.",
      ja: "かなり長く我慢してきたように聞こえます。",
      ko: "너무 오래 참아 온 것처럼 들립니다.",
    }),
  ),
  jump("day4-sara-tension"),
];

export const day4SaraNotStrongScene: VisualNovelCommand[] = [
  say(
    "arka",
    "neutral",
    tx({
      id: "Kamu tidak harus selalu terlihat kuat.",
      en: "You don't always have to look strong.",
      ja: "いつも強く見える必要はありません。",
      ko: "언제나 강해 보일 필요는 없습니다.",
    }),
  ),
  jump("day4-sara-tension"),
];

export const day4SaraTensionScene: VisualNovelCommand[] = [
  cutScene(saraParkVideo3Url, true, [
    tx({
      id: "Sarah: Kau benar.",
      en: "Sarah: You're right.",
      ja: "サラ：そのとおりね。",
      ko: "사라: 네 말이 맞아.",
    }),
    tx({
      id: "Sarah: Aku tidak tahu kenapa aku terus memanggilmu.",
      en: "Sarah: I don't know why I keep calling you.",
      ja: "サラ：どうしてあなたを呼び続けるのか、自分でもわからない。",
      ko: "사라: 왜 계속 너를 부르는지, 나도 모르겠어.",
    }),
    tx({
      id: "Sarah: Mungkin karena kamu tidak langsung menginginkan sesuatu seperti orang kebanyakan.",
      en: "Sarah: Maybe because you don't immediately want something, the way most people do.",
      ja: "サラ：たいていの人みたいに、すぐに何かを求めてこないからかもしれない。",
      ko: "사라: 대부분 사람들처럼 당장 무언가를 원하지 않아서일지도 몰라.",
    }),
  ]),
  blackScreen(),
  narrate(
    tx({
      id: "Tangannya terangkat, jari-jarinya menyentuh baju Arka dengan gerakan sangat pelan.",
      en: "Her hand rises, and her fingers touch Arka's shirt with a very slow movement.",
      ja: "彼女の手が上がり、指がとてもゆっくりとアルカのシャツに触れる。",
      ko: "그녀의 손이 올라가고, 손가락이 아주 천천히 아르카의 셔츠에 닿는다.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Atau mungkin… aku hanya ingin tahu sampai di mana kamu akan menahan diri.",
      en: "Or maybe... I just want to know how far you'll hold yourself back.",
      ja: "それとも……あなたがどこまで自分を抑えるのか、知りたいだけかもしれない。",
      ko: "아니면... 네가 어디까지 참는지 알고 싶을 뿐인지도 몰라.",
    }),
  ),
  menu(
    tx({
      id: "Apa yang Arka lakukan?",
      en: "What does Arka do?",
      ja: "アルカはどうする？",
      ko: "아르카는 어떻게 할까?",
    }),
    [
      {
        id: "stay",
        label: tx({
          id: "Tetap diam dan membiarkan",
          en: "Stay still and let her",
          ja: "黙ったまま、されるがままにする",
          ko: "가만히 두고 내버려 둔다",
        }),
        next: "day4-sara-stay",
      },
      {
        id: "move-closer",
        label: tx({
          id: "Membalas mendekat",
          en: "Lean in and answer her",
          ja: "近づいて応じる",
          ko: "다가가 응한다",
        }),
        next: "day4-sara-move-closer",
      },
    ],
  ),
  clearBlackScreen(),
];

export const day4SaraStayScene: VisualNovelCommand[] = [
  setFlag("day4SaraMovedCloser", false),
  jump("day4-sara-kiss"),
];

export const day4SaraMoveCloserScene: VisualNovelCommand[] = [
  setFlag("day4SaraMovedCloser", true),
  jump("day4-sara-kiss"),
];

export const day4SaraKissScene: VisualNovelCommand[] = [
  setFlag("day4SaraIntimate", true),
  cutScene(
    saraParkVideo4Url,
    true,
    [
      tx({
        id: "Sarah tidak menunggu lebih lama. Ia menutup sisa jarak di antara mereka dan mencium Arka, pelan di awal, lalu semakin dalam. Tangannya menahan kerah Arka seolah tidak ingin ia pergi.",
        en: "Sarah doesn't wait any longer. She closes the remaining distance between them and kisses Arka, softly at first, then deeper. Her hand holds Arka's collar as if she doesn't want him to leave.",
        ja: "サラはそれ以上待たない。二人の間に残った距離を埋め、アルカに口づける。最初は静かに、やがて深く。彼女の手はアルカの襟を押さえ、行かせないようにしている。",
        ko: "사라는 더 기다리지 않는다. 둘 사이에 남은 거리를 없애고 아르카에게 입을 맞춘다. 처음에는 부드럽게, 이내 더 깊게. 그녀의 손은 아르카의 옷깃을 잡아, 그가 떠나지 못하게 한다.",
      }),
      {
        text: tx({
          id: "Sarah: Jangan bilang apa-apa dulu…",
          en: "Sarah: Don't say anything yet...",
          ja: "サラ：まだ何も言わないで……",
          ko: "사라: 아직은 아무 말도 하지 마...",
        }),
      },
      tx({
        id: "Ciuman itu berlangsung beberapa saat sebelum Sarah melepaskannya",
        en: "The kiss lasts for a while before Sarah pulls away",
        ja: "口づけはしばらく続き、サラが離す",
        ko: "입맞춤은 한동안 이어지다가 사라가 떨어진다",
      }),
    ],
    false,
    saraParkVoice4Url,
  ),
  cutScene(
    saraParkVideo5Url,
    true,
    [
      tx({
        id: "Sarah: Ini pertama kalinya aku melakukan sesuatu yang benar-benar ingin kulakukan… tanpa memikirkan akibatnya.",
        en: "Sarah: This is the first time I've done something I truly wanted to do... without thinking about the consequences.",
        ja: "サラ：本当にしたいことを、結果を考えずにしたのは……これが初めてよ。",
        ko: "사라: 정말로 하고 싶은 일을, 결과를 생각하지 않고 한 건... 이번이 처음이야.",
      }),
      tx({
        id: "Sarah: Diam.",
        en: "Sarah: Be quiet.",
        ja: "サラ：黙って。",
        ko: "사라: 조용히 해.",
      }),
    ],
    false,
    saraParkVoice5Url,
  ),
  cutScene(
    saraParkVideo6Url,
    true,
    [
      tx({
        id: "Sarah: Jangan tanya apa pun sekarang.",
        en: "Sarah: Don't ask anything right now.",
        ja: "サラ：今は何も聞かないで。",
        ko: "사라: 지금은 아무것도 묻지 마.",
      }),
      tx({
        id: "Arka: Sarah—",
        en: "Arka: Sarah—",
        ja: "アルカ：サラ——",
        ko: "아르카: 사라——",
      }),
    ],
    false,
    saraParkVoice6Url,
  ),
  narrate(
    tx({
      id: "Sambil tetap mencium, tangan Sarah turun dan membuka celana Arka. Ia memegang milik Arka dengan gerakan yang sengaja pelan.",
      en: "Still kissing him, Sarah's hand moves down and opens Arka's pants. She holds him with a deliberately slow touch.",
      ja: "口づけを続けたまま、サラの手が下りてアルカのズボンを開ける。彼女はわざとゆっくりした動きで彼を握る。",
      ko: "입을 맞춘 채로 사라의 손이 내려가 아르카의 바지를 연다. 그녀는 일부러 느린 손길로 그를 쥔다.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Sudah seperti ini hanya karena ciuman…",
      en: "Already like this, just from a kiss...",
      ja: "口づけだけで、もうこうなの……",
      ko: "입맞춤만으로 벌써 이렇게...",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Kamu kurang ajar.",
      en: "You're shameless.",
      ja: "ふらちなのね。",
      ko: "뻔뻔하기도 해.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Kamu yang mulai.",
      en: "You started it.",
      ja: "始めたのはあなたです。",
      ko: "시작한 건 당신이잖아요.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Dan aku yang akan mengakhiri.",
      en: "And I'll be the one who finishes it.",
      ja: "終わらせるのは私よ。",
      ko: "끝내는 건 나야.",
    }),
  ),
  narrate(
    tx({
      id: "Sarah menggerakkan tangannya naik-turun dengan tempo yang ia kendalikan sendiri.",
      en: "Sarah moves her hand up and down at a pace she controls herself.",
      ja: "サラは自分で決めた調子で、手を上下に動かす。",
      ko: "사라는 스스로 정한 속도로 손을 위아래로 움직인다.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Jangan bergerak.",
      en: "Don't move.",
      ja: "動かないで。",
      ko: "움직이지 마.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Tanganmu… erat.",
      en: "Your hand... it's tight.",
      ja: "手……きつい。",
      ko: "손이... 세.",
    }),
  ),
  narrate(
    tx({
      id: "Gerakan tangan Sarah menjadi lebih cepat. Napasnya mulai terdengar, tapi ia masih menahan suara.",
      en: "Sarah's hand moves faster. Her breathing becomes audible, but she still holds her voice back.",
      ja: "サラの手の動きが速くなる。息づかいが聞こえ始めるが、彼女はまだ声を抑えている。",
      ko: "사라의 손 움직임이 빨라진다. 숨소리가 들리기 시작하지만, 그녀는 아직 목소리를 참는다.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Kamu berdenyut…",
      en: "You're throbbing...",
      ja: "脈打ってる……",
      ko: "뛰고 있어...",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Kamu bisa menahannya, bukan?",
      en: "You can hold it, can't you?",
      ja: "我慢できるでしょう？",
      ko: "참을 수 있지?",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Sulit tidak menahan.",
      en: "It's hard to hold it back.",
      ja: "我慢するのが難しい。",
      ko: "참기가 어려워.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Kalau begitu, jangan ditahan lagi.",
      en: "Then don't hold it anymore.",
      ja: "それなら、もう我慢しないで。",
      ko: "그렇다면 더는 참지 마.",
    }),
  ),
  narrate(
    tx({
      id: "Ia mempercepat gerakannya.",
      en: "She speeds up her movements.",
      ja: "彼女は動きを速める。",
      ko: "그녀는 움직임을 더 빠르게 한다.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Keluarlah.",
      en: "Come.",
      ja: "イって。",
      ko: "싸.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Di tangan aku.",
      en: "In my hand.",
      ja: "私の手の中に。",
      ko: "내 손에.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Sekarang.",
      en: "Now.",
      ja: "今。",
      ko: "지금.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Aku bilang sekarang.",
      en: "I said now.",
      ja: "今って言ったの。",
      ko: "지금이라고 했어.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Sarah… aku hampir…",
      en: "Sarah... I'm close...",
      ja: "サラ……もう……",
      ko: "사라... 나 곧...",
    }),
  ),
  narrate(
    tx({
      id: "Arka keluar di tangan Sarah. Sarah terus menggerakkan tangannya sampai selesai, baru kemudian melepaskan ciuman.",
      en: "Arka finishes in Sarah's hand. Sarah keeps moving her hand until he is done, and only then does she break the kiss.",
      ja: "アルカはサラの手の中で果てる。サラは終わるまで手を動かし続け、それから口づけを解く。",
      ko: "아르카는 사라의 손 안에서 싼다. 사라는 끝날 때까지 손을 움직이다가, 그다음에야 입술을 뗀다.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Nngghh…",
      en: "Nngghh...",
      ja: "んっ……",
      ko: "으응...",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Hnn…",
      en: "Hnn...",
      ja: "んん……",
      ko: "흐응...",
    }),
  ),
  narrate(
    tx({
      id: "Ia mengambil tisu dan membersihkan tangannya dengan gerakan rapi.",
      en: "She takes a tissue and cleans her hand with neat movements.",
      ja: "彼女はティッシュを取り、整った動作で手を拭く。",
      ko: "그녀는 티슈를 집어 단정한 손놀림으로 손을 닦는다.",
    }),
  ),
  jump("day4-sara-ending"),
];

export const day4SaraEndingScene: VisualNovelCommand[] = [
  say(
    "sara",
    "neutral",
    tx({
      id: "Jangan bilang ini berarti sesuatu.",
      en: "Don't say this means something.",
      ja: "これが何か意味するなんて、言わないで。",
      ko: "이게 무슨 의미라고는 하지 마.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "…",
      en: "...",
      ja: "……",
      ko: "……",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Aku hanya… sedang lelah mengendalikan semuanya sendirian.",
      en: "I'm just... tired of controlling everything by myself.",
      ja: "ただ……全部を一人でコントロールするのに、疲れていただけ。",
      ko: "난 그냥... 모든 걸 혼자 통제하는 게 지쳤을 뿐이야.",
    }),
  ),
  narrate(
    tx({
      id: "Ia merapikan blouse-nya.",
      en: "She straightens her blouse.",
      ja: "彼女はブラウスを整える。",
      ko: "그녀는 블라우스를 가다듬는다.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Antar aku ke atas. Dan malam ini, kita berhenti di sini.",
      en: "Take me upstairs. And tonight, we stop here.",
      ja: "上まで送って。今夜は、ここで終わりよ。",
      ko: "위까지 데려다 줘. 그리고 오늘 밤은 여기서 그만두자.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Baik.",
      en: "All right.",
      ja: "わかりました。",
      ko: "알겠습니다.",
    }),
  ),
  narrate(
    tx({
      id: "Sarah membuka pintu mobil, lalu menoleh sebentar.",
      en: "Sarah opens the car door, then looks back for a moment.",
      ja: "サラは車のドアを開け、少し振り返る。",
      ko: "사라는 차 문을 열고 잠시 돌아본다.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Lain kali… jangan terlalu mudah menurut.",
      en: "Next time... don't be so easy to obey.",
      ja: "次は……そんなに簡単に従わないで。",
      ko: "다음엔... 그렇게 쉽게 따르지 마.",
    }),
  ),
  hide("sara-day4"),
  hide("arka-day4-sara"),
  setFlag("day4SaraCompleted", true),
  jump("day4-complate"),
];
