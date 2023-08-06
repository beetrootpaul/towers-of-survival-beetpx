import {
  BeetPx,
  BpxClippingRegion,
  BpxSolidColor,
  BpxVector2d,
  v_,
} from "beetpx";
import { Enemy } from "../enemies/Enemy";
import { g } from "../globals";
import { Tile } from "../misc/Tile";
import { TowerRange } from "./TowerRange";

export class TowerRangeLaser implements TowerRange {
  readonly #xy: BpxVector2d;
  readonly #r: number;

  constructor(params: { tile: Tile }) {
    this.#xy = params.tile.xy
      .add(0.5)
      .add(g.warzoneBorderTiles)
      .mul(g.tileSize)
      .sub(0.5);
    // TODO: remove `.x`
    this.#r = g.tileSize.x * 2.5 - 0.5;
  }

  laserSourceXy(): BpxVector2d {
    return this.#xy.add(0.5, -1.5);
  }

  touchesEnemy(enemy: Enemy): boolean {
    const enemyCircle = enemy.range.circle;
    const dXy = enemyCircle.center.sub(this.#xy).abs();
    // TODO: add a API method for non-rooted magnitude squared
    return dXy.magnitude() < this.#r + enemyCircle.r;
  }

  draw(color1: BpxSolidColor, color2: BpxSolidColor): void {
    BeetPx.setClippingRegion(
      BpxClippingRegion.of(
        v_(0, g.warzoneBorder),
        g.canvasSize.sub(0, g.warzoneBorder)
      )
    );
    BeetPx.ellipse(this.#xy.sub(this.#r), this.#xy.add(this.#r).add(1), color1);
    BeetPx.setClippingRegion(null);
  }
}
