import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  centeredText,
  cutScene,
  hide,
  jump,
  narrate,
  say,
  scene,
  setFlag,
  show,
} from "@/scenes/scriptTypes";
import bedroomAfternoonUrl from "@/background/bedroom-afteroon.png";
import nadiaRoomUrl from "@/background/nadia-room.png";
import nadiaHallwayUrl from "@/background/nadia-hallway.png";
import cutSceneNadia1 from "@/cut-scene/nadia-day-2-1.webm";
import cutSceneNadia2 from "@/cut-scene/nadia-day-2-2.webm";
import cutSceneNadia3 from "@/cut-scene/nadia-day-2-3.webm";
import nadiaCutSceneVoiceDay2_1 from "@/voice/nadia/nadia-cut-scene-voice-day-2-1.mp3";
import nadiaCutSceneVoiceDay2_2 from "@/voice/nadia/nadia-cut-scene-voice-day-2-2.mp3";
import nadiaCutSceneVoiceDay2_3 from "@/voice/nadia/nadia-cut-scene-voice-day-2-3.mp3";
import { addNadiaVoices } from "@/voice/nadia/day1to4";

export const day2RouteNadiaScene: VisualNovelCommand[] = [
  narrate(
    tx({
      id: "Arka menatap layar ponselnya sejenak. Nadia? Dia baru saja pindah dan sudah minta bantuan lagi.",
      en: "Arka stares at his phone screen for a moment. Nadia? She just moved in and is already asking for help again.",
      ja: "アルカはスマホの画面をしばらく見つめる。ナディア？ 引っ越してきたばかりなのに、また助けを求めてきた。",
      ko: "아르카는 잠시 휴대폰 화면을 응시한다. 나디아? 이사 온 지 얼마 안 됐는데 또 도움을 요청하는군.",
    }),
    "arka",
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Oke. Tapi cuma sebentar.",
      en: "Okay. But just for a moment.",
      ja: "わかった。でも、ちょっとだけだ。",
      ko: "알았어. 잠깐만.",
    }),
  ),
  jump("day2-nadia-room"),
];

export const day2NadiaRoomScene: VisualNovelCommand[] = addNadiaVoices([
  bg(
    bedroomAfternoonUrl,
    tx({
      id: "Apartment 69 - Unit 302",
      en: "Apartment 69 - Unit 302",
      ja: "Apartment 69 - 302号室",
      ko: "Apartment 69 - 302호",
    }),
  ),
  show("arka-day2-nadia", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  narrate(
    tx({
      id: "Siang hari. Arka sedang duduk di unit 302 sambil membuka laptop ketika ponselnya bergetar.",
      en: "Afternoon. Arka is sitting in Unit 302, opening his laptop, when his phone vibrates.",
      ja: "昼下がり。アルカは302号室でノートパソコンを開きながらスマホのバイブレーションに気づく。",
      ko: "오후. 아르카는 302호에서 노트북을 켜며 앉아 있을 때 휴대폰이 진동한다.",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Hei tetangga bawah! Ini Nadia. Kamu sibuk?",
      en: "Hey downstairs neighbor! It's Nadia. You busy?",
      ja: "ねえ、下の隣人！ ナディアだけど。忙しい？",
      ko: "이웃 아빠! 나디아인데. 지금 바빠?",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Sedikit. Kenapa?",
      en: "A little. Why?",
      ja: "ちょっとね。どうした？",
      ko: "좀. 왜?",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Setup-ku lagi error. Kali ini bukan listrik. Laptop aku lag parah pas lagi live. Aku butuh bantuan cepat. Bisa naik sebentar?",
      en: "My setup's acting up. Not the electricity this time. My laptop is lagging badly while I'm live. I need quick help. Can you come up for a bit?",
      ja: "セットアップが調子悪いの。今回は電気じゃなくて、ライブ中にノートパソコンが重くなってる。急いで助けが必要。ちょっと上がってこれる？",
      ko: "내 세팅에 문제 생겼어. 이번엔 전기 문제 아냐. 라이브 중인데 노트북이 심하게 렉 걸려. 빨리 도움이 필요해. 잠깐 올라올 수 있어?",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Sekarang?",
      en: "Right now?",
      ja: "今？",
      ko: "지금 당장?",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Iya sekarang. Aku lagi on-air setengah mati. Please… aku bayar pakai kopi atau minuman apa aja.",
      en: "Yes, right now. I'm half-dead on-air. Please... I'll pay you back with coffee or whatever drink you want.",
      ja: "うん、今。私、半生きたまま配信中なの。お願い… コーヒーか何か飲み物でお返しするから。",
      ko: "응, 지금. 나 반죽은 상태로 방송 중이야. 제발… 커피나 뭐든 마실 걸로 보답할게.",
    }),
  ),
  narrate(
    tx({
      id: "Arka menghela napas, lalu berdiri.",
      en: "Arka sighs, then stands up.",
      ja: "アルカはため息をついて、立ち上がる。",
      ko: "아르카는 한숨을 내쉬고 일어선다.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Oke. Tunggu.",
      en: "Okay. Wait.",
      ja: "わかった。待ってて。",
      ko: "알았어. 기다려.",
    }),
  ),
  bg(
    nadiaHallwayUrl,
    tx({
      id: "Apartment 69 - Depan Unit 102",
      en: "Apartment 69 - Outside Unit 102",
      ja: "Apartment 69 - 102号室の前",
      ko: "Apartment 69 - 102호 앞",
    }),
  ),
  narrate(
    tx({
      id: "Beberapa menit kemudian Arka berdiri di depan unit 102. Pintu terbuka sebelum ia sempat mengetuk. Nadia muncul dengan headset masih di leher, rambut agak berantakan, tank top longgar dan short pendek.",
      en: "A few minutes later, Arka stands in front of Unit 102. The door opens before he can knock. Nadia appears with her headset still around her neck, hair slightly messy, wearing a loose tank top and short shorts.",
      ja: "数分後、アルカは102号室の前に立つ。ノックする前にドアが開く。ナディアはまだ首にヘッドセットをかけ、髪は少し乱れ、大きめのタンクトップに短いショートパンツ姿で現れた。",
      ko: "몇 분 후, 아르카는 102호 앞에 선다. 노크하기도 전에 문이 열린다. 나디아는 아직 목에 헤드셋을 걸고, 머리카락이 조금 지저분하고 루즈한 민소매에 짧은 반바지 차림으로 나타난다.",
    }),
  ),
  show("nadia-day2-room", "nadia", "neutral", {
    position: "center",
    enterFrom: "right",
  }),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Masuk! Cepat!",
      en: "Come in! Hurry!",
      ja: "入って！ 早く！",
      ko: "들어와! 빨리!",
    }),
  ),
  narrate(
    tx({
      id: "Arka masuk. Unit Nadia berantakan tapi hidup. Ada ring light, kamera, laptop, dan beberapa bantal besar di lantai. Di layar laptop chat penonton terus berjalan.",
      en: "Arka steps inside. Nadia's unit is messy but alive. There's a ring light, camera, laptop, and several large pillows on the floor. On the laptop screen, viewer chats keep scrolling.",
      ja: "アルカは中に入る。ナディアの部屋は散らかっているが生きている。リングライト、カメラ、ノートパソコン、そして床には大きなクッションがいくつか置かれている。ノートパソコンの画面では視聴者のチャットが流れ続けている。",
      ko: "아르카가 들어간다. 나디아의 방은 지저분하지만 활기차다. 링 라이트, 카메라, 노트북, 그리고 바닥에는 큰 쿠션이 여러 개 놓여 있다. 노트북 화면에서는 시청자 채팅이 계속 올라간다.",
    }),
  ),
  bg(
    nadiaRoomUrl,
    tx({
      id: "Apartment 69 - Unit 102",
      en: "Apartment 69 - Unit 102",
      ja: "Apartment 69 - 102号室",
      ko: "Apartment 69 - 102호",
    }),
  ),
  say(
    "nadia",
    "angry",
    tx({
      id: "Lihat ini. Lag-nya gila. Aku lagi streaming dan tiba-tiba frame rate-nya drop. Aku nggak bisa stop di tengah.",
      en: "Look at this. The lag is insane. I'm streaming and suddenly the frame rate drops. I can't stop mid-stream.",
      ja: "見てこれ。ラグがひどいの。配信中に突然フレームレートが落ちてきて、途中で止められないの。",
      ko: "이거 봐. 렉이 미쳤어. 방송 중인데 갑자기 프레임이 뚝뚝 떨어져. 중간에 멈출 수도 없어.",
    }),
  ),
  narrate(
    tx({
      id: "Arka duduk di depan laptop dan mulai memeriksa.",
      en: "Arka sits in front of the laptop and starts checking.",
      ja: "アルカはノートパソコンの前に座って確認を始める。",
      ko: "아르카는 노트북 앞에 앉아 확인을 시작한다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "CPU-nya kepanasan. Kamu buka terlalu banyak software sekaligus. Sama… kamu lagi streaming resolusi terlalu tinggi buat spek laptop ini.",
      en: "CPU is overheating. You have too many programs open at once. Also... you're streaming at too high a resolution for this laptop's specs.",
      ja: "CPUが熱くなってる。同時に開きすぎのソフトがある。それに… このノートパソコンのスペックに対して配信解像度が高すぎる。",
      ko: "CPU가 과열되어 있어. 동시에 너무 많은 프로그램을 켰어. 게다가… 이 노트북 사양에는 방송 해상도가 너무 높아.",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Bisa diperbaiki tanpa matiin stream?",
      en: "Can it be fixed without ending the stream?",
      ja: "配信を切らずに直せる？",
      ko: "방송 끄지 않고 고칠 수 있어?",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Bisa. Aku turunin resolusi sementara dan matiin beberapa program yang nggak perlu.",
      en: "Yeah. I'll temporarily lower the resolution and close some unnecessary programs.",
      ja: "できる。一時的に解像度を下げて、不要なプログラムを終了する。",
      ko: "가능해. 일시적으로 해상도를 낮추고 필요 없는 프로그램 몇 개를 끄자.",
    }),
  ),
  narrate(
    tx({
      id: "Arka bekerja cepat. Beberapa menit kemudian layar kembali lancar.",
      en: "Arka works quickly. A few minutes later, the screen is smooth again.",
      ja: "アルカは素早く作業する。数分後、画面は再び滑らかになった。",
      ko: "아르카는 재빨리 작업한다. 몇 분 후 화면이 다시 부드러워진다.",
    }),
  ),
  cutScene(cutSceneNadia1, true, {
    text: {
      id: "Oke guys, tech support darurat sudah datang! Semua beres berkat tetangga gantengku!",
      en: "Okay guys, emergency tech support has arrived! Everything's fixed thanks to my handsome neighbor!",
      ja: "ねえみんな、緊急テックサポートが来てくれた！ イケメン隣人のおかげで全部直った！",
      ko: "여러분, 긴급 기술 지원이 도착했어! 잘생긴 이웃 오빠 덕에 모두 해결됐어!",
    },
    voice: nadiaCutSceneVoiceDay2_1,
  }),
  cutScene(cutSceneNadia2, true, [
    {
      id: "Chat penonton langsung ramai.",
      en: "The viewer chat erupts.",
      ja: "視聴者のチャットが一気に盛り上がる。",
      ko: "시청자 채팅이 순식간에 들끓는다.",
    },
    {
      id: "Nadia menoleh ke Arka sambil tertawa.",
      en: "Nadia turns to Arka, laughing.",
      ja: "ナディアは笑いながらアルカに振り返る。",
      ko: "나디아가 웃으며 아르카를 바라본다.",
    },
    {
      text: {
        id: "Nadia: Mereka lagi nanya nama kamu. Mau aku kasih tahu?",
        en: "Nadia: They're asking for your name. Should I tell them?",
        ja: "ナディア：みんな、あなたの名前聞いてる。教えちゃおうか？",
        ko: "나디아: 얘들이 네 이름 물어봐. 내가 알려줄까?",
      },
      voice: nadiaCutSceneVoiceDay2_2,
    },
    {
      id: "Arka: Jangan.",
      en: "Arka: Don't.",
      ja: "アルカ：やめとけ。",
      ko: "아르카: 하지 마.",
    },
  ]),
  cutScene(cutSceneNadia3, true, {
    text: {
      id: "Nadia: Pelit. Tapi oke.",
      en: "Nadia: Stingy. But okay.",
      ja: "ナディア：ケチ。でもわかった。",
      ko: "나디아: 인색하네. 그래도 알겠어.",
    },
    voice: nadiaCutSceneVoiceDay2_3,
  }),
  hide("arka-day2-nadia"),
  hide("nadia-day2-room"),
  narrate(
    tx({
      id: "Setelah stream selesai, Nadia melepas headset dan duduk di lantai sambil menghela napas lega.",
      en: "After the stream ends, Nadia takes off her headset and sits on the floor with a relieved sigh.",
      ja: "配信が終わると、ナディアはヘッドセットを外し、安堵の息を吐きながら床に座る。",
      ko: "방송이 끝나고 나디아는 헤드셋을 벗고 안도의 한숨을 내쉬며 바닥에 앉는다.",
    }),
  ),
  show("arka-day2-nadia", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  show("nadia-day2-room", "nadia", "neutral", {
    position: "center",
    enterFrom: "right",
  }),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Kamu benar-benar nyolong. Kalau tadi crash total, aku kehilangan viewer banyak.",
      en: "You really saved me. If it had crashed completely, I would've lost a ton of viewers.",
      ja: "あなた本当に助かった。さっき完全にクラッシュしてたら、視聴者を大量に失ってた。",
      ko: "정말 살려줬어. 방금 완전히 튕겼으면 시청자 많이 잃었을 거야.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Kamu sering live sampai sepanas itu?",
      en: "You often stream until it gets that hot?",
      ja: "そんなに熱くなるまでよく配信してるの？",
      ko: "그렇게까지 뜨겁게 방송 자주 해?",
    }),
  ),
  narrate(
    tx({
      id: "Nadia diam sebentar, lalu tersenyum miring.",
      en: "Nadia pauses for a moment, then smirks.",
      ja: "ナディアは少し黙ってから、斜めに笑う。",
      ko: "나디아가 잠시 침묵한 뒤 엇갈린 미소를 짓는다.",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Tergantung kontennya. Kadang santai… kadang… lebih ‘panas’.",
      en: "Depends on the content. Sometimes chill... sometimes... spicier.",
      ja: "コンテンツによるね。時々リラックス… 時々… もっと‘熱い’の。",
      ko: "콘텐츠에 따라 달라. 가끔은 편하게… 가끔은… 더 ‘뜨겁게’.",
    }),
  ),
  narrate(
    tx({
      id: "Ia menatap Arka langsung.",
      en: "She looks straight at Arka.",
      ja: "彼女はまっすぐアルカを見つめる。",
      ko: "그녀는 아르카를 정면으로 응시한다.",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Kamu nggak tanya kenapa aku butuh setup sebanyak ini di unit apartemen?",
      en: "Aren't you going to ask why I need such a big setup in an apartment unit?",
      ja: "どうしてこんなアパートの部屋にこんなセットアップが必要なのか、聞かないの？",
      ko: "왜 아파트 유닛에 이렇게 많은 장비가 필요한지 안 물어봐?",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Bukan urusanku.",
      en: "Not my business.",
      ja: "私には関係ない。",
      ko: "내 사업 아냐.",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Bagus. Aku suka jawaban itu.",
      en: "Good. I like that answer.",
      ja: "いいね。その答え、気に入った。",
      ko: "좋아. 그 대답 마음에 들어.",
    }),
  ),
  narrate(
    tx({
      id: "Nadia berdiri dan mengambil dua botol minuman dari kulkas.",
      en: "Nadia stands up and grabs two bottles of drinks from the fridge.",
      ja: "ナディアは立ち上がり、冷蔵庫から飲み物を二本取ってくる。",
      ko: "나디아가 일어나 냉장고에서 음료 두 병을 꺼낸다.",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Ini bayaran. Satu untukmu. Jangan ditolak.",
      en: "Here's your payment. One for you. Don't refuse.",
      ja: "これが報酬。一つはあなたに。断らないで。",
      ko: "이게 보답이야. 한 병은 네 거. 거절하지 마.",
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
      id: "Nadia duduk lagi, kali ini lebih dekat.",
      en: "Nadia sits down again, this time closer.",
      ja: "ナディアは再び座る。今度はもっと近くに。",
      ko: "나디아가 다시 앉는다. 이번에는 더 가까이.",
    }),
  ),
  say(
    "nadia",
    "blush",
    tx({
      id: "Arka… kamu kelihatan orang yang bisa jaga rahasia. Benar kan?",
      en: "Arka... you seem like someone who can keep a secret. Right?",
      ja: "アルカ… あなた、秘密を守れる人に見える。そうでしょ？",
      ko: "아르카… 넌 비밀 지킬 수 있는 사람처럼 보여. 그치?",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Tergantung rahasianya.",
      en: "Depends on the secret.",
      ja: "秘密によるね。",
      ko: "비밀에 따라 달라.",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Kalau suatu hari aku minta bantuan yang… lebih personal. Bukan cuma laptop. Kamu mau dengar dulu, atau langsung bilang nggak?",
      en: "If one day I ask for help that's... more personal. Not just the laptop. Will you hear me out first, or just say no?",
      ja: "いつか私が… もっと個人的な助けを求めたら。ノートパソコンだけじゃなくて。先に聞いてくれる？ それともすぐ断る？",
      ko: "혹시 언젠가 내가… 더 개인적인 도움을 요청하면. 노트북 말고. 먼저 들어볼 거야, 아니면 바로 거절할 거야?",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Bilang dulu.",
      en: "Say it first.",
      ja: "まず話してみろ。",
      ko: "일단 말해봐.",
    }),
  ),
  narrate(
    tx({
      id: "Nadia tersenyum puas.",
      en: "Nadia smiles, satisfied.",
      ja: "ナディアは満足そうに微笑む。",
      ko: "나디아가 만족스럽게 웃는다.",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Bagus. Nanti aku kabari. Jangan kaget kalau aku chat tiba-tiba malam-malam.",
      en: "Good. I'll text you later. Don't be surprised if I message you out of nowhere at night.",
      ja: "いいね。後で連絡する。深夜に突然メッセージしても驚かないでね。",
      ko: "좋아. 나중에 연락할게. 밤중에 갑자기 카톡 와도 놀라지 마.",
    }),
  ),
  narrate(
    tx({
      id: "Arka berdiri hendak pulang.",
      en: "Arka stands up to leave.",
      ja: "アルカは帰るために立ち上がる。",
      ko: "아르카가 일어나려 한다.",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Oh iya. Kalau kamu dengar bass keras lagi… jangan langsung marah. Kadang aku lagi ‘kerja’.",
      en: "Oh yeah. If you hear loud bass again... don't get mad right away. Sometimes I'm 'working'.",
      ja: "そうだ。また重い低音が聞こえてきたら… すぐ怒らないで。時々私、‘仕事中’なの。",
      ko: "아 맞다. 또 쿵쿵거리는 소리 들리면… 바로 화내지 마. 가끔 ‘일’ 중이거든.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Aku ingat.",
      en: "I remember.",
      ja: "覚えてる。",
      ko: "기억해.",
    }),
  ),
  narrate(
    tx({
      id: "Nadia melambaikan tangan dari pintu.",
      en: "Nadia waves from the door.",
      ja: "ナディアはドアから手を振る。",
      ko: "나디아가 문에서 손을 흔든다.",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Sampai jumpa, tetangga ganteng. Jangan hilang ya.",
      en: "See you later, handsome neighbor. Don't disappear, okay?",
      ja: "またね、イケメン隣人。消えないでよ。",
      ko: "또 보자, 잘생긴 이웃 오빠. 사라지지 마.",
    }),
  ),
  hide("nadia-day2-room", "fadeAway"),
  bg(
    nadiaHallwayUrl,
    tx({
      id: "Apartment 69 - Lorong Unit 102",
      en: "Apartment 69 - Unit 102 Hallway",
      ja: "Apartment 69 - 102号室前の廊下",
      ko: "Apartment 69 - 102호 앞 복도",
    }),
  ),
  narrate(
    tx({
      id: "Arka keluar dari unit 102 dan menatap angka di pintu sebentar.",
      en: "Arka leaves Unit 102 and stares at the number on the door for a moment.",
      ja: "アルカは102号室を出て、ドアの番号をしばらく見つめる。",
      ko: "아르카가 102호를 나와 문에 붙은 번호를 잠시 바라본다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Gadis ini… terlalu langsung.",
      en: "This girl... she's too straightforward.",
      ja: "この子… 真っ直ぐすぎる。",
      ko: "이 여자… 너무 직설적이야.",
    }),
  ),
  narrate(
    tx({
      id: "Ia menggeleng pelan lalu kembali ke unitnya.",
      en: "He shakes his head slightly and returns to his unit.",
      ja: "彼は小さく首を振り、自分の部屋へ戻る。",
      ko: "그는 살짝 고개를 저으며 자기 유닛으로 돌아간다.",
    }),
  ),
  hide("arka-day2-nadia", "fadeAway"),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", "", 1000),
  centeredText(
    tx({
      id: "SYSTEM: NADIA AFFECTION +1",
      en: "SYSTEM: NADIA AFFECTION +1",
      ja: "SYSTEM: ナディアの好感度 +1",
      ko: "SYSTEM: 나디아 호감도 +1",
    }),
    { size: "sub" },
  ),
  setFlag("day2NadiaCompleted", true),
  setFlag("nadiaAffection", 1),
  jump("day2-nadia-free-time"),
], 7);
