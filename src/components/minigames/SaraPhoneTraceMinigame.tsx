import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent, type Ref } from "react";
import { resolveText, tx, type LanguageCode, type LocalizedText } from "@/lib/i18n";

type TraceId = "location" | "family" | "chat" | "email" | "parking";
type Phase = "inspect" | "cleaning" | "confirmLeave" | "cleared";
type HoldInput =
  | { type: "pointer"; pointerId: number }
  | { type: "keyboard"; key: "Enter" | " " };
type ActiveHold = { id: TraceId; input: HoldInput; timer: number };

type Trace = {
  id: TraceId;
  app: LocalizedText;
  title: LocalizedText;
  detail: LocalizedText;
  risk: number;
  icon: string;
  /** App-icon gradient [top, bottom]. */
  tint: [string, string];
  disable?: boolean;
};

export const SARA_PHONE_HOLD_MS = 650;
export const SARA_PHONE_BASE_RISK = 4;

export const saraPhoneTraces: Trace[] = [
  {
    id: "location",
    app: tx({ id: "Lokasi", en: "Location", ja: "位置情報", ko: "위치" }),
    title: tx({ id: "Riwayat lokasi malam ini", en: "Tonight's location history", ja: "今夜の位置履歴", ko: "오늘 밤 위치 기록" }),
    detail: tx({ id: "Hotel Aster · tiba 21:14", en: "Hotel Aster · arrived 21:14", ja: "ホテル・アスター · 21:14 到着", ko: "호텔 아스터 · 21:14 도착" }),
    risk: 28,
    icon: "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
    tint: ["#ff7a6b", "#d9413a"],
  },
  {
    id: "family",
    app: tx({ id: "Berbagi", en: "Sharing", ja: "共有", ko: "공유" }),
    title: tx({ id: "Berbagi lokasi keluarga", en: "Family location sharing", ja: "家族と位置情報を共有", ko: "가족 위치 공유" }),
    detail: tx({ id: "Aktif · terlihat oleh suami", en: "On · visible to her husband", ja: "オン · 夫に表示中", ko: "켜짐 · 남편에게 보임" }),
    risk: 24,
    icon: "M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20v-1a5 5 0 0 1 9-3M13 16a5 5 0 0 1 9 3v1",
    tint: ["#5ab8ff", "#2f6fe0"],
    disable: true,
  },
  {
    id: "chat",
    app: tx({ id: "Pesan", en: "Messages", ja: "メッセージ", ko: "메시지" }),
    title: tx({ id: "Arka", en: "Arka", ja: "アルカ", ko: "아르카" }),
    detail: tx({
      id: "“Aku di lobby bawah. Kalau kamu bisa turun, sekarang.”",
      en: "“I'm in the lobby downstairs. If you can come down, now.”",
      ja: "「下のロビーにいるわ。来られるなら、今すぐ。」",
      ko: "“아래 로비에 있어. 내려올 수 있으면, 지금.”",
    }),
    risk: 18,
    icon: "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z",
    tint: ["#5fe08a", "#22a855"],
  },
  {
    id: "email",
    app: tx({ id: "Email", en: "Mail", ja: "メール", ko: "메일" }),
    title: tx({ id: "Konfirmasi reservasi", en: "Booking confirmation", ja: "予約確認", ko: "예약 확인" }),
    detail: tx({ id: "Kamar 1207 · 1 malam · a.n. Sarah", en: "Room 1207 · 1 night · under Sarah", ja: "1207号室 · 1泊 · サラ名義", ko: "1207호 · 1박 · 사라 명의" }),
    risk: 12,
    icon: "M3 6h18v12H3zM3 7l9 6 9-6",
    tint: ["#ffc46b", "#e8892c"],
  },
  {
    id: "parking",
    app: tx({ id: "Lokasi", en: "Location", ja: "位置情報", ko: "위치" }),
    title: tx({ id: "Kemarin sore", en: "Yesterday evening", ja: "昨日の夕方", ko: "어제 저녁" }),
    detail: tx({ id: "Basement Parking B2 · berhenti 48 menit", en: "Basement Parking B2 · stopped 48 min", ja: "地下駐車場B2 · 48分停車", ko: "지하 주차장 B2 · 48분 정차" }),
    risk: 6,
    icon: "M5 17h14M6 17l1.5-5h9L18 17M8 17v2M16 17v2M9 9h6",
    tint: ["#b49bff", "#7556e0"],
  },
];

const text = {
  owner: tx({ id: "Ponsel Sarah", en: "Sarah's phone", ja: "サラのスマホ", ko: "사라의 휴대폰" }),
  title: tx({ id: "Privasi & Aktivitas", en: "Privacy & Activity", ja: "プライバシーと履歴", ko: "개인정보 & 활동" }),
  risk: tx({ id: "Risiko terlacak", en: "Trace risk", ja: "発覚リスク", ko: "추적 위험" }),
  levelHigh: tx({ id: "Bahaya", en: "Danger", ja: "危険", ko: "위험" }),
  levelMid: tx({ id: "Waspada", en: "Caution", ja: "注意", ko: "주의" }),
  levelLow: tx({ id: "Aman", en: "Safe", ja: "安全", ko: "안전" }),
  inspect: tx({
    id: "Arka memeriksa ponsel Sarah. Jejak malam ini masih tersimpan di mana-mana.",
    en: "Arka checks Sarah's phone. Tonight's traces are still saved everywhere.",
    ja: "アルカがサラのスマホを確認する。今夜の痕跡があちこちに残っている。",
    ko: "아르카가 사라의 휴대폰을 확인한다. 오늘 밤의 흔적이 곳곳에 남아 있다.",
  }),
  cleaning: tx({
    id: "Tahan setiap jejak sampai terhapus.",
    en: "Hold each trace until it's erased.",
    ja: "痕跡を長押しして消去する。",
    ko: "흔적을 길게 눌러 지우세요.",
  }),
  confirmLeave: tx({
    id: "Semua jejak akan tetap tersimpan. Kalau suaminya memeriksa, ia bisa melihat semuanya.",
    en: "Every trace will stay saved. If her husband checks, he could see all of it.",
    ja: "痕跡はすべて残る。夫が確認すれば、すべて見られてしまうかもしれない。",
    ko: "모든 흔적이 그대로 남는다. 남편이 확인하면 전부 볼 수 있다.",
  }),
  cleared: tx({
    id: "Tidak ada jejak tersisa. Malam ini tidak pernah terjadi, setidaknya di ponsel ini.",
    en: "No traces left. Tonight never happened, at least on this phone.",
    ja: "痕跡は残っていない。少なくともこのスマホの中では、今夜は存在しない。",
    ko: "남은 흔적은 없다. 적어도 이 휴대폰 안에서는 오늘 밤은 없었던 일이다.",
  }),
  clearedTitle: tx({ id: "Ponsel bersih", en: "Phone clean", ja: "クリーン", ko: "깨끗해짐" }),
  suggestErase: tx({ id: "Sarankan hapus semua jejak", en: "Suggest erasing every trace", ja: "痕跡をすべて消すよう勧める", ko: "모든 흔적을 지우자고 제안한다" }),
  leaveIt: tx({ id: "Biarkan saja", en: "Leave it be", ja: "そのままにする", ko: "그냥 둔다" }),
  back: tx({ id: "Kembali", en: "Go back", ja: "戻る", ko: "돌아가기" }),
  confirm: tx({ id: "Ya, biarkan saja", en: "Yes, leave it", ja: "ええ、このままで", ko: "응, 그냥 둔다" }),
  returnPhone: tx({ id: "Kembalikan ponsel ke Sarah", en: "Hand the phone back to Sarah", ja: "スマホをサラに返す", ko: "휴대폰을 사라에게 돌려준다" }),
  hold: tx({ id: "Tahan untuk hapus", en: "Hold to erase", ja: "長押しで消去", ko: "길게 눌러 삭제" }),
  holdDisable: tx({ id: "Tahan untuk matikan", en: "Hold to turn off", ja: "長押しでオフ", ko: "길게 눌러 끄기" }),
  erased: tx({ id: "Terhapus", en: "Erased", ja: "消去済み", ko: "삭제됨" }),
  disabled: tx({ id: "Dimatikan", en: "Turned off", ja: "オフ", ko: "꺼짐" }),
  remaining: (count: number) => tx({
    id: `${count} jejak tersisa`,
    en: `${count} trace${count === 1 ? "" : "s"} left`,
    ja: `残り${count}件`,
    ko: `흔적 ${count}개 남음`,
  }),
};

const PHONE_FONT = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif";
const DANGER = "#ff5a4e";
const CAUTION = "#ffb547";
const SAFE = "#4fd68a";
const RING_RADIUS = 25;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const ICON_RING_RADIUS = 21;
const ICON_RING_CIRCUMFERENCE = 2 * Math.PI * ICON_RING_RADIUS;
const TRASH_ICON = "M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v6M14 11v6";
const TOGGLE_ICON = "M7 7h10a5 5 0 0 1 0 10H7A5 5 0 0 1 7 7zM7 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z";
const CHECK_ICON = "M5 12.5l4.5 4.5L19 7.5";

const keyframes = `
@keyframes sara-phone-in { from { opacity: 0; transform: translateY(24px) scale(.96); } to { opacity: 1; transform: none; } }
@keyframes sara-row-in { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: none; } }
@keyframes sara-alert-pulse { 0%,100% { opacity: .35; } 50% { opacity: .85; } }
@keyframes sara-dot-pulse { 0%,100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,90,78,.6); } 50% { transform: scale(1.15); box-shadow: 0 0 0 5px rgba(255,90,78,0); } }
@keyframes sara-erase-flash { 0% { background: rgba(79,214,138,.28); transform: scale(1.02); } 100% { background: rgba(255,255,255,.025); transform: none; } }
@keyframes sara-drop-float { 0% { opacity: 0; transform: translateY(6px); } 20% { opacity: 1; } 100% { opacity: 0; transform: translateY(-22px); } }
@keyframes sara-shield-pop { 0% { opacity: 0; transform: scale(.5); } 60% { transform: scale(1.08); } 100% { opacity: 1; transform: none; } }
@keyframes sara-shield-ring { 0% { transform: scale(.8); opacity: .7; } 100% { transform: scale(1.8); opacity: 0; } }
@keyframes sara-hold-shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-1px); } 75% { transform: translateX(1px); } }
@keyframes sara-scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
@media (prefers-reduced-motion: reduce) {
  .sara-phone-root *, .sara-phone-root { animation-duration: 1ms !important; animation-iteration-count: 1 !important; }
}
`;

type SaraPhoneTraceMinigameProps = {
  onSelect: (nextLabel: string) => void;
  language: LanguageCode;
  clearNext: string;
  leaveNext: string;
};

export const SaraPhoneTraceMinigame = ({ onSelect, language, clearNext, leaveNext }: SaraPhoneTraceMinigameProps) => {
  const [phase, setPhase] = useState<Phase>("inspect");
  const [erased, setErased] = useState<TraceId[]>([]);
  const [holdingId, setHoldingId] = useState<TraceId | null>(null);
  const [drop, setDrop] = useState<{ key: number; amount: number } | null>(null);
  const holdRef = useRef<ActiveHold | null>(null);
  const primaryRef = useRef<HTMLButtonElement>(null);
  const t = (value: LocalizedText) => resolveText(value, language);

  const risk = SARA_PHONE_BASE_RISK + saraPhoneTraces.filter((trace) => !erased.includes(trace.id)).reduce((sum, trace) => sum + trace.risk, 0);
  const remaining = saraPhoneTraces.length - erased.length;
  const firstActiveId = saraPhoneTraces.find((trace) => !erased.includes(trace.id))?.id;
  const riskColor = risk > 60 ? DANGER : risk > 25 ? CAUTION : SAFE;
  const riskLevel = risk > 60 ? text.levelHigh : risk > 25 ? text.levelMid : text.levelLow;
  const isDanger = risk > 60 && phase !== "cleared";

  const cancelHold = (hold: ActiveHold) => {
    window.clearTimeout(hold.timer);
    holdRef.current = null;
    setHoldingId(null);
  };

  const startHold = (id: TraceId, input: HoldInput) => {
    if (holdRef.current || phase !== "cleaning" || erased.includes(id)) return false;
    setHoldingId(id);
    const timer = window.setTimeout(() => {
      holdRef.current = null;
      setHoldingId(null);
      setErased((previous) => (previous.includes(id) ? previous : [...previous, id]));
      const amount = saraPhoneTraces.find((trace) => trace.id === id)?.risk ?? 0;
      setDrop({ key: Date.now(), amount });
      if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") navigator.vibrate(25);
    }, SARA_PHONE_HOLD_MS);
    holdRef.current = { id, input, timer };
    return true;
  };

  const pointerDown = (id: TraceId) => (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0 || !event.isPrimary) return;
    if (startHold(id, { type: "pointer", pointerId: event.pointerId })) {
      // Keep the original press through focus changes, scrolling, or moving off the row.
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };

  const pointerEnd = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const hold = holdRef.current;
    if (hold?.input.type === "pointer" && hold.input.pointerId === event.pointerId) cancelHold(hold);
  };

  useEffect(() => () => {
    if (holdRef.current) window.clearTimeout(holdRef.current.timer);
  }, []);

  useEffect(() => {
    if (phase === "cleaning" && remaining === 0) setPhase("cleared");
  }, [phase, remaining]);

  useEffect(() => {
    primaryRef.current?.focus({ preventScroll: true });
  }, [phase, firstActiveId]);

  const holdKeyDown = (id: TraceId) => (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    if (!event.repeat) startHold(id, { type: "keyboard", key: event.key });
  };

  const holdKeyUp = (id: TraceId) => (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    const hold = holdRef.current;
    if (hold?.id === id && hold.input.type === "keyboard" && hold.input.key === event.key) {
      event.preventDefault();
      cancelHold(hold);
    }
  };

  const statusText = phase === "inspect"
    ? t(text.inspect)
    : phase === "cleaning"
      ? `${t(text.cleaning)} ${t(text.remaining(remaining))}`
      : phase === "confirmLeave"
        ? t(text.confirmLeave)
        : t(text.cleared);

  return (
    <div
      className="sara-phone-root fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(6,5,8,0.78)", backdropFilter: "blur(14px)", fontFamily: PHONE_FONT }}
      onClick={(event) => event.stopPropagation()}
    >
      <style>{keyframes}</style>
      <div
        className="relative flex flex-col"
        style={{
          width: "min(350px, calc(100vw - 32px))",
          height: "min(690px, calc(100dvh - 32px))",
          borderRadius: 50,
          padding: 9,
          background: "linear-gradient(155deg, #4a4038 0%, #221d19 40%, #141110 100%)",
          boxShadow: `0 0 0 1px rgba(255,236,210,0.16), 0 0 0 2px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,236,210,0.18), 0 60px 120px rgba(0,0,0,0.75)${isDanger ? ", 0 0 60px rgba(255,90,78,0.18)" : ""}`,
          transition: "box-shadow .6s ease",
          animation: "sara-phone-in .45s cubic-bezier(.2,.8,.2,1) both",
        }}
      >
        <div
          className="relative flex flex-1 flex-col overflow-hidden"
          style={{
            borderRadius: 42,
            background: "radial-gradient(120% 60% at 50% -5%, #3a2430 0%, #17111a 45%, #0b090d 100%)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
            color: "#f5eee6",
          }}
        >
          {/* Danger vignette while risk is high */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: 42,
              boxShadow: "inset 0 0 50px rgba(255,90,78,0.45)",
              opacity: isDanger ? 1 : 0,
              animation: isDanger ? "sara-alert-pulse 1.6s ease-in-out infinite" : "none",
              transition: "opacity .6s ease",
            }}
          />

          {/* Status bar */}
          <div className="relative flex items-center justify-between px-7 pt-3.5" style={{ fontSize: 12, fontWeight: 600 }}>
            <span>23:08</span>
            <div style={{ width: 96, height: 26, borderRadius: 16, background: "#000" }} />
            <span className="flex items-center gap-1.5" style={{ fontSize: 11 }}>
              <svg width="15" height="10" viewBox="0 0 15 10" fill="currentColor" aria-hidden>
                <rect x="0" y="7" width="2.5" height="3" rx="0.6" />
                <rect x="4" y="5" width="2.5" height="5" rx="0.6" />
                <rect x="8" y="2.5" width="2.5" height="7.5" rx="0.6" />
                <rect x="12" y="0" width="2.5" height="10" rx="0.6" />
              </svg>
              5G
              <span className="relative inline-block" style={{ width: 22, height: 11, borderRadius: 3, border: "1px solid rgba(245,238,230,0.5)", padding: 1 }}>
                <span className="block h-full" style={{ width: "34%", borderRadius: 1.5, background: CAUTION }} />
              </span>
            </span>
          </div>

          {/* Header: risk gauge + title */}
          <div className="relative flex items-center gap-4 px-5 pt-5 pb-3">
            <div className="relative shrink-0" style={{ width: 64, height: 64 }}>
              <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden style={{ transform: "rotate(-90deg)" }}>
                <circle cx="32" cy="32" r={RING_RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                <circle
                  cx="32"
                  cy="32"
                  r={RING_RADIUS}
                  fill="none"
                  stroke={riskColor}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  strokeDashoffset={RING_CIRCUMFERENCE * (1 - risk / 100)}
                  style={{ transition: "stroke-dashoffset .6s cubic-bezier(.3,.7,.2,1), stroke .5s ease", filter: `drop-shadow(0 0 6px ${riskColor}88)` }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span style={{ fontSize: 17, fontWeight: 800, color: riskColor, lineHeight: 1, fontVariantNumeric: "tabular-nums", transition: "color .5s ease" }}>
                  {risk}
                  <span style={{ fontSize: 10, fontWeight: 700 }}>%</span>
                </span>
              </div>
              {drop ? (
                <span
                  key={drop.key}
                  aria-hidden
                  className="absolute left-1/2 -translate-x-1/2"
                  style={{ top: -6, fontSize: 12, fontWeight: 800, color: SAFE, whiteSpace: "nowrap", animation: "sara-drop-float .9s ease-out both", textShadow: "0 0 8px rgba(79,214,138,.6)" }}
                >
                  −{drop.amount}%
                </span>
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,238,230,0.5)" }}>
                {t(text.owner)}
              </div>
              <div style={{ marginTop: 1, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                {t(text.title)}
              </div>
              <div className="mt-1.5 flex items-center gap-2" style={{ fontSize: 11 }}>
                <span style={{ color: "rgba(245,238,230,0.5)" }}>{t(text.risk)}</span>
                <span
                  style={{
                    padding: "2px 7px",
                    borderRadius: 999,
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: riskColor,
                    background: `${riskColor}22`,
                    border: `1px solid ${riskColor}55`,
                    transition: "color .5s ease, background .5s ease, border-color .5s ease",
                  }}
                >
                  {t(riskLevel)}
                </span>
              </div>
            </div>
          </div>

          {/* Narration strip */}
          <div className="relative mx-4 mb-2" aria-hidden>
            <p
              key={phase}
              style={{
                fontSize: 12,
                lineHeight: 1.5,
                color: "rgba(245,238,230,0.72)",
                padding: "9px 12px",
                borderRadius: 14,
                background: phase === "confirmLeave" ? "rgba(255,90,78,0.1)" : "rgba(255,255,255,0.045)",
                border: `1px solid ${phase === "confirmLeave" ? "rgba(255,90,78,0.3)" : "rgba(255,255,255,0.06)"}`,
                animation: "sara-row-in .35s ease-out both",
              }}
            >
              {statusText}
            </p>
          </div>

          {/* Trace list */}
          <div className="relative flex flex-1 flex-col gap-2 overflow-y-auto px-3 py-2" style={{ scrollbarWidth: "none" }}>
            {phase === "cleared" ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4">
                <div className="relative flex items-center justify-center" style={{ width: 96, height: 96 }}>
                  <span aria-hidden className="absolute inset-0 rounded-full" style={{ border: `2px solid ${SAFE}`, animation: "sara-shield-ring 1.6s ease-out infinite" }} />
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: 96,
                      height: 96,
                      background: "radial-gradient(circle at 50% 35%, rgba(79,214,138,0.35), rgba(79,214,138,0.08))",
                      border: "1.5px solid rgba(79,214,138,0.6)",
                      boxShadow: "0 0 40px rgba(79,214,138,0.3)",
                      animation: "sara-shield-pop .55s cubic-bezier(.2,.8,.2,1.2) both",
                    }}
                  >
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={SAFE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M12 3l7 3v5.5c0 4.3-3 8-7 9.5-4-1.5-7-5.2-7-9.5V6z" />
                      <path d="M8.5 12l2.5 2.5 4.5-5" />
                    </svg>
                  </div>
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: SAFE, animation: "sara-row-in .4s .2s ease-out both" }}>{t(text.clearedTitle)}</div>
              </div>
            ) : (
              saraPhoneTraces.map((trace, index) => {
                const isErased = erased.includes(trace.id);
                const isHolding = holdingId === trace.id;
                const canHold = phase === "cleaning" && !isErased;
                return (
                  <button
                    key={trace.id}
                    ref={canHold && trace.id === firstActiveId ? primaryRef : undefined}
                    type="button"
                    disabled={!canHold}
                    aria-label={`${t(trace.title)} — ${t(trace.detail)}${canHold ? ` (${t(trace.disable ? text.holdDisable : text.hold)})` : ""}`}
                    className="relative flex shrink-0 items-center gap-3 overflow-hidden text-left select-none outline-none focus-visible:ring-2 focus-visible:ring-white/40 *:pointer-events-none"
                    style={{
                      borderRadius: 18,
                      padding: isErased ? "8px 12px" : "11px 12px",
                      background: isErased ? "rgba(255,255,255,0.025)" : canHold ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${isHolding ? `${DANGER}aa` : canHold ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
                      opacity: isErased ? 0.55 : 1,
                      cursor: canHold ? "pointer" : "default",
                      touchAction: "none",
                      WebkitTouchCallout: "none",
                      transform: isHolding ? "scale(0.98)" : "none",
                      transition: "padding .3s ease, opacity .3s ease, border-color .2s ease, background .2s ease, transform .15s ease",
                      animation: isErased
                        ? "sara-erase-flash .6s ease-out both"
                        : `sara-row-in .35s ${index * 0.06}s ease-out both`,
                    }}
                    onPointerDown={pointerDown(trace.id)}
                    onPointerUp={pointerEnd}
                    onPointerCancel={pointerEnd}
                    onLostPointerCapture={pointerEnd}
                    onContextMenu={(event) => event.preventDefault()}
                    onKeyDown={holdKeyDown(trace.id)}
                    onKeyUp={holdKeyUp(trace.id)}
                    onBlur={() => {
                      const hold = holdRef.current;
                      if (hold?.id === trace.id && hold.input.type === "keyboard") cancelHold(hold);
                    }}
                  >
                    {/* Hold fill */}
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0"
                      style={{
                        width: isHolding ? "100%" : "0%",
                        background: `linear-gradient(90deg, ${DANGER}14, ${DANGER}40)`,
                        transition: isHolding ? `width ${SARA_PHONE_HOLD_MS}ms linear` : "width 160ms ease-out",
                      }}
                    />
                    {isHolding ? (
                      <span
                        aria-hidden
                        className="absolute inset-x-0"
                        style={{ top: 0, height: "100%", background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.12), transparent)", animation: `sara-scan ${SARA_PHONE_HOLD_MS / 2}ms linear infinite` }}
                      />
                    ) : null}

                    {/* App icon with hold-progress ring */}
                    <span aria-hidden className="relative flex shrink-0 items-center justify-center" style={{ width: isErased ? 30 : 46, height: isErased ? 30 : 46, transition: "width .3s ease, height .3s ease", animation: isHolding ? "sara-hold-shake .12s linear infinite" : "none" }}>
                      {!isErased ? (
                        <svg className="absolute inset-0" width="46" height="46" viewBox="0 0 46 46" style={{ transform: "rotate(-90deg)" }}>
                          <circle
                            cx="23"
                            cy="23"
                            r={ICON_RING_RADIUS}
                            fill="none"
                            stroke={DANGER}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray={ICON_RING_CIRCUMFERENCE}
                            strokeDashoffset={isHolding ? 0 : ICON_RING_CIRCUMFERENCE}
                            style={{ transition: isHolding ? `stroke-dashoffset ${SARA_PHONE_HOLD_MS}ms linear` : "stroke-dashoffset 160ms ease-out" }}
                          />
                        </svg>
                      ) : null}
                      <span
                        className="flex items-center justify-center"
                        style={{
                          width: isErased ? 28 : 36,
                          height: isErased ? 28 : 36,
                          borderRadius: isErased ? 9 : 11,
                          background: isErased ? "rgba(79,214,138,0.16)" : `linear-gradient(160deg, ${trace.tint[0]}, ${trace.tint[1]})`,
                          color: isErased ? SAFE : "#fff",
                          boxShadow: isErased ? "none" : `0 4px 12px ${trace.tint[1]}55, inset 0 1px 0 rgba(255,255,255,0.35)`,
                          transition: "width .3s ease, height .3s ease",
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={isErased ? 2.2 : 2} strokeLinecap="round" strokeLinejoin="round">
                          <path d={isErased ? CHECK_ICON : trace.icon} />
                        </svg>
                      </span>
                      {!isErased && phase !== "cleaning" ? (
                        <span
                          className="absolute rounded-full"
                          style={{ top: 2, right: 2, width: 9, height: 9, background: DANGER, border: "1.5px solid #17111a", animation: "sara-dot-pulse 1.4s ease-in-out infinite" }}
                        />
                      ) : null}
                    </span>

                    <span className="relative min-w-0 flex-1">
                      <span className="flex items-center gap-1.5" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(245,238,230,0.45)" }}>
                        {t(trace.app)}
                        {isErased ? <span style={{ color: SAFE }}>· {t(trace.disable ? text.disabled : text.erased)}</span> : null}
                      </span>
                      <span className="block truncate" style={{ fontSize: 14, fontWeight: 650, lineHeight: 1.3, textDecoration: isErased ? "line-through" : "none" }}>
                        {t(trace.title)}
                      </span>
                      {!isErased ? (
                        <span className="block" style={{ marginTop: 1, fontSize: 11.5, lineHeight: 1.4, color: "rgba(245,238,230,0.6)" }}>
                          {t(trace.detail)}
                        </span>
                      ) : null}
                    </span>

                    {!isErased ? (
                      <span className="relative flex shrink-0 flex-col items-end gap-1">
                        <span style={{ fontSize: 10.5, fontWeight: 800, color: canHold || phase === "inspect" ? DANGER : "rgba(255,90,78,0.6)", fontVariantNumeric: "tabular-nums" }}>
                          +{trace.risk}%
                        </span>
                        {canHold ? (
                          <span
                            className="flex items-center justify-center"
                            style={{ width: 26, height: 26, borderRadius: 13, background: `${DANGER}22`, color: DANGER }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d={trace.disable ? TOGGLE_ICON : TRASH_ICON} />
                            </svg>
                          </span>
                        ) : null}
                      </span>
                    ) : null}
                  </button>
                );
              })
            )}
          </div>

          {/* Actions */}
          <div className="relative flex flex-col gap-2 px-4 pt-2 pb-2">
            {phase === "inspect" ? (
              <>
                <PhoneButton ref={primaryRef} variant="primary" onClick={() => setPhase("cleaning")}>{t(text.suggestErase)}</PhoneButton>
                <PhoneButton variant="ghost" onClick={() => setPhase("confirmLeave")}>{t(text.leaveIt)}</PhoneButton>
              </>
            ) : phase === "confirmLeave" ? (
              <>
                <PhoneButton ref={primaryRef} variant="ghost" onClick={() => setPhase("inspect")}>{t(text.back)}</PhoneButton>
                <PhoneButton variant="danger" onClick={() => onSelect(leaveNext)}>{t(text.confirm)}</PhoneButton>
              </>
            ) : phase === "cleared" ? (
              <PhoneButton ref={primaryRef} variant="safe" onClick={() => onSelect(clearNext)}>{t(text.returnPhone)}</PhoneButton>
            ) : (
              <div className="flex items-center justify-center gap-2" style={{ padding: "8px 0" }} aria-hidden>
                {saraPhoneTraces.map((trace) => {
                  const done = erased.includes(trace.id);
                  return (
                    <span
                      key={trace.id}
                      style={{
                        width: done ? 18 : 8,
                        height: 8,
                        borderRadius: 4,
                        background: done ? SAFE : "rgba(255,255,255,0.18)",
                        boxShadow: done ? "0 0 8px rgba(79,214,138,0.6)" : "none",
                        transition: "width .3s ease, background .3s ease",
                      }}
                    />
                  );
                })}
                <span className="ml-2" style={{ fontSize: 11.5, color: "rgba(245,238,230,0.55)" }}>{t(text.remaining(remaining))}</span>
              </div>
            )}
          </div>

          <p role="status" className="sr-only">{statusText}</p>

          <div className="relative flex justify-center pb-2.5 pt-1">
            <div style={{ width: 120, height: 4, borderRadius: 3, background: "rgba(255,255,255,0.3)" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

type PhoneButtonProps = {
  variant: "primary" | "ghost" | "danger" | "safe";
  onClick: () => void;
  children: string;
  ref?: Ref<HTMLButtonElement>;
};

const phoneButtonStyles: Record<PhoneButtonProps["variant"], CSSProperties> = {
  primary: {
    background: "linear-gradient(180deg, #ff7a6b, #e0483d)",
    color: "#fff",
    border: "1px solid rgba(255,140,128,0.6)",
    boxShadow: "0 8px 22px rgba(224,72,61,0.35), inset 0 1px 0 rgba(255,255,255,0.3)",
  },
  safe: {
    background: "linear-gradient(180deg, #5fe39a, #2fb36a)",
    color: "#06210f",
    border: "1px solid rgba(120,240,170,0.6)",
    boxShadow: "0 8px 22px rgba(47,179,106,0.35), inset 0 1px 0 rgba(255,255,255,0.35)",
  },
  ghost: { background: "rgba(255,255,255,0.06)", color: "rgba(245,238,230,0.85)", border: "1px solid rgba(255,255,255,0.12)" },
  danger: { background: "rgba(255,90,78,0.12)", color: "#ff8f85", border: "1px solid rgba(255,90,78,0.45)" },
};

const PhoneButton = ({ variant, onClick, children, ref }: PhoneButtonProps) => (
  <button
    ref={ref}
    type="button"
    onClick={onClick}
    className="w-full outline-none transition-transform duration-150 focus-visible:ring-2 focus-visible:ring-white/50 active:scale-[0.97]"
    style={{ borderRadius: 16, padding: "12px 14px", fontSize: 14, fontWeight: 700, ...phoneButtonStyles[variant] }}
  >
    {children}
  </button>
);
