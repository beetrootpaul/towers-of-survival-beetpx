import { spr_, timer_, v_, v_0_0_ } from "@beetpx/beetpx";
import { b, g } from "../globals";
import { Screen } from "./Screen";
import { ScreenPreGameplay } from "./ScreenPreGameplay";

export class ScreenTitle implements Screen {
  readonly #timer = timer_(2.8 * g.fps);

  update(): Screen {
    let nextScreen: Screen = this;

    if (this.#timer.hasJustFinished) {
      nextScreen = new ScreenPreGameplay();
    }

    this.#timer.update();

    return nextScreen;
  }

  draw(): void {
    const clipProgress = Math.max(0, 6 * this.#timer.progress - 5);
    const clipY = Math.floor(clipProgress * (g.canvasSize.y / 2));

    b.setClippingRegion(v_(0, clipY), g.canvasSize.sub(0, 2 * clipY));
    b.drawSprite(
      spr_(g.assets.spritesheet)(g.canvasSize.x, g.canvasSize.y, 0, 64),
      v_0_0_
    );

    b.removeClippingRegion();
  }
}
