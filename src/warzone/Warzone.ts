import { Road } from "./Road";
import { Cores } from "./Cores";
import { Lives } from "../game_state/Lives";
import { Ground } from "./Ground";

export class Warzone {
  // TODO: migrate from Lua
  // private readonly lives: Lives;
  // private readonly road: Road;
  // private readonly cores: Cores;
  // private readonly ground: Ground;

  constructor(params: {
    // TODO: migrate from Lua
    // lives: number
  }) {
    // TODO: migrate from Lua
    // local lives = u.r(params.lives)
    //     local road = new_road()
    //     local cores = new_cores {
    //         lives = lives,
    //     }
    //     local ground = new_ground()
  }

  // TODO: migrate from Lua
  //         ground = ground,
  //
  //         path = function()
  //             return road.path()
  //         end,
  //
  //         can_have_tower_at = function(tile)
  //             return not road.is_at(tile) and ground.is_at(tile)
  //         end,
  //
  //         draw = function()
  //             ground.draw()
  //             road.draw()
  //             cores.draw()
  //         end,
}
