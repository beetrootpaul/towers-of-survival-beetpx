import { BpxTimer } from "@beetpx/beetpx";
import { g } from "../globals";

export class Wait {
  readonly #timer: BpxTimer;

  constructor(params: { durationSeconds: number }) {
    this.#timer = new BpxTimer({
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
