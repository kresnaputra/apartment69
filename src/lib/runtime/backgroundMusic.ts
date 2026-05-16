const FADE_OUT_MS = 400;
const FADE_IN_MS = 500;
const FADE_STEP_MS = 32;

export class BackgroundMusic {
  private audio: HTMLAudioElement | null = null;
  private currentTrack: string | null = null;
  private pendingSrc: string | null = null;
  private targetVolume = 0.5;
  private fadeTimer: number | null = null;
  private transitionToken = 0;

  play(src: string, volume: number = 0.5) {
    this.targetVolume = this.clampVolume(volume);

    // If same track is already playing, don't restart. Just sync the volume.
    if (this.currentTrack === src && this.audio) {
      this.pendingSrc = src;
      this.fadeTo(this.audio, this.targetVolume, FADE_IN_MS);
      return;
    }

    this.pendingSrc = src;
    this.transitionToken += 1;
    const token = this.transitionToken;

    const startNextTrack = () => {
      if (token !== this.transitionToken) return;

      const nextAudio = new Audio(src);
      nextAudio.loop = true;
      nextAudio.volume = 0;
      nextAudio.preload = "auto";

      this.audio = nextAudio;
      this.currentTrack = src;

      void nextAudio.play()
        .then(() => {
          if (token !== this.transitionToken) {
            nextAudio.pause();
            nextAudio.currentTime = 0;
            nextAudio.src = "";
            nextAudio.load();
            return;
          }
          this.fadeTo(nextAudio, this.targetVolume, FADE_IN_MS);
        })
        .catch(() => {
          // Browser autoplay policy can reject until the user interacts.
          // pendingSrc is kept so resumeAfterUnlock() can retry.
        });
    };

    const currentAudio = this.audio;
    if (currentAudio) {
      this.fadeTo(currentAudio, 0, FADE_OUT_MS, () => {
        if (this.audio === currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
          currentAudio.src = "";
          currentAudio.load();
          this.audio = null;
          this.currentTrack = null;
        }
        startNextTrack();
      });
      return;
    }

    startNextTrack();
  }

  /**
   * Called after the user has interacted with the page and audio is unlocked.
   * Retries playback if a track was queued but blocked by autoplay policy.
   */
  resumeAfterUnlock() {
    const audio = this.audio;
    if (this.pendingSrc && audio && audio.paused) {
      void audio.play()
        .then(() => {
          this.fadeTo(audio, this.targetVolume, FADE_IN_MS);
        })
        .catch(() => {});
    }
  }

  stop() {
    this.transitionToken += 1;
    this.clearFadeTimer();
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio.src = "";
      this.audio.load();
      this.audio = null;
      this.currentTrack = null;
    }
    this.pendingSrc = null;
  }

  pause() {
    this.clearFadeTimer();
    if (this.audio) {
      this.audio.pause();
    }
  }

  resume() {
    const audio = this.audio;
    if (audio) {
      void audio.play()
        .then(() => {
          this.fadeTo(audio, this.targetVolume, FADE_IN_MS);
        })
        .catch(() => {
          // Browser autoplay policy can reject
        });
    }
  }

  setVolume(volume: number) {
    this.targetVolume = this.clampVolume(volume);
    if (this.audio) {
      this.fadeTo(this.audio, this.targetVolume, 180);
    }
  }

  dispose() {
    this.stop();
  }

  private fadeTo(audio: HTMLAudioElement, targetVolume: number, durationMs: number, onComplete?: () => void) {
    this.clearFadeTimer();

    const safeTarget = this.clampVolume(targetVolume);
    if (durationMs <= 0) {
      audio.volume = safeTarget;
      onComplete?.();
      return;
    }

    const startVolume = audio.volume;
    const delta = safeTarget - startVolume;
    if (Math.abs(delta) < 0.001) {
      audio.volume = safeTarget;
      onComplete?.();
      return;
    }

    const steps = Math.max(1, Math.round(durationMs / FADE_STEP_MS));
    let step = 0;

    this.fadeTimer = window.setInterval(() => {
      step += 1;
      const progress = Math.min(1, step / steps);
      audio.volume = this.clampVolume(startVolume + delta * progress);

      if (progress >= 1) {
        this.clearFadeTimer();
        onComplete?.();
      }
    }, FADE_STEP_MS);
  }

  private clearFadeTimer() {
    if (this.fadeTimer !== null) {
      window.clearInterval(this.fadeTimer);
      this.fadeTimer = null;
    }
  }

  private clampVolume(volume: number) {
    return Math.max(0, Math.min(1, volume));
  }
}
