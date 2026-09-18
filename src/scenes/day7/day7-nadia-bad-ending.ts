import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  blackScreen,
  centeredText,
  clearBlackScreen,
  cutScene,
  hide,
  narrate,
  scene,
  setFlag,
} from "@/scenes/scriptTypes";
import bedroomNightUrl from "@/background/bedroom-night.png";
import nadiaBad1 from "@/cut-scene/nadia-bad-1.webm";
import nadiaBad2 from "@/cut-scene/nadia-bad-2.webm";
import nadiaBad3 from "@/cut-scene/nadia-bad-3.webm";
import nadiaBad5 from "@/cut-scene/nadia-bad-5.webm";
import nadiaBad6 from "@/cut-scene/nadia-bad-6.webm";
import nadiaBad7 from "@/cut-scene/nadia-bad-7.webm";
import nadiaBad8 from "@/cut-scene/nadia-bad-8.webm";
import nadiaBad9 from "@/cut-scene/nadia-bad-9.webm";

import nadiaBad2Sound from "@/voice/nadia/nadia-bad-2.wav";
import nadiaBad3Sound from "@/voice/nadia/nadia-bad-3.wav";
import nadiaBad5Sound from "@/voice/nadia/nadia-bad-5.wav";
import nadiaBad6Sound from "@/voice/nadia/nadia-bad-6.wav";
import nadiaBad7Sound from "@/voice/nadia/nadia-bad-7.wav";
import nadiaBad8Sound from "@/voice/nadia/nadia-bad-8.wav";
import nadiaBad9Sound from "@/voice/nadia/nadia-bad-9.wav";

export const day7NadiaBadEndingScene: VisualNovelCommand[] = [
  hide("arka-day6-nadia"),
  hide("nadia-day6"),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", "", 1000),
  centeredText(
    tx({
      id: "SATU TAHUN KEMUDIAN",
      en: "ONE YEAR LATER",
      ja: "1年後",
      ko: "1년 후",
    }),
    { size: "hero" },
  ),
  bg(
    bedroomNightUrl,
    tx({
      id: "Apartment 69 - Unit 302, Malam",
      en: "Apartment 69 - Unit 302, Night",
      ja: "Apartment 69 - 302号室、夜",
      ko: "Apartment 69 - 302호, 밤",
    }),
  ),
  narrate(
    tx({
      id: "Satu tahun.",
      en: "One year.",
      ja: "一年。",
      ko: "1년.",
    }),
  ),
  narrate(
    tx({
      id: "Satu tahun sejak malam itu aku bilang dia mungkin lebih cocok coba konten dewasa.",
      en: "One year since the night I told her she might be better suited to trying adult content.",
      ja: "あの夜、アダルトコンテンツを試すほうが向いているかもしれないと言ってから、一年が経った。",
      ko: "그날 밤 내가 그녀에게 성인 콘텐츠가 더 잘 맞을지도 모른다고 말한 지 1년.",
    }),
  ),
  narrate(
    tx({
      id: "Satu kalimat. Tapi itu cukup untuk mengubah semuanya.",
      en: "One sentence. But it was enough to change everything.",
      ja: "たった一言。それで十分、すべてが変わった。",
      ko: "한마디였다. 하지만 그걸로 모든 게 바뀌기에 충분했다.",
    }),
  ),
  narrate(
    tx({
      id: "Awalnya dia masih ragu. Masih sering teleponku setiap kali selesai stream. Masih bilang “Aku cuma coba dulu”.",
      en: "At first she still hesitated. She still called me after every stream. She still said, “I'm just trying it for now.”",
      ja: "最初はまだ迷っていた。配信が終わるたびにまだ電話をかけてきた。「まずは試してみるだけ」と言い続けていた。",
      ko: "처음에는 아직 망설였다. 방송이 끝날 때마다 아직 전화를 했다. “일단 해보는 것뿐이야”라고 말하면서.",
    }),
  ),
  narrate(
    tx({
      id: "Tapi angka tidak pernah bohong. Engagement-nya meledak. Donasi masuk terus. Sponsor mulai datang dengan tawaran yang lebih besar… dan lebih dalam.",
      en: "But numbers never lie. Her engagement exploded. Donations kept coming in. Sponsors started arriving with bigger offers... and darker ones.",
      ja: "でも数字は嘘をつかない。反応は爆発し、投げ銭は止まりませんでした。スポンサーはより大きな…そしてより深い条件を携えて現れ始めた。",
      ko: "하지만 숫자는 거짓말하지 않는다. 반응이 폭발했다. 후원은 계속 들어왔다. 스폰서들은 더 큰… 그리고 더 깊은 제안을 들고 찾아오기 시작했다.",
    }),
  ),
  narrate(
    tx({
      id: "Pelan-pelan, dia berhenti menghubungiku.",
      en: "Slowly, she stopped contacting me.",
      ja: "少しずつ、彼女は連絡してこなくなった。",
      ko: "조금씩, 그녀는 내게 연락하지 않게 되었다.",
    }),
  ),
  narrate(
    tx({
      id: "Pelan-pelan, dia mulai terlihat berbeda di layar.",
      en: "Slowly, she started looking different on screen.",
      ja: "少しずつ、画面の中の彼女は別人のようになっていった。",
      ko: "조금씩, 화면 속 그녀는 달라 보이기 시작했다.",
    }),
  ),
  narrate(
    tx({
      id: "Aku melihatnya lagi. Bukan sebagai tetangga, tapi sebagai penonton.",
      en: "I saw her again. Not as a neighbor, but as a viewer.",
      ja: "俺はもう一度彼女を見た。隣人としてではなく、視聴者として。",
      ko: "나는 다시 그녀를 보았다. 이웃으로서가 아니라, 시청자로서.",
    }),
  ),
  narrate(
    tx({
      id: "Di layar, Nadia sedang live. Ruangan gelap dengan pencahayaan. Nadia duduk di tengah, hanya memakai lingerie terbuka. Di kanan dan kirinya, dua pria dewasa sudah menunggu.",
      en: "On screen, Nadia is live. The room is dark except for the lighting. She sits in the center, wearing only open lingerie. To her right and left, two adult men are already waiting.",
      ja: "画面の中で、ナディアはライブ配信中だった。部屋は暗く、照明だけが当たっている。彼女は中央に座り、開いたランジェリーだけを身につけていた。左右には、すでに二人の男が待っている。",
      ko: "화면 속에서 나디아는 라이브 중이었다. 방은 조명만 켜진 채 어두웠다. 그녀는 가운데 앉아 열린 란제리만 입고 있었다. 오른쪽과 왼쪽에는 이미 성인 남성 둘이 기다리고 있었다.",
    }),
  ),
  cutScene(nadiaBad1, true, [
    {
      text: tx({
        id: "Nadia: (ke kamera, suara rendah dan menggoda) “Hari ini spesial… aku nggak sendiri.”",
        en: "Nadia: (to the camera, low and seductive) “Today is special... I'm not alone.”",
        ja: "ナディア：（カメラに向けて、低く甘い声で）「今日は特別…私、一人じゃないの。」",
        ko: "나디아: (카메라를 향해, 낮고 유혹적인 목소리로) “오늘은 특별해… 나 혼자가 아니야.”",
      }),
    },
    {
      text: tx({
        id: "Ia menatap kamera dengan senyum yang sudah tidak lagi polos.",
        en: "She looks into the camera with a smile that is no longer innocent.",
        ja: "彼女はもう無垢ではない笑みを浮かべて、カメラを見つめた。",
        ko: "그녀는 더 이상 순수하지 않은 미소로 카메라를 바라보았다.",
      }),
    },
    {
      text: tx({
        id: "Nadia: “Kalian yang selalu minta kan… malam ini aku turutin.”",
        en: "Nadia: “You were always asking for it... tonight I'll give you what you wanted.”",
        ja: "ナディア：「ずっとお願いしてたでしょう…今夜は、その通りにしてあげる。」",
        ko: "나디아: “너희들이 계속 원했잖아… 오늘 밤은 들어줄게.”",
      }),
    },
    {
      text: tx({
        id: "Nadia: “Ayo donasi yang banyak yaa.”",
        en: "Nadia: “Come on. Donate a lot, okay?”",
        ja: "ナディア：「さあ、たくさん投げ銭してね。」",
        ko: "나디아: “자, 후원 많이 해 줘.”",
      }),
    },
  ]),
  cutScene(
    nadiaBad2,
    true,
    [
      {
        text: tx({
          id: "Nadia berlutut di antara kedua pria. Ia memegang milik mereka bergantian, lalu mulai memasukkan keduanya secara bergiliran ke dalam mulutnya.",
          en: "Nadia kneels between the two men. She takes them in her hands one after the other, then starts taking both of them into her mouth in turn.",
          ja: "ナディアは二人の男の間に跪く。交互に手で扱き、それから両方を順番に口へ含み始める。",
          ko: "나디아는 두 남자 사이에 무릎을 꿇는다. 번갈아 손으로 잡은 뒤, 둘을 차례로 입에 넣기 시작한다.",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Mmm… kalian berdua… besar banget…”",
          en: "Nadia: “Mmm... you two... are so big...”",
          ja: "ナディア：「んん…二人とも…すごく大きい…」",
          ko: "나디아: “음… 둘 다… 너무 커…”",
        }),
      },
      {
        text: tx({
          id: "Ia mencoba memasukkan keduanya lebih dalam.",
          en: "She tries to take both of them deeper.",
          ja: "彼女は両方をより深く口に入れようとする。",
          ko: "그녀는 둘을 더 깊이 넣으려 한다.",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Ngghh… susah… masuk semua…”",
          en: "Nadia: “Ngghh... it's hard... getting both of them in...”",
          ja: "ナディア：「んぐっ…難しい…全部入らない…」",
          ko: "나디아: “으응… 힘들어… 다 안 들어가…”",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Sabar… aku kerjain pelan-pelan…”",
          en: "Nadia: “Wait... I'll take my time with it...”",
          ja: "ナディア：「待って…ゆっくりやるから…」",
          ko: "나디아: “기다려… 천천히 할게…”",
        }),
      },
      {
        text: tx({
          id: "Lidahnya bergerak dari satu ke yang lain, sesekali mencoba menelan keduanya bersamaan.",
          en: "Her tongue moves from one to the other, occasionally trying to take both at once.",
          ja: "舌が片方からもう片方へと動き、時おり両方を同時に口に含めようとする。",
          ko: "혀가 한쪽에서 다른 쪽으로 움직이고, 가끔은 둘을 동시에 넣으려 한다.",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Mmmgh… enak… kalian berdua basah banget…”",
          en: "Nadia: “Mmmgh... it feels so good... you're both so wet...”",
          ja: "ナディア：「んんっ…気持ちいい…二人ともすごく濡れてる…」",
          ko: "나디아: “음… 좋아… 둘 다 너무 젖었어…”",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Jangan keluar dulu… aku belum selesai…”",
          en: "Nadia: “Don't come yet... I'm not finished...”",
          ja: "ナディア：「まだ出さないで…まだ終わってないから…」",
          ko: "나디아: “아직 나오지 마… 난 아직 안 끝났어…”",
        }),
      },
    ],
    false,
    nadiaBad2Sound,
  ),
  cutScene(
    nadiaBad3,
    true,
    [
      {
        text: tx({
          id: "Nadia naik ke atas salah satu pria dan memposisikan diri. Ia langsung bergerak dengan tempo cepat.",
          en: "Nadia climbs onto one of the men and positions herself. She immediately starts moving at a fast pace.",
          ja: "ナディアは片方の男の上に跨り、体勢を整える。すぐに速いリズムで動き始める。",
          ko: "나디아는 한 남자 위로 올라가 자세를 잡는다. 곧바로 빠른 속도로 움직이기 시작한다.",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Ahh… dalam banget… dari tadi aku nahan…”",
          en: "Nadia: “Ahh... it's so deep... I've been holding it in...”",
          ja: "ナディア：「あっ…深い…さっきから我慢してた…」",
          ko: "나디아: “아앗… 너무 깊어… 아까부터 참고 있었어…”",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Nggak usah pelan… aku mau cepet…”",
          en: "Nadia: “Don't go slow... I want it fast...”",
          ja: "ナディア：「ゆっくりしなくていい…早くして…」",
          ko: "나디아: “천천히 하지 마… 빠르게 해 줘…”",
        }),
      },
      {
        text: tx({
          id: "Ia menumpukan kedua tangannya di dada pria di bawahnya, pinggulnya naik-turun dengan cepat.",
          en: "She plants both hands on the man's chest beneath her, her hips rising and falling quickly.",
          ja: "下にいる男の胸に両手をつき、腰を素早く上下させる。",
          ko: "아래에 있는 남자의 가슴에 양손을 짚고, 허리를 빠르게 오르내린다.",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Ahh! Ahh! Enak… lebih dalam…”",
          en: "Nadia: “Ahh! Ahh! It feels so good... deeper...”",
          ja: "ナディア：「あっ！あっ！気持ちいい…もっと深く…」",
          ko: "나디아: “아앗! 아앗! 좋아… 더 깊게…”",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Jangan pegang pinggang aku…”",
          en: "Nadia: “Don't hold my waist...”",
          ja: "ナディア：「腰、掴まないで…」",
          ko: "나디아: “허리 잡지 마…”",
        }),
      },
    ],
    false,
    nadiaBad3Sound,
  ),
  cutScene(
    nadiaBad5,
    true,
    [
      {
        text: tx({
          id: "Tempo semakin liar. Napasnya sudah berantakan.",
          en: "The pace grows wilder. Her breathing is already ragged.",
          ja: "テンポはさらに荒くなる。彼女の呼吸はすでに乱れている。",
          ko: "템포는 더 거칠어진다. 그녀의 숨은 이미 흐트러져 있다.",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Nngghh… aku deket… aku mau keluar…”",
          en: "Nadia: “Nngghh... I'm close... I'm going to come...”",
          ja: "ナディア：「んぐっ…近い…イキそう…」",
          ko: "나디아: “으응… 가까워… 갈 것 같아…”",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Ahh! Terus… jangan berhenti…!”",
          en: "Nadia: “Ahh! Keep going... don't stop...!”",
          ja: "ナディア：「あっ！続けて…止めないで…！」",
          ko: "나디아: “아앗! 계속해… 멈추지 마…!”",
        }),
      },
    ],
    false,
    nadiaBad5Sound,
  ),
  cutScene(
    nadiaBad6,
    true,
    [
      {
        text: tx({
          id: "Nadia: “Aku… aku keluar… Nngghh…!!”",
          en: "Nadia: “I... I'm coming... Nngghh...!!”",
          ja: "ナディア：「私…イく…んぐっ…!!」",
          ko: "나디아: “나… 가… 으응…!!”",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Ahh - Ahh - Ahh”",
          en: "Nadia: “Ahh - Ahh - Ahh”",
          ja: "ナディア：「あっ…あっ…あっ」",
          ko: "나디아: “아앗 - 아앗 - 아앗”",
        }),
      },
    ],
    false,
    nadiaBad6Sound,
  ),
  cutScene(
    nadiaBad7,
    true,
    [
      {
        text: tx({
          id: "Nadia berdiri membungkuk, kedua tangannya bertumpu pada meja di depan kamera. Satu pria mengambil posisi dari belakang, sementara pria lainnya berdiri di depan dan menggunakan mulutnya.",
          en: "Nadia stands bent over, both hands braced on the table in front of the camera. One man takes her from behind while the other stands in front of her and uses her mouth.",
          ja: "ナディアは前かがみになり、カメラの前のテーブルに両手をつく。一人の男が後ろから入り、もう一人は前に立って口を使う。",
          ko: "나디아는 앞으로 숙인 채 카메라 앞 테이블에 양손을 짚는다. 한 남자는 뒤에서 들어가고, 다른 남자는 앞에 서서 입을 사용한다.",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Ngghh… mmph… dari belakang… dalam…”",
          en: "Nadia: “Ngghh... mmph... from behind... so deep...”",
          ja: "ナディア：「んぐっ…んっ…後ろから…深い…」",
          ko: "나디아: “으응… 읍… 뒤에서… 깊어…”",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Mmph…”",
          en: "Nadia: “Mmph...”",
          ja: "ナディア：「んっ…」",
          ko: "나디아: “읍…”",
        }),
      },
      {
        text: tx({
          id: "Kedua pria bergerak bersamaan dengan tempo cepat.",
          en: "Both men move together at a fast pace.",
          ja: "二人の男が速いテンポで同時に動く。",
          ko: "두 남자가 빠른 템포로 동시에 움직인다.",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Nngghh… mmph… dua-duanya… Ahh…!”",
          en: "Nadia: “Nngghh... mmph... both of them... Ahh...!”",
          ja: "ナディア：「んぐっ…んっ…両方…あっ…！」",
          ko: "나디아: “으응… 읍… 둘 다… 아앗…!”",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Mmph… lama-lama aku bisa gila…”",
          en: "Nadia: “Mmph... if this keeps going, I'll go crazy...”",
          ja: "ナディア：「んっ…このままじゃ、頭おかしくなりそう…」",
          ko: "나디아: “읍… 이러다 진짜 미쳐 버리겠어…”",
        }),
      },
    ],
    false,
    nadiaBad7Sound,
  ),
  cutScene(
    nadiaBad8,
    true,
    [
      {
        text: tx({
          id: "Gerakan semakin kasar dan cepat.",
          en: "The movements grow rougher and faster.",
          ja: "動きはさらに荒く、速くなる。",
          ko: "움직임은 더 거칠고 빨라진다.",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Ngghh… mmph… terus…!”",
          en: "Nadia: “Ngghh... mmph... keep going...!”",
          ja: "ナディア：「んぐっ…んっ…続けて…！」",
          ko: "나디아: “으응… 읍… 계속해…!”",
        }),
      },
      {
        text: tx({
          id: "Nadia: “Aku… mmph… mau keluar…!”",
          en: "Nadia: “I... mmph... I'm going to come...!”",
          ja: "ナディア：「私…んっ…イキそう…！」",
          ko: "나디아: “나… 읍… 갈 것 같아…!”",
        }),
      },
    ],
    false,
    nadiaBad8Sound,
  ),
  cutScene(
    nadiaBad9,
    true,
    [
      {
        text: tx({
          id: "Nadia: “Nngghh… mmph… keluar…!!”",
          en: "Nadia: “Nngghh... mmph... I'm coming...!!”",
          ja: "ナディア：「んぐっ…んっ…イく…!!」",
          ko: "나디아: “으응… 읍… 가…!!”",
        }),
      },
      {
        text: tx({
          id: "Tubuh Nadia gemetar hebat di antara kedua pria. Stream masih menyala menampilkan semuanya.",
          en: "Nadia's body trembles hard between the two men. The stream is still live, showing everything.",
          ja: "ナディアの体は二人の男の間で激しく震える。配信はまだ続いていて、すべてを映し出している。",
          ko: "나디아의 몸은 두 남자 사이에서 심하게 떨린다. 방송은 아직 켜져 있고 모든 것을 보여주고 있다.",
        }),
      },
    ],
    false,
    nadiaBad9Sound,
  ),
  blackScreen(),
  bg(
    bedroomNightUrl,
    tx({
      id: "Apartment 69 - Unit 302, Malam",
      en: "Apartment 69 - Unit 302, Night",
      ja: "Apartment 69 - 302号室、夜",
      ko: "Apartment 69 - 302호, 밤",
    }),
  ),
  narrate(
    tx({
      id: "Dia tersenyum di akhir stream.",
      en: "She smiled at the end of the stream.",
      ja: "配信の終わりに、彼女は笑っていた。",
      ko: "방송이 끝날 때, 그녀는 웃고 있었다.",
    }),
  ),
  narrate(
    tx({
      id: "Tersenyum seperti orang yang sudah menang.",
      en: "She smiled like someone who had already won.",
      ja: "もう勝った人間のように、笑っていた。",
      ko: "이미 이긴 사람처럼 웃고 있었다.",
    }),
  ),
  narrate(
    tx({
      id: "Tapi itu bukan senyum Nadia yang dulu.",
      en: "But that was no longer the smile of the Nadia I used to know.",
      ja: "でも、それは昔のナディアの笑顔じゃなかった。",
      ko: "하지만 그건 예전의 나디아의 미소가 아니었다.",
    }),
  ),
  narrate(
    tx({
      id: "Malam itu aku memilih kata yang salah…",
      en: "That night, I chose the wrong words...",
      ja: "あの夜、俺は間違った言葉を選んだ…",
      ko: "그날 밤 나는 잘못된 말을 골랐다…",
    }),
  ),
  narrate(
    tx({
      id: "Dan sekarang dia sudah terlalu jauh.",
      en: "And now she has already gone too far.",
      ja: "そして今、彼女はもう遠すぎるところまで行ってしまった。",
      ko: "그리고 지금, 그녀는 이미 너무 멀리 가 버렸다.",
    }),
  ),
  clearBlackScreen(),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", "", 1000),
  centeredText(
    tx({
      id: "BAD ENDING - NADIA",
      en: "BAD ENDING - NADIA",
      ja: "BAD ENDING - ナディア",
      ko: "BAD ENDING - 나디아",
    }),
    { size: "hero" },
  ),
  setFlag("nadiaBadEndingCompleted", true),
];
