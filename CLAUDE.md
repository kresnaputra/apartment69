# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev       # Start dev server (Vite)
bun run build     # Type-check + production build
bun run preview   # Preview production build
```

No test runner is configured. No linter config exists beyond TypeScript.

Path alias `@/` resolves to `src/`.

All user-facing strings (UI labels, dialogue, status messages, hints) are in **Bahasa Indonesia**.

## Architecture

### SBN Character Format

`.sbn` files are ZIP archives containing a `project.json` (bone/slot/attachment/keyframe data) and image assets. Characters are loaded at startup via `loadSbnBundle` (`src/lib/sbn/loadSbnBundle.ts`), which unzips the archive, hydrates image assets as data URLs, and returns a `LoadedSbnBundle`.

Rendering uses a custom skeletal animation system (`src/lib/sbn/sampling.ts`):
- `sampleBonesAtFrame` — interpolates bone transforms at a given frame using keyframe data
- `computeAllWorldTransforms` — propagates transforms down the bone hierarchy
- `resolveSceneDrawables` — maps bones → slots → attachments for draw ordering
- `fitCameraToScene` — auto-fits the viewport by sampling across the animation's duration

`CanvasSbnRenderer` (`src/lib/rendering/canvasSbnRenderer.ts`) renders onto an HTML `<canvas>` using Canvas 2D. A `PixiJS` bridge also exists at `src/lib/rendering/pixiBridge.ts` but is not yet wired into the main UI.

### Character System

Characters are defined in `src/character/<name>/character.ts` as a `CharacterDefinition` (from `src/types/novel.ts`) and registered in `src/character/index.ts`. Each character maps emotions to bundle IDs (`.sbn` files). The `characterBundleRegistry` maps bundle IDs to Vite asset URL imports (`?url`).

Adding a new character requires:
1. Adding the character ID and its emotions to `src/character/catalog.ts`
2. Creating `src/character/<name>/character.ts` with the `CharacterDefinition` and bundle registry
3. Registering the character in `src/character/index.ts`
4. Placing the `.sbn` file(s) alongside the character definition

`applyCharacterBundleConfig` (`src/lib/runtime/characterRegistry.ts`) applies draw-order overrides for named attachment slots (e.g. `Bahu`, `Kepala`, `Rambut`) to both `aira-*` and `reno-*` bundles.

### Script / Story System

Scripts are plain TypeScript arrays of `VisualNovelCommand` objects (defined in `src/types/novel.ts`). Scene files in `src/scenes/` use helper builder functions from `src/scenes/scriptTypes.ts` (`scene`, `show`, `say`, `narrate`, `menu`, `moveTo`, `jump`). All scene arrays are composed into a `VisualNovelScript` in `src/lib/runtime/dialogueScript.ts`.

The script interpreter lives entirely in `src/store/novelStore.ts` (`runScriptUntilPause`). It runs commands synchronously in a loop up to `MAX_STEPS_PER_PASS = 100`, stopping at `say`, `menu`, or `scene` commands. The Zustand store (`useNovelStore`) is the single source of truth for engine state.

### Rendering Loop in App.tsx

`App.tsx` is a single large component that orchestrates:
- Loading bundles on mount and registering them with the store
- A `requestAnimationFrame` loop calling `tickCharacters` at 24 fps
- `CharacterSprite` components each holding their own `CanvasSbnRenderer` instance
- Scene transition via a CSS animation keyed on `sceneTransitionToken`
- Text typewriter effect via `setInterval` at `TEXT_SPEED = 18 ms/char`
- Narrator mode (when `speaker === null` and `line` is non-empty) renders a separate UI from the dialogue box

Characters are dimmed when another character is actively speaking (`activeCharacterId`). Characters are sorted by `y` for depth ordering.
