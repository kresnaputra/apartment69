import type { SceneCommand } from "@/types/novel";

type BackgroundAnimation = NonNullable<SceneCommand["backgroundAnimation"]>;

export const getBackgroundCameraAnimation = (
  animation: BackgroundAnimation,
  startTransform = "none",
): { keyframes: Keyframe[]; options: KeyframeAnimationOptions } => {
  const zoom = animation.zoom ?? 1.2;
  const panX = animation.panX ?? 10;
  const panY = animation.panY ?? 0;
  const intensity = animation.intensity ?? 4;
  const transforms = animation.drift
    ? [
        startTransform,
        `scale(${zoom}) translate(${panX}%, ${panY}%)`,
        `scale(${zoom}) translate(${-panX * 0.5}%, ${-panY * 0.5}%)`,
        `scale(${1 + (zoom - 1) * 0.625}) translate(${panX * 0.5}%, ${panY * 0.5}%)`,
        startTransform,
      ]
    : animation.shake
      ? [
          startTransform,
          ...[[-0.7, 0.5], [0.6, -0.7], [-0.5, -0.6], [0.8, 0.3], [-0.4, 0.8], [0.5, -0.4], [-0.8, -0.5]]
            .map(([x, y]) => `scale(1.06) translate(${intensity * x}px, ${intensity * y}px)`),
          startTransform,
        ]
      : [startTransform, `scale(${zoom}) translate(${panX}%, ${panY}%)`];

  return {
    keyframes: transforms.map((transform) => ({ transform, easing: "ease-in-out" })),
    options: {
      duration: (animation.duration ?? (animation.drift ? 20 : animation.shake ? 2.5 : 8)) * 1000,
      iterations: animation.drift || animation.shake ? Infinity : 1,
      fill: "forwards",
    },
  };
};

export const freezeBackgroundCamera = (
  element: HTMLElement,
  transform: string,
  stop: () => void,
): void => {
  element.style.transform = transform;
  stop();
};

export const resetBackgroundCamera = (
  element: HTMLElement,
  transform: string,
  onComplete: () => void,
): (() => void) => {
  if (transform === "none" || transform === "matrix(1, 0, 0, 1, 0, 0)") {
    element.style.transform = "none";
    onComplete();
    return () => {};
  }

  const reset = element.animate([{ transform }, { transform: "none" }], {
    duration: 600,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    fill: "forwards",
  });
  reset.onfinish = () => {
    element.style.transform = "none";
    reset.cancel();
    onComplete();
  };
  return () => {
    reset.onfinish = null;
    reset.cancel();
  };
};
