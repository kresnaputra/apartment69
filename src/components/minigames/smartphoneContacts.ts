export type SmartphoneContactOption = {
  id: "maya" | "elena" | "nadia" | "sara" | "sleep";
  name: string;
  accent: string;
  blurb: string;
  next: string;
  disabled?: boolean;
  icon?: string;
};

export const smartphoneContactOptions: SmartphoneContactOption[] = [
  {
    id: "maya",
    name: "Maya",
    accent: "#81e6d9",
    blurb: "Next-door neighbor. She looked seriously drained from college stress.",
    next: "bedroom-day1-maya",
    disabled: false,
  },
  {
    id: "elena",
    name: "Elena",
    accent: "#f59e7b",
    blurb: "Across the hall. Cold, intense, and clearly dealing with a lot.",
    next: "bedroom-day1-elena",
    disabled: true,
  },
  {
    id: "nadia",
    name: "Nadia",
    accent: "#f7cf61",
    blurb: "Total chaos queen. Way too much energy, and probably still awake.",
    next: "bedroom-day1-nadia",
    disabled: true,
  },
  {
    id: "sara",
    name: "Sara",
    accent: "#c9a8ff",
    blurb: "Penthouse resident. Definitely the type who expects an answer fast.",
    next: "bedroom-day1-sara",
    disabled: true,
  },
  {
    id: "sleep",
    name: "Sleep",
    accent: "#94a3b8",
    blurb: "Skip the texting. Just go straight to sleep.",
    next: "epilogue",
    disabled: false,
    icon: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",
  },
];
