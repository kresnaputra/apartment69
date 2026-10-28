import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  hide,
  jump,
  menu,
  narrate,
  playSfx,
  say,
  setFlag,
  show,
} from "@/scenes/scriptTypes";
import frontOfficeUrl from "@/background/front-office.png";
import lift from "@/sfx/lift.wav";
import breakSound from "@/sfx/break.wav";
import { elenaDay1To3Voices } from "@/voice/elena/day1to3";

export const elenaEncounterScene: VisualNovelCommand[] = [
  bg(
    frontOfficeUrl,
    tx({
      id: "Lentera Apartments - Front Office",
      en: "Lentera Apartments - Front Office",
      ja: "レンテラ・アパートメント - フロント",
      ko: "렌테라 아파트 - 프런트 오피스",
    }),
  ),
  hide("maya-elevator"),
  hide("arka-elevator"),
  narrate(
    tx({
      id: "Pintu lift terbuka. Arka baru melangkah ke lorong saat suara tajam memecah suasana yang tadinya sunyi.",
      en: "The elevator doors slide open. Arka steps into the hallway just as a sharp voice cuts through the silence.",
      ja: "エレベーターの扉が開く。アルカが廊下へ踏み出したその瞬間、鋭い声が静けさを切り裂いた。",
      ko: "엘리베이터 문이 열리고, 아르카가 복도로 나서는 순간 날카로운 목소리가 정적을 가른다.",
    }),
  ),
  playSfx(lift),
  say(
    "elena",
    "neutral",
    tx({
      id: "Sudah tiga hari! Tiga hari pipa itu bocor, dan jawabannya cuma 'besok'? Aku nggak bayar sewa cuma buat denger suara tetesan air tiap malam!",
      en: "It's been three days! Three days that pipe's been leaking, and all I get is 'tomorrow'? I'm not paying rent just to listen to dripping water every damn night!",
      ja: "もう三日よ！ 三日もあの配管が漏れてるのに、返事は『明日』ばかり？ 毎晩あの水音を聞くために家賃を払ってるんじゃないの！",
      ko: "벌써 3일째예요! 그 파이프가 3일째 새고 있는데 대답은 계속 '내일'뿐이라고요? 밤마다 물 떨어지는 소리 들으려고 월세 내는 거 아니거든요!",
    }),
    { hideName: true, voice: elenaDay1To3Voices[0] },
  ),
  playSfx(breakSound),
  show("arka-hallway", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  say(
    "arka",
    "surprised",
    tx({
      id: "Ribut apaan tuh...?",
      en: "What's that noise...?",
      ja: "何の騒ぎだ…？",
      ko: "저 소리 뭐야...?",
    }),
  ),
  narrate(
    tx({
      id: "Maaf, Nona... teknisinya sedang terikat proyek lain...",
      en: "Sorry, Miss... the technician's tied up with another project...",
      ja: "申し訳ありません、お客様…技術者が別の案件で手が離せなくて…",
      ko: "죄송합니다, 손님... 기술자가 다른 작업에 묶여 있어서...",
    }),
    "Staff",
  ),
  show("elena-hallway", "elena", "angry", {
    position: "center",
    enterFrom: "fade",
  }),
  narrate(
    tx({
      id: "(dia mengembuskan napas tajam lalu mendadak berbalik)",
      en: "(She lets out a sharp breath and suddenly turns around.)",
      ja: "（鋭く息を吐き、エレナは唐突に振り返る。）",
      ko: "(날카롭게 숨을 내쉰 뒤 그녀가 갑자기 뒤돌아선다.)",
    }),
    "???",
  ),
  say(
    "elena",
    "angry",
    tx({
      id: "Nggak masuk akal.",
      en: "Unbelievable.",
      ja: "信じられない。",
      ko: "어이가 없네.",
    }),
    { hideName: true, voice: elenaDay1To3Voices[1] },
  ),
  say(
    "elena",
    "angry",
    tx({
      id: "Gimana aku bisa fokus nilai tugas-tugas ini kalau suaranya berisik terus begini...",
      en: "How am I supposed to focus on grading these assignments with that constant noise...",
      ja: "あんな音がずっとしてるのに、どうやって課題の採点に集中しろっていうの…",
      ko: "저 소리가 계속 나는데 내가 어떻게 과제 채점에 집중하라는 거지...",
    }),
    { hideName: true, voice: elenaDay1To3Voices[2] },
  ),
  menu(
    tx({
      id: "Apa yang harus kamu lakukan?",
      en: "What should you do?",
      ja: "あなたはどうする？",
      ko: "너는 어떻게 할까?",
    }),
    [
      {
        id: "help-elena",
        label: tx({ id: "Bantu", en: "Help", ja: "手伝う", ko: "돕는다" }),
        next: "help-elena",
      },
      {
        id: "ignore-elena",
        label: tx({
          id: "Abaikan",
          en: "Ignore",
          ja: "無視する",
          ko: "무시한다",
        }),
        next: "ignore-elena",
      },
    ],
  ),
];

export const ignoreElenaScene: VisualNovelCommand[] = [
  setFlag("elenaAcceptedNumber", false),
  say(
    "arka",
    "serious",
    tx({
      id: "Mending jangan ikut campur urusan orang lain...",
      en: "Better not get involved in other people's problems...",
      ja: "他人の問題には関わらないほうがいいな…",
      ko: "남의 문제엔 엮이지 않는 게 낫겠다...",
    }),
  ),
  jump("nadia-balcony"),
];

export const helpElenaScene: VisualNovelCommand[] = [
  narrate(
    tx({
      id: "(Arka berjalan santai menyusul di sampingnya.)",
      en: "(Arka walks up beside her casually.)",
      ja: "（アルカは何気ない足取りで彼女の横に並ぶ。）",
      ko: "(아르카는 자연스럽게 그녀 옆으로 다가선다.)",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Kalau mau, aku bisa lihat pipanya.",
      en: "I could take a look at the pipe, if you want.",
      ja: "よかったら、その配管見てみようか。",
      ko: "원하면 내가 그 파이프 한번 봐줄 수 있어.",
    }),
  ),
  narrate(
    tx({
      id: "(dia langsung berhenti, menoleh ke Arka dengan tatapan tajam, menilainya dari ujung kepala sampai kaki)",
      en: "(She stops mid-step and turns to Arka with a sharp gaze, scanning him from head to toe.)",
      ja: "（彼女は歩みを止め、鋭い目でアルカを振り返り、頭からつま先まで値踏みするように見る。）",
      ko: "(그녀는 걸음을 멈추고 날카로운 시선으로 아르카를 위아래로 훑어본다.)",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Kamu siapa? Staf baru? Seragammu aja nggak ada.",
      en: "Who are you? New staff? You're not in uniform.",
      ja: "あなた誰？ 新しいスタッフ？ 制服も着てないけど。",
      ko: "당신 누구죠? 새 직원이에요? 유니폼도 없는데.",
    }),
    { hideName: true, voice: elenaDay1To3Voices[3] },
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Baru pindah. Tapi aku biasa benerin barang sendiri daripada nunggu kelamaan.",
      en: "Just moved in. But I'm used to fixing things myself instead of waiting around.",
      ja: "引っ越してきたばかり。でも、待ってるくらいなら自分で直すほうが性に合ってる。",
      ko: "방금 이사 왔어요. 그래도 마냥 기다리느니 직접 고치는 쪽이 익숙해서요.",
    }),
  ),
  narrate(
    tx({
      id: "(dia diam sejenak, masih menatap curiga ke arah Arka)",
      en: "(She pauses, studying him with a skeptical expression.)",
      ja: "（彼女は一瞬黙り込み、疑わしげな表情でアルカを観察する。）",
      ko: "(그녀는 잠시 멈춰 선 채 의심스러운 눈빛으로 아르카를 살핀다.)",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Kedengarannya kamu pede banget. Tapi emang bisa? Aku nggak mau unitku malah tambah rusak.",
      en: "You sound confident. But can you actually do it? I don't want my unit ending up worse than it already is.",
      ja: "ずいぶん自信ありげね。でも本当にできるの？ これ以上部屋の状態を悪くされたくないんだけど。",
      ko: "자신감은 넘치네요. 그런데 진짜 할 수 있어요? 내 유닛이 지금보다 더 엉망이 되는 건 싫거든요.",
    }),
    { hideName: true, voice: elenaDay1To3Voices[4] },
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Terserah kamu. Tawarannya cuma berlaku sekarang.",
      en: "Up to you. Offer's only good right now.",
      ja: "決めるのはそっち。今だけの申し出だけどね。",
      ko: "선택은 당신 몫이에요. 이 제안은 지금뿐이지만.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "...Baiklah. Lagian aku juga nggak punya banyak pilihan. Namaku Elena. Cari aku di unit 303. Datang malam ini kalau kamu serius. Jangan bikin aku nunggu.",
      en: "...Fine. I don't really have a choice. Name's Elena. Find me in Unit 303. Come by tonight if you're serious. Don't keep me waiting.",
      ja: "…いいわ。どうせ他に選択肢もないし。私はエレナ。303号室に来て。あなたが本気なら、今夜にでも。あまり待たせないで。",
      ko: "...좋아요. 어차피 다른 선택지도 없으니까. 이름은 엘레나. 303호로 와요. 진심이면 오늘 밤에. 너무 기다리게 하진 말고.",
    }),
    { voice: elenaDay1To3Voices[5] },
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Oke. Nomormu kusimpan. Nanti malam aku mampir.",
      en: "Alright. I'll save your number. I'll stop by tonight.",
      ja: "わかった。連絡先は保存しておく。今夜寄るよ。",
      ko: "알겠어. 네 번호 저장해 둘게. 오늘 밤에 들를게.",
    }),
  ),
  setFlag("elenaAcceptedNumber", true),
  jump("nadia-balcony"),
];
