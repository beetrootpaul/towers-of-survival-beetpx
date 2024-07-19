import { $d, $v, BpxRgbColor, BpxVector2d } from "@beetpx/beetpx";
import { g } from "../globals";

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
    $d.setClippingRegion(
      $v(0, g.warzoneBorder),
      g.canvasSize.sub(0, g.warzoneBorder),
    );

    $d.ellipse(
      this.#center.sub(this.#r),
      $v(this.#r, this.#r).mul(2).add(1),
      color,
    );

    $d.removeClippingRegion();
  }
}
