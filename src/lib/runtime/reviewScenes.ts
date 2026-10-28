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
    day: "Day 3",
    scenes: [{ label: "day3-maya-phone-call", title: "Maya Phone Call" }],
  },
  {
    day: "Day 4",
    scenes: [{ label: "day4-maya-force-rest", title: "Maya Force Rest" }],
  },
  {
    day: "Day 7",
    scenes: [
      { label: "day7-devoted-submission", title: "Devoted Submission" },
      { label: "day7-eternal-promise", title: "Eternal Promise" },
    ],
  },
];
