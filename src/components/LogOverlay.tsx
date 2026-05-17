import { useEffect, useRef, useState } from "react";
import { resolveText, type LanguageCode } from "@/lib/i18n";
import type { DialogueEntry } from "@/types/novel";

type LogOverlayProps = {
  history: DialogueEntry[];
  emptyLabel: string;
  title: string;
  language: LanguageCode;
  onClose: () => void;
};

export const LogOverlay = ({ history, emptyLabel, title, language, onClose }: LogOverlayProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, []);

  const handleClose = () => {
    setExiting(true);
    window.setTimeout(onClose, 280);
  };

  return (
    <div
      className="fixed inset-0 z-[120] pointer-events-auto"
      onClick={handleClose}
    >
      <div
        className="absolute inset-y-0 right-0 flex flex-col w-[min(30rem,92vw)] border-l border-white/10"
        style={{
          background: "rgba(4, 5, 10, 0.82)",
          backdropFilter: "blur(32px)",
          animation: exiting
            ? "vn-slide-to-right 260ms cubic-bezier(0.4,0,1,1) both"
            : "vn-slide-from-right 280ms cubic-bezier(0.22,1,0.36,1) both",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-7 pt-8 pb-5 border-b border-white/10 shrink-0"
        >
          <span className="text-white/38 text-[0.65rem] tracking-[0.22em] uppercase">{title}</span>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full border border-white/12 px-3.5 py-1.5 text-[0.7rem] tracking-[0.1em] uppercase text-white/55 transition-colors hover:text-white hover:border-white/30"
          >
            Tutup
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-4">
          {history.length === 0 ? (
            <p className="text-white/30 text-[0.72rem] text-center py-4">{emptyLabel}</p>
          ) : (
            history.map((entry) => (
              <div
                key={entry.id}
                className="text-left rounded-xl px-4 py-3"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {entry.speaker && (
                  <div className="text-[#d2a456] text-[0.82rem] font-medium italic mb-1">
                    {entry.speaker}
                  </div>
                )}
                <p className="m-0 text-white/75 text-[0.84rem] leading-[1.65]">{resolveText(entry.text, language)}</p>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};
