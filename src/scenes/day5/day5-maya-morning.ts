import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, hide, jump, minigame, narrate, say, show } from "@/scenes/scriptTypes";
import mayaBedroomUrl from "@/background/maya-bedroom.png";
import frontOfficeUrl from "@/background/front-office.png";
import { mayaDay1To4Voices } from "@/voice/maya/day1to4";

export const day5MayaMorningScene: VisualNovelCommand[] = [
  bg(
    mayaBedroomUrl,
    tx({
      id: "Unit 301 - Kamar Maya - 07:00",
      en: "Unit 301 - Maya's Room - 07:00",
      ja: "301号室 - マヤの部屋 - 07:00",
      ko: "301호 - 마야의 방 - 07:00",
    }),
  ),
  show("arka-day5-morning", "arka", "neutral", {
    position: "left",
    enterFrom: "fade",
  }),
  show("maya-day5-morning", "maya", "blush", {
    position: "center",
    enterFrom: "fade",
  }),
  narrate(
    tx({
      id: "Semalam niatnya cuma nemenin tidur biar dia nggak kepikiran bapaknya terus. Tapi ya... namanya cowok sama cewek di satu kasur, ujung-ujungnya malah keterusan. Tapi lihat dia tidur sepulas ini, rasanya rasa canggung ala tetangga yang kemarin-kemarin udah hilang.",
      en: "Last night the plan was just to keep her company so she wouldn't keep thinking about her dad. But well... a guy and a girl in the same bed, things just kind of happened. Still, watching her sleep that soundly, the awkward neighbor vibe from before feels like it's just... gone.",
      ja: "昨夜は、彼女が父親のことばかり考えないよう付き合ってやろうという気持ちだけだった。でも……男と女が同じベッドにいたら、流れで、ああなってしまった。それでも、こんなに熟睡している彼女を見ていると、昨日まであったよそよそしい隣人感みたいなものが、もう跡形もない気がした。",
      ko: "어젯밤엔 그냥 아버지 생각에 잠 못 드는 거 옆에 있어주려 했을 뿐이었다. 그런데 뭐... 남자랑 여자가 한 침대에 있으면 결국 이렇게 되더라. 그래도 이렇게 깊이 잠든 얼굴을 보고 있으면, 어제까지의 어색한 이웃 사이 같은 느낌이 이미 사라진 것 같다.",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Arka bergerak sedikit buat membenarkan posisi bantalnya. Gerakan itu bikin Maya kebangun. Dia mengerjapkan mata, melihat ke arah Arka, terus baru sadar sama situasinya. Wajahnya langsung merah, dan dia buru-buru narik selimut nutupin setengah wajahnya.",
      en: "Arka shifts slightly to fix his pillow. The movement stirs Maya awake. She blinks, looks over at Arka, and then the situation hits her. Her face turns red instantly and she yanks the blanket up to cover half her face.",
      ja: "アルカが枕の位置を直そうと少し動くと、その気配でマヤが目を覚ます。まばたきをして、アルカのほうを見て、状況をようやく理解した瞬間、顔がみるみる赤くなり、急いで毛布を引き上げて顔の半分を隠した。",
      ko: "아르카가 베개 위치를 바로잡으려고 살짝 움직이자, 그 기척에 마야가 눈을 떴다. 눈을 깜빡이다가 아르카를 바라보고, 상황을 인지하는 순간 얼굴이 빨개지더니 이불을 세게 끌어올려 얼굴 절반을 가렸다.",
    }),
  ),
  say(
    "maya",
    "blush",
    tx({
      id: "Aduh... Arka...",
      en: "Oh no... Arka...",
      ja: "もう…アルカ…",
      ko: "어머... 아르카...",
    }),
    { voice: mayaDay1To4Voices[27] },
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Pagi. Udah mendingan badannya? Kepalanya masih berat nggak?",
      en: "Morning. Feeling better? Still got a heavy head?",
      ja: "おはよう。体の調子はどうだ？ 頭まだつらいか？",
      ko: "아침이야. 몸은 좀 나아졌어? 머리 아직도 무거워?",
    }),
  ),
  say(
    "maya",
    "blush",
    tx({
      id: "Udah... udah nggak panas sama sekali. Tapi... aduh, aku malu banget ingat semalam.",
      en: "Yeah... no fever at all anymore. But... oh god, I'm so embarrassed thinking about last night.",
      ja: "うん…もう全然熱くない。でも…昨夜のこと思い出したら、もう恥ずかしくて。",
      ko: "응... 이제 열 전혀 없어. 근데... 어, 어젯밤 생각하면 너무 창피해.",
    }),
    { voice: mayaDay1To4Voices[28] },
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Lagian semalam kan kamu yang narik duluan.",
      en: "Well, you were the one who pulled me in first.",
      ja: "そもそも昨夜、先に引っ張ったのはお前だけどな。",
      ko: "근데 어젯밤에 먼저 잡아당긴 건 너잖아.",
    }),
  ),
  say(
    "maya",
    "blush",
    tx({
      id: "Ih, jangan dibahas! Aku kan lagi setengah sadar gara-gara demam.",
      en: "Hey, don't bring that up! I was half-conscious from the fever.",
      ja: "もう、言わないで！ 熱で半分意識なかったんだから。",
      ko: "야, 그 얘기 꺼내지 마! 나 열 때문에 반쯤 의식 없었잖아.",
    }),
    { voice: mayaDay1To4Voices[29] },
  ),
  narrate(
    tx({
      id: "Arka cuma ketawa pelan. Dia bangkit dan ngambil pakaiannya, sementara Maya masih sembunyi di balik selimut.",
      en: "Arka just laughs quietly. He gets up and grabs his clothes, while Maya stays hidden under the blanket.",
      ja: "アルカは小さく笑うだけだ。立ち上がって服を手に取る。マヤはまだ毛布の中に隠れたままだ。",
      ko: "아르카는 그저 조용히 웃는다. 일어나서 옷을 집어 들고, 마야는 아직 이불 속에 숨어 있다.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Ya udah, aku balik ke kamarku dulu buat mandi. Kamu juga mandi gih, habis itu kita cari sarapan di bawah.",
      en: "Alright, I'll head back to my room to shower first. You go shower too, and then we'll grab breakfast downstairs.",
      ja: "じゃあ、俺は一度部屋に戻ってシャワー浴びてくる。お前も浴びたら、下で朝ごはん探そう。",
      ko: "그럼 나 먼저 내 방 가서 씻고 올게. 너도 씻고, 그다음 아래층에서 아침 먹자.",
    }),
  ),
  hide("arka-day5-morning", "fadeAway"),
  say(
    "maya",
    "blush",
    tx({
      id: "Iya. Makasih ya, Arka.",
      en: "Okay. Thank you, Arka.",
      ja: "うん。ありがとう、アルカ。",
      ko: "응. 고마워, 아르카.",
    }),
    { voice: mayaDay1To4Voices[30] },
  ),
  jump("day5-lobby-farewell"),
];

export const day5LobbyFarewellScene: VisualNovelCommand[] = [
  hide("maya-day5-morning"),
  bg(
    frontOfficeUrl,
    tx({
      id: "Lobi Apartemen Lentera - 12:30",
      en: "Lentera Apartment Lobby - 12:30",
      ja: "レンテラアパートロビー - 12:30",
      ko: "렌테라 아파트 로비 - 12:30",
    }),
  ),
  show("arka-day5-lobby", "arka", "neutral", {
    position: "left",
    enterFrom: "fade",
  }),
  show("maya-day5-lobby", "maya", "calm", {
    position: "center",
    enterFrom: "fade",
  }),
  say(
    "arka",
    "neutral",
    tx({
      id: "Yakin udah kuat ngampus? Kan ujiannya ditunda.",
      en: "You sure you're up for campus? The exam's already pushed back.",
      ja: "本当に大学行けるのか？ 試験は延期になったのに。",
      ko: "정말 학교 갈 수 있어? 시험은 미뤄졌잖아.",
    }),
  ),
  say(
    "maya",
    "calm",
    tx({
      id: "Udah segeran kok. Cuma mau ngasihin surat sakit ke admin kampus sama balikin buku ke perpus. Bentar doang.",
      en: "I'm fine now, really. Just dropping off the sick note at the admin office and returning a book to the library. Won't take long.",
      ja: "もう大丈夫だよ。診断書を事務局に届けて、図書館に本返すだけ。すぐ終わるから。",
      ko: "이제 괜찮아. 그냥 행정실에 진단서 내고 도서관에 책 반납하는 거야. 금방 끝나.",
    }),
    { voice: mayaDay1To4Voices[31] },
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Oke. Jangan dipaksa. Kalau mulai pusing sedikit aja, langsung pesan ojek pulang.",
      en: "Okay. Don't push yourself. The moment you feel even a little dizzy, order a ride back home.",
      ja: "わかった。無理するなよ。少しでも頭がくらっとしたら、すぐ帰りの車を呼べ。",
      ko: "알겠어. 무리하지 마. 조금이라도 어지러우면 바로 차 불러서 집으로 와.",
    }),
  ),
  narrate(
    tx({
      id: "Maya mengangguk. Tiba-tiba dia berjinjit, mencium pipi Arka kilat, terus menunduk malu.",
      en: "Maya nods. Then, without warning, she rises on her toes, plants a quick kiss on Arka's cheek, and immediately looks down in embarrassment.",
      ja: "マヤはうなずく。と、突然つま先立ちになって、アルカの頬にすばやくキスをして、すぐに恥ずかしそうに俯いた。",
      ko: "마야가 고개를 끄덕인다. 그러더니 갑자기 발끝을 세우고 아르카의 뺨에 빠르게 입을 맞추고는 바로 고개를 숙인다.",
    }),
  ),
  say(
    "maya",
    "blush",
    tx({
      id: "Aku berangkat dulu ya. Nanti sore aku chat.",
      en: "I'm heading out now. I'll message you this afternoon.",
      ja: "じゃあ行ってくるね。夕方にLINEする。",
      ko: "나 먼저 갈게. 오후에 연락할게.",
    }),
    { voice: mayaDay1To4Voices[32] },
  ),
  hide("maya-day5-lobby", "fadeAway"),
  narrate(
    tx({
      id: "Maya jalan cepat keluar lobi, ninggalin Arka yang masih agak kaget sama keberanian mendadak gadis itu.",
      en: "Maya walks quickly out of the lobby, leaving Arka still slightly stunned by that unexpected boldness.",
      ja: "マヤは足早にロビーを出ていく。あの突然の大胆さにまだ少し呆気にとられているアルカを残して。",
      ko: "마야는 빠르게 로비를 나가 버린다. 그 갑작스러운 대담함에 아직 조금 멍한 아르카를 남겨두고.",
    }),
  ),
  narrate(
    tx({
      id: "Lumayan kaget juga dia tiba-tiba berani gitu. Tapi seenggaknya dia kelihatan jauh lebih hidup dari hari-hari sebelumnya. Baguslah.",
      en: "Didn't see that coming. But at least she looks a lot more alive than she has in days. Good.",
      ja: "まさかあんなに大胆に来るとは思わなかった。でも、ここ最近より全然いい顔してる。それでよかった。",
      ko: "이렇게 갑자기 대담하게 나올 줄은 몰랐다. 그래도 요 며칠보다는 훨씬 살아있는 것 같아 보인다. 다행이다.",
    }),
    "arka",
  ),
  minigame("smartphone-contacts", {
    showSleepOption: true,
    sleepOptionNext: "day5-complate",
    disabledContacts: ["maya", "elena", "nadia", "sara"],
    title: {
      id: "Sisa hari ini mau ngapain?",
      en: "What now for the rest of the day?",
      ja: "今日の残りはどうする？",
      ko: "오늘 남은 시간은 어떻게 할까?",
    },
    subtitle: {
      id: "Kayaknya nggak ada yang perlu diurusin lagi hari ini.",
      en: "Doesn't seem like there's anything else to deal with today.",
      ja: "今日はもう特にやることもなさそうだ。",
      ko: "오늘은 더 이상 처리할 일이 없는 것 같다.",
    },
  }),
];
