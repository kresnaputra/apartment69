type Choice = { id: string; label: string; next: string; disabled?: boolean };
type ControlLabels = {
  auto: string;
  config: string;
  exit: string;
  log: string;
  save: string;
  skip: string;
};

type DialogueMobileProps = {
  controlLabels: ControlLabels;
  continueHint: string;
  speaker: string | null;
  finishHint: string;
  visibleLine: string;
  line: string;
  isTyping: boolean;
  isSceneTransitioning: boolean;
  choices: Choice[];
  focusedChoiceIndex?: number;
  focusedControlIndex?: number;
  onChoose: (next: string) => void;
  onSuppressAdvance: () => void;
  isAuto?: boolean;
  onAuto?: () => void;
  onSkip?: () => void;
  onLog?: () => void;
  onSave?: () => void;
  onConfig?: () => void;
  onExit?: () => void;
};

export const DialogueMobile = ({
  controlLabels,
  continueHint,
  speaker,
  finishHint,
  visibleLine,
  line,
  isTyping,
  isSceneTransitioning,
  choices,
  focusedChoiceIndex,
  focusedControlIndex = -1,
  onChoose,
  onSuppressAdvance,
  isAuto = false,
  onAuto,
  onSkip,
  onLog,
  onSave,
  onConfig,
  onExit,
}: DialogueMobileProps) => (
  <div
    className={`absolute left-0 right-0 bottom-2 z-30 pointer-events-none transition-opacity duration-[160ms] ${isSceneTransitioning ? "opacity-0" : "opacity-100"}`}
  >
    <div className="w-[58vw] mx-auto rounded-2xl px-4 pt-3 pb-2.5 min-h-[7rem]"
      style={{ background: "linear-gradient(180deg,rgba(9,10,16,0.55),rgba(5,6,12,0.1))", textAlign: "center" }}
    >
      {speaker ? (
        <span className="inline-block mb-1.5 text-[#d2a456] text-[0.78rem] font-medium italic tracking-[0.02em]"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.22)" }}
        >
          {speaker}
        </span>
      ) : null}

      <p className="m-0 min-h-[3rem] text-[0.82rem] leading-[1.5] text-white/95 whitespace-pre-wrap"
        style={{ textShadow: "0 1px 0 rgba(0,0,0,0.14), 0 3px 10px rgba(0,0,0,0.24)" }}
      >
        {line ? visibleLine : ""}
      </p>

      {choices.length > 0 ? (
        <div
          className="grid gap-1.5 mt-2 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {choices.map((choice, idx) => {
            const isFocused = focusedChoiceIndex === idx;
            return (
              <button
                key={choice.id}
                type="button"
                disabled={choice.disabled}
                className={[
                  "w-full max-w-[26rem] mx-auto rounded-full border text-[0.78rem] py-2 px-4 backdrop-blur-sm transition-all duration-[160ms] active:translate-y-0",
                  choice.disabled
                    ? "opacity-35 cursor-not-allowed pointer-events-none border-white/18 bg-[rgba(10,8,13,0.56)] text-white/90"
                    : isFocused
                    ? "-translate-y-px bg-[rgba(255,214,173,0.22)] border-[rgba(255,214,173,0.5)] text-[#ffd6a0]"
                    : "border-white/18 bg-[rgba(10,8,13,0.56)] text-white/90 hover:-translate-y-px hover:bg-[rgba(255,214,173,0.18)] hover:border-[rgba(255,214,173,0.3)]",
                ].join(" ")}
                onClick={() => {
                  onSuppressAdvance();
                  onChoose(choice.next);
                }}
              >
                {choice.label}
              </button>
            );
          })}
        </div>
      ) : (
        <p className="mt-1.5 m-0 text-[0.62rem] tracking-[0.02em] text-[#ccb9a9]">
          {isTyping ? finishHint : continueHint}
        </p>
      )}
    </div>

    {choices.length === 0 ? (
      <div
        className="flex justify-center gap-1 flex-wrap mt-1.5 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {[
          { label: controlLabels.auto, handler: onAuto, active: isAuto },
          { label: controlLabels.skip, handler: onSkip, active: false },
          { label: controlLabels.log, handler: onLog, active: false },
          { label: controlLabels.save, handler: onSave, active: false },
          { label: controlLabels.config, handler: onConfig, active: false },
          { label: controlLabels.exit, handler: onExit, active: false },
        ].map(({ label, handler, active }, idx) => {
          const isFocused = focusedControlIndex === idx;
          return (
          <button
            key={label}
            type="button"
            onClick={handler}
            className={[
              "rounded px-2 py-1 text-[0.6rem] tracking-[0.02em] border backdrop-blur-sm transition-all duration-150 active:scale-95",
              active
                ? "text-[#d2a456] border-[rgba(210,164,86,0.4)] bg-[rgba(210,164,86,0.12)]"
                : isFocused
                ? "text-white border-white/50 bg-[rgba(255,255,255,0.14)] scale-105"
                : "text-white/65 border-white/15 bg-[rgba(10,8,13,0.45)] hover:text-white/90 hover:border-white/30",
            ].join(" ")}
          >
            {label}
          </button>
          );
        })}
      </div>
    ) : null}
  </div>
);
