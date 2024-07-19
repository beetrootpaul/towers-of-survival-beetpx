import { $d, $v, BpxRgbColor, BpxVector2d } from "@beetpx/beetpx";
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
    this.#r = g.tileSize * 2.5 - 0.5;
  }

  laserSourceXy(): BpxVector2d {
    return this.#xy.add(0.5, -1.5);
  }

  touchesEnemy(enemy: Enemy): boolean {
    const enemyCircle = enemy.range.circle;
    const dXy = enemyCircle.center.sub(this.#xy).abs();
    return dXy.magnitude() < this.#r + enemyCircle.r;
  }

  draw(color1: BpxRgbColor, color2: BpxRgbColor): void {
    $d.setClippingRegion(
      $v(0, g.warzoneBorder),
      g.canvasSize.sub(0, 2 * g.warzoneBorder),
    );
    $d.ellipse(
      this.#xy.sub(this.#r),
      $v(this.#r, this.#r).mul(2).add(1),
      color1,
    );
    $d.removeClippingRegion();
  }
}
