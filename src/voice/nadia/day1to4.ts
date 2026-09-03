import type { VisualNovelCommand } from "@/types/novel";
import nadia1 from "@/voice/nadia/nadia_00001.mp3";
import nadia2 from "@/voice/nadia/nadia_00002.mp3";
import nadia3 from "@/voice/nadia/nadia_00003.mp3";
import nadia4 from "@/voice/nadia/nadia_00004.mp3";
import nadia5 from "@/voice/nadia/nadia_00005.mp3";
import nadia6 from "@/voice/nadia/nadia_00006.mp3";
import nadia7 from "@/voice/nadia/nadia_00007.mp3";
import nadia8 from "@/voice/nadia/nadia_00008.mp3";
import nadia9 from "@/voice/nadia/nadia_00009.mp3";
import nadia10 from "@/voice/nadia/nadia_00010.mp3";
import nadia11 from "@/voice/nadia/nadia_00011.mp3";
import nadia12 from "@/voice/nadia/nadia_00012.mp3";
import nadia13 from "@/voice/nadia/nadia_00013.mp3";
import nadia14 from "@/voice/nadia/nadia_00014.mp3";
import nadia15 from "@/voice/nadia/nadia_00015.mp3";
import nadia16 from "@/voice/nadia/nadia_00016.mp3";
import nadia17 from "@/voice/nadia/nadia_00017.mp3";
import nadia18 from "@/voice/nadia/nadia_00018.mp3";
import nadia19 from "@/voice/nadia/nadia_00019.mp3";
import nadia20 from "@/voice/nadia/nadia_00020.mp3";
import nadia21 from "@/voice/nadia/nadia_00021.mp3";
import nadia22 from "@/voice/nadia/nadia_00022.mp3";
import nadia23 from "@/voice/nadia/nadia_00023.mp3";
import nadia24 from "@/voice/nadia/nadia_00024.mp3";
import nadia25 from "@/voice/nadia/nadia_00025.mp3";
import nadia26 from "@/voice/nadia/nadia_00026.mp3";
import nadia27 from "@/voice/nadia/nadia_00027.mp3";
import nadia28 from "@/voice/nadia/nadia_00028.mp3";
import nadia29 from "@/voice/nadia/nadia_00029.mp3";
import nadia30 from "@/voice/nadia/nadia_00030.mp3";
import nadia31 from "@/voice/nadia/nadia_00031.mp3";
import nadia32 from "@/voice/nadia/nadia_00032.mp3";
import nadia33 from "@/voice/nadia/nadia_00033.mp3";
import nadia34 from "@/voice/nadia/nadia_00034.mp3";
import nadia35 from "@/voice/nadia/nadia_00035.mp3";
import nadia36 from "@/voice/nadia/nadia_00036.mp3";
import nadia37 from "@/voice/nadia/nadia_00037.mp3";
import nadia38 from "@/voice/nadia/nadia_00038.mp3";
import nadia39 from "@/voice/nadia/nadia_00039.mp3";
import nadia40 from "@/voice/nadia/nadia_00040.mp3";
import nadia41 from "@/voice/nadia/nadia_00041.mp3";
import nadia42 from "@/voice/nadia/nadia_00042.mp3";
import nadia43 from "@/voice/nadia/nadia_00043.mp3";
import nadia44 from "@/voice/nadia/nadia_00044.mp3";
import nadia45 from "@/voice/nadia/nadia_00045.mp3";
import nadia46 from "@/voice/nadia/nadia_00046.mp3";
import nadia47 from "@/voice/nadia/nadia_00047.mp3";
import nadia48 from "@/voice/nadia/nadia_00048.mp3";
import nadia49 from "@/voice/nadia/nadia_00049.mp3";
import nadia50 from "@/voice/nadia/nadia_00050.mp3";
import nadia51 from "@/voice/nadia/nadia_00051.mp3";
import nadia52 from "@/voice/nadia/nadia_00052.mp3";
import nadia53 from "@/voice/nadia/nadia_00053.mp3";
import nadia54 from "@/voice/nadia/nadia_00054.mp3";

export const nadiaDay1To4Voices = [
  nadia1,
  nadia2,
  nadia3,
  nadia4,
  nadia5,
  nadia6,
  nadia7,
  nadia8,
  nadia9,
  nadia10,
  nadia11,
  nadia12,
  nadia13,
  nadia14,
  nadia15,
  nadia16,
  nadia17,
  nadia18,
  nadia19,
  nadia20,
  nadia21,
  nadia22,
  nadia23,
  nadia24,
  nadia25,
  nadia26,
  nadia27,
  nadia28,
  nadia29,
  nadia30,
  nadia31,
  nadia32,
  nadia33,
  nadia34,
  nadia35,
  nadia36,
  nadia37,
  nadia38,
  nadia39,
  nadia40,
  nadia41,
  nadia42,
  nadia43,
  nadia44,
  nadia45,
  nadia46,
  nadia47,
  nadia48,
  nadia49,
  nadia50,
  nadia51,
  nadia52,
  nadia53,
  nadia54,
] as const;

export const addNadiaVoices = (
  commands: VisualNovelCommand[],
  startIndex: number,
): VisualNovelCommand[] => {
  let voiceIndex = startIndex;

  return commands.map((command) => {
    if (
      command.type !== "say" ||
      command.speaker !== "nadia" ||
      voiceIndex >= nadiaDay1To4Voices.length
    ) {
      return command;
    }

    return { ...command, voice: nadiaDay1To4Voices[voiceIndex++] };
  });
};
