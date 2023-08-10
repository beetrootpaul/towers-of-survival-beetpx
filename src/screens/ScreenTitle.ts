import { BeetPx, ClippingRegion, Vector2d, spr_, v_ } from "@beetpx/beetpx";
import { g } from "../globals";
import { Timer } from "../misc/Timer";
import { Screen } from "./Screen";
import { ScreenPreGameplay } from "./ScreenPreGameplay";

export class ScreenTitle implements Screen {
  readonly #timer = new Timer({
    // TODO: REVERT
    // start: 2.8 * g.fps,
    start: 0.5 * g.fps,
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
    const clipProgress = Math.max(0, 6 * this.#timer.progress() - 5);
    const clipY = Math.floor(clipProgress * (g.canvasSize.y / 2));

    BeetPx.setClippingRegion(
      ClippingRegion.of(v_(0, clipY), g.canvasSize.sub(0, clipY))
    );
    BeetPx.sprite(
      g.assets.spritesheet,
      spr_(0, 64, g.canvasSize),
      Vector2d.zero
    );

    BeetPx.setClippingRegion(null);
  }
}
