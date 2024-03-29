import { BpxVector2d, v_ } from "@beetpx/beetpx";
import { b, g, p8c } from "../globals";

export class ChosenTowerBorder {
  static readonly #offsets = [
    v_(-1, 0),
    v_(-1, -1),
    v_(0, -1),
    //
    v_(g.tileSize - 1, -1),
    v_(g.tileSize, -1),
    v_(g.tileSize, 0),
    //
    v_(g.tileSize, g.tileSize - 1),
    v_(g.tileSize, g.tileSize),
    v_(g.tileSize - 1, g.tileSize),
    //
    v_(0, g.tileSize),
    v_(-1, g.tileSize),
    v_(-1, g.tileSize - 1),
  ];

  draw(xy: BpxVector2d): void {
    for (const offset of ChosenTowerBorder.#offsets) {
      b.drawPixel(xy.add(offset), p8c.lightGrey);
    }
  }
}
