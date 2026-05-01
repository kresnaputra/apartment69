import { type CSSProperties, memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
import { NarratorMobile } from "@/components/NarratorMobile";
import { DialogueMobile } from "@/components/DialogueMobile";
import { LogOverlay } from "@/components/LogOverlay";
import { ConfigOverlay } from "@/components/ConfigOverlay";
import { SaveSlotOverlay } from "@/components/SaveSlotOverlay";
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, languageOptions, resolveText, uiText, type LanguageCode, type LocalizedText } from "@/lib/i18n";
import { readAllSlots, writeSlot } from "@/lib/runtime/saveSlots";
import type { SaveSlot } from "@/lib/runtime/saveSlots";
import { fitCameraToScene } from "@/lib/sbn/sampling";
import type { SceneBounds } from "@/types/sbn";
import { useIsMobile } from "@/hooks/useIsMobile";
import { characterBundleRegistry } from "@/character";
import type { SmartphoneContactOverrides } from "@/components/minigames/smartphoneContacts";
import { NovelAudioEngine } from "@/lib/runtime/audioEngine";
import { BackgroundMusic } from "@/lib/runtime/backgroundMusic";
import {
  initializeAdMob,
  showDayTransitionInterstitial,
} from "@/lib/runtime/admob";
import { useNovelStore } from "@/store/novelStore";
import type { LoadedCharacterBundle } from "@/types/characterBundle";
import type { CharacterInstance, CutSceneSelection } from "@/types/novel";
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

type CharacterSpriteProps = {
  bundle: LoadedCharacterBundle;
  character: CharacterInstance;
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
  const {
    containerRef,
    spriteStyle,
    stageScale,
    viewport,
  } = useCharacterStageSizing(
    character,
    bundle.frameSize.h > 0 ? bundle.frameSize.w / bundle.frameSize.h : 0.6,
  );

  useEffect(() => {
    rendererRef.current = new CanvasSpritesheetRenderer();
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
    const renderer = rendererRef.current;
    if (!renderer) return;

    renderer.render({
      bundle,
      frame: character.frame,
      dimmed: isDimmed,
      viewportWidth: viewport.width,
      viewportHeight: viewport.height,
    });
  }, [bundle, character.frame, isDimmed, stageScale, viewport.height, viewport.width]);

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

const SbnCharacterSprite = memo(({ bundle, character, isDimmed }: CharacterSpriteProps & {
  bundle: Extract<LoadedCharacterBundle, { kind: "sbn" }>;
}) => {
  const rendererRef = useRef<CanvasSbnRenderer | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cameraRef = useRef<SceneBounds | null>(null);
  const {
    containerRef,
    spriteStyle,
    stageScale,
    viewport,
  } = useCharacterStageSizing(character, bundle.preferredAspectRatio);

  useEffect(() => {
    rendererRef.current = new CanvasSbnRenderer();
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
    // Invalidate camera cache when viewport changes
    cameraRef.current = null;
  }, [stageScale, viewport.height, viewport.width]);

  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;
    
    // Only recalculate camera if it hasn't been cached
    if (!cameraRef.current) {
      cameraRef.current = viewport.width === 520 && viewport.height === 880
        ? bundle.preferredCamera
        : fitCameraToScene(bundle.project, viewport.width, viewport.height);
    }
    const camera = cameraRef.current;
    
    renderer.render({
      project: bundle.project,
      frame: character.frame,
      scale: 1,
      dimmed: isDimmed,
      camera,
      viewportWidth: viewport.width,
      viewportHeight: viewport.height,
    });
  }, [bundle, character.frame, isDimmed, viewport.height, viewport.width]);

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

const CharacterSprite = memo(({ bundle, character, isDimmed }: CharacterSpriteProps) => {
  if (bundle.kind === "sbn") {
    return <SbnCharacterSprite bundle={bundle} character={character} isDimmed={isDimmed} />;
  }

  return <SpritesheetCharacterSprite bundle={bundle} character={character} isDimmed={isDimmed} />;
});

type CharacterStageProps = {
  characters: Record<string, CharacterInstance>;
  bundles: Record<string, LoadedCharacterBundle>;
  activeCharacterId: string | null;
  isNarration: boolean;
  isSceneTransitioning: boolean;
};

const CharacterStage = memo(({ characters, bundles, activeCharacterId, isNarration, isSceneTransitioning }: CharacterStageProps) => {
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
  resolvedChoices: Array<{ id: string; label: string; next: string }>;
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
            {resolvedChoices.map((choice) => (
              <button
                key={choice.id}
                className="vn-choice"
                type="button"
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

const CutSceneOverlay = ({
  src,
  loop,
  narrate,
  showSpeedControl,
  language,
  allowDirectExit = true,
  speedControlBottom = "60px",
  continueHint,
  speedLabels,
  textSpeed = 1,
  forcedPlaybackSpeed,
  onComplete,
}: {
  src: string;
  loop?: boolean;
  narrate?: LocalizedText;
  showSpeedControl?: boolean;
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
  onComplete: () => void;
}) => {
  const [visible, setVisible] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(1);
  const completedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const resolvedNarrate = narrate ? resolveText(narrate, language) : null;
  const visibleNarrate = resolvedNarrate ? resolvedNarrate.slice(0, revealedCount) : null;
  const speedOptions = [
    { label: "1x", value: 1 },
    { label: "2x", value: 2 },
    { label: "3x", value: 3 },
  ];

  useEffect(() => {
    // Double RAF ensures the initial opacity:0 is painted before transitioning in
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    setRevealedCount(0);
    setVideoEnded(false);
    setCurrentSpeed(1);
  }, [resolvedNarrate, src]);

  useEffect(() => {
    if (!resolvedNarrate) return;

    const timer = window.setInterval(() => {
      setRevealedCount((current) => {
        if (current >= resolvedNarrate.length) {
          window.clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, BASE_TEXT_SPEED / textSpeed);

    return () => window.clearInterval(timer);
  }, [resolvedNarrate, textSpeed]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = forcedPlaybackSpeed ?? currentSpeed;
    }
  }, [currentSpeed, forcedPlaybackSpeed]);

  const handleSpeedChange = (speed: number) => {
    setCurrentSpeed(speed);
  };

  const handleExit = useCallback(() => {
    if (completedRef.current) return;
    // Allow exit if video ended OR if loop is enabled
    if (!allowDirectExit) return;
    if (!videoEnded && !loop) return;
    completedRef.current = true;
    setFadingOut(true);
    window.setTimeout(onComplete, CUTSCENE_FADE_MS);
  }, [allowDirectExit, loop, onComplete, videoEnded]);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key !== " " && e.key !== "Enter") return;
      if (!allowDirectExit) return;
      e.preventDefault();
      handleExit();
    };
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [allowDirectExit, handleExit]);

  return (
    <div
      onClick={allowDirectExit ? handleExit : undefined}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: allowDirectExit && (videoEnded || loop) ? "pointer" : "default",
      }}
    >
      <video
        ref={videoRef}
        key={src}
        src={src}
        autoPlay
        playsInline
        loop={loop}
        onEnded={() => setVideoEnded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          opacity: fadingOut || !visible ? 0 : 1,
          transition: `opacity ${CUTSCENE_FADE_MS}ms ease`,
        }}
      />
      {visibleNarrate && (
        <div className="vn-narrator-shell" style={{
          opacity: fadingOut || !visible ? 0 : 1,
          transition: `opacity ${CUTSCENE_FADE_MS}ms ease`,
        }}>
          <div className="vn-narrator-box">
            <div className="vn-narrator-line">{visibleNarrate}</div>
          </div>
        </div>
      )}
      {!visibleNarrate && allowDirectExit && (videoEnded || loop) ? (
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

const MultiCutSceneOverlay = ({
  selections,
  initialSelectionId,
  language,
  labels,
  textSpeed = 1,
  onComplete,
}: {
  selections: CutSceneSelection[];
  initialSelectionId?: string;
  language: LanguageCode;
  labels: {
    fastPlayback: string;
    fasterPlayback: string;
    previousScene: string;
    nextScene: string;
    continueStory: string;
    lockedScene: string;
    normalPlayback: string;
    slowPlayback: string;
  };
  textSpeed?: number;
  onComplete: () => void;
}) => {
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(initialSelectionId ?? selections[0]?.id ?? null);
  const [maxUnlockedSelectionIndex, setMaxUnlockedSelectionIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const enabledSelections = selections.filter((scene) => scene.enabled !== false);
  const activeSelection = selections.find((scene) => scene.id === selectedSceneId) ?? selections[0];
  const currentSelectionIndex = enabledSelections.findIndex((scene) => scene.id === activeSelection?.id);
  const isLastSelection = currentSelectionIndex >= enabledSelections.length - 1;

  useEffect(() => {
    const initialId = initialSelectionId ?? enabledSelections[0]?.id ?? selections[0]?.id ?? null;
    const initialIndex = Math.max(0, enabledSelections.findIndex((scene) => scene.id === initialId));
    setSelectedSceneId(initialId);
    setMaxUnlockedSelectionIndex(Math.min(enabledSelections.length - 1, initialIndex + 1));
    setPlaybackSpeed(1);
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
    <div style={{ position: "fixed", inset: 0, zIndex: 100, pointerEvents: "none" }}>
      <CutSceneOverlay
        key={activeSelection.id}
        src={activeSelection.src}
        loop={activeSelection.loop}
        narrate={activeSelection.narrate}
        showSpeedControl={false}
        language={language}
        allowDirectExit={false}
        speedControlBottom="168px"
        continueHint=""
        speedLabels={{
          slow: labels.slowPlayback,
          normal: labels.normalPlayback,
          fast: labels.fastPlayback,
          faster: labels.fasterPlayback,
        }}
        textSpeed={textSpeed * playbackSpeed}
        forcedPlaybackSpeed={playbackSpeed}
        onComplete={onComplete}
      />
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          zIndex: 101,
          left: "50%",
          bottom: "26px",
          transform: "translateX(-50%)",
          display: "grid",
          gap: "8px",
          width: "min(72vw, 600px)",
          padding: "0",
          borderRadius: "0",
          background: "transparent",
          border: "none",
          pointerEvents: "auto",
        }}
      >
        {/* Speed buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
          {[
            { label: "1x", value: 1 },
            { label: "2x", value: 2 },
            { label: "3x", value: 3 },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setPlaybackSpeed(option.value)}
              style={{
                padding: "3px 10px",
                borderRadius: "999px",
                border: option.value === playbackSpeed
                  ? "1px solid rgba(255, 214, 173, 0.55)"
                  : "1px solid rgba(255, 255, 255, 0.1)",
                background: option.value === playbackSpeed
                  ? "rgba(255, 214, 173, 0.14)"
                  : "transparent",
                backdropFilter: "blur(16px)",
                color: option.value === playbackSpeed
                  ? "#ffd6ad"
                  : "rgba(255, 255, 255, 0.38)",
                fontSize: "0.62rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: option.value === playbackSpeed ? 600 : 400,
                cursor: "pointer",
                transition: "all 160ms ease",
              }}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Scene selector buttons */}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(selections.length, 5)}, minmax(0, 1fr))`, gap: "10px" }}>
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
                style={{
                  minWidth: 0,
                  width: "100%",
                  padding: "9px 8px",
                  borderRadius: "10px",
                  border: isActive
                    ? "1px solid rgba(255, 214, 173, 0.45)"
                    : "1px solid rgba(255, 255, 255, 0.08)",
                  background: isActive
                    ? "rgba(255, 214, 173, 0.12)"
                    : "rgba(0, 0, 0, 0.55)",
                  backdropFilter: "blur(16px)",
                  color: !isUnlocked
                    ? "rgba(255, 255, 255, 0.18)"
                    : isActive
                      ? "#ffd6ad"
                      : "rgba(255, 255, 255, 0.55)",
                  cursor: !isUnlocked ? "not-allowed" : "pointer",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: "0.85rem",
                  letterSpacing: "0.04em",
                  opacity: isUnlocked ? 1 : 0.35,
                  transition: "all 160ms ease",
                }}
              >
                {enabledIndex === -1 ? "?" : enabledIndex + 1}
              </button>
            );
          })}
        </div>

        {/* Continue / spacer */}
        <div>
          {isLastSelection ? (
            <button
              type="button"
              onClick={onComplete}
              style={{
                width: "100%",
                padding: "9px 16px",
                borderRadius: "10px",
                border: "1px solid rgba(255, 214, 173, 0.35)",
                background: "rgba(255, 214, 173, 0.12)",
                backdropFilter: "blur(16px)",
                color: "#ffd6ad",
                fontWeight: 600,
                fontSize: "0.72rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 160ms ease",
              }}
            >
              Finish
            </button>
          ) : (
            <div aria-hidden="true" style={{ height: "52px" }} />
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
  const advance = useNovelStore((state) => state.advance);
  const choose = useNovelStore((state) => state.choose);
  const completeMinigame = useNovelStore((state) => state.completeMinigame);
  const completeCutScene = useNovelStore((state) => state.completeCutScene);
  const completeMultiCutScene = useNovelStore((state) => state.completeMultiCutScene);
  const completeInterstitial = useNovelStore((state) => state.completeInterstitial);
  const tickCharacters = useNovelStore((state) => state.tickCharacters);
  const clearScene = useNovelStore((state) => state.clearScene);
  const loadFromSave = useNovelStore((state) => state.loadFromSave);
  const isEnded = useNovelStore((state) => state.isEnded);

  const history = useNovelStore((state) => state.history);
  const currentLabel = useNovelStore((state) => state.currentLabel);
  const currentIndex = useNovelStore((state) => state.currentIndex);
  const flags = useNovelStore((state) => state.flags);

  const [revealedCount, setRevealedCount] = useState(0);
  const [sceneTransitionKey, setSceneTransitionKey] = useState(0);
  const [isSceneTransitioning, setIsSceneTransitioning] = useState(false);
  const [isAuto, setIsAuto] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showSaveSlots, setShowSaveSlots] = useState(false);
  const [blackScreenVisible, setBlackScreenVisible] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>(() => {
    if (typeof window === "undefined") return DEFAULT_LANGUAGE;
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return saved && languageOptions.some((option) => option.code === saved)
      ? saved as LanguageCode
      : DEFAULT_LANGUAGE;
  });
  const [bgVolume, setBgVolume] = useState(0.4);
  const [textSpeed, setTextSpeed] = useState(1);
  const [saveToast, setSaveToast] = useState(false);
  const [slots, setSlots] = useState<(SaveSlot | null)[]>(readAllSlots);
  const audioRef = useRef<NovelAudioEngine | null>(null);
  const voiceRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedBundleLoadRef = useRef(false);
  const previousSceneTransitionTokenRef = useRef<number | null>(null);
  const suppressAdvanceOnceRef = useRef(false);
  const resolvedLine = resolveText(line, language);
  const resolvedLocation = resolveText(location, language);
  const resolvedStatusMessage = resolveText(statusMessage, language);
  const visibleLine = resolvedLine.slice(0, revealedCount);
  const isTyping = revealedCount < resolvedLine.length;
  const isNarration = textPresentation === "narration" && choices.length === 0 && Boolean(resolvedLine);
  const isCenteredText = textPresentation === "centered" && choices.length === 0 && Boolean(resolvedLine);
  const resolvedChoices = choices.map((choice) => ({
    ...choice,
    label: resolveText(choice.label, language),
  }));
  const labels = {
    auto: resolveText(uiText.auto, language),
    clickToContinue: resolveText(uiText.clickToContinue, language),
    clickToFinish: resolveText(uiText.clickToFinish, language),
    close: resolveText(uiText.close, language),
    config: resolveText(uiText.config, language),
    continueStory: resolveText(uiText.continueStory, language),
    emptySlot: resolveText(uiText.emptySlot, language),
    exit: resolveText(uiText.exit, language),
    fastPlayback: resolveText(uiText.playbackFast, language),
    fasterPlayback: resolveText(uiText.playbackFaster, language),
    gallery: resolveText(uiText.gallery, language),
    galleryEmpty: resolveText(uiText.galleryEmpty, language),
    galleryTitle: resolveText(uiText.galleryTitle, language),
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
      bgMusicRef.current?.play(gameplayMusic, 0.4);
    } else {
      bgMusicRef.current?.stop();
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "loading" || hasStartedBundleLoadRef.current) return;

    hasStartedBundleLoadRef.current = true;
    setShowLoadingOverlay(true);
    let cancelled = false;

    const load = async () => {
      try {
        setStatusMessage(uiText.bundlesLoading);
        const bundleEntries = Object.entries(characterBundleRegistry);

        const loadedBundles = await Promise.all(
          bundleEntries.map(async ([bundleId, bundlePath]) => {
            const bundle = await loadCharacterBundle(bundleId, bundlePath);
            return [bundleId, bundle] as const;
          }),
        );

        if (cancelled) return;

        for (const [bundleId, bundle] of loadedBundles) {
          registerBundle(bundleId, bundle);
        }

        setBundlesReady(true);
        setLoadingPhaseState("exit");
        setPhase("menu");
        window.setTimeout(() => {
          setShowLoadingOverlay(false);
          setLoadingPhaseState("enter");
        }, 900);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Gagal memuat visual novel.";
        setStatusMessage(message);
        hasStartedBundleLoadRef.current = false;
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [phase, registerBundle, setStatusMessage]);

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

    setBlackScreenVisible(false);
    const raf = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setBlackScreenVisible(true);
      });
    });

    return () => window.cancelAnimationFrame(raf);
  }, [blackScreenState?.active, blackScreenState?.background]);

  // Auto-advance: when enabled, advance to the next line 1.5s after text finishes typing.
  useEffect(() => {
    if (!isAuto || isTyping || choices.length > 0 || isSceneTransitioning || isEnded) return;
    const timer = window.setTimeout(() => { advance(); }, 1500);
    return () => window.clearTimeout(timer);
  }, [isAuto, isTyping, choices.length, isSceneTransitioning, isEnded, advance, resolvedLine]);

  useEffect(() => {
    let animationFrame = 0;
    let lastTick = performance.now();
    const targetFps = 24;
    const frameInterval = 1000 / targetFps;

    const loop = (time: number) => {
      const deltaMs = time - lastTick;
      
      // Throttle to 24 FPS to reduce CPU usage
      if (deltaMs >= frameInterval) {
        lastTick = time - (deltaMs % frameInterval);
        tickCharacters(deltaMs);
      }
      
      animationFrame = window.requestAnimationFrame(loop);
    };

    animationFrame = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [tickCharacters]);

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
      event.preventDefault();
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

  const handleAuto = () => setIsAuto((prev) => !prev);

  const handleSkip = () => {
    if (isTyping) {
      setRevealedCount(resolvedLine.length);
    } else {
      advance();
    }
  };

  const handleSaveToSlot = (slotIndex: number) => {
    const slot: SaveSlot = {
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
    };
    writeSlot(slotIndex, slot);
    setSlots(readAllSlots());
    setShowSaveSlots(false);
    setSaveToast(true);
    window.setTimeout(() => setSaveToast(false), 2000);
  };

  const handleLoadFromMenu = (slot: SaveSlot) => {
    loadFromSave(
      slot.currentLabel,
      slot.currentIndex,
      slot.background,
      slot.backgroundVideo ?? null,
      slot.location,
      slot.characters ?? {},
      slot.flags ?? {},
    );
    setPhase("story");
  };

  const handleBgVolumeChange = (value: number) => {
    setBgVolume(value);
    bgMusicRef.current?.setVolume(value);
  };

  const bundleList = Object.values(bundles);
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
          ? <MainMenuMobile bgVolume={bgVolume} labels={labels} language={language} textSpeed={textSpeed} onLanguageChange={setLanguage} onBgVolumeChange={handleBgVolumeChange} onTextSpeedChange={setTextSpeed} onStart={handleStartStory} onLoad={handleLoadFromMenu} slots={slots} isReady={bundlesReady} />
          : <MainMenu bgVolume={bgVolume} labels={labels} language={language} textSpeed={textSpeed} onLanguageChange={setLanguage} onBgVolumeChange={handleBgVolumeChange} onTextSpeedChange={setTextSpeed} onStart={handleStartStory} onLoad={handleLoadFromMenu} slots={slots} isReady={bundlesReady} />
      )}
      <main
        className="vn-root"
        style={{ visibility: phase === "story" ? "visible" : "hidden" }}
        onClick={() => {
          if (suppressAdvanceOnceRef.current || isSceneTransitioning) {
            suppressAdvanceOnceRef.current = false;
            return;
          }
          if (activeMinigame) return;
          if (choices.length > 0) return;
          if (isEnded) {
            setPhase("menu");
            return;
          }
          if (isTyping) {
            setRevealedCount(resolvedLine.length);
            return;
          }
          advance();
        }}
      >
        {backgroundVideo ? (
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
        ) : (
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
        )}
        <div className="vn-vignette" />
        <div className="vn-stage">
          <div className="vn-lighting" />
          {parallaxLayers.map((layer, i) => (
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

          {!isSceneTransitioning &&
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
                  isDimmed={isDimmed}
                />
              );
            })}

          {isMobile ? (
            <div className="absolute top-3 right-3 z-20">
              <div className="border border-white/10 bg-[rgba(11,10,18,0.36)] backdrop-blur-[14px] rounded-full px-3 py-1.5 text-[0.6rem] tracking-[0.32em] uppercase text-[#ccb9a9]">
                {resolvedLocation || "\u00a0"}
              </div>
            </div>
          ) : (
            <div className="vn-caption">
              <div className="vn-location">{resolvedLocation || " "}</div>
            </div>
          )}
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
          isAuto={isAuto}
          labels={labels}
          onChoose={choose}
          onSuppressAdvance={() => { suppressAdvanceOnceRef.current = true; }}
          onAuto={handleAuto}
          onSkip={handleSkip}
          onLog={() => setShowLog(true)}
          onSave={() => setShowSaveSlots(true)}
          onConfig={() => setShowConfig(true)}
          onExit={() => { clearScene(); setPhase("menu"); }}
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
                disabledContacts={activeMinigame.options?.disabledContacts as string[]}
                title={activeMinigame.options?.title as LocalizedText}
                subtitle={activeMinigame.options?.subtitle as LocalizedText}
                contactOverrides={activeMinigame.options?.contactOverrides as SmartphoneContactOverrides}
              />
            : <SmartphoneContactMinigame 
                onSelect={choose} 
                language={language}
                showSleepOption={activeMinigame.options?.showSleepOption as boolean}
                sleepOptionNext={activeMinigame.options?.sleepOptionNext as string}
                disabledContacts={activeMinigame.options?.disabledContacts as string[]}
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
            key={`${activeCutScene.src}:${activeCutScene.loop ? "loop" : "once"}`}
            src={activeCutScene.src}
            loop={activeCutScene.loop}
            narrate={activeCutScene.narrate}
            showSpeedControl={activeCutScene.showSpeedControl}
            language={language}
            continueHint={labels.clickToContinue}
            speedLabels={{
              slow: labels.slowPlayback,
              normal: labels.normalPlayback,
              fast: labels.fastPlayback,
              faster: labels.fasterPlayback,
            }}
            textSpeed={textSpeed}
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
              slowPlayback: labels.slowPlayback,
              normalPlayback: labels.normalPlayback,
              fastPlayback: labels.fastPlayback,
              fasterPlayback: labels.fasterPlayback,
              previousScene: labels.previousScene,
              nextScene: labels.nextScene,
              continueStory: labels.continueStory,
              lockedScene: labels.lockedScene,
            }}
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
        <ConfigOverlay
          bgVolume={bgVolume}
          bgVolumeLabel={labels.volumeBgm}
          textSpeed={textSpeed}
          textSpeedLabel={resolveText(uiText.textSpeed, language)}
          configLabel={labels.config}
          language={language}
          languageLabel={labels.language}
          languageOptions={languageOptions}
          onLanguageChange={setLanguage}
          onBgVolumeChange={handleBgVolumeChange}
          onTextSpeedChange={setTextSpeed}
          onClose={() => setShowConfig(false)}
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
