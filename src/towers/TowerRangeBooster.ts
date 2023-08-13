import {
  BeetPx,
  ClippingRegion,
  SolidColor,
  Vector2d,
  v_,
} from "@beetpx/beetpx";
import { g } from "../globals";
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
  readonly #xy: Vector2d;

  constructor(params: { tile: Tile; warzone: Warzone }) {
    this.#tile = params.tile;
    this.#warzone = params.warzone;
    this.#xy = params.tile.xy.add(g.warzoneBorderTiles).mul(g.tileSize);
  }

  reaches(anotherTile: Tile): boolean {
    return TowerRangeBooster.#offsets.some((offset) =>
      anotherTile.isSameAs(this.#tile.plus(offset))
    );
  }

  draw(color1: SolidColor, color2: SolidColor) {
    BeetPx.setClippingRegion(
      ClippingRegion.of(
        v_(0, g.warzoneBorder),
        g.canvasSize.sub(0, g.warzoneBorder)
      )
    );

    BeetPx.rect(this.#xy.sub(g.tileSize), this.#xy.add(g.tileSize * 2), color2);

    BeetPx.setClippingRegion(null);

    for (const offset of TowerRangeBooster.#offsets) {
      const neighbourTile = this.#tile.plus(offset);
      const xy = neighbourTile.xy.add(g.warzoneBorderTiles).mul(g.tileSize);
      if (this.#warzone.canHaveTowerAt(neighbourTile)) {
        BeetPx.setClippingRegion(ClippingRegion.of(xy, xy.add(g.tileSize)));
        BeetPx.rect(
          this.#xy.sub(g.tileSize),
          this.#xy.add(g.tileSize * 2),
          color1
        );
        BeetPx.setClippingRegion(null);
      }
    }
  }
}
