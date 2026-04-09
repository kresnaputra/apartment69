import { useEffect, useState } from "react";
import mainMenuBg from "@/background/main-menu.png";

type MainMenuProps = {
  onStart: () => void;
  isReady: boolean;
};

const MENU_ITEMS = [
  { id: "start", label: "Start", primary: true },
  { id: "continue", label: "Lanjut", primary: false, disabled: true },
  { id: "gallery", label: "Gallery", primary: false, disabled: true },
  { id: "settings", label: "Setting", primary: false, disabled: true },
] as const;

export const MainMenu = ({ onStart, isReady }: MainMenuProps) => {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  const handleStart = () => {
    if (!isReady) return;
    setExiting(true);
    window.setTimeout(() => onStart(), 640);
  };

  return (
    <div className={`vn-menu-root ${visible ? "vn-menu-visible" : ""} ${exiting ? "vn-menu-exiting" : ""}`}>
      <div className="vn-menu-bg" style={{ backgroundImage: `url(${mainMenuBg})` }} />
      <div className="vn-menu-overlay" />

      <div className="vn-menu-layout">
        <header className="vn-menu-header">
          <h1 className="vn-menu-title">
            <span className="vn-menu-title-main">APARTEMEN</span>
            <span className="vn-menu-title-num">69</span>
          </h1>
          <p className="vn-menu-subtitle">The Helpful Neighbor</p>
        </header>

        <nav className="vn-menu-nav">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              disabled={"disabled" in item ? item.disabled : false}
              className={`vn-menu-btn ${item.primary ? "vn-menu-btn-primary" : "vn-menu-btn-secondary"}`}
              onClick={item.id === "start" ? handleStart : undefined}
            >
              {item.id === "start" && !isReady ? (
                <span className="vn-menu-btn-loading">Memuat<span className="vn-menu-dots" /></span>
              ) : (
                item.label
              )}
            </button>
          ))}
        </nav>

        <footer className="vn-menu-footer">
          <span>© 2025 &nbsp;·&nbsp; Visual Novel Engine</span>
        </footer>
      </div>
    </div>
  );
};
