import { Timer } from "../misc/Timer";
import { g } from "../globals";

export class Wait {
  readonly #timer: Timer;

  constructor(params: { durationSeconds: number }) {
    this.#timer = new Timer({
      start: g.fps * params.durationSeconds,
    });
  }

  progress(): number {
    return this.#timer.progress();
  }

  update(): void {
    this.#timer.update();
  }
}
