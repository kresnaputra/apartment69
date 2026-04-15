import type { LanguageCode, LocalizedText } from "@/lib/i18n";
import { resolveText } from "@/lib/i18n";

export type SmartphoneContactId = "maya" | "elena" | "nadia" | "sara" | "sleep";

export type SmartphoneContactOption = {
  id: SmartphoneContactId;
  name: LocalizedText;
  accent: string;
  blurb: LocalizedText;
  next: string;
  disabled?: boolean;
  icon?: string;
};

export type SmartphoneContactOverrides = Partial<
  Record<SmartphoneContactId, Partial<Omit<SmartphoneContactOption, "id">>>
>;

export type ResolvedSmartphoneContactOption = {
  id: SmartphoneContactId;
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
    name: {
      id: "Maya",
      en: "Maya",
      ja: "マヤ",
      ko: "마야",
    },
    accent: "#81e6d9",
    blurb: {
      id: "Tetangga sebelah. Dia kelihatan capek banget karena stres kuliah.",
      en: "Next-door neighbor. She looked seriously drained from college stress.",
      ja: "隣の部屋の住人。大学のストレスでかなり疲れ切って見えた。",
      ko: "옆집 이웃. 대학 스트레스로 완전히 지쳐 보였다.",
    },
    next: "bedroom-day1-maya",
    disabled: false,
  },
  {
    id: "elena",
    name: {
      id: "Elena",
      en: "Elena",
      ja: "エレナ",
      ko: "엘레나",
    },
    accent: "#f59e7b",
    blurb: {
      id: "Tepat di seberang lorong. Dingin, intens, dan jelas lagi banyak masalah.",
      en: "Across the hall. Cold, intense, and clearly dealing with a lot.",
      ja: "廊下の向かい側。冷たくて鋭いけど、抱えてるものも多そうだ。",
      ko: "복도 맞은편. 차갑고 예민하지만, 분명 이것저것 많이 안고 있다.",
    },
    next: "bedroom-day1-elena",
    disabled: true,
  },
  {
    id: "nadia",
    name: {
      id: "Nadia",
      en: "Nadia",
      ja: "ナディア",
      ko: "나디아",
    },
    accent: "#f7cf61",
    blurb: {
      id: "Ratu kekacauan. Energinya kebanyakan, dan kemungkinan besar masih belum tidur.",
      en: "Total chaos queen. Way too much energy, and probably still awake.",
      ja: "完全にカオスな子。元気があり余っていて、たぶんまだ起きてる。",
      ko: "완전 혼돈 그 자체. 에너지가 넘쳐나고, 아마 아직도 안 자고 있을 거다.",
    },
    next: "bedroom-day1-nadia",
    disabled: true,
  },
  {
    id: "sara",
    name: {
      id: "Sarah",
      en: "Sarah",
      ja: "サラ",
      ko: "사라",
    },
    accent: "#c9a8ff",
    blurb: {
      id: "Penghuni penthouse. Tipe orang yang jelas maunya jawaban cepat.",
      en: "Penthouse resident. Definitely the type who expects an answer fast.",
      ja: "ペントハウスの住人。返事をすぐ求めるタイプなのは間違いない。",
      ko: "펜트하우스 거주자. 빠른 답을 기대하는 타입이 확실하다.",
    },
    next: "bedroom-day1-sara",
    disabled: true,
  },
  {
    id: "sleep",
    name: {
      id: "Lewati Hari",
      en: "Skip Day",
      ja: "今日はもう終わる",
      ko: "오늘은 여기까지",
    },
    accent: "#94a3b8",
    blurb: {
      id: "Akhiri hari lebih cepat dan lanjutkan besok.",
      en: "Wrap things up early and move on to tomorrow.",
      ja: "今日は早めに切り上げて、続きは明日に回す。",
      ko: "오늘은 일찍 마무리하고 내일로 넘긴다.",
    },
    next: "epilogue",
    disabled: false,
    icon: "M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 16H5V10h14v10Zm0-12H5V6h14v2Zm-7 5h5v5h-5Z",
  },
];

type ResolveSmartphoneContactOptionsInput = {
  language: LanguageCode;
  showSleepOption?: boolean;
  sleepOptionNext?: string;
  disabledContacts?: string[];
  overrides?: SmartphoneContactOverrides;
};

export const resolveSmartphoneContactOptions = ({
  language,
  showSleepOption = false,
  sleepOptionNext = "epilogue",
  disabledContacts = [],
  overrides = {},
}: ResolveSmartphoneContactOptionsInput): ResolvedSmartphoneContactOption[] =>
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
        name: resolveText(override.name ?? option.name, language),
        blurb: resolveText(override.blurb ?? option.blurb, language),
        next,
        disabled: disabledContacts.includes(option.id) || override.disabled || option.disabled,
      };
    });
