import { BpxRgbColor, BpxVector2d, v_ } from "@beetpx/beetpx";
import { b, g } from "../globals";

export class EnemyRange {
  readonly #center: BpxVector2d;
  readonly #r: number;

  constructor(center: BpxVector2d, r: number) {
    this.#center = center;
    this.#r = r;
  }

  get circle(): { center: BpxVector2d; r: number } {
    return {
      center: this.#center,
      r: this.#r,
    };
  }

  draw(color: BpxRgbColor): void {
    b.setClippingRegion(
      v_(0, g.warzoneBorder),
      g.canvasSize.sub(0, g.warzoneBorder),
    );

    b.drawEllipse(
      this.#center.sub(this.#r),
      v_(this.#r, this.#r).mul(2).add(1),
      color,
    );

    b.removeClippingRegion();
  }
}
