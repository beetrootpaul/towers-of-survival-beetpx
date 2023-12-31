import { Timer, v_ } from "@beetpx/beetpx";
import { b, g, p8c, u } from "../globals";
import { Screen } from "./Screen";
import { ScreenPreGameplay } from "./ScreenPreGameplay";

export class ScreenOver implements Screen {
  readonly #wavesSurvived: number;
  readonly #timer: Timer;

  constructor(params: { wavesSurvived: number }) {
    this.#wavesSurvived = params.wavesSurvived;
    this.#timer = new Timer({ frames: 3 * g.fps });
  }

  update(): Screen {
    let nextScreen: Screen = this;

    if (this.#timer.hasFinished) {
      nextScreen = new ScreenPreGameplay();
    }

    this.#timer.update();

    return nextScreen;
  }

  draw(): void {
    const textDefeat = "@ defeat @";
    const textWaves1 = "survived";
    const textWaves2 = this.#wavesSurvived.toFixed(0);
    const textWaves3 = this.#wavesSurvived === 1 ? "wave" : "waves";
    const textDefeatSize = u.measureText(textDefeat);
    const textWaves1Size = u.measureText(textWaves1);
    const textWaves2Size = u.measureText(textWaves2);
    const textWaves3Size = u.measureText(textWaves3);

    const clipProgress = Math.max(0, 6 * this.#timer.progress - 5);
    const clipY = Math.floor(
      clipProgress * ((g.canvasSize.y - 2 * g.warzoneBorder) / 2)
    );

    b.setClippingRegion(
      v_(0, g.warzoneBorder + clipY),
      g.canvasSize.sub(0, 2 * g.warzoneBorder + 2 * clipY)
    );

    b.print(
      textDefeat,
      g.canvasSize
        .div(2)
        .add(-textDefeatSize.x / 2, -2.5 * (textDefeatSize.y + 1)),
      ({ char }) => (char === "@" ? p8c.darkRed : p8c.red)
    );
    b.print(
      textWaves1,
      g.canvasSize
        .div(2)
        .add(-textWaves1Size.x / 2, -0.5 * (textWaves1Size.y + 1)),
      p8c.mauve
    );
    b.print(
      textWaves2,
      g.canvasSize
        .div(2)
        .add(-textWaves2Size.x / 2, 0.5 * (textWaves2Size.y + 1)),
      p8c.darkRed
    );
    b.print(
      textWaves3,
      g.canvasSize
        .div(2)
        .add(-textWaves3Size.x / 2, 1.5 * (textWaves3Size.y + 1)),
      p8c.mauve
    );

    b.removeClippingRegion();
  }
}
