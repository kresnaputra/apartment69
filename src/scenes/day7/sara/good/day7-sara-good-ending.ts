import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  blackScreen,
  centeredText,
  clearBlackScreen,
  cutScene,
  jumpIf,
  narrate,
  playBgm,
  say,
  scene,
  setFlag,
} from "@/scenes/scriptTypes";
import bedroomNight from "@/background/bedroom-night.png";
import penthouse from "@/background/sara-penthouse.png";
import goodEndingBgm from "@/music/cutscene-1-sarah.mp3";
import good01 from "@/cut-scene/sarah-good-01-animation.mp4";
import good02 from "@/cut-scene/sarah-good-02-animation.mp4";
import good03 from "@/cut-scene/sarah-good-03-animation.mp4";
import good04 from "@/cut-scene/sarah-good-04-animation.mp4";
import good05 from "@/cut-scene/sarah-good-05-animation.mp4";
import good06 from "@/cut-scene/sarah-good-06-animation.mp4";
import good07 from "@/cut-scene/sarah-good-07-animation.mp4";
import good08 from "@/cut-scene/sarah-good-08-animation.mp4";
import good09 from "@/cut-scene/sarah-good-09-animation.mp4";
import audio02 from "@/voice/sara/sarah-good-02-animation-audio.wav";
import audio03 from "@/voice/sara/sarah-good-03-animation-audio.wav";
import audio04 from "@/voice/sara/sarah-good-04-animation-audio.wav";
import audio05 from "@/voice/sara/sarah-good-05-animation-audio.wav";
import audio06 from "@/voice/sara/sarah-good-06-animation-audio.wav";
import audio07 from "@/voice/sara/sarah-good-07-animation-audio.wav";
import audio08 from "@/voice/sara/sarah-good-08-animation-audio.wav";
import audio09 from "@/voice/sara/sarah-good-09-animation-audio.wav";
import midnightHallway from "@/background/midnight-sara-hallway.png";

export const day7SaraGoodEndingScene: VisualNovelCommand[] = [
  playBgm(goodEndingBgm),
  bg(
    bedroomNight,
    tx({
      id: "Apartment 69 - Unit 302, Malam",
      en: "Apartment 69 - Unit 302, Night",
      ja: "Apartment 69 - 302号室、夜",
      ko: "Apartment 69 - 302호, 밤",
    }),
  ),
  narrate(
    tx({
      id: "Malam hari. Suami Sarah kembali dinas di luar kota. Sebuah pesan masuk di ponsel Arka.",
      en: "It's nighttime. Sarah's husband is away on business again. A message comes in on Arka's phone.",
      ja: "夜。サラの夫は再び出張に出た。アルカのスマホにメッセージが届く。",
      ko: "밤. 사라의 남편은 다시 지방으로 출장을 떠났다. 아르카의 휴대폰에 메시지가 왔다.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Dia sudah pergi. Kamarku kosong malam ini. Datang.",
      en: "He's gone. My room is empty tonight. Come over.",
      ja: "夫はもう出たわ。今夜、私の部屋には誰もいない。来て。",
      ko: "그 사람은 갔어. 오늘 밤 내 방엔 아무도 없어. 와.",
    }),
  ),
  bg(
    penthouse,
    tx({
      id: "Penthouse - Malam",
      en: "Penthouse - Night",
      ja: "ペントハウス - 夜",
      ko: "펜트하우스 - 밤",
    }),
  ),
  cutScene(good01, true, [
    narrate(
      tx({
        id: "Arka tiba di depan pintu kamar utama penthouse. Sarah membuka pintu dengan senyum tipis.",
        en: "Arka arrives at the door of the penthouse's main bedroom. Sarah opens it with a faint smile.",
        ja: "アルカはペントハウスの主寝室の前に着いた。サラはかすかに微笑んでドアを開ける。",
        ko: "아르카는 펜트하우스의 안방 문 앞에 도착했다. 사라는 옅은 미소를 지으며 문을 열었다.",
      }),
    ),
    tx({
      id: "Di dalam, lampu redup. Beberapa lilin kecil menyala, dan sebotol wine terletak di meja samping ranjang.",
      en: "Inside, the lights are low. A few small candles burn, and a bottle of wine sits on the nightstand.",
      ja: "部屋の明かりは落とされ、小さなろうそくがいくつか灯っていた。ベッド脇のテーブルにはワインが一本置いてある。",
      ko: "방 안의 조명은 어두웠다. 작은 초 몇 개가 타고 있었고, 침대 옆 탁자에는 와인 한 병이 놓여 있었다.",
    }),
    tx({
      id: "Sarah: Akhirnya kau datang.",
      en: "Sarah: You finally came.",
      ja: "サラ：やっと来たのね。",
      ko: "사라: 드디어 왔네.",
    }),
    tx({
      id: "Sarah: Anggap saja ini pesta kecil… hanya untuk kita berdua.",
      en: "Sarah: Think of it as a little party... just for the two of us.",
      ja: "サラ：小さなパーティーだと思って……私たち二人だけの。",
      ko: "사라: 작은 파티라고 생각해… 우리 둘만을 위한.",
    }),
  ]),
  blackScreen(),
  say(
    "sara",
    "neutral",
    tx({
      id: "Hari ini aku… hanya ingin merasakanmu.",
      en: "Tonight, I... just want to feel you.",
      ja: "今夜は……ただ、あなたを感じたいの。",
      ko: "오늘 밤은… 그냥 널 느끼고 싶어.",
    }),
  ),
  clearBlackScreen(),
  cutScene(
    good02,
    true,
    [
      tx({
        id: "Sarah: Mmm…",
        en: "Sarah: Mmm...",
        ja: "サラ：んん……",
        ko: "사라: 음…",
      }),
      tx({
        id: "Sarah: Sudah keras…",
        en: "Sarah: You're already hard...",
        ja: "サラ：もう硬くなってる……",
        ko: "사라: 벌써 단단해졌네…",
      }),
      tx({
        id: "Sarah: Aku mau merasakannya dulu.",
        en: "Sarah: I want to taste it first.",
        ja: "サラ：先に味わいたいの。",
        ko: "사라: 먼저 맛보고 싶어.",
      }),
      tx({
        id: "Sarah menjilat penis Arka dari pangkal sampai ujung, lalu perlahan memasukkannya ke mulut.",
        en: "Sarah licks Arka's penis from base to tip, then slowly takes it into her mouth.",
        ja: "サラはアルカのペニスを根元から先まで舐め、それからゆっくり口に含んだ。",
        ko: "사라는 아르카의 페니스를 밑동부터 끝까지 핥은 뒤 천천히 입에 넣었다.",
      }),
      tx({
        id: "Sarah: Mmm… ahh…",
        en: "Sarah: Mmm... ahh...",
        ja: "サラ：んん……あぁ……",
        ko: "사라: 음… 아아…",
      }),
      tx({
        id: "Arka: Sarah…",
        en: "Arka: Sarah...",
        ja: "アルカ：サラ……",
        ko: "아르카: 사라…",
      }),
    ],
    false,
    audio02,
  ),
  cutScene(
    good03,
    true,
    [
      tx({
        id: "Sarah mengulum lebih dalam. Tangannya memegang pangkal penis Arka sambil menggerakkan kepala naik turun.",
        en: "Sarah takes him deeper, holding the base of his penis as she moves her head up and down.",
        ja: "サラはさらに深く口に含み、アルカのペニスの根元を握りながら頭を上下させた。",
        ko: "사라는 더 깊이 입에 머금고, 아르카의 페니스 밑동을 쥔 채 고개를 위아래로 움직였다.",
      }),
      tx({
        id: "Sarah: Rasanya… hangat.",
        en: "Sarah: It feels... warm.",
        ja: "サラ：なんだか……温かい。",
        ko: "사라: 따뜻해…",
      }),
      tx({
        id: "Sarah: Jangan keluar dulu. Aku belum selesai.",
        en: "Sarah: Don't come yet. I'm not finished.",
        ja: "サラ：まだイかないで。終わってないの。",
        ko: "사라: 아직 싸지 마. 난 안 끝났어.",
      }),
      tx({
        id: "Sarah kembali mengulum dengan tempo lebih stabil, sesekali mendongak menatap Arka.",
        en: "Sarah resumes at a steadier pace, glancing up at Arka from time to time.",
        ja: "サラは一定のリズムで再び口を動かし、ときどきアルカを見上げた。",
        ko: "사라는 한결 일정한 속도로 다시 입을 움직이며 이따금 아르카를 올려다봤다.",
      }),
    ],
    false,
    audio03,
  ),
  cutScene(
    good04,
    true,
    [
      tx({
        id: "Sarah berganti posisi dan naik ke atas Arka.",
        en: "Sarah changes positions and climbs on top of Arka.",
        ja: "サラは体勢を変え、アルカの上にまたがった。",
        ko: "사라는 자세를 바꾸고 아르카 위에 올라탔다.",
      }),
      tx({
        id: "Sarah: Siap?",
        en: "Sarah: Ready?",
        ja: "サラ：準備はいい？",
        ko: "사라: 준비됐어?",
      }),
      tx({
        id: "Sarah: Aku… masukin, ya.",
        en: "Sarah: I'm... putting it in now.",
        ja: "サラ：じゃあ……入れるわね。",
        ko: "사라: 나… 넣을게.",
      }),
    ],
    false,
    audio04,
  ),
  cutScene(
    good05,
    true,
    [
      tx({
        id: "Sarah: Ahh… ini dia!",
        en: "Sarah: Ahh... there it is!",
        ja: "サラ：あぁ……入った！",
        ko: "사라: 아아… 들어갔어!",
      }),
      tx({
        id: "Sarah: Ini nikmat sekali.",
        en: "Sarah: This feels so good.",
        ja: "サラ：すごく気持ちいい。",
        ko: "사라: 너무 좋아.",
      }),
      tx({
        id: "Sarah: Penismu… memenuhi aku.",
        en: "Sarah: Your penis... fills me up.",
        ja: "サラ：あなたのペニスで……いっぱい。",
        ko: "사라: 네 페니스가… 날 가득 채워.",
      }),
    ],
    false,
    audio05,
  ),
  cutScene(
    good06,
    true,
    [
      tx({
        id: "Sarah mempercepat gerakannya. Suara basah terdengar setiap kali tubuhnya turun.",
        en: "Sarah speeds up. A wet sound follows every downward movement.",
        ja: "サラは動きを速めた。体を下ろすたびに湿った音が響いた。",
        ko: "사라는 속도를 높였다. 몸을 내릴 때마다 젖은 소리가 났다.",
      }),
      tx({
        id: "Sarah: Ahh… ahh… lebih dalam…",
        en: "Sarah: Ahh... ahh... deeper...",
        ja: "サラ：あぁ……あぁ……もっと奥まで……",
        ko: "사라: 아아… 아아… 더 깊이…",
      }),
      tx({
        id: "Sarah: Ya… ahh… seperti itu…",
        en: "Sarah: Yes... ahh... like that...",
        ja: "サラ：そう……あぁ……そのまま……",
        ko: "사라: 그래… 아아… 그렇게…",
      }),
      tx({
        id: "Arka: Sarah, kamu basah sekali.",
        en: "Arka: Sarah, you're so wet.",
        ja: "アルカ：サラ、すごく濡れてる。",
        ko: "아르카: 사라, 엄청 젖었어.",
      }),
      tx({
        id: "Sarah: Karena kamu… nngghh…",
        en: "Sarah: Because of you... nngghh...",
        ja: "サラ：あなたのせいよ……んっ……",
        ko: "사라: 네가 그렇게 만들었잖아… 으읏…",
      }),
    ],
    false,
    audio06,
  ),
  blackScreen(),
  say(
    "sara",
    "neutral",
    tx({
      id: "Sarah: Sekarang lakukan sesukamu.",
      en: "Sarah: Now do what you want.",
      ja: "サラ：今度は、あなたの好きにして。",
      ko: "사라: 이제 네가 하고 싶은 대로 해.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Sarah: Acak-acak aku, Arka.",
      en: "Sarah: Have your way with me, Arka.",
      ja: "サラ：私をめちゃくちゃにして、アルカ。",
      ko: "사라: 나를 엉망으로 만들어 줘, 아르카.",
    }),
  ),
  clearBlackScreen(),
  cutScene(
    good07,
    true,
    [
      tx({
        id: "Setelah berganti posisi, Arka kembali masuk ke dalam vagina Sarah dengan gerakan stabil.",
        en: "After they change positions, Arka enters Sarah again and moves at a steady pace.",
        ja: "体勢を変え、アルカは再びサラの膣に入り、一定のリズムで動いた。",
        ko: "자세를 바꾼 뒤 아르카는 다시 사라의 질 안으로 들어가 일정한 속도로 움직였다.",
      }),
      tx({
        id: "Sarah: Ahh…! Dari bawah terasa beda…",
        en: "Sarah: Ahh...! It feels different from underneath...",
        ja: "サラ：あぁ……！ 下からだと感じ方が違う……",
        ko: "사라: 아아…! 아래에 있으니 느낌이 달라…",
      }),
      tx({
        id: "Sarah: Lebih dalam… terus…",
        en: "Sarah: Deeper... keep going...",
        ja: "サラ：もっと奥まで……続けて……",
        ko: "사라: 더 깊이… 계속…",
      }),
      tx({
        id: "Arka: Kamu yakin?",
        en: "Arka: Are you sure?",
        ja: "アルカ：本当にいいの？",
        ko: "아르카: 정말 괜찮아?",
      }),
      tx({
        id: "Sarah: Ahh…! Aku yang minta ini.",
        en: "Sarah: Ahh...! I asked for this.",
        ja: "サラ：あぁ……！ 私が頼んだんでしょ。",
        ko: "사라: 아아…! 내가 부탁했잖아.",
      }),
    ],
    false,
    audio07,
  ),
  cutScene(
    good08,
    true,
    [
      tx({
        id: "Gerakan Arka menjadi lebih cepat dan dalam.",
        en: "Arka moves faster and deeper.",
        ja: "アルカの動きが速く、深くなった。",
        ko: "아르카의 움직임이 더 빠르고 깊어졌다.",
      }),
      tx({
        id: "Sarah: Ahh… ah… ya, di sana…!",
        en: "Sarah: Ahh... ah... yes, right there...!",
        ja: "サラ：あぁ……あっ……そう、そこ……！",
        ko: "사라: 아아… 아… 그래, 거기…!",
      }),
      tx({
        id: "Sarah: Ah… ah… jangan berhenti… aku hampir…",
        en: "Sarah: Ah... ah... don't stop... I'm close...",
        ja: "サラ：あっ……あっ……止めないで……もう少し……",
        ko: "사라: 아… 아… 멈추지 마… 나 곧…",
      }),
      tx({
        id: "Sarah: Penismu… terlalu nikmat… ah… nngghh…!",
        en: "Sarah: Your penis... feels too good... ah... nngghh...!",
        ja: "サラ：あなたのペニス……気持ちよすぎる……あっ……んっ……！",
        ko: "사라: 네 페니스… 너무 기분 좋아… 아… 으읏…!",
      }),
      tx({
        id: "Arka: Aku juga hampir…",
        en: "Arka: I'm close too...",
        ja: "アルカ：僕も、もうすぐ……",
        ko: "아르카: 나도 곧…",
      }),
      tx({
        id: "Sarah: Bareng… keluar bareng… di dalamku…",
        en: "Sarah: Together... come with me... inside me...",
        ja: "サラ：一緒に……私の中で……一緒にイって……",
        ko: "사라: 같이… 내 안에서… 같이 가자…",
      }),
    ],
    false,
    audio08,
  ),
  cutScene(
    good09,
    true,
    [
      tx({
        id: "Keduanya mencapai puncak hampir bersamaan.",
        en: "They climax almost at the same time.",
        ja: "二人はほとんど同時に絶頂を迎えた。",
        ko: "두 사람은 거의 동시에 절정에 이르렀다.",
      }),
      tx({
        id: "Sarah: Nngghh… Arka…!",
        en: "Sarah: Nngghh... Arka...!",
        ja: "サラ：んっ……アルカ……！",
        ko: "사라: 으읏… 아르카…!",
      }),
      tx({
        id: "Sarah: Ahhh…!",
        en: "Sarah: Ahhh...!",
        ja: "サラ：あぁぁ……！",
        ko: "사라: 아아아…!",
      }),
      tx({
        id: "Arka: Sarah…!",
        en: "Arka: Sarah...!",
        ja: "アルカ：サラ……！",
        ko: "아르카: 사라…!",
      }),
      tx({
        id: "Sarah menarik Arka turun dan memeluknya erat. Tubuhnya masih gemetar.",
        en: "Sarah pulls Arka down and holds him close. She's still trembling.",
        ja: "サラはアルカを引き寄せ、強く抱きしめた。体はまだ震えていた。",
        ko: "사라는 아르카를 끌어당겨 꼭 안았다. 몸은 아직 떨리고 있었다.",
      }),
    ],
    false,
    audio09,
  ),
  bg(midnightHallway),
  say("sara", "blush", tx({
    id: "Suamiku tidak akan pulang sampai tiga hari lagi…",
    en: "My husband won't be home for another three days...",
    ja: "夫はあと三日、帰ってこないわ……",
    ko: "남편은 사흘 뒤에야 돌아와…",
  })),
  say("sara", "blush", tx({
    id: "Jadi malam ini… jangan pergi.",
    en: "So tonight... don't leave.",
    ja: "だから今夜は……帰らないで。",
    ko: " 그러니까 오늘 밤은… 가지 마.",
  })),
  say("arka", "calm", tx({
    id: "Aku di sini.",
    en: "I'm here.",
    ja: "ここにいるよ。",
    ko: "나 여기 있을게.",
  })),
  narrate(tx({
    id: "Sarah tersenyum kecil.",
    en: "Sarah smiles a little.",
    ja: "サラは小さく微笑んだ.",
    ko: "사라가 옅게 웃었다.",
  })),
  say("sara", "blush", tx({
    id: "Sarah: Bagus. Karena aku sudah muak tidur sendirian di ranjang sebesar ini.",
    en: "Sarah: Good. Because I'm sick of sleeping alone in a bed this big.",
    ja: "サラ：よかった。こんなに大きなベッドで一人で寝るのは、もううんざりなの.",
    ko: "사라: 잘됐네. 이렇게 큰 침대에서 혼자 자는 건 이제 지긋지긋하거든.",
  })),
  scene("#000000", "", 1000),
  centeredText(
    tx({
      id: "GOOD ENDING - SARAH",
      en: "GOOD ENDING - SARAH",
      ja: "GOOD ENDING - サラ",
      ko: "GOOD ENDING - 사라",
    }),
    { size: "hero" },
  ),
  centeredText(
    tx({
      id: "Ia memilih mengambil risiko. Dan untuk pertama kalinya, ia tidak merasa hampa.",
      en: "She chose the risk. And for the first time, she didn't feel empty.",
      ja: "彼女は危険を承知で選んだ。そして初めて、心は空っぽではなかった.",
      ko: "그녀는 위험을 감수하기로 했다. 그리고 처음으로 공허하지 않았다.",
    }),
    { size: "sub" },
  ),
  jumpIf("galleryMode", "gallery-return", { value: true }),
  setFlag("gallerySceneSarah2Unlocked", true),
  setFlag("saraGoodEndingCompleted", true),
];
