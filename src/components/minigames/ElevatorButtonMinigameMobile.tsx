import { useEffect, useRef } from "react";

type ElevatorButtonMinigameMobileProps = {
  onComplete: () => void;
};

export const ElevatorButtonMinigameMobile = ({ onComplete }: ElevatorButtonMinigameMobileProps) => {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") { e.preventDefault(); onCompleteRef.current(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "radial-gradient(circle at top,rgba(255,223,147,0.18),transparent 30%),rgba(4,7,12,0.62)",
        backdropFilter: "blur(8px)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="relative flex flex-row gap-5 items-center rounded-[28px] border border-white/8 px-6 py-4 w-full max-w-lg"
        style={{
          background:
            "linear-gradient(145deg,rgba(115,127,142,0.28),rgba(22,28,38,0.86) 18%,rgba(7,10,16,0.96) 70%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent 24%)",
          boxShadow:
            "0 32px 90px rgba(0,0,0,0.48),inset 0 1px 0 rgba(255,255,255,0.16),inset 0 -20px 40px rgba(0,0,0,0.34)",
        }}
      >
        {/* Corner screws */}
        {["-top-0.5 -left-0.5", "-top-0.5 -right-0.5", "-bottom-0.5 -left-0.5", "-bottom-0.5 -right-0.5"].map((pos, i) => (
          <span
            key={i}
            className={`absolute w-2.5 h-2.5 rounded-full ${pos}`}
            style={{
              background: "radial-gradient(circle at 35% 35%,rgba(255,255,255,0.5),rgba(132,145,160,0.32) 45%,rgba(27,33,41,0.9) 100%)",
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.22)",
            }}
          />
        ))}

        {/* Left: info + indicator */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <p className="m-0 text-[0.6rem] tracking-[0.26em] uppercase text-[rgba(199,208,220,0.72)]">
            Lentera Apartments
          </p>
          <p
            className="m-0 text-white font-bold leading-tight"
            style={{ fontSize: "clamp(1.4rem,4vw,2rem)", letterSpacing: "-0.03em" }}
          >
            Lift Control
          </p>
          <p className="m-0 text-[0.7rem] leading-[1.55] text-[rgba(194,202,214,0.88)]">
            The old panel hums softly. Press the button for the 3rd floor.
          </p>

          <div className="flex flex-col items-center gap-1 mt-1">
            <span className="text-[0.58rem] tracking-[0.24em] uppercase text-[rgba(190,198,208,0.66)]">
              Floor Request
            </span>
            <div
              className="rounded-2xl border border-[rgba(255,214,133,0.16)] text-[#ffd977] px-4 py-1.5 text-xl font-bold tracking-[0.18em] font-mono"
              style={{
                background: "radial-gradient(circle at 50% 35%,rgba(255,217,123,0.12),transparent 55%),linear-gradient(180deg,#121820,#090c12)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06),inset 0 0 24px rgba(255,208,88,0.08)",
              }}
            >
              03
            </div>
          </div>
        </div>

        {/* Right: button grid */}
        <div className="grid grid-cols-3 gap-2 shrink-0">
          {[
            { label: "1", small: false, active: false, onClick: undefined },
            { label: "2", small: false, active: false, onClick: undefined },
            { label: "3", small: false, active: true,  onClick: onComplete },
            { label: "OPEN",  small: true, active: false, onClick: undefined },
            { label: "CLOSE", small: true, active: false, onClick: undefined },
            { label: "ALARM", small: true, active: false, onClick: undefined },
          ].map(({ label, small, active, onClick }) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              className={`relative rounded-[18px] border-none cursor-pointer transition-all duration-[160ms] ${small ? "min-h-[3.6rem]" : "aspect-square"} ${active ? "text-[#1b1711]" : "text-[#edf2f8]"}`}
              style={{
                background: active
                  ? "linear-gradient(180deg,rgba(255,249,206,0.24),rgba(255,255,255,0) 34%),linear-gradient(160deg,#ffd77f,#c99628 60%,#8a6519)"
                  : "linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0) 34%),linear-gradient(160deg,#5d6774,#2b3440 58%,#1b222c)",
                boxShadow: active
                  ? "inset 0 1px 0 rgba(255,255,255,0.42),inset 0 -8px 18px rgba(105,68,8,0.28),0 0 0 1px rgba(255,230,154,0.36),0 0 24px rgba(255,208,96,0.2),0 8px 20px rgba(0,0,0,0.26)"
                  : "inset 0 1px 0 rgba(255,255,255,0.22),inset 0 -8px 18px rgba(0,0,0,0.26),0 8px 18px rgba(0,0,0,0.22)",
              }}
            >
              <span
                className={`flex items-center justify-center w-[calc(100%-14px)] h-[calc(100%-14px)] m-[7px] rounded-[14px] border border-white/6 ${small ? "text-[0.7rem] tracking-[0.1em]" : "text-lg font-semibold"}`}
                style={{
                  background: "radial-gradient(circle at 50% 24%,rgba(255,255,255,0.12),transparent 44%),linear-gradient(180deg,rgba(15,20,28,0.2),rgba(255,255,255,0.02))",
                  textShadow: "0 1px 0 rgba(0,0,0,0.2)",
                }}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
