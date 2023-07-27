import { g, u } from "../globals";
import { BeetPx, BpxSprite, v_ } from "beetpx";
import { Path } from "./Path";
import { Vector2d } from "beetpx/ts_output/Vector2d";

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

  readonly path: Path;

  constructor() {
    const waypoints: Vector2d[] = [];
    this.serializedTiles.forEach((st, index) => {
      let tileXy = v_(
        parseInt(st.split("|")[0]!, 10),
        parseInt(st.split("|")[1]!, 10)
      );
      if (index === 0) {
        tileXy = tileXy.sub(v_(1, 0));
      } else if (index == this.serializedTiles.length - 1) {
        tileXy = tileXy.add(v_(2, 0));
      }
      waypoints.push(tileXy.add(g.warzoneBorderTiles).mul(g.tileSize));
    });

    this.path = new Path({ waypoints });
  }

  // TODO: migrate from Lua
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
          spriteName = "main";
        } else if (tt[`${tileX}|${tileY - 1}`]) {
          spriteName = "bottomEdge";
        }
        if (spriteName) {
          const sprite: BpxSprite =
            g.road.sprites[spriteName] ??
            u.throwError(`No "road.sprites.${spriteName}" sprite defined.`);
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
