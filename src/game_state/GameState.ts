import { Lives } from "./Lives";

export class GameState {
  // TODO: migrate from Lua
  //     local s = {
  //         building_state = "idle",
  readonly lives: Lives = new Lives();
  // TODO: migrate from Lua
  //         money = new_money(),
  //         tower_choice = new_tower_choice(),
  //     }

  hasLostAllLives(): boolean {
    return this.lives.left <= 0;
  }

  // TODO: migrate from Lua
  //     function s.update()
  //         s.money.update()
  //     end
}
