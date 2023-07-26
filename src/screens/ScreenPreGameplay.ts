import { Screen } from "./Screen";
import { ScreenGameplay } from "./ScreenGameplay";
import { Timer } from "../misc/Timer";
import { g } from "../globals";
import { Warzone } from "../warzone/Warzone";
import { GameState } from "../game_state/GameState";

export class ScreenPreGameplay implements Screen {
  private readonly timer = new Timer({
    start: 0.5 * g.fps,
  });

  private readonly gameState: GameState;
  private readonly warzone: Warzone;

  constructor() {
    // TODO: REMOVE
    console.log(ScreenPreGameplay.name);

    this.gameState = new GameState();
    this.warzone = new Warzone({
      lives: this.gameState.lives,
    });
  }

  update(): Screen {
    let nextScreen: Screen = this;

    if (this.timer.hasFinished()) {
      nextScreen = new ScreenGameplay({
        gameState: this.gameState,
        warzone: this.warzone,
      });
    }

    this.timer.update();

    return nextScreen;
  }

  draw(): void {
    // TODO: migrate from Lua
    //         local clip_progress = (1 - timer.progress())
    //         local clip_y = flr(clip_progress * (u.vs - 2 * a.wb) / 2)
    //         clip(0, a.wb + clip_y, u.vs, u.vs - 2 * a.wb - 2 * clip_y)

    this.warzone.draw();

    // TODO: migrate from Lua
    //         clip()
  }
}
