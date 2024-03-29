import { BpxTimer, timer_ } from "@beetpx/beetpx";
import { g } from "../globals";

export class Money {
  #timer: BpxTimer = timer_(g.fps * g.money.increaseSeconds);

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
      this.#timer.restart();
    }
    this.#timer.update();
  }
}
