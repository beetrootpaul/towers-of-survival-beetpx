import { Lives } from "../game_state/Lives";

export class Cores {
  constructor(params: {
    // TODO: migrate from Lua
    lives: Lives;
  }) {}

  // TODO: migrate from Lua
  //         draw = function()
  //             local destination_x = { 4, 11, 25, 32, 39 }
  //             for live = 1, 5 do
  //                 local sprite = params.lives.left >= live and a.cores.sprites["healthy_" .. live] or a.cores.sprites["broken_" .. live]
  //                 sspr(sprite[1], sprite[2], sprite[3], sprite[4], u.vs - a.wb, a.wb + destination_x[live])
  //             end
  //         end,
}
