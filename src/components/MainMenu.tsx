import { languageOptions, uiText, type LanguageCode } from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import mainMenuBg from "@/background/main-menu.png";
import rainCityMusic from "@/music/rain-city.mp3";
import nropLogo from "@/assets/logo-nrop.png";
import { BackgroundMusic } from "@/lib/runtime/backgroundMusic";
import { MainMenuSettingsOverlay } from "@/components/MainMenuSettingsOverlay";
import { SaveSlotOverlay } from "@/components/SaveSlotOverlay";
import { GalleryOverlay } from "@/components/GalleryOverlay";
import type { AnimationFrameRate, GraphicsQuality } from "@/lib/runtime/graphicsSettings";
import type { SaveSlot } from "@/lib/runtime/saveSlots";
import type { FlagMap } from "@/types/novel";

type MainMenuProps = {
  bgVolume: number;
  labels: {
    close: string;
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
  onOpenGalleryScene: (label: string) => void;
  onLoad: (slot: SaveSlot) => void;
  slots: (SaveSlot | null)[];
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
  onOpenGalleryScene,
  onLoad,
  slots,
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
    return () => {
      bgMusicRef.current?.dispose();
    };
  }, [bgVolume]);

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

  const handleLoadSlot = (index: number) => {
    const slot = slots[index];
    if (!slot) return;
    setExiting(true);
    window.setTimeout(() => onLoad(slot), 640);
  };

  const handleExit = () => {
    void getCurrentWindow().close();
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
        </header>

        <hr className="vn-menu-rule" />

        <nav className="vn-menu-nav">
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

      <footer className="vn-menu-footer">© 2026 &nbsp;·&nbsp; NVN Tools</footer>
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
        v0.6.0
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
