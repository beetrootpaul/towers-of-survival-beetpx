import { $d, $v } from "@beetpx/beetpx";
import { g, p8c } from "../globals";
import { Tile } from "../misc/Tile";

export class ChosenTileBorder {
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

  readonly #tile: Tile;

  constructor(tile: Tile) {
    this.#tile = tile;
  }

  draw(canBuild: boolean): void {
    for (const offset of ChosenTileBorder.#offsets) {
      $d.pixel(
        this.#tile.xy.add(g.warzoneBorderTiles).mul(g.tileSize).add(offset),
        canBuild ? p8c.mediumGreen : p8c.red,
      );
    }
  }
}
