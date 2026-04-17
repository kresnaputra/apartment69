import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  hide,
  jump,
  menu,
  minigame,
  narrate,
  say,
  setFlag,
  show,
} from "@/scenes/scriptTypes";
import bedroomUrl from "@/background/bedroom.png";
import hallwayUrl from "@/background/hallway.png";
import { mayaDay1To4Voices } from "@/voice/maya/day1to4";

export const day6PapaConfrontationScene: VisualNovelCommand[] = [
  bg(
    bedroomUrl,
    tx({
      id: "Unit 302 - 10:00",
      en: "Unit 302 - 10:00",
      ja: "302号室 - 10:00",
      ko: "302호 - 10:00",
    }),
  ),
  show("arka-day6", "arka", "neutral", {
    position: "left",
    enterFrom: "fade",
  }),
  narrate(
    tx({
      id: "Pagi yang tenang. Arka lagi santai di depan PC, nggak ada yang perlu diurusin.",
      en: "A quiet morning. Arka is just chilling in front of his PC, nothing pressing on his plate.",
      ja: "穏やかな朝。アルカはパソコンの前でのんびりしていた。特にやることもない。",
      ko: "조용한 아침. 아르카는 PC 앞에서 여유롭게 앉아 있었다. 딱히 할 일도 없었다.",
    }),
  ),
  narrate(
    tx({
      id: "Tiba-tiba HP-nya bergetar berkali-kali. Panggilan masuk dari Maya mati sebelum sempat diangkat, disusul rentetan chat panik.",
      en: "Then his phone starts buzzing nonstop. A call from Maya cuts out before he can pick it up, followed immediately by a rapid string of panicked messages.",
      ja: "突然、スマホが何度も振動し始めた。マヤからの着信は出る前に切れ、続けざまにパニック状態のメッセージが届く。",
      ko: "갑자기 핸드폰이 연달아 진동했다. 마야의 전화는 받기도 전에 끊겼고, 뒤이어 다급한 메시지들이 쏟아졌다.",
    }),
  ),
  show("maya-day6-papa-confrontation", "maya", "worried", {
    position: "center",
    enterFrom: "fade",
  }),
  say(
    "maya",
    "worried",
    tx({
      id: "Arka tolong",
      en: "Arka help",
      ja: "アルカ助けて",
      ko: "아르카 도와줘",
    }),
    { voice: mayaDay1To4Voices[33] },
  ),
  say(
    "maya",
    "worried",
    tx({
      id: "Papa ada di bawah",
      en: "Dad's downstairs",
      ja: "お父さんが下にいる",
      ko: "아빠가 아래 있어",
    }),
    { voice: mayaDay1To4Voices[34] },
  ),
  say(
    "maya",
    "worried",
    tx({
      id: "Dia nanya satpam soal absensiku kemarin",
      en: "He's asking the security guard about my absence yesterday",
      ja: "昨日の欠席のことを警備員に聞いてる",
      ko: "어제 내 결석 얘기를 경비원한테 묻고 있어",
    }),
    { voice: mayaDay1To4Voices[35] },
  ),
  say(
    "maya",
    "worried",
    tx({
      id: "Dia naik ke atas",
      en: "He's coming up",
      ja: "上に来る",
      ko: "올라오고 있어",
    }),
    { voice: mayaDay1To4Voices[36] },
  ),
  narrate(
    tx({
      id: "Waduh. Bapaknya beneran datang. Kalau dibiarin, Maya bisa makin stres dan drop lagi.",
      en: "Great. Her dad actually showed up. If I just let this play out, Maya's going to spiral right back down again.",
      ja: "まずい。本当に来た。このまま放っておいたら、マヤはまたストレスで倒れるかもしれない。",
      ko: "이런. 아버지가 진짜 왔다. 그냥 두면 마야가 또 무너질 수 있다.",
    }),
    "arka",
  ),
  hide("maya-day6-papa-confrontation", "fadeAway"),
  bg(
    hallwayUrl,
    tx({
      id: "Lorong Depan Unit 301 - 10:00",
      en: "Outside Unit 301 - 10:00",
      ja: "301号室前の廊下 - 10:00",
      ko: "301호 앞 복도 - 10:00",
    }),
  ),
  narrate(
    tx({
      id: "Arka keluar dari unitnya. Tepat saat itu, lift terbuka. Seorang pria paruh baya dengan wajah keras berjalan cepat ke arah Unit 301 dan mulai menggedor pintu dengan kasar.",
      en: "Arka steps out of his unit. Right then, the elevator opens. A middle-aged man with a hard face strides quickly toward Unit 301 and starts hammering the door.",
      ja: "アルカが自分の部屋を出る。ちょうどそのとき、エレベーターが開いた。険しい顔の中年男性が足早に301号室へ向かい、乱暴にドアを叩き始めた。",
      ko: "아르카가 방에서 나온다. 바로 그때 엘리베이터가 열렸다. 거친 인상의 중년 남성이 빠르게 301호 쪽으로 걸어와 거칠게 문을 두드리기 시작한다.",
    }),
  ),
  narrate(
    tx({
      id: "Maya! Buka pintunya! Papa tahu kamu di dalam. Kampus bilang kamu bolos ujian pakai alasan sakit. Buka!",
      en: "Maya! Open up! I know you're in there. The university told me you skipped your exam with a sick excuse. Open this door!",
      ja: "マヤ！開けなさい！中にいるのはわかってる。大学から、病気を口実に試験をサボったと連絡が来た。開けろ！",
      ko: "마야! 문 열어! 안에 있는 거 알아. 학교에서 아프다는 핑계로 시험 빠졌다고 했어. 열어!",
    }),
    "Papa Maya",
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Maaf, Pak. Kalau mau gedor pintu, pelan sedikit. Ini apartemen, tetangga lain bisa terganggu.",
      en: "Excuse me, sir. If you're going to knock, could you keep it down? This is an apartment building, other residents can hear you.",
      ja: "すみません。ドアを叩くなら少し静かにしてもらえますか。ここはアパートですし、他の住人の迷惑になります。",
      ko: "실례합니다. 문을 두드리시려면 좀 조용히 해주세요. 여기 아파트라 다른 입주민들이 불편할 수 있어요.",
    }),
  ),
  narrate(
    tx({
      id: "Papa Maya menoleh, menatap Arka dengan tatapan meremehkan.",
      en: "Maya's dad turns around and looks Arka up and down with open contempt.",
      ja: "マヤの父が振り向き、アルカを見下すような目で見た。",
      ko: "마야 아버지가 돌아서며 아르카를 업신여기는 눈빛으로 훑어본다.",
    }),
  ),
  narrate(
    tx({
      id: "Kamu siapa? Nggak usah ikut campur urusan keluarga orang.",
      en: "Who are you? Stay out of other people's family business.",
      ja: "あなたは誰ですか。他人の家族のことに口を出さないでください。",
      ko: "당신은 누구요? 남의 가족 일에 끼어들지 마세요.",
    }),
    "Papa Maya",
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Saya Arka, tetangga sebelah. Saya yang bawa anak Bapak ke klinik kemarin. Dia beneran sakit, demam tinggi. Bukan pura-pura bolos.",
      en: "I'm Arka, the neighbor next door. I'm the one who took your daughter to the clinic yesterday. She was genuinely sick — high fever. She wasn't faking anything.",
      ja: "アルカといいます、隣に住んでいます。昨日、お嬢さんをクリニックに連れて行ったのは私です。本当に具合が悪くて、高熱が出ていました。仮病じゃありません。",
      ko: "저는 옆집 이웃 아르카입니다. 어제 따님을 클리닉에 데려간 게 저예요. 진짜로 아팠어요, 고열이었습니다. 결석 핑계가 아니에요.",
    }),
  ),
  narrate(
    tx({
      id: "Sakit atau nggak, harusnya dia tetap ujian! Maya!",
      en: "Sick or not, she should've taken the exam! Maya!",
      ja: "具合が悪くても、試験は受けるべきでしょう！マヤ！",
      ko: "아프든 말든 시험은 봤어야죠! 마야!",
    }),
    "Papa Maya",
  ),
  show("maya-day6-hallway", "maya", "sad", {
    position: "right",
    enterFrom: "fade",
  }),
  narrate(
    tx({
      id: "Pintu terbuka sedikit. Maya berdiri di sana dengan wajah pucat. Tapi saat melihat Arka, bahunya sedikit lebih rileks.",
      en: "The door creaks open. Maya stands in the gap, her face pale. But the moment she spots Arka, her shoulders drop just slightly.",
      ja: "ドアが少し開いた。青ざめた顔のマヤが立っている。でも、アルカを見た瞬間、その肩がほんの少し緩んだ。",
      ko: "문이 살짝 열렸다. 마야가 창백한 얼굴로 서 있다. 하지만 아르카를 보는 순간, 그녀의 어깨가 조금 풀린다.",
    }),
  ),
  say(
    "maya",
    "sad",
    tx({
      id: "Pa... Maya beneran nggak kuat kemarin. Tapi Maya janji bakal ikut ujian susulan...",
      en: "Dad... I really couldn't manage it yesterday. But I promise I'll take the makeup exam...",
      ja: "お父さん…昨日は本当につらかったんです。でも追試には絶対出ます…",
      ko: "아빠... 마야 어제 진짜 못 버텼어요. 근데 추가 시험은 꼭 볼게요...",
    }),
    { voice: mayaDay1To4Voices[37] },
  ),
  narrate(
    tx({
      id: "Susulan? Itu ngerusak catatan akademikmu! Papa sudah keluar banyak uang buat kuliahmu, dan ini balasanmu? Pacaran sama tetangga dan bolos ujian?!",
      en: "A makeup exam? That goes on your academic record! I've poured a fortune into your education, and this is what I get back? Dating the neighbor and skipping exams?!",
      ja: "追試？それは学業記録に傷がつく！お父さんがどれだけのお金をお前の学費に使ってきたと思っているんだ。それでこの仕打ちか？隣の男と付き合って試験をサボるとは！",
      ko: "추가 시험? 그게 학업 기록에 남잖아! 아빠가 네 대학 등록금에 얼마나 많은 돈을 썼는데, 이게 네 대답이야? 옆집이랑 사귀면서 시험은 빠지고?!",
    }),
    "Papa Maya",
  ),
  narrate(
    tx({
      id: "Papa Maya menunjuk wajah Maya dengan marah. Maya menunduk ketakutan, nyaris menangis lagi. Arka berdiri di antara mereka.",
      en: "Maya's dad jabs a finger toward her face. Maya shrinks back, terrified, on the verge of tears again. Arka stands between them.",
      ja: "マヤの父が怒りに任せてマヤの顔へ指を向ける。マヤは怯えて身をすくめ、また泣きそうになっている。アルカはその間に立っていた。",
      ko: "마야 아버지가 화를 내며 마야의 얼굴을 향해 손가락을 들이댄다. 마야는 겁에 질려 움츠러들고, 다시 울음이 터질 것 같다. 아르카는 둘 사이에 서 있다.",
    }),
  ),
  menu(
    tx({
      id: "APA YANG ARKA LAKUKAN?",
      en: "WHAT DOES ARKA DO?",
      ja: "ここでアルカはどうする？",
      ko: "아르카는 어떻게 해야 할까?",
    }),
    [
      {
        id: "protective",
        label: tx({
          id: "Pasang badan ambil alih konflik",
          en: "Step in take over the conflict",
          ja: "身を盾にする 対立を引き受ける",
          ko: "앞에 서기 갈등을 떠안는다",
        }),
        next: "day6-protective",
      },
      {
        id: "supportive",
        label: tx({
          id: "Beri Maya kendali dorong dia bicara",
          en: "Give Maya control push her to speak",
          ja: "マヤに主導権を渡す 彼女が話すよう後押しする",
          ko: "마야에게 주도권 넘기기 스스로 말하게 한다",
        }),
        next: "day6-supportive",
      },
    ],
  ),
];

export const day6ProtectiveScene: VisualNovelCommand[] = [
  setFlag("arkaTookControl", true),
  narrate(
    tx({
      id: "Arka maju satu langkah, menutupi Maya sepenuhnya dari pandangan ayahnya.",
      en: "Arka steps forward, putting himself completely between Maya and her father's line of sight.",
      ja: "アルカが一歩前に出て、マヤの姿を父親の視界から完全に遮った。",
      ko: "아르카가 한 발 앞으로 나서며 마야를 아버지 시야에서 완전히 가린다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Kalau Bapak cuma mau ngukur nilai anak dari uang yang Bapak keluarin, silakan cabut aja semua fasilitasnya. Biar saya yang tanggung jawab sama dia di sini.",
      en: "If all you're doing is measuring your daughter's worth by how much money you've spent on her, go ahead and pull it all. I'll take responsibility for her here.",
      ja: "もしお父さんがただお金を使った分だけで娘の価値を測るつもりなら、全部引き上げてかまいません。ここでは私が彼女の責任を持ちます。",
      ko: "아버지가 쓴 돈으로만 딸의 가치를 따지실 거라면 전부 끊으셔도 됩니다. 여기서 제가 책임지겠습니다.",
    }),
  ),
  narrate(
    tx({
      id: "Berani kamu bicara begitu ke saya?! Kamu pikir kamu siapa bisa ngurusin anak saya?",
      en: "How dare you talk to me like that?! Who do you think you are, stepping into my daughter's life?",
      ja: "よくもそんなことが言えたものだ！あなたはいったい何様のつもりで、娘のことに口を出しているんですか！",
      ko: "감히 나한테 그런 말을 해?! 당신이 뭔데 내 딸 일에 끼어들어요?",
    }),
    "Papa Maya",
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Saya orang yang ada pas dia hampir pingsan kemarin. Bapak di mana?",
      en: "I'm the person who was there when she almost collapsed yesterday. Where were you?",
      ja: "昨日、彼女が倒れそうになったときにそばにいた人間です。お父さんはどこにいましたか？",
      ko: "어제 쓰러질 뻔할 때 옆에 있던 사람이에요. 아버지는 어디 계셨나요?",
    }),
  ),
  narrate(
    tx({
      id: "Rahang Papa Maya mengeras.",
      en: "Maya's dad's jaw tightens.",
      ja: "マヤの父の顎が固く引き結ばれた。",
      ko: "마야 아버지의 턱이 굳는다.",
    }),
  ),
  narrate(
    tx({
      id: "Bagus. Maya, kemasi barangmu sekarang. Atau kamu nggak usah anggap Papa ada lagi!",
      en: "Fine. Maya, pack your things right now. Or don't bother calling me your father anymore!",
      ja: "そうか。マヤ、今すぐ荷物をまとめなさい。さもなければ、もうお父さんだと思わなくていい！",
      ko: "좋아. 마야, 지금 당장 짐 싸. 아니면 앞으로 아빠 없는 셈 쳐!",
    }),
    "Papa Maya",
  ),
  say(
    "maya",
    "blush",
    tx({
      id: "Maya... Maya mau tetap di sini, Pa. Sama Arka.",
      en: "I... I want to stay here, Dad. With Arka.",
      ja: "マヤは…マヤはここにいたいです、お父さん。アルカと一緒に。",
      ko: "마야... 마야는 여기 있을 거예요, 아빠. 아르카랑.",
    }),
    { voice: mayaDay1To4Voices[38] },
  ),
  narrate(
    tx({
      id: "Papa Maya menatap putrinya panjang, lalu berbalik menuju lift dengan langkah kasar.",
      en: "Maya's dad stares at his daughter for a long beat, then turns and storms toward the elevator.",
      ja: "マヤの父はしばらく娘を見つめてから、乱暴な足取りでエレベーターへと向かった。",
      ko: "마야 아버지는 딸을 오래 바라보다가 거칠게 발걸음을 돌려 엘리베이터로 향한다.",
    }),
  ),
  narrate(
    tx({
      id: "Kita lihat seberapa lama kamu bisa bertahan!",
      en: "We'll see how long that lasts!",
      ja: "どこまで続くか見ていなさい！",
      ko: "얼마나 버티는지 두고 보자!",
    }),
    "Papa Maya",
  ),
  jump("day6-aftermath"),
];

export const day6SupportiveScene: VisualNovelCommand[] = [
  setFlag("arkaGaveMayaControl", true),
  say(
    "arka",
    "gentle",
    tx({
      id: "Maya, ini hidupmu. Jangan cuma nunduk. Kasih tahu dia apa yang sebenarnya kamu mau. Aku ada di sini.",
      en: "Maya, this is your life. Don't just keep your head down. Tell him what you actually want. I'm right here.",
      ja: "マヤ、これはお前の人生だ。ただうつむいていないで、本当はどうしたいのかを伝えろ。俺はここにいる。",
      ko: "마야, 이건 네 인생이야. 그냥 고개 숙이지 마. 진짜로 어떻게 하고 싶은지 말해. 나 여기 있어.",
    }),
  ),
  narrate(
    tx({
      id: "Nggak usah dengerin orang asing ini, Maya! Kemasi barangmu, kita pulang sekarang.",
      en: "Don't listen to this stranger, Maya! Pack your things, we're going home right now.",
      ja: "こんな他人の言うことを聞く必要はない、マヤ！荷物をまとめなさい、今すぐ帰るぞ。",
      ko: "이 낯선 사람 말 듣지 마, 마야! 짐 싸, 지금 바로 집에 가자.",
    }),
    "Papa Maya",
  ),
  narrate(
    tx({
      id: "Maya menarik napas panjang, mengepalkan tangannya kuat-kuat. Dia perlahan mendongak menatap ayahnya.",
      en: "Maya takes a long, slow breath and clenches her fists tight. She slowly looks up and meets her father's eyes.",
      ja: "マヤは深く息を吸い、両手をぎゅっと握りしめた。そしてゆっくりと顔を上げ、父親の目を見た。",
      ko: "마야는 깊게 숨을 들이쉬고 주먹을 꽉 쥔다. 그리고 천천히 고개를 들어 아버지를 바라본다.",
    }),
  ),
  say(
    "maya",
    "calm",
    tx({
      id: "Nggak, Pa.",
      en: "No, Dad.",
      ja: "嫌です、お父さん。",
      ko: "싫어요, 아빠.",
    }),
    { voice: mayaDay1To4Voices[39] },
  ),
  narrate(
    tx({
      id: "Apa kamu bilang?",
      en: "What did you just say?",
      ja: "何を言ったんだ？",
      ko: "뭐라고 했어?",
    }),
    "Papa Maya",
  ),
  say(
    "maya",
    "calm",
    tx({
      id: "Maya bilang nggak. Maya nggak mau pulang. Maya bakal tetap di sini, selesain kuliah ini dengan cara Maya sendiri. Kalau Papa mau stop biayain, silakan. Maya bisa cari kerja sambilan.",
      en: "I said no. I'm not going home. I'm staying here and finishing school my own way. If you want to cut me off, go ahead. I can find a part-time job.",
      ja: "嫌だと言いました。家には帰りません。ここに残って、自分のやり方でこの大学を卒業します。仕送りをやめるなら、どうぞ。アルバイトを探せばいい。",
      ko: "싫다고 했어요. 집에 안 갈 거예요. 여기 남아서 마야 방식대로 학교 마칠 거예요. 아빠가 지원 끊으실 거면 그러세요. 마야 알바 구할 수 있어요.",
    }),
    { voice: mayaDay1To4Voices[40] },
  ),
  narrate(
    tx({
      id: "Papa Maya menatap putrinya seolah melihat orang asing.",
      en: "Maya's dad stares at his daughter like he's looking at a stranger.",
      ja: "マヤの父は、まるで見知らぬ人を見るように娘を見つめた。",
      ko: "마야 아버지는 딸을 마치 낯선 사람을 보듯 바라본다.",
    }),
  ),
  narrate(
    tx({
      id: "Kamu sudah dirusak sama lingkungan ini. Terserah kamu!",
      en: "This place has corrupted you. Do whatever you want!",
      ja: "この環境にすっかり毒されたな。好きにしろ！",
      ko: "이 환경에 물들었구나. 마음대로 해!",
    }),
    "Papa Maya",
  ),
  narrate(
    tx({
      id: "Papa Maya berbalik dan berjalan cepat menuju lift.",
      en: "Maya's dad turns and walks briskly toward the elevator.",
      ja: "マヤの父は踵を返し、足早にエレベーターへ向かった。",
      ko: "마야 아버지는 돌아서서 빠르게 엘리베이터 쪽으로 걸어간다.",
    }),
  ),
  jump("day6-aftermath"),
];

export const day6AftermathScene: VisualNovelCommand[] = [
  hide("maya-day6-hallway", "fadeAway"),
  bg(
    hallwayUrl,
    tx({
      id: "Lorong Depan Unit 301 - 10:00",
      en: "Outside Unit 301 - 10:00",
      ja: "301号室前の廊下 - 10:00",
      ko: "301호 앞 복도 - 10:00",
    }),
  ),
  show("arka-day6-aftermath", "arka", "gentle", {
    position: "left",
    enterFrom: "fade",
  }),
  show("maya-day6-aftermath", "maya", "sad", {
    position: "center",
    enterFrom: "fade",
  }),
  narrate(
    tx({
      id: "Setelah pintu lift tertutup, lorong mendadak hening. Kaki Maya langsung lemas dan dia terduduk di lantai. Arka berjongkok di sebelahnya.",
      en: "The elevator doors slide shut and the hallway goes completely quiet. Maya's legs give out and she sinks to the floor. Arka crouches down beside her.",
      ja: "エレベーターのドアが閉まると、廊下は急に静かになった。マヤの足から力が抜け、その場にへたり込む。アルカはそっと隣にしゃがんだ。",
      ko: "엘리베이터 문이 닫히자 복도가 갑자기 조용해졌다. 마야의 다리에 힘이 풀리고 바닥에 주저앉는다. 아르카가 그 옆에 쪼그려 앉는다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Napas dulu pelan-pelan. Kamu nggak apa-apa?",
      en: "Slow breaths. You okay?",
      ja: "ゆっくり息して。大丈夫か？",
      ko: "천천히 숨 쉬어. 괜찮아?",
    }),
  ),
  say(
    "maya",
    "blush",
    tx({
      id: "Aku... aku baru aja ngelawan Papa. Kakiku gemeteran banget, Arka. Tapi rasanya lega banget.",
      en: "I... I just stood up to my dad. My legs won't stop shaking, Arka. But I feel so relieved.",
      ja: "私…さっきお父さんに言い返したんだ。足がガクガクして止まらない、アルカ。でも、すごく気持ちが楽になった。",
      ko: "나... 방금 아빠한테 맞섰어. 다리가 너무 떨려, 아르카. 근데 너무 시원해.",
    }),
    { voice: mayaDay1To4Voices[41] },
  ),
  narrate(
    tx({
      id: "Arka mengusap kepala Maya pelan.",
      en: "Arka gently pats Maya on the head.",
      ja: "アルカはそっとマヤの頭を撫でた。",
      ko: "아르카가 조용히 마야의 머리를 쓰다듬는다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Kamu hebat. Sekarang masuk kamar dulu, tenangin diri. Urusan ke depannya nanti kita pikirin bareng.",
      en: "You did great. Go back to your room now, settle down. We'll figure out what's next together.",
      ja: "よくやった。今は部屋に戻って、落ち着きなよ。この先のことは、一緒に考えよう。",
      ko: "잘했어. 지금은 방에 들어가서 진정해. 앞으로 일은 같이 생각하자.",
    }),
  ),
  hide("maya-day6-aftermath"),
  hide("arka-day6-aftermath"),
  bg(
    bedroomUrl,
    tx({
      id: "Unit 302 - 14:00",
      en: "Unit 302 - 14:00",
      ja: "302号室 - 14:00",
      ko: "302호 - 14:00",
    }),
  ),
  show("arka-day6-room", "arka", "neutral", {
    position: "left",
    enterFrom: "fade",
  }),
  narrate(
    tx({
      id: "Arka kembali ke kamarnya setelah memastikan Maya sudah minum air putih dan istirahat.",
      en: "Arka heads back to his room after making sure Maya has had some water and is resting.",
      ja: "マヤが水を飲んで横になったのを確認してから、アルカは自分の部屋に戻った。",
      ko: "마야가 물을 마시고 쉬는 걸 확인한 뒤, 아르카는 자기 방으로 돌아온다.",
    }),
  ),
  narrate(
    tx({
      id: "Kejadian barusan beneran gila. Tapi ngelihat akhirnya kayak gitu, aku lega. Biarin dia istirahat dulu buat nenangin pikirannya. Dia butuh waktu sendiri sebentar.",
      en: "That whole thing was insane. But seeing how it ended, I'm glad. Let her rest and clear her head. She needs a moment to herself.",
      ja: "さっきのは本当に大変だった。でも、あの結末を見て、ホッとした。しばらく頭を落ち着かせる時間が必要だろうから、休ませてやろう。",
      ko: "방금 일이 진짜 대단했다. 근데 그렇게 끝난 거 보면서 다행이다 싶다. 좀 쉬면서 마음 정리하게 두자. 혼자만의 시간이 필요할 거야.",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Masih ada waktu buat ngerjain hal lain hari ini. Selanjutnya mau ngecek siapa ya?",
      en: "Still got time to do something else today. Who should I check in with next?",
      ja: "今日はまだ時間がある。次は誰に声をかけようか。",
      ko: "오늘 아직 시간이 남아 있다. 다음은 누구한테 연락해볼까?",
    }),
    "arka",
  ),
  hide("arka-day6-room"),
  minigame("smartphone-contacts", {
    showSleepOption: true,
    sleepOptionNext: "day6-complate",
    disabledContacts: ["maya", "elena", "nadia", "sara"],
    title: {
      id: "Selanjutnya mau ngecek siapa?",
      en: "Who do you check in with next?",
      ja: "次は誰に声をかける？",
      ko: "다음은 누구한테 연락할까?",
    },
    subtitle: {
      id: "Maya lagi butuh istirahat. Tidak ada yang harus segera diurusin hari ini.",
      en: "Maya needs her rest. Nothing else urgent on the board today.",
      ja: "マヤは休息が必要だ。今日はほかに急ぎの用はない。",
      ko: "마야는 쉬어야 한다. 오늘 달리 급한 일은 없다.",
    },
  }),
];
