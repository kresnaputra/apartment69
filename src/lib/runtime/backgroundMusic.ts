export class BackgroundMusic {
  private audio: HTMLAudioElement | null = null;
  private currentTrack: string | null = null;

  play(src: string, volume: number = 0.5) {
    // If same track is already playing, don't restart
    if (this.currentTrack === src && this.audio && !this.audio.paused) {
      return;
    }

    this.stop();

    this.audio = new Audio(src);
    this.audio.loop = true;
    this.audio.volume = volume;
    this.currentTrack = src;

    void this.audio.play().catch(() => {
      // Browser autoplay policy can reject until the user interacts
    });
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
      this.currentTrack = null;
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
    }
  }

  resume() {
    if (this.audio) {
      void this.audio.play().catch(() => {
        // Browser autoplay policy can reject
      });
    }
  }

  setVolume(volume: number) {
    if (this.audio) {
      this.audio.volume = volume;
    }
  }

  dispose() {
    this.stop();
  }
}
