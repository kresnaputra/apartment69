import type {} from "bun";
import { describe, expect, test } from "bun:test";
import { useNovelStore } from "./src/store/novelStore";
import { demoScript } from "./src/lib/runtime/dialogueScript";
import { resolveText } from "./src/lib/i18n";
import { SARA_PHONE_BASE_RISK, saraPhoneTraces } from "./src/components/minigames/SaraPhoneTraceMinigame";
import type { FlagMap } from "./src/types/novel";

const routeFlags: FlagMap = {
  mayaAcceptedNumber: true,
  saraAcceptedNumber: true,
  day2Completed: true,
  day2MayaCompleted: true,
  day2SaraCompleted: true,
  day3SaraCompleted: true,
  day4SaraCompleted: true,
  day4SelectedCharacter: "sara",
};

const advanceUntil = (stop: () => boolean, limit = 200) => {
  for (let step = 0; step < limit; step += 1) {
    const state = useNovelStore.getState();
    if (stop() || state.isEnded) break;
    if (state.activeCutScene) state.completeCutScene();
    else state.advance();
  }
  return useNovelStore.getState();
};

describe("Sarah Day 5", () => {
  test("Day 4 wrap-up leads into Sarah's Day 5 night", () => {
    useNovelStore.getState().startFromLabel("day4-sara-complate", routeFlags);
    const state = advanceUntil(() => useNovelStore.getState().currentLabel === "day5-sara-start");
    expect(state.currentLabel).toBe("day5-sara-start");
    expect(state.flags.saraRouteClosed).toBeUndefined();
  });

  test("the lobby choice offers going to the hotel or declining", () => {
    useNovelStore.getState().startFromLabel("day5-sara-start", routeFlags);
    const state = advanceUntil(() => useNovelStore.getState().choices.length > 0);
    expect(state.choices.map((choice) => choice.next)).toEqual(["day5-sara-follow", "day5-sara-refuse"]);
  });

  for (const [option, cleared] of [["clearNext", true], ["leaveNext", false]] as const) {
    test(`picking ${option} in the hotel leads to Sarah's ${cleared ? "good" : "bad"} Day 7 ending`, () => {
      useNovelStore.getState().startFromLabel("day5-sara-follow", routeFlags);
      const atPhone = advanceUntil(() => useNovelStore.getState().activeMinigame !== null);
      expect(atPhone.activeMinigame?.id).toBe("sara-phone-traces");
      const next = atPhone.activeMinigame?.options?.[option] as string;
      expect(demoScript.labels[next]).toBeDefined();

      atPhone.choose(next);
      expect(useNovelStore.getState().flags.day5SaraTracesCleared).toBe(cleared);

      const lines: string[] = [];
      const seenLabels = new Set<string>();
      const endingClips: Array<[string, string | undefined]> = [];
      const endingLabel = cleared ? "day7-sara-good-ending" : "day7-sara-bad-ending";
      const final = advanceUntil(() => {
        const state = useNovelStore.getState();
        if (state.line) lines.push(resolveText(state.line, "en"));
        if (state.currentLabel) seenLabels.add(state.currentLabel);
        if (state.currentLabel === endingLabel && state.activeCutScene) {
          const { src, audioSrc } = state.activeCutScene;
          endingClips.push([src.split("/").at(-1) ?? src, audioSrc?.split("/").at(-1)]);
        }
        return state.activeMinigame !== null;
      });
      expect(lines).toContain("So you choose to accept.");
      expect(lines).toContain("Don't say anything.");
      expect(lines).toContain("DAY 5 COMPLETE");
      expect(lines).toContain("The call ends.");
      expect(lines).toContain(cleared ? "So he doesn't suspect anything?" : "Don't contact me again.");
      expect(seenLabels.has("day6-sara-good-path")).toBe(cleared);
      expect(seenLabels.has("day6-sara-bad-path")).toBe(!cleared);
      expect(seenLabels.has("day7-sara-good-ending")).toBe(cleared);
      expect(seenLabels.has("day7-sara-bad-ending")).toBe(!cleared);
      expect(final.flags.day5SaraIntimate).toBe(true);
      expect(final.flags.day5SaraCompleted).toBe(true);
      expect(final.flags.day5SaraTracesCleared).toBe(cleared);
      expect(final.flags.day6SaraCompleted).toBe(true);
      expect(final.flags.day6SaraEnding).toBe(cleared ? "good" : "bad");
      if (cleared) {
        expect(endingClips).toEqual(Array.from({ length: 9 }, (_, index) => {
          const clip = `sarah-good-0${index + 1}-animation`;
          return [`${clip}.mp4`, index === 0 ? undefined : `${clip}-audio.wav`];
        }));
        expect(lines).toContain("GOOD ENDING - SARAH");
        expect(final.flags.saraGoodEndingCompleted).toBe(true);
        expect(final.flags.gallerySceneSarah2Unlocked).toBe(true);
        expect(final.flags.saraRouteClosed).toBeUndefined();
        expect(final.activeMinigame).toBeNull();
        expect(final.isEnded).toBe(true);
      } else {
        expect(endingClips).toEqual([1, 2, 3, 4, 5, 6].map((number) => {
          const clip = `sarah-bad-0${number}-animation`;
          return [`${clip}.mp4`, `${clip}-audio.wav`];
        }));
        expect(lines).toContain("Don't come to the twelfth floor.");
        expect(lines).toContain("BAD ENDING - SARAH");
        expect(final.flags.saraBadEndingCompleted).toBe(true);
        expect(final.flags.gallerySceneSarah3Unlocked).toBe(true);
        expect(final.flags.saraGoodEndingCompleted).toBeUndefined();
        expect(final.flags.saraRouteClosed).toBe(true);
        expect(final.activeMinigame?.id).toBe("smartphone-contacts");
      }
    });
  }

  test("gallery mode returns after the hotel night instead of closing the route", () => {
    useNovelStore.getState().startFromLabel("day5-sara-offer", { galleryMode: true });
    const seen = new Set<string>();
    const state = advanceUntil(() => {
      const label = useNovelStore.getState().currentLabel;
      if (label) seen.add(label);
      return label === "gallery-return";
    });
    expect(seen.has("day5-sara-night")).toBe(true);
    expect([...seen].some((label) => label.startsWith("day6-sara-"))).toBe(false);
    expect(state.currentLabel).toBe("gallery-return");
    expect(state.flags.saraRouteClosed).toBeUndefined();
  });

  for (const [ending, unlockFlag, completedFlag] of [
    ["good", "gallerySceneSarah2Unlocked", "saraGoodEndingCompleted"],
    ["bad", "gallerySceneSarah3Unlocked", "saraBadEndingCompleted"],
  ] as const) {
    test(`replaying Sarah's ${ending} ending returns to the menu without unlocking it`, () => {
      useNovelStore.getState().startFromLabel(`day7-sara-${ending}-ending`, { galleryMode: true });
      const state = advanceUntil(() => useNovelStore.getState().currentLabel === "gallery-return");
      expect(state.currentLabel).toBe("gallery-return");
      expect(state.flags[unlockFlag]).toBeUndefined();
      expect(state.flags[completedFlag]).toBeUndefined();
    });
  }

  test("phone traces fully cover the trace risk meter", () => {
    expect(new Set(saraPhoneTraces.map((trace) => trace.id)).size).toBe(saraPhoneTraces.length);
    expect(SARA_PHONE_BASE_RISK + saraPhoneTraces.reduce((sum, trace) => sum + trace.risk, 0)).toBeLessThanOrEqual(100);
  });
});
