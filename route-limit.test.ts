import type {} from "bun";
import { describe, expect, test } from "bun:test";
import { useNovelStore } from "./src/store/novelStore";
import { resolveText } from "./src/lib/i18n";
import {
  resolveSmartphoneContactOptions,
  resolveSmartphoneDisabledContacts,
  type SmartphoneContactLockOptions,
  type SmartphoneContactOverrides,
} from "./src/components/minigames/smartphoneContacts";
import { day4RoutePhoneOptions } from "./src/scenes/day4/day4-bedroom";
import type { FlagMap } from "./src/types/novel";

const contactFlags: FlagMap = {
  mayaAcceptedNumber: true,
  elenaAcceptedNumber: true,
  nadiaAcceptedNumber: true,
  saraAcceptedNumber: true,
};

/** Advance (auto-finishing cutscenes) until a phone opens or the story ends. */
const runUntilStop = (label: string, flags: FlagMap) => {
  useNovelStore.getState().startFromLabel(label, flags);
  const seenLabels = new Set<string>();
  for (let step = 0; step < 200; step += 1) {
    const state = useNovelStore.getState();
    if (state.currentLabel) seenLabels.add(state.currentLabel);
    if (state.activeMinigame || state.isEnded) break;
    if (state.activeCutScene) state.completeCutScene();
    else state.advance();
  }
  return { state: useNovelStore.getState(), seenLabels };
};

const enabledContacts = (flags: FlagMap, options: Record<string, unknown> | undefined) => {
  const lockOptions = options as SmartphoneContactLockOptions | undefined;
  return resolveSmartphoneContactOptions({
    language: "en",
    showSleepOption: Boolean(options?.showSleepOption),
    disabledContacts: resolveSmartphoneDisabledContacts(flags, lockOptions),
    overrides: lockOptions?.contactOverrides as SmartphoneContactOverrides | undefined,
  })
    .filter((option) => !option.disabled)
    .map((option) => option.id);
};

describe("Two-route limit", () => {
  test("after two Day 2 routes the other heroines lock and Skip Day opens", () => {
    const flags = { ...contactFlags, day2SaraCompleted: true, day2NadiaCompleted: true };
    const { state } = runUntilStop("day2-sara-ending", flags);
    expect(state.activeMinigame?.id).toBe("smartphone-contacts");
    expect(enabledContacts(state.flags, state.activeMinigame?.options)).toEqual(["sleep"]);
  });

  test("with one Day 2 route done the others stay selectable", () => {
    const flags = { ...contactFlags, day2SaraCompleted: true };
    const { state } = runUntilStop("day2-sara-ending", flags);
    expect(enabledContacts(state.flags, state.activeMinigame?.options)).toEqual(["maya", "elena", "nadia"]);
  });

  test("a third heroine stays locked even when a phone would re-enable her", () => {
    const flags = {
      ...contactFlags,
      day2Completed: true,
      day2MayaCompleted: true,
      day2ElenaCompleted: true,
      day3NadiaCompleted: true,
      day3SaraCompleted: true,
    };
    expect(enabledContacts(flags, day4RoutePhoneOptions)).toEqual(["maya", "elena"]);
  });
});

describe("Day 4 backup route and game over", () => {
  const mayaAndElena = {
    ...contactFlags,
    day2Completed: true,
    day2MayaCompleted: true,
    day2ElenaCompleted: true,
  };

  test("Maya failing hands over to the other chosen route", () => {
    const { state, seenLabels } = runUntilStop("day4-maya-collapse", mayaAndElena);
    expect(state.activeMinigame).toBeNull();
    state.choose("day4-maya-bad-ending");
    const after = runUntilStopFromCurrent();
    expect(after.state.flags.mayaRouteFailed).toBe(true);
    expect(after.state.currentLabel).toBe("day4-route-fallback");
    expect(after.state.flags.day4SelectedCharacter).toBeUndefined();
    expect(enabledContacts(after.state.flags, after.state.activeMinigame?.options)).toEqual(["elena"]);
    expect(seenLabels.has("route-game-over")).toBe(false);
  });

  test("Maya failing with no other route ends in GAME OVER", () => {
    const flags = { ...contactFlags, day2Completed: true, day2MayaCompleted: true };
    const { state } = runUntilStop("day4-maya-bad-ending", flags);
    expect(state.currentLabel).toBe("route-game-over");
    expect(state.isEnded).toBe(true);
    expect(resolveText(useNovelStore.getState().line, "en")).toBe("Every route you chose has come to an end.");
  });

  test("both chosen routes failing ends in GAME OVER", () => {
    const flags = {
      ...contactFlags,
      day2Completed: true,
      day2MayaCompleted: true,
      day2NadiaCompleted: true,
      day3NadiaCompleted: true,
      nadia_help_day4: false,
      mayaRouteFailed: true,
    };
    const { state, seenLabels } = runUntilStop("day4-nadia-night", flags);
    expect(state.flags.nadiaRouteFailed).toBe(true);
    expect(seenLabels.has("route-game-over")).toBe(true);
    expect(state.isEnded).toBe(true);
  });

  test("Nadia skipped hands over to Maya", () => {
    const flags = {
      ...contactFlags,
      day2Completed: true,
      day2MayaCompleted: true,
      day2NadiaCompleted: true,
      day3NadiaCompleted: true,
      nadia_help_day4: false,
    };
    const { state } = runUntilStop("day4-nadia-night", flags);
    expect(state.currentLabel).toBe("day4-route-fallback");
    expect(enabledContacts(state.flags, state.activeMinigame?.options)).toEqual(["maya"]);
  });

  test("Sarah finishing hands over to the other chosen route", () => {
    const flags = {
      ...contactFlags,
      day2Completed: true,
      day2MayaCompleted: true,
      day2SaraCompleted: true,
      day3SaraCompleted: true,
      day4SelectedCharacter: "sara",
    };
    const { state, seenLabels } = runUntilStop("day4-sara-route-end", flags);
    expect(state.flags.saraRouteClosed).toBe(true);
    expect(enabledContacts(state.flags, state.activeMinigame?.options)).toEqual(["maya"]);
    expect(seenLabels.has("day4-sara-route-notice")).toBe(false);
  });

  test("Sarah finishing with no other route shows the next-update notice", () => {
    const flags = {
      ...contactFlags,
      day2Completed: true,
      day2SaraCompleted: true,
      day3SaraCompleted: true,
      day4SelectedCharacter: "sara",
    };
    const { state, seenLabels } = runUntilStop("day4-sara-route-end", flags);
    expect(seenLabels.has("day4-sara-route-notice")).toBe(true);
    expect([...seenLabels].some((label) => label.startsWith("day5"))).toBe(false);
    expect(state.isEnded).toBe(true);
    expect(state.flags.gallerySceneMaya1Unlocked).toBeUndefined();
  });

  test("Maya's normal Day 4 wrap-up still flows into Day 5", () => {
    useNovelStore.getState().startFromLabel("day4-complate", { ...mayaAndElena, day4SelectedCharacter: "maya" });
    for (let step = 0; step < 20; step += 1) {
      const state = useNovelStore.getState();
      if (state.isEnded || state.currentLabel?.startsWith("day5")) break;
      state.advance();
    }
    const final = useNovelStore.getState();
    expect(final.currentLabel?.startsWith("day5")).toBe(true);
    expect(final.flags.gallerySceneMaya1Unlocked).toBe(true);
  });
});

function runUntilStopFromCurrent() {
  const seenLabels = new Set<string>();
  for (let step = 0; step < 200; step += 1) {
    const state = useNovelStore.getState();
    if (state.currentLabel) seenLabels.add(state.currentLabel);
    if (state.activeMinigame || state.isEnded) break;
    if (state.activeCutScene) state.completeCutScene();
    else state.advance();
  }
  return { state: useNovelStore.getState(), seenLabels };
}
