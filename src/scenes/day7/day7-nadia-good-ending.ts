import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  blackScreen,
  centeredText,
  clearBlackScreen,
  cutScene,
  hide,
  narrate,
  playBgm,
  say,
  scene,
  setFlag,
  show,
} from "@/scenes/scriptTypes";
import nadiaGoodEndingBgm from "@/music/good-nadia.mp3";
import nadiaSpecialBgm from "@/music/special-scene-nadia.mp3";
import nadiaGoodEnding1Url from "@/background/nadia good ending 1.png";
import nadiaGoodEnding2Url from "@/background/nadia good ending 2.png";
import nadiaGoodEnding3Url from "@/background/nadia good ending 3.png";
import nadiaGoodEnding4Url from "@/background/nadia good ending 4.png";
import nadia99 from "@/voice/nadia/nadia_00099.mp3";
import nadia100 from "@/voice/nadia/nadia_000100.mp3";
import nadia101 from "@/voice/nadia/nadia_000101.mp3";
import nadia102 from "@/voice/nadia/nadia_000102.mp3";
import nadia103 from "@/voice/nadia/nadia_000103.mp3";
import nadia104 from "@/voice/nadia/nadia_000104.mp3";
import nadia105 from "@/voice/nadia/nadia_000105.mp3";
import nadia106 from "@/voice/nadia/nadia_000106.mp3";
import nadia107 from "@/voice/nadia/nadia_000107.mp3";
import nadia108 from "@/voice/nadia/nadia_000108.mp3";
import nadia109 from "@/voice/nadia/nadia_000109.mp3";
import nadiaGoodEnding1 from "@/cut-scene/nadia-good-ending-1.webm";
import nadiaGoodEnding2 from "@/cut-scene/nadia-good-ending-2.webm";
import nadiaGoodEnding3 from "@/cut-scene/nadia-good-ending-3.webm";
import nadiaGoodEnding3Sound from "@/voice/nadia/nadia-good-ending-3-audio.wav";
import nadiaGoodEnding4 from "@/cut-scene/nadia-good-ending-4.webm";
import nadiaGoodEnding4Sound from "@/voice/nadia/nadia-good-ending-4-audio.wav";
import nadiaGoodEnding5 from "@/cut-scene/nadia-good-ending-5.webm";
import nadiaGoodEnding5Sound from "@/voice/nadia/nadia-good-ending-5-audio.wav";
import nadiaGoodEnding6 from "@/cut-scene/nadia-good-ending-6.webm";
import nadiaGoodEnding6Sound from "@/voice/nadia/nadia-good-ending-6-audio.wav";
import nadiaGoodEnding7 from "@/cut-scene/nadia-good-ending-7.webm";
import nadiaGoodEnding7Sound from "@/voice/nadia/nadia-good-ending-7-audio.wav";
import nadiaGoodEnding8 from "@/cut-scene/nadia-good-ending-8.webm";
import nadiaGoodEnding8Sound from "@/voice/nadia/nadia-good-ending-8-audio.wav";

export const day7NadiaGoodEndingScene: VisualNovelCommand[] = [
  playBgm(nadiaGoodEndingBgm),
  hide("arka-day6-nadia"),
  hide("nadia-day6"),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", "", 1000),
  centeredText(
    tx({
      id: "DUA TAHUN KEMUDIAN",
      en: "TWO YEARS LATER",
      ja: "2年後",
      ko: "2년 후",
    }),
    { size: "hero" },
  ),
  bg(
    nadiaGoodEnding1Url,
    tx({
      id: "Bandara - Siang Hari",
      en: "Airport - Daytime",
      ja: "空港 - 昼",
      ko: "공항 - 낮",
    }),
    {
      backgroundAnimation: {
        drift: true,
        zoom: 1.1,
        panX: 3,
        panY: 1.5,
        duration: 22,
      },
    },
  ),
  narrate(
    tx({
      id: "Dua tahun.",
      en: "Two years.",
      ja: "二年。",
      ko: "2년.",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Dua tahun aku melihat Nadia berjuang naik dari streamer kecil yang hampir menyerah, menjadi salah satu nama yang diperhitungkan.",
      en: "Two years of watching Nadia fight her way up from a small-time streamer on the verge of quitting to one of the names that counts.",
      ja: "二年間、諦めかけていた小さなストリーマーから、一目置かれる存在になるまでのナディアの奮闘を見てきた。",
      ko: "2년 동안 포기할 뻔했던 작은 스트리머에서 인정받는 이름이 되기까지 나디아의 분투를 지켜봤다.",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Aku masih ingat malam itu, saat dia duduk di sofa unit 102 dengan mata lelah, bertanya apakah dia harus beralih ke konten dewasa. Aku bilang tidak. Dan sejak hari itu, aku ikut menanggung akibatnya.",
      en: "I still remember that night, when she sat on the sofa in unit 102 with tired eyes, asking whether she should switch to adult content. I said no. And from that day on, I carried the consequences with her.",
      ja: "あの夜のことは今でも覚えている。102号室のソファに疲れた目で座り、大人向けコンテンツに切り替えるべきかと聞いてきたナディア。俺は違うと言った。あの日から、その結果を一緒に背負うことになった。",
      ko: "그날 밤이 아직도 기억난다. 102호 소파에 지친 눈으로 앉아 성인 콘텐츠로 전환해야 할지 물어보던 그녀. 나는 아니라고 했고, 그날부터 나도 그 대가를 함께 짊어졌다.",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Ada hari-hari di mana view-nya anjlok. Ada malam di mana dia menangis di depan laptop karena donasi sepi. Ada kalanya dia hampir menyerah dan bilang, “Maybe I should just do it.” Tapi setiap kali itu terjadi, aku selalu ada di sampingnya.",
      en: "There were days when her views plummeted. Nights when she cried in front of her laptop because donations dried up. Times when she almost gave up and said, “Maybe I should just do it.” But every time it happened, I was right there beside her.",
      ja: "視聴数が落ち込んだ日もあった。投げ銭が止まって、パソコンの前で泣いた夜もあった。諦めかけて「もうやっちゃおうかな」と言ったこともあった。でもそのたび、俺はいつも彼女の隣にいた。",
      ko: "조회수가 폭락한 날도 있었다. 후원이 끊겨 노트북 앞에서 울던 밤도 있었다. “그냥 해 버릴까”라며 포기할 뻔한 적도 있었다. 하지만 그럴 때마다 나는 항상 그녀 곁에 있었다.",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Kita atur jadwal stream bersama. Aku bantu ide konten, thumbnail, bahkan kadang jadi editor dadakan. Pelan-pelan, tanpa jalan pintas, angka itu naik. Bukan karena konten panas, tapi karena dia konsisten, lucu, dan jujur di depan kamera.",
      en: "We planned her stream schedule together. I helped with content ideas and thumbnails, sometimes even becoming a makeshift editor. Slowly, with no shortcuts, the numbers climbed. Not because of racy content, but because she was consistent, funny, and honest on camera.",
      ja: "一緒に配信スケジュールを立てた。コンテンツのアイデアもサムネイルも手伝い、時には臨時の編集者にもなった。近道なしで、少しずつ数字は伸びていった。過激なコンテンツのおかげじゃない。彼女が一貫していて、面白くて、カメラの前で正直だったからだ。",
      ko: "우리는 함께 방송 일정을 짰다. 콘텐츠 아이디어와 썸네일을 도왔고, 가끔은 즉석 편집자가 되기도 했다. 지름길 없이 천천히 숫자는 올랐다. 선정적인 콘텐츠 때문이 아니라, 그녀가 꾸준하고 재밌고 카메라 앞에서 정직했기 때문이다.",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Dan sekarang…",
      en: "And now…",
      ja: "そして今…",
      ko: "그리고 지금…",
    }),
    "arka",
  ),
  bg(
    nadiaGoodEnding2Url,
    tx({
      id: "Bandara - Area Kedatangan",
      en: "Airport - Arrival Area",
      ja: "空港 - 到着エリア",
      ko: "공항 - 도착 구역",
    }),
  ),
  narrate(
    tx({
      id: "Suasana bandara cukup ramai. Arka berdiri di dekat pintu kedatangan sambil memegang kopi dingin.",
      en: "The airport is fairly crowded. Arka stands near the arrival gate holding a cold coffee.",
      ja: "空港はかなり混み合っている。アルカは冷たいコーヒーを持って到着口の近くに立っていた。",
      ko: "공항은 꽤 붐비고 있다. 아르카는 차가운 커피를 들고 도착 게이트 근처에 서 있다.",
    }),
  ),
  narrate(
    tx({
      id: "Tidak lama kemudian, seorang wanita berambut panjang dengan topi dan masker mendekat. Saat maskernya diturunkan, senyum familiar itu muncul.",
      en: "Not long after, a long-haired woman in a hat and mask approaches. When she pulls the mask down, that familiar smile appears.",
      ja: "ほどなくして、帽子にマスク姿の長い髪の女性が近づいてくる。マスクを下ろすと、あの見覚えのある笑顔が現れた。",
      ko: "얼마 지나지 않아 긴 머리에 모자와 마스크를 쓴 여성이 다가온다. 마스크를 내리자 익숙한 그 미소가 드러난다.",
    }),
  ),
  show("nadia-day7-good", "nadia", "newSmile", {
    position: "center",
    enterFrom: "fade",
  }),
  say(
    "nadia",
    "newSmile",
    tx({
      id: "Sayangg. Kamu nungguin dari tadi?",
      en: "Babe. Have you been waiting long?",
      ja: "あなた。ずっと待ってたの？",
      ko: "자기야. 오래 기다렸어?",
    }),
    { voice: nadia99 },
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Baru 20 menit. Pesawatmu delay.",
      en: "Just 20 minutes. Your flight was delayed.",
      ja: "まだ20分だよ。お前の便、遅延してただろ。",
      ko: "겨우 20분. 네 비행기 지연됐잖아.",
    }),
  ),
  say(
    "nadia",
    "newSmile",
    tx({
      id: "Aku kan seleb sekarang. Wajar kalau agak molor.",
      en: "I'm a celebrity now. A little delay is normal.",
      ja: "私、今ではセレブだもん。少し遅れるくらい普通でしょ。",
      ko: "나 이제 연예인이잖아. 좀 늦는 건 당연하지.",
    }),
    { voice: nadia100 },
  ),
  narrate(
    tx({
      id: "Ia tertawa kecil, lalu tanpa ragu memeluk Arka di tengah keramaian.",
      en: "She laughs softly, then hugs Arka right in the middle of the crowd without hesitation.",
      ja: "彼女は小さく笑うと、人混みの真ん中でためらわずアルカに抱きついた。",
      ko: "그녀는 작게 웃더니 망설임 없이 사람들 한가운데서 아르카를 껴안는다.",
    }),
  ),
  say(
    "nadia",
    "newSmile",
    tx({
      id: "Aku kangen.",
      en: "I missed you.",
      ja: "会いたかった。",
      ko: "보고 싶었어.",
    }),
    { voice: nadia101 },
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Baru seminggu nggak ketemu.",
      en: "It's only been a week.",
      ja: "まだ一週間会ってないだけだろ。",
      ko: "겨우 일주일 못 본 거잖아.",
    }),
  ),
  say(
    "nadia",
    "newNormal",
    tx({
      id: "Seminggu itu lama.",
      en: "A week is a long time.",
      ja: "一週間は長いよ。",
      ko: "일주일이면 길지.",
    }),
    { voice: nadia102 },
  ),
  narrate(
    tx({
      id: "Mereka berjalan menuju exit. Nadia menyandarkan kepalanya di bahu Arka sambil menyeret koper kecil.",
      en: "They walk toward the exit. Nadia rests her head on Arka's shoulder while dragging her small suitcase.",
      ja: "二人は出口へ向かって歩く。ナディアは小さなスーツケースを引きながら、アルカの肩に頭を預けた。",
      ko: "둘은 출구를 향해 걷는다. 나디아는 작은 캐리어를 끌며 아르카의 어깨에 머리를 기댄다.",
    }),
  ),
  say(
    "nadia",
    "newSmile",
    tx({
      id: "Kamu tahu nggak? Kemarin sponsor besar akhirnya setuju. Kontrak dua tahun.",
      en: "You know what? The big sponsor finally agreed yesterday. A two-year contract.",
      ja: "ねえ、聞いた？昨日、あの大きなスポンサーがついにOKしたんだ。二年契約だよ。",
      ko: "있지, 알아? 어제 그 큰 스폰서가 드디어 승낙했어. 2년 계약이야.",
    }),
    { voice: nadia103 },
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Selamat.",
      en: "Congrats.",
      ja: "おめでとう。",
      ko: "축하해.",
    }),
  ),
  hide("nadia-day7-good", "fadeAway"),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", "", 1000),
  bg(
    nadiaGoodEnding3Url,
    tx({
      id: "Villa Tepi Pantai - Senja",
      en: "Beachside Villa - Sunset",
      ja: "海辺のヴィラ - 夕暮れ",
      ko: "해변 빌라 - 석양",
    }),
    {
      backgroundAnimation: {
        drift: true,
        zoom: 1.12,
        panX: 3.5,
        panY: 2,
        duration: 26,
      },
    },
  ),
  narrate(
    tx({
      id: "Setelah Nadia pergi ke luar negeri untuk menemui sponsor besar, akhirnya kami punya waktu untuk liburan berdua.",
      en: "After Nadia flew abroad to meet the big sponsor, we finally had time for a vacation together.",
      ja: "ナディアが大きなスポンサーに会うため海外へ行ったあと、ようやく二人で休暇を過ごす時間ができた。",
      ko: "나디아가 큰 스폰서를 만나러 해외에 다녀온 뒤, 우리는 마침내 둘만의 휴가 시간을 갖게 되었다.",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Tanpa stream, tanpa angka, tanpa tekanan.",
      en: "No streams, no numbers, no pressure.",
      ja: "配信も、数字も、プレッシャーもなく。",
      ko: "방송도, 숫자도, 압박도 없이.",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Hanya kami berdua di villa kecil di tepi pantai.",
      en: "Just the two of us in a small villa by the beach.",
      ja: "海辺の小さなヴィラで、二人きりだった。",
      ko: "해변가의 작은 빌라에서 우리 둘뿐이었다.",
    }),
    "arka",
  ),
  bg(
    nadiaGoodEnding4Url,
    tx({
      id: "Villa Tepi Pantai",
      en: "Beachside Villa",
      ja: "海辺のヴィラ",
      ko: "해변 빌라",
    }),
  ),
  show("nadia-day7-good-villa", "nadia", "newNormal", {
    position: "center",
    enterFrom: "fade",
  }),
  say(
    "nadia",
    "newNormal",
    tx({
      id: "Habis ini kamu mau balik ke apartemen, atau ikut aku dulu?",
      en: "After this, are you heading back to the apartment, or coming with me first?",
      ja: "これが終わったら、アパートに戻るの？それとも先に私についていく？",
      ko: "이거 끝나면 아파트로 돌아갈 거야, 아니면 먼저 나 따라갈래?",
    }),
    { voice: nadia104 },
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Tergantung kamu. Kalau masih butuh temenin, aku ikut.",
      en: "Up to you. If you still need company, I'll come along.",
      ja: "お前次第だ。まだ付き添いが必要なら、ついていくよ。",
      ko: "네가 정하기 나름이야. 아직 동행이 필요하면 같이 갈게.",
    }),
  ),
  say(
    "nadia",
    "newNormal",
    tx({
      id: "Aku memang masih butuh. Tapi bukan cuma buat urusan kerja.",
      en: "I do still need you. But not just for work stuff.",
      ja: "必要よ、確かに。でも仕事のことだけじゃない。",
      ko: "필요해, 맞아. 하지만 일 때문만은 아니야.",
    }),
    { voice: nadia105 },
  ),
  narrate(
    tx({
      id: "Ia menoleh ke Arka.",
      en: "She turns toward Arka.",
      ja: "彼女はアルカのほうを向く。",
      ko: "그녀는 아르카를 바라본다.",
    }),
  ),
  say(
    "nadia",
    "newNormal",
    tx({
      id: "Aku lagi mikir… setelah kontrak ini selesai, aku mau lebih sering istirahat. Nggak terus-terusan kejar angka.",
      en: "I've been thinking... after this contract is done, I want to take more breaks. No more chasing numbers nonstop.",
      ja: "考えてたんだけど…この契約が終わったら、もっと休みを取りたい。もうずっと数字を追いかけるのはやめたいの。",
      ko: "생각해 봤는데… 이번 계약이 끝나면 쉬는 시간을 더 많이 갖고 싶어. 계속 숫자만 쫓고 싶지는 않아.",
    }),
    { voice: nadia106 },
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Aku rasa itu ide yang bagus.",
      en: "I think that's a good idea.",
      ja: "いい考えだと思うよ。",
      ko: "좋은 생각이라고 봐.",
    }),
  ),
  say(
    "nadia",
    "newSmile",
    tx({
      id: "Terus… aku juga mau lebih sering sama kamu. Bukan cuma pas lagi liburan begini.",
      en: "And... I want to be with you more often too. Not just on vacations like this.",
      ja: "それから…あなたともっと一緒にいたい。こういう休暇のときだけじゃなくて。",
      ko: "그리고… 너랑 더 자주 있고 싶어. 이렇게 휴가 때만 말고.",
    }),
    { voice: nadia107 },
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Aku juga.",
      en: "Me too.",
      ja: "俺もだ。",
      ko: "나도.",
    }),
  ),
  narrate(
    tx({
      id: "Nadia tersenyum kecil, lalu menyandarkan kepalanya sejenak di bahu Arka.",
      en: "Nadia smiles faintly, then rests her head on Arka's shoulder for a moment.",
      ja: "ナディアは小さく微笑むと、しばらくアルカの肩に頭を預けた。",
      ko: "나디아는 작게 미소 짓더니 잠시 아르카의 어깨에 머리를 기댄다.",
    }),
  ),
  say(
    "nadia",
    "newSmile",
    tx({
      id: "Bagus. Nanti kita bahas pelan-pelan. Malam ini aku nggak mau mikir yang ribet.",
      en: "Good. We'll talk it through slowly later. Tonight I don't want to think about anything complicated.",
      ja: "よかった。あとはゆっくり話そう。今夜は難しいこと考えたくないの。",
      ko: "좋아. 자세한 건 나중에 천천히 얘기하자. 오늘 밤은 복잡한 생각하기 싫어.",
    }),
    { voice: nadia108 },
  ),
  hide("nadia-day7-good-villa", "fadeAway"),
  playBgm(nadiaSpecialBgm),
  blackScreen(),
  say(
    "nadia",
    "newSmile",
    tx({
      id: "Langitnya bagus banget hari ini.",
      en: "The sky is beautiful today.",
      ja: "今日の空、すごく綺麗だね。",
      ko: "오늘 하늘 진짜 예쁘다.",
    }),
    { voice: nadia109 },
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Iya.",
      en: "Yeah.",
      ja: "うん。",
      ko: "응.",
    }),
  ),
  clearBlackScreen(),
  cutScene(nadiaGoodEnding1, true, [
    {
      text: tx({
        id: "Nadia: “Tapi aku lebih suka view yang ini.”",
        en: "Nadia: “But I prefer this view.”",
        ja: "ナディア：「でも、こっちの眺めのほうが好き。」",
        ko: "나디아: “그래도 난 이 쪽 뷰가 더 좋아.”",
      }),
    },
  ]),
  cutScene(nadiaGoodEnding2, true, [
    {
      text: tx({
        id: "Arka: “Hmm.”",
        en: "Arka: “Hmm.”",
        ja: "アルカ：「ん。」",
        ko: "아르카: “음.”",
      }),
    },
    {
      text: tx({
        id: "Nadia: “Dari tadi kamu tahan terus ya?”",
        en: "Nadia: “You've been holding back this whole time, haven't you?”",
        ja: "ナディア：「さっきからずっと我慢してるんでしょ？」",
        ko: "나디아: “아까부터 계속 참고 있었지?”",
      }),
    },
    {
      text: tx({
        id: "Arka: “Sedikit.”",
        en: "Arka: “A little.”",
        ja: "アルカ：「少し。」",
        ko: "아르카: “조금.”",
      }),
    },
    {
      text: tx({
        id: "Nadia: “Jangan ditahan. Aku udah siap.”",
        en: "Nadia: “Don't hold back. I'm ready.”",
        ja: "ナディア：「我慢しないで。もう準備できてるから。」",
        ko: "나디아: “참지 마. 나 준비됐어.”",
      }),
    },
    {
      text: tx({
        id: "Ia membuka kemeja tipisnya.",
        en: "She opens her thin shirt.",
        ja: "彼女は薄いシャツを開く。",
        ko: "그녀는 얇은 셔츠를 풀어 연다.",
      }),
    },
    {
      text: tx({
        id: "Nadia: “Biar aku yang atur dulu.”",
        en: "Nadia: “Let me take the lead first.”",
        ja: "ナディア：「先に私がリードさせて。」",
        ko: "나디아: “처음엔 내가 리드할게.”",
      }),
    },
  ]),
  cutScene(
    nadiaGoodEnding3,
    true,
    [
    {
      text: tx({
        id: "Nadia memposisikan diri di atas Arka, lalu menurunkan tubuhnya perlahan.",
        en: "Nadia positions herself on top of Arka, then slowly lowers her body.",
        ja: "ナディアはアルカの上に跨り、ゆっくりと腰を下ろした。",
        ko: "나디아는 아르카 위에 자세를 잡고 천천히 몸을 내린다.",
      }),
    },
    {
      text: tx({
        id: "Nadia: “Ahh… nnghh…”",
        en: "Nadia: “Ahh… nnghh…”",
        ja: "ナディア：「あっ…んんっ…」",
        ko: "나디아: “아앗… 으응…”",
      }),
    },
    {
      text: tx({
        id: "Nadia: “Ini…enak…banget…”",
        en: "Nadia: “This… feels… so good…”",
        ja: "ナディア：「これ…すごく…気持ちいい…」",
        ko: "나디아: “이거… 너무… 좋아…”",
      }),
    },
    {
      text: tx({
        id: "Nadia: “Nnghh… setiap kali turun… rasanya sampai dalam…”",
        en: "Nadia: “Nnghh… every time I sink down… it reaches so deep…”",
        ja: "ナディア：「んんっ…下ろすたびに…奥まで届いて…」",
        ko: "나디아: “으응… 내릴 때마다… 깊이 느껴져…”",
      }),
    },
    {
      text: tx({
        id: "Arka: “Kamu makin basah.”",
        en: "Arka: “You're getting wetter.”",
        ja: "アルカ：「どんどん濡れてるな。」",
        ko: "아르카: “점점 더 젖고 있어.”",
      }),
    },
    {
      text: tx({
        id: "Nadia: “Diam… nanti aku malu…”",
        en: "Nadia: “Hush… you're embarrassing me…”",
        ja: "ナディア：「だまれ…恥ずかしいから…」",
        ko: "나디아: “쉿… 부끄러워지잖아…”",
      }),
    },
    ],
    false,
    nadiaGoodEnding3Sound,
  ),
  cutScene(
    nadiaGoodEnding4,
    true,
    [
      {
        text: tx({
          id: "Beberapa saat kemudian, tempo Nadia mulai naik.",
          en: "A few moments later, Nadia's tempo starts to rise.",
          ja: "少しして、ナディアのペースが上がり始める。",
          ko: "잠시 후, 나디아의 속도가 빨라지기 시작한다.",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Ahh… aku mau lebih cepet…”",
          en: "Nadia: “Ahh… I want to go faster…”",
          ja: "ナディア：「あっ…もっと速くしたい…」",
          ko: "나디아: “아앗… 더 빠르게 하고 싶어…”",
        }),
      },
      {
        text: tx({
          id: "Arka: “Gerak terus… jangan berhenti.”",
          en: "Arka: “Keep moving… don't stop.”",
          ja: "アルカ：「動き続けろ…止まるな。」",
          ko: "아르카: “계속 움직여… 멈추지 마.”",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Nngghh… aku deket… Arka…”",
          en: "Nadia: “Nngghh… I'm close… Arka…”",
          ja: "ナディア：「んぐっ…近いよ…アルカ…」",
          ko: "나디아: “으응… 가까워… 아르카…”",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Cepetin dikit lagi… iya… gitu…!”",
          en: "Nadia: “Just a little faster… yes… like that…!”",
          ja: "ナディア：「もう少し速く…そう…それ…！」",
          ko: "나디아: “조금만 더 빠르게… 응… 그렇게…!”",
        }),
      },
      {
        text: tx({
          id: "Gerakannya semakin cepat dan tidak beraturan.",
          en: "Her movements grow faster and more erratic.",
          ja: "彼女の動きはさらに速く、不規則になっていく。",
          ko: "그녀의 움직임은 점점 빠르고 불규칙해진다.",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Ahh! Ahh! Di situ… jangan berhenti…!”",
          en: "Nadia: “Ahh! Ahh! Right there… don't stop…!”",
          ja: "ナディア：「あっ！あっ！そこ…止めないで…！」",
          ko: "나디아: “아앗! 아앗! 거기야… 멈추지 마…!”",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Aku… aku mau keluar…!”",
          en: "Nadia: “I… I'm going to come…!”",
          ja: "ナディア：「私…イキそう…！」",
          ko: "나디아: “나… 갈 것 같아…!”",
        }),
      },
    ],
    false,
    nadiaGoodEnding4Sound,
  ),
  cutScene(
    nadiaGoodEnding5,
    true,
    [
      {
        text: tx({
          id: "Nadia: “Nngghh… Arka… aku keluar…!!”",
          en: "Nadia: “Nngghh… Arka… I'm coming…!!”",
          ja: "ナディア：「んぐっ…アルカ…イく…!!」",
          ko: "나디아: “으응… 아르카… 나 가…!!”",
        }),
      },
      {
        text: tx({
          id: "Tubuh Nadia menegang dan gemetar hebat di atas Arka.",
          en: "Nadia's body tenses and trembles hard on top of Arka.",
          ja: "ナディアの体はアルカの上で強張り、激しく震える。",
          ko: "나디아의 몸이 아르카 위에서 경직되며 심하게 떨린다.",
        }),
      },
    ],
    false,
    nadiaGoodEnding5Sound,
  ),
  cutScene(
    nadiaGoodEnding6,
    true,
    [
      {
        text: tx({
          id: "Arka memegang pinggang Nadia dan mengubah posisi. Sekarang keduanya berbaring miring di kursi panjang balkon, tubuh Arka menempel dari belakang.",
          en: "Arka holds Nadia's waist and shifts position. Now they lie sideways on the balcony's lounge chair, Arka's body pressed against her from behind.",
          ja: "アルカはナディアの腰を掴み、体位を変える。今度はバルコニーの長椅子に横たわり、アルカの体が後ろからぴったり寄り添う。",
          ko: "아르카가 나디아의 허리를 잡고 자세를 바꾼다. 이제 둘은 발코니 긴 의자에 옆으로 누워 있고, 아르카의 몸이 뒤에서 밀착되어 있다.",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Ahh…! masih mau lagi?”",
          en: "Nadia: “Ahh…! You still want more?”",
          ja: "ナディア：「あっ…！まだする気？」",
          ko: "나디아: “아앗…! 아직도 더 하고 싶어?”",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Dalam banget…”",
          en: "Nadia: “So deep…”",
          ja: "ナディア：「すごく深い…」",
          ko: "나디아: “너무 깊어…”",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Nngghh… pelan dulu… biar aku rasain…”",
          en: "Nadia: “Nngghh… slowly at first… let me feel it…”",
          ja: "ナディア：「んぐっ…最初はゆっくり…感じさせて…」",
          ko: "나디아: “으응… 처음엔 천천히… 느끼게 해줘…”",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Ahh… setiap dorongan… sampai dalam…”",
          en: "Nadia: “Ahh… every thrust… reaches so deep…”",
          ja: "ナディア：「あっ…一突きごとに…奥まで届く…」",
          ko: "나디아: “아앗… 찌를 때마다… 깊이 닿아…”",
        }),
      },
      {
        text: tx({
          id: "Arka: “Suka?”",
          en: "Arka: “Like it?”",
          ja: "アルカ：「気に入った？」",
          ko: "아르카: “좋아?”",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Suka… lanjut… jangan berhenti…”",
          en: "Nadia: “I like it… keep going… don't stop…”",
          ja: "ナディア：「好き…続けて…止めないで…」",
          ko: "나디아: “좋아… 계속해… 멈추지 마…”",
        }),
      },
    ],
    false,
    nadiaGoodEnding6Sound,
  ),
  cutScene(
    nadiaGoodEnding7,
    true,
    [
      {
        text: tx({
          id: "Beberapa saat kemudian tempo Arka mulai naik.",
          en: "A few moments later, Arka's tempo starts to rise.",
          ja: "少しして、アルカのペースが上がり始める。",
          ko: "잠시 후, 아르카의 속도가 빨라지기 시작한다.",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Ahh… Ini terlalu cepat”",
          en: "Nadia: “Ahh… This is too fast”",
          ja: "ナディア：「あっ…速すぎる」",
          ko: "나디아: “아앗… 너무 빨라”",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Pinggulku bisa hancur…”",
          en: "Nadia: “My hips are going to break…”",
          ja: "ナディア：「腰が壊れちゃう…」",
          ko: "나디아: “허리가 부서질 것 같아…”",
        }),
      },
      {
        text: tx({
          id: "Gerakan semakin cepat dan dalam.",
          en: "The movements grow faster and deeper.",
          ja: "動きはさらに速く、深くなる。",
          ko: "움직임이 점점 더 빠르고 깊어진다.",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Nngghh… Arka… aku deket…”",
          en: "Nadia: “Nngghh… Arka… I'm close…”",
          ja: "ナディア：「んぐっ…アルカ…近い…」",
          ko: "나디아: “으응… 아르카… 가까워…”",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Hamili aku Arka….!”",
          en: "Nadia: “Get me pregnant, Arka…!”",
          ja: "ナディア：「孕ませて、アルカ…！」",
          ko: "나디아: “임신시켜 줘, 아르카…!”",
        }),
      },
    ],
    false,
    nadiaGoodEnding7Sound,
  ),
  cutScene(
    nadiaGoodEnding8,
    true,
    [
      {
        text: tx({
          id: "Nadia: “Nngghh… keluar… di dalam…!!”",
          en: "Nadia: “Nngghh… come… inside me…!!”",
          ja: "ナディア：「んぐっ…中に…出して…!!」",
          ko: "나디아: “으응… 안에… 싸 줘…!!”",
        }),
      },
      {
        text: tx({
          id: "Tubuh Nadia menegang dan gemetar hebat di pelukan Arka.",
          en: "Nadia's body tenses and trembles hard in Arka's embrace.",
          ja: "ナディアの体はアルカの腕の中で強張り、激しく震える。",
          ko: "나디아의 몸이 아르카의 품 안에서 경직되며 심하게 떨린다.",
        }),
      },
    ],
    false,
    nadiaGoodEnding8Sound,
  ),
  bg(
    nadiaGoodEnding3Url,
    tx({
      id: "Villa Tepi Pantai",
      en: "Beachside Villa",
      ja: "海辺のヴィラ",
      ko: "해변 빌라",
    }),
    {
      backgroundAnimation: {
        drift: true,
        zoom: 1.1,
        panX: 3,
        panY: 1.5,
        duration: 28,
      },
    },
  ),
  narrate(
    tx({
      id: "Dua tahun lalu aku hampir kehilangan dia ke jalan yang salah.",
      en: "Two years ago, I almost lost her to the wrong path.",
      ja: "二年前、俺は彼女を間違った道に失いそうになった。",
      ko: "2년 전, 나는 그녀를 잘못된 길로 잃을 뻔했다.",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Malam itu aku memilih untuk menahannya. Dan sekarang, dia ada di sini.",
      en: "That night, I chose to hold her back. And now, she's here.",
      ja: "あの夜、俺は彼女を引き留めることを選んだ。そして今、彼女はここにいる。",
      ko: "그날 밤 나는 그녀를 붙잡기로 했다. 그리고 지금, 그녀는 여기 있다.",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Bukan karena angka atau popularitas…",
      en: "Not because of the numbers or the fame…",
      ja: "数字や人気のせいじゃない…",
      ko: "숫자나 인기 때문이 아니라…",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Tapi karena dia memilih untuk tetap menjadi dirinya sendiri.",
      en: "But because she chose to stay true to herself.",
      ja: "彼女が自分らしさを貫くことを選んだからだ。",
      ko: "그녀가 자기 자신으로 남기를 선택했기 때문이다.",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Aku tidak menyesal bertahan.",
      en: "I don't regret holding on.",
      ja: "俺は引き留めて後悔していない。",
      ko: "나는 붙잡은 걸 후회하지 않는다.",
    }),
    "arka",
  ),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", "", 1000),
  centeredText(
    tx({
      id: "GOOD ENDING - NADIA",
      en: "GOOD ENDING - NADIA",
      ja: "GOOD ENDING - ナディア",
      ko: "GOOD ENDING - 나디아",
    }),
    { size: "hero" },
  ),
  centeredText(
    tx({
      id: "NADIA ROUTE SELESAI",
      en: "NADIA ROUTE COMPLETED",
      ja: "ナディアルート完了",
      ko: "나디아 루트 완료",
    }),
    { size: "sub" },
  ),
  setFlag("gallerySceneNadia3Unlocked", true),
  setFlag("nadiaGoodEndingCompleted", true),
];
