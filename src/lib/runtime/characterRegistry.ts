import type { LoadedSbnBundle } from "@/types/sbn";

type CharacterBundleConfig = {
  attachmentDrawOrderOverrides?: Record<string, number>;
};

const sharedCharacterConfig: CharacterBundleConfig = {
  attachmentDrawOrderOverrides: {
    Bahu: -2,
    Lengan: -1,
    Body: 10,
    Kepala: 20,
    Rambut: 30,
  },
};

export const applyCharacterBundleConfig = (bundleId: string, bundle: LoadedSbnBundle): LoadedSbnBundle => {
  const config =
    bundleId.startsWith("aira-") || bundleId.startsWith("reno-")
      ? sharedCharacterConfig
      : undefined;
  if (!config) return bundle;

  return {
    ...bundle,
    project: {
      ...bundle.project,
      attachmentDrawOrderOverrides: config.attachmentDrawOrderOverrides,
    },
  };
};
