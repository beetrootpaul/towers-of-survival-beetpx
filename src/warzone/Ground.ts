import { BpxSprite, v_, v_0_0_ } from "@beetpx/beetpx";
import { b, g, u } from "../globals";
import { Tile } from "../misc/Tile";
import { forEachIntXyWithinRectOf } from "../misc/forEachIntXyWithinRectOf";

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
    forEachIntXyWithinRectOf(v_0_0_, g.warzoneSizeTiles, (xy) => {
      this.#sprites[`${xy.x}|${xy.y}`] =
        g.ground.sprites.textured ??
        u.throwError(`No "ground.sprites.textured" sprite defined.`);
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
          u.throwError(`No "ground.sprites.plain" sprite defined.`);
      }
    }
  }

  draw(): void {
    forEachIntXyWithinRectOf(v_0_0_, g.warzoneSizeTiles, (tileXy) => {
      const sprite = this.#sprites[`${tileXy.x}|${tileXy.y}`];
      if (sprite) {
        b.drawSprite(sprite, tileXy.add(g.warzoneBorderTiles).mul(g.tileSize));
      }
    });
  }
}
