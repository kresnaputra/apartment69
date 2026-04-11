import { useEffect, useState } from "react";

// Treat as mobile when the shorter viewport dimension is under 600px
// (covers phones in both portrait and landscape).
const MOBILE_MAX = 600;

function check() {
  return Math.min(window.innerWidth, window.innerHeight) < MOBILE_MAX;
}

export function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(check);

  useEffect(() => {
    const handler = () => setMobile(check());
    window.addEventListener("resize", handler);
    window.addEventListener("orientationchange", handler);
    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("orientationchange", handler);
    };
  }, []);

  return mobile;
}
