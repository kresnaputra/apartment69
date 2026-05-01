import { useState } from "react";
import { getDateLocale, resolveText, type LanguageCode, type LocalizedText } from "@/lib/i18n";
import type { SaveSlot } from "@/lib/runtime/saveSlots";
import { SLOT_COUNT } from "@/lib/runtime/saveSlots";

type SaveSlotOverlayProps = {
  emptyLabel: LocalizedText;
  language: LanguageCode;
  mode: "save" | "load";
  modeLabel: string;
  slotLabel: string;
  slots: (SaveSlot | null)[];
  unknownSceneLabel: LocalizedText;
  onSelect: (index: number) => void;
  onClose: () => void;
};

const formatDate = (ts: number, language: LanguageCode) => {
  const d = new Date(ts);
  const locale = getDateLocale(language);
  return d.toLocaleDateString(locale, { day: "2-digit", month: "short", year: "numeric" })
    + " " + d.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
};

export const SaveSlotOverlay = ({
  emptyLabel,
  language,
  mode,
  modeLabel,
  slotLabel,
  slots,
  unknownSceneLabel,
  onSelect,
  onClose,
}: SaveSlotOverlayProps) => {
  const [exiting, setExiting] = useState(false);

  const handleClose = () => {
    setExiting(true);
    window.setTimeout(onClose, 280);
  };

  const handleSelect = (index: number) => {
    setExiting(true);
    window.setTimeout(() => onSelect(index), 280);
  };

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
          <p className="m-0 text-white/38 text-[0.65rem] tracking-[0.22em] uppercase">{modeLabel}</p>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full border border-white/12 px-3.5 py-1.5 text-[0.7rem] tracking-[0.1em] uppercase text-white/55 transition-colors hover:text-white hover:border-white/30"
          >
            ✕
          </button>
        </div>

        {/* Slots */}
        <div className="flex-1 overflow-y-auto px-7 py-6 flex flex-col gap-3">
          {Array.from({ length: SLOT_COUNT }, (_, i) => {
            const slot = slots[i] ?? null;
            const isEmpty = slot === null;
            const disabled = mode === "load" && isEmpty;

            return (
              <button
                key={i}
                type="button"
                disabled={disabled}
                onClick={() => handleSelect(i)}
                className={[
                  "w-full text-left rounded-xl px-4 py-3.5 border transition-all duration-150",
                  disabled
                    ? "border-white/6 opacity-30 cursor-default"
                    : "border-white/10 hover:border-[rgba(255,214,173,0.3)] hover:bg-[rgba(255,214,173,0.05)] cursor-pointer",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-white/38 text-[0.6rem] tracking-[0.16em] uppercase">
                    {slotLabel} {i + 1}
                  </span>
                  {!isEmpty && (
                    <span className="text-white/28 text-[0.58rem]">{formatDate(slot.savedAt, language)}</span>
                  )}
                </div>

                {isEmpty ? (
                  <p className="m-0 text-white/22 text-[0.7rem] italic">
                    {resolveText(emptyLabel, language)}
                  </p>
                ) : (
                  <>
                    <p className="m-0 text-white/75 text-[0.78rem] font-medium mb-1 truncate">
                      {slot.location || resolveText(unknownSceneLabel, language)}
                    </p>
                    {slot.speaker && (
                      <p className="m-0 text-[#ffd6ad] text-[0.65rem] italic mb-1">{slot.speaker}</p>
                    )}
                    <p className="m-0 text-white/42 text-[0.68rem] leading-snug line-clamp-2">
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
};
