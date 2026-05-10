import { useEffect, useRef, useState } from "react";
import type { LanguageCode, LocalizedText } from "@/lib/i18n";
import { resolveText } from "@/lib/i18n";
import { resolveSmartphoneContactOptions, type SmartphoneContactOverrides } from "@/components/minigames/smartphoneContacts";

type SmartphoneContactMinigameMobileProps = {
  onSelect: (nextLabel: string) => void;
  language: LanguageCode;
  showSleepOption?: boolean;
  sleepOptionNext?: string;
  disabledContacts?: string[];
  title?: LocalizedText;
  subtitle?: LocalizedText;
  appLabel?: LocalizedText;
  contactOverrides?: SmartphoneContactOverrides;
};

export const SmartphoneContactMinigameMobile = ({
  onSelect,
  language,
  showSleepOption = false,
  sleepOptionNext = "epilogue",
  disabledContacts = [],
  title = {
    id: "Siapa yang mau kamu chat dulu?",
    en: "Who will you text first?",
    ja: "最初に誰へ連絡する？",
    ko: "누구에게 먼저 연락할까?",
  },
  subtitle = {
    id: "Kamu nggak mungkin ketemu semua orang sekaligus. Pilih satu kontak yang mau diprioritaskan dulu.",
    en: "You can't run into everyone at once. Pick one contact to prioritize first.",
    ja: "全員に一度に会うのは無理だ。まず優先する相手を一人選ぼう。",
    ko: "한 번에 모두를 만날 수는 없다. 먼저 우선할 한 명을 고르자.",
  },
  appLabel = {
    id: "Pesan",
    en: "Messages",
    ja: "メッセージ",
    ko: "메시지",
  },
  contactOverrides = {},
}: SmartphoneContactMinigameMobileProps) => {
  const visibleOptions = resolveSmartphoneContactOptions({
    language,
    showSleepOption,
    sleepOptionNext,
    disabledContacts,
    overrides: contactOverrides,
  });
  const resolvedTitle = resolveText(title, language);
  const resolvedSubtitle = resolveText(subtitle, language);
  const resolvedAppLabel = resolveText(appLabel, language);

  const [focusedIndex, setFocusedIndex] = useState(0);
  const focusedIndexRef = useRef(0);
  focusedIndexRef.current = focusedIndex;
  const visibleOptionsRef = useRef(visibleOptions);
  visibleOptionsRef.current = visibleOptions;
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const opts = visibleOptionsRef.current;
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex(prev => (prev - 1 + opts.length) % opts.length);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex(prev => (prev + 1) % opts.length);
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const opt = opts[focusedIndexRef.current];
        if (opt && !opt.disabled) onSelectRef.current(opt.next);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(12px)",
      }}
      onClick={(event) => event.stopPropagation()}
    >
      {/* Bottom sheet style — feels like a native share sheet */}
      <div
        className="w-full flex flex-col"
        style={{
          maxHeight: "86dvh",
          borderRadius: "28px 28px 0 0",
          background: "linear-gradient(180deg, #1a1b21 0%, #111216 100%)",
          boxShadow:
            "0 -1px 0 rgba(255,255,255,0.10), 0 -24px 60px rgba(0,0,0,0.60)",
          paddingBottom: "env(safe-area-inset-bottom, 16px)",
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div
            style={{
              width: 36,
              height: 4,
              borderRadius: 3,
              background: "rgba(255,255,255,0.22)",
            }}
          />
        </div>

        {/* Fake phone status bar strip */}
        <div
          className="flex items-center justify-between px-5 py-1.5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.01em",
            }}
          >
            9:41
          </span>
          <div className="flex items-center gap-1.5">
            {/* Signal */}
            <svg width="14" height="10" viewBox="0 0 16 11" fill="none">
              <rect
                x="0"
                y="7"
                width="3"
                height="4"
                rx="0.8"
                fill="rgba(255,255,255,0.55)"
              />
              <rect
                x="4.5"
                y="5"
                width="3"
                height="6"
                rx="0.8"
                fill="rgba(255,255,255,0.55)"
              />
              <rect
                x="9"
                y="2.5"
                width="3"
                height="8.5"
                rx="0.8"
                fill="rgba(255,255,255,0.55)"
              />
              <rect
                x="13.5"
                y="0"
                width="2.5"
                height="11"
                rx="0.8"
                fill="rgba(255,255,255,0.55)"
              />
            </svg>
            {/* Wifi */}
            <svg width="14" height="10" viewBox="0 0 15 11" fill="none">
              <path
                d="M7.5 8.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                fill="rgba(255,255,255,0.55)"
              />
              <path
                d="M3.8 6.2a5.2 5.2 0 0 1 7.4 0"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M1.2 3.6a8.9 8.9 0 0 1 12.6 0"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            {/* Battery */}
            <div
              className="relative flex items-center"
              style={{ width: 20, height: 10 }}
            >
              <div
                style={{
                  width: 18,
                  height: 10,
                  borderRadius: 3,
                  border: "1px solid rgba(255,255,255,0.45)",
                  padding: "1.5px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "72%",
                    height: "100%",
                    borderRadius: 1.5,
                    background: "rgba(255,255,255,0.55)",
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  right: -2,
                  width: 2,
                  height: 4.5,
                  borderRadius: "0 1px 1px 0",
                  background: "rgba(255,255,255,0.45)",
                }}
              />
            </div>
          </div>
        </div>

        {/* App header */}
        <div
          className="px-4 pt-3 pb-2.5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.36)",
              fontWeight: 500,
            }}
          >
            {resolvedAppLabel}
          </div>
          <div
            style={{
              marginTop: 2,
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            {resolvedTitle}
          </div>
          <div
            style={{
              marginTop: 3,
              fontSize: 11.5,
              color: "rgba(255,255,255,0.50)",
              lineHeight: 1.4,
            }}
          >
            {resolvedSubtitle}
          </div>
        </div>

        {/* Contact list */}
        <div
          className="flex flex-col overflow-y-auto px-3 pt-2.5 gap-1.5"
          style={{ paddingBottom: 8, flex: 1, minHeight: 0 }}
        >
          {visibleOptions.map((option, idx) => {
            const isFocused = focusedIndex === idx && !option.disabled;
            return (
            <button
              key={option.id}
              type="button"
              onClick={() => !option.disabled && onSelect(option.next)}
              disabled={option.disabled}
              className="flex items-center gap-3 text-left transition-all duration-150 active:scale-[0.98]"
              style={{
                borderRadius: 14,
                padding: "9px 12px",
                background: option.disabled
                  ? "rgba(255,255,255,0.025)"
                  : isFocused
                  ? `linear-gradient(135deg, ${option.accent}30 0%, rgba(255,255,255,0.06) 100%)`
                  : `linear-gradient(135deg, ${option.accent}18 0%, rgba(255,255,255,0.025) 100%)`,
                border: option.disabled
                  ? "1px solid rgba(255,255,255,0.08)"
                  : isFocused
                  ? `1.5px solid ${option.accent}60`
                  : `1px solid ${option.accent}24`,
                boxShadow: isFocused
                  ? `inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 2px ${option.accent}18`
                  : `inset 0 1px 0 rgba(255,255,255,0.05)`,
                opacity: option.disabled ? 0.4 : 1,
                cursor: option.disabled ? "not-allowed" : "pointer",
                filter: option.disabled ? "grayscale(0.5)" : "none",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 11,
                  background: option.disabled
                    ? "rgba(255,255,255,0.08)"
                    : `linear-gradient(135deg, ${option.accent}50, ${option.accent}1a)`,
                  border: option.disabled ? "1.5px solid rgba(255,255,255,0.1)" : `1.5px solid ${option.accent}44`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 14,
                  fontWeight: 700,
                  color: option.disabled ? "rgba(255,255,255,0.4)" : option.accent,
                  letterSpacing: "-0.02em",
                }}
              >
                {option.icon ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={option.icon} />
                  </svg>
                ) : (
                  option.name[0]
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div
                  style={{
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: "#fff",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {option.name}
                </div>
                <div
                  style={{
                    marginTop: 2,
                    fontSize: 10.5,
                    lineHeight: 1.4,
                    color: option.disabled ? "rgba(255,255,255,0.32)" : "rgba(255,255,255,0.54)",
                  }}
                >
                  {option.blurb}
                </div>
              </div>

              {/* Arrow */}
              <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                style={{ flexShrink: 0, opacity: option.disabled ? 0.15 : 0.3 }}
              >
                <path
                  d="M1 1l5 5-5 5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
