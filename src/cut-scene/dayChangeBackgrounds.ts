import type { BackgroundVideo } from "@/types/novel";
import daysChangeUrl from "@/cut-scene/days-change.webm?url";
import mayaDaysChangeUrl from "@/cut-scene/maya-day-change.webm?url";

export const dayChangeClassic: BackgroundVideo = {
  src: daysChangeUrl,
  loop: false,
  muted: true,
  playbackRate: 0.6,
};

export const mayaDayChangeClassic: BackgroundVideo = {
  src: mayaDaysChangeUrl,
  loop: false,
  muted: true,
  playbackRate: 1,
};
