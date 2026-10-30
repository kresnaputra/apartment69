import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

type CableId = "power" | "network" | "display";
type Point = { x: number; y: number };

const cables: Array<{ id: CableId; name: string; color: string; shade: string }> = [
  { id: "power", name: "Daya", color: "#e8b86c", shade: "#a87a33" },
  { id: "network", name: "Jaringan", color: "#78a9c2", shade: "#457189" },
  { id: "display", name: "Layar", color: "#d99591", shade: "#9c5c58" },
];

// Ports sit in a different order than the plugs so the wires have to cross.
const portOrder: CableId[] = ["display", "power", "network"];

// Everything is drawn in one SVG with this coordinate space; it scales with the dialog.
const VIEW_W = 400;
const VIEW_H = 260;
const ROW_Y = [62, 130, 198];
const PLUG_REST_X = 150;
const SOCKET_X = 272;
const PLUG_SEATED_X = SOCKET_X - 4;
const DROP_RADIUS = 42;
const TAP_DISTANCE = 5;

const cableById = (id: CableId) => cables.find((cable) => cable.id === id)!;
const plugRestPoint = (id: CableId): Point => ({ x: PLUG_REST_X, y: ROW_Y[cables.findIndex((cable) => cable.id === id)] });
const socketPoint = (id: CableId): Point => ({ x: SOCKET_X, y: ROW_Y[portOrder.indexOf(id)] });

const wirePath = (sourceY: number, tip: Point) => {
  const endX = tip.x - 58;
  const sag = 18 + Math.abs(tip.y - sourceY) * 0.15;
  return `M -12 ${sourceY} C ${endX * 0.45} ${sourceY + sag}, ${endX - 40} ${tip.y}, ${endX} ${tip.y}`;
};

const icons: Record<CableId, string> = {
  power: "M13 2 4 14h7l-1 8 9-12h-7l1-8z",
  network: "M4 9a12 12 0 0 1 16 0M7 12.5a7 7 0 0 1 10 0M10 16a2.5 2.5 0 0 1 4 0M12 19.5h.01",
  display: "M3 4h18v12H3zM8 20h8M12 16v4",
};

const PlugTip = ({ id }: { id: CableId }) => {
  if (id === "power") {
    return (
      <>
        <rect x={-12} y={-8} width={13} height={4} rx={1} fill="#d4d8dd" />
        <rect x={-12} y={4} width={13} height={4} rx={1} fill="#d4d8dd" />
      </>
    );
  }
  if (id === "network") {
    return (
      <>
        <rect x={-12} y={-9} width={12} height={18} rx={1.5} fill="rgba(215,228,240,.5)" stroke="#e1e8ef" strokeWidth={1} />
        {[-5, -2, 1, 4].map((y) => <line key={y} x1={-4} x2={-1} y1={y} y2={y} stroke="#e7c065" strokeWidth={1.2} />)}
      </>
    );
  }
  return (
    <>
      <path d="M-12 -9 H0 V4 L-3 9 H-9 L-12 4 Z" fill="#d4d8dd" />
      <path d="M-10 -6 H-2 V3 L-4 6 H-8 L-10 3 Z" fill="#7d858e" />
    </>
  );
};

const Plug = ({ id, tip, lifted }: { id: CableId; tip: Point; lifted: boolean }) => {
  const cable = cableById(id);
  return (
    <g transform={`translate(${tip.x} ${tip.y})`}>
      <g style={{ transform: lifted ? "scale(1.08)" : "none", transition: "transform 120ms" }}>
      {lifted && <rect x={-62} y={-17} width={66} height={34} rx={9} fill="none" stroke={cable.color} strokeOpacity={0.6} strokeWidth={2} />}
      <rect x={-58} y={-6} width={14} height={12} rx={3} fill={cable.shade} />
      <rect x={-46} y={-12} width={35} height={24} rx={5} fill={cable.color} />
      <rect x={-46} y={-12} width={35} height={9} rx={5} fill="#fff" fillOpacity={0.18} />
      {[-38, -33, -28].map((x) => <line key={x} x1={x} x2={x} y1={-6} y2={6} stroke={cable.shade} strokeWidth={1.5} strokeLinecap="round" />)}
      <PlugTip id={id} />
      </g>
    </g>
  );
};

const SocketHole = ({ id }: { id: CableId }) => {
  if (id === "power") {
    return (
      <>
        <rect x={-13} y={-14} width={26} height={28} rx={6} fill="#0b0e12" />
        <rect x={-5} y={-8} width={10} height={4} rx={1} fill="#000" />
        <rect x={-5} y={4} width={10} height={4} rx={1} fill="#000" />
      </>
    );
  }
  if (id === "network") {
    return <path d="M-12 -11 H12 V7 H5 V11 H-5 V7 H-12 Z" fill="#0b0e12" />;
  }
  return <path d="M-14 -7 H14 V2 L9 8 H-9 L-14 2 Z" fill="#0b0e12" />;
};

export const CableMatchingMinigame = ({ onComplete }: { onComplete: () => void }) => {
  const [connected, setConnected] = useState<CableId[]>([]);
  const [selected, setSelected] = useState<CableId | null>(null);
  const [drag, setDrag] = useState<{ id: CableId; pointer: Point } | null>(null);
  const [mistake, setMistake] = useState<{ port: CableId; count: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragStartRef = useRef<Point | null>(null);

  const done = connected.length === cables.length;

  const toViewPoint = (clientX: number, clientY: number): Point => {
    const matrix = svgRef.current?.getScreenCTM();
    if (!matrix) return { x: 0, y: 0 };
    const point = new DOMPoint(clientX, clientY).matrixTransform(matrix.inverse());
    return { x: point.x, y: point.y };
  };

  const portNear = (point: Point) => {
    let best: CableId | null = null;
    let bestDistance = DROP_RADIUS;
    for (const id of portOrder) {
      if (connected.includes(id)) continue;
      const socket = socketPoint(id);
      const distance = Math.hypot(point.x - socket.x, point.y - socket.y);
      if (distance < bestDistance) {
        best = id;
        bestDistance = distance;
      }
    }
    return best;
  };

  const connect = (port: CableId, cable: CableId | null) => {
    if (!cable || connected.includes(port) || connected.includes(cable)) return;
    if (cable !== port) {
      setMistake((previous) => ({ port, count: (previous?.count ?? 0) + 1 }));
      return;
    }
    setConnected((previous) => [...previous, port]);
    setSelected(null);
    setMistake(null);
  };

  const startDrag = (id: CableId) => (event: ReactPointerEvent<SVGGElement>) => {
    if (connected.includes(id) || done) return;
    svgRef.current?.setPointerCapture(event.pointerId);
    const point = toViewPoint(event.clientX, event.clientY);
    dragStartRef.current = point;
    setMistake(null);
    setDrag({ id, pointer: point });
  };

  const moveDrag = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!drag) return;
    setDrag({ id: drag.id, pointer: toViewPoint(event.clientX, event.clientY) });
  };

  const endDrag = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!drag) return;
    const point = toViewPoint(event.clientX, event.clientY);
    const start = dragStartRef.current;
    if (start && Math.hypot(point.x - start.x, point.y - start.y) < TAP_DISTANCE) {
      // Tap: pick the plug up, then tap a socket.
      setSelected((current) => (current === drag.id ? null : drag.id));
    } else {
      const port = portNear({ x: point.x + 4, y: point.y });
      if (port) connect(port, drag.id);
    }
    setDrag(null);
    dragStartRef.current = null;
  };

  const cancelDrag = () => {
    setDrag(null);
    dragStartRef.current = null;
  };

  const hoverPort = drag ? portNear({ x: drag.pointer.x + 4, y: drag.pointer.y }) : null;

  const plugTip = (id: CableId): Point => {
    if (connected.includes(id)) return { x: PLUG_SEATED_X, y: socketPoint(id).y };
    if (drag?.id === id) return { x: drag.pointer.x + 4, y: drag.pointer.y };
    return plugRestPoint(id);
  };

  // Draw the plug being moved last so it stays on top.
  const plugDrawOrder = [...cables.map((cable) => cable.id)].sort((a, b) => Number(a === drag?.id) - Number(b === drag?.id));

  const statusText = mistake
    ? "Port tidak cocok."
    : done
      ? "Semua kabel tersambung."
      : `${connected.length} dari ${cables.length} kabel tersambung.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(12, 15, 20, .88)" }} onClick={(event) => event.stopPropagation()}>
      <div
        className="w-full max-w-xl rounded-2xl p-4 sm:p-6"
        style={{
          background: "linear-gradient(180deg, #252b33, #1c2128)",
          color: "#f4ede2",
          boxShadow: done ? "0 25px 70px #0009, 0 0 50px rgba(232, 184, 108, .18)" : "0 25px 70px #0009",
          fontFamily: "Georgia, serif",
          transition: "box-shadow .6s ease",
        }}
      >
        <div className="flex items-center justify-between gap-3 px-1">
          <div className="flex gap-2" aria-hidden>
            {cables.map((cable) => {
              const on = connected.includes(cable.id);
              return (
                <span
                  key={cable.id}
                  className="h-2.5 w-2.5 rounded-full transition-all duration-300"
                  style={{ background: on ? cable.color : "#3a4149", boxShadow: on ? `0 0 10px ${cable.color}` : "none" }}
                />
              );
            })}
          </div>
        </div>

        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="mt-4 block w-full select-none rounded-xl"
          style={{ background: "radial-gradient(ellipse at 30% 40%, #232a33, #14181e)", touchAction: "none" }}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={cancelDrag}
          role="group"
          aria-label="Papan kabel"
        >
          <defs>
            <linearGradient id="cable-plate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3b434c" />
              <stop offset="1" stopColor="#272d34" />
            </linearGradient>
            <filter id="cable-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* device back panel */}
          <rect x={232} y={16} width={154} height={228} rx={14} fill="url(#cable-plate)" stroke="#4d565f" />
          {[[244, 28], [374, 28], [244, 232], [374, 232]].map(([cx, cy]) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r={4} fill="#1d2228" stroke="#59626c" />
              <line x1={cx - 2.5} x2={cx + 2.5} y1={cy} y2={cy} stroke="#59626c" />
            </g>
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={286 + i * 10} y={226} width={4} height={12} rx={2} fill="#1d2228" />
          ))}

          {portOrder.map((id) => {
            const cable = cableById(id);
            const socket = socketPoint(id);
            const on = connected.includes(id);
            const isHover = hoverPort === id;
            const isMistake = mistake?.port === id;
            return (
              <g key={isMistake ? `${id}-${mistake.count}` : id}>
                <g
                  style={{
                    transformBox: "fill-box",
                    animation: isMistake ? "vn-cable-shake 0.35s ease-in-out" : undefined,
                  }}
                >
                  <g transform={`translate(${socket.x} ${socket.y})`}>
                    <rect x={-20} y={-20} width={40} height={40} rx={9} fill="#1d2228"
                      stroke={isMistake ? "#e8776c" : cable.color}
                      strokeOpacity={isMistake || isHover || on ? 1 : 0.45}
                      strokeWidth={isHover ? 2.5 : 1.5} />
                    <SocketHole id={id} />
                  </g>
                  <g transform={`translate(${socket.x + 32} ${socket.y - 9}) scale(0.75)`} fill="none" stroke={on ? cable.color : "#69727c"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d={icons[id]} />
                  </g>
                </g>
                {on && <circle cx={socket.x + 90} cy={socket.y} r={6} fill={cable.color} filter="url(#cable-glow)" />}
                <circle cx={socket.x + 90} cy={socket.y} r={4} fill={on ? cable.color : "#14181d"} stroke="#59626c" strokeWidth={on ? 0 : 1} />
                {/* tap target for the tap-plug-then-socket flow */}
                <rect
                  x={socket.x - 26} y={socket.y - 26} width={52} height={52} fill="transparent"
                  className="vn-cable-target" role="button" tabIndex={on ? -1 : 0} aria-label={`Port ${cable.name}`}
                  style={{ cursor: selected && !on ? "pointer" : "default" }}
                  onClick={() => connect(id, selected)}
                  onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); connect(id, selected); } }}
                />
              </g>
            );
          })}

          {cables.map((cable) => (
            <g key={cable.id} pointerEvents="none">
              <path d={wirePath(plugRestPoint(cable.id).y, plugTip(cable.id))} stroke="#000" strokeOpacity={0.45} strokeWidth={11} fill="none" strokeLinecap="round" />
              <path d={wirePath(plugRestPoint(cable.id).y, plugTip(cable.id))} stroke={cable.shade} strokeWidth={8} fill="none" strokeLinecap="round" />
              <path d={wirePath(plugRestPoint(cable.id).y, plugTip(cable.id))} stroke={cable.color} strokeWidth={4} fill="none" strokeLinecap="round" transform="translate(0 -1.2)" />
            </g>
          ))}

          {plugDrawOrder.map((id) => {
            const on = connected.includes(id);
            const cable = cableById(id);
            const tip = plugTip(id);
            return (
              <g
                key={id}
                className="vn-cable-target"
                role="button"
                tabIndex={on ? -1 : 0}
                aria-label={`Kabel ${cable.name}`}
                aria-pressed={selected === id}
                style={{ cursor: on ? "default" : drag?.id === id ? "grabbing" : "grab" }}
                onPointerDown={startDrag(id)}
                onKeyDown={(event) => {
                  if (on || (event.key !== "Enter" && event.key !== " ")) return;
                  event.preventDefault();
                  setSelected((current) => (current === id ? null : id));
                }}
              >
                {/* larger invisible grab area */}
                {!on && <rect x={tip.x - 66} y={tip.y - 22} width={74} height={44} fill="transparent" />}
                <Plug id={id} tip={tip} lifted={selected === id || drag?.id === id} />
              </g>
            );
          })}
        </svg>

        <p role="status" className="sr-only">{statusText}</p>

        <div className="mt-4 flex min-h-12 items-center justify-center">
          {done ? (
            <button
              type="button"
              onClick={onComplete}
              className="w-full rounded-lg p-3 font-semibold"
              style={{ background: "#e8b86c", color: "#222831", animation: "vn-pipe-pop 0.4s ease-out both" }}
            >
              Selesai
            </button>
          ) : (
            <p className="text-xs sm:text-sm" style={{ color: mistake ? "#e8a39c" : "#8d939a" }} aria-hidden>
              {mistake ? "Port tidak cocok" : "Seret kabel ke port yang cocok"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
