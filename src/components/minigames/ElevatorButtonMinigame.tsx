type ElevatorButtonMinigameProps = {
  onComplete: () => void;
};

export const ElevatorButtonMinigame = ({ onComplete }: ElevatorButtonMinigameProps) => {
  return (
    <div className="vn-minigame-shell" onClick={(event) => event.stopPropagation()}>
      <div className="vn-minigame-card vn-minigame-fallback">
        <div className="vn-minigame-plate" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="vn-minigame-fallback-kicker">Lentera Apartments</div>
        <div className="vn-minigame-fallback-title">Lift Control</div>
        <div className="vn-minigame-fallback-copy">The old panel hums softly. Press the button for the 3rd floor.</div>

        <div className="vn-minigame-indicator-wrap">
          <div className="vn-minigame-indicator-label">Floor Request</div>
          <div className="vn-minigame-indicator">03</div>
        </div>

        <div className="vn-minigame-fallback-grid">
          <button className="vn-minigame-button" type="button">
            <span className="vn-minigame-button-face">1</span>
          </button>
          <button className="vn-minigame-button" type="button">
            <span className="vn-minigame-button-face">2</span>
          </button>
          <button className="vn-minigame-button vn-minigame-button-active" type="button" onClick={onComplete}>
            <span className="vn-minigame-button-face">3</span>
          </button>
          <button className="vn-minigame-button vn-minigame-button-small" type="button">
            <span className="vn-minigame-button-face">OPEN</span>
          </button>
          <button className="vn-minigame-button vn-minigame-button-small" type="button">
            <span className="vn-minigame-button-face">CLOSE</span>
          </button>
          <button className="vn-minigame-button vn-minigame-button-small" type="button">
            <span className="vn-minigame-button-face">ALARM</span>
          </button>
        </div>
      </div>
    </div>
  );
};
