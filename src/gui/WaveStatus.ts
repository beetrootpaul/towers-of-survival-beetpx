import { Waves } from "../waves/Waves";
import { BeetPx, v_ } from "beetpx";
import { g, p8c, u } from "../globals";

export class WaveStatus {
  readonly #waves: Waves;

  constructor(params: { waves: Waves }) {
    this.#waves = params.waves;
  }

  draw(): void {
    if (this.#waves.wait) {
      const waveLabel = `wave ${this.#waves.waveNumber}`;
      // TODO: migrate from Lua
      //             local progress = #waves.current_wait().progress()
      const waveLabelSize = u.measureTextSize(waveLabel);
      // TODO: migrate from Lua
      //             local progress_width = flr(progress * progress_width_max)
      const xy1 = v_(
        g.canvasSize.x / 2 - Math.ceil(waveLabelSize.x / 2),
        g.warzoneBorder - 2
      );

      BeetPx.print(
        waveLabel,
        xy1.sub(v_(0, waveLabelSize.y + 1)),
        p8c.brownPurple
      );

      // TODO: migrate from Lua
      //             if progress_width > 0 then
      //                 line(progress_x, progress_y, progress_x + progress_width - 1, progress_y, a.colors.brown_purple)
      //             end
    } else if (this.#waves.wave) {
      const waveLabel = `wave ${this.#waves.waveNumber}`;
      // TODO: migrate from Lua
      //             local progress = #waves.current_wave().progress()
      const waveLabelSize = u.measureTextSize(waveLabel);
      // TODO: migrate from Lua
      //             local progress_width = flr(progress * progress_width_max)
      const xy1 = v_(
        g.canvasSize.x / 2 - Math.ceil(waveLabelSize.x / 2),
        g.warzoneBorder - 2
      );

      BeetPx.print(
        waveLabel,
        xy1.sub(v_(0, waveLabelSize.y + 1)),
        p8c.greyLight
      );

      // TODO: migrate from Lua
      //             local gap = 1
      //             local remaining_progress_width = progress_width_max - progress_width - gap
      //
      //             if progress_width > 0 then
      //                 line(progress_x, progress_y, progress_x + progress_width - 1, progress_y, a.colors.salmon)
      //             end
      //             if remaining_progress_width > 0 then
      //                 line(progress_x + progress_width_max - remaining_progress_width, progress_y, progress_x + progress_width_max - 1, progress_y, a.colors.brown_purple)
      //             end
    }
  }
}
