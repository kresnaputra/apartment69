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
import nadiaHallwayUrl from "@/background/nadia-hallway.png";
import nadiaRoomUrl from "@/background/nadia-room.png";
import nadiaDay5_1 from "@/cut-scene/nadia-cut-scene-day-5-1.webm";
import nadiaDay5_2 from "@/cut-scene/nadia-cut-scene-day-5-2.webm";
import nadiaDay5_3 from "@/cut-scene/nadia-cut-scene-day-5-3.webm";
import nadiaDay5_4 from "@/cut-scene/nadia-cut-scene-day-5-4.webm";

import nadiaDay5_1_Sound from "@/voice/nadia/nadia-cut-scene-voice-day-5-1.mp3";
import nadiaDay5_2_Sound from "@/voice/nadia/nadia-cut-scene-voice-day-5-2.mp3";
import nadiaDay5_3_Sound from "@/voice/nadia/nadia-cut-scene-voice-day-5-3.mp3";
import nadiaDay5_4_Sound from "@/voice/nadia/nadia-cut-scene-voice-day-5-4.mp3";
import nadiaDay5_5_Sound from "@/voice/nadia/nadia-cut-scene-voice-day-5-5.mp3";
import nadiaDay5_6_Sound from "@/voice/nadia/nadia-cut-scene-voice-day-5-6.mp3";
import nadiaDay5_7_Sound from "@/voice/nadia/nadia-cut-scene-voice-day-5-7.mp3";
import { addNadiaDay5Voices } from "@/voice/nadia/day5";

export const day5NadiaScene: VisualNovelCommand[] = addNadiaDay5Voices([
  bg(
    bedroomAfternoonUrl,
    tx({
      id: "Apartment 69 - Unit 302, Sore",
      en: "Apartment 69 - Unit 302, Afternoon",
      ja: "Apartment 69 - 302号室、夕方",
      ko: "Apartment 69 - 302호, 오후",
    }),
  ),
  show("arka-day5-nadia", "arka", "neutral", {
    position: "left",
    enterFrom: "fade",
  }),
  narrate(
    tx({
      id: "Sore hari di Apartemen Lentera. Arka baru saja selesai bekerja ketika ponselnya bergetar.",
      en: "It is late afternoon at Lentera Apartments. Arka has just finished working when his phone vibrates.",
      ja: "レンテラ・アパートの夕方。仕事を終えたばかりのアルカのスマホが震えた。",
      ko: "렌테라 아파트의 늦은 오후. 막 일을 마친 아르카의 휴대폰이 울렸다.",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Arka. Kamu di kamar?",
      en: "Arka. Are you in your room?",
      ja: "アルカ。部屋にいる？",
      ko: "아르카. 방에 있어?",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Iya. Ada apa?",
      en: "Yeah. What's up?",
      ja: "いるよ。どうした？",
      ko: "응. 무슨 일이야?",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Naik ke unitku dulu. Aku mau ngomong. Nggak lama.",
      en: "Come up to my unit. I want to talk. It won't take long.",
      ja: "私の部屋に来て。話したいことがあるの。長くはかからないから。",
      ko: "내 방으로 올라와 줘. 할 말이 있어. 오래 안 걸려.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Oke.",
      en: "Okay.",
      ja: "わかった。",
      ko: "알았어.",
    }),
  ),
  bg(
    nadiaHallwayUrl,
    tx({
      id: "Apartment 69 - Depan Unit 102, Sore",
      en: "Apartment 69 - Outside Unit 102, Afternoon",
      ja: "Apartment 69 - 102号室前、夕方",
      ko: "Apartment 69 - 102호 앞, 오후",
    }),
  ),
  narrate(
    tx({
      id: "Beberapa menit kemudian Arka berdiri di depan unit 102. Pintu langsung dibuka. Nadia memakai kemeja oversized dan short pendek. Rambutnya sedikit berantakan, dan matanya terlihat lelah.",
      en: "A few minutes later, Arka stands outside Unit 102. The door opens immediately. Nadia is wearing an oversized shirt and short shorts. Her hair is slightly messy, and her eyes look tired.",
      ja: "数分後、アルカは102号室の前に立っていた。ドアはすぐに開く。ナディアはオーバーサイズのシャツに短いショートパンツ姿で、髪は少し乱れ、目には疲れが見えた。",
      ko: "몇 분 후, 아르카는 102호 앞에 섰다. 문은 곧바로 열렸다. 나디아는 오버사이즈 셔츠와 짧은 반바지를 입고 있었다. 머리는 조금 흐트러졌고 눈에는 피곤함이 묻어났다.",
    }),
  ),
  show("nadia-day5", "nadia", "neutral", {
    position: "center",
    enterFrom: "right",
  }),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Masuk.",
      en: "Come in.",
      ja: "入って。",
      ko: "들어와.",
    }),
  ),
  bg(
    nadiaRoomUrl,
    tx({
      id: "Apartment 69 - Unit 102, Sore",
      en: "Apartment 69 - Unit 102, Afternoon",
      ja: "Apartment 69 - 102号室、夕方",
      ko: "Apartment 69 - 102호, 오후",
    }),
  ),
  narrate(
    tx({
      id: "Arka masuk. Ruangan masih berbau samar parfum. Ring light sudah dimatikan, kamera tersimpan rapi di meja.",
      en: "Arka steps inside. The room still carries a faint scent of perfume. The ring light is off, and the camera has been neatly put away on the table.",
      ja: "アルカが中へ入る。部屋にはまだ香水の匂いがかすかに残っていた。リングライトは消され、カメラはテーブルの上にきれいに片づけられている。",
      ko: "아르카가 안으로 들어갔다. 방에는 은은한 향수 냄새가 남아 있었다. 링 라이트는 꺼져 있었고 카메라는 테이블 위에 가지런히 놓여 있었다.",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Duduk aja.",
      en: "Just sit down.",
      ja: "座って。",
      ko: "앉아.",
    }),
  ),
  narrate(
    tx({
      id: "Nadia duduk di sofa, lalu menatap Arka cukup lama sebelum akhirnya bicara.",
      en: "Nadia sits on the sofa and studies Arka for a long moment before finally speaking.",
      ja: "ナディアはソファに座り、しばらくアルカを見つめてから、ようやく口を開いた。",
      ko: "나디아는 소파에 앉아 한동안 아르카를 바라보다가 마침내 입을 열었다.",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Kemarin stream-ku tembus paling tinggi sejak aku mulai.",
      en: "Yesterday's stream hit my highest numbers since I started.",
      ja: "昨日の配信、始めてから一番の数字が出たの。",
      ko: "어제 방송이 시작한 이래 최고 기록을 찍었어.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Bagus.",
      en: "That's good.",
      ja: "よかったじゃないか。",
      ko: "잘됐네.",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Engagement-nya gila. Donasi masuk terus. Banyak yang minta part 2.",
      en: "The engagement was insane. Donations kept coming in. A lot of people are asking for part two.",
      ja: "反応がすごかった。投げ銭もずっと入ってきて、パート2を求める人も多い。",
      ko: "반응이 엄청났어. 후원도 계속 들어왔고, 2편을 해 달라는 사람도 많아.",
    }),
  ),
  narrate(
    tx({
      id: "Ia tersenyum tipis, tapi senyumnya tidak sepenuhnya lega.",
      en: "She gives a faint smile, but it is not entirely relieved.",
      ja: "彼女はかすかに笑ったが、その笑顔には心からの安堵がなかった。",
      ko: "그녀는 옅게 웃었지만, 그 미소에는 온전한 안도감이 없었다.",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Aku seharusnya senang. Tapi sejak tadi pagi aku malah mikir terus.",
      en: "I should be happy. But I've been thinking about it nonstop since this morning.",
      ja: "喜ぶべきなんだろうけど、朝からずっと考え込んでる。",
      ko: "기뻐해야 하는데, 아침부터 계속 생각만 하게 돼.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Mikir apa?",
      en: "Thinking about what?",
      ja: "何を？",
      ko: "무슨 생각?",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Apakah aku bakal terus kayak gini… atau aku cuma lagi naik karena kontennya panas.",
      en: "Whether I can keep this going... or if I'm only blowing up because the content was hot.",
      ja: "このまま続けていけるのか…それとも刺激の強いコンテンツだったから伸びただけなのか。",
      ko: "계속 이렇게 갈 수 있을지… 아니면 자극적인 콘텐츠라서 잠깐 뜬 것뿐인지.",
    }),
  ),
  narrate(
    tx({
      id: "Nadia menghela napas dan menyandarkan punggungnya ke sofa.",
      en: "Nadia exhales and leans back against the sofa.",
      ja: "ナディアはため息をつき、ソファに背を預けた。",
      ko: "나디아는 한숨을 내쉬며 소파에 등을 기댔다.",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Kamu kemarin di belakang kamera. Kamu lihat semuanya. Jujur aja… menurutmu aku keliatan menikmati itu, atau aku cuma lagi main-main?",
      en: "You were behind the camera yesterday. You saw everything. Be honest... did I look like I was enjoying it, or was I just playing around?",
      ja: "昨日、あなたはカメラの後ろにいた。全部見てたよね。正直に言って…私、楽しんでるように見えた？ それともただふざけてただけ？",
      ko: "어제 너는 카메라 뒤에 있었잖아. 전부 봤고. 솔직히 말해 줘… 내가 즐기는 것처럼 보였어, 아니면 그냥 장난치는 것처럼 보였어?",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Kamu menikmatinya.",
      en: "You enjoyed it.",
      ja: "楽しんでた。",
      ko: "넌 즐기고 있었어.",
    }),
  ),
  narrate(
    tx({
      id: "Nadia terdiam sebentar, lalu tertawa kecil.",
      en: "Nadia goes quiet for a moment, then lets out a small laugh.",
      ja: "ナディアは一瞬黙り込み、それから小さく笑った。",
      ko: "나디아는 잠시 말이 없다가 작게 웃었다.",
    }),
  ),
  say(
    "nadia",
    "smile",
    tx({
      id: "Dasar jujur.",
      en: "Always so honest.",
      ja: "本当に正直なんだから。",
      ko: "정말 솔직하네.",
    }),
  ),
  narrate(
    tx({
      id: "Ia menggeser posisinya sedikit lebih dekat ke Arka.",
      en: "She shifts a little closer to Arka.",
      ja: "彼女はアルカのほうへ少し身を寄せた。",
      ko: "그녀는 아르카 쪽으로 조금 더 가까이 다가앉았다.",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Aku nggak nyesel kemarin. Tapi aku juga takut. Takut kalau suatu saat aku nggak bisa balik lagi ke konten biasa.",
      en: "I don't regret yesterday. But I'm scared too. Scared that one day I won't be able to go back to normal content.",
      ja: "昨日のことは後悔してない。でも怖くもある。いつか普通のコンテンツに戻れなくなるんじゃないかって。",
      ko: "어제를 후회하진 않아. 하지만 무섭기도 해. 언젠가 평범한 콘텐츠로 돌아가지 못하게 될까 봐.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Kenapa takut?",
      en: "Why are you scared?",
      ja: "どうして怖い？",
      ko: "왜 무서운데?",
    }),
  ),
  say(
    "nadia",
    "blush",
    tx({
      id: "Karena rasanya enak. Diperhatiin. Dibutuhin. Bahkan sama orang yang nggak kenal aku sama sekali.",
      en: "Because it feels good. Being noticed. Being wanted. Even by people who don't know me at all.",
      ja: "だって気持ちいいから。注目されて、求められて。私のことを何も知らない人たちからでさえ。",
      ko: "기분이 좋으니까. 관심받고, 필요로 여겨지고. 나를 전혀 모르는 사람들에게서조차.",
    }),
  ),
  narrate(
    tx({
      id: "Nadia menunduk, suaranya pelan.",
      en: "Nadia lowers her gaze, her voice soft.",
      ja: "ナディアはうつむき、声を落とした。",
      ko: "나디아는 고개를 숙였고 목소리는 작아졌다.",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Kadang aku mikir, mungkin bakatku emang di situ.",
      en: "Sometimes I think maybe that's what I'm actually good at.",
      ja: "時々思うの。もしかしたら、私の才能って本当にそこにあるのかもって。",
      ko: "가끔은 내가 정말 그쪽에 재능이 있는 건가 싶어.",
    }),
  ),
  narrate(
    tx({
      id: "Hening sejenak.",
      en: "Silence settles between them for a moment.",
      ja: "しばし沈黙が流れた。",
      ko: "잠시 침묵이 흘렀다.",
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
      id: "Hmm?",
      en: "Hmm?",
      ja: "ん？",
      ko: "응?",
    }),
  ),
  say(
    "nadia",
    "blush",
    tx({
      id: "Kemarin kamu cuma pegang kamera. Malam ini… kamu masih mau di sini, meski nggak ada kamera?",
      en: "Yesterday you were only holding the camera. Tonight... would you still stay here, even without one?",
      ja: "昨日はカメラを持ってただけだったよね。今夜は…カメラがなくても、ここにいてくれる？",
      ko: "어제는 카메라만 들고 있었잖아. 오늘 밤은… 카메라가 없어도 여기 있어 줄래?",
    }),
  ),
  narrate(
    tx({
      id: "Arka menatapnya.",
      en: "Arka looks at her.",
      ja: "アルカは彼女を見つめた。",
      ko: "아르카는 그녀를 바라보았다.",
    }),
  ),
  say(
    "nadia",
    "neutral",
    tx({
      id: "Aku nggak minta apa-apa yang aneh. Aku cuma… nggak mau sendirian malam ini.",
      en: "I'm not asking for anything weird. I just... don't want to be alone tonight.",
      ja: "変なことを頼んでるわけじゃない。ただ…今夜は一人でいたくないの。",
      ko: "이상한 걸 바라는 건 아니야. 그냥… 오늘 밤 혼자 있고 싶지 않아.",
    }),
  ),
  narrate(
    tx({
      id: "Nadia menggeser tubuhnya mendekat, lalu menyandarkan kepala di bahu Arka.",
      en: "Nadia moves closer and rests her head on Arka's shoulder.",
      ja: "ナディアはさらに身を寄せ、アルカの肩に頭を預けた。",
      ko: "나디아는 몸을 더 가까이 옮겨 아르카의 어깨에 머리를 기댔다.",
    }),
  ),
  cutScene(nadiaDay5_1, true, [
    {
      text: tx({
        id: "Nadia: Kalau kamu mau pergi, aku nggak bakalan nahan. Tapi kalau kamu tinggal… jangan cuma diem aja.",
        en: "Nadia: If you want to leave, I won't stop you. But if you stay... don't just sit there in silence.",
        ja: "ナディア: 帰りたいなら止めない。でも残ってくれるなら…ただ黙ってないで。",
        ko: "나디아: 가고 싶으면 붙잡지 않을게. 하지만 남을 거라면… 그냥 가만히 있지는 마.",
      }),
      voice: nadiaDay5_1_Sound,
    },
    {
      text: tx({
        id: "Arka tidak langsung menjawab. Ia hanya mengangkat tangannya dan mengusap rambut Nadia pelan.",
        en: "Arka does not answer right away. He simply raises a hand and gently strokes Nadia's hair.",
        ja: "アルカはすぐには答えず、ただ手を上げてナディアの髪を優しく撫でた。",
        ko: "아르카는 바로 대답하지 않았다. 그저 손을 들어 나디아의 머리카락을 부드럽게 쓰다듬었다.",
      }),
    },
    {
      text: tx({
        id: "Nadia: Kamu hangat.",
        en: "Nadia:You're warm.",
        ja: "ナディア:あったかい。",
        ko: "나디아: 따뜻하네.",
      }),
      voice: nadiaDay5_2_Sound,
    },
    {
      text: tx({
        id: "Beberapa saat berlalu dalam diam. Nadia mengangkat wajahnya dan menatap Arka dari dekat.",
        en: "Several quiet moments pass. Nadia lifts her face and looks at Arka from up close.",
        ja: "静かな時間がしばらく流れた。ナディアは顔を上げ、すぐ近くからアルカを見つめた。",
        ko: "말없이 잠시 시간이 흘렀다. 나디아는 얼굴을 들어 가까이서 아르카를 바라보았다.",
      }),
    },
    {
      text: tx({
        id: "Boleh aku cium?",
        en: "Can I kiss you?",
        ja: "キスしてもいい？",
        ko: "키스해도 돼?",
      }),
      voice: nadiaDay5_3_Sound,
    },
  ]),
  cutScene(nadiaDay5_2, true, [
    {
      text: tx({
        id: "Tanpa menunggu jawaban panjang, Nadia mendekat dan mencium Arka.",
        en: "Without waiting for a long answer, Nadia leans in and kisses Arka.",
        ja: "長い返事を待たず、ナディアは身を寄せてアルカにキスをした。",
        ko: "긴 대답을 기다리지 않고 나디아는 다가가 아르카에게 입을 맞췄다.",
      }),
    },
  ]),
  cutScene(nadiaDay5_3, true, [
    {
      text: tx({
        id: "Nadia: Makasih… sudah mau tinggal malam ini.",
        en: "Nadia: Thank you... for staying tonight.",
        ja: "ナディア: ありがとう…今夜、残ってくれて。",
        ko: "나디아: 고마워… 오늘 밤 있어 줘서.",
      }),
      voice: nadiaDay5_4_Sound,
    },
  ]),
  cutScene(nadiaDay5_4, true, [
    {
      text: tx({
        id: "Nadia: Besok aku mau tanya sesuatu yang penting. Soal arah stream aku ke depan.",
        en: "Nadia: Tomorrow I want to ask you something important. About where I should take my streams from here.",
        ja: "ナディア: 明日、大事なことを聞きたい。これから配信をどうしていくかについて。",
        ko: "나디아: 내일 중요한 걸 물어보고 싶어. 앞으로 방송을 어떤 방향으로 해 나갈지에 대해서.",
      }),
      voice: nadiaDay5_5_Sound,
    },
    {
      text: tx({
        id: "Apa itu?",
        en: "What is it?",
        ja: "何だ？",
        ko: "그게 뭔데?",
      }),
    },
    {
      text: tx({
        id: "Nadia: Nanti aja. Malam ini aku nggak mau mikir.",
        en: "Nadia: Later. I don't want to think tonight.",
        ja: "ナディア: また今度。今夜は考えたくない。",
        ko: "나디아: 나중에. 오늘 밤은 생각하고 싶지 않아.",
      }),
      voice: nadiaDay5_6_Sound,
    },
    {
      text: tx({
        id: "Ia memeluk lengan Arka pelan.",
        en: "She gently wraps her arms around Arka's arm.",
        ja: "彼女はアルカの腕をそっと抱きしめた。",
        ko: "그녀는 아르카의 팔을 살며시 끌어안았다.",
      }),
    },
    {
      text: tx({
        id: "Nadia: Biarin aku begini dulu, ya.",
        en: "Nadia: Let me stay like this for a while, okay?",
        ja: "ナディア: しばらくこのままでいさせて。ね？",
        ko: "나디아: 잠깐만 이대로 있게 해 줘. 응?",
      }),
      voice: nadiaDay5_7_Sound,
    },
    {
      text: tx({
        id: "Gadis ini lebih rumit dari yang kelihatan.",
        en: "This girl is more complicated than she looks.",
        ja: "この子は見た目よりずっと複雑だ。",
        ko: "이 여자는 겉으로 보이는 것보다 훨씬 복잡하다.",
      }),
    },
    {
      text: tx({
        id: "Di depan kamera dia berani banget.",
        en: "In front of the camera, she is incredibly bold.",
        ja: "カメラの前では、あれほど大胆なのに。",
        ko: "카메라 앞에서는 그렇게나 대담한데.",
      }),
    },
    {
      text: tx({
        id: "Tapi malam ini… dia kelihatan takut kehilangan arah.",
        en: "But tonight... she looks afraid of losing her way.",
        ja: "でも今夜は…進むべき道を見失うことを怖がっているように見えた。",
        ko: "하지만 오늘 밤은… 방향을 잃을까 봐 두려워하는 것처럼 보였다.",
      }),
    },
  ]),
  hide("nadia-day5", "fadeAway"),
  hide("arka-day5-nadia", "fadeAway"),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", "", 1000),
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
      id: "DAY 5 - NADIA ROUTE COMPLETE",
      en: "DAY 5 - NADIA ROUTE COMPLETE",
      ja: "DAY 5 - ナディアルート完了",
      ko: "DAY 5 - 나디아 루트 완료",
    }),
    { size: "hero" },
  ),
  centeredText(
    tx({
      id: "MENYIAPKAN HARI 6 - PILIHAN",
      en: "PREPARING FOR DAY 6 - THE CHOICE",
      ja: "6日目への準備 - 選択",
      ko: "6일차 준비 - 선택",
    }),
    { size: "sub" },
  ),
  setFlag("day5NadiaCompleted", true),
  setFlag("nadiaAffection", 5),
  jump("day6-nadia"),
]);
