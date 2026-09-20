import { tx, type LocalizedText } from "@/lib/i18n";

export type GraphicsQuality = "performance" | "balanced" | "high";
export type AnimationFrameRate = 24 | 40 | 60;

export const GRAPHICS_QUALITY_STORAGE_KEY = "apartment69-graphics-quality";
export const ANIMATION_FRAME_RATE_STORAGE_KEY = "apartment69-animation-frame-rate";
export const DEFAULT_GRAPHICS_QUALITY: GraphicsQuality = "balanced";
export const DEFAULT_ANIMATION_FRAME_RATE: AnimationFrameRate = 60;

export const graphicsQualityOptions: Array<{ value: GraphicsQuality; label: LocalizedText }> = [
  {
    value: "performance",
    label: tx({ id: "Performa", en: "Performance", ja: "パフォーマンス", ko: "성능" }),
  },
  {
    value: "balanced",
    label: tx({ id: "Seimbang", en: "Balanced", ja: "バランス", ko: "균형" }),
  },
  {
    value: "high",
    label: tx({ id: "Tinggi", en: "High", ja: "高画質", ko: "높음" }),
  },
];

export const isGraphicsQuality = (value: string | null): value is GraphicsQuality =>
  value === "performance" || value === "balanced" || value === "high";

export const frameRateOptions: Array<{ value: AnimationFrameRate; label: string }> = [
  { value: 24, label: "24 FPS" },
  { value: 40, label: "40 FPS" },
  { value: 60, label: "60 FPS" },
];

export const isAnimationFrameRate = (value: string | null): value is `${AnimationFrameRate}` =>
  value === "24" || value === "40" || value === "60";

export const createAnimationFrameGate = () => {
  let nextRenderTime = 0;
  let previousFrameRate = 0;

  return (time: number, frameRate: number) => {
    const interval = 1000 / frameRate;
    if (frameRate !== previousFrameRate) {
      previousFrameRate = frameRate;
      nextRenderTime = time + interval;
      return true;
    }
    if (time + 0.01 < nextRenderTime) return false;
    nextRenderTime += Math.max(1, Math.floor((time - nextRenderTime) / interval) + 1) * interval;
    return true;
  };
};
