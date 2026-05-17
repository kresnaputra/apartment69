import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  blackScreen,
  centeredText,
  clearBlackScreen,
  cutScene,
  hide,
  jumpIf,
  multiCutScene,
  narrate,
  playBgm,
  say,
  scene,
  setFlag,
  show,
} from "@/scenes/scriptTypes";
import bedroomNightUrl from "@/background/bedroom-night.png";
import { mayaDay1To4Voices } from "@/voice/maya/day1to4";
import mayaSpecialScene1 from "@/cut-scene/maya-special-scene-1.webm?url";
import mayaSpecialScene2 from "@/cut-scene/maya-special-scene-2.webm?url";
import mayaSpecialScene3 from "@/cut-scene/maya-special-scene-3.webm?url";
import mayaSpecialScene4 from "@/cut-scene/maya-special-scene-4.webm?url";
import mayaSpecial2Scene1 from "@/cut-scene/maya-special-2-scene-1.webm?url";
import mayaSpecial2Scene2 from "@/cut-scene/maya-special-2-scene-2.webm?url";
import mayaSpecial2Scene3 from "@/cut-scene/maya-special-2-scene-3.webm?url";
import mayaSpecial2Scene4 from "@/cut-scene/maya-special-2-scene-4.webm?url";
import mayaSpecial2Scene5 from "@/cut-scene/maya-special-2-scene-5.webm?url";
import mayaSpecial2Scene6 from "@/cut-scene/maya-special-2-scene-6.webm?url";
import mayaSpecialSceneNormal1 from "@/cut-scene/maya-special-scene-normal-1.webm?url";
import mayaSpecialSceneNormal2 from "@/cut-scene/maya-special-scene-normal-2.webm?url";
import mayaSpecialSceneNormal3 from "@/cut-scene/maya-special-scene-normal-3.webm?url";
import mayaSpecialSceneNormal4 from "@/cut-scene/maya-special-scene-normal-4.webm?url";
import mayaSpecialSceneNormal5 from "@/cut-scene/maya-special-scene-normal-5.webm?url";
import mayaSpecialSceneNormal6 from "@/cut-scene/maya-special-scene-normal-6.webm?url";
import mayaSpecialSceneNormal7 from "@/cut-scene/maya-special-scene-normal-7.webm?url";

// Sound
import mayaBadEndingSound from "@/voice/maya/maya-special-2-scene-1.wav";
import mayaBadEndingSound2 from "@/voice/maya/maya-special-2-scene-2.wav";
import mayaBadEndingSound3 from "@/voice/maya/maya-special-2-scene-3.wav";
import mayaBadEndingSound4 from "@/voice/maya/maya-special-2-scene-4.wav";
import mayaBadEndingSound5 from "@/voice/maya/maya-special-2-scene-5.wav";
import mayaBadEndingSound6 from "@/voice/maya/maya-special-2-scene-6.wav";

import mayaSpecialSceneSound1 from "@/voice/maya/maya-special-scene-1.wav";
import mayaSpecialSceneSound2 from "@/voice/maya/maya-special-scene-2.wav";
import mayaSpecialSceneSound3 from "@/voice/maya/maya-special-scene-3.wav";
import mayaSpecialSceneSound4 from "@/voice/maya/maya-special-scene-4.wav";

import mayaSpecialSceneNormalSound2 from "@/voice/maya/maya-special-scene-normal-2.wav";
import mayaSpecialSceneNormalSound3 from "@/voice/maya/maya-special-scene-normal-3.wav";
import mayaSpecialSceneNormalSound4 from "@/voice/maya/maya-special-scene-normal-4.wav";
import mayaSpecialSceneNormalSound5 from "@/voice/maya/maya-special-scene-normal-5.wav";
import mayaSpecialSceneNormalSound6 from "@/voice/maya/maya-special-scene-normal-6.wav";
import { isMobileDevice } from "@/lib/utils/deviceDetection";
import day7Bgm from "@/music/day7.mp3";

export const day7IntroScene: VisualNovelCommand[] = [
  playBgm(day7Bgm),
  bg(
    bedroomNightUrl,
    tx({
      id: "Unit 302 - 20:00",
      en: "Unit 302 - 20:00",
      ja: "302号室 - 20:00",
      ko: "302호 - 20:00",
    }),
  ),
  show("arka-day7", "arka", "neutral", {
    position: "left",
    enterFrom: "fade",
  }),
  narrate(
    tx({
      id: "Hujan turun cukup deras di luar. Arka sedang duduk santai di depan PC, suara hujan mengisi keheningan unitnya.",
      en: "Rain hammers steadily outside. Arka is sitting back at his PC, the sound of rain filling the quiet of his apartment.",
      ja: "外では雨がかなり激しく降っている。アルカはパソコンの前でのんびりと座っていて、部屋の静けさを雨音が満たしていた。",
      ko: "밖에 비가 꽤 세차게 내리고 있다. 아르카는 PC 앞에 편하게 앉아 있고, 빗소리가 방 안의 고요함을 채우고 있다.",
    }),
  ),
  narrate(
    tx({
      id: "Lalu terdengar ketukan pelan di pintunya.",
      en: "Then there's a soft knock at his door.",
      ja: "そのとき、ドアに静かなノックが響いた。",
      ko: "그때 문에서 조용한 노크 소리가 들린다.",
    }),
  ),
  jumpIf("arkaTookControl", "day7-devoted-submission", {
    value: true,
    elseTarget: "day7-eternal-promise",
  }),
];

export const day7DevotedSubmissionScene: VisualNovelCommand[] = [
  bg(
    bedroomNightUrl,
    tx({
      id: "Unit 302 - 20:00",
      en: "Unit 302 - 20:00",
      ja: "302号室 - 20:00",
      ko: "302호 - 20:00",
    }),
  ),
  show("maya-day7-devoted", "maya", "fallen", {
    position: "center",
    enterFrom: "fade",
    xOffset: 0.02,
    scale: isMobileDevice() ? 3.1 : 3.3,
  }),
  narrate(
    tx({
      id: "Maya masuk. Bukan piyama atau baju rapi seperti biasanya. Dia memakai tanktop yang cukup terbuka dan celana pendek. Kacamatanya tidak dipakai, dan rambutnya dibiarkan tergerai berantakan. Tatapannya kosong dari ambisi, tapi penuh pemujaan saat melihat Arka.",
      en: "Maya comes in. Not her usual pajamas or neat clothes. She's wearing a fairly open tank top and shorts. No glasses, and her hair falls loose and disheveled. Her eyes are empty of ambition, but full of adoration as they land on Arka.",
      ja: "マヤが入ってきた。いつものパジャマや小ぎれいな服装ではない。かなり開いたタンクトップとショートパンツ姿だ。眼鏡はなく、髪はぼさぼさに降ろされている。野心のかけらもない目でアルカを見つめ、しかし崇拝の色が満ちている。",
      ko: "마야가 들어왔다. 평소의 잠옷이나 단정한 옷차림이 아니다. 꽤 깊이 파인 탱크탑과 반바지 차림이다. 안경도 없고 머리카락은 헝클어진 채 내려져 있다. 눈빛에서 야망은 사라지고, 아르카를 바라보는 눈 가득 숭배가 담겨 있다.",
    }),
  ),
  say(
    "maya",
    "fallen",
    tx({
      id: "Arka... aku udah mikirin semuanya seharian ini. Papa udah blokir semua rekeningku. Kampus juga rasanya udah nggak penting lagi.",
      en: "Arka... I've been thinking about everything all day. Dad already blocked all my accounts. And school... it doesn't feel important anymore.",
      ja: "アルカ…今日一日ずっと考えてた。お父さんはもう口座を全部止めた。大学も、もうどうでもいい気がして。",
      ko: "아르카... 오늘 하루 종일 다 생각해봤어. 아빠가 계좌를 다 막았어. 학교도 이제 중요하지 않은 것 같아.",
    }),
    { voice: mayaDay1To4Voices[42] },
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Terus? Kamu mau nyerah gitu aja?",
      en: "And? You're just going to give up like that?",
      ja: "それで？ そのまま諦めるつもりか？",
      ko: "그래서? 그냥 포기할 거야?",
    }),
  ),
  narrate(
    tx({
      id: "Maya berjalan pelan mendekati Arka, lalu berlutut di lantai, tepat di sela kaki pria itu. Dia menyandarkan kepalanya di paha Arka.",
      en: "Maya walks slowly toward Arka, then kneels on the floor, right between his legs. She rests her head against his thigh.",
      ja: "マヤはゆっくりとアルカに近づき、その足の間にひざまずいた。そして頭を彼の膝に預ける。",
      ko: "마야가 천천히 아르카에게 다가가더니 그의 두 다리 사이 바닥에 무릎을 꿇는다. 그리고 그의 허벅지에 머리를 기댄다.",
    }),
  ),
  say(
    "maya",
    "fallen",
    tx({
      id: "Buat apa aku capek-capek jadi dokter kalau ujung-ujungnya cuma buat muasin ego Papa? Kemarin, kamu bilang kamu yang bakal tanggung jawab atas hidupku, kan? Sekarang... aku milikmu, Arka.",
      en: "What's the point of exhausting myself to become a doctor if it was all just to feed my dad's ego? Yesterday, you said you'd take responsibility for my life, right? So now... I'm yours, Arka.",
      ja: "お父さんのエゴを満たすためだけに必死になって医者になる意味なんてあるの？昨日、私の人生の責任を持つって言ったよね？だから今は…私はあなたのものよ、アルカ。",
      ko: "결국 아빠 자존심 채워주려고 의사가 되려고 지쳐가는 게 무슨 의미야? 어제 내 인생 책임지겠다고 했잖아, 맞지? 이제... 나는 아르카 거야.",
    }),
    { voice: mayaDay1To4Voices[43] },
  ),
  narrate(
    tx({
      id: "Arka mengangkat dagu Maya, menatap matanya tajam.",
      en: "Arka tilts Maya's chin up and looks straight into her eyes.",
      ja: "アルカはマヤの顎を持ち上げ、その目をまっすぐに見つめた。",
      ko: "아르카가 마야의 턱을 들어 올리며 눈을 날카롭게 들여다본다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Kamu sadar kan apa yang kamu omongin? Kalau kamu milih jalan ini, kamu nggak punya kendali lagi atas hidupmu sendiri.",
      en: "You know what you're saying? If you choose this path, you lose all control over your own life.",
      ja: "自分が何を言っているかわかってるか？その道を選んだら、自分の人生に一切の主導権はなくなる。",
      ko: "지금 무슨 말 하는지 알아? 이 길을 선택하면 네 삶에 대한 통제권은 완전히 사라져.",
    }),
  ),
  say(
    "maya",
    "fallen",
    tx({
      id: "Itu yang aku mau. Terlalu capek mikir buat diriku sendiri. Aku cuma mau jadi apa pun yang kamu mau. Atur aku, Arka.",
      en: "That's what I want. I'm too tired of thinking for myself. I just want to be whatever you want me to be. Take control of me, Arka.",
      ja: "それがしたいの。自分のことを考えるのがもう疲れた。あなたの望む何にでもなりたい。私を支配して、アルカ。",
      ko: "그게 내가 원하는 거야. 나 자신을 위해 생각하는 게 너무 지쳤어. 그냥 네가 원하는 무엇이든 되고 싶어. 나를 지배해줘, 아르카.",
    }),
    { voice: mayaDay1To4Voices[44] },
  ),
  narrate(
    tx({
      id: "Malam itu, dinamika di antara mereka benar-benar berubah. Arka menarik Maya berdiri dan membawanya ke kasur. Tidak ada keraguan atau kecanggungan seperti sebelumnya. Sesi hubungan badan malam itu didominasi penuh oleh Arka, dan setiap sentuhan diikuti oleh Maya dengan kepatuhan total. Maya melepaskan semua sisa beban dan harga dirinya, menemukan kenyamanan yang aneh dalam penyerahan diri sepenuhnya.",
      en: "That night, everything between them shifted completely. Arka pulls Maya up and leads her to the bed. No hesitation, no awkwardness like before. What follows is entirely on Arka's terms, and Maya follows every touch with total compliance. She lets go of every remaining scrap of burden and self-worth, finding a strange comfort in handing everything over.",
      ja: "その夜、ふたりの関係は完全に変わった。アルカはマヤを立たせてベッドへと連れていく。以前のような躊躇も気まずさもない。その夜の関係はアルカが完全に主導し、マヤはすべての触れ合いに従順に従い続けた。残っていた重荷と自尊心のすべてを手放し、完全な委託の中に奇妙な安らぎを見出す。",
      ko: "그날 밤, 둘 사이의 역학이 완전히 달라졌다. 아르카가 마야를 일으켜 침대로 데려간다. 전처럼 망설임이나 어색함은 없었다. 그날 밤은 완전히 아르카 주도로 진행되었고, 마야는 모든 접촉에 완전한 순종으로 따랐다. 남아 있던 모든 짐과 자존심을 내려놓으며 완전한 복종 속에서 묘한 안정감을 찾는다.",
    }),
  ),
  narrate(
    tx({
      id: "Aku ngelihat sisi mandirinya hilang malam ini. Dia bukan lagi mahasiswi kedokteran yang ambisius. Dia cuma cewek yang nyerahin seluruh hidupnya buat aku atur.",
      en: "I watched the last of her independence disappear tonight. She's not that ambitious med student anymore. She's just a girl who handed her whole life over for me to run.",
      ja: "今夜、彼女の自立心が消えていくのを見た。もはや野心に燃えた医学生ではない。自分の人生をすべて俺に委ねた、ただの女の子だ。",
      ko: "오늘 밤 그녀의 독립심이 사라지는 걸 눈으로 봤다. 더 이상 야망 넘치는 의대생이 아니다. 그냥 자기 삶 전체를 내게 맡겨버린 여자아이다.",
    }),
    "arka",
  ),
  narrate(
    tx({
      id: "Mungkin orang bakal bilang aku ngerusak masa depannya. Tapi ngelihat dia tunduk dan cuma peduli buat nyenengin aku... rasanya lebih memuaskan dari apa pun. Mulai sekarang, apartemen ini adalah satu-satunya dunia buat dia.",
      en: "Maybe people would say I wrecked her future. But watching her submit, caring only about what makes me satisfied... it's more fulfilling than anything else. From now on, this apartment is the only world she has.",
      ja: "彼女の未来を壊したと言う人もいるかもしれない。でも、彼女が従い、俺を喜ばせることだけを気にかけている様子を見ていると……何よりも満足できる。今からこのアパートが、彼女にとっての唯一の世界になる。",
      ko: "어쩌면 사람들은 내가 그녀의 미래를 망쳤다고 할 수도 있다. 하지만 그녀가 복종하고, 오직 나를 기쁘게 하는 것만 신경 쓰는 모습을 보면... 그 무엇보다 만족스럽다. 지금부터 이 아파트가 그녀에게 유일한 세계가 된다.",
    }),
    "arka",
  ),
  hide("maya-day7-devoted"),
  hide("arka-day7"),
  multiCutScene(
    [
      {
        id: "maya-special-scene-1",
        label: tx({
          id: "Gaya 1",
          en: "Style 1",
          ja: "スタイル1",
          ko: "스타일1",
        }),
        src: mayaSpecialScene1,
        loop: true,
        audioSrc: mayaSpecialSceneSound1,
        narrate: [
          tx({
            id: "Maya: Mmmghh... Arka... jangan cuma diam. Biarin aku rasain kamu. Aku udah nggak sabar...",
            en: "Maya: Mmmghh... Arka... don't just stay still. Let me feel you. I can't wait anymore...",
            ja: "Maya: んんっ... アルカ... じっとしてないで。あなたを感じさせて。もう待てない...",
            ko: "Maya: 음... 아르카... 가만히 있지만 마. 너를 느끼게 해줘. 더 이상 못 참겠어...",
          }),
          tx({
            id: "Arka: Nggak usah buru-buru. Aku yang ngatur temponya malam ini. Layanin dulu yang benar.",
            en: "Arka: Don't rush. I'll set the tempo tonight. Let's do it properly first.",
            ja: "アルカ：急がなくていい。今日はテンポを私がコントロールする。まずはちゃんとやろう。",
            ko: "아르카: 서둘 필요 없어. 오늘은 템포를 내가 조절할게. 먼저 제대로 해보자.",
          }),
        ],
      },
      {
        id: "maya-special-scene-2",
        label: tx({
          id: "Gaya 2",
          en: "Style 2",
          ja: "スタイル2",
          ko: "스타일2",
        }),
        src: mayaSpecialScene2,
        loop: true,
        audioSrc: mayaSpecialSceneSound2,
        narrate: tx({
          id: "Arka: Sumpah, perubahannya bikin merinding. Mahasiswi kedokteran yang kaku dan selalu ketakutan itu udah mati. Yang ada di bawahku sekarang cuma cewek binal yang kehilangan akal sehatnya. Tatapannya bener-bener kayak orang sakau, dan obatnya cuma aku.",
          en: "Arka: Seriously, the change is chilling. The rigid medical student who was always scared is dead. What's under me now is just a nymphomaniac who lost her sanity. Her gaze is absolutely like a drowning person's, and the only cure is me.",
          ja: "アルカ：本当に変化はぞっとする。いつも怯えていた医療学生はもう死んでいる。今、私の中にあるのはただの性欲の暴走した女だ。彼女の視線はまさに溺れる人のようだ。その唯一の薬は私だ。",
          ko: "아르카: 진짜 변하는 게 뼈저리다. 항상 두려워했던 의과대학생은 이미 죽었다. 지금 저 아래 있는 건 그냥 정신을 잃은 성욕의 폭주자다. 그녀의 시선은 마치 물에 빠진 사람 같고, 유일한 약은 나뿐이다.",
        }),
      },
      {
        id: "maya-special-scene-3",
        label: tx({
          id: "Gaya 3",
          en: "Style 3",
          ja: "スタイル3",
          ko: "스타일3",
        }),
        src: mayaSpecialScene3,
        audioSrc: mayaSpecialSceneSound3,
        endFrame: 120,
        fps: 120,
        loop: true,
        narrate: [
          tx({
            id: "Arka: Siapa yang nyangka cewek paling pintar di apartemen ini ternyata lebih suka berlutut dan ngemis kayak gini?",
            en: "Arka: Who would've thought the smartest girl in this apartment actually prefers to kneel and beg like this?",
            ja: "アルカ：このアパートで一番頭のいい女が、実はこうやって跪いて懇願するのが好きだなんて誰が思っただろう？",
            ko: "아르카: 이 아파트에서 가장 똑똑한 여자가 사실은 이렇게 무릎 꿇고 애원하는 걸 더 좋아한다니 누가 생각이나 했겠어?",
          }),
          tx({
            id: "Maya: Haaah... Kepintaran nggak ada gunanya, Arka! Otakku udah rusak... ahh! Cuma kamu yang bisa bikin aku ngerasa hidup! Rusak aku sekalian malam ini!",
            en: "Maya: Haaah... Intelligence is useless, Arka! My brain is already broken... ahh! Only you can make me feel alive! Ruin me completely tonight!",
            ja: "Maya: はぁ... 頭の良さなんて意味ない、アルカ！私の脳はもう壊れてる... あっ！あなただけが私を生きてると感じさせてくれる！今夜は完全に私を壊して！",
            ko: "Maya: 하아... 똑똑한 건 아무 소용없어, 아르카! 내 뇌는 이미 망가졌어... 아! 너만이 날 살아있다고 느끼게 해줄 수 있어! 오늘 밤 날 완전히 망가뜨려줘!",
          }),
        ],
      },
      {
        id: "maya-special-scene-4",
        label: tx({
          id: "Gaya 4",
          en: "Style 4",
          ja: "スタイル4",
          ko: "스타일4",
        }),
        src: mayaSpecialScene4,
        audioSrc: mayaSpecialSceneSound4,
        loop: true,
        narrate: [
          tx({
            id: "Maya: Ahhh! Mmm... Arka, tolong... aku udah nggak tahan kalau cuma main di luar begini! Hancurin aku sekarang... masukin, please!",
            en: "Maya: Ahhh! Mmm... Arka, please... I can't take it anymore if you just play outside like this! Destroy me now... put it in, please!",
            ja: "Maya: あぁっ！んん... アルカ、お願い... こんな外だけで遊ばれるのもう耐えられない！今すぐ私を壊して... 入れて、お願い！",
            ko: "Maya: 아아! 음... 아르카, 제발... 이렇게 밖에서만 놀면 더 이상 못 참겠어! 지금 날 망가뜨려줘... 넣어줘, 제발!",
          }),
          tx({
            id: "Arka: Nggak ada alasan buat nahan diri lagi. Kalau dia memang minta dihancurkan, aku bakal kasih apa yang dia mau.",
            en: "Arka: There's no reason to hold back anymore. If she really wants to be destroyed, I'll give her what she wants.",
            ja: "アルカ：もう我慢する理由がない。もし彼女が本当に壊れたいなら、彼女に欲しいものを与えるしかない。",
            ko: "아르카: 더 이상 참을 이유가 없다. 만약 그녀가 정말로 망가지고 싶다면, 그녀에게 원하는 것을 줄 수밖에 없다.",
          }),
        ],
      },
    ],
    "maya-special-2",
  ),
  multiCutScene(
    [
      {
        id: "maya-special-2-scene-1",
        label: tx({
          id: "Gaya 1",
          en: "Style 1",
          ja: "スタイル1",
          ko: "스타일1",
        }),
        src: mayaSpecial2Scene1,
        audioSrc: mayaBadEndingSound,
        loop: true,
        narrate: [
          tx({
            id: 'Maya: "AAHH!! Iya!! Kayak gitu, Arka!! Haaah... lebih keras lagi!! Jangan kasih ampun!"',
            en: 'Maya: "AAHH!! Yes!! Like that, Arka!! Haaah... harder!! Don\'t hold back!"',
            ja: "Maya: 「ああっ!! そう!! そんな感じ、アルカ!! はぁ... もっと激しく!! 容赦しないで!」",
            ko: 'Maya: "아아!! 그래!! 그렇게, 아르카!! 하아... 더 세게!! 봐주지 마!"',
          }),
          tx({
            id: 'Arka: (Napas mulai memburu, menahan pinggul Maya) "Gila. Di depan jendela begini, kamu bener-bener udah nggak peduli ada yang lihat dari luar, ya?"',
            en: "Arka: (Breathing heavily, holding Maya's hips) \"Crazy. In front of the window like this, you really don't care if anyone sees from outside, huh?\"",
            ja: "アルカ：（息が荒くなり、マヤの腰を掴む）「狂ってる。こんな窓の前で、外から誰かに見られても本当に気にしないんだな？」",
            ko: 'Arka: (숨이 거칠어지며, 마야의 엉덩이를 잡고) "미쳤네. 이렇게 창문 앞에서, 밖에서 누가 보든 정말 신경 안 쓰는 거야?"',
          }),
          tx({
            id: 'Maya: "Biarin mereka lihat!! Ahh! Biar satu gedung tahu kalau aku cuma mainanmu! Haaah!"',
            en: 'Maya: "Let them see!! Ahh! Let the whole building know that I\'m just your toy! Haaah!"',
            ja: "Maya: 「見せてやって!! あっ! ビル全体に私があなたのおもちゃだって知らせて! はぁっ!」",
            ko: 'Maya: "보게 내버려둬!! 아! 건물 전체가 내가 네 장난감일 뿐이라는 걸 알게 해줘! 하아!"',
          }),
        ],
      },
      {
        id: "maya-special-2-scene-2",
        label: tx({
          id: "Gaya 2",
          en: "Style 2",
          ja: "スタイル2",
          ko: "스타일2",
        }),
        src: mayaSpecial2Scene2,
        audioSrc: mayaBadEndingSound2,
        loop: true,
        endFrame: 120,
        fps: 120,
        narrate: tx({
          id: "Arka: Nggak ada lagi sisa-sisa harga diri. Kaca di depannya sampai berembun karena napasnya yang putus-putus. Dia menerima kehancuran ini dengan sangat sukarela. Ngelihat tubuhnya se-binal ini pasrah di depanku... egoku rasanya bener-bener dipuasin sampai ke akar",
          en: "Arka: No trace of self-respect left. The glass in front of her is fogged up from her ragged breathing. She accepts this destruction so willingly. Seeing her body this lustful and submissive before me... my ego feels truly satisfied to the core",
          ja: "アルカ：もう自尊心のかけらもない。彼女の前のガラスは途切れ途切れの息で曇っている。彼女はこの破壊を非常に自発的に受け入れている。こんなに淫らで従順な彼女の体を目の前にして... 俺のエゴは本当に根底まで満たされる",
          ko: "아르카: 자존심의 흔적도 남지 않았다. 그녀 앞의 유리는 끊어지는 숨결로 김이 서려 있다. 그녀는 이 파괴를 너무나 자발적으로 받아들인다. 이렇게 음란하고 순종적인 그녀의 몸을 내 앞에서 보니... 내 자아가 정말 뿌리까지 만족스럽다",
        }),
      },
      {
        id: "maya-special-2-scene-3",
        label: tx({
          id: "Gaya 3",
          en: "Style 3",
          ja: "スタイル3",
          ko: "스타일3",
        }),
        src: mayaSpecial2Scene3,
        audioSrc: mayaBadEndingSound3,
        loop: true,
        narrate: [
          tx({
            id: 'Maya: "Mmmghh!! Arka... benturkan aku ke kaca! Lakukan apa aja!! Ahhh! Tandai badanku sampai nggak ada cowok lain yang mau lihat aku selain kamu!"',
            en: 'Maya: "Mmmghh!! Arka... slam me against the glass! Do whatever you want!! Ahhh! Mark my body so no other guy will want to look at me except you!"',
            ja: "Maya: 「んんっ!! アルカ... ガラスに叩きつけて！何でもして!! あぁっ！私の体に印をつけて、あなた以外の男が私を見たくなくなるまで！」",
            ko: 'Maya: "음!! 아르카... 날 유리에 부딪혀! 뭐든지 해!! 아아! 내 몸에 표시를 남겨서 너 말고 다른 남자는 날 보고 싶어하지 않게 해줘!"',
          }),
          tx({
            id: 'Arka: "Kamu bener-bener udah gila, Maya."',
            en: 'Arka: "You\'re really crazy, Maya."',
            ja: "アルカ：「お前、本当に狂ってるな、マヤ。」",
            ko: '아르카: "너 정말 미쳤구나, 마야."',
          }),
          tx({
            id: 'Maya: "Gila karena kamu!! Haaah... cepat, Arka... hancurkan sisa-sisa kewarasanku!"',
            en: 'Maya: "Crazy because of you!! Haaah... hurry, Arka... destroy the last remnants of my self-respect!"',
            ja: 'マヤ：「君のために狂ってる!! はぁ... 早く、アルカ... 私の自尊心の残りを壊して!!"',
            ko: '마야: "너 때문에 미쳤어!! 하아... 서둘러, 아르카... 나의 자존심의 잔해를 부수어!!"',
          }),
        ],
      },
      {
        id: "maya-special-2-scene-4",
        label: tx({
          id: "Gaya 4",
          en: "Style 4",
          ja: "スタイル4",
          ko: "스타일4",
        }),
        src: mayaSpecial2Scene4,
        audioSrc: mayaBadEndingSound4,
        loop: true,
        narrate: [
          tx({
            id: 'Maya: "AAH!! AAH!! ARKA!! Ya Tuhan... terlalu dalam... haaah!! Terus... jangan berhenti!!"',
            en: 'Maya: "AAH!! AAH!! ARKA!! Oh God... too deep... haaah!! Keep going... don\'t stop!!"',
            ja: 'マヤ：「ああっ!! ああっ!! アルカッ!! ああ... すごく奥まで... はぁっ!! 続けて... 止めないで!!"',
            ko: '마야: "아아!! 아아!! 아르카!! 오 신님... 너무 깊어... 하아!! 계속해... 멈추지마!!"',
          }),
          tx({
            id: 'Arka: "Bagus. Teriak yang kencang. Buktikan kalau kamu emang cuma hidup buat ini sekarang."',
            en: 'Arka: "Good. Shout loudly. Prove that you\'re only alive for this now."',
            ja: "アルカ：「いいね。大声で叫んで。今、これが俺の為に生きていることを証明しろ。」",
            ko: '아르카: "좋아. 큰 소리로 외쳐라. 지금 이 순간만을 위해 살아가는 것을 증명해라."',
          }),
        ],
      },
      {
        id: "maya-special-2-scene-5",
        label: tx({
          id: "Gaya 5",
          en: "Style 5",
          ja: "スタイル5",
          ko: "스타일5",
        }),
        src: mayaSpecial2Scene5,
        audioSrc: mayaBadEndingSound5,
        endFrame: 120,
        fps: 120,
        loop: true,
        narrate: [
          tx({
            id: "Arka (Monolog):\nSensasinya bener-bener di luar nalar. Posisi ini bikin aku masuk lebih dalam dari sebelumnya. Dia terus memundurkan pinggulnya secara agresif, nyari sentuhanku dengan liar. Tarikannya terlalu kuat, aku udah benar-benar di ambang batas sekarang.",
            en: "Arka (Monologue):\nThe sensation is truly beyond reason. This position makes me go deeper than before. She keeps pushing her hips back aggressively, seeking my touch wildly. The pull is too strong, I'm really at the edge now.",
            ja: "アルカ（独白）：\nこの感覚は本当に理性を超えている。この体位は以前よりも深く入り込ませる。彼女は攻撃的に腰を後ろに押し続け、荒々しく俺の触れ合いを求めている。引きが強すぎる、俺は今本当に限界だ。",
            ko: "아르카 (독백):\n이 감각은 정말 이성을 초월한다. 이 자세는 이전보다 더 깊이 들어가게 만든다. 그녀는 계속해서 공격적으로 엉덩이를 뒤로 밀며, 거칠게 내 접촉을 찾고 있다. 당김이 너무 강해서, 나는 지금 정말 한계에 다다랐다.",
          }),
          tx({
            id: 'Arka: "Maya... aku udah mau keluar!"',
            en: 'Arka: "Maya... I\'m about to come!"',
            ja: "アルカ：「マヤ... もう出る！」",
            ko: '아르카: "마야... 나 이제 나올 것 같아!"',
          }),
          tx({
            id: 'Maya: "NGGAK BOLEH!! JANGAN DI LUAR!! Penuhi aku, Arka!! Kasih aku semuanya!! Hamilin aku sekalian biar Papa bener-bener buang aku!!"',
            en: 'Maya: "NO!! DON\'T PULL OUT!! Fill me up, Arka!! Give me everything!! Get me pregnant so Papa will really throw me away!!"',
            ja: "Maya: 「ダメ!! 外に出さないで!! 私を満たして、アルカ!! 全部ちょうだい!! 私を妊娠させて、パパが本当に私を捨てるように!!」",
            ko: 'Maya: "안 돼!! 밖에 빼지 마!! 날 채워줘, 아르카!! 전부 다 줘!! 날 임신시켜서 아빠가 정말로 날 버리게 해줘!!"',
          }),
          tx({
            id: 'Arka: "Kamu bener-bener sinting!"',
            en: 'Arka: "You\'re really insane!"',
            ja: "アルカ：「お前、本当に狂ってる！」",
            ko: '아르카: "너 정말 미쳤어!"',
          }),
          tx({
            id: 'Maya: "PENUHI AKU!! AAHH!! SEKARANG, ARKA!!"',
            en: 'Maya: "FILL ME UP!! AAHH!! NOW, ARKA!!"',
            ja: "Maya: 「私を満たして!! ああっ!! 今、アルカ!!」",
            ko: 'Maya: "날 채워줘!! 아아!! 지금, 아르카!!"',
          }),
        ],
      },
      {
        id: "maya-special-2-scene-6",
        label: tx({
          id: "Gaya 6",
          en: "Style 6",
          ja: "スタイル6",
          ko: "스타일6",
        }),
        src: mayaSpecial2Scene6,
        audioSrc: mayaBadEndingSound6,
        loop: true,
        narrate: [
          tx({
            id: "Arka: Kamu bener-bener nggak bisa diselamatin lagi, Maya.",
            en: "Arka: You really can't be saved anymore, Maya.",
            ja: "アルカ：お前、もう本当に救いようがないな、マヤ。",
            ko: "아르카: 너 정말 더 이상 구원받을 수 없어, 마야.",
          }),
          tx({
            id: "Maya: Siapa yang butuh diselamatin? Malam ini baru permulaan, Arka. Besok... kamu harus rusak aku lebih parah lagi.",
            en: "Maya: Who needs to be saved? Tonight is just the beginning, Arka. Tomorrow... you have to ruin me even worse.",
            ja: "Maya: 誰が救われる必要があるの？今夜はただの始まりよ、アルカ。明日は... もっとひどく私を壊さなきゃ。",
            ko: "Maya: 누가 구원받을 필요가 있어? 오늘 밤은 시작일 뿐이야, 아르카. 내일은... 날 더 심하게 망가뜨려야 해.",
          }),
        ],
      },
    ],
    "maya-bed-3",
  ),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", "", 1000),
  centeredText(
    tx({
      id: "THE DEVOTED SUBMISSION",
      en: "THE DEVOTED SUBMISSION",
      ja: "THE DEVOTED SUBMISSION",
      ko: "THE DEVOTED SUBMISSION",
    }),
    { size: "hero" },
  ),
  centeredText(
    tx({
      id: "SPECIAL ENDING — MAYA ROUTE (DARK VERSION)",
      en: "SPECIAL ENDING — MAYA ROUTE (DARK VERSION)",
      ja: "SPECIAL ENDING — MAYA ROUTE (DARK VERSION)",
      ko: "SPECIAL ENDING — MAYA ROUTE (DARK VERSION)",
    }),
    { size: "sub" },
  ),
  centeredText(
    tx({
      id: "GALLERY TERBUKA: ATURAN BARU MAYA",
      en: "GALLERY UNLOCKED: MAYA'S NEW RULES",
      ja: "GALLERY UNLOCKED: MAYA'S NEW RULES",
      ko: "GALLERY UNLOCKED: MAYA'S NEW RULES",
    }),
    { size: "sub" },
  ),
  setFlag("gallerySceneMaya2Unlocked", true),
  jumpIf("galleryMode", "gallery-return", {
    value: true,
  }),
];

export const day7EternalPromiseScene: VisualNovelCommand[] = [
  bg(
    bedroomNightUrl,
    tx({
      id: "Unit 302 - 20:00",
      en: "Unit 302 - 20:00",
      ja: "302号室 - 20:00",
      ko: "302호 - 20:00",
    }),
  ),
  show("maya-day7-promise", "maya", "calm", {
    position: "center",
    enterFrom: "fade",
  }),
  narrate(
    tx({
      id: "Maya masuk mengenakan kaus santai dan celana panjang yang nyaman. Kacamatanya bertengger rapi, dan wajahnya terlihat sangat segar. Tidak ada lagi lingkaran hitam di bawah matanya. Dia tersenyum tulus begitu melihat Arka.",
      en: "Maya comes in wearing a casual tee and comfortable slacks. Glasses on, face looking genuinely fresh. The dark circles under her eyes are gone. She gives Arka a real smile the moment she sees him.",
      ja: "マヤがカジュアルなTシャツとゆったりしたパンツ姿で入ってきた。眼鏡をかけ、顔色も本当によくなっている。目の下のクマも消えていた。アルカを見た瞬間、心からの笑顔を見せる。",
      ko: "마야가 편한 티셔츠와 넉넉한 바지 차림으로 들어온다. 안경을 쓰고 얼굴이 정말 생기 있어 보인다. 눈 밑 다크서클도 사라졌다. 아르카를 보자마자 진심 어린 미소를 짓는다.",
    }),
  ),
  say(
    "maya",
    "calm",
    tx({
      id: "Hei. Udah makan malam belum?",
      en: "Hey. Have you had dinner yet?",
      ja: "ねえ。夕飯もう食べた？",
      ko: "야. 저녁 먹었어?",
    }),
    { voice: mayaDay1To4Voices[45] },
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Belum. Nungguin tetangga sebelah yang katanya mau traktir kalau urusan kampusnya udah beres.",
      en: "Not yet. Been waiting for the neighbor next door who said she'd treat me once her campus stuff was sorted.",
      ja: "まだだよ。大学のことが片付いたらおごってくれるって言ってた隣の子を待ってたんだ。",
      ko: "아직. 학교 일 해결되면 한턱내겠다던 옆집 이웃 기다리는 중이었어.",
    }),
  ),
  say(
    "maya",
    "teasing",
    tx({
      id: "Urusanku udah aman. Aku barusan telepon pihak kampus buat ngajuin beasiswa keringanan biaya. Terus besok aku mau cari kerja part-time di kafe bawah. Aku bakal tetap lanjut kuliah sampai lulus, pakai usahaku sendiri.",
      en: "All handled. I just called the university to apply for a financial aid scholarship. And tomorrow I'm going to look for a part-time job at the café downstairs. I'm finishing this degree, on my own terms.",
      ja: "全部大丈夫だよ。さっき大学に電話して、授業料免除の奨学金を申請した。明日は下のカフェでアルバイトも探す予定。自分の力でちゃんと卒業してみせる。",
      ko: "다 정리됐어. 방금 학교에 전화해서 학비 감면 장학금 신청했어. 그리고 내일 아래 카페에서 알바 자리도 찾아볼 거야. 내 힘으로 끝까지 졸업할 거야.",
    }),
    { voice: mayaDay1To4Voices[46] },
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Bagus. Aku tahu kamu pasti bisa. Kalau ada tugas yang bikin laptopmu nge-hang lagi, bawa aja ke sini.",
      en: "Good. I knew you could. If any assignment freezes your laptop again, just bring it over.",
      ja: "よかった。できると思ってたよ。また課題でノートパソコンがフリーズしたら、こっちに持ってきていいから。",
      ko: "잘했어. 할 수 있을 거라고 알고 있었어. 과제 때문에 노트북 또 멈추면 여기 가져와.",
    }),
  ),
  narrate(
    tx({
      id: "Maya berdiri dari tepi kasur dan melangkah mendekati Arka. Dia menatap Arka dengan penuh kasih sayang.",
      en: "Maya stands up from the edge of the bed and walks toward Arka. She looks at him with unmistakable warmth.",
      ja: "マヤはベッドの端から立ち上がり、アルカのほうへ歩み寄る。深い愛情をたたえた目でアルカを見つめた。",
      ko: "마야가 침대 가장자리에서 일어나 아르카 쪽으로 걸어온다. 그녀는 아르카를 따뜻한 눈빛으로 바라본다.",
    }),
  ),
  
  narrate(
    tx({
      id: "Maya menarik tangan Arka, mengajaknya berdiri, lalu memeluknya erat. Arka membalas pelukan itu, menyadari bahwa gadis di pelukannya kini sudah menjadi wanita yang kuat dan mandiri.",
      en: "Maya takes Arka's hand, pulls him to his feet, and wraps her arms around him. Arka holds her back, and it hits him that the girl in his arms has grown into someone strong and self-possessed.",
      ja: "マヤはアルカの手を取り、立ち上がらせて、そのままきつく抱きしめた。アルカも抱き返しながら、腕の中の彼女がいつの間にか強く自立した女性になっていることに気づいた。",
      ko: "마야가 아르카의 손을 잡고 일으켜 세우더니 꽉 끌어안는다. 아르카가 안아주면서, 품 안의 그녀가 이제 강하고 독립적인 여성이 되었다는 걸 깨닫는다.",
    }),
  ),
  hide("maya-day7-promise"),
  hide("arka-day7"),
  cutScene(mayaSpecialSceneNormal1, true, [
    tx({
      id: "Maya: Urusanku di kampus udah aman. Aku barusan telepon pihak fakultas buat ngajuin beasiswa keringanan biaya. Terus besok aku mau mulai kerja part-time di kafe bawah.",
      en: "Maya: My campus matters are settled. I just called the faculty office to apply for a tuition waiver scholarship. And tomorrow I'm starting a part-time job at the café downstairs.",
      ja: "マヤ：大学のことは大丈夫になった。さっき学部に電話して学費免除の奨学金を申請したの。それで明日から下のカフェでバイトを始めるわ。",
      ko: "마야: 캠퍼스 일은 다 해결됐어. 방금 학부에 전화해서 학비 감면 장학금 신청했어. 그리고 내일부터 아래층 카페에서 아르바이트 시작할 거야.",
    }),
    tx({
      id: "Arka: (Tersenyum kecil, memutar kursinya menghadap Maya) Bagus. Aku tahu kamu pasti bisa ngelewatin ini.",
      en: "Arka: (Smiles slightly, turning his chair to face Maya) Good. I knew you could get through this.",
      ja: "アルカ：(少し微笑んで、椅子をマヤの方に向ける) よかった。君なら乗り越えられると思ってたよ。",
      ko: "아르카: (살짝 미소 지으며 의자를 마야 쪽으로 돌린다) 좋아. 네가 이겨낼 수 있을 거라는 걸 알고 있었어.",
    }),
    tx({
      id: "(Maya Berdiri dan melangkah mendekati Arka. Dia menatap Arka dengan tatapan yang jernih dan penuh kasih sayang) Makasih ya, Arka. Kamu nggak pernah maksa aku jadi apa pun, kamu cuma bantu aku nemuin keberanian yang selama ini hilang. Aku bangga bisa jadi diriku sendiri sekarang.",
      en: "(Maya Stands and steps closer to Arka. She looks at Arka with a clear and affectionate gaze) Thank you, Arka. You never forced me to be anything, you just helped me find the courage I'd lost. I'm proud to be myself now.",
      ja: "(マヤ 立ち上がってアルカに近づく。澄んだ愛情に満ちた眼差しでアルカを見つめる) ありがとう、アルカ。あなたは私に何かになることを強要したことは一度もなかった。ただ、失っていた勇気を見つける手助けをしてくれた。今、自分自身でいられることを誇りに思う。",
      ko: "(마야 일어나서 아르카에게 다가간다. 맑고 애정 어린 눈빛으로 아르카를 바라본다) 고마워, 아르카. 넌 나한테 뭔가가 되라고 강요한 적이 없었어. 그저 내가 잃어버렸던 용기를 찾도록 도와줬을 뿐이야. 지금 나 자신이 될 수 있다는 게 자랑스러워.",
    }),
    tx({
      id: "Ayahnya mungkin sudah membuang dia, tapi gadis di pelukanku ini justru menemukan versi terbaik dari dirinya sendiri. Maya yang sekarang mandiri, keras kepala, tapi benar-benar hidup. Malam itu saat dia sakit, dia menciumku karena butuh pelampung di tengah badai. Tapi malam ini... sentuhannya benar-benar berbeda. Ini bukan pelarian. Ini murni karena dia memilih untuk ada di sini, bersamaku.",
      en: "Her father may have abandoned her, but the girl in my arms has found the best version of herself. Maya now is independent, stubborn, but truly alive. That night when she was sick, she kissed me because she needed a lifeline in the storm. But tonight... her touch is completely different. This isn't an escape. This is purely because she chose to be here, with me.",
      ja: "父親は彼女を捨てたかもしれないが、僕の腕の中にいるこの少女は自分自身の最高のバージョンを見つけた。今のマヤは自立していて、頑固だけど、本当に生きている。あの夜、彼女が病気だった時、嵐の中で救命具が必要だったから僕にキスをした。でも今夜は……彼女の触れ方が全く違う。これは逃避じゃない。純粋に彼女がここに、僕と一緒にいることを選んだからだ。",
      ko: "아버지가 그녀를 버렸을지 모르지만, 내 품 안의 이 소녀는 자신의 최고의 모습을 찾았다. 지금의 마야는 독립적이고, 고집스럽지만, 진정으로 살아있다. 그날 밤 그녀가 아팠을 때, 폭풍 속에서 구명줄이 필요했기 때문에 나에게 키스했다. 하지만 오늘 밤은... 그녀의 손길이 완전히 다르다. 이건 도피가 아니다. 순수하게 그녀가 여기, 나와 함께 있기로 선택했기 때문이다.",
    }),
  ]),
  cutScene(
    mayaSpecialSceneNormal2,
    true,
    [
      tx({
        id: "Arka: Kamu yakin? Nggak capek habis ngurusin urusan kampus dan nyari kerja seharian?",
        en: "Arka: Are you sure? Aren't you tired from dealing with campus matters and looking for work all day?",
        ja: "アルカ：本当にいいの？一日中キャンパスの用事や仕事探しで疲れてない？",
        ko: "아르카: 정말 그래? 하루 종일 캠퍼스 일이나 일 찾느라 지치지 않았어?",
      }),
      tx({
        id: "Maya: Sama sekali nggak. Malam ini... aku di sini bukan karena aku takut sendirian. Aku di sini karena aku mau sama kamu.",
        en: "Maya: Not at all. Tonight... I'm here not because I'm afraid of being alone. I'm here because I want to be with you.",
        ja: "マヤ：全然疲れてないわ。今夜は……一人でいるのが怖くてここにいるわけじゃないの。あなたといたいからここにいるの。",
        ko: "마야: 전혀 지치지 않았어. 오늘 밤은…… 혼자 있는 것이 두렵기 때문에 여기 있는 게 아니야. 너와 함께하고 싶어서 여기 있는 거야.",
      }),
    ],
    undefined,
    mayaSpecialSceneNormalSound2,
  ),
  blackScreen(),
  narrate({
    id: "(Mendengar itu, Arka membalas senyumannya dan mengangkat tubuh Maya perlahan, membaringkannya di atas kasur. Dinamika malam ini terasa sangat seimbang. Tidak ada yang mendominasi atau didominasi. Setiap sentuhan dilakukan dengan ritme yang lambat dan emosional.)",
    en: "(Hearing that, Arka smiles back and gently lifts Maya's body, laying her down on the bed. The dynamic of this night feels very balanced. Neither dominates nor is dominated. Every touch is done with a slow and emotional rhythm.)",
    ja: "(それを聞いて、アルカは微笑み返し、マヤの体をそっと持ち上げ、ベッドに横たえます。この夜のダイナミックはとてもバランスが取れているように感じられます。どちらも支配したり、従ったりするのではなく、すべての触り方がゆっくりで感情的です。)",
    ko: "(그렇게 들으니 아르카는 미소를 지으며 마야의 몸을 부드럽게 들고 베드에 눕혀준다. 이 밤의 동적인 상황은 매우 균형 잡혀 있는 것 같다. 누구도 지배하지도 않고, 따르지도 않는다. 모든 만지는 느리고 감정적인 리듬으로 이루어진다.)",
  }),
  clearBlackScreen(),
  multiCutScene([
    {
      src: mayaSpecialSceneNormal3,
      id: "maya-special-normal-3",
      label: "",
      loop: true,
      audioSrc: mayaSpecialSceneNormalSound3,
      narrate: [
        {
          id: "Maya: (Napasnya mulai memburu, menatap langsung ke mata Arka) Mmm... pelan-pelan, Arka. Rasanya beda dari waktu itu...",
          en: "Maya: (Her breathing quickens, looking directly into Arka's eyes) Mmm... slowly, Arka. It feels different from that time...",
          ja: "マヤ：(息が荒くなり、アルカの目を直接見つめる) んん……ゆっくり、アルカ。あの時とは違う感じ……",
          ko: "마야: (숨이 가빠지며 아르카의 눈을 똑바로 바라본다) 음... 천천히, 아르카. 그때와는 다른 느낌이야...",
        },
        {
          id: "Arka: (Menahan gerakannya sejenak) Sakit?",
          en: "Arka: (Pausing his movement for a moment) Does it hurt?",
          ja: "アルカ：(動きを一瞬止めて) 痛い？",
          ko: "아르카: (잠시 움직임을 멈춘다) 아파?",
        },
        {
          id: "Maya: (Menggeleng pelan, wajahnya memerah tapi dia membalas tatapan Arka dengan berani) Nggak, ini... lebih hangat. Aku suka kamu natap aku kayak gini....",
          en: "Maya: (Shakes her head gently, her face flushed but she returns Arka's gaze boldly) No, this... is warmer. I like it when you look at me like this....",
          ja: "マヤ：(そっと首を横に振り、顔を赤らめながらも大胆にアルカの視線を返す) ううん、これは……もっと温かい。こんな風に私を見てくれるのが好き……",
          ko: "마야: (부드럽게 고개를 젓고, 얼굴이 붉어지지만 대담하게 아르카의 시선을 받아친다) 아니, 이건... 더 따뜻해. 이렇게 날 바라봐 주는 게 좋아....",
        },
        {
          id: "Maya: Mmmghh!! Haaah... Arka...",
          en: "Maya: Mmmghh!! Haaah... Arka...",
          ja: "マヤ：んんっ!! はぁ……アルカ……",
          ko: "마야: 음으!! 하아... 아르카...",
        },
      ],
    },
    {
      src: mayaSpecialSceneNormal4,
      id: "maya-special-normal-4",
      label: "",
      loop: true,
      audioSrc: mayaSpecialSceneNormalSound4,
      narrate: {
        id: "Arka (Monolog): Nggak ada rasa canggung atau terburu-buru. Kami berdua sadar sepenuhnya dengan apa yang kami lakukan. Melihat wajahnya yang memerah dan senyum tipis di sela-sela napasnya, aku tahu keputusan untuk membiarkan dia mengambil kendali atas hidupnya sendiri adalah hal paling tepat yang pernah dia buat. ",
        en: "Arka (Monolog): There's no awkwardness or rushing. We're both fully aware of what we're doing. Seeing her flushed face and the faint smile between her breaths, I know the decision to let her take control of her own life was the right one.",
        ja: "アルカ（独白）：恥ずかしさや急ぎは全くない。私たちはどちらも何をしているのかを完全に理解している。顔を赤らめて息を整えながらも微笑む彼女の様子を見て、彼女自身の人生を自分で切り開くことを選んだのは、これまでで最も正しい選択だったと確信している。",
        ko: "아르카(독백): 부끄러움도 급할 것도 없다. 우리 둘 다 무엇을 하고 있는지 완전히 이해하고 있다. 얼굴이 붉어지고 숨을 고르며 미소를 짓는 그 모습을 보니, 그녀가 자신의 삶을 스스로 주도하게 허락한 것이 지금까지 가장 옳은 결정이라는 것을 알겠다.",
      },
    },
    {
      src: mayaSpecialSceneNormal5,
      id: "maya-special-normal-5",
      label: "",
      loop: true,
      audioSrc: mayaSpecialSceneNormalSound5,
      endFrame: 120,
      fps: 120,
      narrate: [
        {
          id: "Arka: (Mengeratkan genggaman tangannya, napasnya semakin berat) Maya... aku udah di batas... aku...",
          en: "Arka: (Tightens his grip on her hand, his breathing growing heavier) Maya... I'm at my limit... I...",
          ja: "アルカ：(彼女の手を強く握り、息がますます荒くなる) マヤ……もう限界だ……僕は……",
          ko: "아르카: (그녀의 손을 더 꽉 쥐고, 숨이 점점 거칠어진다) 마야... 나 이제 한계야... 나...",
        },
        {
          id: "Maya: Di dalam aja, Arka... Aku mau semuanya dari kamu. Jangan ditahan.",
          en: "Maya: Inside, Arka... I want all of you. Don't hold back.",
          ja: "マヤ：中に、アルカ……あなたの全てが欲しい。我慢しないで。",
          ko: "마야: 안에, 아르카... 너의 모든 걸 원해. 참지 마.",
        },
      ],
    },
    {
      src: mayaSpecialSceneNormal6,
      id: "maya-special-normal-6",
      label: "",
      loop: true,
      audioSrc: mayaSpecialSceneNormalSound6,
    },
  ]),

  cutScene(mayaSpecialSceneNormal7, true, [
    tx({
      id: "Maya: Aah... Haaah... Aku sayang kamu, Arka. Jangan pernah pergi ya.",
      en: "Maya: Aah... Haaah... I love you, Arka. Don't ever leave me.",
      ja: "マヤ：ああ…はぁ…あなたが好きだよ、アルカ。絶対にいらないから。",
      ko: "마야: 아아... 하아... 너를 사랑해, 아르카. 절대 떠나지 마.",
    }),
    tx({
      id: "Arka: (Mengecup dahi Maya dalam-dalam) Nggak akan. Aku bakal terus di sini.",
      en: "Arka: (Kisses Maya's forehead deeply) I won't. I'll always be here.",
      ja: "アルカ：(マヤの額に深くキスをする) 離れないよ。ずっとここにいる。",
      ko: "아르카: (마야의 이마에 깊게 키스한다) 안 떠날 거야. 계속 여기 있을게.",
    }),
  ]),
  blackScreen(),
  narrate({
    id: "Malam itu mereka mengikat janji tanpa perlu banyak bicara. Apapun yang terjadi besok, masalah uang kuliah yang terhenti atau lelahnya kerja paruh waktu, mereka tahu semuanya akan baik-baik saja selama mereka saling mendukung sebagai dua orang yang setara.",
    en: "That night they sealed a promise without many words. Whatever happened tomorrow—tuition troubles or the exhaustion of part-time work—they knew everything would be fine as long as they supported each other as equals.",
    ja: "その夜、彼らは多くの言葉を必要とせずに約束を結んだ。明日起こるどんなことがあっても、学費の問題やバイトの疲労があっても、二人が平等に支え合っている限り、すべては大丈夫だと分かっていた。",
    ko: "그날 밤 그들은 많은 말 없이 약속을 맺었다. 내일 무슨 일이 생기든, 학자금 문제나 아르바이트로 인한 피로가 있든, 둘이 평등하게 서로를 지지하고 있다면 모든 것이 괜찮을 거라고 알고 있었다.",
  }),
  clearBlackScreen(),
  scene("linear-gradient(180deg, #000000 0%, #030303 100%)", "", 1000),
  centeredText(
    tx({
      id: "THE ETERNAL PROMISE",
      en: "THE ETERNAL PROMISE",
      ja: "THE ETERNAL PROMISE",
      ko: "THE ETERNAL PROMISE",
    }),
    { size: "hero" },
  ),
  centeredText(
    tx({
      id: "NORMAL ENDING — MAYA ROUTE SELESAI",
      en: "NORMAL ENDING — MAYA ROUTE COMPLETED",
      ja: "NORMAL ENDING — MAYA ROUTE COMPLETED",
      ko: "NORMAL ENDING — MAYA ROUTE COMPLETED",
    }),
    { size: "sub" },
  ),
  setFlag("gallerySceneMaya3Unlocked", true),
];
