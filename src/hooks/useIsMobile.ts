import { useEffect, useState } from "react";
import { isMobileDevice } from "@/lib/utils/deviceDetection";

export function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(isMobileDevice);

  useEffect(() => {
    const handler = () => setMobile(isMobileDevice());
    window.addEventListener("resize", handler);
    window.addEventListener("orientationchange", handler);
    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("orientationchange", handler);
    };
  }, []);

  return mobile;
}
