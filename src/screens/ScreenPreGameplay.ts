import { Screen } from "./Screen";
import { ScreenGameplay } from "./ScreenGameplay";
import { Timer } from "../misc/Timer";
import { g } from "../globals";

export class ScreenPreGameplay implements Screen {
  private readonly timer = new Timer({
    start: 0.5 * g.fps,
  });

  // TODO: migrate from Lua
  //     local game_state = new_game_state()
  //     local warzone = new_warzone {
  //         lives = game_state.lives,
  //     }

  constructor() {
    // TODO: REMOVE
    console.log(ScreenPreGameplay.name);
  }

  update(): Screen {
    let nextScreen: Screen = this;

    // TODO: migrate from Lua
    if (this.timer.hasFinished()) {
      nextScreen = new ScreenGameplay();
      //                 game_state = game_state,
      //                 warzone = warzone,
    }

    this.timer.update();

    return nextScreen;
  }

  draw(): void {
    // TODO: migrate from Lua
    //         local clip_progress = (1 - timer.progress())
    //         local clip_y = flr(clip_progress * (u.vs - 2 * a.wb) / 2)
    //         clip(0, a.wb + clip_y, u.vs, u.vs - 2 * a.wb - 2 * clip_y)
    //
    //         warzone.draw()
    //
    //         clip()
  }
}
