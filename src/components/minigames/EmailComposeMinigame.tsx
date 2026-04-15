import { useState, useEffect, useRef } from "react";

type Step = "subject" | "body" | "attach" | "send" | "done";

const SUBJECT_OPTIONS = [
  { id: "correct", label: "Exam Absence Request — Maya Ramadhani (High Fever)" },
  { id: "casual",  label: "Hey, Maya can't make it to the exam today" },
  { id: "vague",   label: "RE: Anatomy Exam Schedule" },
];

const BODY_OPTIONS = [
  {
    id: "correct",
    label: "Maya has been running a high fever since last night and is unable to attend. Please find the attached medical note from the apartment clinic as supporting documentation.",
  },
  {
    id: "casual",
    label: "Maya is sick so she probably can't come to the exam today. Hope that's okay.",
  },
  {
    id: "short",
    label: "Maya is unable to attend. Thank you.",
  },
];

type Props = { onComplete: () => void };

export const EmailComposeMinigame = ({ onComplete }: Props) => {
  const [step, setStep] = useState<Step>("subject");
  const [subject, setSubject] = useState<string | null>(null);
  const [body, setBody] = useState<string | null>(null);
  const [attached, setAttached] = useState(false);
  const [sent, setSent] = useState(false);
  const [wrongPick, setWrongPick] = useState<string | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const isReadyToSend = subject === "correct" && body === "correct" && attached;

  const handleSubjectPick = (id: string) => {
    if (step !== "subject") return;
    if (id !== "correct") {
      setWrongPick(id);
      setTimeout(() => setWrongPick(null), 600);
      return;
    }
    setSubject(id);
    setStep("body");
  };

  const handleBodyPick = (id: string) => {
    if (step !== "body") return;
    if (id !== "correct") {
      setWrongPick(id);
      setTimeout(() => setWrongPick(null), 600);
      return;
    }
    setBody(id);
    setStep("attach");
  };

  const handleAttach = () => {
    if (step !== "attach") return;
    setAttached(true);
    setStep("send");
  };

  const handleSend = () => {
    if (!isReadyToSend || sent) return;
    setSent(true);
    setStep("done");
  };

  useEffect(() => {
    if (!sent) return;
    const t = setTimeout(() => onCompleteRef.current(), 1400);
    return () => clearTimeout(t);
  }, [sent]);

  const stepLabel: Record<Step, string> = {
    subject: "1 / 3 — Choose the right subject line",
    body:    "2 / 3 — Choose the right message",
    attach:  "3 / 3 — Attach the clinic note",
    send:    "Ready — Send the email",
    done:    "Sent ✓",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(14px)" }}
      onClick={e => e.stopPropagation()}
    >
      <div
        style={{
          width: 520,
          maxWidth: "calc(100vw - 24px)",
          maxHeight: "calc(100vh - 48px)",
          borderRadius: 10,
          background: "#1a1a2e",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.09), 0 48px 96px rgba(0,0,0,0.65)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {/* Window chrome */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 14px",
            background: "#22223a",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
          </div>
          <span
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 12,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.04em",
            }}
          >
            Compose Email — Maya Ramadhani
          </span>
        </div>

        <div style={{ padding: "16px 20px 20px", overflowY: "auto", flex: 1 }}>
          {/* Progress hint */}
          <div
            style={{
              fontSize: 11,
              color: sent ? "#9ece6a" : "rgba(255,255,255,0.38)",
              marginBottom: 14,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {stepLabel[step]}
          </div>

          {/* --- To field (static) --- */}
          <EmailField label="To">
            <span style={{ color: "#7dcfff", fontSize: 13 }}>
              dr.anatomi@fk.univ.ac.id
            </span>
          </EmailField>

          {/* --- Subject --- */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.35)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.07em" }}>
              Subject
            </div>
            {subject === "correct" ? (
              <div
                style={{
                  padding: "8px 12px",
                  background: "rgba(158,206,106,0.10)",
                  border: "1px solid rgba(158,206,106,0.30)",
                  borderRadius: 6,
                  fontSize: 13,
                  color: "#9ece6a",
                }}
              >
                {SUBJECT_OPTIONS.find(o => o.id === "correct")!.label}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {SUBJECT_OPTIONS.map(opt => (
                  <OptionButton
                    key={opt.id}
                    label={opt.label}
                    isWrong={wrongPick === opt.id}
                    disabled={step !== "subject"}
                    onClick={() => handleSubjectPick(opt.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* --- Body --- */}
          <div style={{ marginBottom: 10, opacity: step === "subject" ? 0.35 : 1, transition: "opacity 0.3s" }}>
            <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.35)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.07em" }}>
              Message
            </div>
            {body === "correct" ? (
              <div
                style={{
                  padding: "10px 12px",
                  background: "rgba(158,206,106,0.10)",
                  border: "1px solid rgba(158,206,106,0.30)",
                  borderRadius: 6,
                  fontSize: 12.5,
                  color: "#9ece6a",
                  lineHeight: 1.55,
                }}
              >
                {BODY_OPTIONS.find(o => o.id === "correct")!.label}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {BODY_OPTIONS.map(opt => (
                  <OptionButton
                    key={opt.id}
                    label={opt.label}
                    isWrong={wrongPick === opt.id}
                    disabled={step !== "body"}
                    onClick={() => handleBodyPick(opt.id)}
                    multiline
                  />
                ))}
              </div>
            )}
          </div>

          {/* --- Attachment --- */}
          <div
            style={{
              marginBottom: 16,
              opacity: step === "subject" || step === "body" ? 0.30 : 1,
              transition: "opacity 0.3s",
            }}
          >
            <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.35)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.07em" }}>
              Attachment
            </div>
            {attached ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "7px 12px",
                  background: "rgba(158,206,106,0.10)",
                  border: "1px solid rgba(158,206,106,0.30)",
                  borderRadius: 6,
                  fontSize: 12.5,
                  color: "#9ece6a",
                }}
              >
                <span>📎</span>
                <span>clinic_medical_note.pdf</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleAttach}
                disabled={step !== "attach"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "11px 14px",
                  background: step === "attach" ? "rgba(122,162,247,0.10)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${step === "attach" ? "rgba(122,162,247,0.40)" : "rgba(255,255,255,0.10)"}`,
                  borderRadius: 6,
                  fontSize: 13,
                  color: step === "attach" ? "#7aa2f7" : "rgba(255,255,255,0.28)",
                  cursor: step === "attach" ? "pointer" : "not-allowed",
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                  width: "100%",
                }}
              >
                <span>📎</span>
                <span>
                  {step === "attach"
                    ? "Click to attach clinic_medical_note.pdf"
                    : "clinic_medical_note.pdf (waiting...)"}
                </span>
              </button>
            )}
          </div>

          {/* --- Send button --- */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!isReadyToSend || sent}
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: 7,
              border: "none",
              fontSize: 13.5,
              fontWeight: 700,
              letterSpacing: "0.04em",
              fontFamily: "inherit",
              background: sent
                ? "rgba(158,206,106,0.20)"
                : isReadyToSend
                  ? "linear-gradient(135deg, #7aa2f7 0%, #bb9af7 100%)"
                  : "rgba(255,255,255,0.06)",
              color: sent
                ? "#9ece6a"
                : isReadyToSend
                  ? "#ffffff"
                  : "rgba(255,255,255,0.22)",
              cursor: isReadyToSend && !sent ? "pointer" : "not-allowed",
              transition: "all 0.3s ease",
              boxShadow: isReadyToSend && !sent ? "0 4px 20px rgba(122,162,247,0.30)" : "none",
            }}
          >
            {sent ? "✓  Email Sent" : "Send Email"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---- helper sub-components ---- */

const EmailField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "7px 12px",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 6,
      marginBottom: 10,
    }}
  >
    <span style={{ fontSize: 10.5, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.07em", minWidth: 54 }}>
      {label}
    </span>
    {children}
  </div>
);

const OptionButton = ({
  label,
  isWrong,
  disabled,
  onClick,
  multiline = false,
}: {
  label: string;
  isWrong: boolean;
  disabled: boolean;
  onClick: () => void;
  multiline?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    style={{
      textAlign: "left",
      padding: multiline ? "11px 14px" : "11px 14px",
      background: isWrong ? "rgba(247,118,142,0.15)" : "rgba(255,255,255,0.05)",
      border: isWrong
        ? "1px solid rgba(247,118,142,0.55)"
        : "1px solid rgba(255,255,255,0.10)",
      borderRadius: 6,
      fontSize: 13,
      color: isWrong ? "#f7768e" : disabled ? "rgba(255,255,255,0.28)" : "#c0caf5",
      cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: "inherit",
      lineHeight: 1.5,
      transition: "background 0.15s, border-color 0.15s",
      width: "100%",
    }}
  >
    {label}
  </button>
);
