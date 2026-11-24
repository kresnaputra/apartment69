import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  centeredText,
  clearFlag,
  hide,
  jump,
  jumpIf,
  narrate,
  playBgm,
  playSfx,
  say,
  scene,
  setFlag,
  show,
} from "@/scenes/scriptTypes";
import bedroomUrl from "@/background/bedroom.png";
import day6SaraBgm from "@/music/day3-sarah.mp3";
import phoneSound from "@/sfx/phone.mp3";

export const day6SaraStartScene: VisualNovelCommand[] = [
  clearFlag("saraRouteClosed"),
  playBgm(day6SaraBgm),
  bg(bedroomUrl, tx({
    id: "Apartment 69 - Unit 302, Pagi",
    en: "Apartment 69 - Unit 302, Morning",
    ja: "Apartment 69 - 302号室、朝",
    ko: "Apartment 69 - 302호, 아침",
  })),
  show("arka-day6-sara", "arka", "neutral", { position: "left", enterFrom: "fade" }),
  playSfx(phoneSound),
  jumpIf("day5SaraTracesCleared", "day6-sara-good-path", {
    value: true,
    elseTarget: "day6-sara-bad-path",
  }),
];

const callEnded = narrate(tx({
  id: "Telepon terputus.",
  en: "The call ends.",
  ja: "電話が切れた。",
  ko: "전화가 끊겼다.",
}));

export const day6SaraGoodPathScene: VisualNovelCommand[] = [
  narrate(tx({
    id: "Pagi hari. Arka menerima telepon dari Sarah. Suaranya rendah, sedikit tegang, tapi masih terkendali.",
    en: "In the morning, Arka gets a call from Sarah. Her voice is low and a little tense, but still steady.",
    ja: "朝、アルカにサラから電話がかかってきた。声は低く、少し緊張していたが、まだ落ち着いていた。",
    ko: "아침에 아르카는 사라의 전화를 받았다. 목소리는 낮고 조금 긴장돼 있었지만, 아직 침착했다.",
  })),
  say("sara", "neutral", tx({
    id: "Arka. Dia sudah pulang.",
    en: "Arka. He's back.",
    ja: "アルカ。夫が帰ってきたわ。",
    ko: "아르카. 그 사람이 돌아왔어.",
  })),
  say("arka", "surprised", tx({
    id: "Suamimu?",
    en: "Your husband?",
    ja: "ご主人ですか？",
    ko: "남편분이요?",
  })),
  say("sara", "neutral", tx({
    id: "Ya. Tadi pagi tiba-tiba. Sekarang dia ada di penthouse.",
    en: "Yes. He showed up out of nowhere this morning. He's in the penthouse now.",
    ja: "ええ。今朝、急に帰ってきたの。今はペントハウスにいるわ。",
    ko: "응. 오늘 아침에 갑자기 왔어. 지금은 펜트하우스에 있어.",
  })),
  narrate(tx({
    id: "Hening sejenak di seberang telepon.",
    en: "The other end goes quiet for a moment.",
    ja: "電話の向こうが一瞬、静かになった。",
    ko: "전화기 너머가 잠시 조용해졌다.",
  })),
  say("sara", "neutral", tx({
    id: "Aku sempat panik. Tapi aku mengikuti saranmu kemarin dan menghapus semua jejak. Tidak ada notifikasi aneh atau riwayat lokasi yang mencurigakan. Dia tidak menanyakan apa-apa.",
    en: "I panicked at first. But I took your advice yesterday and cleared everything. No strange notifications, no suspicious location history. He didn't ask me a thing.",
    ja: "最初は焦ったわ。でも昨日、あなたの言うとおり痕跡は全部消したから。変な通知も、怪しい位置履歴もなかった。何も聞かれなかったわ。",
    ko: "처음엔 당황했어. 그래도 어제 네 말대로 흔적을 다 지웠잖아. 이상한 알림도 수상한 위치 기록도 없었어. 아무것도 묻지 않더라.",
  })),
  say("arka", "serious", tx({
    id: "Jadi dia tidak curiga?",
    en: "So he doesn't suspect anything?",
    ja: "じゃあ、疑われていないんですね？",
    ko: "그럼 아무것도 의심하지 않는 거예요?",
  })),
  say("sara", "smile", tx({
    id: "Tidak. Sama sekali. Dia bahkan bilang aku terlihat lebih tenang dari biasanya.",
    en: "No. Not at all. He even said I seemed calmer than usual.",
    ja: "ええ、まったく。むしろ、いつもより落ち着いて見えるって言われたわ。",
    ko: "응. 전혀. 오히려 평소보다 차분해 보인다고 했어.",
  })),
  say("arka", "neutral", tx({
    id: "Kamu di mana sekarang?",
    en: "Where are you now?",
    ja: "今どこにいるんですか？",
    ko: "지금 어디예요?",
  })),
  say("sara", "neutral", tx({
    id: "Baru sampai di lobi. Aku akan naik sebentar lagi. Kalau semuanya benar-benar aman… aku akan mengirim pesan.",
    en: "I just got to the lobby. I'll head upstairs in a minute. If everything really is okay... I'll text you.",
    ja: "今ロビーに着いたところ。もうすぐ上に行くわ。本当に何もなければ……メッセージを送る。",
    ko: "방금 로비에 도착했어. 곧 올라갈 거야. 정말 괜찮으면… 문자할게.",
  })),
  say("arka", "gentle", tx({
    id: "Oke. Aku tunggu.",
    en: "Okay. I'll wait.",
    ja: "わかりました。待ってます。",
    ko: "알겠어요. 기다릴게요.",
  })),
  callEnded,
  setFlag("day6SaraCompleted", true),
  setFlag("day6SaraEnding", "good"),
  hide("arka-day6-sara"),
  scene("#000000", "", 1000),
  centeredText(tx({
    id: "HARI 6 SELESAI",
    en: "DAY 6 COMPLETE",
    ja: "6日目 終了",
    ko: "6일차 완료",
  }), { size: "hero" }),
  jump("day7-sara-good-ending"),
];

export const day6SaraBadPathScene: VisualNovelCommand[] = [
  narrate(tx({
    id: "Pagi hari. Arka menerima telepon dari Sarah. Suaranya panik dan pecah.",
    en: "In the morning, Arka gets a call from Sarah. Her voice cracks with panic.",
    ja: "朝、アルカにサラから電話がかかってきた。彼女は取り乱し、声が上ずっていた。",
    ko: "아침에 아르카는 사라의 전화를 받았다. 다급한 목소리가 갈라졌다.",
  })),
  say("sara", "sad", tx({
    id: "Arka… dia pulang. Dan dia… dia melihat sesuatu.",
    en: "Arka... he's back. And he... he saw something.",
    ja: "アルカ……夫が帰ってきたの。それで……何か見られた。",
    ko: "아르카… 그 사람이 돌아왔어. 그런데… 뭔가 봤어.",
  })),
  say("arka", "surprised", tx({
    id: "Maksudmu?",
    en: "What do you mean?",
    ja: "どういうことですか？",
    ko: "무슨 말이에요?",
  })),
  say("sara", "sad", tx({
    id: "Riwayat lokasi. Pesan. Dia belum bilang apa-apa, tapi caranya menatapku… dia tahu ada yang aneh.",
    en: "My location history. The messages. He hasn't said anything, but the way he looked at me... he knows something's off.",
    ja: "位置履歴。メッセージ。まだ何も言われてない。でも私を見る目が……何かおかしいって気づいてる。",
    ko: "위치 기록. 메시지. 아직 아무 말도 안 했지만, 나를 보는 눈빛이… 뭔가 이상하다는 걸 알아챘어.",
  })),
  say("arka", "serious", tx({
    id: "Sarah, dengarkan—",
    en: "Sarah, listen—",
    ja: "サラさん、聞いて——",
    ko: "사라, 들어 봐요—",
  })),
  say("arka", "serious", tx({
    id: "Kita bisa—",
    en: "We can—",
    ja: "僕たちなら——",
    ko: "우리라면—",
  })),
  say("sara", "sad", tx({
    id: "Tidak ada ‘kita’.",
    en: "There is no 'we.'",
    ja: "「僕たち」なんていないわ。",
    ko: "‘우리’는 없어.",
  })),
  narrate(tx({
    id: "Suaranya datar, tapi getarannya tidak bisa disembunyikan.",
    en: "Her voice is flat, but she can't hide the tremor in it.",
    ja: "声は平坦だったが、かすかな震えまでは隠せなかった。",
    ko: "목소리는 담담했지만, 떨림까지 숨길 수는 없었다.",
  })),
  say("sara", "sad", tx({
    id: "Aku sudah memilih. Bukan karena aku tidak menginginkanmu. Tapi karena aku tidak punya keberanian untuk kehilangan semuanya.",
    en: "I've made my choice. Not because I don't want you. Because I don't have the courage to lose everything.",
    ja: "もう決めたわ。あなたを望んでいないからじゃない。すべてを失う勇気が、私にはないからよ。",
    ko: "이미 선택했어. 널 원하지 않아서가 아니야. 모든 걸 잃을 용기가 없어서 그래.",
  })),
  narrate(tx({
    id: "Di seberang telepon, napas Sarah bergetar. Dalam suaranya, Arka mendengar senyum yang pahit.",
    en: "Sarah's breath shakes on the other end of the line. Arka hears a bitter smile in her voice.",
    ja: "電話の向こうでサラの息が震えた。その声に、アルカは苦い笑みを感じ取った。",
    ko: "전화기 너머로 사라의 숨이 떨렸다. 아르카는 목소리에서 씁쓸한 미소를 느꼈다.",
  })),
  say("sara", "sad", tx({
    id: "Kemarin di hotel… itu nyata. Aku tidak berbohong saat bilang aku tidak menyesal. Tapi hari ini… aku harus menyesalinya.",
    en: "Yesterday at the hotel... that was real. I wasn't lying when I said I didn't regret it. But today... I have to.",
    ja: "昨日のホテルでのことは……本当だった。後悔してないって言ったのは嘘じゃない。でも今日は……後悔しなくちゃいけない。",
    ko: "어제 호텔에서 있었던 일은… 진심이었어. 후회하지 않는다고 한 말도 거짓이 아니었어. 하지만 오늘은… 후회해야 해.",
  })),
  say("sara", "sad", tx({
    id: "Jangan hubungi aku lagi.",
    en: "Don't contact me again.",
    ja: "もう連絡しないで。",
    ko: "다시는 연락하지 마.",
  })),
  say("arka", "serious", tx({
    id: "Sarah, dengarkan dulu—",
    en: "Sarah, just hear me out—",
    ja: "サラさん、話を聞いて——",
    ko: "사라, 내 말 좀 들어 봐요—",
  })),
  callEnded,
  setFlag("day6SaraCompleted", true),
  setFlag("day6SaraEnding", "bad"),
  setFlag("saraRouteClosed", true),
  hide("arka-day6-sara"),
  scene("#000000", "", 1000),
  centeredText(tx({
    id: "HARI 6 SELESAI",
    en: "DAY 6 COMPLETE",
    ja: "6日目 終了",
    ko: "6일차 완료",
  }), { size: "hero" }),
  jump("day7-sara-bad-ending"),
];
