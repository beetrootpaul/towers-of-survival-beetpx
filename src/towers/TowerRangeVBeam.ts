import { BeetPx, v_ } from "beetpx";
import { SolidColor } from "beetpx/ts_output/Color";
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

  // TODO: migrate from Lua
  // function s.touches_enemy(enemy)
  //     local enemy_circle = enemy.range().circle()
  //     return enemy_circle.xy.x + enemy_circle.r >= x1 and enemy_circle.xy.x - enemy_circle.r <= x2
  // end

  draw(color1: SolidColor, color2: SolidColor) {
    // TODO: migrate from Lua
    //     clip(0, a.wb, u.vs, u.vs - a.wb)
    //     fillp(0xa5a5 + .5)
    BeetPx.rectFilled(
      v_(this.#x1, g.warzoneBorder),
      v_(this.#x2 + 1, g.canvasSize.y - g.warzoneBorder),
      color1
    );
    // TODO: migrate from Lua
    //     fillp()
    //     clip()
  }
}
