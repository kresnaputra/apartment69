export type SmartphoneContactId = "maya" | "elena" | "nadia" | "sara" | "sleep";

export type SmartphoneContactOption = {
  id: SmartphoneContactId;
  name: string;
  accent: string;
  blurb: string;
  next: string;
  disabled?: boolean;
  icon?: string;
};

export type SmartphoneContactOverrides = Partial<
  Record<SmartphoneContactId, Partial<Omit<SmartphoneContactOption, "id">>>
>;

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
    name: "Skip Day",
    accent: "#94a3b8",
    blurb: "Wrap things up early and move on to tomorrow.",
    next: "epilogue",
    disabled: false,
    icon: "M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 16H5V10h14v10Zm0-12H5V6h14v2Zm-7 5h5v5h-5Z",
  },
];

type ResolveSmartphoneContactOptionsInput = {
  showSleepOption?: boolean;
  sleepOptionNext?: string;
  disabledContacts?: string[];
  overrides?: SmartphoneContactOverrides;
};

export const resolveSmartphoneContactOptions = ({
  showSleepOption = false,
  sleepOptionNext = "epilogue",
  disabledContacts = [],
  overrides = {},
}: ResolveSmartphoneContactOptionsInput): SmartphoneContactOption[] =>
  smartphoneContactOptions
    .filter((option) => option.id !== "sleep" || showSleepOption)
    .map((option) => {
      const override = overrides[option.id] ?? {};
      const next = option.id === "sleep"
        ? (override.next ?? sleepOptionNext)
        : (override.next ?? option.next);

      return {
        ...option,
        ...override,
        next,
        disabled: disabledContacts.includes(option.id) || override.disabled || option.disabled,
      };
    });
