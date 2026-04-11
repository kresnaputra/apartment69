export type SmartphoneContactOption = {
  id: "maya" | "elena" | "nadia" | "sara";
  name: string;
  accent: string;
  blurb: string;
  next: string;
};

export const smartphoneContactOptions: SmartphoneContactOption[] = [
  {
    id: "maya",
    name: "Maya",
    accent: "#81e6d9",
    blurb: "Next-door neighbor. She looked seriously drained from college stress.",
    next: "bedroom-day1-maya",
  },
  {
    id: "elena",
    name: "Elena",
    accent: "#f59e7b",
    blurb: "Across the hall. Cold, intense, and clearly dealing with a lot.",
    next: "bedroom-day1-elena",
  },
  {
    id: "nadia",
    name: "Nadia",
    accent: "#f7cf61",
    blurb: "Total chaos queen. Way too much energy, and probably still awake.",
    next: "bedroom-day1-nadia",
  },
  {
    id: "sara",
    name: "Sara",
    accent: "#c9a8ff",
    blurb: "Penthouse resident. Definitely the type who expects an answer fast.",
    next: "bedroom-day1-sara",
  },
];
