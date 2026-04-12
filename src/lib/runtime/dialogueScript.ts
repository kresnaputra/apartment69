import {
  elenaEncounterScene,
  helpElenaScene,
  ignoreElenaScene,
} from "@/scenes/elenaEncounter";
import {
  acceptMayaNumberScene,
  declineMayaNumberScene,
  elevatorMeetingScene,
} from "@/scenes/elevatorMeeting";
import { epilogueScene } from "@/scenes/epilogue";
import {
  nadiaAdviceHelpScene,
  nadiaAdviceRefuseScene,
  nadiaBalconyScene,
} from "@/scenes/nadiaBalcony";
import { openingScene } from "@/scenes/opening";
import {
  saraHallwayScene,
  saraHelpScene,
  saraRefuseScene,
} from "@/scenes/saraHallway";
import {
  bedroomDay1ElenaScene,
  bedroomDay1MayaScene,
  bedroomDay1NadiaScene,
  bedroomDay1SaraScene,
  bedroomDay1Scene,
} from "@/scenes/bedroomDay1";
import { stayRouteScene } from "@/scenes/stayRoute";
import { visitRouteScene } from "@/scenes/visitRoute";
import type { VisualNovelScript } from "@/types/novel";
import { day2BedroomScene } from "@/scenes/day2-bedroom";
import { day2HallwayScene } from "@/scenes/day2-hallway";

export const demoScript: VisualNovelScript = {
  startLabel: "opening",
  labels: {
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
    "day2-bedroom": day2BedroomScene,
    "day2-hallway": day2HallwayScene,
    epilogue: epilogueScene,
  },
};
