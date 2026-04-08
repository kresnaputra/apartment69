import type { VisualNovelCommand } from "@/types/novel";
import {
  bg,
  hide,
  jump,
  menu,
  narrate,
  say,
  show,
  moveTo,
} from "@/scenes/scriptTypes";
import balcony from "@/background/balcony.png";

export const nadiaBalconyScene: VisualNovelCommand[] = [
  bg(balcony, "Lentera Apartments - Balcony"),
  hide("elena-hallway"),
  hide("arka-hallway"),
  narrate(
    "A lot happened today… hope I can make it to campus on time tomorrow.",
  ),
  show("arka-balcony", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  say(
    "unknown",
    "neutral",
    "Seriously?! Right now of all times?! Ugh, my viewers are gonna kill me!",
  ),
  narrate(
    "(leans over the railing, looking down at the first-floor balcony where a girl in a crop top is shaking a dead ring light)",
  ),
  show("nadia-balcony", "nadia", "neutral", {
    position: "center",
    enterFrom: "right",
    xOffset: -0.04,
  }),
  say(
    "unknown",
    "neutral",
    "Hey! You! Got a spare extension cord? Or do you know why my studio suddenly went dead?",
  ),
  menu("What will you do?", [
    {
      id: "offer-advice",
      label: "Give Advice",
      next: "nadia-advice-help",
    },
    {
      id: "refuse-help",
      label: "Refuse",
      next: "nadia-advice-refuse",
    },
  ]),
];

export const nadiaAdviceHelpScene: VisualNovelCommand[] = [
  say(
    "arka",
    "neutral",
    "Maybe. You’ve got too many high-power lights running on the same circuit. That’s probably the issue.",
  ),
  narrate("(pauses, blinking as she processes it)"),
  say("nadia", "neutral", "Huh… wait, let me check!"),
  moveTo("nadia-balcony", "right", { xOffset: 0.5 }),
  narrate(
    "(she disappears inside, and a moment later, the lights flick back on)",
  ),
  hide("nadia-balcony"),
  show("nadia-balcony", "nadia", "neutral", {
    position: "center",
    enterFrom: "right",
    xOffset: 0.01,
  }),
  say(
    "nadia",
    "neutral",
    "Whoa! You’re a lifesaver! I thought I blew the whole floor!",
  ),
  say(
    "arka",
    "neutral",
    "Next time, don’t overload everything in one spot.",
  ),
  say(
    "nadia",
    "neutral",
    "Haha, where have you been all this time? I’ve been dealing with this for like two months!",
  ),
  narrate("(Nadia tosses a piece of paper up)"),
  say(
    "nadia",
    "neutral",
    "Save my number. I might need your help again sometime.",
  ),
  say("arka", "gentle", "Alright, I’ll keep it."),
  narrate("Maybe… I’ll hit her up next time."),
  jump("sara-hallway"),
];

export const nadiaAdviceRefuseScene: VisualNovelCommand[] = [
  say(
    "arka",
    "serious",
    "Uh… I’m not really good with electrical stuff. Maybe try contacting the apartment staff.",
  ),
  say("nadia", "neutral", "Alright, I'll give it a try."),
  jump("sara-hallway"),
];
