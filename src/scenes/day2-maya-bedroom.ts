import type { VisualNovelCommand } from "@/types/novel";
import { bg, hide, jump, minigame, narrate, say, show } from "@/scenes/scriptTypes";
import mayaBedroom from "@/background/maya-bedroom.png";

export const day2MayaBedroomScene: VisualNovelCommand[] = [
  bg(mayaBedroom, "Apartment 69 - Maya's Bedroom"),
  show("arka-day2-bedroom", "arka", "neutral", {
    position: "left",
    enterFrom: "fade",
  }),
  show("maya-day2-bedroom", "maya", "worried", {
    position: "center",
    enterFrom: "fade",
  }),
  narrate(
    "Maya's laptop screen flickers, the fan roaring. Arka opens Task Manager — dozens of junk processes clogging up the memory.",
  ),
  minigame("laptop-cleanup"),
  narrate(
    "Arka presses the Enter key. The sound of the laptop fan slowly dies down.",
  ),
  say(
    "arka",
    "neutral",
    "Done. It was just a bunch of system junk piling up. It should be running fine for typing now.",
  ),
  narrate(
    "Maya steps closer and looks at the laptop screen, now back to normal. Her eyes light up.",
  ),
  say(
    "maya",
    "surprised",
    "Whoa... it really is smooth again. I was this close to crying over this thing since last night. Thanks so much, Arka.",
  ),
  narrate("Arka stands up from the chair."),
  say(
    "arka",
    "gentle",
    "You're welcome. Just focus on finishing your journal now, then go straight to sleep. No more staying up all night.",
  ),
  say(
    "maya",
    "calm",
    "Yeah, I promise I'll sleep after this.",
  ),
  hide("arka-day2-bedroom"),
  hide("maya-day2-bedroom"),
  jump("day2-free-time"),
];
