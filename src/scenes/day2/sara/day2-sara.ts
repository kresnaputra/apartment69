import type { VisualNovelCommand } from "@/types/novel";
import { tx } from "@/lib/i18n";
import { bg, hide, jump, menu, minigame, narrate, playBgm, say, setFlag, show } from "@/scenes/scriptTypes";
import lobby from "@/background/front-office.png";
import elevator from "@/background/elevator.png";
import penthouse from "@/background/apartment.png";
import day2Bgm from "@/music/day2.mp3";

export const day2SaraScene: VisualNovelCommand[] = [
  playBgm(day2Bgm),
  hide("arka-bedroom"),
  bg(lobby, "Lobi Apartemen 69"),
  show("arka-day2-sara", "arka", "neutral", { position: "left", enterFrom: "left" }),
  narrate("Siang hari. Arka turun ke lobi untuk mengambil paket. Dari pintu kaca, Sarah muncul sambil melepas kacamata hitamnya dan berjalan pelan ke arahnya."),
  show("sara-day2", "sara", "smile", { position: "right", enterFrom: "right" }),
  say("sara", "smile", "Kebetulan sekali."),
  say("arka", "neutral", "Bu Sarah."),
  say("sara", "smile", "Cukup Sarah saja. Dipanggil 'Bu' terus membuat suasana jadi kaku."),
  say("sara", "neutral", "Kemarin kamu bilang akan melihat jadwal. Kebetulan aku lagi butuh bantuan kecil hari ini."),
  say("arka", "neutral", "Bantuan apa?"),
  say("sara", "neutral", "Ada beberapa kabel di unitku yang berantakan sejak kemarin. Bukan masalah besar, tapi cukup mengganggu. Kalau kamu sedang tidak sibuk, boleh minta tolong?"),
  menu("Apa jawaban Arka?", [
    { id: "accept", label: "Bisa. Saya ikut sekarang.", next: "day2-sara-accept" },
    { id: "delay", label: "Saya ada urusan dulu. Mungkin nanti.", next: "day2-sara-delay" },
  ]),
];

export const day2SaraAcceptScene: VisualNovelCommand[] = [
  say("arka", "gentle", "Bisa. Saya ikut sekarang."),
  say("sara", "smile", "Bagus. Aku tidak suka menunggu terlalu lama."),
  jump("day2-sara-lift"),
];

export const day2SaraDelayScene: VisualNovelCommand[] = [
  say("arka", "serious", "Saya ada urusan dulu. Mungkin nanti."),
  say("sara", "angry", "Baiklah. Tapi jangan terlalu lama. Aku mudah lupa dengan penawaran yang tertunda."),
  narrate("Arka mengambil paketnya lebih dulu. Tak lama kemudian, ia kembali menemui Sarah di depan lift."),
  say("arka", "gentle", "Urusanku sudah selesai. Kalau tawarannya masih berlaku, aku bisa membantu sekarang."),
  say("sara", "smile", "Kali ini masih berlaku. Ayo."),
  jump("day2-sara-lift"),
];

export const day2SaraLiftScene: VisualNovelCommand[] = [
  bg(elevator, "Lift Menuju Penthouse"),
  narrate("Mereka naik lift bersama. Suasananya cukup tenang."),
  say("sara", "neutral", "Kamu termasuk orang yang pendiam, ya?"),
  say("arka", "neutral", "Tergantung situasinya."),
  say("sara", "smile", "Kamu unik sekali."),
  narrate("Sarah melirik Arka sebentar, lalu kembali menatap pintu lift."),
  say("sara", "sad", "Kadang aku iri dengan orang yang bisa bilang apa adanya tanpa banyak perhitungan."),
  bg(penthouse, "Penthouse Sarah - Ruang Kerja"),
  narrate("Tiba di penthouse, Sarah mengantar Arka ke ruang kerjanya."),
  say("sara", "neutral", "Ini dia. Beberapa kabelnya tercabut dan aku tidak sempat membereskannya."),
  narrate("Di atas meja, beberapa kabel saling bercampur. Arka memperhatikan ujung dan port yang cocok."),
  minigame("cable-matching"),
  jump("day2-sara-after-cables"),
];

export const day2SaraAfterCablesScene: VisualNovelCommand[] = [
  say("sara", "smile", "Cepat juga."),
  narrate("Sarah menuangkan air ke dua gelas, lalu menyerahkan satu kepada Arka."),
  say("sara", "neutral", "Duduk sebentar. Aku tidak suka orang langsung pergi setelah membantu."),
  narrate("Mereka duduk di sofa dekat jendela."),
  say("sara", "neutral", "Kamu sudah berapa lama tinggal di sini?"),
  say("arka", "neutral", "Belum lama."),
  say("sara", "smile", "Terlihat. Masih ada aura 'baru pindah'."),
  narrate("Sarah tersenyum kecil."),
  say("sara", "sad", "Gedung ini sebenarnya sepi di malam hari. Kadang terlalu sepi."),
  say("arka", "gentle", "Kamu sering merasa begitu?"),
  say("sara", "sad", "Kadang. Tapi aku sudah terbiasa. Kebiasaan yang tidak selalu menyenangkan."),
  narrate("Ia menatap gelasnya sebentar, lalu kembali menatap Arka."),
  say("sara", "blush", "Kamu orang yang mudah diajak bicara, ternyata."),
  say("arka", "neutral", "Saya hanya menjawab."),
  say("sara", "smile", "Justru itu yang jarang kudapat."),
  narrate("Hening sebentar."),
  say("sara", "blush", "Kalau lain kali aku minta bantuan lagi... kamu masih bersedia?"),
  menu("Apa jawaban Arka?", [
    { id: "yes", label: "Bisa.", next: "day2-sara-yes" },
    { id: "maybe", label: "Saya pikir-pikir dulu.", next: "day2-sara-maybe" },
  ]),
];

export const day2SaraYesScene: VisualNovelCommand[] = [
  say("arka", "gentle", "Bisa."),
  say("sara", "smile", "Kalau begitu, aku akan mengingatnya."),
  jump("day2-sara-ending"),
];

export const day2SaraMaybeScene: VisualNovelCommand[] = [
  say("arka", "shy", "Saya pikir-pikir dulu."),
  say("sara", "blush", "Begitu, ya? Sekarang aku jadi semakin penasaran dengan jawabanmu."),
  jump("day2-sara-ending"),
];

export const day2SaraEndingScene: VisualNovelCommand[] = [
  say("sara", "smile", "Baiklah, sampai ketemu lagi?"),
  narrate("Caranya bicara tenang, tapi ada sesuatu yang tertahan di baliknya. Bukan seperti orang yang benar-benar baik-baik saja.", "arka"),
  hide("sara-day2", "fadeAway"),
  hide("arka-day2-sara"),
  setFlag("day2SaraCompleted", true),
  bg(penthouse, "Apartemen 69 - Hari 2"),
  minigame("smartphone-contacts", {
    showSleepOption: true,
    sleepOptionNext: "day2-complate",
    requiredCompletionFlags: ["day2MayaCompleted", "day2ElenaCompleted"],
    conditionalDisabledContacts: {
      maya: "day2MayaCompleted",
      elena: "day2ElenaCompleted",
      nadia: "day2NadiaCompleted",
      sara: "day2SaraCompleted",
    },
    title: tx({ id: "Lanjutkan Hari 2", en: "Continue Day 2" }),
    subtitle: tx({ id: "Setelah bertemu Sarah, siapa lagi yang ingin kamu temui?", en: "After meeting Sarah, who else would you like to see?" }),
    contactOverrides: {
      maya: { next: "day2-route-maya" },
      elena: { next: "day2-route-elena" },
      nadia: { next: "day2-route-nadia" },
      sara: { next: "day2-route-sara" },
    },
  }),
];
