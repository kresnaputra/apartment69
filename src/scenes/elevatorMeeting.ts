import type { VisualNovelCommand } from "@/types/novel";
import {
  bg,
  jump,
  menu,
  minigame,
  narrate,
  say,
  show,
} from "@/scenes/scriptTypes";
import elevator from "@/background/elevator.png";

export const elevatorMeetingScene: VisualNovelCommand[] = [
  bg(elevator, "Lentera Apartments - Elevator"),
  show("arka-elevator", "arka", "neutral", {
    position: "left",
  }),
  say("maya", "worried", "Don’t close the elevator yet…! ", { hideName: true }),
  minigame("elevator-button"),
  say(
    "maya",
    "worried",
    "(catching her breath) That was close… almost missed it…",
    { hideName: true },
  ),
  narrate(
    "(glances at her from under his bangs, then looks back at the elevator door, expression neutral)",
  ),
  show("maya-elevator", "maya", "neutral", {
    position: "center",
    enterFrom: "fade",
  }),
  say(
    "maya",
    "worried",
    "Wait… you’re Arka, right? From the Engineering department?",
    { hideName: true },
  ),
  say("arka", "neutral", "Yeah. Do I know you?"),
  say(
    "maya",
    "worried",
    "I’m Maya. From the Medical Faculty… I see you a lot in the library corner. You always sit at the same table every afternoon. You… live here too?",
  ),
  say("arka", "neutral", "Just moved in today. Third floor."),
  say(
    "maya",
    "calm",
    "No way, what a coincidence! I’m on the third floor too, Unit 301. If you need anything about campus or good places to eat around here, just ask. Here… take my number. Just in case you need something about the apartment.",
  ),
  menu("Your choice?", [
    { id: "accept-maya-number", label: "Accept", next: "accept-maya-number" },
    {
      id: "decline-maya-number",
      label: "Decline",
      next: "decline-maya-number",
    },
  ]),
];

export const acceptMayaNumberScene: VisualNovelCommand[] = [
  say("maya", "calm", "Thanks, Arka… I’ll text you later, okay?"),
  jump("elena-encounter"),
];

export const declineMayaNumberScene: VisualNovelCommand[] = [
  say("maya", "calm", "Ah… sorry if I made you uncomfortable…"),
  jump("elena-encounter"),
];
