import { GameState } from "../game_state/GameState";
import { Timer } from "../misc/Timer";
import { Warzone } from "../warzone/Warzone";
import { Screen } from "./Screen";
import { ScreenGameplay } from "./ScreenGameplay";

export class ScreenPreGameplay implements Screen {
  readonly #timer = new Timer({
    // TODO: REVERT
    // start: 0.5 * g.fps,
    start: 0,
  });

  readonly #gameState: GameState;
  readonly #warzone: Warzone;

  constructor() {
    this.#gameState = new GameState();
    this.#warzone = new Warzone({
      lives: this.#gameState.lives,
    });
  }

  update(): Screen {
    let nextScreen: Screen = this;

    if (this.#timer.hasFinished()) {
      nextScreen = new ScreenGameplay({
        gameState: this.#gameState,
        warzone: this.#warzone,
      });
    }

    this.#timer.update();

    return nextScreen;
  }

  draw(): void {
    // TODO: migrate from Lua
    //         local clip_progress = (1 - timer.progress())
    //         local clip_y = flr(clip_progress * (u.vs - 2 * a.wb) / 2)
    //         clip(0, a.wb + clip_y, u.vs, u.vs - 2 * a.wb - 2 * clip_y)

    this.#warzone.draw();

    // TODO: migrate from Lua
    //         clip()
  }
}
