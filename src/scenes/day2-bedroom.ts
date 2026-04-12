import type { VisualNovelCommand } from "@/types/novel";
import { bg, jump, narrate } from "@/scenes/scriptTypes";
import apartmentUrl from "@/background/apartment.png";

export const day2BedroomScene: VisualNovelCommand[] = [
  bg(apartmentUrl, "Apartment 69 Day 2"),
  narrate(
    "Like I planned last night, I decided to check on my neighbor next door. She looked so pale yesterday, I'm not sure she even got to eat breakfast.",
  ),
  
  jump("day2-hallway"),
];
