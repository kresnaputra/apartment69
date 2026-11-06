import type {} from "bun";
import { expect, test } from "bun:test";
import type { VisualNovelCommand } from "./src/types/novel";
import { saraDay1To4Voices } from "./src/voice/sara/day1to4";
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
} from "./src/scenes/day4/sara/day4-sara";

const voicesIn = (commands: VisualNovelCommand[]) =>
  commands.filter((command) => command.type === "say" && command.speaker === "sara")
    .map((command) => command.type === "say" ? command.voice : undefined);

test("Sara's day 1-4 dialogue uses each numbered recording in script order", () => {
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
    [day3SaraStartScene, 30, 7],
    [day3SaraCafeContinueScene, 37, 6],
    [day3SaraEscortScene, 43, 5],
    [day3SaraDeclineScene, 48, 1],
    [day4SaraStartScene, 49, 5],
    [day4SaraCarInviteScene, 54, 2],
    [day4SaraTensionScene, 56, 1],
    [day4SaraEndingScene, 57, 4],
  ];

  expect(saraDay1To4Voices).toHaveLength(61);
  for (const [commands, start, count] of groups) {
    const voices = voicesIn(commands);
    const spokenVoices = commands === day4SaraStartScene ? voices.slice(1) : voices;
    expect(spokenVoices).toEqual(saraDay1To4Voices.slice(start, start + count));
  }
  expect(voicesIn(day4SaraStartScene)[0]).toBeUndefined();
  expect(groups.flatMap(([commands]) => voicesIn(commands)).filter(Boolean)).toHaveLength(61);
});
