import type { VisualNovelCommand } from "@/types/novel";
import {
  bg,
  narrate,
  say,
  show,
  menu,
  jump,
  setFlag,
  cutScene,
  hide,
} from "@/scenes/scriptTypes";
import hallwayUrl from "@/background/hallway.png";
import mayaBedroomUrl from "@/background/maya-bedroom.png";
import mayaPhoneCallVideo from "@/cut-scene/cutscene-maya-room.webm?url";

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

  cutScene(mayaPhoneCallVideo),

  narrate(
    "(Maya looks startled, quickly wiping her eyes with her sleeve. She's standing in the middle of her messy room, trying to smile even though her eyes are all red.)",
  ),

  show("maya-bedroom", "maya", "worried", {
    position: "center",
    enterFrom: "fade",
  }),

  say(
    "maya",
    "sad",
    "Oh, Arka. You haven't left yet? Sorry, I forgot to shut the door all the way.",
  ),

  bg(mayaBedroomUrl, "Apartment 69 - Maya's Bedroom"),

  say(
    "arka",
    "serious",
    "I kinda heard what happened just now. Your dad... he always rides you this hard?",
  ),

  say(
    "maya",
    "sad",
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
    "neutral",
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
  hide("maya-bedroom"),
  hide("arka-hallway"),
  jump("day3-route-selection"),
];

export const mayaPhoneCallEmpathyScene: VisualNovelCommand[] = [
  say(
    "arka",
    "gentle",
    "It's okay if you need to cry first, Maya. Totally normal to be stressed when you're constantly under pressure like that. You don't have to hold it in around me.",
  ),

  narrate(
    "(Hearing that, Maya finally can't hold it in anymore and cries. Arka steps closer, gently patting her shoulder and letting her calm down on her own. No poetic words, just being there for someone who needs support.)",
  ),

  say(
    "maya",
    "sad",
    "(After calming down a bit, wiping her eyes again) Thanks, Arka. Sorry for being all emotional this early in the morning.",
  ),

  say(
    "arka",
    "gentle",
    "Relax. Better to let it out than let it eat you up inside. Go wash your face. I'm heading to campus. If you need anything, just text me.",
  ),

  say("maya", "blush", "(Nods softly) Yeah. Be careful out there."),

  narrate(
    "(Effect: Maya feels safer and not judged, emotional closeness increases.)",
  ),

  setFlag("maya-love", 2),
  hide("maya-bedroom"),
  hide("arka-hallway"),
  jump("day3-route-selection"),
];
