import { BeetPx, ClippingRegion, v_ } from "@beetpx/beetpx";
import { g, p8c, u } from "../globals";
import { Timer } from "../misc/Timer";
import { Screen } from "./Screen";
import { ScreenPreGameplay } from "./ScreenPreGameplay";

export class ScreenWin implements Screen {
  readonly #timer = new Timer({
    start: 3 * g.fps,
  });

  readonly #text1 = "* * *";
  readonly #text2 = "* victory *";
  readonly #text3 = "* * *";

  readonly #text1Size = u.measureTextSize(this.#text1);
  readonly #text2Size = u.measureTextSize(this.#text2);
  readonly #text3Size = u.measureTextSize(this.#text3);

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
    const clipY = Math.floor(
      clipProgress * ((g.canvasSize.y - 2 * g.warzoneBorder) / 2)
    );

    BeetPx.setClippingRegion(
      ClippingRegion.of(
        v_(0, g.warzoneBorder + clipY),
        g.canvasSize.sub(0, g.warzoneBorder + clipY)
      )
    );

    BeetPx.print(
      this.#text1,
      g.canvasSize
        .div(2)
        .add(-this.#text1Size.x / 2, -2.5 * (this.#text1Size.y + 1)),
      p8c.darkPeach
    );
    BeetPx.print(
      this.#text2,
      g.canvasSize
        .div(2)
        .add(-this.#text2Size.x / 2, -0.5 * (this.#text2Size.y + 1)),
      ({ char }) => (char === "*" ? p8c.darkPeach : p8c.lightYellow)
    );
    BeetPx.print(
      this.#text3,
      g.canvasSize
        .div(2)
        .add(-this.#text3Size.x / 2, 1.5 * (this.#text3Size.y + 1)),
      p8c.darkPeach
    );

    BeetPx.setClippingRegion(null);
  }
}
