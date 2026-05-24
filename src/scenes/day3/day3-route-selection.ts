import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  hide,
  jump,
  jumpIf,
  minigame,
  narrate,
  say,
  setFlag,
  show,
} from "@/scenes/scriptTypes";
import apartmentUrl from "@/background/apartment.png";
import universityUrl from "@/background/university.png";

export const day3BedroomScene: VisualNovelCommand[] = [
  bg(apartmentUrl, tx({
    id: "Apartment 69 Hari 3",
    en: "Apartment 69 Day 3",
    ja: "Apartment 69 - 3日目",
    ko: "Apartment 69 - 3일차",
  })),
  show("arka-day3-bedroom", "arka", "neutral", {
    position: "left",
    enterFrom: "fade",
  }),
  narrate(
    tx({
      id: "Pagi Hari 3 dimulai pelan. Arka meraih ponselnya sambil menata kepala yang masih berat, lalu membuka daftar kontak seperti kemarin.",
      en: "Day 3 starts quietly. Arka reaches for his phone while trying to wake up properly, then opens his contact list like he did yesterday.",
      ja: "3日目の朝は静かに始まった。アルカはまだ重い頭を整えながらスマホを手に取り、昨日と同じように連絡先を開く。",
      ko: "3일차 아침은 조용히 시작된다. 아르카는 아직 무거운 머리를 추스르며 휴대폰을 집어 들고, 어제처럼 연락처 목록을 연다.",
    }),
  ),
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
  minigame("smartphone-contacts", {
    title: tx({
      id: "Pilih Tujuan Pagi Ini",
      en: "Choose This Morning's Stop",
      ja: "今朝の行き先を選ぶ",
      ko: "오늘 아침 목적지 선택",
    }),
    subtitle: tx({
      id: "Kalau masih ada yang mengganjal sejak kemarin, pagi ini saatnya Arka menentukan mau mulai dari siapa.",
      en: "If something from yesterday is still unresolved, this morning is when Arka decides who to start with.",
      ja: "昨日から引っかかっていることがあるなら、今朝こそ誰から向き合うか決める時間だ。",
      ko: "어제부터 마음에 걸리는 일이 남아 있다면, 오늘 아침이야말로 누구부터 볼지 정할 때다.",
    }),
    disabledContacts: ["elena", "nadia", "sara", "sleep"],
    conditionalEnabledContacts: {
      elena: "day2ElenaCompleted",
    },
    contactOverrides: {
      maya: {
        next: "day3-maya-phone-call",
        blurb: tx({
          id: "Sejak kemarin kondisi Maya kelihatan rapuh. Kalau ada yang aneh dari kamarnya pagi ini, aku nggak enak kalau pura-pura nggak sadar.",
          en: "Maya has looked fragile since yesterday. If something feels off in her room this morning, I can't just ignore it.",
          ja: "昨日からマヤの様子は危うかった。今朝あの部屋で何か異変があるなら、見て見ぬふりはできない。",
          ko: "어제부터 마야 상태는 위태로워 보였다. 오늘 아침 그 방에서 뭔가 이상하다면 그냥 못 본 척할 수는 없다.",
        }),
      },
      elena: {
        next: "day3-elena-morning",
        blurb: tx({
          id: "Setelah kejadian wastafel semalam, rasanya percakapan dengan Elena belum benar-benar selesai.",
          en: "After everything that happened with the sink last night, it feels like things with Elena still aren't fully settled.",
          ja: "昨夜の洗面台の件のあとだ。エレナとの話は、まだ完全には終わっていない気がする。",
          ko: "어젯밤 세면대 사건 이후로, 엘레나와의 일은 아직 완전히 끝난 것 같지 않다.",
        }),
      },
      nadia: {
        blurb: tx({
          id: "Nadia belum muncul pagi-pagi begini.",
          en: "Nadia hasn't surfaced this early in the morning.",
          ja: "こんな朝早くからナディアが動いている気はしない。",
          ko: "이렇게 이른 아침부터 나디아가 움직이고 있을 것 같진 않다.",
        }),
      },
      sara: {
        name: tx({
          id: "Sarah",
          en: "Sarah",
          ja: "サラ",
          ko: "사라",
        }),
        blurb: tx({
          id: "Sarah jelas bukan tipe yang dihubungi pagi-pagi tanpa alasan kuat.",
          en: "Sarah definitely isn't the type to call first thing in the morning without a very good reason.",
          ja: "サラは、よほどの理由もなく朝一番に連絡する相手じゃない。",
          ko: "사라는 아주 확실한 이유 없이 아침 일찍 먼저 연락할 타입은 아니다.",
        }),
      },
    },
  }),
];

export const day3AfterMayaPhoneScene: VisualNovelCommand[] = [
  jumpIf("day3Slot2ElenaCompleted", "day3-route-selection"),
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
  say(
    "arka",
    "serious",
    tx({
      id: "Sebelum berangkat ke kampus... mungkin masih ada satu hal lagi yang perlu kupastikan.",
      en: "Before I head to campus... there might still be one more thing I need to clear up.",
      ja: "大学へ行く前に…まだ一つ、確認しておきたいことがあるかもしれない。",
      ko: "학교로 가기 전에... 아직 하나 더 확인해야 할 일이 있을지도 모른다.",
    }),
  ),
  hide("arka-day3-after-maya"),
  minigame("smartphone-contacts", {
    showSleepOption: true,
    sleepOptionNext: "day3-route-selection",
    disabledContacts: ["maya", "nadia", "sara"],
    conditionalDisabledContacts: {
      elena: "day3Slot2ElenaCompleted",
    },
    title: tx({
      id: "Sebelum ke Kampus",
      en: "Before Heading to Campus",
      ja: "大学へ行く前に",
      ko: "캠퍼스로 가기 전에",
    }),
    subtitle: tx({
      id: "Maya butuh ruang untuk fokus. Kalau masih ada yang ingin kamu selesaikan dengan Elena, ini kesempatan terakhir sebelum hari lanjut.",
      en: "Maya needs space to focus. If there's still something you want to settle with Elena, this is the last chance before the day moves on.",
      ja: "マヤには集中する時間が必要だ。エレナとまだ片づけたいことがあるなら、一日が先へ進む前の最後の機会だ。",
      ko: "마야에게는 집중할 시간이 필요하다. 엘레나와 아직 정리할 일이 있다면, 하루가 더 진행되기 전 마지막 기회다.",
    }),
    contactOverrides: {
      elena: {
        next: "day3-elena-morning",
        disabled: false,
      },
      sleep: {
        name: tx({
          id: "Lanjut ke Kampus",
          en: "Continue to Campus",
          ja: "大学へ向かう",
          ko: "캠퍼스로 이동",
        }),
        blurb: tx({
          id: "Akhiri urusan pagi ini dan lanjutkan hari ke area kampus.",
          en: "Wrap up the morning and continue the day at campus.",
          ja: "朝の用事はここまでにして、大学で一日を続ける。",
          ko: "아침 일을 여기서 마무리하고, 캠퍼스에서 하루를 이어 간다.",
        }),
      },
    },
  }),
];

export const day3RouteSelectionScene: VisualNovelCommand[] = [
  bg(universityUrl, tx({
    id: "Area Parkir Kampus - 16:00",
    en: "Campus Parking Area - 16:00",
    ja: "大学の駐車エリア - 16:00",
    ko: "캠퍼스 주차 구역 - 16:00",
  })),
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
  minigame("smartphone-contacts", {
    showSleepOption: true,
    disabledContacts: ["maya", "elena", "nadia", "sara"],
    title: tx({
      id: "Pilih rute berikutnya",
      en: "Pick the next route",
      ja: "次のルートを選ぶ",
      ko: "다음 루트 선택",
    }),
    subtitle: tx({
      id: "Slot 2 · Sore menuju malam. Untuk hari ini, nggak ada rute lain yang perlu dijalankan di kampus.",
      en: "Slot 2 · Late afternoon into night. There aren't any other routes to take at campus today.",
      ja: "スロット2・夕方から夜。今日はキャンパスで進める別ルートはもうない。",
      ko: "슬롯 2 · 늦은 오후부터 밤. 오늘 캠퍼스에서 진행할 다른 루트는 더 없다.",
    }),
    contactOverrides: {
      maya: {
        blurb: tx({
          id: "Dia harus fokus penuh buat ujian. Untuk hari ini mending biarin dia sendiri dulu.",
          en: "She needs to lock in for her exams. Better leave her alone until tomorrow.",
          ja: "試験勉強に集中しないといけない。今日はそっとしておいたほうがいい。",
          ko: "시험 공부에 집중해야 한다. 오늘은 그냥 혼자 두는 게 낫다.",
        }),
      },
      elena: {
        blurb: tx({
          id: "Bukan sekarang. Setelah pindah ke kampus, urusan dengan Elena untuk hari ini sudah selesai.",
          en: "Not now. Once the day moves to campus, Elena's route for today is already done.",
          ja: "今は違う。キャンパスへ移った時点で、今日のエレナ関連はもう終わっている。",
          ko: "지금은 아니다. 캠퍼스로 넘어온 시점에서 오늘 엘레나와의 일은 이미 끝났다.",
        }),
      },
      nadia: {
        blurb: tx({
          id: "Nadia tidak jadi route aktif di fase kampus hari ini.",
          en: "Nadia isn't an active route in the campus phase today.",
          ja: "今日のキャンパスパートでナディアのルートは進まない。",
          ko: "오늘 캠퍼스 파트에서는 나디아 루트가 진행되지 않는다.",
        }),
      },
      sara: {
        name: tx({
          id: "Sarah",
          en: "Sarah",
          ja: "サラ",
          ko: "사라",
        }),
        blurb: tx({
          id: "Sarah juga tidak punya route lanjutan setelah perpindahan ke kampus hari ini.",
          en: "Sarah doesn't have a follow-up route after the move to campus today either.",
          ja: "サラも、今日キャンパスへ移ってから先のルートはない。",
          ko: "사라도 오늘 캠퍼스로 넘어온 뒤에는 추가 루트가 없다.",
        }),
      },
      sleep: {
        name: tx({
          id: "Lewati Hari",
          en: "Skip Day",
          ja: "今日はもう終わる",
          ko: "오늘은 여기까지",
        }),
        blurb: tx({
          id: "Sudahi hari ini, pulang ke unit, dan simpan sisanya buat besok.",
          en: "Call it a day, head home, and save the rest for tomorrow.",
          ja: "今日はここまでにして部屋へ帰り、続きは明日に回す。",
          ko: "오늘은 이쯤에서 끝내고 집으로 돌아가, 나머지는 내일로 미룬다.",
        }),
        next: "day3-complete",
        disabled: false,
      },
    },
  }),
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
      id: "Nadia aja deh. Gratis kopi, dan jelas suasananya nggak bakal biasa-biasa aja. Jujur, itu jauh lebih menarik daripada langsung pulang.",
      en: "Nadia wins. Free coffee, zero chance of things staying normal, and honestly? That sounds way better than heading straight home.",
      ja: "ナディアにするか。無料のコーヒーに、普通じゃ終わらなそうな予感。正直、まっすぐ帰るよりずっと面白そうだ。",
      ko: "나디아로 가자. 무료 커피에, 평범하게 끝날 가능성은 제로다. 솔직히 바로 집에 가는 것보다 훨씬 낫다.",
    }),
  ),
  jump("day3-slot2-complete"),
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
