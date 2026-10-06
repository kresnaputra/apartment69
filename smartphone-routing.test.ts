import type {} from "bun";
import { describe, expect, test } from "bun:test";
import { useNovelStore } from "./src/store/novelStore";
import { demoScript } from "./src/lib/runtime/dialogueScript";
import { resolveLockedSmartphoneContacts, resolveSmartphoneContactOptions, type SmartphoneContactOverrides } from "./src/components/minigames/smartphoneContacts";
import type { FlagMap } from "./src/types/novel";

const contactFlags: FlagMap = {
  mayaAcceptedNumber: true,
  elenaAcceptedNumber: true,
  nadiaAcceptedNumber: true,
};

const reachSmartphone = (label: string, flags: FlagMap = contactFlags) => {
  useNovelStore.getState().startFromLabel(label, flags);
  for (let step = 0; step < 30; step += 1) {
    const state = useNovelStore.getState();
    if (state.activeMinigame || state.isEnded || state.currentLabel !== label) break;
    state.advance();
  }
  return useNovelStore.getState();
};

describe("Smartphone route selection", () => {
  for (const label of [
    "day2-bedroom", "day2-free-time", "day3-bedroom", "day3-after-maya-phone",
    "day3-route-selection", "day4-bedroom", "day4-after-route-phone",
  ]) {
    test(`${label} opens the smartphone instead of forcing a route`, () => {
      const state = reachSmartphone(label);
      expect(state.currentLabel).toBe(label);
      expect(state.activeMinigame?.id).toBe("smartphone-contacts");
      state.advance();
      expect(useNovelStore.getState().activeMinigame?.id).toBe("smartphone-contacts");
    });
  }

  for (const contact of ["maya", "elena", "nadia"] as const) {
    test(`Day 2 allows choosing the ${contact} route`, () => {
      const state = reachSmartphone("day2-bedroom");
      const options = state.activeMinigame?.options;
      expect(options).toBeDefined();
      const choices = resolveSmartphoneContactOptions({
        language: "id",
        disabledContacts: resolveLockedSmartphoneContacts(state.flags, options?.disabledContacts as string[]),
        overrides: options?.contactOverrides as SmartphoneContactOverrides,
      });
      const choice = choices.find((option) => option.id === contact)!;
      expect(choice.disabled).toBeFalsy();
      expect(choice.next).toBe(`day2-route-${contact}`);
      expect(demoScript.labels[choice.next]).toBeDefined();
      state.choose(choice.next);
      expect(useNovelStore.getState().activeMinigame).toBeNull();
      expect(useNovelStore.getState().currentLabel).toBe(choice.next);
    });
  }

  test("Day 4 wrap-up only permits ending the day", () => {
    const state = reachSmartphone("day4-after-route-phone");
    const options = state.activeMinigame?.options;
    expect(options).toBeDefined();
    const choices = resolveSmartphoneContactOptions({
      language: "id",
      showSleepOption: options?.showSleepOption as boolean,
      sleepOptionNext: options?.sleepOptionNext as string,
      disabledContacts: options?.disabledContacts as string[],
      overrides: options?.contactOverrides as SmartphoneContactOverrides,
    });
    expect(choices.filter((option) => !option.disabled).map((option) => option.id)).toEqual(["sleep"]);
    expect(choices.find((option) => option.id === "sleep")?.next).toBe("day4-complate");
  });

  test("unknown contacts remain locked", () => {
    expect(resolveLockedSmartphoneContacts({})).toEqual(["maya", "elena", "nadia", "sara"]);
  });
});
