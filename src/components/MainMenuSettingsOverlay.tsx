import { useEffect, useRef, useState } from "react";
import type { LanguageCode } from "@/lib/i18n";
import type { AnimationFrameRate, GraphicsQuality } from "@/lib/runtime/graphicsSettings";

type MainMenuSettingsOverlayProps = {
  bgVolume: number;
  bgVolumeLabel: string;
  closeLabel: string;
  frameRate: AnimationFrameRate;
  frameRateLabel: string;
  frameRateOptions: Array<{ value: AnimationFrameRate; label: string }>;
  graphicsQuality: GraphicsQuality;
  graphicsQualityLabel: string;
  graphicsQualityOptions: Array<{ value: GraphicsQuality; label: string }>;
  language: LanguageCode;
  languageLabel: string;
  languageOptions: { code: LanguageCode; label: string }[];
  textSpeed: number;
  textSpeedLabel: string;
  onFrameRateChange: (frameRate: AnimationFrameRate) => void;
  onGraphicsQualityChange: (quality: GraphicsQuality) => void;
  onLanguageChange: (language: LanguageCode) => void;
  onBgVolumeChange: (value: number) => void;
  onTextSpeedChange: (value: number) => void;
  onClose: () => void;
  title: string;
};

// Section indices: 0=Language, 1=Graphics, 2=FPS, 3=Volume, 4=TextSpeed
const SLIDER_SECTIONS = new Set([3, 4]);
const TOTAL_SECTIONS = 5;

export const MainMenuSettingsOverlay = ({
  bgVolume,
  bgVolumeLabel,
  closeLabel,
  frameRate,
  frameRateLabel,
  frameRateOptions,
  graphicsQuality,
  graphicsQualityLabel,
  graphicsQualityOptions,
  language,
  languageLabel,
  languageOptions,
  textSpeed,
  textSpeedLabel,
  onFrameRateChange,
  onGraphicsQualityChange,
  onLanguageChange,
  onBgVolumeChange,
  onTextSpeedChange,
  onClose,
  title,
}: MainMenuSettingsOverlayProps) => {
  const [exiting, setExiting] = useState(false);
  const [focusedSection, setFocusedSection] = useState(0);
  const focusedSectionRef = useRef(0);
  focusedSectionRef.current = focusedSection;

  // Keep latest values accessible in handlers
  const valuesRef = useRef({ bgVolume, textSpeed, language, graphicsQuality, frameRate, languageOptions, graphicsQualityOptions, frameRateOptions });
  valuesRef.current = { bgVolume, textSpeed, language, graphicsQuality, frameRate, languageOptions, graphicsQualityOptions, frameRateOptions };

  const handlersRef = useRef({ onLanguageChange, onGraphicsQualityChange, onFrameRateChange, onBgVolumeChange, onTextSpeedChange });
  handlersRef.current = { onLanguageChange, onGraphicsQualityChange, onFrameRateChange, onBgVolumeChange, onTextSpeedChange };

  const handleClose = () => {
    setExiting(true);
    window.setTimeout(onClose, 280);
  };
  const handleCloseRef = useRef(handleClose);
  handleCloseRef.current = handleClose;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { handleCloseRef.current(); return; }

      const sec = focusedSectionRef.current;
      const v = valuesRef.current;
      const h = handlersRef.current;

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedSection(prev => (prev - 1 + TOTAL_SECTIONS) % TOTAL_SECTIONS);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedSection(prev => (prev + 1) % TOTAL_SECTIONS);
        return;
      }

      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        const dir = e.key === "ArrowRight" ? 1 : -1;
        if (sec === 0) {
          const idx = v.languageOptions.findIndex(o => o.code === v.language);
          const next = v.languageOptions[(idx + dir + v.languageOptions.length) % v.languageOptions.length];
          if (next) h.onLanguageChange(next.code);
        } else if (sec === 1) {
          const idx = v.graphicsQualityOptions.findIndex(o => o.value === v.graphicsQuality);
          const next = v.graphicsQualityOptions[(idx + dir + v.graphicsQualityOptions.length) % v.graphicsQualityOptions.length];
          if (next) h.onGraphicsQualityChange(next.value);
        } else if (sec === 2) {
          const idx = v.frameRateOptions.findIndex(o => o.value === v.frameRate);
          const next = v.frameRateOptions[(idx + dir + v.frameRateOptions.length) % v.frameRateOptions.length];
          if (next) h.onFrameRateChange(next.value);
        } else if (sec === 3) {
          h.onBgVolumeChange(Math.min(1, Math.max(0, Math.round((v.bgVolume + dir * 0.05) * 100) / 100)));
        } else if (sec === 4) {
          h.onTextSpeedChange(Math.min(3, Math.max(0.5, Math.round((v.textSpeed + dir * 0.25) * 100) / 100)));
        }
        return;
      }

      if (e.key === "Enter" && !SLIDER_SECTIONS.has(sec)) {
        e.preventDefault();
        // Cycle to next option in button-group sections
        const v2 = valuesRef.current;
        if (sec === 0) {
          const idx = v2.languageOptions.findIndex(o => o.code === v2.language);
          const next = v2.languageOptions[(idx + 1) % v2.languageOptions.length];
          if (next) handlersRef.current.onLanguageChange(next.code);
        } else if (sec === 1) {
          const idx = v2.graphicsQualityOptions.findIndex(o => o.value === v2.graphicsQuality);
          const next = v2.graphicsQualityOptions[(idx + 1) % v2.graphicsQualityOptions.length];
          if (next) handlersRef.current.onGraphicsQualityChange(next.value);
        } else if (sec === 2) {
          const idx = v2.frameRateOptions.findIndex(o => o.value === v2.frameRate);
          const next = v2.frameRateOptions[(idx + 1) % v2.frameRateOptions.length];
          if (next) handlersRef.current.onFrameRateChange(next.value);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
  <div
    className="fixed inset-0 z-[120] pointer-events-auto"
    onClick={handleClose}
  >
    <div
      className="absolute inset-y-0 right-0 flex flex-col w-[min(28rem,90vw)] border-l border-white/10"
      style={{
        background: "rgba(4, 5, 10, 0.82)",
        backdropFilter: "blur(32px)",
        animation: exiting
          ? "vn-slide-to-right 260ms cubic-bezier(0.4,0,1,1) both"
          : "vn-slide-from-right 280ms cubic-bezier(0.22,1,0.36,1) both",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-7 pt-8 pb-5 border-b border-white/10 shrink-0">
        <p className="m-0 text-white/38 text-[0.65rem] tracking-[0.22em] uppercase">{title}</p>
        <button
          type="button"
          onClick={handleClose}
          className="rounded-full border border-white/12 px-3.5 py-1.5 text-[0.7rem] tracking-[0.1em] uppercase text-white/55 transition-colors hover:text-white hover:border-white/30"
        >
          {closeLabel}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-6">
        {([
          { label: languageLabel, sec: 0 },
          { label: graphicsQualityLabel, sec: 1 },
          { label: frameRateLabel, sec: 2 },
          { label: bgVolumeLabel, sec: 3 },
          { label: textSpeedLabel, sec: 4 },
        ] as const).map(({ label, sec }) => (
          <div
            key={sec}
            className="flex flex-col gap-3 rounded-xl px-3 py-2 transition-all duration-150"
            style={{
              background: focusedSection === sec ? "rgba(255,214,173,0.05)" : "transparent",
              outline: focusedSection === sec ? "1px solid rgba(255,214,173,0.2)" : "1px solid transparent",
            }}
          >
            <label className="text-white/45 text-[0.68rem] tracking-[0.18em] uppercase">{label}</label>

            {/* Language options (sec 0) */}
            {sec === 0 && (
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
            )}

            {/* Graphics options (sec 1) */}
            {sec === 1 && (
              <div className="grid grid-cols-3 gap-2">
                {graphicsQualityOptions.map((option) => {
                  const active = option.value === graphicsQuality;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => onGraphicsQualityChange(option.value)}
                      className="rounded-xl border px-3 py-3 text-center transition-all duration-200"
                      style={{
                        borderColor: active ? "rgba(255,214,173,0.45)" : "rgba(255,255,255,0.08)",
                        background: active
                          ? "linear-gradient(180deg, rgba(255,214,173,0.14), rgba(255,214,173,0.06))"
                          : "rgba(255,255,255,0.03)",
                        boxShadow: active ? "0 0 0 1px rgba(255,214,173,0.1) inset" : "none",
                      }}
                    >
                      <span className="text-[0.78rem] text-white/88">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* FPS options (sec 2) */}
            {sec === 2 && (
              <div className="grid grid-cols-3 gap-2">
                {frameRateOptions.map((option) => {
                  const active = option.value === frameRate;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => onFrameRateChange(option.value)}
                      className="rounded-xl border px-3 py-3 text-center transition-all duration-200"
                      style={{
                        borderColor: active ? "rgba(255,214,173,0.45)" : "rgba(255,255,255,0.08)",
                        background: active
                          ? "linear-gradient(180deg, rgba(255,214,173,0.14), rgba(255,214,173,0.06))"
                          : "rgba(255,255,255,0.03)",
                        boxShadow: active ? "0 0 0 1px rgba(255,214,173,0.1) inset" : "none",
                      }}
                    >
                      <span className="text-[0.78rem] text-white/88">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* BGM Volume slider (sec 3) */}
            {sec === 3 && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-white/38 text-[0.68rem]">{Math.round(bgVolume * 100)}%</span>
                  {focusedSection === 3 && <span className="text-[#ffd6ad]/60 text-[0.6rem]">◀ ▶</span>}
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
              </>
            )}

            {/* Text Speed slider (sec 4) */}
            {sec === 4 && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-white/38 text-[0.68rem]">{textSpeed.toFixed(2)}x</span>
                  {focusedSection === 4 && <span className="text-[#ffd6ad]/60 text-[0.6rem]">◀ ▶</span>}
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
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};
