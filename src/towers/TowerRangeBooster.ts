import { BpxRgbColor, BpxVector2d, v_ } from "@beetpx/beetpx";
import { b, g } from "../globals";
import { Tile } from "../misc/Tile";
import { Warzone } from "../warzone/Warzone";
import { TowerRange } from "./TowerRange";

export class TowerRangeBooster implements TowerRange {
  static readonly #offsets = [
    v_(-1, -1),
    v_(0, -1),
    v_(1, -1),
    v_(1, 0),
    v_(1, 1),
    v_(0, 1),
    v_(-1, 1),
    v_(-1, 0),
  ];

  readonly #tile: Tile;
  readonly #warzone: Warzone;
  readonly #xy: BpxVector2d;

  constructor(params: { tile: Tile; warzone: Warzone }) {
    this.#tile = params.tile;
    this.#warzone = params.warzone;
    this.#xy = params.tile.xy.add(g.warzoneBorderTiles).mul(g.tileSize);
  }

  reaches(anotherTile: Tile): boolean {
    return TowerRangeBooster.#offsets.some((offset) =>
      anotherTile.isSameAs(this.#tile.plus(offset)),
    );
  }

  draw(color1: BpxRgbColor, color2: BpxRgbColor) {
    b.setClippingRegion(
      v_(0, g.warzoneBorder),
      g.canvasSize.sub(0, 2 * g.warzoneBorder),
    );

    b.drawRect(
      this.#xy.sub(g.tileSize),
      v_(g.tileSize, g.tileSize).mul(3),
      color2,
    );

    b.removeClippingRegion();

    for (const offset of TowerRangeBooster.#offsets) {
      const neighbourTile = this.#tile.plus(offset);
      const xy = neighbourTile.xy.add(g.warzoneBorderTiles).mul(g.tileSize);
      if (this.#warzone.canHaveTowerAt(neighbourTile)) {
        b.setClippingRegion(xy, v_(g.tileSize, g.tileSize));
        b.drawRect(
          this.#xy.sub(g.tileSize),
          v_(g.tileSize, g.tileSize).mul(3),
          color1,
        );
        b.removeClippingRegion();
      }
    }
  }
}
