import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import {
  bg,
  hide,
  minigame,
  narrate,
  say,
  setFlag,
  show,
} from "@/scenes/scriptTypes";
import elenaHallwayUrl from "@/background/elena-hallway.png";
import elenaHallwayOpenUrl from "@/background/elena-hallway-open.png";
import plumbUrl from "@/background/plumb.png";
import elenaBadroomUrl from "@/background/elena-badroom.png";
import underPlumbUrl from "@/background/under-plumb.png";
import elenaPlumpVideoUrl from "@/cut-scene/elena-plump.webm?url";
import elenaPlumpEmptyVideoUrl from "@/cut-scene/elena-plumb-empty.webm?url";
import elenaPlumpVideoUrl2 from "@/cut-scene/elena-plumb2.webm?url";

export const day2ElenaHallwayScene: VisualNovelCommand[] = [
  bg(
    elenaHallwayUrl,
    tx({
      id: "Apartment 69 - Depan Unit 303",
      en: "Apartment 69 - Outside Unit 303",
      ja: "Apartment 69 - 303号室の前",
      ko: "Apartment 69 - 303호 앞",
    }),
  ),
  show("arka-day2-elena-hallway", "arka", "serious", {
    position: "left",
    enterFrom: "left",
  }),
  narrate(
    tx({
      id: "Arka berhenti di depan unit 303 sambil membawa kunci pipa kecil di tangannya. Pintu kamar Elena terbuka sedikit.",
      en: "Arka stops in front of Unit 303 with a small pipe wrench in his hand. Elena's door is slightly ajar.",
      ja: "アルカは小さなパイプレンチを手に、303号室の前で立ち止まる。エレナの部屋のドアはわずかに開いていた。",
      ko: "아르카는 작은 파이프 렌치를 손에 쥔 채 303호 앞에 멈춰 선다. 엘레나의 문은 살짝 열려 있다.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Pintunya kebuka...",
      en: "The door's open...",
      ja: "ドア、開いてるな…",
      ko: "문이 열려 있네...",
    }),
  ),
  narrate(
    tx({
      id: "Ia mengetuk pelan.",
      en: "He knocks softly.",
      ja: "彼は静かにノックした。",
      ko: "그는 조심스럽게 문을 두드린다.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Elena?",
      en: "Elena?",
      ja: "エレナ？",
      ko: "엘레나?",
    }),
  ),
  narrate(
    tx({
      id: "Tidak ada jawaban.",
      en: "No answer.",
      ja: "返事はない。",
      ko: "대답은 없었다.",
    }),
  ),
  bg(
    elenaHallwayOpenUrl,
    tx({
      id: "Apartment 69 - Depan Unit 303",
      en: "Apartment 69 - Outside Unit 303",
      ja: "Apartment 69 - 303号室の前",
      ko: "Apartment 69 - 303호 앞",
    }),
  ),
  narrate(
    tx({
      id: "Dari dalam, suara tetesan air dari arah wastafel terdengar jelas. Arka melongok masuk. Kamar itu kosong. Mungkin Elena cuma keluar sebentar buat ambil sesuatu.",
      en: "From inside, the sound of dripping water from the sink is crystal clear. Arka peeks in. The room is empty. Maybe Elena just stepped out for a moment to grab something.",
      ja: "中からは洗面台のあたりから水滴の落ちる音がはっきり聞こえてくる。アルカがそっと中をのぞくと、部屋には誰もいなかった。エレナは何か取りに少し外へ出ただけかもしれない。",
      ko: "안쪽에서는 세면대 쪽에서 떨어지는 물방울 소리가 또렷하게 들린다. 아르카가 안을 들여다보지만 방은 비어 있다. 엘레나는 잠깐 뭔가 가지러 나간 것일지도 모른다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Aku benerin dengan cepat, setelah itu aku akan keluar.",
      en: "I'll fix it quickly, then I'll head back out.",
      ja: "手早く直して、それが終わったらすぐ出る。",
      ko: "빨리 고치고, 끝나면 바로 나갈게.",
    }),
  ),
  bg(
    plumbUrl,
    tx({
      id: "Apartment 69 - Kamar Elena",
      en: "Apartment 69 - Elena's Room",
      ja: "Apartment 69 - エレナの部屋",
      ko: "Apartment 69 - 엘레나의 방",
    }),
  ),
  narrate(
    tx({
      id: "Arka langsung masuk dan jongkok di depan wastafel. Panel bawah dibuka, lalu ia memeriksa sambungan pipa yang basah.",
      en: "Arka steps in right away and crouches in front of the sink. He opens the lower panel and checks the damp pipe connection.",
      ja: "アルカはそのまま中へ入り、洗面台の前にしゃがみ込む。下のパネルを開け、濡れた配管の継ぎ目を確かめた。",
      ko: "아르카는 곧바로 안으로 들어가 세면대 앞에 쪼그려 앉는다. 아래 패널을 열고 젖어 있는 배관 연결부를 살핀다.",
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Ini doang masalahnya... mur-nya longgar.",
      en: "So this is all it is... the nut's loose.",
      ja: "問題はこれだけか…ナットが緩んでる。",
      ko: "문제는 이것뿐이네... 너트가 느슨해.",
    }),
  ),
  narrate(
    tx({
      id: "Ia mulai mengencangkan sambungan itu. Baru beberapa saat bekerja, langkah kaki terdengar dari lorong.",
      en: "He starts tightening the connection. Only a few moments into it, footsteps echo in from the hallway.",
      ja: "彼はその継ぎ目を締め始める。作業を始めて間もなく、廊下から足音が聞こえてきた。",
      ko: "그는 연결 부위를 조이기 시작한다. 작업을 시작한 지 얼마 되지 않아 복도에서 발소리가 들려온다.",
    }),
  ),
  minigame("pipe-connection"),
  narrate(
    tx({
      id: "Arka menoleh.",
      en: "Arka turns his head.",
      ja: "アルカは振り返った。",
      ko: "아르카가 고개를 돌린다.",
    }),
  ),
  narrate(
    tx({
      id: "Pintu terbuka lebih lebar, dan Elena masuk sambil membawa beberapa barang kecil di tangannya. Wajahnya tampak lelah dan kesal seperti biasa.",
      en: "The door opens wider, and Elena steps in carrying a few small items in her hands. She looks tired and irritated, as usual.",
      ja: "ドアがさらに開き、エレナが小さな荷物をいくつか抱えて入ってきた。相変わらず疲れたような、苛立ったような顔をしている。",
      ko: "문이 더 크게 열리고, 엘레나가 손에 작은 물건 몇 개를 든 채 들어온다. 늘 그렇듯 피곤하고 짜증 난 얼굴이다.",
    }),
  ),
  bg(
    elenaBadroomUrl,
    tx({
      id: "Apartment 69 - Kamar Elena",
      en: "Apartment 69 - Elena's Room",
      ja: "Apartment 69 - エレナの部屋",
      ko: "Apartment 69 - 엘레나의 방",
    }),
  ),
  say(
    "elena",
    "angry",
    tx({
      id: "Akhirnya dapat juga...",
      en: "Finally found it...",
      ja: "やっと見つかった…",
      ko: "드디어 찾았네...",
    }),
  ),
  narrate(
    tx({
      id: "Arka refleks membeku. Dari posisinya, tubuhnya masih tertutup sebagian oleh wastafel, jadi Elena belum melihatnya.",
      en: "Arka freezes on reflex. From where he is, his body is still partly hidden by the sink, so Elena hasn't noticed him yet.",
      ja: "アルカは反射的に固まった。その位置では体の一部がまだ洗面台に隠れていて、エレナはまだ彼に気づいていない。",
      ko: "아르카는 반사적으로 얼어붙는다. 그 위치에서는 몸이 아직 세면대에 일부 가려져 있어 엘레나는 아직 그를 보지 못했다.",
    }),
  ),
  narrate(
    tx({
      id: "Elena meletakkan barang-barangnya di meja, lalu mengembuskan napas panjang. Setelah itu ia melepaskan bajunya karna gerah.",
      en: "Elena puts her things down on the table, then lets out a long breath. After that, she takes off her shirt because she's feeling overheated.",
      ja: "エレナは荷物を机に置き、長く息を吐いた。そのあと、暑さのせいで上着を脱ぐ。",
      ko: "엘레나는 물건들을 테이블 위에 내려놓고 길게 한숨을 쉰다. 그리고 더워서 옷을 벗는다.",
    }),
  ),
  narrate(
    tx({
      id: "Arka sempat melirik, lalu langsung memalingkan wajah dengan ekspresi kikuk.",
      en: "Arka glances for a split second, then immediately looks away with an awkward expression.",
      ja: "アルカは一瞬だけ目を向けるが、すぐに気まずそうな顔で視線をそらした。",
      ko: "아르카는 순간적으로 힐끗 봤다가 곧바로 어색한 표정으로 얼굴을 돌린다.",
    }),
  ),
  say(
    "arka",
    "surprised",
    tx({
      id: "Waduh...Kenapa timing-ku selalu jelek begini?",
      en: "Oh man... why is my timing always this bad?",
      ja: "うわ…なんで俺のタイミングっていつも最悪なんだ？",
      ko: "와... 왜 내 타이밍은 항상 이 모양이지?",
    }),
  ),
  narrate(
    tx({
      id: "Elena mengusap pelipisnya sebentar, lalu berjalan ke arah toilet.",
      en: "Elena rubs her temple for a moment, then walks toward the toilet.",
      ja: "エレナはこめかみを軽く押さえ、それからトイレのほうへ歩いていく。",
      ko: "엘레나는 잠깐 관자놀이를 문지른 뒤 화장실 쪽으로 걸어간다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Coba aku cek toiletnya lagi",
      en: "Let me check the toilet again.",
      ja: "もう一回トイレのほうを確認してみる。",
      ko: "화장실을 다시 한번 확인해봐야겠어.",
    }),
  ),
  narrate(
    tx({
      id: "Begitu Elena masuk ke toilet, Arka panik.",
      en: "The moment Elena steps into the toilet, Arka panics.",
      ja: "エレナがトイレに入った瞬間、アルカは慌てた。",
      ko: "엘레나가 화장실로 들어가자마자 아르카는 당황한다.",
    }),
  ),
  say(
    "arka",
    "surprised",
    tx({
      id: "Sekarang ngomong? Atau keluar? Atau—",
      en: "Do I say something now? Or leave? Or—",
      ja: "今声かける？ それとも出る？ それとも―",
      ko: "지금 말해? 아니면 나가? 아니면—",
    }),
  ),
  narrate(
    tx({
      id: "Bukannya memilih hal yang masuk akal, Arka malah buru-buru menyelinap ke bawah lemari wastafel. Ruangnya sempit sekali. Lututnya hampir mentok ke dada.",
      en: "Instead of doing the sensible thing, Arka hurriedly slips underneath the sink cabinet. The space is ridiculously cramped. His knees are practically pressed against his chest.",
      ja: "まともな選択をする代わりに、アルカは慌てて洗面台の下の収納へ潜り込んだ。中はひどく狭く、膝が胸につきそうになる。",
      ko: "멀쩡한 선택을 하는 대신, 아르카는 허둥지둥 세면대 아래 수납장 밑으로 숨어든다. 공간은 엄청 비좁았다. 무릎이 거의 가슴에 닿을 정도였다.",
    }),
  ),
  bg(
    underPlumbUrl,
    tx({
      id: "Apartment 69 - Bawah Wastafel",
      en: "Apartment 69 - Under the Sink",
      ja: "Apartment 69 - 洗面台の下",
      ko: "Apartment 69 - 세면대 아래",
    }),
    {
      backgroundVideo: {
        src: elenaPlumpEmptyVideoUrl,
        loop: true,
        muted: true,
      },
    },
  ),
  hide("elena-day2-plumb"),
  say(
    "arka",
    "serious",
    tx({
      id: "Bagus, Arka. Sangat cerdas,",
      en: "Nice one, Arka. Very smart.",
      ja: "やったな、アルカ。実に賢い選択だ。",
      ko: "좋다, 아르카. 정말 똑똑한 짓이네.",
    }),
  ),
  narrate(
    tx({
      id: "gerutunya dalam hati.",
      en: "he mutters to himself inwardly.",
      ja: "と、彼は心の中で毒づいた。",
      ko: "그는 속으로 그렇게 중얼거렸다.",
    }),
  ),
  narrate(
    tx({
      id: "Dari dalam toilet terdengar suara Elena masih mengomel pelan.",
      en: "From the toilet, Elena can still be heard grumbling under her breath.",
      ja: "トイレの奥から、エレナがまだ小さく文句を言っている声が聞こえる。",
      ko: "화장실 안쪽에서는 엘레나가 여전히 작게 투덜거리는 소리가 들린다.",
    }),
  ),
  say(
    "elena",
    "angry",
    tx({
      id: "Kalau masih bocor juga malam ini, aku benar-benar habis kesabaran...",
      en: "If it's still leaking again tonight, I'm seriously out of patience...",
      ja: "今夜もまだ漏れるようなら、本気で我慢の限界よ…",
      ko: "오늘 밤에도 또 새면, 나 정말 인내심 바닥날 거야...",
    }),
  ),
  narrate(
    tx({
      id: "Arka menahan napas. Tangannya masih menggenggam kunci pipa. Ia mencoba diam total.",
      en: "Arka holds his breath. His hand is still gripping the pipe wrench. He tries to stay completely still.",
      ja: "アルカは息を止めた。手にはまだパイプレンチが握られている。完全に気配を消そうとする。",
      ko: "아르카는 숨을 죽인다. 손에는 아직 파이프 렌치가 쥐어져 있다. 그는 완전히 숨죽이고 있으려 한다.",
    }),
  ),
  narrate(
    tx({
      id: "Lalu terdengar langkah Elena kembali mendekat.",
      en: "Then Elena's footsteps are heard approaching again.",
      ja: "やがて、エレナの足音が再び近づいてきた。",
      ko: "그러다 엘레나의 발소리가 다시 가까워진다.",
    }),
  ),
  narrate(
    tx({
      id: "Arka makin menempel ke bawah lemari wastafel.",
      en: "Arka presses himself even tighter under the sink cabinet.",
      ja: "アルカはさらに洗面台の下へ身を押し込んだ。",
      ko: "아르카는 더 바짝 세면대 아래쪽으로 몸을 밀착시킨다.",
    }),
  ),
  bg(
    underPlumbUrl,
    tx({
      id: "Apartment 69 - Bawah Wastafel",
      en: "Apartment 69 - Under the Sink",
      ja: "Apartment 69 - 洗面台の下",
      ko: "Apartment 69 - 세면대 아래",
    }),
    {
      backgroundVideo: {
        src: elenaPlumpVideoUrl,
        loop: true,
        muted: true,
      },
    },
  ),
  narrate(
    tx({
      id: "Elena berhenti di depan wastafel. Ember kecil diletakkan di lantai.",
      en: "Elena stops in front of the sink. She sets a small bucket down on the floor.",
      ja: "エレナは洗面台の前で立ち止まり、小さなバケツを床に置いた。",
      ko: "엘레나는 세면대 앞에 멈춰 서서 작은 양동이를 바닥에 내려놓는다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Tolong jangan bikin masalah lagi,",
      en: "Please don't cause any more trouble.",
      ja: "お願いだから、もうこれ以上問題を起こさないで。",
      ko: "제발 더 이상 문제를 일으키지 마.",
    }),
  ),
  narrate(
    tx({
      id: "Kemudian ia meraih keran dan membukanya.",
      en: "Then she reaches for the faucet and turns it on.",
      ja: "それから彼女は蛇口に手を伸ばし、ひねった。",
      ko: "그리고 그녀는 수도꼭지를 잡아 틀었다.",
    }),
  ),
  narrate(
    tx({
      id: "Arka menegang.",
      en: "Arka tenses up.",
      ja: "アルカの体がこわばる。",
      ko: "아르카의 몸이 굳는다.",
    }),
  ),
  narrate(
    tx({
      id: "Air langsung mengalir lancar.",
      en: "The water immediately runs smoothly.",
      ja: "水はそのまま何事もなく流れ出した。",
      ko: "물이 곧바로 아무 문제 없이 흘러나온다.",
    }),
  ),
  narrate(
    tx({
      id: "Tidak ada tetesan bocor.",
      en: "There isn't a single leaking drip.",
      ja: "漏れ落ちる水滴はひとつもない。",
      ko: "새는 물방울은 하나도 없다.",
    }),
  ),
  narrate(
    tx({
      id: "Elena terdiam.",
      en: "Elena falls silent.",
      ja: "エレナは黙り込んだ。",
      ko: "엘레나는 말없이 멈춘다.",
    }),
  ),
  say(
    "elena",
    "surprised",
    tx({
      id: "Hah?",
      en: "Huh?",
      ja: "えっ？",
      ko: "어?",
    }),
  ),
  narrate(
    tx({
      id: "Ia membuka keran lebih besar. Air tetap mengalir normal. Lantai tetap kering.",
      en: "She opens the faucet wider. The water keeps running normally. The floor stays dry.",
      ja: "彼女は蛇口をさらにひねる。水は変わらず正常に流れ、床も乾いたままだ。",
      ko: "그녀는 수도를 더 세게 튼다. 물은 여전히 정상적으로 흐르고, 바닥도 마른 채다.",
    }),
  ),
  say(
    "elena",
    "surprised",
    tx({
      id: "Barusan... normal?",
      en: "Just now... normal?",
      ja: "さっきまで…普通じゃなかったのに？",
      ko: "방금 전까지는... 아니었잖아?",
    }),
  ),
  narrate(
    tx({
      id: "Di bawah wastafel, Arka memejamkan mata.",
      en: "Under the sink, Arka shuts his eyes tight.",
      ja: "洗面台の下で、アルカはぎゅっと目を閉じた。",
      ko: "세면대 아래에서 아르카는 눈을 질끈 감는다.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Selesai. Aku mati.",
      en: "That's it. I'm dead.",
      ja: "終わった。俺、死んだ。",
      ko: "끝났다. 나 죽었다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Jangan bilang pipa ini bener sendiri.",
      en: "Don't tell me this pipe fixed itself.",
      ja: "まさか、この配管が勝手に直ったっていうの？",
      ko: "설마 이 배관이 저절로 고쳐진 건 아니겠지.",
    }),
  ),
  narrate(
    tx({
      id: "Elena mematikan keran perlahan, masih bingung. Arka menahan napas di bawah wastafel, sambil melihat Elena mengambil ember menghadap ke belakang.",
      en: "Elena turns off the faucet slowly, still confused. Arka holds his breath under the sink as he watches Elena pick up the bucket with her back turned.",
      ja: "エレナは戸惑いながらゆっくり蛇口を閉める。アルカは洗面台の下で息を止めたまま、背を向けてバケツを持ち上げる彼女を見ていた。",
      ko: "엘레나는 여전히 혼란스러운 채 천천히 수도를 잠근다. 아르카는 세면대 아래에서 숨을 죽인 채, 등을 돌리고 양동이를 집는 엘레나를 지켜본다.",
    }),
  ),
  say(
    "elena",
    "neutral",
    tx({
      id: "Sepertinya aku sudah tidak butuh ini lagi",
      en: "Looks like I don't need this anymore.",
      ja: "もうこれは必要なさそうね。",
      ko: "이건 이제 필요 없을 것 같네.",
    }),
  ),
  bg(
    underPlumbUrl,
    tx({
      id: "Apartment 69 - Bawah Wastafel",
      en: "Apartment 69 - Under the Sink",
      ja: "Apartment 69 - 洗面台の下",
      ko: "Apartment 69 - 세면대 아래",
    }),
    {
      backgroundVideo: {
        src: elenaPlumpVideoUrl2,
        loop: true,
        muted: true,
      },
    },
  ),
  narrate(
    tx({
      id: "Sambil mengambil ember, Elena langsung pergi dari wastafel dan masuk ke toilet.",
      en: "Taking the bucket with her, Elena moves away from the sink and heads straight into the toilet.",
      ja: "バケツを手に取ると、エレナはそのまま洗面台から離れてトイレへ入っていった。",
      ko: "양동이를 집어 든 엘레나는 그대로 세면대에서 멀어져 화장실로 들어간다.",
    }),
  ),
  hide("elena-day2-plumb", "fadeAway"),
  narrate(
    tx({
      id: "Arka buru-buru mengencangkan sambungan terakhir pipa. Setelah yakin rapat, ia memutar keran sedikit dari bawah wastafel. Air mengalir lancar. Tidak ada tetesan lagi.",
      en: "Arka quickly tightens the pipe's last connection. Once he's sure it's secure, he twists the faucet slightly from under the sink. The water runs smoothly. No more drips.",
      ja: "アルカは慌てて最後の継ぎ目を締め直した。しっかり固定されたのを確認してから、洗面台の下からそっと蛇口をひねる。水は滑らかに流れ、もう一滴も漏れなかった。",
      ko: "아르카는 서둘러 마지막 배관 연결부를 조인다. 단단히 잠긴 걸 확인한 뒤 세면대 아래에서 수도를 살짝 틀어 본다. 물은 부드럽게 흐르고 더는 한 방울도 새지 않는다.",
    }),
  ),
  narrate(
    tx({
      id: "Mata Arka melebar.",
      en: "Arka's eyes widen.",
      ja: "アルカの目が大きく開いた。",
      ko: "아르카의 눈이 커진다.",
    }),
  ),
  say(
    "arka",
    "surprised",
    tx({
      id: "Beres...",
      en: "Done...",
      ja: "終わった…",
      ko: "됐다...",
    }),
  ),
  narrate(
    tx({
      id: "Tanpa membuang waktu, ia mendorong panel lemari wastafel kembali ke tempatnya, lalu berdiri pelan. Dari dalam toilet, Elena masih terdengar sibuk dengan ember dan perlengkapan mandi.",
      en: "Without wasting a second, he pushes the sink cabinet panel back into place and slowly stands up. From inside the toilet, Elena still sounds busy with the bucket and her bath supplies.",
      ja: "時間を無駄にせず、彼は洗面台のパネルを元に戻してから静かに立ち上がった。トイレの中では、エレナがまだバケツや洗面道具を動かしている音がする。",
      ko: "시간을 허비하지 않고 그는 세면대 패널을 제자리에 밀어 넣은 뒤 천천히 일어선다. 화장실 안에서는 엘레나가 여전히 양동이와 세면도구를 만지작거리는 소리가 들린다.",
    }),
  ),
  narrate(
    tx({
      id: "Arka melirik pintu kamar, lalu kembali menatap wastafel yang kini sudah diam.",
      en: "Arka glances at the room door, then looks back at the sink, now finally still.",
      ja: "アルカは部屋のドアへ視線を向け、それから今では静まり返った洗面台を見つめ直した。",
      ko: "아르카는 방문을 힐끗 본 뒤, 이제 완전히 조용해진 세면대를 다시 바라본다.",
    }),
  ),
  say(
    "arka",
    "gentle",
    tx({
      id: "Maaf, Elena. Tapi setidaknya ini selesai.",
      en: "Sorry, Elena. But at least this is fixed.",
      ja: "悪いな、エレナ。でも少なくとも、これで片付いた。",
      ko: "미안, 엘레나. 그래도 적어도 이건 끝났어.",
    }),
  ),
  narrate(
    tx({
      id: "Ia mengambil kain lap dan kunci pipanya, lalu melangkah ringan ke arah pintu. Tangannya membuka gagang perlahan agar tidak menimbulkan bunyi.",
      en: "He picks up his rag and pipe wrench, then lightly steps toward the door. His hand eases the handle open as quietly as possible.",
      ja: "彼は布きれとパイプレンチを拾い上げ、足音を殺してドアへ向かった。音を立てないよう、そっと取っ手を回す。",
      ko: "그는 걸레와 파이프 렌치를 집어 들고 가볍게 문 쪽으로 걸어간다. 소리가 나지 않게 손잡이를 천천히 돌린다.",
    }),
  ),
  narrate(
    tx({
      id: "Ceklek.",
      en: "Click.",
      ja: "カチッ。",
      ko: "철컥.",
    }),
  ),
  narrate(
    tx({
      id: "Arka membeku sesaat.",
      en: "Arka freezes for a second.",
      ja: "アルカは一瞬固まった。",
      ko: "아르카는 순간 얼어붙는다.",
    }),
  ),
  narrate(
    tx({
      id: "Namun tidak ada reaksi dari dalam toilet.",
      en: "But there is no reaction from inside the toilet.",
      ja: "だが、トイレの中から反応はない。",
      ko: "하지만 화장실 안쪽에서는 아무 반응도 없다.",
    }),
  ),
  narrate(
    tx({
      id: "Ia mengembuskan napas lega.",
      en: "He lets out a relieved breath.",
      ja: "彼は安堵の息を漏らした。",
      ko: "그는 안도의 숨을 내쉰다.",
    }),
  ),
  narrate(
    tx({
      id: 'Saat ingin membuka pintu keluar, Arka tidak sengaja melihat layar ponsel yang menyala. Nama "Arthur" muncul dengan beberapa panggilan tak terjawab.',
      en: 'As he\'s about to leave, Arka accidentally notices a phone screen lighting up. The name "Arthur" appears with several missed calls.',
      ja: '出ていこうとしたその時、アルカは偶然、光ったスマホの画面を目にする。"Arthur" という名前と、いくつもの不在着信が表示されていた。',
      ko: '막 문을 열고 나가려던 순간, 아르카는 우연히 불이 켜진 휴대폰 화면을 본다. "Arthur"라는 이름과 여러 통의 부재중 전화가 떠 있다.',
    }),
  ),
  say(
    "arka",
    "neutral",
    tx({
      id: "Kurasa dari tadi aku mendengarkan hp Elena berbunyi, tapi dia tidak pernah mengangkatnya.",
      en: "So that phone ringing earlier must've been Elena's... and she never picked it up.",
      ja: "さっきから鳴ってたの、エレナの携帯だったのか…でも彼女、一度も出なかったな。",
      ko: "아까부터 울리던 게 엘레나 휴대폰이었나 보네... 그런데 한 번도 안 받았어.",
    }),
  ),
  say(
    "arka",
    "serious",
    tx({
      id: "Hmm lebih baik aku pergi sekarang juga.",
      en: "Hmm, I'd better leave right now.",
      ja: "うーん、今のうちに出たほうがよさそうだ。",
      ko: "흠, 지금 바로 나가는 게 좋겠다.",
    }),
  ),
  bg(elenaHallwayUrl),
  hide("arka-day2-elena-hallway"),
  setFlag("day2ElenaCompleted", true),
  minigame("smartphone-contacts", {
    showSleepOption: true,
    sleepOptionNext: "day2-complate",
    requiredCompletionFlags: ["day2MayaCompleted", "day2ElenaCompleted"],
    disabledContacts: ["elena", "nadia", "sara"],
    conditionalDisabledContacts: {
      maya: "day2MayaCompleted",
    },
    title: tx({
      id: "Lanjutkan Hari 2",
      en: "Continue Day 2",
      ja: "2日目を続ける",
      ko: "2일차 계속하기",
    }),
    subtitle: tx({
      id: "Elena sudah beres. Kalau masih ada waktu, pilih siapa lagi yang mau dicek.",
      en: "Elena is done. If there's still time left, choose who else to check on.",
      ja: "エレナの件は終わった。まだ時間があるなら、次に誰を見るか選ぼう。",
      ko: "엘레나 쪽은 끝났다. 아직 시간이 남았다면 다음에 누구를 볼지 고르자.",
    }),
    contactOverrides: {
      maya: {
        next: "day2-route-maya",
      },
    },
  }),
];
