import { useEffect, useRef, useState } from "react";
import sceneMaya1 from "@/gallery/scene-maya-1.png";
import sceneMaya2 from "@/gallery/scene-maya-2.png";
import sceneMaya3 from "@/gallery/scene-maya-3.png";
import sceneElena1 from "@/gallery/scene-elena-1.png";
import type { FlagMap } from "@/types/novel";

type GalleryOverlayProps = {
  closeLabel: string;
  emptyLabel: string;
  flags: FlagMap;
  lockedLabel: string;
  onClose: () => void;
  onOpenScene: (label: string) => void;
  title: string;
};

const GALLERY_ITEMS = [
  {
    id: "scene-maya-1",
    imageUrl: sceneMaya1,
    label: "Scene Maya 1",
    sceneLabel: "day4-maya-force-rest",
    unlockFlag: "gallerySceneMaya1Unlocked",
  },
  {
    id: "scene-maya-2",
    imageUrl: sceneMaya2,
    label: "Scene Maya 2",
    sceneLabel: "day7-devoted-submission",
    unlockFlag: "gallerySceneMaya2Unlocked",
  },
  {
    id: "scene-maya-3",
    imageUrl: sceneMaya3,
    label: "Scene Maya 3",
    sceneLabel: "day7-eternal-promise",
    unlockFlag: "gallerySceneMaya3Unlocked",
  },
  {
    id: "scene-elena-1",
    imageUrl: sceneElena1,
    label: "Scene Elena 1",
    sceneLabel: "day5-elena-hallway",
    unlockFlag: "gallerySceneElena1Unlocked",
  },
] as const;

export const GalleryOverlay = ({
  closeLabel,
  emptyLabel,
  flags,
  lockedLabel,
  onClose,
  onOpenScene,
  title,
}: GalleryOverlayProps) => {
  const [exiting, setExiting] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const focusedIndexRef = useRef(0);
  focusedIndexRef.current = focusedIndex;

  const handleClose = () => {
    setExiting(true);
    window.setTimeout(onClose, 280);
  };
  const handleCloseRef = useRef(handleClose);
  handleCloseRef.current = handleClose;

  useEffect(() => {
    const unlockedItems = GALLERY_ITEMS.filter(item => Boolean(flags[item.unlockFlag]));
    const totalNavigable = unlockedItems.length;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { handleCloseRef.current(); return; }
      if (totalNavigable === 0) return;
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex(prev => (prev - 1 + totalNavigable) % totalNavigable);
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex(prev => (prev + 1) % totalNavigable);
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const item = unlockedItems[focusedIndexRef.current];
        if (item) { onOpenScene(item.sceneLabel); onClose(); }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flags]);

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
      <div className="flex items-center justify-between gap-4 px-8 py-5 border-b border-white/10 shrink-0">
        <div>
          <p className="m-0 text-[0.72rem] tracking-[0.18em] uppercase text-white/35">{title}</p>
        </div>
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
          {GALLERY_ITEMS.map((item) => (
            (() => {
              const isUnlocked = Boolean(flags[item.unlockFlag]);
              const unlockedItems = GALLERY_ITEMS.filter(i => Boolean(flags[i.unlockFlag]));
              const unlockedIdx = unlockedItems.indexOf(item);
              const isFocused = isUnlocked && unlockedIdx === focusedIndex;
              return (
            <div
              key={item.id}
              className="rounded-[1.4rem] border overflow-hidden transition-all duration-150"
              style={{
                background: "linear-gradient(180deg, rgba(18,20,28,0.78), rgba(11,13,18,0.82))",
                borderColor: isFocused ? "rgba(255,214,173,0.5)" : "rgba(255,255,255,0.10)",
                boxShadow: isFocused ? "0 0 0 2px rgba(255,214,173,0.2)" : "none",
              }}
            >
              <button
                type="button"
                disabled={!isUnlocked}
                onClick={() => {
                  if (!isUnlocked) return;
                  onOpenScene(item.sceneLabel);
                  onClose();
                }}
                className="block w-full text-left disabled:cursor-not-allowed"
              >
              <div
                className="aspect-square overflow-hidden relative"
                style={{
                  background:
                    "radial-gradient(circle at top, rgba(255,214,173,0.12), transparent 46%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0))",
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.label}
                  className="h-full w-full object-cover"
                  style={{
                    filter: isUnlocked ? "none" : "blur(16px)",
                    transform: isUnlocked ? "scale(1)" : "scale(1.08)",
                  }}
                />
                {!isUnlocked ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <span className="rounded-full border border-[#ffd6ad]/20 bg-black/55 px-4 py-2 text-[0.68rem] tracking-[0.18em] uppercase text-[#ffd6ad]/70">
                      {lockedLabel}
                    </span>
                  </div>
                ) : null}
              </div>
              <div className="px-3 py-3 border-t border-white/6">
                <p className="m-0 text-[0.68rem] tracking-[0.12em] uppercase text-center" style={{ color: isUnlocked ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.38)" }}>
                  {isUnlocked ? item.label : emptyLabel}
                </p>
              </div>
              </button>
            </div>
              );
            })()
          ))}
        </div>
      </div>
    </div>
  );
};
