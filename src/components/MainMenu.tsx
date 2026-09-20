import { languageOptions, uiText, type LanguageCode } from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";
import { exitApp } from "@/lib/runtime/appExit";
import mainMenuBg from "@/background/main-menu.png";
import mainMenuSbnUrl from "@/assets/leaf.sbn?url";
import rainCityMusic from "@/music/rain-city.mp3";
import nropLogo from "@/assets/logo-nrop.png";
import { BackgroundMusic } from "@/lib/runtime/backgroundMusic";
import { sharedSoundEffects } from "@/lib/runtime/soundEffects";
import { MainMenuSettingsOverlay } from "@/components/MainMenuSettingsOverlay";
import { SaveSlotOverlay } from "@/components/SaveSlotOverlay";
import { GalleryOverlay } from "@/components/GalleryOverlay";
import { ExitConfirmationOverlay } from "@/components/ExitConfirmationOverlay";
import { createAnimationFrameGate, type AnimationFrameRate, type GraphicsQuality } from "@/lib/runtime/graphicsSettings";
import { CanvasSbnRenderer } from "@/lib/rendering/canvasSbnRenderer";
import { fitCameraToScene } from "@/lib/sbn/sampling";
import { loadSbnBundle } from "@/lib/sbn/loadSbnBundle";
import type { SaveSlot } from "@/lib/runtime/saveSlots";
import type { FlagMap } from "@/types/novel";
import type { LoadedSbnBundle, SceneBounds } from "@/types/sbn";

let mainMenuBundlePromise: Promise<LoadedSbnBundle> | null = null;

const getMainMenuBundle = async () => {
  if (!mainMenuBundlePromise) {
    mainMenuBundlePromise = (async () => {
      const response = await fetch(mainMenuSbnUrl);
      if (!response.ok) {
        throw new Error(`Gagal memuat bundle main menu: ${mainMenuSbnUrl}`);
      }

      const source = await response.blob();
      return loadSbnBundle(source, "leaf.sbn");
    })().catch((error) => {
      mainMenuBundlePromise = null;
      throw error;
    });
  }

  return mainMenuBundlePromise;
};

const MainMenuLeaf = ({ graphicsQuality, frameRate }: {
  graphicsQuality: GraphicsQuality;
  frameRate: AnimationFrameRate;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const renderer = new CanvasSbnRenderer();
    renderer.attach(canvas);
    let cancelled = false;
    let animationFrame = 0;
    let bundle: LoadedSbnBundle | null = null;
    let camera: SceneBounds | null = null;
    let width = 0;
    let height = 0;
    let lastTime = performance.now();
    const shouldRender = createAnimationFrameGate();

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (!bundle || width <= 0 || height <= 0) return;
      const usesCroppedImages = bundle.project.attachments.some(
        (attachment) => attachment.imageIsCropped && attachment.opaqueBounds,
      );
      renderer.resize(width, height, 1, usesCroppedImages, graphicsQuality);
      const bounds = fitCameraToScene(bundle.project, width, height);
      const zoom = Math.min(
        width / (bounds.maxX - bounds.minX),
        height / (bounds.maxY - bounds.minY),
      );
      const minX = bounds.maxX - width / zoom;
      const minY = bounds.maxY - height / zoom;
      camera = {
        ...bounds,
        minX,
        minY,
        centerX: (minX + bounds.maxX) / 2,
        centerY: (minY + bounds.maxY) / 2,
        zoom,
      };
    };

    const loop = (time: number) => {
      animationFrame = requestAnimationFrame(loop);
      if (document.hidden || !bundle || !camera || width <= 0 || height <= 0) {
        lastTime = time;
        return;
      }
      if (!shouldRender(time, frameRate)) return;
      const deltaMs = Math.max(0, Math.min(time - lastTime, 100));
      lastTime = time;
      const fps = Math.max(1, bundle.project.fps ?? 24);
      const duration = Math.max(1, bundle.project.duration);
      frameRef.current = (frameRef.current + fps * deltaMs / 1000) % duration;
      renderer.render({
        project: bundle.project,
        frame: frameRef.current,
        scale: 1,
        camera,
        viewportWidth: width,
        viewportHeight: height,
      });
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    const load = async () => {
      const loaded = await getMainMenuBundle();
      if (cancelled) return;
      await renderer.preloadProject(loaded.project);
      if (cancelled) return;
      bundle = loaded;
      resize();
      lastTime = performance.now();
      animationFrame = requestAnimationFrame(loop);
    };
    void load().catch((error) => {
      if (!cancelled) console.error("Gagal memuat animasi daun:", error);
    });

    return () => {
      cancelled = true;
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
      renderer.dispose();
    };
  }, [graphicsQuality, frameRate]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        right: -250,
        bottom: -60,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};

type MainMenuProps = {
  bgVolume: number;
  labels: {
    cancel: string;
    close: string;
    continueStory: string;
    exit: string;
    exitAppConfirmation: string;
    exitWarning: string;
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
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
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
    setShowExitConfirmation(true);
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
      <MainMenuLeaf graphicsQuality={graphicsQuality} frameRate={frameRate} />
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

      {showExitConfirmation && (
        <ExitConfirmationOverlay
          cancelLabel={labels.cancel}
          confirmLabel={labels.exit}
          message={labels.exitAppConfirmation}
          title={labels.exitWarning}
          onCancel={() => setShowExitConfirmation(false)}
          onConfirm={() => void exitApp()}
        />
      )}
    </div>
  );
};
