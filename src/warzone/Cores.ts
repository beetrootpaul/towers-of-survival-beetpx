import { Lives } from "../game_state/Lives";
import { g } from "../globals";
import { BeetPx, BpxUtils, v_ } from "beetpx";

export class Cores {
  constructor(params: { lives: Lives }) {}

  draw(): void {
    [4, 11, 25, 32, 39].forEach((coreY, index) => {
      const coreNumber = index + 1;
      const spriteName = `healthy${coreNumber}`;
      // TODO: migrate from Lua
      //                 local sprite = params.lives.left >= live and a.cores.sprites["healthy_" .. live] or a.cores.sprites["broken_" .. live]
      const sprite =
        g.cores.sprites[spriteName] ??
        BpxUtils.throwError(`No "cores.sprites.${spriteName}" sprite defined.`);
      BeetPx.sprite(
        g.assets.spritesheet,
        sprite,
        v_(g.canvasSize.x - g.warzoneBorder, g.warzoneBorder + coreY)
      );
    });
  }
}
