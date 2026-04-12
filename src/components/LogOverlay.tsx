import { useEffect, useRef } from "react";
import type { DialogueEntry } from "@/types/novel";

type LogOverlayProps = {
  history: DialogueEntry[];
  onClose: () => void;
};

export const LogOverlay = ({ history, onClose }: LogOverlayProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center pointer-events-auto"
      onClick={onClose}
    >
      <div
        className="w-[58vw] max-h-[70vh] mb-4 rounded-2xl overflow-y-auto"
        style={{ background: "rgba(5,6,12,0.94)", backdropFilter: "blur(8px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="sticky top-0 flex items-center justify-between px-4 py-2.5 border-b border-white/10"
          style={{ background: "rgba(5,6,12,0.97)" }}
        >
          <span className="text-white/50 text-[0.62rem] tracking-[0.08em] uppercase">Log</span>
          <button
            type="button"
            onClick={onClose}
            className="text-white/40 text-[0.75rem] leading-none hover:text-white/70 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="px-4 py-3 flex flex-col gap-3">
          {history.length === 0 ? (
            <p className="text-white/30 text-[0.72rem] text-center py-4">Belum ada percakapan.</p>
          ) : (
            history.map((entry) => (
              <div key={entry.id} className="text-left">
                {entry.speaker && (
                  <div className="text-[#d2a456] text-[0.66rem] font-medium italic mb-0.5">
                    {entry.speaker}
                  </div>
                )}
                <p className="m-0 text-white/75 text-[0.74rem] leading-[1.55]">{entry.text}</p>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};
