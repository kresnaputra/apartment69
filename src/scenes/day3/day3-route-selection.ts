import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  hide,
  jump,
  narrate,
  say,
  setFlag,
  show,
} from "@/scenes/scriptTypes";
import apartmentUrl from "@/background/apartment.png";
import universityUrl from "@/background/university.png";
 

export const day3BedroomScene: VisualNovelCommand[] = [
  bg(
    apartmentUrl,
    tx({
      id: "Apartment 69 Hari 3",
      en: "Apartment 69 Day 3",
      ja: "Apartment 69 - 3日目",
      ko: "Apartment 69 - 3일차",
    }),
  ),
  narrate(
    tx({
      id: "Pagi Hari 3 dimulai pelan. Arka meraih ponselnya sambil menata kepala yang masih berat, lalu membuka daftar kontak seperti kemarin.",
      en: "Day 3 starts quietly. Arka reaches for his phone while trying to wake up properly, then opens his contact list like he did yesterday.",
      ja: "3日目の朝は静かに始まった。アルカはまだ重い頭を整えながらスマホを手に取り、昨日と同じように連絡先を開く。",
      ko: "3일차 아침은 조용히 시작된다. 아르카는 아직 무거운 머리를 추스르며 휴대폰을 집어 들고, 어제처럼 연락처 목록을 연다.",
    }),
  ),
  show("arka-day3-bedroom", "arka", "neutral", {
    position: "left",
    enterFrom: "fade",
  }),
  say(
    "arka",
    "serious",
    tx({
      id: "Lihat dulu... pagi ini aku mulai dari mana?",
      en: "Let's see... where am I starting this morning?",
      ja: "さて…今朝はどこから始める？",
      ko: "어디 보자... 오늘 아침은 어디서 시작하지?",
    }),
  ),
  hide("arka-day3-bedroom"),
  jump("day3-maya-phone-call"),
];

export const day3AfterMayaPhoneScene: VisualNovelCommand[] = [
  jump("day3-route-selection"),
];

export const day3RouteSelectionScene: VisualNovelCommand[] = [
  bg(
    universityUrl,
    tx({
      id: "Area Parkir Kampus - 16:00",
      en: "Campus Parking Area - 16:00",
      ja: "大学の駐車エリア - 16:00",
      ko: "캠퍼스 주차 구역 - 16:00",
    }),
  ),
  show("arka-campus", "arka", "neutral", {
    position: "left",
    enterFrom: "fade",
  }),
  say(
    "arka",
    "serious",
    tx({
      id: "Urusan kampus akhirnya kelar. Tadi pagi Maya kelihatan kacau banget, tapi barusan dia ngechat kalau dia mau fokus belajar buat ujian, jadi untuk sekarang mending jangan aku ganggu dulu.",
      en: "Campus stuff's finally done. Maya looked really rough this morning, but she just texted me saying she's gonna focus on studying for her exam, so I should probably give her some space for now.",
      ja: "大学の用事もようやく終わった。今朝のマヤはかなり危うかったけど、さっき『試験勉強に集中する』って連絡が来たし、今はそっとしておいたほうがよさそうだ。",
      ko: "학교 일은 드디어 끝났다. 오늘 아침 마야 상태가 정말 안 좋아 보였지만, 방금 시험 공부에 집중하겠다고 메시지가 왔다. 지금은 조금 혼자 두는 게 맞겠다.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Tapi hari ini masih belum habis juga. Jadi... selanjutnya aku ke mana, atau bantu siapa ya?",
      en: "Still got a decent chunk of the day left, though. So... where do I head next, or who do I help out?",
      ja: "でも、今日はまだ時間が残ってる。さて…次はどこに行くか、誰か手伝うか。",
      ko: "그래도 오늘은 아직 시간이 남아 있다. 그럼... 다음엔 어디로 가지, 아니면 누구를 도와줄까.",
    }),
  ),
  narrate(
    tx({
      id: "(Arka membuka daftar kontaknya. Nama Maya tampak abu-abu karena dia sedang mode fokus belajar.)",
      en: "(Arka opens his contact list. Maya's name is greyed out because she's in full study mode.)",
      ja: "（アルカは連絡先リストを開く。マヤの名前は勉強モード中のためグレーアウトしている。）",
      ko: "(아르카는 연락처 목록을 연다. 마야의 이름은 공부 집중 모드라 비활성화되어 있다.)",
    }),
  ),

  hide("arka-campus"),
  say(
    "arka",
    "neutral",
    tx({
      id: "Mending aku pulang saja dan simpan sisanya buat besok.",
      en: "Might as well head home and save the rest for tomorrow.",
      ja: "帰ることにしよう。残りは明日に回すのが一番だ。",
      ko: "그냥 집에 가서 나머지는 내일로 미루는 게 낫겠다.",
    }),
  ),
  jump("day3-complete"),
];

export const day3Slot2ElenaScene: VisualNovelCommand[] = [
  setFlag("slot2Route", "elena"),
  setFlag("day3Slot2ElenaCompleted", true),
  say(
    "arka",
    "serious",
    tx({
      id: "Kalau begitu Elena. Sikapnya memang dingin dan susah didekati, tapi justru itu yang bikin aku penasaran sebenarnya dia kayak gimana.",
      en: "Elena it is. She acts all sharp and untouchable, but that just makes me want to see what's really going on with her.",
      ja: "じゃあエレナだ。あんなに鋭くて近寄りがたいのに、それが逆に本当はどんなやつなのか気になってしまう。",
      ko: "그럼 엘레나다. 날카롭고 다가가기 어려운 척하지만, 그래서 더 진짜 속마음이 궁금해진다.",
    }),
  ),
  jump("day3-slot2-complete"),
];

export const day3Slot2NadiaScene: VisualNovelCommand[] = [
  setFlag("slot2Route", "nadia"),
  setFlag("day3Slot2NadiaCompleted", true),
  say(
    "arka",
    "surprised",
    tx({
      id: "Nadia aja deh. Chat-nya tadi siang terasa ada urusan. Jujur, itu jauh lebih menarik daripada langsung pulang.",
      en: "Nadia it is. Her text earlier felt like there's something going on. Honestly, that sounds way better than heading straight home.",
      ja: "ナディアにするか。昼のメッセージは何かありそうな感じがした。正直、まっすぐ帰るよりずっと面白そうだ。",
      ko: "나디아로 가자. 오늘 오전에 온 메시지가 뭔가 있는 것 같았어. 솔직히 바로 집에 가는 것보다 훨씬 낫다.",
    }),
  ),
  jump("day3-nadia-night"),
];

export const day3Slot2SarahScene: VisualNovelCommand[] = [
  setFlag("slot2Route", "sarah"),
  setFlag("day3Slot2SarahCompleted", true),
  say(
    "arka",
    "neutral",
    tx({
      id: "Kalau begitu Sarah. Kalau ada bayaran dan sistem penthouse yang bermasalah, sepertinya aku memang perlu lihat sendiri kekacauannya kayak apa.",
      en: "Sarah it is. If there's money on the table and some broken penthouse system involved, I should probably see what kind of mess I'm walking into.",
      ja: "サラにするか。金になる話で、しかも壊れたペントハウスのシステムが絡んでるなら、どんな厄介ごとか自分で見に行くべきだろう。",
      ko: "그럼 사라다. 돈도 걸려 있고 펜트하우스 시스템까지 고장 났다면, 어떤 난장판인지 직접 가서 보는 게 맞다.",
    }),
  ),
  jump("day3-slot2-complete"),
];

export const day3Slot2CompleteScene: VisualNovelCommand[] = [
  jump("day3-route-selection"),
];
