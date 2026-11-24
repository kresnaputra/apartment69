import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, blackScreen, centeredText, clearBlackScreen, cutScene, jump, jumpIf, narrate, playBgm, playSfx, say, scene, setFlag } from "@/scenes/scriptTypes";
import midNightHallway from "@/background/midnight-hallway.png";
import midNightSaraHallway from "@/background/midnight-sara-hallway.png";
import elevator from "@/background/elevator.png";
import penthouse from "@/background/sara-penthouse.png";
import bad01 from "@/cut-scene/sarah-bad-01-animation.mp4";
import bad02 from "@/cut-scene/sarah-bad-02-animation.mp4";
import bad03 from "@/cut-scene/sarah-bad-03-animation.mp4";
import bad04 from "@/cut-scene/sarah-bad-04-animation.mp4";
import bad05 from "@/cut-scene/sarah-bad-05-animation.mp4";
import bad06 from "@/cut-scene/sarah-bad-06-animation.mp4";
import badEndingBgm from "@/music/bad-maya.mp3";
import liftSound from "@/sfx/lift.wav";
import audio01 from "@/voice/sara/sarah-bad-01-animation-audio.wav";
import audio02 from "@/voice/sara/sarah-bad-02-animation-audio.wav";
import audio03 from "@/voice/sara/sarah-bad-03-animation-audio.wav";
import audio04 from "@/voice/sara/sarah-bad-04-animation-audio.wav";
import audio05 from "@/voice/sara/sarah-bad-05-animation-audio.wav";
import audio06 from "@/voice/sara/sarah-bad-06-animation-audio.wav";

export const day7SaraBadEndingScene: VisualNovelCommand[] = [
  bg(midNightHallway, tx({
    id: "Apartment 69 - Unit 302, Malam",
    en: "Apartment 69 - Unit 302, Night",
    ja: "Apartment 69 - 302号室、夜",
    ko: "Apartment 69 - 302호, 밤",
  })),
  narrate(tx({
    id: "Aku tidak bisa tidur.",
    en: "I couldn't sleep.",
    ja: "眠れなかった。",
    ko: "잠이 오지 않았다.",
  }), "arka"),
  narrate(tx({
    id: "Pesan Sarah masih ada di ponselku.",
    en: "Sarah's message was still on my phone.",
    ja: "スマホには、まだサラのメッセージが残っていた。",
    ko: "휴대폰에는 아직 사라의 메시지가 남아 있었다.",
  }), "arka"),
  say("sara", "neutral", tx({
    id: "Jangan datang ke lantai 12.",
    en: "Don't come to the twelfth floor.",
    ja: "12階には来ないで。",
    ko: "12층에 오지 마.",
  })),
  bg(midNightSaraHallway),
  narrate(tx({
    id: "Aku tahu aku seharusnya menurut.",
    en: "I knew I should have listened.",
    ja: "言うとおりにすべきだった。",
    ko: "그 말을 들었어야 했다.",
  }), "arka"),
  narrate(tx({
    id: "Tapi aku tetap naik.",
    en: "But I went up anyway.",
    ja: "それでも、僕は上に向かった。",
    ko: "그래도 난 올라갔다.",
  }), "arka"),
  bg(elevator, tx({
    id: "Lift Menuju Lantai 12",
    en: "Elevator to the Twelfth Floor",
    ja: "12階へ向かうエレベーター",
    ko: "12층으로 가는 엘리베이터",
  })),
  playSfx(liftSound),
  narrate(tx({
    id: "Lift naik dengan lambat. Lampu di dalamnya sudah redup.",
    en: "The elevator rose slowly. The lights inside had already dimmed.",
    ja: "エレベーターはゆっくりと上がった。中の照明はもう薄暗かった。",
    ko: "엘리베이터는 천천히 올라갔다. 안의 조명은 이미 어두웠다.",
  }), "arka"),
  bg(penthouse, tx({
    id: "Penthouse - Lantai 12, Malam",
    en: "Penthouse - Twelfth Floor, Night",
    ja: "ペントハウス - 12階、夜",
    ko: "펜트하우스 - 12층, 밤",
  })),
  narrate(tx({
    id: "Pintu utama penthouse tidak terkunci.",
    en: "The penthouse's front door was unlocked.",
    ja: "ペントハウスの玄関には鍵がかかっていなかった。",
    ko: "펜트하우스 현관문은 잠겨 있지 않았다.",
  }), "arka"),
  narrate(tx({
    id: "Aku harus segera mencari Sarah—",
    en: "I had to find Sarah—",
    ja: "早くサラを探さないと——",
    ko: "빨리 사라를 찾아야 해—",
  }), "arka"),
  playBgm(badEndingBgm, { fadeOutMs: 1200 }),
  cutScene(bad01, true, [
    tx({
      id: "Suami: Kamu tegang sekali malam ini.",
      en: "Husband: You're awfully tense tonight.",
      ja: "夫：今夜はずいぶん緊張しているな。",
      ko: "남편: 오늘 밤은 유난히 긴장했군.",
    }),
    tx({
      id: "Sarah: Aku… hanya lelah.",
      en: "Sarah: I'm... just tired.",
      ja: "サラ：私……疲れてるだけ。",
      ko: "사라: 나… 그냥 피곤해서 그래.",
    }),
    tx({
      id: "Suami: Sudah berapa lama kita tidak seperti ini?",
      en: "Husband: How long has it been since we did this?",
      ja: "夫：こうするのは、どれくらいぶりだ？",
      ko: "남편: 우리가 이렇게 한 게 얼마 만이지?",
    }),
    tx({
      id: "Sarah: …Nnghh.",
      en: "Sarah: ...Nnghh.",
      ja: "サラ：……んっ。",
      ko: "사라: …으읏.",
    }),
  ], false, audio01),
  cutScene(bad02, true, [
    tx({
      id: "Gerakan jarinya menjadi lebih cepat dan dalam.",
      en: "His fingers move faster and deeper.",
      ja: "指の動きが速く、深くなる。",
      ko: "손가락의 움직임이 더 빠르고 깊어진다.",
    }),
    tx({
      id: "Sarah: Ahh… pelan…",
      en: "Sarah: Ahh... slowly...",
      ja: "サラ：あぁ……ゆっくり……",
      ko: "사라: 아아… 천천히…",
    }),
    tx({
      id: "Suami: Tubuhmu lebih basah dari biasanya.",
      en: "Husband: You're wetter than usual.",
      ja: "夫：いつもより濡れているな。",
      ko: "남편: 평소보다 더 젖었군.",
    }),
    tx({
      id: "Sarah: Jangan… bilang itu…",
      en: "Sarah: Don't... say that...",
      ja: "サラ：そんなこと……言わないで……",
      ko: "사라: 그런 말… 하지 마…",
    }),
    tx({
      id: "Sarah: Aku… nngghh…!",
      en: "Sarah: I'm... nngghh...!",
      ja: "サラ：私……んっ……！",
      ko: "사라: 나… 으읏…!",
    }),
    tx({
      id: "Sarah: Ahh…!",
      en: "Sarah: Ahh...!",
      ja: "サラ：あぁ……！",
      ko: "사라: 아아…!",
    }),
    tx({
      id: "Suami: Sudah keluar hanya dari jari saja.",
      en: "Husband: You came from just my fingers.",
      ja: "夫：指だけでイったのか。",
      ko: "남편: 손가락만으로 가 버렸군.",
    }),
  ], false, audio02),
  cutScene(bad03, true, [
    tx({
      id: "Sarah: Nngghh…!",
      en: "Sarah: Nngghh...!",
      ja: "サラ：んっ……！",
      ko: "사라: 으읏…!",
    }),
    tx({
      id: "Suami: Masih sempit.",
      en: "Husband: Still tight.",
      ja: "夫：まだきついな。",
      ko: "남편: 여전히 좁군.",
    }),
    tx({
      id: "Sarah: Jangan… terlalu dalam dulu…",
      en: "Sarah: Don't... go too deep yet...",
      ja: "サラ：まだ……奥まで入れないで……",
      ko: "사라: 아직… 너무 깊이 들어오지 마…",
    }),
    tx({
      id: "Sarah: Ahh… pelan…",
      en: "Sarah: Ahh... slowly...",
      ja: "サラ：あぁ……ゆっくり……",
      ko: "사라: 아아… 천천히…",
    }),
  ], false, audio03),
  cutScene(bad04, true, [
    tx({
      id: "Gerakannya menjadi lebih kasar dan cepat.",
      en: "His movements grow rougher and faster.",
      ja: "動きはさらに荒く、速くなる。",
      ko: "움직임이 더 거칠고 빨라진다.",
    }),
    tx({
      id: "Sarah: Ahh… ah…!",
      en: "Sarah: Ahh... ah...!",
      ja: "サラ：あぁ……あっ……！",
      ko: "사라: 아아… 아…!",
    }),
    tx({
      id: "Sarah: Pelan… aku bilang pelan…",
      en: "Sarah: Slow down... I said slow down...",
      ja: "サラ：ゆっくり……ゆっくりって言ったでしょ……",
      ko: "사라: 천천히… 천천히 하라고 했잖아…",
    }),
    tx({
      id: "Suami: Kamu sendiri yang basah begini.",
      en: "Husband: You're the one who's this wet.",
      ja: "夫：こんなに濡れているのはお前のほうだろう。",
      ko: "남편: 이렇게 젖은 건 너잖아.",
    }),
    tx({
      id: "Sarah: Nngghh… jangan… terlalu dalam…!",
      en: "Sarah: Nngghh... don't... go so deep...!",
      ja: "サラ：んっ……そんなに……奥まで……！",
      ko: "사라: 으읏… 그렇게… 깊이는 안 돼…!",
    }),
  ], false, audio04),
  cutScene(bad05, true, [
    tx({
      id: "Tempo semakin liar. Sarah berusaha menahan suaranya.",
      en: "The pace grows more frantic. Sarah tries to keep her voice down.",
      ja: "動きはさらに激しくなる。サラは必死に声を抑えようとする。",
      ko: "움직임이 더 격해진다. 사라는 애써 소리를 참는다.",
    }),
    tx({
      id: "Sarah: Aku… aku mau… nngghh…!",
      en: "Sarah: I'm... I'm about to... nngghh...!",
      ja: "サラ：もう……私……んっ……！",
      ko: "사라: 나… 나 이제… 으읏…!",
    }),
    tx({
      id: "Sarah: Ahh… ah…!",
      en: "Sarah: Ahh... ah...!",
      ja: "サラ：あぁ……あっ……！",
      ko: "사라: 아아… 아…!",
    }),
    tx({
      id: "Suami: Keluar… sekarang.",
      en: "Husband: Come... now.",
      ja: "夫：今……イけ。",
      ko: "남편: 지금… 가.",
    }),
  ], false, audio05),
  cutScene(bad06, true, [
    tx({
      id: "Suami: Istirahatlah. Besok saya ada rapat pagi.",
      en: "Husband: Get some rest. I have an early meeting tomorrow.",
      ja: "夫：休んでおけ。明日は朝から会議がある。",
      ko: "남편: 쉬어. 내일 아침에 회의가 있어.",
    }),
    tx({
      id: "Sarah hanya mengangguk pelan.",
      en: "Sarah only gives a slight nod.",
      ja: "サラはそっと頷くだけだった。",
      ko: "사라는 가만히 고개를 끄덕일 뿐이었다.",
    }),
  ], false, audio06),
  scene("#000000", "", 1000),
  blackScreen(),
  narrate(tx({
    id: "Dia tidak tahu aku ada di sana.",
    en: "She didn't know I was there.",
    ja: "僕がそこにいたことを、彼女は知らなかった。",
    ko: "그녀는 내가 거기 있었다는 걸 몰랐다.",
  }), "arka"),
  narrate(tx({
    id: "Dan entah kenapa… itu jauh lebih menyakitkan.",
    en: "And somehow... that hurt a lot more.",
    ja: "なぜか……そのほうが、ずっとつらかった。",
    ko: "그리고 왠지… 그게 훨씬 더 아팠다.",
  }), "arka"),
  centeredText(tx({
    id: "BAD ENDING - SARAH",
    en: "BAD ENDING - SARAH",
    ja: "BAD ENDING - サラ",
    ko: "BAD ENDING - 사라",
  }), { size: "hero" }),
  centeredText(tx({
    id: "Kamu melihat semuanya. Dan dia tidak pernah tahu.",
    en: "You watched everything. And she never knew.",
    ja: "あなたはすべてを見ていた。彼女は最後まで知らなかった。",
    ko: "너는 모든 걸 지켜봤다. 그리고 그녀는 끝내 몰랐다.",
  }), { size: "sub" }),
  jumpIf("galleryMode", "gallery-return", { value: true }),
  setFlag("saraBadEndingCompleted", true),
  setFlag("gallerySceneSarah3Unlocked", true),
  jump("day4-route-fallback"),
  clearBlackScreen(),
];
