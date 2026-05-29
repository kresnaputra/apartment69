import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, narrate, say, show } from "@/scenes/scriptTypes";
import apartmentNightUrl from "@/background/apartment-night.png";
import elenaHallwayUrl from "@/background/elena-hallway.png";

export const day5ElenaHallwayScene: VisualNovelCommand[] = [
  bg(
    apartmentNightUrl,
    tx({
      id: "Apartment 69 - Malam Hari",
      en: "Apartment 69 - Night",
      ja: "Apartment 69 - 夜",
      ko: "Apartment 69 - 밤",
    }),
  ),
  narrate(
    tx({
      id: "Malam itu, Arka melihat Elena berdiri di depan unit 303. Ia memegang kunci, tapi mengarahkannya ke dinding.",
      en: "That night, Arka saw Elena standing in front of Unit 303. She was holding her key, but pointing it toward the wall.",
      ja: "その夜、アルカは303号室の前に立つエレナを見かけた。鍵を握っているのに、その先はドアではなく壁へ向いていた。",
      ko: "그날 밤, 아르카는 303호 앞에 서 있는 엘레나를 보았다. 그녀는 열쇠를 쥐고 있었지만, 그 끝은 문이 아니라 벽을 향하고 있었다.",
    }),
  ),
  bg(
    elenaHallwayUrl,
    tx({
      id: "Apartment 69 - Lorong Unit Elena",
      en: "Apartment 69 - Elena's Hallway",
      ja: "Apartment 69 - エレナの廊下",
      ko: "Apartment 69 - 엘레나 복도",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Elena?",
      en: "Elena?",
      ja: "エレナ？",
      ko: "엘레나?",
    }),
  ),
  narrate(
    tx({
      id: "Elena menoleh pelan. Matanya sayu, rambutnya berantakan, tapi wajahnya tetap mencoba galak.",
      en: "Elena turned slowly. Her eyes were heavy, her hair was a mess, but her face still tried to look stern.",
      ja: "エレナはゆっくり振り向いた。目はとろんとしていて、髪も乱れているのに、表情だけはまだ厳しくあろうとしていた。",
      ko: "엘레나는 천천히 고개를 돌렸다. 눈은 풀려 있고 머리는 헝클어졌지만, 표정만큼은 여전히 날카롭게 보이려 애쓰고 있었다.",
    }),
  ),
  say(
    "elena",
    "drunkAngry",
    tx({
      id: "Jangan ganggu. Aku sedang membuka pintu.",
      en: "Don't bother me. I'm opening the door.",
      ja: "邪魔しないで。今、ドアを開けてるところなの。",
      ko: "방해하지 마. 지금 문 여는 중이야.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Itu dinding.",
      en: "That's the wall.",
      ja: "それ、壁だぞ。",
      ko: "그건 벽이야.",
    }),
  ),
  narrate(
    tx({
      id: "Elena diam sebentar.",
      en: "Elena went quiet for a second.",
      ja: "エレナは少しだけ黙り込んだ。",
      ko: "엘레나는 잠깐 말이 없었다.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Aku tahu. Aku sedang menguji pintunya.",
      en: "I know. I'm testing the door.",
      ja: "わかってる。ドアの方を試してるの。",
      ko: "알아. 지금 문을 시험해보는 거야.",
    }),
  ),
  narrate(
    tx({
      id: "Arka mendekat pelan.",
      en: "Arka stepped closer carefully.",
      ja: "アルカはゆっくり近づいた。",
      ko: "아르카는 조심스럽게 다가갔다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Kamu habis minum?",
      en: "Have you been drinking?",
      ja: "飲んできたのか？",
      ko: "너 술 마셨어?",
    }),
  ),
  narrate(
    tx({
      id: "Elena mengangkat dagu.",
      en: "Elena lifted her chin.",
      ja: "エレナは顎を上げた。",
      ko: "엘레나는 턱을 치켜든다.",
    }),
  ),
  say(
    "elena",
    "drunkAngry",
    tx({
      id: "Aku dosen.",
      en: "I'm a lecturer.",
      ja: "私は講師よ。",
      ko: "나는 교수야.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Itu bukan jawaban.",
      en: "That's not an answer.",
      ja: "それは答えになってない。",
      ko: "그건 대답이 아니야.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Dosen juga manusia.",
      en: "Lecturers are human too.",
      ja: "講師だって人間なの。",
      ko: "교수도 사람이야.",
    }),
  ),
  narrate(
    tx({
      id: "Arka menahan senyum.",
      en: "Arka held back a smile.",
      ja: "アルカは笑いをこらえた。",
      ko: "아르카는 웃음을 참는다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Kuncinya boleh aku bantu?",
      en: "Want me to help with the key?",
      ja: "鍵、手伝おうか？",
      ko: "열쇠 내가 도와줄까?",
    }),
  ),
  say(
    "elena",
    "drunkAngry",
    tx({
      id: "Aku bisa sendiri.",
      en: "I can do it myself.",
      ja: "自分でできる。",
      ko: "혼자 할 수 있어.",
    }),
  ),
  narrate(
    tx({
      id: "Ia meraba tasnya, lalu mengeluarkan flashdisk.",
      en: "She rummaged through her bag, then pulled out a flash drive.",
      ja: "彼女はバッグを探り、それからUSBメモリを取り出した。",
      ko: "그녀는 가방을 뒤적이더니 USB를 꺼냈다.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Itu flashdisk.",
      en: "That's a flash drive.",
      ja: "それ、USBメモリだ。",
      ko: "그건 USB야.",
    }),
  ),
  narrate(
    tx({
      id: "Elena cepat memasukkannya lagi.",
      en: "Elena quickly shoved it back in.",
      ja: "エレナはそれを慌ててしまい込んだ。",
      ko: "엘레나는 급히 그걸 다시 집어넣었다.",
    }),
  ),
  say(
    "elena",
    "drunkAngry",
    tx({
      id: "Aku sedang mengetes kamu.",
      en: "I was testing you.",
      ja: "あなたを試してたのよ。",
      ko: "너를 시험해본 거야.",
    }),
  ),
  narrate(
    tx({
      id: "Setelah beberapa kali gagal, Elena akhirnya menyerahkan kunci pada Arka.",
      en: "After a few more failed tries, Elena finally handed the key over to Arka.",
      ja: "何度か失敗したあと、エレナはついにアルカへ鍵を渡した。",
      ko: "몇 번 더 실패한 끝에, 엘레나는 결국 열쇠를 아르카에게 넘겼다.",
    }),
  ),
  say(
    "elena",
    "drunkAngry",
    tx({
      id: "Cepat. Tapi jangan senang dulu.",
      en: "Quickly. But don't get smug.",
      ja: "早くして。でも調子に乗らないで。",
      ko: "빨리. 하지만 너무 좋아하진 마.",
    }),
  ),
  narrate(
    tx({
      id: "Arka membuka pintu, lalu mundur sedikit.",
      en: "Arka opened the door, then stepped back a little.",
      ja: "アルカはドアを開け、それから少し距離を取った。",
      ko: "아르카는 문을 열고, 살짝 뒤로 물러섰다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Aku tunggu sampai kamu benar-benar masuk.",
      en: "I'll wait until you're actually inside.",
      ja: "ちゃんと中に入るまで待つよ。",
      ko: "네가 진짜 안으로 들어갈 때까지 기다릴게.",
    }),
  ),
];
