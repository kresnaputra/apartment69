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
}: MainMenuSettingsOverlayProps) => (
  <div
    className="fixed inset-0 z-[120] flex items-center justify-center pointer-events-auto"
    style={{ background: "rgba(0,0,0,0.42)" }}
    onClick={onClose}
  >
    <div
      className="w-[min(32rem,90vw)] rounded-3xl border border-white/12 shadow-[0_30px_80px_rgba(0,0,0,0.4)]"
      style={{ background: "linear-gradient(180deg, rgba(10,12,18,0.96), rgba(8,10,14,0.94))", backdropFilter: "blur(10px)" }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div>
          <p className="m-0 text-white/40 text-[0.68rem] tracking-[0.18em] uppercase">Main Menu</p>
          <h2 className="m-0 text-white/90 text-[1.05rem] font-medium">{title}</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/12 px-3 py-1.5 text-[0.72rem] text-white/70 transition-colors hover:text-white hover:border-white/30"
        >
          {closeLabel}
        </button>
      </div>

      <div className="px-6 py-5 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-white/68 text-[0.78rem]">{languageLabel}</label>
          <div className="grid grid-cols-2 gap-3">
            {languageOptions.map((option) => {
              const active = option.code === language;
              return (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => onLanguageChange(option.code)}
                  className="rounded-2xl border px-4 py-3 text-left transition-all duration-200"
                  style={{
                    borderColor: active ? "rgba(210,164,86,0.5)" : "rgba(255,255,255,0.1)",
                    background: active
                      ? "linear-gradient(180deg, rgba(210,164,86,0.18), rgba(210,164,86,0.08))"
                      : "rgba(255,255,255,0.04)",
                    boxShadow: active ? "0 0 0 1px rgba(210,164,86,0.12) inset" : "none",
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[0.9rem] text-white/92">{option.label}</span>
                    <span
                      className="h-2.5 w-2.5 rounded-full border"
                      style={{
                        borderColor: active ? "rgba(210,164,86,0.75)" : "rgba(255,255,255,0.18)",
                        background: active ? "#d2a456" : "transparent",
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <label className="text-white/68 text-[0.78rem]">{bgVolumeLabel}</label>
            <span className="text-white/45 text-[0.72rem]">{Math.round(bgVolume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={bgVolume}
            onChange={(e) => onBgVolumeChange(parseFloat(e.target.value))}
            className="w-full accent-[#d2a456]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <label className="text-white/68 text-[0.78rem]">{textSpeedLabel}</label>
            <span className="text-white/45 text-[0.72rem]">{textSpeed.toFixed(2)}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.25"
            value={textSpeed}
            onChange={(e) => onTextSpeedChange(parseFloat(e.target.value))}
            className="w-full accent-[#d2a456]"
          />
        </div>
      </div>
    </div>
  </div>
);
