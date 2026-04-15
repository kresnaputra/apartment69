import {
  elenaEncounterScene,
  helpElenaScene,
  ignoreElenaScene,
} from "@/scenes/day1/elenaEncounter";
import {
  acceptMayaNumberScene,
  declineMayaNumberScene,
  elevatorMeetingScene,
} from "@/scenes/day1/elevatorMeeting";
import { epilogueScene } from "@/scenes/epilogue";
import {
  nadiaAdviceHelpScene,
  nadiaAdviceRefuseScene,
  nadiaBalconyScene,
} from "@/scenes/day1/nadiaBalcony";
import { openingScene } from "@/scenes/day1/opening";
import {
  saraHallwayScene,
  saraHelpScene,
  saraRefuseScene,
} from "@/scenes/day1/saraHallway";
import {
  bedroomDay1ElenaScene,
  bedroomDay1MayaScene,
  bedroomDay1NadiaScene,
  bedroomDay1SaraScene,
  bedroomDay1Scene,
} from "@/scenes/day1/bedroomDay1";
import { stayRouteScene } from "@/scenes/stayRoute";
import { visitRouteScene } from "@/scenes/visitRoute";
import type { VisualNovelScript } from "@/types/novel";
import { day1ComplateScene } from "@/scenes/day1/day1-complate";
import { day2BedroomScene } from "@/scenes/day2/day2-bedroom";
import { day2FreeTimeScene } from "@/scenes/day2/day2-free-time";
import { day2HallwayScene } from "@/scenes/day2/day2-hallway";
import { day2MayaBedroomScene } from "@/scenes/day2/day2-maya-bedroom";
import { day2ComplateScene } from "@/scenes/day2/day2-complate";
import { mayaPhoneCallScene, mayaPhoneCallLogicalScene, mayaPhoneCallEmpathyScene } from "@/scenes/day3/day3-mayaPhoneCall";
import {
  day3RouteSelectionScene,
  day3Slot2ElenaScene,
  day3Slot2NadiaScene,
  day3Slot2SarahScene,
} from "@/scenes/day3/day3-route-selection";
import { day3ComplateScene } from "@/scenes/day3/day3-complate";
import {
  day4MayaBadEndingScene,
  day4MayaCollapseScene,
  day4MayaForceRestScene,
} from "@/scenes/day4/day4-maya-collapse";

export const demoScript: VisualNovelScript = {
  startLabel: "opening",
  labels: {
    // Day 1
    opening: openingScene,
    "elevator-meeting": elevatorMeetingScene,
    "accept-maya-number": acceptMayaNumberScene,
    "decline-maya-number": declineMayaNumberScene,
    "elena-encounter": elenaEncounterScene,
    "help-elena": helpElenaScene,
    "ignore-elena": ignoreElenaScene,
    "stay-route": stayRouteScene,
    "visit-route": visitRouteScene,
    "nadia-balcony": nadiaBalconyScene,
    "nadia-advice-help": nadiaAdviceHelpScene,
    "nadia-advice-refuse": nadiaAdviceRefuseScene,
    "sara-hallway": saraHallwayScene,
    "sara-help": saraHelpScene,
    "sara-refuse": saraRefuseScene,
    "bedroom-day1": bedroomDay1Scene,
    "bedroom-day1-maya": bedroomDay1MayaScene,
    "bedroom-day1-elena": bedroomDay1ElenaScene,
    "bedroom-day1-nadia": bedroomDay1NadiaScene,
    "bedroom-day1-sara": bedroomDay1SaraScene,
    "day1-complate": day1ComplateScene,
    // Day 2
    "day2-bedroom": day2BedroomScene,
    "day2-hallway": day2HallwayScene,
    "day2-maya-bedroom": day2MayaBedroomScene,
    "day2-free-time": day2FreeTimeScene,
    "day2-complate": day2ComplateScene,
    // Day 3
    "day3-maya-phone-call": mayaPhoneCallScene,
    "maya-phone-call-logical": mayaPhoneCallLogicalScene,
    "maya-phone-call-empathy": mayaPhoneCallEmpathyScene,
    "day3-route-selection": day3RouteSelectionScene,
    "day3-slot2-elena": day3Slot2ElenaScene,
    "day3-slot2-nadia": day3Slot2NadiaScene,
    "day3-slot2-sarah": day3Slot2SarahScene,
    "day3-complete": day3ComplateScene,
    // Day 4
    "day4-maya-collapse": day4MayaCollapseScene,
    "day4-maya-bad-ending": day4MayaBadEndingScene,
    "day4-maya-force-rest": day4MayaForceRestScene,
    epilogue: epilogueScene,
  },
};
