import type { LoadedSbnBundle } from "@/types/sbn";

type CharacterBundleConfig = {
  attachmentDrawOrderOverrides?: Record<string, number>;
};

const registry: Record<string, CharacterBundleConfig> = {
  player: {
    attachmentDrawOrderOverrides: {
      Bahu: -2,
      Lengan: -1,
      Body: 10,
      Kepala: 20,
      Rambut: 30,
    },
  },
};

export const applyCharacterBundleConfig = (bundleId: string, bundle: LoadedSbnBundle): LoadedSbnBundle => {
  const config = registry[bundleId];
  if (!config) return bundle;

  return {
    ...bundle,
    project: {
      ...bundle.project,
      attachmentDrawOrderOverrides: config.attachmentDrawOrderOverrides,
    },
  };
};
