import { $d, $u, $v, $v_0_0, BpxSprite } from "@beetpx/beetpx";
import { g } from "../globals";
import { Tile } from "../misc/Tile";
import { forEachIntXyWithinRectOf } from "../misc/forEachIntXyWithinRectOf";

export class Ground {
  static readonly #plainOffsets = [
    $v(0, 0),
    $v(-1, -1),
    $v(0, -1),
    $v(1, -1),
    $v(1, 0),
    $v(1, 1),
    $v(0, 1),
    $v(-1, 1),
    $v(-1, 0),
  ];

  readonly #sprites: Record<string, BpxSprite>;

  constructor() {
    this.#sprites = {};
    forEachIntXyWithinRectOf($v_0_0, g.warzoneSizeTiles, xy => {
      this.#sprites[`${xy.x}|${xy.y}`] =
        g.ground.sprites.textured ??
        $u.throwError(`No "ground.sprites.textured" sprite defined.`);
    });
  }

  isAt(tile: Tile): boolean {
    return tile.xy.gte($v_0_0) && tile.xy.lte(g.warzoneSizeTiles.sub(1));
  }

  makePlainAtAndAround(tile: Tile): void {
    for (const offset of Ground.#plainOffsets) {
      const t = tile.plus(offset);
      if (this.#sprites[`${t.xy.x}|${t.xy.y}`]) {
        this.#sprites[`${t.xy.x}|${t.xy.y}`] =
          g.ground.sprites.plain ??
          $u.throwError(`No "ground.sprites.plain" sprite defined.`);
      }
    }
  }

  draw(): void {
    forEachIntXyWithinRectOf($v_0_0, g.warzoneSizeTiles, tileXy => {
      const sprite = this.#sprites[`${tileXy.x}|${tileXy.y}`];
      if (sprite) {
        $d.sprite(sprite, tileXy.add(g.warzoneBorderTiles).mul(g.tileSize));
      }
    });
  }
}
