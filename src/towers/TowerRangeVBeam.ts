import { BeetPx, BpxFillPattern, v_ } from "beetpx";
import { SolidColor } from "beetpx/ts_output/Color";
import { Enemy } from "../enemies/Enemy";
import { g } from "../globals";
import { Tile } from "../misc/Tile";
import { TowerRange } from "./TowerRange";

export class TowerRangeVBeam implements TowerRange {
  readonly #x1: number;
  readonly #x2: number;

  constructor(params: { tile: Tile }) {
    this.#x1 = (g.warzoneBorderTiles + params.tile.xy.x) * g.tileSize.x + 1;
    this.#x2 = this.#x1 + 1;
  }

  touchesEnemy(enemy: Enemy): boolean {
    const enemyCircle = enemy.range.circle;
    return (
      enemyCircle.center.x + enemyCircle.r >= this.#x1 &&
      enemyCircle.center.x - enemyCircle.r <= this.#x2
    );
  }

  draw(color1: SolidColor, color2: SolidColor) {
    // TODO: migrate from Lua
    //     clip(0, a.wb, u.vs, u.vs - a.wb)
    BeetPx.setFillPattern(BpxFillPattern.of(0b1010_0101_1010_0101));
    BeetPx.rectFilled(
      v_(this.#x1, g.warzoneBorder),
      v_(this.#x2 + 1, g.canvasSize.y - g.warzoneBorder),
      color1
    );
    BeetPx.setFillPattern(BpxFillPattern.primaryOnly);
    // TODO: migrate from Lua
    //     clip()
  }
}
