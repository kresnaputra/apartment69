import { languageOptions, uiText, type LanguageCode } from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";
import { exitApp } from "@/lib/runtime/appExit";
import mainMenuBg from "@/background/main-menu.png";
import mainMenuSbnUrl from "@/assets/main-menu.sbn?url";
import rainCityMusic from "@/music/rain-city.mp3";
import nropLogo from "@/assets/logo-nrop.png";
import { BackgroundMusic } from "@/lib/runtime/backgroundMusic";
import { sharedSoundEffects } from "@/lib/runtime/soundEffects";
import { MainMenuSettingsOverlay } from "@/components/MainMenuSettingsOverlay";
import { SaveSlotOverlay } from "@/components/SaveSlotOverlay";
import { GalleryOverlay } from "@/components/GalleryOverlay";
import type { AnimationFrameRate, GraphicsQuality } from "@/lib/runtime/graphicsSettings";
import { CanvasSbnRenderer } from "@/lib/rendering/canvasSbnRenderer";
import { fitCameraToScene } from "@/lib/sbn/sampling";
import { loadSbnBundle } from "@/lib/sbn/loadSbnBundle";
import type { SaveSlot } from "@/lib/runtime/saveSlots";
import type { FlagMap } from "@/types/novel";
import type { LoadedSbnBundle, SceneBounds } from "@/types/sbn";

const MENU_SBN_VIEWPORT = { width: 720, height: 980 };
let mainMenuBundlePromise: Promise<LoadedSbnBundle> | null = null;

const getMainMenuBundle = async () => {
  if (!mainMenuBundlePromise) {
    mainMenuBundlePromise = (async () => {
      const response = await fetch(mainMenuSbnUrl);
      if (!response.ok) {
        throw new Error(`Gagal memuat bundle main menu: ${mainMenuSbnUrl}`);
      }

      const source = await response.blob();
      return loadSbnBundle(source, "main-menu.sbn");
    })().catch((error) => {
      mainMenuBundlePromise = null;
      throw error;
    });
  }

  return mainMenuBundlePromise;
};

const MainMenuFigure = ({ graphicsQuality }: { graphicsQuality: GraphicsQuality }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<CanvasSbnRenderer | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bundleRef = useRef<LoadedSbnBundle | null>(null);
  const cameraRef = useRef<SceneBounds | null>(null);
  const frameRef = useRef(0);
  const rafRef = useRef(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    rendererRef.current = new CanvasSbnRenderer();
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
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
    let cancelled = false;

    const load = async () => {
      const bundle = await getMainMenuBundle();
      if (cancelled) return;

      const renderer = rendererRef.current;
      const container = containerRef.current;
      if (renderer) {
        await renderer.preloadProject(bundle.project);
      }

      if (cancelled) return;

      const rect = container?.getBoundingClientRect();
      const viewportWidth = rect && rect.width > 0 ? rect.width : MENU_SBN_VIEWPORT.width;
      const viewportHeight = rect && rect.height > 0 ? rect.height : MENU_SBN_VIEWPORT.height;

      if (renderer && rect && rect.width > 0 && rect.height > 0) {
        renderer.resize(rect.width, rect.height, 1, true, graphicsQuality);
      }

      bundleRef.current = bundle;
      cameraRef.current = fitCameraToScene(
        bundle.project,
        viewportWidth,
        viewportHeight,
      );
      setIsReady(true);
    };

    void load().catch(() => {
      if (!cancelled) {
        setIsReady(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const renderer = rendererRef.current;
    if (!container || !renderer) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      renderer.resize(rect.width, rect.height, 1, true, graphicsQuality);

      const bundle = bundleRef.current;
      if (!bundle) return;
      cameraRef.current = fitCameraToScene(bundle.project, rect.width, rect.height);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    window.addEventListener("resize", resize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [graphicsQuality]);

  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const renderer = rendererRef.current;
      const bundle = bundleRef.current;
      const camera = cameraRef.current;
      const container = containerRef.current;

      if (renderer && bundle && camera && container) {
        const rect = container.getBoundingClientRect();
        const deltaMs = Math.max(0, Math.min(time - lastTime, 100));
        const fps = Math.max(1, bundle.project.fps ?? 24);
        const duration = Math.max(1, bundle.project.duration);
        frameRef.current = (frameRef.current + (fps * deltaMs) / 1000) % duration;

        renderer.render({
          project: bundle.project,
          frame: frameRef.current,
          scale: 1,
          camera,
          viewportWidth: rect.width,
          viewportHeight: rect.height,
        });
      }

      lastTime = time;
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-30%",
        bottom: "-13%",
        width: "160%",
        height: "160%",
        zIndex: 1,
        pointerEvents: "none",
        opacity: isReady ? 1 : 0,
        transition: "opacity 420ms ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "10% 4% 4%",
          background: "radial-gradient(circle at 50% 35%, rgba(255, 214, 173, 0.16), rgba(255, 214, 173, 0.02) 42%, rgba(0, 0, 0, 0) 72%)",
          filter: "blur(20px)",
          opacity: 0.9,
        }}
      />
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
      </div>
    </div>
  );
};

type MainMenuProps = {
  bgVolume: number;
  labels: {
    close: string;
    continueStory: string;
    exit: string;
    frameRate: string;
    gallery: string;
    galleryEmpty: string;
    galleryTitle: string;
    graphicsQuality: string;
    lockedScene: string;
    load: string;
    loading: string;
    mainMenuSettings: string;
    language: string;
    settings: string;
    slot: string;
    start: string;
    subtitle: string;
    textSpeed: string;
    volumeBgm: string;
  };
  frameRate: AnimationFrameRate;
  frameRateOptions: Array<{ value: AnimationFrameRate; label: string }>;
  graphicsQuality: GraphicsQuality;
  graphicsQualityOptions: Array<{ value: GraphicsQuality; label: string }>;
  language: LanguageCode;
  textSpeed: number;
  onFrameRateChange: (frameRate: AnimationFrameRate) => void;
  onGraphicsQualityChange: (quality: GraphicsQuality) => void;
  onLanguageChange: (language: LanguageCode) => void;
  onBgVolumeChange: (value: number) => void;
  onTextSpeedChange: (value: number) => void;
  onStart: () => void;
  onContinue: () => void;
  onOpenGalleryScene: (label: string) => void;
  onLoad: (slot: SaveSlot) => void;
  slots: (SaveSlot | null)[];
  autoSaveSlot: SaveSlot | null;
  isReady: boolean;
  flags: FlagMap;
  autoOpenGallery?: boolean;
  onAutoOpenGalleryConsumed?: () => void;
};

export const MainMenu = ({
  bgVolume,
  labels,
  frameRate,
  frameRateOptions,
  graphicsQuality,
  graphicsQualityOptions,
  language,
  textSpeed,
  onFrameRateChange,
  onGraphicsQualityChange,
  onLanguageChange,
  onBgVolumeChange,
  onTextSpeedChange,
  onStart,
  onContinue,
  onOpenGalleryScene,
  onLoad,
  slots,
  autoSaveSlot,
  isReady,
  flags,
  autoOpenGallery = false,
  onAutoOpenGalleryConsumed,
}: MainMenuProps) => {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [showLoadSlots, setShowLoadSlots] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const bgMusicRef = useRef<BackgroundMusic | null>(null);

  useEffect(() => {
    bgMusicRef.current = new BackgroundMusic();
    bgMusicRef.current.play(rainCityMusic, bgVolume);

    let unlocked = false;
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
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
      bgMusicRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    bgMusicRef.current?.setVolume(bgVolume);
  }, [bgVolume]);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!autoOpenGallery) return;
    setShowGallery(true);
    onAutoOpenGalleryConsumed?.();
  }, [autoOpenGallery, onAutoOpenGalleryConsumed]);

  const handleStart = () => {
    if (!isReady) return;
    setExiting(true);
    window.setTimeout(() => onStart(), 640);
  };

  const handleContinue = () => {
    if (!autoSaveSlot) return;
    setExiting(true);
    window.setTimeout(() => onContinue(), 640);
  };

  const handleLoadSlot = (index: number) => {
    const slot = slots[index];
    if (!slot) return;
    setExiting(true);
    window.setTimeout(() => onLoad(slot), 640);
  };

  const handleExit = () => {
    void exitApp();
  };

  return (
    <div
      className={`vn-menu-root ${visible ? "vn-menu-visible" : ""} ${exiting ? "vn-menu-exiting" : ""}`}
    >
      <div
        className="vn-menu-bg"
        style={{ backgroundImage: `url(${mainMenuBg})` }}
      />
      <div className="vn-menu-overlay" />
      <MainMenuFigure graphicsQuality={graphicsQuality} />
      <img
        src={nropLogo}
        alt="NROP"
        style={{
          position: "absolute",
          top: "1.5rem",
          left: "2rem",
          width: "clamp(5rem, 8vw, 8rem)",
          opacity: 0.55,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div className="vn-menu-layout">
        <header className="vn-menu-header">
          <h1 className="vn-menu-title">
            <span className="vn-menu-title-main">APARTMENTS</span>
            <span className="vn-menu-title-num">69</span>
          </h1>
          <p className="vn-menu-subtitle">{labels.subtitle}</p>
          <span className="vn-menu-badge">Early Access</span>
        </header>

        <hr className="vn-menu-rule" />

        <nav className="vn-menu-nav">
          <button
            type="button"
            disabled={!autoSaveSlot}
            className="vn-menu-btn"
            onClick={handleContinue}
          >
            {labels.continueStory}
          </button>
          <button
            type="button"
            disabled={!isReady}
            className="vn-menu-btn vn-menu-btn-primary"
            onClick={handleStart}
          >
            {!isReady ? (
              <span className="vn-menu-btn-loading">
                {labels.loading}
                <span className="vn-menu-dots" />
              </span>
            ) : (
              labels.start
            )}
          </button>
          <button
            type="button"
            className="vn-menu-btn"
            onClick={() => setShowLoadSlots(true)}
          >
            {labels.load}
          </button>
          <button
            type="button"
            className="vn-menu-btn"
            onClick={() => setShowGallery(true)}
          >
            {labels.gallery}
          </button>
          <button
            type="button"
            className="vn-menu-btn"
            onClick={() => setShowSettings(true)}
          >
            {labels.settings}
          </button>
          <button type="button" className="vn-menu-btn" onClick={handleExit}>
            {labels.exit}
          </button>
        </nav>
      </div>

      <footer className="vn-menu-footer">
        © 2026 &nbsp;·&nbsp; NVN Tools &nbsp;·&nbsp; Please Do Not Redistribute
      </footer>
      <span
        style={{
          position: "absolute",
          bottom: "1.75rem",
          right: "2rem",
          fontSize: "0.65rem",
          letterSpacing: "0.14em",
          color: "rgba(255, 255, 255, 0.2)",
          fontFamily: '"Crimson Text", Georgia, serif',
          textTransform: "uppercase",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        v0.7.1
      </span>

      {showLoadSlots && (
        <SaveSlotOverlay
          emptyLabel={uiText.emptySlot}
          language={language}
          mode="load"
          modeLabel={labels.load}
          slotLabel={labels.slot}
          slots={slots}
          unknownSceneLabel={uiText.unknownScene}
          onSelect={handleLoadSlot}
          onClose={() => setShowLoadSlots(false)}
        />
      )}

      {showGallery && (
        <GalleryOverlay
          closeLabel={labels.close}
          emptyLabel={labels.galleryEmpty}
          flags={flags}
          lockedLabel={labels.lockedScene}
          onClose={() => setShowGallery(false)}
          onOpenScene={onOpenGalleryScene}
          title={labels.galleryTitle}
        />
      )}

      {showSettings && (
        <MainMenuSettingsOverlay
          bgVolume={bgVolume}
          bgVolumeLabel={labels.volumeBgm}
          closeLabel={labels.close}
          frameRate={frameRate}
          frameRateLabel={labels.frameRate}
          frameRateOptions={frameRateOptions}
          graphicsQuality={graphicsQuality}
          graphicsQualityLabel={labels.graphicsQuality}
          graphicsQualityOptions={graphicsQualityOptions}
          language={language}
          languageLabel={labels.language}
          languageOptions={languageOptions}
          textSpeed={textSpeed}
          textSpeedLabel={labels.textSpeed}
          onFrameRateChange={onFrameRateChange}
          onGraphicsQualityChange={onGraphicsQualityChange}
          onLanguageChange={onLanguageChange}
          onBgVolumeChange={onBgVolumeChange}
          onTextSpeedChange={onTextSpeedChange}
          onClose={() => setShowSettings(false)}
          title={labels.mainMenuSettings}
        />
      )}
    </div>
  );
};
