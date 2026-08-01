import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  blackScreen,
  centeredText,
  clearBlackScreen,
  cutScene,
  hide,
  moveTo,
  multiCutScene,
  narrate,
  playSfx,
  say,
  scene,
  setFlag,
  show,
} from "@/scenes/scriptTypes";
import elenaHallwayOpenUrl from "@/background/elena-hallway-open.png";
import elenaBadroomUrl from "@/background/elena-badroom.png";
import bedroomNightUrl from "@/background/bedroom-night.png";
import knockSound from "@/sfx/knock.wav";
import { elenaDay7Voices } from "@/voice/elena/day7";
import elenaG1Url from "@/cut-scene/elena-g1.png";
import elenaG2Url from "@/cut-scene/elena-g2.png";
import elenaG3Url from "@/cut-scene/elena-g3.png";
import elenaSpecialScene1 from "@/cut-scene/elena-g2-1.webm";
import elenaSpecialScene1Sound from "@/voice/elena/elena-g2-1.wav";
import elenaSpecialScene2 from "@/cut-scene/elena-g2-2.webm";
import elenaSpecialScene2Sound from "@/voice/elena/elena-g2-2.wav";
import elenaSpecialScene3 from "@/cut-scene/elena-g2-3.webm";
import elenaSpecialScene3Sound from "@/voice/elena/elena-g2-3.wav";
import elenaSpecialScene4 from "@/cut-scene/elena-g2-4.webm";
import elenaSpecialScene4Sound from "@/voice/elena/elena-g2-4.wav";
import elenaSpecialScene5 from "@/cut-scene/elena-g2-5.webm";
import elenaSpecialScene5Sound from "@/voice/elena/elena-g2-5.wav";
import elenaSpecialSceneG3_1 from "@/cut-scene/elena-g3-1.webm";
import elenaSpecialSceneG3_1Sound from "@/voice/elena/elena-g3-1.wav";
import elenaSpecialSceneG3_2 from "@/cut-scene/elena-g3-2.webm";
import elenaSpecialSceneG3_2Sound from "@/voice/elena/elena-g3-2.wav";
import elenaSpecialSceneG3_3 from "@/cut-scene/elena-g3-3.webm";
import elenaSpecialSceneG3_3Sound from "@/voice/elena/elena-g3-3.wav";
import elenaSpecialSceneG3_4 from "@/cut-scene/elena-g4.webm";
import elenaSpecialSceneG3_4Sound from "@/voice/elena/elena-g4.wav";
import elenaSpecialSceneBadG1_1 from "@/cut-scene/elena-bad-g1-1.webm";
import elenaSpecialSceneBadG1_1Sound from "@/voice/elena/elena-bad-g1-1.wav";
import elenaSpecialSceneBadG1_2 from "@/cut-scene/elena-bad-g1-2.webm";
import elenaSpecialSceneBadG1_2Sound from "@/voice/elena/elena-bad-g1-2.wav";
import elenaSpecialSceneBadG1_3 from "@/cut-scene/elena-bad-g1-3.webm";
import elenaSpecialSceneBadG1_3Sound from "@/voice/elena/elena-bad-g1-3.wav";
import elenaSpecialSceneBadG2_1 from "@/cut-scene/elena-bad-g2-1.webm";
import elenaSpecialSceneBadG2_1Sound from "@/voice/elena/elena-bad-g2-1.wav";
import elenaSpecialSceneBadG2_2 from "@/cut-scene/elena-bad-g2-2.webm";
import elenaSpecialSceneBadG2_2Sound from "@/voice/elena/elena-bad-g2-2.wav";
import elenaSpecialSceneBadG2_3 from "@/cut-scene/elena-bad-g2-3.webm";
import elenaSpecialSceneBadG2_3Sound from "@/voice/elena/elena-bad-g2-3.wav";
import elenaSpecialSceneBadG2_4 from "@/cut-scene/elena-bad-g2-4.webm";
import elenaSpecialSceneBadG2_4Sound from "@/voice/elena/elena-bad-g2-4.wav";
import elenaSpecialSceneBadG3_1 from "@/cut-scene/elena-bad-g3-1.webm";
import elenaSpecialSceneBadG3_1Sound from "@/voice/elena/elena-bad-g3-1.wav";
import elenaSpecialSceneBadG3_2 from "@/cut-scene/elena-bad-g3-2.webm";
import elenaSpecialSceneBadG3_2Sound from "@/voice/elena/elena-bad-g3-2.wav";
import elenaSpecialSceneBadG3_3 from "@/cut-scene/elena-bad-g3-3.webm";
import elenaSpecialSceneBadG3_3Sound from "@/voice/elena/elena-bad-g3-3.wav";

export const day7ElenaGoodEndingScene: VisualNovelCommand[] = [
  hide("arka-day6-elena"),
  hide("elena-day6-arthur"),
  hide("arthur-day6-elena"),
  bg(
    elenaHallwayOpenUrl,
    tx({
      id: "Apartment 69 - Lorong Unit 303 - Malam Hari",
      en: "Apartment 69 - Unit 303 Hallway - Night",
      ja: "Apartment 69 - 303号室の廊下 - 夜",
      ko: "Apartment 69 - 303호 복도 - 밤",
    }),
  ),
  show("arka-day7-elena-good", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  narrate(
    tx({
      id: "Pintu unit 303 terbuka sedikit.",
      en: "The door to Unit 303 is slightly open.",
      ja: "303号室のドアが少し開いている。",
      ko: "303호 문이 조금 열려 있다.",
    }),
  ),
  narrate(
    tx({
      id: "Arka berdiri di depan pintu sambil membawa kopi pahit. Ia mengetuk pelan.",
      en: "Arka stands in front of the door carrying bitter coffee. He knocks softly.",
      ja: "アルカはブラックコーヒーを持ってドアの前に立ち、静かにノックした。",
      ko: "아르카는 쓴 커피를 들고 문 앞에 서서 조용히 노크한다.",
    }),
  ),
  playSfx(knockSound),
  say(
    "arka",
    "neutral",
    tx({
      id: "Elena?",
      en: "Elena?",
      ja: "エレナ？",
      ko: "엘레나?",
    }),
  ),
  show("elena-day7-elena-good", "elena", "neutral", {
    position: "center",
    enterFrom: "fade",
  }),
  say(
    "elena",
    "neutral",
    tx({
      id: "Masuk. Aku memang sengaja membuka pintunya.",
      en: "Come in. I left the door open on purpose.",
      ja: "入って。わざと開けておいたの。",
      ko: "들어와. 일부러 문을 열어둔 거야.",
    }),
    { voice: elenaDay7Voices[0] },
  ),
  bg(
    elenaBadroomUrl,
    tx({
      id: "Apartment 69 - Unit 303",
      en: "Apartment 69 - Unit 303",
      ja: "Apartment 69 - 303号室",
      ko: "Apartment 69 - 303호",
    }),
  ),
  narrate(
    tx({
      id: "Arka masuk. Elena duduk di sofa, lelah, dengan dokumen berserakan di meja. Tapi wajahnya tidak terlihat kalah.",
      en: "Arka enters. Elena is sitting on the sofa, tired, with documents scattered across the table. But her face does not look defeated.",
      ja: "アルカが入る。エレナはソファに座っていて、疲れている。テーブルには書類が散らばっている。それでも、その表情に敗北の色はない。",
      ko: "아르카가 들어간다. 엘레나는 지친 채 소파에 앉아 있고, 테이블 위에는 서류가 흩어져 있다. 하지만 얼굴에는 패배감이 보이지 않는다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Aku boleh masuk lebih jauh?",
      en: "May I come farther in?",
      ja: "もう少し奥まで入ってもいい？",
      ko: "더 안쪽으로 들어가도 돼?",
    }),
  ),
  narrate(
    tx({
      id: "Elena tersenyum tipis.",
      en: "Elena smiles faintly.",
      ja: "エレナはかすかに微笑む。",
      ko: "엘레나가 희미하게 웃는다.",
    }),
  ),
  say(
    "elena",
    "smile",
    tx({
      id: "Kamu masih bertanya?",
      en: "You are still asking?",
      ja: "まだ聞くの？",
      ko: "아직도 물어봐?",
    }),
    { voice: elenaDay7Voices[1] },
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Aku belajar.",
      en: "I am learning.",
      ja: "学んでるんだ。",
      ko: "배우는 중이야.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Masuk.",
      en: "Come in.",
      ja: "入って。",
      ko: "들어와.",
    }),
    { voice: elenaDay7Voices[2] },
  ),
  narrate(
    tx({
      id: "Arka meletakkan kopi di meja.",
      en: "Arka sets the coffee on the table.",
      ja: "アルカはコーヒーをテーブルに置いた。",
      ko: "아르카는 커피를 테이블 위에 내려놓는다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Kopi pahit?",
      en: "Bitter coffee?",
      ja: "ブラックコーヒー？",
      ko: "쓴 커피?",
    }),
    { voice: elenaDay7Voices[3] },
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Sesuai perintah ibu dosen.",
      en: "As ordered by the lecturer.",
      ja: "先生のご命令通りです。",
      ko: "교수님 명령대로요.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Aku tidak memberi perintah.",
      en: "I did not give an order.",
      ja: "命令なんてしてない。",
      ko: "명령한 적 없어.",
    }),
    { voice: elenaDay7Voices[4] },
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Nada suaramu cukup seperti surat edaran.",
      en: "Your tone sounded enough like an official memo.",
      ja: "声の調子が十分に通達みたいだった。",
      ko: "네 말투가 거의 공문 같았어.",
    }),
  ),
  narrate(
    tx({
      id: "Elena menatapnya datar, tapi senyum kecilnya muncul.",
      en: "Elena gives him a flat look, but a small smile appears.",
      ja: "エレナは無表情に彼を見つめるが、小さな笑みが浮かぶ。",
      ko: "엘레나는 무표정하게 그를 바라보지만, 작은 미소가 떠오른다.",
    }),
  ),
  narrate(
    tx({
      id: "Arka duduk di seberangnya.",
      en: "Arka sits across from her.",
      ja: "アルカは彼女の向かいに座る。",
      ko: "아르카는 그녀 맞은편에 앉는다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Bagaimana rapatnya?",
      en: "How was the meeting?",
      ja: "会議はどうだった？",
      ko: "회의는 어땠어?",
    }),
  ),
  narrate(
    tx({
      id: "Elena menyesap kopi, lalu menarik napas pelan.",
      en: "Elena sips the coffee, then takes a slow breath.",
      ja: "エレナはコーヒーを一口飲み、ゆっくり息を吸った。",
      ko: "엘레나는 커피를 한 모금 마신 뒤 천천히 숨을 들이쉰다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Mereka tidak jadi memecatku. Nilai mahasiswa itu tetap D. Kasusnya diperiksa ulang. Kepala program ditegur.",
      en: "They did not fire me. The student's grade stays a D. The case is being reviewed. The program head was reprimanded.",
      ja: "解雇はされなかった。その学生の成績はDのまま。件は再調査される。学科長は注意を受けた。",
      ko: "그들은 나를 해고하지 않았어. 그 학생의 성적은 D 그대로야. 사건은 재검토되고, 학과장은 경고를 받았어.",
    }),
    { voice: elenaDay7Voices[5] },
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Arthur?",
      en: "Arthur?",
      ja: "アーサー？",
      ko: "아서?",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Diskors sementara.",
      en: "Temporarily suspended.",
      ja: "一時停職。",
      ko: "임시 정직이야.",
    }),
    { voice: elenaDay7Voices[6] },
  ),
  narrate(
    tx({
      id: "Arka menghela napas lega.",
      en: "Arka lets out a relieved breath.",
      ja: "アルカは安堵の息をついた。",
      ko: "아르카는 안도의 숨을 내쉰다.",
    }),
  ),
  narrate(
    tx({
      id: "Elena menepuk map di meja.",
      en: "Elena taps the folder on the table.",
      ja: "エレナはテーブルの上のファイルを軽く叩いた。",
      ko: "엘레나는 테이블 위의 서류철을 톡톡 두드린다.",
    }),
  ),
  say(
    "elena",
    "smile",
    tx({
      id: "Dia lupa aku dosen. Kalau aku marah, aku menulis laporan.",
      en: "He forgot I am a lecturer. When I get angry, I write reports.",
      ja: "彼は私が講師だってことを忘れていた。私が怒ると、報告書を書くの。",
      ko: "그는 내가 교수라는 걸 잊었어. 내가 화나면 보고서를 쓰거든.",
    }),
    { voice: elenaDay7Voices[7] },
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Laporan marah versi kamu pasti mengerikan.",
      en: "Your angry-report version must be terrifying.",
      ja: "君の怒りの報告書、絶対に恐ろしいだろうな。",
      ko: "네 분노 버전 보고서는 분명 무서울 것 같아.",
    }),
  ),
  say(
    "elena",
    "smile",
    tx({
      id: "Rapi, sistematis, dan menyakitkan.",
      en: "Neat, systematic, and painful.",
      ja: "整然として、体系的で、痛烈よ。",
      ko: "깔끔하고, 체계적이고, 아프게 찌르지.",
    }),
    { voice: elenaDay7Voices[8] },
  ),
  narrate(
    tx({
      id: "Mereka tertawa pelan. Lalu Elena kembali menatap kopi di tangannya.",
      en: "They laugh softly. Then Elena looks back at the coffee in her hand.",
      ja: "二人は静かに笑う。それからエレナは手の中のコーヒーに視線を戻した。",
      ko: "둘은 조용히 웃는다. 그러다 엘레나는 다시 손에 든 커피를 바라본다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Tapi semuanya belum selesai. Jalanku di kampus mungkin akan lebih berat.",
      en: "But none of this is over. My path on campus may get harder.",
      ja: "でも、全部が終わったわけじゃない。キャンパスでの道はもっと厳しくなるかもしれない。",
      ko: "하지만 모든 게 끝난 건 아니야. 캠퍼스에서 내 길은 더 힘들어질지도 몰라.",
    }),
    { voice: elenaDay7Voices[9] },
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Tapi kamu tidak tunduk. Dan kamu tidak membiarkan Arthur menentukan siapa kamu.",
      en: "But you did not yield. And you did not let Arthur define who you are.",
      ja: "でも君は屈しなかった。そしてアーサーに自分を決めさせなかった。",
      ko: "하지만 넌 굴복하지 않았어. 그리고 아서가 네가 누구인지 정하게 두지 않았어.",
    }),
  ),
  narrate(
    tx({
      id: "Elena diam sejenak.",
      en: "Elena is quiet for a moment.",
      ja: "エレナはしばらく黙る。",
      ko: "엘레나는 잠시 말이 없다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Aku hampir menyerah tadi. Tapi aku ingat kalimatmu.",
      en: "I almost gave up earlier. But I remembered what you said.",
      ja: "さっき、ほとんど諦めかけた。でもあなたの言葉を思い出した。",
      ko: "아까 거의 포기할 뻔했어. 하지만 네 말을 떠올렸어.",
    }),
    { voice: elenaDay7Voices[10] },
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Yang mana?",
      en: "Which one?",
      ja: "どれ？",
      ko: "어떤 말?",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Keputusannya tetap di tanganku. Tapi kalau aku mau melawan, kamu berdiri di sampingku.",
      en: "The decision stays in my hands. But if I want to fight, you will stand beside me.",
      ja: "決めるのは私。でも私が戦いたいなら、あなたは隣に立ってくれる。",
      ko: "결정은 내 손에 있어. 하지만 내가 싸우고 싶다면, 네가 내 곁에 서 있어 주겠다고.",
    }),
    { voice: elenaDay7Voices[11] },
  ),
  narrate(
    tx({
      id: "Hening.",
      en: "Silence.",
      ja: "沈黙。",
      ko: "침묵.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Aku memikirkan itu sepanjang rapat. Bukan cuma soal melawan. Tapi soal ada seseorang yang tidak mengambil alih, tidak memaksa, dan tidak pergi.",
      en: "I thought about that throughout the meeting. Not just about fighting. About having someone who does not take over, does not force me, and does not leave.",
      ja: "会議の間ずっと、それを考えていた。戦うことだけじゃない。奪い取らず、押しつけず、去らない人がいるということを。",
      ko: "회의 내내 그 말을 생각했어. 단지 싸우는 것만이 아니라, 빼앗지 않고, 강요하지 않고, 떠나지 않는 사람이 있다는 것에 대해서.",
    }),
    { voice: elenaDay7Voices[12] },
  ),
  narrate(
    tx({
      id: "Elena mengulurkan tangannya perlahan.",
      en: "Elena slowly holds out her hand.",
      ja: "エレナはゆっくりと手を差し出す。",
      ko: "엘레나가 천천히 손을 내민다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Boleh?",
      en: "May I?",
      ja: "いい？",
      ko: "잡아도 돼?",
    }),
  ),
  say(
    "elena",
    "smile",
    tx({
      id: "Aku yang mengulurkan tangan, bodoh.",
      en: "I am the one holding out my hand, idiot.",
      ja: "手を差し出しているのは私よ、ばか。",
      ko: "손을 내민 건 나야, 바보야.",
    }),
    { voice: elenaDay7Voices[13] },
  ),
  narrate(
    tx({
      id: "Arka tersenyum, lalu menggenggamnya.",
      en: "Arka smiles, then takes her hand.",
      ja: "アルカは微笑み、それから彼女の手を握る。",
      ko: "아르카는 미소 짓고, 그녀의 손을 잡는다.",
    }),
  ),
  moveTo("arka-day7-elena-good", "center", -0.18, {
    duration: 700,
    easing: "ease-in-out",
  }),
  moveTo("elena-day7-elena-good", "center", 0.18, {
    duration: 700,
    easing: "ease-in-out",
  }),
  narrate(
    tx({
      id: "Di luar, hujan mulai turun.",
      en: "Outside, rain begins to fall.",
      ja: "外では雨が降り始める。",
      ko: "밖에는 비가 내리기 시작한다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Aku takut setelah ini semuanya berubah.",
      en: "I am afraid everything will change after this.",
      ja: "これから全部変わってしまうのが怖い。",
      ko: "이제 모든 게 변할까 봐 무서워.",
    }),
    { voice: elenaDay7Voices[14] },
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Mungkin memang berubah. Tapi bukan berarti jadi buruk.",
      en: "Maybe it will change. But that does not mean it will become bad.",
      ja: "たぶん変わる。でも悪くなるとは限らない。",
      ko: "어쩌면 변하겠지. 하지만 나빠진다는 뜻은 아니야.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Aku tidak pandai percaya.",
      en: "I am not good at trusting.",
      ja: "信じるのは得意じゃない。",
      ko: "나는 믿는 걸 잘 못해.",
    }),
    { voice: elenaDay7Voices[15] },
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Pelan-pelan saja.",
      en: "One step at a time.",
      ja: "ゆっくりでいい。",
      ko: "천천히 하면 돼.",
    }),
  ),
  say(
    "elena",
    "blush",
    tx({
      id: "Kemari.",
      en: "Come here.",
      ja: "こっちに来て。",
      ko: "이리 와.",
    }),
    { voice: elenaDay7Voices[16] },
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Kamu yakin?",
      en: "Are you sure?",
      ja: "本当に？",
      ko: "확실해?",
    }),
  ),
  say(
    "elena",
    "blush",
    tx({
      id: "Aku yakin. Hari ini aku memilih kamu.",
      en: "I am sure. Today, I choose you.",
      ja: "確かよ。今日、私はあなたを選ぶ。",
      ko: "확신해. 오늘 나는 너를 선택해.",
    }),
    { voice: elenaDay7Voices[17] },
  ),
  hide("arka-day7-elena-good", "fadeAway"),
  hide("elena-day7-elena-good", "fadeAway"),
  blackScreen(),
  clearBlackScreen(),
  bg(elenaG1Url),
  narrate({
    id: "Elena berdiri sambil menggenggam tangannya, lalu menuntun Arka ke arah meja kerja.",
    en: "Elena stands while holding his hand, leading Arka toward the desk.",
    ja: "マヤは手を握ったまま立ち上がり、アルカを机の方向へと連れて行く。",
    ko: "마야는 손을 잡고 서서 아르카를 책상 쪽으로 데려간다.",
  }),
  bg(elenaG2Url),
  narrate({
    id: "Elena berdiri di hadapan Arka, lalu dengan lembut mendorong dada Arka hingga ia duduk di kursi kerjanya.",
    en: "Elena stands in front of Arka, gently pushing his chest until he sits on his chair.",
    ja: "マヤはアルカの前に立ち、彼を机の椅子に座らせるように軽く胸を押す。",
    ko: "엘레나는 아르카 앞에 서서 그를 책상 의자에 앉히기 위해 가볍게 가슴을 밀어준다.",
  }),
  bg(elenaG3Url),
  narrate({
    id: "Arka: Elena?",
    en: "Arka: Elena?",
    ja: "アルカ：エレナ？",
    ko: "아르카: 엘레나?",
  }),
  cutScene(
    elenaSpecialScene1,
    true,
    [
      tx({
        id: "Elena berlutut di antara kaki Arka.",
        en: "Elena kneels between Arka's legs.",
        ja: "エレナはアルカの脚の間に膝をつく。",
        ko: "엘레나는 아르카의 다리 사이에 무릎을 꿇는다.",
      }),
      tx({
        id: "Ia menatap Arka sebentar sebelum mengeluarkan miliknya.",
        en: "She looks at Arka for a moment before pulling out her own.",
        ja: "彼女は少しアルカを見つめてから、自分のものを取り出す。",
        ko: "그녀는 잠시 아르카를 바라본 뒤 자신의 것을 꺼낸다.",
      }),
      tx({
        id: 'Elena: "Aku ingin mencoba ini dulu."',
        en: 'Elena: "I want to try this first."',
        ja: "エレナ：「まずはこれを試してみたい。」",
        ko: '엘레나: "먼저 이걸 해보고 싶어."',
      }),
    ],
    undefined,
    elenaSpecialScene1Sound,
  ),
  cutScene(
    elenaSpecialScene2,
    true,
    [
      tx({
        id: "Ia mengecup ujungnya pelan, lalu mulai menjilat dengan lidahnya.",
        en: "She softly kisses the tip of his cock, then starts licking it with her tongue.",
        ja: "彼女は亀頭にそっとキスし、舌でねっとりと舐め始める。",
        ko: "그녀는 귀두에 살짝 입맞춘 뒤, 혀로 천천히 핥기 시작한다.",
      }),
      tx({
        id: "Elena: “Mmmh… keras sekali…”",
        en: "Elena: “Mmmh… it's so hard…”",
        ja: "エレナ：「うーん… すごく硬いね…」",
        ko: "엘레나: “음… 정말 딱딱해…”",
      }),
    ],
    undefined,
    elenaSpecialScene2Sound,
  ),
  cutScene(
    elenaSpecialScene3,
    true,
    [
      tx({
        id: "Elena mulai memasukkan ke mulutnya dengan gerakan lambat.",
        en: "Elena begins slowly sliding it into her mouth.",
        ja: "エレナはゆっくりとそれを口に入れる。",
        ko: "엘레나는 천천히 그것들을 입에 넣는다.",
      }),
      tx({
        id: "Elena: “Rasanya… aneh. Tapi enak.”",
        en: "Elena: “It tastes… strange. But delicious.”",
        ja: "エレナ: “味は… ふつうじゃないけど、おいしい。”",
        ko: "엘레나: “맛은… 특이하지만, 맛있어.”",
      }),
    ],
    undefined,
    elenaSpecialScene3Sound,
  ),
  cutScene(
    elenaSpecialScene4,
    true,
    [
      tx({
        id: "Gerakannya semakin dalam dan cepat.",
        en: "Her movements become deeper and faster.",
        ja: "彼女の動きはますます深く、速くなった。",
        ko: "그녀의 움직임이 더욱 깊고 빠르게 변했다.",
      }),
      tx({
        id: "Arka: “Elena… aku mau keluar…”",
        en: "Arka: “Elena… I’m gonna cum…”",
        ja: "アルカ：「エレナ…もうイキそう…」",
        ko: "아르카: “엘레나… 나 쌀 것 같아…”",
      }),
      tx({
        id: "Elena: “Arka… keluar di mulutku saja…”",
        en: "Elena: “Arka… cum in my mouth…”",
        ja: "エレナ：「アルカ…口の中に出して…」",
        ko: "엘레나: “아르카… 내 입에 싸 줘…”",
      }),
    ],
    undefined,
    elenaSpecialScene4Sound,
  ),
  cutScene(
    elenaSpecialScene5,
    true,
    [
      tx({
        id: "Arka melepaskan di dalam mulut Elena. Elena menelan sambil sedikit batuk kecil.",
        en: "Arka releases inside Elena's mouth. Elena swallows while coughing slightly.",
        ja: "アルカはエレナの口の中で射精する。エレナは少し咳き込むながら飲み込む。",
        ko: "아르카는 엘레나의 입에서 사정한다. 엘레나는 살짝 기침하며 삼킨다.",
      }),
    ],
    undefined,
    elenaSpecialScene5Sound,
  ),
  multiCutScene(
    [
      {
        id: "elena-1",
        label: tx({
          id: "Gaya 1",
          en: "Style 1",
          ja: "スタイル1",
          ko: "스타일1",
        }),
        src: elenaSpecialSceneG3_1,
        loop: true,
        audioSrc: elenaSpecialSceneG3_1Sound,
        narrate: [
          {
            id: "Elena berdiri lalu membungkuk di atas meja kerjanya, menyodorkan pinggul ke belakang.",
            en: "Elena stands up and bends over her desk, presenting her hips to the back.",
            ja: "エレナは立ち上がり、机の上にかがみ込み、お尻を後ろに突き出している。",
            ko: "엘레나는 일어나 책상 위로 기대어 있으며, 등을 돌려 허리를 뻗고 있다.",
          },
          {
            id: "Elena: “Dari belakang… pelan dulu ya.”",
            en: "Elena: “From behind… go slow.”",
            ja: "エレナ：「後ろから…ゆっくりね。”",
            ko: "엘레나: “뒤에서… 천천히 해.”",
          },
          {
            id: "Arka memasukkan dari belakang",
            en: "Arka starts shoving from behind.",
            ja: "アルカが後ろから押し込み始める。",
            ko: "아르카가 뒤에서 밀어 넣기 시작한다。",
          },
          {
            id: "Elena: “Ahhh… nnghh… dalam sekali…”",
            en: "Elena: “Ahhh… nnghh… so deep…”",
            ja: "エレナ：「あっ…んっ…奥まで来てる…」",
            ko: "엘레나: “아… 으응… 너무 깊어…”",
          },
          {
            id: "Arka: “Kamu sempit banget… enak sekali.”",
            en: "Arka: “Fuck, you’re so tight… feels so fucking good.”",
            ja: "アルカ：「くそ、めちゃくちゃ締め付けてくる…気持ちよすぎる…」",
            ko: "아르카: “씨발, 너무 조여… 존나 기분 좋아…”",
          },
          {
            id: "Awalnya Arka bergerak pelan.",
            en: "At first, Arka thrusts slowly.",
            ja: "最初、アルカはゆっくりと腰を動かす。",
            ko: "처음엔 아르카가 천천히 허리를 움직인다.",
          },
          {
            id: "Elena: “Ahh… pelan seperti ini enak… aku bisa ngerasain semuanya…”",
            en: "Elena: “Ahh… slow like this feels so fucking good… I can feel every inch of you…”",
            ja: "エレナ：「あっ…ゆっくりされると気持ちよすぎる…全部、奥まで感じる…」",
            ko: "엘레나: “아… 이렇게 천천히 하니까 존나 좋아… 네 거 전부 느껴져…”",
          },
        ],
      },
      {
        id: "elena-2",
        label: tx({
          id: "Gaya 2",
          en: "Style 2",
          ja: "スタイル2",
          ko: "스타일2",
        }),
        src: elenaSpecialSceneG3_2,
        loop: true,
        audioSrc: elenaSpecialSceneG3_2Sound,
        narrate: [
          {
            id: "Arka mulai mempercepat gerakannya.",
            en: "Arka starts thrusting faster.",
            ja: "アルカは腰の動きを速めていく。",
            ko: "아르카가 허리를 더 빠르게 움직이기 시작한다.",
          },
          {
            id: "Elena: “Lebih cepat… Arka… ahh! Ahh!”",
            en: "Elena: “Faster… Arka… ahh! Ahh!”",
            ja: "エレナ：「もっと速く…アルカ…あっ！あっ！」",
            ko: "엘레나: “더 빨리… 아르카… 아! 아!”",
          },
          {
            id: "Arka: “Begini?”",
            en: "Arka: “Like this?”",
            ja: "アルカ：「こうか？」",
            ko: "아르카: “이렇게?”",
          },
          {
            id: "Elena: “ya… lebih keras… aku mau keluar…”",
            en: "Elena: “Yes… harder… I’m gonna cum…”",
            ja: "エレナ：「うん…もっと激しく…イキそう…」",
            ko: "엘레나: “응… 더 세게… 나 갈 것 같아…”",
          },
          {
            id: "Arka: “Aku juga… nggak tahan…”",
            en: "Arka: “Me too… I can’t hold it…”",
            ja: "アルカ：「俺も…もう我慢できない…」",
            ko: "아르카: “나도… 더 못 참겠어…”",
          },
        ],
      },
      {
        id: "elena-3",
        label: tx({
          id: "Gaya 3",
          en: "Style 3",
          ja: "スタイル3",
          ko: "스타일3",
        }),
        src: elenaSpecialSceneG3_3,
        loop: true,
        audioSrc: elenaSpecialSceneG3_3Sound,
        narrate: [
          {
            id: "Keduanya mencapai klimaks bersama. Elena mengejang kuat sambil mencengkeram meja.",
            en: "They cum together. Elena’s body seizes hard as she grips the desk.",
            ja: "二人は同時に絶頂に達する。エレナは机を掴みしめ、体を強く痙攣させる。",
            ko: "둘은 함께 절정에 달한다. 엘레나는 책상을 움켜쥔 채 강하게 몸을 경련시킨다.",
          },
        ],
      },
      {
        id: "elena-4",
        label: tx({
          id: "Gaya 4",
          en: "Style 4",
          ja: "スタイル4",
          ko: "스타일4",
        }),
        src: elenaSpecialSceneG3_4,
        loop: true,
        audioSrc: elenaSpecialSceneG3_4Sound,
        narrate: [
          {
            id: "Malam ini Elena memilihku bukan karena dia lemah, tapi karena dia berani mempercayakan hatinya yang rapuh. Dan aku berjanji akan selalu berdiri di sampingnya, bukan di depannya.",
            en: "Tonight, Elena chose me not because she was weak, but because she had the courage to entrust her fragile heart to me. And I promise I will always stand by her, not in front of her.",
            ja: "今夜、エレナは私を選ぶのは弱さではなく、壊れた心を私に預ける勇気があったからだ。そして私は常に彼女のもとへと立ち続けると約束する。私があの先に立つことではない。",
            ko: "오늘 밤 엘레나는 내가 약한 것이 아니라 그녀의 부서진 마음을 나에게 맡기는 용기가 있었기 때문에 나를 선택한 것이다. 그리고 나는 항상 그녀 옆에 서 있을 것이고, 그녀 앞에 서지 않을 것을 약속한다.",
          },
        ],
      },
    ],
    "elena-1",
  ),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", "", 1000),
  centeredText(
    tx({
      id: "A QUIET STRENGTH",
      en: "A QUIET STRENGTH",
      ja: "静かな強さ",
      ko: "조용한 강함",
    }),
    { size: "hero" },
  ),
  centeredText(
    tx({
      id: "GOOD ENDING - ELENA ROUTE SELESAI",
      en: "GOOD ENDING - ELENA ROUTE COMPLETED",
      ja: "グッドエンディング - エレナルート完了",
      ko: "굿 엔딩 - 엘레나 루트 완료",
    }),
    { size: "sub" },
  ),
  setFlag("elenaGoodEndingCompleted", true),
];

export const day7ElenaBadEndingScene: VisualNovelCommand[] = [
  hide("arka-day6-elena"),
  hide("elena-day6-arthur"),
  hide("arthur-day6-elena"),
  bg(bedroomNightUrl),
  show("arka-day7-elena-bad", "arka", "serious", {
    position: "left",
    enterFrom: "fade",
  }),
  narrate(
    tx({
      id: "Arka tidak bisa tidur. Rasa bersalah dan khawatir membuatnya gelisah. Ia keluar dari unitnya dan berjalan ke depan pintu Unit 303. Pintu tidak terkunci rapat.",
      en: "Arka cannot sleep. Guilt and worry keep him restless. He leaves his unit and walks to the door of Unit 303. The door is not fully locked.",
      ja: "アルカは眠れない。罪悪感と不安が彼を落ち着かなくさせていた。彼は自分の部屋を出て、303号室の前まで歩いていく。ドアはきちんと鍵がかかっていない。",
      ko: "아르카는 잠들 수 없다. 죄책감과 걱정이 그를 불안하게 만든다. 그는 자신의 호실을 나와 303호 문 앞으로 걸어간다. 문은 제대로 잠겨 있지 않다.",
    }),
  ),
  bg(elenaHallwayOpenUrl),
  narrate(
    tx({
      id: "Aku cuma mau memastikan dia baik-baik saja…",
      en: "I just want to make sure she is okay…",
      ja: "ただ、彼女が無事か確かめたいだけだ…",
      ko: "그냥 그녀가 괜찮은지 확인하고 싶을 뿐이야…",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Arka mendorong pintu pelan. Dari dalam terdengar suara desahan samar dan suara tempat sofa yang berderit.",
      en: "Arka pushes the door gently. From inside, a faint moan and the creak of a sofa can be heard.",
      ja: "アルカがそっとドアを押す。中から微かな喘ぎ声と、きしむソファの音が聞こえる。",
      ko: "아르카가 문을 살짝 밀었다. 안에서 희미한 신음소리와 소파가 삐걱이는 소리가 들렸다.",
    }),
  ),
  hide("arka-day7-elena-bad", "fadeAway"),
  blackScreen(),
  narrate(
    tx({
      id: "Dan Arka melihatnya.",
      en: "And Arka sees it.",
      ja: "そしてアルカは、それを見てしまう。",
      ko: "그리고 아르카는 그것을 보고 만다.",
    }),
  ),
  clearBlackScreen(),
  multiCutScene(
    [
      {
        id: "elena-1",
        label: tx({
          id: "Gaya 1",
          en: "Style 1",
          ja: "スタイル1",
          ko: "스타일1",
        }),
        src: elenaSpecialSceneBadG1_1,
        loop: true,
        audioSrc: elenaSpecialSceneBadG1_1Sound,
        narrate: [
          {
            id: "Tubuh Elena telanjang dan berkeringat. Rambutnya acak-acakan. Ia menumpukan tangan di dada Arthur sambil menggerakkan pinggulnya naik-turun",
            en: "Elena's body is naked and sweaty. Her hair is messy. She piles her hands on Arthur's chest while moving her hips up and down.",
            ja: "エレナの体は裸で汗ばんでいる。髪は乱れている。彼女はハーレスの胸に手を重ねながら、お尻を上下させている。",
            ko: "엘레나의 몸은 벗겨지고 땀이 흘러내린다. 머리카락은 어지럽다. 그녀는 하레스의 가슴에 손을 얹고 허리를 위아래로 움직이고 있다.",
          },
          {
            id: "Elena: “Ahh… pelan dulu… nnghh…”",
            en: "Elena: “Ahh… slow down… nnghh…”",
            ja: "エレナ：「ああ…ちょっとだけ…ううん…」",
            ko: "엘레나: “아아… 천천히… 으음…”",
          },
          {
            id: "Arthur: “Kamu yang bilang mau cepat tadi. Sekarang minta pelan?”",
            en: "Arthur: “You were the one who said you wanted it fast earlier. Now you want me to slow down?”",
            ja: "ハーレス：「さっきは早くって言ったのはあなたじゃなかったっけ？今度はゆっくりって言うの？」",
            ko: "아서: “아까는 빨리 라고 말한 건 너였지. 지금은 천천히 라고 말하는 거야?”",
          },
        ],
      },
      {
        id: "elena-2",
        label: tx({
          id: "Gaya 2",
          en: "Style 2",
          ja: "スタイル2",
          ko: "스타일2",
        }),
        src: elenaSpecialSceneBadG1_2,
        loop: true,
        audioSrc: elenaSpecialSceneBadG1_2Sound,
        narrate: [
          {
            id: "Elena mempercepat gerakannya. Dada montoknya bergoyang mengikuti setiap naik turun.",
            en: "Elena speeds up her movements. Her plump tits bounce with every rise and fall.",
            ja: "エレナは腰の動きを速める。むっちりしたおっぱいが、上下するたびに激しく揺れる。",
            ko: "엘레나는 움직임을 빠르게 한다. 풍만한 가슴이 오르내릴 때마다 출렁거린다.",
          },
          {
            id: "Elena: “Ahh! Ahh! Kau bilang bakal lindungi aku… ahh!”",
            en: "Elena: “Ahh! Ahh! You said you’d protect me… ahh!”",
            ja: "エレナ：「あっ！あっ！守ってくれるって言ったのに…あっ！」",
            ko: "엘레나: “아앗! 아앗! 지켜준다고 했잖아… 아앗!”",
          },
          {
            id: "Arthur: “Iya. Asal kamu nurut kayak gini setiap aku mau.”",
            en: "Arthur: “Yeah. As long as you stay obedient like this whenever I want.”",
            ja: "ハーレス：「ああ。その代わり、俺が欲しいときはいつでもこうして従うんだぞ。」",
            ko: "아서: “그래. 대신 내가 원할 때마다 이렇게 순종하면 돼.”",
          },
          {
            id: "Arthur menampar pantat Elena keras sekali. Elena menggigit bibirnya tapi tidak berhenti bergerak.",
            en: "Arthur slaps Elena’s ass hard. She bites her lip but doesn’t stop riding him.",
            ja: "ハーレスがエレナの尻を強く叩く。エレナは唇を噛むが、腰の動きは止めない。",
            ko: "아서가 엘레나의 엉덩이를 세게 때린다. 엘레나는 입술을 깨물지만 허리를 멈추지 않는다.",
          },
        ],
      },
      {
        id: "elena-3",
        label: tx({
          id: "Gaya 3",
          en: "Style 3",
          ja: "スタイル3",
          ko: "스타일3",
        }),
        src: elenaSpecialSceneBadG1_3,
        loop: true,
        audioSrc: elenaSpecialSceneBadG1_3Sound,
        narrate: [
          {
            id: "Elena: “Lebih dalam… aku mau cepat selesai… nnghh!!”",
            en: "Elena: “Deeper… I want to cum fast… nnghh!!”",
            ja: "エレナ：「もっと深く…早くイキたい…んぐっ!!」",
            ko: "엘레나: “더 깊게… 빨리 가고 싶어… 으응!!”",
          },
          {
            id: "Arthur: “Kamu basah banget. Ternyata suka yang kasar ya?”",
            en: "Arthur: “You’re so fucking wet. So you like it rough, huh?”",
            ja: "ハーレス：「びしょびしょじゃん。荒々しいのが好きだったのか？」",
            ko: "아서: “완전 젖었네. 거칠게 하는 거 좋아하나 봐?”",
          },
          {
            id: "Arthur mendorong pinggul Elena dari bawah dengan kuat.",
            en: "Arthur thrusts up hard into Elena’s hips from below.",
            ja: "ハーレスが下からエレナの腰を強く突き上げる。",
            ko: "아서가 아래에서 엘레나의 허리를 세게 밀어 올린다.",
          },
          {
            id: "Elena: “AAHH!! Terlalu dalam…!”",
            en: "Elena: “AAHH!! Too deep…!”",
            ja: "エレナ：「あぁっ!! 深すぎ…！」",
            ko: "엘레나: “아아앗!! 너무 깊어…!”",
          },
        ],
      },
    ],
    "elena-1",
  ),
  multiCutScene(
    [
      {
        id: "elena-4",
        label: tx({
          id: "Gaya 1",
          en: "Style 1",
          ja: "スタイル1",
          ko: "스타일1",
        }),
        src: elenaSpecialSceneBadG2_1,
        loop: true,
        audioSrc: elenaSpecialSceneBadG2_1Sound,
        narrate: [
          {
            id: "Arthur membalikkan posisi Elena. Ia menindih tubuhnya dan memasukkan dirinya lagi dengan gerakan yang sangat pelan.",
            en: "Arthur flips Elena over. He pins her body down and slides back inside her, painfully slow.",
            ja: "ハーレスがエレナの体勢をひっくり返す。彼女の体を押し潰すように覆い、ごくゆっくりとまた中に入れる。",
            ko: "아서가 엘레나의 자세를 뒤집는다. 몸을 짓누르고 아주 천천히 다시 안으로 넣는다.",
          },
          {
            id: "Elena: “Ahh… pelan sedikit… nnghh!”",
            en: "Elena: “Ahh… a little slower… nnghh!”",
            ja: "エレナ：「あっ…ちょっとゆっくり…んぐっ！」",
            ko: "엘레나: “아아… 조금만 천천히… 으응!”",
          },
          {
            id: "Arthur: “Jangan banyak protes.”",
            en: "Arthur: “Don’t complain so much.”",
            ja: "ハーレス：「文句が多いな。」",
            ko: "아서: “투정 그만 부려.”",
          },
          {
            id: "Elena: “Aku cuma… ahh…”",
            en: "Elena: “I was just… ahh…”",
            ja: "エレナ：「ただ…あっ…」",
            ko: "엘레나: “그냥… 아앗…”",
          },
          {
            id: "Arthur bergerak naik turun dengan tempo yang lambat, menikmati setiap detiknya. Elena menggigit bibirnya, kedua tangannya masih mencoba menahan bahu Arthur.",
            en: "Arthur fucks her slow, savoring every second. Elena bites her lip, her hands still trying to hold back his shoulders.",
            ja: "ハーレスはゆっくりとしたテンポで腰を上下させ、一瞬一瞬を味わう。エレナは唇を噛み、両手でまだハーレスの肩を押し支えようとしている。",
            ko: "아서는 느린 템포로 위아래로 움직이며 매 순간을 즐긴다. 엘레나는 입술을 깨물고, 양손으로 여전히 아서의 어깨를 막으려 한다.",
          },
        ],
      },
      {
        id: "elena-5",
        label: tx({
          id: "Gaya 2",
          en: "Style 2",
          ja: "スタイル2",
          ko: "스타일2",
        }),
        src: elenaSpecialSceneBadG2_2,
        loop: true,
        audioSrc: elenaSpecialSceneBadG2_2Sound,
        narrate: [
          {
            id: "Arthur mulai mempercepat sedikit gerakannya. Suara basah dari pertemuan tubuh mereka terdengar jelas.",
            en: "Arthur starts fucking her a little faster. The wet sounds of their bodies meeting ring out clearly.",
            ja: "ハーレスは少し腰の動きを速める。互いの体がぶつかるたびに、濡れそぼった音がはっきり聞こえる。",
            ko: "아서가 조금씩 더 빠르게 움직이기 시작한다. 서로의 몸이 부딪힐 때마다 축축한 소리가 또렷이 들린다.",
          },
          {
            id: "Elena: “Nnghh… lebih dalam… tapi jangan terlalu cepat…”",
            en: "Elena: “Nnghh… deeper… but not too fast…”",
            ja: "エレナ：「んぐっ…もっと深く…でも速くしすぎないで…」",
            ko: "엘레나: “으응… 더 깊게… 근데 너무 빠르진 마…”",
          },
          {
            id: "Arthur: “Kamu bilang begitu, tapi tubuhmu sudah mengapitku erat.”",
            en: "Arthur: “You say that, but your pussy is already squeezing me so tight.”",
            ja: "ハーレス：「そう言いながら、体はもうぎゅっと俺を締めつけてるぞ。」",
            ko: "아서: “그렇게 말하면서, 네 몸은 이미 날 꽉 조이고 있잖아.”",
          },
          {
            id: "Elena: “Aku… ahh… aku tidak bisa menahan…!”",
            en: "Elena: “I… ahh… I can’t hold it…!”",
            ja: "エレナ：「私…あっ…もう我慢できない…！」",
            ko: "엘레나: “나… 아앗… 참을 수가 없어…!”",
          },
          {
            id: "Elena mencengkeram punggung Arthur. Kuku-kukunya sedikit menancap di kulitnya.",
            en: "Elena clutches Arthur’s back. Her nails dig slightly into his skin.",
            ja: "エレナがハーレスの背中を掴む。爪がわずかに肌に食い込む。",
            ko: "엘레나가 아서의 등을 움켜쥔다. 손톱이 피부에 살짝 파고든다.",
          },
        ],
        speed: "2x"
      },
      {
        id: "elena-6",
        label: tx({
          id: "Gaya 3",
          en: "Style 3",
          ja: "スタイル3",
          ko: "스타일3",
        }),
        src: elenaSpecialSceneBadG2_3,
        loop: true,
        audioSrc: elenaSpecialSceneBadG2_3Sound,
        narrate: [
          {
            id: "Arthur tidak lagi menahan diri. Ia menghentak lebih cepat dan lebih dalam. Elena mulai kesulitan berbicara.",
            en: "Arthur stops holding back. He pounds into her faster and deeper. Elena can barely form words.",
            ja: "ハーレスはもう我慢しない。より速く、より深く突き上げる。エレナはうまく声にならない。",
            ko: "아서는 더 이상 참지 않는다. 더 빠르고 더 깊게 찔러 넣는다. 엘레나는 말을 제대로 잇지 못한다.",
          },
          {
            id: "Elena: “Ahh! Ahh! Pelan… nngghh!!”",
            en: "Elena: “Ahh! Ahh! Slow… nngghh!!”",
            ja: "エレナ：「あっ！あっ！ゆっくり…んぐっ!!」",
            ko: "엘레나: “아앗! 아앗! 천천히… 으으응!!”",
          },
          {
            id: "Arthur: “Kamu tidak boleh melawan.”",
            en: "Arthur: “You’re not allowed to fight back.”",
            ja: "ハーレス：「抵抗しちゃダメだ。」",
            ko: "아서: “반항하면 안 돼.”",
          },
          {
            id: "Elena: “Aku mau keluar… cepat… ahhh!!”",
            en: "Elena: “I’m gonna cum… soon… ahhh!!”",
            ja: "エレナ：「イキそう…もう…あっあっ!!」",
            ko: "엘레나: “갈 것 같아… 빨리… 아아앗!!”",
          },
          {
            id: "Arthur: “Tahan sedikit lagi.”",
            en: "Arthur: “Hold it a little longer.”",
            ja: "ハーレス：「もうちょっと我慢しろ。」",
            ko: "아서: “조금만 더 참아.”",
          },
          {
            id: "Arthur: “Tahan sedikit lagi.”",
            en: "Arthur: “Hold it a little longer.”",
            ja: "ハーレス：「もうちょっと我慢しろ。」",
            ko: "아서: “조금만 더 참아.”",
          },
        ],
        speed: "3x"
      },
      {
        id: "elena-7",
        label: tx({
          id: "Gaya 4",
          en: "Style 4",
          ja: "スタイル4",
          ko: "스타일4",
        }),
        src: elenaSpecialSceneBadG2_4,
        loop: true,
        audioSrc: elenaSpecialSceneBadG2_4Sound,
        narrate: [
          {
            id: "Elena: “ ahhh!! AAHHH…!!”",
            en: "“ ahhh!! AAHHH…!!”",
            ja: "「あっあっ!! アアアッハッハ…!!」",
            ko: "“아아아!! 아아아아…!!”",
          },
        ],
      },
    ],
    "elena-2",
  ),
  multiCutScene(
    [
      {
        id: "elena-8",
        label: tx({
          id: "Gaya 1",
          en: "Style 1",
          ja: "スタイル1",
          ko: "스타일1",
        }),
        src: elenaSpecialSceneBadG3_1,
        loop: true,
        audioSrc: elenaSpecialSceneBadG3_1Sound,
        narrate: [
          {
            id: "Arthur menarik Elena bangun dan membalikkan tubuhnya. Ia menyodorkan pinggul Elena ke belakang di pinggir tempat tidur.",
            en: "Arthur pulls Elena up and flips her around. He bends her hips back over the edge of the bed.",
            ja: "ハーレスがエレナを引き起こし、体をひっくり返す。ベッドの端で彼女の腰を後ろに突き出す。",
            ko: "아서가 엘레나를 일으켜 몸을 뒤집는다. 침대 가장자리에서 엘레나의 허리를 뒤로 밀어 낸다.",
          },
          {
            id: "Elena: “Dari belakang lagi…?”",
            en: "Elena: “From behind again…?”",
            ja: "エレナ：「また後ろから…？」",
            ko: "엘레나: “또 뒤에서…?”",
          },
          {
            id: "Arthur: “Belum puas. Sekali lagi.”",
            en: "Arthur: “Not done yet. One more time.”",
            ja: "ハーレス：「まだ足りない。もう一回だ。」",
            ko: "아서: “아직 모자라. 한 번 더.”",
          },
          {
            id: "Elena: “Ahh! Dalam sekali… nnghh!”",
            en: "Elena: “Ahh! So deep… nnghh!”",
            ja: "エレナ：「あっ！深い…んぐっ！」",
            ko: "엘레나: “아앗! 너무 깊어… 으응!”",
          },
          {
            id: "Arthur: “Gerakkan pinggulmu sendiri.”",
            en: "Arthur: “Move your hips yourself.”",
            ja: "ハーレス：「自分で腰を動かせ。」",
            ko: "아서: “네가 직접 허리를 움직여.”",
          },
        ],
      },
      {
        id: "elena-9",
        label: tx({
          id: "Gaya 2",
          en: "Style 2",
          ja: "スタイル2",
          ko: "스타일2",
        }),
        src: elenaSpecialSceneBadG3_2,
        loop: true,
        audioSrc: elenaSpecialSceneBadG3_2Sound,
        narrate: [
          {
            id: "Elena mulai menggerakkan pinggulnya sambil Arthur mendorong dari belakang.",
            en: "Elena starts rocking her hips while Arthur thrusts into her from behind.",
            ja: "エレナが腰を動かし始め、ハーレスが後ろから突き入れる。",
            ko: "엘레나가 허리를 움직이기 시작하고, 아서가 뒤에서 밀어 넣는다.",
          },
          {
            id: "Elena: “Ahh… ahh… lebih cepat…”",
            en: "Elena: “Ahh… ahh… faster…”",
            ja: "エレナ：「あっ…あっ…もっと速く…」",
            ko: "엘레나: “아앗… 아앗… 더 빠르게…”",
          },
          {
            id: "Gerakan semakin cepat dan kuat.",
            en: "Their movements grow faster and harder.",
            ja: "動きはますます速く、激しくなっていく。",
            ko: "움직임이 점점 더 빠르고 세게 변한다.",
          },
          {
            id: "Elena: “Aku… aku keluar lagi… AAHH!!”",
            en: "Elena: “I… I’m cumming again… AAHH!!”",
            ja: "エレナ：「私…またイく…あぁっ!!」",
            ko: "엘레나: “나… 또 가… 아아앗!!”",
          },
          {
            id: "Arthur: “Aku juga…!”",
            en: "Arthur: “Me too…!”",
            ja: "ハーレス：「俺も…！」",
            ko: "아서: “나도…!”",
          },
        ],
      },
      {
        id: "elena-10",
        label: tx({
          id: "Gaya 3",
          en: "Style 3",
          ja: "スタイル3",
          ko: "스타일3",
        }),
        src: elenaSpecialSceneBadG3_3,
        loop: true,
        audioSrc: elenaSpecialSceneBadG3_3Sound,
        narrate: [
          {
            id: "Arthur: “Bagus. Besok aku urus surat pemberhentianmu. Kamu selamat… asal kamu ingat kesepakatan kita.”",
            en: "Arthur: “It’s over. Tomorrow I’ll handle your termination letter. You’re safe… as long as you remember our deal.”",
            ja: "ハーレス：「終わりだ。明日、お前の解雇通知は俺が何とかする。お前は助かる…俺たちとの約束を忘れなければな。」",
            ko: "아서: “끝났다. 내일 네 해고 통지서는 내가 처리한다. 넌 살았어… 우리 약속을 기억하는 한.”",
          },
          {
            id: "Elena: “Iya… aku ingat.”",
            en: "Elena: “Yes… I remember.”",
            ja: "エレナ：「はい…覚えてます。」",
            ko: "엘레나: “네… 기억해요.”",
          },
          {
            id: "Elena ambruk ke kasur, napasnya tersengal. Air mata pelan mengalir di pipinya. Ia menutup matanya erat.",
            en: "Elena collapses onto the mattress, gasping for air. Tears slowly slide down her cheeks. She squeezes her eyes shut.",
            ja: "エレナはマットレスに崩れ落ち、息を切らせる。涙がゆっくりと頰を伝う。彼女は固く目を閉じる。",
            ko: "엘레나는 매트리스에 쓰러져 숨을 헐떡인다. 눈물이 천천히 볼을 타고 흐른다. 그녀는 눈을 꼭 감는다.",
          },
        ],
      },
    ],
    "elena-3",
  ),

  setFlag("elenaBadEndingCompleted", true),
];
