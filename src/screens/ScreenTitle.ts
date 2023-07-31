import { Timer } from "../misc/Timer";
import { Screen } from "./Screen";
import { ScreenPreGameplay } from "./ScreenPreGameplay";

export class ScreenTitle implements Screen {
  readonly #timer = new Timer({
    // TODO: REVERT
    // start: 2.8 * g.fps,
    start: 0,
  });

  update(): Screen {
    let nextScreen: Screen = this;

    if (this.#timer.hasFinished()) {
      nextScreen = new ScreenPreGameplay();
    }

    this.#timer.update();

    return nextScreen;
  }

  draw(): void {
    // TODO: migrate from Lua
    //         local clip_progress = max(0, 6 * #timer.progress() - 5)
    //         local clip_y = flr(clip_progress * u.vs / 2)
    //         clip(0, clip_y, u.vs, u.vs - 2 * clip_y)
    //
    //         sspr(0, 64, u.vs, u.vs, 0, 0)
    //
    //         clip()
  }
}
