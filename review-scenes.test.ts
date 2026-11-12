import type {} from "bun";
import { describe, expect, test } from "bun:test";
import { demoScript } from "./src/lib/runtime/dialogueScript";
import { REVIEW_SCENE_GROUPS } from "./src/lib/runtime/reviewScenes";

const listedLabels = REVIEW_SCENE_GROUPS.flatMap((group) => group.scenes.map((scene) => scene.label));

describe("Steam review scene menu", () => {
  test("lists every label that contains a cutscene", () => {
    const withCutscenes = Object.entries(demoScript.labels)
      .filter(([, commands]) => commands.some((command) => command.type === "cutScene" || command.type === "multiCutScene"))
      .map(([label]) => label);
    console.log("labels with cutscenes:", withCutscenes.join(", "));
    expect(withCutscenes.filter((label) => !listedLabels.includes(label))).toEqual([]);
  });

  test("every listed label exists and appears once", () => {
    for (const label of listedLabels) expect(demoScript.labels[label]).toBeDefined();
    expect(new Set(listedLabels).size).toBe(listedLabels.length);
  });
});
