import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  jump,
  menu,
  minigame,
  narrate,
  say,
  setFlag,
  show,
} from "@/scenes/scriptTypes";
import elevator from "@/background/elevator.png";

export const elevatorMeetingScene: VisualNovelCommand[] = [
  bg(elevator, tx({
    id: "Lentera Apartments - Lift",
    en: "Lentera Apartments - Elevator",
    ja: "レンテラ・アパートメント - エレベーター",
    ko: "렌테라 아파트 - 엘리베이터",
  })),
  show("arka-elevator", "arka", "neutral", {
    position: "left",
  }),
  say("maya", "worried", tx({
    id: "Jangan tutup liftnya dulu...!",
    en: "Don’t close the elevator yet…! ",
    ja: "エレベーター閉めないで…！",
    ko: "엘리베이터 닫지 마요...!",
  }), { hideName: true }),
  minigame("elevator-button"),
  say(
    "maya",
    "worried",
    tx({
      id: "(menarik napas) Nyaris aja... hampir ketinggalan...",
      en: "(catching her breath) That was close… almost missed it…",
      ja: "（息を整えながら）危なかった…もう少しで乗り遅れるところだった…",
      ko: "(숨을 고르며) 큰일 날 뻔했네... 거의 놓칠 뻔했어...",
    }),
    { hideName: true },
  ),
  narrate(
    tx({
      id: "(Arka meliriknya sebentar dari balik poni, lalu menatap lagi ke pintu lift dengan ekspresi datar)",
      en: "(glances at her from under his bangs, then looks back at the elevator door, expression neutral)",
      ja: "（前髪の隙間から彼女をちらりと見て、それから何事もないようにまたエレベーターの扉へ視線を戻す）",
      ko: "(앞머리 너머로 그녀를 잠깐 흘끗 본 뒤, 아무 일도 없었다는 듯 다시 엘리베이터 문을 바라본다)",
    }),
  ),
  show("maya-elevator", "maya", "neutral", {
    position: "center",
    enterFrom: "fade",
  }),
  say(
    "maya",
    "worried",
    tx({
      id: "Tunggu... kamu Arka, kan? Anak Teknik itu?",
      en: "Wait… you’re Arka, right? From the Engineering department?",
      ja: "待って…君ってアルカでしょ？ 工学部の。",
      ko: "잠깐... 너 아르카 맞지? 공대 다니는.",
    }),
    { hideName: true },
  ),
  say("arka", "neutral", tx({
    id: "Iya. Kita kenal?",
    en: "Yeah. Do I know you?",
    ja: "うん。俺たち知り合いだっけ？",
    ko: "응. 우리 아는 사이야?",
  })),
  say(
    "maya",
    "worried",
    tx({
      id: "Aku Maya. Dari Fakultas Kedokteran... aku sering lihat kamu di pojok perpustakaan. Kamu selalu duduk di meja yang sama tiap sore. Kamu... tinggal di sini juga?",
      en: "I’m Maya. From the Medical Faculty… I see you a lot in the library corner. You always sit at the same table every afternoon. You… live here too?",
      ja: "私、マヤ。医学部なの…図書館の隅でよく君を見かけるよ。毎日の午後、いつも同じ席に座ってるでしょ。君も…ここに住んでるの？",
      ko: "나 마야야. 의대 다녀... 도서관 구석 자리에서 너 자주 봤어. 매일 오후마다 늘 같은 자리에 앉아 있잖아. 너도... 여기 살아?",
    }),
  ),
  say("arka", "neutral", tx({
    id: "Baru pindah hari ini. Lantai tiga.",
    en: "Just moved in today. Third floor.",
    ja: "今日引っ越してきたばっか。三階。",
    ko: "오늘 막 이사 왔어. 3층.",
  })),
  say(
    "maya",
    "calm",
    tx({
      id: "Serius? Kebetulan banget! Aku juga di lantai tiga, Unit 301. Kalau kamu butuh info soal kampus atau tempat makan enak di sekitar sini, tanya aja. Nih... simpan nomorku. Jaga-jaga kalau kamu butuh sesuatu soal apartemen.",
      en: "No way, what a coincidence! I’m on the third floor too, Unit 301. If you need anything about campus or good places to eat around here, just ask. Here… take my number. Just in case you need something about the apartment.",
      ja: "うそ、すごい偶然！ 私も三階、301号室なの。学校のことでも、この辺の美味しいお店でも、何かあったら聞いて。ほら…連絡先、渡しとく。アパートのことで何かあった時のために。",
      ko: "진짜? 완전 우연이다! 나도 3층 301호야. 학교 얘기든 근처 맛집이든 궁금한 거 있으면 물어봐. 여기... 내 번호 저장해 둬. 아파트 일로 뭐 필요할 수도 있으니까.",
    }),
  ),
  menu(tx({
    id: "Pilihanmu?",
    en: "Your choice?",
    ja: "どうする？",
    ko: "어떻게 할까?",
  }), [
    { id: "accept-maya-number", label: tx({ id: "Terima", en: "Accept", ja: "受け取る", ko: "받기" }), next: "accept-maya-number" },
    {
      id: "decline-maya-number",
      label: tx({ id: "Tolak", en: "Decline", ja: "断る", ko: "거절하기" }),
      next: "decline-maya-number",
    },
  ]),
];

export const acceptMayaNumberScene: VisualNovelCommand[] = [
  setFlag("mayaAcceptedNumber", true),
  say("maya", "calm", tx({
    id: "Makasih, Arka... nanti aku chat ya, oke?",
    en: "Thanks, Arka… I’ll text you later, okay?",
    ja: "ありがと、アルカ…あとでメッセージするね。いい？",
    ko: "고마워, 아르카... 나중에 연락할게, 알았지?",
  })),
  jump("elena-encounter"),
];

export const declineMayaNumberScene: VisualNovelCommand[] = [
  setFlag("mayaAcceptedNumber", false),
  say("maya", "calm", tx({
    id: "Ah... maaf kalau aku bikin kamu nggak nyaman...",
    en: "Ah… sorry if I made you uncomfortable…",
    ja: "あ…ごめんね、嫌な感じにさせちゃったなら…",
    ko: "아... 내가 불편하게 했다면 미안해...",
  })),
  jump("elena-encounter"),
];
