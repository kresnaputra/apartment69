# Visual Novel Engine

Visual novel engine berbasis `React 19 + TypeScript + Vite + Zustand + Tailwind CSS v4 + Bun + Tauri` dengan pendekatan ala Ren'Py: layar langsung menjadi scene VN, dialog box, pilihan, dan karakter tampil dari script TypeScript.

**Now available as a native desktop app using Tauri!** See [TAURI.md](./TAURI.md) for desktop app setup and instructions.

## Jalankan

### Web Version
```bash
bun install
bun run dev
```

### Desktop App (Tauri)
```bash
bun install
bun run tauri:dev
```

Build production:

```bash
# Web build
bun run build

# Desktop app build
bun run tauri:build
```

## Fitur Saat Ini

- Auto-load karakter `.sbn` dari `public/demo/PLAYER.sbn`.
- Renderer karakter berbasis `<canvas>` untuk memutar rig `.sbn` langsung di stage visual novel.
- Script VN ala Ren'Py dalam TypeScript dengan command `scene`, `showCharacter`, `say`, `menu`, `jump`, dan command flag/branching.
- Dialog box full-screen, typewriter text, klik/Space/Enter untuk lanjut, dan pilihan bercabang.
- Zustand store untuk state cerita, karakter aktif, pilihan, progress label, dan `flags`.

## Struktur

- `src/lib/sbn`: parser bundle dan util sampling/keyframe.
- `src/lib/rendering`: renderer canvas untuk karakter `.sbn`.
- `src/character`: definisi karakter, bundle, dan transform default.
- `src/scenes`: dialog dan command cerita per adegan.
- `src/lib/runtime/dialogueScript.ts`: penggabung scene menjadi script VN.
- `src/store/novelStore.ts`: runtime flow label/command ala visual novel.
- `src/App.tsx`: layar visual novel penuh.

## Sistem Flag

Engine sekarang punya state `flags` untuk menyimpan keputusan pemain atau progress story yang perlu dipakai lagi di scene lain.

Tipe value yang didukung:

- `boolean`
- `number`
- `string`
- `null`

Flag disimpan di store runtime dan ikut tersimpan ke save slot. Jadi kalau player save lalu load ulang, conditional branch tetap konsisten.

## Command Flag Baru

Command baru didefinisikan di `src/types/novel.ts` dan helper-nya ada di `src/scenes/scriptTypes.ts`.

### `setFlag(name, value)`

Menyimpan atau menimpa flag.

```ts
setFlag("mayaAcceptedNumber", true)
setFlag("trustLevel", 2)
setFlag("currentRoute", "maya")
```

### `clearFlag(name)`

Menghapus flag dari state.

```ts
clearFlag("currentRoute")
```

### `jumpIf(name, target, options?)`

Melakukan lompatan label secara kondisional berdasarkan isi flag.

Aturan perilaku:

- Jika `options.value` tidak diberikan, `jumpIf` akan mengecek truthy/falsy.
- Jika `options.value` diberikan, value harus sama persis.
- Jika kondisi terpenuhi, script lompat ke `target`.
- Jika kondisi gagal dan `elseTarget` ada, script lompat ke `elseTarget`.
- Jika kondisi gagal dan `elseTarget` tidak ada, script lanjut ke command berikutnya.

Contoh:

```ts
jumpIf("mayaAcceptedNumber", "day2-hallway")

jumpIf("mayaAcceptedNumber", "maya-route", {
  value: true,
  elseTarget: "default-route",
})

jumpIf("currentRoute", "maya-route", {
  value: "maya",
  elseTarget: "shared-route",
})
```

## Contoh Pola Pakai

Contoh sederhana route berdasarkan pilihan:

```ts
menu("Pilih responsmu", [
  { id: "accept", label: "Terima", next: "accept-maya-number" },
  { id: "decline", label: "Tolak", next: "decline-maya-number" },
])

export const acceptMayaNumberScene: VisualNovelCommand[] = [
  setFlag("mayaAcceptedNumber", true),
  say("maya", "calm", "Thanks, Arka… I’ll text you later, okay?"),
  jump("elena-encounter"),
];

export const declineMayaNumberScene: VisualNovelCommand[] = [
  setFlag("mayaAcceptedNumber", false),
  say("maya", "calm", "Ah… sorry if I made you uncomfortable…"),
  jump("elena-encounter"),
];

export const someLaterScene: VisualNovelCommand[] = [
  jumpIf("mayaAcceptedNumber", "maya-followup", {
    value: true,
    elseTarget: "neutral-followup",
  }),
];
```

## Catatan Implementasi

- State flag disimpan di `useNovelStore`.
- Save slot menyimpan `flags` bersama label, index, background, dan karakter.
- Sistem `menu` yang lama tetap dipakai seperti biasa; flag hanya menambah lapisan state untuk branching yang lebih fleksibel.
- Pendekatan ini cocok untuk affection points, route lock, event unlock, atau penanda progress seperti `metMaya`, `helpedElena`, dan `day2Started`.
