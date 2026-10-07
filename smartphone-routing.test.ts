import type {} from "bun";
import { describe, expect, test } from "bun:test";
import { useNovelStore } from "./src/store/novelStore";
import { demoScript } from "./src/lib/runtime/dialogueScript";
import { resolveLockedSmartphoneContacts, resolveSmartphoneDisabledContacts, resolveSmartphoneContactOptions, type SmartphoneContactOverrides, type SmartphoneContactLockOptions } from "./src/components/minigames/smartphoneContacts";
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
        disabledContacts: resolveSmartphoneDisabledContacts(state.flags, options as SmartphoneContactLockOptions | undefined),
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
      disabledContacts: resolveSmartphoneDisabledContacts(state.flags, options as SmartphoneContactLockOptions | undefined),
      overrides: options?.contactOverrides as SmartphoneContactOverrides,
    });
    expect(choices.filter((option) => !option.disabled).map((option) => option.id)).toEqual(["sleep"]);
    expect(choices.find((option) => option.id === "sleep")?.next).toBe("day4-complate");
  });

  test("Skip Day is available after Maya when no other contact can be selected", () => {
    const state = reachSmartphone("day2-free-time", {
      mayaAcceptedNumber: true,
      day2MayaCompleted: true,
    });
    const options = state.activeMinigame!.options as SmartphoneContactLockOptions & {
      showSleepOption: boolean;
      sleepOptionNext: string;
    };
    const choices = resolveSmartphoneContactOptions({
      language: "id",
      showSleepOption: options.showSleepOption,
      sleepOptionNext: options.sleepOptionNext,
      disabledContacts: resolveSmartphoneDisabledContacts(state.flags, options),
      overrides: options.contactOverrides,
    });
    expect(choices.filter((choice) => !choice.disabled).map((choice) => choice.id)).toEqual(["sleep"]);
    const skip = choices.find((choice) => choice.id === "sleep")!;
    expect(skip.next).toBe("day2-complate");
    state.choose(skip.next);
    expect(useNovelStore.getState().currentLabel).toBe("day2-complate");
    expect(useNovelStore.getState().activeMinigame).toBeNull();
  });

  test("Skip Day remains locked when Elena is still available after Maya", () => {
    const state = reachSmartphone("day2-free-time", {
      mayaAcceptedNumber: true,
      elenaAcceptedNumber: true,
      day2MayaCompleted: true,
    });
    const options = state.activeMinigame!.options as SmartphoneContactLockOptions;
    const choices = resolveSmartphoneContactOptions({
      language: "id",
      showSleepOption: true,
      disabledContacts: resolveSmartphoneDisabledContacts(state.flags, options),
      overrides: options.contactOverrides,
    });
    expect(choices.find((choice) => choice.id === "elena")?.disabled).toBeFalsy();
    expect(choices.find((choice) => choice.id === "sleep")?.disabled).toBe(true);
  });

  test("unavailable contact overrides do not block Skip Day", () => {
    const disabled = resolveSmartphoneDisabledContacts({ mayaAcceptedNumber: true }, {
      requiredCompletionFlags: ["day2MayaCompleted"],
      contactOverrides: { maya: { disabled: true } },
    });
    expect(disabled).not.toContain("sleep");
    const choices = resolveSmartphoneContactOptions({
      language: "id",
      showSleepOption: true,
      disabledContacts: disabled,
      overrides: { maya: { disabled: true } },
    });
    expect(choices.find((choice) => choice.id === "sleep")?.disabled).toBeFalsy();
  });

  test("explicit Skip Day locks are preserved even without available contacts", () => {
    expect(resolveSmartphoneDisabledContacts({}, {
      disabledContacts: ["sleep"],
      requiredCompletionFlags: ["day2MayaCompleted"],
    })).toContain("sleep");
  });

  test("unknown contacts remain locked", () => {
    expect(resolveLockedSmartphoneContacts({})).toEqual(["maya", "elena", "nadia", "sara"]);
  });
});
