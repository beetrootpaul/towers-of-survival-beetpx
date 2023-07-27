import { g } from "../globals";
import { BeetPx, BpxSprite, BpxUtils, v_ } from "beetpx";

export class Road {
  private readonly serializedTiles = [
    ["-2|6", "-1|6", "0|6", "1|6"],
    ["1|7"],
    ["1|8"],
    ["1|9", "2|9"],
    ["2|10", "3|10", "4|10", "5|10", "6|10"],
    ["6|9", "7|9", "8|9", "9|9", "10|9"],
    ["10|8"],
    ["10|7", "9|7", "8|7", "7|7"],
    ["7|6"],
    ["7|5", "6|5", "5|5"],
    ["5|6", "4|6", "3|6"],
    ["3|5"],
    ["3|4", "2|4"],
    ["2|3"],
    ["2|2"],
    ["2|1", "3|1", "4|1", "5|1", "6|1", "7|1"],
    ["7|2", "8|2", "9|2"],
    ["9|3", "10|3"],
    ["10|4"],
    ["10|5", "11|5", "12|5", "13|5"],
  ].flatMap((t) => t);

  // TODO: migrate from Lua
  //     local waypoints = (function()
  //         local ww = {}
  //         for i = 1, #serialized_tiles do
  //             local tile_x = tonum(split(serialized_tiles[i], '|')[1])
  //             local tile_y = tonum(split(serialized_tiles[i], '|')[2])
  //             if i == 1 then
  //                 tile_x = tile_x - 1
  //             elseif i == #serialized_tiles then
  //                 tile_x = tile_x + 2
  //             end
  //             add(ww, new_xy(
  //                 (a.wbt + tile_x) * u.ts,
  //                 (a.wbt + tile_y) * u.ts
  //             ))
  //         end
  //         return ww
  //     end)()
  //
  //     local path = new_path {
  //         waypoints = waypoints,
  //     }
  //
  //     local s = {}
  //
  //     function s.path()
  //         return path
  //     end
  //
  //     function s.is_at(tile_to_check)
  //         local tt = {}
  //         for st in all(serialized_tiles) do
  //             tt[st] = true
  //         end
  //         return tt[tile_to_check.x .. "|" .. tile_to_check.y]
  //     end

  draw(): void {
    const tt: Record<string, boolean> = {};
    this.serializedTiles.forEach((st) => {
      tt[st] = true;
    });

    for (
      let tileX = -g.warzoneBorderTiles;
      tileX < g.warzoneSizeTiles.x + g.warzoneBorderTiles;
      ++tileX
    ) {
      for (
        let tileY = -g.warzoneBorderTiles;
        tileY < g.warzoneSizeTiles.x + g.warzoneBorderTiles;
        ++tileY
      ) {
        let spriteName: string | null = null;
        if (tt[`${tileX}|${tileY}`]) {
          spriteName = "road";
        } else if (tt[`${tileX}|${tileY - 1}`]) {
          spriteName = "roadEdgeBottom";
        }
        if (spriteName) {
          const sprite: BpxSprite =
            g.sprites[spriteName] ??
            BpxUtils.throwError(`No "${spriteName}" sprite defined.`);
          BeetPx.sprite(
            g.assets.spritesheet,
            sprite,
            v_(tileX, tileY).add(g.warzoneBorderTiles).mul(g.tileSize)
          );
        }
      }
    }

    // TODO: migrate from Lua
    //         if d.enabled then
    //             local color_toggle = true
    //             for point in all(path.points) do
    //                 pset(point.x, point.y, color_toggle and a.colors.white or a.colors.blue_light)
    //                 color_toggle = not color_toggle
    //             end
    //         end
  }
}
