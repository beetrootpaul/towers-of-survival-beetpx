import { BeetPx, BpxClippingRegion, v_ } from "@beetpx/beetpx";
import { GameState } from "../game_state/GameState";
import { g } from "../globals";
import { Timer } from "../misc/Timer";
import { Warzone } from "../warzone/Warzone";
import { Screen } from "./Screen";
import { ScreenGameplay } from "./ScreenGameplay";

export class ScreenPreGameplay implements Screen {
  readonly #timer = new Timer({
    start: 0.5 * g.fps,
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
    const clipProgress = 1 - this.#timer.progress();
    const clipY = Math.floor(
      clipProgress * (g.canvasSize.y / 2 - g.warzoneBorder)
    );

    BeetPx.setClippingRegion(
      BpxClippingRegion.of(
        v_(0, g.warzoneBorder + clipY),
        g.canvasSize.sub(0, g.warzoneBorder + clipY)
      )
    );

    this.#warzone.draw();

    BeetPx.setClippingRegion(null);
  }
}
