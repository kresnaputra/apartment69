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

type MainMenuMobileProps = {
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

export const MainMenuMobile = ({
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
}: MainMenuMobileProps) => {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [showLoadSlots, setShowLoadSlots] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const bgMusicRef = useRef<BackgroundMusic | null>(null);

  useEffect(() => {
    bgMusicRef.current = new BackgroundMusic();
    bgMusicRef.current.play(rainCityMusic, bgVolume);

    // Android WebView blocks audio until a user gesture. Retry on first touch/click.
    let unlocked = false;
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      bgMusicRef.current?.resumeAfterUnlock();
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

  const btnBase = "w-full rounded-full backdrop-blur-sm tracking-[0.03em] py-2.5 px-6 transition-all duration-200 border";
  const btnActive = `${btnBase} bg-[rgba(12,14,20,0.68)] text-white/90 border-white/25 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer`;
  const btnDisabled = `${btnBase} bg-[rgba(12,14,20,0.68)] text-white/90 border-white/25 opacity-55 cursor-default`;
  const fontStyle = { fontFamily: '"Crimson Text", Georgia, serif', fontSize: "clamp(0.95rem, 2vw, 1.1rem)" };

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden transition-opacity duration-[640ms] ease-in-out"
      style={{ opacity: visible && !exiting ? 1 : 0, pointerEvents: exiting ? "none" : "auto" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${mainMenuBg})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-[rgba(10,14,22,0.52)]" />

      {/* Content — landscape: title left, buttons right */}
      <div className="relative z-10 flex h-full w-full items-center justify-between px-[8vw]">

        {/* Left: title block */}
        <div className="flex flex-col items-start gap-1">
          <h1 className="m-0 flex items-baseline gap-[0.06em] leading-none" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.45)" }}>
            <span
              className="text-white uppercase tracking-[0.02em]"
              style={{ fontFamily: '"New Amsterdam", sans-serif', fontSize: "clamp(2.6rem, 7vw, 5rem)", fontWeight: 400 }}
            >
              APARTMENTS
            </span>
            <span
              className="text-white"
              style={{ fontFamily: '"Mr De Haviland", cursive', fontSize: "clamp(3.4rem, 9vw, 6.5rem)", fontWeight: 400, lineHeight: 0.85 }}
            >
              69
            </span>
          </h1>
          <p
            className="m-0 text-white/88 tracking-[0.1em]"
            style={{ fontFamily: '"Mr De Haviland", cursive', fontSize: "clamp(1.4rem, 3.5vw, 2.6rem)" }}
          >
            {labels.subtitle}
          </p>
        </div>

        {/* Right: buttons */}
        <div className="flex flex-col items-center gap-2.5 w-[clamp(160px,28vw,260px)]">
          {/* Start — primary */}
          <button
            type="button"
            disabled={!isReady}
            onClick={handleStart}
            className="w-full rounded-full bg-white text-[#1a1a1a] font-semibold tracking-[0.03em] py-3 px-6 transition-all duration-200 disabled:opacity-55 enabled:hover:-translate-y-0.5 enabled:hover:shadow-[0_6px_24px_rgba(255,255,255,0.18)] enabled:active:translate-y-0 cursor-pointer disabled:cursor-default"
            style={fontStyle}
          >
            {!isReady ? (
              <span className="inline-flex items-center gap-1">
                {labels.loading}
                <span className="inline-block overflow-hidden align-bottom w-[1.2em]" style={{ animation: "vn-menu-ellipsis 1.4s steps(4,end) infinite" }}>...</span>
              </span>
            ) : (
              labels.start
            )}
          </button>

          {/* Load */}
          <button
            type="button"
            onClick={() => setShowLoadSlots(true)}
            className={btnActive}
            style={fontStyle}
          >
            {labels.load}
          </button>

          {/* Gallery */}
          <button type="button" onClick={() => setShowGallery(true)} className={btnActive} style={fontStyle}>
            {labels.gallery}
          </button>

          {/* Setting */}
          <button type="button" onClick={() => setShowSettings(true)} className={btnActive} style={fontStyle}>
            {labels.settings}
          </button>

          {/* Exit */}
          <button type="button" onClick={handleExit} className={btnActive} style={fontStyle}>
            {labels.exit}
          </button>
        </div>
      </div>

      {/* Footer */}
      <span
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/36 tracking-[0.1em] whitespace-nowrap"
        style={{ fontFamily: '"Crimson Text", Georgia, serif', fontSize: "0.65rem" }}
      >
        © 2026 &nbsp;·&nbsp; Nrop Guy
      </span>

      {/* Load slot picker */}
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
