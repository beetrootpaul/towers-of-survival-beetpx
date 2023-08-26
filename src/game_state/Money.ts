import { Timer } from "@beetpx/beetpx";
import { b, g } from "../globals";

export class Money {
  #timer: Timer = this.#newMoneyIncreaseTimer();

  #available: number = g.money.initial;

  get available(): number {
    return this.#available;
  }

  #newMoneyIncreaseTimer(): Timer {
    return new Timer(g.money.increaseSeconds);
  }

  subtract(amount: number): void {
    this.#available -= amount;
  }

  update(): void {
    if (this.#timer.hasFinished) {
      this.#available += 1;
      this.#timer = this.#newMoneyIncreaseTimer();
    }
    this.#timer.update(b.dt);
  }
}
