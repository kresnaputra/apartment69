type SoundEffectPlaybackOptions = {
  volume?: number;
  playbackRate?: number;
  loop?: boolean;
};

export class SoundEffects {
  private activeAudios = new Set<HTMLAudioElement>();
  private blockedAudios = new Set<HTMLAudioElement>();
  private masterVolume = 1;

  play(src: string, options: SoundEffectPlaybackOptions = {}) {
    const audio = new Audio(src);
    const baseVolume = Math.max(0, Math.min(1, options.volume ?? 1));
    audio.preload = "auto";
    audio.loop = options.loop ?? false;
    audio.playbackRate = options.playbackRate ?? 1;
    audio.dataset.sfxVolume = String(baseVolume);
    audio.volume = Math.max(0, Math.min(1, baseVolume * this.masterVolume));

    const cleanup = () => {
      audio.pause();
      audio.src = "";
      audio.load();
      this.activeAudios.delete(audio);
      this.blockedAudios.delete(audio);
      audio.removeEventListener("ended", cleanup);
      audio.removeEventListener("error", cleanup);
    };

    audio.addEventListener("ended", cleanup, { once: true });
    audio.addEventListener("error", cleanup, { once: true });

    this.activeAudios.add(audio);

    void audio.play().catch(() => {
      // Browser autoplay policy can reject until the user interacts.
      this.blockedAudios.add(audio);
    });

    return audio;
  }

  resumeAfterUnlock() {
    for (const audio of this.blockedAudios) {
      if (audio.paused) {
        void audio.play()
          .then(() => {
            this.blockedAudios.delete(audio);
          })
          .catch(() => {});
      } else {
        this.blockedAudios.delete(audio);
      }
    }
  }

  setMasterVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    for (const audio of this.activeAudios) {
      const perSoundVolume = Number(audio.dataset.sfxVolume ?? "1");
      audio.volume = Math.max(0, Math.min(1, perSoundVolume * this.masterVolume));
    }
  }

  stopAll() {
    for (const audio of [...this.activeAudios]) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = "";
      audio.load();
      this.activeAudios.delete(audio);
      this.blockedAudios.delete(audio);
    }
  }

  dispose() {
    this.stopAll();
  }
}

export const sharedSoundEffects = new SoundEffects();

export const playSfx = (src: string, options?: SoundEffectPlaybackOptions) => {
  return sharedSoundEffects.play(src, options);
};
