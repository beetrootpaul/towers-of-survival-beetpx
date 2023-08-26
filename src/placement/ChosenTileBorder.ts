import { v_ } from "@beetpx/beetpx";
import { b, g, p8c } from "../globals";
import { Tile } from "../misc/Tile";

export class ChosenTileBorder {
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

  readonly #tile: Tile;

  constructor(tile: Tile) {
    this.#tile = tile;
  }

  draw(canBuild: boolean): void {
    for (const offset of ChosenTileBorder.#offsets) {
      b.pixel(
        this.#tile.xy.add(g.warzoneBorderTiles).mul(g.tileSize).add(offset),
        canBuild ? p8c.mediumGreen : p8c.red
      );
    }
  }
}
