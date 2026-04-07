import { useState, useCallback, useEffect, useRef } from "react";

type PipeType = "STRAIGHT" | "CORNER" | "TEE" | "CROSS";

type CellDef = {
  type: PipeType;
  rotation: number; // 0–3, clockwise
};

// Base connections [top, right, bottom, left] at rotation=0
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
const SZ = 64;
const HC = SZ / 2;

// Flood fill from source: enters row 1, col 0 from left (side 3)
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

// Solved when drain cell (2,3) is reachable AND opens to the right (side 1)
function checkSolved(grid: CellDef[][], vis: boolean[][]): boolean {
  return vis[2][3] && getConns(grid[2][3])[1];
}

// Puzzle initial state.
// Solution path: (1,0)→(1,1)→(2,1)→(2,2)→(2,3)
// Solution rotations: (1,0)=1, (1,1)=2, (2,1)=0, (2,2)=1, (2,3)=1
// Initial rotations offset so each path cell needs 1–2 clicks:
//   (1,0): 0→1 (1 click), (1,1): 1→2 (1 click), (2,1): 2→0 (2 clicks),
//   (2,2): 0→1 (1 click), (2,3): 0→1 (1 click)
const INIT: CellDef[][] = [
  [{ type: "CORNER",   rotation: 3 }, { type: "STRAIGHT", rotation: 1 }, { type: "CORNER",   rotation: 2 }, { type: "STRAIGHT", rotation: 0 }],
  [{ type: "STRAIGHT", rotation: 0 }, { type: "CORNER",   rotation: 1 }, { type: "CORNER",   rotation: 0 }, { type: "CORNER",   rotation: 2 }],
  [{ type: "CORNER",   rotation: 1 }, { type: "CORNER",   rotation: 2 }, { type: "STRAIGHT", rotation: 0 }, { type: "STRAIGHT", rotation: 0 }],
  [{ type: "STRAIGHT", rotation: 2 }, { type: "CORNER",   rotation: 0 }, { type: "STRAIGHT", rotation: 3 }, { type: "CORNER",   rotation: 1 }],
];

// Build SVG paths from base (unrotated) connections — CSS transform handles rotation visually
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

  // Cross
  return [`M 0,${HC} L ${SZ},${HC}`, `M ${HC},0 L ${HC},${SZ}`];
}

type CellProps = {
  cell: CellDef;
  active: boolean;
  onRotate: () => void;
};

function PipeCell({ cell, active, onRotate }: CellProps) {
  const paths = buildBasePaths(cell.type);
  const color = active ? "#4bb8ff" : "#3a3a52";
  const bg = active ? "rgba(75,184,255,0.07)" : "rgba(255,255,255,0.02)";

  return (
    <svg
      width={SZ}
      height={SZ}
      style={{ cursor: "pointer", display: "block" }}
      onClick={onRotate}
    >
      <rect width={SZ} height={SZ} fill={bg} rx={3} />
      <rect width={SZ} height={SZ} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
      <g
        style={{
          transformOrigin: `${HC}px ${HC}px`,
          transform: `rotate(${cell.rotation * 90}deg)`,
          transition: "transform 0.12s ease-out",
        }}
      >
        {paths.map((d, i) => (
          <path key={i} d={d} stroke={color} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {paths.length > 0 && <circle cx={HC} cy={HC} r={5} fill={color} />}
      </g>
    </svg>
  );
}

const rowTop = (r: number) => r * (SZ + GAP);
const GRID_H = ROWS * SZ + (ROWS - 1) * GAP;
const GRID_W = COLS * SZ + (COLS - 1) * GAP;

type Props = { onComplete: () => void };

export const PipeConnectionMinigame = ({ onComplete }: Props) => {
  const [grid, setGrid] = useState<CellDef[][]>(() =>
    INIT.map(row => row.map(c => ({ ...c })))
  );
  const [done, setDone] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const vis = floodFill(grid);
  const solved = checkSolved(grid, vis);

  // Use a ref-based callback so re-renders don't cancel the timeout via cleanup
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

  const srcColor = vis[1][0] ? "#4bb8ff" : "#252535";
  const drainColor = solved ? "#00e5a0" : vis[2][3] ? "#4bb8ff" : "#252535";

  return (
    <div className="vn-minigame-shell" onClick={e => e.stopPropagation()}>
      <div className={`vn-minigame-card vn-minigame-fallback vn-pipe-card${done ? " vn-pipe-solved" : ""}`}>
        <div className="vn-minigame-plate" aria-hidden="true">
          <span /><span /><span /><span />
        </div>

        <div className="vn-minigame-fallback-kicker">Unit 303</div>
        <div className="vn-minigame-fallback-title">Connect the Pipes</div>
        <div className="vn-minigame-fallback-copy">
          Click a pipe to rotate it. Connect the water source to the drain.
        </div>

        <div className="vn-pipe-layout">
          {/* Source stub */}
          <div className="vn-pipe-side" style={{ height: GRID_H }}>
            <span className="vn-pipe-side-label" style={{ top: rowTop(1) + HC - 20 }}>
              source
            </span>
            <div
              className="vn-pipe-stub vn-pipe-stub-left"
              style={{ top: rowTop(1) + HC - 4, background: srcColor, transition: "background 0.3s" }}
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
                <PipeCell
                  key={`${r}-${c}`}
                  cell={cell}
                  active={vis[r][c]}
                  onRotate={() => rotate(r, c)}
                />
              ))
            )}
          </div>

          {/* Drain stub */}
          <div className="vn-pipe-side" style={{ height: GRID_H }}>
            <span className="vn-pipe-side-label" style={{ top: rowTop(2) + HC - 20 }}>
              drain
            </span>
            <div
              className="vn-pipe-stub vn-pipe-stub-right"
              style={{ top: rowTop(2) + HC - 4, background: drainColor, transition: "background 0.3s" }}
            />
          </div>
        </div>

        {done && <div className="vn-pipe-success">Pipes connected.</div>}
      </div>
    </div>
  );
};
