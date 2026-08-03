import { languageOptions, uiText, type LanguageCode } from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";
import { exitApp } from "@/lib/runtime/appExit";
import mainMenuBg from "@/background/main-menu.png";
import rainCityMusic from "@/music/rain-city.mp3";
import { BackgroundMusic } from "@/lib/runtime/backgroundMusic";
import { sharedSoundEffects } from "@/lib/runtime/soundEffects";
import { MainMenuSettingsOverlay } from "@/components/MainMenuSettingsOverlay";
import { SaveSlotOverlay } from "@/components/SaveSlotOverlay";
import { GalleryOverlay } from "@/components/GalleryOverlay";
import type { AnimationFrameRate, GraphicsQuality } from "@/lib/runtime/graphicsSettings";
import type { SaveSlot } from "@/lib/runtime/saveSlots";
import type { FlagMap } from "@/types/novel";

type MainMenuMobileProps = {
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

export const MainMenuMobile = ({
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
}: MainMenuMobileProps) => {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [showLoadSlots, setShowLoadSlots] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [focusedMenuIndex, setFocusedMenuIndex] = useState(0);
  const bgMusicRef = useRef<BackgroundMusic | null>(null);
  const showLoadSlotsRef = useRef(showLoadSlots);
  const showGalleryRef = useRef(showGallery);
  const showSettingsRef = useRef(showSettings);
  const focusedMenuIndexRef = useRef(focusedMenuIndex);
  showLoadSlotsRef.current = showLoadSlots;
  showGalleryRef.current = showGallery;
  showSettingsRef.current = showSettings;
  focusedMenuIndexRef.current = focusedMenuIndex;

  useEffect(() => {
    bgMusicRef.current = new BackgroundMusic();
    bgMusicRef.current.play(rainCityMusic, bgVolume);

    // Android WebView blocks audio until a user gesture. Retry on first touch/click.
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

  // Gamepad/keyboard navigation for main menu buttons and overlays
  useEffect(() => {
    const MENU_COUNT = 6; // Continue, Start, Load, Gallery, Settings, Exit
    const handler = (event: KeyboardEvent) => {
      // B button (Escape) closes any open overlay
      if (event.key === "Escape") {
        if (showLoadSlotsRef.current) { setShowLoadSlots(false); return; }
        if (showGalleryRef.current) { setShowGallery(false); return; }
        if (showSettingsRef.current) { setShowSettings(false); return; }
        return;
      }
      // Only navigate main menu when no overlay is open
      if (showLoadSlotsRef.current || showGalleryRef.current || showSettingsRef.current) return;

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setFocusedMenuIndex((prev) => (prev - 1 + MENU_COUNT) % MENU_COUNT);
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setFocusedMenuIndex((prev) => (prev + 1) % MENU_COUNT);
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById(`main-menu-btn-${focusedMenuIndexRef.current}`)?.click();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // focusedMenuIndex is read via DOM id, no need in deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const btnBase = "w-full rounded-full backdrop-blur-sm tracking-[0.03em] py-2.5 px-6 transition-all duration-200 border";
  const btnActive = `${btnBase} bg-[rgba(12,14,20,0.68)] text-white/90 border-white/25 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer`;
  const btnFocused = `${btnBase} -translate-y-0.5 bg-[rgba(255,214,173,0.15)] text-[#ffd6a0] border-[rgba(255,214,173,0.45)] cursor-pointer`;
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
        <div className="flex flex-col items-start gap-0">
          <h1 className="m-0 flex items-baseline gap-[0.06em] leading-none" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.45)" }}>
            <span
              className="text-white uppercase tracking-[0.02em]"
              style={{ fontFamily: '"New Amsterdam", sans-serif', fontSize: "clamp(2.6rem, 7vw, 5rem)", fontWeight: 400 }}
            >
              APARTMENTS
            </span>
            <span
              className="text-[#ffd6a0]"
              style={{
                fontFamily: '"Mr De Haviland", cursive',
                fontSize: "clamp(3.4rem, 9vw, 6.5rem)",
                fontWeight: 400,
                lineHeight: 0.85,
                textShadow: "0 0 18px rgba(255, 214, 160, 0.18)",
              }}
            >
              69
            </span>
          </h1>
          <p
            className="m-0 text-white/88 tracking-[0.1em]"
            style={{
              fontFamily: '"Caveat", cursive',
              fontSize: "clamp(1.4rem, 3.5vw, 2.4rem)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {labels.subtitle}
          </p>
          <span
            className="mt-1 inline-block text-[#ffd6a0] uppercase rounded-full border border-[rgba(255,214,173,0.45)] px-2.5 py-0.5"
            style={{
              fontFamily: '"Crimson Text", Georgia, serif',
              fontSize: "0.6rem",
              letterSpacing: "0.14em",
            }}
          >
            Early Access
          </span>
        </div>

        {/* Right: buttons */}
        <div className="flex flex-col items-center gap-2.5 w-[clamp(160px,28vw,260px)]">
          <button
            id="main-menu-btn-0"
            type="button"
            disabled={!autoSaveSlot}
            onClick={handleContinue}
            className={focusedMenuIndex === 0 && autoSaveSlot ? btnFocused : `${btnActive} disabled:opacity-40 disabled:cursor-default`}
            style={fontStyle}
          >
            {labels.continueStory}
          </button>

          {/* Start — primary (index 1) */}
          <button
            id="main-menu-btn-1"
            type="button"
            disabled={!isReady}
            onClick={handleStart}
            className={[
              "w-full rounded-full font-semibold tracking-[0.03em] py-3 px-6 transition-all duration-200 cursor-pointer disabled:cursor-default",
              focusedMenuIndex === 1 && isReady
                ? "bg-[#ffd6a0] text-[#1a1a1a] -translate-y-0.5 shadow-[0_6px_24px_rgba(255,214,173,0.35)] disabled:opacity-55"
                : "bg-white text-[#1a1a1a] disabled:opacity-55 enabled:hover:-translate-y-0.5 enabled:hover:shadow-[0_6px_24px_rgba(255,255,255,0.18)] enabled:active:translate-y-0",
            ].join(" ")}
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

          {/* Load (index 2) */}
          <button
            id="main-menu-btn-2"
            type="button"
            onClick={() => setShowLoadSlots(true)}
            className={focusedMenuIndex === 2 ? btnFocused : btnActive}
            style={fontStyle}
          >
            {labels.load}
          </button>

          {/* Gallery (index 3) */}
          <button id="main-menu-btn-3" type="button" onClick={() => setShowGallery(true)} className={focusedMenuIndex === 3 ? btnFocused : btnActive} style={fontStyle}>
            {labels.gallery}
          </button>

          {/* Settings (index 4) */}
          <button id="main-menu-btn-4" type="button" onClick={() => setShowSettings(true)} className={focusedMenuIndex === 4 ? btnFocused : btnActive} style={fontStyle}>
            {labels.settings}
          </button>

          {/* Exit (index 5) */}
          <button id="main-menu-btn-5" type="button" onClick={handleExit} className={focusedMenuIndex === 5 ? btnFocused : btnActive} style={fontStyle}>
            {labels.exit}
          </button>
        </div>
      </div>

      {/* Footer */}
      <span
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/36 tracking-[0.1em] whitespace-nowrap"
        style={{ fontFamily: '"Crimson Text", Georgia, serif', fontSize: "0.65rem" }}
      >
        © 2026 &nbsp;·&nbsp; Nrop Guy &nbsp;·&nbsp; Please Do Not Redistribute
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
