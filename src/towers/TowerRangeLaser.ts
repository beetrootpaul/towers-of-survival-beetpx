import { SolidColor, Vector2d, v_ } from "@beetpx/beetpx";
import { Enemy } from "../enemies/Enemy";
import { b, g } from "../globals";
import { Tile } from "../misc/Tile";
import { TowerRange } from "./TowerRange";

export class TowerRangeLaser implements TowerRange {
  readonly #xy: Vector2d;
  readonly #r: number;

  constructor(params: { tile: Tile }) {
    this.#xy = params.tile.xy
      .add(0.5)
      .add(g.warzoneBorderTiles)
      .mul(g.tileSize)
      .sub(0.5);
    this.#r = g.tileSize * 2.5 - 0.5;
  }

  laserSourceXy(): Vector2d {
    return this.#xy.add(0.5, -1.5);
  }

  touchesEnemy(enemy: Enemy): boolean {
    const enemyCircle = enemy.range.circle;
    const dXy = enemyCircle.center.sub(this.#xy).abs();
    return dXy.magnitude() < this.#r + enemyCircle.r;
  }

  draw(color1: SolidColor, color2: SolidColor): void {
    b.setClippingRegion(
      v_(0, g.warzoneBorder),
      g.canvasSize.sub(0, 2 * g.warzoneBorder)
    );
    b.ellipse(
      this.#xy.sub(this.#r),
      v_(this.#r, this.#r).mul(2).add(1),
      color1
    );
    b.removeClippingRegion();
  }
}
