import type { VisualNovelCommand } from "@/types/novel";
import {
  bg,
  hide,
  jump,
  menu,
  minigame,
  narrate,
  say,
  show,
} from "@/scenes/scriptTypes";
import frontOfficeUrl from "@/background/front-office.png";

export const elenaEncounterScene: VisualNovelCommand[] = [
  bg(frontOfficeUrl, "Lentera Apartments - Front Office"),
  hide("maya-elevator"),
  hide("arka-elevator"),
  narrate(
    "The elevator doors slide open. Arka steps into the hallway just as a sharp voice cuts through the silence.",
  ),
  say(
    "unknown",
    "neutral",
    "It’s been three days! Three days that pipe’s been leaking, and all I get is ‘tomorrow’? I’m not paying rent just to listen to dripping water every damn night!",
  ),
  show("arka-hallway", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  say("arka", "surprised", "What’s that noise…?"),
  narrate(
    "Sorry, Miss… the technician’s tied up with another project…",
    "Staff",
  ),
  show("elena-hallway", "elena", "neutral", {
    position: "center",
    enterFrom: "fade",
  }),
  narrate(
    "(lets out a sharp breath, suddenly turning around)",
    "???",
  ),
  say("unknown", "neutral", "Unbelievable."),
  say(
    "unknown",
    "neutral",
    "How am I supposed to focus on grading these assignments with that constant noise…",
  ),
  menu("What should Arka do?", [
    { id: "help-elena", label: "HELP", next: "help-elena" },
    { id: "ignore-elena", label: "IGNORE", next: "ignore-elena" },
  ]),
];

export const ignoreElenaScene: VisualNovelCommand[] = [
  say("arka", "serious", "Better not get involved in other people’s problems…"),
  jump("epilogue"),
];

export const helpElenaScene: VisualNovelCommand[] = [
  narrate("(walking casually beside her)"),
  say("arka", "gentle", "I could take a look at the pipe, if you want."),
  narrate(
    "(stops mid-step, turns to Arka with a sharp gaze, scanning him from head to toe)",
  ),
  say(
    "unknown",
    "neutral",
    "Who are you? New staff? You’re not in uniform.",
  ),
  say(
    "arka",
    "neutral",
    "Just moved in. But I’m used to fixing things myself instead of waiting around.",
  ),
  narrate(
    "(pauses, studying him with a skeptical expression)",
  ),
  say(
    "unknown",
    "neutral",
    "You sound confident. But can you actually do it? I don’t want my unit ending up worse than it already is.",
  ),
  say("arka", "serious", "Up to you. Offer’s only good right now."),
  say(
    "elena",
    "neutral",
    "…Fine. I don’t really have a choice. Name’s Elena. Find me in Unit 303. Come by tonight if you’re serious. Don’t keep me waiting.",
  ),
  narrate(
    "That evening, Arka crouches in front of the cabinet under Elena's sink and examines the leaking joint.",
  ),
  jump("nadia-balcony"),
];
