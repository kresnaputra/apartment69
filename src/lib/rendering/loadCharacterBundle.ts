import { applyCharacterBundleConfig } from "@/lib/runtime/characterRegistry";
import { fitCameraToScene } from "@/lib/sbn/sampling";
import { loadSbnBundle } from "@/lib/sbn/loadSbnBundle";
import type { LoadedCharacterBundle, LoadedSbnCharacterBundle } from "@/types/characterBundle";
import type { LoadedSbnBundle } from "@/types/sbn";
import { CanvasSbnRenderer } from "./canvasSbnRenderer";
import { loadSpritesheetBundle } from "./loadSpritesheetBundle";

const isSbnBundlePath = (bundlePath: string) => bundlePath.toLowerCase().includes(".sbn");
const SBN_WARMUP_VIEWPORT = { width: 520, height: 880 };

const warmupSbnBundle = (bundle: LoadedSbnBundle, preferredCamera: LoadedSbnCharacterBundle["preferredCamera"]) => {
  if (typeof document === "undefined") return;

  const renderer = new CanvasSbnRenderer();
  const canvas = document.createElement("canvas");
  const warmupFrames = Array.from(
    new Set([
      0,
      Math.max(0, Math.floor(bundle.project.duration / 3)),
      Math.max(0, Math.floor((bundle.project.duration * 2) / 3)),
    ]),
  );

  renderer.attach(canvas);
  renderer.resize(SBN_WARMUP_VIEWPORT.width, SBN_WARMUP_VIEWPORT.height);

  for (const frame of warmupFrames) {
    renderer.render({
      project: bundle.project,
      frame,
      scale: 1,
      camera: preferredCamera,
      viewportWidth: SBN_WARMUP_VIEWPORT.width,
      viewportHeight: SBN_WARMUP_VIEWPORT.height,
    });
  }
};

export const loadCharacterBundle = async (
  bundleId: string,
  bundlePath: string,
): Promise<LoadedCharacterBundle> => {
  if (isSbnBundlePath(bundlePath)) {
    const response = await fetch(bundlePath);
    if (!response.ok) {
      throw new Error(`Bundle SBN tidak ditemukan: ${bundlePath}`);
    }

    const source = await response.blob();
    const fileName = bundlePath.split("/").pop() ?? `${bundleId}.sbn`;
    const bundle = applyCharacterBundleConfig(bundleId, await loadSbnBundle(source, fileName));
    const renderer = new CanvasSbnRenderer();
    await renderer.preloadProject(bundle.project);
    const preferredCamera = fitCameraToScene(
      bundle.project,
      SBN_WARMUP_VIEWPORT.width,
      SBN_WARMUP_VIEWPORT.height,
    );
    const width = Math.max(1, preferredCamera.maxX - preferredCamera.minX);
    const height = Math.max(1, preferredCamera.maxY - preferredCamera.minY);
    const preferredAspectRatio = width / height;
    warmupSbnBundle(bundle, preferredCamera);
    return {
      kind: "sbn",
      preferredCamera,
      preferredAspectRatio,
      ...bundle,
    };
  }

  const bundle = await loadSpritesheetBundle(bundleId, bundlePath);
  return {
    kind: "spritesheet",
    ...bundle,
  };
};
