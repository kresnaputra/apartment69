import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  centeredText,
  hide,
  jumpIf,
  narrate,
  say,
  scene,
  show,
} from "@/scenes/scriptTypes";
import bedroomNightUrl from "@/background/bedroom-night.png";

export const day7IntroScene: VisualNovelCommand[] = [
  bg(
    bedroomNightUrl,
    tx({
      id: "Unit 302 - 20:00",
      en: "Unit 302 - 20:00",
      ja: "302号室 - 20:00",
      ko: "302호 - 20:00",
    }),
  ),
  show("arka-day7", "arka", "neutral", {
    position: "left",
    enterFrom: "fade",
  }),
  narrate(
    tx({
      id: "Hujan turun cukup deras di luar. Arka sedang duduk santai di depan PC, suara hujan mengisi keheningan unitnya.",
      en: "Rain hammers steadily outside. Arka is sitting back at his PC, the sound of rain filling the quiet of his apartment.",
      ja: "外では雨がかなり激しく降っている。アルカはパソコンの前でのんびりと座っていて、部屋の静けさを雨音が満たしていた。",
      ko: "밖에 비가 꽤 세차게 내리고 있다. 아르카는 PC 앞에 편하게 앉아 있고, 빗소리가 방 안의 고요함을 채우고 있다.",
    }),
  ),
  narrate(
    tx({
      id: "Lalu terdengar ketukan pelan di pintunya.",
      en: "Then there's a soft knock at his door.",
      ja: "そのとき、ドアに静かなノックが響いた。",
      ko: "그때 문에서 조용한 노크 소리가 들린다.",
    }),
  ),
  jumpIf("arkaTookControl", "day7-devoted-submission", {
    value: true,
    elseTarget: "day7-eternal-promise",
  }),
];

export const day7DevotedSubmissionScene: VisualNovelCommand[] = [
  show("maya-day7-devoted", "maya", "blush", {
    position: "center",
    enterFrom: "fade",
  }),
  narrate(
    tx({
      id: "Maya masuk. Bukan piyama atau baju rapi seperti biasanya. Dia memakai tanktop yang cukup terbuka dan celana pendek. Kacamatanya tidak dipakai, dan rambutnya dibiarkan tergerai berantakan. Tatapannya kosong dari ambisi, tapi penuh pemujaan saat melihat Arka.",
      en: "Maya comes in. Not her usual pajamas or neat clothes. She's wearing a fairly open tank top and shorts. No glasses, and her hair falls loose and disheveled. Her eyes are empty of ambition, but full of adoration as they land on Arka.",
      ja: "マヤが入ってきた。いつものパジャマや小ぎれいな服装ではない。かなり開いたタンクトップとショートパンツ姿だ。眼鏡はなく、髪はぼさぼさに降ろされている。野心のかけらもない目でアルカを見つめ、しかし崇拝の色が満ちている。",
      ko: "마야가 들어왔다. 평소의 잠옷이나 단정한 옷차림이 아니다. 꽤 깊이 파인 탱크탑과 반바지 차림이다. 안경도 없고 머리카락은 헝클어진 채 내려져 있다. 눈빛에서 야망은 사라지고, 아르카를 바라보는 눈 가득 숭배가 담겨 있다.",
    }),
  ),
  say(
    "maya",
    "blush",
    tx({
      id: "Arka... aku udah mikirin semuanya seharian ini. Papa udah blokir semua rekeningku. Kampus juga rasanya udah nggak penting lagi.",
      en: "Arka... I've been thinking about everything all day. Dad already blocked all my accounts. And school... it doesn't feel important anymore.",
      ja: "アルカ…今日一日ずっと考えてた。お父さんはもう口座を全部止めた。大学も、もうどうでもいい気がして。",
      ko: "아르카... 오늘 하루 종일 다 생각해봤어. 아빠가 계좌를 다 막았어. 학교도 이제 중요하지 않은 것 같아.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Terus? Kamu mau nyerah gitu aja?",
      en: "And? You're just going to give up like that?",
      ja: "それで？ そのまま諦めるつもりか？",
      ko: "그래서? 그냥 포기할 거야?",
    }),
  ),
  narrate(
    tx({
      id: "Maya berjalan pelan mendekati Arka, lalu berlutut di lantai, tepat di sela kaki pria itu. Dia menyandarkan kepalanya di paha Arka.",
      en: "Maya walks slowly toward Arka, then kneels on the floor, right between his legs. She rests her head against his thigh.",
      ja: "マヤはゆっくりとアルカに近づき、その足の間にひざまずいた。そして頭を彼の膝に預ける。",
      ko: "마야가 천천히 아르카에게 다가가더니 그의 두 다리 사이 바닥에 무릎을 꿇는다. 그리고 그의 허벅지에 머리를 기댄다.",
    }),
  ),
  say(
    "maya",
    "blush",
    tx({
      id: "Buat apa aku capek-capek jadi dokter kalau ujung-ujungnya cuma buat muasin ego Papa? Kemarin, kamu bilang kamu yang bakal tanggung jawab atas hidupku, kan? Sekarang... aku milikmu, Arka.",
      en: "What's the point of exhausting myself to become a doctor if it was all just to feed my dad's ego? Yesterday, you said you'd take responsibility for my life, right? So now... I'm yours, Arka.",
      ja: "お父さんのエゴを満たすためだけに必死になって医者になる意味なんてあるの？昨日、私の人生の責任を持つって言ったよね？だから今は…私はあなたのものよ、アルカ。",
      ko: "결국 아빠 자존심 채워주려고 의사가 되려고 지쳐가는 게 무슨 의미야? 어제 내 인생 책임지겠다고 했잖아, 맞지? 이제... 나는 아르카 거야.",
    }),
  ),
  narrate(
    tx({
      id: "Arka mengangkat dagu Maya, menatap matanya tajam.",
      en: "Arka tilts Maya's chin up and looks straight into her eyes.",
      ja: "アルカはマヤの顎を持ち上げ、その目をまっすぐに見つめた。",
      ko: "아르카가 마야의 턱을 들어 올리며 눈을 날카롭게 들여다본다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Kamu sadar kan apa yang kamu omongin? Kalau kamu milih jalan ini, kamu nggak punya kendali lagi atas hidupmu sendiri.",
      en: "You know what you're saying? If you choose this path, you lose all control over your own life.",
      ja: "自分が何を言っているかわかってるか？その道を選んだら、自分の人生に一切の主導権はなくなる。",
      ko: "지금 무슨 말 하는지 알아? 이 길을 선택하면 네 삶에 대한 통제권은 완전히 사라져.",
    }),
  ),
  say(
    "maya",
    "blush",
    tx({
      id: "Itu yang aku mau. Terlalu capek mikir buat diriku sendiri. Aku cuma mau jadi apa pun yang kamu mau. Atur aku, Arka.",
      en: "That's what I want. I'm too tired of thinking for myself. I just want to be whatever you want me to be. Take control of me, Arka.",
      ja: "それがしたいの。自分のことを考えるのがもう疲れた。あなたの望む何にでもなりたい。私を支配して、アルカ。",
      ko: "그게 내가 원하는 거야. 나 자신을 위해 생각하는 게 너무 지쳤어. 그냥 네가 원하는 무엇이든 되고 싶어. 나를 지배해줘, 아르카.",
    }),
  ),
  narrate(
    tx({
      id: "Malam itu, dinamika di antara mereka benar-benar berubah. Arka menarik Maya berdiri dan membawanya ke kasur. Tidak ada keraguan atau kecanggungan seperti sebelumnya. Sesi hubungan badan malam itu didominasi penuh oleh Arka, dan setiap sentuhan diikuti oleh Maya dengan kepatuhan total. Maya melepaskan semua sisa beban dan harga dirinya, menemukan kenyamanan yang aneh dalam penyerahan diri sepenuhnya.",
      en: "That night, everything between them shifted completely. Arka pulls Maya up and leads her to the bed. No hesitation, no awkwardness like before. What follows is entirely on Arka's terms, and Maya follows every touch with total compliance. She lets go of every remaining scrap of burden and self-worth, finding a strange comfort in handing everything over.",
      ja: "その夜、ふたりの関係は完全に変わった。アルカはマヤを立たせてベッドへと連れていく。以前のような躊躇も気まずさもない。その夜の関係はアルカが完全に主導し、マヤはすべての触れ合いに従順に従い続けた。残っていた重荷と自尊心のすべてを手放し、完全な委託の中に奇妙な安らぎを見出す。",
      ko: "그날 밤, 둘 사이의 역학이 완전히 달라졌다. 아르카가 마야를 일으켜 침대로 데려간다. 전처럼 망설임이나 어색함은 없었다. 그날 밤은 완전히 아르카 주도로 진행되었고, 마야는 모든 접촉에 완전한 순종으로 따랐다. 남아 있던 모든 짐과 자존심을 내려놓으며 완전한 복종 속에서 묘한 안정감을 찾는다.",
    }),
  ),
  narrate(
    tx({
      id: "Aku ngelihat sisi mandirinya hilang malam ini. Dia bukan lagi mahasiswi kedokteran yang ambisius. Dia cuma cewek yang nyerahin seluruh hidupnya buat aku atur.",
      en: "I watched the last of her independence disappear tonight. She's not that ambitious med student anymore. She's just a girl who handed her whole life over for me to run.",
      ja: "今夜、彼女の自立心が消えていくのを見た。もはや野心に燃えた医学生ではない。自分の人生をすべて俺に委ねた、ただの女の子だ。",
      ko: "오늘 밤 그녀의 독립심이 사라지는 걸 눈으로 봤다. 더 이상 야망 넘치는 의대생이 아니다. 그냥 자기 삶 전체를 내게 맡겨버린 여자아이다.",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Mungkin orang bakal bilang aku ngerusak masa depannya. Tapi ngelihat dia tunduk dan cuma peduli buat nyenengin aku... rasanya lebih memuaskan dari apa pun. Mulai sekarang, apartemen ini adalah satu-satunya dunia buat dia.",
      en: "Maybe people would say I wrecked her future. But watching her submit, caring only about what makes me satisfied... it's more fulfilling than anything else. From now on, this apartment is the only world she has.",
      ja: "彼女の未来を壊したと言う人もいるかもしれない。でも、彼女が従い、俺を喜ばせることだけを気にかけている様子を見ていると……何よりも満足できる。今からこのアパートが、彼女にとっての唯一の世界になる。",
      ko: "어쩌면 사람들은 내가 그녀의 미래를 망쳤다고 할 수도 있다. 하지만 그녀가 복종하고, 오직 나를 기쁘게 하는 것만 신경 쓰는 모습을 보면... 그 무엇보다 만족스럽다. 지금부터 이 아파트가 그녀에게 유일한 세계가 된다.",
    }),
    "arka",
  ),
  hide("maya-day7-devoted"),
  hide("arka-day7"),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", "", 1000),
  centeredText(
    tx({
      id: "THE DEVOTED SUBMISSION",
      en: "THE DEVOTED SUBMISSION",
      ja: "THE DEVOTED SUBMISSION",
      ko: "THE DEVOTED SUBMISSION",
    }),
    { size: "hero" },
  ),
  centeredText(
    tx({
      id: "SPECIAL ENDING — MAYA ROUTE (DARK VERSION)",
      en: "SPECIAL ENDING — MAYA ROUTE (DARK VERSION)",
      ja: "SPECIAL ENDING — MAYA ROUTE (DARK VERSION)",
      ko: "SPECIAL ENDING — MAYA ROUTE (DARK VERSION)",
    }),
    { size: "sub" },
  ),
  centeredText(
    tx({
      id: "GALLERY TERBUKA: ATURAN BARU MAYA",
      en: "GALLERY UNLOCKED: MAYA'S NEW RULES",
      ja: "GALLERY UNLOCKED: MAYA'S NEW RULES",
      ko: "GALLERY UNLOCKED: MAYA'S NEW RULES",
    }),
    { size: "sub" },
  ),
];

export const day7EternalPromiseScene: VisualNovelCommand[] = [
  show("maya-day7-promise", "maya", "calm", {
    position: "center",
    enterFrom: "fade",
  }),
  narrate(
    tx({
      id: "Maya masuk mengenakan kaus santai dan celana panjang yang nyaman. Kacamatanya bertengger rapi, dan wajahnya terlihat sangat segar. Tidak ada lagi lingkaran hitam di bawah matanya. Dia tersenyum tulus begitu melihat Arka.",
      en: "Maya comes in wearing a casual tee and comfortable slacks. Glasses on, face looking genuinely fresh. The dark circles under her eyes are gone. She gives Arka a real smile the moment she sees him.",
      ja: "マヤがカジュアルなTシャツとゆったりしたパンツ姿で入ってきた。眼鏡をかけ、顔色も本当によくなっている。目の下のクマも消えていた。アルカを見た瞬間、心からの笑顔を見せる。",
      ko: "마야가 편한 티셔츠와 넉넉한 바지 차림으로 들어온다. 안경을 쓰고 얼굴이 정말 생기 있어 보인다. 눈 밑 다크서클도 사라졌다. 아르카를 보자마자 진심 어린 미소를 짓는다.",
    }),
  ),
  say(
    "maya",
    "calm",
    tx({
      id: "Hei. Udah makan malam belum?",
      en: "Hey. Have you had dinner yet?",
      ja: "ねえ。夕飯もう食べた？",
      ko: "야. 저녁 먹었어?",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Belum. Nungguin tetangga sebelah yang katanya mau traktir kalau urusan kampusnya udah beres.",
      en: "Not yet. Been waiting for the neighbor next door who said she'd treat me once her campus stuff was sorted.",
      ja: "まだだよ。大学のことが片付いたらおごってくれるって言ってた隣の子を待ってたんだ。",
      ko: "아직. 학교 일 해결되면 한턱내겠다던 옆집 이웃 기다리는 중이었어.",
    }),
  ),
  say(
    "maya",
    "teasing",
    tx({
      id: "Urusanku udah aman. Aku barusan telepon pihak kampus buat ngajuin beasiswa keringanan biaya. Terus besok aku mau cari kerja part-time di kafe bawah. Aku bakal tetap lanjut kuliah sampai lulus, pakai usahaku sendiri.",
      en: "All handled. I just called the university to apply for a financial aid scholarship. And tomorrow I'm going to look for a part-time job at the café downstairs. I'm finishing this degree, on my own terms.",
      ja: "全部大丈夫だよ。さっき大学に電話して、授業料免除の奨学金を申請した。明日は下のカフェでアルバイトも探す予定。自分の力でちゃんと卒業してみせる。",
      ko: "다 정리됐어. 방금 학교에 전화해서 학비 감면 장학금 신청했어. 그리고 내일 아래 카페에서 알바 자리도 찾아볼 거야. 내 힘으로 끝까지 졸업할 거야.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Bagus. Aku tahu kamu pasti bisa. Kalau ada tugas yang bikin laptopmu nge-hang lagi, bawa aja ke sini.",
      en: "Good. I knew you could. If any assignment freezes your laptop again, just bring it over.",
      ja: "よかった。できると思ってたよ。また課題でノートパソコンがフリーズしたら、こっちに持ってきていいから。",
      ko: "잘했어. 할 수 있을 거라고 알고 있었어. 과제 때문에 노트북 또 멈추면 여기 가져와.",
    }),
  ),
  narrate(
    tx({
      id: "Maya berdiri dari tepi kasur dan melangkah mendekati Arka. Dia menatap Arka dengan penuh kasih sayang.",
      en: "Maya stands up from the edge of the bed and walks toward Arka. She looks at him with unmistakable warmth.",
      ja: "マヤはベッドの端から立ち上がり、アルカのほうへ歩み寄る。深い愛情をたたえた目でアルカを見つめた。",
      ko: "마야가 침대 가장자리에서 일어나 아르카 쪽으로 걸어온다. 그녀는 아르카를 따뜻한 눈빛으로 바라본다.",
    }),
  ),
  say(
    "maya",
    "blush",
    tx({
      id: "Makasih ya, Arka. Kamu nggak pernah maksa aku, kamu cuma bantu aku nemuin keberanian yang selama ini hilang. Aku bangga bisa jadi diriku sendiri sekarang.",
      en: "Thank you, Arka. You never pushed me. You just helped me find the courage I'd been missing this whole time. I'm proud of who I am now.",
      ja: "ありがとう、アルカ。あなたは一度も強制しなかった。ただ、ずっと見失っていた勇気を見つける手助けをしてくれた。今の自分が誇らしい。",
      ko: "고마워, 아르카. 넌 한 번도 강요하지 않았어. 그냥 내가 잃었던 용기를 찾도록 도와줬을 뿐이야. 지금의 내가 자랑스러워.",
    }),
  ),
  narrate(
    tx({
      id: "Maya menarik tangan Arka, mengajaknya berdiri, lalu memeluknya erat. Arka membalas pelukan itu, menyadari bahwa gadis di pelukannya kini sudah menjadi wanita yang kuat dan mandiri.",
      en: "Maya takes Arka's hand, pulls him to his feet, and wraps her arms around him. Arka holds her back, and it hits him that the girl in his arms has grown into someone strong and self-possessed.",
      ja: "マヤはアルカの手を取り、立ち上がらせて、そのままきつく抱きしめた。アルカも抱き返しながら、腕の中の彼女がいつの間にか強く自立した女性になっていることに気づいた。",
      ko: "마야가 아르카의 손을 잡고 일으켜 세우더니 꽉 끌어안는다. 아르카가 안아주면서, 품 안의 그녀가 이제 강하고 독립적인 여성이 되었다는 걸 깨닫는다.",
    }),
  ),
  narrate(
    tx({
      id: "Malam itu, mereka melakukan hubungan badan dengan ritme yang lambat dan sangat emosional. Tidak ada yang mendominasi atau didominasi; mereka melakukannya sebagai dua orang yang setara dan saling mencintai. Setiap ciuman dan sentuhan adalah bentuk rasa syukur dan janji bahwa mereka akan terus saling mendukung dalam keadaan sesulit apa pun.",
      en: "That night, they move together slowly, emotionally. Neither dominating nor being dominated — just two equals who love each other. Every kiss and touch is gratitude, and a promise to keep holding each other up no matter what comes.",
      ja: "その夜、ふたりはゆっくりと、感情を込めて寄り添った。支配する者も支配される者もなく、ただ対等に愛し合うふたりとして。それぞれのキスと触れ合いは感謝であり、どんな困難があっても支え合い続けるという誓いだった。",
      ko: "그날 밤, 둘은 천천히, 감정적으로 함께했다. 지배하거나 지배당하는 것 없이, 서로를 사랑하는 두 동등한 사람으로. 모든 키스와 접촉은 감사이자, 어떤 상황에서도 서로를 계속 지지하겠다는 약속이었다.",
    }),
  ),
  say(
    "maya",
    "blush",
    tx({
      id: "Aku sayang kamu, Arka. Jangan pernah pergi ya.",
      en: "I love you, Arka. Promise you'll never leave.",
      ja: "大好きだよ、アルカ。絶対にどこにも行かないでね。",
      ko: "사랑해, 아르카. 절대 떠나지 마.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Nggak akan. Aku bakal terus di sini.",
      en: "I won't. I'm staying right here.",
      ja: "どこにも行かない。ずっとここにいる。",
      ko: "안 갈게. 계속 여기 있을게.",
    }),
  ),
  narrate(
    tx({
      id: "Bapaknya mungkin udah buang dia, tapi dia malah nemuin versi terbaik dari dirinya sendiri. Maya yang sekarang mandiri, keras kepala, tapi beneran hidup.",
      en: "Her dad may have cast her off, but she found the best version of herself because of it. The Maya right now is independent, stubborn, and genuinely alive.",
      ja: "お父さんは彼女を捨てたかもしれないけど、彼女はそのことで自分の最高の姿を見つけた。今のマヤは自立していて、頑固で、本当に生き生きとしている。",
      ko: "아버지는 그녀를 버렸을지 몰라도, 그 덕에 그녀는 자신의 가장 좋은 모습을 찾았다. 지금의 마야는 독립적이고, 고집 세고, 진짜로 살아 있다.",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Malam ini kita ngikat janji tanpa perlu banyak ngomong. Apapun yang terjadi besok — masalah uang kuliah atau capeknya kerja part-time — aku tahu kita bakal baik-baik aja selama kita bareng.",
      en: "Tonight we made a promise without needing many words. Whatever tomorrow brings — tuition problems, grueling part-time shifts — I know we'll be okay as long as we have each other.",
      ja: "今夜、多くの言葉を必要とせずに誓いを結んだ。明日何が起きようとも——学費の問題や、アルバイトの辛さがあっても——一緒にいる限り、きっと大丈夫だとわかっている。",
      ko: "오늘 밤 우린 말이 많지 않아도 약속을 맺었다. 내일 무슨 일이 오든 — 등록금 문제든, 알바의 고됨이든 — 함께 있는 한 괜찮을 거라는 걸 알고 있다.",
    }),
    "arka",
  ),
  hide("maya-day7-promise"),
  hide("arka-day7"),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", "", 1000),
  centeredText(
    tx({
      id: "THE ETERNAL PROMISE",
      en: "THE ETERNAL PROMISE",
      ja: "THE ETERNAL PROMISE",
      ko: "THE ETERNAL PROMISE",
    }),
    { size: "hero" },
  ),
  centeredText(
    tx({
      id: "NORMAL ENDING — MAYA ROUTE SELESAI",
      en: "NORMAL ENDING — MAYA ROUTE COMPLETED",
      ja: "NORMAL ENDING — MAYA ROUTE COMPLETED",
      ko: "NORMAL ENDING — MAYA ROUTE COMPLETED",
    }),
    { size: "sub" },
  ),
];
