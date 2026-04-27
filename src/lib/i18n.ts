export type LanguageCode = "id" | "en" | "ja" | "ko";
export type LocalizedText = string | Partial<Record<LanguageCode, string>>;

export const DEFAULT_LANGUAGE: LanguageCode = "en";
export const LANGUAGE_STORAGE_KEY = "apartment69-language";

export const languageOptions: { code: LanguageCode; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "id", label: "Bahasa Indonesia" },
];

export const resolveText = (text: LocalizedText | undefined, language: LanguageCode): string => {
  if (text === undefined) return "";
  if (typeof text === "string") return text;

  return text[language] ?? text.en ?? text.id ?? text.ja ?? text.ko ?? Object.values(text)[0] ?? "";
};

export const tx = (value: Partial<Record<LanguageCode, string>>): LocalizedText => value;

export const uiText = {
  titleSubtitle: tx({
    id: "Tetangga yang Suka Menolong",
    en: "The Helpful Neighbor",
    ja: "助け好きな隣人",
    ko: "도와주기 좋아하는 이웃",
  }),
  start: tx({ id: "Mulai", en: "Start", ja: "スタート", ko: "시작" }),
  load: tx({ id: "Muat", en: "Load", ja: "ロード", ko: "불러오기" }),
  gallery: tx({ id: "Galeri", en: "Gallery", ja: "ギャラリー", ko: "갤러리" }),
  settings: tx({ id: "Pengaturan", en: "Settings", ja: "設定", ko: "설정" }),
  slot: tx({ id: "Slot", en: "Slot", ja: "スロット", ko: "슬롯" }),
  exit: tx({ id: "Keluar", en: "Exit", ja: "終了", ko: "종료" }),
  loading: tx({ id: "Memuat", en: "Loading", ja: "読み込み中", ko: "불러오는 중" }),
  save: tx({ id: "Simpan", en: "Save", ja: "セーブ", ko: "저장" }),
  log: tx({ id: "Log", en: "Log", ja: "ログ", ko: "로그" }),
  auto: tx({ id: "Otomatis", en: "Auto", ja: "オート", ko: "자동" }),
  skip: tx({ id: "Lewati", en: "Skip", ja: "スキップ", ko: "건너뛰기" }),
  config: tx({ id: "Konfigurasi", en: "Config", ja: "設定", ko: "설정" }),
  close: tx({ id: "Tutup", en: "Close", ja: "閉じる", ko: "닫기" }),
  volumeBgm: tx({
    id: "Volume BGM",
    en: "BGM Volume",
    ja: "BGM音量",
    ko: "배경음 볼륨",
  }),
  textSpeed: tx({
    id: "Kecepatan Teks",
    en: "Text Speed",
    ja: "テキスト速度",
    ko: "텍스트 속도",
  }),
  language: tx({ id: "Bahasa", en: "Language", ja: "言語", ko: "언어" }),
  mainMenuSettings: tx({
    id: "Pengaturan Main Menu",
    en: "Main Menu Settings",
    ja: "メインメニュー設定",
    ko: "메인 메뉴 설정",
  }),
  tapToSkip: tx({
    id: "Ketuk untuk lewati",
    en: "Tap to skip",
    ja: "タップでスキップ",
    ko: "탭해서 넘기기",
  }),
  tapToContinue: tx({
    id: "Ketuk untuk lanjut",
    en: "Tap to continue",
    ja: "タップで続行",
    ko: "탭해서 계속",
  }),
  clickToFinish: tx({
    id: "Klik untuk selesaikan teks",
    en: "Click to finish the text",
    ja: "クリックで全文表示",
    ko: "클릭하면 전체 표시",
  }),
  clickToContinue: tx({
    id: "Klik / Spasi / Enter untuk lanjut",
    en: "Click / Space / Enter to continue",
    ja: "クリック / Space / Enter で続行",
    ko: "클릭 / Space / Enter 로 계속",
  }),
  previousScene: tx({
    id: "Sebelumnya",
    en: "Previous",
    ja: "前へ",
    ko: "이전",
  }),
  nextScene: tx({
    id: "Berikutnya",
    en: "Next",
    ja: "次へ",
    ko: "다음",
  }),
  continueStory: tx({
    id: "Lanjut Cerita",
    en: "Continue Story",
    ja: "物語を続ける",
    ko: "스토리 계속",
  }),
  lockedScene: tx({
    id: "Terkunci",
    en: "Locked",
    ja: "未開放",
    ko: "잠김",
  }),
  playbackSlow: tx({
    id: "Lambat",
    en: "Slow",
    ja: "低速",
    ko: "느리게",
  }),
  playbackNormal: tx({
    id: "Normal",
    en: "Normal",
    ja: "標準",
    ko: "보통",
  }),
  playbackFast: tx({
    id: "Cepat",
    en: "Fast",
    ja: "高速",
    ko: "빠르게",
  }),
  playbackFaster: tx({
    id: "Sangat Cepat",
    en: "Faster",
    ja: "最速",
    ko: "매우 빠르게",
  }),
  noConversation: tx({
    id: "Belum ada percakapan.",
    en: "No dialogue yet.",
    ja: "まだ会話はありません。",
    ko: "아직 대화가 없습니다.",
  }),
  emptySlot: tx({ id: "— Kosong —", en: "— Empty —", ja: "— 空き —", ko: "— 비어 있음 —" }),
  unknownScene: tx({
    id: "Adegan Tidak Diketahui",
    en: "Unknown Scene",
    ja: "不明なシーン",
    ko: "알 수 없는 장면",
  }),
  saved: tx({ id: "Tersimpan!", en: "Saved!", ja: "保存しました！", ko: "저장됨!" }),
  storyLoading: tx({
    id: "Memuat cerita...",
    en: "Loading story...",
    ja: "物語を読み込み中...",
    ko: "스토리를 불러오는 중...",
  }),
  charactersReady: tx({
    id: "Karakter siap ditampilkan.",
    en: "Characters are ready.",
    ja: "キャラクターの準備ができました。",
    ko: "캐릭터 준비가 완료되었습니다.",
  }),
  bundlesLoading: tx({
    id: "Memuat bundle karakter...",
    en: "Loading character bundles...",
    ja: "キャラクターバンドルを読み込み中...",
    ko: "캐릭터 번들을 불러오는 중...",
  }),
} as const;

export const getDateLocale = (language: LanguageCode) => {
  if (language === "id") return "id-ID";
  if (language === "ja") return "ja-JP";
  if (language === "ko") return "ko-KR";
  return "en-US";
};
