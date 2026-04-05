import { useEffect, useState } from "react";

type MainMenuProps = {
  onStart: () => void;
  isReady: boolean;
};

const MENU_ITEMS = [
  { id: "start", label: "Mulai Cerita", primary: true },
  { id: "continue", label: "Lanjutkan", primary: false, disabled: true },
  { id: "config", label: "Pengaturan", primary: false, disabled: true },
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
      <div className="vn-menu-bg" />
      <div className="vn-menu-noise" />

      <div className="vn-menu-orb vn-menu-orb-1" />
      <div className="vn-menu-orb vn-menu-orb-2" />
      <div className="vn-menu-orb vn-menu-orb-3" />

      <div className="vn-menu-layout">
        <header className="vn-menu-header">
          <p className="vn-menu-eyebrow">Visual Novel</p>
          <h1 className="vn-menu-title">Ruang di Antara Kita</h1>
          <p className="vn-menu-subtitle">Stasiun Senja &mdash; sebuah cerita tentang pilihan dan kehadiran</p>
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
