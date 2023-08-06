import {
  BeetPx,
  BpxClippingRegion,
  BpxSolidColor,
  BpxVector2d,
  v_,
} from "beetpx";
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

  draw(color: BpxSolidColor): void {
    BeetPx.setClippingRegion(
      BpxClippingRegion.of(
        v_(0, g.warzoneBorder),
        g.canvasSize.sub(0, g.warzoneBorder)
      )
    );

    BeetPx.ellipse(this.#center.sub(this.#r), this.#center.add(this.#r), color);

    BeetPx.setClippingRegion(null);
  }
}
