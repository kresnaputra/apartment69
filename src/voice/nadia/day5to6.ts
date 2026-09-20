import type { VisualNovelCommand } from "@/types/novel";
import nadia78 from "@/voice/nadia/nadia_00078.mp3";
import nadia79 from "@/voice/nadia/nadia_00079.mp3";
import nadia80 from "@/voice/nadia/nadia_00080.mp3";
import nadia81 from "@/voice/nadia/nadia_00081.mp3";
import nadia82 from "@/voice/nadia/nadia_00082.mp3";
import nadia83 from "@/voice/nadia/nadia_00083.mp3";
import nadia84 from "@/voice/nadia/nadia_00084.mp3";
import nadia85 from "@/voice/nadia/nadia_00085.mp3";
import nadia86 from "@/voice/nadia/nadia_00086.mp3";
import nadia87 from "@/voice/nadia/nadia_00087.mp3";
import nadia88 from "@/voice/nadia/nadia_00088.mp3";
import nadia89 from "@/voice/nadia/nadia_00089.mp3";
import nadia90 from "@/voice/nadia/nadia_00090.mp3";
import nadia91 from "@/voice/nadia/nadia_00091.mp3";
import nadia92 from "@/voice/nadia/nadia_00092.mp3";
import nadia93 from "@/voice/nadia/nadia_00093.mp3";
import nadia94 from "@/voice/nadia/nadia_00094.mp3";
import nadia95 from "@/voice/nadia/nadia_00095.mp3";
import nadia96 from "@/voice/nadia/nadia_00096.mp3";
import nadia97 from "@/voice/nadia/nadia_00097.mp3";
import nadia98 from "@/voice/nadia/nadia_00098.mp3";

export const nadiaDay5To6Voices = [
  nadia78,
  nadia79,
  nadia80,
  nadia81,
  nadia82,
  nadia83,
  nadia84,
  nadia85,
  nadia86,
  nadia87,
  nadia88,
  nadia89,
  nadia90,
  nadia91,
  nadia92,
  nadia93,
  nadia94,
  nadia95,
  nadia96,
  nadia97,
  nadia98,
] as const;

export const addNadiaDay5To6Voices = (
  commands: VisualNovelCommand[],
  startIndex: number,
): VisualNovelCommand[] => {
  let voiceIndex = startIndex;

  return commands.map((command) => {
    if (
      command.type !== "say" ||
      command.speaker !== "nadia" ||
      voiceIndex >= nadiaDay5To6Voices.length
    ) {
      return command;
    }

    return { ...command, voice: nadiaDay5To6Voices[voiceIndex++] };
  });
};
