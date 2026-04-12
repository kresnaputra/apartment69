import { smartphoneContactOptions } from "@/components/minigames/smartphoneContacts";

type SmartphoneContactMinigameProps = {
  onSelect: (nextLabel: string) => void;
  showSleepOption?: boolean;
  sleepOptionNext?: string;
  disabledContacts?: string[];
};

export const SmartphoneContactMinigame = ({ onSelect, showSleepOption = false, sleepOptionNext = "epilogue", disabledContacts = [] }: SmartphoneContactMinigameProps) => {
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
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(14px)",
      }}
      onClick={(event) => event.stopPropagation()}
    >
      {/* Phone outer shell */}
      <div
        className="relative flex flex-col"
        style={{
          width: 320,
          height: 640,
          borderRadius: 50,
          background: "linear-gradient(160deg, #2a2a2e 0%, #1a1a1e 40%, #111113 100%)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.10), 0 0 0 2px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12), 0 60px 120px rgba(0,0,0,0.72), 0 20px 40px rgba(0,0,0,0.48)",
          padding: 10,
        }}
      >
        {/* Side button left — volume up */}
        <div
          className="absolute"
          style={{
            left: -4,
            top: 130,
            width: 4,
            height: 32,
            borderRadius: "3px 0 0 3px",
            background: "linear-gradient(180deg, #3a3a3e 0%, #222226 100%)",
            boxShadow: "-1px 0 0 rgba(255,255,255,0.08)",
          }}
        />
        <div
          className="absolute"
          style={{
            left: -4,
            top: 172,
            width: 4,
            height: 32,
            borderRadius: "3px 0 0 3px",
            background: "linear-gradient(180deg, #3a3a3e 0%, #222226 100%)",
            boxShadow: "-1px 0 0 rgba(255,255,255,0.08)",
          }}
        />
        {/* Side button right — power */}
        <div
          className="absolute"
          style={{
            right: -4,
            top: 150,
            width: 4,
            height: 52,
            borderRadius: "0 3px 3px 0",
            background: "linear-gradient(180deg, #3a3a3e 0%, #222226 100%)",
            boxShadow: "1px 0 0 rgba(255,255,255,0.08)",
          }}
        />

        {/* Screen bezel */}
        <div
          className="flex flex-col flex-1 overflow-hidden"
          style={{
            borderRadius: 42,
            background: "#0b0c10",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          {/* Dynamic island */}
          <div className="flex justify-center pt-3 pb-1">
            <div
              style={{
                width: 110,
                height: 30,
                borderRadius: 20,
                background: "#000",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
              }}
            />
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pb-1">
            <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.80)", letterSpacing: "0.01em" }}>
              9:41
            </span>
            <div className="flex items-center gap-1.5">
              {/* Signal bars */}
              <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                <rect x="0" y="7" width="3" height="4" rx="0.8" fill="rgba(255,255,255,0.80)" />
                <rect x="4.5" y="5" width="3" height="6" rx="0.8" fill="rgba(255,255,255,0.80)" />
                <rect x="9" y="2.5" width="3" height="8.5" rx="0.8" fill="rgba(255,255,255,0.80)" />
                <rect x="13.5" y="0" width="2.5" height="11" rx="0.8" fill="rgba(255,255,255,0.80)" />
              </svg>
              {/* Wifi */}
              <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                <path d="M7.5 8.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="rgba(255,255,255,0.80)" />
                <path d="M3.8 6.2a5.2 5.2 0 0 1 7.4 0" stroke="rgba(255,255,255,0.80)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                <path d="M1.2 3.6a8.9 8.9 0 0 1 12.6 0" stroke="rgba(255,255,255,0.80)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              </svg>
              {/* Battery */}
              <div className="relative flex items-center" style={{ width: 22, height: 11 }}>
                <div
                  style={{
                    width: 20,
                    height: 11,
                    borderRadius: 3,
                    border: "1px solid rgba(255,255,255,0.60)",
                    padding: "1.5px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div style={{ width: "72%", height: "100%", borderRadius: 1.5, background: "rgba(255,255,255,0.80)" }} />
                </div>
                <div
                  style={{
                    position: "absolute",
                    right: -2,
                    width: 2,
                    height: 5,
                    borderRadius: "0 1px 1px 0",
                    background: "rgba(255,255,255,0.60)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* App header */}
          <div
            className="px-5 pt-3 pb-3"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", fontWeight: 500 }}>
              Messages
            </div>
            <div style={{ marginTop: 2, fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", color: "#fff" }}>
              Who will you text first?
            </div>
            <div style={{ marginTop: 4, fontSize: 12.5, color: "rgba(255,255,255,0.52)", lineHeight: 1.5 }}>
              You can't run into everyone at once. Pick one contact to prioritize first.
            </div>
          </div>

          {/* Contact list */}
          <div className="flex flex-col overflow-y-auto flex-1 px-3 pt-3 pb-3 gap-2">
            {visibleOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => !option.disabled && onSelect(option.next)}
                disabled={option.disabled}
                className="group flex items-center gap-3 text-left transition-all duration-150 active:scale-[0.98]"
                style={{
                  borderRadius: 18,
                  padding: "11px 14px",
                  background: option.disabled
                    ? "rgba(255,255,255,0.03)"
                    : `linear-gradient(135deg, ${option.accent}1a 0%, rgba(255,255,255,0.03) 100%)`,
                  border: option.disabled ? "1px solid rgba(255,255,255,0.08)" : `1px solid ${option.accent}28`,
                  boxShadow: `0 1px 0 rgba(255,255,255,0.05) inset`,
                  opacity: option.disabled ? 0.4 : 1,
                  cursor: option.disabled ? "not-allowed" : "pointer",
                  filter: option.disabled ? "grayscale(0.5)" : "none",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 14,
                    background: option.disabled
                      ? "rgba(255,255,255,0.08)"
                      : `linear-gradient(135deg, ${option.accent}55, ${option.accent}22)`,
                    border: option.disabled ? "1.5px solid rgba(255,255,255,0.1)" : `1.5px solid ${option.accent}50`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 16,
                    fontWeight: 700,
                    color: option.disabled ? "rgba(255,255,255,0.4)" : option.accent,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {option.icon ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={option.icon} />
                    </svg>
                  ) : (
                    option.name[0]
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: "#fff", letterSpacing: "-0.02em" }}>
                    {option.name}
                  </div>
                </div>

                {/* Arrow */}
                <svg
                  width="7"
                  height="12"
                  viewBox="0 0 7 12"
                  fill="none"
                  style={{ flexShrink: 0, opacity: option.disabled ? 0.15 : 0.35, transition: "opacity 0.15s" }}
                  className="group-hover:opacity-70"
                >
                  <path d="M1 1l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>

          {/* Home indicator */}
          <div className="flex justify-center pb-3 pt-1">
            <div
              style={{
                width: 100,
                height: 4,
                borderRadius: 3,
                background: "rgba(255,255,255,0.22)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
