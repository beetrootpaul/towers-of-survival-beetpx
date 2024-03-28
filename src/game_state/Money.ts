import { BpxTimer } from "@beetpx/beetpx";
import { g } from "../globals";

export class Money {
  #timer: BpxTimer = this.#newMoneyIncreaseTimer();

  #available: number = g.money.initial;

  get available(): number {
    return this.#available;
  }

  #newMoneyIncreaseTimer(): BpxTimer {
    return new BpxTimer({
      frames: g.fps * g.money.increaseSeconds,
    });
  }

  subtract(amount: number): void {
    this.#available -= amount;
  }

  update(): void {
    if (this.#timer.hasFinished) {
      this.#available += 1;
      this.#timer = this.#newMoneyIncreaseTimer();
    }
    this.#timer.update();
  }
}
