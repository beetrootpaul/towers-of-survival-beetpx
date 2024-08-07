import { $timer, BpxTimer } from "@beetpx/beetpx";
import { g } from "../globals";

export class Wait {
  readonly #timer: BpxTimer;

  constructor(params: { durationSeconds: number }) {
    this.#timer = $timer(g.fps * params.durationSeconds);
  }

  progress(): number {
    return this.#timer.progress;
  }
}
