import { $timer, BpxTimer } from "@beetpx/beetpx";
import { g } from "../globals";

export class Money {
  #timer: BpxTimer = $timer(g.fps * g.money.increaseSeconds, { loop: true });

  #available: number = g.money.initial;

  get available(): number {
    return this.#available;
  }

  subtract(amount: number): void {
    this.#available -= amount;
  }

  update(): void {
    if (this.#timer.hasJustFinished) {
      this.#available += 1;
    }
  }
}
