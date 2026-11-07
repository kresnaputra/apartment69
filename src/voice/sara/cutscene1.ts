import type { CutSceneNarrationEntry } from "@/types/novel";
import sara1 from "@/voice/sara/sarah_cut_scene_1_01.mp3";
import sara2 from "@/voice/sara/sarah_cut_scene_1_02.mp3";
import sara3 from "@/voice/sara/sarah_cut_scene_1_03.mp3";
import sara4 from "@/voice/sara/sarah_cut_scene_1_04.mp3";
import sara5 from "@/voice/sara/sarah_cut_scene_1_05.mp3";
import sara6 from "@/voice/sara/sarah_cut_scene_1_06.mp3";
import sara7 from "@/voice/sara/sarah_cut_scene_1_07.mp3";
import sara8 from "@/voice/sara/sarah_cut_scene_1_08.mp3";
import sara9 from "@/voice/sara/sarah_cut_scene_1_09.mp3";
import sara10 from "@/voice/sara/sarah_cut_scene_1_10.mp3";
import sara11 from "@/voice/sara/sarah_cut_scene_1_11.mp3";
import sara12 from "@/voice/sara/sarah_cut_scene_1_12.mp3";
import sara13 from "@/voice/sara/sarah_cut_scene_1_13.mp3";
import sara14 from "@/voice/sara/sarah_cut_scene_1_14.mp3";
import sara15 from "@/voice/sara/sarah_cut_scene_1_15.mp3";
import sara16 from "@/voice/sara/sarah_cut_scene_1_16.mp3";
import sara17 from "@/voice/sara/sarah_cut_scene_1_17.mp3";
import sara18 from "@/voice/sara/sarah_cut_scene_1_18.mp3";
import sara19 from "@/voice/sara/sarah_cut_scene_1_19.mp3";
import sara20 from "@/voice/sara/sarah_cut_scene_1_20.mp3";
import sara21 from "@/voice/sara/sarah_cut_scene_1_21.mp3";
import sara22 from "@/voice/sara/sarah_cut_scene_1_22.mp3";
import sara23 from "@/voice/sara/sarah_cut_scene_1_23.mp3";
import sara24 from "@/voice/sara/sarah_cut_scene_1_24.mp3";

export const saraCutScene1Voices = [
  sara1, sara2, sara3, sara4, sara5, sara6, sara7, sara8,
  sara9, sara10, sara11, sara12, sara13, sara14, sara15, sara16,
  sara17, sara18, sara19, sara20, sara21, sara22, sara23, sara24,
] as const;

export const addSaraCutSceneVoices = (
  entries: CutSceneNarrationEntry[],
  startIndex: number,
): CutSceneNarrationEntry[] => {
  let voiceIndex = startIndex;

  return entries.map((entry) => {
    const text = typeof entry === "object" && entry !== null && "text" in entry ? entry.text : entry;
    const indonesian = typeof text === "string" ? text : text.id ?? "";
    if (!indonesian.startsWith("Sarah:")) return entry;

    const voice = saraCutScene1Voices[voiceIndex++];
    if (!voice) throw new Error(`Missing Sara cutscene voice at index ${voiceIndex - 1}`);
    return { text, voice };
  });
};
