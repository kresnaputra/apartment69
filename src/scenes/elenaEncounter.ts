import type { VisualNovelCommand } from "@/types/novel";
import { bg, hide, jump, menu, minigame, narrate, say, show } from "@/scenes/scriptTypes";
import frontOfficeUrl from "@/background/front-office.png";

export const elenaEncounterScene: VisualNovelCommand[] = [
  bg(frontOfficeUrl, "Lentera Apartments - Front Office"),
  hide("maya-elevator"),
  hide("arka-elevator"),
  show("arka-hallway", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  show("elena-hallway", "elena", "neutral", {
    position: "right",
    enterFrom: "right",
    xOffset: -0.15,
  }),
  narrate("The elevator doors slide open. Arka steps into the hallway just as a sharp voice cuts through the silence."),
  say(
    "elena",
    "neutral",
    "It's been three days. Three days, and all I keep hearing is 'tomorrow.' I do not pay this rent just to listen to dripping water every night.",
  ),
  say("arka", "surprised", "What is that noise?"),
  narrate("I'm sorry, Ms. Elena... the technician is tied up with another project right now...", "Staff"),
  narrate(
    "Elena lets out a sharp breath, then turns abruptly. She mutters to herself as she walks past Arka.",
  ),
  say("elena", "neutral", "Incompetent."),
  say("elena", "neutral", "How am I supposed to focus on grading papers with that constant noise..."),
  menu("What should Arka do?", [
    { id: "help-elena", label: "HELP", next: "help-elena" },
    { id: "ignore-elena", label: "IGNORE", next: "ignore-elena" },
  ]),
];

export const ignoreElenaScene: VisualNovelCommand[] = [
  say("arka", "serious", "I should stay out of other people's problems."),
  jump("epilogue"),
];

export const helpElenaScene: VisualNovelCommand[] = [
  narrate("Arka falls into step beside her at an easy pace."),
  say("arka", "gentle", "I can take a look at the pipe, if you want."),
  narrate(
    "Elena stops mid-step and turns toward him with a sharp, assessing stare, studying him from head to toe.",
  ),
  say("elena", "neutral", "Who are you? New staff? You're not wearing a uniform."),
  say("arka", "neutral", "Just a new tenant. I am more used to fixing things myself than waiting for someone else to do it."),
  narrate(
    "She watches him in silence for a moment, her expression skeptical and unreadable.",
  ),
  say(
    "elena",
    "neutral",
    "You sound confident. But can you actually do it? I don't want my unit in worse shape than it already is.",
  ),
  say("arka", "serious", "Up to you. The offer only stands right now."),
  narrate("Elena exhales slowly, as if forcing herself to accept the situation."),
  say(
    "elena",
    "neutral",
    "Fine. I don't have another option. Find me in Room 303. Come tonight if you're serious. And do not make me wait.",
  ),
  narrate("That evening, Arka crouches in front of the cabinet under Elena's sink and examines the leaking joint."),
  minigame("pipe-connection"),
  narrate("The dripping stops."),
  jump("nadia-balcony"),
];
