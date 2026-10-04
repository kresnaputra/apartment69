import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, hide, jump, menu, narrate, playSfx, say, setFlag, show } from "@/scenes/scriptTypes";
import hallway from "@/background/hallway.png";
import lift from "@/sfx/lift.wav";

export const saraHallwayScene: VisualNovelCommand[] = [
  bg(
    hallway,
    tx({
      id: "Lentera Apartments - Lorong Lantai 3",
      en: "Lentera Apartments - 3rd Floor Hallway",
      ja: "レンテラ・アパートメント - 3階の廊下",
      ko: "렌테라 아파트 - 3층 복도",
    }),
  ),
  hide("nadia-balcony"),
  hide("arka-balcony"),
  show("arka-hallway", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  narrate(
    tx({
      id: "Siapa itu? Dari caranya membawa diri, jelas dia bukan penghuni lantai ini. Lantai tiga biasanya buat unit standar, bukan suite.",
      en: "Who is that? Judging by the way she carries herself, she's clearly not a resident on this floor. The third floor is usually for standard units, not suites.",
      ja: "誰だあれ？ あの立ち振る舞いを見るに、この階の住人じゃない。三階は普通の部屋ばかりで、スイートなんてないはずだ。",
      ko: "누구지? 저 태도만 봐도 이 층 주민은 아닌 것 같다. 3층은 보통 일반 유닛이지, 스위트룸이 있는 층이 아니다.",
    }),
  ),
  playSfx(lift),
  say(
    "sara",
    "neutral",
    tx({
      id: "Lorong ini jauh lebih sepi dari yang kubayangkan. Womanizer, ya? Penghuni baru unit 302.",
      en: "This corridor is much quieter than I imagined. Womanizer, right? The new resident in Unit 302.",
      ja: "この廊下、思っていたよりずっと静かなのね。Womanizer、でしょ？ 302号室の新しい住人。",
      ko: "이 복도, 생각보다 훨씬 조용하네. Womanizer, 맞지? 302호 새 입주자.",
    }),
    { hideName: true },
  ),
  show("sara-hallway", "sara", "neutral", {
    position: "center",
    enterFrom: "fade",
    xOffset: 0.0,
  }),
  say(
    "arka",
    "serious",
    tx({
      id: "Cepat juga ya gosip nyebarnya di gedung ini. Sampai lantai atas juga dengar?",
      en: "Word travels that fast in this building? Even all the way down from the upper floors?",
      ja: "この建物、噂が回るの早いんだな。上の階にまで届くくらいに？",
      ko: "이 건물 소문 진짜 빨리 도네. 윗층까지 다 내려갈 정도로?",
    }),
  ),
  narrate(
    tx({
      id: "Dia tersenyum tipis, matanya menilai Arka dengan rasa ingin tahu yang tetap terdengar sopan.",
      en: "She smiles faintly, her eyes studying Arka with a polite kind of curiosity.",
      ja: "彼女はかすかに微笑みながら、礼儀正しい好奇心をにじませてアルカを観察する。",
      ko: "그녀는 옅게 미소 지으며, 공손한 호기심이 담긴 눈으로 아르카를 살핀다.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Aku Sarah. Aku tinggal di penthouse. Di gedung seperti ini, orang yang pindah sambil bawa server rack sendiri pasti jadi bahan obrolan.",
      en: "I'm Sarah. I live in the penthouse. In a building like this, someone moving in with his own server rack is bound to become a topic of conversation.",
      ja: "私はサラ。ペントハウスに住んでるの。こういう建物で、自分専用のサーバーラックまで持ち込む人がいたら、話題になるに決まってる。",
      ko: "난 사라야. 펜트하우스에 살아. 이런 건물에서 개인 서버 랙까지 들고 들어온 사람은 당연히 화제가 되지.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Cuma hobi yang keterusan aja. Memangnya ada yang bisa aku bantu?",
      en: "Just a hobby that got a little out of hand. Is there something I can help you with?",
      ja: "ただの趣味が少し行き過ぎただけだよ。それで、何か手伝えることでも？",
      ko: "그냥 취미가 좀 커진 것뿐이야. 그래서, 내가 도와줄 일이라도 있어?",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Mungkin. Sistem otomatisasi di unitku sinkronisasinya kacau dengan hub pusat. Teknisi gedung bilang butuh tiga hari karena mereka harus menunggu persetujuan vendor utama. Menurutku kamu bisa beresin itu dalam tiga puluh menit.",
      en: "Maybe. The automation system in my unit is out of sync with the central hub. Building maintenance says it'll take three days because they need approval from the main vendor. I think you could do it in thirty minutes.",
      ja: "たぶんね。私の部屋のオートメーションシステムが中央ハブと同期しなくなってるの。管理側は元請けベンダーの承認が必要だから三日かかるって。あなたなら三十分で終わらせられそうだけど。",
      ko: "어쩌면. 내 유닛 자동화 시스템이 중앙 허브랑 동기화가 안 되고 있어. 건물 관리 쪽에서는 메인 벤더 승인 때문에 3일 걸린다는데, 넌 30분이면 끝낼 수 있을 것 같아.",
    }),
  ),
  menu(
    tx({
      id: "Jadi, kamu mau bagaimana?",
      en: "So, what do you wanna do?",
      ja: "さて、どうする？",
      ko: "그래서, 어떻게 할래?",
    }),
    [
      {
        id: "help-sara",
        label: tx({
          id: "Bantu dia",
          en: "Help her",
          ja: "手伝う",
          ko: "도와준다",
        }),
        next: "sara-help",
        disabled: true,
      },
      {
        id: "refuse-sara",
        label: tx({
          id: "Tolak",
          en: "Turn her down",
          ja: "断る",
          ko: "거절한다",
        }),
        next: "sara-refuse",
      },
    ],
  ),
];

export const saraHelpScene: VisualNovelCommand[] = [
  say(
    "arka",
    "gentle",
    tx({
      id: "Boleh. Kasih aku nomormu, nanti kalau ada waktu aku lihat apa yang bisa aku lakukan.",
      en: "Sure. Give me your number, and I'll see what I can do when I have the chance.",
      ja: "いいよ。連絡先を教えて。時間ができたら見てみる。",
      ko: "좋아. 네 번호 줘. 시간 나면 내가 한번 봐줄게.",
    }),
  ),
  setFlag("saraAcceptedNumber", true),
  say(
    "sara",
    "neutral",
    tx({
      id: "Pilihan yang bijak. Aku nggak butuh janji pasti, Womanizer. Aku cuma butuh seseorang yang bisa diandalkan saat aku menghubungi.",
      en: "A wise choice. I don't need guarantees, Womanizer. I only need someone I can rely on when I call.",
      ja: "賢い選択ね。確約なんていらないわ、Womanizer。必要なのは、呼んだときに頼れる相手だけ。",
      ko: "현명한 선택이네. 난 확답은 필요 없어, Womanizer. 내가 부를 때 믿고 맡길 수 있는 사람만 있으면 돼.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Jangan terlalu lama cek jadwalmu. Pemandangan dari atas jauh lebih bagus daripada dari bawah sini. Aku tunggu.",
      en: "Don't take too long checking your schedule. The view from up there is much better than it is down here. I'll be waiting.",
      ja: "予定を確認するのにあまり時間をかけないで。上からの景色は、ここよりずっといいの。待ってるわ。",
      ko: "일정 확인하는 데 너무 오래 걸리진 마. 위에서 보는 풍경이 여기보다 훨씬 낫거든. 기다리고 있을게.",
    }),
  ),
  hide("sara-hallway", "fadeAway"),
  narrate(
    tx({
      id: "Lift privat itu terbuka. Sarah masuk ke dalam dan menghilang di balik pintu perak yang tertutup rapat. Arka kembali sendirian di lorong, dengan sisa aroma parfumnya yang masih menggantung di udara.",
      en: "The private elevator opens. Sarah steps inside and disappears behind the tightly sealed silver doors. Arka remains alone in the corridor, with a trace of her perfume still lingering in the air.",
      ja: "専用エレベーターが開き、サラはその中へ乗り込む。銀色の扉が閉まると、アルカだけが廊下に残され、空気にはまだ彼女の香水がかすかに残っていた。",
      ko: "전용 엘리베이터 문이 열리고, 사라는 안으로 들어가 은빛 문 뒤로 사라진다. 복도에는 아르카만 남고, 공기엔 그녀의 향수 냄새가 희미하게 남아 있다.",
    }),
  ),
  jump("bedroom-day1"),
];

export const saraRefuseScene: VisualNovelCommand[] = [
  setFlag("saraAcceptedNumber", false),
  say(
    "arka",
    "serious",
    tx({
      id: "Maaf. Menurutku lebih baik kamu tunggu teknisi resmi aja. Aku juga baru pulang dari kampus.",
      en: "Sorry. I think you'd be better off waiting for an official technician. I just got back from campus.",
      ja: "悪いけど、正式な技術者を待ったほうがいいと思う。俺も今ちょうど大学から戻ったばかりなんだ。",
      ko: "미안. 공식 기술자를 기다리는 게 더 나을 것 같아. 나도 방금 학교에서 돌아온 참이라.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Masuk akal. Memang lebih aman kalau diserahkan ke profesional.",
      en: "Fair enough. It would be safer to leave it to a professional.",
      ja: "もっともね。専門家に任せたほうが安全だもの。",
      ko: "그 말도 맞아. 전문가에게 맡기는 게 더 안전하겠지.",
    }),
  ),
  narrate(
    tx({
      id: "Sarah langsung berbalik, siap pergi.",
      en: "Sarah turns away at once, ready to leave.",
      ja: "サラはすぐに背を向け、そのまま立ち去ろうとする。",
      ko: "사라는 곧바로 몸을 돌려 떠날 준비를 한다.",
    }),
  ),
  say(
    "arka",
    "shy",
    tx({
      id: "Tapi aku juga nggak bisa janji bakal selalu ada waktu kosong. Biar aku cek jadwal kuliahku dulu.",
      en: "But I can't promise I'll always have free time. Let me check my class schedule first.",
      ja: "でも、いつも時間が空いてるとは約束できない。まずは授業の予定を確認させて。",
      ko: "그래도 내가 항상 시간 날 거라고 장담은 못 해. 일단 내 수업 일정부터 확인하게 해줘.",
    }),
  ),
  say(
    "sara",
    "neutral",
    tx({
      id: "Kalau begitu, kabari aku kalau kamu memang sempat. Aku nggak suka menunggu tanpa kepastian.",
      en: "In that case, let me know if you actually find the time. I don't like waiting without certainty.",
      ja: "それなら、本当に時間ができた時だけ連絡して。はっきりしないまま待たされるのは好きじゃないの。",
      ko: "그렇다면 정말 시간이 날 때만 연락해. 확실하지도 않은 채 기다리는 건 싫으니까.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Iya. Kalau memang jadi, aku yang cari kamu duluan.",
      en: "Yeah. If it happens, I'll be the one to come find you first.",
      ja: "ああ。本当に行けそうなら、こっちから君を探すよ。",
      ko: "그래. 정말 가게 되면 내가 먼저 널 찾아갈게.",
    }),
  ),
  hide("sara-hallway", "fadeAway"),
  narrate(
    tx({
      id: "Lift privat itu terbuka. Sarah masuk ke dalam dan menghilang di balik pintu perak yang tertutup rapat. Arka kembali sendirian di lorong, dengan rasa bahwa urusan itu belum benar-benar selesai.",
      en: "The private elevator opens. Sarah steps inside and disappears behind the tightly sealed silver doors. Arka is left alone in the corridor, with the feeling that the matter still isn't really settled.",
      ja: "専用エレベーターが開き、サラは銀色の扉の向こうへ消えていく。廊下に一人残されたアルカは、その件がまだ完全には終わっていないような感覚だけを残された。",
      ko: "전용 엘리베이터 문이 열리고, 사라는 은빛 문 너머로 사라진다. 복도에 홀로 남은 아르카에게는 그 일이 아직 완전히 끝난 게 아니라는 느낌만 남는다.",
    }),
  ),
  jump("bedroom-day1"),
];
