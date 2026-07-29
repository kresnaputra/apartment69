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
import knockSound from "@/sfx/knock.wav";
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
