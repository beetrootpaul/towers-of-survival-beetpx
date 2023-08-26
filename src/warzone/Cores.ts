import { v_ } from "@beetpx/beetpx";
import { Lives } from "../game_state/Lives";
import { b, g } from "../globals";

export class Cores {
  readonly #lives: Lives;

  constructor(params: { lives: Lives }) {
    this.#lives = params.lives;
  }

  draw(): void {
    g.cores.forEach((core, index) => {
      const coreNumber = index + 1;
      b.sprite(
        this.#lives.left >= coreNumber ? core.spriteHealthy : core.spriteBroken,
        v_(g.canvasSize.x - g.warzoneBorder, g.warzoneBorder + core.y)
      );
    });
  }
}
