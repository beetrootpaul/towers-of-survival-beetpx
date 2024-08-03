import { $, $d, $v, BpxCanvasSnapshotColorMapping } from "@beetpx/beetpx";
import { g, p8c } from "../globals";

export class PauseMenu {
  static #arrowPixelsOffsets = [
    $v(0, 0),
    $v(0, 1),
    $v(0, 2),
    $v(0, 3),
    $v(1, 1),
    $v(1, 2),
  ];

  #selected = 0;
  #pressedIndex = -1;

  update(): void {
    if ($.isButtonPressed("O") || $.isButtonPressed("X")) {
      this.#pressedIndex = this.#selected;
    } else {
      this.#pressedIndex = -1;
    }

    if ($.wasButtonJustPressed("up")) {
      this.#selected = Math.max(0, this.#selected - 1);
    }
    if ($.wasButtonJustPressed("down")) {
      this.#selected = Math.min(1, this.#selected + 1);
    }

    if ($.wasButtonJustReleased("O") || $.wasButtonJustReleased("X")) {
      if (this.#selected === 0) {
        $.resume();
      } else if (this.#selected === 1) {
        $.restart();
      }
    }
  }

  draw(): void {
    const textContinue = "continue";
    const textRestart = "restart";
    const textContinueWh = $d.measureText(textContinue).wh;
    const textRestartWh = $d.measureText(textRestart).wh;

    const padding = 6;
    const gapBetweenLines = 4;

    const wh = $v(
      Math.max(textContinueWh.x, textRestartWh.x) + 2 * padding,
      textContinueWh.y + textRestartWh.y + 2 * padding + gapBetweenLines,
    );
    const xy = g.canvasSize.sub(wh).div(2);

    $d.takeCanvasSnapshot();
    $d.rectFilled(
      xy.sub(2),
      wh.add(4),
      BpxCanvasSnapshotColorMapping.of(rgbColor =>
        rgbColor ?
          rgbColor.r + rgbColor.g + rgbColor.b > (0x100 * 3) / 2 ?
            p8c.darkerBlue
          : p8c.black
        : rgbColor,
      ),
    );
    $d.rect(xy.sub(1), wh.add(2), p8c.white);
    $d.text(
      "continue",
      xy.add(
        padding + (this.#selected === 0 ? 1 : 0),
        padding + (this.#pressedIndex === 0 ? 1 : 0),
      ),
      this.#pressedIndex === 0 ? p8c.peach : p8c.white,
    );
    $d.text(
      "restart",
      xy.add(
        padding + (this.#selected === 1 ? 1 : 0),
        padding +
          textContinueWh.y +
          gapBetweenLines +
          (this.#pressedIndex === 1 ? 1 : 0),
      ),
      this.#pressedIndex === 1 ? p8c.peach : p8c.white,
    );
    for (const offset of PauseMenu.#arrowPixelsOffsets) {
      $d.pixel(
        xy
          .add(
            padding,
            padding +
              (this.#selected === 1 ? textContinueWh.y + gapBetweenLines : 0),
          )
          .sub(4, 0)
          .add(offset),
        p8c.white,
      );
    }
  }
}
