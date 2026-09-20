import type { VisualNovelCommand } from "@/types/novel";
import nadia55 from "@/voice/nadia/nadia_00055.mp3";
import nadia56 from "@/voice/nadia/nadia_00056.mp3";
import nadia57 from "@/voice/nadia/nadia_00057.mp3";
import nadia58 from "@/voice/nadia/nadia_00058.mp3";
import nadia59 from "@/voice/nadia/nadia_00059.mp3";
import nadia60 from "@/voice/nadia/nadia_00060.mp3";
import nadia61 from "@/voice/nadia/nadia_00061.mp3";
import nadia62 from "@/voice/nadia/nadia_00062.mp3";
import nadia63 from "@/voice/nadia/nadia_00063.mp3";
import nadia64 from "@/voice/nadia/nadia_00064.mp3";
import nadia65 from "@/voice/nadia/nadia_00065.mp3";
import nadia66 from "@/voice/nadia/nadia_00066.mp3";
import nadia67 from "@/voice/nadia/nadia_00067.mp3";
import nadia68 from "@/voice/nadia/nadia_00068.mp3";
import nadia69 from "@/voice/nadia/nadia_00069.mp3";
import nadia70 from "@/voice/nadia/nadia_00070.mp3";

const nadiaDay5Voices = [
  nadia55,
  nadia56,
  nadia57,
  nadia58,
  nadia59,
  nadia60,
  nadia61,
  nadia62,
  nadia63,
  nadia64,
  nadia65,
  nadia66,
  nadia67,
  nadia68,
  nadia69,
  nadia70,
] as const;

export const addNadiaDay5Voices = (commands: VisualNovelCommand[]): VisualNovelCommand[] => {
  let voiceIndex = 0;

  return commands.map((command) => {
    if (
      command.type !== "say" ||
      command.speaker !== "nadia" ||
      voiceIndex >= nadiaDay5Voices.length
    ) {
      return command;
    }

    return { ...command, voice: nadiaDay5Voices[voiceIndex++] };
  });
};
