import type { SbnProject } from "@/types/sbn";

export class NovelAudioEngine {
  private audio: HTMLAudioElement | null = null;
  private offsetSeconds = 0;

  load(project: SbnProject) {
    this.disposeTrack();

    if (!project.audioData) {
      return;
    }

    this.audio = new Audio(project.audioData);
    this.audio.preload = "auto";
    this.audio.volume = project.audioVolume ?? 0.8;
    this.offsetSeconds = (project.audioOffsetFrames ?? 0) / Math.max(1, project.fps ?? 24);
    this.audio.currentTime = this.offsetSeconds;
  }

  setPlaying(playing: boolean) {
    if (!this.audio) return;

    if (playing) {
      void this.audio.play().catch(() => {
        // Browser autoplay policy can reject until the user interacts.
      });
      return;
    }

    this.audio.pause();
  }

  setVolume(volume: number) {
    if (!this.audio) return;
    this.audio.volume = volume;
  }

  sync(frame: number, fps: number) {
    if (!this.audio) return;

    const targetTime = this.offsetSeconds + frame / Math.max(1, fps);
    if (Math.abs(this.audio.currentTime - targetTime) > 0.28) {
      this.audio.currentTime = targetTime;
    }
  }

  reset() {
    if (!this.audio) return;
    this.audio.pause();
    this.audio.currentTime = this.offsetSeconds;
  }

  disposeTrack() {
    if (!this.audio) return;
    this.audio.pause();
    this.audio.src = "";
    this.audio.load();
    this.audio = null;
  }

  dispose() {
    this.disposeTrack();
  }
}
