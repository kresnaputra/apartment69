import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  blackScreen,
  centeredText,
  clearBlackScreen,
  hide,
  jump,
  narrate,
  say,
  setFlag,
  show,
} from "@/scenes/scriptTypes";
import bedroomNightUrl from "@/background/bedroom-night.png";
import nadiaHallwayUrl from "@/background/nadia-hallway.png";
import nadiaRoomUrl from "@/background/nadia-room.png";

export const day4NadiaNightScene: VisualNovelCommand[] = [
  bg(
    bedroomNightUrl,
    tx({
      id: "Apartment 69 - Unit 302, Malam",
      en: "Apartment 69 - Unit 302, Night",
      ja: "Apartment 69 - 302号室、夜",
      ko: "Apartment 69 - 302호, 밤",
    }),
  ),
  show("arka-day4-nadia", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  narrate(
    tx({
      id: "Malam hari. Arka sedang duduk di unit 302 ketika ponselnya bergetar.",
      en: "Night. Arka is sitting in Unit 302 when his phone vibrates.",
      ja: "夜。アルカは302号室に座っていると、スマホが震えた。",
      ko: "밤. 아르카가 302호에 앉아 있을 때 휴대폰이 진동한다.",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Arka. Kamu sibuk?",
      en: "Arka. You busy?",
      ja: "アルカ。忙しい？",
      ko: "아르카. 지금 바빠?",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Nggak terlalu. Kenapa?",
      en: "Not really. Why?",
      ja: "そんなに。どうした？",
      ko: "딱히. 왜?",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Aku butuh bantuan kamera lagi. Tapi kali ini kontennya lebih… panas. Kamu masih mau dengar?",
      en: "I need camera help again. But this time the content is hotter. Still willing to hear me out?",
      ja: "またカメラの手伝いが必要。でも今回のコンテンツはもっと…熱いの。まだ聞いてくれる？",
      ko: "또 카메라 도움이 필요해. 근데 이번 콘텐츠는 더… 뜨거워. 아직도 들어줄 거야?",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Bilang dulu.",
      en: "Tell me first.",
      ja: "まず話せ。",
      ko: "일단 말해.",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Aku mau live stream berbayar. Solo. Aku butuh orang yang pegang kamera dari sudut yang bagus. Kamu cuma di belakang kamera, nggak muncul. Bayarannya lebih tinggi dari kemarin.",
      en: "I want to do a paid live stream. Solo. I need someone to hold the camera from a good angle. You stay behind the camera, you won't appear. The pay is higher than yesterday.",
      ja: "有料のライブ配信をしたいの。ソロで。いい角度からカメラを持ってくれる人が必要。あなたはカメラの後ろだけ、映らない。報酬は昨日より高い。",
      ko: "유료 라이브 스트림을 할 거야. 솔로. 좋은 각도에서 카메라를 들어줄 사람이 필요해. 너는 카메라 뒤에만 있고, 안 나와. 보수는 어제보다 높아.",
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
    "neutral",
    tx({
      id: "Oke. Aku naik.",
      en: "Okay. I'm coming up.",
      ja: "わかった。上がる。",
      ko: "알았어. 올라갈게.",
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
      id: "Beberapa menit kemudian Arka berdiri di depan unit 102. Pintu langsung dibuka. Nadia sudah memakai tank top longgar dan short pendek. Rambutnya diikat tinggi, ring light sudah menyala.",
      en: "A few minutes later, Arka stands in front of Unit 102. The door opens right away. Nadia is already wearing a loose tank top and short shorts. Her hair is tied up high, and the ring light is already on.",
      ja: "数分後、アルカは102号室の前に立つ。ドアはすぐに開いた。ナディアはすでにゆるいタンクトップと短いショートパンツ姿。髪は高く結ばれ、リングライトはもう点いている。",
      ko: "몇 분 후, 아르카는 102호 앞에 선다. 문이 바로 열린다. 나디아는 이미 루즈한 민소매와 짧은 반바지 차림이다. 머리는 높이 묶여 있고, 링 라이트는 이미 켜져 있다.",
    }),
  ),
  show("nadia-day4-night", "nadia", "smile", {
    position: "center",
    enterFrom: "right",
  }),
  say(
    "nadia",
    "smile",
    tx({
      id: "Masuk. Kita langsung mulai aja biar nggak molor.",
      en: "Come in. Let's start right away so we don't run late.",
      ja: "入って。遅れるといけないから、すぐ始めよう。",
      ko: "들어와. 늦어지지 않게 바로 시작하자.",
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
      id: "Arka masuk. Sofa sudah ditata menghadap kamera. Ada beberapa bantal di lantai.",
      en: "Arka steps inside. The sofa is already set facing the camera. There are a few pillows on the floor.",
      ja: "アルカは中に入る。ソファはすでにカメラに向けて並べられている。床にはクッションがいくつかある。",
      ko: "아르카가 들어간다. 소파는 이미 카메라를 향해 배치되어 있다. 바닥에는 쿠션이 몇 개 있다.",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Kamu berdiri di situ. Jangan terlalu deket, tapi jangan terlalu jauh juga. Fokus ke tubuh aku dari pinggang ke atas dulu, nanti aku kasih tahu kalau mau diganti sudut.",
      en: "Stand right there. Not too close, but not too far either. Focus on my body from the waist up first. I'll tell you if I want the angle changed.",
      ja: "そこに立って。近すぎず、遠すぎず。まずは腰から上の体にフォーカスして。角度を変えたいときは言う。",
      ko: "거기 서 있어. 너무 가깝지도, 너무 멀지도 않게. 일단 허리 위쪽 몸에 초점을 맞춰. 각도를 바꾸고 싶으면 내가 말할게.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Mengerti.",
      en: "Got it.",
      ja: "わかった。",
      ko: "알겠어.",
    }),
  ),
  narrate(
    tx({
      id: "Nadia duduk di sofa, mengambil remote, lalu menatap Arka sebentar.",
      en: "Nadia sits on the sofa, takes the remote, then looks at Arka for a moment.",
      ja: "ナディアはソファに座り、リモコンを取り、それからアルカを少し見つめる。",
      ko: "나디아가 소파에 앉아 리모컨을 집은 뒤, 잠시 아르카를 바라본다.",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Kalau kamu nggak nyaman di tengah jalan, bilang. Aku bisa stop.",
      en: "If you get uncomfortable halfway through, say so. I can stop.",
      ja: "途中で気が進まなくなったら言って。止められるから。",
      ko: "중간에 불편해지면 말해. 멈출 수 있어.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Lanjut aja.",
      en: "Just keep going.",
      ja: "そのままでいい。",
      ko: "그냥 계속해.",
    }),
  ),
  narrate(
    tx({
      id: "Nadia tersenyum lebar, lalu menghidupkan stream.",
      en: "Nadia smiles widely, then starts the stream.",
      ja: "ナディアは大きく微笑み、配信を開始する。",
      ko: "나디아가 환하게 웃은 뒤 방송을 켠다.",
    }),
  ),
  hide("nadia-day4-night"),
  hide("arka-day4-nadia"),
  blackScreen(),

  // BAGIAN ANIMASI 1 – MULAI STREAM
  narrate(
    tx({
      id: "Nadia menghadap kamera dengan suara ceria dan sedikit serak.",
      en: "Nadia faces the camera with a cheerful voice that sounds a little husky.",
      ja: "ナディアは少し掠れた陽気な声でカメラに向かう。",
      ko: "나디아가 약간 쉰 듯 밝은 목소리로 카메라를 마주한다.",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Hai guys… malam ini aku ada bantuan teknis dari tetangga gantengku. Jangan tanya namanya ya, dia pemalu.",
      en: "Hi guys... tonight I've got technical help from my handsome neighbor. Don't ask for his name, okay? He's shy.",
      ja: "みんなこんにちは…今夜はイケメン隣人に技術サポートしてもらってるの。名前は聞かないでね、シャイだから。",
      ko: "하이 가이즈… 오늘 밤은 잘생긴 이웃 오빠가 기술 지원 중이야. 이름은 묻지 마, 수줍음 많거든.",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Kalian ready? Karena aku lagi mood banget malam ini.",
      en: "You guys ready? Because I'm in a really good mood tonight.",
      ja: "準備いい？ 今夜、すごく気分が乗ってるから。",
      ko: "준비됐어? 오늘 밤 나 기분이 진짜 좋아.",
    }),
  ),
  narrate(
    tx({
      id: "Nadia mulai melepas tank top-nya dengan gerakan lambat, hanya tersisa bra hitam.",
      en: "Nadia slowly takes off her tank top, left only in a black bra.",
      ja: "ナディアはゆっくりタンクトップを脱ぎ、黒いブラだけになる。",
      ko: "나디아가 천천히 민소매를 벗어 검은 브라만 남긴다.",
    }),
  ),
  say(
    "nadia",
    "blush",
    tx({
      id: "Ahh… udara malam emang beda ya. Kalian suka aku mulai dari sini?",
      en: "Ahh... night air really does feel different. You like me starting from here?",
      ja: "ああ…夜の空気って違うね。ここから始めるの、好き？",
      ko: "아… 밤공기 진짜 다르네. 여기서부터 시작하는 거 좋아?",
    }),
  ),
  narrate(
    tx({
      id: "Nadia meraba dadanya sendiri di atas bra, lalu melepas bra.",
      en: "Nadia rubs her own chest over her bra, then takes the bra off.",
      ja: "ナディアはブラの上から胸を撫で、それからブラを外す。",
      ko: "나디아가 브라 위로 자신의 가슴을 쓰다듬다가 브라를 벗는다.",
    }),
  ),
  say(
    "nadia",
    "blush",
    tx({
      id: "Mmm… udah mulai panas. Jangan cuma nonton, kasih reaksi dong…",
      en: "Mmm... it's already getting hot. Don't just watch, give me some reactions...",
      ja: "んん…もう熱くなってきた。見てるだけじゃなくて、リアクションしてよ…",
      ko: "음… 벌써 더워지기 시작했어. 보기만 하지 말고 반응 좀 해 줘…",
    }),
  ),

  // BAGIAN ANIMASI 2 – MELEPAS BAJU BAWAH + POSE
  say(
    "nadia",
    "smile",
    tx({
      id: "Oke, short-nya juga ikut ya…",
      en: "Okay, the shorts are coming off too...",
      ja: "じゃあ、ショートパンツも脱いじゃうね…",
      ko: "좋아, 반바지도 같이 벗을게…",
    }),
  ),
  narrate(
    tx({
      id: "Nadia berdiri sebentar, melepas short, lalu duduk lagi hanya memakai celana dalam.",
      en: "Nadia stands for a moment, takes off her shorts, then sits back down wearing only panties.",
      ja: "ナディアは一度立ち上がってショートパンツを脱ぎ、下着だけになって再び座る。",
      ko: "나디아가 잠시 일어나 반바지를 벗은 뒤, 팬티만 입은 채로 다시 앉는다.",
    }),
  ),
  say(
    "nadia",
    "blush",
    tx({
      id: "Lihat… aku udah basah duluan. Malu nggak sih? Tapi aku nggak malu.",
      en: "Look... I'm already wet. Embarrassing, right? But I'm not embarrassed.",
      ja: "見て…もう濡れてる。恥ずかしいでしょ？ でも私は恥ずかしくない。",
      ko: "봐… 벌써 젖었어. 부끄럽지? 근데 나는 안 부끄러워.",
    }),
  ),
  narrate(
    tx({
      id: "Nadia membuka kaki pelan, tangan kanannya masuk ke dalam celana dalam.",
      en: "Nadia slowly opens her legs, her right hand slipping into her panties.",
      ja: "ナディアはゆっくり脚を開き、右手を下着の中に滑り込ませる。",
      ko: "나디아가 천천히 다리를 벌리고, 오른손을 팬티 안으로 넣는다.",
    }),
  ),
  say(
    "nadia",
    "blush",
    tx({
      id: "Ahh… dinginnya jari aku… nnghh…",
      en: "Ahh... my fingers feel cold... nnghh...",
      ja: "ああ…指が冷たい…んっ…",
      ko: "아… 내 손가락이 차갑네… 응…",
    }),
  ),
  narrate(
    tx({
      id: "Nadia melihat ke arah Arka sebentar, lalu kembali ke kamera.",
      en: "Nadia glances toward Arka for a moment, then looks back at the camera.",
      ja: "ナディアは少しアルカのほうを見てから、カメラに視線を戻す。",
      ko: "나디아가 잠시 아르카 쪽을 본 뒤 다시 카메라를 본다.",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Tetangga aku diam aja. Kayaknya lagi konsentrasi banget.",
      en: "My neighbor is staying quiet. Looks like he's really focused.",
      ja: "隣人は黙ったまま。すごく集中してるみたい。",
      ko: "이웃 오빠는 조용하네. 완전 집중하고 있는 것 같아.",
    }),
  ),

  // BAGIAN ANIMASI 3 – GERAKAN LEBIH INTENS
  say(
    "nadia",
    "blush",
    tx({
      id: "Aku mau lebih cepet… boleh kan?",
      en: "I want to go faster... is that okay?",
      ja: "もっと速くしたい…いいよね？",
      ko: "더 빠르게 하고 싶어… 되지?",
    }),
  ),
  narrate(
    tx({
      id: "Nadia melepas celana dalam sepenuhnya. Ia mulai menggerakkan jari di area sensitif dengan tempo sedang, pinggul ikut bergerak naik-turun pelan.",
      en: "Nadia takes her panties off completely. She starts moving her fingers over her sensitive area at a medium pace, her hips slowly rising and falling with the motion.",
      ja: "ナディアは下着を完全に脱ぐ。敏感な場所に中くらいの速さで指を動かし始め、腰もゆっくり上下に動く。",
      ko: "나디아가 팬티를 완전히 벗는다. 민감한 부위에 중간 템포로 손가락을 움직이기 시작하고, 허리도 천천히 오르내린다.",
    }),
  ),
  say(
    "nadia",
    "blush",
    tx({
      id: "Ahh… ahh… enak banget… kalian juga kerasa nggak?",
      en: "Ahh... ahh... it feels so good... can you feel it too?",
      ja: "ああ…ああ…気持ちいい…みんなも感じてる？",
      ko: "아… 아… 너무 좋아… 너희도 느껴져?",
    }),
  ),
  say(
    "nadia",
    "blush",
    tx({
      id: "Ngghh… aku suka kalau ada yang liat aku begini… terutama yang di belakang kamera.",
      en: "Ngghh... I like it when someone watches me like this... especially the one behind the camera.",
      ja: "んっ…こうやって見られるの好き…特にカメラの後ろにいる人に。",
      ko: "응… 이렇게 누가 보는 거 좋아… 특히 카메라 뒤에 있는 사람.",
    }),
  ),
  narrate(
    tx({
      id: "Nadia menatap langsung ke arah Arka beberapa detik sambil terus bergerak.",
      en: "Nadia looks straight at Arka for a few seconds while still moving.",
      ja: "ナディアは動き続けたまま、数秒間まっすぐにアルカを見つめる。",
      ko: "나디아가 계속 움직이면서 몇 초 동안 아르카를 정면으로 바라본다.",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Kamu nggak boleh liat ke bawah ya… fokus ke wajah aku aja. Tapi aku tahu kamu liat.",
      en: "You're not allowed to look down... just focus on my face. But I know you're looking.",
      ja: "下は見ちゃダメだよ…顔だけ見てて。でも見てるの、わかってる。",
      ko: "아래는 보면 안 돼… 내 얼굴만 봐. 근데 네가 보는 거 알아.",
    }),
  ),

  // BAGIAN ANIMASI 4 – MENDEKATI KLIMAKS
  say(
    "nadia",
    "blush",
    tx({
      id: "Aku… aku mau keluar… nngghh…!",
      en: "I... I'm going to cum... nngghh...!",
      ja: "私…イっちゃう…んっ…！",
      ko: "나… 갈 것 같아… 응…!",
    }),
  ),
  narrate(
    tx({
      id: "Gerakan tangan dan pinggul Nadia semakin cepat dan tidak teratur. Tubuhnya menegang.",
      en: "Nadia's hand and hip movements grow faster and more irregular. Her body tenses up.",
      ja: "ナディアの手と腰の動きはどんどん速く、不規則になっていく。体が強張る。",
      ko: "나디아의 손과 허리 움직임이 점점 빠르고 불규칙해진다. 몸이 긴장한다.",
    }),
  ),
  say(
    "nadia",
    "blush",
    tx({
      id: "Ahhh…! Aku keluar…!! Ngghh…!!",
      en: "Ahhh...! I'm cumming...!! Ngghh...!!",
      ja: "あああっ…！イく…！！んっ…！！",
      ko: "아아아…! 간다…!! 응…!!",
    }),
  ),
  narrate(
    tx({
      id: "Nadia mencapai orgasme, tubuhnya gemetar, napasnya tersengal. Ia masih menatap kamera sambil tersenyum puas.",
      en: "Nadia reaches orgasm, her body trembling, her breath ragged. She keeps looking at the camera with a satisfied smile.",
      ja: "ナディアは絶頂に達し、体を震わせ、息を乱す。カメラを見つめたまま、満足そうに微笑んでいる。",
      ko: "나디아가 절정에 이르고 몸이 떨리며 숨이 가빠진다. 그녀는 카메라를 바라본 채 만족스러운 미소를 짓는다.",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Fuuuh… gila. Kalian beruntung banget malam ini.",
      en: "Fuuuh... damn. You guys got really lucky tonight.",
      ja: "ふぅ…やばい。今夜のみんな、本当にラッキーだよ。",
      ko: "후우… 미쳤다. 오늘 밤 너희 진짜 복 받았다.",
    }),
  ),

  clearBlackScreen(),
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
      id: "Nadia mematikan stream. Ia masih duduk di sofa dengan napas yang belum stabil, tubuhnya telanjang.",
      en: "Nadia turns off the stream. She's still sitting on the sofa with uneven breathing, her body bare.",
      ja: "ナディアは配信を切る。息はまだ乱れたままソファに座り、体は裸だ。",
      ko: "나디아가 방송을 끈다. 아직 숨이 고르지 않은 채 소파에 앉아 있고, 몸은 벗은 상태다.",
    }),
  ),
  show("nadia-day4-after", "nadia", "blush", {
    position: "center",
    enterFrom: "fade",
  }),
  show("arka-day4-nadia-after", "arka", "serious", {
    position: "left",
    enterFrom: "fade",
  }),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Selesai.",
      en: "Done.",
      ja: "終わり。",
      ko: "끝.",
    }),
  ),
  narrate(
    tx({
      id: "Ia mengambil handuk kecil dan menutupi tubuhnya seadanya, lalu menatap Arka.",
      en: "She grabs a small towel and covers herself loosely, then looks at Arka.",
      ja: "彼女は小さなタオルを取って体を適当に覆い、それからアルカを見つめる。",
      ko: "그녀는 작은 수건을 집어 몸을 대충 가린 뒤 아르카를 바라본다.",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Kamu tahan banget. Kebanyakan orang udah goyah di tengah.",
      en: "You held out really well. Most people would have cracked halfway through.",
      ja: "すごく我慢できたね。たいていの人は途中で揺らぐのに。",
      ko: "너 진짜 잘 참았네. 대부분 중간에 흔들릴 텐데.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Aku cuma pegang kamera.",
      en: "I was just holding the camera.",
      ja: "カメラを持ってただけだ。",
      ko: "카메라만 들고 있었어.",
    }),
  ),
  narrate(
    tx({
      id: "Nadia tertawa pelan.",
      en: "Nadia laughs softly.",
      ja: "ナディアは小さく笑う。",
      ko: "나디아가 작게 웃는다.",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Iya, iya. Tapi matanya nggak bisa bohong.",
      en: "Yeah, yeah. But the eyes can't lie.",
      ja: "はいはい。でも目は嘘をつけないよ。",
      ko: "그래, 그래. 근데 눈은 거짓말을 못 해.",
    }),
  ),
  narrate(
    tx({
      id: "Nadia berdiri, mendekati Arka, lalu menyerahkan amplop kecil.",
      en: "Nadia stands up, approaches Arka, then hands him a small envelope.",
      ja: "ナディアは立ち上がってアルカに近づき、小さな封筒を渡す。",
      ko: "나디아가 일어나 아르카에게 다가가 작은 봉투를 건넨다.",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Bayaran. Lebih dari kemarin. Jangan ditolak.",
      en: "Payment. More than yesterday. Don't refuse.",
      ja: "報酬。昨日より多い。断らないで。",
      ko: "보수. 어제보다 많아. 거절하지 마.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Terima kasih.",
      en: "Thanks.",
      ja: "ありがとう。",
      ko: "고마워.",
    }),
  ),
  narrate(
    tx({
      id: "Nadia menatapnya dari dekat.",
      en: "Nadia looks at him from up close.",
      ja: "ナディアはすぐ近くから彼を見つめる。",
      ko: "나디아가 가까이에서 그를 바라본다.",
    }),
  ),
  say(
    "nadia",
    "blush",
    tx({
      id: "Arka… lain kali aku mungkin minta bantuan yang lebih dari sekadar pegang kamera. Kamu masih mau dengar dulu?",
      en: "Arka... next time I might ask for help with more than just holding a camera. Will you still hear me out first?",
      ja: "アルカ…次はカメラを持つだけじゃない助けを頼むかもしれない。それでもまず聞いてくれる？",
      ko: "아르카… 다음엔 카메라만 드는 게 아닌 도움을 요청할지도 몰라. 그래도 먼저 들어줄 거야?",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Tergantung.",
      en: "Depends.",
      ja: "内容による。",
      ko: "상황에 따라 달라.",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Bagus. Aku suka jawaban itu.",
      en: "Good. I like that answer.",
      ja: "いいね。その答え、好き。",
      ko: "좋아. 그 대답 마음에 들어.",
    }),
  ),
  narrate(
    tx({
      id: "Ia mengantar Arka sampai pintu.",
      en: "She walks Arka to the door.",
      ja: "彼女はアルカをドアまで見送る。",
      ko: "그녀가 아르카를 문까지 배웅한다.",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Hati-hati di jalan. Jangan kepikiran terus ya.",
      en: "Be careful on the way. Don't keep thinking about it, okay?",
      ja: "気をつけてね。ずっと考えないでよ。",
      ko: "조심히 가. 계속 생각하지 마.",
    }),
  ),
  hide("nadia-day4-after", "fadeAway"),
  hide("arka-day4-nadia-after"),
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
      id: "Arka keluar. Di koridor ia menghela napas panjang.",
      en: "Arka steps out. In the hallway, he lets out a long breath.",
      ja: "アルカは外へ出る。廊下で長い息を吐く。",
      ko: "아르카가 밖으로 나온다. 복도에서 긴 한숨을 내쉰다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Gadis ini terlalu berani. Dan aku mulai susah buat pura-pura nggak peduli.",
      en: "This girl is too bold. And I'm starting to find it hard to pretend I don't care.",
      ja: "この子は大胆すぎる。そして、無関心を装うのがだんだん難しくなってきた。",
      ko: "이 여자는 너무 대담해. 그리고 신경 쓰지 않는 척하기가 점점 어려워지고 있어.",
    }),
  ),
  centeredText(
    tx({
      id: "SYSTEM: NADIA AFFECTION +2",
      en: "SYSTEM: NADIA AFFECTION +2",
      ja: "SYSTEM: ナディアの好感度 +2",
      ko: "SYSTEM: 나디아 호감도 +2",
    }),
    { size: "sub" },
  ),
  centeredText(
    tx({
      id: "DAY 4 - NADIA ROUTE COMPLETE",
      en: "DAY 4 - NADIA ROUTE COMPLETE",
      ja: "DAY 4 - ナディアルート完了",
      ko: "DAY 4 - 나디아 루트 완료",
    }),
    { size: "hero" },
  ),
  setFlag("day4NadiaCompleted", true),
  setFlag("nadiaAffection", 3),
  jump("day4-after-route-phone"),
];
