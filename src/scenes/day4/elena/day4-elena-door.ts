import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, hide, jump, narrate, say, setFlag, show } from "@/scenes/scriptTypes";
import elenaHallwayUrl from "@/background/elena-hallway.png";
import elenaHallwayOpenUrl from "@/background/elena-hallway-open.png";
import elenaBadroomUrl from "@/background/elena-badroom.png";

export const day4ElenaDoorScene: VisualNovelCommand[] = [
  bg(
    elenaHallwayOpenUrl,
    tx({
      id: "Apartment 69 - Depan Unit 303",
      en: "Apartment 69 - Outside Unit 303",
      ja: "Apartment 69 - 303号室の前",
      ko: "Apartment 69 - 303호 앞",
    }),
  ),
  narrate(
    tx({
      id: "Siang itu, Arka melihat pintu unit 303 terbuka sedikit. Ia mengetuk pelan.",
      en: "That afternoon, Arka noticed the door to Unit 303 slightly open. He knocked softly.",
      ja: "その昼、アルカは303号室のドアが少し開いているのに気づいた。彼は静かにノックする。",
      ko: "그날 오후, 아르카는 303호 문이 살짝 열려 있는 것을 보았다. 그는 조심스럽게 문을 두드렸다.",
    }),
  ),
  show("arka-day4-elena-door", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  show("elena-day4-elena-door", "elena", "neutral", {
    position: "center",
    enterFrom: "fade",
  }),
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
  say(
    "elena",
    "neutral",
    tx({
      id: "Masuk. Pintunya memang sengaja kubuka.",
      en: "Come in. I left the door open on purpose.",
      ja: "入りなさい。ドアはわざと開けてあるの。",
      ko: "들어와. 문은 일부러 열어둔 거야.",
    }),
  ),
  hide("arka-day4-elena-door"),
  hide("elena-day4-elena-door"),
  bg(
    elenaBadroomUrl,
    tx({
      id: "Apartment 69 - Unit Elena",
      en: "Apartment 69 - Elena's Unit",
      ja: "Apartment 69 - エレナの部屋",
      ko: "Apartment 69 - 엘레나의 유닛",
    }),
  ),
  show("arka-day4-elena-room", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  show("elena-day4-elena-room", "elena", "neutral", {
    position: "center",
    enterFrom: "fade",
  }),
  narrate(
    tx({
      id: "Di dalam, Elena duduk di depan laptop dengan tumpukan laporan di sekelilingnya. Wajahnya jelas kurang tidur.",
      en: "Inside, Elena sat in front of her laptop with stacks of reports around her. She clearly looked sleep deprived.",
      ja: "中に入ると、エレナはノートPCの前に座り、周囲には報告書の山が積まれていた。明らかに寝不足の顔をしている。",
      ko: "안으로 들어가자 엘레나는 노트북 앞에 앉아 있었고, 주변에는 보고서 더미가 쌓여 있었다. 누가 봐도 수면이 부족해 보였다.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Kamu kelihatan seperti habis perang.",
      en: "You look like you just got back from a war.",
      ja: "戦場から戻ってきたみたいな顔してるな。",
      ko: "전쟁 끝내고 돌아온 사람처럼 보이네.",
    }),
  ),
  say(
    "elena",
    "angry",
    tx({
      id: "Aku memang sedang perang. Lawannya deadline dan laporan mahasiswa.",
      en: "I really am at war. Against deadlines and student reports.",
      ja: "実際、戦争中よ。相手は締め切りと学生のレポート。",
      ko: "실제로 전쟁 중이야. 상대는 마감과 학생들 보고서고.",
    }),
  ),
  narrate(
    tx({
      id: "Arka mengangkat kantong plastik.",
      en: "Arka raised the plastic bag in his hand.",
      ja: "アルカは手にしていたビニール袋を軽く持ち上げた。",
      ko: "아르카는 손에 들고 있던 비닐봉지를 들어 보였다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Aku bawa kopi dan roti.",
      en: "I brought coffee and bread.",
      ja: "コーヒーとパンを持ってきた。",
      ko: "커피랑 빵 가져왔어.",
    }),
  ),
  narrate(
    tx({
      id: "Elena menoleh.",
      en: "Elena turned to look at him.",
      ja: "エレナが顔を上げる。",
      ko: "엘레나가 고개를 돌린다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Kamu serius?",
      en: "You're serious?",
      ja: "本気で？",
      ko: "진심이야?",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Ada promo dua kopi. Aku ambil satu manis, satu pahit. Yang pahit kayaknya cocok untukmu.",
      en: "There was a two-coffee promo. I took one sweet and one bitter. The bitter one seemed more your style.",
      ja: "コーヒーが二杯セットで安かったんだ。甘いのを一つ、苦いのを一つ。苦い方はたぶん君向きだと思って。",
      ko: "커피 두 잔 할인 중이었어. 하나는 달고, 하나는 쓰게 샀지. 쓴 쪽이 너랑 더 잘 맞을 것 같아서.",
    }),
  ),
  narrate(
    tx({
      id: "Elena mendengus kecil.",
      en: "Elena let out a small snort.",
      ja: "エレナは小さく鼻を鳴らした。",
      ko: "엘레나는 작게 코웃음을 친다.",
    }),
  ),
  say(
    "elena",
    "smile",
    tx({
      id: "Aku benci kalau tebakanmu tepat.",
      en: "I hate it when your guesses are right.",
      ja: "あなたの勘が当たるの、嫌いだわ。",
      ko: "네 추측이 맞아떨어질 때마다 기분 나빠.",
    }),
  ),
  narrate(
    tx({
      id: "Mereka duduk bersama. Elena mulai makan sedikit, sementara Arka memperhatikan tumpukan kertas di meja.",
      en: "They sat together. Elena started eating a little while Arka looked over the stack of papers on the desk.",
      ja: "二人はそのまま腰を下ろした。エレナは少しずつ食べ始め、アルカは机の上の書類の山に目を向ける。",
      ko: "두 사람은 함께 앉았다. 엘레나는 조금씩 먹기 시작했고, 아르카는 책상 위 서류 더미를 바라본다.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Mau aku bantu?",
      en: "Want me to help?",
      ja: "手伝おうか？",
      ko: "내가 도와줄까?",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Bantu apa?",
      en: "Help with what?",
      ja: "何を？",
      ko: "뭘?",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Pisahkan berkas. Cek format. Atau diam di sini supaya kamu merasa tidak sengsara sendirian.",
      en: "Sort the papers. Check the formatting. Or just stay here so you don't have to feel miserable alone.",
      ja: "書類を分けるとか、形式を見るとか。あるいは、君が一人で惨めにならないようにここで黙ってるとか。",
      ko: "서류 나누기. 형식 확인하기. 아니면 네가 혼자 비참하지 않게 여기 가만히 있어 주기.",
    }),
  ),
  narrate(
    tx({
      id: "Elena menatapnya sebentar, lalu memberikan beberapa lembar kertas.",
      en: "Elena studied him for a moment, then handed over a few sheets of paper.",
      ja: "エレナは少しだけ彼を見つめ、それから数枚の紙を差し出した。",
      ko: "엘레나는 잠시 그를 보다가 몇 장의 종이를 내민다.",
    }),
  ),
  say(
    "elena",
    "serious",
    tx({
      id: "Pisahkan berdasarkan kelas. Semester tiga di atas, semester lima di bawah. Jangan tertukar.",
      en: "Separate them by class. Third semester on top, fifth semester below. Don't mix them up.",
      ja: "クラスごとに分けて。3学期分を上、5学期分を下。絶対に混ぜないで。",
      ko: "반별로 나눠. 3학기는 위, 5학기는 아래. 절대 섞지 마.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Siap, Bu Dosen Galak.",
      en: "Got it, scary lecturer.",
      ja: "了解、怖い先生。",
      ko: "알겠습니다, 무서운 교수님.",
    }),
  ),
  say(
    "elena",
    "angry",
    tx({
      id: "Aku tidak segalak itu.",
      en: "I'm not that scary.",
      ja: "そこまで怖くないわ。",
      ko: "나 그렇게까지 무섭진 않아.",
    }),
  ),
  say(
    "arka",
    "shy",
    tx({
      id: "Auranya mendukung.",
      en: "Your aura says otherwise.",
      ja: "雰囲気はそう言ってるけど。",
      ko: "분위기는 아닌 것 같은데.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Aku bisa menarik lagi bantuannya.",
      en: "I can take that help back.",
      ja: "その手伝い、今すぐ取り消してもいいのよ。",
      ko: "도와주게 한 거 지금 바로 취소할 수도 있어.",
    }),
  ),
  narrate(
    tx({
      id: "Arka langsung diam.",
      en: "Arka immediately went quiet.",
      ja: "アルカはすぐに黙り込んだ。",
      ko: "아르카는 바로 조용해졌다.",
    }),
  ),
  narrate(
    tx({
      id: "Beberapa waktu berlalu dengan suara kertas, ketikan laptop, dan teguran kecil Elena setiap kali Arka salah menaruh berkas. Perlahan, tumpukan di meja mulai rapi.",
      en: "Some time passed with the sound of paper, laptop keys, and Elena's small corrections every time Arka misplaced a file. Slowly, the stacks on the desk started to look neat.",
      ja: "紙をめくる音、キーボードの打鍵音、そしてアルカが書類を置き間違えるたびに入るエレナの小さな指摘。その時間がしばらく続き、机の山は少しずつ整っていった。",
      ko: "종이 넘기는 소리와 노트북 타이핑 소리, 그리고 아르카가 서류를 잘못 놓을 때마다 들리는 엘레나의 작은 지적이 이어진다. 그러는 사이 책상 위 더미는 천천히 정리되기 시작한다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Awalnya aku kira kamu cuma orang iseng yang terlalu percaya diri.",
      en: "At first, I thought you were just an annoying guy who was too confident.",
      ja: "最初は、ただ自信過剰で暇を持て余してるだけの人だと思ってた。",
      ko: "처음엔 네가 그냥 근거 없는 자신감만 넘치는 한가한 사람인 줄 알았어.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Dan sekarang?",
      en: "And now?",
      ja: "で、今は？",
      ko: "그럼 지금은?",
    }),
  ),
  say(
    "elena",
    "smile",
    tx({
      id: "Sekarang… aku masih belum yakin.",
      en: "Now... I'm still not sure.",
      ja: "今は…まだ確信が持てない。",
      ko: "지금은... 아직 확신이 안 서.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Itu sudah kemajuan.",
      en: "That's progress.",
      ja: "それでも進歩だな。",
      ko: "그거면 진전이지.",
    }),
  ),
  narrate(
    tx({
      id: "Elena menatapnya datar, tapi sudut bibirnya naik tipis.",
      en: "Elena looked at him flatly, but the corner of her lips lifted slightly.",
      ja: "エレナは無表情のまま彼を見るが、口元だけがほんの少し上がった。",
      ko: "엘레나는 무심한 표정으로 그를 바라보지만, 입꼬리는 아주 조금 올라간다.",
    }),
  ),
  narrate(
    tx({
      id: "Menjelang siang, Elena menutup laptop dan menghela napas panjang.",
      en: "Closer to noon, Elena closed her laptop and let out a long breath.",
      ja: "昼が近づくころ、エレナはノートPCを閉じて長く息を吐いた。",
      ko: "정오가 가까워질 즈음, 엘레나는 노트북을 덮고 길게 숨을 내쉰다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Terima kasih. Bukan cuma untuk pipanya.",
      en: "Thank you. Not just for the pipe.",
      ja: "ありがとう。配管のことだけじゃなくて。",
      ko: "고마워. 배관 때문만은 아니야.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Sama-sama.",
      en: "You're welcome.",
      ja: "どういたしまして。",
      ko: "천만에.",
    }),
  ),
  narrate(
    tx({
      id: "Elena berjalan ke sofa, lalu duduk dengan wajah yang kembali lelah.",
      en: "Elena walked to the sofa and sat down, her tired expression returning.",
      ja: "エレナはソファへ歩いていき、再び疲れのにじむ顔で腰を下ろした。",
      ko: "엘레나는 소파로 가서 앉고, 다시 피곤한 표정을 드러낸다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Hari ini panjang sekali.",
      en: "Today has been really long.",
      ja: "今日は本当に長い一日だった。",
      ko: "오늘은 정말 긴 하루였어.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Karena mengajar?",
      en: "Because of teaching?",
      ja: "授業のせい？",
      ko: "수업 때문이야?",
    }),
  ),
  narrate(
    tx({
      id: "Elena mengangguk.",
      en: "Elena nodded.",
      ja: "エレナはうなずいた。",
      ko: "엘레나는 고개를 끄덕인다.",
    }),
  ),
  say(
    "elena",
    "serious",
    tx({
      id: "Mengajar, rapat, mahasiswa, dosen lain… lalu Arthur.",
      en: "Teaching, meetings, students, other lecturers... and Arthur.",
      ja: "授業、会議、学生、他の教員…それにアーサー。",
      ko: "수업, 회의, 학생들, 다른 교수들... 그리고 아서.",
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
      id: "Rekan kerja. Tipe orang yang bicara sopan, tapi setiap katanya punya kait.",
      en: "A coworker. The kind of person who speaks politely, but every word comes with a hook.",
      ja: "同僚よ。言葉遣いは丁寧なのに、一言一言に棘じゃなくて釣り針がついてるタイプ。",
      ko: "직장 동료야. 겉으론 공손한데, 말 한마디마다 갈고리가 달린 타입이지.",
    }),
  ),
  narrate(
    tx({
      id: "Arka diam, membiarkan Elena melanjutkan.",
      en: "Arka stayed quiet and let Elena continue.",
      ja: "アルカは黙ったまま、エレナに続きを話させた。",
      ko: "아르카는 조용히 엘레나가 말을 잇도록 둔다.",
    }),
  ),
  say(
    "elena",
    "serious",
    tx({
      id: "Ada mahasiswa bermasalah. Aku memberi nilai sesuai pekerjaannya. Tapi keluarganya donatur besar. Beberapa orang ingin aku ‘menyesuaikan’ nilainya.",
      en: "There's a student causing trouble. I graded the work according to what it deserved. But the family is a major donor. Some people want me to 'adjust' the grade.",
      ja: "問題のある学生がいるの。私は提出物どおりに評価した。でもその家族は大口の寄付者で、何人かが私に『調整』しろと言ってきた。",
      ko: "문제 있는 학생이 하나 있어. 나는 그 과제에 맞는 점수를 줬어. 그런데 그 학생 가족이 큰 후원자라서, 몇몇 사람들이 내게 점수를 '조정'하라고 해.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Bahasa halus untuk curang.",
      en: "A polite way to say cheating.",
      ja: "不正を丁寧に言い換えただけだな。",
      ko: "부정을 점잖게 말한 것뿐이네.",
    }),
  ),
  narrate(
    tx({
      id: "Elena menatapnya.",
      en: "Elena looked at him.",
      ja: "エレナは彼を見た。",
      ko: "엘레나는 그를 바라본다.",
    }),
  ),
  say(
    "elena",
    "serious",
    tx({
      id: "Iya.",
      en: "Yes.",
      ja: "ええ。",
      ko: "그래.",
    }),
  ),
  narrate(
    tx({
      id: "Ia menunduk, suaranya lebih pelan.",
      en: "She lowered her head, her voice softer now.",
      ja: "彼女は視線を落とし、声を少し低くした。",
      ko: "그녀는 시선을 내리고, 목소리를 더 낮춘다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Arthur bilang aku harus lebih fleksibel. Katanya karierku masih bisa diselamatkan kalau aku tidak terlalu kaku.",
      en: "Arthur said I need to be more flexible. He said my career can still be saved if I stop being so rigid.",
      ja: "アーサーは、もっと柔軟になるべきだって言った。私がそんなに頑なでいなければ、まだキャリアは救えるって。",
      ko: "아서는 내가 좀 더 유연해야 한다고 했어. 너무 고집부리지 않으면 내 커리어도 아직 살릴 수 있다면서.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Fleksibel soal apa?",
      en: "Flexible about what?",
      ja: "何に対して柔軟に？",
      ko: "뭘 두고 유연하라는 건데?",
    }),
  ),
  say(
    "elena",
    "angry",
    tx({
      id: "Nilai. Aturan. Harga diri.",
      en: "Grades. Rules. Self-respect.",
      ja: "成績。規則。自尊心。",
      ko: "점수. 규정. 자존심.",
    }),
  ),
  narrate(
    tx({
      id: "Hening sebentar.",
      en: "Silence hung there for a moment.",
      ja: "短い沈黙が落ちた。",
      ko: "잠깐 정적이 흐른다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Yang melelahkan bukan karena mereka meminta aku melakukan hal yang salah. Tapi karena mereka membuatku merasa seolah aku yang bermasalah karena tidak mau ikut salah.",
      en: "What's exhausting isn't just that they're asking me to do something wrong. It's that they make me feel like I'm the problem for refusing to join them in doing wrong.",
      ja: "疲れるのは、間違ったことをしろと言われるからだけじゃないの。間違いに加わらない私のほうが問題みたいに感じさせられること。",
      ko: "지치는 건 그들이 내게 잘못된 일을 하라고 해서만이 아니야. 잘못에 동참하지 않으려는 내가 오히려 문제인 것처럼 느끼게 만든다는 거지.",
    }),
  ),
  narrate(
    tx({
      id: "Arka menatapnya serius.",
      en: "Arka looked at her seriously.",
      ja: "アルカは真剣な目で彼女を見た。",
      ko: "아르카는 진지한 눈으로 그녀를 바라본다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Orang yang memaksa kamu mengorbankan harga diri, lalu menyebutnya fleksibel, bukan sedang menolongmu.",
      en: "Someone who asks you to sacrifice your self-respect and then calls it flexibility isn't helping you.",
      ja: "自尊心を捨てろと迫って、それを柔軟性と呼ぶ人間は、助けてるんじゃない。",
      ko: "네 자존심을 버리라고 강요하면서 그걸 유연함이라고 부르는 사람은 널 돕는 게 아니야.",
    }),
  ),
  narrate(
    tx({
      id: "Elena diam.",
      en: "Elena said nothing.",
      ja: "エレナは黙った。",
      ko: "엘레나는 조용하다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Dia cuma ingin kamu merasa sendirian, supaya saat dia menawarkan jalan keluar, kamu merasa tidak punya pilihan.",
      en: "He just wants you to feel alone, so when he offers a way out, it feels like you don't have any other choice.",
      ja: "君を孤立してる気分にさせたいだけだ。そうすれば、そいつが出口を差し出した時、それしか選べないと思わせられる。",
      ko: "그 사람은 네가 혼자라고 느끼게 만들고 싶은 거야. 그래야 자기가 해결책을 내밀 때 네가 선택지가 없다고 느끼게 되니까.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Kamu terlalu banyak mengamati orang.",
      en: "You watch people too closely.",
      ja: "あなた、人を見すぎるのよ。",
      ko: "너는 사람을 너무 많이 관찰해.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Kadang berguna.",
      en: "Sometimes it's useful.",
      ja: "たまには役に立つ。",
      ko: "가끔은 도움이 되지.",
    }),
  ),
  narrate(
    tx({
      id: "Elena tidak menjawab. Ia hanya menyandarkan kepala ke sofa.",
      en: "Elena didn't answer. She just leaned her head back against the sofa.",
      ja: "エレナは答えなかった。ただソファに頭を預ける。",
      ko: "엘레나는 대답하지 않는다. 그저 소파에 머리를 기대어 놓는다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Hari ini… aku hampir menyerah.",
      en: "Today... I almost gave up.",
      ja: "今日…本当に折れそうだった。",
      ko: "오늘은... 정말 포기할 뻔했어.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Elena…",
      en: "Elena...",
      ja: "エレナ…",
      ko: "엘레나...",
    }),
  ),
  say(
    "elena",
    "serious",
    tx({
      id: "Jangan kasih ceramah. Aku cuma butuh diam sebentar.",
      en: "Don't give me a lecture. I just need some quiet for a bit.",
      ja: "説教はいらない。ただ少し静かにしていたいだけ。",
      ko: "설교는 하지 마. 그냥 잠깐 조용히 있고 싶어.",
    }),
  ),
  narrate(
    tx({
      id: "Arka mengangguk.",
      en: "Arka nodded.",
      ja: "アルカはうなずいた。",
      ko: "아르카는 고개를 끄덕인다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Oke. Aku diam.",
      en: "Okay. I'll be quiet.",
      ja: "わかった。黙ってる。",
      ko: "알겠어. 조용히 있을게.",
    }),
  ),
  narrate(
    tx({
      id: "Beberapa saat berlalu.",
      en: "A few moments passed.",
      ja: "しばらく時間が流れた。",
      ko: "잠시 시간이 흐른다.",
    }),
  ),
  narrate(
    tx({
      id: "Elena memejamkan mata.",
      en: "Elena closed her eyes.",
      ja: "エレナは目を閉じた。",
      ko: "엘레나는 눈을 감는다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Tapi jangan pergi dulu.",
      en: "But don't go yet.",
      ja: "でも、まだ行かないで。",
      ko: "그래도 아직은 가지 마.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Aku di sini.",
      en: "I'm here.",
      ja: "ここにいる。",
      ko: "나 여기 있어.",
    }),
  ),
  narrate(
    tx({
      id: "Namun setelah beberapa detik, Elena membuka mata lagi.",
      en: "But after a few seconds, Elena opened her eyes again.",
      ja: "だが数秒後、エレナはもう一度目を開けた。",
      ko: "하지만 몇 초 뒤, 엘레나는 다시 눈을 뜬다.",
    }),
  ),
  say(
    "elena",
    "serious",
    tx({
      id: "Mungkin sekarang aku butuh waktu sendiri.",
      en: "Maybe right now I need some time alone.",
      ja: "やっぱり今は、一人になる時間が必要かもしれない。",
      ko: "지금은 혼자 있을 시간이 필요한 것 같아.",
    }),
  ),
  narrate(
    tx({
      id: "Arka berdiri pelan.",
      en: "Arka stood up slowly.",
      ja: "アルカはゆっくり立ち上がった。",
      ko: "아르카는 천천히 자리에서 일어났다.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Oke. Aku keluar dulu.",
      en: "Okay. I'll head out first.",
      ja: "わかった。先に出るよ。",
      ko: "알겠어. 먼저 나갈게.",
    }),
  ),
  hide("arka-day4-elena-room"),
  hide("elena-day4-elena-room"),
  bg(
    elenaHallwayUrl,
    tx({
      id: "Apartment 69 - Lorong Lantai 3",
      en: "Apartment 69 - Third Floor Hallway",
      ja: "Apartment 69 - 3階の廊下",
      ko: "Apartment 69 - 3층 복도",
    }),
  ),
  narrate(
    tx({
      id: "Arka keluar dari unit 303 dengan tatapan khawatir. Saat pintu tertutup, ia menoleh ke angka 303 di dinding.\nUntuk pertama kalinya, ia sadar masalah Elena jauh lebih besar daripada pipa bocor.",
      en: "Arka stepped out of Unit 303 with a worried look. As the door closed, he glanced at the number 303 on the wall.\nFor the first time, he realized Elena's problems were much bigger than a leaking pipe.",
      ja: "アルカは不安げな表情のまま303号室を出た。ドアが閉まると、壁の303という数字へ視線を向ける。\nそのとき初めて、エレナの問題は水漏れしたパイプなどよりずっと大きいのだと気づいた。",
      ko: "아르카는 걱정스러운 표정으로 303호를 나왔다. 문이 닫히자 그는 벽에 적힌 303을 돌아본다.\n그는 그제야 엘레나의 문제가 단순한 배관 누수보다 훨씬 크다는 걸 깨달았다.",
    }),
  ),
  setFlag("day4ElenaCompleted", true),
];
