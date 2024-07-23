import { $d, $timer, $v, BpxTimer } from "@beetpx/beetpx";
import { g, p8c } from "../globals";
import { Screen } from "./Screen";
import { ScreenPreGameplay } from "./ScreenPreGameplay";

export class ScreenOver implements Screen {
  readonly #wavesSurvived: number;
  readonly #timer: BpxTimer;

  constructor(params: { wavesSurvived: number }) {
    this.#wavesSurvived = params.wavesSurvived;
    this.#timer = $timer(3 * g.fps);
  }

  update(): Screen {
    let nextScreen: Screen = this;

    if (this.#timer.hasJustFinished) {
      nextScreen = new ScreenPreGameplay();
    }

    return nextScreen;
  }

  draw(): void {
    const textDefeat = "[c1]@[c0] defeat [c1]@";
    const textWaves1 = "survived";
    const textWaves2 = this.#wavesSurvived.toFixed(0);
    const textWaves3 = this.#wavesSurvived === 1 ? "wave" : "waves";
    const { wh: textDefeatSize } = $d.measureText(textDefeat, {
      colorMarkers: {
        c0: p8c.red,
        c1: p8c.darkRed,
      },
    });
    const { wh: textWaves1Size } = $d.measureText(textWaves1);
    const { wh: textWaves2Size } = $d.measureText(textWaves2);
    const { wh: textWaves3Size } = $d.measureText(textWaves3);

    const clipProgress = Math.max(0, 6 * this.#timer.progress - 5);
    const clipY = Math.floor(
      clipProgress * ((g.canvasSize.y - 2 * g.warzoneBorder) / 2),
    );

    $d.setClippingRegion(
      $v(0, g.warzoneBorder + clipY),
      g.canvasSize.sub(0, 2 * g.warzoneBorder + 2 * clipY),
    );

    $d.text(
      textDefeat,
      g.canvasSize
        .div(2)
        .add(-textDefeatSize.x / 2, -2.5 * (textDefeatSize.y + 1)),
      p8c.red,
      {
        colorMarkers: {
          c0: p8c.red,
          c1: p8c.darkRed,
        },
      },
    );
    $d.text(
      textWaves1,
      g.canvasSize
        .div(2)
        .add(-textWaves1Size.x / 2, -0.5 * (textWaves1Size.y + 1)),
      p8c.mauve,
    );
    $d.text(
      textWaves2,
      g.canvasSize
        .div(2)
        .add(-textWaves2Size.x / 2, 0.5 * (textWaves2Size.y + 1)),
      p8c.darkRed,
    );
    $d.text(
      textWaves3,
      g.canvasSize
        .div(2)
        .add(-textWaves3Size.x / 2, 1.5 * (textWaves3Size.y + 1)),
      p8c.mauve,
    );

    $d.removeClippingRegion();
  }
}
