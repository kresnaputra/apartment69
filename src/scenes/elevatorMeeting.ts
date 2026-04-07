import type { VisualNovelCommand } from "@/types/novel";
import { bg, jump, minigame, narrate, say, show } from "@/scenes/scriptTypes";
import elevator from "@/background/elevator.png";

export const elevatorMeetingScene: VisualNovelCommand[] = [
  bg(elevator, "Lentera Apartments - Elevator"),
  narrate(
    "Inside a slow, slightly creaking elevator, Arka stands in the corner, leaning his shoulder against the wall and holding onto his backpack strap.",
  ),
  show("arka-elevator", "arka", "neutral", {
    position: "left",
  }),
  narrate(
    "He reaches toward the old control panel and presses the button for the 3rd floor.",
  ),
  minigame("elevator-button"),
  narrate(
    "The doors slide open on the 2nd floor, and a girl with shoulder-length hair rushes in while clutching a stack of heavy medical textbooks to her chest.",
  ),
  show("maya-elevator", "maya", "neutral", {
    position: "center",
    enterFrom: "right",
  }),
  say("maya", "worried", "Almost missed it... please don't get stuck now..."),
  narrate(
    "Arka briefly glances at her from under his bangs, then returns his gaze to the elevator door with the same unreadable expression.",
  ),
  say(
    "maya",
    "surprised",
    "Wait... You're Arka, right? From the Engineering department at the University?",
  ),
  say("arka", "surprised", "Yeah. Do I know you?"),
  say(
    "maya",
    "worried",
    "I'm Maya. From Med school... I see you a lot at the corner of the library. You always sit at the same table every afternoon. You... live here too?",
  ),
  say("arka", "neutral", "Just moved in today. 3rd floor."),
  say(
    "maya",
    "surprised",
    "No way! What a coincidence. I'm on the 3rd floor too, Unit 301.",
  ),
  say(
    "maya",
    "calm",
    "If you ever need info about the campus or places to eat nearby, just ask. Here... take my number. Just in case there's any apartment business.",
  ),
  narrate("Maya hands over her phone with slightly trembling hands."),
  say("arka", "gentle", "Sure. Let me know if you need anything, Maya."),
  jump("elena-encounter"),
];
