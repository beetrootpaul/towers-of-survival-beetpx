import { BpxTimer, timer_ } from "@beetpx/beetpx";
import { g } from "../globals";

export class Money {
  #timer: BpxTimer = timer_(g.fps * g.money.increaseSeconds, { loop: true });

  #available: number = g.money.initial;

  get available(): number {
    return this.#available;
  }

  subtract(amount: number): void {
    this.#available -= amount;
  }

  pauseTimers(): void {
    this.#timer.pause();
  }

  resumeTimers(): void {
    this.#timer.resume();
  }

  update(): void {
    if (this.#timer.hasJustFinished) {
      this.#available += 1;
    }
  }
}
