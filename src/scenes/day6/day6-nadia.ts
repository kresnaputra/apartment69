import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, centeredText, hide, jump, menu, narrate, say, setFlag, show } from "@/scenes/scriptTypes";
import bedroomAfternoonUrl from "@/background/bedroom-afteroon.png";
import nadiaHallwayUrl from "@/background/nadia-hallway.png";
import nadiaRoomUrl from "@/background/nadia-room.png";
import { addNadiaDay5To6Voices } from "@/voice/nadia/day5to6";

export const day6NadiaScene: VisualNovelCommand[] = addNadiaDay5To6Voices([
  bg(
    bedroomAfternoonUrl,
    tx({
      id: "Apartment 69 - Unit 302, Siang",
      en: "Apartment 69 - Unit 302, Afternoon",
      ja: "Apartment 69 - 302号室、昼",
      ko: "Apartment 69 - 302호, 낮",
    }),
  ),
  show("arka-day6-nadia", "arka", "neutral", {
    position: "left",
    enterFrom: "fade",
  }),
  narrate(tx({
    id: "Siang hari. Arka sedang di unitnya ketika ponsel bergetar.",
    en: "It is afternoon. Arka is in his unit when his phone vibrates.",
    ja: "昼下がり。アルカが自分の部屋にいると、スマホが震えた。",
    ko: "낮. 아르카가 자기 방에 있을 때 휴대폰이 울렸다.",
  })),
  say("nadia", "neutral", tx({
    id: "Arka. Kamu bisa naik sebentar? Aku udah bikin kopi.",
    en: "Arka. Can you come up for a bit? I made coffee.",
    ja: "アルカ。ちょっと上に来れる？ コーヒー淹れたから。",
    ko: "아르카. 잠깐 올라올 수 있어? 커피 타 놨어.",
  })),
  say("arka", "neutral", tx({
    id: "Oke. Lima menit.",
    en: "Okay. Five minutes.",
    ja: "わかった。五分で行く。",
    ko: "알았어. 5분이면 돼.",
  })),
  bg(
    nadiaHallwayUrl,
    tx({
      id: "Apartment 69 - Depan Unit 102, Siang",
      en: "Apartment 69 - Outside Unit 102, Afternoon",
      ja: "Apartment 69 - 102号室前、昼",
      ko: "Apartment 69 - 102호 앞, 낮",
    }),
  ),
  narrate(tx({
    id: "Beberapa menit kemudian Arka tiba di unit 102. Nadia membuka pintu dengan wajah yang lebih serius dari biasanya. Rambutnya diikat asal, dan dia memakai hoodie longgar.",
    en: "A few minutes later, Arka arrives at Unit 102. Nadia opens the door looking more serious than usual. Her hair is tied up carelessly, and she is wearing a loose hoodie.",
    ja: "数分後、アルカは102号室に着いた。ドアを開けたナディアは、いつもより真剣な顔をしていた。髪は無造作に結ばれ、ゆったりしたパーカーを着ている。",
    ko: "몇 분 후, 아르카는 102호에 도착했다. 문을 연 나디아는 평소보다 진지한 표정이었다. 머리는 대충 묶었고 헐렁한 후드티를 입고 있었다.",
  })),
  show("nadia-day6", "nadia", "neutral", {
    position: "center",
    enterFrom: "right",
  }),
  say("nadia", "neutral", tx({
    id: "Masuk.",
    en: "Come in.",
    ja: "入って。",
    ko: "들어와.",
  })),
  bg(
    nadiaRoomUrl,
    tx({
      id: "Apartment 69 - Unit 102, Siang",
      en: "Apartment 69 - Unit 102, Afternoon",
      ja: "Apartment 69 - 102号室、昼",
      ko: "Apartment 69 - 102호, 낮",
    }),
  ),
  narrate(tx({
    id: "Di dalam, dua gelas kopi sudah tersaji di meja kecil depan sofa. Nadia duduk lebih dulu, lalu menatap Arka saat dia duduk di sebelahnya.",
    en: "Inside, two cups of coffee are waiting on the small table in front of the sofa. Nadia sits first, then watches Arka as he takes the seat beside her.",
    ja: "中では、ソファ前の小さなテーブルにコーヒーが二杯用意されていた。ナディアが先に座り、隣に腰を下ろすアルカを見つめる。",
    ko: "안에는 소파 앞 작은 테이블에 커피 두 잔이 준비되어 있었다. 나디아가 먼저 앉고, 옆에 앉는 아르카를 바라보았다.",
  })),
  say("nadia", "neutral", tx({
    id: "Kemarin aku bilang mau nanya sesuatu.",
    en: "Yesterday I said I wanted to ask you something.",
    ja: "昨日、聞きたいことがあるって言ったよね。",
    ko: "어제 물어볼 게 있다고 했잖아.",
  })),
  say("arka", "neutral", tx({
    id: "Iya.",
    en: "Yeah.",
    ja: "ああ。",
    ko: "응.",
  })),
  narrate(tx({
    id: "Nadia mengangkat kopinya, tapi tidak langsung minum. Ia hanya memegang gelas itu sambil menatap ke depan.",
    en: "Nadia lifts her coffee but does not drink it. She simply holds the cup while staring straight ahead.",
    ja: "ナディアはコーヒーを持ち上げたが、すぐには飲まなかった。カップを手にしたまま、正面を見つめている。",
    ko: "나디아는 커피를 들었지만 바로 마시지는 않았다. 잔을 든 채 앞만 바라보았다.",
  })),
  say("nadia", "neutral", tx({
    id: "Aku udah cek angka stream kemarin lagi. Engagement-nya masih tinggi. Banyak yang nunggu part 2.",
    en: "I checked yesterday's stream numbers again. The engagement is still high. A lot of people are waiting for part two.",
    ja: "昨日の配信の数字をもう一度確認した。反応はまだ高いし、パート2を待ってる人も多い。",
    ko: "어제 방송 수치를 다시 확인했어. 반응은 아직도 높고, 2편을 기다리는 사람도 많아.",
  })),
  say("arka", "serious", tx({
    id: "Kamu sudah putusin mau ngapain?",
    en: "Have you decided what you want to do?",
    ja: "どうするか決めた？",
    ko: "어떻게 할지 정했어?",
  })),
  say("nadia", "neutral", tx({
    id: "Belum. Makanya aku panggil kamu.",
    en: "Not yet. That's why I called you.",
    ja: "まだ。だからあなたを呼んだの。",
    ko: "아직. 그래서 널 부른 거야.",
  })),
  narrate(tx({
    id: "Ia menoleh ke Arka.",
    en: "She turns toward Arka.",
    ja: "彼女はアルカのほうを向いた。",
    ko: "그녀는 아르카를 바라보았다.",
  })),
  say("nadia", "neutral", tx({
    id: "Aku bingung. Bagian dari aku bilang lanjut aja, karena hasilnya bagus. Tapi bagian lain… takut.",
    en: "I'm torn. Part of me says to keep going because the results are good. But another part... is scared.",
    ja: "迷ってる。結果がいいんだから続ければいいって思う自分もいる。でも、もう一人の自分は…怖がってる。",
    ko: "혼란스러워. 결과가 좋으니 계속하자는 마음도 있어. 하지만 다른 한편으로는… 무서워.",
  })),
  say("arka", "serious", tx({
    id: "Takut apa?",
    en: "Scared of what?",
    ja: "何が怖い？",
    ko: "뭐가 무서운데?",
  })),
  say("nadia", "neutral", tx({
    id: "Takut aku kebawa arus. Takut suatu saat aku nggak bisa bedain lagi antara yang aku mau sama yang cuma bikin angka naik.",
    en: "I'm scared I'll get swept along. Scared that one day I won't be able to tell the difference between what I want and what only makes the numbers go up.",
    ja: "流されてしまうのが怖い。いつか、自分が本当に望んでることと、数字を伸ばすだけのことの区別がつかなくなるのが怖い。",
    ko: "흐름에 휩쓸릴까 봐 무서워. 언젠가 내가 원하는 것과 숫자만 올려 주는 것을 구분하지 못하게 될까 봐.",
  })),
  narrate(tx({
    id: "Nadia menghela napas pelan.",
    en: "Nadia lets out a slow breath.",
    ja: "ナディアは静かに息を吐いた。",
    ko: "나디아는 천천히 한숨을 내쉬었다.",
  })),
  say("nadia", "neutral", tx({
    id: "Makanya aku mau denger pendapat kamu. Jujur aja.",
    en: "That's why I want your opinion. Just be honest.",
    ja: "だから、あなたの意見を聞きたい。正直に言って。",
    ko: "그래서 네 의견을 듣고 싶어. 솔직하게 말해 줘.",
  })),
  narrate(tx({
    id: "Ia menatap Arka langsung.",
    en: "She looks directly at Arka.",
    ja: "彼女はまっすぐアルカを見つめた。",
    ko: "그녀는 아르카를 똑바로 바라보았다.",
  })),
  say("nadia", "neutral", tx({
    id: "Menurutmu… aku lebih cocok tetap streaming biasa, atau aku harus coba jadi streamer dewasa?",
    en: "What do you think... am I better off staying a regular streamer, or should I try becoming an adult streamer?",
    ja: "あなたはどう思う…私は普通の配信を続けるほうが向いてる？ それともアダルト配信者に挑戦するべき？",
    ko: "네 생각은 어때… 나는 평범한 방송을 계속하는 게 더 어울려, 아니면 성인 스트리머에 도전해야 할까?",
  })),
  menu(
    tx({
      id: "Apa yang harus Nadia lakukan?",
      en: "What should Nadia do?",
      ja: "ナディアはどうするべきだろう？",
      ko: "나디아는 어떻게 해야 할까?",
    }),
    [
      {
        id: "nadia-good-path",
        label: tx({
          id: "Kamu lebih cocok streaming biasa.",
          en: "You're better suited to regular streaming.",
          ja: "普通の配信のほうが向いてる。",
          ko: "평범한 방송이 더 잘 어울려.",
        }),
        next: "day6-nadia-good-path",
      },
      {
        id: "nadia-bad-path",
        label: tx({
          id: "Mungkin kamu lebih cocok mencoba konten dewasa.",
          en: "Maybe you're better suited to trying adult content.",
          ja: "アダルトコンテンツを試すほうが向いてるかもしれない。",
          ko: "성인 콘텐츠를 해 보는 게 더 맞을지도 몰라.",
        }),
        next: "day6-nadia-bad-path",
      },
    ],
  ),
], 0);

export const day6NadiaGoodPathScene: VisualNovelCommand[] = addNadiaDay5To6Voices([
  say("arka", "serious", tx({
    id: "Kamu lebih cocok streaming biasa.",
    en: "You're better suited to regular streaming.",
    ja: "普通の配信のほうが向いてる。",
    ko: "평범한 방송이 더 잘 어울려.",
  })),
  narrate(tx({
    id: "Nadia terdiam cukup lama. Ekspresinya sulit dibaca.",
    en: "Nadia stays silent for a long moment. Her expression is difficult to read.",
    ja: "ナディアは長い間黙り込んだ。その表情から感情を読み取るのは難しかった。",
    ko: "나디아는 한동안 말이 없었다. 표정을 읽기 어려웠다.",
  })),
  say("nadia", "neutral", tx({
    id: "…Kenapa?",
    en: "...Why?",
    ja: "…どうして？",
    ko: "…왜?",
  })),
  say("arka", "serious", tx({
    id: "Karena kemarin malam kamu sendiri yang bilang takut. Kalau kamu sudah ragu dari sekarang, nanti bakal lebih susah berhenti.",
    en: "Because last night you said yourself that you were scared. If you're already unsure now, it will be even harder to stop later.",
    ja: "昨夜、自分で怖いって言ってただろ。今の時点でもう迷ってるなら、後になればやめるのはもっと難しくなる。",
    ko: "어젯밤 네가 직접 무섭다고 했잖아. 지금부터 망설인다면 나중에는 멈추기가 더 어려워질 거야.",
  })),
  narrate(tx({
    id: "Nadia menunduk, lalu tersenyum kecil pahit.",
    en: "Nadia lowers her gaze, then gives a small, bitter smile.",
    ja: "ナディアはうつむき、少し苦い笑みを浮かべた。",
    ko: "나디아는 고개를 숙인 뒤 씁쓸하게 작게 웃었다.",
  })),
  say("nadia", "smile", tx({
    id: "Kamu selalu jujur ya.",
    en: "You're always honest, aren't you?",
    ja: "あなたって、いつも正直だね。",
    ko: "넌 항상 솔직하네.",
  })),
  narrate(tx({
    id: "Ia menghela napas panjang.",
    en: "She lets out a long breath.",
    ja: "彼女は長く息を吐いた。",
    ko: "그녀는 길게 한숨을 내쉬었다.",
  })),
  say("nadia", "neutral", tx({
    id: "Oke. Aku coba dengerin kamu. Aku nggak akan lanjut ke arah itu… untuk sekarang.",
    en: "Okay. I'll listen to you. I won't keep going in that direction... for now.",
    ja: "わかった。あなたの言うことを聞いてみる。あっちの方向には進まない…今のところは。",
    ko: "알았어. 네 말을 들어 볼게. 그쪽 방향으로는 가지 않을 거야… 지금은.",
  })),
  say("nadia", "smile", tx({
    id: "Tapi kalau suatu saat angka aku anjlok parah, jangan kaget kalau aku tanya lagi.",
    en: "But if my numbers ever crash badly, don't be surprised if I ask again.",
    ja: "でも、いつか数字がひどく落ちたら、また聞いても驚かないでね。",
    ko: "하지만 언젠가 수치가 크게 떨어지면 내가 다시 물어봐도 놀라지 마.",
  })),
  say("arka", "gentle", tx({
    id: "Selama kamu masih nanya, berarti kamu masih sadar.",
    en: "As long as you're still asking, it means you're still aware of yourself.",
    ja: "まだ誰かに聞けるうちは、自分を見失ってないってことだ。",
    ko: "계속 물어볼 수 있다는 건 아직 스스로를 잃지 않았다는 뜻이야.",
  })),
  narrate(tx({
    id: "Nadia menatapnya sebentar, lalu mengangguk pelan.",
    en: "Nadia looks at him for a moment, then nods slowly.",
    ja: "ナディアはしばらく彼を見つめ、それからゆっくりとうなずいた。",
    ko: "나디아는 잠시 그를 바라보다가 천천히 고개를 끄덕였다.",
  })),
  say("nadia", "smile", tx({
    id: "Makasih, Arka.",
    en: "Thank you, Arka.",
    ja: "ありがとう、アルカ。",
    ko: "고마워, 아르카.",
  })),
  setFlag("nadiaRoutePath", "good"),
  setFlag("nadiaGoodPathLocked", true),
  setFlag("nadiaAffection", 7),
  centeredText(tx({
    id: "SYSTEM: NADIA ROUTE - GOOD PATH LOCKED",
    en: "SYSTEM: NADIA ROUTE - GOOD PATH LOCKED",
    ja: "SYSTEM: ナディアルート - GOOD PATH 確定",
    ko: "SYSTEM: 나디아 루트 - GOOD PATH 확정",
  }), { size: "sub" }),
  centeredText(tx({
    id: "NADIA AFFECTION +2",
    en: "NADIA AFFECTION +2",
    ja: "ナディアの好感度 +2",
    ko: "나디아 호감도 +2",
  }), { size: "sub" }),
  jump("day6-nadia-ending"),
], 9);

export const day6NadiaBadPathScene: VisualNovelCommand[] = addNadiaDay5To6Voices([
  say("arka", "serious", tx({
    id: "Mungkin kamu memang lebih cocok coba konten dewasa.",
    en: "Maybe you really are better suited to trying adult content.",
    ja: "もしかしたら、本当にアダルトコンテンツを試すほうが向いてるのかもしれない。",
    ko: "어쩌면 너는 정말 성인 콘텐츠를 해 보는 게 더 잘 맞을지도 몰라.",
  })),
  narrate(tx({
    id: "Nadia membelalakkan mata sebentar, lalu tertawa kecil, tapi suaranya terdengar tegang.",
    en: "Nadia's eyes widen briefly. She lets out a small laugh, but her voice sounds tense.",
    ja: "ナディアは一瞬目を見開き、それから小さく笑った。しかし、その声には緊張がにじんでいた。",
    ko: "나디아는 잠시 눈을 크게 뜬 뒤 작게 웃었지만, 목소리에는 긴장이 묻어났다.",
  })),
  say("nadia", "neutral", tx({
    id: "…Kamu serius?",
    en: "...Are you serious?",
    ja: "…本気で言ってる？",
    ko: "…진심이야?",
  })),
  say("arka", "serious", tx({
    id: "Kamu sendiri yang bilang rasanya enak. Engagement-nya juga jelas mendukung.",
    en: "You said yourself that it felt good. The engagement clearly supports it too.",
    ja: "気持ちよかったって自分で言ってただろ。反応の数字も明らかに後押ししてる。",
    ko: "기분이 좋았다고 네가 직접 말했잖아. 반응 수치도 분명히 뒷받침하고 있고.",
  })),
  narrate(tx({
    id: "Nadia terdiam. Tangannya meremas gelas kopi.",
    en: "Nadia falls silent. Her hand tightens around the coffee cup.",
    ja: "ナディアは黙り込んだ。コーヒーカップを握る手に力が入る。",
    ko: "나디아는 말이 없어졌다. 커피잔을 쥔 손에 힘이 들어갔다.",
  })),
  say("nadia", "neutral", tx({
    id: "Aku kira kamu bakal bilang sebaliknya.",
    en: "I thought you'd say the opposite.",
    ja: "反対のことを言うと思ってた。",
    ko: "네가 반대로 말할 줄 알았어.",
  })),
  narrate(tx({
    id: "Ia tersenyum, tapi senyumnya berbeda dari biasanya—lebih gelap dan penuh pertimbangan.",
    en: "She smiles, but it is different from usual—darker and full of calculation.",
    ja: "彼女は笑った。しかし、いつもの笑顔とは違う。より暗く、何かを深く計算しているような笑みだった。",
    ko: "그녀는 웃었지만 평소와는 다른 미소였다. 더 어둡고 깊은 생각이 담겨 있었다.",
  })),
  say("nadia", "smile", tx({
    id: "Kalau gitu… aku butuh bantuan kamu lagi.",
    en: "In that case... I need your help again.",
    ja: "それなら…またあなたの助けが必要。",
    ko: "그렇다면… 네 도움이 또 필요해.",
  })),
  say("arka", "serious", tx({
    id: "Bantuan apa?",
    en: "What kind of help?",
    ja: "何を手伝えばいい？",
    ko: "무슨 도움?",
  })),
  say("nadia", "neutral", tx({
    id: "Aku mau naik lebih cepat. Tapi aku nggak bisa kerjain semuanya sendiri. Ada beberapa hal yang harus diatur biar engagement-nya makin gila.",
    en: "I want to grow faster. But I can't do everything alone. There are things we need to arrange to push the engagement even higher.",
    ja: "もっと早く伸びたい。でも全部を一人ではできない。反応をさらに上げるために、いくつか調整しなきゃいけないことがある。",
    ko: "더 빨리 성장하고 싶어. 하지만 혼자서 전부 할 수는 없어. 반응을 더 폭발시키려면 몇 가지를 조정해야 해.",
  })),
  narrate(tx({
    id: "Nadia menatap Arka serius.",
    en: "Nadia looks at Arka seriously.",
    ja: "ナディアは真剣な目でアルカを見つめた。",
    ko: "나디아는 진지하게 아르카를 바라보았다.",
  })),
  say("nadia", "neutral", tx({
    id: "Kamu mau bantu aku nggak?",
    en: "Will you help me?",
    ja: "手伝ってくれる？",
    ko: "나를 도와줄래?",
  })),
  setFlag("nadiaRoutePath", "bad"),
  setFlag("nadiaBadPathLocked", true),
  setFlag("engagementBoostUnlocked", true),
  setFlag("nadiaAffection", 6),
  centeredText(tx({
    id: "SYSTEM: NADIA ROUTE - BAD PATH LOCKED",
    en: "SYSTEM: NADIA ROUTE - BAD PATH LOCKED",
    ja: "SYSTEM: ナディアルート - BAD PATH 確定",
    ko: "SYSTEM: 나디아 루트 - BAD PATH 확정",
  }), { size: "sub" }),
  centeredText(tx({
    id: "MINIGAME ‘ENGAGEMENT BOOST’ TERBUKA",
    en: "MINIGAME ‘ENGAGEMENT BOOST’ UNLOCKED",
    ja: "ミニゲーム『ENGAGEMENT BOOST』開放",
    ko: "미니게임 ‘ENGAGEMENT BOOST’ 해금",
  }), { size: "sub" }),
  centeredText(tx({
    id: "NADIA AFFECTION +1",
    en: "NADIA AFFECTION +1",
    ja: "ナディアの好感度 +1",
    ko: "나디아 호감도 +1",
  }), { size: "sub" }),
  jump("day6-nadia-ending"),
], 14);

export const day6NadiaEndingScene: VisualNovelCommand[] = addNadiaDay5To6Voices([
  narrate(tx({
    id: "Nadia menghabiskan kopinya, lalu berdiri.",
    en: "Nadia finishes her coffee, then stands.",
    ja: "ナディアはコーヒーを飲み干し、立ち上がった。",
    ko: "나디아는 커피를 다 마시고 자리에서 일어났다.",
  })),
  say("nadia", "neutral", tx({
    id: "Aku nggak bakalan maksa. Tapi keputusan ini… aku bakalan ingat.",
    en: "I won't force anything. But this decision... I'll remember it.",
    ja: "無理強いはしない。でも、この決断は…覚えておく。",
    ko: "강요하지는 않을게. 하지만 이 결정은… 기억할 거야.",
  })),
  narrate(tx({
    id: "Ia mengantar Arka sampai ke pintu.",
    en: "She walks Arka to the door.",
    ja: "彼女はアルカを玄関まで見送った。",
    ko: "그녀는 아르카를 문 앞까지 배웅했다.",
  })),
  say("nadia", "smile", tx({
    id: "Hati-hati di jalan.",
    en: "Be careful on your way back.",
    ja: "気をつけて帰ってね。",
    ko: "조심해서 가.",
  })),
  bg(
    nadiaHallwayUrl,
    tx({
      id: "Apartment 69 - Koridor Unit 102, Siang",
      en: "Apartment 69 - Unit 102 Corridor, Afternoon",
      ja: "Apartment 69 - 102号室前の廊下、昼",
      ko: "Apartment 69 - 102호 복도, 낮",
    }),
  ),
  hide("nadia-day6", "fadeAway"),
  narrate(tx({
    id: "Setelah pintu tertutup, Arka berdiri di koridor cukup lama.",
    en: "After the door closes, Arka stands in the corridor for a long time.",
    ja: "ドアが閉まったあと、アルカはしばらく廊下に立ち尽くしていた。",
    ko: "문이 닫힌 뒤, 아르카는 한동안 복도에 서 있었다.",
  })),
  narrate(tx({
    id: "Satu kalimat.",
    en: "One sentence.",
    ja: "たった一言。",
    ko: "한마디.",
  }), "arka"),
  narrate(tx({
    id: "Tapi rasanya baru saja menentukan arah dia ke depan.",
    en: "But it feels like I just decided the direction of her future.",
    ja: "それなのに、彼女のこれから進む方向を決めてしまったような気がする。",
    ko: "하지만 방금 그녀가 앞으로 나아갈 방향을 정해 버린 것만 같다.",
  }), "arka"),
  hide("arka-day6-nadia", "fadeAway"),
  setFlag("day6NadiaCompleted", true),
], 19);
