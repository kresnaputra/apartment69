import type {} from "bun";
import { describe, expect, spyOn, test } from "bun:test";
import { Children, isValidElement, type KeyboardEvent, type MouseEvent, type ReactElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { DialogueMobile } from "./src/components/DialogueMobile";
import { createToolbarIdleController, listenForToolbarMouseMovement, StoryToolbar, STORY_CONTROL_IDS, STORY_TOOLBAR_IDLE_MS } from "./src/components/StoryToolbar";
import { useNovelStore } from "./src/store/novelStore";
import { demoScript } from "./src/lib/runtime/dialogueScript";
import { cutScene } from "./src/scenes/scriptTypes";

type ButtonProps = {
  "aria-label"?: string;
  "aria-pressed"?: boolean;
  disabled?: boolean;
  tabIndex?: number;
  onClick?: () => void;
  className: string;
};

const findButton = (node: ReactNode, label: string): ReactElement<ButtonProps> | undefined => {
  for (const child of Children.toArray(node)) {
    if (!isValidElement<{ children?: ReactNode; "aria-label"?: string }>(child)) continue;
    if (child.type === "button" && (child.props["aria-label"] === label || child.props.children === label)) {
      return child as ReactElement<ButtonProps>;
    }
    const found = findButton(child.props.children, label);
    if (found) return found;
  }
  return undefined;
};

const toolbarProps = {
  labels: { auto: "Auto", log: "Log", save: "Save", load: "Load", config: "Config", exit: "Exit" },
  isAuto: false,
  onAuto: () => {},
  onLog: () => {},
  onSave: () => {},
  onLoad: () => {},
  onConfig: () => {},
  onExit: () => {},
};

describe("Persistent story controls", () => {
  test("renders six accessible SVG controls including Load after Save", () => {
    const tree = StoryToolbar(toolbarProps);
    const markup = renderToStaticMarkup(tree);
    expect(markup.match(/<svg/g)?.length).toBe(6);
    expect(markup).not.toContain("title=");
    expect(markup.match(/class="vn-story-control-tooltip"/g)?.length).toBe(6);
    expect(STORY_CONTROL_IDS).toEqual(["log", "auto", "save", "load", "config", "exit"]);
    expect(markup.indexOf('aria-label="Load"')).toBeGreaterThan(markup.indexOf('aria-label="Save"'));
    for (const label of Object.values(toolbarProps.labels)) expect(findButton(tree, label)).toBeDefined();
  });

  test("toolbar fades out visually when idle", () => {
    const tree = StoryToolbar({ ...toolbarProps, visible: false });
    expect(tree.props.className).toContain("is-hidden");
    expect(tree.props["data-visible"]).toBe(false);
    for (const label of Object.values(toolbarProps.labels)) expect(findButton(tree, label)?.props.tabIndex).toBe(-1);
  });

  test("idle timer hides the toolbar, wakes it on activity, and cancels old timers", () => {
    const changes: boolean[] = [];
    let callback: () => void = () => {};
    const setTimer = spyOn(globalThis, "setTimeout").mockImplementation(((handler: Parameters<typeof setTimeout>[0]) => {
      callback = handler as () => void;
      return 1 as unknown as ReturnType<typeof setTimeout>;
    }) as typeof setTimeout);
    const clearTimer = spyOn(globalThis, "clearTimeout").mockImplementation(() => {});
    try {
      const idle = createToolbarIdleController((visible) => changes.push(visible));
      expect(setTimer).not.toHaveBeenCalled();
      idle.wake();
      expect(changes).toEqual([true]);
      expect(setTimer.mock.calls[0][1]).toBe(STORY_TOOLBAR_IDLE_MS);
      expect(STORY_TOOLBAR_IDLE_MS).toBe(2000);
      callback();
      expect(changes).toEqual([true, false]);
      idle.wake();
      expect(changes).toEqual([true, false, true]);
      idle.wake();
      expect(changes).toEqual([true, false, true]);
      callback();
      expect(changes).toEqual([true, false, true, false]);
      idle.stop();
      expect(clearTimer).toHaveBeenCalledWith(1);
    } finally {
      setTimer.mockRestore();
      clearTimer.mockRestore();
    }
  });

  test("Space and Enter do not reveal the toolbar; only mouse movement does", () => {
    const target = new EventTarget();
    let wakes = 0;
    const stop = listenForToolbarMouseMovement(target, () => { wakes += 1; });
    target.dispatchEvent(Object.assign(new Event("keydown"), { key: " " }));
    target.dispatchEvent(Object.assign(new Event("keydown"), { key: "Enter" }));
    target.dispatchEvent(Object.assign(new Event("pointermove"), { pointerType: "touch" }));
    expect(wakes).toBe(0);
    target.dispatchEvent(Object.assign(new Event("pointermove"), { pointerType: "mouse" }));
    expect(wakes).toBe(1);
    stop();
    target.dispatchEvent(Object.assign(new Event("pointermove"), { pointerType: "mouse" }));
    expect(wakes).toBe(1);
  });

  test("Load calls its own handler without saving", () => {
    let loads = 0;
    let saves = 0;
    const tree = StoryToolbar({ ...toolbarProps, onLoad: () => { loads += 1; }, onSave: () => { saves += 1; } });
    findButton(tree, "Load")!.props.onClick?.();
    expect(loads).toBe(1);
    expect(saves).toBe(0);
  });

  test("Auto exposes its toggle state and focused controls remain identifiable", () => {
    const tree = StoryToolbar({ ...toolbarProps, isAuto: true, focusedControlIndex: 3 });
    expect(findButton(tree, "Auto")?.props["aria-pressed"]).toBe(true);
    expect(findButton(tree, "Load")?.props.className).toContain("is-focused");
  });

  test("toolbar is unavailable for duplicate actions while a modal is open", () => {
    const tree = StoryToolbar({ ...toolbarProps, disabled: true });
    for (const label of Object.values(toolbarProps.labels)) expect(findButton(tree, label)?.props.disabled).toBe(true);
  });

  test("toolbar pointer and Enter events do not propagate to scene advance", () => {
    const tree = StoryToolbar(toolbarProps);
    let stopped = 0;
    tree.props.onClick({ stopPropagation: () => { stopped += 1; } } as MouseEvent<HTMLDivElement>);
    tree.props.onKeyDown({ key: "Enter", stopPropagation: () => { stopped += 1; } } as KeyboardEvent<HTMLDivElement>);
    expect(stopped).toBe(2);
  });

  test("saving and loading during a cutscene restores its command", () => {
    const label = "toolbar-cutscene-regression";
    demoScript.labels[label] = [cutScene("sample.webm", true)];
    try {
      useNovelStore.getState().startFromLabel(label);
      const saved = useNovelStore.getState();
      expect(saved.activeCutScene?.src).toBe("sample.webm");
      useNovelStore.getState().loadFromSave(
        saved.currentLabel, saved.currentIndex - 1, saved.background, saved.backgroundVideo,
        "", saved.characters, saved.flags,
      );
      expect(useNovelStore.getState().activeCutScene?.src).toBe("sample.webm");
    } finally {
      delete demoScript.labels[label];
      useNovelStore.getState().clearScene();
    }
  });

  test("mobile dialogue no longer duplicates toolbar controls", () => {
    const tree = DialogueMobile({
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
    });
    expect(renderToStaticMarkup(tree)).not.toContain("<button");
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
