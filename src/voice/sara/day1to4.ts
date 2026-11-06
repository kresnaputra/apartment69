import type { VisualNovelCommand } from "@/types/novel";
import sara1 from "@/voice/sara/sarah_00001.mp3";
import sara2 from "@/voice/sara/sarah_00002.mp3";
import sara3 from "@/voice/sara/sarah_00003.mp3";
import sara4 from "@/voice/sara/sarah_00004.mp3";
import sara5 from "@/voice/sara/sarah_00005.mp3";
import sara6 from "@/voice/sara/sarah_00006.mp3";
import sara7 from "@/voice/sara/sarah_00007.mp3";
import sara8 from "@/voice/sara/sarah_00008.mp3";
import sara9 from "@/voice/sara/sarah_00009.mp3";
import sara10 from "@/voice/sara/sarah_000010.mp3";
import sara11 from "@/voice/sara/sarah_000011.mp3";
import sara12 from "@/voice/sara/sarah_000012.mp3";
import sara13 from "@/voice/sara/sarah_000013.mp3";
import sara14 from "@/voice/sara/sarah_000014.mp3";
import sara15 from "@/voice/sara/sarah_000015.mp3";
import sara16 from "@/voice/sara/sarah_000016.mp3";
import sara17 from "@/voice/sara/sarah_000017.mp3";
import sara18 from "@/voice/sara/sarah_000018.mp3";
import sara19 from "@/voice/sara/sarah_000019.mp3";
import sara20 from "@/voice/sara/sarah_000020.mp3";
import sara21 from "@/voice/sara/sarah_000021.mp3";
import sara22 from "@/voice/sara/sarah_000022.mp3";
import sara23 from "@/voice/sara/sarah_000023.mp3";
import sara24 from "@/voice/sara/sarah_000024.mp3";
import sara25 from "@/voice/sara/sarah_000025.mp3";
import sara26 from "@/voice/sara/sarah_000026.mp3";
import sara27 from "@/voice/sara/sarah_000027.mp3";
import sara28 from "@/voice/sara/sarah_000028.mp3";
import sara29 from "@/voice/sara/sarah_000029.mp3";
import sara30 from "@/voice/sara/sarah_000030.mp3";
import sara31 from "@/voice/sara/sarah_000031.mp3";
import sara32 from "@/voice/sara/sarah_000032.mp3";
import sara33 from "@/voice/sara/sarah_000033.mp3";
import sara34 from "@/voice/sara/sarah_000034.mp3";
import sara35 from "@/voice/sara/sarah_000035.mp3";
import sara36 from "@/voice/sara/sarah_000036.mp3";
import sara37 from "@/voice/sara/sarah_000037.mp3";
import sara38 from "@/voice/sara/sarah_000038.mp3";
import sara39 from "@/voice/sara/sarah_000039.mp3";
import sara40 from "@/voice/sara/sarah_000040.mp3";
import sara41 from "@/voice/sara/sarah_000041.mp3";
import sara42 from "@/voice/sara/sarah_000042.mp3";
import sara43 from "@/voice/sara/sarah_000043.mp3";
import sara44 from "@/voice/sara/sarah_000044.mp3";
import sara45 from "@/voice/sara/sarah_000045.mp3";
import sara46 from "@/voice/sara/sarah_000046.mp3";
import sara47 from "@/voice/sara/sarah_000047.mp3";
import sara48 from "@/voice/sara/sarah_000048.mp3";
import sara49 from "@/voice/sara/sarah_000049.mp3";
import sara50 from "@/voice/sara/sarah_000050.mp3";
import sara51 from "@/voice/sara/sarah_000051.mp3";
import sara52 from "@/voice/sara/sarah_000052.mp3";
import sara53 from "@/voice/sara/sarah_000053.mp3";
import sara54 from "@/voice/sara/sarah_000054.mp3";
import sara55 from "@/voice/sara/sarah_000055.mp3";
import sara56 from "@/voice/sara/sarah_000056.mp3";
import sara57 from "@/voice/sara/sarah_000057.mp3";
import sara58 from "@/voice/sara/sarah_000058.mp3";
import sara59 from "@/voice/sara/sarah_000059.mp3";
import sara60 from "@/voice/sara/sarah_000060.mp3";
import sara61 from "@/voice/sara/sarah_000061.mp3";

export const saraDay1To4Voices = [
  sara1, sara2, sara3, sara4, sara5, sara6, sara7, sara8, sara9, sara10,
  sara11, sara12, sara13, sara14, sara15, sara16, sara17, sara18, sara19, sara20,
  sara21, sara22, sara23, sara24, sara25, sara26, sara27, sara28, sara29, sara30,
  sara31, sara32, sara33, sara34, sara35, sara36, sara37, sara38, sara39, sara40,
  sara41, sara42, sara43, sara44, sara45, sara46, sara47, sara48, sara49, sara50,
  sara51, sara52, sara53, sara54, sara55, sara56, sara57, sara58, sara59, sara60,
  sara61,
] as const;

export const addSaraVoices = (
  commands: VisualNovelCommand[],
  startIndex: number,
  skipFirst = false,
): VisualNovelCommand[] => {
  let voiceIndex = startIndex;
  let skipped = false;

  return commands.map((command) => {
    if (command.type !== "say" || command.speaker !== "sara") return command;
    if (skipFirst && !skipped) {
      skipped = true;
      return command;
    }

    const voice = saraDay1To4Voices[voiceIndex++];
    if (!voice) throw new Error(`Missing Sara voice at index ${voiceIndex - 1}`);
    return { ...command, voice };
  });
};
