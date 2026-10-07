import type {} from "bun";
import { describe, expect, test } from "bun:test";
import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { DialogueMobile } from "./src/components/DialogueMobile";
import { useNovelStore } from "./src/store/novelStore";

const findButton = (node: ReactNode, label: string): ReactElement<{ onClick?: () => void; className: string }> | undefined => {
  for (const child of Children.toArray(node)) {
    if (!isValidElement<{ children?: ReactNode }>(child)) continue;
    if (child.type === "button" && child.props.children === label) return child as ReactElement<{ onClick?: () => void; className: string }>;
    const found = findButton(child.props.children, label);
    if (found) return found;
  }
  return undefined;
};

const props = {
  controlLabels: { auto: "Auto", log: "Log", save: "Save", load: "Load", config: "Config", exit: "Exit" },
  continueHint: "Lanjut",
  finishHint: "Selesaikan teks",
  speaker: "Arka",
  visibleLine: "Halo.",
  line: "Halo.",
  isTyping: false,
  isSceneTransitioning: false,
  choices: [],
  onChoose: () => {},
  onSuppressAdvance: () => {},
};

describe("Dialogue load controls", () => {
  test("renders Load after Save and calls its own handler", () => {
    let loads = 0;
    let saves = 0;
    const tree = DialogueMobile({ ...props, onLoad: () => { loads += 1; }, onSave: () => { saves += 1; } });
    const markup = renderToStaticMarkup(tree);
    expect(markup.indexOf(">Load</button>")).toBeGreaterThan(markup.indexOf(">Save</button>"));
    expect(findButton(tree, "Load")).toBeDefined();
    findButton(tree, "Load")!.props.onClick?.();
    expect(loads).toBe(1);
    expect(saves).toBe(0);
  });

  test("Load is the fourth mobile control for keyboard/gamepad focus", () => {
    const tree = DialogueMobile({ ...props, focusedControlIndex: 3 });
    expect(findButton(tree, "Load")?.props.className).toContain("scale-105");
  });

  test("loading restores the saved dialogue and flags", () => {
    const flags = { mayaAcceptedNumber: true, day2MayaCompleted: true };
    useNovelStore.getState().startFromLabel("day2-route-maya", flags);
    const saved = useNovelStore.getState();
    useNovelStore.getState().startFromLabel("day3-bedroom");
    useNovelStore.getState().loadFromSave(
      saved.currentLabel,
      Math.max(0, saved.currentIndex - 1),
      saved.background,
      saved.backgroundVideo,
      typeof saved.location === "string" ? saved.location : saved.location.id ?? "",
      saved.characters,
      saved.flags,
      saved.activeBackgroundMusic,
      saved.activeSoundEffect,
    );
    const loaded = useNovelStore.getState();
    expect(loaded.currentLabel).toBe(saved.currentLabel);
    expect(loaded.line).toEqual(saved.line);
    expect(loaded.flags).toEqual(flags);
  });
});
