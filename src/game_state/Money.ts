import { Timer } from "../misc/Timer";
import { g } from "../globals";

export class Money {
  private timer: Timer = this.newMoneyIncreaseTimer();

  private _available: number = g.money.initial;

  get available(): number {
    return this._available;
  }

  private newMoneyIncreaseTimer(): Timer {
    return new Timer({
      start: g.fps * g.money.increaseSeconds,
    });
  }

  subtract(amount: number): void {
    this._available -= amount;
  }

  update(): void {
    if (this.timer.hasFinished()) {
      this._available += 1;
      this.timer = this.newMoneyIncreaseTimer();
    }
    this.timer.update();
  }
}
