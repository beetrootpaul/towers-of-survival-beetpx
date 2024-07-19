import { $d, $v } from "@beetpx/beetpx";
import { Lives } from "../game_state/Lives";
import { g } from "../globals";

export class Cores {
  readonly #lives: Lives;

  constructor(params: { lives: Lives }) {
    this.#lives = params.lives;
  }

  draw(): void {
    g.cores.forEach((core, index) => {
      const coreNumber = index + 1;
      $d.sprite(
        this.#lives.left >= coreNumber ? core.spriteHealthy : core.spriteBroken,
        $v(g.canvasSize.x - g.warzoneBorder, g.warzoneBorder + core.y),
      );
    });
  }
}
