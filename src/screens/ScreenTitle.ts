import { BeetPx, Timer, Vector2d, spr_, v_ } from "@beetpx/beetpx";
import { g } from "../globals";
import { Screen } from "./Screen";
import { ScreenPreGameplay } from "./ScreenPreGameplay";

export class ScreenTitle implements Screen {
  readonly #timer = new Timer({
    frames: 2.8 * g.fps,
  });

  update(): Screen {
    let nextScreen: Screen = this;

    if (this.#timer.hasFinished) {
      nextScreen = new ScreenPreGameplay();
    }

    this.#timer.update();

    return nextScreen;
  }

  draw(): void {
    const clipProgress = Math.max(0, 6 * this.#timer.progress - 5);
    const clipY = Math.floor(clipProgress * (g.canvasSize.y / 2));

    BeetPx.setClippingRegion(v_(0, clipY), g.canvasSize.sub(0, clipY));
    BeetPx.sprite(
      spr_(g.assets.spritesheet)(0, 64, g.canvasSize.x, g.canvasSize.y),
      Vector2d.zero
    );

    BeetPx.removeClippingRegion();
  }
}
