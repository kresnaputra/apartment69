import { languageOptions, uiText, type LanguageCode } from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import mainMenuBg from "@/background/main-menu.png";
import rainCityMusic from "@/music/rain-city.mp3";
import { BackgroundMusic } from "@/lib/runtime/backgroundMusic";
import { MainMenuSettingsOverlay } from "@/components/MainMenuSettingsOverlay";
import { SaveSlotOverlay } from "@/components/SaveSlotOverlay";
import { GalleryOverlay } from "@/components/GalleryOverlay";
import type { SaveSlot } from "@/lib/runtime/saveSlots";

type MainMenuProps = {
  bgVolume: number;
  labels: {
    close: string;
    exit: string;
    gallery: string;
    galleryEmpty: string;
    galleryTitle: string;
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
  language: LanguageCode;
  textSpeed: number;
  onLanguageChange: (language: LanguageCode) => void;
  onBgVolumeChange: (value: number) => void;
  onTextSpeedChange: (value: number) => void;
  onStart: () => void;
  onLoad: (slot: SaveSlot) => void;
  slots: (SaveSlot | null)[];
  isReady: boolean;
};

export const MainMenu = ({
  bgVolume,
  labels,
  language,
  textSpeed,
  onLanguageChange,
  onBgVolumeChange,
  onTextSpeedChange,
  onStart,
  onLoad,
  slots,
  isReady,
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
    <div className={`vn-menu-root ${visible ? "vn-menu-visible" : ""} ${exiting ? "vn-menu-exiting" : ""}`}>
      <div className="vn-menu-bg" style={{ backgroundImage: `url(${mainMenuBg})` }} />
      <div className="vn-menu-overlay" />

      <div className="vn-menu-layout">
        <header className="vn-menu-header">
          <h1 className="vn-menu-title">
            <span className="vn-menu-title-main">APARTMENTS</span>
            <span className="vn-menu-title-num">69</span>
          </h1>
          <p className="vn-menu-subtitle">{labels.subtitle}</p>
        </header>

        <nav className="vn-menu-nav">
          {/* Start */}
          <button
            type="button"
            disabled={!isReady}
            className="vn-menu-btn vn-menu-btn-primary"
            onClick={handleStart}
          >
            {!isReady ? (
              <span className="vn-menu-btn-loading">{labels.loading}<span className="vn-menu-dots" /></span>
            ) : (
              labels.start
            )}
          </button>

          {/* Load */}
          <button
            type="button"
            className="vn-menu-btn vn-menu-btn-secondary"
            onClick={() => setShowLoadSlots(true)}
          >
            {labels.load}
          </button>

          {/* Gallery */}
          <button type="button" className="vn-menu-btn vn-menu-btn-secondary" onClick={() => setShowGallery(true)}>
            {labels.gallery}
          </button>

          {/* Setting */}
          <button type="button" className="vn-menu-btn vn-menu-btn-secondary" onClick={() => setShowSettings(true)}>
            {labels.settings}
          </button>

          {/* Exit */}
          <button type="button" className="vn-menu-btn vn-menu-btn-secondary" onClick={handleExit}>
            {labels.exit}
          </button>
        </nav>

        <footer className="vn-menu-footer">
          <span>© 2026 &nbsp;·&nbsp; Nrop Guy</span>
        </footer>
      </div>

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
          onClose={() => setShowGallery(false)}
          title={labels.galleryTitle}
        />
      )}

      {showSettings && (
        <MainMenuSettingsOverlay
          bgVolume={bgVolume}
          bgVolumeLabel={labels.volumeBgm}
          closeLabel={labels.close}
          language={language}
          languageLabel={labels.language}
          languageOptions={languageOptions}
          textSpeed={textSpeed}
          textSpeedLabel={labels.textSpeed}
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
