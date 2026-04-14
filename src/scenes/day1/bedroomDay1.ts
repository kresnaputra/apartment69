import type { VisualNovelCommand } from "@/types/novel";
import { bg, hide, jump, minigame, narrate, say, show } from "@/scenes/scriptTypes";
import bedroom from "@/background/bedroom-afteroon.png";

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
  minigame("smartphone-contacts"),
];

export const bedroomDay1MayaScene: VisualNovelCommand[] = [
  say(
    "arka",
    "gentle",
    "Maya first. She looked one bad day away from completely crashing out. I'd better check in on her before campus gets even rougher.",
  ),
  narrate("Arka locks his phone, drops it beside the pillow, and sets Maya at the top of tomorrow's list."),
  hide("arka-bedroom"),
  jump("day1-complate"),
];

export const bedroomDay1ElenaScene: VisualNovelCommand[] = [
  say(
    "arka",
    "serious",
    "Elena first. She's intense, sure, but that leak clearly wasn't the only thing messing with her. Might as well deal with the hardest one early.",
  ),
  narrate("Arka stares at the dark ceiling for a second, already bracing himself for Elena's attitude tomorrow."),
  hide("arka-bedroom"),
  jump("day2-bedroom"),
];

export const bedroomDay1NadiaScene: VisualNovelCommand[] = [
  say(
    "arka",
    "surprised",
    "Nadia first. She's loud, chaotic, and somehow impossible to ignore. If I leave that much energy unattended, something's definitely gonna blow up.",
  ),
  narrate("Arka snorts to himself, sets Nadia as the first name to check on, then tosses the phone aside."),
  hide("arka-bedroom"),
  jump("day2-bedroom"),
];

export const bedroomDay1SaraScene: VisualNovelCommand[] = [
  say(
    "arka",
    "neutral",
    "Sarah first. People like her don't really ask twice, and if I keep a penthouse request hanging, she's definitely gonna call me out on it.",
  ),
  narrate("Arka puts the phone down and lets out a slow breath. Tomorrow already sounds like a lot."),
  hide("arka-bedroom"),
  jump("day2-bedroom"),
];
