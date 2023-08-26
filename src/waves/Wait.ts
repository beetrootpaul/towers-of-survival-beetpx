import { Timer } from "@beetpx/beetpx";
import { b } from "../globals";

export class Wait {
  readonly #timer: Timer;

  constructor(params: { durationSeconds: number }) {
    this.#timer = new Timer(params.durationSeconds);
  }

  progress(): number {
    return this.#timer.progress;
  }

  update(): void {
    this.#timer.update(b.dt);
  }
}
