import type { VisualNovelCommand } from "@/types/novel";
import { bg, hide, menu, narrate, say, show } from "@/scenes/scriptTypes";
import hallway from "@/background/hallway.png";

export const saraHallwayScene: VisualNovelCommand[] = [
  bg(hallway, "Lentera Apartments - 3rd Floor Hallway"),
  hide("nadia-balcony"),
  hide("arka-balcony"),
  show("arka-hallway", "arka", "neutral", {
    position: "left",
    enterFrom: "left",
  }),
  narrate(
    "Who is that? Judging by the way she carries herself, she is clearly not a resident of this floor. The third floor is usually for standard units, not suites.",
  ),
  show("sara-hallway", "sara", "neutral", {
    position: "center",
    enterFrom: "right",
    xOffset: 0.0,
  }),
  say(
    "sara",
    "neutral",
    "This corridor is much quieter than I imagined. Womanizer, right? The new resident in Unit 302.",
    { hideName: true },
  ),
  say(
    "arka",
    "serious",
    "Word travels that fast in this building? Even all the way down from the upper floors?",
  ),
  narrate(
    "She smiles faintly, her eyes studying Arka with a polite kind of curiosity.",
  ),
  say(
    "sara",
    "neutral",
    "I'm Sarah. I live in the penthouse. In a building like this, someone moving in with a server rack of his own is bound to become a topic of conversation.",
  ),
  say(
    "arka",
    "neutral",
    "Just a hobby that got a little out of hand. Is there something I can help you with?",
  ),
  say(
    "sara",
    "neutral",
    "Maybe. The automation system in my unit is out of sync with the central hub. Building maintenance says it will take three days because they need approval from the main vendor. I think you could do it in thirty minutes.",
  ),
  menu("So, what do you wanna do?", [
    {
      id: "help-sara",
      label: "Help her",
      next: "sara-help",
    },
    {
      id: "refuse-sara",
      label: "Turn her down",
      next: "sara-refuse",
    },
  ]),
];

export const saraHelpScene: VisualNovelCommand[] = [
  say(
    "arka",
    "gentle",
    "Sure. Just save my number, and I'll see what I can do when I have the chance.",
  ),
  say(
    "sara",
    "neutral",
    "A wise choice. I don't need guarantees, Womanizer. I only need someone I can rely on when I call.",
  ),
  say(
    "sara",
    "neutral",
    "Don't take too long checking your schedule. The view from up there is much better than it is down here. I'll be waiting.",
  ),
  hide("sara-hallway", "fadeAway"),
  narrate(
    "The private elevator opens. Sarah steps inside and disappears behind the tightly sealed silver doors. Arka remains alone in the corridor, with a trace of her perfume still lingering in the air.",
  ),
];

export const saraRefuseScene: VisualNovelCommand[] = [
  say(
    "arka",
    "serious",
    "Sorry. I think you'd be better off waiting for an official technician. I just got back from campus.",
  ),
  say(
    "sara",
    "neutral",
    "Fair enough. It would be safer to leave it to a professional.",
  ),
  narrate("Sarah turns away at once, ready to leave."),
  say(
    "arka",
    "shy",
    "But I can't promise I'll always have free time. Let me check my class schedule first.",
  ),
  say(
    "sara",
    "neutral",
    "A wise choice. I don't need guarantees, Womanizer. I only need someone I can rely on when I call.",
  ),
  say(
    "sara",
    "neutral",
    "Don't take too long checking your schedule. The view from up there is much better than it is down here. I'll be waiting.",
  ),
  hide("sara-hallway", "fadeAway"),
  narrate(
    "The private elevator opens. Sarah steps inside and disappears behind the tightly sealed silver doors. Arka remains alone in the corridor, with a trace of her perfume still lingering in the air.",
  ),
];
