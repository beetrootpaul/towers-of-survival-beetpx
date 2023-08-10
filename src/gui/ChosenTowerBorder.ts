import { BeetPx, Vector2d, v_ } from "@beetpx/beetpx";
import { g, p8c } from "../globals";

export class ChosenTowerBorder {
  static readonly #offsets = [
    v_(-1, 0),
    v_(-1, -1),
    v_(0, -1),
    //
    v_(g.tileSize.x - 1, -1),
    v_(g.tileSize.x, -1),
    v_(g.tileSize.x, 0),
    //
    v_(g.tileSize.x, g.tileSize.y - 1),
    v_(g.tileSize.x, g.tileSize.y),
    v_(g.tileSize.x - 1, g.tileSize.y),
    //
    v_(0, g.tileSize.y),
    v_(-1, g.tileSize.y),
    v_(-1, g.tileSize.y - 1),
  ];

  draw(xy: Vector2d): void {
    for (const offset of ChosenTowerBorder.#offsets) {
      BeetPx.pixel(xy.add(offset), p8c.lightGrey);
    }
  }
}
