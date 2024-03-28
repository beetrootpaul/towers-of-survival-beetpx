import { BpxCanvasSnapshotColorMapping, v_ } from "@beetpx/beetpx";
import { Game } from "../Game";
import { b, g, p8c, u } from "../globals";

export class PauseMenu {
  static #arrowPixelsOffsets = [
    v_(0, 0),
    v_(0, 1),
    v_(0, 2),
    v_(0, 3),
    v_(1, 1),
    v_(1, 2),
  ];

  #selected = 0;
  #pressedIndex = -1;

  update(): void {
    if (b.isPressed("a") || b.isPressed("b")) {
      this.#pressedIndex = this.#selected;
    } else {
      this.#pressedIndex = -1;
    }

    if (b.wasJustPressed("up")) {
      this.#selected = Math.max(0, this.#selected - 1);
    }
    if (b.wasJustPressed("down")) {
      this.#selected = Math.min(1, this.#selected + 1);
    }

    if (b.wasJustReleased("a") || b.wasJustReleased("b")) {
      if (this.#selected === 0) {
        Game.isPaused = false;
      } else if (this.#selected === 1) {
        b.restart();
      }
    }
  }

  draw(): void {
    const textContinue = "continue";
    const textRestart = "restart";
    const textContinueWh = u.measureText(textContinue)[1];
    const textRestartWh = u.measureText(textRestart)[1];

    const padding = 6;
    const gapBetweenLines = 4;

    const wh = v_(
      Math.max(textContinueWh.x, textRestartWh.x) + 2 * padding,
      textContinueWh.y + textRestartWh.y + 2 * padding + gapBetweenLines
    );
    const xy = g.canvasSize.sub(wh).div(2);

    b.takeCanvasSnapshot();
    b.rectFilled(
      xy.sub(2),
      wh.add(4),
      new BpxCanvasSnapshotColorMapping((rgbColor) =>
        rgbColor
          ? rgbColor.r + rgbColor.g + rgbColor.b > (0x100 * 3) / 2
            ? p8c.darkerBlue
            : p8c.black
          : rgbColor
      )
    );
    b.rect(xy.sub(1), wh.add(2), p8c.white);
    b.print(
      "continue",
      xy.add(
        padding + (this.#selected === 0 ? 1 : 0),
        padding + (this.#pressedIndex === 0 ? 1 : 0)
      ),
      this.#pressedIndex === 0 ? p8c.peach : p8c.white
    );
    b.print(
      "restart",
      xy.add(
        padding + (this.#selected === 1 ? 1 : 0),
        padding +
          textContinueWh.y +
          gapBetweenLines +
          (this.#pressedIndex === 1 ? 1 : 0)
      ),
      this.#pressedIndex === 1 ? p8c.peach : p8c.white
    );
    for (const offset of PauseMenu.#arrowPixelsOffsets) {
      b.pixel(
        xy
          .add(
            padding,
            padding +
              (this.#selected === 1 ? textContinueWh.y + gapBetweenLines : 0)
          )
          .sub(4, 0)
          .add(offset),
        p8c.white
      );
    }
  }
}
