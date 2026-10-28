import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  hide,
  jump,
  narrate,
  playBgm,
  say,
  show,
} from "@/scenes/scriptTypes";
import apartmentUrl from "@/background/apartment.png";
import universityUrl from "@/background/university.png";
import day3Bgm from "@/music/day3.mp3";
 

export const day3BedroomScene: VisualNovelCommand[] = [
  playBgm(day3Bgm),
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
  playBgm(day3Bgm),
  bg(apartmentUrl, tx({
    id: "Apartment 69 Hari 3",
    en: "Apartment 69 Day 3",
    ja: "Apartment 69 - 3日目",
    ko: "Apartment 69 - 3일차",
  })),
  show("arka-day3-after-maya", "arka", "neutral", {
    position: "left",
    enterFrom: "fade",
  }),
  say("arka", "serious", tx({
    id: "Sebelum berangkat ke kampus... mungkin masih ada satu hal lagi yang perlu kupastikan.",
    en: "Before I head to campus... there might still be one more thing I need to clear up.",
    ja: "大学へ行く前に…まだ一つ、確認しておきたいことがあるかもしれない。",
    ko: "학교로 가기 전에... 아직 하나 더 확인해야 할 일이 있을지도 모른다.",
  })),
  hide("arka-day3-after-maya"),
  jump("day3-route-selection"),
];

export const day3RouteSelectionScene: VisualNovelCommand[] = [
  playBgm(day3Bgm),
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
  jump("day3-complete"),
];
