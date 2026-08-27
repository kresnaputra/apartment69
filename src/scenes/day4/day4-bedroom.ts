import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, hide, minigame, narrate, say, show } from "@/scenes/scriptTypes";
import apartmentUrl from "@/background/apartment.png";

export const day4BedroomScene: VisualNovelCommand[] = [
  bg(apartmentUrl, tx({
    id: "Apartment 69 Hari 4",
    en: "Apartment 69 Day 4",
    ja: "Apartment 69 - 4日目",
    ko: "Apartment 69 - 4일차",
  })),
  show("arka-day4-bedroom-phone", "arka", "serious", {
    position: "left",
    enterFrom: "fade",
  }),
  narrate(
    tx({
      id: "Siang Hari 4 berjalan pelan. Sebelum keluar, Arka lebih dulu meraih ponselnya untuk menentukan siapa yang perlu dia cek hari ini.",
      en: "Day 4 moves into the afternoon quietly. Before heading out, Arka reaches for his phone first to decide who he needs to check on today.",
      ja: "4日目の昼は静かに流れていた。出かける前に、アルカはまずスマホを手に取り、今日は誰の様子を見るべきかを決める。",
      ko: "4일차 오후는 조용하게 흘렀다. 밖으로 나가기 전, 아르카는 먼저 휴대폰을 들어 오늘 누구를 확인해야 할지 정한다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Lihat dulu... siang ini aku mulai dari siapa?",
      en: "Let's see... who am I starting with this afternoon?",
      ja: "さて…今日の昼は誰から向かう？",
      ko: "어디 보자... 오늘 오후는 누구부터 볼까?",
    }),
  ),
  hide("arka-day4-bedroom-phone"),
  minigame("smartphone-contacts", {
    title: tx({
      id: "Pilih Tujuan Siang Ini",
      en: "Choose This Afternoon's Stop",
      ja: "今日の昼の行き先を選ぶ",
      ko: "오늘 오후 목적지 선택",
    }),
    subtitle: tx({
      id: "Hari masih panjang. Arka perlu memutuskan siapa yang paling perlu dia datangi lebih dulu.",
      en: "The day is still long. Arka needs to decide who he should check on first.",
      ja: "まだ日は長い。まず誰のところへ向かうべきか、アルカが決める番だ。",
      ko: "하루는 아직 길다. 아르카는 먼저 누구를 찾아가야 할지 정해야 한다.",
    }),
    disabledContacts: ["sara", "sleep"],
    conditionalDisabledContacts: {
      elena: "day4ElenaCompleted",
      nadia: "day4NadiaCompleted",
    },
    conditionalEnabledContacts: {
      nadia: "day3NadiaCompleted",
    },
    contactOverrides: {
      maya: {
        next: "day4-maya-collapse",
        blurb: tx({
          id: "Maya kelihatan makin rapuh sejak kemarin. Kalau dia benar-benar memaksakan diri hari ini, aku nggak bisa tinggal diam.",
          en: "Maya has looked even more fragile since yesterday. If she's forcing herself through today, I can't just ignore it.",
          ja: "昨日からマヤはさらに危うく見える。今日も無理をしているなら、見過ごすわけにはいかない。",
          ko: "어제부터 마야는 더 위태로워 보였다. 오늘도 억지로 버티고 있다면 그냥 넘길 수 없다.",
        }),
      },
      elena: {
        next: "day4-elena-door",
        blurb: tx({
          id: "Setelah beberapa kejadian terakhir, rasanya aku masih perlu cek keadaan Elena sekali lagi.",
          en: "After everything that's happened lately, it feels like I should check on Elena one more time.",
          ja: "ここ数日のことを考えると、エレナの様子ももう一度見ておいたほうがいい気がする。",
          ko: "최근 있었던 일들을 생각하면, 엘레나 상태도 한 번 더 확인해두는 게 맞는 것 같다.",
        }),
      },
      nadia: {
        next: "day4-nadia-night",
        blurb: tx({
          id: "Nadia bilang konten malam ini lebih panas. Kalau aku setuju, aku hanya di belakang kamera.",
          en: "Nadia said tonight's content is hotter. If I agree, I stay behind the camera.",
          ja: "ナディアは今夜のコンテンツがもっと熱いと言っていた。引き受けるなら、カメラの後ろだけだ。",
          ko: "나디아가 오늘 밤 콘텐츠가 더 뜨겁다고 했다. 승낙하면 나는 카메라 뒤에만 있으면 된다.",
        }),
      },
    },
  }),
];

export const day4AfterRoutePhoneScene: VisualNovelCommand[] = [
  bg(apartmentUrl, tx({
    id: "Apartment 69 Hari 4",
    en: "Apartment 69 Day 4",
    ja: "Apartment 69 - 4日目",
    ko: "Apartment 69 - 4일차",
  })),
  minigame("smartphone-contacts", {
    showSleepOption: true,
    sleepOptionNext: "day4-complate",
    disabledContacts: ["maya", "elena", "nadia", "sara"],
    title: tx({
      id: "Akhiri Hari 4",
      en: "Wrap Up Day 4",
      ja: "4日目を締めくくる",
      ko: "4일차 마무리",
    }),
    subtitle: tx({
      id: "Hari ini Arka hanya sempat memilih satu rute. Sisanya bisa menunggu besok.",
      en: "Today, Arka only had time to choose one route. The rest can wait until tomorrow.",
      ja: "今日は一つのルートを選ぶだけで終わった。残りは明日に回せばいい。",
      ko: "오늘은 한 루트만 선택할 수 있었다. 나머지는 내일로 미뤄도 된다.",
    }),
    contactOverrides: {
      maya: {
        blurb: tx({
          id: "Pilihan untuk hari ini sudah dipakai.",
          en: "Today's route choice has already been used.",
          ja: "今日のルート選択はもう使い切っている。",
          ko: "오늘의 루트 선택은 이미 사용했다.",
        }),
      },
      elena: {
        blurb: tx({
          id: "Pilihan untuk hari ini sudah dipakai.",
          en: "Today's route choice has already been used.",
          ja: "今日のルート選択はもう使い切っている。",
          ko: "오늘의 루트 선택은 이미 사용했다.",
        }),
      },
      nadia: {
        blurb: tx({
          id: "Hari ini tidak ada waktu untuk rute lain.",
          en: "There isn't time for another route today.",
          ja: "今日は他のルートまで進める余裕がない。",
          ko: "오늘은 다른 루트까지 진행할 시간이 없다.",
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
          id: "Hari ini tidak ada waktu untuk rute lain.",
          en: "There isn't time for another route today.",
          ja: "今日は他のルートまで進める余裕がない。",
          ko: "오늘은 다른 루트까지 진행할 시간이 없다.",
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
          id: "Pulang ke unit dan lanjutkan sisanya besok.",
          en: "Head back to your unit and continue the rest tomorrow.",
          ja: "部屋へ戻って、残りは明日に回そう。",
          ko: "방으로 돌아가고, 나머지는 내일 이어가자.",
        }),
      },
    },
  }),
];
