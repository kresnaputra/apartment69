import { useState } from "react";

const cables = [
  { id: "power", name: "Daya", color: "#e8b86c", port: "Sumber daya" },
  { id: "network", name: "Jaringan", color: "#78a9c2", port: "Jaringan" },
  { id: "display", name: "Layar", color: "#d99591", port: "Layar" },
] as const;

type CableId = (typeof cables)[number]["id"];

export const CableMatchingMinigame = ({ onComplete }: { onComplete: () => void }) => {
  const [selected, setSelected] = useState<CableId | null>(null);
  const [connected, setConnected] = useState<CableId[]>([]);
  const [mistake, setMistake] = useState(false);

  const connect = (port: CableId, cable: CableId | null = selected) => {
    if (!cable || connected.includes(port)) return;
    if (cable !== port) {
      setMistake(true);
      return;
    }
    setConnected((previous) => [...previous, port]);
    setSelected(null);
    setMistake(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(12, 15, 20, .88)" }} onClick={(event) => event.stopPropagation()}>
      <div className="w-full max-w-xl rounded-xl p-5 sm:p-8" style={{ background: "#222831", color: "#f4ede2", boxShadow: "0 25px 70px #0009", fontFamily: "Georgia, serif" }}>
        <p className="text-xs tracking-[.3em] uppercase" style={{ color: "#e8b86c" }}>Ruang Kerja Sarah</p>
        <h2 className="mt-2 text-3xl">Sambungkan Kabel</h2>
        <p className="mt-2 text-sm" style={{ color: "#bcb8b0" }}>Pilih atau seret kabel ke port yang sesuai.</p>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-6">
          <div className="space-y-3">
            <p className="text-sm">Kabel</p>
            {cables.map((cable) => (
              <button key={cable.id} type="button" draggable={!connected.includes(cable.id)}
                onDragStart={(event) => event.dataTransfer.setData("text/plain", cable.id)}
                onClick={() => { setSelected(cable.id); setMistake(false); }}
                disabled={connected.includes(cable.id)}
                aria-pressed={selected === cable.id}
                className="block w-full rounded-lg border p-3 text-left text-sm disabled:opacity-40"
                style={{ borderColor: selected === cable.id ? cable.color : "#555b60", background: selected === cable.id ? "#363d43" : "#2b323a" }}>
                <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: cable.color }} />{cable.name}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            <p className="text-sm">Port</p>
            {cables.map((cable) => (
              <button key={cable.id} type="button"
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => { event.preventDefault(); connect(cable.id, event.dataTransfer.getData("text/plain") as CableId); }}
                onClick={() => connect(cable.id)}
                disabled={connected.includes(cable.id)}
                className="block w-full rounded-lg border p-3 text-left text-sm disabled:opacity-70"
                style={{ borderColor: connected.includes(cable.id) ? cable.color : "#555b60", background: "#2b323a" }}>
                {connected.includes(cable.id) ? "[OK] " : "[ ] "}{cable.port}
              </button>
            ))}
          </div>
        </div>
        <p role="status" className="mt-5 min-h-6 text-sm" style={{ color: mistake ? "#e8a39c" : "#e8b86c" }}>
          {mistake ? "Port tidak cocok. Coba kabel lain." : connected.length === cables.length ? "Semua kabel tersambung." : `${connected.length} dari ${cables.length} kabel tersambung.`}
        </p>
        {connected.length === cables.length && (
          <button type="button" onClick={onComplete} className="mt-3 w-full rounded-lg p-3 font-semibold" style={{ background: "#e8b86c", color: "#222831" }}>
            Selesai
          </button>
        )}
      </div>
    </div>
  );
};
