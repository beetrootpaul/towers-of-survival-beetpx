import { Screen } from "./Screen";

export class ScreenOver implements Screen {
  // TODO: migrate from Lua
  //       local waves_survived = params.waves_survived
  //
  //     local timer = new_timer {
  //         start = 3 * u.fps,
  //     }
  //     local text_defeat = new_text("@ defeat @")
  //     local text_waves_1 = new_text("survived")
  //     local text_waves_2 = new_text(tostr(waves_survived))
  //     local text_waves_3 = new_text(waves_survived == 1 and "wave" or "waves")

  constructor() {
    // TODO: REMOVE
    console.log(ScreenOver.name);
  }

  update(): Screen {
    let nextScreen: Screen = this;

    // TODO: migrate from Lua
    //         if timer.has_finished() then
    //             next_screen = new_screen_pre_gameplay()
    //         end
    //
    //         timer.update()

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
