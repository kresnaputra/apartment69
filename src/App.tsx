import { type CSSProperties, forwardRef, memo, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import { ElevatorButtonMinigame } from "@/components/minigames/ElevatorButtonMinigame";
import { PipeConnectionMinigame } from "@/components/minigames/PipeConnectionMinigame";
import { ElevatorButtonMinigameMobile } from "@/components/minigames/ElevatorButtonMinigameMobile";
import { PipeConnectionMinigameMobile } from "@/components/minigames/PipeConnectionMinigameMobile";
import { SmartphoneContactMinigame } from "@/components/minigames/SmartphoneContactMinigame";
import { SmartphoneContactMinigameMobile } from "@/components/minigames/SmartphoneContactMinigameMobile";
import { LaptopCleanupMinigame } from "@/components/minigames/LaptopCleanupMinigame";
import { EmailComposeMinigame } from "@/components/minigames/EmailComposeMinigame";
import { CanvasSbnRenderer } from "@/lib/rendering/canvasSbnRenderer";
import { CanvasSpritesheetRenderer } from "@/lib/rendering/canvasSpritesheetRenderer";
import { loadCharacterBundle } from "@/lib/rendering/loadCharacterBundle";
import { MainMenu } from "@/components/MainMenu";
import { MainMenuMobile } from "@/components/MainMenuMobile";
import { MainMenuSettingsOverlay } from "@/components/MainMenuSettingsOverlay";
import { NarratorMobile } from "@/components/NarratorMobile";
import { DialogueMobile } from "@/components/DialogueMobile";
import { LogOverlay } from "@/components/LogOverlay";
import { SaveSlotOverlay } from "@/components/SaveSlotOverlay";
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, languageOptions, resolveText, uiText, type LanguageCode, type LocalizedText } from "@/lib/i18n";
import { readAllSlots, readAutoSave, writeAutoSave, writeSlot } from "@/lib/runtime/saveSlots";
import { readGalleryUnlockFlags } from "@/lib/runtime/galleryUnlocks";
import { isVoiceActingEnabled } from "@/lib/runtime/buildFlags";
import type { SaveSlot } from "@/lib/runtime/saveSlots";
import { fitCameraToScene } from "@/lib/sbn/sampling";
import type { SceneBounds } from "@/types/sbn";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useGamepad } from "@/hooks/useGamepad";
import { characterBundleRegistry } from "@/character";
import type { SmartphoneContactId, SmartphoneContactOverrides } from "@/components/minigames/smartphoneContacts";
import { resolveLockedSmartphoneContacts } from "@/components/minigames/smartphoneContacts";
import { NovelAudioEngine } from "@/lib/runtime/audioEngine";
import { BackgroundMusic } from "@/lib/runtime/backgroundMusic";
import { playSfx as playRuntimeSfx, sharedSoundEffects } from "@/lib/runtime/soundEffects";
import {
  ANIMATION_FRAME_RATE_STORAGE_KEY,
  DEFAULT_ANIMATION_FRAME_RATE,
  DEFAULT_GRAPHICS_QUALITY,
  GRAPHICS_QUALITY_STORAGE_KEY,
  frameRateOptions,
  graphicsQualityOptions,
  isAnimationFrameRate,
  isGraphicsQuality,
  type AnimationFrameRate,
  type GraphicsQuality,
} from "@/lib/runtime/graphicsSettings";
import {
  initializeAdMob,
  showDayTransitionInterstitial,
} from "@/lib/runtime/admob";
import { useNovelStore } from "@/store/novelStore";
import { characterFrameRegistry } from "@/lib/runtime/characterFrameRegistry";
import { getCharacterBundleTotalFrames } from "@/types/characterBundle";
import type { LoadedCharacterBundle } from "@/types/characterBundle";
import type { CharacterInstance, CutSceneNarration, CutSceneSelection, CutSceneSpeed } from "@/types/novel";
import gameplayMusic from "@/music/gameplay.mp3";
import nropLogo from "@/assets/logo-nrop.png";
import nvmLogo from "@/assets/nvm-logo-white.png";

const BASE_TEXT_SPEED = 18;
const CUTSCENE_FADE_MS = 600;
const BLACK_SCREEN_FADE_MS = 420;
const CHARACTER_ENTER_DURATION_MS = 520;
const CHARACTER_FADE_ENTER_DURATION_MS = 820;
const CHARACTER_FADE_AWAY_DURATION_MS = 420;
const VIRTUAL_STAGE_WIDTH = 1366;
const VIRTUAL_STAGE_HEIGHT = 768;
const VIRTUAL_CHARACTER_WIDTH = 270;
const VIRTUAL_CHARACTER_HEIGHT = 470;
const CHARACTER_MAX_STAGE_HEIGHT_RATIO = 0.78;
const CHARACTER_MIN_STAGE_HEIGHT_RATIO = 0.58;
const BG_VOLUME_STORAGE_KEY = "apartment69:bg-volume";
const DEFAULT_BG_VOLUME = 0.5;
const VOICE_ACTING_ENABLED = isVoiceActingEnabled();

type CharacterSpriteProps = {
  bundle: LoadedCharacterBundle;
  character: CharacterInstance;
  graphicsQuality: GraphicsQuality;
  isDimmed: boolean;
};

type OpeningLogoProps = {
  phaseState: "enter" | "exit";
};

type PoweredByLogoProps = {
  phaseState: "enter" | "exit";
};

type OpeningWarningProps = {
  language: LanguageCode;
  phaseState: "enter" | "exit";
};

type SbnLoadingScreenProps = {
  loadingLabel: string;
  phaseState: "enter" | "exit";
  statusMessage: string;
};

const openingWarningText = {
  title: {
    id: "Peringatan Konten",
    en: "Content Warning",
    ja: "コンテンツ警告",
    ko: "콘텐츠 경고",
  },
  body: {
    id: "Game ini berisi tema dewasa, tekanan keluarga, hubungan intim, dan adegan emosional yang mungkin tidak cocok untuk semua pemain.",
    en: "This game contains mature themes, family pressure, intimate relationships, and emotional scenes that may not be suitable for all players.",
    ja: "このゲームには成人向けのテーマ、家族からの圧力、親密な関係、感情的なシーンが含まれており、すべてのプレイヤーに適しているとは限りません。",
    ko: "이 게임에는 성인 주제, 가족의 압박, 친밀한 관계, 감정적인 장면이 포함되어 있어 모든 플레이어에게 적합하지 않을 수 있습니다.",
  },
  age: {
    id: "Hanya untuk pemain dewasa. Dengan melanjutkan, kamu menyatakan sudah cukup umur dan memahami kontennya.",
    en: "For adult players only. By continuing, you confirm that you are of age and understand the content.",
    ja: "成人プレイヤーのみ対象です。続行すると、年齢条件を満たし内容を理解していることに同意したものとみなされます。",
    ko: "성인 플레이어 전용입니다. 계속 진행하면 연령 조건을 충족하며 콘텐츠를 이해했음을 확인하는 것입니다.",
  },
} satisfies Record<string, LocalizedText>;

const OpeningLogo = ({ phaseState }: OpeningLogoProps) => (
  <div
    className={`fixed inset-0 z-[80] flex items-center justify-center bg-black text-[#f6efe5] ${phaseState === "exit" ? "animate-[vn-opening-fade-out_1200ms_ease_forwards]" : "animate-[vn-opening-fade-in_1400ms_ease_forwards]"}`}
  >
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(210,164,86,0.18),rgba(0,0,0,0)_34%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0))]" />
    <section className="relative mx-auto flex w-[min(88vw,620px)] flex-col items-center text-center">
      <img
        src={nropLogo}
        alt="NROP"
        className="h-auto w-[min(72vw,430px)] object-contain opacity-95 drop-shadow-[0_18px_60px_rgba(210,164,86,0.18)]"
      />
    </section>
  </div>
);

const PoweredByLogo = ({ phaseState }: PoweredByLogoProps) => (
  <div
    className={`fixed inset-0 z-[80] flex items-center justify-center bg-black text-[#f6efe5] ${phaseState === "exit" ? "animate-[vn-opening-fade-out_1200ms_ease_forwards]" : "animate-[vn-opening-fade-in_1400ms_ease_forwards]"}`}
  >
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),rgba(0,0,0,0)_34%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0))]" />
    <section className="relative mx-auto flex w-[min(88vw,620px)] flex-col items-center">
      <p className="mb-8 w-[min(66vw,380px)] text-left text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-white/62">
        Powered by
      </p>
      <img
        src={nvmLogo}
        alt="NVM"
        className="h-auto w-[min(66vw,380px)] object-contain opacity-95 drop-shadow-[0_18px_60px_rgba(255,255,255,0.14)]"
      />
    </section>
  </div>
);

const OpeningWarning = ({ language, phaseState }: OpeningWarningProps) => (
  <div
    className={`fixed inset-0 z-[80] flex items-center justify-center bg-black text-[#f6efe5] ${phaseState === "exit" ? "animate-[vn-opening-fade-out_1200ms_ease_forwards]" : "animate-[vn-opening-fade-in_1400ms_ease_forwards]"}`}
  >
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(210,164,86,0.12),rgba(0,0,0,0)_42%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0))]" />
    <section className="relative mx-auto flex w-[min(88vw,680px)] flex-col items-center text-center">
      <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-[#d2a456]/80">
        {resolveText(openingWarningText.title, language)}
      </p>
      <p className="max-w-[56ch] text-balance text-[clamp(1rem,2vw,1.25rem)] leading-relaxed text-[#f6efe5]/88">
        {resolveText(openingWarningText.body, language)}
      </p>
      <p className="mt-5 max-w-[52ch] text-balance text-[clamp(0.84rem,1.6vw,1rem)] leading-relaxed text-[#b9aa9b]">
        {resolveText(openingWarningText.age, language)}
      </p>
    </section>
  </div>
);

const SbnLoadingScreen = ({ loadingLabel, phaseState, statusMessage }: SbnLoadingScreenProps) => (
  <div className={`fixed inset-0 z-[140] flex items-center justify-center bg-black text-[#f6efe5] ${phaseState === "exit" ? "animate-[vn-opening-fade-out_900ms_ease_forwards]" : "animate-[vn-opening-fade-in_800ms_ease_forwards]"}`}>
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(210,164,86,0.12),rgba(0,0,0,0)_38%)]" />
    <section className="relative mx-auto flex w-[min(86vw,520px)] flex-col items-center text-center">
      <div className="mb-8 h-12 w-12 animate-spin rounded-full border border-[#d2a456]/20 border-t-[#d2a456]" />
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-[#d2a456]/80">
        {loadingLabel}
      </p>
      <p className="mt-4 text-[clamp(0.95rem,2vw,1.15rem)] leading-relaxed text-[#d8c8b8]/82">
        {statusMessage}
      </p>
    </section>
  </div>
);

const useCharacterStageSizing = (character: CharacterInstance, aspectRatio: number) => {
  const [windowSize, setWindowSize] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 1280,
    height: typeof window !== "undefined" ? window.innerHeight : 720,
  }));
  const [displayOpacity, setDisplayOpacity] = useState(character.opacity);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const windowResizeTimeoutRef = useRef<number | null>(null);

  const virtualStageScale = Math.min(
    windowSize.width / VIRTUAL_STAGE_WIDTH,
    windowSize.height / VIRTUAL_STAGE_HEIGHT,
  );
  const clampedStageScale = Math.max(0.56, Math.min(0.92, virtualStageScale));
  const frameAspectRatio = Number.isFinite(aspectRatio) && aspectRatio > 0 ? aspectRatio : 0.6;
  const reservedUiHeight = windowSize.width < 900 ? 240 : 280;
  const playableStageHeight = Math.max(320, windowSize.height - reservedUiHeight);
  const maxCharacterHeightFromStage = Math.round(playableStageHeight * CHARACTER_MAX_STAGE_HEIGHT_RATIO);
  const minCharacterHeightFromStage = Math.round(playableStageHeight * CHARACTER_MIN_STAGE_HEIGHT_RATIO);
  const virtualCharacterHeight = Math.round(VIRTUAL_CHARACTER_HEIGHT * clampedStageScale);
  const desiredCharacterHeight = Math.min(maxCharacterHeightFromStage, virtualCharacterHeight);
  const characterHeight = Math.max(240, minCharacterHeightFromStage, desiredCharacterHeight);
  const widthFromHeight = Math.round(characterHeight * frameAspectRatio);
  const virtualCharacterWidth = Math.round(VIRTUAL_CHARACTER_WIDTH * clampedStageScale);
  const maxCharacterWidthFromStage = Math.round(windowSize.width * 0.34);
  const characterWidth = Math.max(
    170,
    Math.min(maxCharacterWidthFromStage, Math.max(virtualCharacterWidth, widthFromHeight)),
  );
  const viewport = {
    width: characterWidth,
    height: characterHeight,
  };
  const stageScale = Math.max(1, character.scale * clampedStageScale);

  useEffect(() => {
    const handleWindowResize = () => {
      if (windowResizeTimeoutRef.current !== null) {
        window.cancelAnimationFrame(windowResizeTimeoutRef.current);
      }
      windowResizeTimeoutRef.current = window.requestAnimationFrame(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        windowResizeTimeoutRef.current = null;
      });
    };

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      if (windowResizeTimeoutRef.current !== null) {
        window.cancelAnimationFrame(windowResizeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (character.isExiting) {
      setDisplayOpacity(character.opacity);
      const raf = window.requestAnimationFrame(() => {
        setDisplayOpacity(0);
      });
      return () => window.cancelAnimationFrame(raf);
    }

    setDisplayOpacity(character.opacity);
    return undefined;
  }, [character.isExiting, character.opacity, character.entryVersion]);

  const spriteStyle = {
    left: `calc(${character.x * 100}% + ${character.xOffset * 100}%)`,
    bottom: `calc(${character.y}px - ${character.yOffset}px)`,
    opacity: displayOpacity,
    transform: "translateX(-50%) scale(var(--vn-scale))",
    transformOrigin: "bottom center",
    animationDuration: `${character.enterFrom === "fade" ? CHARACTER_FADE_ENTER_DURATION_MS : CHARACTER_ENTER_DURATION_MS}ms`,
    animationName: character.isExiting ? "none" : undefined,
    transition: `left ${character.moveDuration}ms ${character.moveEasing}, bottom ${character.moveDuration}ms ${character.moveEasing}, opacity ${character.hideTransition === "fadeAway" ? CHARACTER_FADE_AWAY_DURATION_MS : 220}ms ease, transform 300ms ease`,
    "--vn-scale": String(character.scale),
    width: `${characterWidth}px`,
    height: `${characterHeight}px`,
    maxWidth: "100%",
    visibility: "visible" as const,
  } as CSSProperties;

  return {
    containerRef,
    displayOpacity,
    spriteStyle,
    stageScale,
    viewport,
  };
};

const SpritesheetCharacterSprite = memo(({ bundle, character, isDimmed }: CharacterSpriteProps & {
  bundle: Extract<LoadedCharacterBundle, { kind: "spritesheet" }>;
}) => {
  const rendererRef = useRef<CanvasSpritesheetRenderer | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef(character.frame);
  const completeCharacterExit = useNovelStore((s) => s.completeCharacterExit);
  const {
    containerRef,
    spriteStyle,
    stageScale,
    viewport,
  } = useCharacterStageSizing(
    character,
    bundle.frameSize.h > 0 ? bundle.frameSize.w / bundle.frameSize.h : 0.6,
  );

  const loopRef = useRef({ bundle, character, isDimmed, viewport, stageScale, completeCharacterExit });
  loopRef.current = { bundle, character, isDimmed, viewport, stageScale, completeCharacterExit };

  useEffect(() => {
    rendererRef.current = new CanvasSpritesheetRenderer();
    return () => {
      rendererRef.current?.dispose();
      rendererRef.current = null;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = rendererRef.current;
    if (!canvas || !renderer) return;
    renderer.attach(canvas);
  }, []);

  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;
    renderer.resize(viewport.width, viewport.height, stageScale);
  }, [stageScale, viewport.height, viewport.width]);

  useEffect(() => {
    let animationFrame = 0;
    let lastTime = performance.now();
    let lastBundle = loopRef.current.bundle;

    const loop = (time: number) => {
      const { bundle: b, character: c, isDimmed: dim, viewport: vp, completeCharacterExit: complete } = loopRef.current;
      const renderer = rendererRef.current;

      if (b !== lastBundle) {
        const oldTotal = getCharacterBundleTotalFrames(lastBundle);
        const newTotal = getCharacterBundleTotalFrames(b);
        const progress = oldTotal > 1 ? frameRef.current / oldTotal : 0;
        frameRef.current = Math.min(newTotal - 1, Math.max(0, progress * Math.max(0, newTotal - 1)));
        lastBundle = b;
      }

      if (
        c.isExiting &&
        c.hideTransition === "fadeAway" &&
        c.hideStartedAt !== null &&
        Date.now() - c.hideStartedAt >= CHARACTER_FADE_AWAY_DURATION_MS
      ) {
        complete(c.id);
        animationFrame = requestAnimationFrame(loop);
        return;
      }

      if (renderer && vp.width > 0 && vp.height > 0) {
        const deltaMs = Math.max(0, Math.min(time - lastTime, 100));
        lastTime = time;

        const duration = getCharacterBundleTotalFrames(b);
        const frameAdvance = (c.fps * deltaMs) / 1000;
        frameRef.current = c.loop
          ? (frameRef.current + frameAdvance) % duration
          : Math.min(duration - 1, frameRef.current + frameAdvance);
        characterFrameRegistry.set(c.id, frameRef.current);

        renderer.render({
          bundle: b,
          frame: frameRef.current,
          dimmed: dim,
          viewportWidth: vp.width,
          viewportHeight: vp.height,
        });
      } else {
        lastTime = time;
      }

      animationFrame = requestAnimationFrame(loop);
    };

    animationFrame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animationFrame);
      characterFrameRegistry.delete(character.id);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!character.visible && !character.isExiting) return null;

  return (
    <div
      ref={containerRef}
      className={`vn-character vn-enter-${character.enterFrom} ${isDimmed ? "vn-character-dimmed" : ""} pointer-events-none absolute bottom-0 z-10 overflow-hidden`}
      style={spriteStyle}
    >
      <canvas ref={canvasRef} className="h-full w-full" aria-label={character.displayName} />
    </div>
  );
});

const SbnCharacterSprite = memo(({ bundle, character, graphicsQuality, isDimmed }: CharacterSpriteProps & {
  bundle: Extract<LoadedCharacterBundle, { kind: "sbn" }>;
}) => {
  const rendererRef = useRef<CanvasSbnRenderer | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cameraRef = useRef<SceneBounds | null>(null);
  const frameRef = useRef(character.frame);
  const completeCharacterExit = useNovelStore((s) => s.completeCharacterExit);
  const {
    containerRef,
    spriteStyle,
    stageScale,
    viewport,
  } = useCharacterStageSizing(character, bundle.preferredAspectRatio);

  const loopRef = useRef({ bundle, character, graphicsQuality, isDimmed, viewport, stageScale, completeCharacterExit });
  loopRef.current = { bundle, character, graphicsQuality, isDimmed, viewport, stageScale, completeCharacterExit };

  useEffect(() => {
    rendererRef.current = new CanvasSbnRenderer();
    return () => {
      rendererRef.current?.dispose();
      rendererRef.current = null;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = rendererRef.current;
    if (!canvas || !renderer) return;
    renderer.attach(canvas);
  }, []);

  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;
    const usesCroppedImages = bundle.project.attachments.some(
      (a) => a.imageIsCropped && a.opaqueBounds,
    );
    renderer.resize(viewport.width, viewport.height, stageScale, usesCroppedImages, graphicsQuality);
    cameraRef.current = null;
  }, [bundle, graphicsQuality, stageScale, viewport.height, viewport.width]);

  useEffect(() => {
    let animationFrame = 0;
    let lastTime = performance.now();
    let lastBundle = loopRef.current.bundle;

    const loop = (time: number) => {
      const { bundle: b, character: c, isDimmed: dim, viewport: vp, completeCharacterExit: complete } = loopRef.current;
      const renderer = rendererRef.current;

      if (b !== lastBundle) {
        const oldTotal = getCharacterBundleTotalFrames(lastBundle);
        const newTotal = getCharacterBundleTotalFrames(b);
        const progress = oldTotal > 1 ? frameRef.current / oldTotal : 0;
        frameRef.current = Math.min(newTotal - 1, Math.max(0, progress * Math.max(0, newTotal - 1)));
        cameraRef.current = null;
        lastBundle = b;
      }

      if (
        c.isExiting &&
        c.hideTransition === "fadeAway" &&
        c.hideStartedAt !== null &&
        Date.now() - c.hideStartedAt >= CHARACTER_FADE_AWAY_DURATION_MS
      ) {
        complete(c.id);
        animationFrame = requestAnimationFrame(loop);
        return;
      }

      if (renderer && vp.width > 0 && vp.height > 0) {
        const deltaMs = Math.max(0, Math.min(time - lastTime, 100));
        lastTime = time;

        const duration = getCharacterBundleTotalFrames(b);
        const frameAdvance = (c.fps * deltaMs) / 1000;
        frameRef.current = c.loop
          ? (frameRef.current + frameAdvance) % duration
          : Math.min(duration - 1, frameRef.current + frameAdvance);
        characterFrameRegistry.set(c.id, frameRef.current);

        if (!cameraRef.current) {
          cameraRef.current = vp.width === 520 && vp.height === 880
            ? b.preferredCamera
            : fitCameraToScene(b.project, vp.width, vp.height);
        }

        renderer.render({
          project: b.project,
          frame: frameRef.current,
          scale: 1,
          dimmed: dim,
          camera: cameraRef.current,
          viewportWidth: vp.width,
          viewportHeight: vp.height,
        });
      } else {
        lastTime = time;
      }

      animationFrame = requestAnimationFrame(loop);
    };

    animationFrame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animationFrame);
      characterFrameRegistry.delete(character.id);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!character.visible && !character.isExiting) return null;

  return (
    <div
      ref={containerRef}
      className={`vn-character vn-enter-${character.enterFrom} ${isDimmed ? "vn-character-dimmed" : ""} pointer-events-none absolute bottom-0 z-10 overflow-hidden`}
      style={spriteStyle}
    >
      <canvas ref={canvasRef} className="h-full w-full" aria-label={character.displayName} />
    </div>
  );
});

const CharacterSprite = memo(({ bundle, character, graphicsQuality, isDimmed }: CharacterSpriteProps) => {
  if (bundle.kind === "sbn") {
    return <SbnCharacterSprite bundle={bundle} character={character} graphicsQuality={graphicsQuality} isDimmed={isDimmed} />;
  }

  return <SpritesheetCharacterSprite bundle={bundle} character={character} graphicsQuality={graphicsQuality} isDimmed={isDimmed} />;
});

type CharacterStageProps = {
  characters: Record<string, CharacterInstance>;
  bundles: Record<string, LoadedCharacterBundle>;
  activeCharacterId: string | null;
  graphicsQuality: GraphicsQuality;
  isNarration: boolean;
  isSceneTransitioning: boolean;
};

const CharacterStage = memo(({ characters, bundles, activeCharacterId, graphicsQuality, isNarration, isSceneTransitioning }: CharacterStageProps) => {
  if (isSceneTransitioning) return null;

  const renderCharacters = Object.values(characters).sort((a, b) => a.y - b.y);

  return (
    <>
      {renderCharacters.map((character) => {
        const bundle = bundles[character.bundleId];
        if (!bundle) return null;
        const isDimmed = isNarration
          ? true
          : activeCharacterId !== null && activeCharacterId !== character.characterId;
        return (
          <CharacterSprite
            key={`${character.id}-${character.entryVersion}`}
            bundle={bundle}
            character={character}
            graphicsQuality={graphicsQuality}
            isDimmed={isDimmed}
          />
        );
      })}
    </>
  );
});

type DialogueUIProps = {
  isMobile: boolean;
  activeMinigame: { id: string } | null;
  isCenteredText: boolean;
  isNarration: boolean;
  isSceneTransitioning: boolean;
  speaker: string | null;
  visibleLine: string;
  resolvedLine: string;
  lineSize: string;
  isTyping: boolean;
  resolvedChoices: Array<{ id: string; label: string; next: string; disabled?: boolean }>;
  focusedChoiceIndex: number;
  focusedControlIndex: number;
  isAuto: boolean;
  labels: {
    auto: string;
    clickToFinish: string;
    clickToContinue: string;
    config: string;
    exit: string;
    log: string;
    save: string;
    skip: string;
    tapToContinue: string;
    tapToSkip: string;
  };
  onChoose: (next: string) => void;
  onSuppressAdvance: () => void;
  onAuto: () => void;
  onSkip: () => void;
  onLog: () => void;
  onSave: () => void;
  onConfig: () => void;
  onExit: () => void;
};

const DialogueUI = memo(({
  isMobile,
  activeMinigame,
  isCenteredText,
  isNarration,
  isSceneTransitioning,
  speaker,
  visibleLine,
  resolvedLine,
  lineSize,
  isTyping,
  resolvedChoices,
  focusedChoiceIndex,
  focusedControlIndex,
  isAuto,
  labels,
  onChoose,
  onSuppressAdvance,
  onAuto,
  onSkip,
  onLog,
  onSave,
  onConfig,
  onExit,
}: DialogueUIProps) => {
  if (activeMinigame) return null;

  if (isCenteredText) {
    return (
      <div className={`vn-centered-text-shell ${isSceneTransitioning ? "vn-dialogue-hidden" : ""}`}>
        <div className="vn-centered-text-box">
          <div className={`vn-centered-text-line vn-centered-text-line-${lineSize}`}>{visibleLine}</div>
          <div className="vn-centered-text-hint">
            {isTyping ? labels.clickToFinish : labels.clickToContinue}
          </div>
        </div>
      </div>
    );
  }

  if (isNarration) {
    if (isMobile) {
      return (
        <NarratorMobile
          continueHint={labels.tapToContinue}
          finishHint={labels.tapToSkip}
          visibleLine={visibleLine}
          isTyping={isTyping}
          isSceneTransitioning={isSceneTransitioning}
        />
      );
    }
    return (
      <div className={`vn-narrator-shell ${isSceneTransitioning ? "vn-dialogue-hidden" : ""}`}>
        <div className="vn-narrator-box">
          <div className="vn-narrator-line">{visibleLine}</div>
          <div className="vn-narrator-hint">{isTyping ? labels.clickToFinish : labels.clickToContinue}</div>
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <DialogueMobile
        controlLabels={{
          auto: labels.auto,
          config: labels.config,
          exit: labels.exit,
          log: labels.log,
          save: labels.save,
          skip: labels.skip,
        }}
        continueHint={labels.tapToContinue}
        finishHint={labels.tapToSkip}
        speaker={speaker}
        visibleLine={visibleLine}
        line={resolvedLine}
        isTyping={isTyping}
        isSceneTransitioning={isSceneTransitioning}
        choices={resolvedChoices}
        focusedChoiceIndex={focusedChoiceIndex}
        focusedControlIndex={focusedControlIndex}
        onChoose={onChoose}
        onSuppressAdvance={onSuppressAdvance}
        isAuto={isAuto}
        onAuto={onAuto}
        onSkip={onSkip}
        onLog={onLog}
        onSave={onSave}
        onConfig={onConfig}
        onExit={onExit}
      />
    );
  }

  return (
    <div className={`vn-dialogue-shell ${isSceneTransitioning ? "vn-dialogue-hidden" : ""}`}>
      <div className="vn-dialogue-box">
        {speaker ? <div className="vn-speaker">{speaker}</div> : null}
        <div className="vn-line">{resolvedLine ? visibleLine : ""}</div>

        {resolvedChoices.length > 0 ? (
          <div className="vn-choices" onClick={(event) => event.stopPropagation()}>
            {resolvedChoices.map((choice, idx) => (
              <button
                key={choice.id}
                className={`vn-choice${choice.disabled ? " vn-choice--disabled" : ""}`}
                type="button"
                disabled={choice.disabled}
                onClick={() => {
                  onSuppressAdvance();
                  onChoose(choice.next);
                }}
              >
                {choice.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="vn-dialogue-bar">
            <div className="vn-controls" onClick={(e) => e.stopPropagation()}>
              {([
                { label: labels.log, onClick: onLog },
                { label: labels.auto, onClick: onAuto, active: isAuto },
                { label: labels.skip, onClick: onSkip },
                { label: labels.save, onClick: onSave },
                { label: labels.config, onClick: onConfig },
                { label: labels.exit, onClick: onExit },
              ] as { label: string; onClick: () => void; active?: boolean }[]).map(({ label, onClick, active }) => (
                <button
                  key={label}
                  type="button"
                  className="vn-control"
                  style={active ? { color: "#d2a456" } : undefined}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="vn-hint">{isTyping ? labels.clickToFinish : labels.clickToContinue}</div>
          </div>
        )}
      </div>
    </div>
  );
});

/**
 * Normalizes a script-declared cut scene speed ("2x" or 2) into a playbackRate.
 * Returns undefined when unset so the player keeps its default 1x.
 */
const resolveCutSceneSpeed = (speed?: CutSceneSpeed): number | undefined => {
  if (speed === undefined) return undefined;
  return typeof speed === "number" ? speed : Number(speed.replace("x", ""));
};

const CutSceneOverlay = ({
  src,
  audioSrc,
  loop,
  narrate,
  showSpeedControl,
  endFrame,
  fps,
  language,
  allowDirectExit = true,
  speedControlBottom = "60px",
  continueHint,
  speedLabels,
  textSpeed = 1,
  forcedPlaybackSpeed,
  narrationClassName,
  onComplete,
}: {
  src: string;
  audioSrc?: string;
  loop?: boolean;
  narrate?: CutSceneNarration;
  showSpeedControl?: boolean;
  endFrame?: number;
  fps?: number;
  language: LanguageCode;
  allowDirectExit?: boolean;
  speedControlBottom?: string;
  continueHint: string;
  speedLabels: {
    slow: string;
    normal: string;
    fast: string;
    faster: string;
  };
  textSpeed?: number;
  forcedPlaybackSpeed?: number;
  narrationClassName?: string;
  onComplete: () => void;
}) => {
  const [visible, setVisible] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(1);
  const completedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const narrationRef = useRef<CutSceneNarrationHandle | null>(null);
  const previousVideoTimeRef = useRef(0);
  const lastAudioRestartRef = useRef(0);

  const hasNarration = Array.isArray(narrate) ? narrate.length > 0 : Boolean(narrate);
  const endTime = typeof endFrame === "number" && typeof fps === "number" && fps > 0
    ? endFrame / fps
    : null;
  const speedOptions = [
    { label: "1x", value: 1 },
    { label: "2x", value: 2 },
    { label: "3x", value: 3 },
    { label: "4x", value: 4 },
  ];

  useEffect(() => {
    // Double RAF ensures the initial opacity:0 is painted before transitioning in
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    setVideoEnded(false);
    setVideoStarted(false);
    setCurrentSpeed(1);
    completedRef.current = false;
    previousVideoTimeRef.current = 0;
  }, [endFrame, fps, src]);

  // Only the video is sped up; the audio track always plays at its natural rate
  // so voices/music never come out pitch-shifted.
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = forcedPlaybackSpeed ?? currentSpeed;
    }
    if (audioRef.current) {
      audioRef.current.playbackRate = 1;
    }
  }, [currentSpeed, forcedPlaybackSpeed]);

  useEffect(() => {
    const videoNode = videoRef.current;
    if (!videoNode) return;

    videoNode.currentTime = 0;

    const retry = () => {
      void videoNode.play()
        .then(() => {
          setVideoStarted(true);
        })
        .catch(() => {});
      document.removeEventListener("touchstart", retry, true);
      document.removeEventListener("click", retry, true);
      document.removeEventListener("keydown", retry, true);
    };

    void videoNode.play()
      .then(() => {
        setVideoStarted(true);
      })
      .catch(() => {
        // Android WebView can reject autoplay and show a native play badge.
        // Retry on the next user gesture and keep the video hidden until playback starts.
        document.addEventListener("touchstart", retry, true);
        document.addEventListener("click", retry, true);
        document.addEventListener("keydown", retry, true);
      });

    return () => {
      document.removeEventListener("touchstart", retry, true);
      document.removeEventListener("click", retry, true);
      document.removeEventListener("keydown", retry, true);
    };
  }, [endTime, src]);

  useEffect(() => {
    const audioNode = audioRef.current;
    if (!audioNode || !audioSrc) return;

    audioNode.currentTime = 0;

    const retry = () => {
      void audioNode.play().catch(() => {});
      document.removeEventListener("touchstart", retry, true);
      document.removeEventListener("click", retry, true);
      document.removeEventListener("keydown", retry, true);
    };

    void audioNode.play().catch(() => {
      // Android WebView blocks autoplay outside a user-gesture call stack.
      // Retry on the very next interaction (tap / click / key).
      document.addEventListener("touchstart", retry, true);
      document.addEventListener("click", retry, true);
      document.addEventListener("keydown", retry, true);
    });

    return () => {
      document.removeEventListener("touchstart", retry, true);
      document.removeEventListener("click", retry, true);
      document.removeEventListener("keydown", retry, true);
    };
  }, [audioSrc, endTime, src]);

  const handleSpeedChange = (speed: number) => {
    setCurrentSpeed(speed);
  };

  const handleExit = useCallback(() => {
    if (narrationRef.current?.advance()) return;
    if (completedRef.current) return;
    // Allow exit if video ended OR if loop is enabled
    if (!allowDirectExit) return;
    if (!videoEnded && !loop) return;
    completedRef.current = true;
    setFadingOut(true);
    window.setTimeout(onComplete, CUTSCENE_FADE_MS);
  }, [allowDirectExit, loop, onComplete, videoEnded]);

  const shouldHandleOverlayClick = allowDirectExit || hasNarration;

  // The video is the clock: every time it wraps the audio jumps back to 0, even
  // if it was still mid-playback. Both the frame callback and timeupdate can spot
  // the same wrap, so restarts are debounced to keep it to one seek.
  const restartAudio = useCallback(() => {
    const audioNode = audioRef.current;
    if (!audioNode) return;
    const now = performance.now();
    if (now - lastAudioRestartRef.current < 120) return;
    lastAudioRestartRef.current = now;
    audioNode.currentTime = 0;
    void audioNode.play().catch(() => {});
  }, []);

  const handleVideoTimeUpdate = useCallback(() => {
    const videoNode = videoRef.current;
    const audioNode = audioRef.current;
    if (!videoNode) return;

    const currentTime = videoNode.currentTime;
    const previousTime = previousVideoTimeRef.current;
    const playbackEndTime = endTime;

    if (playbackEndTime !== null && currentTime >= Math.max(0, playbackEndTime - 0.01)) {
      if (loop) {
        videoNode.currentTime = 0;
        if (audioNode) {
          restartAudio();
        }
        previousVideoTimeRef.current = 0;
        return;
      }

      if (!videoEnded) {
        videoNode.pause();
        videoNode.currentTime = playbackEndTime;
        if (audioNode) {
          audioNode.pause();
          audioNode.currentTime = Math.max(0, playbackEndTime);
        }
        setVideoEnded(true);
      }
      previousVideoTimeRef.current = playbackEndTime;
      return;
    }

    if (loop && audioSrc && audioNode && currentTime + 0.2 < previousTime) {
      restartAudio();
    }

    previousVideoTimeRef.current = currentTime;
  }, [audioSrc, endTime, loop, restartAudio, videoEnded]);

  // timeupdate only fires ~4x/sec, so on its own it can notice a wrap up to 250ms
  // late — a quarter of the whole cycle once the video is sped up. The frame
  // callback sees the wrap on the very frame it happens.
  useEffect(() => {
    const videoNode = videoRef.current;
    if (!videoNode || !loop || !audioSrc) return;
    if (typeof videoNode.requestVideoFrameCallback !== "function") return;

    let handle = 0;
    let cancelled = false;

    const onFrame: VideoFrameRequestCallback = (_now, metadata) => {
      if (cancelled) return;
      const mediaTime = metadata.mediaTime;
      if (mediaTime + 0.2 < previousVideoTimeRef.current) {
        restartAudio();
      }
      previousVideoTimeRef.current = mediaTime;
      handle = videoNode.requestVideoFrameCallback(onFrame);
    };

    handle = videoNode.requestVideoFrameCallback(onFrame);
    return () => {
      cancelled = true;
      videoNode.cancelVideoFrameCallback?.(handle);
    };
  }, [audioSrc, loop, restartAudio, src]);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key !== " " && e.key !== "Enter") return;
      e.preventDefault();
      handleExit();
    };
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [handleExit]);

  return (
    <div
      onClick={shouldHandleOverlayClick ? handleExit : undefined}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: shouldHandleOverlayClick && (hasNarration || videoEnded || loop) ? "pointer" : "default",
      }}
    >
      <CutSceneMediaLayer
        src={src}
        audioSrc={audioSrc}
        loop={loop}
        endFrame={endFrame}
        fps={fps}
        fadingOut={fadingOut}
        visible={visible}
        videoStarted={videoStarted}
        videoRef={videoRef}
        audioRef={audioRef}
        handleVideoTimeUpdate={handleVideoTimeUpdate}
        onVideoEnded={() => setVideoEnded(true)}
        onVideoPlaying={() => setVideoStarted(true)}
      />
      <CutSceneNarrationLayer
        ref={narrationRef}
        narrate={narrate}
        language={language}
        continueHint={continueHint}
        textSpeed={textSpeed}
        fadingOut={fadingOut}
        visible={visible}
        narrationClassName={narrationClassName}
      />
      {!hasNarration && allowDirectExit && (videoEnded || loop) ? (
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: showSpeedControl ? "128px" : "54px",
            transform: "translateX(-50%)",
            padding: "10px 18px",
            borderRadius: "999px",
            background: "rgba(8, 7, 12, 0.68)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px)",
            color: "#d8cfc3",
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            opacity: fadingOut || !visible ? 0 : 1,
            transition: `opacity ${CUTSCENE_FADE_MS}ms ease`,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {continueHint}
        </div>
      ) : null}
      {showSpeedControl && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            bottom: speedControlBottom,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
            opacity: fadingOut || !visible ? 0 : 1,
            transition: `opacity ${CUTSCENE_FADE_MS}ms ease`,
            pointerEvents: "auto",
          }}
        >
          {speedOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSpeedChange(option.value)}
              style={{
                padding: "8px 16px",
                background: currentSpeed === option.value ? "rgba(210, 164, 86, 0.9)" : "rgba(11, 10, 18, 0.85)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "6px",
                color: currentSpeed === option.value ? "#0b0a12" : "#e8dfd3",
                fontSize: "0.85rem",
                fontWeight: currentSpeed === option.value ? "600" : "400",
                cursor: "pointer",
                transition: "all 200ms ease",
              }}
              onMouseEnter={(e) => {
                if (currentSpeed !== option.value) {
                  e.currentTarget.style.background = "rgba(11, 10, 18, 0.95)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                }
              }}
              onMouseLeave={(e) => {
                if (currentSpeed !== option.value) {
                  e.currentTarget.style.background = "rgba(11, 10, 18, 0.85)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                }
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const CutSceneMediaLayer = memo(({
  src,
  audioSrc,
  loop,
  endFrame,
  fps,
  fadingOut,
  visible,
  videoStarted,
  videoRef,
  audioRef,
  handleVideoTimeUpdate,
  onVideoEnded,
  onVideoPlaying,
}: {
  src: string;
  audioSrc?: string;
  loop?: boolean;
  endFrame?: number;
  fps?: number;
  fadingOut: boolean;
  visible: boolean;
  videoStarted: boolean;
  videoRef: { current: HTMLVideoElement | null };
  audioRef: { current: HTMLAudioElement | null };
  handleVideoTimeUpdate: () => void;
  onVideoEnded: () => void;
  onVideoPlaying: () => void;
}) => (
  <>
    <video
      ref={videoRef}
      key={`${src}:${endFrame ?? "full"}:${fps ?? "auto"}`}
      src={src}
      autoPlay
      playsInline
      preload="auto"
      controls={false}
      disablePictureInPicture
      loop={loop}
      onEnded={onVideoEnded}
      onPlaying={onVideoPlaying}
      onTimeUpdate={handleVideoTimeUpdate}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        pointerEvents: "none",
        opacity: fadingOut || !visible || !videoStarted ? 0 : 1,
        transition: `opacity ${CUTSCENE_FADE_MS}ms ease`,
      }}
    />
    {audioSrc ? (
      <audio
        ref={audioRef}
        key={`${src}:${audioSrc}:${endFrame ?? "full"}:${fps ?? "auto"}`}
        src={audioSrc}
        autoPlay
        playsInline
        loop={loop}
      />
    ) : null}
  </>
));

type CutSceneNarrationHandle = {
  advance: () => boolean;
};

type CutSceneNarrationLayerProps = {
  narrate?: CutSceneNarration;
  language: LanguageCode;
  continueHint: string;
  textSpeed?: number;
  fadingOut: boolean;
  visible: boolean;
  narrationClassName?: string;
};

const CutSceneNarrationLayer = memo(forwardRef<CutSceneNarrationHandle, CutSceneNarrationLayerProps>(function CutSceneNarrationLayer({
  narrate,
  language,
  continueHint,
  textSpeed = 1,
  fadingOut,
  visible,
  narrationClassName,
}, ref) {
  const [currentNarrateIndex, setCurrentNarrateIndex] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);

  const resolvedNarrateBlocks = narrate
    ? (Array.isArray(narrate) ? narrate : [narrate]).map((entry) => resolveText(entry, language))
    : [];
  const currentNarrateBlock = resolvedNarrateBlocks[currentNarrateIndex] ?? "";
  const hasNarration = resolvedNarrateBlocks.length > 0;
  const visibleNarrateBlocks = currentNarrateBlock
    ? [currentNarrateBlock.slice(0, revealedCount)]
    : [];
  const isCurrentBlockFullyRevealed = revealedCount >= currentNarrateBlock.length;
  const hasMoreNarrationBlocks = currentNarrateIndex < resolvedNarrateBlocks.length - 1;

  useEffect(() => {
    setCurrentNarrateIndex(0);
    setRevealedCount(0);
  }, [language, narrate]);

  useEffect(() => {
    if (!currentNarrateBlock) return;

    const timer = window.setInterval(() => {
      setRevealedCount((current) => {
        if (current >= currentNarrateBlock.length) {
          window.clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, BASE_TEXT_SPEED / textSpeed);

    return () => window.clearInterval(timer);
  }, [currentNarrateBlock, textSpeed]);

  useImperativeHandle(ref, () => ({
    advance: () => {
      if (!hasNarration) return false;

      if (!isCurrentBlockFullyRevealed) {
        setRevealedCount(currentNarrateBlock.length);
        return true;
      }

      if (hasMoreNarrationBlocks) {
        setCurrentNarrateIndex((current) => current + 1);
        setRevealedCount(0);
        return true;
      }

      return false;
    },
  }), [
    currentNarrateBlock.length,
    hasMoreNarrationBlocks,
    hasNarration,
    isCurrentBlockFullyRevealed,
  ]);

  if (visibleNarrateBlocks.length === 0) {
    return null;
  }

  return (
    <div
      className={`vn-narrator-shell ${narrationClassName ?? ""}`}
      style={{
        opacity: fadingOut || !visible ? 0 : 1,
        transition: `opacity ${CUTSCENE_FADE_MS}ms ease`,
      }}
    >
      <div className="vn-narrator-box">
        {visibleNarrateBlocks.map((block, index) => (
          <div
            key={`${index}-${block.length}`}
            className="vn-narrator-line"
            style={index > 0 ? { marginTop: "1rem" } : undefined}
          >
            {block}
          </div>
        ))}
        {isCurrentBlockFullyRevealed && hasMoreNarrationBlocks ? (
          <div className="vn-narrator-hint">{continueHint}</div>
        ) : null}
      </div>
    </div>
  );
}));

const MultiCutSceneOverlay = ({
  selections,
  initialSelectionId,
  language,
  labels,
  isMobile = false,
  textSpeed = 1,
  onComplete,
}: {
  selections: CutSceneSelection[];
  initialSelectionId?: string;
  language: LanguageCode;
  labels: {
    clickToContinue: string;
    fastPlayback: string;
    fasterPlayback: string;
    previousScene: string;
    nextScene: string;
    continueStory: string;
    lockedScene: string;
    normalPlayback: string;
    slowPlayback: string;
  };
  isMobile?: boolean;
  textSpeed?: number;
  onComplete: () => void;
}) => {
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(initialSelectionId ?? selections[0]?.id ?? null);
  const [maxUnlockedSelectionIndex, setMaxUnlockedSelectionIndex] = useState(0);
  const enabledSelections = selections.filter((scene) => scene.enabled !== false);
  const activeSelection = selections.find((scene) => scene.id === selectedSceneId) ?? selections[0];
  const currentSelectionIndex = enabledSelections.findIndex((scene) => scene.id === activeSelection?.id);
  const isLastSelection = currentSelectionIndex >= enabledSelections.length - 1;

  useEffect(() => {
    const initialId = initialSelectionId ?? enabledSelections[0]?.id ?? selections[0]?.id ?? null;
    const initialIndex = Math.max(0, enabledSelections.findIndex((scene) => scene.id === initialId));
    setSelectedSceneId(initialId);
    setMaxUnlockedSelectionIndex(Math.min(enabledSelections.length - 1, initialIndex + 1));
  }, [initialSelectionId, selections]);

  const handleSelectScene = useCallback((sceneId: string) => {
    const targetIndex = enabledSelections.findIndex((scene) => scene.id === sceneId);
    if (targetIndex === -1 || targetIndex > maxUnlockedSelectionIndex) return;
    setSelectedSceneId(sceneId);
    if (targetIndex === maxUnlockedSelectionIndex && targetIndex < enabledSelections.length - 1) {
      setMaxUnlockedSelectionIndex((current) => Math.max(current, targetIndex + 1));
    }
  }, [enabledSelections, maxUnlockedSelectionIndex]);

  const handleMoveScene = useCallback((direction: -1 | 1) => {
    if (enabledSelections.length <= 1 || currentSelectionIndex === -1) return;
    const nextIndex = currentSelectionIndex + direction;
    if (nextIndex < 0 || nextIndex >= enabledSelections.length) return;

    if (direction === 1) {
      setMaxUnlockedSelectionIndex((current) => Math.max(current, nextIndex));
    }

    setSelectedSceneId(enabledSelections[nextIndex].id);
  }, [currentSelectionIndex, enabledSelections]);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleMoveScene(-1);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleMoveScene(1);
      }
    };
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [handleMoveScene]);

  if (!activeSelection) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, pointerEvents: "auto" }}>
      <CutSceneOverlay
        key={activeSelection.id}
        src={activeSelection.src}
        audioSrc={VOICE_ACTING_ENABLED ? activeSelection.audioSrc : undefined}
        loop={activeSelection.loop}
        narrate={activeSelection.narrate}
        showSpeedControl={false}
        forcedPlaybackSpeed={resolveCutSceneSpeed(activeSelection.speed)}
        endFrame={activeSelection.endFrame}
        fps={activeSelection.fps}
        language={language}
        allowDirectExit={false}
        speedControlBottom="168px"
        continueHint={labels.clickToContinue}
        speedLabels={{
          slow: labels.slowPlayback,
          normal: labels.normalPlayback,
          fast: labels.fastPlayback,
          faster: labels.fasterPlayback,
        }}
        textSpeed={textSpeed}
        narrationClassName={isMobile
          ? "vn-multicut-narrator-shell vn-cutscene-narrator-shell-mobile"
          : "vn-multicut-narrator-shell"}
        onComplete={onComplete}
      />
      <div
        className="vn-multicut-controls"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="vn-multicut-scenes">
          {selections.map((scene) => {
            const isActive = activeSelection.id === scene.id;
            const isEnabled = scene.enabled !== false;
            const enabledIndex = enabledSelections.findIndex((enabledScene) => enabledScene.id === scene.id);
            const isUnlocked = isEnabled && enabledIndex !== -1 && enabledIndex <= maxUnlockedSelectionIndex;
            return (
              <button
                key={scene.id}
                type="button"
                disabled={!isUnlocked}
                onClick={() => handleSelectScene(scene.id)}
                className={[
                  "vn-multicut-scene-button",
                  isActive ? "vn-multicut-scene-button-active" : "",
                  !isUnlocked ? "vn-multicut-scene-button-locked" : "",
                ].filter(Boolean).join(" ")}
              >
                {enabledIndex === -1 ? "?" : enabledIndex + 1}
              </button>
            );
          })}
        </div>

        <div className="vn-multicut-continue-row">
          {isLastSelection ? (
            <button
              type="button"
              onClick={onComplete}
              className="vn-multicut-continue-button"
            >
              {labels.continueStory}
            </button>
          ) : (
            <div aria-hidden="true" className="vn-multicut-continue-spacer" />
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const isMobile = useIsMobile();
  const [phase, setPhase] = useState<"logo" | "poweredBy" | "warning" | "loading" | "menu" | "story">("logo");
  const [openingPhaseState, setOpeningPhaseState] = useState<"enter" | "exit">("enter");
  const [loadingPhaseState, setLoadingPhaseState] = useState<"enter" | "exit">("enter");
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  const [bundlesReady, setBundlesReady] = useState(false);
  const bgMusicRef = useRef<BackgroundMusic | null>(null);

  const bundles = useNovelStore((state) => state.bundles);
  const background = useNovelStore((state) => state.background);
  const backgroundVideo = useNovelStore((state) => state.backgroundVideo);
  const parallaxLayers = useNovelStore((state) => state.parallaxLayers);
  const backgroundAnimation = useNovelStore((state) => state.backgroundAnimation);
  const blackScreenState = useNovelStore((state) => state.blackScreen);
  const location = useNovelStore((state) => state.location);
  const textPresentation = useNovelStore((state) => state.textPresentation);
  const speaker = useNovelStore((state) => state.speaker);
  const activeCharacterId = useNovelStore((state) => state.activeCharacterId);
  const sceneTransitionDuration = useNovelStore((state) => state.sceneTransitionDuration);
  const sceneTransitionToken = useNovelStore((state) => state.sceneTransitionToken);
  const pendingSceneContinuation = useNovelStore((state) => state.pendingSceneContinuation);
  const activeMinigame = useNovelStore((state) => state.activeMinigame);
  const activeCutScene = useNovelStore((state) => state.activeCutScene);
  const activeMultiCutScene = useNovelStore((state) => state.activeMultiCutScene);
  const activeInterstitial = useNovelStore((state) => state.activeInterstitial);
  const activeBackgroundMusic = useNovelStore((state) => state.activeBackgroundMusic);
  const activeSoundEffect = useNovelStore((state) => state.activeSoundEffect);
  const activeVoice = useNovelStore((state) => state.activeVoice);
  const line = useNovelStore((state) => state.line);
  const lineSize = useNovelStore((state) => state.lineSize);
  const lineTypingSpeed = useNovelStore((state) => state.lineTypingSpeed);
  const choices = useNovelStore((state) => state.choices);
  const statusMessage = useNovelStore((state) => state.statusMessage);
  const characters = useNovelStore((state) => state.characters);
  const registerBundle = useNovelStore((state) => state.registerBundle);
  const setStatusMessage = useNovelStore((state) => state.setStatusMessage);
  const startStory = useNovelStore((state) => state.startStory);
  const startFromLabel = useNovelStore((state) => state.startFromLabel);
  const advance = useNovelStore((state) => state.advance);
  const choose = useNovelStore((state) => state.choose);
  const completeMinigame = useNovelStore((state) => state.completeMinigame);
  const completeCutScene = useNovelStore((state) => state.completeCutScene);
  const completeMultiCutScene = useNovelStore((state) => state.completeMultiCutScene);
  const completeInterstitial = useNovelStore((state) => state.completeInterstitial);
  const clearScene = useNovelStore((state) => state.clearScene);
  const loadFromSave = useNovelStore((state) => state.loadFromSave);
  const isEnded = useNovelStore((state) => state.isEnded);

  const history = useNovelStore((state) => state.history);
  const currentLabel = useNovelStore((state) => state.currentLabel);
  const currentIndex = useNovelStore((state) => state.currentIndex);
  const flags = useNovelStore((state) => state.flags);
  const persistedGalleryFlags = readGalleryUnlockFlags();
  const galleryFlags = { ...persistedGalleryFlags, ...flags };
  const smartphoneDisabledContacts = activeMinigame?.id === "smartphone-contacts"
    ? (() => {
        const baseDisabledContacts = resolveLockedSmartphoneContacts(
          flags,
          activeMinigame.options?.disabledContacts as string[] | undefined,
        );
        const conditionalDisabledContacts = activeMinigame.options?.conditionalDisabledContacts as
          | Partial<Record<SmartphoneContactId, string>>
          | undefined;
        const conditionalEnabledContacts = activeMinigame.options?.conditionalEnabledContacts as
          | Partial<Record<SmartphoneContactId, string>>
          | undefined;
        const requiredCompletionFlags = activeMinigame.options?.requiredCompletionFlags as
          | string[]
          | undefined;

        const resolvedDisabledContacts = new Set(baseDisabledContacts);

        if (conditionalDisabledContacts) {
          (Object.entries(conditionalDisabledContacts) as Array<[SmartphoneContactId, string]>).forEach(([contactId, flagName]) => {
            if (flags[flagName]) {
              resolvedDisabledContacts.add(contactId);
            }
          });
        }

        if (conditionalEnabledContacts) {
          (Object.entries(conditionalEnabledContacts) as Array<[SmartphoneContactId, string]>).forEach(([contactId, flagName]) => {
            if (flags[flagName]) {
              resolvedDisabledContacts.delete(contactId);
            }
          });
        }

        if (requiredCompletionFlags?.some((flagName) => !flags[flagName])) {
          resolvedDisabledContacts.add("sleep");
        }

        return [...resolvedDisabledContacts];
      })()
    : [];

  const [revealedCount, setRevealedCount] = useState(0);
  const [sceneTransitionKey, setSceneTransitionKey] = useState(0);
  const [isSceneTransitioning, setIsSceneTransitioning] = useState(false);
  const [isAuto, setIsAuto] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showSaveSlots, setShowSaveSlots] = useState(false);
  const [focusedChoiceIndex, setFocusedChoiceIndex] = useState(0);
  const [focusedControlIndex, setFocusedControlIndex] = useState(-1);
  const CONTROL_COUNT = 6; // Auto, Skip, Log, Save, Config, Exit
  const [blackScreenVisible, setBlackScreenVisible] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>(() => {
    if (typeof window === "undefined") return DEFAULT_LANGUAGE;
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return saved && languageOptions.some((option) => option.code === saved)
      ? saved as LanguageCode
      : DEFAULT_LANGUAGE;
  });
  const [graphicsQuality, setGraphicsQuality] = useState<GraphicsQuality>(() => {
    if (typeof window === "undefined") return DEFAULT_GRAPHICS_QUALITY;
    const saved = window.localStorage.getItem(GRAPHICS_QUALITY_STORAGE_KEY);
    return isGraphicsQuality(saved) ? saved : DEFAULT_GRAPHICS_QUALITY;
  });
  const [frameRate, setFrameRate] = useState<AnimationFrameRate>(() => {
    if (typeof window === "undefined") return DEFAULT_ANIMATION_FRAME_RATE;
    const saved = window.localStorage.getItem(ANIMATION_FRAME_RATE_STORAGE_KEY);
    return isAnimationFrameRate(saved) ? Number(saved) as AnimationFrameRate : DEFAULT_ANIMATION_FRAME_RATE;
  });
  const [bgVolume, setBgVolume] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_BG_VOLUME;
    return DEFAULT_BG_VOLUME;
  });
  const [textSpeed, setTextSpeed] = useState(1);
  const [saveToast, setSaveToast] = useState(false);
  const [slots, setSlots] = useState<(SaveSlot | null)[]>(readAllSlots);
  const [autoSaveSlot, setAutoSaveSlot] = useState<SaveSlot | null>(readAutoSave);
  const [autoOpenGalleryOnMenu, setAutoOpenGalleryOnMenu] = useState(false);
  const [menuSessionKey, setMenuSessionKey] = useState(0);
  const lastAutoSaveKeyRef = useRef<string | null>(null);
  const audioRef = useRef<NovelAudioEngine | null>(null);
  const voiceRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedBundleLoadRef = useRef(false);
  const previousSceneTransitionTokenRef = useRef<number | null>(null);
  const suppressAdvanceOnceRef = useRef(false);
  const choicesRef = useRef<Array<{ id: string; label: string; next: string; disabled?: boolean }>>([]);
  const focusedChoiceIndexRef = useRef(0);
  const focusedControlIndexRef = useRef(-1);
  focusedControlIndexRef.current = focusedControlIndex;
  const isMobileRef = useRef(isMobile);
  isMobileRef.current = isMobile;
  const showLogRef = useRef(showLog);
  const showConfigRef = useRef(showConfig);
  const showSaveSlotsRef = useRef(showSaveSlots);
  showLogRef.current = showLog;
  showConfigRef.current = showConfig;
  showSaveSlotsRef.current = showSaveSlots;

  useGamepad();
  const resolvedLine = resolveText(line, language);
  const resolvedLocation = resolveText(location, language);
  const hasResolvedLocation = resolvedLocation.trim().length > 0;
  const resolvedStatusMessage = resolveText(statusMessage, language);
  const visibleLine = resolvedLine.slice(0, revealedCount);
  const isTyping = revealedCount < resolvedLine.length;
  const isNarration = textPresentation === "narration" && choices.length === 0 && Boolean(resolvedLine);
  const isCenteredText = textPresentation === "centered" && choices.length === 0 && Boolean(resolvedLine);
  const resolvedChoices: Array<{ id: string; label: string; next: string; disabled?: boolean }> = choices.map(
    (choice) => ({ ...choice, label: resolveText(choice.label, language) }),
  );
  choicesRef.current = resolvedChoices;
  focusedChoiceIndexRef.current = focusedChoiceIndex;
  const resolvedGraphicsQualityOptions = graphicsQualityOptions.map((option) => ({
    ...option,
    label: resolveText(option.label, language),
  }));
  const bundleList = Object.values(bundles);
  const labels = {
    auto: resolveText(uiText.auto, language),
    clickToContinue: resolveText(uiText.clickToContinue, language),
    clickToFinish: resolveText(uiText.clickToFinish, language),
    close: resolveText(uiText.close, language),
    config: resolveText(uiText.config, language),
    continueStory: resolveText(uiText.continueStory, language),
    emptySlot: resolveText(uiText.emptySlot, language),
    exit: resolveText(uiText.exit, language),
    frameRate: resolveText(uiText.animationFps, language),
    fastPlayback: resolveText(uiText.playbackFast, language),
    fasterPlayback: resolveText(uiText.playbackFaster, language),
    gallery: resolveText(uiText.gallery, language),
    galleryEmpty: resolveText(uiText.galleryEmpty, language),
    galleryTitle: resolveText(uiText.galleryTitle, language),
    graphicsQuality: resolveText(uiText.graphicsQuality, language),
    language: resolveText(uiText.language, language),
    load: resolveText(uiText.load, language),
    loading: resolveText(uiText.loading, language),
    log: resolveText(uiText.log, language),
    mainMenuSettings: resolveText(uiText.mainMenuSettings, language),
    lockedScene: resolveText(uiText.lockedScene, language),
    nextScene: resolveText(uiText.nextScene, language),
    noConversation: resolveText(uiText.noConversation, language),
    normalPlayback: resolveText(uiText.playbackNormal, language),
    previousScene: resolveText(uiText.previousScene, language),
    save: resolveText(uiText.save, language),
    saved: resolveText(uiText.saved, language),
    settings: resolveText(uiText.settings, language),
    skip: resolveText(uiText.skip, language),
    slot: resolveText(uiText.slot, language),
    start: resolveText(uiText.start, language),
    subtitle: resolveText(uiText.titleSubtitle, language),
    slowPlayback: resolveText(uiText.playbackSlow, language),
    tapToContinue: resolveText(uiText.tapToContinue, language),
    tapToSkip: resolveText(uiText.tapToSkip, language),
    textSpeed: resolveText(uiText.textSpeed, language),
    unknownScene: resolveText(uiText.unknownScene, language),
    volumeBgm: resolveText(uiText.volumeBgm, language),
  };

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  useEffect(() => {
    window.localStorage.setItem(GRAPHICS_QUALITY_STORAGE_KEY, graphicsQuality);
  }, [graphicsQuality]);

  useEffect(() => {
    window.localStorage.setItem(ANIMATION_FRAME_RATE_STORAGE_KEY, String(frameRate));
  }, [frameRate]);

  useEffect(() => {
    window.localStorage.setItem(BG_VOLUME_STORAGE_KEY, String(bgVolume));
  }, [bgVolume]);

  useEffect(() => {
    audioRef.current = new NovelAudioEngine();
    bgMusicRef.current = new BackgroundMusic();
    return () => {
      if (voiceRef.current) {
        voiceRef.current.pause();
        voiceRef.current.src = "";
        voiceRef.current.load();
        voiceRef.current = null;
      }
      audioRef.current?.dispose();
      bgMusicRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (voiceRef.current) {
      voiceRef.current.pause();
      voiceRef.current.src = "";
      voiceRef.current.load();
      voiceRef.current = null;
    }

    if (!VOICE_ACTING_ENABLED) return;
    if (!activeVoice) return;

    const audio = new Audio(activeVoice);
    audio.preload = "auto";
    voiceRef.current = audio;
    void audio.play().catch(() => {});

    return () => {
      audio.pause();
      audio.src = "";
      audio.load();
      if (voiceRef.current === audio) {
        voiceRef.current = null;
      }
    };
  }, [activeVoice]);

  useEffect(() => {
    if (!activeSoundEffect) return;
    playRuntimeSfx(activeSoundEffect.src, activeSoundEffect.options);
  }, [activeSoundEffect]);

  useEffect(() => {
    initializeAdMob().catch(() => {});
  }, []);

  useEffect(() => {
    if (!activeInterstitial) return;

    showDayTransitionInterstitial()
      .catch(() => {})
      .finally(() => {
        completeInterstitial();
      });
  }, [activeInterstitial, completeInterstitial]);

  // Android WebView blocks audio until a user gesture. On first interaction,
  // resume an AudioContext to unlock the audio subsystem, then retry any
  // pending background music that was blocked by autoplay policy.
  useEffect(() => {
    let unlocked = false;

    const unlock = () => {
      if (unlocked) return;
      unlocked = true;

      try {
        const ctx = new AudioContext();
        void ctx.resume().then(() => ctx.close());
      } catch {
        // AudioContext not supported — ignore
      }

      bgMusicRef.current?.resumeAfterUnlock();
      sharedSoundEffects.resumeAfterUnlock();

      document.removeEventListener("touchstart", unlock, true);
      document.removeEventListener("click", unlock, true);
    };

    document.addEventListener("touchstart", unlock, true);
    document.addEventListener("click", unlock, true);

    return () => {
      document.removeEventListener("touchstart", unlock, true);
      document.removeEventListener("click", unlock, true);
    };
  }, []);

  useEffect(() => {
    if (phase === "story") {
      const musicSrc = activeBackgroundMusic?.src ?? gameplayMusic;
      const musicVolume = bgVolume * (activeBackgroundMusic?.options?.volume ?? 1);
      bgMusicRef.current?.play(musicSrc, musicVolume);
    } else {
      bgMusicRef.current?.stop();
      sharedSoundEffects.stopAll();
    }
  }, [activeBackgroundMusic, bgVolume, phase]);

  const loadCharacterBundles = useCallback(async (returnToMenuAfterLoad: boolean) => {
    if (hasStartedBundleLoadRef.current) return;

    hasStartedBundleLoadRef.current = true;
    setShowLoadingOverlay(true);
    try {
      setStatusMessage(uiText.bundlesLoading);
      const bundleEntries = Object.entries(characterBundleRegistry);

      const loadedBundles = await Promise.all(
        bundleEntries.map(async ([bundleId, bundlePath]) => {
          const bundle = await loadCharacterBundle(bundleId, bundlePath);
          return [bundleId, bundle] as const;
        }),
      );

      for (const [bundleId, bundle] of loadedBundles) {
        registerBundle(bundleId, bundle);
      }

      hasStartedBundleLoadRef.current = false;
      setBundlesReady(true);
      setLoadingPhaseState("exit");
      if (returnToMenuAfterLoad) {
        setPhase("menu");
      }
      window.setTimeout(() => {
        setShowLoadingOverlay(false);
        setLoadingPhaseState("enter");
      }, 900);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Gagal memuat visual novel.";
      setStatusMessage(message);
      hasStartedBundleLoadRef.current = false;
    }
  }, [registerBundle, setStatusMessage]);

  useEffect(() => {
    if (phase !== "loading") return;
    void loadCharacterBundles(true);
  }, [loadCharacterBundles, phase]);

  useEffect(() => {
    if (phase !== "story") return;
    if (bundleList.length > 0) {
      setBundlesReady(true);
      return;
    }

    setBundlesReady(false);
    void loadCharacterBundles(false);
  }, [bundleList.length, loadCharacterBundles, phase]);

  useLayoutEffect(() => {
    if (previousSceneTransitionTokenRef.current === null) {
      previousSceneTransitionTokenRef.current = sceneTransitionToken;
      return;
    }

    if (previousSceneTransitionTokenRef.current !== sceneTransitionToken) {
      previousSceneTransitionTokenRef.current = sceneTransitionToken;
      setSceneTransitionKey((current) => current + 1);
      setIsSceneTransitioning(true);
    }
  }, [sceneTransitionToken]);

  useEffect(() => {
    if (!isSceneTransitioning) return;

    const timer = window.setTimeout(() => {
      setIsSceneTransitioning(false);
    }, sceneTransitionDuration);

    return () => window.clearTimeout(timer);
  }, [isSceneTransitioning, sceneTransitionDuration]);

  useEffect(() => {
    if (!pendingSceneContinuation || isSceneTransitioning) return;

    const timer = window.setTimeout(() => {
      advance();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [advance, isSceneTransitioning, pendingSceneContinuation]);

  useLayoutEffect(() => {
    setRevealedCount(0);
  }, [resolvedLine]);

  useEffect(() => {
    if (!resolvedLine) return;

    const timer = window.setInterval(() => {
      setRevealedCount((current) => {
        if (current >= resolvedLine.length) {
          window.clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, BASE_TEXT_SPEED / (textSpeed * Math.max(0.1, lineTypingSpeed)));

    return () => window.clearInterval(timer);
  }, [resolvedLine, textSpeed, lineTypingSpeed]);

  useEffect(() => {
    if (!blackScreenState?.active) {
      setBlackScreenVisible(false);
      return;
    }

    setBlackScreenVisible(true);
  }, [blackScreenState?.active, blackScreenState?.background]);

  // Auto-advance: when enabled, advance to the next line 1.5s after text finishes typing.
  useEffect(() => {
    if (!isAuto || isTyping || choices.length > 0 || isSceneTransitioning || isEnded) return;
    const timer = window.setTimeout(() => { advance(); }, 1500);
    return () => window.clearTimeout(timer);
  }, [isAuto, isTyping, choices.length, isSceneTransitioning, isEnded, advance, resolvedLine]);

  useEffect(() => {
    const handleAdvance = () => {
      if (phase !== "story") return;

      if (suppressAdvanceOnceRef.current || isSceneTransitioning) {
        suppressAdvanceOnceRef.current = false;
        return;
      }

      if (activeMinigame) return;
      if (choices.length > 0) return;

      if (isEnded) {
        clearScene();
        setPhase("menu");
        return;
      }

      if (isTyping) {
        setRevealedCount(resolvedLine.length);
        return;
      }

      advance();
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key !== " " && event.key !== "Enter") return;
      if (activeMinigame) return;
      if (choicesRef.current.length > 0) return;
      event.preventDefault();
      // If a control button is focused and no choices shown, activate it
      const ctrlIdx = focusedControlIndexRef.current;
      if (ctrlIdx >= 0) {
        activateControlRef.current(ctrlIdx);
        setFocusedControlIndex(-1);
        return;
      }
      handleAdvance();
    };

    const handleContextMenu = (event: MouseEvent) => event.preventDefault();

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("contextmenu", handleContextMenu);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [activeMinigame, advance, choices.length, isEnded, isSceneTransitioning, isTyping, phase, resolvedLine.length]);

  // Clear focus when choice set changes; highlight only after user presses D-pad
  useEffect(() => {
    setFocusedControlIndex(-1);
    setFocusedChoiceIndex(-1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choices.length]);

  // Gamepad/keyboard: D-pad navigates choices, Enter selects focused choice
  useEffect(() => {
    if (phase !== "story") return;
    const handler = (event: KeyboardEvent) => {
      const cs = choicesRef.current;
      if (cs.length === 0) return;
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        const dir = event.key === "ArrowUp" ? -1 : 1;
        setFocusedChoiceIndex((prev) => {
          // First D-pad press: start at top (Down) or bottom (Up)
          const seed = prev < 0 ? (dir > 0 ? 0 : cs.length - 1) : prev + dir;
          let next = ((seed % cs.length) + cs.length) % cs.length;
          // skip disabled
          const start = next;
          while (cs[next]?.disabled) {
            next = ((next + dir + cs.length) % cs.length);
            if (next === start) break;
          }
          return next;
        });
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        if (!isMobileRef.current) return;
        const choice = cs[focusedChoiceIndexRef.current];
        if (choice && !choice.disabled) {
          event.preventDefault();
          suppressAdvanceOnceRef.current = true;
          choose(choice.next);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [choose, phase]);

  // Gamepad/keyboard: Escape (B button) toggles config and closes overlays first
  useEffect(() => {
    if (phase !== "story") return;
    const handler = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      if (showLogRef.current) { setShowLog(false); return; }
      if (showConfigRef.current) { setShowConfig(false); return; }
      if (showSaveSlotsRef.current) { setShowSaveSlots(false); return; }
      // Deselect focused control button if any
      if (focusedControlIndexRef.current >= 0) { setFocusedControlIndex(-1); return; }
      setShowConfig(true);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase]);

  // Gamepad/keyboard: Left/Right navigates control buttons in dialogue (no choices, no overlay)
  useEffect(() => {
    if (phase !== "story") return;
    const handler = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      if (choicesRef.current.length > 0) return;
      if (showLogRef.current || showConfigRef.current || showSaveSlotsRef.current) return;
      event.preventDefault();
      const dir = event.key === "ArrowRight" ? 1 : -1;
      setFocusedControlIndex((prev) => {
        if (prev < 0) return dir > 0 ? 0 : CONTROL_COUNT - 1;
        return ((prev + dir) % CONTROL_COUNT + CONTROL_COUNT) % CONTROL_COUNT;
      });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase]);

  useEffect(() => {
    if (phase !== "logo" && phase !== "poweredBy" && phase !== "warning") return;

    setOpeningPhaseState("enter");
    const exitDelay = phase === "warning" ? 5600 : 3400;
    const nextDelay = phase === "warning" ? 7000 : 4700;
    const exitTimer = window.setTimeout(() => setOpeningPhaseState("exit"), exitDelay);
    const nextTimer = window.setTimeout(() => {
      setPhase((current) => {
        if (current === "logo") return "poweredBy";
        if (current === "poweredBy") return "warning";
        if (current === "warning") return "loading";
        return current;
      });
      setOpeningPhaseState("enter");
    }, nextDelay);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(nextTimer);
    };
  }, [phase]);

  const handleStartStory = () => {
    startStory();
    setPhase("story");
  };

  const handleOpenGalleryScene = (label: string) => {
    setAutoOpenGalleryOnMenu(true);
    startFromLabel(label, { galleryMode: true });
    setPhase("story");
  };

  const handleExitToMenu = useCallback(() => {
    setIsAuto(false);
    setShowLog(false);
    setShowConfig(false);
    setShowSaveSlots(false);
    setFocusedChoiceIndex(-1);
    setFocusedControlIndex(-1);
    setRevealedCount(0);
    clearScene();
    setMenuSessionKey((current) => current + 1);
    setPhase("menu");
  }, [clearScene]);

  const handleAuto = () => setIsAuto((prev) => !prev);

  const handleSkip = () => {
    if (isTyping) {
      setRevealedCount(resolvedLine.length);
    } else {
      advance();
    }
  };

  const activateControlRef = useRef<(idx: number) => void>(() => {});
  activateControlRef.current = (idx: number) => {
    if (idx === 0) handleAuto();
    else if (idx === 1) handleSkip();
    else if (idx === 2) setShowLog(true);
    else if (idx === 3) setShowSaveSlots(true);
    else if (idx === 4) setShowConfig(true);
    else if (idx === 5) { handleExitToMenu(); }
  };

  const buildSaveSlot = useCallback((): SaveSlot => ({
      currentLabel,
      // currentIndex is already past the say command; step back to re-display it on load
      currentIndex: Math.max(0, currentIndex - 1),
      background,
      backgroundVideo,
      location: resolvedLocation,
      speaker,
      preview: resolvedLine.slice(0, 80),
      savedAt: Date.now(),
      characters,
      flags,
      activeBackgroundMusic,
      activeSoundEffect,
    }), [
      activeBackgroundMusic,
      activeSoundEffect,
      background,
      backgroundVideo,
      characters,
      currentIndex,
      currentLabel,
      flags,
      resolvedLine,
      resolvedLocation,
      speaker,
    ]);

  const handleSaveToSlot = (slotIndex: number) => {
    const slot = buildSaveSlot();
    writeSlot(slotIndex, slot);
    setSlots(readAllSlots());
    setShowSaveSlots(false);
    setSaveToast(true);
    window.setTimeout(() => setSaveToast(false), 2000);
  };

  useEffect(() => {
    if (phase !== "story") return;
    const isDay4Start = currentLabel === "day4-bedroom";
    const isDay4ElenaCheckpoint = currentLabel === "day4-elena-door" && flags.day4ElenaCompleted === true;
    if (!isDay4Start && !isDay4ElenaCheckpoint) return;

    const autoSaveKey = `${currentLabel}:${currentIndex}:${String(flags.day3MayaMorningCompleted)}:${String(flags.day3Slot2ElenaCompleted)}:${String(flags.day4ElenaCompleted)}`;
    if (lastAutoSaveKeyRef.current === autoSaveKey) return;

    const slot = buildSaveSlot();
    writeAutoSave(slot);
    setAutoSaveSlot(readAutoSave());
    lastAutoSaveKeyRef.current = autoSaveKey;
  }, [buildSaveSlot, currentIndex, currentLabel, flags.day3MayaMorningCompleted, flags.day3Slot2ElenaCompleted, flags.day4ElenaCompleted, phase]);

  const handleLoadFromMenu = (slot: SaveSlot) => {
    loadFromSave(
      slot.currentLabel,
      slot.currentIndex,
      slot.background,
      slot.backgroundVideo ?? null,
      slot.location,
      slot.characters ?? {},
      slot.flags ?? {},
      slot.activeBackgroundMusic ?? null,
      slot.activeSoundEffect ?? null,
    );
    setPhase("story");
  };

  const handleContinueFromMenu = () => {
    if (!autoSaveSlot) return;
    handleLoadFromMenu(autoSaveSlot);
  };

  const handleBgVolumeChange = (value: number) => {
    setBgVolume(value);
    bgMusicRef.current?.setVolume(value);
  };

  const isVideoCutSceneActive = activeCutScene !== null || activeMultiCutScene !== null;
  const renderCharacters = Object.values(characters)
    .filter((character) => character.visible || character.isExiting)
    .sort((left, right) => left.y - right.y);

  return (
    <>
      {phase === "logo" ? (
        <OpeningLogo
          phaseState={openingPhaseState}
        />
      ) : null}

      {phase === "poweredBy" ? (
        <PoweredByLogo
          phaseState={openingPhaseState}
        />
      ) : null}

      {phase === "warning" ? (
        <OpeningWarning
          language={language}
          phaseState={openingPhaseState}
        />
      ) : null}

      {showLoadingOverlay ? (
        <SbnLoadingScreen
          loadingLabel={labels.loading}
          phaseState={loadingPhaseState}
          statusMessage={resolvedStatusMessage}
        />
      ) : null}

      {phase === "menu" && (
        isMobile
          ? <MainMenuMobile key={`menu-mobile-${menuSessionKey}`} bgVolume={bgVolume} labels={labels} frameRate={frameRate} frameRateOptions={frameRateOptions} graphicsQuality={graphicsQuality} graphicsQualityOptions={resolvedGraphicsQualityOptions} language={language} textSpeed={textSpeed} onFrameRateChange={setFrameRate} onGraphicsQualityChange={setGraphicsQuality} onLanguageChange={setLanguage} onBgVolumeChange={handleBgVolumeChange} onTextSpeedChange={setTextSpeed} onStart={handleStartStory} onContinue={handleContinueFromMenu} onOpenGalleryScene={handleOpenGalleryScene} onLoad={handleLoadFromMenu} slots={slots} autoSaveSlot={autoSaveSlot} isReady={bundlesReady} flags={galleryFlags} autoOpenGallery={autoOpenGalleryOnMenu} onAutoOpenGalleryConsumed={() => setAutoOpenGalleryOnMenu(false)} />
          : <MainMenu key={`menu-desktop-${menuSessionKey}`} bgVolume={bgVolume} labels={labels} frameRate={frameRate} frameRateOptions={frameRateOptions} graphicsQuality={graphicsQuality} graphicsQualityOptions={resolvedGraphicsQualityOptions} language={language} textSpeed={textSpeed} onFrameRateChange={setFrameRate} onGraphicsQualityChange={setGraphicsQuality} onLanguageChange={setLanguage} onBgVolumeChange={handleBgVolumeChange} onTextSpeedChange={setTextSpeed} onStart={handleStartStory} onContinue={handleContinueFromMenu} onOpenGalleryScene={handleOpenGalleryScene} onLoad={handleLoadFromMenu} slots={slots} autoSaveSlot={autoSaveSlot} isReady={bundlesReady} flags={galleryFlags} autoOpenGallery={autoOpenGalleryOnMenu} onAutoOpenGalleryConsumed={() => setAutoOpenGalleryOnMenu(false)} />
      )}
      {phase === "story" ? (
        <main
          className="vn-root"
          onClick={() => {
            if (suppressAdvanceOnceRef.current || isSceneTransitioning) {
              suppressAdvanceOnceRef.current = false;
              return;
            }
            if (activeMinigame) return;
            if (choices.length > 0) return;
            if (isEnded) {
              handleExitToMenu();
              return;
            }
            if (isTyping) {
              setRevealedCount(resolvedLine.length);
              return;
            }
            advance();
          }}
        >
        {!isVideoCutSceneActive && backgroundVideo ? (
          <video
            key={`${backgroundVideo.src}-${sceneTransitionKey}`}
            className="absolute inset-0 h-full w-full object-cover"
            src={backgroundVideo.src}
            autoPlay
            loop={backgroundVideo.loop ?? true}
            muted={backgroundVideo.muted ?? true}
            playsInline
            style={{
              filter: backgroundVideo.filter,
              ...(backgroundAnimation && {
                animation: `vn-bg-zoom-pan ${backgroundAnimation.duration ?? 8}s ease-in-out forwards`,
              }),
              ...(backgroundAnimation && ({
                "--vn-bg-zoom": backgroundAnimation.zoom ?? 1.2,
                "--vn-bg-pan-x": `${backgroundAnimation.panX ?? 10}%`,
                "--vn-bg-pan-y": `${backgroundAnimation.panY ?? 0}%`,
              } as CSSProperties)),
            }}
            ref={(node) => {
              if (!node) return;
              node.playbackRate = backgroundVideo.playbackRate ?? 1;
            }}
          />
        ) : !isVideoCutSceneActive ? (
          <div
            className="vn-background"
            style={{
              backgroundImage: background,
              ...(backgroundAnimation && {
                animation: `vn-bg-zoom-pan ${backgroundAnimation.duration ?? 8}s ease-in-out forwards`,
              }),
              ...(backgroundAnimation && ({
                "--vn-bg-zoom": backgroundAnimation.zoom ?? 1.2,
                "--vn-bg-pan-x": `${backgroundAnimation.panX ?? 10}%`,
                "--vn-bg-pan-y": `${backgroundAnimation.panY ?? 0}%`,
              } as CSSProperties)),
            }}
          />
        ) : (
          <div className="vn-background" style={{ background: "#000" }} />
        )}
        <div className="vn-vignette" />
        <div className="vn-stage">
          <div className="vn-lighting" />
          {!isVideoCutSceneActive && parallaxLayers.map((layer, i) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                transform: `translate(${(layer.xOffset ?? 0) * 100}%, ${(layer.yOffset ?? 0) * 100}%)`,
                pointerEvents: "none",
              }}
            >
              <div
                className="vn-parallax-layer"
                style={{
                  backgroundImage: `url(${layer.url})`,
                  opacity: layer.opacity ?? 1,
                  animationName: layer.direction === "rtl" ? "vn-parallax-rtl" : "vn-parallax-ltr",
                  animationDuration: `${layer.speed ?? 20}s`,
                }}
              />
            </div>
          ))}
          {sceneTransitionKey > 0 ? (
            <div
              key={sceneTransitionKey}
              className="vn-scene-transition"
              style={{ animationDuration: `${sceneTransitionDuration}ms` }}
            />
          ) : null}

          {!isVideoCutSceneActive &&
            !isSceneTransitioning &&
            renderCharacters.map((character) => {
              const bundle = bundles[character.bundleId];
              if (!bundle) return null;
              const isDimmed = isNarration
                ? true
                : activeCharacterId !== null && activeCharacterId !== character.characterId;
              return (
                <CharacterSprite
                  key={`${character.id}-${character.entryVersion}`}
                  bundle={bundle}
                  character={character}
                  graphicsQuality={graphicsQuality}
                  isDimmed={isDimmed}
                />
              );
            })}

          {hasResolvedLocation && (isMobile ? (
            <div className="absolute top-3 right-3 z-20">
              <div className="border border-white/10 bg-[rgba(11,10,18,0.36)] backdrop-blur-[14px] rounded-full px-3 py-1.5 text-[0.6rem] tracking-[0.32em] uppercase text-[#ccb9a9]">
                {resolvedLocation}
              </div>
            </div>
          ) : (
            <div className="vn-caption">
              <div className="vn-location">{resolvedLocation}</div>
            </div>
          ))}
        </div>

        {blackScreenState?.active ? (
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: blackScreenState.background,
              opacity: blackScreenVisible ? 1 : 0,
              transition: `opacity ${BLACK_SCREEN_FADE_MS}ms ease`,
            }}
          />
        ) : null}

        <DialogueUI
          isMobile={isMobile}
          activeMinigame={activeMinigame}
          isCenteredText={isCenteredText}
          isNarration={isNarration}
          isSceneTransitioning={isSceneTransitioning}
          speaker={speaker}
          visibleLine={visibleLine}
          resolvedLine={resolvedLine}
          lineSize={lineSize}
          isTyping={isTyping}
          resolvedChoices={resolvedChoices}
          focusedChoiceIndex={focusedChoiceIndex}
          focusedControlIndex={focusedControlIndex}
          isAuto={isAuto}
          labels={labels}
          onChoose={choose}
          onSuppressAdvance={() => { suppressAdvanceOnceRef.current = true; }}
          onAuto={handleAuto}
          onSkip={handleSkip}
          onLog={() => setShowLog(true)}
          onSave={() => setShowSaveSlots(true)}
          onConfig={() => setShowConfig(true)}
          onExit={handleExitToMenu}
        />

        {activeMinigame?.id === "elevator-button" ? (
          isMobile
            ? <ElevatorButtonMinigameMobile onComplete={completeMinigame} />
            : <ElevatorButtonMinigame onComplete={completeMinigame} />
        ) : activeMinigame?.id === "pipe-connection" ? (
          isMobile
            ? <PipeConnectionMinigameMobile onComplete={completeMinigame} />
            : <PipeConnectionMinigame onComplete={completeMinigame} />
        ) : activeMinigame?.id === "smartphone-contacts" ? (
          isMobile
            ? <SmartphoneContactMinigameMobile 
                onSelect={choose} 
                language={language}
                showSleepOption={activeMinigame.options?.showSleepOption as boolean}
                sleepOptionNext={activeMinigame.options?.sleepOptionNext as string}
                disabledContacts={smartphoneDisabledContacts}
                title={activeMinigame.options?.title as LocalizedText}
                subtitle={activeMinigame.options?.subtitle as LocalizedText}
                contactOverrides={activeMinigame.options?.contactOverrides as SmartphoneContactOverrides}
              />
            : <SmartphoneContactMinigame 
                onSelect={choose} 
                language={language}
                showSleepOption={activeMinigame.options?.showSleepOption as boolean}
                sleepOptionNext={activeMinigame.options?.sleepOptionNext as string}
                disabledContacts={smartphoneDisabledContacts}
                title={activeMinigame.options?.title as LocalizedText}
                subtitle={activeMinigame.options?.subtitle as LocalizedText}
                contactOverrides={activeMinigame.options?.contactOverrides as SmartphoneContactOverrides}
              />
        ) : activeMinigame?.id === "laptop-cleanup" ? (
          <LaptopCleanupMinigame onComplete={completeMinigame} />
        ) : activeMinigame?.id === "email-compose" ? (
          <EmailComposeMinigame onComplete={completeMinigame} />
        ) : null}

        {activeCutScene ? (
          <CutSceneOverlay
            key={`${activeCutScene.src}:${activeCutScene.loop ? "loop" : "once"}:${activeCutScene.endFrame ?? "full"}:${activeCutScene.fps ?? "auto"}`}
            src={activeCutScene.src}
            audioSrc={VOICE_ACTING_ENABLED ? activeCutScene.audioSrc : undefined}
            loop={activeCutScene.loop}
            narrate={activeCutScene.narrate}
            showSpeedControl={activeCutScene.showSpeedControl}
            forcedPlaybackSpeed={resolveCutSceneSpeed(activeCutScene.speed)}
            endFrame={activeCutScene.endFrame}
            fps={activeCutScene.fps}
            language={language}
            continueHint={labels.clickToContinue}
            speedLabels={{
              slow: labels.slowPlayback,
              normal: labels.normalPlayback,
              fast: labels.fastPlayback,
              faster: labels.fasterPlayback,
            }}
            textSpeed={textSpeed}
            narrationClassName={isMobile ? "vn-cutscene-narrator-shell-mobile" : undefined}
            onComplete={completeCutScene}
          />
        ) : null}

        {activeMultiCutScene ? (
          <MultiCutSceneOverlay
            key={activeMultiCutScene.initialSelectionId ?? activeMultiCutScene.selections[0]?.id ?? "multi-cutscene"}
            selections={activeMultiCutScene.selections}
            initialSelectionId={activeMultiCutScene.initialSelectionId}
            language={language}
            textSpeed={textSpeed}
            labels={{
              clickToContinue: labels.clickToContinue,
              slowPlayback: labels.slowPlayback,
              normalPlayback: labels.normalPlayback,
              fastPlayback: labels.fastPlayback,
              fasterPlayback: labels.fasterPlayback,
              previousScene: labels.previousScene,
              nextScene: labels.nextScene,
              continueStory: labels.continueStory,
              lockedScene: labels.lockedScene,
            }}
            isMobile={isMobile}
            onComplete={completeMultiCutScene}
          />
        ) : null}

        {bundleList.length === 0 ? (
          <div className="vn-loading">
            <div className="vn-loading-card">
              <p className="vn-loading-label">Loading</p>
              <p className="vn-loading-text">{resolvedStatusMessage}</p>
            </div>
          </div>
        ) : null}

        </main>
      ) : null}

      {showLog && (
        <LogOverlay
          emptyLabel={labels.noConversation}
          history={history}
          language={language}
          title={labels.log}
          onClose={() => setShowLog(false)}
        />
      )}

      {showConfig && (
        <MainMenuSettingsOverlay
          bgVolume={bgVolume}
          bgVolumeLabel={labels.volumeBgm}
          closeLabel={labels.close}
          frameRate={frameRate}
          frameRateLabel={labels.frameRate}
          frameRateOptions={frameRateOptions}
          graphicsQuality={graphicsQuality}
          graphicsQualityLabel={labels.graphicsQuality}
          graphicsQualityOptions={resolvedGraphicsQualityOptions}
          textSpeed={textSpeed}
          textSpeedLabel={labels.textSpeed}
          language={language}
          languageLabel={labels.language}
          languageOptions={languageOptions}
          onFrameRateChange={setFrameRate}
          onGraphicsQualityChange={setGraphicsQuality}
          onLanguageChange={setLanguage}
          onBgVolumeChange={handleBgVolumeChange}
          onTextSpeedChange={setTextSpeed}
          onClose={() => setShowConfig(false)}
          title={labels.mainMenuSettings}
        />
      )}

      {showSaveSlots && (
        <SaveSlotOverlay
          emptyLabel={uiText.emptySlot}
          language={language}
          mode="save"
          modeLabel={labels.save}
          slotLabel={labels.slot}
          slots={slots}
          unknownSceneLabel={uiText.unknownScene}
          onSelect={handleSaveToSlot}
          onClose={() => setShowSaveSlots(false)}
        />
      )}

      {saveToast && (
        <div className="fixed bottom-[12vh] left-1/2 -translate-x-1/2 z-50 pointer-events-none px-4 py-2 rounded-full text-[0.7rem] text-white/80 tracking-[0.04em]"
          style={{ background: "rgba(5,6,12,0.85)", backdropFilter: "blur(6px)" }}>
          {labels.saved}
        </div>
      )}
    </>
  );
};

export default App;
