import type { VisualNovelCommand } from "@/types/novel";
import {
  bg,
  hide,
  jump,
  menu,
  narrate,
  playBgm,
  playSfx,
  say,
  scene,
  setFlag,
  show,
} from "@/scenes/scriptTypes";
import apartmentUrl from "@/background/apartment.png";
import elevatorUrl from "@/background/elevator.png";
import saraHallwayUrl from "@/background/sara-hallway.jpeg";
import day4Bgm from "@/music/rain-city.mp3";
import phoneSfx from "@/sfx/phone.mp3";
import liftSfx from "@/sfx/lift.wav";
import openDoorSfx from "@/sfx/open-door.wav";
import stepSfx from "@/sfx/step.mp3";

const showArkaAndSara = (
  arkaEmotion: "neutral" | "gentle" | "serious" | "shy" | "surprised" = "neutral",
  saraEmotion: "neutral" | "angry" | "blush" | "sad" | "smile" = "neutral",
): VisualNovelCommand[] => [
  show("arka-day4-sara", "arka", arkaEmotion, {
    position: "left",
    enterFrom: "left",
  }),
  show("sara-day4", "sara", saraEmotion, {
    position: "center",
    enterFrom: "right",
    xOffset: 0,
  }),
];

export const day4SaraStartScene: VisualNovelCommand[] = [
  playBgm(day4Bgm),
  setFlag("day4SelectedCharacter", "sara"),
  bg(apartmentUrl, "Apartment 69 - Unit 302"),
  show("arka-day4-sara", "arka", "neutral", {
    position: "left",
    enterFrom: "fade",
  }),
  narrate(
    "Sore hari. Arka menerima pesan singkat dari Sarah tepat ketika ia baru saja selesai dengan urusannya.",
  ),
  playSfx(phoneSfx),
  say(
    "sara",
    "neutral",
    "Kalau kamu tidak sibuk, datang ke basement parking dalam 20 menit. Ada hal yang ingin aku bicarakan.",
  ),
  narrate("Arka tidak menunggu lebih lama. Ia turun ke basement."),
  hide("arka-day4-sara"),
  scene(
    "linear-gradient(180deg, #202832 0%, #0b0f15 100%)",
    "Basement Parking Apartment 69",
  ),
  playSfx(stepSfx),
  ...showArkaAndSara("neutral", "neutral"),
  narrate(
    "Sarah sudah berdiri di samping mobil hitamnya, melepas mantel dan meletakkannya di kursi pengemudi. Ia memakai blouse gelap dengan beberapa kancing atas yang longgar.",
  ),
  say("sara", "smile", "Kamu datang."),
  say("arka", "neutral", "Kamu bilang 20 menit."),
  say("sara", "smile", "Aku menghargai orang yang menepati waktu."),
  narrate(
    "Ia menyandarkan pinggangnya di mobil, menatap Arka dengan tenang.",
  ),
  say(
    "sara",
    "neutral",
    "Tadi aku baru selesai meeting. Melelahkan. Orang-orang di ruangan itu hanya bicara soal angka dan keuntungan.",
  ),
  say("arka", "serious", "Dan sekarang kamu di basement."),
  say(
    "sara",
    "smile",
    "Karena di sini lebih sunyi. Dan karena aku ingin bertemu kamu.",
  ),
  narrate(
    "Ucapannya terdengar ringan, tapi matanya tidak bergerak dari Arka.",
  ),
  say(
    "sara",
    "neutral",
    "Kemarin di café, kamu banyak diam. Aku jadi penasaran... apakah kamu memang pendiam, atau hanya berhati-hati denganku?",
  ),
  menu("Apa jawaban Arka?", [
    {
      id: "reserved",
      label: '"Saya memang tidak banyak bicara."',
      next: "day4-sara-reserved",
    },
    {
      id: "reading",
      label: '"Saya masih membaca situasinya."',
      next: "day4-sara-reading",
    },
    {
      id: "listening",
      label: '"Denganmu, saya lebih memilih mendengarkan."',
      next: "day4-sara-listening",
    },
  ]),
];

export const day4SaraReservedScene: VisualNovelCommand[] = [
  setFlag("day4SaraAnswer", "reserved"),
  say("arka", "neutral", "Saya memang tidak banyak bicara."),
  jump("day4-sara-car-invite"),
];

export const day4SaraReadingScene: VisualNovelCommand[] = [
  setFlag("day4SaraAnswer", "reading"),
  say("arka", "serious", "Saya masih membaca situasinya."),
  jump("day4-sara-car-invite"),
];

export const day4SaraListeningScene: VisualNovelCommand[] = [
  setFlag("day4SaraAnswer", "listening"),
  say("arka", "gentle", "Denganmu, saya lebih memilih mendengarkan."),
  jump("day4-sara-car-invite"),
];

export const day4SaraCarInviteScene: VisualNovelCommand[] = [
  say("sara", "smile", "Jawaban yang tidak membosankan."),
  narrate("Sarah tersenyum tipis, lalu membuka pintu mobil sebelah penumpang."),
  say(
    "sara",
    "neutral",
    "Naik. Aku tidak ingin berbicara di basement terlalu lama.",
  ),
  playSfx(openDoorSfx),
  hide("arka-day4-sara", "fadeAway"),
  hide("sara-day4", "fadeAway"),
  scene(
    "linear-gradient(180deg, #181c24 0%, #05070b 100%)",
    "Interior Mobil Sarah",
  ),
  ...showArkaAndSara("neutral", "neutral"),
  narrate("Di dalam mobil, Sarah hanya duduk."),
  say(
    "sara",
    "sad",
    "Suamiku mengirim pesan tadi siang. Katanya perjalanan bisnisnya diperpanjang lagi.",
  ),
  narrate("Ia mengucapkannya datar."),
  say(
    "sara",
    "sad",
    "Aku sudah berhenti menghitung berapa kali ia bilang seperti itu.",
  ),
  narrate("Hening sejenak."),
  say(
    "sara",
    "sad",
    "Kamu tahu apa yang paling aneh? Aku tidak marah lagi. Hanya... kosong.",
  ),
  narrate("Ia menoleh ke Arka."),
  say(
    "sara",
    "sad",
    "Kalau aku bilang aku lelah menjadi wanita yang selalu terlihat baik-baik saja, kamu akan bilang apa?",
  ),
  menu("Apa jawaban Arka?", [
    {
      id: "too-long",
      label: '"Kedengarannya kamu sudah menahan terlalu lama."',
      next: "day4-sara-too-long",
    },
    {
      id: "not-strong",
      label: '"Kamu tidak harus selalu terlihat kuat."',
      next: "day4-sara-not-strong",
    },
  ]),
];

export const day4SaraTooLongScene: VisualNovelCommand[] = [
  say("arka", "gentle", "Kedengarannya kamu sudah menahan terlalu lama."),
  jump("day4-sara-tension"),
];

export const day4SaraNotStrongScene: VisualNovelCommand[] = [
  say("arka", "gentle", "Kamu tidak harus selalu terlihat kuat."),
  jump("day4-sara-tension"),
];

export const day4SaraTensionScene: VisualNovelCommand[] = [
  say("sara", "sad", "Kau benar."),
  narrate("Untuk sesaat, suara mesin dan basement di luar mobil terasa jauh."),
  say(
    "sara",
    "neutral",
    "Aku tidak tahu kenapa aku terus memanggilmu.",
  ),
  say(
    "sara",
    "neutral",
    "Mungkin karena kamu tidak langsung menginginkan sesuatu seperti orang kebanyakan.",
  ),
  narrate(
    "Tangannya terangkat, jari-jarinya menyentuh dasi Arka dengan gerakan sangat pelan.",
  ),
  say(
    "sara",
    "blush",
    "Atau mungkin... aku hanya ingin tahu sampai di mana kamu akan menahan diri.",
  ),
  menu("Apa yang dilakukan Arka?", [
    {
      id: "stay",
      label: "Tetap diam dan membiarkan.",
      next: "day4-sara-stay",
    },
    {
      id: "move-closer",
      label: "Membalas dan mendekat.",
      next: "day4-sara-move-closer",
    },
  ]),
];

export const day4SaraStayScene: VisualNovelCommand[] = [
  setFlag("day4SaraMovedCloser", false),
  narrate(
    "Arka tetap diam dan membiarkan jarak di antara mereka menipis. Ia tidak mendekat, tapi juga tidak mundur.",
  ),
  jump("day4-sara-kiss"),
];

export const day4SaraMoveCloserScene: VisualNovelCommand[] = [
  setFlag("day4SaraMovedCloser", true),
  narrate(
    "Arka mendekat sedikit, cukup untuk menjawab tanpa kata. Jarum jam di dashboard berdetak pelan di antara keheningan mereka.",
  ),
  jump("day4-sara-kiss"),
];

export const day4SaraKissScene: VisualNovelCommand[] = [
  narrate(
    "Sarah tidak menunggu lebih lama. Ia menutup sisa jarak di antara mereka dan mencium Arka, pelan di awal, lalu semakin dalam. Tangannya menahan kerah Arka seolah tidak ingin ia pergi.",
  ),
  say("sara", "blush", "Jangan bilang apa-apa dulu..."),
  narrate("Ciuman itu berlangsung beberapa saat sebelum Sarah melepaskannya."),
  say(
    "sara",
    "blush",
    "Ini pertama kalinya aku melakukan sesuatu yang benar-benar ingin kulakukan... tanpa memikirkan akibatnya.",
  ),
  say("sara", "neutral", "Diam."),
  say("sara", "blush", "Jangan tanya apa pun sekarang."),
  say("arka", "shy", "Sarah—"),
  narrate(
    "Sambil tetap mencium, tangan Sarah turun dan membuka celana Arka. Ia memegang milik Arka dengan gerakan yang sengaja pelan.",
  ),
  say("sara", "blush", "Sudah seperti ini hanya karena ciuman..."),
  say("sara", "smile", "Kamu kurang ajar."),
  say("arka", "shy", "Kamu yang mulai."),
  say("sara", "smile", "Dan aku yang akan mengakhiri."),
  narrate(
    "Sarah menggerakkan tangannya naik-turun dengan tempo yang ia kendalikan sendiri.",
  ),
  say("sara", "blush", "Jangan bergerak."),
  say("arka", "shy", "Tanganmu... erat."),
  narrate(
    "Gerakan tangan Sarah menjadi lebih cepat. Napasnya mulai terdengar, tapi ia masih menahan suara.",
  ),
  say("sara", "blush", "Kamu berdenyut..."),
  say("sara", "smile", "Kamu bisa menahannya, bukan?"),
  say("arka", "serious", "Sulit tidak menahan."),
  say("sara", "blush", "Kalau begitu, jangan ditahan lagi."),
  narrate("Ia mempercepat gerakannya."),
  say("sara", "blush", "Keluarlah."),
  say("sara", "blush", "Di tangan aku."),
  say("sara", "angry", "Sekarang."),
  say("arka", "shy", "Sarah... aku hampir..."),
  narrate(
    "Arka keluar di tangan Sarah. Sarah terus menggerakkan tangannya sampai selesai, baru kemudian melepaskan ciuman.",
  ),
  say("arka", "shy", "Nngghh..."),
  say("sara", "blush", "Hnn..."),
  narrate(
    "Ia mengambil tisu dan membersihkan tangannya dengan gerakan rapi.",
  ),
  jump("day4-sara-ending"),
];

export const day4SaraEndingScene: VisualNovelCommand[] = [
  say("sara", "neutral", "Jangan bilang ini berarti sesuatu."),
  narrate("Arka hanya diam, membiarkan Sarah menyimpan kembali kendalinya."),
  say(
    "sara",
    "sad",
    "Aku hanya... sedang lelah mengendalikan semuanya sendirian.",
  ),
  narrate("Ia merapikan blouse-nya."),
  say(
    "sara",
    "neutral",
    "Antar aku ke atas. Dan malam ini, kita berhenti di sini.",
  ),
  say("arka", "gentle", "Baik."),
  narrate("Sarah membuka pintu mobil, lalu menoleh sebentar."),
  say("sara", "smile", "Lain kali... jangan terlalu mudah menurut."),
  hide("arka-day4-sara", "fadeAway"),
  hide("sara-day4", "fadeAway"),
  bg(elevatorUrl, "Lift Menuju Penthouse"),
  playSfx(liftSfx),
  ...showArkaAndSara("neutral", "neutral"),
  narrate(
    "Arka mengantar Sarah naik tanpa menambahkan pertanyaan yang bisa menghancurkan keterusterangan malam itu.",
  ),
  hide("arka-day4-sara", "fadeAway"),
  hide("sara-day4", "fadeAway"),
  bg(saraHallwayUrl, "Depan Penthouse Sarah"),
  ...showArkaAndSara("neutral", "smile"),
  narrate(
    "Di depan pintu penthouse, Sarah berhenti sejenak. Ia tidak mengundang Arka masuk, tapi juga tidak langsung menutup pintu.",
  ),
  say("sara", "smile", "Sampai di sini cukup untuk malam ini."),
  say("arka", "gentle", "Selamat malam, Sarah."),
  say("sara", "neutral", "Selamat malam, Arka."),
  hide("arka-day4-sara", "fadeAway"),
  hide("sara-day4", "fadeAway"),
  setFlag("day4SaraCompleted", true),
  setFlag("day4SaraIntimate", true),
  setFlag("saraAffection", 4),
  jump("day4-complate"),
];
