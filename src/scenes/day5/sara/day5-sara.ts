import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  blackScreen,
  centeredText,
  clearBlackScreen,
  cutScene,
  hide,
  jump,
  jumpIf,
  menu,
  minigame,
  narrate,
  playBgm,
  say,
  setFlag,
  show,
} from "@/scenes/scriptTypes";
import apartmentNightUrl from "@/background/bedroom-night.png";
import lobbyUrl from "@/background/loby-night.png";
import apartmentNightOutsideUrl from "@/background/apartment-night-outside.png";
import hotelRoomUrl from "@/background/bedroom-night.png";
import sarahBedroom from "@/background/sarah-bedroom.png";
import day5Bgm from "@/music/day3-sarah.mp3";
import day5NightBgm from "@/music/cutscene-1-sarah.mp3";
import cutSceneSara1Voice from "@/voice/sara/day5-sarah-01-audio.wav";
import cutSceneSara1 from "@/cut-scene/day5-sarah-01.mp4";
import cutSceneSara2Voice from "@/voice/sara/day5-sarah-02-audio.wav";
import cutSceneSara2 from "@/cut-scene/day5-sarah-02.mp4";
import cutSceneSara3Voice from "@/voice/sara/day5-sarah-03-audio.wav";
import cutSceneSara3 from "@/cut-scene/day5-sarah-03.mp4";
import cutSceneSara4Voice from "@/voice/sara/day5-sarah-04-audio.wav";
import cutSceneSara4 from "@/cut-scene/day5-sarah-04.mp4";
import cutSceneSara5Voice from "@/voice/sara/day5-sarah-05-audio.wav";
import cutSceneSara5 from "@/cut-scene/day5-sarah-05.mp4";
import cutSceneSara6Voice from "@/voice/sara/day5-sarah-06-audio.wav";
import cutSceneSara6 from "@/cut-scene/day5-sarah-06.mp4";


export const day5SaraStartScene: VisualNovelCommand[] = [
  playBgm(day5Bgm),
  bg(
    apartmentNightUrl,
    tx({
      id: "Apartment 69 - Malam",
      en: "Apartment 69 - Night",
      ja: "Apartment 69 - 夜",
      ko: "Apartment 69 - 밤",
    }),
  ),
  show("arka-day5-sara", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  narrate(
    tx({
      id: "Malam hari. Arka baru saja selesai mengerjakan sesuatu di unitnya ketika pesan masuk.",
      en: "Night. Arka has just finished working on something in his unit when a message comes in.",
      ja: "夜。アルカが部屋で作業を終えたちょうどその時、メッセージが届く。",
      ko: "밤. 아르카가 자기 방에서 하던 일을 막 끝냈을 때 메시지가 도착한다.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Aku di lobby bawah. Kalau kamu bisa turun, sekarang.",
      en: "I'm in the lobby downstairs. If you can come down, now.",
      ja: "下のロビーにいるわ。来られるなら、今すぐ。",
      ko: "아래 로비에 있어. 내려올 수 있으면, 지금.",
    }),
  ),
  bg(
    lobbyUrl,
    tx({
      id: "Lobi Utama Apartment 69 - Malam",
      en: "Apartment 69 Main Lobby - Night",
      ja: "Apartment 69 メインロビー - 夜",
      ko: "Apartment 69 메인 로비 - 밤",
    }),
  ),

  narrate(
    tx({
      id: "Arka turun ke lobby utama.",
      en: "Arka goes down to the main lobby.",
      ja: "アルカはメインロビーへ下りる。",
      ko: "아르카는 메인 로비로 내려간다.",
    }),
  ),
  show("sara-day5", "sara", "sad", {
    position: "center",
    enterFrom: "right",
    xOffset: 0,
  }),
  say(
    "sara",
    "sad",
    tx({
      id: "Aku tidak bisa tinggal di Penthouse malam ini.",
      en: "I can't stay at the penthouse tonight.",
      ja: "今夜はペントハウスにいられないの。",
      ko: "오늘 밤은 펜트하우스에 있을 수 없어.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Ada apa?",
      en: "What happened?",
      ja: "何があったんですか？",
      ko: "무슨 일이에요?",
    }),
  ),
  say(
    "sara",
    "sad",
    tx({
      id: "Asisten suamiku mengirim pesan. Katanya ada kemungkinan ia pulang lebih cepat. Aku tidak ingin… berada di sana kalau itu terjadi.",
      en: "My husband's assistant sent a message. He said there's a chance he'll come home early. I don't want to... be there if that happens.",
      ja: "夫の秘書からメッセージが来たの。予定より早く帰ってくるかもしれないって。そうなった時……あそこにいたくない。",
      ko: "남편 비서가 메시지를 보냈어. 남편이 일찍 돌아올 수도 있대. 그렇게 되면… 거기 있고 싶지 않아.",
    }),
  ),
  narrate(
    tx({
      id: "Ia menatap Arka sebentar.",
      en: "She looks at Arka for a moment.",
      ja: "彼女は少しの間アルカを見つめる。",
      ko: "그녀는 잠시 아르카를 바라본다.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Aku menyewa kamar di hotel dekat sini. Bukan yang mewah. Hanya cukup tenang untuk aku tempati saat ini.",
      en: "I booked a room at a hotel nearby. Nothing luxurious. Just quiet enough for me to stay in right now.",
      ja: "近くのホテルに部屋を取ったの。豪華なところじゃない。今の私が落ち着いていられる程度に静かなだけ。",
      ko: "근처 호텔에 방을 잡았어. 화려한 곳은 아니야. 지금 내가 머물기에 충분히 조용한 정도야.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Kamu ingin aku ikut?",
      en: "Do you want me to come with you?",
      ja: "僕に一緒に来てほしいんですか？",
      ko: "제가 같이 가길 원해요?",
    }),
  ),
  say(
    "sara",
    "sad",
    tx({
      id: "Aku hanya… tidak ingin sendirian.",
      en: "I just... don't want to be alone.",
      ja: "ただ……一人になりたくないの。",
      ko: "그냥… 혼자 있고 싶지 않아.",
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
        id: "follow",
        label: tx({
          id: "Ikut Sarah ke hotel",
          en: "Go with Sarah to the hotel",
          ja: "サラとホテルへ行く",
          ko: "사라와 호텔에 간다",
        }),
        next: "day5-sara-follow",
      },
      {
        id: "refuse",
        label: tx({
          id: "Menolak",
          en: "Decline",
          ja: "断る",
          ko: "거절한다",
        }),
        next: "day5-sara-refuse",
      },
    ],
  ),
];

export const day5SaraRefuseScene: VisualNovelCommand[] = [
  say(
    "arka",
    "serious",
    tx({
      id: "Maaf, aku tidak bisa ikut campur terlalu jauh dalam masalah rumah tanggamu.",
      en: "I'm sorry, I can't get too involved in your marriage problems.",
      ja: "すみません、あなたの夫婦の問題にそこまで深く関わることはできません。",
      ko: "미안해요, 당신 부부 문제에 너무 깊이 끼어들 수는 없어요.",
    }),
  ),
  say(
    "sara",
    "sad",
    tx({
      id: "Kau benar. Maaf... membawamu ke masalahku sejauh ini.",
      en: "You're right. I'm sorry... for dragging you this far into my problems.",
      ja: "そのとおりね。ごめんなさい……私の問題にここまで巻き込んで。",
      ko: "네 말이 맞아. 미안해… 내 문제에 여기까지 끌어들여서.",
    }),
  ),
  hide("sara-day5", "fadeAway"),
  hide("arka-day5-sara"),
  setFlag("day5SaraRefused", true),
  setFlag("saraRouteClosed", true),
  centeredText(
    tx({
      id: "RUTE SARAH BERAKHIR",
      en: "SARAH'S ROUTE HAS ENDED",
      ja: "サラルート 終了",
      ko: "사라 루트 종료",
    }),
    { size: "hero" },
  ),
  jump("day4-route-fallback"),
];

export const day5SaraFollowScene: VisualNovelCommand[] = [
  hide("sara-day5"),
  hide("arka-day5-sara"),
  bg(
    hotelRoomUrl,
    tx({
      id: "Kamar Hotel - Malam",
      en: "Hotel Room - Night",
      ja: "ホテルの部屋 - 夜",
      ko: "호텔 방 - 밤",
    }),
  ),
  show("arka-day5-hotel", "arka", "neutral", {
    position: "left",
    enterFrom: "fade",
  }),
  show("sara-day5-hotel", "sara", "neutral", {
    position: "center",
    enterFrom: "fade",
    xOffset: 0,
  }),
  bg(apartmentNightOutsideUrl, {
    en: "Apartment 69 - Night",
    ja: "アパート69 - 夜",
    ko: "아파트 69 - 밤",
  }),
  narrate(
    tx({
      id: "Di dalam kamar hotel, Sarah duduk di tepi ranjang, menatap Arka yang masih berdiri.",
      en: "Inside the hotel room, Sarah sits on the edge of the bed, looking at Arka, who is still standing.",
      ja: "ホテルの部屋で、サラはベッドの端に腰掛け、まだ立ったままのアルカを見つめる。",
      ko: "호텔 방 안, 사라는 침대 가장자리에 앉아 아직 서 있는 아르카를 바라본다.",
    }),
  ),
  bg(sarahBedroom, {
    en: "Sarah's Bedroom - Night",
    ja: "サラの部屋 - 夜",
    ko: "사라의 방 - 밤",
  }),
  say(
    "sara",
    "neutral",
    tx({
      id: "Duduklah...",
      en: "Sit down...",
      ja: "座って……",
      ko: "앉아…",
    }),
  ),
  narrate(
    tx({
      id: "Sarah terdiam beberapa saat sebelum berbicara lagi.",
      en: "Sarah is silent for a while before she speaks again.",
      ja: "サラはしばらく黙り込んでから、また口を開く。",
      ko: "사라는 한동안 말이 없다가 다시 입을 연다.",
    }),
  ),
  say(
    "sara",
    "sad",
    tx({
      id: "Kemarin di mobil… aku sudah terlalu melewati batasku.",
      en: "Yesterday in the car... I went too far past my own limits.",
      ja: "昨日の車の中で……私は自分の一線を越えすぎた。",
      ko: "어제 차 안에서… 나는 내 선을 너무 넘었어.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Kamu menyesal?",
      en: "Do you regret it?",
      ja: "後悔してるんですか？",
      ko: "후회해요?",
    }),
  ),
  say(
    "sara",
    "sad",
    tx({
      id: "Aku seharusnya menyesal.",
      en: "I should regret it.",
      ja: "後悔するべきなのよ。",
      ko: "후회해야 하겠지.",
    }),
  ),
  narrate(
    tx({
      id: "Ia tersenyum tipis, tapi senyum itu tidak sampai ke matanya.",
      en: "She smiles faintly, but the smile doesn't reach her eyes.",
      ja: "彼女は薄く微笑む。けれど、その笑みは目までは届かない。",
      ko: "그녀는 희미하게 미소 짓지만, 그 미소는 눈까지 닿지 않는다.",
    }),
  ),
  say(
    "sara",
    "smile",
    tx({
      id: "Tapi yang kurasakan sekarang bukan penyesalan.",
      en: "But what I feel right now isn't regret.",
      ja: "でも今感じているのは、後悔じゃない。",
      ko: "하지만 지금 내가 느끼는 건 후회가 아니야.",
    }),
  ),
  narrate(
    tx({
      id: "Sarah mengambil ponselnya dan meletakkannya di meja.",
      en: "Sarah takes out her phone and places it on the table.",
      ja: "サラはスマホを取り出し、テーブルの上に置く。",
      ko: "사라는 휴대폰을 꺼내 테이블 위에 내려놓는다.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Suamiku bisa saja mengecek lokasi atau riwayat pesan. Aku biasanya sangat hati-hati.",
      en: "My husband could check my location or my message history. I'm usually very careful.",
      ja: "夫は位置情報やメッセージの履歴を確認するかもしれない。普段はすごく気をつけているの。",
      ko: "남편이 위치나 메시지 기록을 확인할 수도 있어. 평소엔 정말 조심하는 편이야.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Coba aku periksa?",
      en: "Want me to take a look?",
      ja: "僕が確認してみましょうか？",
      ko: "제가 한번 확인해 볼까요?",
    }),
  ),
  minigame("sara-phone-traces", {
    clearNext: "day5-sara-traces-cleared",
    leaveNext: "day5-sara-traces-left",
  }),
];

export const day5SaraTracesClearedScene: VisualNovelCommand[] = [
  setFlag("day5SaraTracesCleared", true),
  jump("day5-sara-offer"),
];

export const day5SaraTracesLeftScene: VisualNovelCommand[] = [
  setFlag("day5SaraTracesCleared", false),
  jump("day5-sara-offer"),
];

export const day5SaraOfferScene: VisualNovelCommand[] = [
  narrate(
    tx({
      id: "Sarah berdiri dan mendekat ke Arka.",
      en: "Sarah stands up and moves closer to Arka.",
      ja: "サラは立ち上がり、アルカに近づく。",
      ko: "사라는 일어나 아르카에게 다가간다.",
    }),
  ),
  say(
    "sara",
    "blush",
    tx({
      id: "Kemarin aku hanya memakai tangan.",
      en: "Yesterday, I only used my hand.",
      ja: "昨日は手だけだった。",
      ko: "어제는 손만 썼지.",
    }),
  ),
  say(
    "sara",
    "blush",
    tx({
      id: "Malam ini… aku tidak ingin berhenti di situ.",
      en: "Tonight... I don't want to stop there.",
      ja: "今夜は……そこで止まりたくない。",
      ko: "오늘 밤은… 거기서 멈추고 싶지 않아.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Kalau kamu menolak, aku akan mengerti. Tapi kalau kamu menerima…",
      en: "If you say no, I'll understand. But if you accept...",
      ja: "断るなら、わかってあげる。でも、受け入れるなら……",
      ko: "거절해도 이해할게. 하지만 받아들인다면…",
    }),
  ),
  blackScreen(),
  say(
    "arka",
    "serious",
    tx({
      id: "Baik, ayo lakukan.",
      en: "All right. Let's do it.",
      ja: "わかりました。しましょう。",
      ko: "좋아요. 해요.",
    }),
  ),
  say(
    "sara",
    "smile",
    tx({
      id: "Jadi kamu memilih menerima.",
      en: "So you choose to accept.",
      ja: "つまり、受け入れるのね。",
      ko: "그러니까 받아들이겠다는 거구나.",
    }),
  ),
  say(
    "sara",
    "smile",
    tx({
      id: "Bagus. Kalau begitu, jangan buat aku kecewa.",
      en: "Good. Then don't disappoint me.",
      ja: "いいわ。それなら、がっかりさせないで。",
      ko: "좋아. 그럼 날 실망시키지 마.",
    }),
  ),
  clearBlackScreen(),
  jump("day5-sara-night"),
];

export const day5SaraNightScene: VisualNovelCommand[] = [
  playBgm(day5NightBgm, { fadeOutMs: 1500 }),
  setFlag("day5SaraIntimate", true),
  cutScene(
    cutSceneSara1,
    true,
    [
      {
        text: {
          id: "Sarah: Sekarang biar aku pakai mulut.",
          en: "Sarah: Now let me use my mouth.",
          ja: "サラ: 今度は口でしてあげる。",
          ko: "사라: 이번엔 입으로 해 줄게.",
        },
      },
      {
        text: {
          id: "Sarah: Mmm…",
          en: "Sarah: Mmm...",
          ja: "サラ: んん……",
          ko: "사라: 음…",
        },
      },
      {
        text: {
          id: "Arka: Sarah…",
          en: "Arka: Sarah...",
          ja: "アルカ: サラ……",
          ko: "아르카: 사라…",
        },
      },
      {
        text: {
          id: "Sarah: Jangan bergerak.",
          en: "Sarah: Don't move.",
          ja: "サラ: 動かないで。",
          ko: "사라: 움직이지 마.",
        },
      },
      {
        text: {
          id: "Suara basah terdengar samar di kamar hotel yang sunyi.",
          en: "A faint wet sound echoes through the silent hotel room.",
          ja: "静まり返ったホテルの部屋に、湿った音がかすかに響く。",
          ko: "고요한 호텔 방 안에 젖은 소리가 희미하게 울린다.",
        },
      },
      {
        text: {
          id: "Sarah: Sudah sekeras ini…",
          en: "Sarah: Already this hard...",
          ja: "サラ: もうこんなに硬い……",
          ko: "사라: 벌써 이렇게 단단해…",
        },
      },
      {
        text: {
          id: "Sarah: Kamu menahan dari tadi, ya?",
          en: "Sarah: You've been holding back this whole time, haven't you?",
          ja: "サラ: さっきからずっと我慢してたのね？",
          ko: "사라: 아까부터 계속 참고 있었지?",
        },
      },
      {
        text: {
          id: "Sarah: Sekarang… berdiri.",
          en: "Sarah: Now... stand up.",
          ja: "サラ: さあ……立って。",
          ko: "사라: 이제… 일어나.",
        },
      },
    ],
    false,
    cutSceneSara1Voice,
  ),
  cutScene(
    cutSceneSara2,
    true,
    [
      {
        text: {
          id: "Sarah menarik Arka berdiri dan membawanya ke depan jendela kamar.",
          en: "Sarah pulls Arka to his feet and leads him to the window of the room.",
          ja: "サラはアルカを立たせ、部屋の窓の前へ連れていく。",
          ko: "사라는 아르카를 일으켜 세우고 방 창문 앞으로 데려간다.",
        },
      },
      {
        text: {
          id: "Sarah: Di sini.",
          en: "Sarah: Here.",
          ja: "サラ: ここで。",
          ko: "사라: 여기서.",
        },
      },
      {
        text: {
          id: "Sarah: Kalau ada yang melihat dari luar… biar saja.",
          en: "Sarah: If anyone sees us from outside... let them.",
          ja: "サラ: 外から誰かに見られても……かまわない。",
          ko: "사라: 밖에서 누가 보더라도… 내버려 둬.",
        },
      },
      {
        text: {
          id: "Arka meraba tubuhnya dari belakang.",
          en: "Arka runs his hands over her body from behind.",
          ja: "アルカは背後から彼女の体に手を這わせる。",
          ko: "아르카는 뒤에서 그녀의 몸을 더듬는다.",
        },
      },
      {
        text: {
          id: "Sarah: Jangan terburu-buru… Aku ingin merasakan setiap geraknya…",
          en: "Sarah: Don't rush... I want to feel every movement...",
          ja: "サラ: 急がないで……ひとつひとつの動きを感じたいの……",
          ko: "사라: 서두르지 마… 움직임 하나하나를 느끼고 싶어…",
        },
      },
    ],
    false,
    cutSceneSara2Voice,
  ),
  cutScene(
    cutSceneSara3,
    true,
    [
      {
        text: {
          id: "Mereka pindah ke ranjang.",
          en: "They move to the bed.",
          ja: "二人はベッドへ移る。",
          ko: "두 사람은 침대로 옮겨 간다.",
        },
      },
      {
        text: {
          id: "Arka: Kali ini aku yang bergerak.",
          en: "Arka: This time, I'm the one who moves.",
          ja: "アルカ：今度は僕が動きます。",
          ko: "아르카: 이번엔 내가 움직일게요.",
        },
      },
      {
        text: {
          id: "Sarah: Nngghh… di dalam…",
          en: "Sarah: Nngghh... inside...",
          ja: "サラ：んっ……中に……",
          ko: "사라: 으읏… 안에…",
        },
      },
      {
        text: {
          id: "Sarah: Lihat aku…",
          en: "Sarah: Look at me...",
          ja: "サラ：私を見て……",
          ko: "사라: 날 봐…",
        },
      },
      {
        text: {
          id: "Sarah: Jangan… tutup mata.",
          en: "Sarah: Don't... close your eyes.",
          ja: "サラ：目を……閉じないで。",
          ko: "사라: 눈… 감지 마.",
        },
      },
      {
        text: {
          id: "Gerakannya semakin dalam.",
          en: "His movements go deeper.",
          ja: "動きはさらに深くなっていく。",
          ko: "움직임이 점점 더 깊어진다.",
        },
      },
      {
        text: {
          id: "Sarah: Kamu… memenuhi aku.",
          en: "Sarah: You're... filling me up.",
          ja: "サラ：あなたで……いっぱい。",
          ko: "사라: 네가… 날 가득 채워.",
        },
      },
      {
        text: {
          id: "Sarah: Jangan… keluar dulu.",
          en: "Sarah: Don't... finish yet.",
          ja: "サラ：まだ……イかないで。",
          ko: "사라: 아직… 싸지 마.",
        },
      },
    ],
    false,
    cutSceneSara3Voice,
  ),
  cutScene(
    cutSceneSara4,
    true,
    [
      {
        text: {
          id: "Sarah: Lebih dalam…",
          en: "Sarah: Deeper...",
          ja: "サラ：もっと奥まで……",
          ko: "사라: 더 깊이…",
        },
      },
      {
        text: {
          id: "Sarah: Ahh… pikiranku jadi berantakan…",
          en: "Sarah: Ahh... my mind is falling apart...",
          ja: "サラ：あぁ……頭がぐちゃぐちゃになる……",
          ko: "사라: 아앗… 머릿속이 엉망이 돼…",
        },
      },
      {
        text: {
          id: "Arka: Sarah… aku hampir…",
          en: "Arka: Sarah... I'm close...",
          ja: "アルカ：サラ……もう……",
          ko: "아르카: 사라… 나 곧…",
        },
      },
      {
        text: {
          id: "Sarah: Belum… nngghh… tunggu aku…",
          en: "Sarah: Not yet... nngghh... wait for me...",
          ja: "サラ：まだ……んっ……私を待って……",
          ko: "사라: 아직… 으읏… 나 기다려…",
        },
      },
    ],
    false,
    cutSceneSara4Voice,
  ),
  cutScene(
    cutSceneSara5,
    true,
    [
      {
        text: {
          id: "Sarah: Nngghh… Ahh… di situ… terus…",
          en: "Sarah: Nngghh... Ahh... right there... keep going...",
          ja: "サラ：んっ……あぁ……そこ……続けて……",
          ko: "사라: 으읏… 아앗… 거기… 계속…",
        },
      },
      {
        text: {
          id: "Sarah: Sekarang… bersama…!",
          en: "Sarah: Now... together...!",
          ja: "サラ：今……一緒に……！",
          ko: "사라: 지금… 같이…!",
        },
      },
    ],
    false,
    cutSceneSara5Voice,
  ),
  cutScene(
    cutSceneSara6,
    true,
    [
      {
        text: {
          id: "Keduanya mencapai puncak hampir bersamaan.",
          en: "They both reach their peak almost at the same time.",
          ja: "二人はほとんど同時に絶頂を迎える。",
          ko: "두 사람은 거의 동시에 절정에 이른다.",
        },
      },
      {
        text: {
          id: "Sarah: Nngghh… di dalam…",
          en: "Sarah: Nngghh... inside...",
          ja: "サラ：んっ……中に……",
          ko: "사라: 으읏… 안에…",
        },
      },
      {
        text: {
          id: "Sarah: Keluar… di dalam aku…",
          en: "Sarah: Come... inside me...",
          ja: "サラ：出して……私の中に……",
          ko: "사라: 싸… 내 안에…",
        },
      },
      {
        text: {
          id: "Sarah: Jangan… cabut dulu.",
          en: "Sarah: Don't... pull out yet.",
          ja: "サラ：まだ……抜かないで。",
          ko: "사라: 아직… 빼지 마.",
        },
      },
    ],
    false,
    cutSceneSara6Voice,
  ),
  blackScreen(),
  say(
    "sara",
    "sad",
    tx({
      id: "Aku… seharusnya merasa bersalah sekarang.",
      en: "I... should be feeling guilty right now.",
      ja: "私……今、罪悪感を覚えるべきなのに。",
      ko: "나… 지금 죄책감을 느껴야 하는데.",
    }),
  ),
  say(
    "sara",
    "smile",
    tx({
      id: "Tapi yang kurasakan… bukan itu.",
      en: "But what I feel... isn't that.",
      ja: "でも感じているのは……それじゃない。",
      ko: "하지만 내가 느끼는 건… 그게 아니야.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Jangan bilang apa-apa. Biarkan aku diam seperti ini sebentar.",
      en: "Don't say anything. Let me stay like this for a little while.",
      ja: "何も言わないで。しばらくこのままでいさせて。",
      ko: "아무 말도 하지 마. 잠깐만 이대로 있게 해 줘.",
    }),
  ),
  narrate(
    tx({
      id: "Wanita yang selalu terlihat sempurna… sekarang berbaring di atasku dengan napas yang belum stabil.",
      en: "The woman who always looks perfect... is now lying on top of me, her breathing still unsteady.",
      ja: "いつも完璧に見えていた女性が……今、まだ乱れた息のまま僕の上に横たわっている。",
      ko: "언제나 완벽해 보이던 여자가… 지금은 아직 고르지 못한 숨을 내쉬며 내 위에 누워 있다.",
    }),
    "arka",
  ),
  hide("sara-day5-hotel"),
  hide("arka-day5-hotel"),
  setFlag("day5SaraCompleted", true),
  jumpIf("galleryMode", "gallery-return", { value: true }),
  jump("day5-sara-route-end"),
];
