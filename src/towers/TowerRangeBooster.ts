import { BeetPx, BpxSolidColor, BpxVector2d, v_ } from "beetpx";
import { g } from "../globals";
import { Tile } from "../misc/Tile";
import { Warzone } from "../warzone/Warzone";
import { TowerRange } from "./TowerRange";

export class TowerRangeBooster implements TowerRange {
  static readonly #offsets = [
    v_(-1, -1),
    v_(0, -1),
    v_(1, -1),
    v_(1, 0),
    v_(1, 1),
    v_(0, 1),
    v_(-1, 1),
    v_(-1, 0),
  ];

  readonly #tile: Tile;
  readonly #warzone: Warzone;
  readonly #xy: BpxVector2d;

  constructor(params: { tile: Tile; warzone: Warzone }) {
    this.#tile = params.tile;
    this.#warzone = params.warzone;
    this.#xy = params.tile.xy.add(g.warzoneBorderTiles).mul(g.tileSize);
  }

  // TODO: migrate from Lua
  // function s.reaches(another_tile)
  //     for offset in all(offsets) do
  //         if another_tile.is_same_as(tile.plus(offset[1], offset[2])) then
  //             return true
  //         end
  //     end
  //     return false
  // end

  draw(color1: BpxSolidColor, color2: BpxSolidColor) {
    // TODO: migrate from Lua
    //     clip(0, a.wb, u.vs, u.vs - a.wb)
    BeetPx.rect(
      this.#xy.sub(g.tileSize),
      this.#xy.add(g.tileSize.mul(2)),
      color2
    );
    // TODO: migrate from Lua
    //     clip()
    //
    // TODO: migrate from Lua
    //     for offset in all(offsets) do
    //         local neighbour_tile = tile.plus(offset[1], offset[2])
    //         local xy2 = new_xy(
    //             (a.wbt + neighbour_tile.x) * u.ts,
    //             (a.wbt + neighbour_tile.y) * u.ts
    //         )
    //         if warzone.can_have_tower_at(neighbour_tile) then
    //             clip(xy2.x, xy2.y, u.ts, u.ts)
    //             rect(xy.x - u.ts, xy.y - u.ts, xy.x + 2 * u.ts - 1, xy.y + 2 * u.ts - 1, color1)
    //             clip()
    //         end
    //     end
  }
}
