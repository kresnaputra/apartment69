import type { SaveSlot } from "@/lib/runtime/saveSlots";
import { SLOT_COUNT } from "@/lib/runtime/saveSlots";

type SaveSlotOverlayProps = {
  mode: "save" | "load";
  slots: (SaveSlot | null)[];
  onSelect: (index: number) => void;
  onClose: () => void;
};

const formatDate = (ts: number) => {
  const d = new Date(ts);
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })
    + " " + d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
};

export const SaveSlotOverlay = ({ mode, slots, onSelect, onClose }: SaveSlotOverlayProps) => (
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
        <span className="text-white/50 text-[0.62rem] tracking-[0.08em] uppercase">
          {mode === "save" ? "Save" : "Load"}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-white/40 text-[0.75rem] leading-none hover:text-white/70 transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="px-4 py-3 flex flex-col gap-2">
        {Array.from({ length: SLOT_COUNT }, (_, i) => {
          const slot = slots[i] ?? null;
          const isEmpty = slot === null;
          const disabled = mode === "load" && isEmpty;

          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(i)}
              className={[
                "w-full text-left rounded-xl px-3 py-2.5 border transition-all duration-150",
                disabled
                  ? "border-white/8 opacity-35 cursor-default"
                  : "border-white/12 hover:border-white/25 hover:bg-white/5 active:scale-[0.99] cursor-pointer",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-white/40 text-[0.58rem] tracking-[0.06em] uppercase">
                  Slot {i + 1}
                </span>
                {!isEmpty && (
                  <span className="text-white/30 text-[0.56rem]">{formatDate(slot.savedAt)}</span>
                )}
              </div>

              {isEmpty ? (
                <p className="m-0 text-white/25 text-[0.68rem] italic">— Empty —</p>
              ) : (
                <>
                  <p className="m-0 text-white/70 text-[0.72rem] font-medium mb-0.5 truncate">
                    {slot.location || "Unknown Scene"}
                  </p>
                  {slot.speaker && (
                    <p className="m-0 text-[#d2a456] text-[0.62rem] italic mb-0.5">{slot.speaker}</p>
                  )}
                  <p className="m-0 text-white/45 text-[0.65rem] leading-snug line-clamp-2">
                    {slot.preview || "…"}
                  </p>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  </div>
);
