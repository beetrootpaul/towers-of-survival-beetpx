import { BeetPx, v_ } from "beetpx";
import { g, p8c, u } from "../globals";
import { Waves } from "../waves/Waves";

export class WaveStatus {
  readonly #waves: Waves;

  constructor(params: { waves: Waves }) {
    this.#waves = params.waves;
  }

  draw(): void {
    if (this.#waves.wait) {
      const waveLabel = `wave ${this.#waves.waveNumber}`;
      const waveLabelSize = u.measureTextSize(waveLabel);
      const xy1 = v_(
        g.canvasSize.x / 2 - Math.ceil(waveLabelSize.x / 2),
        g.warzoneBorder - 2
      );

      BeetPx.print(waveLabel, xy1.sub(0, waveLabelSize.y + 1), p8c.mauve);

      const progressW = Math.floor(
        this.#waves.wait.progress() * waveLabelSize.x
      );
      if (progressW > 0) {
        BeetPx.line(xy1, xy1.add(progressW, 1), p8c.mauve);
      }
    } else if (this.#waves.wave) {
      const waveLabel = `wave ${this.#waves.waveNumber}`;
      const waveLabelSize = u.measureTextSize(waveLabel);
      const xy1 = v_(
        g.canvasSize.x / 2 - Math.ceil(waveLabelSize.x / 2),
        g.warzoneBorder - 2
      );

      BeetPx.print(waveLabel, xy1.sub(0, waveLabelSize.y + 1), p8c.lightGrey);

      const progressW = Math.floor(
        this.#waves.wave.progress() * waveLabelSize.x
      );
      if (progressW > 0) {
        BeetPx.line(xy1, xy1.add(progressW, 1), p8c.darkPeach);
      }

      const gap = 1;
      if (waveLabelSize.x - progressW - gap > 0) {
        BeetPx.line(
          xy1.add(progressW + gap, 0),
          xy1.add(waveLabelSize.x, 1),
          p8c.mauve
        );
      }
    }
  }
}
