import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  narrate,
  say,
  show,
  menu,
  jump,
  setFlag,
  cutScene,
  hide,
  playBgm,
} from "@/scenes/scriptTypes";
import hallwayUrl from "@/background/hallway.png";
import mayaBedroomUrl from "@/background/maya-bedroom.png";
import mayaPhoneCallVideo from "@/cut-scene/cutscene-maya-room.webm?url";
import { mayaDay1To4Voices } from "@/voice/maya/day1to4";
import day3Bgm from "@/music/day3.mp3";

export const mayaPhoneCallScene: VisualNovelCommand[] = [
  playBgm(day3Bgm),
  bg(
    hallwayUrl,
    tx({
      id: "Apartment 69 - Lorong",
      en: "Apartment 69 - Hallway",
      ja: "Apartment 69 - 廊下",
      ko: "Apartment 69 - 복도",
    }),
  ),

  narrate(
    tx({
      id: "Aku baru aja mau berangkat ke kampus pas denger ribut-ribut dari kamar Maya. Pintunya juga kebuka sedikit.",
      en: "I was literally about to head out to campus when I heard something going on in Maya's room. Her door's cracked open too.",
      ja: "ちょうど大学に出ようとしたとき、マヤの部屋の方から何か物音が聞こえた。ドアも少し開いてる。",
      ko: "막 학교 가려고 나서려던 참에 마야 방에서 뭔가 소란스러운 소리가 들렸다. 문도 살짝 열려 있다.",
    }),
    "arka",
  ),

  narrate(
    tx({
      id: "Suara di telepon: \"...Papa nggak mau dengar alasan soal laptop rusak atau apa pun itu. Kamu ke sana buat belajar! Kalau ujian anatomi besok sampai gagal, beres-beres dan pulang. Nggak usah kuliah lagi.\"",
      en: "Voice on the phone: \"...I don't want to hear excuses about broken laptops or whatever. You're there to study. If you mess up that anatomy exam tomorrow, pack your things and come home. No more college for you.\"",
      ja: "電話の向こうの声:「…壊れたノートパソコンだとか、そんな言い訳は聞きたくない。お前は勉強しに行ってるんだ。明日の解剖学の試験を落としたら荷物をまとめて帰ってこい。もう大学はやめだ。」",
      ko: "전화 속 목소리: \"...노트북이 고장 났다느니 하는 변명은 듣고 싶지 않다. 넌 거기 공부하러 간 거야. 내일 해부학 시험 망치면 짐 싸서 집에 와. 대학은 끝이야.\"",
    }),
  ),

  narrate(
    tx({
      id: "Maya: (suaranya gemetar) \"I-iya, Pa... aku ngerti. Aku bakal belajar lebih giat. Maaf...\"",
      en: "Maya: (voice shaking) \"Y-yeah, Dad... I get it. I'll try harder. I'm sorry...\"",
      ja: "マヤ:（声を震わせながら）「う、うん…お父さん。わかった。もっと頑張る。ごめんなさい…」",
      ko: "마야: (목소리가 떨리며) \"ㅇ, 응 아빠... 알겠어. 더 열심히 할게. 미안해...\"",
    }),
  ),

  narrate(
    tx({
      id: "(Klik. Sambungan telepon terputus. Hening sesaat, lalu... terdengar isak tangis yang ditahan. Arka diam di lorong, mencerna semua yang dia dengar, sebelum akhirnya mengetuk pintu itu pelan.)",
      en: "(Click. The call ends. A beat of silence, then... muffled sobbing. Arka just stands there in the hallway for a second, processing what he heard before finally knocking softly.)",
      ja: "（プツッ。通話が切れる。少しの静寂のあと…押し殺した泣き声が聞こえた。アルカは廊下で立ち尽くし、今の会話を飲み込んでから、そっとドアをノックした。）",
      ko: "(뚝. 통화가 끊긴다. 잠깐의 정적, 그리고... 참으려는 울음소리가 새어 나온다. 아르카는 복도에 잠시 멈춰 서서 방금 들은 말을 곱씹다가, 결국 조심스럽게 문을 두드린다.)",
    }),
  ),

  narrate(
    tx({
      id: "Pantesan aja dia stres banget. Tekanan dari bapaknya gila sih. Nggak enak rasanya kalau aku pura-pura nggak dengar apa-apa terus pergi begitu aja.",
      en: "No wonder she's so stressed. The pressure from her dad is insane. Feels messed up to just pretend I didn't hear any of that and walk away.",
      ja: "そりゃあんなに追い詰められてるわけだ。父親からのプレッシャーがひどすぎる。聞かなかったふりしてそのまま立ち去るのは、さすがに違う気がする。",
      ko: "저렇게 스트레스받는 것도 무리가 아니다. 아버지 압박이 너무 심하다. 못 들은 척하고 그냥 가버리는 건 좀 아니다.",
    }),
    "arka",
  ),

  show("arka-hallway", "arka", "serious", {
    position: "left",
    enterFrom: "left",
  }),

  say(
    "arka",
    "gentle",
    tx({
      id: "Maya? Eh, maaf... pintumu kebuka sedikit.",
      en: "Maya? Uh, sorry... your door was kinda open.",
      ja: "マヤ？ あー、ごめん…ドア、ちょっと開いてたから。",
      ko: "마야? 어, 미안... 문이 조금 열려 있었어.",
    }),
  ),

  cutScene(mayaPhoneCallVideo),

  narrate(
    tx({
      id: "(Maya tampak kaget lalu cepat-cepat mengusap matanya dengan lengan baju. Dia berdiri di tengah kamar yang berantakan, berusaha tersenyum meski matanya masih merah.)",
      en: "(Maya looks startled and quickly wipes her eyes with her sleeve. She's standing in the middle of her messy room, trying to smile even though her eyes are still red.)",
      ja: "（マヤは驚いたように目を見開き、慌てて袖で涙を拭った。散らかった部屋の真ん中に立ちながら、目が真っ赤なまま無理に笑おうとしている。）",
      ko: "(마야는 놀란 듯 서둘러 소매로 눈가를 훔친다. 어질러진 방 한가운데 서서, 눈이 빨개진 채로 억지로 미소를 지어 보인다.)",
    }),
  ),

  show("maya-bedroom", "maya", "worried", {
    position: "center",
    enterFrom: "fade",
  }),

  say(
    "maya",
    "sad",
    tx({
      id: "Oh, Arka. Kamu belum berangkat? Maaf, aku lupa nutup pintunya rapat.",
      en: "Oh, Arka. You haven't left yet? Sorry, I forgot to close the door all the way.",
      ja: "あ、アルカ。まだ出てなかったんだ。ごめん、ドアちゃんと閉めるの忘れてた。",
      ko: "아, 아르카. 아직 안 나갔어? 미안, 문을 제대로 안 닫았네.",
    }),
    { voice: mayaDay1To4Voices[12] },
  ),

  bg(
    mayaBedroomUrl,
    tx({
      id: "Apartment 69 - Kamar Maya",
      en: "Apartment 69 - Maya's Bedroom",
      ja: "Apartment 69 - マヤの部屋",
      ko: "Apartment 69 - 마야의 방",
    }),
  ),

  say(
    "arka",
    "serious",
    tx({
      id: "Aku tadi nggak sengaja dengar. Bapakmu... emang selalu neken kamu segitunya?",
      en: "I kinda overheard what happened. Your dad... is he always that hard on you?",
      ja: "さっきの、少し聞こえちゃった。お父さんって…いつもあんなふうにきついのか？",
      ko: "아까 조금 들었어. 네 아버지... 원래 늘 그렇게까지 몰아붙이셔?",
    }),
  ),

  say(
    "maya",
    "sad",
    tx({
      id: "Iya, kurang lebih begitu. Papa maunya aku lulus kedokteran dengan nilai sempurna. Kadang capek banget, kayak aku cuma dianggap mesin belajar.",
      en: "Yeah, pretty much. He wants me to get through med school with perfect grades. Sometimes it's exhausting, like I'm only allowed to exist as some study robot.",
      ja: "うん、だいたいそんな感じ。お父さんは私に医学部を完璧な成績で卒業してほしいの。たまに本当にしんどい。勉強する機械としてしか見られてないみたいで。",
      ko: "응, 거의 그래. 아빠는 내가 의대를 완벽한 성적으로 졸업하길 바라거든. 가끔은 너무 지쳐. 내가 그냥 공부하는 기계로만 보이는 것 같아.",
    }),
    { voice: mayaDay1To4Voices[13] },
  ),

  menu(tx({
    id: "Bagaimana Arka menenangkan Maya?",
    en: "How does Arka calm Maya down?",
    ja: "アルカはどうやってマヤを落ち着かせる？",
    ko: "아르카는 어떻게 마야를 진정시킬까?",
  }), [
    {
      id: "logical",
      label: tx({
        id: "Pendekatan Logis",
        en: "Logical Approach",
        ja: "理性的に話す",
        ko: "논리적으로 달랜다",
      }),
      next: "maya-phone-call-logical",
    },
    {
      id: "empathy",
      label: tx({
        id: "Pendekatan Empati",
        en: "Empathy Approach",
        ja: "寄り添って話す",
        ko: "공감하며 달랜다",
      }),
      next: "maya-phone-call-empathy",
    },
  ]),
];

export const mayaPhoneCallLogicalScene: VisualNovelCommand[] = [
  say(
    "arka",
    "serious",
    tx({
      id: "Otakmu juga ada batasnya, tahu. Kalau dipaksa terus, ujung-ujungnya nge-freeze juga. Sama kayak laptopmu kemarin.",
      en: "Your brain's got limits too, you know. Push it too hard and it'll just freeze on you. Same thing your laptop did yesterday.",
      ja: "頭にも限界はあるんだよ。無理させすぎたら、昨日のノートパソコンみたいにフリーズする。",
      ko: "너 머리도 한계가 있어. 너무 몰아붙이면 결국 멈춰버려. 어제 네 노트북처럼.",
    }),
  ),

  narrate(
    tx({
      id: "(Maya terdiam, menatap Arka seperti kata-katanya masuk akal. Napasnya perlahan mulai tenang.)",
      en: "(Maya goes quiet, looking at Arka like that actually makes sense. Her breathing slowly starts to settle.)",
      ja: "（マヤは黙り込み、アルカの言葉を噛みしめるように見つめる。呼吸も少しずつ落ち着いていく。）",
      ko: "(마야는 잠시 말이 없다가, 아르카의 말이 정말 이해된다는 듯 그를 바라본다. 숨결도 조금씩 가라앉는다.)",
    }),
  ),

  say(
    "maya",
    "neutral",
    tx({
      id: "Kamu... ada benarnya. Aku memang udah capek banget. Mungkin aku emang perlu istirahat beneran, bukan belajar terus tiap saat.",
      en: "You... might actually be right. I've been running on fumes. Maybe I really do need some actual rest instead of cramming nonstop.",
      ja: "あなたの…言う通りかも。もうずっと限界で動いてた。徹夜で詰め込むより、ちゃんと休んだほうがいいのかもしれない。",
      ko: "네 말이... 맞는 것 같아. 나 진짜 한계였던 것 같아. 계속 억지로 공부만 할 게 아니라, 제대로 쉬어야 할지도 몰라.",
    }),
    { voice: mayaDay1To4Voices[14] },
  ),

  say(
    "arka",
    "gentle",
    tx({
      id: "Nah, itu dia. Mesin aja butuh istirahat. Kamu bukan robot, Maya.",
      en: "Exactly. Even machines need downtime. You're not a robot, Maya.",
      ja: "そういうこと。機械だって休む時間は必要だ。お前はロボットじゃないんだから、マヤ。",
      ko: "그래, 그거야. 기계도 쉬는 시간이 필요해. 넌 로봇이 아니잖아, 마야.",
    }),
  ),

  narrate(
    tx({
      id: "(Efek: Maya menyadari dirinya memang butuh istirahat, dan rasa hormatnya pada cara berpikir Arka meningkat.)",
      en: "(Effect: Maya realizes she really does need rest, and her respect for Arka's way of thinking goes up.)",
      ja: "（効果: マヤは自分に休息が必要だと気づき、アルカの考え方への信頼が少し強くなる。）",
      ko: "(효과: 마야는 자신에게 휴식이 필요하다는 걸 깨닫고, 아르카의 사고방식에 대한 신뢰가 높아진다.)",
    }),
  ),

  setFlag("maya-love", 1),
  setFlag("day3MayaMorningCompleted", true),
  hide("maya-bedroom"),
  hide("arka-hallway"),
  jump("day3-after-maya-phone"),
];

export const mayaPhoneCallEmpathyScene: VisualNovelCommand[] = [
  say(
    "arka",
    "gentle",
    tx({
      id: "Kalau kamu mau nangis dulu juga nggak apa-apa, Maya. Wajar kok stres kalau terus ditekan begitu. Kamu nggak harus nahan semuanya di depanku.",
      en: "It's okay if you need to cry first, Maya. Anyone would be stressed with that kind of pressure on them all the time. You don't have to hold it in around me.",
      ja: "泣きたいなら、先に泣いてもいいんだよ、マヤ。あんなふうにずっとプレッシャーをかけられてたら、しんどくなるのは当たり前だ。俺の前でまで我慢しなくていい。",
      ko: "울고 싶으면 먼저 울어도 괜찮아, 마야. 그런 식으로 계속 압박받으면 힘든 게 당연하지. 내 앞에서까지 참을 필요 없어.",
    }),
  ),

  narrate(
    tx({
      id: "(Mendengar itu, Maya akhirnya nggak bisa menahan tangisnya lagi. Arka melangkah mendekat, menepuk bahunya pelan dan membiarkannya tenang dengan caranya sendiri. Nggak ada kata-kata puitis, cuma hadir untuk seseorang yang lagi butuh sandaran.)",
      en: "(Hearing that, Maya finally breaks down. Arka steps closer, gently pats her shoulder, and lets her calm down at her own pace. No dramatic speech, just being there when she needs someone.)",
      ja: "（その言葉を聞いて、マヤはとうとう堪えきれず泣き出した。アルカはそっと近づき、肩を軽く叩きながら、彼女が自分のペースで落ち着くのを待つ。気の利いた台詞なんてない。ただ、必要なときにそばにいるだけだ。）",
      ko: "(그 말을 듣자 마야는 결국 울음을 터뜨린다. 아르카는 조용히 다가가 어깨를 가볍게 두드리며, 그녀가 스스로 진정할 때까지 곁에 있어 준다. 거창한 말은 없다. 그냥 누군가 필요할 때 옆에 있어 주는 것뿐이다.)",
    }),
  ),

  say(
    "maya",
    "sad",
    tx({
      id: "(Setelah sedikit tenang dan kembali mengusap matanya) Makasih, Arka. Maaf ya pagi-pagi udah bikin suasana begini.",
      en: "(After calming down a little and wiping her eyes again) Thanks, Arka. Sorry for getting this emotional first thing in the morning.",
      ja: "（少し落ち着いて、もう一度目元を拭いながら）ありがとう、アルカ。朝からこんなとこ見せてごめんね。",
      ko: "(조금 진정한 뒤 다시 눈가를 훔치며) 고마워, 아르카. 아침부터 이런 모습 보여서 미안해.",
    }),
    { voice: mayaDay1To4Voices[15] },
  ),

  say(
    "arka",
    "gentle",
    tx({
      id: "Santai aja. Mending keluarin daripada dipendem terus. Sana cuci muka dulu. Aku berangkat ke kampus ya. Kalau butuh apa-apa, tinggal chat.",
      en: "It's fine. Better to let it out than let it rot inside. Go wash your face. I'm heading to campus. If you need anything, just text me.",
      ja: "気にするな。溜め込むより、ちゃんと外に出したほうがいい。ほら、顔洗ってこい。俺は大学行くけど、何かあったら連絡しろよ。",
      ko: "괜찮아. 속으로만 삼키는 것보다 꺼내는 게 낫지. 가서 얼굴부터 씻어. 난 학교 가볼게. 뭐 필요하면 바로 연락해.",
    }),
  ),

  say(
    "maya",
    "blush",
    tx({
      id: "(Mengangguk pelan) Iya. Hati-hati di jalan.",
      en: "(Nods softly) Yeah. Be careful out there.",
      ja: "（小さくうなずく）うん。気をつけてね。",
      ko: "(작게 고개를 끄덕이며) 응. 조심히 가.",
    }),
    { voice: mayaDay1To4Voices[16] },
  ),

  narrate(
    tx({
      id: "(Efek: Maya merasa lebih aman dan tidak dihakimi, kedekatan emosional meningkat.)",
      en: "(Effect: Maya feels safer and less judged, and the emotional closeness between them grows.)",
      ja: "（効果: マヤは安心感を覚え、自分が責められていないと感じる。二人の感情的な距離が少し縮まる。）",
      ko: "(효과: 마야는 더 안전하다고 느끼고, 판단받지 않았다고 느낀다. 두 사람의 감정적 거리도 가까워진다.)",
    }),
  ),

  setFlag("maya-love", 2),
  setFlag("day3MayaMorningCompleted", true),
  hide("maya-bedroom"),
  hide("arka-hallway"),
  jump("day3-after-maya-phone"),
];
