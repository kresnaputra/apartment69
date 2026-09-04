import { useEffect, useRef, useState } from "react";
import sceneMaya1 from "@/gallery/scene-maya-1.png";
import sceneMaya2 from "@/gallery/scene-maya-2.png";
import sceneMaya3 from "@/gallery/scene-maya-3.png";
import sceneElena1 from "@/gallery/scene-elena-1.png";
import sceneElena2 from "@/gallery/scene-elena-2.png";
import sceneElena3 from "@/gallery/scene-elena-3.png";
import sceneNadia1 from "@/gallery/scene-nadia-1.png";
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
    character: "Maya",
    imageUrl: sceneMaya1,
    label: "Scene Maya 1",
    sceneLabel: "day4-maya-force-rest",
    unlockFlag: "gallerySceneMaya1Unlocked",
  },
  {
    id: "scene-maya-2",
    character: "Maya",
    imageUrl: sceneMaya2,
    label: "Scene Maya 2",
    sceneLabel: "day7-devoted-submission",
    unlockFlag: "gallerySceneMaya2Unlocked",
  },
  {
    id: "scene-maya-3",
    character: "Maya",
    imageUrl: sceneMaya3,
    label: "Scene Maya 3",
    sceneLabel: "day7-eternal-promise",
    unlockFlag: "gallerySceneMaya3Unlocked",
  },
  {
    id: "scene-elena-1",
    character: "Elena",
    imageUrl: sceneElena1,
    label: "Scene Elena 1",
    sceneLabel: "day5-elena-hallway",
    unlockFlag: "gallerySceneElena1Unlocked",
  },
  {
    id: "scene-elena-2",
    character: "Elena",
    imageUrl: sceneElena2,
    label: "Scene Elena 2",
    sceneLabel: "day7-elena-good-ending",
    unlockFlag: "gallerySceneElena2Unlocked",
  },
  {
    id: "scene-elena-3",
    character: "Elena",
    imageUrl: sceneElena3,
    label: "Scene Elena 3",
    sceneLabel: "day7-elena-bad-ending",
    unlockFlag: "gallerySceneElena3Unlocked",
  },
  {
    id: "scene-nadia-1",
    character: "Nadia",
    imageUrl: sceneNadia1,
    label: "Scene Nadia 1",
    sceneLabel: "day4-nadia-night-help",
    unlockFlag: "gallerySceneNadia1Unlocked",
  },
] as const;

const GALLERY_SECTIONS = ["Maya", "Elena", "Nadia"] as const;

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

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

  const unlockedCount = GALLERY_ITEMS.filter(item => Boolean(flags[item.unlockFlag])).length;

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
        background:
          "radial-gradient(120% 55% at 50% -8%, rgba(255,183,120,0.07), transparent 60%), rgba(4,5,8,0.82)",
        backdropFilter: "blur(20px)",
        animation: exiting
          ? "vn-opening-fade-out 280ms ease forwards"
          : "vn-opening-fade-in 280ms ease forwards",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 px-8 pt-7 pb-5 border-b border-white/10 shrink-0">
        <div>
          <p className="m-0 text-[0.82rem] tracking-[0.24em] uppercase text-white/75 font-medium">{title}</p>
          <div className="mt-2.5 flex items-center gap-2.5">
            <div className="h-px w-9" style={{ background: "rgba(255,214,173,0.45)" }} />
            <span className="text-[0.65rem] tracking-[0.1em] text-white/35 tabular-nums">
              {unlockedCount} / {GALLERY_ITEMS.length}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="rounded-full border border-white/12 px-3.5 py-1.5 text-[0.7rem] tracking-[0.1em] uppercase text-white/55 transition-colors hover:text-white hover:border-white/30"
        >
          {closeLabel}
        </button>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto px-8 py-7">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6">
          {GALLERY_SECTIONS.map((section) => {
            const sectionItems = GALLERY_ITEMS.filter(item => item.character === section);
            const sectionUnlocked = sectionItems.filter(item => Boolean(flags[item.unlockFlag])).length;
            return (
              <div
                key={section}
                className="rounded-[1.6rem] border border-white/8 p-5 sm:p-6"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.006))",
                }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <p className="m-0 shrink-0 text-[0.74rem] tracking-[0.2em] uppercase text-white/60 font-medium">
                    {section}
                  </p>
                  <div
                    className="h-px flex-1"
                    style={{ background: "linear-gradient(90deg, rgba(255,214,173,0.35), rgba(255,214,173,0) 85%)" }}
                  />
                  <span className="shrink-0 text-[0.65rem] tracking-[0.1em] text-white/35 tabular-nums">
                    {sectionUnlocked} / {sectionItems.length}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {sectionItems.map((item, itemIdx) => (
                    (() => {
                      const isUnlocked = Boolean(flags[item.unlockFlag]);
                      const unlockedItems = GALLERY_ITEMS.filter(i => Boolean(flags[i.unlockFlag]));
                      const unlockedIdx = unlockedItems.indexOf(item);
                      const isFocused = isUnlocked && unlockedIdx === focusedIndex;
                      return (
                    <div
                      key={item.id}
                      className="group rounded-[1.4rem] border overflow-hidden transition-all duration-200"
                      style={{
                        background: "linear-gradient(180deg, rgba(18,20,28,0.78), rgba(11,13,18,0.82))",
                        borderColor: isFocused
                          ? "rgba(255,214,173,0.55)"
                          : isUnlocked
                            ? "rgba(255,255,255,0.10)"
                            : "rgba(255,255,255,0.06)",
                        boxShadow: isFocused
                          ? "0 0 0 2px rgba(255,214,173,0.22), 0 10px 30px -10px rgba(255,160,70,0.35)"
                          : "none",
                        transform: isFocused ? "translateY(-2px)" : "translateY(0)",
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
                        className="group/btn block w-full text-left disabled:cursor-not-allowed"
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
                          className={`h-full w-full object-cover transition-transform duration-300 ${isUnlocked ? "group-hover/btn:scale-[1.05]" : ""}`}
                          style={{
                            filter: isUnlocked ? "none" : "blur(18px)",
                            transform: isUnlocked ? "scale(1)" : "scale(1.1)",
                          }}
                        />
                        {isUnlocked ? (
                          <>
                            <span
                              className="absolute left-2.5 top-2.5 leading-none text-[#ffd6ad]/85"
                              style={{
                                fontFamily: '"Mr De Haviland", cursive',
                                fontSize: "1.9rem",
                                textShadow: "0 2px 14px rgba(255,180,90,0.45)",
                              }}
                            >
                              {String(itemIdx + 1).padStart(2, "0")}
                            </span>
                            <div
                              className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover/btn:opacity-100"
                              style={{ background: "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.4))" }}
                            />
                          </>
                        ) : (
                          <div
                            className="absolute inset-0 flex flex-col items-center justify-center gap-2.5"
                            style={{ background: "radial-gradient(circle at center, rgba(0,0,0,0.08), rgba(0,0,0,0.4))" }}
                          >
                            <span className="text-[#ffd6ad]/60">
                              <LockIcon />
                            </span>
                            <span className="rounded-full border border-[#ffd6ad]/20 bg-black/55 px-4 py-2 text-[0.68rem] tracking-[0.18em] uppercase text-[#ffd6ad]/70">
                              {lockedLabel}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-center gap-1.5 border-t border-white/6 px-3 py-3">
                        {isUnlocked ? <span className="h-1 w-1 rounded-full bg-[#ffd6ad]/70" /> : null}
                        <p
                          className="m-0 text-[0.68rem] tracking-[0.12em] uppercase text-center"
                          style={{ color: isUnlocked ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.38)" }}
                        >
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
            );
          })}
        </div>
      </div>
    </div>
  );
};
