import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  centeredText,
  hide,
  jump,
  menu,
  narrate,
  playBgm,
  playSfx,
  say,
  setFlag,
  show,
} from "@/scenes/scriptTypes";
import elenaHallwayUrl from "@/background/elena-hallway.png";
import elenaBadroomUrl from "@/background/elena-badroom.png";
import knockSound from "@/sfx/knock.wav";
import day6Bgm from "@/music/day6.mp3";

export const day6ElenaArthurScene: VisualNovelCommand[] = [
  playBgm(day6Bgm),
  bg(
    elenaHallwayUrl,
    tx({
      id: "Apartment 69 - Lorong Unit 303 - Sore Hari",
      en: "Apartment 69 - Unit 303 Hallway - Afternoon",
      ja: "Apartment 69 - 303号室の廊下 - 午後",
      ko: "Apartment 69 - 303호 복도 - 오후",
    }),
  ),
  narrate(
    tx({
      id: "Sore itu, Arka berdiri di depan unit 303 sambil membawa kopi pahit dan roti. Ia hendak mengetuk pintu, tapi dari dalam terdengar suara pria.",
      en: "That afternoon, Arka stood in front of Unit 303 carrying bitter coffee and bread. He was about to knock, but a man's voice drifted out from inside.",
      ja: "その午後、アルカはブラックコーヒーとパンを持って303号室の前に立っていた。ドアをノックしようとしたとき、中から男の声が聞こえてきた。",
      ko: "그날 오후, 아르카는 쓴 커피와 빵을 들고 303호 앞에 서 있었다. 문을 두드리려던 순간, 안에서 남자 목소리가 들려왔다.",
    }),
  ),
  show("arka-day6-elena", "arka", "serious", {
    position: "left",
    enterFrom: "left",
  }),
  say(
    "arthur",
    "neutral",
    tx({
      id: "Aku sudah bilang, Elena. Masalah ini tidak akan selesai kalau kamu terus keras kepala.",
      en: "I've already told you, Elena. This problem won't go away if you keep being stubborn.",
      ja: "もう言っただろう、エレナ。頑固でいる限り、この問題は解決しない。",
      ko: "이미 말했잖아, 엘레나. 네가 계속 고집을 부리면 이 문제는 해결되지 않아.",
    }),
  ),
  narrate(
    tx({
      id: "Arka menurunkan tangannya.",
      en: "Arka lowered his hand.",
      ja: "アルカは手を下ろした。",
      ko: "아르카는 손을 내렸다.",
    }),
  ),
  say(
    "elena",
    "angry",
    tx({
      id: "Aku tidak mengundangmu masuk.",
      en: "I didn't invite you in.",
      ja: "招いた覚えはない。",
      ko: "난 너를 들어오라고 하지 않았어.",
    }),
  ),
  say(
    "arthur",
    "neutral",
    tx({
      id: "Pintumu tidak terkunci.",
      en: "Your door wasn't locked.",
      ja: "鍵がかかってなかった。",
      ko: "네 문이 잠겨 있지 않았어.",
    }),
  ),
  say(
    "elena",
    "angry",
    tx({
      id: "Itu bukan izin.",
      en: "That's not permission.",
      ja: "それは許可じゃない。",
      ko: "그게 허락은 아니야.",
    }),
  ),
  narrate(
    tx({
      id: "Arthur tertawa kecil.",
      en: "Arthur gave a small laugh.",
      ja: "アーサーは小さく笑った。",
      ko: "아서가 작게 웃었다.",
    }),
  ),
  say(
    "arthur",
    "neutral",
    tx({
      id: "Kamu masih sibuk bicara aturan, padahal posisimu hampir jatuh.",
      en: "You're still busy talking about rules, even when your position is about to fall.",
      ja: "まだルールの話をしてるのか。自分の立場がもう崩れかけているというのに。",
      ko: "아직도 규칙 얘기를 하고 있네, 네 자리가 거의 흔들리고 있는데.",
    }),
  ),
  narrate(
    tx({
      id: "Arka terdiam di depan pintu.",
      en: "Arka stood frozen in front of the door.",
      ja: "アルカはドアの前で立ちすくんだ。",
      ko: "아르카는 문 앞에서 굳어버렸다.",
    }),
  ),
  say(
    "arthur",
    "neutral",
    tx({
      id: "Surat pemberhentianmu sudah sampai ke yayasan. Kepala program masih menahan tanda tangan finalnya.",
      en: "Your termination letter has already reached the foundation. The program head is still holding off on the final signature.",
      ja: "解雇通知はすでに財団に届いている。プログラム責任者がまだ最終署名を保留しているだけだ。",
      ko: "네 해고 통지서는 이미 재단에 전달됐어. 프로그램 책임자가 아직 최종 서명을 보류하고 있을 뿐이야.",
    }),
  ),
  say(
    "elena",
    "angry",
    tx({
      id: "Dan kamu ingin aku berterima kasih?",
      en: "And you want me to be grateful?",
      ja: "それで、感謝してほしいわけ？",
      ko: "그러니까 나한테 감사하라고?",
    }),
  ),
  say(
    "arthur",
    "neutral",
    tx({
      id: "Aku ingin kamu berpikir jernih. Revisi nilai mahasiswa itu. Satu nilai tidak sebanding dengan kariermu.",
      en: "I want you to think clearly. Revise that student's grade. One grade isn't worth your career.",
      ja: "冷静に考えてほしい。あの学生の成績を修正しなさい。一つの成績がキャリアより大切なのか？",
      ko: "냉정하게 생각해. 그 학생 성적을 수정해. 성적 하나가 네 커리어보다 소중하겠어?",
    }),
  ),
  say(
    "elena",
    "angry",
    tx({
      id: "Dia menyontek.",
      en: "He cheated.",
      ja: "あの子はカンニングをした。",
      ko: "그 학생은 컨닝을 했어.",
    }),
  ),
  say(
    "arthur",
    "neutral",
    tx({
      id: "Dan ayahnya donatur terbesar yayasan.",
      en: "And his father is the foundation's biggest donor.",
      ja: "そして父親は財団最大の寄付者だ。",
      ko: "그리고 그 아버지는 재단의 가장 큰 기부자야.",
    }),
  ),
  narrate(tx({ id: "Hening.", en: "Silence.", ja: "沈黙。", ko: "침묵." })),
  say(
    "elena",
    "neutral",
    tx({
      id: "Kalau aku mengubah nilai karena tekanan, aku kehilangan integritasku.",
      en: "If I change a grade because of pressure, I lose my integrity.",
      ja: "圧力で成績を変えたら、私は自分の誠実さを失う。",
      ko: "압력 때문에 성적을 바꾸면 나는 내 성실함을 잃는 거야.",
    }),
  ),
  say(
    "arthur",
    "neutral",
    tx({
      id: "Integritas tidak membayar tagihanmu, Elena.",
      en: "Integrity doesn't pay your bills, Elena.",
      ja: "誠実さは請求書を払ってくれないぞ、エレナ。",
      ko: "성실함은 네 청구서를 내주지 않아, 엘레나.",
    }),
  ),
  say(
    "elena",
    "angry",
    tx({
      id: "Keluar dari unitku.",
      en: "Get out of my unit.",
      ja: "部屋から出て行って。",
      ko: "내 유닛에서 나가.",
    }),
  ),
  say(
    "arthur",
    "neutral",
    tx({
      id: "Besok datang ke rapat. Tanda tangan revisi nilai. Minta maaf dengan elegan. Setelah itu semuanya kembali normal.",
      en: "Come to the meeting tomorrow. Sign the grade revision. Apologize gracefully. After that, everything goes back to normal.",
      ja: "明日、会議に来なさい。成績修正に署名して。上品に謝罪する。それだけで全てが元通りになる。",
      ko: "내일 회의에 와. 성적 수정에 서명하고. 우아하게 사과해. 그러면 모든 게 다시 정상이 돼.",
    }),
  ),
  say(
    "elena",
    "angry",
    tx({
      id: "Dan kalau aku menolak?",
      en: "And if I refuse?",
      ja: "断ったら？",
      ko: "그리고 내가 거부하면?",
    }),
  ),
  say(
    "arthur",
    "neutral",
    tx({
      id: "Yayasan akan memilih orang yang lebih mudah diajak bekerja sama.",
      en: "The foundation will choose someone who's easier to work with.",
      ja: "財団はもっと協力的な人間を選ぶだろう。",
      ko: "재단은 더 협력하기 쉬운 사람을 선택할 거야.",
    }),
  ),
  narrate(
    tx({
      id: "Arka tidak tahan lagi. Ia mengetuk pintu keras.",
      en: "Arka couldn't hold back anymore. He knocked on the door hard.",
      ja: "アルカはもう限界だった。強くドアを叩いた。",
      ko: "아르카는 더 이상 참을 수 없었다. 문을 세게 두드렸다.",
    }),
  ),
  playSfx(knockSound),
  say(
    "arka",
    "serious",
    tx({ id: "Elena.", en: "Elena.", ja: "エレナ。", ko: "엘레나." }),
  ),
  narrate(
    tx({
      id: "Percakapan di dalam berhenti. Beberapa detik kemudian, pintu terbuka. Elena berdiri dengan wajah pucat dan mata kurang tidur.",
      en: "The conversation inside stopped. A few seconds later, the door opened. Elena stood there with a pale face and sleep-deprived eyes.",
      ja: "中の会話が止まった。数秒後、ドアが開いた。エレナが立っていた。顔は青ざめ、目には睡眠不足が滲んでいた。",
      ko: "안의 대화가 멈췄다. 몇 초 후, 문이 열렸다. 엘레나가 창백한 얼굴과 잠 못 잔 눈으로 서 있었다.",
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
  show("elena-day6-arthur", "elena", "neutral", {
    position: "center",
    enterFrom: "fade",
  }),
  show("arthur-day6-elena", "arthur", "neutral", {
    position: "right",
    enterFrom: "fade",
  }),
  narrate(
    tx({
      id: "Di belakangnya, Arthur berdiri rapi dengan senyum tipis.",
      en: "Behind her, Arthur stood composed with a thin smile.",
      ja: "その後ろでアーサーが整然と立ち、薄い笑みを浮かべていた。",
      ko: "그녀 뒤에, 아서가 단정하게 서서 얇은 미소를 짓고 있었다.",
    }),
  ),
  say(
    "arthur",
    "neutral",
    tx({
      id: "Oh. Anak unit sebelah.",
      en: "Oh. The kid from next door.",
      ja: "あら。隣の部屋の子か。",
      ko: "오. 옆집 아이구나.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Boleh aku masuk?",
      en: "May I come in?",
      ja: "入っていいですか？",
      ko: "들어가도 될까요?",
    }),
  ),
  narrate(
    tx({
      id: "Elena terdiam sebentar, lalu mengangguk.",
      en: "Elena went quiet for a moment, then nodded.",
      ja: "エレナは少しの間黙り込んだ後、うなずいた。",
      ko: "엘레나는 잠시 말이 없다가 고개를 끄덕였다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({ id: "Masuk.", en: "Come in.", ja: "入って。", ko: "들어와." }),
  ),
  narrate(
    tx({
      id: "Arka masuk dan berdiri di samping Elena. Arthur tersenyum sinis.",
      en: "Arka stepped in and stood beside Elena. Arthur smiled sardonically.",
      ja: "アルカは中に入り、エレナの隣に立った。アーサーが皮肉な笑みを浮かべた。",
      ko: "아르카는 안으로 들어가 엘레나 옆에 섰다. 아서가 냉소적으로 미소 지었다.",
    }),
  ),
  say(
    "arthur",
    "neutral",
    tx({
      id: "Sekarang kamu punya pengawal?",
      en: "Now you've got a bodyguard?",
      ja: "ボディーガードでも雇ったのか？",
      ko: "이제 경호원이라도 생긴 거야?",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Kalau ini urusan kampus, kenapa kamu datang ke apartemennya tanpa izin?",
      en: "If this is university business, why did you come to her apartment without permission?",
      ja: "これが大学の件なら、なぜ許可なく彼女のアパートに来たんですか？",
      ko: "이게 학교 일이라면, 왜 허락도 없이 그녀 아파트에 온 거죠?",
    }),
  ),
  say(
    "arthur",
    "angry",
    tx({
      id: "Ini bukan urusanmu.",
      en: "This is none of your business.",
      ja: "お前には関係ない。",
      ko: "이건 당신 일이 아니야.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Kamu masuk ke unit pribadi dosen perempuan, menekan dia soal nilai, lalu membawa surat pemberhentian sebagai ancaman. Itu sudah jadi urusan yang salah.",
      en: "You entered a female lecturer's private unit, pressured her about grades, then used a termination letter as a threat. That's already something very wrong.",
      ja: "女性講師の個人の部屋に無断で入り、成績について圧力をかけ、解雇通知を脅しに使った。それはもうおかしい。",
      ko: "당신은 여성 강사의 개인 유닛에 들어와서, 성적 문제로 압박하고, 해고 통지서를 협박 수단으로 썼어요. 그건 이미 잘못된 일이에요.",
    }),
  ),
  say(
    "arthur",
    "neutral",
    tx({
      id: "Besok kamu cukup tanda tangan revisi nilai. Aku bisa bantu selamatkan kariermu.",
      en: "Tomorrow just sign the grade revision. I can help save your career.",
      ja: "明日、成績修正に署名するだけでいい。キャリアを守る手助けができる。",
      ko: "내일 성적 수정에 서명만 하면 돼. 네 커리어를 구해줄 수 있어.",
    }),
  ),
  narrate(
    tx({
      id: "Elena diam. Tangannya gemetar kecil.",
      en: "Elena went silent. Her hands trembled slightly.",
      ja: "エレナは黙った。手が微かに震えていた。",
      ko: "엘레나는 침묵했다. 그녀의 손이 조금 떨렸다.",
    }),
  ),
  say(
    "arthur",
    "neutral",
    tx({
      id: "Jadi bagaimana? Mau tetap keras kepala dan kehilangan semuanya?",
      en: "So? Will you keep being stubborn and lose everything?",
      ja: "どうする？頑固を貫いて全てを失うつもりか？",
      ko: "그래서? 계속 고집을 부리다가 다 잃을 거야?",
    }),
  ),
  narrate(
    tx({
      id: "Arka melihat Elena. Ia tahu Elena takut, tapi ia juga tahu keputusan itu bukan miliknya.",
      en: "Arka looked at Elena. He knew Elena was scared, but he also knew the decision wasn't his to make.",
      ja: "アルカはエレナを見た。彼女が怖がっているのはわかった。でも、決断はアルカのものではない。",
      ko: "아르카는 엘레나를 바라봤다. 그녀가 두렵다는 걸 알았지만, 그 결정이 자신의 것이 아니라는 것도 알았다.",
    }),
  ),
  menu(
    tx({
      id: "Bagaimana Arka mendukung Elena?",
      en: "How will Arka support Elena?",
      ja: "アルカはどうエレナを支えるか？",
      ko: "아르카는 어떻게 엘레나를 지지할 것인가?",
    }),
    [
      {
        id: "protect",
        label: tx({
          id: '[PROTECT HER] "Sekolah seperti itu tidak pantas untukmu. Kamu berhenti saja."',
          en: '[PROTECT HER] "A place like that doesn\'t deserve you. Just quit."',
          ja: "[PROTECT HER]「そんな学校はお前に相応しくない。辞めてしまえ。」",
          ko: '[PROTECT HER] "그런 학교는 너한테 어울리지 않아. 그냥 그만둬."',
        }),
        next: "day6-elena-protect",
      },
      {
        id: "stand",
        label: tx({
          id: '[STAND BESIDE HER] "Keputusannya tetap di tanganmu. Tapi kalau kamu mau melawan, aku berdiri di sampingmu."',
          en: '[STAND BESIDE HER] "The decision is still yours. But if you want to fight, I\'m standing right beside you."',
          ja: "[STAND BESIDE HER]「決断はお前自身のものだ。でも戦いたいなら、俺はお前の隣に立つ。」",
          ko: '[STAND BESIDE HER] "결정은 여전히 네 것이야. 하지만 싸우고 싶다면, 나는 네 옆에 서 있을게."',
        }),
        next: "day6-elena-stand",
      },
    ],
  ),
];

export const day6ElenaProtectScene: VisualNovelCommand[] = [
  setFlag("elenaRelationshipDamaged", true),
  narrate(
    tx({
      id: "Arka maju dan berdiri di depan Elena.",
      en: "Arka stepped forward and stood in front of Elena.",
      ja: "アルカが前に出て、エレナの前に立った。",
      ko: "아르카가 앞으로 나서며 엘레나 앞에 섰다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Cukup. Sekolah seperti itu tidak pantas untuknya. Elena berhenti hari ini.",
      en: "Enough. A place like that doesn't deserve her. Elena quits today.",
      ja: "もういい。そんな学校は彼女に相応しくない。エレナは今日辞める。",
      ko: "됐어. 그런 학교는 그녀에게 어울리지 않아. 엘레나는 오늘 그만둬.",
    }),
  ),
  narrate(
    tx({
      id: "Ruangan langsung hening. Arthur tersenyum sinis.",
      en: "The room went immediately silent. Arthur smiled sardonically.",
      ja: "部屋が一瞬で静まり返った。アーサーが皮肉な笑みを浮かべた。",
      ko: "방이 바로 조용해졌다. 아서가 냉소적으로 미소 지었다.",
    }),
  ),
  say(
    "arthur",
    "neutral",
    tx({
      id: "Sekarang kamu yang membuat keputusan untuknya?",
      en: "Now you're making decisions for her?",
      ja: "今度は彼女の代わりに決断するつもりか？",
      ko: "이제 네가 그녀 대신 결정을 내리는 거야?",
    }),
  ),
  narrate(
    tx({
      id: "Arka terdiam. Elena menatap Arka. Wajahnya perlahan menjadi dingin.",
      en: "Arka went silent. Elena stared at Arka. Her expression slowly turned cold.",
      ja: "アルカは黙り込んだ。エレナがアルカを見つめた。その表情がゆっくりと冷えていった。",
      ko: "아르카는 침묵했다. 엘레나가 아르카를 바라봤다. 그녀의 표정이 서서히 싸늘해졌다.",
    }),
  ),
  say(
    "elena",
    "angry",
    tx({
      id: "Arthur. Keluar.",
      en: "Arthur. Get out.",
      ja: "アーサー。出て行って。",
      ko: "아서. 나가.",
    }),
  ),
  say(
    "arthur",
    "neutral",
    tx({
      id: "Sepertinya aku tidak perlu melakukan banyak hal. Kalian sudah cukup menghancurkan diri sendiri.",
      en: "Looks like I don't need to do much. You two are already doing a good enough job of destroying yourselves.",
      ja: "どうやら私はそれほど何もする必要がないようだ。君たちだけで自滅するのに十分だ。",
      ko: "내가 별로 할 게 없는 것 같네. 너희 둘이 알아서 잘 무너지고 있으니까.",
    }),
  ),
  hide("arthur-day6-elena", "fadeAway"),
  narrate(
    tx({
      id: "Arthur keluar. Pintu tertutup.",
      en: "Arthur left. The door closed.",
      ja: "アーサーが出て行った。ドアが閉まった。",
      ko: "아서가 나갔다. 문이 닫혔다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Akhirnya dia pergi.",
      en: "He's finally gone.",
      ja: "ようやく行ったな。",
      ko: "드디어 갔네.",
    }),
  ),
  narrate(
    tx({
      id: "Elena tidak menjawab.",
      en: "Elena didn't answer.",
      ja: "エレナは答えなかった。",
      ko: "엘레나는 대답하지 않았다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({ id: "Elena?", en: "Elena?", ja: "エレナ？", ko: "엘레나?" }),
  ),
  say(
    "elena",
    "angry",
    tx({
      id: "Kamu sadar apa yang baru saja kamu lakukan?",
      en: "Do you realize what you just did?",
      ja: "今自分が何をしたかわかってる？",
      ko: "방금 네가 무슨 짓을 한 건지 알아?",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Aku membelamu.",
      en: "I was defending you.",
      ja: "お前を守ったんだ。",
      ko: "나는 널 지켜줬어.",
    }),
  ),
  say(
    "elena",
    "angry",
    tx({
      id: "Tidak. Kamu mengambil alih.",
      en: "No. You took over.",
      ja: "違う。あなたは乗っ取ったの。",
      ko: "아니. 넌 장악했어.",
    }),
  ),
  narrate(
    tx({
      id: "Arka terdiam.",
      en: "Arka went silent.",
      ja: "アルカは黙った。",
      ko: "아르카는 침묵했다.",
    }),
  ),
  say(
    "elena",
    "angry",
    tx({
      id: "Kamu membuat keputusan tentang hidupku di depan orang yang sejak awal ingin melihatku kehilangan kendali.",
      en: "You made decisions about my life in front of the very person who wanted to see me lose control from the start.",
      ja: "最初から私が制御を失う姿を見たがっていた人間の前で、あなたは私の人生の決断を下した。",
      ko: "처음부터 나를 무너뜨리려 했던 사람 앞에서, 넌 내 인생에 대한 결정을 내렸어.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Aku cuma takut kamu hancur.",
      en: "I was just scared you'd fall apart.",
      ja: "ただ、お前が壊れてしまうのが怖かっただけだ。",
      ko: "나는 그냥 네가 무너질까봐 두려웠어.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Aku memang hampir hancur. Tapi jangan rebut harga diriku dengan alasan melindungiku.",
      en: "I almost did fall apart. But don't steal my dignity in the name of protecting me.",
      ja: "確かにもう少しで崩れそうだった。でも、守るという名目で私の尊厳を奪わないで。",
      ko: "나는 정말 거의 무너졌어. 하지만 날 보호한다는 명목으로 내 자존심을 빼앗지 마.",
    }),
  ),
  narrate(
    tx({
      id: "Hening. Elena membuka pintu.",
      en: "Silence. Elena opened the door.",
      ja: "沈黙。エレナがドアを開けた。",
      ko: "침묵. 엘레나가 문을 열었다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({ id: "Pulanglah.", en: "Go home.", ja: "帰って。", ko: "돌아가." }),
  ),
  narrate(
    tx({
      id: "Arka menunduk.",
      en: "Arka lowered his head.",
      ja: "アルカは頭を下げた。",
      ko: "아르카는 고개를 숙였다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({ id: "Maaf.", en: "I'm sorry.", ja: "ごめん。", ko: "미안해." }),
  ),
  hide("arka-day6-elena", "fadeAway"),
  hide("elena-day6-arthur", "fadeAway"),
  bg(
    elenaHallwayUrl,
    tx({
      id: "Apartment 69 - Lorong Unit 303",
      en: "Apartment 69 - Unit 303 Hallway",
      ja: "Apartment 69 - 303号室の廊下",
      ko: "Apartment 69 - 303호 복도",
    }),
  ),
  narrate(
    tx({
      id: "Arka keluar dari unit 303. Di lorong, ia menatap angka 303 dengan dada berat.",
      en: "Arka stepped out of Unit 303. In the hallway, he stared at the number 303 with a heavy chest.",
      ja: "アルカは303号室を出た。廊下で、胸を重くしながら「303」という数字を見つめた。",
      ko: "아르카는 303호를 나왔다. 복도에서 무거운 가슴으로 '303'이라는 숫자를 바라봤다.",
    }),
  ),
  narrate(
    tx({
      id: 'Arka: "Aku pikir membelanya berarti berdiri di depan dia. Tapi Elena tidak butuh orang yang menutupi jalannya. Dia butuh seseorang yang percaya dia masih bisa berjalan sendiri."',
      en: 'Arka: "I thought defending her meant standing in front of her. But Elena doesn\'t need someone who blocks her path. She needs someone who believes she can still walk on her own."',
      ja: "アルカ：「彼女を守るとは、彼女の前に立つことだと思っていた。でもエレナは道を塞いでくれる人を必要としていない。自分でまだ歩けると信じてくれる人が必要なんだ。」",
      ko: '아르카: "그녀를 지킨다는 게 그녀 앞에 서는 거라고 생각했어. 하지만 엘레나는 자신의 길을 막아주는 사람이 필요한 게 아니야. 그녀 스스로 아직 걸을 수 있다고 믿어주는 사람이 필요해."',
    }),
  ),
  centeredText(
    tx({
      id: "RELATIONSHIP UPDATE: ELENA MERASA DIKONTROL — KEPERCAYAAN TERGUNCANG",
      en: "RELATIONSHIP UPDATE: ELENA FEELS CONTROLLED — TRUST DAMAGED",
      ja: "RELATIONSHIP UPDATE: エレナは支配されたと感じている — 信頼が傷ついた",
      ko: "RELATIONSHIP UPDATE: 엘레나는 통제당했다고 느낌 — 신뢰 손상",
    }),
    { size: "sub" },
  ),
  jump("day6-complate"),
];

export const day6ElenaStandScene: VisualNovelCommand[] = [
  setFlag("elenaRelationshipStrengthened", true),
  narrate(
    tx({
      id: "Arka menarik napas. Ia ingin maju, tapi ia menahan diri. Ia tidak berdiri di depan Elena. Ia berdiri di sampingnya.",
      en: "Arka drew a breath. He wanted to step forward, but held himself back. He didn't stand in front of Elena. He stood beside her.",
      ja: "アルカは息を吸った。前に出たかったが、こらえた。エレナの前には立たなかった。彼女の隣に立った。",
      ko: "아르카는 숨을 들이쉬었다. 앞으로 나서고 싶었지만 참았다. 엘레나 앞에 서지 않았다. 그녀 옆에 섰다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({ id: "Elena.", en: "Elena.", ja: "エレナ。", ko: "엘레나." }),
  ),
  narrate(
    tx({
      id: "Elena menoleh sedikit.",
      en: "Elena turned slightly.",
      ja: "エレナが少し振り向いた。",
      ko: "엘레나가 조금 돌아봤다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Keputusannya tetap di tanganmu.",
      en: "The decision is still yours.",
      ja: "決断はお前のものだ。",
      ko: "결정은 여전히 네 것이야.",
    }),
  ),
  say(
    "arthur",
    "neutral",
    tx({
      id: "Akhirnya ada kalimat masuk akal.",
      en: "Finally, something sensible.",
      ja: "ようやくまともなことを言った。",
      ko: "드디어 말이 되는 소리가 나오네.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Tapi kalau kamu mau melawan, aku berdiri di sampingmu.",
      en: "But if you want to fight, I'm standing right beside you.",
      ja: "でも戦いたいなら、俺はお前の隣に立つ。",
      ko: "하지만 싸우고 싶다면, 나는 네 옆에 서 있을게.",
    }),
  ),
  narrate(
    tx({
      id: "Elena diam. Arthur tertawa kecil.",
      en: "Elena went quiet. Arthur gave a small laugh.",
      ja: "エレナは黙った。アーサーが小さく笑った。",
      ko: "엘레나는 침묵했다. 아서가 작게 웃었다.",
    }),
  ),
  say(
    "arthur",
    "neutral",
    tx({
      id: "Melawan dengan apa?",
      en: "Fight with what?",
      ja: "何で戦うつもりだ？",
      ko: "뭘로 싸울 건데?",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Dengan fakta. Kamu datang ke unit pribadinya tanpa izin, menekan dia untuk mengubah nilai, dan memakai surat pemberhentian sebagai alat tawar.",
      en: "With facts. You came to her private unit without permission, pressured her to change a grade, and used a termination letter as a bargaining tool.",
      ja: "事実でだ。お前は無断で彼女の個人の部屋に来て、成績を変えるよう圧力をかけ、解雇通知を交渉の手段に使った。",
      ko: "사실로요. 당신은 허락 없이 그녀의 개인 유닛에 와서, 성적을 바꾸도록 압박하고, 해고 통지서를 협상 수단으로 사용했어요.",
    }),
  ),
  narrate(
    tx({
      id: "Arthur menyipitkan mata.",
      en: "Arthur narrowed his eyes.",
      ja: "アーサーが目を細めた。",
      ko: "아서가 눈을 가늘게 떴다.",
    }),
  ),
  say(
    "arthur",
    "angry",
    tx({
      id: "Kamu bicara seolah punya bukti.",
      en: "You talk as if you have evidence.",
      ja: "証拠でもあるような口ぶりだな。",
      ko: "마치 증거라도 있는 것처럼 말하네.",
    }),
  ),
  narrate(
    tx({
      id: "Arka mengangkat ponselnya. Arthur terdiam.",
      en: "Arka raised his phone. Arthur went silent.",
      ja: "アルカがスマートフォンを持ち上げた。アーサーが沈黙した。",
      ko: "아르카가 휴대폰을 들어 올렸다. 아서가 침묵했다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Mau lanjut bicara?",
      en: "Want to keep talking?",
      ja: "続けたいか？",
      ko: "계속 얘기할 거야?",
    }),
  ),
  narrate(
    tx({
      id: "Senyum Arthur mulai retak. Elena menarik napas, lalu melangkah maju. Arka tidak menahannya.",
      en: "Arthur's smile began to crack. Elena drew a breath, then stepped forward. Arka didn't stop her.",
      ja: "アーサーの笑みが崩れ始めた。エレナが息を吸い、前へ踏み出した。アルカは止めなかった。",
      ko: "아서의 미소가 흔들리기 시작했다. 엘레나가 숨을 들이쉬고 앞으로 나섰다. 아르카는 막지 않았다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Besok aku akan datang ke rapat.",
      en: "Tomorrow I will come to the meeting.",
      ja: "明日、会議に行く。",
      ko: "내일 회의에 나갈게.",
    }),
  ),
  narrate(
    tx({
      id: "Arthur tampak lega.",
      en: "Arthur looked relieved.",
      ja: "アーサーが安堵した様子を見せた。",
      ko: "아서가 안도하는 표정을 지었다.",
    }),
  ),
  say(
    "arthur",
    "neutral",
    tx({
      id: "Bagus. Akhirnya kamu—",
      en: "Good. Finally you—",
      ja: "よし。ようやく—",
      ko: "좋아. 드디어—",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Bukan untuk merevisi nilai.",
      en: "Not to revise the grade.",
      ja: "成績を修正するためじゃない。",
      ko: "성적을 수정하러 가는 게 아니야.",
    }),
  ),
  narrate(
    tx({
      id: "Arthur terdiam.",
      en: "Arthur fell silent.",
      ja: "アーサーが黙った。",
      ko: "아서가 침묵했다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Aku akan datang membawa laporan resmi. Tentang tekanan perubahan nilai, intervensi donatur, dan kamu yang datang ke tempat tinggalku tanpa izin.",
      en: "I'll come bringing a formal report. About the pressure to change grades, donor interference, and you coming to my residence without permission.",
      ja: "正式な報告書を持って行く。成績変更の圧力、寄付者の介入、そして無断で私の住居に来たことについて。",
      ko: "나는 공식 보고서를 들고 갈 거야. 성적 변경 압박, 기부자 개입, 그리고 네가 내 거주지에 무단으로 온 것에 대해서.",
    }),
  ),
  say(
    "arthur",
    "angry",
    tx({
      id: "Kamu akan kehilangan pekerjaanmu.",
      en: "You'll lose your job.",
      ja: "仕事を失うことになるぞ。",
      ko: "넌 직장을 잃게 될 거야.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Mungkin. Tapi kalau aku mempertahankannya dengan menjual penilaianku, aku sudah kehilangan diriku lebih dulu.",
      en: "Maybe. But if I keep it by selling my judgment, I've already lost myself first.",
      ja: "そうかもしれない。でも自分の判断を売り渡して維持するくらいなら、もう自分を失っている。",
      ko: "아마도. 하지만 내 판단을 팔아서 지킨다면, 나는 이미 나 자신을 먼저 잃은 거야.",
    }),
  ),
  say(
    "arthur",
    "angry",
    tx({
      id: "Kamu baru saja membakar jembatan terakhirmu.",
      en: "You just burned your last bridge.",
      ja: "最後の橋を燃やしたな。",
      ko: "넌 방금 마지막 다리를 불태웠어.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Bukan. Aku baru sadar jembatan itu menuju tempat yang salah.",
      en: "No. I just realized that bridge led to the wrong place.",
      ja: "違う。その橋が間違った場所に繋がっていると、今気づいただけ。",
      ko: "아니. 나는 그 다리가 잘못된 곳으로 이어진다는 걸 방금 깨달았을 뿐이야.",
    }),
  ),
  hide("arthur-day6-elena", "fadeAway"),
  narrate(
    tx({
      id: "Arthur keluar. Pintu tertutup. Elena berdiri diam beberapa detik, lalu bahunya turun. Napasnya berat.",
      en: "Arthur left. The door closed. Elena stood still for a few seconds, then her shoulders dropped. Her breathing was heavy.",
      ja: "アーサーが出て行った。ドアが閉まった。エレナは数秒間じっと立ち、それから肩が落ちた。息が重かった。",
      ko: "아서가 나갔다. 문이 닫혔다. 엘레나는 몇 초간 가만히 서 있다가 어깨가 처졌다. 숨이 무거웠다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Kamu benar-benar merekam?",
      en: "You were really recording?",
      ja: "本当に録音してたの？",
      ko: "진짜로 녹음하고 있었어?",
    }),
  ),
  narrate(
    tx({
      id: "Arka diam sebentar.",
      en: "Arka was quiet for a moment.",
      ja: "アルカはしばらく黙っていた。",
      ko: "아르카는 잠시 침묵했다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({ id: "Tidak.", en: "No.", ja: "いや。", ko: "아니." }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Aku buka aplikasi kalkulator.",
      en: "I opened the calculator app.",
      ja: "電卓アプリを開いてただけだ。",
      ko: "나는 계산기 앱을 열었어.",
    }),
  ),
  narrate(
    tx({
      id: "Elena terdiam, lalu tertawa kecil.",
      en: "Elena went quiet, then let out a small laugh.",
      ja: "エレナが黙り込み、それから小さく笑った。",
      ko: "엘레나는 잠시 말이 없다가 작게 웃었다.",
    }),
  ),
  say(
    "elena",
    "smile",
    tx({
      id: "Kamu bodoh sekali.",
      en: "You're so stupid.",
      ja: "ほんとに馬鹿ね。",
      ko: "너 진짜 멍청하다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Tapi efektif.",
      en: "But effective.",
      ja: "でも効果的だった。",
      ko: "하지만 효과는 있었잖아.",
    }),
  ),
  narrate(
    tx({
      id: "Tawa Elena pelan-pelan berubah menjadi napas gemetar.",
      en: "Elena's laughter slowly turned into trembling breaths.",
      ja: "エレナの笑いがゆっくりと震える呼吸に変わっていった。",
      ko: "엘레나의 웃음이 천천히 떨리는 숨소리로 변해갔다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Kamu nggak apa-apa?",
      en: "Are you okay?",
      ja: "大丈夫か？",
      ko: "괜찮아?",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Tidak. Tapi aku lebih tidak apa-apa daripada lima menit lalu.",
      en: "No. But I'm more okay than I was five minutes ago.",
      ja: "ダメ。でも五分前よりはマシ。",
      ko: "아니. 하지만 5분 전보다는 나아.",
    }),
  ),
  narrate(
    tx({
      id: "Arka mengambil kantong plastik yang tadi ia taruh di pintu.",
      en: "Arka picked up the plastic bag he'd left by the door.",
      ja: "アルカはドアのそばに置いておいたビニール袋を取った。",
      ko: "아르카는 문 앞에 놔뒀던 비닐봉지를 집어 들었다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Aku bawa kopi pahit.",
      en: "I brought bitter coffee.",
      ja: "ブラックコーヒーを持ってきた。",
      ko: "쓴 커피 가져왔어.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Kamu tetap bawa?",
      en: "You still brought it?",
      ja: "それでも持ってきたの？",
      ko: "그래도 가져왔어?",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Perintah dosen tidak boleh diabaikan.",
      en: "Lecturer's orders cannot be ignored.",
      ja: "先生の命令は無視できない。",
      ko: "강사의 명령은 무시할 수 없지.",
    }),
  ),
  narrate(
    tx({
      id: "Elena memalingkan wajah, tapi sudut bibirnya naik sedikit.",
      en: "Elena turned her face away, but the corner of her lips lifted slightly.",
      ja: "エレナは顔をそらしたが、口の端が少しだけ上がった。",
      ko: "엘레나는 얼굴을 돌렸지만, 입꼬리가 조금 올라갔다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Taruh di meja.",
      en: "Put it on the table.",
      ja: "テーブルに置いて。",
      ko: "테이블에 놔.",
    }),
  ),
  narrate(
    tx({
      id: "Arka meletakkan kopi dan roti di meja.",
      en: "Arka set the coffee and bread on the table.",
      ja: "アルカはコーヒーとパンをテーブルに置いた。",
      ko: "아르카는 커피와 빵을 테이블에 놓았다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Tadi… terima kasih.",
      en: "Earlier… thank you.",
      ja: "さっきは… ありがとう。",
      ko: "아까… 고마워.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Aku cuma berdiri di sampingmu.",
      en: "I just stood beside you.",
      ja: "ただ隣に立っただけだ。",
      ko: "나는 그냥 네 옆에 섰을 뿐이야.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Itu yang aku butuhkan.",
      en: "That's what I needed.",
      ja: "それで十分だった。",
      ko: "그게 내가 필요했던 거야.",
    }),
  ),
  narrate(
    tx({
      id: "Hening sebentar.",
      en: "A brief silence.",
      ja: "少しの間、沈黙が続いた。",
      ko: "잠시 침묵이 흘렀다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Aku tidak butuh seseorang yang mengambil keputusan untukku.",
      en: "I don't need someone who makes decisions for me.",
      ja: "私の代わりに決断してくれる人は必要ない。",
      ko: "나는 내 대신 결정해주는 사람이 필요하지 않아.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({ id: "Aku tahu.", en: "I know.", ja: "わかってる。", ko: "알아." }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Tapi mungkin… aku juga tidak harus berdiri sendirian setiap saat.",
      en: "But maybe… I don't have to stand alone every time either.",
      ja: "でも… いつも一人で立たなくてもいいのかもしれない。",
      ko: "하지만 어쩌면… 매번 혼자 서 있을 필요는 없는 것 같기도 해.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Itu kemajuan.",
      en: "That's progress.",
      ja: "それは進歩だ。",
      ko: "그건 발전이야.",
    }),
  ),
  narrate(
    tx({
      id: "Elena menyipitkan mata.",
      en: "Elena narrowed her eyes.",
      ja: "エレナが目を細めた。",
      ko: "엘레나가 눈을 가늘게 떴다.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Oke. Aku berhenti.",
      en: "Okay. I'll stop.",
      ja: "わかった。やめる。",
      ko: "알겠어. 그만할게.",
    }),
  ),
  narrate(
    tx({
      id: "Elena menyesap kopinya.",
      en: "Elena took a sip of her coffee.",
      ja: "エレナがコーヒーを一口飲んだ。",
      ko: "엘레나가 커피를 한 모금 마셨다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({ id: "Pahit.", en: "Bitter.", ja: "苦い。", ko: "써." }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Sesuai pesanan.",
      en: "As ordered.",
      ja: "ご注文通りです。",
      ko: "주문대로야.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Lumayan.",
      en: "Not bad.",
      ja: "まあまあね。",
      ko: "나쁘지 않네.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Untuk kopinya atau aku?",
      en: "For the coffee or for me?",
      ja: "コーヒーの話？それとも俺の話？",
      ko: "커피 얘기야, 나 얘기야?",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Jangan rusak momen.",
      en: "Don't ruin the moment.",
      ja: "雰囲気を壊さないで。",
      ko: "분위기 망치지 마.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({ id: "Baik.", en: "Alright.", ja: "わかった。", ko: "알겠어." }),
  ),
  narrate(
    tx({
      id: "Malam itu, Arthur tidak lagi memenuhi ruangan. Yang tersisa hanya Elena, Arka, kopi pahit, dan keputusan yang akhirnya Elena ambil sendiri.",
      en: "That night, Arthur no longer filled the room. All that remained was Elena, Arka, bitter coffee, and the decision Elena had finally made on her own.",
      ja: "その夜、アーサーはもうその部屋を満たしていなかった。残ったのはエレナ、アルカ、ブラックコーヒー、そしてエレナが自分自身で下した決断だけだった。",
      ko: "그날 밤, 아서는 더 이상 방을 채우지 않았다. 남은 것은 엘레나, 아르카, 쓴 커피, 그리고 엘레나가 스스로 내린 결정뿐이었다.",
    }),
  ),
  narrate(
    tx({
      id: 'Arka: "Aku hampir berdiri di depan dia. Tapi Elena bukan orang yang harus diselamatkan seperti barang pecah belah. Dia hanya butuh seseorang yang percaya ia masih bisa berdiri, bahkan saat lututnya hampir menyerah."',
      en: 'Arka: "I almost stood in front of her. But Elena isn\'t someone who needs to be saved like fragile china. She just needs someone who believes she can still stand, even when her knees are about to give."',
      ja: "アルカ：「もう少しで彼女の前に立つところだった。でもエレナは壊れ物みたいに救われる必要はない。ひざが崩れそうなときでも、まだ立っていられると信じてくれる人が必要なだけだ。」",
      ko: '아르카: "나는 하마터면 그녀 앞에 설 뻔했어. 하지만 엘레나는 마치 깨지기 쉬운 도자기처럼 구해져야 할 사람이 아니야. 그녀는 그저 무릎이 거의 꺾이려 할 때도 아직 혼자 설 수 있다고 믿어주는 사람이 필요할 뿐이야."',
    }),
  ),
  centeredText(
    tx({
      id: "RELATIONSHIP UPDATE: ELENA MEMBUKA DIRI — KEPERCAYAAN TUMBUH",
      en: "RELATIONSHIP UPDATE: ELENA OPENS UP — TRUST GROWING",
      ja: "RELATIONSHIP UPDATE: エレナが心を開く — 信頼が育っている",
      ko: "RELATIONSHIP UPDATE: 엘레나가 마음을 열다 — 신뢰 성장 중",
    }),
    { size: "sub" },
  ),
  jump("day6-complate"),
];
