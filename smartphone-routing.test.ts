import type {} from "bun";
import { describe, expect, test } from "bun:test";
import { useNovelStore } from "./src/store/novelStore";
import { demoScript } from "./src/lib/runtime/dialogueScript";
import { saraBundleRegistry, saraCharacter } from "./src/character/sara/character";
import { resolveLockedSmartphoneContacts, resolveSmartphoneDisabledContacts, resolveSmartphoneContactOptions, type SmartphoneContactOverrides, type SmartphoneContactLockOptions } from "./src/components/minigames/smartphoneContacts";
import type { FlagMap } from "./src/types/novel";

const contactFlags: FlagMap = {
  mayaAcceptedNumber: true,
  elenaAcceptedNumber: true,
  nadiaAcceptedNumber: true,
  saraAcceptedNumber: true,
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
  test("Sarah has idle and talking bundles for every Day 2 emotion", () => {
    for (const emotion of ["neutral", "angry", "blush", "sad", "smile"] as const) {
      expect(saraBundleRegistry[saraCharacter.bundleIdByEmotion![emotion]! as keyof typeof saraBundleRegistry]).toBeDefined();
      expect(saraBundleRegistry[saraCharacter.talkingBundleIdByEmotion![emotion]! as keyof typeof saraBundleRegistry]).toBeDefined();
    }
  });

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

  for (const contact of ["maya", "elena", "nadia", "sara"] as const) {
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

  for (const firstChoice of ["day2-sara-accept", "day2-sara-delay"]) {
    for (const lastChoice of ["day2-sara-yes", "day2-sara-maybe"]) {
      test(`Sarah route ${firstChoice} then ${lastChoice} completes after cable matching`, () => {
        useNovelStore.getState().startFromLabel("day2-route-sara", contactFlags);
        let sawCables = false;
        for (let step = 0; step < 100; step += 1) {
          const state = useNovelStore.getState();
          if (state.activeMinigame?.id === "smartphone-contacts") break;
          if (state.activeMinigame?.id === "cable-matching") {
            sawCables = true;
            state.completeMinigame();
          } else if (state.choices.length > 0) {
            state.choose(state.currentLabel === "day2-route-sara" ? firstChoice : lastChoice);
          } else {
            state.advance();
          }
        }
        const state = useNovelStore.getState();
        expect(sawCables).toBe(true);
        expect(state.flags.day2SaraCompleted).toBe(true);
        expect(state.activeMinigame?.id).toBe("smartphone-contacts");
        const disabled = resolveSmartphoneDisabledContacts(state.flags, state.activeMinigame?.options as SmartphoneContactLockOptions);
        expect(disabled).toContain("sara");
      });
    }
  }

  for (const label of ["day3-bedroom", "day3-route-selection"]) {
    test(`Day 3 unlocks Sarah at ${label} only after her Day 2 route`, () => {
      const lockedState = reachSmartphone(label);
      const lockedOptions = lockedState.activeMinigame?.options;
      const lockedChoices = resolveSmartphoneContactOptions({
        language: "id",
        disabledContacts: resolveSmartphoneDisabledContacts(lockedState.flags, lockedOptions as SmartphoneContactLockOptions | undefined),
        overrides: lockedOptions?.contactOverrides as SmartphoneContactOverrides,
      });
      expect(lockedChoices.find((option) => option.id === "sara")?.disabled).toBe(true);

      const state = reachSmartphone(label, {
        ...contactFlags,
        day2SaraCompleted: true,
      });
      const options = state.activeMinigame?.options;
      const choices = resolveSmartphoneContactOptions({
        language: "id",
        disabledContacts: resolveSmartphoneDisabledContacts(state.flags, options as SmartphoneContactLockOptions | undefined),
        overrides: options?.contactOverrides as SmartphoneContactOverrides,
      });
      const choice = choices.find((option) => option.id === "sara")!;
      expect(choice.disabled).toBeFalsy();
      expect(choice.next).toBe("day3-slot2-sarah");
      expect(demoScript.labels[choice.next]).toBeDefined();
      state.choose(choice.next);
      expect(useNovelStore.getState().currentLabel).toBe(choice.next);
    });
  }

  for (const firstChoice of ["day3-sara-empathy", "day3-sara-listen"]) {
    for (const lastChoice of ["day3-sara-escort", "day3-sara-decline"]) {
      test(`Sarah Day 3 ${firstChoice} then ${lastChoice} reaches the day end`, () => {
        useNovelStore.getState().startFromLabel("day3-sara-start", contactFlags);
        for (let step = 0; step < 100; step += 1) {
          const state = useNovelStore.getState();
          if (state.activeInterstitial) break;
          if (state.choices.length > 0) {
            state.choose(state.currentLabel === "day3-sara-start" ? firstChoice : lastChoice);
          } else {
            state.advance();
          }
        }
        const state = useNovelStore.getState();
        expect(state.currentLabel).toBe("day3-complete");
        expect(state.flags.day3Slot2SarahCompleted).toBe(true);
        expect(state.flags.day3SaraCompleted).toBe(true);
        expect(state.flags.day3SaraEscorted).toBe(lastChoice === "day3-sara-escort");
      });
    }
  }

  test("Day 4 unlocks Sarah only after her Day 3 route", () => {
    const lockedState = reachSmartphone("day4-bedroom");
    const lockedOptions = lockedState.activeMinigame?.options;
    const lockedChoices = resolveSmartphoneContactOptions({
      language: "id",
      disabledContacts: resolveSmartphoneDisabledContacts(lockedState.flags, lockedOptions as SmartphoneContactLockOptions | undefined),
      overrides: lockedOptions?.contactOverrides as SmartphoneContactOverrides,
    });
    expect(lockedChoices.find((option) => option.id === "sara")?.disabled).toBe(true);

    const state = reachSmartphone("day4-bedroom", {
      ...contactFlags,
      day3SaraCompleted: true,
    });
    const options = state.activeMinigame?.options;
    const choices = resolveSmartphoneContactOptions({
      language: "id",
      disabledContacts: resolveSmartphoneDisabledContacts(state.flags, options as SmartphoneContactLockOptions | undefined),
      overrides: options?.contactOverrides as SmartphoneContactOverrides,
    });
    const choice = choices.find((option) => option.id === "sara")!;
    expect(choice.disabled).toBeFalsy();
    expect(choice.next).toBe("day4-sara-start");
    expect(demoScript.labels[choice.next]).toBeDefined();
    state.choose(choice.next);
    expect(useNovelStore.getState().currentLabel).toBe(choice.next);
  });

  const day4SaraFirstChoices = ["day4-sara-reserved", "day4-sara-reading", "day4-sara-listening"];
  const day4SaraSecondChoices = ["day4-sara-too-long", "day4-sara-not-strong"];
  const day4SaraThirdChoices = ["day4-sara-stay", "day4-sara-move-closer"];

  for (const firstChoice of day4SaraFirstChoices) {
    for (const secondChoice of day4SaraSecondChoices) {
      for (const thirdChoice of day4SaraThirdChoices) {
        test(`Sarah Day 4 ${firstChoice}, ${secondChoice}, then ${thirdChoice} completes`, () => {
          useNovelStore.getState().startFromLabel("day4-sara-start", contactFlags);
          let sawFirstCarCutScene = false;
          let sawSecondCarCutScene = false;
          let sawThirdCarCutScene = false;
          let sawFourthCarCutScene = false;
          let sawFifthCarCutScene = false;
          let sawSixthCarCutScene = false;
          for (let step = 0; step < 160; step += 1) {
            const state = useNovelStore.getState();
            if (state.currentLabel === "day4-complate") break;
            if (state.activeCutScene) {
              if (!sawFirstCarCutScene) {
                expect(state.activeCutScene.src).toContain("sara-park-1.mp4");
                expect(state.activeCutScene.narrate).toHaveLength(7);
                expect(state.activeCutScene.choices).toBeUndefined();
                sawFirstCarCutScene = true;
                state.completeCutScene();
              } else if (!sawSecondCarCutScene) {
                expect(state.activeCutScene.src).toContain("sara-park-2.mp4");
                expect(state.activeCutScene.narrate).toHaveLength(1);
                expect(state.activeCutScene.choices?.options.map((option) => option.next)).toEqual(day4SaraSecondChoices);
                state.completeCutScene();
                expect(useNovelStore.getState().activeCutScene).not.toBeNull();
                state.choose("day4-sara-stay");
                expect(useNovelStore.getState().currentLabel).toBe("day4-sara-car-invite");
                sawSecondCarCutScene = true;
                state.choose(secondChoice);
              } else if (!sawThirdCarCutScene) {
                expect(state.activeCutScene.src).toContain("sara-park-3.mp4");
                expect(state.activeCutScene.narrate).toHaveLength(3);
                expect(state.activeCutScene.choices).toBeUndefined();
                sawThirdCarCutScene = true;
                state.completeCutScene();
              } else if (!sawFourthCarCutScene) {
                expect(state.activeCutScene.src).toContain("sara-park-4.mp4");
                expect(state.activeCutScene.narrate).toHaveLength(3);
                expect(state.activeCutScene.choices).toBeUndefined();
                expect(state.activeCutScene.audioSrc).toContain("sara-park-4.wav");
                sawFourthCarCutScene = true;
                state.completeCutScene();
              } else if (!sawFifthCarCutScene) {
                expect(state.activeCutScene.src).toContain("sara-park-5.mp4");
                expect(state.activeCutScene.narrate).toHaveLength(2);
                expect(state.activeCutScene.choices).toBeUndefined();
                expect(state.activeCutScene.audioSrc).toContain("sara-park-5.wav");
                sawFifthCarCutScene = true;
                state.completeCutScene();
              } else {
                expect(state.activeCutScene.src).toContain("sara-park-6.mp4");
                expect(state.activeCutScene.narrate).toHaveLength(2);
                expect(state.activeCutScene.choices).toBeUndefined();
                expect(state.activeCutScene.audioSrc).toContain("sara-park-6.wav");
                sawSixthCarCutScene = true;
                state.completeCutScene();
              }
            } else if (state.choices.length > 0) {
              if (state.currentLabel === "day4-sara-start") {
                state.choose(firstChoice);
              } else {
                state.choose(thirdChoice);
              }
            } else {
              state.advance();
            }
          }
          const state = useNovelStore.getState();
          expect(sawFirstCarCutScene).toBe(true);
          expect(sawSecondCarCutScene).toBe(true);
          expect(sawThirdCarCutScene).toBe(true);
          expect(sawFourthCarCutScene).toBe(true);
          expect(sawFifthCarCutScene).toBe(true);
          expect(sawSixthCarCutScene).toBe(true);
          expect(state.currentLabel).toBe("day4-complate");
          expect(state.flags.day4SelectedCharacter).toBe("sara");
          expect(state.flags.day4SaraCompleted).toBe(true);
          expect(state.flags.day4SaraIntimate).toBe(true);
          expect(state.flags.day4SaraMovedCloser).toBe(thirdChoice === "day4-sara-move-closer");
        });
      }
    }
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
