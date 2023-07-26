import { Screen } from "./Screen";
import { ScreenPreGameplay } from "./ScreenPreGameplay";
import { Timer } from "../misc/Timer";
import { g } from "../globals";

export class ScreenTitle implements Screen {
  private readonly timer = new Timer({
    start: 2.8 * g.fps,
  });

  constructor() {
    // TODO: REMOVE
    console.log(ScreenTitle.name);
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
    //         local clip_progress = max(0, 6 * timer.progress() - 5)
    //         local clip_y = flr(clip_progress * u.vs / 2)
    //         clip(0, clip_y, u.vs, u.vs - 2 * clip_y)
    //
    //         sspr(0, 64, u.vs, u.vs, 0, 0)
    //
    //         clip()
  }
}
