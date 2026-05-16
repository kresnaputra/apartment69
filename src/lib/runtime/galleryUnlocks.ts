import type { FlagMap } from "@/types/novel";

const GALLERY_UNLOCKS_STORAGE_KEY = "apartment69:gallery-unlocks";

export const isGalleryUnlockFlag = (flagName: string) =>
  flagName.startsWith("galleryScene") && flagName.endsWith("Unlocked");

export const readGalleryUnlockFlags = (): FlagMap => {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(GALLERY_UNLOCKS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as FlagMap;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

export const persistGalleryUnlockFlag = (flagName: string, value: unknown) => {
  if (typeof window === "undefined") return;
  if (!isGalleryUnlockFlag(flagName) || value !== true) return;

  const nextFlags = {
    ...readGalleryUnlockFlags(),
    [flagName]: true,
  };

  window.localStorage.setItem(GALLERY_UNLOCKS_STORAGE_KEY, JSON.stringify(nextFlags));
};
