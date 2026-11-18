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
  },
  {
    id: "family",
    app: tx({ id: "Berbagi", en: "Sharing", ja: "共有", ko: "공유" }),
    title: tx({ id: "Berbagi lokasi keluarga", en: "Family location sharing", ja: "家族と位置情報を共有", ko: "가족 위치 공유" }),
    detail: tx({ id: "Aktif · terlihat oleh suami", en: "On · visible to her husband", ja: "オン · 夫に表示中", ko: "켜짐 · 남편에게 보임" }),
    risk: 24,
    icon: "M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20v-1a5 5 0 0 1 9-3M13 16a5 5 0 0 1 9 3v1",
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
  },
  {
    id: "email",
    app: tx({ id: "Email", en: "Mail", ja: "メール", ko: "메일" }),
    title: tx({ id: "Konfirmasi reservasi", en: "Booking confirmation", ja: "予約確認", ko: "예약 확인" }),
    detail: tx({ id: "Kamar 1207 · 1 malam · a.n. Sarah", en: "Room 1207 · 1 night · under Sarah", ja: "1207号室 · 1泊 · サラ名義", ko: "1207호 · 1박 · 사라 명의" }),
    risk: 12,
    icon: "M3 6h18v12H3zM3 7l9 6 9-6",
  },
  {
    id: "parking",
    app: tx({ id: "Lokasi", en: "Location", ja: "位置情報", ko: "위치" }),
    title: tx({ id: "Kemarin sore", en: "Yesterday evening", ja: "昨日の夕方", ko: "어제 저녁" }),
    detail: tx({ id: "Basement Parking B2 · berhenti 48 menit", en: "Basement Parking B2 · stopped 48 min", ja: "地下駐車場B2 · 48分停車", ko: "지하 주차장 B2 · 48분 정차" }),
    risk: 6,
    icon: "M5 17h14M6 17l1.5-5h9L18 17M8 17v2M16 17v2M9 9h6",
  },
];

const text = {
  owner: tx({ id: "Ponsel Sarah", en: "Sarah's phone", ja: "サラのスマホ", ko: "사라의 휴대폰" }),
  title: tx({ id: "Privasi & Aktivitas", en: "Privacy & Activity", ja: "プライバシーと履歴", ko: "개인정보 & 활동" }),
  risk: tx({ id: "Risiko terlacak", en: "Trace risk", ja: "発覚リスク", ko: "추적 위험" }),
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
  const holdRef = useRef<ActiveHold | null>(null);
  const primaryRef = useRef<HTMLButtonElement>(null);
  const t = (value: LocalizedText) => resolveText(value, language);

  const risk = SARA_PHONE_BASE_RISK + saraPhoneTraces.filter((trace) => !erased.includes(trace.id)).reduce((sum, trace) => sum + trace.risk, 0);
  const remaining = saraPhoneTraces.length - erased.length;
  const firstActiveId = saraPhoneTraces.find((trace) => !erased.includes(trace.id))?.id;
  const riskColor = risk > 60 ? "#e07a6e" : risk > 25 ? "#d8b38a" : "#8fbf9a";

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(6,5,8,0.76)", backdropFilter: "blur(14px)" }}
      onClick={(event) => event.stopPropagation()}
    >
      <div
        className="relative flex flex-col"
        style={{
          width: "min(340px, calc(100vw - 32px))",
          height: "min(660px, calc(100dvh - 32px))",
          borderRadius: 48,
          padding: 10,
          background: "linear-gradient(160deg, #3a3029 0%, #1f1a17 45%, #120f0d 100%)",
          boxShadow:
            "0 0 0 1px rgba(216,179,138,0.22), 0 0 0 2px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,236,210,0.14), 0 60px 120px rgba(0,0,0,0.72)",
        }}
      >
        <div
          className="flex flex-1 flex-col overflow-hidden"
          style={{
            borderRadius: 40,
            background: "radial-gradient(ellipse at 50% -10%, #2a2026 0%, #110e12 45%, #0a090b 100%)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
            color: "#f3ebe2",
          }}
        >
          <div className="flex justify-center pt-3 pb-1">
            <div style={{ width: 104, height: 28, borderRadius: 20, background: "#000" }} />
          </div>
          <div className="flex items-center justify-between px-6 pb-2" style={{ fontSize: 11, color: "rgba(243,235,226,0.75)" }}>
            <span style={{ fontWeight: 600 }}>23:08</span>
            <span style={{ letterSpacing: "0.12em" }}>5G</span>
          </div>

          <div className="px-5 pt-2 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ fontSize: 10.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(216,179,138,0.8)" }}>
              {t(text.owner)}
            </div>
            <div style={{ marginTop: 2, fontSize: 21, fontWeight: 600, fontFamily: "Georgia, serif", letterSpacing: "-0.01em" }}>
              {t(text.title)}
            </div>
            <div className="mt-3">
              <div className="flex items-baseline justify-between" style={{ fontSize: 11 }}>
                <span style={{ color: "rgba(243,235,226,0.55)" }}>{t(text.risk)}</span>
                <span style={{ fontWeight: 700, color: riskColor, transition: "color .5s ease" }}>{risk}%</span>
              </div>
              <div className="mt-1.5 overflow-hidden" style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,0.08)" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${risk}%`,
                    borderRadius: 3,
                    background: riskColor,
                    transition: "width .55s ease, background .5s ease",
                  }}
                />
              </div>
            </div>
            <p className="mt-3" style={{ fontSize: 12, lineHeight: 1.5, color: "rgba(243,235,226,0.62)" }} aria-hidden>
              {statusText}
            </p>
          </div>

          <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-3 py-3">
            {phase === "cleared" ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3" style={{ animation: "vn-pipe-pop 0.4s ease-out both" }}>
                <div
                  className="flex items-center justify-center"
                  style={{ width: 64, height: 64, borderRadius: 32, border: "1.5px solid rgba(143,191,154,0.6)", background: "rgba(143,191,154,0.1)" }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8fbf9a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </div>
              </div>
            ) : (
              saraPhoneTraces.map((trace) => {
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
                    className="relative flex items-center gap-3 overflow-hidden text-left select-none *:pointer-events-none"
                    style={{
                      borderRadius: 16,
                      padding: isErased ? "8px 12px" : "11px 12px",
                      background: isErased ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.045)",
                      border: `1px solid ${isHolding ? "rgba(224,122,110,0.55)" : "rgba(255,255,255,0.07)"}`,
                      opacity: isErased ? 0.5 : 1,
                      cursor: canHold ? "pointer" : "default",
                      touchAction: "none",
                      WebkitTouchCallout: "none",
                      transition: "padding .3s ease, opacity .3s ease, border-color .2s ease",
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
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0"
                      style={{
                        width: isHolding ? "100%" : "0%",
                        background: "linear-gradient(90deg, rgba(224,122,110,0.08), rgba(224,122,110,0.24))",
                        transition: isHolding ? `width ${SARA_PHONE_HOLD_MS}ms linear` : "width 160ms ease-out",
                      }}
                    />
                    <span
                      aria-hidden
                      className="relative flex shrink-0 items-center justify-center"
                      style={{
                        width: isErased ? 28 : 36,
                        height: isErased ? 28 : 36,
                        borderRadius: 11,
                        background: isErased ? "rgba(143,191,154,0.12)" : "rgba(216,179,138,0.12)",
                        color: isErased ? "#8fbf9a" : "#d8b38a",
                        transition: "width .3s ease, height .3s ease",
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d={isErased ? "M5 12.5l4.5 4.5L19 7.5" : trace.icon} />
                      </svg>
                    </span>
                    <span className="relative min-w-0 flex-1">
                      <span className="flex items-center gap-2" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(243,235,226,0.4)" }}>
                        {t(trace.app)}
                        {isErased ? <span style={{ color: "#8fbf9a" }}>· {t(trace.disable ? text.disabled : text.erased)}</span> : null}
                      </span>
                      <span className="block truncate" style={{ fontSize: 13.5, fontWeight: 600, textDecoration: isErased ? "line-through" : "none" }}>
                        {t(trace.title)}
                      </span>
                      {!isErased ? (
                        <span className="block" style={{ marginTop: 2, fontSize: 11.5, lineHeight: 1.4, color: "rgba(243,235,226,0.58)" }}>
                          {t(trace.detail)}
                        </span>
                      ) : null}
                    </span>
                    {canHold ? (
                      <span className="relative shrink-0" style={{ fontSize: 10, color: "rgba(224,122,110,0.85)", maxWidth: 64, textAlign: "right", lineHeight: 1.3 }}>
                        {t(trace.disable ? text.holdDisable : text.hold)}
                      </span>
                    ) : null}
                  </button>
                );
              })
            )}
          </div>

          <div className="flex flex-col gap-2 px-4 pt-1 pb-2">
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
              <PhoneButton ref={primaryRef} variant="primary" onClick={() => onSelect(clearNext)}>{t(text.returnPhone)}</PhoneButton>
            ) : (
              <div className="text-center" style={{ fontSize: 11.5, color: "rgba(243,235,226,0.5)", padding: "10px 0" }} aria-hidden>
                {t(text.remaining(remaining))}
              </div>
            )}
          </div>

          <p role="status" className="sr-only">{statusText}</p>

          <div className="flex justify-center pb-3 pt-1">
            <div style={{ width: 100, height: 4, borderRadius: 3, background: "rgba(255,255,255,0.22)" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

type PhoneButtonProps = {
  variant: "primary" | "ghost" | "danger";
  onClick: () => void;
  children: string;
  ref?: Ref<HTMLButtonElement>;
};

const phoneButtonStyles: Record<PhoneButtonProps["variant"], CSSProperties> = {
  primary: { background: "#d8b38a", color: "#1d1612", border: "1px solid #d8b38a" },
  ghost: { background: "transparent", color: "rgba(243,235,226,0.8)", border: "1px solid rgba(255,255,255,0.14)" },
  danger: { background: "rgba(224,122,110,0.12)", color: "#eaa197", border: "1px solid rgba(224,122,110,0.45)" },
};

const PhoneButton = ({ variant, onClick, children, ref }: PhoneButtonProps) => (
  <button
    ref={ref}
    type="button"
    onClick={onClick}
    className="w-full transition-transform duration-150 active:scale-[0.98]"
    style={{ borderRadius: 14, padding: "11px 14px", fontSize: 13.5, fontWeight: 600, ...phoneButtonStyles[variant] }}
  >
    {children}
  </button>
);
