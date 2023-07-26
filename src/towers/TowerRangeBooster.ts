export class TowerRangeBooster {
  // TODO: migrate from Lua
  // local tile = u.r(params.tile)
  // local warzone = u.r(params.warzone)
  //
  // local xy = new_xy(
  //     (a.wbt + tile.x) * u.ts,
  //     (a.wbt + tile.y) * u.ts
  // )
  //
  // local offsets = {
  //     { -1, -1 },
  //     { 0, -1 },
  //     { 1, -1 },
  //     { 1, 0 },
  //     { 1, 1 },
  //     { 0, 1 },
  //     { -1, 1 },
  //     { -1, 0 },
  // }
  //
  // local s = {}
  //
  // function s.reaches(another_tile)
  //     for offset in all(offsets) do
  //         if another_tile.is_same_as(tile.plus(offset[1], offset[2])) then
  //             return true
  //         end
  //     end
  //     return false
  // end
  //
  // function s.draw(color1, color2)
  //     clip(0, a.wb, u.vs, u.vs - a.wb)
  //     rect(xy.x - u.ts, xy.y - u.ts, xy.x + 2 * u.ts - 1, xy.y + 2 * u.ts - 1, color2)
  //     clip()
  //
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
  // end
  //
  // return s
}
