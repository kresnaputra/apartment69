import { useState, useEffect, useRef } from "react";

type JunkProcess = {
  id: string;
  name: string;
  cpu: number;
  memory: string;
};

const JUNK_PROCESSES: JunkProcess[] = [
  { id: "p1", name: "TempDump.exe",    cpu: 87, memory: "1.2 GB" },
  { id: "p2", name: "RogueUpdate.exe", cpu: 63, memory: "890 MB" },
  { id: "p3", name: "CachePile.exe",   cpu: 45, memory: "654 MB" },
  { id: "p4", name: "OldBackup.tmp",   cpu: 32, memory: "445 MB" },
];

type Props = { onComplete: () => void };

export const LaptopCleanupMinigame = ({ onComplete }: Props) => {
  const [processes, setProcesses] = useState<JunkProcess[]>(JUNK_PROCESSES);
  const [killing, setKilling] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const cpuPercent =
    processes.length === 0
      ? 4
      : Math.min(99, Math.round((processes.reduce((s, p) => s + p.cpu, 0) / processes.length) * 1.15));

  const killProcess = (id: string) => {
    if (killing || done) return;
    setKilling(id);
    setTimeout(() => {
      setProcesses(prev => prev.filter(p => p.id !== id));
      setKilling(null);
    }, 400);
  };

  useEffect(() => {
    if (processes.length > 0) return;
    setDone(true);
    const t = setTimeout(() => onCompleteRef.current(), 1200);
    return () => clearTimeout(t);
  }, [processes]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(12px)" }}
      onClick={e => e.stopPropagation()}
    >
      <div
        style={{
          width: 480,
          maxWidth: "calc(100vw - 32px)",
          borderRadius: 8,
          background: "#1e1e2e",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 40px 80px rgba(0,0,0,0.6)",
          overflow: "hidden",
          fontFamily: "ui-monospace, 'Cascadia Code', 'Fira Mono', monospace",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 12px",
            background: "#2a2a3e",
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
              color: "rgba(255,255,255,0.50)",
              letterSpacing: "0.04em",
            }}
          >
            Task Manager — Laptop Maya
          </span>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            background: "#252535",
          }}
        >
          {["Processes", "Performance", "Details"].map((tab, i) => (
            <div
              key={tab}
              style={{
                padding: "7px 16px",
                fontSize: 12,
                color: i === 0 ? "#a9b1d6" : "rgba(255,255,255,0.28)",
                borderBottom: i === 0 ? "2px solid #7aa2f7" : "2px solid transparent",
                userSelect: "none",
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        <div style={{ padding: "12px 16px" }}>
          {/* Instruction */}
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.40)", marginBottom: 10, lineHeight: 1.5 }}>
            {done
              ? "✓ All junk processes terminated. System is clean."
              : `${processes.length} heavy process${processes.length !== 1 ? "es" : ""} detected — click End Task to remove them.`}
          </div>

          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 56px 80px 96px",
              padding: "4px 6px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              marginBottom: 4,
            }}
          >
            {["Name", "CPU", "Memory", ""].map(h => (
              <span
                key={h}
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.35)",
                  fontWeight: 600,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Process rows */}
          <div style={{ minHeight: 160 }}>
            {processes.map(p => {
              const isKilling = killing === p.id;
              return (
                <div
                  key={p.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 56px 80px 96px",
                    alignItems: "center",
                    padding: "6px 6px",
                    borderRadius: 4,
                    marginBottom: 2,
                    background: isKilling ? "rgba(247,118,142,0.10)" : "rgba(255,255,255,0.03)",
                    opacity: isKilling ? 0.45 : 1,
                    transition: "all 0.35s ease",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12.5,
                      color: "#c0caf5",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.name}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: p.cpu > 70 ? "#f7768e" : p.cpu > 40 ? "#e0af68" : "#9ece6a",
                    }}
                  >
                    {p.cpu}%
                  </span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.50)" }}>{p.memory}</span>
                  <button
                    type="button"
                    onClick={() => killProcess(p.id)}
                    disabled={!!killing || done}
                    style={{
                      fontSize: 10.5,
                      fontFamily: "inherit",
                      padding: "3px 8px",
                      borderRadius: 3,
                      border: "1px solid rgba(247,118,142,0.45)",
                      background: isKilling ? "rgba(247,118,142,0.18)" : "rgba(247,118,142,0.07)",
                      color: "#f7768e",
                      cursor: killing || done ? "not-allowed" : "pointer",
                      transition: "background 0.15s",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {isKilling ? "Killing..." : "End Task"}
                  </button>
                </div>
              );
            })}

            {processes.length === 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 100,
                  color: "#9ece6a",
                  fontSize: 13,
                  letterSpacing: "0.02em",
                }}
              >
                System clean ✓
              </div>
            )}
          </div>

          {/* CPU bar */}
          <div
            style={{
              marginTop: 12,
              paddingTop: 12,
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}
              >
                CPU
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: cpuPercent > 70 ? "#f7768e" : "#9ece6a",
                  transition: "color 0.6s",
                }}
              >
                {cpuPercent}%
              </span>
            </div>
            <div
              style={{
                height: 6,
                borderRadius: 3,
                background: "rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${cpuPercent}%`,
                  borderRadius: 3,
                  background: cpuPercent > 70 ? "#f7768e" : "#9ece6a",
                  transition: "width 0.6s ease, background 0.6s ease",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
