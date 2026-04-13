import type { VisualNovelCommand } from "@/types/novel";
import {
  bg,
  narrate,
  say,
  show,
  hide,
  jump,
  menu,
  setFlag,
} from "@/scenes/scriptTypes";
import hallwayUrl from "@/background/hallway.png";
import mayaBedroomUrl from "@/background/maya-bedroom.png";

export const mayaPhoneCallScene: VisualNovelCommand[] = [
  bg(hallwayUrl, "Apartment 69 - Hallway"),

  narrate(
    "Arka (thinking): \"Dude, I was literally about to head out to campus when I heard some commotion coming from Maya's room. Her door's cracked open a bit.\"",
  ),

  narrate(
    "Voice on phone: \"...Dad doesn't wanna hear excuses about broken laptops or whatever. You're there to study! If you bomb that anatomy exam next week, just pack your bags and come home. No more college for you.\"",
  ),

  narrate(
    "Maya: (voice shaking) \"Y-yes, Dad... I get it. I'll try harder. I'm sorry...\"",
  ),

  narrate(
    "(Click. The line goes dead. Silence for a sec, then... muffled sobbing. Arka just stands there in the hallway, processing what he heard before finally giving the door a soft knock.)",
  ),

  narrate(
    "Arka (thinking): \"Damn, no wonder she's so stressed out. Her dad's pressure is insane. Feels wrong to just dip and pretend I didn't hear all that.\"",
  ),

  show("arka-hallway", "arka", "serious", {
    position: "left",
    enterFrom: "left",
  }),

  say("arka", "gentle", "Maya? Uh, sorry... your door's kinda open."),

  bg(mayaBedroomUrl, "Apartment 69 - Maya's Bedroom"),
  show("maya-bedroom", "maya", "worried", {
    position: "center",
    enterFrom: "fade",
  }),

  narrate(
    "(Maya looks startled, quickly wiping her eyes with her sleeve. She's standing in the middle of her messy room, trying to smile even though her eyes are all red.)",
  ),

  say(
    "maya",
    "worried",
    "Oh, Arka. You haven't left yet? Sorry, I forgot to shut the door all the way.",
  ),

  say(
    "arka",
    "serious",
    "I kinda heard what happened just now. Your dad... he always rides you this hard?",
  ),

  say(
    "maya",
    "calm",
    "Yeah, basically. He just wants me to graduate med school with perfect grades. Sometimes it's exhausting, like I'm just expected to be some studying robot.",
  ),

  menu("How does Arka calm her down?", [
    {
      id: "logical",
      label: "Logical Approach",
      next: "maya-phone-call-logical",
    },
    {
      id: "empathy",
      label: "Empathy Approach",
      next: "maya-phone-call-empathy",
    },
  ]),
];

export const mayaPhoneCallLogicalScene: VisualNovelCommand[] = [
  say(
    "arka",
    "serious",
    "Your brain's got limits too, y'know. Push it too hard and it'll just blank out on you—same error as your laptop yesterday.",
  ),

  narrate(
    "(Maya pauses, looking at Arka like that actually made sense. Her breathing slows down a bit.)",
  ),

  say(
    "maya",
    "calm",
    "You're... kinda right. I've been running on fumes. Maybe I do need to actually rest instead of cramming 24/7.",
  ),

  say(
    "arka",
    "gentle",
    "Exactly. Even machines need downtime. You're not a robot, Maya.",
  ),

  narrate(
    "(Effect: Maya realizes she needs rest, her respect for Arka's way of thinking increases.)",
  ),

  setFlag("maya-love", 1),
];

export const mayaPhoneCallEmpathyScene: VisualNovelCommand[] = [
  say(
    "arka",
    "gentle",
    "It's okay if you need to cry first. Totally normal to be stressed like this. You don't have to hold it in around me.",
  ),

  narrate(
    "(Maya's eyes well up again. She doesn't say anything for a moment, then just... lets it out. Arka stays quiet, giving her space.)",
  ),

  say(
    "maya",
    "worried",
    "(sniffling) Thanks... I didn't realize how much I needed to hear that. Everyone always expects me to just... handle it.",
  ),

  say(
    "arka",
    "gentle",
    "You don't have to be strong all the time. Not with me, at least.",
  ),

  narrate(
    "(Effect: Maya feels safer and not judged, emotional closeness increases.)",
  ),

  setFlag("maya-love", 2),
];
