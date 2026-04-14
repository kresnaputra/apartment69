import type { VisualNovelCommand } from "@/types/novel";
import { bg, hide, jump, narrate, say, show } from "@/scenes/scriptTypes";
import hallwayUrl from "@/background/hallway.png";

export const day2HallwayScene: VisualNovelCommand[] = [
  bg(hallwayUrl, "Apartment 69 - Day 2 Hallway"),
  narrate(
    "The door slowly creaks open. Maya's standing there in an oversized pajama shirt, her hair tied up all messy, and her glasses sitting crooked on her face. The dark circles under her eyes are impossible to miss.",
  ),
  show("arka-day2-hallway", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  show("maya-day2-hallway", "maya", "worried", {
    position: "center",
    enterFrom: "fade",
  }),
  say("maya", "sad", "Arka...? What's up this early?"),
  say(
    "arka",
    "gentle",
    "Bought too much breakfast. And you kinda look like someone who hasn't slept at all.",
  ),
  narrate(
    "Maya takes the bag from him, and the smell alone makes her swallow hard.",
  ),
  say(
    "maya",
    "worried",
    "Yeah... I really haven't. I've got this anatomy journal assignment due by noon. Thanks... I legit don't even remember the last time I ate.",
  ),
  say("arka", "serious", "Eat while it's still warm. Don't push yourself too hard."),
  narrate(
    "From inside Maya's room, the laptop fan is screaming like a machine that's been running way past its limit.",
  ),
  say("arka", "serious", "Is that your laptop? Sounds like it's about to explode."),
  say(
    "maya",
    "worried",
    "(Long sigh) Yeah... it's been super slow since last night. Opening a Word doc takes five minutes. I'm scared my assignment file is gonna get corrupted.",
  ),
  say("arka", "gentle", "Let me take a quick look."),
  hide("maya-day2-hallway"),
  hide("arka-day2-hallway"),
  jump("day2-maya-bedroom"),
];
