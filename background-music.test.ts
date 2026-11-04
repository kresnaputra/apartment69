import type {} from "bun";
import { describe, expect, test } from "bun:test";
import { BackgroundMusic } from "./src/lib/runtime/backgroundMusic";

describe("Background music transitions", () => {
  test("finishes the requested fade-out before starting the next track", async () => {
    const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
    const originalAudio = Object.getOwnPropertyDescriptor(globalThis, "Audio");
    const intervals = new Map<number, () => void>();
    const tracks: FakeAudio[] = [];
    let nextTimer = 0;

    class FakeAudio {
      volume = 0;
      loop = false;
      preload = "";
      paused = true;
      currentTime = 0;
      src: string;

      constructor(src: string) {
        this.src = src;
        tracks.push(this);
      }

      play() {
        this.paused = false;
        return Promise.resolve();
      }

      pause() {
        this.paused = true;
      }

      load() {}
    }

    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        setInterval: (callback: () => void) => {
          intervals.set(++nextTimer, callback);
          return nextTimer;
        },
        clearInterval: (id: number) => intervals.delete(id),
      },
    });
    Object.defineProperty(globalThis, "Audio", { configurable: true, value: FakeAudio });

    const music = new BackgroundMusic();
    const tick = () => {
      for (const callback of [...intervals.values()]) callback();
    };
    try {
      music.play("day4.mp3");
      await Promise.resolve();
      for (let i = 0; i < 16; i++) tick();
      expect(tracks[0].volume).toBe(0.5);

      music.play("cutscene.mp3", 0.5, 1500);
      for (let i = 0; i < 46; i++) tick();
      expect(tracks).toHaveLength(1);
      expect(tracks[0].paused).toBe(false);
      expect(tracks[0].volume).toBeGreaterThan(0);

      tick();
      expect(tracks[0].paused).toBe(true);
      expect(tracks).toHaveLength(2);
      expect(tracks[1].src).toBe("cutscene.mp3");
      await Promise.resolve();
      tick();
      expect(tracks[1].volume).toBeGreaterThan(0);
    } finally {
      music.dispose();
      if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow);
      else Reflect.deleteProperty(globalThis, "window");
      if (originalAudio) Object.defineProperty(globalThis, "Audio", originalAudio);
      else Reflect.deleteProperty(globalThis, "Audio");
    }
  });
});
