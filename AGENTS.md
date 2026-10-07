# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

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

### Rendering Performance Verification

Run `bun test rendering-performance.test.ts` for transform complexity, real Maya/father SBN transform compatibility, render cadence, animation speed, and padded-image cache regression checks. These use Bun's built-in runner without additional dependencies.

Bun test files explicitly load ambient test declarations with `import type {} from "bun";` because the application tsconfig restricts automatic types to `vite/client`. Installing `@types/bun` alone does not resolve `bun:test` under those compiler options.

Character sprites now advance in their own `requestAnimationFrame` loops, not a store-level `tickCharacters` loop. `createAnimationFrameGate` applies the selected 24/40/60 FPS render limit independently of each character's animation playback FPS.

SBN `attachmentOpacityKeyframes` tracks use `slotId:attachmentName` keys. The Canvas renderer samples these with easing for both mesh and image attachments. The leaf animation relies on this fade-out to hide the position reset at its loop boundary; regression tests cover the actual `src/assets/leaf.sbn` asset.

### Dialogue Controls Verification

Run `bun test dialogue-controls.test.ts` to verify persistent SVG toolbar controls, input isolation, and saved dialogue/cutscene restoration. `StoryToolbar` renders outside the story stage, fixed at the top-right for both desktop and mobile; control order is shared through `STORY_CONTROL_IDS`. On devices with a fine hover pointer, it starts hidden, appears only on mouse movement, and fades out after 2 seconds of inactivity. Keyboard input, toolbar focus, and opening modals must not reveal it or extend the idle timer. Hidden controls leave the tab order and release focus. Touch devices keep it visible; use pointer capabilities rather than viewport dimensions for this behavior. Its layer is 110, above cutscenes (100) and below story modals (120), loading (140), and exit confirmation (200). In-story Save and Load share `SaveSlotOverlay` via `saveSlotMode`; Auto and story keyboard advance pause while story modals are open. Cutscene keyboard handlers must ignore toolbar focus, open modals, and already-handled key events.

### Smartphone Route Verification

Run `bun test smartphone-routing.test.ts` to check that Day 2–4 selection points pause at `smartphone-contacts`, contact choices enter their registered routes, and the Day 4 wrap-up only permits ending the day. Smartphone activation is controlled by scene `minigame()` commands; direct route `jump()` commands bypass its UI. `resolveSmartphoneDisabledContacts` shares conditional locking between desktop/mobile and tests. Incomplete route flags must not lock Skip Day when every character contact is unavailable; explicit Skip Day locks still apply.

### Background Camera Motion

`bg()` defaults image backgrounds to a 24-second looping drift. Explicit `backgroundAnimation` settings override this; `backgroundAnimation: null` opts out. Background videos and plain `scene()` transitions do not get default drift. `App.tsx` returns the camera smoothly to its original transform over 600 ms before revealing sprites, then disables camera motion and pauses parallax while visible or exiting sprites with positive opacity remain on stage. Dialogue typing and advance wait for the camera reset. `src/lib/rendering/backgroundAnimation.ts` supplies Web Animations keyframes and a cancellable reset for both image and video rendering. CSS camera animations must stay disabled: cancelling a Web Animation must first preserve its computed transform, and loops must begin and end at the same transform to avoid jumps when restarting. Regression coverage lives in `bun test rendering-performance.test.ts`.
