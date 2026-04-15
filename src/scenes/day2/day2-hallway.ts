import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, hide, jump, narrate, say, show } from "@/scenes/scriptTypes";
import hallwayUrl from "@/background/hallway.png";

export const day2HallwayScene: VisualNovelCommand[] = [
  bg(hallwayUrl, tx({
    id: "Apartment 69 - Lorong Hari 2",
    en: "Apartment 69 - Day 2 Hallway",
    ja: "Apartment 69 - 2日目の廊下",
    ko: "Apartment 69 - 2일차 복도",
  })),
  narrate(
    tx({
      id: "Pintu terbuka pelan. Maya berdiri di sana dengan piyama kebesaran, rambut diikat asal-asalan, dan kacamata sedikit miring. Lingkar hitam di bawah matanya jelas kelihatan.",
      en: "The door slowly creaks open. Maya's standing there in an oversized pajama shirt, her hair tied up all messy, and her glasses sitting crooked on her face. The dark circles under her eyes are impossible to miss.",
      ja: "ドアがゆっくり軋みながら開く。そこに立っていたマヤは、ぶかぶかのパジャマ姿で、髪は適当にまとめられ、眼鏡も少しずれている。目の下のクマは隠しようがない。",
      ko: "문이 천천히 삐걱거리며 열린다. 거기 선 마야는 헐렁한 잠옷 차림에 머리는 대충 묶여 있고, 안경도 살짝 비뚤어져 있다. 눈 밑의 다크서클은 숨길 수가 없다.",
    }),
  ),
  show("arka-day2-hallway", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  show("maya-day2-hallway", "maya", "worried", {
    position: "center",
    enterFrom: "fade",
  }),
  say("maya", "sad", tx({
    id: "Arka...? Pagi-pagi begini ada apa?",
    en: "Arka...? What's up this early?",
    ja: "アルカ…？ こんな朝早くどうしたの？",
    ko: "아르카...? 이렇게 아침부터 무슨 일이야?",
  })),
  say(
    "arka",
    "gentle",
    tx({
      id: "Aku kebanyakan beli sarapan. Dan kamu kelihatan kayak orang yang belum tidur sama sekali.",
      en: "Bought too much breakfast. And you kinda look like someone who hasn't slept at all.",
      ja: "朝飯をちょっと買いすぎた。それに、君いかにも一睡もしてないって顔してる。",
      ko: "아침을 좀 많이 사버렸어. 그리고 너 완전 한숨도 못 잔 사람처럼 보이거든.",
    }),
  ),
  narrate(
    tx({
      id: "Maya menerima kantong itu, dan aroma makanannya saja sudah membuatnya menelan ludah.",
      en: "Maya takes the bag from him, and the smell alone makes her swallow hard.",
      ja: "マヤが袋を受け取ると、その匂いだけで思わず喉が鳴る。",
      ko: "마야가 봉투를 받아 드는 순간, 음식 냄새만으로도 침을 꿀꺽 삼킨다.",
    }),
  ),
  say(
    "maya",
    "worried",
    tx({
      id: "Iya... memang belum. Aku ada tugas jurnal anatomi yang harus dikumpul sebelum siang. Makasih... aku sampai nggak ingat terakhir makan kapan.",
      en: "Yeah... I really haven't. I've got this anatomy journal assignment due by noon. Thanks... I legit don't even remember the last time I ate.",
      ja: "うん…本当に寝てない。お昼までに解剖学のレポート出さなきゃいけなくて。ありがと…最後にちゃんと食べたのいつだったかも覚えてない。",
      ko: "응... 진짜 못 잤어. 정오 전까지 해부학 저널 과제를 내야 하거든. 고마워... 마지막으로 제대로 먹은 게 언제였는지도 기억이 안 나.",
    }),
  ),
  say("arka", "serious", tx({
    id: "Makan selagi masih hangat. Jangan terlalu maksa diri.",
    en: "Eat while it's still warm. Don't push yourself too hard.",
    ja: "温かいうちに食べなよ。あんまり無理するな。",
    ko: "따뜻할 때 먹어. 너무 무리하지 말고.",
  })),
  narrate(
    tx({
      id: "Dari dalam kamar Maya, kipas laptopnya meraung seperti mesin yang dipaksa kerja kelewat batas.",
      en: "From inside Maya's room, the laptop fan is screaming like a machine that's been running way past its limit.",
      ja: "マヤの部屋の奥から、限界まで酷使された機械みたいなノートPCのファン音が響いてくる。",
      ko: "마야의 방 안쪽에서는 한계를 넘겨 버틴 기계처럼 노트북 팬이 요란하게 울어대고 있었다.",
    }),
  ),
  say("arka", "serious", tx({
    id: "Itu laptopmu? Suaranya kayak mau meledak.",
    en: "Is that your laptop? Sounds like it's about to explode.",
    ja: "あれ君のノートPC？ 今にも爆発しそうな音してるけど。",
    ko: "저거 네 노트북이야? 당장 터질 것 같은 소리가 나는데.",
  })),
  say(
    "maya",
    "worried",
    tx({
      id: "(menghela napas panjang) Iya... dari semalam lemot banget. Buka file Word aja bisa lima menit. Aku takut file tugasku malah rusak.",
      en: "(Long sigh) Yeah... it's been super slow since last night. Opening a Word doc takes five minutes. I'm scared my assignment file is gonna get corrupted.",
      ja: "（長いため息）うん…昨夜からずっと重くて。Word開くだけで五分かかるし、課題のファイル壊れるんじゃないかって怖い。",
      ko: "(길게 한숨 쉬며) 응... 어젯밤부터 엄청 느려. 워드 파일 하나 여는 데도 5분은 걸려. 과제 파일까지 날아갈까 봐 무서워.",
    }),
  ),
  say("arka", "gentle", tx({
    id: "Biar aku lihat sebentar.",
    en: "Let me take a quick look.",
    ja: "ちょっと見せて。",
    ko: "잠깐 내가 좀 볼게.",
  })),
  hide("maya-day2-hallway"),
  hide("arka-day2-hallway"),
  jump("day2-maya-bedroom"),
];
