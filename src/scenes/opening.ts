import type { VisualNovelCommand } from "@/types/novel";
import { bg, jump, narrate } from "@/scenes/scriptTypes";
import apartment from "@/background/apartment.png";

export const openingScene: VisualNovelCommand[] = [
  bg(apartment, "Lentera Apartments", {
    backgroundAnimation: {
      zoom: 1.3,
      panX: -15,
      panY: 0,
      duration: 10,
    },
  }),
  narrate(
    "Lentera Apartments. It's definitely not as grand as the name suggests, but the deposit here was cheap enough to keep me afloat for a few months. I just need a quiet place, somewhere far from the city's constant noise, and more importantly... a place where nobody cares who I really am.",
  ),
  narrate(
    "Arka (thinking): My freelance IT work and my habit of fixing broken gadgets usually mean I prefer being alone. But, it looks like this old building has other plans for me.",
  ),
  jump("elevator-meeting"),
];
