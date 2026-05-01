import { useState } from "react";
import type { LanguageCode } from "@/lib/i18n";

type MainMenuSettingsOverlayProps = {
  bgVolume: number;
  bgVolumeLabel: string;
  closeLabel: string;
  language: LanguageCode;
  languageLabel: string;
  languageOptions: { code: LanguageCode; label: string }[];
  textSpeed: number;
  textSpeedLabel: string;
  onLanguageChange: (language: LanguageCode) => void;
  onBgVolumeChange: (value: number) => void;
  onTextSpeedChange: (value: number) => void;
  onClose: () => void;
  title: string;
};

export const MainMenuSettingsOverlay = ({
  bgVolume,
  bgVolumeLabel,
  closeLabel,
  language,
  languageLabel,
  languageOptions,
  textSpeed,
  textSpeedLabel,
  onLanguageChange,
  onBgVolumeChange,
  onTextSpeedChange,
  onClose,
  title,
}: MainMenuSettingsOverlayProps) => {
  const [exiting, setExiting] = useState(false);

  const handleClose = () => {
    setExiting(true);
    window.setTimeout(onClose, 280);
  };

  return (
  <div
    className="fixed inset-0 z-[120] pointer-events-auto"
    onClick={handleClose}
  >
    <div
      className="absolute inset-y-0 right-0 flex flex-col w-[min(28rem,90vw)] border-l border-white/10"
      style={{
        background: "linear-gradient(180deg, rgba(8,10,16,0.2), rgba(6,8,12,0.2))",
        backdropFilter: "blur(32px)",
        animation: exiting
          ? "vn-slide-to-right 260ms cubic-bezier(0.4,0,1,1) both"
          : "vn-slide-from-right 280ms cubic-bezier(0.22,1,0.36,1) both",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-7 pt-8 pb-5 border-b border-white/10 shrink-0">
        <div>
          <p className="m-0 text-white/38 text-[0.65rem] tracking-[0.22em] uppercase mb-1">Main Menu</p>
          <h2 className="m-0 text-white/90 text-[1.1rem] font-medium">{title}</h2>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="rounded-full border border-white/12 px-3.5 py-1.5 text-[0.7rem] tracking-[0.1em] uppercase text-white/55 transition-colors hover:text-white hover:border-white/30"
        >
          {closeLabel}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-7 py-6 flex flex-col gap-7">
        {/* Language */}
        <div className="flex flex-col gap-3">
          <label className="text-white/45 text-[0.68rem] tracking-[0.18em] uppercase">{languageLabel}</label>
          <div className="grid grid-cols-2 gap-2.5">
            {languageOptions.map((option) => {
              const active = option.code === language;
              return (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => onLanguageChange(option.code)}
                  className="rounded-xl border px-4 py-3 text-left transition-all duration-200"
                  style={{
                    borderColor: active ? "rgba(255,214,173,0.45)" : "rgba(255,255,255,0.08)",
                    background: active
                      ? "linear-gradient(180deg, rgba(255,214,173,0.14), rgba(255,214,173,0.06))"
                      : "rgba(255,255,255,0.03)",
                    boxShadow: active ? "0 0 0 1px rgba(255,214,173,0.1) inset" : "none",
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[0.88rem] text-white/88">{option.label}</span>
                    <span
                      className="h-2 w-2 rounded-full border shrink-0"
                      style={{
                        borderColor: active ? "rgba(255,214,173,0.7)" : "rgba(255,255,255,0.18)",
                        background: active ? "#ffd6ad" : "transparent",
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* BGM Volume */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-white/45 text-[0.68rem] tracking-[0.18em] uppercase">{bgVolumeLabel}</label>
            <span className="text-white/38 text-[0.68rem]">{Math.round(bgVolume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={bgVolume}
            onChange={(e) => onBgVolumeChange(parseFloat(e.target.value))}
            className="w-full accent-[#ffd6ad]"
          />
        </div>

        {/* Text Speed */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-white/45 text-[0.68rem] tracking-[0.18em] uppercase">{textSpeedLabel}</label>
            <span className="text-white/38 text-[0.68rem]">{textSpeed.toFixed(2)}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.25"
            value={textSpeed}
            onChange={(e) => onTextSpeedChange(parseFloat(e.target.value))}
            className="w-full accent-[#ffd6ad]"
          />
        </div>
      </div>
    </div>
  </div>
  );
};
