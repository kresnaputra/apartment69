import { smartphoneContactOptions } from "@/components/minigames/smartphoneContacts";

type SmartphoneContactMinigameMobileProps = {
  onSelect: (nextLabel: string) => void;
  showSleepOption?: boolean;
  sleepOptionNext?: string;
  disabledContacts?: string[];
};

export const SmartphoneContactMinigameMobile = ({
  onSelect,
  showSleepOption = false,
  sleepOptionNext = "epilogue",
  disabledContacts = [],
}: SmartphoneContactMinigameMobileProps) => {
  const visibleOptions = smartphoneContactOptions
    .filter((option) => option.id !== "sleep" || showSleepOption)
    .map((option) => {
      const isDisabled = disabledContacts.includes(option.id) || option.disabled;
      if (option.id === "sleep") {
        return { ...option, next: sleepOptionNext, disabled: isDisabled };
      }
      return { ...option, disabled: isDisabled };
    });
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
            Messages
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
            Who will you text first?
          </div>
          <div
            style={{
              marginTop: 3,
              fontSize: 11.5,
              color: "rgba(255,255,255,0.50)",
              lineHeight: 1.4,
            }}
          >
            You can't run into everyone at once. Pick one contact to prioritize
            first.
          </div>
        </div>

        {/* Contact list */}
        <div
          className="flex flex-col overflow-y-auto px-3 pt-2.5 gap-1.5"
          style={{ paddingBottom: 8, flex: 1, minHeight: 0 }}
        >
          {visibleOptions.map((option) => (
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
                  : `linear-gradient(135deg, ${option.accent}18 0%, rgba(255,255,255,0.025) 100%)`,
                border: option.disabled ? "1px solid rgba(255,255,255,0.08)" : `1px solid ${option.accent}24`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05)`,
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
          ))}
        </div>
      </div>
    </div>
  );
};
