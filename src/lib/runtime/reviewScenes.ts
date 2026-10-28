export const isReviewBuild = () => import.meta.env.VITE_REVIEW_BUILD === "true";

export type ReviewScene = {
  label: string;
  title: string;
};

export type ReviewSceneGroup = {
  day: string;
  scenes: ReviewScene[];
};

// Every script label whose command list contains cutScene/multiCutScene content,
// so Steam reviewers can verify all mature scenes without playing through the story.
export const REVIEW_SCENE_GROUPS: ReviewSceneGroup[] = [
  {
    day: "Day 1",
    scenes: [{ label: "nadia-balcony", title: "Nadia Balcony" }],
  },
  {
    day: "Day 2",
    scenes: [{ label: "day2-nadia-room", title: "Nadia Room" }],
  },
  {
    day: "Day 3",
    scenes: [{ label: "day3-nadia-night", title: "Nadia Night" }],
  },
  {
    day: "Day 4",
    scenes: [{ label: "day4-nadia-night-help", title: "Nadia Night (Help)" }],
  },
  {
    day: "Day 5",
    scenes: [{ label: "day5-nadia", title: "Nadia" }],
  },
  {
    day: "Day 7",
    scenes: [
      { label: "day7-nadia-good-ending", title: "Nadia Good Ending" },
      { label: "day7-nadia-bad-ending", title: "Nadia Bad Ending" },
    ],
  },
];
