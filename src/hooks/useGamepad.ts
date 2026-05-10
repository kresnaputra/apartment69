import { useEffect } from "react";

const AXIS_THRESHOLD = 0.5;
const REPEAT_DELAY_MS = 350;
const REPEAT_INTERVAL_MS = 130;

function fireKey(key: string) {
  window.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }));
}

export function useGamepad() {
  useEffect(() => {
    type HeldState = { firstAt: number; lastRepeatAt: number };
    const held = new Map<string, HeldState>();

    function processKey(key: string, isPressed: boolean, now: number) {
      if (isPressed) {
        const state = held.get(key);
        if (!state) {
          held.set(key, { firstAt: now, lastRepeatAt: now });
          fireKey(key);
        } else if (now - state.firstAt > REPEAT_DELAY_MS) {
          if (now - state.lastRepeatAt > REPEAT_INTERVAL_MS) {
            state.lastRepeatAt = now;
            fireKey(key);
          }
        }
      } else {
        held.delete(key);
      }
    }

    let rafId: number;

    function poll() {
      const now = Date.now();
      const gamepads = navigator.getGamepads();
      for (const gp of gamepads) {
        if (!gp) continue;

        // A=0 confirm, B=1 back, X=2 also confirm (some layouts), Start=9
        processKey("Enter",  gp.buttons[0]?.pressed || gp.buttons[2]?.pressed || false, now);
        processKey("Escape", gp.buttons[1]?.pressed || false, now);

        // D-pad buttons (12-15) OR left analog stick OR HAT axis (6/7)
        const axH = gp.axes[6] ?? 0;
        const axV = gp.axes[7] ?? 0;
        const stickH = gp.axes[0] ?? 0;
        const stickV = gp.axes[1] ?? 0;

        processKey("ArrowUp",    gp.buttons[12]?.pressed || axV < -AXIS_THRESHOLD || stickV < -AXIS_THRESHOLD, now);
        processKey("ArrowDown",  gp.buttons[13]?.pressed || axV > AXIS_THRESHOLD  || stickV > AXIS_THRESHOLD,  now);
        processKey("ArrowLeft",  gp.buttons[14]?.pressed || axH < -AXIS_THRESHOLD || stickH < -AXIS_THRESHOLD, now);
        processKey("ArrowRight", gp.buttons[15]?.pressed || axH > AXIS_THRESHOLD  || stickH > AXIS_THRESHOLD,  now);
      }
      rafId = requestAnimationFrame(poll);
    }

    rafId = requestAnimationFrame(poll);
    return () => cancelAnimationFrame(rafId);
  }, []);
}
