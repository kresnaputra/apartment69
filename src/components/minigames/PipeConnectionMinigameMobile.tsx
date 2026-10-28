import { useState, useCallback, useEffect, useRef } from "react";

type PipeType = "STRAIGHT" | "CORNER" | "TEE" | "CROSS";

type CellDef = {
  type: PipeType;
  rotation: number;
};

const BASE: Record<PipeType, [boolean, boolean, boolean, boolean]> = {
  STRAIGHT: [true, false, true, false],
  CORNER:   [true, true, false, false],
  TEE:      [true, true, false, true],
  CROSS:    [true, true, true, true],
};

function getConns(cell: CellDef): [boolean, boolean, boolean, boolean] {
  const b = BASE[cell.type];
  const r = cell.rotation;
  return [b[(0 - r + 4) % 4], b[(1 - r + 4) % 4], b[(2 - r + 4) % 4], b[(3 - r + 4) % 4]];
}

const DR = [-1, 0, 1, 0];
const DC = [0, 1, 0, -1];
const OPP = [2, 3, 0, 1];
const ROWS = 4;
const COLS = 4;
const GAP = 2;
const SZ = 48;          // smaller than desktop (64)
const HC = SZ / 2;

function floodFill(grid: CellDef[][]): boolean[][] {
  const vis: boolean[][] = Array.from({ length: ROWS }, () => new Array(COLS).fill(false));
  const q: Array<{ r: number; c: number; f: number }> = [{ r: 1, c: 0, f: 3 }];
  while (q.length) {
    const { r, c, f } = q.shift()!;
    if (vis[r][c]) continue;
    const cn = getConns(grid[r][c]);
    if (!cn[f]) continue;
    vis[r][c] = true;
    for (let s = 0; s < 4; s++) {
      if (s === f || !cn[s]) continue;
      const nr = r + DR[s], nc = c + DC[s];
      if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || vis[nr][nc]) continue;
      q.push({ r: nr, c: nc, f: OPP[s] });
    }
  }
  return vis;
}

function checkSolved(grid: CellDef[][], vis: boolean[][]): boolean {
  return vis[2][3] && getConns(grid[2][3])[1];
}

const INIT: CellDef[][] = [
  [{ type: "CORNER",   rotation: 3 }, { type: "STRAIGHT", rotation: 1 }, { type: "CORNER",   rotation: 2 }, { type: "STRAIGHT", rotation: 0 }],
  [{ type: "STRAIGHT", rotation: 0 }, { type: "CORNER",   rotation: 1 }, { type: "CORNER",   rotation: 0 }, { type: "CORNER",   rotation: 2 }],
  [{ type: "CORNER",   rotation: 1 }, { type: "CORNER",   rotation: 2 }, { type: "STRAIGHT", rotation: 0 }, { type: "STRAIGHT", rotation: 0 }],
  [{ type: "STRAIGHT", rotation: 2 }, { type: "CORNER",   rotation: 0 }, { type: "STRAIGHT", rotation: 3 }, { type: "CORNER",   rotation: 1 }],
];

function buildBasePaths(type: PipeType): string[] {
  const b = BASE[type];
  const pts: [number, number][] = [[HC, 0], [SZ, HC], [HC, SZ], [0, HC]];
  const open = b.reduce<number[]>((a, v, i) => (v ? [...a, i] : a), []);
  if (open.length === 0) return [];
  if (open.length === 1) {
    const [x, y] = pts[open[0]];
    return [`M ${x},${y} L ${HC},${HC}`];
  }
  if (open.length === 2) {
    const [a, b2] = open;
    const [ax, ay] = pts[a];
    const [bx, by] = pts[b2];
    if ((a + 2) % 4 === b2) return [`M ${ax},${ay} L ${bx},${by}`];
    return [`M ${ax},${ay} Q ${HC},${HC} ${bx},${by}`];
  }
  if (open.length === 3) {
    const pa = open.find(s => open.includes((s + 2) % 4))!;
    const pb = (pa + 2) % 4;
    const br = open.find(s => s !== pa && s !== pb)!;
    const [ax, ay] = pts[pa];
    const [bx, by] = pts[pb];
    const [brx, bry] = pts[br];
    return [`M ${ax},${ay} L ${bx},${by}`, `M ${HC},${HC} L ${brx},${bry}`];
  }
  return [`M 0,${HC} L ${SZ},${HC}`, `M ${HC},0 L ${HC},${SZ}`];
}

type CellProps = { cell: CellDef; active: boolean; isCursor: boolean; onRotate: () => void };

function PipeCell({ cell, active, isCursor, onRotate }: CellProps) {
  const paths = buildBasePaths(cell.type);
  const color = active ? "#4bb8ff" : "#3a3a52";
  const bg = active ? "rgba(75,184,255,0.07)" : "rgba(255,255,255,0.02)";
  return (
    <svg width={SZ} height={SZ} style={{ cursor: "pointer", display: "block" }} onClick={onRotate}>
      <rect width={SZ} height={SZ} fill={bg} rx={3} />
      <rect width={SZ} height={SZ} fill="none" stroke={isCursor ? "rgba(255,214,173,0.7)" : "rgba(255,255,255,0.05)"} strokeWidth={isCursor ? 2 : 1} />
      <g style={{ transformOrigin: `${HC}px ${HC}px`, transform: `rotate(${cell.rotation * 90}deg)`, transition: "transform 0.12s ease-out" }}>
        {paths.map((d, i) => (
          <path key={i} d={d} stroke={color} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {paths.length > 0 && <circle cx={HC} cy={HC} r={4} fill={color} />}
      </g>
    </svg>
  );
}

const rowTop = (r: number) => r * (SZ + GAP);
const GRID_H = ROWS * SZ + (ROWS - 1) * GAP;
const GRID_W = COLS * SZ + (COLS - 1) * GAP;
const STUB_W = 26;

type Props = { onComplete: () => void };

export const PipeConnectionMinigameMobile = ({ onComplete }: Props) => {
  const [grid, setGrid] = useState<CellDef[][]>(() =>
    INIT.map(row => row.map(c => ({ ...c })))
  );
  const [done, setDone] = useState(false);
  const [cursor, setCursor] = useState<[number, number]>([0, 0]);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const cursorRef = useRef<[number, number]>([0, 0]);
  cursorRef.current = cursor;

  const vis = floodFill(grid);
  const solved = checkSolved(grid, vis);

  useEffect(() => {
    if (!solved) return;
    setDone(true);
    const t = setTimeout(() => onCompleteRef.current(), 1100);
    return () => clearTimeout(t);
  }, [solved]);

  const rotate = useCallback(
    (r: number, c: number) => {
      if (done) return;
      setGrid(prev =>
        prev.map((row, ri) =>
          row.map((cell, ci) =>
            ri === r && ci === c ? { ...cell, rotation: (cell.rotation + 1) % 4 } : cell
          )
        )
      );
    },
    [done]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (done) return;
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor(([r, c]) => [Math.max(0, r - 1), c]);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor(([r, c]) => [Math.min(ROWS - 1, r + 1), c]);
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCursor(([r, c]) => [r, Math.max(0, c - 1)]);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setCursor(([r, c]) => [r, Math.min(COLS - 1, c + 1)]);
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const [r, c] = cursorRef.current;
        rotate(r, c);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [done, rotate]);

  const srcColor = vis[1][0] ? "#4bb8ff" : "#252535";
  const drainColor = solved ? "#00e5a0" : vis[2][3] ? "#4bb8ff" : "#252535";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3"
      style={{
        background: "radial-gradient(circle at top,rgba(255,223,147,0.18),transparent 30%),rgba(4,7,12,0.62)",
        backdropFilter: "blur(8px)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={`relative flex flex-row gap-4 items-center rounded-[28px] border border-white/8 px-5 py-3 w-full max-w-lg${done ? " [box-shadow:0_32px_90px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-20px_40px_rgba(0,0,0,0.34),0_0_60px_rgba(0,229,160,0.14)]" : ""}`}
        style={{
          background:
            "linear-gradient(145deg,rgba(115,127,142,0.28),rgba(22,28,38,0.86) 18%,rgba(7,10,16,0.96) 70%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent 24%)",
          boxShadow: done
            ? "0 32px 90px rgba(0,0,0,0.48),inset 0 1px 0 rgba(255,255,255,0.16),inset 0 -20px 40px rgba(0,0,0,0.34),0 0 60px rgba(0,229,160,0.14)"
            : "0 32px 90px rgba(0,0,0,0.48),inset 0 1px 0 rgba(255,255,255,0.16),inset 0 -20px 40px rgba(0,0,0,0.34)",
          transition: "box-shadow 0.6s ease",
        }}
      >
        {/* Corner screws */}
        {["-top-0.5 -left-0.5", "-top-0.5 -right-0.5", "-bottom-0.5 -left-0.5", "-bottom-0.5 -right-0.5"].map((pos, i) => (
          <span
            key={i}
            className={`absolute w-2.5 h-2.5 rounded-full ${pos}`}
            style={{
              background: "radial-gradient(circle at 35% 35%,rgba(255,255,255,0.5),rgba(132,145,160,0.32) 45%,rgba(27,33,41,0.9) 100%)",
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.22)",
            }}
          />
        ))}

        {/* Left: info */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <p className="m-0 text-[0.6rem] tracking-[0.26em] uppercase text-[rgba(199,208,220,0.72)]">
            Unit 303
          </p>
          <p
            className="m-0 text-white font-bold leading-tight"
            style={{ fontSize: "clamp(1.3rem,3.5vw,1.8rem)", letterSpacing: "-0.03em" }}
          >
            Connect the Pipes
          </p>
          <p className="m-0 text-[0.68rem] leading-[1.55] text-[rgba(194,202,214,0.88)]">
            Tap a pipe to rotate it. Connect the water source to the drain.
          </p>
          {done && (
            <p
              className="m-0 text-sm tracking-[0.12em] uppercase mt-1"
              style={{ color: "#00e5a0", animation: "vn-pipe-pop 0.4s ease-out both" }}
            >
              Pipes connected.
            </p>
          )}
        </div>

        {/* Right: pipe grid with stubs */}
        <div className="flex flex-row items-start shrink-0" style={{ gap: 0 }}>
          {/* Source stub */}
          <div className="relative shrink-0" style={{ width: STUB_W, height: GRID_H }}>
            <span
              className="absolute left-0 right-0 text-center text-[0.48rem] tracking-[0.14em] uppercase pointer-events-none"
              style={{ color: "rgba(190,200,215,0.45)", top: rowTop(1) + HC - 16 }}
            >
              src
            </span>
            <div
              className="absolute"
              style={{
                left: 0, width: STUB_W, height: 8,
                top: rowTop(1) + HC - 4,
                borderRadius: "4px 0 0 4px",
                background: srcColor,
                transition: "background 0.3s",
              }}
            />
          </div>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${COLS}, ${SZ}px)`,
              gridTemplateRows: `repeat(${ROWS}, ${SZ}px)`,
              gap: GAP,
              width: GRID_W,
              height: GRID_H,
              flexShrink: 0,
            }}
          >
            {grid.map((row, r) =>
              row.map((cell, c) => (
                <PipeCell key={`${r}-${c}`} cell={cell} active={vis[r][c]} isCursor={cursor[0] === r && cursor[1] === c} onRotate={() => rotate(r, c)} />
              ))
            )}
          </div>

          {/* Drain stub */}
          <div className="relative shrink-0" style={{ width: STUB_W, height: GRID_H }}>
            <span
              className="absolute left-0 right-0 text-center text-[0.48rem] tracking-[0.14em] uppercase pointer-events-none"
              style={{ color: "rgba(190,200,215,0.45)", top: rowTop(2) + HC - 16 }}
            >
              out
            </span>
            <div
              className="absolute"
              style={{
                left: 0, width: STUB_W, height: 8,
                top: rowTop(2) + HC - 4,
                borderRadius: "0 4px 4px 0",
                background: drainColor,
                transition: "background 0.3s",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
