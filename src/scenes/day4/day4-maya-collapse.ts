import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  centeredText,
  cutScene,
  hide,
  jump,
  menu,
  minigame,
  narrate,
  say,
  scene,
  setFlag,
  show,
} from "@/scenes/scriptTypes";
import hallwayUrl from "@/background/hallway.png";
import mayaBedroomUrl from "@/background/maya-bedroom.png";
import mayaBedroomNightUrl from "@/background/maya-bedroom-night.png";
import mayaBed1 from "@/cut-scene/maya-bed-1.webm?url";
import mayaBed2 from "@/cut-scene/maya-bed-2.webm?url";
import mayaBed3 from "@/cut-scene/maya-bed-3.webm?url";
import mayaBed4 from "@/cut-scene/maya-bed-4.webm?url";
import { mayaDay1To4Voices } from "@/voice/maya/day1to4";

export const day4MayaCollapseScene: VisualNovelCommand[] = [
  bg(
    hallwayUrl,
    tx({
      id: "Lorong Depan Unit 301 - 13:00",
      en: "Outside Unit 301 - 13:00",
      ja: "301号室前の廊下 - 13:00",
      ko: "301호 앞 복도 - 13:00",
    }),
  ),
  narrate(
    tx({
      id: "Arka baru mau keluar cari makan siang. Begitu dia membuka pintu unitnya, pintu kamar Maya juga terbuka. Maya keluar dengan ransel berat dan jaket tebal, padahal cuaca siang ini cukup panas.",
      en: "Arka is just about to head out for lunch. The moment he opens his apartment door, Maya's door opens too. She steps out wearing a heavy backpack and a thick jacket, even though the midday heat is brutal.",
      ja: "アルカが昼ごはんを買いに出ようとしたそのとき、部屋のドアを開けるのと同時にマヤの部屋のドアも開いた。真昼の暑さだというのに、彼女は重そうなリュックと厚手のジャケット姿で出てくる。",
      ko: "아르카가 점심을 먹으러 나가려던 순간, 그의 문이 열리자마자 마야의 문도 함께 열렸다. 한낮 더위가 한창인데도 마야는 무거운 가방과 두꺼운 재킷을 걸친 채 밖으로 나온다.",
    }),
  ),
  show("arka-day4-hallway", "arka", "serious", {
    position: "left",
    enterFrom: "left",
  }),
  show("maya-day4-hallway", "maya", "worried", {
    position: "center",
    enterFrom: "fade",
  }),
  narrate(
    tx({
      id: "Dari kemarin siang dia ngurung diri di kamar. Sekarang tiba-tiba keluar pakai jaket tebal padahal AC lorong aja mati. Ada yang nggak beres.",
      en: "She's been holed up in her room since yesterday afternoon. And now she's suddenly coming out in a thick jacket when even the hallway AC is dead. Something's definitely wrong.",
      ja: "昨日の昼からずっと部屋にこもってたのに、今になって廊下のエアコンさえ止まってる暑さの中、厚手のジャケットで出てくるなんて。絶対おかしい。",
      ko: "어제 낮부터 계속 방에 틀어박혀 있더니, 복도 에어컨도 죽어 있는 더운 날씨에 갑자기 두꺼운 재킷까지 입고 나오다니. 분명 뭔가 이상하다.",
    }),
    "arka",
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Maya? Mau ke kampus jam segini? Muka kamu pucat banget.",
      en: "Maya? You're heading to campus now? You look awful.",
      ja: "マヤ？ 今から大学行くのか？ 顔色ひどいぞ。",
      ko: "마야? 지금 학교 가려는 거야? 얼굴이 완전 안 좋아 보여.",
    }),
  ),
  say(
    "maya",
    "worried",
    tx({
      id: "Iya... ujian anatominya jam dua. Aku harus jalan sekarang biar nggak telat.",
      en: "Yeah... my anatomy exam's at two. I need to go now or I'm gonna be late.",
      ja: "うん…解剖学の試験が二時からなの。今出ないと遅れちゃう。",
      ko: "응... 해부학 시험이 두 시야. 지금 안 나가면 늦어.",
    }),
    { voice: mayaDay1To4Voices[17] },
  ),
  narrate(
    tx({
      id: "Jalan Maya sedikit sempoyongan. Dia bersandar ke dinding lorong seolah itu satu-satunya hal yang masih menopangnya.",
      en: "Maya's steps wobble. She leans against the hallway wall like it's the only thing keeping her upright.",
      ja: "マヤの足取りはふらついていて、立っていられるのは廊下の壁にもたれているからにしか見えない。",
      ko: "마야의 걸음은 휘청거렸고, 복도 벽이 아니면 제대로 서 있지도 못할 것처럼 보였다.",
    }),
  ),
  say(
    "arka",
    "surprised",
    tx({
      id: "Kamu sakit. Napasmu aja berat begitu. Jangan maksa berangkat.",
      en: "You're sick. Look at you, you're barely breathing right. Don't force it.",
      ja: "お前、具合悪いだろ。息だってまともじゃない。無理するな。",
      ko: "너 아프잖아. 숨 쉬는 것만 봐도 힘들어 보여. 무리하지 마.",
    }),
  ),
  say(
    "maya",
    "sad",
    tx({
      id: "Nggak bisa, Arka. Kalau aku nggak ikut ujian ini, Papa bakal beneran narik aku pulang. Aku udah belajar semalaman... aku pasti bisa.",
      en: "I can't, Arka. If I miss this exam, my dad's seriously gonna drag me back home. I stayed up all night for this... I can do it.",
      ja: "無理だよ、アルカ。これ受けなかったら、お父さん本当に私を家に連れ戻す。徹夜で勉強したんだもん…きっと大丈夫。",
      ko: "안 돼, 아르카. 이번 시험 못 보면 아빠가 진짜 날 집으로 데려갈 거야. 밤새 공부했단 말이야... 나 할 수 있어.",
    }),
    { voice: mayaDay1To4Voices[18] },
  ),
  narrate(
    tx({
      id: "Baru dua langkah menjauh dari dinding, kaki Maya lemas. Dia hampir jatuh ke lantai kalau Arka nggak gerak cepat nahan lengannya.",
      en: "She barely makes it two steps away from the wall before her legs give out. She would've hit the floor if Arka hadn't caught her arm in time.",
      ja: "壁から離れて二歩も行かないうちに、マヤの足から力が抜ける。アルカがとっさに腕を掴まなければ、そのまま床に倒れていた。",
      ko: "벽에서 두 걸음도 채 떨어지기 전에 마야의 다리에 힘이 풀린다. 아르카가 재빨리 팔을 잡아주지 않았다면 그대로 바닥에 쓰러졌을 것이다.",
    }),
  ),
  say(
    "arka",
    "surprised",
    tx({
      id: "Maya! Astaga, badanmu panas banget.",
      en: "Maya! Jesus, you're burning up.",
      ja: "マヤ！ うわ、すごい熱いじゃないか。",
      ko: "마야! 뭐야, 너 몸이 너무 뜨거워.",
    }),
  ),
  say(
    "maya",
    "sad",
    tx({
      id: "Arka... tolong... aku harus ke kampus...",
      en: "Arka... please... I have to go...",
      ja: "アルカ…お願い…行かなきゃ…",
      ko: "아르카... 제발... 가야 해...",
    }),
    { voice: mayaDay1To4Voices[19] },
  ),
  menu(
    tx({
      id: "Apa tindakan kamu sekarang?",
      en: "What should you do now?",
      ja: "ここであなたはどうする？",
      ko: "지금 너는 어떻게 해야 할까?",
    }),
    [
      {
        id: "let-her-go",
        label: tx({
          id: "Turuti kemauannya",
          en: "Let her go",
          ja: "彼女の意思を優先する",
          ko: "마야 뜻대로 보내준다",
        }),
        next: "day4-maya-bad-ending",
      },
      {
        id: "force-her-rest",
        label: tx({
          id: "Paksa dia istirahat",
          en: "Force her to rest",
          ja: "無理やり休ませる",
          ko: "억지로라도 쉬게 한다",
        }),
        next: "day4-maya-force-rest",
      },
    ],
  ),
];

export const day4MayaBadEndingScene: VisualNovelCommand[] = [
  setFlag("mayaRouteFailed", true),
  narrate(
    tx({
      id: "Biar aku pesanin kendaraan. Aku antar kamu sampai depan gedungnya.",
      en: "I'll get you a ride. I'll take you straight to the building.",
      ja: "車を呼ぶ。建物の前まで送るよ。",
      ko: "차 불러줄게. 건물 앞까지 데려다줄게.",
    }),
    "arka",
  ),
  hide("maya-day4-hallway"),
  hide("arka-day4-hallway"),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", "", 1000),
  centeredText(
    tx({
      id: "GAME OVER",
      en: "GAME OVER",
      ja: "GAME OVER",
      ko: "GAME OVER",
    }),
    { size: "hero" },
  ),
  centeredText(
    tx({
      id: "RUTE MAYA GAGAL",
      en: "MAYA ROUTE FAILED",
      ja: "マヤルート失敗",
      ko: "마야 루트 실패",
    }),
    { size: "sub" },
  ),
  centeredText(
    tx({
      id: "Maya pingsan di kampus, dirawat di rumah sakit, lalu dipaksa pulang oleh ayahnya.",
      en: "Maya collapsed on campus, was taken to the hospital, and was forced to go home by her father.",
      ja: "マヤは大学で倒れ、病院に運ばれ、その後父親に無理やり連れ帰られた。",
      ko: "마야는 캠퍼스에서 쓰러져 병원으로 옮겨졌고, 결국 아버지에게 강제로 집으로 끌려갔다.",
    }),
    { size: "sub" },
  ),
];

export const day4MayaForceRestScene: VisualNovelCommand[] = [
  setFlag("mayaProtectedOnDay4", true),
  say(
    "arka",
    "serious",
    tx({
      id: "Nggak ada kampus hari ini. Ujian bisa susulan. Kondisi kayak gini nggak bisa diulang.",
      en: "You're not going anywhere today. You can retake an exam. You can't retake this.",
      ja: "今日はどこにも行かせない。試験は受け直せる。でも今の状態は取り返しがつかない。",
      ko: "오늘은 어디도 못 가. 시험은 다시 볼 수 있어도, 지금 이 상태는 안 돼.",
    }),
  ),
  say(
    "maya",
    "sad",
    tx({
      id: "Tapi Papa... ujiannya...",
      en: "But my dad... the exam...",
      ja: "でも、お父さんが…試験が…",
      ko: "하지만 아빠가... 시험이...",
    }),
    { voice: mayaDay1To4Voices[20] },
  ),
  narrate(
    tx({
      id: "Begitu Arka sadar Maya bahkan sudah nggak bisa berdiri sendiri, dia langsung mengangkatnya tanpa banyak bicara.",
      en: "The second Arka realizes Maya can't even stand on her own anymore, he picks her up without another word.",
      ja: "マヤがもう自分で立っていられないと気づいた瞬間、アルカはそれ以上何も言わずに彼女を抱き上げた。",
      ko: "마야가 이제 혼자 제대로 서 있을 수도 없다는 걸 깨닫는 순간, 아르카는 더 말하지 않고 그녀를 들어 올린다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Urusan kampus biar aku yang tangani. Sekarang kamu balik ke tempat tidur.",
      en: "I'll deal with the campus stuff. Right now, you're going back to bed.",
      ja: "大学のことは俺が何とかする。今はベッドに戻れ。",
      ko: "학교 일은 내가 처리할게. 지금은 침대로 돌아가.",
    }),
  ),
  hide("maya-day4-hallway"),
  hide("arka-day4-hallway"),
  bg(
    mayaBedroomUrl,
    tx({
      id: "Unit 301 - Kamar Maya",
      en: "Unit 301 - Maya's Room",
      ja: "301号室 - マヤの部屋",
      ko: "301호 - 마야의 방",
    }),
  ),
  show("arka-day4-bedroom", "arka", "serious", {
    position: "left",
    enterFrom: "fade",
  }),
  show("maya-day4-bedroom", "maya", "sad", {
    position: "center",
    enterFrom: "fade",
  }),
  narrate(
    tx({
      id: "Arka membawa Maya kembali masuk ke Unit 301, membaringkannya di kasur, melepaskan ransel dan jaket tebalnya, lalu menarik selimut menutupi tubuhnya yang gemetar.",
      en: "Arka carries Maya back into Unit 301, lays her down on the bed, slips off her backpack and thick jacket, then pulls the blanket over her trembling body.",
      ja: "アルカはマヤを301号室へ運び戻し、ベッドに寝かせる。重いリュックと厚手のジャケットを脱がせ、震える体に毛布をかけた。",
      ko: "아르카는 마야를 다시 301호로 데려와 침대에 눕히고, 무거운 가방과 두꺼운 재킷을 벗긴 뒤 떨리는 몸 위로 이불을 덮어 준다.",
    }),
  ),
  say(
    "maya",
    "sad",
    tx({
      id: "Maaf... aku gagal lagi...",
      en: "Sorry... I messed up again...",
      ja: "ごめん…また失敗しちゃった…",
      ko: "미안... 또 망쳤어...",
    }),
    { voice: mayaDay1To4Voices[21] },
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Kamu nggak gagal. Tidur aja dulu.",
      en: "You didn't mess up. Go to sleep.",
      ja: "失敗なんかじゃない。もう寝ろ。",
      ko: "망한 거 아니야. 일단 자.",
    }),
  ),
  narrate(
    tx({
      id: "Arka mengambil handuk kecil, membasahinya dengan air hangat, lalu meletakkannya di dahi Maya.",
      en: "Arka grabs a small towel, wets it with warm water, and places it on Maya's forehead.",
      ja: "アルカは小さなタオルを取り、ぬるま湯で湿らせてマヤの額に乗せた。",
      ko: "아르카는 작은 수건을 가져와 미지근한 물에 적신 뒤 마야의 이마에 올려둔다.",
    }),
  ),
  narrate(
    tx({
      id: "Pandangannya lalu tertuju pada laptop Maya yang masih menyala di meja belajar, dengan email dosen anatomi yang terbuka di layar.",
      en: "His eyes drift to Maya's laptop, still on at her desk, with an email from her anatomy lecturer open on the screen.",
      ja: "ふと視線を向けると、勉強机の上ではまだマヤのノートパソコンが点いたままで、画面には解剖学担当の講師へのメールが開かれていた。",
      ko: "그의 시선은 책상 위에서 아직 켜져 있는 마야의 노트북으로 향한다. 화면에는 해부학 담당 교수에게 보내는 메일이 떠 있다.",
    }),
  ),
  narrate(
    tx({
      id: "Demamnya tinggi banget. Kalau dibiarin begini, bisa makin parah. Aku nggak mungkin ninggalin dia sendirian dalam kondisi kayak gini.",
      en: "Her fever's way too high. If I leave her like this, it could get a lot worse. No way am I leaving her alone like this.",
      ja: "熱が高すぎる。このまま放っておいたら、もっと悪くなるかもしれない。こんな状態で一人になんてできない。",
      ko: "열이 너무 높다. 이대로 두면 더 심해질 수도 있다. 이런 상태로 혼자 둘 수는 없다.",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Urusan bapaknya belakangan aja. Sekarang aku harus email dosennya, kasih tahu kalau dia sakit, lalu turun beli obat penurun demam dan bubur.",
      en: "Her dad can wait. Right now, I need to email her lecturer, tell them she's sick, then run downstairs and get her fever meds and some porridge.",
      ja: "父親のことは後回しだ。今は講師にメールして体調不良を伝えて、それから下に降りて解熱剤とおかゆを買ってこないと。",
      ko: "아버지 문제는 나중이다. 지금은 교수에게 아프다고 메일을 보내고, 아래층에 내려가 해열제랑 죽부터 사와야 한다.",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Sepertinya hari ini aku bakal tetap di sini sampai dia benar-benar sadar lagi.",
      en: "Looks like I'm staying here until she's really awake again.",
      ja: "どうやら、ちゃんと目を覚ますまで今日はここを離れられそうにない。",
      ko: "제대로 정신을 차릴 때까지는 오늘 여기 있어야 할 것 같다.",
    }),
    "arka",
  ),
  minigame("email-compose"),
  bg(
    mayaBedroomNightUrl,
    tx({
      id: "Unit 301 - Kamar Maya - 21:00",
      en: "Unit 301 - Maya's Room - 21:00",
      ja: "301号室 - マヤの部屋 - 21:00",
      ko: "301호 - 마야의 방 - 21:00",
    }),
  ),
  narrate(
    tx({
      id: "Ruangan hanya diterangi lampu tidur Maya yang remang-remang. Dari luar jendela terdengar suara hujan rintik yang pelan.",
      en: "The room is lit only by the dim glow of Maya's bedside lamp. Light rain taps softly against the window outside.",
      ja: "部屋を照らしているのは、マヤのベッドサイドランプの淡い灯りだけ。窓の外では小雨が静かに打ちつけている。",
      ko: "방 안은 마야의 침대 옆 조명만 희미하게 켜져 있다. 창밖에서는 가벼운 빗소리가 잔잔하게 들려온다.",
    }),
  ),
  narrate(
    tx({
      id: "Arka tertidur di kursi belajar Maya, tubuhnya menunduk dengan kepala bersandar di meja. Di layar laptop Maya yang masih menyala, tampak balasan dari dosennya yang mengizinkan Maya absen ujian karena sakit.",
      en: "Arka is asleep in Maya's desk chair, slumped forward with his head resting on the table. On Maya's still-lit laptop screen, a reply from her lecturer confirms she's been allowed to miss the exam because of illness.",
      ja: "アルカはマヤの勉強机の椅子で眠っていた。前かがみになり、頭を机に預けている。まだ点いたままのマヤのノートパソコンには、体調不良で試験欠席を認める講師からの返信が表示されていた。",
      ko: "아르카는 마야의 책상 의자에 앉은 채 잠들어 있다. 몸을 앞으로 숙이고 머리를 책상에 기댄 자세다. 아직 켜져 있는 노트북 화면에는 병결로 시험 결석을 허락한다는 교수의 답장이 떠 있다.",
    }),
  ),
  narrate(
    tx({
      id: "Maya perlahan membuka matanya. Napasnya kini jauh lebih teratur dan demamnya sudah turun. Dia melihat sekeliling sampai akhirnya pandangannya jatuh pada Arka.",
      en: "Maya slowly opens her eyes. Her breathing is far more steady now, and her fever has gone down. She looks around the room until her gaze lands on Arka.",
      ja: "マヤはゆっくりと目を開ける。呼吸はかなり落ち着き、熱も下がっていた。部屋を見回し、その視線はやがてアルカに止まる。",
      ko: "마야는 천천히 눈을 뜬다. 숨결은 훨씬 고르고 열도 많이 내렸다. 방 안을 둘러보다가 시선이 아르카에게 멈춘다.",
    }),
  ),
  narrate(
    tx({
      id: "Kompres di dahinya sudah mulai kering. Di nakas sebelah tempat tidur, ada semangkuk bubur yang ditutup rapat dan beberapa obat yang sudah disiapkan.",
      en: "The compress on her forehead has already dried. On the bedside table, there's a sealed bowl of porridge and several packs of medicine waiting for her.",
      ja: "額の冷却タオルはもう乾きかけている。ベッド脇のテーブルには、蓋をしたおかゆと数種類の薬が用意されていた。",
      ko: "이마 위의 찜질 수건은 이미 말라 있다. 침대 옆 탁자에는 뚜껑이 덮인 죽 한 그릇과 여러 약이 준비돼 있다.",
    }),
  ),
  say(
    "maya",
    "sad",
    tx({
      id: "Arka...?",
      en: "Arka...?",
      ja: "アルカ…？",
      ko: "아르카...?",
    }),
    { voice: mayaDay1To4Voices[22] },
  ),
  narrate(
    tx({
      id: "Begitu mendengar namanya dipanggil, Arka langsung terbangun. Dia mengusap wajahnya sebentar buat mengusir kantuk, lalu cepat-cepat mendekat ke kasur.",
      en: "The moment he hears his name, Arka wakes up. He rubs his face for a second to shake off the sleep, then quickly moves to the bed.",
      ja: "名前を呼ばれた瞬間、アルカはすぐに目を覚ました。軽く顔をこすって眠気を払い、そのまま急いでベッドのそばへ向かう。",
      ko: "자신의 이름이 들리자 아르카는 곧바로 눈을 뜬다. 잠을 깨려고 얼굴을 한 번 쓸어내리고는 바로 침대 쪽으로 다가간다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Udah bangun? Kepalanya gimana? Masih berat?",
      en: "You're up? How's your head? Still feel bad?",
      ja: "起きたか？ 頭はどうだ、まだつらいか？",
      ko: "일어났어? 머리는 어때? 아직 힘들어?",
    }),
  ),
  say(
    "maya",
    "calm",
    tx({
      id: "Udah mendingan banget. Badanku juga nggak sepanas tadi. Kamu... dari tadi di sini terus?",
      en: "A lot better. I don't feel that hot anymore. You... stayed here the whole time?",
      ja: "だいぶ楽になった。もうさっきほど熱くないし。あなた…ずっとここにいたの？",
      ko: "훨씬 나아졌어. 몸도 아까처럼 뜨겁지 않아. 너... 계속 여기 있었어?",
    }),
    { voice: mayaDay1To4Voices[23] },
  ),
  narrate(
    tx({
      id: "Arka mengambil termometer dari nakas dan memeriksa suhu Maya sekali lagi.",
      en: "Arka takes the thermometer from the bedside table and checks Maya's temperature again.",
      ja: "アルカはベッド脇の体温計を手に取り、もう一度マヤの熱を測る。",
      ko: "아르카는 침대 옆에 있던 체온계를 집어 들고 다시 마야의 열을 확인한다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Nggak mungkin aku ninggalin orang dengan demam setinggi itu sendirian. Emailmu juga udah aman. Aku lampirin surat dari klinik bawah, dan dosenmu bilang kamu bisa ikut ujian susulan minggu depan.",
      en: "No way I was leaving someone with a fever that high alone. I handled your email too. I attached a note from the clinic downstairs, and your lecturer said you can take the makeup exam next week.",
      ja: "あんな高熱のやつを一人にできるわけないだろ。メールの件も片付けておいた。下のクリニックの診断メモも添えたし、講師からは来週追試を受けていいって返事が来てる。",
      ko: "그렇게 열이 높은 사람을 혼자 둘 순 없지. 메일도 내가 처리했어. 아래층 클리닉 진료 확인서도 첨부했고, 교수님이 다음 주에 추가 시험 볼 수 있다고 했어.",
    }),
  ),
  narrate(
    tx({
      id: "Maya menatap Arka cukup lama. Matanya kembali berkaca-kaca, tapi kali ini bukan karena tertekan. Kali ini karena lega.",
      en: "Maya stares at Arka for a long moment. Her eyes start to well up again, but this time it isn't from pressure. It's relief.",
      ja: "マヤはしばらくのあいだアルカを見つめる。再び目に涙がにじむが、今度は追い詰められたからじゃない。安堵のせいだ。",
      ko: "마야는 한동안 아르카를 바라본다. 눈가가 다시 젖어 오르지만, 이번에는 압박 때문이 아니다. 안도감 때문이다.",
    }),
  ),
  narrate(
    tx({
      id: "Baru sekarang Maya benar-benar sadar kalau Arka yang mengurus semuanya untuknya. Hal-hal yang mungkin bahkan ayahnya sendiri belum tentu mau lakukan.",
      en: "It finally hits her that Arka took care of everything for her, the kind of thing even her own father probably wouldn't have bothered to do.",
      ja: "そのときになってようやく、アルカが全部自分のために動いてくれたのだと実感する。たぶん、実の父親でさえそこまでしてくれないようなことを。",
      ko: "그제야 마야는 아르카가 자신을 위해 모든 걸 챙겼다는 사실을 실감한다. 어쩌면 친아버지도 해주지 않았을 일들까지.",
    }),
  ),
  say(
    "maya",
    "sad",
    tx({
      id: "Aku sampai nggak tahu harus bilang apa. Kalau tadi siang kamu nggak maksa aku berhenti... mungkin aku udah pingsan di jalan. Makasih banyak, Arka. Serius.",
      en: "I don't even know what to say. If you hadn't stopped me this afternoon... I probably would've collapsed on the way there. Thank you, Arka. Really.",
      ja: "もう、何て言えばいいかもわからない。あのとき止めてくれなかったら…たぶん途中で倒れてた。本当にありがとう、アルカ。",
      ko: "무슨 말을 해야 할지도 모르겠어. 오늘 오후에 네가 날 막지 않았으면... 가는 길에 쓰러졌을 거야. 정말 고마워, 아르카.",
    }),
    { voice: mayaDay1To4Voices[24] },
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Santai saja. Buburnya dimakan dulu selagi masih hangat, habis itu minum obat. Besok pagi pasti badanmu lebih enak.",
      en: "No worries. Eat the porridge while it's still warm, then take your medicine. You'll feel better by tomorrow morning.",
      ja: "どういたしまして。おかゆ、まだ温かいうちに食べて、それから薬を飲め。明日の朝にはもっと楽になってるはずだ。",
      ko: "천만에. 죽 아직 따뜻할 때 먹고 약도 마셔. 내일 아침이면 훨씬 괜찮아질 거야.",
    }),
  ),
  narrate(
    tx({
      id: "Arka membantu Maya makan beberapa suap bubur dan minum obat. Setelah selesai, dia merapikan nakas lalu meraih jaketnya.",
      en: "Arka helps Maya eat a few spoonfuls of porridge and take her medicine. Once she's done, he tidies up the bedside table and reaches for his jacket.",
      ja: "アルカはマヤに何口かおかゆを食べさせ、薬も飲ませる。全部済むと、ベッド脇のテーブルを片づけてからジャケットに手を伸ばした。",
      ko: "아르카는 마야가 죽을 몇 숟갈 먹고 약을 먹는 걸 도와준다. 다 끝나자 침대 옆 탁자를 정리하고 재킷을 챙긴다.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Oke. Suhu badanmu udah normal, jadi aku balik ke unit dulu ya. Udah malam juga. Kalau butuh apa-apa, atau demamnya naik lagi, langsung telepon aku. Serius.",
      en: "Alright. Your temperature's back to normal, so I'm gonna head back to my place. It's late. If you need anything, or if the fever comes back, call me. Seriously.",
      ja: "よし。熱も平熱に戻ったし、俺は一度部屋に戻る。もう遅いしな。何かあったら、熱がまた上がったらすぐ電話しろ。ほんとに。",
      ko: "좋아. 체온도 정상으로 돌아왔으니까 난 일단 내 방으로 갈게. 시간도 늦었고. 뭐 필요하거나 다시 열 오르면 바로 전화해. 진짜로.",
    }),
  ),
  narrate(
    tx({
      id: "Saat Arka berbalik hendak menuju pintu, Maya tiba-tiba menarik ujung bajunya dengan tangan yang masih sedikit gemetar.",
      en: "Just as Arka turns to walk toward the door, Maya suddenly grabs the edge of his shirt with a hand that's still trembling slightly.",
      ja: "アルカがドアへ向かおうとしたそのとき、まだ少し震える手でマヤが服の裾をつかんだ。",
      ko: "아르카가 문 쪽으로 돌아서려는 순간, 아직 조금 떨리는 손으로 마야가 그의 옷자락을 붙잡는다.",
    }),
  ),
  say(
    "maya",
    "blush",
    tx({
      id: "Arka... jangan pergi, bisa?",
      en: "Arka... can you stay?",
      ja: "アルカ…行かないで、だめ？",
      ko: "아르카... 가지 말아줄래?",
    }),
    { voice: mayaDay1To4Voices[25] },
  ),
  say(
    "arka",
    "surprised",
    tx({
      id: "Ada apa?",
      en: "What is it?",
      ja: "どうした？",
      ko: "왜 그래?",
    }),
  ),
  say(
    "maya",
    "blush",
    tx({
      id: "Aku... takut. Kalau aku sendirian malam ini, aku pasti kepikiran Papa lagi. Aku takut besok pagi dia nelepon terus marah-marah. Tolong... temani aku malam ini. Di sini.",
      en: "I'm... scared. If I'm alone tonight, I'm just gonna start thinking about my dad again. I'm scared he'll call tomorrow morning and start yelling at me. Please... stay with me tonight. Here.",
      ja: "私…怖いの。今夜ひとりだったら、またお父さんのことばっかり考えちゃう。明日の朝、電話してきて怒鳴られるのも怖い。お願い…今夜だけ、ここにいて。",
      ko: "나... 무서워. 오늘 밤 혼자 있으면 또 아빠 생각만 할 것 같아. 내일 아침 전화해서 또 화낼까 봐 무서워. 부탁이야... 오늘 밤만 여기 있어줘.",
    }),
    { voice: mayaDay1To4Voices[26] },
  ),
  narrate(
    tx({
      id: "Maya menggeser tubuhnya sedikit ke sisi kasur, meninggalkan ruang kosong di sebelahnya. Gerakannya kecil, tapi terasa sangat rapuh untuk seseorang yang selama ini berusaha menahan semuanya sendirian.",
      en: "Maya shifts a little to one side of the bed, leaving an empty space beside her. It's such a small movement, but it feels painfully vulnerable coming from someone who's been trying so hard to keep everything locked up inside.",
      ja: "マヤはベッドの片側へ少し体を寄せ、隣に空いた場所を作る。ほんの小さな仕草なのに、ずっと一人で抱え込もうとしてきた彼女が見せるにはあまりにも無防備だった。",
      ko: "마야는 침대 한쪽으로 몸을 조금 옮겨 옆에 빈자리를 만든다. 아주 작은 움직임이지만, 늘 혼자서 다 버티려 했던 사람에게서 나오기엔 너무나도 연약한 몸짓이다.",
    }),
  ),
  narrate(
    tx({
      id: "Tatapan matanya malam ini bukan minta obat. Dia cuma minta rasa aman.",
      en: "That look in her eyes isn't asking for medicine. It's asking for safety.",
      ja: "今の彼女の目が求めているのは薬じゃない。安心できる場所だ。",
      ko: "지금 그녀의 눈빛이 원하는 건 약이 아니다. 그저 안심할 수 있는 누군가다.",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Arka menghembuskan napas pelan lalu menaruh kembali jaketnya ke kursi.",
      en: "Arka lets out a quiet breath and sets his jacket back on the chair.",
      ja: "アルカは小さく息を吐き、手に取ったジャケットをもう一度椅子へ戻した。",
      ko: "아르카는 조용히 숨을 내쉬고, 들고 있던 재킷을 다시 의자 위에 둔다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Geser dikit. Kasurmu sempit.",
      en: "Scoot over a bit. Your bed's tiny.",
      ja: "少し詰めろ。お前のベッド、狭いから。",
      ko: "조금만 비켜. 네 침대 너무 좁아.",
    }),
  ),
  narrate(
    tx({
      id: "Maya meraih Arka dan menariknya ke atas kasur.",
      en: "Maya reaches for Arka and pulls him toward the bed.",
      ja: "マヤはアルカの腕をつかみ、そのままベッドへ引き寄せた。",
      ko: "마야는 아르카를 붙잡아 그대로 침대 쪽으로 끌어당긴다.",
    }),
  ),
  cutScene(
    mayaBed1,
    true,
    tx({
      id: "Maya memeluk Arka dengan erat di kasur. Tubuhnya masih sedikit gemetar, tapi kali ini bukan karena demam. Dia hanya butuh seseorang yang bisa membuatnya merasa aman, dan malam ini orang itu adalah Arka.",
      en: "Maya hugs Arka tightly on the bed. Her body is still trembling slightly, but this time it's not from the fever. She just needs someone who can make her feel safe, and tonight that person is Arka.",
      ja: "マヤはベッドでアルカをしっかりと抱きしめる。体はまだ少し震えているが、今度は熱のせいではない。ただ安心できる誰かが必要で、今夜その相手はアルカだった。",
      ko: "마야는 침대에서 아르카를 꼭 껴안는다. 몸은 아직 조금 떨리지만, 이번엔 열 때문이 아니다. 그저 안심할 수 있는 누군가가 필요했고, 오늘 밤 그 사람은 아르카였다.",
    }),
  ),
  cutScene(
    mayaBed2,
    true,
    tx({
      id: "Kehangatan tubuh Arka perlahan menenangkan Maya. Napasnya yang tadinya tersendat mulai teratur. Untuk pertama kalinya dalam beberapa hari ini, dia merasa bisa benar-benar beristirahat.",
      en: "The warmth of Arka's body slowly calms Maya down. Her breathing, which had been uneven, begins to steady. For the first time in days, she feels like she can truly rest.",
      ja: "アルカの体温がマヤを少しずつ落ち着かせていく。乱れていた呼吸も整い始める。ここ数日で初めて、本当に休めると感じた。",
      ko: "아르카의 체온이 천천히 마야를 진정시킨다. 불규칙하던 숨결이 점차 고르게 돌아온다. 며칠 만에 처음으로 진정으로 쉴 수 있을 것 같다.",
    }),
  ),
  cutScene(
    mayaBed3,
    true,
    tx({
      id: "Di tengah kegelapan malam, pelukan mereka semakin erat. Maya membenamkan wajahnya di dada Arka, merasakan detak jantungnya yang teratur. Suara hujan di luar jendela menjadi latar yang menenangkan untuk malam yang panjang ini.",
      en: "In the darkness of the night, their embrace grows tighter. Maya buries her face in Arka's chest, feeling his steady heartbeat. The sound of rain outside the window becomes a soothing backdrop for this long night.",
      ja: "夜の闇の中、二人の抱擁はさらに強くなる。マヤはアルカの胸に顔を埋め、規則正しい鼓動を感じる。窓の外の雨音が、この長い夜の心地よい背景になっていた。",
      ko: "밤의 어둠 속에서 두 사람의 포옹은 더욱 깊어진다. 마야는 아르카의 가슴에 얼굴을 묻고 그의 고른 심장박동을 느낀다. 창밖의 빗소리가 이 긴 밤의 편안한 배경이 된다.",
    }),
  ),
  cutScene(
    mayaBed4,
    true,
    tx({
      id: "Malam itu, di kamar sempit Unit 301, dua orang yang sama-sama terluka saling menghangatkan. Tidak ada kata-kata lagi. Hanya keheningan yang nyaman, dan perasaan bahwa mereka tidak sendirian.",
      en: "That night, in the cramped room of Unit 301, two wounded souls warm each other. No more words are needed. Just a comfortable silence, and the feeling that they're not alone.",
      ja: "その夜、301号室の狭い部屋で、傷ついた二人は互いに温め合った。もう言葉はいらない。ただ心地よい静寂と、一人じゃないという実感だけがあった。",
      ko: "그날 밤, 301호의 좁은 방에서 상처받은 두 사람은 서로를 따뜻하게 감싼다. 더 이상 말은 필요 없다. 편안한 침묵과, 혼자가 아니라는 느낌만이 있을 뿐이다.",
    }),
    true,
  ),
  jump("day4-complate"),
];
