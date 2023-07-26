import { BeetPx } from "beetpx";
import { Vector2d } from "beetpx/ts_output/Vector2d";
import { g } from "../globals";
import { TileSprite } from "../misc/TileSprite";

export class Ground {
  // TODO: migrate from Lua
  //     local sprites = {}
  //     for tile_x = 0, a.warzone_size_tiles - 1 do
  //         for tile_y = 0, a.warzone_size_tiles - 1 do
  //             sprites[tile_x .. "|" .. tile_y] = a.tiles.ground_textured
  //         end
  //     end
  //
  //     local plain_offsets = {
  //         { x = 0, y = 0 },
  //         { x = -1, y = -1 },
  //         { x = 0, y = -1 },
  //         { x = 1, y = -1 },
  //         { x = 1, y = 0 },
  //         { x = 1, y = 1 },
  //         { x = 0, y = 1 },
  //         { x = -1, y = 1 },
  //         { x = -1, y = 0 },
  //     }
  //
  //     return {
  //         is_at = function(tile)
  //             return tile.x >= 0 and tile.x <= a.warzone_size_tiles - 1 and tile.y >= 0 and tile.y <= a.warzone_size_tiles - 1
  //         end,
  //         make_plain_at_and_around = function(tile)
  //             for o in all(plain_offsets) do
  //                 local t = tile.plus(o.x, o.y)
  //                 if sprites[t.x .. "|" .. t.y] then
  //                     sprites[t.x .. "|" .. t.y] = a.tiles.ground_plain
  //                 end
  //             end
  //         end,
  //     }

  draw(): void {
    Vector2d.forEachIntXyWithinRectOf(
      Vector2d.zero,
      g.warzoneSizeTiles,
      true,
      (tileXy) => {
        // TODO: migrate from Lua
        const spriteXy1 = g.sprites.groundTextured;
        // local s = sprites[tile_x .. "|" .. tile_y]
        BeetPx.sprite(
          g.assets.spritesheet,
          new TileSprite(spriteXy1),
          tileXy.add(g.warzoneBorderTiles).mul(g.tileSize)
        );
      }
    );
  }
}
