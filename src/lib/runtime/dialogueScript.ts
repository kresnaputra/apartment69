import type { LocalizedText } from "@/lib/i18n";
import type { LanguageCode } from "@/lib/i18n";
import type { SayCommand, VisualNovelCommand, VisualNovelScript } from "@/types/novel";
import { openingScene } from "@/scenes/day1/opening";
import {
  nadiaAdviceHelpScene,
  nadiaAdviceRefuseScene,
  nadiaBalconyScene,
} from "@/scenes/day1/nadiaBalcony";
import { bedroomDay1Scene } from "@/scenes/day1/bedroomDay1";
import { day1ComplateScene } from "@/scenes/day1/day1-complate";
import { day2BedroomScene } from "@/scenes/day2/day2-bedroom";
import { day2NadiaFreeTimeScene } from "@/scenes/day2/nadia/day2-nadia-free-time";
import { day2NadiaRoomScene, day2RouteNadiaScene } from "@/scenes/day2/nadia/day2-nadia";
import { day2ComplateScene } from "@/scenes/day2/day2-complate";
import { day3BedroomScene } from "@/scenes/day3/day3-route-selection";
import {
  day3NadiaNightScene,
  day3NadiaNightHelpScene,
  day3NadiaNightRefuseScene,
  day3NadiaNightEndingScene,
} from "@/scenes/day3/nadia/day3-nadia-night";
import { day3ComplateScene } from "@/scenes/day3/day3-complate";
import { day4BedroomScene } from "@/scenes/day4/day4-bedroom";
import {
  day4NadiaNightScene,
  day4NadiaNightHelpScene,
  day4NadiaNightSkipScene,
} from "@/scenes/day4/nadia/day4-nadia-night";
import { day5NadiaScene } from "@/scenes/day5/day5-nadia";
import {
  day6NadiaScene,
  day6NadiaGoodPathScene,
  day6NadiaBadPathScene,
  day6NadiaEndingScene,
} from "@/scenes/day6/day6-nadia";
import { day7NadiaBadEndingScene } from "@/scenes/day7/day7-nadia-bad-ending";
import { day7NadiaGoodEndingScene } from "@/scenes/day7/day7-nadia-good-ending";

const splitSentences = (text: string) => {
  const trimmed = text.trim();
  if (!trimmed) return [text];

  const parts: string[] = [];
  let start = 0;

  for (let index = 0; index < trimmed.length; index += 1) {
    const char = trimmed[index];
    const isEllipsisDot = char === "." && trimmed[index + 1] === "." && trimmed[index + 2] === ".";
    if (isEllipsisDot) {
      index += 2;
      continue;
    }

    if (char !== "." && char !== "?" && char !== "!" && char !== "。" && char !== "？" && char !== "！") {
      continue;
    }

    const part = trimmed.slice(start, index + 1).trim();
    if (part) parts.push(part);
    start = index + 1;
  }

  const rest = trimmed.slice(start).trim();
  if (rest) parts.push(rest);

  return parts.length > 0 ? parts : [trimmed];
};

const pickLanguagePart = (parts: string[], index: number) => {
  if (index < parts.length) return parts[index];
  return parts[parts.length - 1] ?? "";
};

const splitLocalizedText = (text: LocalizedText): LocalizedText[] => {
  if (typeof text === "string") {
    return splitSentences(text);
  }

  const languageParts = Object.fromEntries(
    Object.entries(text).map(([language, value]) => [
      language,
      splitSentences(value),
    ]),
  ) as Partial<Record<LanguageCode, string[]>>;
  const primaryParts = languageParts.id ?? languageParts.en ?? languageParts.ja ?? languageParts.ko ?? [];

  if (primaryParts.length <= 1) return [text];

  return primaryParts.map((_, index) => {
    const segment: Partial<Record<LanguageCode, string>> = {};

    for (const [language, parts] of Object.entries(languageParts) as [LanguageCode, string[]][]) {
      segment[language] = pickLanguagePart(parts, index);
    }

    return segment;
  });
};

const splitDialogueCommand = (command: SayCommand): SayCommand[] => {
  if (command.speaker === null || command.speaker === undefined) {
    return [command];
  }

  const parts = splitLocalizedText(command.text);
  if (parts.length <= 1) return [command];

  return parts.map((text, index) => ({
    ...command,
    text,
    voice: index === 0 ? command.voice : undefined,
    continueVoice: index > 0 && Boolean(command.voice),
  }));
};

const splitCharacterDialogue = (commands: VisualNovelCommand[]): VisualNovelCommand[] =>
  commands.flatMap<VisualNovelCommand>((command) => {
    if (command.type !== "say") return [command];
    return splitDialogueCommand(command);
  });

const withSplitCharacterDialogue = (script: VisualNovelScript): VisualNovelScript => ({
  ...script,
  labels: Object.fromEntries(
    Object.entries(script.labels).map(([label, commands]) => [
      label,
      splitCharacterDialogue(commands),
    ]),
  ),
});

export const demoScript: VisualNovelScript = withSplitCharacterDialogue({
  startLabel: "opening",
  labels: {
    "gallery-return": [],
    // Day 1
    opening: openingScene,
    "nadia-balcony": nadiaBalconyScene,
    "nadia-advice-help": nadiaAdviceHelpScene,
    "nadia-advice-refuse": nadiaAdviceRefuseScene,
    "bedroom-day1": bedroomDay1Scene,
    "day1-complate": day1ComplateScene,
    // Day 2
    "day2-bedroom": day2BedroomScene,
    "day2-route-nadia": day2RouteNadiaScene,
    "day2-nadia-room": day2NadiaRoomScene,
    "day2-nadia-free-time": day2NadiaFreeTimeScene,
    "day2-complate": day2ComplateScene,
    // Day 3
    "day3-bedroom": day3BedroomScene,
    "day3-nadia-night": day3NadiaNightScene,
    "day3-nadia-night-help": day3NadiaNightHelpScene,
    "day3-nadia-night-refuse": day3NadiaNightRefuseScene,
    "day3-nadia-night-ending": day3NadiaNightEndingScene,
    "day3-complete": day3ComplateScene,
    // Day 4
    "day4-bedroom": day4BedroomScene,
    "day4-nadia-night": day4NadiaNightScene,
    "day4-nadia-night-help": day4NadiaNightHelpScene,
    "day4-nadia-night-skip": day4NadiaNightSkipScene,
    // Day 5
    "day5-nadia": day5NadiaScene,
    // Day 6
    "day6-nadia": day6NadiaScene,
    "day6-nadia-good-path": day6NadiaGoodPathScene,
    "day6-nadia-bad-path": day6NadiaBadPathScene,
    "day6-nadia-ending": day6NadiaEndingScene,
    // Day 7
    "day7-nadia-bad-ending": day7NadiaBadEndingScene,
    "day7-nadia-good-ending": day7NadiaGoodEndingScene,
  },
});
