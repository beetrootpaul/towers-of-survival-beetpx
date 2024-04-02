import { b_, BpxSprite, u_, v_, v_0_0_ } from "@beetpx/beetpx";
import { g } from "../globals";
import { forEachIntXyWithinRectOf } from "../misc/forEachIntXyWithinRectOf";
import { Tile } from "../misc/Tile";

export class Ground {
  static readonly #plainOffsets = [
    v_(0, 0),
    v_(-1, -1),
    v_(0, -1),
    v_(1, -1),
    v_(1, 0),
    v_(1, 1),
    v_(0, 1),
    v_(-1, 1),
    v_(-1, 0),
  ];

  readonly #sprites: Record<string, BpxSprite>;

  constructor() {
    this.#sprites = {};
    forEachIntXyWithinRectOf(v_0_0_, g.warzoneSizeTiles, xy => {
      this.#sprites[`${xy.x}|${xy.y}`] =
        g.ground.sprites.textured ??
        u_.throwError(`No "ground.sprites.textured" sprite defined.`);
    });
  }

  isAt(tile: Tile): boolean {
    return tile.xy.gte(v_0_0_) && tile.xy.lte(g.warzoneSizeTiles.sub(1));
  }

  makePlainAtAndAround(tile: Tile): void {
    for (const offset of Ground.#plainOffsets) {
      const t = tile.plus(offset);
      if (this.#sprites[`${t.xy.x}|${t.xy.y}`]) {
        this.#sprites[`${t.xy.x}|${t.xy.y}`] =
          g.ground.sprites.plain ??
          u_.throwError(`No "ground.sprites.plain" sprite defined.`);
      }
    }
  }

  draw(): void {
    forEachIntXyWithinRectOf(v_0_0_, g.warzoneSizeTiles, tileXy => {
      const sprite = this.#sprites[`${tileXy.x}|${tileXy.y}`];
      if (sprite) {
        b_.drawSprite(sprite, tileXy.add(g.warzoneBorderTiles).mul(g.tileSize));
      }
    });
  }
}
