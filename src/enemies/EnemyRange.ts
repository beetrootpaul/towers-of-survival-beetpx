import {
  BeetPx,
  ClippingRegion,
  SolidColor,
  Vector2d,
  v_,
} from "@beetpx/beetpx";
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
      ClippingRegion.of(
        v_(0, g.warzoneBorder),
        g.canvasSize.sub(0, g.warzoneBorder)
      )
    );

    BeetPx.ellipse(this.#center.sub(this.#r), this.#center.add(this.#r), color);

    BeetPx.setClippingRegion(null);
  }
}
