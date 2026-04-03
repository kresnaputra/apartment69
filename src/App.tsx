import { useDeferredValue, useEffect, useRef, useState } from "react";
import { CanvasSbnRenderer } from "@/lib/rendering/canvasSbnRenderer";
import { loadSbnBundle } from "@/lib/sbn/loadSbnBundle";
import { fitCameraToScene } from "@/lib/sbn/sampling";
import { NovelAudioEngine } from "@/lib/runtime/audioEngine";
import { useNovelStore } from "@/store/novelStore";
import type { CharacterInstance } from "@/types/novel";
import type { LoadedSbnBundle } from "@/types/sbn";

const DEMO_BUNDLE_PATH = "/demo/PLAYER.sbn";
const TEXT_SPEED = 18;

type CharacterSpriteProps = {
  bundle: LoadedSbnBundle;
  character: CharacterInstance;
};

const CharacterSprite = ({ bundle, character }: CharacterSpriteProps) => {
  const rendererRef = useRef<CanvasSbnRenderer | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frame = useDeferredValue(character.frame);
  const [viewport, setViewport] = useState({ width: 520, height: 880 });

  useEffect(() => {
    rendererRef.current = new CanvasSbnRenderer();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = rendererRef.current;
    if (!canvas || !renderer) return;

    renderer.attach(canvas);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setViewport({
        width: Math.max(1, Math.round(entry.contentRect.width)),
        height: Math.max(1, Math.round(entry.contentRect.height)),
      });
    });

    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;

    const camera = fitCameraToScene(bundle.project, viewport.width, viewport.height);
    renderer.resize(viewport.width, viewport.height);
    void renderer.render({
      project: bundle.project,
      frame,
      scale: 1,
      camera,
      viewportWidth: viewport.width,
      viewportHeight: viewport.height,
    });
  }, [bundle, frame, viewport.height, viewport.width]);

  if (!character.visible) return null;

  return (
    <div
      className="pointer-events-none absolute bottom-0 z-10 h-[82vh] w-[min(42vw,560px)] min-w-[280px] max-w-full"
      style={{
        left: `${character.x * 100}%`,
        bottom: `${character.y}px`,
        opacity: character.opacity,
        transform: `translateX(-50%) scale(${character.scale})`,
        transformOrigin: "bottom center",
      }}
    >
      <canvas ref={canvasRef} className="h-full w-full" aria-label={character.displayName} />
    </div>
  );
};

const App = () => {
  const bundles = useNovelStore((state) => state.bundles);
  const background = useNovelStore((state) => state.background);
  const location = useNovelStore((state) => state.location);
  const speaker = useNovelStore((state) => state.speaker);
  const line = useNovelStore((state) => state.line);
  const choices = useNovelStore((state) => state.choices);
  const statusMessage = useNovelStore((state) => state.statusMessage);
  const characters = useNovelStore((state) => state.characters);
  const registerBundle = useNovelStore((state) => state.registerBundle);
  const setStatusMessage = useNovelStore((state) => state.setStatusMessage);
  const startStory = useNovelStore((state) => state.startStory);
  const advance = useNovelStore((state) => state.advance);
  const choose = useNovelStore((state) => state.choose);
  const tickCharacters = useNovelStore((state) => state.tickCharacters);

  const [revealedCount, setRevealedCount] = useState(0);
  const audioRef = useRef<NovelAudioEngine | null>(null);
  const visibleLine = line.slice(0, revealedCount);
  const isTyping = revealedCount < line.length;

  useEffect(() => {
    audioRef.current = new NovelAudioEngine();
    return () => {
      audioRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setStatusMessage("Memuat karakter utama...");
        const response = await fetch(DEMO_BUNDLE_PATH);
        if (!response.ok) {
          throw new Error("Bundle karakter utama tidak ditemukan.");
        }

        const blob = await response.blob();
        const bundle = await loadSbnBundle(blob, "PLAYER.sbn");
        if (cancelled) return;

        registerBundle("player", bundle);
        audioRef.current?.load(bundle.project);
        startStory();
      } catch (error) {
        const message = error instanceof Error ? error.message : "Gagal memuat visual novel.";
        setStatusMessage(message);
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [registerBundle, setStatusMessage, startStory]);

  useEffect(() => {
    setRevealedCount(0);
  }, [line]);

  useEffect(() => {
    if (!line) return;

    const timer = window.setInterval(() => {
      setRevealedCount((current) => {
        if (current >= line.length) {
          window.clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, TEXT_SPEED);

    return () => window.clearInterval(timer);
  }, [line]);

  useEffect(() => {
    let animationFrame = 0;
    let lastTick = performance.now();

    const loop = (time: number) => {
      if (time - lastTick >= 1000 / 24) {
        tickCharacters();
        lastTick = time;
      }

      animationFrame = window.requestAnimationFrame(loop);
    };

    animationFrame = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [tickCharacters]);

  useEffect(() => {
    const handleAdvance = () => {
      if (choices.length > 0) return;

      if (isTyping) {
        setRevealedCount(line.length);
        return;
      }

      advance();
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key !== " " && event.key !== "Enter") return;
      event.preventDefault();
      handleAdvance();
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [advance, choices.length, isTyping, line.length]);

  const bundleList = Object.values(bundles);
  const renderCharacters = Object.values(characters)
    .filter((character) => character.visible)
    .sort((left, right) => left.y - right.y);

  return (
    <main
      className="vn-root"
      style={{
        backgroundImage: background,
      }}
      onClick={() => {
        if (choices.length > 0) return;
        if (isTyping) {
          setRevealedCount(line.length);
          return;
        }
        advance();
      }}
    >
      <div className="vn-vignette" />
      <div className="vn-stage">
        <div className="vn-lighting" />

        {renderCharacters.map((character) => {
          const bundle = bundles[character.bundleId];
          if (!bundle) return null;
          return <CharacterSprite key={character.id} bundle={bundle} character={character} />;
        })}

        <div className="vn-caption">
          <div className="vn-location">{location || " "}</div>
        </div>
      </div>

      <div className="vn-dialogue-shell">
        <div className="vn-dialogue-box">
          {speaker ? <div className="vn-speaker">{speaker}</div> : null}
          <div className="vn-line">{visibleLine || statusMessage}</div>

          {choices.length > 0 ? (
            <div className="vn-choices" onClick={(event) => event.stopPropagation()}>
              {choices.map((choice) => (
                <button
                  key={choice.id}
                  className="vn-choice"
                  type="button"
                  onClick={() => choose(choice.next)}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="vn-hint">{isTyping ? "Klik untuk selesaikan teks" : "Klik / Space / Enter untuk lanjut"}</div>
          )}
        </div>
      </div>

      {bundleList.length === 0 ? (
        <div className="vn-loading">
          <div className="vn-loading-card">
            <p className="vn-loading-label">Loading</p>
            <p className="vn-loading-text">{statusMessage}</p>
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default App;
