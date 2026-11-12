import type {} from "bun";
import { describe, expect, test } from "bun:test";
import { demoScript } from "./src/lib/runtime/dialogueScript";
import { REVIEW_SCENE_GROUPS } from "./src/lib/runtime/reviewScenes";

// Labels that only replay content already listed in the review menu.
const REPLAY_ALIASES: Record<string, string> = {
  "day4-sara-gallery": "day4-sara-car-invite",
};

const listedLabels = REVIEW_SCENE_GROUPS.flatMap((group) => group.scenes.map((scene) => scene.label));

describe("Steam review scene menu", () => {
  test("lists every label that contains a cutscene", () => {
    const withCutscenes = Object.entries(demoScript.labels)
      .filter(([, commands]) => commands.some((command) => command.type === "cutScene" || command.type === "multiCutScene"))
      .map(([label]) => label);
    const isCovered = (label: string) => listedLabels.includes(label) || listedLabels.includes(REPLAY_ALIASES[label] ?? "");
    expect(withCutscenes.filter((label) => !isCovered(label))).toEqual([]);
  });

  test("every listed label exists and appears once", () => {
    for (const label of listedLabels) expect(demoScript.labels[label]).toBeDefined();
    expect(new Set(listedLabels).size).toBe(listedLabels.length);
  });
});
