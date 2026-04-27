import type { LanguageCode } from "@/lib/i18n";

type ConfigOverlayProps = {
  bgVolume: number;
  bgVolumeLabel: string;
  textSpeed: number;
  textSpeedLabel: string;
  configLabel: string;
  language: LanguageCode;
  languageLabel: string;
  languageOptions: { code: LanguageCode; label: string }[];
  onLanguageChange: (language: LanguageCode) => void;
  onBgVolumeChange: (value: number) => void;
  onTextSpeedChange: (value: number) => void;
  onClose: () => void;
};

export const ConfigOverlay = ({
  bgVolume,
  bgVolumeLabel,
  textSpeed,
  textSpeedLabel,
  configLabel,
  language,
  languageLabel,
  languageOptions,
  onLanguageChange,
  onBgVolumeChange,
  onTextSpeedChange,
  onClose,
}: ConfigOverlayProps) => (
  <div
    className="fixed inset-0 z-50 flex items-end justify-center pointer-events-auto"
    onClick={onClose}
  >
    <div
      className="w-[58vw] mb-4 rounded-2xl"
      style={{ background: "rgba(5,6,12,0.94)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
        <span className="text-white/50 text-[0.62rem] tracking-[0.08em] uppercase">{configLabel}</span>
        <button
          type="button"
          onClick={onClose}
          className="text-white/40 text-[0.75rem] leading-none hover:text-white/70 transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <label className="text-white/65 text-[0.7rem] shrink-0 w-[5.5rem] self-start pt-2">{languageLabel}</label>
          <div className="flex-1 grid grid-cols-2 gap-2">
            {languageOptions.map((option) => {
              const active = option.code === language;
              return (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => onLanguageChange(option.code)}
                  className="rounded-xl border px-3 py-2.5 text-left transition-all duration-200"
                  style={{
                    borderColor: active ? "rgba(210,164,86,0.5)" : "rgba(255,255,255,0.1)",
                    background: active
                      ? "linear-gradient(180deg, rgba(210,164,86,0.18), rgba(210,164,86,0.08))"
                      : "rgba(255,255,255,0.04)",
                    boxShadow: active ? "0 0 0 1px rgba(210,164,86,0.12) inset" : "none",
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[0.82rem] text-white/92">{option.label}</span>
                    <span
                      className="h-2.5 w-2.5 rounded-full border shrink-0"
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
        <div className="flex items-center gap-3">
          <label className="text-white/65 text-[0.7rem] shrink-0 w-[5.5rem]">{bgVolumeLabel}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={bgVolume}
            onChange={(e) => onBgVolumeChange(parseFloat(e.target.value))}
            className="flex-1 accent-[#d2a456]"
          />
          <span className="text-white/45 text-[0.65rem] w-7 text-right shrink-0">
            {Math.round(bgVolume * 100)}%
          </span>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-white/65 text-[0.7rem] shrink-0 w-[5.5rem]">{textSpeedLabel}</label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.25"
            value={textSpeed}
            onChange={(e) => onTextSpeedChange(parseFloat(e.target.value))}
            className="flex-1 accent-[#d2a456]"
          />
          <span className="text-white/45 text-[0.65rem] w-7 text-right shrink-0">
            {textSpeed.toFixed(2)}x
          </span>
        </div>
      </div>
    </div>
  </div>
);
