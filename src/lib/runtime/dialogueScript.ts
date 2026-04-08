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
import { stayRouteScene } from "@/scenes/stayRoute";
import { visitRouteScene } from "@/scenes/visitRoute";
import type { VisualNovelScript } from "@/types/novel";

export const demoScript: VisualNovelScript = {
  startLabel: "elevator-meeting",
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
    epilogue: epilogueScene,
  },
};
