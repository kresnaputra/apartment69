import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, cutScene, narrate, say, show } from "@/scenes/scriptTypes";
import apartmentNightUrl from "@/background/apartment-night.png";
import elenaHallwayUrl from "@/background/elena-hallway.png";
import elenaBadroomUrl from "@/background/elena-badroom.png";
import handVideo from "@/cut-scene/hand.webm?url";
import { elenaDay5Voices } from "@/voice/elena/day5";

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
  show("arka-day5-elena-hallway", "arka", "serious", {
    position: "left",
    enterFrom: "left",
  }),

  narrate(
    tx({
      id: "Elena menoleh pelan. Matanya sayu, rambutnya berantakan, tapi wajahnya tetap mencoba galak.",
      en: "Elena turned slowly. Her eyes were heavy, her hair was a mess, but her face still tried to look stern.",
      ja: "エレナはゆっくり振り向いた。目はとろんとしていて、髪も乱れているのに、表情だけはまだ厳しくあろうとしていた。",
      ko: "엘레나는 천천히 고개를 돌렸다. 눈은 풀려 있고 머리는 헝클어졌지만, 표정만큼은 여전히 날카롭게 보이려 애쓰고 있었다.",
    }),
  ),
  show("elena-day5-elena-hallway", "elena", "drunk", {
    position: "center",
    enterFrom: "fade",
  }),
  say(
    "elena",
    "drunkAngry",
    tx({
      id: "Jangan ganggu. Aku sedang membuka pintu.",
      en: "Don't bother me. I'm opening the door.",
      ja: "邪魔しないで。今、ドアを開けてるところなの。",
      ko: "방해하지 마. 지금 문 여는 중이야.",
    }),
    { voice: elenaDay5Voices[0] },
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
    { voice: elenaDay5Voices[1] },
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
    { voice: elenaDay5Voices[2] },
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
    { voice: elenaDay5Voices[3] },
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
    { voice: elenaDay5Voices[4] },
  ),
  narrate(
    tx({
      id: "Ia meraba tasnya, lalu mengeluarkan flashdisk.",
      en: "She rummaged through her bag, then pulled out a flash drive.",
      ja: "彼女はバッグを探り、それからUSBメモリを取り出した。",
      ko: "그녀는 가방을 뒤적이더니 USB를 꺼냈다.",
    }),
  ),
  cutScene(handVideo, true),
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
    { voice: elenaDay5Voices[5] },
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
    { voice: elenaDay5Voices[6] },
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
  bg(
    elenaBadroomUrl,
    tx({
      id: "Apartment 69 - Unit Elena",
      en: "Apartment 69 - Elena's Unit",
      ja: "Apartment 69 - エレナの部屋",
      ko: "Apartment 69 - 엘레나의 유닛",
    }),
  ),
  narrate(
    tx({
      id: "Elena melangkah masuk, tapi hampir tersandung. Arka refleks menahan lengannya, lalu segera melepas.",
      en: "Elena stepped inside, but nearly stumbled. Arka caught her arm on reflex, then let go just as quickly.",
      ja: "エレナは中へ入ろうとして、危うくつまずいた。アルカは反射的に彼女の腕を支え、すぐに手を離した。",
      ko: "엘레나는 안으로 발을 들였지만 거의 넘어질 뻔했다. 아르카는 반사적으로 그녀의 팔을 붙잡았다가 곧바로 놓았다.",
    }),
  ),
  narrate(
    tx({
      id: "Elena menatapnya.",
      en: "Elena looked at him.",
      ja: "エレナは彼を見た。",
      ko: "엘레나는 그를 바라보았다.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Kamu takut padaku?",
      en: "Are you afraid of me?",
      ja: "私が怖い？",
      ko: "내가 무서워?",
    }),
    { voice: elenaDay5Voices[7] },
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Sedikit. Tapi lebih takut kamu jatuh.",
      en: "A little. But I'm more afraid you'll fall.",
      ja: "少しは。でも、それより君が転ぶ方が怖い。",
      ko: "조금은. 하지만 네가 넘어지는 게 더 무서워.",
    }),
  ),
  narrate(
    tx({
      id: "Elena diam. Wajahnya mendadak hanya terlihat lelah.",
      en: "Elena went quiet. Suddenly, her face only looked tired.",
      ja: "エレナは黙った。その顔には、急に疲れだけが残って見えた。",
      ko: "엘레나는 말이 없었다. 그녀의 얼굴에는 갑자기 피곤함만 남아 보였다.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Hari ini panjang sekali.",
      en: "Today has been so long.",
      ja: "今日は本当に長かった。",
      ko: "오늘은 정말 길었어.",
    }),
    { voice: elenaDay5Voices[8] },
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Mengajar?",
      en: "Teaching?",
      ja: "授業？",
      ko: "수업 때문이야?",
    }),
  ),
  narrate(
    tx({
      id: "Elena mengangguk.",
      en: "Elena nodded.",
      ja: "エレナはうなずいた。",
      ko: "엘레나는 고개를 끄덕였다.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Mengajar, rapat, mahasiswa, dosen lain… semua bilang sebentar. Tidak ada yang sebentar.",
      en: "Teaching, meetings, students, other lecturers... everyone says it'll only take a minute. Nothing ever takes a minute.",
      ja: "授業、会議、学生、ほかの講師…みんな『ちょっとだけ』って言うのに、ちょっとで済むものなんて一つもない。",
      ko: "수업, 회의, 학생, 다른 교수들... 다들 잠깐이면 된다고 해. 잠깐인 건 하나도 없어.",
    }),
    { voice: elenaDay5Voices[9] },
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Dan minumnya?",
      en: "And the drinking?",
      ja: "それで、酒は？",
      ko: "그리고 술은?",
    }),
  ),
  narrate(
    tx({
      id: "Elena mengangkat satu jari.",
      en: "Elena held up one finger.",
      ja: "エレナは指を一本立てた。",
      ko: "엘레나는 손가락 하나를 들어 올렸다.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Sedikit.",
      en: "A little.",
      ja: "少しだけ。",
      ko: "조금.",
    }),
    { voice: elenaDay5Voices[10] },
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Sedikit versi siapa?",
      en: "A little by whose standards?",
      ja: "誰基準の少し？",
      ko: "누구 기준으로 조금인데?",
    }),
  ),
  narrate(
    tx({
      id: "Elena berpikir lama.",
      en: "Elena took a long time to think about it.",
      ja: "エレナはしばらく真剣に考えた。",
      ko: "엘레나는 한참을 생각했다.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Versi orang yang sudah lupa.",
      en: "By the standards of someone who already forgot.",
      ja: "もう忘れた人の基準で。",
      ko: "이미 잊어버린 사람 기준으로.",
    }),
    { voice: elenaDay5Voices[11] },
  ),
  narrate(
    tx({
      id: "Arka menghela napas kecil.",
      en: "Arka let out a small sigh.",
      ja: "アルカは小さく息をついた。",
      ko: "아르카는 작게 한숨을 내쉬었다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Oke. Duduk dulu sebelum lantainya makin berbahaya.",
      en: "Okay. Sit down first before the floor gets even more dangerous.",
      ja: "わかった。床がもっと危険になる前に、先に座れ。",
      ko: "알겠어. 바닥이 더 위험해지기 전에 일단 앉아.",
    }),
  ),
  narrate(
    tx({
      id: "Elena menunjuk lantai.",
      en: "Elena pointed at the floor.",
      ja: "エレナは床を指さした。",
      ko: "엘레나는 바닥을 가리켰다.",
    }),
  ),
  say(
    "elena",
    "drunkAngry",
    tx({
      id: "Dia memang mencurigakan.",
      en: "It is suspicious.",
      ja: "そもそも怪しいのよ、この床。",
      ko: "애초에 이 바닥이 수상해.",
    }),
    { voice: elenaDay5Voices[12] },
  ),
  narrate(
    tx({
      id: "Arka hampir tertawa, tapi menahannya.",
      en: "Arka almost laughed, but held it back.",
      ja: "アルカは吹き出しそうになったが、なんとかこらえた。",
      ko: "아르카는 거의 웃을 뻔했지만 간신히 참았다.",
    }),
  ),
  narrate(
    tx({
      id: "Elena menatapnya serius.",
      en: "Elena looked at him seriously.",
      ja: "エレナは真剣な顔で彼を見た。",
      ko: "엘레나는 진지한 표정으로 그를 바라보았다.",
    }),
  ),
  say(
    "elena",
    "drunkAngry",
    tx({
      id: "Kamu tidak boleh masuk sembarangan.",
      en: "You can't just come in whenever you want.",
      ja: "勝手に入ってきちゃだめ。",
      ko: "네가 함부로 들어오면 안 돼.",
    }),
    { voice: elenaDay5Voices[13] },
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Aku cuma bantu kamu duduk, ambilkan air, lalu keluar. Tidak lebih dari yang kamu izinkan.",
      en: "I'm just helping you sit down, getting you some water, and then I'm leaving. Nothing more than what you allow.",
      ja: "座るのを手伝って、水を持ってきて、それで出る。それ以上は、君が許したことしかしない。",
      ko: "난 네가 앉을 수 있게 도와주고, 물 가져다주고, 그다음 나갈 거야. 네가 허락한 것 이상은 안 해.",
    }),
  ),
  narrate(
    tx({
      id: "Elena menatapnya lama.",
      en: "Elena stared at him for a long moment.",
      ja: "エレナはしばらくじっと彼を見つめた。",
      ko: "엘레나는 한참 동안 그를 바라보았다.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Cuma sampai aku duduk.",
      en: "Only until I'm sitting down.",
      ja: "座るまでだけ。",
      ko: "내가 앉을 때까지만.",
    }),
    { voice: elenaDay5Voices[14] },
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Cuma sampai kamu duduk.",
      en: "Only until you're sitting down.",
      ja: "座るまでだけ。",
      ko: "네가 앉을 때까지만.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Dan air.",
      en: "And water.",
      ja: "それと水。",
      ko: "그리고 물.",
    }),
    { voice: elenaDay5Voices[15] },
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Dan air.",
      en: "And water.",
      ja: "それと水。",
      ko: "그리고 물.",
    }),
  ),
  narrate(
    tx({
      id: "Arka membantunya berjalan pelan ke sofa. Setelah Elena duduk, ia mengambilkan segelas air dan meletakkannya di meja kecil.",
      en: "Arka helped her walk slowly to the sofa. Once Elena sat down, he got her a glass of water and set it on the small table.",
      ja: "アルカは彼女をゆっくりソファまで連れていった。エレナが座ると、彼は水を一杯持ってきて小さなテーブルに置いた。",
      ko: "아르카는 그녀가 천천히 소파까지 걸어가도록 도왔다. 엘레나가 앉자 그는 물 한 잔을 가져와 작은 테이블 위에 놓았다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Minum pelan-pelan.",
      en: "Drink slowly.",
      ja: "ゆっくり飲め。",
      ko: "천천히 마셔.",
    }),
  ),
  narrate(
    tx({
      id: "Elena meneguk sedikit, lalu bersandar.",
      en: "Elena took a small sip, then leaned back.",
      ja: "エレナは少し口をつけて、それから背もたれに寄りかかった。",
      ko: "엘레나는 조금 마신 뒤, 몸을 기대었다.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Kamu cerewet.",
      en: "You're fussy.",
      ja: "口うるさい。",
      ko: "너 잔소리 많아.",
    }),
    { voice: elenaDay5Voices[16] },
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Kamu mabuk.",
      en: "You're drunk.",
      ja: "酔ってるからな。",
      ko: "네가 취했으니까.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Aku lelah.",
      en: "I'm tired.",
      ja: "疲れてるだけ。",
      ko: "난 피곤한 거야.",
    }),
    { voice: elenaDay5Voices[17] },
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Dan mabuk.",
      en: "And drunk.",
      ja: "それに酔ってる。",
      ko: "그리고 취했어.",
    }),
  ),
  narrate(
    tx({
      id: "Elena menunjuknya lemah.",
      en: "Elena pointed at him weakly.",
      ja: "エレナは弱々しく彼を指さした。",
      ko: "엘레나는 힘없이 그를 가리켰다.",
    }),
  ),
  say(
    "elena",
    "drunkAngry",
    tx({
      id: "Jangan menang debat dengan orang mabuk. Itu curang.",
      en: "Don't win arguments against drunk people. That's cheating.",
      ja: "酔ってる相手に口論で勝つのはずるい。",
      ko: "취한 사람이랑 말싸움 이기는 건 치사해.",
    }),
    { voice: elenaDay5Voices[18] },
  ),
  narrate(
    tx({
      id: "Arka tersenyum.",
      en: "Arka smiled.",
      ja: "アルカは微笑んだ。",
      ko: "아르카는 미소 지었다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Baik. Aku kalah.",
      en: "Alright. I lose.",
      ja: "わかった。俺の負け。",
      ko: "좋아. 내가 졌어.",
    }),
  ),
  narrate(
    tx({
      id: "Hening sebentar.",
      en: "Silence settled for a moment.",
      ja: "少しだけ沈黙が落ちた。",
      ko: "잠깐 정적이 흘렀다.",
    }),
  ),
  narrate(
    tx({
      id: "Elena menatap kosong ke depan.",
      en: "Elena stared blankly ahead.",
      ja: "エレナはぼんやりと前を見つめた。",
      ko: "엘레나는 멍하니 앞을 바라보았다.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Aku capek jadi orang yang harus selalu terlihat tidak capek.",
      en: "I'm tired of being someone who always has to look like she's not tired.",
      ja: "いつも疲れていないように見せなきゃいけない人間でいるの、もう疲れた。",
      ko: "항상 안 지친 척해야 하는 사람으로 사는 게 지쳤어.",
    }),
    { voice: elenaDay5Voices[19] },
  ),
  narrate(
    tx({
      id: "Arka menatapnya lebih lembut.",
      en: "Arka looked at her more softly.",
      ja: "アルカの眼差しが少しやわらいだ。",
      ko: "아르카는 그녀를 좀 더 부드럽게 바라보았다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Malam ini kamu boleh capek dulu.",
      en: "Tonight, you're allowed to be tired.",
      ja: "今夜くらい、疲れててもいい。",
      ko: "오늘 밤만큼은 지쳐 있어도 돼.",
    }),
  ),
  narrate(
    tx({
      id: "Elena menoleh.",
      en: "Elena turned toward him.",
      ja: "エレナは彼の方を向いた。",
      ko: "엘레나는 그를 돌아본다.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Kamu bicara seperti orang baik.",
      en: "You talk like a good person.",
      ja: "あなた、いい人みたいなこと言うのね。",
      ko: "넌 꼭 좋은 사람처럼 말하네.",
    }),
    { voice: elenaDay5Voices[20] },
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Seperti?",
      en: "Like what?",
      ja: "みたいって？",
      ko: "어떤 식으로?",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Aku belum memutuskan kamu benar-benar baik.",
      en: "I haven't decided you're actually good yet.",
      ja: "あなたが本当にいい人かどうかは、まだ決めてない。",
      ko: "네가 진짜 좋은 사람인지는 아직 결정 안 했어.",
    }),
    { voice: elenaDay5Voices[21] },
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Masih masa penilaian?",
      en: "Still under evaluation?",
      ja: "まだ審査中？",
      ko: "아직 평가 중이야?",
    }),
  ),
  narrate(
    tx({
      id: "Elena mengangguk pelan.",
      en: "Elena nodded slowly.",
      ja: "エレナはゆっくりとうなずいた。",
      ko: "엘레나는 천천히 고개를 끄덕였다.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Masih.",
      en: "Still.",
      ja: "まだ。",
      ko: "아직.",
    }),
    { voice: elenaDay5Voices[22] },
  ),
  narrate(
    tx({
      id: "Arka melihat Elena sudah lebih tenang, lalu berdiri.",
      en: "Seeing that Elena seemed calmer now, Arka stood up.",
      ja: "エレナが少し落ち着いたのを見て、アルカは立ち上がった。",
      ko: "엘레나가 조금은 진정된 걸 보고, 아르카는 자리에서 일어났다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Aku keluar sekarang. Kunci pintunya dari dalam, ya.",
      en: "I'm heading out now. Lock the door from the inside, okay?",
      ja: "もう出るよ。ちゃんと内側から鍵をかけろよ。",
      ko: "이제 나갈게. 안에서 꼭 문 잠가.",
    }),
  ),
  narrate(
    tx({
      id: "Namun sebelum ia benar-benar pergi, Elena memanggil.",
      en: "But before he could really leave, Elena called out to him.",
      ja: "だが、彼が本当に出ていく前に、エレナが呼び止めた。",
      ko: "하지만 그가 정말 나가기 전에, 엘레나가 그를 불렀다.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Tunggu.",
      en: "Wait.",
      ja: "待って。",
      ko: "잠깐.",
    }),
    { voice: elenaDay5Voices[23] },
  ),
  narrate(
    tx({
      id: "Arka berhenti.",
      en: "Arka stopped.",
      ja: "アルカは足を止めた。",
      ko: "아르카는 걸음을 멈췄다.",
    }),
  ),
  narrate(
    tx({
      id: "Elena menatapnya dengan mata sayu.",
      en: "Elena looked at him with heavy eyes.",
      ja: "エレナは眠たげな目で彼を見た。",
      ko: "엘레나는 풀린 눈으로 그를 바라보았다.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Bisa duduk di sebelahku sebentar saja?",
      en: "Can you sit next to me for just a little while?",
      ja: "少しだけ、隣に座ってくれる？",
      ko: "잠깐만 내 옆에 앉아줄래?",
    }),
    { voice: elenaDay5Voices[24] },
  ),
  narrate(
    tx({
      id: "Arka terdiam.",
      en: "Arka went silent.",
      ja: "アルカは黙り込んだ。",
      ko: "아르카는 잠시 말이 없었다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Sebentar saja?",
      en: "Just a little while?",
      ja: "少しだけ？",
      ko: "잠깐만?",
    }),
  ),
  narrate(
    tx({
      id: "Elena mengangguk kecil.",
      en: "Elena gave a small nod.",
      ja: "エレナは小さくうなずいた。",
      ko: "엘레나는 작게 고개를 끄덕였다.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Sebentar saja.",
      en: "Just a little while.",
      ja: "少しだけ。",
      ko: "잠깐만.",
    }),
    { voice: elenaDay5Voices[25] },
  ),
  narrate(
    tx({
      id: "Arka menutup pintu sedikit, tapi tidak menguncinya. Ia duduk di sisi sofa, tetap menjaga jarak.",
      en: "Arka pulled the door mostly shut, but didn't lock it. He sat on the edge of the sofa, still keeping some distance.",
      ja: "アルカはドアを少し閉めたが、鍵はかけなかった。そして距離を保ったまま、ソファの端に腰を下ろした。",
      ko: "아르카는 문을 살짝 닫았지만 잠그지는 않았다. 그리고 거리를 둔 채 소파 한쪽 끝에 앉았다.",
    }),
  ),
  narrate(
    tx({
      id: "Beberapa detik hening.",
      en: "A few silent seconds passed.",
      ja: "数秒の沈黙が流れた。",
      ko: "몇 초간 침묵이 흘렀다.",
    }),
  ),
  narrate(
    tx({
      id: "Elena menatap meja, lalu berkata pelan.",
      en: "Elena stared at the table, then spoke softly.",
      ja: "エレナはテーブルを見つめたまま、静かに口を開いた。",
      ko: "엘레나는 테이블을 바라보다가 조용히 입을 열었다.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Aku cuma belum mau sendiri sekarang.",
      en: "I just don't want to be alone right now.",
      ja: "今は、まだ一人になりたくないだけ。",
      ko: "지금은 그냥 혼자 있고 싶지 않을 뿐이야.",
    }),
    { voice: elenaDay5Voices[26] },
  ),
  narrate(
    tx({
      id: "Arka tidak langsung menjawab.",
      en: "Arka didn't answer right away.",
      ja: "アルカはすぐには答えなかった。",
      ko: "아르카는 바로 대답하지 않았다.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Aku capek jadi kuat. Capek marah. Capek pura-pura tidak butuh siapa-siapa.",
      en: "I'm tired of being strong. Tired of being angry. Tired of pretending I don't need anyone.",
      ja: "強いふりも、怒ってるふりも、誰も必要ないふりも、もう疲れた。",
      ko: "강한 척하는 것도, 화난 척하는 것도, 누구도 필요 없다고 가장하는 것도 다 지쳤어.",
    }),
    { voice: elenaDay5Voices[27] },
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Kamu tidak perlu pura-pura malam ini.",
      en: "You don't have to pretend tonight.",
      ja: "今夜は、もう無理に取り繕わなくていい。",
      ko: "오늘 밤은 그렇게 가장하지 않아도 돼.",
    }),
  ),
  narrate(
    tx({
      id: "Elena menoleh. Matanya sedikit berkaca.",
      en: "Elena turned toward him. Her eyes glistened a little.",
      ja: "エレナが振り向く。目が少しだけ潤んでいた。",
      ko: "엘레나는 고개를 돌렸다. 눈가가 조금 젖어 있었다.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Jangan bicara baik-baik begitu.",
      en: "Don't talk to me so kindly like that.",
      ja: "そんなふうに優しく言わないで。",
      ko: "그렇게 다정하게 말하지 마.",
    }),
    { voice: elenaDay5Voices[28] },
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Kenapa?",
      en: "Why?",
      ja: "どうして？",
      ko: "왜?",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Nanti aku percaya.",
      en: "Because then I'll believe it.",
      ja: "信じてしまうから。",
      ko: "그러면 내가 믿어버릴 테니까.",
    }),
    { voice: elenaDay5Voices[29] },
  ),
  narrate(
    tx({
      id: "Arka terdiam.",
      en: "Arka fell silent.",
      ja: "アルカは言葉を失った。",
      ko: "아르카는 말이 없었다.",
    }),
  ),
  narrate(
    tx({
      id: "Elena cepat memalingkan wajah.",
      en: "Elena quickly turned her face away.",
      ja: "エレナは慌てて顔をそらした。",
      ko: "엘레나는 재빨리 시선을 돌렸다.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Lupakan.",
      en: "Forget it.",
      ja: "忘れて。",
      ko: "잊어.",
    }),
    { voice: elenaDay5Voices[30] },
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Aku tidak akan bahas besok.",
      en: "I won't bring it up tomorrow.",
      ja: "明日、その話はしない。",
      ko: "내일 이 얘긴 꺼내지 않을게.",
    }),
  ),
  narrate(
    tx({
      id: "Hening kembali turun.",
      en: "Silence settled over them again.",
      ja: "再び静けさが降りた。",
      ko: "다시 침묵이 내려앉았다.",
    }),
  ),
  narrate(
    tx({
      id: "Pelan-pelan, Elena bergeser mendekat. Arka menyadarinya, tapi tidak bergerak.",
      en: "Slowly, Elena shifted closer. Arka noticed, but didn't move.",
      ja: "ゆっくりと、エレナが少しずつ近づいてくる。アルカはそれに気づいたが、動かなかった。",
      ko: "천천히, 엘레나는 조금씩 가까이 다가왔다. 아르카는 그걸 알아차렸지만 움직이지 않았다.",
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
      id: "Elena tidak menjawab. Ia hanya condong ke arahnya, lalu memeluknya.",
      en: "Elena didn't answer. She just leaned toward him, then wrapped her arms around him.",
      ja: "エレナは答えず、そのまま彼の方へ体を預けて抱きついた。",
      ko: "엘레나는 대답하지 않았다. 그저 그의 쪽으로 기울더니 그대로 그를 끌어안았다.",
    }),
  ),
  narrate(
    tx({
      id: "Arka membeku. Kedua tangannya terangkat sedikit, bingung harus berbuat apa.",
      en: "Arka froze. His hands lifted slightly, unsure what he was supposed to do.",
      ja: "アルカは固まった。両手が少しだけ上がる。どうするべきかわからないまま。",
      ko: "아르카는 얼어붙었다. 두 손이 조금 들렸지만, 어떻게 해야 할지 몰랐다.",
    }),
  ),
  narrate(
    tx({
      id: "Elena bergumam di bahunya.",
      en: "Elena murmured against his shoulder.",
      ja: "エレナは彼の肩口で小さくつぶやいた。",
      ko: "엘레나는 그의 어깨에 얼굴을 묻고 작게 중얼거렸다.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Diam saja.",
      en: "Just stay still.",
      ja: "黙ってて。",
      ko: "가만히 있어.",
    }),
    { voice: elenaDay5Voices[31] },
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Aku diam.",
      en: "I'm staying still.",
      ja: "黙ってる。",
      ko: "가만히 있을게.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Jangan bergerak.",
      en: "Don't move.",
      ja: "動かないで。",
      ko: "움직이지 마.",
    }),
    { voice: elenaDay5Voices[32] },
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Oke.",
      en: "Okay.",
      ja: "わかった。",
      ko: "알겠어.",
    }),
  ),
  narrate(
    tx({
      id: "Arka tidak memeluk balik. Ia hanya membiarkan Elena bersandar.",
      en: "Arka didn't hug her back. He just let Elena lean against him.",
      ja: "アルカは抱き返さなかった。ただエレナが寄りかかるままにしていた。",
      ko: "아르카는 마주 안아주지 않았다. 그저 엘레나가 기대도록 내버려 두었다.",
    }),
  ),
  narrate(
    tx({
      id: "Beberapa detik berlalu.",
      en: "A few seconds passed.",
      ja: "数秒が過ぎた。",
      ko: "몇 초가 흘렀다.",
    }),
  ),
  narrate(
    tx({
      id: "Arka berkata pelan.",
      en: "Arka spoke quietly.",
      ja: "アルカは静かに口を開いた。",
      ko: "아르카는 조용히 말했다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Elena, kamu lagi mabuk. Aku harus hati-hati.",
      en: "Elena, you're drunk. I have to be careful.",
      ja: "エレナ、今は酔ってる。だから俺は気をつけないといけない。",
      ko: "엘레나, 지금 너 취했어. 그래서 난 조심해야 해.",
    }),
  ),
  narrate(
    tx({
      id: "Elena membuka mata sedikit.",
      en: "Elena opened her eyes a little.",
      ja: "エレナは少しだけ目を開けた。",
      ko: "엘레나는 눈을 조금 떴다.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Kamu selalu hati-hati.",
      en: "You're always careful.",
      ja: "あなた、いつも慎重ね。",
      ko: "넌 항상 조심스럽지.",
    }),
    { voice: elenaDay5Voices[33] },
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Sekarang harus.",
      en: "Right now I have to be.",
      ja: "今は特にそうしないと。",
      ko: "지금은 그래야 해.",
    }),
  ),
  narrate(
    tx({
      id: "Elena terdiam, lalu pelukannya sedikit mengendur.",
      en: "Elena fell quiet, then her embrace loosened a little.",
      ja: "エレナは黙り込み、それから腕の力を少しだけ緩めた。",
      ko: "엘레나는 조용해졌고, 이내 팔에 들어간 힘이 조금 풀렸다.",
    }),
  ),
  say(
    "elena",
    "drunk",
    tx({
      id: "Sebentar saja.",
      en: "Just for a little while.",
      ja: "少しだけでいいの。",
      ko: "잠깐만이야.",
    }),
    { voice: elenaDay5Voices[34] },
  ),
  narrate(
    tx({
      id: "Arka menatap ke depan, lalu mengangguk pelan.",
      en: "Arka stared ahead, then nodded slowly.",
      ja: "アルカは前を見つめたまま、ゆっくりうなずいた。",
      ko: "아르카는 앞을 바라본 채 천천히 고개를 끄덕였다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Oke. Sebentar saja.",
      en: "Okay. Just for a little while.",
      ja: "わかった。少しだけ。",
      ko: "알겠어. 잠깐만.",
    }),
  ),
];
