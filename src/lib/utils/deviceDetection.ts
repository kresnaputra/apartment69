const MOBILE_MAX = 600;

export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return Math.min(window.innerWidth, window.innerHeight) < MOBILE_MAX;
}
