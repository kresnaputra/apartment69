import type {} from "bun";
import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { GalleryOverlay } from "./src/components/GalleryOverlay";
import { useNovelStore } from "./src/store/novelStore";

const galleryProps = {
  closeLabel: "Tutup",
  emptyLabel: "Terkunci",
  lockedLabel: "Terkunci",
  onClose: () => {},
  onOpenScene: (_label: string) => {},
  title: "Galeri",
};

describe("Sarah gallery scene", () => {
  test("shows the provided thumbnail and locks it until the car cutscene is reached", () => {
    const locked = renderToStaticMarkup(createElement(GalleryOverlay, { ...galleryProps, flags: {} }));
    expect(locked).toContain("Sarah");
    expect(locked).toContain("scene-sarah-1.png");
    expect(locked).toContain('alt="Scene Sarah 1"');

    useNovelStore.getState().startFromLabel("day4-sara-car-invite");
    for (let step = 0; step < 10 && !useNovelStore.getState().activeCutScene; step += 1) {
      useNovelStore.getState().advance();
    }
    const state = useNovelStore.getState();
    expect(state.activeCutScene?.src).toContain("sara-park-1.mp4");
    expect(state.flags.gallerySceneSarah1Unlocked).toBe(true);

    const unlocked = renderToStaticMarkup(createElement(GalleryOverlay, {
      ...galleryProps,
      flags: state.flags,
    }));
    expect(unlocked).toContain("Scene Sarah 1");
    expect(unlocked).toContain("1 / 10");
  });

  test("replays from the first car video and returns to the gallery without unlocking Maya", () => {
    useNovelStore.getState().startFromLabel("day4-sara-gallery", { galleryMode: true });
    const first = useNovelStore.getState();
    expect(first.activeCutScene?.src).toContain("sara-park-1.mp4");
    expect(first.activeBackgroundMusic?.src).toContain("day3-sarah.mp3");

    for (let step = 0; step < 120; step += 1) {
      const state = useNovelStore.getState();
      if (state.isEnded) break;
      if (state.activeCutScene?.choices) {
        state.choose("day4-sara-too-long");
      } else if (state.activeCutScene) {
        state.completeCutScene();
      } else if (state.choices.length > 0) {
        state.choose("day4-sara-stay");
      } else {
        state.advance();
      }
    }
    const final = useNovelStore.getState();
    expect(final.currentLabel).toBe("gallery-return");
    expect(final.isEnded).toBe(true);
    expect(final.flags.gallerySceneMaya1Unlocked).toBeUndefined();
  });
});
