import { $d, $v, BpxVector2d } from "@beetpx/beetpx";
import { g, p8c } from "../globals";

export class ChosenTowerBorder {
  static readonly #offsets = [
    $v(-1, 0),
    $v(-1, -1),
    $v(0, -1),
    //
    $v(g.tileSize - 1, -1),
    $v(g.tileSize, -1),
    $v(g.tileSize, 0),
    //
    $v(g.tileSize, g.tileSize - 1),
    $v(g.tileSize, g.tileSize),
    $v(g.tileSize - 1, g.tileSize),
    //
    $v(0, g.tileSize),
    $v(-1, g.tileSize),
    $v(-1, g.tileSize - 1),
  ];

  draw(xy: BpxVector2d): void {
    for (const offset of ChosenTowerBorder.#offsets) {
      $d.pixel(xy.add(offset), p8c.lightGrey);
    }
  }
}
