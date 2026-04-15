import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { jump, moveTo, narrate, say, scene, show } from "@/scenes/scriptTypes";

export const visitRouteScene: VisualNovelCommand[] = [
  scene(
    "radial-gradient(circle at top, rgba(193,127,255,0.28), transparent 34%), linear-gradient(180deg, #271524 0%, #161024 55%, #08070e 100%)",
    tx({
      id: "Stasiun Senja",
      en: "Twilight Station",
      ja: "黄昏駅",
      ko: "황혼역",
    }),
  ),
  show("maya-main", "maya", "worried", { position: "right", enterFrom: "none" }),
  moveTo("maya-main", "center", { duration: 760, easing: "ease-in-out", xOffset: 0.03 }),
  say("arka", "shy", tx({
    id: "Kalau begitu jangan beri aku janji. Duduklah sebentar, dengarkan ceritaku, lalu pergilah tanpa merasa berutang apa pun.",
    en: "Then don't give me a promise. Sit with me for a bit, hear my story, then leave without feeling like you owe me anything.",
    ja: "それなら約束なんてしなくていい。少しだけ座って、俺の話を聞いて、それから何も背負わずに行ってくれ。",
    ko: "그렇다면 약속은 하지 마. 잠깐만 앉아서 내 얘기를 듣고, 아무 빚도 지지 않은 얼굴로 떠나.",
  })),
  say("maya", "teasing", tx({
    id: "Kalau cuma mampir, setidaknya duduk sampai kereta terakhir benar-benar lewat.",
    en: "If you're only stopping by, then at least stay seated until the last train actually passes.",
    ja: "ただ立ち寄るだけなら、せめて最後の列車が本当に行ってしまうまでは座っていて。",
    ko: "그냥 들렀다 가는 거라면, 적어도 마지막 열차가 정말 지나갈 때까진 앉아 있어.",
  })),
  narrate(tx({
    id: "Kereta terakhir belum datang. Masih ada sedikit waktu untuk pura-pura bahwa perpisahan bisa terasa sopan.",
    en: "The last train hasn't come yet. There's still a little time left to pretend a goodbye can feel polite.",
    ja: "最後の列車はまだ来ていない。別れというものが、礼儀正しく済ませられるふりをする時間はまだ少し残っていた。",
    ko: "막차는 아직 오지 않았다. 이별이라는 게 점잖게 끝날 수 있는 척할 시간은 아직 조금 남아 있었다.",
  })),
  jump("epilogue"),
];
