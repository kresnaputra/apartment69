import type { VisualNovelCommand } from "@/types/novel";
import {
  bg,
  hide,
  jump,
  minigame,
  narrate,
  say,
  setFlag,
  show,
} from "@/scenes/scriptTypes";
import universityUrl from "@/background/university.png";

export const day3RouteSelectionScene: VisualNovelCommand[] = [
  bg(universityUrl, "Campus Parking Area - 16:00"),
  show("arka-campus", "arka", "neutral", {
    position: "left",
    enterFrom: "fade",
  }),
  say(
    "arka",
    "serious",
    "Campus stuff's finally done. Maya looked seriously messed up this morning, but she just texted me saying she's gonna lock in and chip away at exam prep, so I shouldn't bug her for now.",
  ),
  say(
    "arka",
    "neutral",
    "Still got a decent chunk of the day left, though. So... where do I head next, or who do I help out?",
  ),
  narrate(
    "(Arka opens his contact list. Maya's name is greyed out because she's in full study mode.)",
  ),

  hide("arka-campus"),
  minigame("smartphone-contacts", {
    showSleepOption: true,
    disabledContacts: ["maya"],
    title: "Pick the next route",
    subtitle:
      "Slot 2 · Late afternoon / night. Maya's off the board for now, so pick someone else to check on.",
    contactOverrides: {
      maya: {
        blurb:
          "She's gotta lock in for exams. Better leave her alone till tomorrow.",
      },
      elena: {
        blurb:
          "That cold attitude of hers is kinda weirdly interesting. Maybe I can find an excuse to talk to her again and see what kind of reaction I get.",
        next: "day3-slot2-elena",
        disabled: false,
      },
      nadia: {
        blurb:
          "She asked me to meet her at the cafe downstairs. Free coffee after a day of classes and hauling boxes around? Yeah, that's tempting.",
        next: "day3-slot2-nadia",
        disabled: false,
      },
      sara: {
        name: "Sarah",
        blurb:
          "That penthouse job sounds like easy extra cash. Plus, I'm curious what kind of system is so busted she's handling it herself.",
        next: "day3-slot2-sarah",
        disabled: false,
      },
      sleep: {
        name: "Skip Day",
        blurb: "Call it a day, head home, and save the rest for tomorrow.",
        next: "day3-complete",
        disabled: false,
      },
    },
  }),
];

export const day3Slot2ElenaScene: VisualNovelCommand[] = [
  setFlag("slot2Route", "elena"),
  say(
    "arka",
    "serious",
    "Elena it is. She acts all sharp and untouchable, but that just makes me wanna see what's really going on with her.",
  ),
  jump("day3-slot2-complete"),
];

export const day3Slot2NadiaScene: VisualNovelCommand[] = [
  setFlag("slot2Route", "nadia"),
  say(
    "arka",
    "surprised",
    "Nadia wins. Free coffee, zero chance of things staying normal, and honestly? That sounds way better than going straight home.",
  ),
  jump("day3-slot2-complete"),
];

export const day3Slot2SarahScene: VisualNovelCommand[] = [
  setFlag("slot2Route", "sarah"),
  say(
    "arka",
    "neutral",
    "Sarah it is. If there's money on the table and some broken penthouse system involved, I should probably go see what kind of mess I'm walking into.",
  ),
  jump("day3-slot2-complete"),
];
