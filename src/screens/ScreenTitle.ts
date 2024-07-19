import { $d, $spr, $timer, $v, $v_0_0 } from "@beetpx/beetpx";
import { g } from "../globals";
import { Screen } from "./Screen";
import { ScreenPreGameplay } from "./ScreenPreGameplay";

export class ScreenTitle implements Screen {
  readonly #timer = $timer(2.8 * g.fps);

  update(): Screen {
    let nextScreen: Screen = this;

    if (this.#timer.hasJustFinished) {
      nextScreen = new ScreenPreGameplay();
    }

    return nextScreen;
  }

  draw(): void {
    const clipProgress = Math.max(0, 6 * this.#timer.progress - 5);
    const clipY = Math.floor(clipProgress * (g.canvasSize.y / 2));

    $d.setClippingRegion($v(0, clipY), g.canvasSize.sub(0, 2 * clipY));
    $d.sprite(
      $spr(g.assets.spritesheet)(g.canvasSize.x, g.canvasSize.y, 0, 64),
      $v_0_0,
    );

    $d.removeClippingRegion();
  }
}
