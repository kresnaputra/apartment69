# Visual Novel Engine

Visual novel engine berbasis `React 19 + TypeScript + Vite + Zustand + Tailwind CSS v4 + Bun` dengan pendekatan ala Ren'Py: layar langsung menjadi scene VN, dialog box, pilihan, dan karakter tampil dari script TypeScript.

## Jalankan

```bash
bun install
bun run dev
```

Build production:

```bash
bun run build
```

## Fitur Saat Ini

- Auto-load karakter `.sbn` dari `public/demo/PLAYER.sbn`.
- Renderer karakter berbasis `<canvas>` untuk memutar rig `.sbn` langsung di stage visual novel.
- Script VN ala Ren'Py dalam TypeScript dengan command `scene`, `showCharacter`, `say`, `menu`, dan `jump`.
- Dialog box full-screen, typewriter text, klik/Space/Enter untuk lanjut, dan pilihan bercabang.
- Zustand store untuk state cerita, karakter aktif, pilihan, dan progress label.

## Struktur

- `src/lib/sbn`: parser bundle dan util sampling/keyframe.
- `src/lib/rendering`: renderer canvas untuk karakter `.sbn`.
- `src/character`: definisi karakter, bundle, dan transform default.
- `src/scenes`: dialog dan command cerita per adegan.
- `src/lib/runtime/dialogueScript.ts`: penggabung scene menjadi script VN.
- `src/store/novelStore.ts`: runtime flow label/command ala visual novel.
- `src/App.tsx`: layar visual novel penuh.
