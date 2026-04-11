import type { VisualNovelCommand } from "@/types/novel";
import { bg, hide, say, show } from "@/scenes/scriptTypes";
import bedroom from "@/background/bedroom-night.png";

export const bedroomDay1Scene: VisualNovelCommand[] = [
  bg(bedroom, "Lentera Apartments - Bedroom"),
  hide("arka-hallway"),
  show("arka-bedroom", "arka", "neutral", {
    position: "left",
    enterFrom: "fade",
  }),
  say(
    "arka",
    "neutral",
    "I've only been here a day, and this place is already way busier than I expected. I came here to chill, grind some code, and survive college stuff... and somehow I already ended up with four new contacts. Wild.",
  ),
  say(
    "arka",
    "shy",
    "There's Maya next door, and she looks seriously wrecked from college stress. Then there's Elena across the hall, cold as hell, Nadia with, like, way too much energy, and Sarah... the penthouse girl who talks like she's assigning me a deadline.",
  ),
  say(
    "arka",
    "serious",
    "Thing is, there's no way I'm gonna run into all of them at the same time tomorrow. So yeah... I gotta figure out who I'm checking in on first.",
  ),
];
