import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, hide, minigame, narrate, say, setFlag, show } from "@/scenes/scriptTypes";
import hallwayUrl from "@/background/hallway.png";

export const day3ElenaMorningScene: VisualNovelCommand[] = [
  bg(
    hallwayUrl,
    tx({
      id: "Apartment 69 - Lorong Pagi",
      en: "Apartment 69 - Morning Hallway",
      ja: "Apartment 69 - 朝の廊下",
      ko: "Apartment 69 - 아침 복도",
    }),
  ),
  show("arka-elena-morning", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  narrate(
    tx({
      id: "Pagi hari di Apartments terasa lebih sunyi dari biasanya. Arka baru saja menutup pintu kamarnya ketika suara pintu di seberang terbuka.",
      en: "The apartment felt quieter than usual that morning. Arka had just shut his own door when the one across the hall opened.",
      ja: "その朝のアパートは、いつもより静かに感じられた。アルカが自分の部屋のドアを閉めた直後、向かいのドアが開く音がした。",
      ko: "그날 아침 아파트는 평소보다 더 조용하게 느껴졌다. 아르카가 막 자기 방 문을 닫았을 때 맞은편 문이 열리는 소리가 들렸다.",
    }),
  ),
  show("elena-elena-morning", "elena", "neutral", {
    position: "right",
    enterFrom: "fade",
  }),
  narrate(
    tx({
      id: "Elena keluar dari unit 303 sambil membawa map dan tumbler. Penampilannya rapi seperti biasa, tapi kali ini wajahnya tidak setegang malam sebelumnya.",
      en: "Elena stepped out of Unit 303 carrying a folder and a tumbler. She looked as put together as ever, but this time her face wasn't as tense as it had been the night before.",
      ja: "エレナはファイルとタンブラーを手に303号室から出てきた。いつも通り整った姿だったが、今朝の表情は昨夜ほど張りつめていない。",
      ko: "엘레나는 파일과 텀블러를 든 채 303호에서 나왔다. 평소처럼 단정했지만, 오늘은 전날 밤만큼 얼굴이 굳어 있지는 않았다.",
    }),
  ),
  narrate(
    tx({
      id: "Arka yang melihatnya langsung berhenti sebentar.",
      en: "Arka stopped for a second the moment he saw her.",
      ja: "彼女を見たアルカは、思わず足を止めた。",
      ko: "그녀를 본 아르카는 순간 걸음을 멈췄다.",
    }),
  ),
  say("arka", "neutral", tx({
    id: "Pagi.",
    en: "Morning.",
    ja: "おはよう。",
    ko: "좋은 아침.",
  })),
  narrate(
    tx({
      id: "Elena menoleh. Tatapannya jatuh ke Arka, lalu diam beberapa detik seolah sedang menimbang sesuatu.",
      en: "Elena turned. Her gaze landed on Arka, and she stayed quiet for a few seconds as if weighing something in her head.",
      ja: "エレナは振り向き、アルカに視線を落としたまま数秒黙り込んだ。何かを測っているようだった。",
      ko: "엘레나는 고개를 돌려 아르카를 바라본 채 몇 초간 말이 없었다. 무언가를 재고 있는 것처럼 보였다.",
    }),
  ),
  say("elena", "neutral", tx({
    id: "Pagi.",
    en: "Morning.",
    ja: "おはよう。",
    ko: "좋은 아침.",
  })),
  narrate(
    tx({
      id: "Arka sempat mengira percakapan itu selesai. Ia baru mau melangkah ke arah tangga ketika suara Elena menghentikannya.",
      en: "Arka thought that was the end of it. He was just about to head for the stairs when Elena's voice stopped him.",
      ja: "それで会話は終わりだとアルカは思った。階段の方へ向かおうとした瞬間、エレナの声に引き止められる。",
      ko: "아르카는 그걸로 대화가 끝난 줄 알았다. 계단 쪽으로 가려던 순간, 엘레나가 그를 불러 세웠다.",
    }),
  ),
  say("elena", "neutral", tx({
    id: "Arka.",
    en: "Arka.",
    ja: "アルカ。",
    ko: "아르카.",
  })),
  say("arka", "neutral", tx({
    id: "Iya?",
    en: "Yeah?",
    ja: "ん？",
    ko: "응?",
  })),
  say("elena", "neutral", tx({
    id: "Pipa wastafelku sudah normal.",
    en: "My sink pipe is normal again.",
    ja: "洗面台の配管、もう普通に戻ってた。",
    ko: "내 세면대 배관, 이제 정상으로 돌아왔어.",
  })),
  narrate(
    tx({
      id: "Arka berusaha menjaga wajahnya tetap datar.",
      en: "Arka tried to keep his face completely neutral.",
      ja: "アルカは表情を変えないようにした。",
      ko: "아르카는 표정을 최대한 무심하게 유지하려 했다.",
    }),
  ),
  say("arka", "serious", tx({
    id: "Bagus, berarti akhirnya beres.",
    en: "Good. Then it's finally fixed.",
    ja: "よかった。じゃあ、ちゃんと直ったんだな。",
    ko: "다행이네. 그럼 결국 제대로 고쳐진 거네.",
  })),
  say("elena", "serious", tx({
    id: "Iya. Aneh sekali, karena tadi malam belum ada teknisi yang datang.",
    en: "Yes. Strange, considering no technician came last night.",
    ja: "ええ。不思議よね。昨夜はまだ技師なんて来てなかったのに。",
    ko: "그래. 이상하지. 어젯밤에는 기술자도 안 왔는데.",
  })),
  say("arka", "shy", tx({
    id: "Mungkin... keajaiban saluran air.",
    en: "Maybe... a plumbing miracle.",
    ja: "たぶん…配管の奇跡とか。",
    ko: "어쩌면... 배관의 기적일지도.",
  })),
  say("elena", "angry", tx({
    id: "Aku tidak suka bercanda pagi-pagi.",
    en: "I don't like jokes this early in the morning.",
    ja: "朝から冗談を聞く趣味はないわ。",
    ko: "아침부터 농담 듣는 취미는 없어.",
  })),
  say("arka", "neutral", tx({
    id: "Sayang sekali, itu stok komedi terbaikku.",
    en: "Too bad. That was my best material.",
    ja: "残念。それが今朝の俺の一番いいネタだったんだけど。",
    ko: "아쉽네. 그게 내 최고의 아침 개그였는데.",
  })),
  narrate(
    tx({
      id: "Elena menatapnya beberapa detik lebih lama. Tidak marah, tapi jelas sedang mengamati reaksinya.",
      en: "Elena kept looking at him for a few seconds longer. Not angry, but clearly studying his reaction.",
      ja: "エレナはさらに数秒、彼を見つめた。怒っているわけではない。ただ反応を見ている。",
      ko: "엘레나는 몇 초 더 그를 바라봤다. 화가 난 건 아니었지만, 분명 반응을 살피고 있었다.",
    }),
  ),
  say("elena", "serious", tx({
    id: "Waktu aku bangun, panel bawah wastafel juga terpasang lebih rapi daripada biasanya. Dan mur sambungannya jelas baru dikencangkan.",
    en: "When I woke up, the panel under the sink was fitted more neatly than usual. And the connector nut had obviously just been tightened.",
    ja: "今朝起きたら、洗面台の下のパネルまでいつもより綺麗に戻されてた。しかも接続ナットは、明らかに締め直されたばかりだった。",
    ko: "아침에 일어나 보니 세면대 아래 패널도 평소보다 더 깔끔하게 닫혀 있었어. 연결 너트도 누가 방금 조인 것처럼 보였고.",
  })),
  say("elena", "neutral", tx({
    id: "Jadi aku tanya sekali saja. Kamu masuk ke unitku semalam?",
    en: "So I'll ask just once. Did you go into my unit last night?",
    ja: "だから一回だけ聞くわ。昨夜、私の部屋に入った？",
    ko: "그러니까 한 번만 물을게. 어젯밤 내 방에 들어왔어?",
  })),
  say("arka", "serious", tx({
    id: "Aku datang karena kamu sendiri yang suruh datang malam kalau serius.",
    en: "I came because you were the one who said to come at night if I was serious.",
    ja: "本気なら夜に来いって言ったの、そっちだろ。",
    ko: "진심이면 밤에 오라고 한 건 너였잖아.",
  })),
  say("elena", "angry", tx({
    id: "Itu bukan jawaban.",
    en: "That wasn't an answer.",
    ja: "それは答えになってない。",
    ko: "그건 대답이 아니야.",
  })),
  say("arka", "serious", tx({
    id: "Iya. Aku datang.",
    en: "Yeah. I did.",
    ja: "ああ。入った。",
    ko: "응. 들어갔어.",
  })),
  say("elena", "neutral", tx({
    id: "Kupikir juga begitu.",
    en: "That's what I thought.",
    ja: "やっぱりそうだと思った。",
    ko: "역시 그럴 줄 알았어.",
  })),
  say("arka", "neutral", tx({
    id: "Pintumu kebuka. Aku panggil dua kali. Nggak ada jawaban. Terus kudengar pipanya masih bocor, jadi aku masuk dan coba benerin.",
    en: "Your door was open. I called out twice. No answer. Then I heard the pipe still leaking, so I went in and tried to fix it.",
    ja: "ドアが開いてた。二回呼んだけど返事がなかった。まだ水漏れの音もしてたから、中に入って直そうとした。",
    ko: "문이 열려 있었어. 두 번 불렀는데 대답이 없었고. 배관도 계속 새고 있길래 들어가서 고치려 했어.",
  })),
  say("elena", "serious", tx({
    id: "Dan kamu pergi tanpa bilang apa-apa.",
    en: "And then you left without saying anything.",
    ja: "それで、何も言わずに出ていったのね。",
    ko: "그리고 아무 말도 없이 가버렸고.",
  })),
  say("arka", "neutral", tx({
    id: "Iya.",
    en: "Yeah.",
    ja: "うん。",
    ko: "응.",
  })),
  say("elena", "neutral", tx({
    id: "Kenapa?",
    en: "Why?",
    ja: "どうして？",
    ko: "왜?",
  })),
  say("arka", "shy", tx({
    id: "Karena situasinya sudah telanjur aneh.",
    en: "Because the situation had already gotten way too weird.",
    ja: "状況がもう、手遅れなくらい変だったから。",
    ko: "상황이 이미 너무 이상해져 버렸으니까.",
  })),
  say("elena", "neutral", tx({
    id: "Itu jawaban paling masuk akal yang pernah keluar dari situasi tidak masuk akal.",
    en: "That's the most reasonable answer anyone could give in a completely unreasonable situation.",
    ja: "どうしようもなくおかしな状況に対しては、一番まともな答えかもしれないわね。",
    ko: "말도 안 되는 상황에서 나온 대답치고는 제일 그럴듯하네.",
  })),
  say("arka", "neutral", tx({
    id: "Aku anggap itu kemajuan.",
    en: "I'll take that as progress.",
    ja: "それは進歩ってことで受け取っておく。",
    ko: "그럼 그건 진전으로 받아들일게.",
  })),
  narrate(
    tx({
      id: "Beberapa detik hening lewat di antara mereka. Dari ujung lorong, terdengar samar suara lift bergerak naik.",
      en: "A few quiet seconds passed between them. From the far end of the hallway, the elevator could be heard rising.",
      ja: "しばらく沈黙が流れた。廊下の先から、エレベーターが上がってくる鈍い音が聞こえる。",
      ko: "잠시 조용한 시간이 흘렀다. 복도 끝에서는 엘리베이터가 올라오는 소리가 희미하게 들렸다.",
    }),
  ),
  say("elena", "neutral", tx({
    id: "Tapi wastafelnya memang beres.",
    en: "But the sink is fixed.",
    ja: "でも、洗面台はちゃんと直ってた。",
    ko: "그래도 세면대는 제대로 고쳐졌어.",
  })),
  say("arka", "serious", tx({
    id: "Harusnya aman sekarang. Kalau bocor lagi, berarti ulirnya sudah aus dan harus ganti sambungan.",
    en: "It should be fine now. If it leaks again, the threading is probably worn out and the connector will need replacing.",
    ja: "今はたぶん大丈夫。もしまた漏れるなら、ネジ山が摩耗してて接続部ごと交換だ。",
    ko: "이제는 괜찮을 거야. 또 새면 나사산이 닳은 거니까 연결 부품 자체를 갈아야 해.",
  })),
  say("elena", "surprised", tx({
    id: "Kamu ternyata benar-benar tahu yang kamu kerjakan.",
    en: "So you actually do know what you're doing.",
    ja: "本当に、ちゃんと分かってやってるのね。",
    ko: "너, 진짜 네가 뭘 하는지는 알고 있었네.",
  })),
  say("arka", "neutral", tx({
    id: "Aku nggak cukup bodoh buat bongkar pipa orang tanpa tahu dasar-dasarnya.",
    en: "I'm not dumb enough to take apart someone else's plumbing without knowing the basics.",
    ja: "他人の配管を、基礎も知らずにいじるほど馬鹿じゃないよ。",
    ko: "기본도 모르면서 남의 배관을 건드릴 만큼 멍청하진 않아.",
  })),
  say("elena", "angry", tx({
    id: "Kau menghinaku?",
    en: "Are you insulting me?",
    ja: "それ、私を馬鹿にしてる？",
    ko: "지금 나 비꼬는 거야?",
  })),
  narrate(
    tx({
      id: "Arka terkekeh pelan.",
      en: "Arka let out a small laugh.",
      ja: "アルカは小さく吹き出した。",
      ko: "아르카는 작게 웃음을 흘렸다.",
    }),
  ),
  say("elena", "neutral", tx({
    id: "Lupakan. Aku harus pergi.",
    en: "Forget it. I have to go.",
    ja: "もういい。私、行かないと。",
    ko: "됐어. 나 가봐야 해.",
  })),
  say("arka", "neutral", tx({
    id: "Oke.",
    en: "Okay.",
    ja: "わかった。",
    ko: "알겠어.",
  })),
  say("elena", "neutral", tx({
    id: "Arka.",
    en: "Arka.",
    ja: "アルカ。",
    ko: "아르카.",
  })),
  say("arka", "neutral", tx({
    id: "Hmm?",
    en: "Hmm?",
    ja: "ん？",
    ko: "응?",
  })),
  say("elena", "serious", tx({
    id: "Lain kali, jangan masuk ke unitku tanpa izin. Walaupun pintunya terbuka.",
    en: "Next time, don't enter my unit without permission. Even if the door is open.",
    ja: "今度からは、たとえドアが開いていても勝手に入らないで。",
    ko: "다음부터는 문이 열려 있어도 허락 없이 내 방에 들어오지 마.",
  })),
  say("arka", "serious", tx({
    id: "Nggak akan.",
    en: "I won't.",
    ja: "もうしない。",
    ko: "안 그럴게.",
  })),
  say("elena", "serious", tx({
    id: "Dan kalau mau bantu, bilang langsung. Jangan bikin aku harus main tebak-tebakan pagi-pagi.",
    en: "And if you want to help, say it directly. Don't make me play guessing games first thing in the morning.",
    ja: "それと、助けるならちゃんと言って。朝から推理ゲームをさせないで。",
    ko: "그리고 도와줄 거면 바로 말해. 아침부터 추리 게임하게 만들지 말고.",
  })),
  say("arka", "serious", tx({
    id: "Iya. Maaf.",
    en: "Yeah. Sorry.",
    ja: "うん。悪かった。",
    ko: "응. 미안.",
  })),
  narrate(
    tx({
      id: "Elena menatapnya sebentar, seolah memastikan permintaan maaf itu tulus. Lalu ekspresinya sedikit melunak.",
      en: "Elena looked at him for a moment, as if checking whether the apology was sincere. Then her expression softened a little.",
      ja: "エレナは謝罪が本気かどうか確かめるように少し見つめ、それからほんの少し表情を和らげた。",
      ko: "엘레나는 그 사과가 진심인지 확인하듯 잠깐 바라보다가, 조금 표정을 누그러뜨렸다.",
    }),
  ),
  say("elena", "neutral", tx({
    id: "...Tapi terima kasih.",
    en: "...But thank you.",
    ja: "…でも、ありがとう。",
    ko: "...그래도 고마워.",
  })),
  say("arka", "neutral", tx({
    id: "Untuk pipanya?",
    en: "For the pipe?",
    ja: "配管のこと？",
    ko: "배관 때문?",
  })),
  say("elena", "neutral", tx({
    id: "Untuk pipanya. Bukan untuk cara kamu menangani situasinya.",
    en: "For the pipe. Not for the way you handled the situation.",
    ja: "配管についてよ。状況の処理の仕方についてじゃない。",
    ko: "배관 때문에. 네가 상황 처리한 방식 말고.",
  })),
  say("arka", "neutral", tx({
    id: "Adil.",
    en: "Fair.",
    ja: "妥当だな。",
    ko: "공정하네.",
  })),
  narrate(
    tx({
      id: "Saat Elena mulai terlihat lebih santai, ponselnya kembali bergetar. Nama Arthur muncul di layar.",
      en: "Just as Elena started to look more at ease, her phone vibrated again. Arthur's name lit up on the screen.",
      ja: "エレナの表情が少しだけ和らいだその時、再びスマホが震えた。画面には Arthur の名前が表示される。",
      ko: "엘레나가 조금 더 풀린 듯 보이던 순간, 그녀의 휴대폰이 다시 진동했다. 화면에는 Arthur라는 이름이 떠 있었다.",
    }),
  ),
  say("elena", "serious", tx({
    id: "Kalau penting, dia bisa menulis email.",
    en: "If it's important, he can write an email.",
    ja: "大事な用なら、メールを書けばいい。",
    ko: "중요한 일이면 이메일을 쓰면 돼.",
  })),
  say("arka", "neutral", tx({
    id: "Kalau tidak penting?",
    en: "And if it isn't important?",
    ja: "じゃあ重要じゃないなら？",
    ko: "안 중요하면?",
  })),
  say("elena", "neutral", tx({
    id: "Biasanya tetap dia tulis panjang.",
    en: "He usually writes something long anyway.",
    ja: "たいてい、それでも長文を書いてくるわ。",
    ko: "보통은 그래도 길게 써 보내.",
  })),
  say("elena", "neutral", tx({
    id: "Lupakanlah. Aku ingin pergi sekarang.",
    en: "Forget it. I want to leave now.",
    ja: "もういいわ。私はもう行く。",
    ko: "됐어. 이제 가고 싶어.",
  })),
  hide("elena-elena-morning"),
  hide("arka-elena-morning"),
  setFlag("day2ElenaCompleted", true),
  minigame("smartphone-contacts", {
    showSleepOption: true,
    sleepOptionNext: "day2-complate",
    requiredCompletionFlags: ["day2MayaCompleted", "day2ElenaCompleted"],
    disabledContacts: ["elena", "nadia", "sara"],
    conditionalDisabledContacts: {
      maya: "day2MayaCompleted",
    },
    title: tx({
      id: "Lanjutkan Hari 2",
      en: "Continue Day 2",
      ja: "2日目を続ける",
      ko: "2일차 계속하기",
    }),
    subtitle: tx({
      id: "Percakapan dengan Elena sudah selesai. Kalau masih ada waktu, pilih siapa lagi yang mau kamu cek.",
      en: "Your conversation with Elena is done. If there's still time left, choose who else you want to check on.",
      ja: "エレナとの会話は終わった。まだ時間があるなら、次に誰を見に行くか選ぼう。",
      ko: "엘레나와의 대화는 끝났다. 아직 시간이 남았다면 다음에 누구를 보러 갈지 고르자.",
    }),
    contactOverrides: {
      maya: {
        next: "day2-route-maya",
      },
    },
  }),
];
