import { Timer } from "@beetpx/beetpx";
import { g } from "../globals";

export class Wait {
  readonly #timer: Timer;

  constructor(params: { durationSeconds: number }) {
    this.#timer = new Timer({
      frames: g.fps * params.durationSeconds,
    });
  }

  progress(): number {
    return this.#timer.progress;
  }

  update(): void {
    this.#timer.update();
  }
}
