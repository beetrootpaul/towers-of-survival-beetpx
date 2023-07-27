import { Lives } from "../game_state/Lives";
import { g } from "../globals";
import { BeetPx, v_ } from "beetpx";

export class Cores {
  private readonly lives: Lives;

  constructor(params: { lives: Lives }) {
    this.lives = params.lives;
  }

  draw(): void {
    g.cores.forEach((core, index) => {
      const coreNumber = index + 1;
      BeetPx.sprite(
        g.assets.spritesheet,
        this.lives.left >= coreNumber ? core.spriteHealthy : core.spriteBroken,
        v_(g.canvasSize.x - g.warzoneBorder, g.warzoneBorder + core.y)
      );
    });
  }
}
