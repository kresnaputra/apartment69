import type { VisualNovelCommand } from "@/types/novel";
import { bg, minigame, narrate, show } from "@/scenes/scriptTypes";
import bedroomNightUrl from "@/background/bedroom-night.png";

export const day2FreeTimeScene: VisualNovelCommand[] = [
  bg(bedroomNightUrl, "Apartment 69 - Day 2"),
  show("arka-bedroom", "arka", "gentle", {
    enterFrom: "left",
    position: "left",
  }),
  narrate(
    "Maya's laptop drama is handled, and she's definitely out cold rn. Classes are wrapped up too. Still got a good chunk of time left today.",
    "arka",
  ),
  narrate(
    "Where to next, or who else should I check on?",
    "arka",
  ),
  minigame("smartphone-contacts", { showSleepOption: true, sleepOptionNext: "day2-complate", disabledContacts: ["maya", "elena", "nadia", "sara"] }),
];
