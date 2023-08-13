import { BeetPx, SolidColor, Vector2d, v_ } from "@beetpx/beetpx";
import { g } from "../globals";

export class EnemyRange {
  readonly #center: Vector2d;
  readonly #r: number;

  constructor(center: Vector2d, r: number) {
    this.#center = center;
    this.#r = r;
  }

  get circle(): { center: Vector2d; r: number } {
    return {
      center: this.#center,
      r: this.#r,
    };
  }

  draw(color: SolidColor): void {
    BeetPx.setClippingRegion(
      v_(0, g.warzoneBorder),
      g.canvasSize.sub(0, g.warzoneBorder)
    );

    BeetPx.ellipse(
      this.#center.sub(this.#r),
      v_(this.#r, this.#r).mul(2).add(1),
      color
    );

    BeetPx.removeClippingRegion();
  }
}
