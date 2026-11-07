import { useEffect, useState } from "react";

export const STORY_TOOLBAR_IDLE_MS = 2000;

export const createToolbarIdleController = (onVisibilityChange: (visible: boolean) => void) => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let visible = false;
  const stop = () => clearTimeout(timer);
  const wake = () => {
    if (!visible) {
      visible = true;
      onVisibilityChange(true);
    }
    stop();
    timer = setTimeout(() => {
      visible = false;
      onVisibilityChange(false);
    }, STORY_TOOLBAR_IDLE_MS);
  };
  return { wake, stop };
};

export const listenForToolbarMouseMovement = (target: EventTarget, wake: () => void) => {
  const onPointerMove = (event: Event) => {
    if ((event as PointerEvent).pointerType === "mouse") wake();
  };
  target.addEventListener("pointermove", onPointerMove, { passive: true });
  return () => target.removeEventListener("pointermove", onPointerMove);
};

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

/** True on devices with a hovering mouse/trackpad; false on touch devices. */
export const useHasFinePointer = () => {
  const [hasCursor, setHasCursor] = useState(() =>
    typeof window === "undefined" || window.matchMedia(FINE_POINTER_QUERY).matches,
  );

  useEffect(() => {
    const query = window.matchMedia(FINE_POINTER_QUERY);
    const update = () => setHasCursor(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return hasCursor;
};

export const useStoryToolbarVisibility = ({ enabled }: { enabled: boolean }) => {
  const [visible, setVisible] = useState(false);
  const hasCursor = useHasFinePointer();

  useEffect(() => {
    setVisible(false);
    if (!enabled || !hasCursor) return;

    const idle = createToolbarIdleController(setVisible);
    const stopListening = listenForToolbarMouseMovement(window, idle.wake);
    return () => {
      idle.stop();
      stopListening();
    };
  }, [enabled, hasCursor]);

  return !hasCursor || visible;
};

export const STORY_CONTROL_IDS = ["log", "auto", "save", "load", "config", "exit"] as const;
type StoryControlId = typeof STORY_CONTROL_IDS[number];

type StoryToolbarProps = {
  labels: Record<StoryControlId, string>;
  isAuto: boolean;
  visible?: boolean;
  focusedControlIndex?: number;
  disabled?: boolean;
  onControlFocus?: (index: number) => void;
  onAuto: () => void;
  onLog: () => void;
  onSave: () => void;
  onLoad: () => void;
  onConfig: () => void;
  onExit: () => void;
};

const ControlIcon = ({ id, isAuto }: { id: StoryControlId; isAuto: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {id === "log" ? <><path d="M7 3h8l4 4v14H5V3h2Z" /><path d="M14 3v5h5M8 12h8M8 16h6" /></> : null}
    {id === "auto" ? isAuto ? <><path d="M8 5v14M16 5v14" /></> : <path d="m8 4 12 8-12 8V4Z" /> : null}
    {id === "save" ? <><path d="M4 3h13l4 4v14H3V3h1Z" /><path d="M7 3v6h9V3M7 21v-7h10v7M13 5v2" /></> : null}
    {id === "load" ? <><path d="M3 7V4h6l3 3h9v13H3V7Z" /><path d="M12 10v7m-3-3 3 3 3-3" /></> : null}
    {id === "config" ? <><path d="M3 7h3m4 0h11M3 17h11m4 0h3" /><circle cx="8" cy="7" r="2" /><circle cx="16" cy="17" r="2" /></> : null}
    {id === "exit" ? <><path d="M10 4H4v16h6M11 12h10m-4-4 4 4-4 4" /></> : null}
  </svg>
);

export const StoryToolbar = ({
  labels, isAuto, visible = true, focusedControlIndex = -1, disabled = false, onControlFocus,
  onAuto, onLog, onSave, onLoad, onConfig, onExit,
}: StoryToolbarProps) => {
  const handlers = { log: onLog, auto: onAuto, save: onSave, load: onLoad, config: onConfig, exit: onExit };

  return (
    <div
      className={`vn-story-toolbar${visible ? "" : " is-hidden"}`}
      data-visible={visible}
      role="group"
      onClick={(event) => event.stopPropagation()}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onControlFocus?.(-1);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") event.stopPropagation();
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        event.stopPropagation();
        const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)"));
        const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
        const direction = event.key === "ArrowRight" ? 1 : -1;
        buttons[(index + direction + buttons.length) % buttons.length]?.focus();
      }}
    >
      {STORY_CONTROL_IDS.map((id, index) => (
        <button
          key={id}
          type="button"
          aria-label={labels[id]}
          aria-pressed={id === "auto" ? isAuto : undefined}
          disabled={disabled}
          tabIndex={visible ? 0 : -1}
          className={`vn-story-control${id === "auto" && isAuto ? " is-active" : ""}${focusedControlIndex === index ? " is-focused" : ""}`}
          onPointerDown={() => onControlFocus?.(-1)}
          onFocus={(event) => onControlFocus?.(event.currentTarget.matches(":focus-visible") ? index : -1)}
          onClick={handlers[id]}
        >
          <ControlIcon id={id} isAuto={isAuto} />
          <span className="vn-story-control-tooltip" aria-hidden="true">{labels[id]}</span>
        </button>
      ))}
    </div>
  );
};

type StoryToolbarMenuProps = Omit<StoryToolbarProps, "visible" | "focusedControlIndex" | "onControlFocus"> & {
  labels: Record<StoryControlId | "menu" | "close", string>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const MenuIcon = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" focusable="false">
    {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
  </svg>
);

/**
 * Touch-device version of the story controls: a single hamburger button that
 * opens a labelled dropdown, so the six icon-only buttons don't cover the
 * scene on small screens. Fully controlled (open state lives in the caller).
 */
export const StoryToolbarMenu = ({
  labels, isAuto, disabled = false, open, onOpenChange,
  onAuto, onLog, onSave, onLoad, onConfig, onExit,
}: StoryToolbarMenuProps) => {
  const handlers = { log: onLog, auto: onAuto, save: onSave, load: onLoad, config: onConfig, exit: onExit };
  const isOpen = open && !disabled;

  return (
    <div
      className="vn-story-menu"
      data-open={isOpen}
      onClick={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") event.stopPropagation();
        if (event.key === "Escape" && isOpen) {
          event.stopPropagation();
          onOpenChange(false);
        }
      }}
    >
      {isOpen ? (
        <div
          className="vn-story-menu-backdrop"
          aria-hidden="true"
          onClick={() => onOpenChange(false)}
        />
      ) : null}
      <button
        type="button"
        className={`vn-story-control vn-story-menu-toggle${isOpen ? " is-active" : ""}`}
        aria-label={isOpen ? labels.close : labels.menu}
        aria-expanded={isOpen}
        aria-controls="vn-story-menu-panel"
        disabled={disabled}
        onClick={() => onOpenChange(!isOpen)}
      >
        <MenuIcon open={isOpen} />
        {isAuto && !isOpen ? <span className="vn-story-menu-badge" aria-hidden="true" /> : null}
      </button>
      {isOpen ? (
        <div id="vn-story-menu-panel" className="vn-story-menu-panel" role="menu" aria-label={labels.menu}>
          {STORY_CONTROL_IDS.map((id) => (
            <button
              key={id}
              type="button"
              data-control={id}
              role={id === "auto" ? "menuitemcheckbox" : "menuitem"}
              aria-checked={id === "auto" ? isAuto : undefined}
              className={`vn-story-menu-item${id === "auto" && isAuto ? " is-active" : ""}${id === "exit" ? " is-exit" : ""}`}
              onClick={() => {
                onOpenChange(false);
                handlers[id]();
              }}
            >
              <ControlIcon id={id} isAuto={isAuto} />
              <span>{labels[id]}</span>
              {id === "auto" ? <span className="vn-story-menu-state" aria-hidden="true">{isAuto ? "ON" : "OFF"}</span> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
