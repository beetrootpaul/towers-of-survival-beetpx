import { BeetPx, BpxSolidColor, BpxVector2d } from "beetpx";
import { g } from "../globals";
import { Tile } from "../misc/Tile";
import { TowerRange } from "./TowerRange";

export class TowerRangeLaser implements TowerRange {
  readonly #xy: BpxVector2d;
  readonly #r: BpxVector2d;

  constructor(params: { tile: Tile }) {
    this.#xy = params.tile.xy
      .add(0.5)
      .add(g.warzoneBorderTiles)
      .mul(g.tileSize)
      .sub(0.5);
    this.#r = g.tileSize.mul(2.5).sub(0.5);
  }

  // TODO: migrate from Lua
  // function s.laser_source_xy()
  //     return xy.plus(.5, -1.5)
  // end
  //
  // function s.touches_enemy(enemy)
  //     local enemy_circle = enemy.range().circle()
  //     local dx = abs(xy.x - enemy_circle.xy.x)
  //     local dy = abs(xy.y - enemy_circle.xy.y)
  //     return dx * dx + dy * dy < (r + enemy_circle.r) * (r + enemy_circle.r)
  // end

  draw(color1: BpxSolidColor, color2: BpxSolidColor): void {
    // TODO: migrate from Lua
    //     clip(0, a.wb, u.vs, u.vs - a.wb)
    BeetPx.ellipse(this.#xy.sub(this.#r), this.#xy.add(this.#r).add(1), color1);
    // TODO: migrate from Lua
    //     clip()
  }
}
