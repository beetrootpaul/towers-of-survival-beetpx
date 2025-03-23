import { $d, $u, $v, BpxRgbColor, BpxVector2d } from "@beetpx/beetpx";
import { g } from "../globals";
import { Tile } from "../misc/Tile";
import { Warzone } from "../warzone/Warzone";
import { TowerRange } from "./TowerRange";

export class TowerRangeBooster implements TowerRange {
  readonly #tile: Tile;
  readonly #warzone: Warzone;
  readonly #xy: BpxVector2d;

  constructor(params: { tile: Tile; warzone: Warzone }) {
    this.#tile = params.tile;
    this.#warzone = params.warzone;
    this.#xy = params.tile.xy.add(g.warzoneBorderTiles).mul(g.tileSize);
  }

  reaches(anotherTile: Tile): boolean {
    return $u
      .adjacent8()
      .some(offset => anotherTile.isSameAs(this.#tile.plus(offset)));
  }

  draw(color1: BpxRgbColor, color2: BpxRgbColor) {
    $d.setClippingRegion(
      $v(0, g.warzoneBorder),
      g.canvasSize.sub(0, 2 * g.warzoneBorder),
    );

    $d.rect(
      this.#xy.sub(g.tileSize),
      $v(g.tileSize, g.tileSize).mul(3),
      color2,
    );

    $d.removeClippingRegion();

    for (const offset of $u.adjacent8()) {
      const neighbourTile = this.#tile.plus(offset);
      const xy = neighbourTile.xy.add(g.warzoneBorderTiles).mul(g.tileSize);
      if (this.#warzone.canHaveTowerAt(neighbourTile)) {
        $d.setClippingRegion(xy, $v(g.tileSize, g.tileSize));
        $d.rect(
          this.#xy.sub(g.tileSize),
          $v(g.tileSize, g.tileSize).mul(3),
          color1,
        );
        $d.removeClippingRegion();
      }
    }
  }
}
