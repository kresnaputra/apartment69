import { useEffect, useRef, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import mainMenuBg from "@/background/main-menu.png";
import rainCityMusic from "@/music/rain-city.mp3";
import { BackgroundMusic } from "@/lib/runtime/backgroundMusic";
import { SaveSlotOverlay } from "@/components/SaveSlotOverlay";
import type { SaveSlot } from "@/lib/runtime/saveSlots";

type MainMenuProps = {
  onStart: () => void;
  onLoad: (slot: SaveSlot) => void;
  slots: (SaveSlot | null)[];
  isReady: boolean;
};

export const MainMenu = ({ onStart, onLoad, slots, isReady }: MainMenuProps) => {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [showLoadSlots, setShowLoadSlots] = useState(false);
  const bgMusicRef = useRef<BackgroundMusic | null>(null);


  useEffect(() => {
    bgMusicRef.current = new BackgroundMusic();
    bgMusicRef.current.play(rainCityMusic, 0.4);
    return () => {
      bgMusicRef.current?.dispose();
    };
  }, []);

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
          <p className="vn-menu-subtitle">The Helpful Neighbor</p>
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
              <span className="vn-menu-btn-loading">Loading<span className="vn-menu-dots" /></span>
            ) : (
              "Start"
            )}
          </button>

          {/* Load */}
          <button
            type="button"
            className="vn-menu-btn vn-menu-btn-secondary"
            onClick={() => setShowLoadSlots(true)}
          >
            Load
          </button>

          {/* Gallery */}
          <button type="button" disabled className="vn-menu-btn vn-menu-btn-secondary">
            Gallery
          </button>

          {/* Setting */}
          <button type="button" disabled className="vn-menu-btn vn-menu-btn-secondary">
            Setting
          </button>

          {/* Exit */}
          <button type="button" className="vn-menu-btn vn-menu-btn-secondary" onClick={handleExit}>
            Exit
          </button>
        </nav>

        <footer className="vn-menu-footer">
          <span>© 2025 &nbsp;·&nbsp; Visual Novel Engine</span>
        </footer>
      </div>

      {showLoadSlots && (
        <SaveSlotOverlay
          mode="load"
          slots={slots}
          onSelect={handleLoadSlot}
          onClose={() => setShowLoadSlots(false)}
        />
      )}
    </div>
  );
};
