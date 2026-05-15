type NarratorMobileProps = {
  continueHint: string;
  finishHint: string;
  visibleLine: string;
  isTyping: boolean;
  isSceneTransitioning: boolean;
};

export const NarratorMobile = ({
  continueHint,
  finishHint,
  visibleLine,
  isTyping,
  isSceneTransitioning,
}: NarratorMobileProps) => (
  <div
    className={`absolute inset-0 z-30 flex items-center justify-start px-5 pb-10 pt-8 pointer-events-none transition-opacity duration-[160ms] ${isSceneTransitioning ? "opacity-0" : "opacity-100"}`}
  >
    <div className="relative w-[55%] max-w-xs">
      {/* left-side dark fade */}
      <div className="absolute -inset-x-8 -inset-y-6 pointer-events-none -z-10"
        style={{ background: "linear-gradient(90deg,rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.54) 52%,rgba(0,0,0,0.14) 78%,transparent 100%)", filter: "blur(8px)" }}
      />
      <p className="m-0 text-[0.82rem] leading-[1.65] italic text-white/95 whitespace-pre-wrap"
        style={{ textShadow: "0 1px 0 rgba(0,0,0,0.3), 0 4px 14px rgba(0,0,0,0.24)" }}
      >
        {visibleLine}
      </p>
      <p className="mt-2 m-0 text-[0.6rem] tracking-[0.16em] uppercase text-[rgba(232,214,194,0.75)]">
        {isTyping ? finishHint : continueHint}
      </p>
    </div>
  </div>
);
