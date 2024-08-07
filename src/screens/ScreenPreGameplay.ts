import { $d, $timer, $v } from "@beetpx/beetpx";
import { GameState } from "../game_state/GameState";
import { g } from "../globals";
import { Warzone } from "../warzone/Warzone";
import { Screen } from "./Screen";
import { ScreenGameplay } from "./ScreenGameplay";

export class ScreenPreGameplay implements Screen {
  readonly #timer = $timer(0.5 * g.fps);

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

    if (this.#timer.hasJustFinished) {
      nextScreen = new ScreenGameplay({
        gameState: this.#gameState,
        warzone: this.#warzone,
      });
    }

    return nextScreen;
  }

  draw(): void {
    const clipProgress = 1 - this.#timer.progress;
    const clipY = Math.floor(
      clipProgress * (g.canvasSize.y / 2 - g.warzoneBorder),
    );

    $d.setClippingRegion(
      $v(0, g.warzoneBorder + clipY),
      g.canvasSize.sub(0, 2 * g.warzoneBorder + 2 * clipY),
    );

    this.#warzone.draw();

    $d.removeClippingRegion();
  }
}
