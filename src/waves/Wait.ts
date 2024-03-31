import { BpxTimer, timer_ } from "@beetpx/beetpx";
import { g } from "../globals";

export class Wait {
  readonly #timer: BpxTimer;

  constructor(params: { durationSeconds: number }) {
    this.#timer = timer_(g.fps * params.durationSeconds);
  }

  progress(): number {
    return this.#timer.progress;
  }

  pauseTimers(): void {
    this.#timer.pause();
  }

  resumeTimers(): void {
    this.#timer.resume();
  }
}
