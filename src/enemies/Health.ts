export class Health {
  #value: number;

  constructor(maxValue: number) {
    this.#value = maxValue;
  }

  get value(): number {
    return this.#value;
  }

  subtract(damage: number): void {
    this.#value = Math.max(0, this.#value - damage);
  }
}
