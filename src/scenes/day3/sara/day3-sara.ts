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
  setFlag,
  show,
} from "@/scenes/scriptTypes";
import hallwayUrl from "@/background/hallway.png";
import saraHallwayUrl from "@/background/sara-hallway.jpeg";
import cafeUrl from "@/background/cafe.jpeg";
import elevatorUrl from "@/background/elevator.png";
import day3Bgm from "@/music/day3.mp3";
import phoneSfx from "@/sfx/phone.mp3";
import liftSfx from "@/sfx/lift.wav";
import openDoorSfx from "@/sfx/open-door.wav";

export const day3SaraStartScene: VisualNovelCommand[] = [
  playBgm(day3Bgm),
  hide("arka-campus"),
  bg(hallwayUrl, "Apartment 69 - Lorong Unit 302"),
  show("arka-day3-sara", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  narrate(
    "Sore hari. Arka baru saja keluar dari unitnya ketika ponselnya bergetar.",
  ),
  playSfx(phoneSfx),
  say("sara", "smile", "Hi Arka, apa ada kegiatan hari ini?"),
  say(
    "arka",
    "neutral",
    "Aku baru selesai mengerjakan tugas kuliahu. Ada apa?",
  ),
  say(
    "sara",
    "smile",
    "Aku di café lantai dasar. Kalau kamu tidak keberatan, duduklah sebentar. Kopinya sudah aku pesan.",
  ),
  say("arka", "gentle", "Aku akan segera ke sana."),
  hide("arka-day3-sara", "fadeAway"),
  bg(cafeUrl, "Apartment 69 - Café Lantai Dasar"),
  show("arka-day3-sara", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  narrate(
    "Arka turun ke café apartemen. Sarah sudah duduk di sudut yang cukup sepi, memakai blouse putih dan mantel tipis. Di meja sudah ada dua cangkir kopi.",
  ),
  show("sara-day3", "sara", "smile", {
    position: "center",
    enterFrom: "right",
    xOffset: 0,
  }),
  say("sara", "smile", "Tepat waktu. Aku pikir kau akan menolak ajakanku."),
  say("arka", "shy", "Aku tidak enak kalau menolaknya."),
  narrate("Sarah mendorong satu cangkir ke arah Arka."),
  say(
    "sara",
    "neutral",
    "Hari ini aku tidak meminta bantuan teknis. Hanya ingin bicara santai.",
  ),
  say("arka", "neutral", "Tentang apa?"),
  say(
    "sara",
    "neutral",
    "Tidak tentu. Kadang aku hanya ingin mendengar suara orang lain selain pesanan lewat telepon.",
  ),
  say(
    "sara",
    "neutral",
    "Kamu tipe orang yang sering menghabiskan waktu sendiri?",
  ),
  say(
    "arka",
    "neutral",
    "Cukup sering. Terkadang kalau sedang libur, aku menghabiskan waktuku di kamar.",
  ),
  say(
    "sara",
    "sad",
    "Aku juga... mungkin bedanya aku tidak ada waktu untuk menghibur diriku sendiri.",
  ),
  narrate(
    "Ucapannya terdengar ringan, tapi matanya tidak terlalu ikut tertawa.",
  ),
  menu("Bagaimana Arka merespons?", [
    {
      id: "empathy",
      label: '"Kedengarannya melelahkan."',
      next: "day3-sara-empathy",
    },
    {
      id: "listen",
      label: "Tetap diam dan menunggu dia melanjutkan.",
      next: "day3-sara-listen",
    },
  ]),
];

export const day3SaraEmpathyScene: VisualNovelCommand[] = [
  say("arka", "gentle", "Kedengarannya melelahkan."),
  narrate(
    "Sarah menatap Arka sejenak, lalu menunduk ke cangkir kopinya seperti menimbang kata-katanya.",
  ),
  jump("day3-sara-cafe-continue"),
];

export const day3SaraListenScene: VisualNovelCommand[] = [
  narrate(
    "Arka tetap diam dan menunggu. Ia tidak buru-buru mengisi keheningan, dan Sarah akhirnya melanjutkan ceritanya.",
  ),
  jump("day3-sara-cafe-continue"),
];

export const day3SaraCafeContinueScene: VisualNovelCommand[] = [
  say(
    "sara",
    "sad",
    "Suamiku pulang mungkin dua atau tiga kali dalam sebulan. Itupun biasanya hanya untuk mengambil dokumen dan pergi lagi.",
  ),
  narrate("Ia mengucapkannya dengan tenang, seolah sudah terbiasa."),
  say(
    "sara",
    "neutral",
    "Aku tidak bercerita ini agar dikasihani. Hanya saja... membicarakannya dengan seseorang yang tidak berkepentingan terasa sedikit lebih ringan.",
  ),
  say("arka", "gentle", "Kenapa memilihku?"),
  say(
    "sara",
    "smile",
    "Karena kamu tidak langsung mencoba menyenangkan saya. Itu langka.",
  ),
  narrate(
    "Beberapa saat kemudian, Sarah melihat ponselnya, lalu menghela napas kecil.",
  ),
  playSfx(phoneSfx),
  say(
    "sara",
    "neutral",
    "Ada panggilan masuk dari asisten suami saya. Biasanya ini berarti jadwalnya berubah lagi.",
  ),
  narrate(
    "Ia mengangkat ponsel ke telinga sejenak, hanya mendengarkan, lalu mematikan tanpa banyak bicara.",
  ),
  say("sara", "sad", "Seperti yang kupikirkan. Pulangnya ditunda."),
  narrate("Ia tersenyum tipis, tapi senyum itu tidak sampai ke matanya."),
  say(
    "sara",
    "neutral",
    "Kamu mau antar aku kembali ke atas? Atau kamu punya urusan lain?",
  ),
  menu("Apa yang akan Arka lakukan?", [
    {
      id: "escort",
      label: "Mengantar Sarah ke penthouse.",
      next: "day3-sara-escort",
    },
    {
      id: "decline",
      label: "Menolak dengan halus.",
      next: "day3-sara-decline",
    },
  ]),
];

export const day3SaraEscortScene: VisualNovelCommand[] = [
  setFlag("day3SaraEscorted", true),
  say("arka", "gentle", "Aku antar."),
  hide("arka-day3-sara", "fadeAway"),
  hide("sara-day3", "fadeAway"),
  bg(elevatorUrl, "Lift Menuju Penthouse"),
  playSfx(liftSfx),
  show("arka-day3-sara", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  show("sara-day3", "sara", "neutral", {
    position: "center",
    enterFrom: "right",
    xOffset: 0,
  }),
  narrate("Di dalam lift, suasana lebih sunyi dari kemarin."),
  say(
    "sara",
    "neutral",
    "Kamu tidak bertanya banyak. Itu membuat orang seperti saya sedikit kesulitan.",
  ),
  say("arka", "neutral", "Kesulitan dalam hal apa?"),
  say(
    "sara",
    "blush",
    "Biasanya aku bisa menebak apa yang orang inginkan dariku. Denganmu, belum.",
  ),
  narrate("Pintu lift terbuka. Sarah tidak langsung masuk ke dalam unitnya."),
  say("sara", "blush", "Masuklah sebentar. Hanya sebentar."),
  hide("arka-day3-sara", "fadeAway"),
  hide("sara-day3", "fadeAway"),
  bg(saraHallwayUrl, "Penthouse Sara"),
  playSfx(openDoorSfx),
  show("arka-day3-sara", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  show("sara-day3", "sara", "smile", {
    position: "center",
    enterFrom: "right",
    xOffset: 0,
  }),
  narrate(
    "Setelah beberapa menit berbicara, Sarah mengantar Arka kembali ke pintu.",
  ),
  say("sara", "smile", "Terima kasih sudah menemani."),
  narrate("Ia menatap Arka sejenak sebelum menutup pintu."),
  say(
    "sara",
    "blush",
    "Lain kali, aku mungkin tidak hanya mengajakmu minum kopi.",
  ),
  jump("day3-sara-ending"),
];

export const day3SaraDeclineScene: VisualNovelCommand[] = [
  setFlag("day3SaraEscorted", false),
  say(
    "arka",
    "serious",
    "Sebenarnya aku masih ada urusan lain. Mungkin lain kali.",
  ),
  say("sara", "sad", "Baiklah. Mungkin lain kali."),
  narrate(
    "Sarah tidak marah. Ia hanya mengambil cangkirnya, berpamitan dengan tenang, dan meninggalkan café lebih dulu.",
  ),
  jump("day3-sara-ending"),
];

export const day3SaraEndingScene: VisualNovelCommand[] = [
  hide("arka-day3-sara"),
  hide("sara-day3", "fadeAway"),
  setFlag("day3Slot2SarahCompleted", true),
  setFlag("day3SaraCompleted", true),
  narrate(
    "Dia berbicara seolah semuanya biasa saja, tapi semakin lama aku menemani, semakin jelas ada sesuatu yang terus dia tahan sendiri.",
    "arka",
  ),
  jump("day3-complete"),
];
