import type {} from "bun";
import { expect, test } from "bun:test";
import type { CutSceneNarrationEntry, VisualNovelCommand } from "./src/types/novel";
import saraForgetVoice from "./src/voice/sara/sarah_forget.mp3";
import { saraDay1To4Voices } from "./src/voice/sara/day1to4";
import { saraCutScene1Voices } from "./src/voice/sara/cutscene1";
import { saraHallwayScene, saraHelpScene, saraRefuseScene } from "./src/scenes/day1/saraHallway";
import {
  day2SaraScene, day2SaraAcceptScene, day2SaraDelayScene, day2SaraLiftScene,
  day2SaraAfterCablesScene, day2SaraYesScene, day2SaraMaybeScene, day2SaraEndingScene,
} from "./src/scenes/day2/sara/day2-sara";
import {
  day3SaraStartScene, day3SaraCafeContinueScene, day3SaraEscortScene, day3SaraDeclineScene,
} from "./src/scenes/day3/sara/day3-sara";
import {
  day4SaraStartScene, day4SaraCarInviteScene, day4SaraTensionScene, day4SaraEndingScene,
  day4SaraGalleryScene, day4SaraTooLongScene, day4SaraNotStrongScene, day4SaraKissScene,
} from "./src/scenes/day4/sara/day4-sara";

const voicesIn = (commands: VisualNovelCommand[]) =>
  commands.filter((command) => command.type === "say" && command.speaker === "sara")
    .map((command) => command.type === "say" ? command.voice : undefined);

test("Sara's day 1-4 dialogue uses the matching recordings, including her Day 3 greeting", () => {
  const groups: Array<[VisualNovelCommand[], number, number]> = [
    [saraHallwayScene, 0, 3],
    [saraHelpScene, 3, 2],
    [saraRefuseScene, 5, 2],
    [day2SaraScene, 7, 4],
    [day2SaraAcceptScene, 11, 1],
    [day2SaraDelayScene, 12, 2],
    [day2SaraLiftScene, 14, 4],
    [day2SaraAfterCablesScene, 18, 9],
    [day2SaraYesScene, 27, 1],
    [day2SaraMaybeScene, 28, 1],
    [day2SaraEndingScene, 29, 1],
    [day3SaraStartScene, 30, 6],
    [day3SaraCafeContinueScene, 36, 6],
    [day3SaraEscortScene, 42, 5],
    [day3SaraDeclineScene, 47, 1],
    [day4SaraStartScene, 48, 6],
    [day4SaraCarInviteScene, 54, 2],
    [day4SaraTensionScene, 56, 1],
    [day4SaraEndingScene, 57, 4],
  ];

  expect(saraDay1To4Voices).toHaveLength(61);
  for (const [commands, start, count] of groups) {
    const voices = voicesIn(commands);
    const expected = commands === day3SaraStartScene
      ? [saraForgetVoice, ...saraDay1To4Voices.slice(start, start + count)]
      : commands === day4SaraTensionScene
        ? [saraCutScene1Voices[7]]
        : saraDay1To4Voices.slice(start, start + count);
    expect(voices).toEqual(expected);
  }
  expect(voicesIn(day3SaraStartScene)[0]).toBe(saraForgetVoice);
  expect(voicesIn(day3SaraStartScene)[1]).toBe(saraDay1To4Voices[30]);
  expect(voicesIn(day4SaraStartScene)[0]).toBe(saraDay1To4Voices[48]);
  expect(groups.flatMap(([commands]) => voicesIn(commands))).toEqual([
    ...saraDay1To4Voices.slice(0, 30),
    saraForgetVoice,
    ...saraDay1To4Voices.slice(30, 56),
    saraCutScene1Voices[7],
    ...saraDay1To4Voices.slice(57),
  ]);
});

const cutSceneEntriesIn = (commands: VisualNovelCommand[]): CutSceneNarrationEntry[] =>
  commands.flatMap((command) => command.type === "cutScene"
    ? Array.isArray(command.narrate) ? command.narrate : command.narrate ? [command.narrate] : []
    : []);

const cutSceneVoice = (entry: CutSceneNarrationEntry) =>
  typeof entry === "object" && entry !== null && "text" in entry ? entry.voice : undefined;

const cutSceneText = (entry: CutSceneNarrationEntry) => {
  const text = typeof entry === "object" && entry !== null && "text" in entry ? entry.text : entry;
  return typeof text === "string" ? text : text.id ?? "";
};

test("all 24 Sarah cutscene recordings follow the story order on either choice", () => {
  expect(saraCutScene1Voices).toHaveLength(24);
  const opening = cutSceneEntriesIn(day4SaraCarInviteScene);
  const tooLong = cutSceneEntriesIn(day4SaraTooLongScene);
  const notStrong = cutSceneEntriesIn(day4SaraNotStrongScene);
  const kiss = cutSceneEntriesIn(day4SaraKissScene);
  const sarahVoices = (entries: CutSceneNarrationEntry[]) =>
    entries.filter((entry) => cutSceneText(entry).startsWith("Sarah:")).map(cutSceneVoice);

  expect(sarahVoices(opening)).toEqual(saraCutScene1Voices.slice(0, 4));
  expect(sarahVoices(tooLong)).toEqual(saraCutScene1Voices.slice(4, 7));
  expect(sarahVoices(notStrong)).toEqual(saraCutScene1Voices.slice(4, 7));
  expect(voicesIn(day4SaraTensionScene)).toEqual([saraCutScene1Voices[7]]);
  expect(sarahVoices(kiss)).toEqual(saraCutScene1Voices.slice(8));
  expect([
    ...sarahVoices(opening), ...sarahVoices(tooLong),
    ...voicesIn(day4SaraTensionScene), ...sarahVoices(kiss),
  ]).toEqual(saraCutScene1Voices);
  expect([...opening, ...tooLong, ...notStrong, ...kiss]
    .filter((entry) => !cutSceneText(entry).startsWith("Sarah:"))
    .every((entry) => cutSceneVoice(entry) === undefined)).toBe(true);
  expect(day4SaraGalleryScene.slice(1)).toEqual(
    day4SaraCarInviteScene.slice(day4SaraCarInviteScene.findIndex((command) => command.type === "cutScene")),
  );
});
