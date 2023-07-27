import { Screen } from "./Screen";
import { Timer } from "../misc/Timer";
import { g, p8c, u } from "../globals";
import { ScreenPreGameplay } from "./ScreenPreGameplay";
import { BeetPx, v_ } from "beetpx";

export class ScreenOver implements Screen {
  private readonly wavesSurvived: number;
  private readonly timer: Timer;

  constructor(params: { wavesSurvived: number }) {
    this.wavesSurvived = params.wavesSurvived;
    this.timer = new Timer({ start: 3 * g.fps });
  }

  update(): Screen {
    let nextScreen: Screen = this;

    if (this.timer.hasFinished()) {
      nextScreen = new ScreenPreGameplay();
    }

    this.timer.update();

    return nextScreen;
  }

  draw(): void {
    const textDefeat = "@ defeat @";
    const textWaves1 = "survived";
    const textWaves2 = this.wavesSurvived.toFixed(0);
    const textWaves3 = this.wavesSurvived === 1 ? "wave" : "waves";
    const textDefeatSize = u.measureTextSize(textDefeat);
    const textWaves1Size = u.measureTextSize(textWaves1);
    const textWaves2Size = u.measureTextSize(textWaves2);
    const textWaves3Size = u.measureTextSize(textWaves3);

    // TODO: migrate from Lua
    //          local clip_progress = max(0, 6 * timer.progress() - 5)
    //         local clip_y = flr(clip_progress * (u.vs - 2 * a.wb) / 2)
    //         clip(0, a.wb + clip_y, u.vs, u.vs - 2 * a.wb - 2 * clip_y)

    BeetPx.print(
      textDefeat,
      g.canvasSize
        .div(2)
        .add(v_(-textDefeatSize.x / 2, -2.5 * (textDefeatSize.y + 1))),
      ({ char }) => (char === "@" ? p8c.redDark : p8c.redLight)
    );
    BeetPx.print(
      textWaves1,
      g.canvasSize
        .div(2)
        .add(v_(-textWaves1Size.x / 2, -0.5 * (textWaves1Size.y + 1))),
      p8c.brownPurple
    );
    BeetPx.print(
      textWaves2,
      g.canvasSize
        .div(2)
        .add(v_(-textWaves2Size.x / 2, 0.5 * (textWaves2Size.y + 1))),
      p8c.redDark
    );
    BeetPx.print(
      textWaves3,
      g.canvasSize
        .div(2)
        .add(v_(-textWaves3Size.x / 2, 1.5 * (textWaves3Size.y + 1))),
      p8c.brownPurple
    );

    // TODO: migrate from Lua
    //         clip()
  }
}
