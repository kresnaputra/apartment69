import type { BackgroundVideo } from "@/types/novel";
import daysChangeUrl from "@/cut-scene/days-change.webm?url";
import mayaDaysChangeUrl from "@/cut-scene/maya-day-change.webm?url";
import officeDaysChangeUrl from "@/cut-scene/office-day-change.webm?url";

export const dayChangeClassic: BackgroundVideo = {
  src: daysChangeUrl,
  loop: false,
  muted: true,
  playbackRate: 1,
};

export const mayaDayChangeClassic: BackgroundVideo = {
  src: mayaDaysChangeUrl,
  loop: false,
  muted: true,
  playbackRate: 1,
};

export const officeDayChangeClassic: BackgroundVideo = {
  src: officeDaysChangeUrl,
  loop: false,
  muted: true,
  playbackRate: 1,
};
