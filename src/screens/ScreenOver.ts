import { Screen } from "./Screen";
import { Timer } from "../misc/Timer";
import { g } from "../globals";
import { ScreenPreGameplay } from "./ScreenPreGameplay";

export class ScreenOver implements Screen {
  private readonly timer: Timer;

  constructor() {
    // TODO: REMOVE
    console.log(ScreenOver.name);

    // TODO: migrate from Lua
    //       local waves_survived = params.waves_survived

    this.timer = new Timer({ start: 3 * g.fps });
    // TODO: migrate from Lua
    //     local text_defeat = new_text("@ defeat @")
    //     local text_waves_1 = new_text("survived")
    //     local text_waves_2 = new_text(tostr(waves_survived))
    //     local text_waves_3 = new_text(waves_survived == 1 and "wave" or "waves")
  }

  update(): Screen {
    let nextScreen: Screen = this;

    if (this.timer.hasFinished()) {
      nextScreen = new ScreenPreGameplay();
    }

    this.timer.update();

    return nextScreen;
  }

  draw(): void {
    // TODO: migrate from Lua
    //          local clip_progress = max(0, 6 * timer.progress() - 5)
    //         local clip_y = flr(clip_progress * (u.vs - 2 * a.wb) / 2)
    //         clip(0, a.wb + clip_y, u.vs, u.vs - 2 * a.wb - 2 * clip_y)
    //
    //         text_defeat.draw(u.vs / 2 - text_defeat.w / 2, u.vs / 2 - 2.5 * (u.th + 1),
    //             function(char_index, text_width)
    //                 if char_index == 1 or char_index == text_width then
    //                     return a.colors.red_dark
    //                 end
    //                 return a.colors.red_light
    //             end
    //         )
    //         text_waves_1.draw(u.vs / 2 - text_waves_1.w / 2, u.vs / 2 - .5 * (u.th + 1), a.colors.brown_purple)
    //         text_waves_2.draw(u.vs / 2 - text_waves_2.w / 2, u.vs / 2 + .5 * (u.th + 1), a.colors.red_dark)
    //         text_waves_3.draw(u.vs / 2 - text_waves_3.w / 2, u.vs / 2 + 1.5 * (u.th + 1), a.colors.brown_purple)
    //
    //         clip()
  }
}
