import { Capacitor } from "@capacitor/core";

const MOBILE_MAX = 600;

export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return Math.min(window.innerWidth, window.innerHeight) < MOBILE_MAX;
}

/** True only inside the native Android (Capacitor) app, not mobile browsers. */
export function isAndroidApp(): boolean {
  return Capacitor.isNativePlatform() && Capacitor.getPlatform() === "android";
}
