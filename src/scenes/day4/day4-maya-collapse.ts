import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  blackScreen,
  bg,
  centeredText,
  clearBlackScreen,
  hide,
  jump,
  jumpIf,
  menu,
  multiCutScene,
  minigame,
  narrate,
  say,
  scene,
  setFlag,
  show,
  cutScene,
} from "@/scenes/scriptTypes";
import hallwayUrl from "@/background/hallway.png";
import hospitalUrl from "@/background/hospital.png";
import mayaBedroomUrl from "@/background/maya-bedroom.png";
import mayaBedroomNightUrl from "@/background/maya-bedroom-night.png";
import mayaCollapseUrl from "@/background/maya-collapse.png";
import mayaBed1 from "@/cut-scene/maya-bed-1.webm?url";
import mayaBedSound1 from "@/voice/maya/maya-bed-1.wav";
import mayaBed2 from "@/cut-scene/maya-bed-2.webm?url";
import mayaBedSound2 from "@/voice/maya/maya-bed-2.wav";
import mayaBed3 from "@/cut-scene/maya-bed-3.webm?url";
import mayaBedSound3 from "@/voice/maya/maya-bed-3.wav";
import mayaBed4 from "@/cut-scene/maya-bed-4.webm?url";
import mayaBed5 from "@/cut-scene/maya-bed-5.webm?url";
import mayaBed6 from "@/cut-scene/maya-bed-6.webm?url";
import mayaBed7 from "@/cut-scene/maya-bed-7.webm?url";
import mayaBed8 from "@/cut-scene/maya-bed-8.webm?url";
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
  say(
    "arka",
    "serious",
    tx({
      id: "Ya udah, kalau kamu maksa. Aku pesanin taksi online sekarang biar kamu nggak usah jalan ke depan. Tunggu di bawah aja.",
      en: "Alright, if you're really forcing it. I'll book you a ride now so you don't have to walk out front. Just wait downstairs.",
      ja: "わかった、そこまで言うなら。今タクシーを呼ぶから、外まで歩かなくていい。下で待ってて。",
      ko: "알겠어, 그렇게까지 고집한다면. 지금 택시 부를게. 앞까지 걸어가지 말고 아래에서 기다려.",
    }),
  ),
  say(
    "maya",
    "sad",
    tx({
      id: "Makasih, Arka... aku jalan ke lift dulu.",
      en: "Thanks, Arka... I'll head to the elevator first.",
      ja: "ありがとう、アルカ…先にエレベーターの方へ行くね。",
      ko: "고마워, 아르카... 나 먼저 엘리베이터 쪽으로 갈게.",
    }),
  ),
  narrate(
    tx({
      id: "Maya memaksakan diri berjalan menyusuri lorong menuju lift. Langkahnya pelan dan tidak seimbang. Arka masih berdiri di depan pintu unitnya, menatap Maya dari belakang sambil memegang HP untuk memesan taksi.",
      en: "Maya forces herself down the hallway toward the elevator. Her steps are slow and unsteady. Arka stays by his apartment door, watching her from behind while holding his phone to book the ride.",
      ja: "マヤは無理やり廊下を進み、エレベーターへ向かう。足取りは遅く、ひどく不安定だった。アルカは自室のドアの前に立ったまま、タクシーを呼ぼうとスマホを持ち、彼女の背中を見つめている。",
      ko: "마야는 억지로 복도를 걸어 엘리베이터 쪽으로 향한다. 걸음은 느리고 불안정하다. 아르카는 자기 방 문 앞에 선 채, 택시를 부르려고 휴대폰을 들고 그녀의 뒷모습을 바라본다.",
    }),
  ),
  narrate(
    tx({
      id: "Saat Maya mengangkat tangannya yang gemetar untuk menekan tombol lift, tiba-tiba kakinya benar-benar kehilangan tenaga. Terdengar suara gedebuk keras saat tubuhnya ambruk dan kepalanya membentur lantai lorong.",
      en: "As Maya raises her trembling hand to press the elevator button, her legs suddenly give out completely. A heavy thud echoes through the hallway as her body collapses and her head hits the floor.",
      ja: "震える手を上げてエレベーターのボタンを押そうとした瞬間、マヤの足から完全に力が抜けた。体が崩れ落ち、頭が廊下の床にぶつかる鈍い音が響く。",
      ko: "마야가 떨리는 손을 들어 엘리베이터 버튼을 누르려는 순간, 다리에서 완전히 힘이 빠진다. 몸이 무너지며 머리가 복도 바닥에 부딪히는 둔탁한 소리가 울린다.",
    }),
  ),
  hide("maya-day4-hallway"),
  bg(
    mayaCollapseUrl,
    tx({
      id: "Maya Collapses",
      en: "Maya Collapses",
      ja: "マヤが倒れる",
      ko: "마야가 쓰러진다",
    }),
    {
      backgroundAnimation: {
        zoom: 1.08,
        panX: 8,
        panY: 0,
        duration: 14,
      },
      transitionDuration: 900,
    },
  ),
  say(
    "arka",
    "surprised",
    tx({
      id: "Maya!!",
      en: "Maya!!",
      ja: "マヤ!!",
      ko: "마야!!",
    }),
  ),
  narrate(
    tx({
      id: "Arka melempar HP-nya dan langsung berlari kencang. Dia berjongkok di samping Maya dan membalikkan tubuhnya. Gadis itu sudah tidak sadarkan diri, wajahnya seputih kertas dan suhu badannya sangat panas.",
      en: "Arka throws his phone aside and sprints toward her. He drops to his knees beside Maya and turns her over. She's already unconscious, her face paper-white and her body burning hot.",
      ja: "アルカはスマホを放り投げ、全力で駆け寄った。マヤのそばに膝をつき、体を仰向けにする。彼女はすでに意識を失っていて、顔は紙のように白く、体はひどく熱かった。",
      ko: "아르카는 휴대폰을 내던지고 곧장 달려간다. 마야 옆에 무릎을 꿇고 그녀의 몸을 돌려 눕힌다. 그녀는 이미 의식을 잃었고, 얼굴은 종이처럼 창백하며 몸은 불덩이처럼 뜨겁다.",
    }),
  ),
  hide("maya-day4-hallway"),
  hide("arka-day4-hallway"),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", "", 5000),
  centeredText(
    tx({
      id: "Nurutin kemauan dia ternyata jadi keputusan paling bodohku. Baru aja mau mencet tombol lift, dia langsung ambruk. Aku panik setengah mati bawa dia ke IGD.",
      en: "Going along with what she wanted turned out to be the stupidest decision I could've made. She was just about to press the elevator button when she collapsed. I nearly lost my mind getting her to the ER.",
      ja: "彼女の言う通りにしたのは、俺ができる中で一番愚かな判断だった。エレベーターのボタンを押そうとした瞬間、彼女は崩れ落ちた。救急外来へ連れていく間、俺は半分パニックだった。",
      ko: "그녀 뜻대로 해준 건 내가 할 수 있는 가장 멍청한 선택이었다. 엘리베이터 버튼을 누르려던 순간, 그녀는 그대로 쓰러졌다. 응급실로 데려가는 동안 나는 거의 정신이 나갈 뻔했다.",
    }),
    { size: "sub" },
  ),
  bg(
    hospitalUrl,
    tx({
      id: "Rumah Sakit - IGD",
      en: "Hospital - Emergency Room",
      ja: "病院 - 救急外来",
      ko: "병원 - 응급실",
    }),
  ),
  narrate(
    tx({
      id: "Dokter bilang dia tipes dan kelelahan parah. Sialnya, rumah sakit menghubungi bapaknya. Dia datang, menatapku sinis menuduh bawa pengaruh buruk, lalu langsung memindahkan Maya ke RS lain.",
      en: "The doctor said she had typhoid and severe exhaustion. The worst part was the hospital contacted her father. He showed up, looked at me like I was some bad influence, then immediately transferred Maya to another hospital.",
      ja: "医者は、彼女が腸チフスと重度の過労だと言った。最悪なことに、病院は彼女の父親へ連絡していた。彼は現れるなり、俺を悪影響を与えた相手みたいに冷たく睨み、そのままマヤを別の病院へ移した。",
      ko: "의사는 그녀가 장티푸스에 심한 과로까지 겹쳤다고 말했다. 최악인 건 병원이 그녀의 아버지에게 연락했다는 거다. 그는 나타나자마자 나를 나쁜 영향을 준 사람처럼 싸늘하게 노려보고는 곧바로 마야를 다른 병원으로 옮겼다.",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Bapaknya bilang Maya nggak akan pernah balik ke apartemen lagi. Ditarik pulang. Aku bahkan nggak sempat lihat dia sadar atau sekadar minta maaf.",
      en: "Her father said Maya would never come back to the apartment again. He was taking her home. I didn't even get to see her wake up, or even say I was sorry.",
      ja: "彼女の父親は、マヤはもう二度とアパートへ戻らないと言った。実家へ連れ戻すのだと。俺は、彼女が目を覚ますところを見ることも、謝ることさえできなかった。",
      ko: "그녀의 아버지는 마야가 다시는 아파트로 돌아오지 않을 거라고 말했다. 집으로 데려가겠다고. 나는 그녀가 깨어나는 모습도 보지 못했고, 미안하다는 말조차 하지 못했다.",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Kalau aja tadi siang aku lebih tegas maksa dia istirahat... mungkin ceritanya nggak bakal berakhir sekacau ini. Sekarang, kamar 301 bakal selamanya kosong.",
      en: "If only I'd been firmer this afternoon and forced her to rest... maybe things wouldn't have ended this badly. Now, Room 301 is going to stay empty forever.",
      ja: "もし昼間、もっと強く言って彼女を休ませていたら…こんな最悪な終わり方にはならなかったのかもしれない。今、301号室は永遠に空っぽのままだ。",
      ko: "오늘 오후에 내가 더 단호하게 그녀를 쉬게 했다면... 이렇게 엉망으로 끝나지는 않았을지도 모른다. 이제 301호는 영원히 비어 있을 것이다.",
    }),
    "arka",
  ),
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
      id: "Maya pingsan di lorong sebelum sempat berangkat, dibawa ke IGD, lalu dipindahkan dan ditarik pulang oleh ayahnya.",
      en: "Maya collapsed in the hallway before she could leave, was rushed to the ER, then was transferred away and taken home by her father.",
      ja: "マヤは出発する前に廊下で倒れ、救急外来へ運ばれ、その後父親に別の病院へ移されて実家へ連れ戻された。",
      ko: "마야는 출발하기도 전에 복도에서 쓰러져 응급실로 옮겨졌고, 이후 아버지에 의해 다른 병원으로 이송된 뒤 집으로 끌려갔다.",
    }),
    { size: "sub" },
  ),
];

export const day4MayaForceRestScene: VisualNovelCommand[] = [
  bg(
    mayaBedroomUrl,
    tx({
      id: "Unit 301 - Kamar Maya",
      en: "Unit 301 - Maya's Room",
      ja: "301号室 - マヤの部屋",
      ko: "301호 - 마야의 방",
    }),
  ),
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
  jumpIf("maya-love", "day4-complate", { value: 1 }),
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
  hide("maya-day4-bedroom", "fadeAway"),
  hide("arka-day4-bedroom", "fadeAway"),
  narrate(
    tx({
      id: "Maya meraih Arka dan menariknya ke atas kasur.",
      en: "Maya reaches for Arka and pulls him toward the bed.",
      ja: "マヤはアルカの腕をつかみ、そのままベッドへ引き寄せた。",
      ko: "마야는 아르카를 붙잡아 그대로 침대 쪽으로 끌어당긴다.",
    }),
  ),
  blackScreen(),
  say(
    "arka",
    "gentle",
    tx({
      id: "Maya, kamu masih masa pemulihan. Kamu yakin? Besok pagi kamu bisa nyesel.",
      en: "Maya, you're still recovering. Are you sure? You might regret this tomorrow morning.",
      ja: "マヤ、お前まだ回復中だぞ。本当にいいのか？明日の朝、後悔するかもしれないぞ。",
      ko: "마야, 너 아직 회복 중이야. 확실해? 내일 아침에 후회할 수도 있어.",
    }),
  ),
  say(
    "maya",
    "gentle",
    tx({
      id: "Aku nggak peduli soal besok. Malam ini... buat aku ngerasa kalau aku beneran hidup buat diriku sendiri, bukan buat ekspektasi Papa. Tolong, Arka...",
      en: "I don't care about tomorrow. Tonight... I just want to feel like I'm living for myself, not for Papa's expectations. Please, Arka...",
      ja: "明日のことはどうでもいい。今夜だけは... 私が本当に自分のために生きているような気がしたい。お願い、アルカ...",
      ko: "내일은 아무것도 신경 쓰지 않아. 오늘 밤만... 내가 정말 나 자신을 위해 살아가는 것 같은 느낌이 들고 싶어. 부탁해, 아르카...",
    }),
  ),
  clearBlackScreen(),
  cutScene(mayaBed1, true, undefined, undefined, mayaBedSound1),
  cutScene(mayaBed2, true, undefined, undefined, mayaBedSound2),
  cutScene(mayaBed3, true, undefined, undefined, mayaBedSound3),
  multiCutScene(
    [
      {
        id: "maya-bed-4",
        label: tx({
          id: "Gaya 1",
          en: "Style 1",
          ja: "スタイル1",
          ko: "스타일1",
        }),
        src: mayaBed4,
        loop: true,
        narrate: tx({
          id: "Arka: Niat awalku malam ini cuma murni mau jadi sandaran biar dia bisa tidur tenang. Nggak ada niat buat ngambil kesempatan waktu dia lagi rapuh-rapuhnya begini.",
          en: "Arka: My initial intention tonight was simply to be a support so she could sleep peacefully. I had no intention of taking advantage of her while she's in such a fragile state.",
          ja: "アルカ：今夜の俺の本来の意図は、ただ彼女が安心して眠れるように支えになることだけだった。こんなに脆弱な状態の彼女につけ込むつもりなんて全くなかった。",
          ko: "아르카: 오늘 밤 내 원래 의도는 순수하게 그녀가 편안히 잠들 수 있도록 의지가 되어주는 것뿐이었어. 그녀가 이렇게 취약한 상태일 때 기회를 이용할 생각은 전혀 없었어.",
        }),
      },
      {
        id: "maya-bed-5",
        label: tx({
          id: "Gaya 2",
          en: "Style 2",
          ja: "スタイル2",
          ko: "스타일2",
        }),
        src: mayaBed5,
        loop: false,
        narrate: tx({
          id: "Tapi batas antara rasa peduli, kasihan, dan hasrat ternyata tipis banget. Apalagi waktu dia natap aku kayak gitu. Tatapan orang yang lagi nyari pelampung di tengah badai, dan dia milih aku buat jadi pelampungnya.",
          en: "But the line between care, pity, and desire is surprisingly thin. Especially when she looks at me like that. The look of someone desperately seeking a lifeline in the middle of a storm, and she chose me to be her lifeline.",
          ja: "でも、思いやりと同情と欲望の境界線は驚くほど薄い。特に彼女があんな風に俺を見つめる時は。嵐の中で必死に救命具を探している人の眼差し、そして彼女は俺をその救命具に選んだ。",
          ko: "하지만 배려와 동정, 그리고 욕망 사이의 경계선은 놀라울 정도로 얇다. 특히 그녀가 나를 그렇게 바라볼 때는. 폭풍 속에서 필사적으로 구명줄을 찾는 사람의 눈빛, 그리고 그녀는 나를 그 구명줄로 선택했다.",
        }),
      },
      {
        id: "maya-bed-6",
        label: tx({
          id: "Gaya 3",
          en: "Style 3",
          ja: "スタイル3",
          ko: "스타일3",
        }),
        src: mayaBed6,
        loop: true,
        narrate: tx({
          id: "Tangan yang biasanya selalu tegang pegang buku tebal atau gemetar karena takut dimarahi bapaknya... malam ini meluk punggungku erat banget. Seolah aku satu-satunya hal nyata yang bisa dia pegang dan dia percaya.",
          en: "The hands that are usually tense holding thick books or trembling from fear of her father's anger... tonight they hold my back so tightly. As if I'm the only real thing she can hold onto and trust.",
          ja: "いつもは分厚い本を握りしめて緊張していたり、父親に叱られる恐怖で震えていたりする手が...今夜は俺の背中を強く抱きしめている。まるで俺が彼女が掴んで信じられる唯一の現実であるかのように。",
          ko: "평소에는 두꺼운 책을 쥐며 긴장하거나 아버지에게 혼날까 봐 떨고 있던 손이... 오늘 밤은 내 등을 너무나 꽉 껴안고 있다. 마치 내가 그녀가 붙잡고 믿을 수 있는 유일한 현실인 것처럼.",
        }),
      },
      {
        id: "maya-bed-7",
        label: tx({
          id: "Gaya 4",
          en: "Style 4",
          ja: "スタイル4",
          ko: "스타일4",
        }),
        src: mayaBed7,
        loop: true,
        narrate: tx({
          id: "Nggak ada lagi Maya si mahasiswi kedokteran yang kaku dan tertutup. Di bawah lampu remang ini, dia cuma perempuan biasa yang butuh validasi kalau dia itu berharga. Dan entah kenapa, ngasih dia rasa aman itu... ngasih aku kepuasan yang nggak bisa dijelasin.",
          en: "No more of that stiff, closed-off med student Maya. Under this dim light, she's just an ordinary girl who needs validation that she's worth something. And somehow, giving her that sense of safety... it gives me a satisfaction I can't explain.",
          ja: "もう堅苦しくて閉ざされた医学生のマヤはいない。この薄暗い明かりの下で、彼女はただ自分に価値があると認めてもらいたい普通の女の子だ。そしてなぜか、彼女に安心感を与えること...それが俺に説明できない満足感を与えてくれる。",
          ko: "이제 딱딱하고 폐쇄적인 의대생 마야는 없다. 이 희미한 불빛 아래에서, 그녀는 그저 자신이 가치 있다는 확인이 필요한 평범한 여자일 뿐이다. 그리고 왠지, 그녀에게 안정감을 주는 것... 그게 나한테 설명할 수 없는 만족감을 준다.",
        }),
      },
      {
        id: "maya-bed-8",
        label: tx({
          id: "Gaya 5",
          en: "Style 5",
          ja: "スタイル5",
          ko: "스타일5",
        }),
        src: mayaBed8,
        loop: false,
        narrate: tx({
          id: "Malam ini kita ngelewatin batas yang nggak bakal bisa ditarik mundur lagi. Besok pagi pas matahari terbit, hubungan kita sebagai sekadar 'tetangga sebelah' resmi selesai.",
          en: "Tonight we're crossing a line that can't be pulled back. Tomorrow morning when the sun rises, our relationship as just 'neighbors next door' is officially over.",
          ja: "今夜、俺たちは引き返せない一線を越える。明日の朝、太陽が昇る時、俺たちの「ただの隣人」としての関係は正式に終わる。",
          ko: "오늘 밤 우리는 되돌릴 수 없는 선을 넘는다. 내일 아침 해가 뜨면, 우리의 그저 '옆집 이웃' 관계는 공식적으로 끝난다.",
        }),
      },
    ],
    "maya-bed-3",
  ),
  jump("day4-complate"),
];
