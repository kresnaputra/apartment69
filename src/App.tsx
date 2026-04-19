import { type CSSProperties, memo, useCallback, useDeferredValue, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ElevatorButtonMinigame } from "@/components/minigames/ElevatorButtonMinigame";
import { PipeConnectionMinigame } from "@/components/minigames/PipeConnectionMinigame";
import { ElevatorButtonMinigameMobile } from "@/components/minigames/ElevatorButtonMinigameMobile";
import { PipeConnectionMinigameMobile } from "@/components/minigames/PipeConnectionMinigameMobile";
import { SmartphoneContactMinigame } from "@/components/minigames/SmartphoneContactMinigame";
import { SmartphoneContactMinigameMobile } from "@/components/minigames/SmartphoneContactMinigameMobile";
import { LaptopCleanupMinigame } from "@/components/minigames/LaptopCleanupMinigame";
import { EmailComposeMinigame } from "@/components/minigames/EmailComposeMinigame";
import { CanvasSpritesheetRenderer } from "@/lib/rendering/canvasSpritesheetRenderer";
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
import { useIsMobile } from "@/hooks/useIsMobile";
import { characterBundleRegistry } from "@/character";
import type { SmartphoneContactOverrides } from "@/components/minigames/smartphoneContacts";
import { loadSpritesheetBundle } from "@/lib/rendering/loadSpritesheetBundle";
import { NovelAudioEngine } from "@/lib/runtime/audioEngine";
import { BackgroundMusic } from "@/lib/runtime/backgroundMusic";
import { useNovelStore } from "@/store/novelStore";
import { unknownSpeakerIds } from "@/types/novel";
import type { CharacterInstance } from "@/types/novel";
import type { LoadedSpritesheetBundle } from "@/types/spritesheet";
import gameplayMusic from "@/music/gameplay.mp3";

const TEXT_SPEED = 18;
const CUTSCENE_FADE_MS = 600;
const CHARACTER_TICK_FPS = 40;
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
  bundle: LoadedSpritesheetBundle;
  character: CharacterInstance;
  isDimmed: boolean;
};

const CharacterSprite = memo(({ bundle, character, isDimmed }: CharacterSpriteProps) => {
  const rendererRef = useRef<CanvasSpritesheetRenderer | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frame = useDeferredValue(character.frame);
  const [displayOpacity, setDisplayOpacity] = useState(character.opacity);
  const [viewport, setViewport] = useState({ width: 520, height: 880 });
  const [windowSize, setWindowSize] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 1280,
    height: typeof window !== "undefined" ? window.innerHeight : 720,
  }));
  const resizeTimeoutRef = useRef<number | null>(null);
  const windowResizeTimeoutRef = useRef<number | null>(null);

  const virtualStageScale = Math.min(
    windowSize.width / VIRTUAL_STAGE_WIDTH,
    windowSize.height / VIRTUAL_STAGE_HEIGHT,
  );
  const clampedStageScale = Math.max(0.56, Math.min(0.92, virtualStageScale));
  const frameAspectRatio = bundle.frameSize.h > 0 ? bundle.frameSize.w / bundle.frameSize.h : 0.6;
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
  const responsiveScale = character.scale;
  const renderResolutionScale = Math.max(1, responsiveScale * clampedStageScale);

  useEffect(() => {
    rendererRef.current = new CanvasSpritesheetRenderer();

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
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const renderer = rendererRef.current;
    if (!canvas || !container || !renderer) return;

    renderer.attach(canvas);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      if (resizeTimeoutRef.current !== null) {
        window.cancelAnimationFrame(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = window.requestAnimationFrame(() => {
        setViewport({
          width: Math.max(1, Math.round(entry.contentRect.width)),
          height: Math.max(1, Math.round(entry.contentRect.height)),
        });
        resizeTimeoutRef.current = null;
      });
    });

    observer.observe(container);
    return () => {
      observer.disconnect();
      if (resizeTimeoutRef.current !== null) {
        window.cancelAnimationFrame(resizeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;

    renderer.resize(viewport.width, viewport.height, renderResolutionScale);
    renderer.render({
      bundle,
      frame,
      viewportWidth: viewport.width,
      viewportHeight: viewport.height,
    });
  }, [bundle, frame, renderResolutionScale, viewport.height, viewport.width]);

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

  if (!character.visible && !character.isExiting) return null;

  const spriteStyle = {
    left: `calc(${character.x * 100}% + ${character.xOffset * 100}%)`,
    bottom: `calc(${character.y}px - ${character.yOffset}px)`,
    opacity: displayOpacity,
    transform: "translateX(-50%) scale(var(--vn-scale))",
    transformOrigin: "bottom center",
    animationDuration: `${character.enterFrom === "fade" ? CHARACTER_FADE_ENTER_DURATION_MS : CHARACTER_ENTER_DURATION_MS}ms`,
    animationName: character.isExiting ? "none" : undefined,
    transition: `left ${character.moveDuration}ms ${character.moveEasing}, bottom ${character.moveDuration}ms ${character.moveEasing}, opacity ${character.hideTransition === "fadeAway" ? CHARACTER_FADE_AWAY_DURATION_MS : 220}ms ease, transform 300ms ease`,
    "--vn-scale": String(responsiveScale),
    width: `${characterWidth}px`,
    height: `${characterHeight}px`,
    maxWidth: "100%",
    visibility: "visible" as const,
  } as CSSProperties;

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

const CutSceneOverlay = ({ src, loop, narrate, showSpeedControl, language, onComplete }: { src: string; loop?: boolean; narrate?: LocalizedText; showSpeedControl?: boolean; language: LanguageCode; onComplete: () => void }) => {
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
    { label: "Slow", value: 0.75 },
    { label: "Normal", value: 1 },
    { label: "Fast", value: 2 },
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
  }, [resolvedNarrate]);

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
    }, TEXT_SPEED);

    return () => window.clearInterval(timer);
  }, [resolvedNarrate]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = currentSpeed;
    }
  }, [currentSpeed]);

  const handleSpeedChange = (speed: number) => {
    setCurrentSpeed(speed);
  };

  const handleExit = useCallback(() => {
    if (completedRef.current) return;
    // Allow exit if video ended OR if loop is enabled
    if (!videoEnded && !loop) return;
    completedRef.current = true;
    setFadingOut(true);
    window.setTimeout(onComplete, CUTSCENE_FADE_MS);
  }, [onComplete, videoEnded, loop]);

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
      onClick={handleExit}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: videoEnded || loop ? "pointer" : "default",
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
      {showSpeedControl && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            bottom: "60px",
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

const App = () => {
  const isMobile = useIsMobile();
  const [phase, setPhase] = useState<"menu" | "story">("menu");
  const [bundlesReady, setBundlesReady] = useState(false);
  const bgMusicRef = useRef<BackgroundMusic | null>(null);

  const bundles = useNovelStore((state) => state.bundles);
  const background = useNovelStore((state) => state.background);
  const parallaxLayers = useNovelStore((state) => state.parallaxLayers);
  const backgroundAnimation = useNovelStore((state) => state.backgroundAnimation);
  const location = useNovelStore((state) => state.location);
  const textPresentation = useNovelStore((state) => state.textPresentation);
  const speaker = useNovelStore((state) => state.speaker);
  const activeCharacterId = useNovelStore((state) => state.activeCharacterId);
  const sceneTransitionDuration = useNovelStore((state) => state.sceneTransitionDuration);
  const sceneTransitionToken = useNovelStore((state) => state.sceneTransitionToken);
  const pendingSceneContinuation = useNovelStore((state) => state.pendingSceneContinuation);
  const activeMinigame = useNovelStore((state) => state.activeMinigame);
  const activeCutScene = useNovelStore((state) => state.activeCutScene);
  const activeVoice = useNovelStore((state) => state.activeVoice);
  const line = useNovelStore((state) => state.line);
  const lineSize = useNovelStore((state) => state.lineSize);
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
  const [language, setLanguage] = useState<LanguageCode>(() => {
    if (typeof window === "undefined") return DEFAULT_LANGUAGE;
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return saved && languageOptions.some((option) => option.code === saved)
      ? saved as LanguageCode
      : DEFAULT_LANGUAGE;
  });
  const [bgVolume, setBgVolume] = useState(0.4);
  const [saveToast, setSaveToast] = useState(false);
  const [slots, setSlots] = useState<(SaveSlot | null)[]>(readAllSlots);
  const audioRef = useRef<NovelAudioEngine | null>(null);
  const voiceRef = useRef<HTMLAudioElement | null>(null);
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
    emptySlot: resolveText(uiText.emptySlot, language),
    exit: resolveText(uiText.exit, language),
    gallery: resolveText(uiText.gallery, language),
    language: resolveText(uiText.language, language),
    load: resolveText(uiText.load, language),
    loading: resolveText(uiText.loading, language),
    log: resolveText(uiText.log, language),
    mainMenuSettings: resolveText(uiText.mainMenuSettings, language),
    noConversation: resolveText(uiText.noConversation, language),
    save: resolveText(uiText.save, language),
    saved: resolveText(uiText.saved, language),
    settings: resolveText(uiText.settings, language),
    skip: resolveText(uiText.skip, language),
    slot: resolveText(uiText.slot, language),
    start: resolveText(uiText.start, language),
    subtitle: resolveText(uiText.titleSubtitle, language),
    tapToContinue: resolveText(uiText.tapToContinue, language),
    tapToSkip: resolveText(uiText.tapToSkip, language),
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
    let cancelled = false;

    const load = async () => {
      try {
        setStatusMessage(uiText.bundlesLoading);
        const bundleEntries = Object.entries(characterBundleRegistry);

        const loadedBundles = await Promise.all(
          bundleEntries.map(async ([bundleId, bundlePath]) => {
            const bundle = await loadSpritesheetBundle(bundleId, bundlePath);
            return [bundleId, bundle] as const;
          }),
        );

        if (cancelled) return;

        for (const [bundleId, bundle] of loadedBundles) {
          registerBundle(bundleId, bundle);
        }

        setBundlesReady(true);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Gagal memuat visual novel.";
        setStatusMessage(message);
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [registerBundle, setStatusMessage]);

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
    }, TEXT_SPEED);

    return () => window.clearInterval(timer);
  }, [resolvedLine]);

  // Auto-advance: when enabled, advance to the next line 1.5s after text finishes typing.
  useEffect(() => {
    if (!isAuto || isTyping || choices.length > 0 || isSceneTransitioning || isEnded) return;
    const timer = window.setTimeout(() => { advance(); }, 1500);
    return () => window.clearTimeout(timer);
  }, [isAuto, isTyping, choices.length, isSceneTransitioning, isEnded, advance, resolvedLine]);

  useEffect(() => {
    let animationFrame = 0;
    let lastTick = performance.now();

    const loop = (time: number) => {
      if (time - lastTick >= 1000 / CHARACTER_TICK_FPS) {
        tickCharacters();
        lastTick = time;
      }

      animationFrame = window.requestAnimationFrame(loop);
    };

    animationFrame = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [tickCharacters]);

  useEffect(() => {
    const handleAdvance = () => {
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
  }, [activeMinigame, advance, choices.length, isEnded, isSceneTransitioning, isTyping, resolvedLine.length]);

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
      {phase === "menu" && (
        isMobile
          ? <MainMenuMobile bgVolume={bgVolume} labels={labels} language={language} onLanguageChange={setLanguage} onBgVolumeChange={handleBgVolumeChange} onStart={handleStartStory} onLoad={handleLoadFromMenu} slots={slots} isReady={bundlesReady} />
          : <MainMenu bgVolume={bgVolume} labels={labels} language={language} onLanguageChange={setLanguage} onBgVolumeChange={handleBgVolumeChange} onStart={handleStartStory} onLoad={handleLoadFromMenu} slots={slots} isReady={bundlesReady} />
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
              const isUnknownSpeaker =
                activeCharacterId !== null &&
                unknownSpeakerIds.includes(activeCharacterId as (typeof unknownSpeakerIds)[number]);
              const isDimmed = isNarration
                ? true
                : isUnknownSpeaker
                  ? character.characterId === "arka"
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

        {activeMinigame ? null : isCenteredText ? (
          <div className={`vn-centered-text-shell ${isSceneTransitioning ? "vn-dialogue-hidden" : ""}`}>
            <div className="vn-centered-text-box">
              <div className={`vn-centered-text-line vn-centered-text-line-${lineSize}`}>{visibleLine}</div>
              <div className="vn-centered-text-hint">
                {isTyping ? labels.clickToFinish : labels.clickToContinue}
              </div>
            </div>
          </div>
        ) : isNarration ? (
          isMobile ? (
            <NarratorMobile
              continueHint={labels.tapToContinue}
              finishHint={labels.tapToSkip}
              visibleLine={visibleLine}
              isTyping={isTyping}
              isSceneTransitioning={isSceneTransitioning}
            />
          ) : (
            <div className={`vn-narrator-shell ${isSceneTransitioning ? "vn-dialogue-hidden" : ""}`}>
              <div className="vn-narrator-box">
                <div className="vn-narrator-line">{visibleLine}</div>
                <div className="vn-narrator-hint">{isTyping ? labels.clickToFinish : labels.clickToContinue}</div>
              </div>
            </div>
          )
        ) : (
          isMobile ? (
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
              onChoose={choose}
              onSuppressAdvance={() => { suppressAdvanceOnceRef.current = true; }}
              isAuto={isAuto}
              onAuto={handleAuto}
              onSkip={handleSkip}
              onLog={() => setShowLog(true)}
              onSave={() => setShowSaveSlots(true)}
              onConfig={() => setShowConfig(true)}
              onExit={() => { clearScene(); setPhase("menu"); }}
            />
          ) : (
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
                          suppressAdvanceOnceRef.current = true;
                          choose(choice.next);
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
                        { label: labels.log, onClick: () => setShowLog(true) },
                        { label: labels.auto, onClick: handleAuto, active: isAuto },
                        { label: labels.skip, onClick: handleSkip },
                        { label: labels.save, onClick: () => setShowSaveSlots(true) },
                        { label: labels.config, onClick: () => setShowConfig(true) },
                        { label: labels.exit, onClick: () => { clearScene(); setPhase("menu"); } },
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
          )
        )}

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
            onComplete={completeCutScene}
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
          configLabel={labels.config}
          language={language}
          languageLabel={labels.language}
          languageOptions={languageOptions}
          onLanguageChange={setLanguage}
          onBgVolumeChange={handleBgVolumeChange}
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
