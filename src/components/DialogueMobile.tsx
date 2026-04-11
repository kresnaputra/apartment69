type Choice = { id: string; label: string; next: string };

type DialogueMobileProps = {
  speaker: string | null;
  visibleLine: string;
  line: string;
  isTyping: boolean;
  isSceneTransitioning: boolean;
  choices: Choice[];
  onChoose: (next: string) => void;
  onSuppressAdvance: () => void;
};

export const DialogueMobile = ({
  speaker,
  visibleLine,
  line,
  isTyping,
  isSceneTransitioning,
  choices,
  onChoose,
  onSuppressAdvance,
}: DialogueMobileProps) => (
  <div
    className={`absolute left-0 right-0 bottom-2 z-30 w-[58vw] mx-auto pointer-events-none transition-opacity duration-[160ms] ${isSceneTransitioning ? "opacity-0" : "opacity-100"}`}
  >
    <div className="w-full rounded-2xl px-4 pt-3 pb-2.5 min-h-[7rem]"
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
          {choices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              className="w-full max-w-[26rem] mx-auto rounded-full border border-white/18 bg-[rgba(10,8,13,0.56)] text-white/90 text-[0.78rem] py-2 px-4 backdrop-blur-sm transition-all duration-[160ms] hover:-translate-y-px hover:bg-[rgba(255,214,173,0.18)] hover:border-[rgba(255,214,173,0.3)] active:translate-y-0"
              onClick={() => {
                onSuppressAdvance();
                onChoose(choice.next);
              }}
            >
              {choice.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2 mt-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/80 pointer-events-auto">
            {["Log", "Auto", "Skip", "Save", "Load", "Config", "Quit"].map((label) => (
              <span key={label} className="text-[0.65rem] tracking-[0.02em]">{label}</span>
            ))}
          </div>
          <span className="text-[0.62rem] tracking-[0.02em] text-[#ccb9a9] shrink-0">
            {isTyping ? "Tap to skip" : "Tap to continue"}
          </span>
        </div>
      )}
    </div>
  </div>
);
