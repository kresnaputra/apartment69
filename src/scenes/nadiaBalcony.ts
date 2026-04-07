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
    "So much happened today. I hope I can get to campus on time tomorrow.",
  ),
  show("arka-balcony", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  say(
    "nadia",
    "neutral",
    "Seriously?! At a time like this! Argh, my viewers are going to kill me!",
  ),
  narrate(
    "Leaning against the railing, Arka looks down to the 1st floor balcony where a girl in a crop top is shaking a dead ring light.",
  ),
  show("nadia-balcony", "nadia", "neutral", {
    position: "center",
    enterFrom: "right",
    xOffset: 0.01,
  }),
  say(
    "nadia",
    "neutral",
    "Hey! You! Do you have a spare extension cord? Or do you know why my studio suddenly lost power?",
  ),
  menu("What will you do?", [
    {
      id: "offer-advice",
      label: "Offer advice",
      next: "nadia-advice-help",
    },
    {
      id: "refuse-help",
      label: "Refuse to help",
      next: "nadia-advice-refuse",
    },
  ]),
];

export const nadiaAdviceHelpScene: VisualNovelCommand[] = [
  say(
    "nadia",
    "neutral",
    "Maybe. You turned on too many high-wattage lights on one circuit. That might be the cause.",
  ),
  say("nadia", "neutral", "Hah... Wait, let me check!"),
  moveTo("nadia-balcony", "right", { xOffset: 0.5 }),
  narrate(
    "She disappears inside, and a moment later, the neon lights flicker back to life.",
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
    "Woah! You're a lifesaver! I thought I blew out the entire floor!",
  ),
  say(
    "nadia",
    "neutral",
    "Next time, don't plug so many electronics into one outlet.",
  ),
  say(
    "nadia",
    "neutral",
    "Hahaha. Where have you been all this time? For the past two months, I've been dealing with this issue.",
  ),
  narrate("Nadia tosses a piece of paper."),
  say(
    "nadia",
    "neutral",
    "Save my number. I might need your help again sometime.",
  ),
  say("nadia", "neutral", "Alright, I'll save it."),
  narrate("Maybe next time I'll contact her."),
];

export const nadiaAdviceRefuseScene: VisualNovelCommand[] = [
  say(
    "nadia",
    "neutral",
    "I don't really understand electrical stuff. Try contacting the apartment staff.",
  ),
  say("nadia", "neutral", "Alright, I'll give it a try."),
];
