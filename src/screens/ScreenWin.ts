import { Screen } from "./Screen";

export class ScreenWin implements Screen {
  // TODO: migrate from Lua
  //      local timer = new_timer {
  //         start = 3 * u.fps,
  //     }
  //     local text_1 = new_text("* * *")
  //     local text_2 = new_text("* victory *")
  //     local text_3 = new_text("* * *")

  constructor() {
    // TODO: REMOVE
    console.log(ScreenWin.name);
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
    //         text_1.draw(u.vs / 2 - text_1.w / 2, u.vs / 2 - 2.5 * (u.th + 1), a.colors.salmon)
    //         text_2.draw(u.vs / 2 - text_2.w / 2, u.vs / 2 - .5 * (u.th + 1),
    //             function(char_index, text_width)
    //                 if char_index == 1 or char_index == text_width then
    //                     return a.colors.salmon
    //                 end
    //                 return a.colors.yellow
    //             end
    //         )
    //         text_3.draw(u.vs / 2 - text_3.w / 2, u.vs / 2 + 1.5 * (u.th + 1), a.colors.salmon)
    //
    //         clip()
  }
}
