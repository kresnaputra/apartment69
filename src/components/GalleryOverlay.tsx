import { useState } from "react";

type GalleryOverlayProps = {
  closeLabel: string;
  emptyLabel: string;
  onClose: () => void;
  title: string;
};

const PLACEHOLDER_ITEMS = Array.from({ length: 8 }, (_, index) => index + 1);

export const GalleryOverlay = ({
  closeLabel,
  emptyLabel,
  onClose,
  title,
}: GalleryOverlayProps) => {
  const [exiting, setExiting] = useState(false);

  const handleClose = () => {
    setExiting(true);
    window.setTimeout(onClose, 280);
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex flex-col pointer-events-auto"
      style={{
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(18px)",
        animation: exiting
          ? "vn-opening-fade-out 280ms ease forwards"
          : "vn-opening-fade-in 280ms ease forwards",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-end gap-4 px-8 py-5 border-b border-white/10 shrink-0">
        <button
          type="button"
          onClick={handleClose}
          className="rounded-full border border-white/12 px-3.5 py-1.5 text-[0.7rem] tracking-[0.1em] uppercase text-white/55 transition-colors hover:text-white hover:border-white/30"
        >
          {closeLabel}
        </button>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {PLACEHOLDER_ITEMS.map((item) => (
            <div
              key={item}
              className="rounded-[1.4rem] border border-white/10 overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(18,20,28,0.72), rgba(11,13,18,0.74))",
              }}
            >
              <div
                className="aspect-[4/5] flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(circle at top, rgba(255,214,173,0.12), transparent 46%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0))",
                }}
              >
                <div
                  className="h-[62%] w-[72%] rounded-[1.1rem] border border-dashed border-[#ffd6ad]/30 flex items-center justify-center"
                  style={{ background: "rgba(255,214,173,0.03)" }}
                >
                  <span className="text-[#ffd6ad]/40 text-[0.9rem] sm:text-[1rem]">#{item}</span>
                </div>
              </div>
              <div className="px-3 py-3 border-t border-white/6">
                <p className="m-0 text-white/38 text-[0.68rem] tracking-[0.12em] uppercase text-center">
                  {emptyLabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
