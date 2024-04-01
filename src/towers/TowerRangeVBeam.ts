import { BpxDrawingPattern, BpxRgbColor, v_ } from "@beetpx/beetpx";
import { Enemy } from "../enemies/Enemy";
import { b, g } from "../globals";
import { Tile } from "../misc/Tile";
import { TowerRange } from "./TowerRange";

export class TowerRangeVBeam implements TowerRange {
  readonly #x1: number;
  readonly #x2: number;

  constructor(params: { tile: Tile }) {
    this.#x1 = (g.warzoneBorderTiles + params.tile.xy.x) * g.tileSize + 1;
    this.#x2 = this.#x1 + 1;
  }

  touchesEnemy(enemy: Enemy): boolean {
    const enemyCircle = enemy.range.circle;
    return (
      enemyCircle.center.x + enemyCircle.r >= this.#x1 &&
      enemyCircle.center.x - enemyCircle.r <= this.#x2
    );
  }

  draw(color1: BpxRgbColor, color2: BpxRgbColor) {
    b.setClippingRegion(
      v_(0, g.warzoneBorder),
      g.canvasSize.sub(0, 2 * g.warzoneBorder),
    );

    b.setDrawingPattern(BpxDrawingPattern.of(0b1010_0101_1010_0101));
    b.drawRectFilled(
      v_(this.#x1, g.warzoneBorder),
      v_(this.#x2 - this.#x1 + 1, g.canvasSize.y - 2 * g.warzoneBorder),
      color1,
    );
    b.setDrawingPattern(BpxDrawingPattern.primaryOnly);

    b.removeClippingRegion();
  }
}
