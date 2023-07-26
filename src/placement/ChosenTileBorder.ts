export class ChosenTileBorder {
  // TODO: migrate from Lua
  // local tile = u.r(params.tile)
  //
  // local offsets = {
  //     { -1, 0 },
  //     { -1, -1 },
  //     { 0, -1 },
  //     --
  //     { u.ts - 1, -1 },
  //     { u.ts, -1 },
  //     { u.ts, 0 },
  //     --
  //     { u.ts, u.ts - 1 },
  //     { u.ts, u.ts },
  //     { u.ts - 1, u.ts },
  //     --
  //     { 0, u.ts },
  //     { -1, u.ts },
  //     { -1, u.ts - 1 },
  // }
  //
  // return {
  //     draw = function(can_build)
  //         local x = (a.wbt + tile.x) * u.ts
  //         local y = (a.wbt + tile.y) * u.ts
  //         for offset in all(offsets) do
  //             pset(x + offset[1], y + offset[2], can_build and a.colors.green or a.colors.red_light)
  //         end
  //     end,
  // }
}
