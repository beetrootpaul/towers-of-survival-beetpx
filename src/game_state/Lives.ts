import { g } from "../globals";

export class Lives {
  private _left: number = g.cores.length;

  get left(): number {
    return this._left;
  }

  takeOne(): void {
    this._left = Math.max(0, this.left - 1);
  }
}
