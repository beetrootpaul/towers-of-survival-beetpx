import { g } from "../globals";

export class Lives {
  #left: number = g.cores.length;

  get left(): number {
    return this.#left;
  }

  takeOne(): void {
    this.#left = Math.max(0, this.left - 1);
  }
}
