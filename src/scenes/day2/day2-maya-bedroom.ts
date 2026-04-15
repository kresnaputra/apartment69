import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, hide, jump, minigame, narrate, say, show } from "@/scenes/scriptTypes";
import mayaBedroom from "@/background/maya-bedroom.png";

export const day2MayaBedroomScene: VisualNovelCommand[] = [
  bg(mayaBedroom, tx({
    id: "Apartment 69 - Kamar Maya",
    en: "Apartment 69 - Maya's Bedroom",
    ja: "Apartment 69 - マヤの部屋",
    ko: "Apartment 69 - 마야의 방",
  })),
  show("arka-day2-bedroom", "arka", "neutral", {
    position: "left",
    enterFrom: "fade",
  }),
  show("maya-day2-bedroom", "maya", "worried", {
    position: "center",
    enterFrom: "fade",
  }),
  narrate(
    tx({
      id: "Layar laptop Maya berkedip-kedip, kipasnya meraung. Arka membuka Task Manager — puluhan proses sampah memenuhi memori.",
      en: "Maya's laptop screen flickers, the fan roaring. Arka opens Task Manager — dozens of junk processes clogging up the memory.",
      ja: "マヤのノートPC画面はちらつき、ファンは唸りっぱなしだ。アルカがタスクマネージャーを開くと、メモリを食い荒らす不要プロセスがずらりと並んでいた。",
      ko: "마야의 노트북 화면은 깜빡이고 팬은 요란하게 돌아간다. 아르카가 작업 관리자를 열자 메모리를 잡아먹는 잡 프로세스들이 줄줄이 뜬다.",
    }),
  ),
  minigame("laptop-cleanup"),
  narrate(
    tx({
      id: "Arka menekan tombol Enter. Suara kipas laptop perlahan mereda.",
      en: "Arka presses the Enter key. The sound of the laptop fan slowly dies down.",
      ja: "アルカがEnterキーを押すと、ノートPCのファン音が少しずつ静かになっていく。",
      ko: "아르카가 엔터 키를 누르자 노트북 팬 소리가 천천히 잦아든다.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Selesai. Cuma sampah sistem yang numpuk. Sekarang harusnya udah lancar buat ngetik.",
      en: "Done. It was just a bunch of system junk piling up. It should be running fine for typing now.",
      ja: "終わった。ただのシステムのゴミが溜まってただけ。もう普通に入力できるはず。",
      ko: "됐어. 시스템 찌꺼기가 너무 쌓였던 거야. 이제 타이핑 정도는 문제없이 될 거야.",
    }),
  ),
  narrate(
    tx({
      id: "Maya mendekat dan melihat layar laptopnya yang kembali normal. Matanya langsung berbinar.",
      en: "Maya steps closer and looks at the laptop screen, now back to normal. Her eyes light up.",
      ja: "マヤが身を乗り出して元通りになった画面を見る。ぱっと目が明るくなった。",
      ko: "마야가 가까이 다가와 다시 정상으로 돌아온 화면을 본다. 눈빛이 금세 밝아진다.",
    }),
  ),
  say(
    "maya",
    "surprised",
    tx({
      id: "Wah... beneran lancar lagi. Dari semalam aku hampir nangis gara-gara ini. Makasih banget, Arka.",
      en: "Whoa... it really is smooth again. I was this close to crying over this thing since last night. Thanks so much, Arka.",
      ja: "わ…ほんとに動く。昨夜からこれのせいで泣きそうだったんだよ。ほんとにありがと、アルカ。",
      ko: "와... 진짜 다시 잘 돌아간다. 어젯밤부터 이것 때문에 울 뻔했어. 정말 고마워, 아르카.",
    }),
  ),
  narrate(tx({
    id: "Arka berdiri dari kursi.",
    en: "Arka stands up from the chair.",
    ja: "アルカは椅子から立ち上がる。",
    ko: "아르카는 의자에서 일어난다.",
  })),
  say(
    "arka",
    "gentle",
    tx({
      id: "Sama-sama. Sekarang fokus selesaikan jurnalmu dulu, habis itu langsung tidur. Jangan begadang lagi.",
      en: "You're welcome. Just focus on finishing your journal now, then go straight to sleep. No more staying up all night.",
      ja: "どういたしまして。今はそのレポートを終わらせることだけ考えて、そのあとすぐ寝ろ。もう徹夜はなし。",
      ko: "천만에. 이제 저널부터 마저 끝내고 바로 자. 더는 밤새지 말고.",
    }),
  ),
  say(
    "maya",
    "calm",
    tx({
      id: "Iya, aku janji habis ini bakal tidur.",
      en: "Yeah, I promise I'll sleep after this.",
      ja: "うん、終わったらちゃんと寝るって約束する。",
      ko: "응, 이거 끝나면 꼭 잘게.",
    }),
  ),
  hide("arka-day2-bedroom"),
  hide("maya-day2-bedroom"),
  jump("day2-free-time"),
];
