import type { LoadedCharacterBundle } from "@/types/characterBundle";
import { loadSpritesheetBundle } from "./loadSpritesheetBundle";

const isSbnBundlePath = (bundlePath: string) => bundlePath.toLowerCase().includes(".sbn");

export const loadCharacterBundle = async (
  bundleId: string,
  bundlePath: string,
): Promise<LoadedCharacterBundle> => {
  if (isSbnBundlePath(bundlePath)) {
    throw new Error(`SBN dinonaktifkan untuk branch ini: ${bundlePath}`);
  }

  const bundle = await loadSpritesheetBundle(bundleId, bundlePath);
  return {
    kind: "spritesheet",
    ...bundle,
  };
};
