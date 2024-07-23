import { $d, $timer, $v } from "@beetpx/beetpx";
import { g, p8c } from "../globals";
import { Screen } from "./Screen";
import { ScreenPreGameplay } from "./ScreenPreGameplay";

export class ScreenWin implements Screen {
  readonly #timer = $timer(3 * g.fps);

  readonly #text1 = "* * *";
  readonly #text2 = "[c_ly]*[c_dp] victory [c_ly]*";
  readonly #text3 = "* * *";

  readonly #text1Size = $d.measureText(this.#text1).wh;
  readonly #text2Size = $d.measureText(this.#text2).wh;
  readonly #text3Size = $d.measureText(this.#text3).wh;

  update(): Screen {
    let nextScreen: Screen = this;

    if (this.#timer.hasJustFinished) {
      nextScreen = new ScreenPreGameplay();
    }

    return nextScreen;
  }

  draw(): void {
    const clipProgress = Math.max(0, 6 * this.#timer.progress - 5);
    const clipY = Math.floor(
      clipProgress * ((g.canvasSize.y - 2 * g.warzoneBorder) / 2),
    );

    $d.setClippingRegion(
      $v(0, g.warzoneBorder + clipY),
      g.canvasSize.sub(0, 2 * g.warzoneBorder + 2 * clipY),
    );

    $d.text(
      this.#text1,
      g.canvasSize
        .div(2)
        .add(-this.#text1Size.x / 2, -2.5 * (this.#text1Size.y + 1)),
      p8c.darkPeach,
    );
    $d.text(
      this.#text2,
      g.canvasSize
        .div(2)
        .add(-this.#text2Size.x / 2, -0.5 * (this.#text2Size.y + 1)),
      p8c.lightYellow,
    );
    $d.text(
      this.#text3,
      g.canvasSize
        .div(2)
        .add(-this.#text3Size.x / 2, 1.5 * (this.#text3Size.y + 1)),
      p8c.darkPeach,
    );

    $d.removeClippingRegion();
  }
}
