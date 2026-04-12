type ConfigOverlayProps = {
  bgVolume: number;
  onBgVolumeChange: (value: number) => void;
  onClose: () => void;
};

export const ConfigOverlay = ({ bgVolume, onBgVolumeChange, onClose }: ConfigOverlayProps) => (
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
        <span className="text-white/50 text-[0.62rem] tracking-[0.08em] uppercase">Config</span>
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
          <label className="text-white/65 text-[0.7rem] shrink-0 w-[5.5rem]">Volume BGM</label>
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
      </div>
    </div>
  </div>
);
