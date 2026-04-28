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
}: GalleryOverlayProps) => (
  <div
    className="fixed inset-0 z-[120] flex items-center justify-center pointer-events-auto px-4 py-6"
    style={{ background: "rgba(0,0,0,0.56)" }}
    onClick={onClose}
  >
    <div
      className="w-full max-w-5xl rounded-[2rem] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.42)] overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(10,12,18,0.97), rgba(7,9,14,0.95))",
        backdropFilter: "blur(10px)",
      }}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-white/10">
        <div>
          <p className="m-0 text-white/40 text-[0.68rem] tracking-[0.18em] uppercase">Gallery</p>
          <h2 className="m-0 text-white/92 text-[1.08rem] font-medium">{title}</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/12 px-3 py-1.5 text-[0.72rem] text-white/70 transition-colors hover:text-white hover:border-white/30"
        >
          {closeLabel}
        </button>
      </div>

      <div className="px-5 py-5 sm:px-6 sm:py-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4">
          {PLACEHOLDER_ITEMS.map((item) => (
            <div
              key={item}
              className="rounded-[1.4rem] border border-white/10 overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(18,20,28,0.92), rgba(11,13,18,0.94))",
              }}
            >
              <div
                className="aspect-[4/5] flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(circle at top, rgba(210,164,86,0.14), transparent 46%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0))",
                }}
              >
                <div
                  className="h-[62%] w-[72%] rounded-[1.1rem] border border-dashed border-[#d2a456]/35 flex items-center justify-center"
                  style={{ background: "rgba(210,164,86,0.04)" }}
                >
                  <span className="text-[#d2a456]/45 text-[0.9rem] sm:text-[1rem]">#{item}</span>
                </div>
              </div>
              <div className="px-3 py-3 border-t border-white/6">
                <p className="m-0 text-white/42 text-[0.72rem] tracking-[0.12em] uppercase text-center">
                  {emptyLabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
