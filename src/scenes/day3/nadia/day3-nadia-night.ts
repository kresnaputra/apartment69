import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  centeredText,
  cutScene,
  hide,
  jump,
  menu,
  narrate,
  say,
  setFlag,
  show,
} from "@/scenes/scriptTypes";
import bedroomNightUrl from "@/background/bedroom-night.png";
import nadiaHallwayUrl from "@/background/nadia-hallway.png";
import nadiaRoomUrl from "@/background/nadia-room.png";
import cutSceneNadia1 from "@/cut-scene/nadia-day-3-1.webm";
import cutSceneNadia2 from "@/cut-scene/nadia-day-3-2.webm";
import cutSceneNadia3 from "@/cut-scene/nadia-day-3-3.webm";

export const day3NadiaNightScene: VisualNovelCommand[] = [
  bg(
    bedroomNightUrl,
    tx({
      id: "Apartment 69 - Unit 302, Malam",
      en: "Apartment 69 - Unit 302, Night",
      ja: "Apartment 69 - 302号室、夜",
      ko: "Apartment 69 - 302호, 밤",
    }),
  ),
  show("arka-day3-nadia", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  narrate(
    tx({
      id: "Malam hari. Arka sedang berbaring di kasur unit 302 sambil melihat ponsel ketika notifikasi chat masuk.",
      en: "Night. Arka is lying on his bed in Unit 302, looking at his phone when a chat notification comes in.",
      ja: "夜。アルカは302号室のベッドに横たわり、スマホを見ているとチャットの通知が届いた。",
      ko: "밤. 아르카는 302호 침대에 누워 휴대폰을 보고 있을 때 채팅 알림이 왔다.",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Arka. Kamu masih bangun?",
      en: "Arka. You still awake?",
      ja: "アルカ。まだ起きてる？",
      ko: "아르카. 아직 안 잤어?",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Iya. Kenapa?",
      en: "Yeah. Why?",
      ja: "うん。どうした？",
      ko: "응. 왜?",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Aku butuh bantuan. Bukan laptop kali ini. Bisa turun sebentar? Cuma 10 menit.",
      en: "I need help. Not the laptop this time. Can you come down for a bit? Just 10 minutes.",
      ja: "助けが必要。今回はノートパソコンじゃない。ちょっと下りてこれる？ 10分だけ。",
      ko: "도움이 필요해. 이번엔 노트북 아냐. 잠깐 내려올 수 있어? 10분만.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Jam segini?",
      en: "At this hour?",
      ja: "こんな時間に？",
      ko: "이 시간에?",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Please. Aku lagi stuck. Kalau kamu nggak mau, aku ngerti. Tapi aku lagi butuh orang yang bisa dipercaya.",
      en: "Please. I'm stuck right now. If you don't want to, I understand. But I need someone I can trust right now.",
      ja: "お願い。行き詰まってるの。嫌ならわかる。でも今、信頼できる人が必要なの。",
      ko: "제발. 나 막혀 있어. 싫으면 이해해. 하지만 지금 믿을 수 있는 사람이 필요해.",
    }),
  ),
  narrate(
    tx({
      id: "Arka menghela napas, lalu berdiri dan mengambil jaket.",
      en: "Arka sighs, then stands up and grabs his jacket.",
      ja: "アルカはため息をついて、立ち上がりジャケットを手に取る。",
      ko: "아르카는 한숨을 내쉬고 일어서 자켓을 집어 든다.",
    }),
  ),
  bg(
    nadiaHallwayUrl,
    tx({
      id: "Apartment 69 - Depan Unit 102, Malam",
      en: "Apartment 69 - Outside Unit 102, Night",
      ja: "Apartment 69 - 102号室の前、夜",
      ko: "Apartment 69 - 102호 앞, 밤",
    }),
  ),
  narrate(
    tx({
      id: "Beberapa menit kemudian Arka mengetuk pintu unit 102. Pintu terbuka sedikit. Nadia muncul dengan kaos oversized yang longgar sampai paha dan rambut yang masih basah.",
      en: "A few minutes later, Arka knocks on Unit 102's door. The door opens slightly. Nadia appears wearing an oversized shirt that hangs down to her thighs and hair that's still damp.",
      ja: "数分後、アルカは102号室のドアをノックする。ドアが少し開く。ナディアは太ももまでゆるくかかる大きめのシャツに、まだ湿った髪の姿で現れた。",
      ko: "몇 분 후, 아르카는 102호 문을 노크한다. 문이 살짝 열린다. 나디아는 허벅지까지 느슨하게 내려오는 오버사이즈 셔츠와 아직 젖은 머리를 한 채 나타난다.",
    }),
  ),
  show("nadia-day3-night", "nadia", "neutral", {
    position: "center",
    enterFrom: "right",
  }),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Masuk. Cepetan.",
      en: "Come in. Hurry.",
      ja: "入って。早く。",
      ko: "들어와. 빨리.",
    }),
  ),
  bg(
    nadiaRoomUrl,
    tx({
      id: "Apartment 69 - Unit 102, Malam",
      en: "Apartment 69 - Unit 102, Night",
      ja: "Apartment 69 - 102号室、夜",
      ko: "Apartment 69 - 102호, 밤",
    }),
  ),
  narrate(
    tx({
      id: "Arka masuk. Ruangan agak gelap, hanya ada satu ring light yang masih menyala di sudut. Kamera sudah terpasang menghadap sofa.",
      en: "Arka steps inside. The room is rather dark, with only one ring light still on in the corner. A camera is already set up facing the sofa.",
      ja: "アルカは中に入る。部屋はかなり暗く、隅にはリングライトが一つだけまだ点いている。カメラはすでにソファに向けて設置されている。",
      ko: "아르카가 안으로 들어간다. 방은 꽤 어두운 편이고, 구석에는 링 라이트 하나만 아직 켜져 있다. 카메라는 이미 소파를 향해 설치되어 있다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Ini lagi apa?",
      en: "What's this for?",
      ja: "これは何用？",
      ko: "이건 뭐하는 거야?",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Aku lagi coba ambil foto konten. Tapi sudutnya jelek banget. Aku butuh orang yang bisa pegang kamera dari sudut lain. Cuma foto, bukan video. Dan nggak usah muncul di frame.",
      en: "I'm trying to take some content photos. But the angle looks terrible. I need someone to hold the camera from a different angle. Just photos, not video. And you don't have to appear in the frame.",
      ja: "コンテンツ用の写真を撮ろうとしてるの。でも角度がひどいの。別の角度からカメラを持ってくれる人が必要。写真だけで、動画じゃない。フレームに映る必要もない。",
      ko: "콘텐츠 사진 찍으려고 해. 근데 각도가 너무 구려. 다른 각도에서 카메라를 들어줄 사람이 필요해. 사진뿐이야, 영상 아냐. 프레임에 안 나와도 돼.",
    }),
  ),
  narrate(
    tx({
      id: "Arka diam sebentar.",
      en: "Arka is silent for a moment.",
      ja: "アルカはしばらく黙る。",
      ko: "아르카가 잠시 침묵한다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Ini konten… yang biasa?",
      en: "Is this... the usual content?",
      ja: "これは… いつものコンテンツ？",
      ko: "이거… 평소 콘텐츠야?",
    }),
  ),
  narrate(
    tx({
      id: "Nadia tersenyum miring, tapi matanya serius.",
      en: "Nadia smirks, but her eyes are serious.",
      ja: "ナディアは斜めに笑うが、目は真剣だ。",
      ko: "나디아가 엇갈린 미소를 짓지만, 눈은 진지하다.",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Konten yang bayarannya bagus. Aku lagi butuh uang tambahan bulan ini. Kalau kamu nggak nyaman, bilang aja. Aku nggak maksa.",
      en: "Content that pays well. I need extra money this month. If you're not comfortable, just say so. I won't force you.",
      ja: "報酬のいいコンテンツ。今月は追加でお金が必要なの。気が進まないなら言って。無理はしない。",
      ko: "수익이 좋은 콘텐츠. 이번 달 용돈이 필요해. 불편하면 말해. 강요 안 해.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Aku cuma pegang kamera?",
      en: "I just hold the camera?",
      ja: "私はカメラを持つだけ？",
      ko: "나는 카메라만 들으면 돼?",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Iya. Kamu di belakang kamera. Aku yang di depan. Nggak ada yang aneh-aneh. Cuma aku butuh sudut yang lebih bagus.",
      en: "Yeah. You behind the camera. Me in front. Nothing weird. I just need a better angle.",
      ja: "うん。カメラの後ろにあなた。前に私。変なことは何もない。ただ、もっといい角度が必要なの。",
      ko: "응. 카메라 뒤에 네가 있고, 앞에 내가 있어. 이상한 건 없어. 그냥 더 좋은 각도가 필요해.",
    }),
  ),
  narrate(
    tx({
      id: "Arka mengangguk pelan.",
      en: "Arka nods slightly.",
      ja: "アルカは小さく頷く。",
      ko: "아르카가 살짝 끄덕인다.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Oke. Tunjukin aja posisinya.",
      en: "Okay. Just show me the position.",
      ja: "わかった。位置を教えて。",
      ko: "알았어. 위치만 알려줘.",
    }),
  ),
  cutScene(cutSceneNadia1, true, [
    {
      id: "Nadia langsung bergerak. Ia mengambil remote kamera dan menyerahkannya ke Arka.",
      en: "Nadia moves right away. She grabs the camera remote and hands it to Arka.",
      ja: "ナディアはすぐに動き出す。カメラのリモコンを取り、アルカに渡した。",
      ko: "나디아가 바로 움직인다. 카메라 리모컨을 집어 아르카에게 건넨다.",
    },
    {
      id: "Nadia: Kamu berdiri di situ. Fokus ke wajah dan bahu aku aja. Jangan terlalu zoom ke bawah.",
      en: "Nadia: Stand right there. Just focus on my face and shoulders. Don't zoom too low.",
      ja: "ナディア: そこに立って。顔と肩だけにフォーカスして。下にズームしすぎないで。",
      ko: "나디아: 거기 서 있어. 내 얼굴과 어깨만 초점 맞춰. 너무 아래로 확대하지 마.",
    },
    {
      id: "Arka berdiri di posisi yang ditunjuk. Nadia duduk di sofa, mengatur pose, lalu mulai berpose dengan ekspresi yang jauh lebih berani dibanding saat mereka biasa bicara.",
      en: "Arka stands in the spot she pointed to. Nadia sits on the sofa, adjusts her pose, then starts posing with an expression far bolder than when they usually talk.",
      ja: "アルカは指定された位置に立つ。ナディアはソファに座り、ポーズを整え、いつもの会話時よりずっと大胆な表情でポーズを取り始める。",
      ko: "아르카는 나디아가 가리킨 위치에 선다. 나디아는 소파에 앉아 포즈를 잡고, 평소 대화할 때보다 훨씬 대담한 표정으로 포즈를 시작한다.",
    },
  ]),
  cutScene(cutSceneNadia2, true, [
    {
      id: "Beberapa menit berlalu. Nadia sesekali memberi instruksi singkat.",
      en: "A few minutes pass. Nadia occasionally gives short instructions.",
      ja: "数分が経過する。ナディアは時折短い指示を出す。",
      ko: "몇 분이 지난다. 나디아가 가끔 짧은 지시를 내린다.",
    },
    {
      id: "Nadia: Sedikit ke kiri… oke. Tahan.",
      en: "Nadia: A little to the left... okay. Hold it.",
      ja: "ナディア: 少し左へ… うん、そのまま。",
      ko: "나디아: 조금 왼쪽… 그래. 멈춰.",
    },
    {
      id: "Nadia: Sekarang dari atas sedikit… bagus.",
      en: "Nadia: Now a bit from above... nice.",
      ja: "ナディア: 今度は上から少し… いい感じ。",
      ko: "나디아: 이번엔 위에서 조금… 좋아.",
    },
    {
      id: "Setelah sekitar sepuluh menit, Nadia berdiri dan meregangkan tubuh.",
      en: "After about ten minutes, Nadia stands up and stretches.",
      ja: "約10分後、ナディアは立ち上がって体を伸ばす。",
      ko: "약 10분 후, 나디아가 일어나 몸을 쭉 핀다.",
    },
  ]),
  cutScene(cutSceneNadia3, true, {
    id: "Nadia: Udah. Cukup.",
    en: "Nadia: That's it. Enough.",
    ja: "ナディア: いいよ。十分。",
    ko: "나디아: 됐어. 충분해.",
  }),
  hide("arka-day3-nadia"),
  hide("nadia-day3-night"),
  narrate(
    tx({
      id: "Ia berjalan mendekati Arka dan melihat hasil foto di kamera.",
      en: "She walks over to Arka and looks at the photos on the camera.",
      ja: "彼女はアルカに近づき、カメラの写真を確認する。",
      ko: "그녀가 아르카에게 다가가 카메라의 사진을 본다.",
    }),
  ),
  show("arka-day3-nadia", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  show("nadia-day3-night", "nadia", "neutral", {
    position: "center",
    enterFrom: "right",
  }),
  say(
    "nadia",
    "smile",
    tx({
      id: "Wah… ini jauh lebih bagus dari yang aku ambil sendiri. Kamu punya bakat juga ternyata.",
      en: "Wow... these are way better than the ones I took myself. Turns out you have a talent too.",
      ja: "わあ… 自分で撮ったものよりずっといい。あなたにも才能があるんだね。",
      ko: "와… 내가 찍은 것보다 훨씬 낫네. 너도 재능이 있구나.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Cuma ikutin instruksi.",
      en: "Just following instructions.",
      ja: "指示通りにしただけ。",
      ko: "그냥 지시대로 했어.",
    }),
  ),
  narrate(
    tx({
      id: "Nadia menatap Arka lebih lama dari biasanya.",
      en: "Nadia looks at Arka longer than usual.",
      ja: "ナディアはいつもより長くアルカを見つめる。",
      ko: "나디아가 평소보다 오래 아르카를 바라본다.",
    }),
  ),
  say(
    "nadia",
    "blush",
    tx({
      id: "Kamu nggak nanya kenapa aku butuh foto seperti ini?",
      en: "Aren't you going to ask why I need photos like this?",
      ja: "どうしてこんな写真が必要なのか、聞かないの？",
      ko: "왜 이런 사진이 필요한지 안 물어봐?",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Kamu bilang bukan urusanku kemarin. Aku tetap anggap begitu.",
      en: "You said it wasn't my business yesterday. I'm still treating it that way.",
      ja: "昨日、俺には関係ないって言っただろ。今もそう思ってる。",
      ko: "어제 내 일이 아니라고 했잖아. 나도 여전히 그렇게 생각해.",
    }),
  ),
  narrate(
    tx({
      id: "Nadia tertawa kecil, lalu menepuk bahu Arka pelan.",
      en: "Nadia laughs softly, then gently pats Arka's shoulder.",
      ja: "ナディアは小さく笑い、アルカの肩を軽く叩く。",
      ko: "나디아가 작게 웃은 뒤 아르카의 어깨를 가볍게 두드린다.",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Kamu semakin menarik, tetangga. Kebanyakan orang langsung banyak tanya atau langsung ngeliat aneh.",
      en: "You're getting more interesting, neighbor. Most people would ask a lot of questions or look at me weird right away.",
      ja: "あなたはどんどん面白くなるね、隣人。大多数はすぐに質問攻めにするか、変な目で見るのに。",
      ko: "점점 더 흥미로워지네, 이웃. 대부분 바로 많이 물어보거나 이상한 눈으로 보는데.",
    }),
  ),
  narrate(
    tx({
      id: "Ia mengambil ponselnya dan mengetik sesuatu.",
      en: "She picks up her phone and types something.",
      ja: "彼女はスマホを取り、何かを入力する。",
      ko: "그녀가 휴대폰을 집어 뭔가를 타이핑한다.",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Aku transfer bayaran buat malam ini. Jangan ditolak. Ini kerjaan.",
      en: "I'm transferring your payment for tonight. Don't refuse. This is work.",
      ja: "今夜の報酬を振り込む。断らないで。これは仕事だから。",
      ko: "오늘 밤 보답 송금할 거야. 거절하지 마. 이건 일이니까.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Nggak usah—",
      en: "You don't have to—",
      ja: "いらない—",
      ko: "괜찮—",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Harus. Aku nggak suka utang budi.",
      en: "You have to. I don't like owing favors.",
      ja: "必要。恩義を感じるのは嫌いなの。",
      ko: "해야 해. 나는 빚 지는 거 싫어.",
    }),
  ),
  narrate(
    tx({
      id: "Arka mengangguk akhirnya.",
      en: "Arka finally nods.",
      ja: "アルカはようやく頷く。",
      ko: "아르카가 마침내 고개를 끄덕인다.",
    }),
  ),
  narrate(
    tx({
      id: "Nadia mengantarnya sampai pintu.",
      en: "Nadia walks him to the door.",
      ja: "ナディアは彼をドアまで見送る。",
      ko: "나디아가 그를 문까지 배웅한다.",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Arka.",
      en: "Arka.",
      ja: "アルカ。",
      ko: "아르카.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Ya?",
      en: "Yeah?",
      ja: "なに？",
      ko: "응?",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Besok aku masih butuh bantuan. Kamu bisa datang lagi?",
      en: "I still need help tomorrow. Can you come again?",
      ja: "明日も手伝ってほしいの。また来れる？",
      ko: "내일도 도움이 필요해. 또 올 수 있어?",
    }),
  ),
  menu(
    tx({
      id: "Pilihanmu?",
      en: "Your choice?",
      ja: "どうする？",
      ko: "어떻게 할까?",
    }),
    [
      {
        id: "help-tomorrow",
        label: tx({
          id: "Bantu dia lagi besok",
          en: "Help her again tomorrow",
          ja: "明日また手伝う",
          ko: "내일 또 도와준다",
        }),
        next: "day3-nadia-night-help",
      },
      {
        id: "refuse-busy",
        label: tx({
          id: "Tolak / bilang sibuk",
          en: "Refuse / say you're busy",
          ja: "断る / 忙しいと言う",
          ko: "거절 / 바쁘다고 한다",
        }),
        next: "day3-nadia-night-refuse",
      },
    ],
  ),
];

export const day3NadiaNightHelpScene: VisualNovelCommand[] = [
  say(
    "arka",
    "neutral",
    tx({
      id: "Bisa. Jam berapa?",
      en: "Sure. What time?",
      ja: "いいよ。何時？",
      ko: "좋아. 몇 시?",
    }),
  ),
  narrate(
    tx({
      id: "Nadia tersenyum lebar, matanya berbinar.",
      en: "Nadia smiles widely, her eyes gleaming.",
      ja: "ナディアは大きく微笑み、目が輝く。",
      ko: "나디아가 환하게 웃으며 눈이 빛난다.",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Bagus. Nanti aku kabari lagi. Jangan berubah pikiran ya.",
      en: "Great. I'll let you know later. Don't change your mind, okay?",
      ja: "いいね。後でまた連絡する。気が変わらないでね。",
      ko: "좋아. 나중에 다시 연락할게. 마음 바꾸지 마.",
    }),
  ),
  narrate(
    tx({
      id: "Ia menutup pintu pelan setelah Arka keluar.",
      en: "She gently closes the door after Arka leaves.",
      ja: "アルカが出た後、彼女はそっとドアを閉める。",
      ko: "아르카가 나간 후 그녀가 문을 살짝 닫는다.",
    }),
  ),
  setFlag("nadia_help_day4", true),
  jump("day3-nadia-night-ending"),
];

export const day3NadiaNightRefuseScene: VisualNovelCommand[] = [
  say(
    "arka",
    "neutral",
    tx({
      id: "Besok agak susah. Ada urusan lain.",
      en: "Tomorrow's a bit difficult. I have other things to do.",
      ja: "明日はちょっと厳しい。用事があるんだ。",
      ko: "내일은 좀 힘들어. 다른 일이 있어.",
    }),
  ),
  narrate(
    tx({
      id: "Nadia diam sebentar, lalu mengangguk pelan.",
      en: "Nadia is quiet for a moment, then nods slowly.",
      ja: "ナディアは少し黙り、それからゆっくり頷く。",
      ko: "나디아가 잠시 침묵한 뒤 천천히 고개를 끄덕인다.",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Oke. Nggak apa-apa. Kalau berubah pikiran, bilang aja.",
      en: "Okay. No problem. If you change your mind, just tell me.",
      ja: "わかった。大丈夫。気が変わったら、言ってね。",
      ko: "알았어. 괜찮아. 마음 바뀌면 말해.",
    }),
  ),
  narrate(
    tx({
      id: "Ia menutup pintu setelah Arka keluar.",
      en: "She closes the door after Arka leaves.",
      ja: "アルカが出た後、彼女はドアを閉める。",
      ko: "아르카가 나간 후 그녀가 문을 닫는다.",
    }),
  ),
  setFlag("nadia_help_day4", false),
  jump("day3-nadia-night-ending"),
];

export const day3NadiaNightEndingScene: VisualNovelCommand[] = [
  hide("nadia-day3-night", "fadeAway"),
  bg(
    nadiaHallwayUrl,
    tx({
      id: "Apartment 69 - Koridor Unit 102, Malam",
      en: "Apartment 69 - Unit 102 Hallway, Night",
      ja: "Apartment 69 - 102号室前の廊下、夜",
      ko: "Apartment 69 - 102호 앞 복도, 밤",
    }),
  ),
  narrate(
    tx({
      id: "Di koridor, Arka menghela napas panjang.",
      en: "In the hallway, Arka lets out a long breath.",
      ja: "廊下で、アルカは長い息を吐く。",
      ko: "복도에서 아르카는 긴 한숨을 내쉰다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Gadis ini terlalu berani. Dan terlalu jujur. Aku belum tahu mau dibawa ke mana.",
      en: "This girl is too bold. And too honest. I don't know where this is going yet.",
      ja: "この子は大胆すぎる。そして正直すぎる。まだどこに向かうのかわからない。",
      ko: "이 여자는 너무 대담해. 그리고 너무 솔직해. 아직 어디로 갈지 모르겠어.",
    }),
  ),
  centeredText(
    tx({
      id: "SYSTEM: NADIA AFFECTION +1",
      en: "SYSTEM: NADIA AFFECTION +1",
      ja: "SYSTEM: ナディアの好感度 +1",
      ko: "SYSTEM: 나디아 호감도 +1",
    }),
    { size: "sub" },
  ),
  centeredText(
    tx({
      id: "DAY 3 - NADIA ROUTE COMPLETE",
      en: "DAY 3 - NADIA ROUTE COMPLETE",
      ja: "DAY 3 - ナディアルート完了",
      ko: "DAY 3 - 나디아 루트 완료",
    }),
    { size: "hero" },
  ),
  setFlag("day3NadiaCompleted", true),
  jump("day3-complete"),
];
