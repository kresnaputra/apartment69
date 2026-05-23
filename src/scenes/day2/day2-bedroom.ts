import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, jump, minigame, narrate, playBgm, say } from "@/scenes/scriptTypes";
import apartmentUrl from "@/background/apartment.png";
import bgm from "@/music/day2.mp3";

export const day2BedroomScene: VisualNovelCommand[] = [
  playBgm(bgm),
  bg(apartmentUrl, tx({
    id: "Apartment 69 Hari 2",
    en: "Apartment 69 Day 2",
    ja: "Apartment 69 - 2日目",
    ko: "Apartment 69 - 2일차",
  })),
  narrate(
    tx({
      id: "Pagi datang terlalu cepat. Arka meraih ponselnya sambil masih setengah sadar, lalu menatap daftar kontak yang semalam terus terlintas di kepalanya.",
      en: "Morning came too fast. Arka reaches for his phone while still half awake, then stares at the contact list that kept running through his head last night.",
      ja: "朝はあまりにも早く来た。アルカはまだ半分眠ったままスマホを手に取り、昨夜ずっと頭をよぎっていた連絡先の一覧を見つめる。",
      ko: "아침은 너무 빨리 찾아왔다. 아르카는 아직 반쯤 잠든 채 휴대폰을 집어 들고, 어젯밤 계속 머릿속을 맴돌던 연락처 목록을 바라본다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Oke... sekarang tentuin dulu. Pagi ini aku mulai dari siapa?",
      en: "Okay... decide first. Who am I starting with this morning?",
      ja: "よし…まず決めよう。今朝は誰から行く？",
      ko: "좋아... 먼저 정하자. 오늘 아침은 누구부터 갈까?",
    }),
  ),
  minigame("smartphone-contacts", {
    title: tx({
      id: "Pilih Tujuan Pagi Ini",
      en: "Choose This Morning's Stop",
      ja: "今朝の行き先を選ぶ",
      ko: "오늘 아침 목적지 선택",
    }),
    subtitle: tx({
      id: "Nggak mungkin semuanya sekaligus. Fokus ke satu orang dulu.",
      en: "No way to handle everyone at once. Focus on one person first.",
      ja: "全員を一度に相手するのは無理だ。まずは一人に絞ろう。",
      ko: "모두를 한 번에 챙길 수는 없다. 우선 한 사람에게 집중하자.",
    }),
    disabledContacts: ["nadia", "sara", "sleep"],
    contactOverrides: {
      maya: {
        next: "day2-route-maya",
      },
      elena: {
        next: "day2-route-elena",
      },
      nadia: {
        blurb: tx({
          id: "Belum ada alur Hari 2 untuk Nadia.",
          en: "No Day 2 route for Nadia yet.",
          ja: "ナディアの2日目ルートはまだない。",
          ko: "나디아의 2일차 루트는 아직 없다.",
        }),
      },
      sara: {
        blurb: tx({
          id: "Belum ada alur Hari 2 untuk Sarah.",
          en: "No Day 2 route for Sarah yet.",
          ja: "サラの2日目ルートはまだない。",
          ko: "사라의 2일차 루트는 아직 없다.",
        }),
      },
    },
  }),
];

export const day2RouteMayaScene: VisualNovelCommand[] = [
  narrate(
    tx({
      id: "Arka menjatuhkan ponselnya ke kasur lalu berdiri. Maya masih yang paling mengganggu pikirannya sejak kemarin.",
      en: "Arka drops his phone onto the bed and gets up. Maya is still the one weighing on his mind the most since yesterday.",
      ja: "アルカはスマホをベッドに放り、立ち上がった。昨日から一番気がかりなのは、やはりマヤだった。",
      ko: "아르카는 휴대폰을 침대 위에 던져 두고 일어선다. 어제부터 가장 마음에 걸리는 사람은 역시 마야다.",
    }),
  ),
  narrate(
    tx({
      id: "Dia kelihatan pucat banget kemarin, bahkan rasanya dia belum makan yang bener. Mending cek dia dulu.",
      en: "She looked way too pale yesterday, and it didn't even seem like she'd eaten properly. Better check on her first.",
      ja: "昨日の彼女は顔色が悪すぎたし、ろくに食べてもいなさそうだった。先に様子を見に行くべきだ。",
      ko: "어제 그녀는 너무 창백했고, 제대로 먹지도 못한 것 같았다. 먼저 확인하러 가는 게 맞다.",
    }),
  ),
  jump("day2-hallway"),
];

export const day2RouteElenaScene: VisualNovelCommand[] = [
  narrate(
    tx({
      id: "Arka mengunci layar ponselnya lalu mengembuskan napas pendek. Kalau Elena benar-benar lagi bermasalah, lebih baik dibereskan dari pagi.",
      en: "Arka locks his phone and lets out a short breath. If Elena is really dealing with something, it's better to handle it early.",
      ja: "アルカはスマホの画面を消して、短く息を吐いた。エレナが本当に問題を抱えているなら、朝のうちに片づけたほうがいい。",
      ko: "아르카는 휴대폰 화면을 끄고 짧게 숨을 내쉰다. 엘레나가 정말 문제를 안고 있다면 아침부터 처리하는 편이 낫다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Elena dulu. Kemarin jelas ada yang nggak beres di unitnya.",
      en: "Elena first. Something was clearly off in her unit yesterday.",
      ja: "まずはエレナだ。昨日、あの部屋は明らかに様子がおかしかった。",
      ko: "먼저 엘레나다. 어제 그 방은 분명 뭔가 이상했다.",
    }),
  ),
  jump("day2-elena-hallway"),
];
