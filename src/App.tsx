import { type CSSProperties, useDeferredValue, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ElevatorButtonMinigame } from "@/components/minigames/ElevatorButtonMinigame";
import { PipeConnectionMinigame } from "@/components/minigames/PipeConnectionMinigame";
import { CanvasSpritesheetRenderer } from "@/lib/rendering/canvasSpritesheetRenderer";
import { MainMenu } from "@/components/MainMenu";
import { characterBundleRegistry } from "@/character";
import { loadSpritesheetBundle } from "@/lib/rendering/loadSpritesheetBundle";
import { NovelAudioEngine } from "@/lib/runtime/audioEngine";
import { useNovelStore } from "@/store/novelStore";
import type { CharacterInstance } from "@/types/novel";
import type { LoadedSpritesheetBundle } from "@/types/spritesheet";

const TEXT_SPEED = 18;
const CHARACTER_TICK_FPS = 60;

type CharacterSpriteProps = {
  bundle: LoadedSpritesheetBundle;
  character: CharacterInstance;
  isDimmed: boolean;
};

const CharacterSprite = ({ bundle, character, isDimmed }: CharacterSpriteProps) => {
  const rendererRef = useRef<CanvasSpritesheetRenderer | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frame = useDeferredValue(character.frame);
  const [viewport, setViewport] = useState({ width: 520, height: 880 });

  useEffect(() => {
    rendererRef.current = new CanvasSpritesheetRenderer();
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

    renderer.resize(viewport.width, viewport.height);
    renderer.render({
      bundle,
      frame,
      viewportWidth: viewport.width,
      viewportHeight: viewport.height,
    });
  }, [bundle, frame, viewport.height, viewport.width]);

  if (!character.visible) return null;

  const spriteStyle = {
    left: `calc(${character.x * 100}% + ${character.xOffset * 100}%)`,
    bottom: `calc(${character.y}px - ${character.yOffset}px)`,
    opacity: character.opacity,
    transform: "translateX(-50%) scale(var(--vn-scale))",
    transformOrigin: "bottom center",
    animationDuration: "520ms",
    transition: `left ${character.moveDuration}ms ${character.moveEasing}, bottom ${character.moveDuration}ms ${character.moveEasing}, opacity 220ms ease`,
    "--vn-scale": String(character.scale),
    visibility: "visible" as const,
  } as CSSProperties;

  return (
    <div
      className={`vn-character vn-enter-${character.enterFrom} ${isDimmed ? "vn-character-dimmed" : ""} pointer-events-none absolute bottom-0 z-10 h-[92vh] w-[min(46vw,620px)] min-w-[300px] max-w-full overflow-hidden`}
      style={spriteStyle}
    >
      <canvas ref={canvasRef} className="h-full w-full" aria-label={character.displayName} />
    </div>
  );
};

const App = () => {
  const [phase, setPhase] = useState<"menu" | "story">("menu");
  const [bundlesReady, setBundlesReady] = useState(false);

  const bundles = useNovelStore((state) => state.bundles);
  const background = useNovelStore((state) => state.background);
  const parallaxLayers = useNovelStore((state) => state.parallaxLayers);
  const location = useNovelStore((state) => state.location);
  const speaker = useNovelStore((state) => state.speaker);
  const activeCharacterId = useNovelStore((state) => state.activeCharacterId);
  const sceneTransitionDuration = useNovelStore((state) => state.sceneTransitionDuration);
  const sceneTransitionToken = useNovelStore((state) => state.sceneTransitionToken);
  const pendingSceneContinuation = useNovelStore((state) => state.pendingSceneContinuation);
  const activeMinigame = useNovelStore((state) => state.activeMinigame);
  const line = useNovelStore((state) => state.line);
  const choices = useNovelStore((state) => state.choices);
  const statusMessage = useNovelStore((state) => state.statusMessage);
  const characters = useNovelStore((state) => state.characters);
  const registerBundle = useNovelStore((state) => state.registerBundle);
  const setStatusMessage = useNovelStore((state) => state.setStatusMessage);
  const startStory = useNovelStore((state) => state.startStory);
  const advance = useNovelStore((state) => state.advance);
  const choose = useNovelStore((state) => state.choose);
  const completeMinigame = useNovelStore((state) => state.completeMinigame);
  const tickCharacters = useNovelStore((state) => state.tickCharacters);

  const [revealedCount, setRevealedCount] = useState(0);
  const [sceneTransitionKey, setSceneTransitionKey] = useState(0);
  const [isSceneTransitioning, setIsSceneTransitioning] = useState(false);
  const audioRef = useRef<NovelAudioEngine | null>(null);
  const previousSceneTransitionTokenRef = useRef<number | null>(null);
  const suppressAdvanceOnceRef = useRef(false);
  const visibleLine = line.slice(0, revealedCount);
  const isTyping = revealedCount < line.length;
  const isNarration = speaker === null && choices.length === 0 && Boolean(line);

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
        setStatusMessage("Memuat bundle karakter...");
        const bundleEntries = Object.entries(characterBundleRegistry);

        const loadedBundles = await Promise.all(
          bundleEntries.map(async ([bundleId, bundlePath]) => {
            const bundle = await loadSpritesheetBundle(bundleId, bundlePath);
            return [bundleId, bundle] as const;
          }),
        );

        if (cancelled) return;

        for (const [bundleId, bundle] of loadedBundles) {
          registerBundle(bundleId, bundle);
        }

        setBundlesReady(true);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Gagal memuat visual novel.";
        setStatusMessage(message);
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [registerBundle, setStatusMessage]);

  useLayoutEffect(() => {
    if (previousSceneTransitionTokenRef.current === null) {
      previousSceneTransitionTokenRef.current = sceneTransitionToken;
      return;
    }

    if (previousSceneTransitionTokenRef.current !== sceneTransitionToken) {
      previousSceneTransitionTokenRef.current = sceneTransitionToken;
      setSceneTransitionKey((current) => current + 1);
      setIsSceneTransitioning(true);
    }
  }, [sceneTransitionToken]);

  useEffect(() => {
    if (!isSceneTransitioning) return;

    const timer = window.setTimeout(() => {
      setIsSceneTransitioning(false);
    }, sceneTransitionDuration);

    return () => window.clearTimeout(timer);
  }, [isSceneTransitioning, sceneTransitionDuration]);

  useEffect(() => {
    if (!pendingSceneContinuation || isSceneTransitioning) return;

    const timer = window.setTimeout(() => {
      advance();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [advance, isSceneTransitioning, pendingSceneContinuation]);

  useLayoutEffect(() => {
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
      if (time - lastTick >= 1000 / CHARACTER_TICK_FPS) {
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
      if (suppressAdvanceOnceRef.current || isSceneTransitioning) {
        suppressAdvanceOnceRef.current = false;
        return;
      }

      if (activeMinigame) return;
      if (choices.length > 0) return;

      if (isTyping) {
        setRevealedCount(line.length);
        return;
      }

      advance();
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key !== " " && event.key !== "Enter") return;
      if (activeMinigame) return;
      event.preventDefault();
      handleAdvance();
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [activeMinigame, advance, choices.length, isSceneTransitioning, isTyping, line.length]);

  const handleStartStory = () => {
    startStory();
    setPhase("story");
  };

  const bundleList = Object.values(bundles);
  const renderCharacters = Object.values(characters)
    .filter((character) => character.visible)
    .sort((left, right) => left.y - right.y);

  return (
    <>
      {phase === "menu" && (
        <MainMenu onStart={handleStartStory} isReady={bundlesReady} />
      )}
      <main
        className="vn-root"
        style={{ visibility: phase === "story" ? "visible" : "hidden", backgroundImage: background }}
        onClick={() => {
          if (suppressAdvanceOnceRef.current || isSceneTransitioning) {
            suppressAdvanceOnceRef.current = false;
            return;
          }
          if (activeMinigame) return;
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
          {parallaxLayers.map((layer, i) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                transform: `translate(${(layer.xOffset ?? 0) * 100}%, ${(layer.yOffset ?? 0) * 100}%)`,
                pointerEvents: "none",
              }}
            >
              <div
                className="vn-parallax-layer"
                style={{
                  backgroundImage: `url(${layer.url})`,
                  opacity: layer.opacity ?? 1,
                  animationName: layer.direction === "rtl" ? "vn-parallax-rtl" : "vn-parallax-ltr",
                  animationDuration: `${layer.speed ?? 20}s`,
                }}
              />
            </div>
          ))}
          {sceneTransitionKey > 0 ? (
            <div
              key={sceneTransitionKey}
              className="vn-scene-transition"
              style={{ animationDuration: `${sceneTransitionDuration}ms` }}
            />
          ) : null}

          {!isSceneTransitioning &&
            renderCharacters.map((character) => {
              const bundle = bundles[character.bundleId];
              if (!bundle) return null;
              const isDimmed = activeCharacterId !== null && activeCharacterId !== character.characterId;
              return (
                <CharacterSprite
                  key={`${character.id}-${character.entryVersion}`}
                  bundle={bundle}
                  character={character}
                  isDimmed={isDimmed}
                />
              );
            })}

          <div className="vn-caption">
            <div className="vn-location">{location || " "}</div>
          </div>
        </div>

        {activeMinigame ? null : isNarration ? (
          <div className={`vn-narrator-shell ${isSceneTransitioning ? "vn-dialogue-hidden" : ""}`}>
            <div className="vn-narrator-box">
              <div className="vn-narrator-line">{visibleLine}</div>
              <div className="vn-narrator-hint">{isTyping ? "Klik untuk selesaikan teks" : "Klik / Space / Enter untuk lanjut"}</div>
            </div>
          </div>
        ) : (
          <div className={`vn-dialogue-shell ${isSceneTransitioning ? "vn-dialogue-hidden" : ""}`}>
            <div className="vn-dialogue-box">
              {speaker ? <div className="vn-speaker">{speaker}</div> : null}
              <div className="vn-line">{line ? visibleLine : ""}</div>

              {choices.length > 0 ? (
                <div className="vn-choices" onClick={(event) => event.stopPropagation()}>
                  {choices.map((choice) => (
                    <button
                      key={choice.id}
                      className="vn-choice"
                      type="button"
                      onClick={() => {
                        suppressAdvanceOnceRef.current = true;
                        choose(choice.next);
                      }}
                    >
                      {choice.label}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="vn-dialogue-bar">
                  <div className="vn-controls" aria-hidden="true">
                    <span className="vn-control">Log</span>
                    <span className="vn-control">Auto</span>
                    <span className="vn-control">Skip</span>
                    <span className="vn-control">Save</span>
                    <span className="vn-control">Load</span>
                    <span className="vn-control">Config</span>
                    <span className="vn-control">Quit</span>
                  </div>
                  <div className="vn-hint">{isTyping ? "Klik untuk selesaikan teks" : "Klik / Space / Enter untuk lanjut"}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeMinigame?.id === "elevator-button" ? (
          <ElevatorButtonMinigame onComplete={completeMinigame} />
        ) : activeMinigame?.id === "pipe-connection" ? (
          <PipeConnectionMinigame onComplete={completeMinigame} />
        ) : null}

        {bundleList.length === 0 ? (
          <div className="vn-loading">
            <div className="vn-loading-card">
              <p className="vn-loading-label">Loading</p>
              <p className="vn-loading-text">{statusMessage}</p>
            </div>
          </div>
        ) : null}
      </main>
    </>
  );
};

export default App;
