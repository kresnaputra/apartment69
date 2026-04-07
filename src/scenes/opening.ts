import type { VisualNovelCommand } from "@/types/novel";
import {
  bg,
  jump,
  narrate,
  parallax,
} from "@/scenes/scriptTypes";
import skyUrl from "@/background/sky.png";
import apartementUrl from "@/background/apartement.png";

export const openingScene: VisualNovelCommand[] = [
  bg(skyUrl, "Stasiun Senja", {
    parallaxLayers: [parallax(apartementUrl, 30, "ltr", { xOffset: -0.1 })],
  }),
  narrate(
    "Lentera Apartments. It's definitely not as grand as the name suggests, but the deposit here was cheap enough to keep me afloat for a few months. I just need a quiet place, somewhere far from the city's constant noise, and more importantly... a place where nobody cares who I really am.",
  ),
  narrate(
    "My freelance IT work and my habit of fixing broken gadgets usually mean I prefer being alone. But, it looks like this old building has other plans for me.",
  ),
  jump("elevator-meeting"),
];
