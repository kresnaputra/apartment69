import { useEffect } from "react";
import { REVIEW_SCENE_GROUPS } from "@/lib/runtime/reviewScenes";

type ReviewMenuOverlayProps = {
  onClose: () => void;
  onOpenScene: (label: string) => void;
};

export const ReviewMenuOverlay = ({ onClose, onOpenScene }: ReviewMenuOverlayProps) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[120] flex flex-col pointer-events-auto"
      style={{
        background: "rgba(4,5,8,0.9)",
        backdropFilter: "blur(20px)",
        animation: "vn-opening-fade-in 280ms ease forwards",
      }}
    >
      <div className="flex items-center justify-between gap-4 px-8 pt-7 pb-5 border-b border-white/10 shrink-0">
        <div>
          <p className="m-0 text-[0.82rem] tracking-[0.24em] uppercase text-white/75 font-medium">
            Scene Review
          </p>
          <p className="m-0 mt-1.5 text-[0.65rem] tracking-[0.08em] text-white/35">
            Review build — jump directly to any mature-content scene
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/12 px-3.5 py-1.5 text-[0.7rem] tracking-[0.1em] uppercase text-white/55 transition-colors hover:text-white hover:border-white/30"
        >
          Close
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-7">
        <div className="mx-auto flex max-w-[900px] flex-col gap-6">
          {REVIEW_SCENE_GROUPS.map((group) => (
            <div
              key={group.day}
              className="rounded-[1.6rem] border border-white/8 p-5 sm:p-6"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.006))",
              }}
            >
              <div className="mb-4 flex items-center gap-3">
                <p className="m-0 shrink-0 text-[0.74rem] tracking-[0.2em] uppercase text-white/60 font-medium">
                  {group.day}
                </p>
                <div
                  className="h-px flex-1"
                  style={{ background: "linear-gradient(90deg, rgba(255,214,173,0.35), rgba(255,214,173,0) 85%)" }}
                />
                <span className="shrink-0 text-[0.65rem] tracking-[0.1em] text-white/35 tabular-nums">
                  {group.scenes.length}
                </span>
              </div>
              <div
                className="grid gap-3"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
              >
                {group.scenes.map((scene) => (
                  <button
                    key={scene.label}
                    type="button"
                    onClick={() => {
                      onOpenScene(scene.label);
                      onClose();
                    }}
                    className="rounded-[1.1rem] border border-white/10 px-4 py-3.5 text-left transition-all duration-200 hover:border-[rgba(255,214,173,0.45)] hover:bg-[rgba(255,214,173,0.06)] hover:-translate-y-0.5"
                    style={{
                      background: "linear-gradient(180deg, rgba(18,20,28,0.78), rgba(11,13,18,0.82))",
                    }}
                  >
                    <p className="m-0 text-[0.72rem] tracking-[0.1em] uppercase text-white/75">
                      {scene.title}
                    </p>
                    <p className="m-0 mt-1 text-[0.6rem] tracking-[0.06em] text-white/35 font-mono">
                      {scene.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
