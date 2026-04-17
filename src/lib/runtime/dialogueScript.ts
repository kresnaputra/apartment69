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
import { day5MayaMorningScene, day5LobbyFarewellScene } from "@/scenes/day5/day5-maya-morning";
import { day5ComplateScene } from "@/scenes/day5/day5-complate";
import {
  day6PapaConfrontationScene,
  day6ProtectiveScene,
  day6SupportiveScene,
  day6AftermathScene,
} from "@/scenes/day6/day6-papa-confrontation";
import { day6ComplateScene } from "@/scenes/day6/day6-complate";
import {
  day7IntroScene,
  day7DevotedSubmissionScene,
  day7EternalPromiseScene,
} from "@/scenes/day7/day7-endings";
import { day4ComplateScene } from "@/scenes/day4/day4-complate";

export const demoScript: VisualNovelScript = {
  startLabel: "day5-maya-morning",
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
    "day4-complate": day4ComplateScene,
    // Day 5
    "day5-maya-morning": day5MayaMorningScene,
    "day5-lobby-farewell": day5LobbyFarewellScene,
    "day5-complate": day5ComplateScene,
    // Day 6
    "day6-papa-confrontation": day6PapaConfrontationScene,
    "day6-protective": day6ProtectiveScene,
    "day6-supportive": day6SupportiveScene,
    "day6-aftermath": day6AftermathScene,
    "day6-complate": day6ComplateScene,
    // Day 7
    "day7-intro": day7IntroScene,
    "day7-devoted-submission": day7DevotedSubmissionScene,
    "day7-eternal-promise": day7EternalPromiseScene,
    epilogue: epilogueScene,
  },
};
